import { SEGMENTATION_MODEL } from "@/lib/backgroundRemoval/constants";
import type { RemovalProgress } from "@/lib/backgroundRemoval/types";
import { loadModelWithCache } from "@/lib/modelCache";

type WorkerRequest =
  | { type: "init"; modelBuffer: ArrayBuffer }
  | { type: "segment"; id: number; bitmap: ImageBitmap };

type WorkerOutbound =
  | {
      type: "progress";
      id?: number;
      phase: "loading-model" | "processing";
      current?: number;
      total?: number;
    }
  | { type: "ready" }
  | {
      type: "result";
      id: number;
      width: number;
      height: number;
      buffer: ArrayBuffer;
    }
  | { type: "error"; id?: number; message: string };

interface PendingSegmentation {
  resolve: (blob: Blob) => void;
  reject: (error: Error) => void;
  onProgress?: (progress: RemovalProgress) => void;
}

let worker: Worker | null = null;
let workerReady = false;
let workerFailed = false;
let lastEngineError: string | null = null;
let initPromise: Promise<void> | null = null;
let requestId = 0;

const pending = new Map<number, PendingSegmentation>();

function createWorker(): Worker {
  return new Worker(
    new URL("../../workers/backgroundRemoval.worker.ts", import.meta.url),
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
        phase: message.phase,
        current: message.current,
        total: message.total,
      });
      return;
    }

    case "result": {
      const job = pending.get(message.id);
      if (!job) return;
      pending.delete(message.id);

      const canvas = document.createElement("canvas");
      canvas.width = message.width;
      canvas.height = message.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        job.reject(new Error("Canvas context unavailable."));
        return;
      }

      const imageData = new ImageData(
        new Uint8ClampedArray(message.buffer),
        message.width,
        message.height,
      );
      ctx.putImageData(imageData, 0, 0);

      canvas.toBlob((blob) => {
        if (!blob) {
          job.reject(new Error("Failed to encode PNG."));
          return;
        }
        job.resolve(blob);
      }, "image/png");
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

export function isBackgroundRemovalEngineAvailable(): boolean {
  return typeof Worker !== "undefined" && typeof OffscreenCanvas !== "undefined";
}

export function isBackgroundRemovalModelReady(): boolean {
  return workerReady;
}

export function hasBackgroundRemovalEngineFailed(): boolean {
  return workerFailed;
}

export function getBackgroundRemovalEngineError(): string | null {
  return lastEngineError;
}

export function resetBackgroundRemovalEngine(): void {
  pending.clear();
  worker?.terminate();
  worker = null;
  workerReady = false;
  workerFailed = false;
  lastEngineError = null;
  initPromise = null;
}

export async function warmBackgroundRemovalEngine(
  onProgress?: (progress: RemovalProgress) => void,
): Promise<void> {
  if (!isBackgroundRemovalEngineAvailable()) {
    workerFailed = true;
    lastEngineError = "Web Workers are not supported in this browser.";
    throw new Error(lastEngineError);
  }

  if (workerReady) return;
  if (initPromise) return initPromise;

  initPromise = new Promise<void>((resolve, reject) => {
    void (async () => {
      try {
        onProgress?.({ phase: "loading-model" });

        const modelBuffer = await loadModelWithCache(
          SEGMENTATION_MODEL.cacheKey,
          SEGMENTATION_MODEL.url,
          ({ loaded, total }) => {
            onProgress?.({
              phase: "loading-model",
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
          lastEngineError = event.message || "Background removal worker crashed.";
          activeWorker.terminate();
          worker = null;
          reject(new Error(lastEngineError));
        });

        const initMessage: WorkerRequest = { type: "init", modelBuffer };
        activeWorker.postMessage(initMessage, [modelBuffer]);
      } catch (cause) {
        workerFailed = true;
        workerReady = false;
        initPromise = null;
        lastEngineError =
          cause instanceof Error ? cause.message : "Model initialization failed.";
        reject(cause instanceof Error ? cause : new Error(lastEngineError));
      }
    })();
  });

  return initPromise;
}

export async function removeImageBackgroundInWorker(
  source: Blob,
  onProgress?: (progress: RemovalProgress) => void,
): Promise<Blob> {
  await warmBackgroundRemovalEngine(onProgress);

  if (!worker || !workerReady) {
    throw new Error("Background removal engine is unavailable.");
  }

  const bitmap = await createImageBitmap(source);
  const id = ++requestId;

  return new Promise<Blob>((resolve, reject) => {
    pending.set(id, { resolve, reject, onProgress });

    const message: WorkerRequest = { type: "segment", id, bitmap };
    worker!.postMessage(message, [bitmap]);
  });
}

export function disposeBackgroundRemovalEngine(): void {
  resetBackgroundRemovalEngine();
}
