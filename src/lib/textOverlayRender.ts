export type TextAlign = "left" | "center" | "right";

export interface TextOverlaySettings {
  text: string;
  fontFamily: string;
  fontSizePercent: number;
  color: string;
  align: TextAlign;
  shadow: boolean;
  backgroundBox: boolean;
  backgroundOpacity: number;
  x: number;
  y: number;
}

export interface TextBlockMetrics {
  lines: string[];
  fontSize: number;
  lineHeight: number;
  maxWidth: number;
  totalHeight: number;
  boxWidth: number;
  boxHeight: number;
}

export function measureTextBlock(
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  settings: TextOverlaySettings,
): TextBlockMetrics {
  const fontSize = Math.max(
    12,
    Math.round(canvasWidth * (settings.fontSizePercent / 100)),
  );
  const lineHeight = fontSize * 1.3;
  const lines = settings.text.split("\n").map((line) => line.trimEnd());
  const displayLines = lines.length > 0 ? lines : [""];

  ctx.font = `${fontSize}px ${settings.fontFamily}`;

  const maxWidth = Math.max(
    ...displayLines.map((line) => ctx.measureText(line || " ").width),
    1,
  );
  const totalHeight = displayLines.length * lineHeight;
  const padX = fontSize * 0.5;
  const padY = fontSize * 0.35;

  return {
    lines: displayLines,
    fontSize,
    lineHeight,
    maxWidth,
    totalHeight,
    boxWidth: maxWidth + padX * 2,
    boxHeight: totalHeight + padY * 2,
  };
}

function getAnchorX(
  align: TextAlign,
  centerX: number,
  maxWidth: number,
): number {
  switch (align) {
    case "left":
      return centerX - maxWidth / 2;
    case "right":
      return centerX + maxWidth / 2;
    default:
      return centerX;
  }
}

export function drawTextOverlay(
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  settings: TextOverlaySettings,
): void {
  if (!settings.text.trim()) return;

  const metrics = measureTextBlock(ctx, canvasWidth, settings);
  const anchorX = getAnchorX(settings.align, settings.x, metrics.maxWidth);
  const startY =
    settings.y - metrics.totalHeight / 2 + metrics.lineHeight / 2;

  if (settings.backgroundBox) {
    let boxX = settings.x - metrics.boxWidth / 2;
    if (settings.align === "left") {
      boxX = anchorX - metrics.fontSize * 0.5;
    } else if (settings.align === "right") {
      boxX = anchorX - metrics.boxWidth + metrics.fontSize * 0.5;
    }

    const boxY = settings.y - metrics.boxHeight / 2;

    ctx.save();
    ctx.fillStyle = `rgba(0, 0, 0, ${settings.backgroundOpacity})`;
    ctx.fillRect(boxX, boxY, metrics.boxWidth, metrics.boxHeight);
    ctx.restore();
  }

  ctx.save();
  ctx.font = `${metrics.fontSize}px ${settings.fontFamily}`;
  ctx.fillStyle = settings.color;
  ctx.textAlign = settings.align;
  ctx.textBaseline = "middle";

  if (settings.shadow) {
    ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
    ctx.shadowBlur = metrics.fontSize * 0.2;
    ctx.shadowOffsetX = metrics.fontSize * 0.04;
    ctx.shadowOffsetY = metrics.fontSize * 0.04;
  }

  metrics.lines.forEach((line, index) => {
    const y = startY + index * metrics.lineHeight;
    ctx.fillText(line, anchorX, y);
  });

  ctx.restore();
}

export function renderTextOverlayCanvas(
  image: HTMLImageElement,
  canvasWidth: number,
  canvasHeight: number,
  settings: TextOverlaySettings,
  canvas?: HTMLCanvasElement | null,
): HTMLCanvasElement {
  const target = canvas ?? document.createElement("canvas");
  target.width = canvasWidth;
  target.height = canvasHeight;

  const ctx = target.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context unavailable.");
  }

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
  drawTextOverlay(ctx, canvasWidth, canvasHeight, settings);

  return target;
}

export function displayToNaturalCoords(
  clientX: number,
  clientY: number,
  canvas: HTMLCanvasElement,
): { x: number; y: number } {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  const x = Math.round((clientX - rect.left) * scaleX);
  const y = Math.round((clientY - rect.top) * scaleY);

  return {
    x: Math.max(0, Math.min(canvas.width, x)),
    y: Math.max(0, Math.min(canvas.height, y)),
  };
}
