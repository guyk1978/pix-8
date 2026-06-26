import { traceRoundRect } from "@/lib/roundCorners";

export interface BorderSettings {
  width: number;
  color: string;
  cornerRadius: number;
}

export function getBorderedCanvasSize(
  imageWidth: number,
  imageHeight: number,
  borderWidth: number,
): { width: number; height: number } {
  return {
    width: imageWidth + borderWidth * 2,
    height: imageHeight + borderWidth * 2,
  };
}

export function renderBorderedCanvas(
  image: HTMLImageElement,
  imageWidth: number,
  imageHeight: number,
  settings: BorderSettings,
  canvas?: HTMLCanvasElement | null,
): HTMLCanvasElement {
  const borderWidth = Math.max(0, Math.round(settings.width));
  const { width: outerWidth, height: outerHeight } = getBorderedCanvasSize(
    imageWidth,
    imageHeight,
    borderWidth,
  );

  const target = canvas ?? document.createElement("canvas");
  target.width = outerWidth;
  target.height = outerHeight;

  const ctx = target.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context unavailable.");
  }

  ctx.clearRect(0, 0, outerWidth, outerHeight);

  if (borderWidth === 0 && settings.cornerRadius === 0) {
    ctx.drawImage(image, 0, 0, imageWidth, imageHeight);
    return target;
  }

  ctx.fillStyle = settings.color;
  traceRoundRect(ctx, 0, 0, outerWidth, outerHeight, settings.cornerRadius);
  ctx.fill();

  const innerRadius = Math.max(0, settings.cornerRadius - borderWidth);

  ctx.save();
  traceRoundRect(
    ctx,
    borderWidth,
    borderWidth,
    imageWidth,
    imageHeight,
    innerRadius,
  );
  ctx.clip();
  ctx.drawImage(image, borderWidth, borderWidth, imageWidth, imageHeight);
  ctx.restore();

  return target;
}
