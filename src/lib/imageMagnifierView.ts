export const MIN_USER_ZOOM = 1;
export const MAX_USER_ZOOM = 32;

export interface MagnifierViewState {
  translateX: number;
  translateY: number;
  userZoom: number;
  fitScale: number;
}

export interface ViewportRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function computeFitScale(
  containerWidth: number,
  containerHeight: number,
  imageWidth: number,
  imageHeight: number,
): number {
  if (
    containerWidth <= 0 ||
    containerHeight <= 0 ||
    imageWidth <= 0 ||
    imageHeight <= 0
  ) {
    return 1;
  }

  return Math.min(
    containerWidth / imageWidth,
    containerHeight / imageHeight,
  );
}

export function getDisplayScale(state: MagnifierViewState): number {
  return state.fitScale * state.userZoom;
}

export function getCenteredTranslate(
  containerWidth: number,
  containerHeight: number,
  imageWidth: number,
  imageHeight: number,
  displayScale: number,
): Pick<MagnifierViewState, "translateX" | "translateY"> {
  const scaledWidth = imageWidth * displayScale;
  const scaledHeight = imageHeight * displayScale;

  return {
    translateX: (containerWidth - scaledWidth) / 2,
    translateY: (containerHeight - scaledHeight) / 2,
  };
}

export function createInitialViewState(
  containerWidth: number,
  containerHeight: number,
  imageWidth: number,
  imageHeight: number,
): MagnifierViewState {
  const fitScale = computeFitScale(
    containerWidth,
    containerHeight,
    imageWidth,
    imageHeight,
  );
  const { translateX, translateY } = getCenteredTranslate(
    containerWidth,
    containerHeight,
    imageWidth,
    imageHeight,
    fitScale,
  );

  return {
    fitScale,
    userZoom: MIN_USER_ZOOM,
    translateX,
    translateY,
  };
}

export function zoomAtPoint(
  state: MagnifierViewState,
  containerWidth: number,
  containerHeight: number,
  imageWidth: number,
  imageHeight: number,
  pointerX: number,
  pointerY: number,
  nextUserZoom: number,
): Pick<MagnifierViewState, "translateX" | "translateY" | "userZoom"> {
  const clampedZoom = clamp(nextUserZoom, MIN_USER_ZOOM, MAX_USER_ZOOM);
  const oldScale = getDisplayScale(state);
  const newScale = state.fitScale * clampedZoom;
  const ratio = newScale / oldScale;

  let translateX = pointerX - (pointerX - state.translateX) * ratio;
  let translateY = pointerY - (pointerY - state.translateY) * ratio;

  if (clampedZoom <= MIN_USER_ZOOM) {
    const centered = getCenteredTranslate(
      containerWidth,
      containerHeight,
      imageWidth,
      imageHeight,
      newScale,
    );
    translateX = centered.translateX;
    translateY = centered.translateY;
  }

  return {
    translateX,
    translateY,
    userZoom: clampedZoom,
  };
}

export function panView(
  state: MagnifierViewState,
  deltaX: number,
  deltaY: number,
): Pick<MagnifierViewState, "translateX" | "translateY"> {
  return {
    translateX: state.translateX + deltaX,
    translateY: state.translateY + deltaY,
  };
}

export function centerOnImagePoint(
  state: MagnifierViewState,
  containerWidth: number,
  containerHeight: number,
  imageX: number,
  imageY: number,
): Pick<MagnifierViewState, "translateX" | "translateY"> {
  const scale = getDisplayScale(state);

  return {
    translateX: containerWidth / 2 - imageX * scale,
    translateY: containerHeight / 2 - imageY * scale,
  };
}

export function getImageViewportRect(
  state: MagnifierViewState,
  containerWidth: number,
  containerHeight: number,
  imageWidth: number,
  imageHeight: number,
): ViewportRect {
  const scale = getDisplayScale(state);
  const x = clamp((0 - state.translateX) / scale, 0, imageWidth);
  const y = clamp((0 - state.translateY) / scale, 0, imageHeight);
  const right = clamp(
    (containerWidth - state.translateX) / scale,
    0,
    imageWidth,
  );
  const bottom = clamp(
    (containerHeight - state.translateY) / scale,
    0,
    imageHeight,
  );

  return {
    x,
    y,
    width: Math.max(0, right - x),
    height: Math.max(0, bottom - y),
  };
}

export function imagePointFromClient(
  clientX: number,
  clientY: number,
  container: HTMLElement,
  state: MagnifierViewState,
): { x: number; y: number } {
  const rect = container.getBoundingClientRect();
  const localX = clientX - rect.left;
  const localY = clientY - rect.top;
  const scale = getDisplayScale(state);

  return {
    x: (localX - state.translateX) / scale,
    y: (localY - state.translateY) / scale,
  };
}
