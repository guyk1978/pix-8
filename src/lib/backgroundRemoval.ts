import type { Config } from "@imgly/background-removal";

export type BackgroundMode = "transparent" | "solid";

export type RemovalPhase = "loading-model" | "processing";

export interface RemovalProgress {
  phase: RemovalPhase;
  key?: string;
  current?: number;
  total?: number;
}

export interface BackgroundRemovalOptions {
  backgroundMode: BackgroundMode;
  backgroundColor?: string;
  canvas?: HTMLCanvasElement | null;
}

function buildRemovalConfig(
  onProgress?: (progress: RemovalProgress) => void,
): Config {
  return {
    model: "isnet_fp16",
    output: {
      format: "image/png",
    },
    progress: (key, current, total) => {
      onProgress?.({ phase: "loading-model", key, current, total });
    },
  };
}

export async function removeImageBackground(
  source: string | Blob,
  onProgress?: (progress: RemovalProgress) => void,
): Promise<Blob> {
  const { removeBackground } = await import("@imgly/background-removal");

  onProgress?.({ phase: "processing" });

  return removeBackground(source, buildRemovalConfig(onProgress));
}

function loadImageElement(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to load image."));
    image.src = url;
  });
}

export async function blobToImage(blob: Blob): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(blob);
  try {
    return await loadImageElement(url);
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function renderResultToCanvas(
  image: HTMLImageElement,
  options: BackgroundRemovalOptions,
): HTMLCanvasElement {
  const width = image.naturalWidth;
  const height = image.naturalHeight;
  const canvas = options.canvas ?? document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context unavailable.");
  }

  ctx.clearRect(0, 0, width, height);

  if (options.backgroundMode === "solid" && options.backgroundColor) {
    ctx.fillStyle = options.backgroundColor;
    ctx.fillRect(0, 0, width, height);
  }

  ctx.drawImage(image, 0, 0, width, height);
  return canvas;
}

export function canvasToPngBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Failed to encode PNG."));
      },
      "image/png",
    );
  });
}
