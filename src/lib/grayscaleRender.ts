export interface GrayscaleSettings {
  /** 50–150, where 100 is neutral */
  contrast: number;
  /** -50–50, where 0 is neutral */
  brightness: number;
}

export const DEFAULT_GRAYSCALE_SETTINGS: GrayscaleSettings = {
  contrast: 100,
  brightness: 0,
};

function clampChannel(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function toGrayscaleValue(r: number, g: number, b: number): number {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function applyTone(
  gray: number,
  contrast: number,
  brightness: number,
): number {
  const contrastFactor = contrast / 100;
  const brightnessOffset = brightness * 2.55;
  return clampChannel((gray - 128) * contrastFactor + 128 + brightnessOffset);
}

export function applyGrayscaleToImageData(
  imageData: ImageData,
  settings: GrayscaleSettings,
): ImageData {
  const { data } = imageData;

  for (let i = 0; i < data.length; i += 4) {
    const gray = toGrayscaleValue(data[i], data[i + 1], data[i + 2]);
    const value = applyTone(gray, settings.contrast, settings.brightness);
    data[i] = value;
    data[i + 1] = value;
    data[i + 2] = value;
  }

  return imageData;
}

export function renderGrayscaleCanvas(
  image: HTMLImageElement,
  imageWidth: number,
  imageHeight: number,
  settings: GrayscaleSettings,
  canvas?: HTMLCanvasElement | null,
): HTMLCanvasElement {
  const target = canvas ?? document.createElement("canvas");
  target.width = imageWidth;
  target.height = imageHeight;

  const ctx = target.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context unavailable.");
  }

  ctx.clearRect(0, 0, imageWidth, imageHeight);
  ctx.drawImage(image, 0, 0, imageWidth, imageHeight);

  const imageData = ctx.getImageData(0, 0, imageWidth, imageHeight);
  ctx.putImageData(applyGrayscaleToImageData(imageData, settings), 0, 0);

  return target;
}
