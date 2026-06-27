/// <reference lib="webworker" />

import * as ort from "onnxruntime-web/wasm";
import { ONNX_WASM_PATH } from "@/lib/backgroundRemoval/constants";
import {
  imagePointToSamCoords,
  preprocessSamImage,
  resizeSamMask,
  SAM_INPUT_SIZE,
} from "@/lib/backgroundRemoval/clickSegmentation";

type WorkerRequest =
  | { type: "init"; encoderBuffer: ArrayBuffer; decoderBuffer: ArrayBuffer }
  | {
      type: "encode";
      id: number;
      bitmap: ImageBitmap;
    }
  | {
      type: "segment";
      id: number;
      width: number;
      height: number;
      scale: number;
      embedding: ArrayBuffer;
      x: number;
      y: number;
      label: 0 | 1;
    };

type WorkerOutbound =
  | { type: "ready" }
  | {
      type: "progress";
      id?: number;
      phase: "loading-model" | "encoding" | "decoding";
    }
  | {
      type: "encoded";
      id: number;
      width: number;
      height: number;
      scale: number;
      embedding: ArrayBuffer;
    }
  | {
      type: "mask";
      id: number;
      width: number;
      height: number;
      buffer: ArrayBuffer;
    }
  | { type: "error"; id?: number; message: string };

let encoderSession: ort.InferenceSession | null = null;
let decoderSession: ort.InferenceSession | null = null;
let modelReady = false;

function post(message: WorkerOutbound, transfer?: Transferable[]) {
  self.postMessage(message, transfer ?? []);
}

function configureOrtWasm(): void {
  const base = `${self.location.origin}${ONNX_WASM_PATH}`;
  ort.env.wasm.wasmPaths = base;
  ort.env.wasm.numThreads = 1;
  ort.env.logLevel = "error";
}

async function initWorker(encoderBuffer: ArrayBuffer, decoderBuffer: ArrayBuffer) {
  try {
    configureOrtWasm();
    encoderSession = await ort.InferenceSession.create(encoderBuffer, {
      executionProviders: ["wasm"],
      graphOptimizationLevel: "all",
    });
    decoderSession = await ort.InferenceSession.create(decoderBuffer, {
      executionProviders: ["wasm"],
      graphOptimizationLevel: "all",
    });
    modelReady = true;
    post({ type: "ready" });
  } catch (cause) {
    encoderSession = null;
    decoderSession = null;
    modelReady = false;
    const message =
      cause instanceof Error ? cause.message : "Click segmentation init failed.";
    post({ type: "error", message });
  }
}

async function encodeImage(id: number, bitmap: ImageBitmap) {
  if (!modelReady || !encoderSession) {
    post({ type: "error", id, message: "Click segmentation model is not ready." });
    bitmap.close();
    return;
  }

  try {
    post({ type: "progress", id, phase: "encoding" });

    const width = bitmap.width;
    const height = bitmap.height;
    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) throw new Error("OffscreenCanvas unavailable.");

    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const imageData = ctx.getImageData(0, 0, width, height);
    const { tensor, scale } = preprocessSamImage(imageData, width, height, SAM_INPUT_SIZE);
    const inputName = encoderSession.inputNames[0];
    const inputTensor = new ort.Tensor("float32", tensor, [1, 3, SAM_INPUT_SIZE, SAM_INPUT_SIZE]);
    const outputs = await encoderSession.run({ [inputName]: inputTensor });
    const embeddingTensor = outputs[encoderSession.outputNames[0]];
    const embedding = (embeddingTensor.data as Float32Array).slice().buffer;

    post(
      {
        type: "encoded",
        id,
        width,
        height,
        scale,
        embedding,
      },
      [embedding],
    );
  } catch (cause) {
    bitmap.close();
    const message =
      cause instanceof Error ? cause.message : "Image encoding failed.";
    post({ type: "error", id, message });
  }
}

