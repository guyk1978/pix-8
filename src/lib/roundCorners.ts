export function clampCornerRadius(
  radius: number,
  width: number,
  height: number,
): number {
  if (!Number.isFinite(radius) || radius <= 0) return 0;
  return Math.min(Math.round(radius), Math.floor(Math.min(width, height) / 2));
}

export function traceRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
): void {
  const r = clampCornerRadius(radius, width, height);

  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

/**
 * Clips the source canvas to a rounded rectangle on a fresh transparent canvas.
 */
export function applyCornerRadiusToCanvas(
  source: HTMLCanvasElement,
  radius: number,
  target?: HTMLCanvasElement | null,
): HTMLCanvasElement {
  const clamped = clampCornerRadius(radius, source.width, source.height);
  if (clamped === 0) return source;

  const canvas = target ?? document.createElement("canvas");
  canvas.width = source.width;
  canvas.height = source.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context unavailable.");
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  traceRoundRect(ctx, 0, 0, canvas.width, canvas.height, clamped);
  ctx.clip();
  ctx.drawImage(source, 0, 0);
  ctx.restore();

  return canvas;
}
