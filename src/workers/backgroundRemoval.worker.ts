/// <reference lib="webworker" />

import * as ort from "onnxruntime-web/wasm";
import {
  ALPHA_PRESERVATION_GAMMA,
  GUIDED_FILTER_EPSILON,
  GUIDED_FILTER_RADIUS,
  MODNET_MEAN,
  MODNET_STD,
  ONNX_WASM_PATH,
  SEGMENTATION_MODEL,
} from "@/lib/backgroundRemoval/constants";
import {
  decontaminateExteriorEdgeRgb,
  estimateBorderBackgroundColor,
  isolateForegroundAlpha,
  recoverEdgeAlphaOnly,
  recoverLimbsFromReference,
  snapBackgroundAlpha,
} from "@/lib/backgroundRemoval/alphaMatting";
import { fixColorSpillHalos, fillEnclosedAlphaGaps, removeBackgroundBleed } from "@/lib/backgroundRemoval/colorSpill";
import {
  imageDataToModnetTensor,
  modnetInferenceDimensions,
  resizeMatteBilinear,
} from "@/lib/backgroundRemoval/modnetPreprocess";
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

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
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
    output[offset + 3] = Math.round(clamp01(alpha[i]) * 255);
  }

  return output;
}

function preserveSubjectAlpha(alpha: Float32Array, gamma: number): Float32Array {
  const output = new Float32Array(alpha.length);
  for (let i = 0; i < alpha.length; i++) {
    output[i] = Math.pow(clamp01(alpha[i]), gamma);
  }
  return output;
}

function refineSegmentationAlpha(
  fullImageData: ImageData,
  coarseMask: Float32Array,
  width: number,
  height: number,
): Uint8ClampedArray {
  const guide = imageDataToGrayscaleGuide(fullImageData);
  const { data } = fullImageData;

  let alpha = preserveSubjectAlpha(
    guidedFilter(
      guide,
      coarseMask,
      width,
      height,
      GUIDED_FILTER_RADIUS,
      GUIDED_FILTER_EPSILON,
    ),
    ALPHA_PRESERVATION_GAMMA,
  );

  alpha = snapBackgroundAlpha(alpha, 0.08);

  const { alpha: isolatedAlpha, isBg } = isolateForegroundAlpha(
    alpha,
    width,
    height,
    0.12,
    0.34,
  );
  alpha = fillEnclosedAlphaGaps(isolatedAlpha, isBg, width, height);

  alpha = recoverEdgeAlphaOnly(data, alpha, width, height, 0.5);

  const rgba = applyAlphaMask(fullImageData, alpha);
  const bg = estimateBorderBackgroundColor(data, width, height);

  recoverLimbsFromReference(rgba, alpha, data, isBg, width, height, 0.82);
  alpha = fillEnclosedAlphaGaps(alpha, isBg, width, height, 0.38, 0.52);
  removeBackgroundBleed(rgba, alpha, isBg, width, height, bg, { strength: 0.9 });
  decontaminateExteriorEdgeRgb(rgba, alpha, isBg, width, height, bg, 0.84);
  fixColorSpillHalos(rgba, alpha, isBg, width, height, {
    luminanceThreshold: 172,
    strength: 0.92,
  });

  for (let i = 0; i < alpha.length; i++) {
    rgba[i * 4 + 3] = Math.round(clamp01(alpha[i]) * 255);
  }

  return rgba;
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

    const fullCanvas = new OffscreenCanvas(width, height);
    const fullCtx = fullCanvas.getContext("2d", { willReadFrequently: true });
    if (!fullCtx) throw new Error("OffscreenCanvas unavailable.");

    fullCtx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const fullImageData = fullCtx.getImageData(0, 0, width, height);
    const { inferenceWidth, inferenceHeight } = modnetInferenceDimensions(
      width,
      height,
      SEGMENTATION_MODEL.inputSize,
    );

    const modelCanvas = new OffscreenCanvas(inferenceWidth, inferenceHeight);
    const modelCtx = modelCanvas.getContext("2d", { willReadFrequently: true });
    if (!modelCtx) throw new Error("OffscreenCanvas unavailable.");

    modelCtx.drawImage(fullCanvas, 0, 0, inferenceWidth, inferenceHeight);
    const modelImageData = modelCtx.getImageData(0, 0, inferenceWidth, inferenceHeight);

    const tensorData = imageDataToModnetTensor(
      modelImageData,
      inferenceWidth,
      inferenceHeight,
      MODNET_MEAN,
      MODNET_STD,
    );

    const inputName = session.inputNames[0];
    const inputTensor = new ort.Tensor("float32", tensorData, [
      1,
      3,
      inferenceHeight,
      inferenceWidth,
    ]);
    const outputs = await session.run({ [inputName]: inputTensor });
    const outputTensor = outputs[session.outputNames[0]];
    const rawMask = outputTensor.data as Float32Array;

    const inferenceMatte = new Float32Array(inferenceWidth * inferenceHeight);
    for (let i = 0; i < inferenceMatte.length; i++) {
      inferenceMatte[i] = clamp01(rawMask[i]);
    }

    const fullMask = resizeMatteBilinear(
      inferenceMatte,
      inferenceWidth,
      inferenceHeight,
      width,
      height,
    );

    const rgba = refineSegmentationAlpha(fullImageData, fullMask, width, height);
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
