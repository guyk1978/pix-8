export interface ImageAnnotation {
  id: string;
  x: number;
  y: number;
  label: string;
}

export const ANNOTATION_MARKER_RADIUS = 6;
const LABEL_FONT_SIZE_RATIO = 0.028;
const LABEL_PAD_X = 8;
const LABEL_PAD_Y = 5;

export function createAnnotationId(): string {
  return crypto.randomUUID();
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

export function naturalToDisplayCoords(
  x: number,
  y: number,
  canvas: HTMLCanvasElement,
): { left: number; top: number } {
  const rect = canvas.getBoundingClientRect();
  return {
    left: (x / canvas.width) * rect.width,
    top: (y / canvas.height) * rect.height,
  };
}

export function findAnnotationAtPoint(
  annotations: ImageAnnotation[],
  x: number,
  y: number,
  canvas: HTMLCanvasElement,
  hitRadiusDisplay = 18,
): ImageAnnotation | null {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const hitRadiusNatural = hitRadiusDisplay * scaleX;

  for (let index = annotations.length - 1; index >= 0; index -= 1) {
    const annotation = annotations[index]!;
    const distance = Math.hypot(annotation.x - x, annotation.y - y);
    if (distance <= hitRadiusNatural) {
      return annotation;
    }
  }

  return null;
}

export function drawAnnotation(
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  annotation: ImageAnnotation,
): void {
  const fontSize = Math.max(11, Math.round(canvasWidth * LABEL_FONT_SIZE_RATIO));
  const { x, y, label } = annotation;

  ctx.save();

  ctx.beginPath();
  ctx.arc(x, y, ANNOTATION_MARKER_RADIUS, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(15, 15, 15, 0.9)";
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x, y, 2.5, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(15, 15, 15, 0.9)";
  ctx.fill();

  if (label.trim()) {
    ctx.font = `600 ${fontSize}px Inter, system-ui, sans-serif`;
    const metrics = ctx.measureText(label);
    const boxWidth = metrics.width + LABEL_PAD_X * 2;
    const boxHeight = fontSize + LABEL_PAD_Y * 2;
    const boxX = x + ANNOTATION_MARKER_RADIUS + 6;
    const boxY = y - boxHeight / 2;

    ctx.fillStyle = "rgba(12, 12, 12, 0.88)";
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
    ctx.lineWidth = 1;
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

    ctx.fillStyle = "rgba(255, 255, 255, 0.96)";
    ctx.textBaseline = "middle";
    ctx.fillText(label, boxX + LABEL_PAD_X, boxY + boxHeight / 2);
  }

  ctx.restore();
}

export function drawAnnotations(
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  annotations: ImageAnnotation[],
): void {
  for (const annotation of annotations) {
    drawAnnotation(ctx, canvasWidth, annotation);
  }
}

export function renderAnnotationPreviewCanvas(
  image: HTMLImageElement,
  canvasWidth: number,
  canvasHeight: number,
  annotations: ImageAnnotation[],
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
  drawAnnotations(ctx, canvasWidth, annotations);

  return target;
}
