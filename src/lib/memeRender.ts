export interface MemeSettings {
  topText: string;
  bottomText: string;
}

export const MEME_FONT_FAMILY =
  'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif';

const MEME_FILL = "#ffffff";
const MEME_STROKE = "#000000";
const HORIZONTAL_PADDING_RATIO = 0.05;
const VERTICAL_PADDING_RATIO = 0.04;
const FONT_SIZE_RATIO = 0.1;
const MIN_FONT_SIZE = 14;
const MAX_FONT_SIZE = 120;

function wrapMemeLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const normalized = text.trim().toUpperCase();
  if (!normalized) return [];

  const words = normalized.split(/\s+/);
  const lines: string[] = [];
  let current = words[0] ?? "";

  for (let index = 1; index < words.length; index += 1) {
    const candidate = `${current} ${words[index]}`;
    if (ctx.measureText(candidate).width <= maxWidth) {
      current = candidate;
    } else {
      lines.push(current);
      current = words[index] ?? "";
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines;
}

function getMemeFontSize(canvasWidth: number): number {
  return Math.max(
    MIN_FONT_SIZE,
    Math.min(MAX_FONT_SIZE, Math.round(canvasWidth * FONT_SIZE_RATIO)),
  );
}

function drawMemeTextBlock(
  ctx: CanvasRenderingContext2D,
  lines: string[],
  centerX: number,
  startY: number,
  fontSize: number,
): void {
  if (lines.length === 0) return;

  const lineHeight = fontSize * 1.15;
  const strokeWidth = Math.max(2, Math.round(fontSize * 0.08));

  ctx.font = `bold ${fontSize}px ${MEME_FONT_FAMILY}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.lineJoin = "round";
  ctx.miterLimit = 2;
  ctx.lineWidth = strokeWidth;
  ctx.strokeStyle = MEME_STROKE;
  ctx.fillStyle = MEME_FILL;

  lines.forEach((line, index) => {
    const y = startY + index * lineHeight;
    ctx.strokeText(line, centerX, y);
    ctx.fillText(line, centerX, y);
  });
}

export function drawMemeText(
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  settings: MemeSettings,
): void {
  const fontSize = getMemeFontSize(canvasWidth);
  const maxTextWidth = canvasWidth * (1 - HORIZONTAL_PADDING_RATIO * 2);
  const horizontalPadding = canvasWidth * HORIZONTAL_PADDING_RATIO;
  const verticalPadding = canvasHeight * VERTICAL_PADDING_RATIO;
  const centerX = canvasWidth / 2;
  const lineHeight = fontSize * 1.15;

  ctx.font = `bold ${fontSize}px ${MEME_FONT_FAMILY}`;

  const topLines = wrapMemeLines(ctx, settings.topText, maxTextWidth);
  const bottomLines = wrapMemeLines(ctx, settings.bottomText, maxTextWidth);

  drawMemeTextBlock(
    ctx,
    topLines,
    centerX,
    verticalPadding,
    fontSize,
  );

  if (bottomLines.length > 0) {
    const blockHeight = bottomLines.length * lineHeight;
    const startY = canvasHeight - verticalPadding - blockHeight;
    drawMemeTextBlock(ctx, bottomLines, centerX, startY, fontSize);
  }
}

export function renderMemeCanvas(
  image: CanvasImageSource,
  width: number,
  height: number,
  settings: MemeSettings,
  targetCanvas: HTMLCanvasElement | null,
): void {
  if (!targetCanvas) return;

  const ctx = targetCanvas.getContext("2d");
  if (!ctx) return;

  targetCanvas.width = width;
  targetCanvas.height = height;

  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(image, 0, 0, width, height);
  drawMemeText(ctx, width, height, settings);
}
