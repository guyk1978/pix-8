import { CLICK_SEGMENTATION_MODELS } from "@/lib/backgroundRemoval/constants";
import type { RemovalProgress } from "@/lib/backgroundRemoval/types";
import { loadModelWithCache } from "@/lib/modelCache";

export interface ClickSegmentationEmbedding {
  width: number;
  height: number;
  scale: number;
  embedding: ArrayBuffer;
}

type WorkerRequest =
  | { type: "init"; encoderBuffer: ArrayBuffer; decoderBuffer: ArrayBuffer }
  | { type: "encode"; id: number; bitmap: ImageBitmap }
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

interface PendingJob {
  resolve: (value: unknown) => void;
  reject: (error: Error) => void;
  onProgress?: (progress: RemovalProgress) => void;
}

let worker: Worker | null = null;
let workerReady = false;
let workerFailed = false;
let lastEngineError: string | null = null;
let initPromise: Promise<void> | null = null;
let requestId = 0;

const pending = new Map<number, PendingJob>();

function createWorker(): Worker {
  return new Worker(
    new URL("../../workers/clickSegmentation.worker.ts", import.meta.url),
    { type: "module" },
  );
}

function handleWorkerMessage(event: MessageEvent<WorkerOutbound>) {
  const message = event.data;

  switch (message.type) {
    case "ready":
      workerReady = true;
      workerFailed = false;
      lastEngineError = null;
      return;

    case "progress": {
      const job = message.id !== undefined ? pending.get(message.id) : undefined;
      job?.onProgress?.({
        phase: "processing",
        key: message.phase,
      });
      return;
    }

    case "encoded": {
      const job = pending.get(message.id);
      if (!job) return;
      pending.delete(message.id);
      job.resolve({
        width: message.width,
        height: message.height,
        scale: message.scale,
        embedding: message.embedding,
      } satisfies ClickSegmentationEmbedding);
      return;
    }

    case "mask": {
      const job = pending.get(message.id);
      if (!job) return;
      pending.delete(message.id);
      job.resolve(
        new Float32Array(
          message.buffer,
          0,
          message.width * message.height,
        ),
      );
      return;
    }

    case "error":
      if (message.id !== undefined) {
        const job = pending.get(message.id);
        if (job) {
          pending.delete(message.id);
          job.reject(new Error(message.message));
        }
        return;
      }

      workerFailed = true;
      workerReady = false;
      lastEngineError = message.message;
      for (const [id, job] of pending) {
        job.reject(new Error(message.message));
        pending.delete(id);
      }
      return;
  }
}

export function isClickSegmentationAvailable(): boolean {
  return typeof Worker !== "undefined" && typeof OffscreenCanvas !== "undefined";
}

export function isClickSegmentationReady(): boolean {
  return workerReady;
}

export function hasClickSegmentationFailed(): boolean {
  return workerFailed;
}

export function getClickSegmentationError(): string | null {
  return lastEngineError;
}

export async function warmClickSegmentationEngine(
  onProgress?: (progress: RemovalProgress) => void,
): Promise<void> {
  if (!isClickSegmentationAvailable()) {
    workerFailed = true;
    lastEngineError = "Web Workers are not supported in this browser.";
    throw new Error(lastEngineError);
  }

  if (workerReady) return;
  if (initPromise) return initPromise;

  initPromise = new Promise<void>((resolve, reject) => {
    void (async () => {
      try {
        onProgress?.({ phase: "loading-model", key: "encoder" });

        const encoderBuffer = await loadModelWithCache(
          CLICK_SEGMENTATION_MODELS.encoder.cacheKey,
          CLICK_SEGMENTATION_MODELS.encoder.url,
          ({ loaded, total }) => {
            onProgress?.({
              phase: "loading-model",
              key: "encoder",
              current: loaded,
              total,
            });
          },
        );

        onProgress?.({ phase: "loading-model", key: "decoder" });

        const decoderBuffer = await loadModelWithCache(
          CLICK_SEGMENTATION_MODELS.decoder.cacheKey,
          CLICK_SEGMENTATION_MODELS.decoder.url,
          ({ loaded, total }) => {
            onProgress?.({
              phase: "loading-model",
              key: "decoder",
              current: loaded,
              total,
            });
          },
        );

        worker = createWorker();
        const activeWorker = worker;

        const handleInitMessage = (event: MessageEvent<WorkerOutbound>) => {
          const message = event.data;
          if (message.type === "ready") {
            activeWorker.removeEventListener("message", handleInitMessage);
            resolve();
            return;
          }
          if (message.type === "error") {
            activeWorker.removeEventListener("message", handleInitMessage);
            workerFailed = true;
            workerReady = false;
            lastEngineError = message.message;
            initPromise = null;
            activeWorker.terminate();
            worker = null;
            reject(new Error(message.message));
          }
        };

        activeWorker.addEventListener("message", handleWorkerMessage);
        activeWorker.addEventListener("message", handleInitMessage);
        activeWorker.addEventListener("error", (event) => {
          workerFailed = true;
          workerReady = false;
          initPromise = null;
          lastEngineError = event.message || "Click segmentation worker crashed.";
          activeWorker.terminate();
          worker = null;
          reject(new Error(lastEngineError));
        });

        const initMessage: WorkerRequest = {
          type: "init",
          encoderBuffer,
          decoderBuffer,
        };
        activeWorker.postMessage(initMessage, [encoderBuffer, decoderBuffer]);
      } catch (cause) {
        workerFailed = true;
        workerReady = false;
        initPromise = null;
        lastEngineError =
          cause instanceof Error ? cause.message : "Click segmentation init failed.";
        reject(cause instanceof Error ? cause : new Error(lastEngineError));
      }
    })();
  });

  return initPromise;
}

function runWorkerJob<T>(
  postMessage: (id: number) => void,
  onProgress?: (progress: RemovalProgress) => void,
): Promise<T> {
  if (!worker || !workerReady) {
    return Promise.reject(new Error("Click segmentation engine is unavailable."));
  }

  const id = ++requestId;

  return new Promise<T>((resolve, reject) => {
    pending.set(id, {
      resolve: resolve as (value: unknown) => void,
      reject,
      onProgress,
    });
    postMessage(id);
  });
}

export async function encodeClickSegmentationImage(
  source: Blob,
  onProgress?: (progress: RemovalProgress) => void,
): Promise<ClickSegmentationEmbedding> {
  await warmClickSegmentationEngine(onProgress);
  const bitmap = await createImageBitmap(source);

  return runWorkerJob<ClickSegmentationEmbedding>(
    (id) => {
      const message: WorkerRequest = { type: "encode", id, bitmap };
      worker!.postMessage(message, [bitmap]);
    },
    onProgress,
  );
}

export async function segmentAtClick(
  embedding: ClickSegmentationEmbedding,
  x: number,
  y: number,
  label: 0 | 1,
  onProgress?: (progress: RemovalProgress) => void,
): Promise<Float32Array> {
  await warmClickSegmentationEngine(onProgress);

  return runWorkerJob<Float32Array>((id) => {
    const embeddingCopy = embedding.embedding.slice(0);
    const message: WorkerRequest = {
      type: "segment",
      id,
      width: embedding.width,
      height: embedding.height,
      scale: embedding.scale,
      embedding: embeddingCopy,
      x,
      y,
      label,
    };
    worker!.postMessage(message, [embeddingCopy]);
  }, onProgress);
}

export function disposeClickSegmentationEngine(): void {
  pending.clear();
  worker?.terminate();
  worker = null;
  workerReady = false;
  workerFailed = false;
  lastEngineError = null;
  initPromise = null;
}
