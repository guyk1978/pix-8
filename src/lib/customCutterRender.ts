import {
  canvasToBlob,
  type CropRegion,
  type ImageFormat,
} from "@/hooks/useImageProcessor";

export function renderKeepSelectionCanvas(
  image: HTMLImageElement,
  rect: CropRegion,
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = rect.width;
  canvas.height = rect.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context unavailable.");
  }

  ctx.drawImage(image, rect.x, rect.y, rect.width, rect.height, 0, 0, rect.width, rect.height);
  return canvas;
}

export function renderRemoveSelectionCanvas(
  image: HTMLImageElement,
  rect: CropRegion,
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context unavailable.");
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0);
  ctx.clearRect(rect.x, rect.y, rect.width, rect.height);
  return canvas;
}

export async function exportCustomCutterCanvas(
  canvas: HTMLCanvasElement,
  format: ImageFormat,
): Promise<Blob> {
  return canvasToBlob(canvas, format);
}
