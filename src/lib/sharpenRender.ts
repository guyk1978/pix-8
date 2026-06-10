export interface SharpenSettings {
  /** 0–100 sharpening intensity */
  intensity: number;
}

export const DEFAULT_SHARPEN_SETTINGS: SharpenSettings = {
  intensity: 40,
};

function clampChannel(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function cloneImageData(imageData: ImageData): ImageData {
  return new ImageData(
    new Uint8ClampedArray(imageData.data),
    imageData.width,
    imageData.height,
  );
}

function getChannel(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  x: number,
  y: number,
  channel: number,
): number {
  const clampedX = Math.max(0, Math.min(width - 1, x));
  const clampedY = Math.max(0, Math.min(height - 1, y));
  return data[(clampedY * width + clampedX) * 4 + channel];
}

export function applySharpen(
  imageData: ImageData,
  settings: SharpenSettings,
): ImageData {
  if (settings.intensity <= 0) {
    return cloneImageData(imageData);
  }

  const { width, height, data } = imageData;
  const output = cloneImageData(imageData);
  const strength = settings.intensity / 100;

  const kernel = [
    0,
    -strength,
    0,
    -strength,
    1 + 4 * strength,
    -strength,
    0,
    -strength,
    0,
  ];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;

      for (let channel = 0; channel < 3; channel++) {
        let sum = 0;
        let kernelIndex = 0;

        for (let offsetY = -1; offsetY <= 1; offsetY++) {
          for (let offsetX = -1; offsetX <= 1; offsetX++) {
            sum +=
              getChannel(data, width, height, x + offsetX, y + offsetY, channel) *
              kernel[kernelIndex];
            kernelIndex++;
          }
        }

        output.data[index + channel] = clampChannel(sum);
      }
    }
  }

  return output;
}

export function drawImageToCanvas(
  image: HTMLImageElement,
  imageWidth: number,
  imageHeight: number,
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
  return target;
}

export function renderSharpenedCanvas(
  image: HTMLImageElement,
  imageWidth: number,
  imageHeight: number,
  settings: SharpenSettings,
  canvas?: HTMLCanvasElement | null,
): HTMLCanvasElement {
  const sourceCanvas = drawImageToCanvas(image, imageWidth, imageHeight);
  const ctx = sourceCanvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas context unavailable.");
  }

  const imageData = ctx.getImageData(0, 0, imageWidth, imageHeight);
  const sharpened = applySharpen(imageData, settings);

  const target = canvas ?? document.createElement("canvas");
  target.width = imageWidth;
  target.height = imageHeight;

  const targetCtx = target.getContext("2d");
  if (!targetCtx) {
    throw new Error("Canvas context unavailable.");
  }

  targetCtx.putImageData(sharpened, 0, 0);
  return target;
}
