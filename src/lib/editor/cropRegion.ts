import type { CropRegion } from "@/hooks/useImageProcessor";

/** Crop region as fractions (0–1) of the current composed image size. */
export interface RelativeCropRegion {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function createInitialRelativeCropRegion(): RelativeCropRegion {
  const margin = 0.05;
  return {
    x: margin,
    y: margin,
    width: 1 - margin * 2,
    height: 1 - margin * 2,
  };
}

export function resolveRelativeCropRegion(
  relative: RelativeCropRegion,
  imageWidth: number,
  imageHeight: number,
): CropRegion {
  const x = Math.round(relative.x * imageWidth);
  const y = Math.round(relative.y * imageHeight);
  const width = Math.max(1, Math.round(relative.width * imageWidth));
  const height = Math.max(1, Math.round(relative.height * imageHeight));

  const clampedX = Math.max(0, Math.min(x, imageWidth - 1));
  const clampedY = Math.max(0, Math.min(y, imageHeight - 1));
  const maxW = imageWidth - clampedX;
  const maxH = imageHeight - clampedY;

  return {
    x: clampedX,
    y: clampedY,
    width: Math.min(width, maxW),
    height: Math.min(height, maxH),
  };
}

export function relativeCropToPercent(region: RelativeCropRegion): {
  x: number;
  y: number;
  width: number;
  height: number;
} {
  return {
    x: Math.round(region.x * 100),
    y: Math.round(region.y * 100),
    width: Math.round(region.width * 100),
    height: Math.round(region.height * 100),
  };
}

export function percentToRelativeCrop(
  x: number,
  y: number,
  width: number,
  height: number,
): RelativeCropRegion {
  return {
    x: x / 100,
    y: y / 100,
    width: width / 100,
    height: height / 100,
  };
}
