export interface CanvasViewportMetrics {
  viewportWidth: number;
  viewportHeight: number;
  imageWidth: number;
  imageHeight: number;
  zoom: number;
}

export interface FixedViewportLayout {
  fitScale: number;
  displayScale: number;
  scaledWidth: number;
  scaledHeight: number;
  canPan: boolean;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function computeFitScale(
  viewportWidth: number,
  viewportHeight: number,
  imageWidth: number,
  imageHeight: number,
): number {
  if (
    viewportWidth <= 0 ||
    viewportHeight <= 0 ||
    imageWidth <= 0 ||
    imageHeight <= 0
  ) {
    return 1;
  }

  return Math.min(
    viewportWidth / imageWidth,
    viewportHeight / imageHeight,
  );
}

export function computeFixedViewportLayout(
  metrics: CanvasViewportMetrics,
): FixedViewportLayout {
  const fitScale = computeFitScale(
    metrics.viewportWidth,
    metrics.viewportHeight,
    metrics.imageWidth,
    metrics.imageHeight,
  );
  const displayScale = fitScale * metrics.zoom;
  const scaledWidth = metrics.imageWidth * displayScale;
  const scaledHeight = metrics.imageHeight * displayScale;

  return {
    fitScale,
    displayScale,
    scaledWidth,
    scaledHeight,
    canPan:
      scaledWidth > metrics.viewportWidth + 0.5 ||
      scaledHeight > metrics.viewportHeight + 0.5,
  };
}

export function getCenteredTranslate(
  viewportWidth: number,
  viewportHeight: number,
  scaledWidth: number,
  scaledHeight: number,
): { translateX: number; translateY: number } {
  return {
    translateX: (viewportWidth - scaledWidth) / 2,
    translateY: (viewportHeight - scaledHeight) / 2,
  };
}

export function clampPanTranslate(
  translateX: number,
  translateY: number,
  viewportWidth: number,
  viewportHeight: number,
  scaledWidth: number,
  scaledHeight: number,
): { translateX: number; translateY: number } {
  let minX: number;
  let maxX: number;
  let minY: number;
  let maxY: number;

  if (scaledWidth <= viewportWidth) {
    const centeredX = (viewportWidth - scaledWidth) / 2;
    minX = maxX = centeredX;
  } else {
    minX = viewportWidth - scaledWidth;
    maxX = 0;
  }

  if (scaledHeight <= viewportHeight) {
    const centeredY = (viewportHeight - scaledHeight) / 2;
    minY = maxY = centeredY;
  } else {
    minY = viewportHeight - scaledHeight;
    maxY = 0;
  }

  return {
    translateX: clamp(translateX, minX, maxX),
    translateY: clamp(translateY, minY, maxY),
  };
}

export function panTranslate(
  translateX: number,
  translateY: number,
  deltaX: number,
  deltaY: number,
  viewportWidth: number,
  viewportHeight: number,
  scaledWidth: number,
  scaledHeight: number,
): { translateX: number; translateY: number } {
  return clampPanTranslate(
    translateX + deltaX,
    translateY + deltaY,
    viewportWidth,
    viewportHeight,
    scaledWidth,
    scaledHeight,
  );
}
