export const FRAME_PADDING_PX = 20;
export const WORKSPACE_FILL_RATIO = 0.88;
export const MAX_REFERENCE_DIMENSION = 1920;

export interface AdaptiveFrameLayout {
  frameWidth: number;
  frameHeight: number;
  contentWidth: number;
  contentHeight: number;
  baseFitScale: number;
}

const EMPTY_FRAME: AdaptiveFrameLayout = {
  frameWidth: 0,
  frameHeight: 0,
  contentWidth: 0,
  contentHeight: 0,
  baseFitScale: 1,
};

export function computeAdaptiveFrameLayout(
  imageWidth: number,
  imageHeight: number,
  workspaceWidth: number,
  workspaceHeight: number,
): AdaptiveFrameLayout {
  if (imageWidth <= 0 || imageHeight <= 0) {
    return EMPTY_FRAME;
  }

  let effectiveWorkspaceWidth = workspaceWidth;
  let effectiveWorkspaceHeight = workspaceHeight;

  if (effectiveWorkspaceWidth <= 0 || effectiveWorkspaceHeight <= 0) {
    if (typeof window !== "undefined") {
      effectiveWorkspaceWidth = Math.round(window.innerWidth * 0.55);
      effectiveWorkspaceHeight = Math.round(
        (window.innerHeight - 100) * 0.72,
      );
    } else {
      effectiveWorkspaceWidth = 800;
      effectiveWorkspaceHeight = 600;
    }
  }

  const matteInset = FRAME_PADDING_PX * 2;
  const targetWidth = Math.max(
    0,
    effectiveWorkspaceWidth * WORKSPACE_FILL_RATIO - matteInset,
  );
  const targetHeight = Math.max(
    0,
    effectiveWorkspaceHeight * WORKSPACE_FILL_RATIO - matteInset,
  );

  const longestEdge = Math.max(imageWidth, imageHeight);
  const referenceCap =
    longestEdge > MAX_REFERENCE_DIMENSION
      ? MAX_REFERENCE_DIMENSION / longestEdge
      : 1;

  const fitScale = Math.min(
    targetWidth / imageWidth,
    targetHeight / imageHeight,
    referenceCap,
  );

  const contentWidth = imageWidth * fitScale;
  const contentHeight = imageHeight * fitScale;

  return {
    contentWidth,
    contentHeight,
    frameWidth: contentWidth + matteInset,
    frameHeight: contentHeight + matteInset,
    baseFitScale: fitScale,
  };
}
