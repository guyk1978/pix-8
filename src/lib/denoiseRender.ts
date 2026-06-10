export interface DenoiseSettings {
  /** 0–100 denoise strength */
  strength: number;
}

export const DEFAULT_DENOISE_SETTINGS: DenoiseSettings = {
  strength: 60,
};

const ROWS_PER_YIELD = 32;

function clampChannel(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function luminance(r: number, g: number, b: number): number {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function cloneBuffer(data: Uint8ClampedArray): Uint8ClampedArray {
  return new Uint8ClampedArray(data);
}

function resolveBlurRadius(strength: number): number {
  if (strength <= 20) return 1;
  if (strength <= 45) return 2;
  if (strength <= 70) return 3;
  if (strength <= 85) return 4;
  return 5;
}

function resolveBlurPasses(strength: number): number {
  if (strength <= 25) return 1;
  if (strength <= 55) return 2;
  return 3;
}

function boxBlurHorizontal(
  source: Uint8ClampedArray,
  target: Uint8ClampedArray,
  width: number,
  height: number,
  radius: number,
): void {
  for (let y = 0; y < height; y++) {
    const row = y * width * 4;

    for (let channel = 0; channel < 3; channel++) {
      let sum = 0;
      let count = 0;

      for (let x = 0; x <= radius && x < width; x++) {
        sum += source[row + x * 4 + channel]!;
        count++;
      }

      for (let x = 0; x < width; x++) {
        target[row + x * 4 + channel] = sum / count;

        const addX = x + radius + 1;
        if (addX < width) {
          sum += source[row + addX * 4 + channel]!;
          count++;
        }

        const removeX = x - radius;
        if (removeX >= 0) {
          sum -= source[row + removeX * 4 + channel]!;
          count--;
        }
      }
    }

    for (let x = 0; x < width; x++) {
      target[row + x * 4 + 3] = source[row + x * 4 + 3]!;
    }
  }
}

function boxBlurVertical(
  source: Uint8ClampedArray,
  target: Uint8ClampedArray,
  width: number,
  height: number,
  radius: number,
): void {
  for (let x = 0; x < width; x++) {
    for (let channel = 0; channel < 3; channel++) {
      let sum = 0;
      let count = 0;

      for (let y = 0; y <= radius && y < height; y++) {
        sum += source[(y * width + x) * 4 + channel]!;
        count++;
      }

      for (let y = 0; y < height; y++) {
        target[(y * width + x) * 4 + channel] = sum / count;

        const addY = y + radius + 1;
        if (addY < height) {
          sum += source[(addY * width + x) * 4 + channel]!;
          count++;
        }

        const removeY = y - radius;
        if (removeY >= 0) {
          sum -= source[(removeY * width + x) * 4 + channel]!;
          count--;
        }
      }
    }

    for (let y = 0; y < height; y++) {
      target[(y * width + x) * 4 + 3] = source[(y * width + x) * 4 + 3]!;
    }
  }
}

function boxBlurPass(
  source: Uint8ClampedArray,
  width: number,
  height: number,
  radius: number,
  scratch: Uint8ClampedArray,
): Uint8ClampedArray {
  boxBlurHorizontal(source, scratch, width, height, radius);
  boxBlurVertical(scratch, source, width, height, radius);
  return source;
}

function edgeStrength(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  x: number,
  y: number,
): number {
  const sample = (sx: number, sy: number) => {
    const clampedX = Math.max(0, Math.min(width - 1, sx));
    const clampedY = Math.max(0, Math.min(height - 1, sy));
    const index = (clampedY * width + clampedX) * 4;
    return luminance(data[index]!, data[index + 1]!, data[index + 2]!);
  };

  const topLeft = sample(x - 1, y - 1);
  const top = sample(x, y - 1);
  const topRight = sample(x + 1, y - 1);
  const left = sample(x - 1, y);
  const right = sample(x + 1, y);
  const bottomLeft = sample(x - 1, y + 1);
  const bottom = sample(x, y + 1);
  const bottomRight = sample(x + 1, y + 1);

  const gx =
    -topLeft - 2 * left - bottomLeft + topRight + 2 * right + bottomRight;
  const gy =
    -topLeft - 2 * top - topRight + bottomLeft + 2 * bottom + bottomRight;

  return Math.min(Math.hypot(gx, gy) / 640, 1);
}

export async function applyDenoiseAsync(
  imageData: ImageData,
  settings: DenoiseSettings,
  shouldCancel?: () => boolean,
): Promise<ImageData> {
  if (settings.strength <= 0) {
    return new ImageData(
      new Uint8ClampedArray(imageData.data),
      imageData.width,
      imageData.height,
    );
  }

  const { width, height, data } = imageData;
  const original = cloneBuffer(data);
  const blurred = cloneBuffer(data);
  const scratch = new Uint8ClampedArray(data.length);
  const radius = resolveBlurRadius(settings.strength);
  const passes = resolveBlurPasses(settings.strength);
  const mix = Math.min(1, (settings.strength / 100) * 1.15);

  for (let pass = 0; pass < passes; pass++) {
    if (shouldCancel?.()) {
      throw new DOMException("Denoising cancelled.", "AbortError");
    }

    boxBlurPass(blurred, width, height, radius, scratch);

    if (pass < passes - 1) {
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 0);
      });
    }
  }

  const output = new Uint8ClampedArray(data.length);

  for (let y = 0; y < height; y++) {
    if (shouldCancel?.()) {
      throw new DOMException("Denoising cancelled.", "AbortError");
    }

    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;
      const edge = edgeStrength(original, width, height, x, y);
      const edgePreserve = Math.max(0, (edge - 0.12) / 0.55);
      const blend = mix * (1 - edgePreserve * 0.65);

      for (let channel = 0; channel < 3; channel++) {
        output[index + channel] = clampChannel(
          original[index + channel]! * (1 - blend) +
            blurred[index + channel]! * blend,
        );
      }

      output[index + 3] = original[index + 3]!;
    }

    if (y > 0 && y % ROWS_PER_YIELD === 0) {
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 0);
      });
    }
  }

  return new ImageData(output, width, height);
}

export function drawImageToCanvas(
  image: HTMLImageElement,
  imageWidth: number,
  imageHeight: number,
  canvas: HTMLCanvasElement,
): void {
  canvas.width = imageWidth;
  canvas.height = imageHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context unavailable.");
  }

  ctx.clearRect(0, 0, imageWidth, imageHeight);
  ctx.drawImage(image, 0, 0, imageWidth, imageHeight);
}

export async function renderDenoisedCanvasAsync(
  image: HTMLImageElement,
  imageWidth: number,
  imageHeight: number,
  settings: DenoiseSettings,
  canvas: HTMLCanvasElement,
  shouldCancel?: () => boolean,
): Promise<void> {
  drawImageToCanvas(image, imageWidth, imageHeight, canvas);

  if (settings.strength <= 0) {
    return;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context unavailable.");
  }

  const imageData = ctx.getImageData(0, 0, imageWidth, imageHeight);
  const denoised = await applyDenoiseAsync(imageData, settings, shouldCancel);

  if (shouldCancel?.()) {
    return;
  }

  ctx.putImageData(denoised, 0, 0);
}
