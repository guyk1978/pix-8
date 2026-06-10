export interface LensCorrectionSettings {
  /** -100 (barrel fix) to 100 (pincushion fix) */
  correction: number;
}

export const DEFAULT_LENS_CORRECTION_SETTINGS: LensCorrectionSettings = {
  correction: 0,
};

function clampChannel(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function sampleBilinear(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  x: number,
  y: number,
): [number, number, number, number] {
  const x0 = Math.max(0, Math.min(width - 1, Math.floor(x)));
  const y0 = Math.max(0, Math.min(height - 1, Math.floor(y)));
  const x1 = Math.min(width - 1, x0 + 1);
  const y1 = Math.min(height - 1, y0 + 1);

  const fx = x - x0;
  const fy = y - y0;

  const sample = (px: number, py: number) => {
    const index = (py * width + px) * 4;
    return [
      data[index],
      data[index + 1],
      data[index + 2],
      data[index + 3],
    ] as const;
  };

  const c00 = sample(x0, y0);
  const c10 = sample(x1, y0);
  const c01 = sample(x0, y1);
  const c11 = sample(x1, y1);

  const mix = (a: number, b: number, t: number) => a + (b - a) * t;

  return [
    clampChannel(
      mix(mix(c00[0], c10[0], fx), mix(c01[0], c11[0], fx), fy),
    ),
    clampChannel(
      mix(mix(c00[1], c10[1], fx), mix(c01[1], c11[1], fx), fy),
    ),
    clampChannel(
      mix(mix(c00[2], c10[2], fx), mix(c01[2], c11[2], fx), fy),
    ),
    clampChannel(
      mix(mix(c00[3], c10[3], fx), mix(c01[3], c11[3], fx), fy),
    ),
  ];
}

export function applyLensCorrection(
  imageData: ImageData,
  settings: LensCorrectionSettings,
): ImageData {
  const { width, height, data } = imageData;
  const output = new ImageData(width, height);
  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = Math.min(centerX, centerY);
  const strength = (settings.correction / 100) * 0.5;

  if (strength === 0) {
    output.data.set(data);
    return output;
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const nx = (x - centerX) / maxRadius;
      const ny = (y - centerY) / maxRadius;
      const radius = Math.sqrt(nx * nx + ny * ny);

      if (radius > 1.15) {
        continue;
      }

      const angle = Math.atan2(ny, nx);
      const sourceRadius = radius * (1 + strength * radius * radius);
      const sourceX = centerX + Math.cos(angle) * sourceRadius * maxRadius;
      const sourceY = centerY + Math.sin(angle) * sourceRadius * maxRadius;

      if (
        sourceX < 0 ||
        sourceX > width - 1 ||
        sourceY < 0 ||
        sourceY > height - 1
      ) {
        continue;
      }

      const [r, g, b, a] = sampleBilinear(data, width, height, sourceX, sourceY);
      const index = (y * width + x) * 4;
      output.data[index] = r;
      output.data[index + 1] = g;
      output.data[index + 2] = b;
      output.data[index + 3] = a;
    }
  }

  return output;
}

export function renderLensCorrectedCanvas(
  image: HTMLImageElement,
  imageWidth: number,
  imageHeight: number,
  settings: LensCorrectionSettings,
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
  ctx.putImageData(applyLensCorrection(imageData, settings), 0, 0);

  return target;
}
