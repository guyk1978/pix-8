import type { BodyPix } from "@tensorflow-models/body-pix";

export type BackgroundMode = "transparent" | "solid";

export interface SegmentationMask {
  data: Uint8Array;
  width: number;
  height: number;
}

export interface BackgroundRemovalOptions {
  backgroundMode: BackgroundMode;
  backgroundColor?: string;
  canvas?: HTMLCanvasElement | null;
}

let modelPromise: Promise<BodyPix> | null = null;

export async function loadBodyPixModel(): Promise<BodyPix> {
  if (!modelPromise) {
    modelPromise = (async () => {
      await import("@tensorflow/tfjs");
      const bodyPix = await import("@tensorflow-models/body-pix");
      return bodyPix.load({
        architecture: "MobileNetV1",
        outputStride: 16,
        multiplier: 0.75,
        quantBytes: 2,
      });
    })();
  }

  return modelPromise;
}

function parseHexColor(hex: string): { r: number; g: number; b: number } {
  const normalized = hex.replace("#", "").trim();

  if (normalized.length === 3) {
    return {
      r: parseInt(normalized[0] + normalized[0], 16),
      g: parseInt(normalized[1] + normalized[1], 16),
      b: parseInt(normalized[2] + normalized[2], 16),
    };
  }

  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
}

function isForegroundPixel(
  mask: SegmentationMask,
  x: number,
  y: number,
  imageWidth: number,
  imageHeight: number,
): boolean {
  const maskX = Math.min(
    mask.width - 1,
    Math.floor((x * mask.width) / imageWidth),
  );
  const maskY = Math.min(
    mask.height - 1,
    Math.floor((y * mask.height) / imageHeight),
  );
  const maskIndex = maskY * mask.width + maskX;

  return maskIndex < mask.data.length && mask.data[maskIndex] > 0;
}

export function applySegmentationMask(
  image: HTMLImageElement,
  mask: SegmentationMask,
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

  const solidColor =
    options.backgroundMode === "solid" && options.backgroundColor
      ? parseHexColor(options.backgroundColor)
      : null;

  ctx.clearRect(0, 0, width, height);

  if (solidColor) {
    ctx.fillStyle = options.backgroundColor!;
    ctx.fillRect(0, 0, width, height);
  }

  ctx.drawImage(image, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const offset = (y * width + x) * 4;
      const isForeground = isForegroundPixel(mask, x, y, width, height);

      if (isForeground) {
        imageData.data[offset + 3] = 255;
        continue;
      }

      if (solidColor) {
        imageData.data[offset] = solidColor.r;
        imageData.data[offset + 1] = solidColor.g;
        imageData.data[offset + 2] = solidColor.b;
        imageData.data[offset + 3] = 255;
      } else {
        imageData.data[offset + 3] = 0;
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

function imageToCanvas(image: HTMLImageElement): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context unavailable.");
  }

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas;
}

export async function getPersonSegmentationMask(
  image: HTMLImageElement,
): Promise<SegmentationMask> {
  const net = await loadBodyPixModel();
  const canvas = imageToCanvas(image);

  const segmentation = await net.segmentPerson(canvas, {
    flipHorizontal: false,
    internalResolution: "medium",
    segmentationThreshold: 0.7,
  });

  return {
    data: segmentation.data,
    width: segmentation.width,
    height: segmentation.height,
  };
}

export async function removeBackground(
  image: HTMLImageElement,
  options: BackgroundRemovalOptions,
): Promise<HTMLCanvasElement> {
  const mask = await getPersonSegmentationMask(image);
  return applySegmentationMask(image, mask, options);
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
