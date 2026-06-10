export interface LightAdjustSettings {
  /** -50 to 50 */
  brightness: number;
  /** 50 to 150, where 100 is neutral */
  contrast: number;
}

export const DEFAULT_LIGHT_ADJUST_SETTINGS: LightAdjustSettings = {
  brightness: 0,
  contrast: 100,
};

function clampChannel(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function adjustChannel(
  value: number,
  contrast: number,
  brightness: number,
): number {
  const contrastFactor = contrast / 100;
  const brightnessOffset = brightness * 2.55;
  return clampChannel((value - 128) * contrastFactor + 128 + brightnessOffset);
}

export function applyLightAdjust(
  imageData: ImageData,
  settings: LightAdjustSettings,
): ImageData {
  const { data } = imageData;
  const output = new ImageData(
    new Uint8ClampedArray(data),
    imageData.width,
    imageData.height,
  );

  for (let i = 0; i < output.data.length; i += 4) {
    output.data[i] = adjustChannel(
      data[i],
      settings.contrast,
      settings.brightness,
    );
    output.data[i + 1] = adjustChannel(
      data[i + 1],
      settings.contrast,
      settings.brightness,
    );
    output.data[i + 2] = adjustChannel(
      data[i + 2],
      settings.contrast,
      settings.brightness,
    );
  }

  return output;
}

export function renderLightAdjustedCanvas(
  image: HTMLImageElement,
  imageWidth: number,
  imageHeight: number,
  settings: LightAdjustSettings,
  canvas?: HTMLCanvasElement | null,
): HTMLCanvasElement {
  const target = canvas ?? document.createElement("canvas");
  target.width = imageWidth;
  target.height = imageHeight;

  const ctx = target.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context unavailable.");
  }

  ctx.clearRect(0, 0, imageWidth, imageHeight);
  ctx.drawImage(image, 0, 0, imageWidth, imageHeight);

  const imageData = ctx.getImageData(0, 0, imageWidth, imageHeight);
  ctx.putImageData(applyLightAdjust(imageData, settings), 0, 0);

  return target;
}