async function segmentAtPoint(
  id: number,
  width: number,
  height: number,
  scale: number,
  embeddingBuffer: ArrayBuffer,
  x: number,
  y: number,
  label: 0 | 1,
) {
  if (!modelReady || !decoderSession) {
    post({ type: "error", id, message: "Click segmentation model is not ready." });
    return;
  }

  try {
    post({ type: "progress", id, phase: "decoding" });

    const embedding = new Float32Array(embeddingBuffer);
    const [samX, samY] = imagePointToSamCoords(x, y, scale);

    const pointCoords = new ort.Tensor("float32", new Float32Array([samX, samY]), [1, 1, 2]);
    const pointLabels = new ort.Tensor("float32", new Float32Array([label]), [1, 1]);
    const maskInput = new ort.Tensor(
      "float32",
      new Float32Array(256 * 256),
      [1, 1, 256, 256],
    );
    const hasMaskInput = new ort.Tensor("float32", new Float32Array([0]), [1]);
    const origImSize = new ort.Tensor("float32", new Float32Array([height, width]), [2]);

    const embeddingTensor = new ort.Tensor("float32", embedding, [1, 256, 64, 64]);

    const inputNames = decoderSession.inputNames;
    const feeds: Record<string, ort.Tensor> = {};
    for (const name of inputNames) {
      if (name.includes("embed")) feeds[name] = embeddingTensor;
      else if (name.includes("point_coord")) feeds[name] = pointCoords;
      else if (name.includes("point_label")) feeds[name] = pointLabels;
      else if (name.includes("mask_input")) feeds[name] = maskInput;
      else if (name.includes("has_mask")) feeds[name] = hasMaskInput;
      else if (name.includes("orig_im")) feeds[name] = origImSize;
    }

    if (!feeds[inputNames[0]]) {
      feeds.image_embeddings = embeddingTensor;
      feeds.point_coords = pointCoords;
      feeds.point_labels = pointLabels;
      feeds.mask_input = maskInput;
      feeds.has_mask_input = hasMaskInput;
      feeds.orig_im_size = origImSize;
    }

    const outputs = await decoderSession.run(feeds);
    const masksTensor = outputs[decoderSession.outputNames[0]];
    const maskData = masksTensor.data as Float32Array;

    let lowMask: Float32Array;
    let maskWidth = 256;
    let maskHeight = 256;

    if (maskData.length === width * height) {
      lowMask = maskData;
      maskWidth = width;
      maskHeight = height;
    } else if (maskData.length >= 256 * 256) {
      lowMask = maskData.slice(0, 256 * 256);
    } else {
      lowMask = maskData;
      maskWidth = Math.round(Math.sqrt(maskData.length));
      maskHeight = maskWidth;
    }

    const fullMask =
      maskWidth === width && maskHeight === height
        ? lowMask
        : resizeSamMask(lowMask, maskWidth, maskHeight, width, height);

    const buffer = fullMask.buffer.slice(
      fullMask.byteOffset,
      fullMask.byteOffset + fullMask.byteLength,
    ) as ArrayBuffer;

    post(
      {
        type: "mask",
        id,
        width,
        height,
        buffer,
      },
      [buffer],
    );
  } catch (cause) {
    const message =
      cause instanceof Error ? cause.message : "Click segmentation failed.";
    post({ type: "error", id, message });
  }
}

self.onmessage = (event: MessageEvent<WorkerRequest>) => {
  const message = event.data;

  if (message.type === "init") {
    void initWorker(message.encoderBuffer, message.decoderBuffer);
    return;
  }

  if (message.type === "encode") {
    void encodeImage(message.id, message.bitmap);
    return;
  }

  if (message.type === "segment") {
    void segmentAtPoint(
      message.id,
      message.width,
      message.height,
      message.scale,
      message.embedding,
      message.x,
      message.y,
      message.label,
    );
  }
};
