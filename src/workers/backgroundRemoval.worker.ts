/// <reference lib="webworker" />

import * as ort from "onnxruntime-web/wasm";
import {
  GUIDED_FILTER_EPSILON,
  GUIDED_FILTER_RADIUS,
  IMAGENET_MEAN,
  IMAGENET_STD,
  ONNX_WASM_PATH,
  SEGMENTATION_MODEL,
} from "@/lib/backgroundRemoval/constants";
import { guidedFilter, imageDataToGrayscaleGuide } from "@/lib/guidedFilter";

type WorkerRequest =
  | { type: "init"; modelBuffer: ArrayBuffer }
  | { type: "segment"; id: number; bitmap: ImageBitmap };

type WorkerProgressMessage = {
  type: "progress";
  id?: number;
  phase: "loading-model" | "processing";
  current?: number;
  total?: number;
};

type WorkerReadyMessage = { type: "ready" };
type WorkerResultMessage = {
  type: "result";
  id: number;
  width: number;
  height: number;
  buffer: ArrayBuffer;
};
type WorkerErrorMessage = { type: "error"; id?: number; message: string };

type WorkerOutbound =
  | WorkerProgressMessage
  | WorkerReadyMessage
  | WorkerResultMessage
  | WorkerErrorMessage;

let session: ort.InferenceSession | null = null;
let modelReady = false;

function post(message: WorkerOutbound, transfer?: Transferable[]) {
  self.postMessage(message, transfer ?? []);
}

function normalizeMask(values: Float32Array): Float32Array {
  let min = Infinity;
  let max = -Infinity;

  for (const value of values) {
    if (value < min) min = value;
    if (value > max) max = value;
  }

  const range = max - min || 1;
  const output = new Float32Array(values.length);
  for (let i = 0; i < values.length; i++) {
    output[i] = (values[i] - min) / range;
  }
  return output;
}

function resizeMaskBilinear(
  mask: Float32Array,
  sourceWidth: number,
  sourceHeight: number,
  targetWidth: number,
  targetHeight: number,
): Float32Array {
  const output = new Float32Array(targetWidth * targetHeight);
  const xRatio = sourceWidth / targetWidth;
  const yRatio = sourceHeight / targetHeight;

  for (let y = 0; y < targetHeight; y++) {
    const srcY = Math.min(sourceHeight - 1, y * yRatio);
    const y0 = Math.floor(srcY);
    const y1 = Math.min(sourceHeight - 1, y0 + 1);
    const yLerp = srcY - y0;

    for (let x = 0; x < targetWidth; x++) {
      const srcX = Math.min(sourceWidth - 1, x * xRatio);
      const x0 = Math.floor(srcX);
      const x1 = Math.min(sourceWidth - 1, x0 + 1);
      const xLerp = srcX - x0;

      const top =
        mask[y0 * sourceWidth + x0] * (1 - xLerp) +
        mask[y0 * sourceWidth + x1] * xLerp;
      const bottom =
        mask[y1 * sourceWidth + x0] * (1 - xLerp) +
        mask[y1 * sourceWidth + x1] * xLerp;

      output[y * targetWidth + x] = top * (1 - yLerp) + bottom * yLerp;
    }
  }

  return output;
}

function imageDataToInputTensor(
  imageData: ImageData,
  size: number,
): ort.Tensor {
  const { data } = imageData;
  const plane = size * size;
  const tensorData = new Float32Array(plane * 3);

  for (let i = 0; i < plane; i++) {
    const offset = i * 4;
    const r = data[offset] / 255;
    const g = data[offset + 1] / 255;
    const b = data[offset + 2] / 255;

    tensorData[i] = (r - IMAGENET_MEAN[0]) / IMAGENET_STD[0];
    tensorData[plane + i] = (g - IMAGENET_MEAN[1]) / IMAGENET_STD[1];
    tensorData[plane * 2 + i] = (b - IMAGENET_MEAN[2]) / IMAGENET_STD[2];
  }

  return new ort.Tensor("float32", tensorData, [1, 3, size, size]);
}

