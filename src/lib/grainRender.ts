export interface GrainSettings {
  /** 0–100 grain intensity */
  intensity: number;
}

export const DEFAULT_GRAIN_SETTINGS: GrainSettings = {
  intensity: 45,
};

function clampChannel(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function luminance(r: number, g: number, b: number): number {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function createRandom(seed?: number): () => number {
  if (seed === undefined) {
    return Math.random;
  }

  let state = seed >>> 0;

  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randomGaussian(random: () => number): number {
  let u = 0;
  let v = 0;

  while (u === 0) u = random();
  while (v === 0) v = random();

  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function resolveGrainStrength(intensity: number): number {
  return Math.pow(intensity / 100, 0.82) * 48;
}

export function applyGrain(
  imageData: ImageData,
  settings: GrainSettings,
  seed?: number,
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

  const random = createRandom(seed);
  const strength = resolveGrainStrength(settings.intensity);

  for (let index = 0; index < output.data.length; index += 4) {
    if (output.data[index + 3]! < 128) continue;

    const red = output.data[index]!;
    const green = output.data[index + 1]!;
    const blue = output.data[index + 2]!;
    const lum = luminance(red, green, blue);
    const midtoneBoost = 1.05 - (Math.abs(lum - 128) / 128) * 0.35;

    const fineNoise = randomGaussian(random) * strength * midtoneBoost;
    const chromaNoiseRed = randomGaussian(random) * strength * 0.35;
    const chromaNoiseBlue = randomGaussian(random) * strength * 0.35;

    output.data[index] = clampChannel(red + fineNoise + chromaNoiseRed);
    output.data[index + 1] = clampChannel(green + fineNoise);
    output.data[index + 2] = clampChannel(blue + fineNoise - chromaNoiseBlue);
  }

  return output;
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

export function renderGrainCanvas(
  image: HTMLImageElement,
  imageWidth: number,
  imageHeight: number,
  settings: GrainSettings,
  canvas?: HTMLCanvasElement | null,
  seed?: number,
): HTMLCanvasElement {
  const target = canvas ?? document.createElement("canvas");
  drawImageToCanvas(image, imageWidth, imageHeight, target);

  if (settings.intensity <= 0) {
    return target;
  }

  const ctx = target.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context unavailable.");
  }

  const imageData = ctx.getImageData(0, 0, imageWidth, imageHeight);
  ctx.putImageData(applyGrain(imageData, settings, seed), 0, 0);

  return target;
}
