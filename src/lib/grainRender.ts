export interface GrainSettings {
  /** 0–100 grain intensity */
  intensity: number;
}

export const DEFAULT_GRAIN_SETTINGS: GrainSettings = {
  intensity: 30,
};

function clampChannel(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function randomGaussian(): number {
  let u = 0;
  let v = 0;

  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();

  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export function applyGrain(
  imageData: ImageData,
  settings: GrainSettings,
): ImageData {
  if (settings.intensity <= 0) {
    return new ImageData(
      new Uint8ClampedArray(imageData.data),
      imageData.width,
      imageData.height,
    );
  }

  const output = new ImageData(
    new Uint8ClampedArray(imageData.data),
    imageData.width,
    imageData.height,
  );

  const strength = (settings.intensity / 100) * 28;

  for (let i = 0; i < output.data.length; i += 4) {
    if (output.data[i + 3] < 128) continue;

    const noise = randomGaussian() * strength;
    output.data[i] = clampChannel(output.data[i] + noise);
    output.data[i + 1] = clampChannel(output.data[i + 1] + noise);
    output.data[i + 2] = clampChannel(output.data[i + 2] + noise);
  }

  return output;
}

export function renderGrainCanvas(
  image: HTMLImageElement,
  imageWidth: number,
  imageHeight: number,
  settings: GrainSettings,
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
  ctx.putImageData(applyGrain(imageData, settings), 0, 0);

  return target;
}
