export type SharpenType = "adaptive" | "high-pass" | "unsharp-mask";

export interface SharpenSettings {
  /** 0–100 sharpening intensity */
  intensity: number;
  type?: SharpenType;
}

export interface RefinementSettings {
  enabled: boolean;
  intensity: number;
  type: SharpenType;
}

export const DEFAULT_SHARPEN_SETTINGS: SharpenSettings = {
  intensity: 40,
  type: "adaptive",
};

export const DEFAULT_REFINEMENT_SETTINGS: RefinementSettings = {
  enabled: false,
  intensity: 40,
  type: "adaptive",
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

function getLuminance(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  x: number,
  y: number,
): number {
  const r = getChannel(data, width, height, x, y, 0);
  const g = getChannel(data, width, height, x, y, 1);
  const b = getChannel(data, width, height, x, y, 2);
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function boxBlur(imageData: ImageData): ImageData {
  const { width, height, data } = imageData;
  const output = cloneImageData(imageData);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;

      for (let channel = 0; channel < 3; channel++) {
        let sum = 0;

        for (let offsetY = -1; offsetY <= 1; offsetY++) {
          for (let offsetX = -1; offsetX <= 1; offsetX++) {
            sum += getChannel(data, width, height, x + offsetX, y + offsetY, channel);
          }
        }

        output.data[index + channel] = clampChannel(sum / 9);
      }
    }
  }

  return output;
}

function applyConvolutionSharpen(
  imageData: ImageData,
  strength: number,
): ImageData {
  const { width, height, data } = imageData;
  const output = cloneImageData(imageData);

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

function applyAdaptiveSharpen(
  imageData: ImageData,
  intensity: number,
): ImageData {
  const { width, height, data } = imageData;
  const output = cloneImageData(imageData);
  const amount = intensity / 100;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;
      const centerLum = getLuminance(data, width, height, x, y);
      const laplacian =
        centerLum * 4 -
        getLuminance(data, width, height, x, y - 1) -
        getLuminance(data, width, height, x, y + 1) -
        getLuminance(data, width, height, x - 1, y) -
        getLuminance(data, width, height, x + 1, y);
      const edgeWeight = Math.min(1, Math.abs(laplacian) / 48) * amount;

      for (let channel = 0; channel < 3; channel++) {
        let sharpened = 0;
        let kernelIndex = 0;
        const kernel = [
          0,
          -edgeWeight,
          0,
          -edgeWeight,
          1 + 4 * edgeWeight,
          -edgeWeight,
          0,
          -edgeWeight,
          0,
        ];

        for (let offsetY = -1; offsetY <= 1; offsetY++) {
          for (let offsetX = -1; offsetX <= 1; offsetX++) {
            sharpened +=
              getChannel(data, width, height, x + offsetX, y + offsetY, channel) *
              kernel[kernelIndex];
            kernelIndex++;
          }
        }

        output.data[index + channel] = clampChannel(sharpened);
      }
    }
  }

  return output;
}

function applyHighPassSharpen(
  imageData: ImageData,
  intensity: number,
): ImageData {
  const { width, height, data } = imageData;
  const blurred = boxBlur(imageData);
  const output = cloneImageData(imageData);
  const amount = intensity / 100;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;

      for (let channel = 0; channel < 3; channel++) {
        const original = data[index + channel];
        const lowPass = blurred.data[index + channel];
        output.data[index + channel] = clampChannel(
          original + amount * (original - lowPass),
        );
      }
    }
  }

  return output;
}

function applyUnsharpMask(
  imageData: ImageData,
  intensity: number,
): ImageData {
  const { width, height, data } = imageData;
  const blurred = boxBlur(imageData);
  const output = cloneImageData(imageData);
  const amount = (intensity / 100) * 1.5;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;

      for (let channel = 0; channel < 3; channel++) {
        const original = data[index + channel];
        const smooth = blurred.data[index + channel];
        output.data[index + channel] = clampChannel(
          original + amount * (original - smooth),
        );
      }
    }
  }

  return output;
}

export function applySharpenByType(
  imageData: ImageData,
  settings: Pick<SharpenSettings, "intensity" | "type">,
): ImageData {
  if (settings.intensity <= 0) {
    return cloneImageData(imageData);
  }

  const type = settings.type ?? "adaptive";

  switch (type) {
    case "high-pass":
      return applyHighPassSharpen(imageData, settings.intensity);
    case "unsharp-mask":
      return applyUnsharpMask(imageData, settings.intensity);
    case "adaptive":
    default:
      return applyAdaptiveSharpen(imageData, settings.intensity);
  }
}

export function applySharpen(
  imageData: ImageData,
  settings: SharpenSettings,
): ImageData {
  if (settings.intensity <= 0) {
    return cloneImageData(imageData);
  }

  if (settings.type && settings.type !== "adaptive") {
    return applySharpenByType(imageData, settings);
  }

  const strength = settings.intensity / 100;
  return applyConvolutionSharpen(imageData, strength);
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

export function copyCanvasToCanvas(
  source: HTMLCanvasElement,
  target?: HTMLCanvasElement | null,
): HTMLCanvasElement {
  const output = target ?? document.createElement("canvas");
  output.width = source.width;
  output.height = source.height;

  const ctx = output.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context unavailable.");
  }

  ctx.clearRect(0, 0, output.width, output.height);
  ctx.drawImage(source, 0, 0);
  return output;
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

export function renderRefinedCanvasFromSource(
  sourceCanvas: HTMLCanvasElement,
  settings: RefinementSettings,
  targetCanvas?: HTMLCanvasElement | null,
): HTMLCanvasElement {
  const { width, height } = sourceCanvas;
  const sourceCtx = sourceCanvas.getContext("2d");

  if (!sourceCtx) {
    throw new Error("Canvas context unavailable.");
  }

  const target = targetCanvas ?? document.createElement("canvas");
  target.width = width;
  target.height = height;

  const targetCtx = target.getContext("2d");
  if (!targetCtx) {
    throw new Error("Canvas context unavailable.");
  }

  if (!settings.enabled || settings.intensity <= 0) {
    return copyCanvasToCanvas(sourceCanvas, target);
  }

  const imageData = sourceCtx.getImageData(0, 0, width, height);
  const refined = applySharpenByType(imageData, {
    intensity: settings.intensity,
    type: settings.type,
  });

  targetCtx.putImageData(refined, 0, 0);
  return target;
}