function applyAlphaMask(
  source: ImageData,
  alpha: Float32Array,
): Uint8ClampedArray {
  const { width, height, data } = source;
  const output = new Uint8ClampedArray(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const offset = i * 4;
    output[offset] = data[offset];
    output[offset + 1] = data[offset + 1];
    output[offset + 2] = data[offset + 2];
    output[offset + 3] = Math.round(alpha[i] * 255);
  }

  return output;
}

function configureOrtWasm(): void {
  const base = `${self.location.origin}${ONNX_WASM_PATH}`;
  ort.env.wasm.wasmPaths = base;
  ort.env.wasm.numThreads = 1;
  ort.env.logLevel = "error";
}

async function createSession(modelBuffer: ArrayBuffer): Promise<ort.InferenceSession> {
  configureOrtWasm();

  return ort.InferenceSession.create(modelBuffer, {
    executionProviders: ["wasm"],
    graphOptimizationLevel: "all",
  });
}

async function initWorker(modelBuffer: ArrayBuffer) {
  try {
    session = await createSession(modelBuffer);
    modelReady = true;
    post({ type: "ready" });
  } catch (cause) {
    session = null;
    modelReady = false;
    const message =
      cause instanceof Error ? cause.message : "Model initialization failed.";
    post({ type: "error", message });
  }
}

async function segmentImage(id: number, bitmap: ImageBitmap) {
  if (!modelReady || !session) {
    post({ type: "error", id, message: "Segmentation model is not ready." });
    bitmap.close();
    return;
  }

  try {
    post({ type: "progress", id, phase: "processing" });

    const width = bitmap.width;
    const height = bitmap.height;
    const modelSize = SEGMENTATION_MODEL.inputSize;

    const fullCanvas = new OffscreenCanvas(width, height);
    const fullCtx = fullCanvas.getContext("2d", { willReadFrequently: true });
    if (!fullCtx) throw new Error("OffscreenCanvas unavailable.");

    fullCtx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const fullImageData = fullCtx.getImageData(0, 0, width, height);

    const modelCanvas = new OffscreenCanvas(modelSize, modelSize);
    const modelCtx = modelCanvas.getContext("2d", { willReadFrequently: true });
    if (!modelCtx) throw new Error("OffscreenCanvas unavailable.");

    modelCtx.drawImage(fullCanvas, 0, 0, modelSize, modelSize);
    const modelImageData = modelCtx.getImageData(0, 0, modelSize, modelSize);

    const inputName = session.inputNames[0];
    const inputTensor = imageDataToInputTensor(modelImageData, modelSize);
    const outputs = await session.run({ [inputName]: inputTensor });
    const outputTensor = outputs[session.outputNames[0]];
    const rawMask = outputTensor.data as Float32Array;
    const modelMask = normalizeMask(rawMask);

    const fullMask = resizeMaskBilinear(
      modelMask,
      modelSize,
      modelSize,
      width,
      height,
    );

    const guide = imageDataToGrayscaleGuide(fullImageData);
    const refinedAlpha = guidedFilter(
      guide,
      fullMask,
      width,
      height,
      GUIDED_FILTER_RADIUS,
      GUIDED_FILTER_EPSILON,
    );

    const rgba = applyAlphaMask(fullImageData, refinedAlpha);
    const buffer = rgba.buffer.slice(
      rgba.byteOffset,
      rgba.byteOffset + rgba.byteLength,
    ) as ArrayBuffer;

    post(
      {
        type: "result",
        id,
        width,
        height,
        buffer,
      },
      [buffer],
    );
  } catch (cause) {
    bitmap.close();
    const message =
      cause instanceof Error ? cause.message : "Background removal failed.";
    post({ type: "error", id, message });
  }
}

self.onmessage = (event: MessageEvent<WorkerRequest>) => {
  const message = event.data;

  if (message.type === "init") {
    void initWorker(message.modelBuffer);
    return;
  }

  if (message.type === "segment") {
    void segmentImage(message.id, message.bitmap);
  }
};
