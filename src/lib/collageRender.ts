export type CollageLayoutId =
  | "vertical"
  | "horizontal"
  | "grid-2x1"
  | "grid-2x2"
  | "grid-3x3";

export const COLLAGE_LAYOUT_IDS: CollageLayoutId[] = [
  "vertical",
  "horizontal",
  "grid-2x1",
  "grid-2x2",
  "grid-3x3",
];

export interface CollageSettings {
  layout: CollageLayoutId;
  /** Gap between cells in pixels */
  gap: number;
  backgroundColor: string;
}

export const DEFAULT_COLLAGE_SETTINGS: CollageSettings = {
  layout: "grid-2x2",
  gap: 12,
  backgroundColor: "#121212",
};

export const COLLAGE_CELL_SIZE = 360;

export interface CollageGrid {
  cols: number;
  rows: number;
  /** Number of image slots to render */
  slots: number;
}

export function getCollageGrid(
  layout: CollageLayoutId,
  imageCount: number,
): CollageGrid {
  const count = Math.max(imageCount, 1);

  switch (layout) {
    case "vertical":
      return { cols: 1, rows: count, slots: count };
    case "horizontal":
      return { cols: count, rows: 1, slots: count };
    case "grid-2x1":
      return {
        cols: 2,
        rows: Math.max(1, Math.ceil(count / 2)),
        slots: count,
      };
    case "grid-2x2":
      return {
        cols: 2,
        rows: 2,
        slots: Math.min(count, 4),
      };
    case "grid-3x3":
      return {
        cols: 3,
        rows: 3,
        slots: Math.min(count, 9),
      };
    default:
      return { cols: 2, rows: 2, slots: Math.min(count, 4) };
  }
}

export function getCollageCanvasSize(
  grid: CollageGrid,
  gap: number,
  cellSize: number = COLLAGE_CELL_SIZE,
): { width: number; height: number } {
  return {
    width: grid.cols * cellSize + Math.max(0, grid.cols - 1) * gap,
    height: grid.rows * cellSize + Math.max(0, grid.rows - 1) * gap,
  };
}

function drawImageCover(
  ctx: CanvasRenderingContext2D,
  image: CanvasImageSource,
  x: number,
  y: number,
  width: number,
  height: number,
): void {
  const sourceWidth =
    "naturalWidth" in image ? image.naturalWidth : (image as ImageBitmap).width;
  const sourceHeight =
    "naturalHeight" in image
      ? image.naturalHeight
      : (image as ImageBitmap).height;

  if (!sourceWidth || !sourceHeight) return;

  const scale = Math.max(width / sourceWidth, height / sourceHeight);
  const drawWidth = sourceWidth * scale;
  const drawHeight = sourceHeight * scale;
  const offsetX = x + (width - drawWidth) / 2;
  const offsetY = y + (height - drawHeight) / 2;

  ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
}

export function drawCollage(
  ctx: CanvasRenderingContext2D,
  images: CanvasImageSource[],
  settings: CollageSettings,
  cellSize: number = COLLAGE_CELL_SIZE,
): { width: number; height: number } {
  const grid = getCollageGrid(settings.layout, images.length);
  const { width, height } = getCollageCanvasSize(grid, settings.gap, cellSize);

  const canvas = ctx.canvas;
  canvas.width = width;
  canvas.height = height;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = settings.backgroundColor;
  ctx.fillRect(0, 0, width, height);

  const slots = Math.min(grid.slots, images.length);

  for (let index = 0; index < slots; index += 1) {
    const col = index % grid.cols;
    const row = Math.floor(index / grid.cols);
    const x = col * (cellSize + settings.gap);
    const y = row * (cellSize + settings.gap);
    const image = images[index];

    if (!image) continue;

    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, cellSize, cellSize);
    ctx.clip();
    drawImageCover(ctx, image, x, y, cellSize, cellSize);
    ctx.restore();
  }

  return { width, height };
}

export function loadImageElement(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to load image."));
    image.src = url;
  });
}
