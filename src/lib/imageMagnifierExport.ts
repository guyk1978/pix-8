import type { MagnifierViewState, ViewportRect } from "@/lib/imageMagnifierView";
import { getImageViewportRect } from "@/lib/imageMagnifierView";
import {
  copyCanvasToCanvas,
  renderRefinedCanvasFromSource,
  type RefinementSettings,
} from "@/lib/sharpenRender";

export interface MagnifierResultSnapshot {
  viewState: MagnifierViewState;
  refinement: RefinementSettings;
  viewportWidth: number;
  viewportHeight: number;
}

export function cropViewportFromCanvas(
  sourceCanvas: HTMLCanvasElement,
  viewportRect: ViewportRect,
  targetCanvas?: HTMLCanvasElement | null,
): HTMLCanvasElement {
  const cropX = Math.max(0, Math.round(viewportRect.x));
  const cropY = Math.max(0, Math.round(viewportRect.y));
  const cropWidth = Math.max(
    1,
    Math.min(
      Math.round(viewportRect.width),
      sourceCanvas.width - cropX,
    ),
  );
  const cropHeight = Math.max(
    1,
    Math.min(
      Math.round(viewportRect.height),
      sourceCanvas.height - cropY,
    ),
  );

  const target = targetCanvas ?? document.createElement("canvas");
  target.width = cropWidth;
  target.height = cropHeight;

  const ctx = target.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context unavailable.");
  }

  ctx.clearRect(0, 0, cropWidth, cropHeight);
  ctx.drawImage(
    sourceCanvas,
    cropX,
    cropY,
    cropWidth,
    cropHeight,
    0,
    0,
    cropWidth,
    cropHeight,
  );

  return target;
}

export function buildMagnifierExportCanvas(
  sourceCanvas: HTMLCanvasElement,
  snapshot: MagnifierResultSnapshot,
  imageWidth: number,
  imageHeight: number,
  exportCanvas?: HTMLCanvasElement | null,
): HTMLCanvasElement {
  const fullCanvas = document.createElement("canvas");
  fullCanvas.width = imageWidth;
  fullCanvas.height = imageHeight;

  const useRefinement =
    snapshot.refinement.enabled && snapshot.refinement.intensity > 0;

  if (useRefinement) {
    renderRefinedCanvasFromSource(
      sourceCanvas,
      snapshot.refinement,
      fullCanvas,
    );
  } else {
    copyCanvasToCanvas(sourceCanvas, fullCanvas);
  }

  const viewportRect = getImageViewportRect(
    snapshot.viewState,
    snapshot.viewportWidth,
    snapshot.viewportHeight,
    imageWidth,
    imageHeight,
  );

  return cropViewportFromCanvas(fullCanvas, viewportRect, exportCanvas);
}

export function snapshotsMatch(
  current: MagnifierResultSnapshot,
  locked: MagnifierResultSnapshot,
): boolean {
  return (
    JSON.stringify(current.viewState) === JSON.stringify(locked.viewState) &&
    JSON.stringify(current.refinement) === JSON.stringify(locked.refinement) &&
    current.viewportWidth === locked.viewportWidth &&
    current.viewportHeight === locked.viewportHeight
  );
}

export function createResultSnapshot(
  viewState: MagnifierViewState,
  refinement: RefinementSettings,
  viewportWidth: number,
  viewportHeight: number,
): MagnifierResultSnapshot {
  return {
    viewState: { ...viewState },
    refinement: { ...refinement },
    viewportWidth,
    viewportHeight,
  };
}
