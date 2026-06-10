export interface DenoiseSettings {
  /** 0–100 denoise strength */
  strength: number;
}

export const DEFAULT_DENOISE_SETTINGS: DenoiseSettings = {
  strength: 50,
};

function clampChannel(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function luminance(r: number, g: number, b: number): number {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function median(values: number[]): number {
  const sorted = values.slice().sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
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

function medianFilter(
  imageData: ImageData,
  radius: number,
): ImageData {
  const { width, height, data } = imageData;
  const output = cloneImageData(imageData);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const reds: number[] = [];
      const greens: number[] = [];
      const blues: number[] = [];

      for (let offsetY = -radius; offsetY <= radius; offsetY++) {
        for (let offsetX = -radius; offsetX <= radius; offsetX++) {
          reds.push(getChannel(data, width, height, x + offsetX, y + offsetY, 0));
          greens.push(getChannel(data, width, height, x + offsetX, y + offsetY, 1));
          blues.push(getChannel(data, width, height, x + offsetX, y + offsetY, 2));
        }
      }

      const index = (y * width + x) * 4;
      output.data[index] = median(reds);
      output.data[index + 1] = median(greens);
      output.data[index + 2] = median(blues);
    }
  }

  return output;
}

function edgeFactor(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  x: number,
  y: number,
): number {
  const center = luminance(
    getChannel(data, width, height, x, y, 0),
    getChannel(data, width, height, x, y, 1),
    getChannel(data, width, height, x, y, 2),
  );

  let maxDiff = 0;
  for (let offsetY = -1; offsetY <= 1; offsetY++) {
    for (let offsetX = -1; offsetX <= 1; offsetX++) {
      if (offsetX === 0 && offsetY === 0) continue;
      const neighbor = luminance(
        getChannel(data, width, height, x + offsetX, y + offsetY, 0),
        getChannel(data, width, height, x + offsetX, y + offsetY, 1),
        getChannel(data, width, height, x + offsetX, y + offsetY, 2),
      );
      maxDiff = Math.max(maxDiff, Math.abs(center - neighbor));
    }
  }

  return Math.min(maxDiff / 48, 1);
}

export function applyDenoise(
  imageData: ImageData,
  settings: DenoiseSettings,
): ImageData {
  if (settings.strength <= 0) {
    return cloneImageData(imageData);
  }

  const radius = settings.strength <= 45 ? 1 : 2;
  const filtered = medianFilter(imageData, radius);
  const output = cloneImageData(imageData);
  const mix = settings.strength / 100;

  for (let y = 0; y < imageData.height; y++) {
    for (let x = 0; x < imageData.width; x++) {
      const index = (y * imageData.width + x) * 4;
      const preserve = edgeFactor(imageData.data, imageData.width, imageData.height, x, y);
      const blend = mix * (1 - preserve * 0.9);

      for (let channel = 0; channel < 3; channel++) {
        const original = imageData.data[index + channel];
        const smoothed = filtered.data[index + channel];
        output.data[index + channel] = clampChannel(
          original * (1 - blend) + smoothed * blend,
        );
      }
    }
  }

  return output;
}

export function renderDenoisedCanvas(
  image: HTMLImageElement,
  imageWidth: number,
  imageHeight: number,
  settings: DenoiseSettings,
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
  ctx.putImageData(applyDenoise(imageData, settings), 0, 0);

  return target;
}
