export interface OverlayTransform {
  x: number;
  y: number;
  /** Fraction of min(canvas width, height), e.g. 0.2 = 20% */
  scale: number;
  rotation: number;
  opacity: number;
}

export const DEFAULT_OVERLAY_TRANSFORM: OverlayTransform = {
  x: 0,
  y: 0,
  scale: 0.25,
  rotation: 0,
  opacity: 0.6,
};

export function renderImageOverlayCanvas(
  baseImage: HTMLImageElement,
  canvasWidth: number,
  canvasHeight: number,
  overlayImage: HTMLImageElement | null,
  transform: OverlayTransform,
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
  ctx.drawImage(baseImage, 0, 0, canvasWidth, canvasHeight);

  if (overlayImage) {
    const centerX = transform.x > 0 ? transform.x : canvasWidth / 2;
    const centerY = transform.y > 0 ? transform.y : canvasHeight / 2;
    const size = Math.min(canvasWidth, canvasHeight) * transform.scale;

    ctx.save();
    ctx.globalAlpha = transform.opacity;
    ctx.translate(centerX, centerY);
    ctx.rotate((transform.rotation * Math.PI) / 180);
    ctx.drawImage(overlayImage, -size / 2, -size / 2, size, size);
    ctx.restore();
  }

  return target;
}
