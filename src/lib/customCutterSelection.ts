import type { CropRegion } from "@/hooks/useImageProcessor";

export type CustomCutterDragMode =
  | "draw"
  | "move"
  | "resize-nw"
  | "resize-ne"
  | "resize-sw"
  | "resize-se";

export const MIN_SELECTION_SIZE = 4;

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function clampCrop(
  crop: CropRegion,
  imageWidth: number,
  imageHeight: number,
): CropRegion {
  const width = clamp(crop.width, MIN_SELECTION_SIZE, imageWidth);
  const height = clamp(crop.height, MIN_SELECTION_SIZE, imageHeight);
  const x = clamp(crop.x, 0, imageWidth - width);
  const y = clamp(crop.y, 0, imageHeight - height);

  return {
    x: Math.round(x),
    y: Math.round(y),
    width: Math.round(width),
    height: Math.round(height),
  };
}

export function rectFromPoints(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
): CropRegion {
  const x = Math.min(startX, endX);
  const y = Math.min(startY, endY);
  const width = Math.abs(endX - startX);
  const height = Math.abs(endY - startY);

  return { x, y, width, height };
}

export function naturalToDisplayCrop(
  crop: CropRegion,
  scale: number,
): CropRegion {
  return {
    x: crop.x * scale,
    y: crop.y * scale,
    width: crop.width * scale,
    height: crop.height * scale,
  };
}

export function getDisplayScale(
  naturalWidth: number,
  displayWidth: number,
): number {
  if (naturalWidth <= 0 || displayWidth <= 0) return 1;
  return displayWidth / naturalWidth;
}

export function clientPointToNatural(
  clientX: number,
  clientY: number,
  imageRect: DOMRect,
  scale: number,
): { x: number; y: number } {
  return {
    x: (clientX - imageRect.left) / scale,
    y: (clientY - imageRect.top) / scale,
  };
}

const HANDLE_RADIUS = 10;

export function hitTestSelection(
  pointX: number,
  pointY: number,
  crop: CropRegion,
  scale: number,
): CustomCutterDragMode | null {
  const display = naturalToDisplayCrop(crop, scale);
  const handles: { mode: CustomCutterDragMode; x: number; y: number }[] = [
    { mode: "resize-nw", x: display.x, y: display.y },
    { mode: "resize-ne", x: display.x + display.width, y: display.y },
    { mode: "resize-sw", x: display.x, y: display.y + display.height },
    { mode: "resize-se", x: display.x + display.width, y: display.y + display.height },
  ];

  for (const handle of handles) {
    const dx = pointX - handle.x;
    const dy = pointY - handle.y;
    if (Math.hypot(dx, dy) <= HANDLE_RADIUS) {
      return handle.mode;
    }
  }

  if (
    pointX >= display.x &&
    pointX <= display.x + display.width &&
    pointY >= display.y &&
    pointY <= display.y + display.height
  ) {
    return "move";
  }

  return null;
}

export function applyDragDelta(
  mode: CustomCutterDragMode,
  startCrop: CropRegion,
  deltaX: number,
  deltaY: number,
  imageWidth: number,
  imageHeight: number,
): CropRegion {
  let next = { ...startCrop };

  if (mode === "move") {
    next.x = startCrop.x + deltaX;
    next.y = startCrop.y + deltaY;
  } else {
    if (mode.includes("e")) {
      next.width = startCrop.width + deltaX;
    }
    if (mode.includes("w")) {
      next.x = startCrop.x + deltaX;
      next.width = startCrop.width - deltaX;
    }
    if (mode.includes("s")) {
      next.height = startCrop.height + deltaY;
    }
    if (mode.includes("n")) {
      next.y = startCrop.y + deltaY;
      next.height = startCrop.height - deltaY;
    }

    if (next.width < MIN_SELECTION_SIZE) next.width = MIN_SELECTION_SIZE;
    if (next.height < MIN_SELECTION_SIZE) next.height = MIN_SELECTION_SIZE;
  }

  return clampCrop(next, imageWidth, imageHeight);
}
