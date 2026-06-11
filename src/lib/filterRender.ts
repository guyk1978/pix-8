export type ImageFilterId =
  | "none"
  | "grayscale"
  | "sepia"
  | "vintage"
  | "blur"
  | "vignette";

export const IMAGE_FILTER_IDS: ImageFilterId[] = [
  "none",
  "grayscale",
  "sepia",
  "vintage",
  "blur",
  "vignette",
];

export const DEFAULT_IMAGE_FILTER: ImageFilterId = "none";

const BLUR_RADIUS_PX = 6;
const ROWS_PER_YIELD = 48;

function clampChannel(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function luminance(r: number, g: number, b: number): number {
  return 0.299 * r + 0.587 * g + 0.114 * b;
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
  ctx.filter = "none";
  ctx.drawImage(image, 0, 0, imageWidth, imageHeight);
}

function applyGrayscalePixel(
  data: Uint8ClampedArray,
  index: number,
): void {
  const gray = luminance(data[index]!, data[index + 1]!, data[index + 2]!);
  data[index] = gray;
  data[index + 1] = gray;
  data[index + 2] = gray;
}

function applySepiaPixel(data: Uint8ClampedArray, index: number): void {
  const r = data[index]!;
  const g = data[index + 1]!;
  const b = data[index + 2]!;

  data[index] = clampChannel(0.393 * r + 0.769 * g + 0.189 * b);
  data[index + 1] = clampChannel(0.349 * r + 0.686 * g + 0.168 * b);
  data[index + 2] = clampChannel(0.272 * r + 0.534 * g + 0.131 * b);
}

function applyVintagePixel(data: Uint8ClampedArray, index: number): void {
  let r = data[index]!;
  let g = data[index + 1]!;
  let b = data[index + 2]!;

  const gray = luminance(r, g, b);
  const saturation = 0.62;
  r = r * saturation + gray * (1 - saturation);
  g = g * saturation + gray * (1 - saturation);
  b = b * saturation + gray * (1 - saturation);

  r = clampChannel(r * 1.08 + 10);
  g = clampChannel(g * 1.02 + 6);
  b = clampChannel(b * 0.86);

  const fade = 0.94;
  data[index] = clampChannel(r * fade + 14);
  data[index + 1] = clampChannel(g * fade + 10);
  data[index + 2] = clampChannel(b * fade + 6);
}

function applyPixelFilter(
  imageData: ImageData,
  filterId: Exclude<ImageFilterId, "none" | "blur" | "vignette">,
): void {
  const { data } = imageData;

  for (let i = 0; i < data.length; i += 4) {
    if (filterId === "grayscale") {
      applyGrayscalePixel(data, i);
    } else if (filterId === "sepia") {
      applySepiaPixel(data, i);
    } else if (filterId === "vintage") {
      applyVintagePixel(data, i);
    }
  }
}

async function applyPixelFilterAsync(
  imageData: ImageData,
  filterId: Exclude<ImageFilterId, "none" | "blur" | "vignette">,
  shouldCancel?: () => boolean,
): Promise<void> {
  const { data, width, height } = imageData;
  const rowStride = width * 4;

  for (let row = 0; row < height; row += 1) {
    if (shouldCancel?.()) return;

    const rowStart = row * rowStride;
    const rowEnd = rowStart + rowStride;

    for (let i = rowStart; i < rowEnd; i += 4) {
      if (filterId === "grayscale") {
        applyGrayscalePixel(data, i);
      } else if (filterId === "sepia") {
        applySepiaPixel(data, i);
      } else if (filterId === "vintage") {
        applyVintagePixel(data, i);
      }
    }

    if (row > 0 && row % ROWS_PER_YIELD === 0) {
      await new Promise<void>((resolve) => {
        window.requestAnimationFrame(() => resolve());
      });
    }
  }
}

function applyVignette(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
): void {
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.hypot(width, height) * 0.58;

  const gradient = ctx.createRadialGradient(
    centerX,
    centerY,
    radius * 0.28,
    centerX,
    centerY,
    radius,
  );
  gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
  gradient.addColorStop(0.72, "rgba(0, 0, 0, 0.12)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0.68)");

  ctx.save();
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

export async function renderFilteredCanvasAsync(
  image: HTMLImageElement,
  imageWidth: number,
  imageHeight: number,
  filterId: ImageFilterId,
  canvas: HTMLCanvasElement,
  shouldCancel?: () => boolean,
): Promise<void> {
  canvas.width = imageWidth;
  canvas.height = imageHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context unavailable.");
  }

  ctx.clearRect(0, 0, imageWidth, imageHeight);
  ctx.filter = filterId === "blur" ? `blur(${BLUR_RADIUS_PX}px)` : "none";
  ctx.drawImage(image, 0, 0, imageWidth, imageHeight);
  ctx.filter = "none";

  if (shouldCancel?.()) return;

  if (filterId === "none") {
    return;
  }

  if (filterId === "blur") {
    return;
  }

  if (filterId === "vignette") {
    applyVignette(ctx, imageWidth, imageHeight);
    return;
  }

  const imageData = ctx.getImageData(0, 0, imageWidth, imageHeight);
  await applyPixelFilterAsync(imageData, filterId, shouldCancel);

  if (shouldCancel?.()) return;

  ctx.putImageData(imageData, 0, 0);
}
