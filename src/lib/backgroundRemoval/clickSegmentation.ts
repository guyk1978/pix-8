export const SAM_INPUT_SIZE = 1024;

export interface SamPreprocessResult {
  tensor: Float32Array;
  scale: number;
  resizedWidth: number;
  resizedHeight: number;
}

export function preprocessSamImage(
  imageData: ImageData,
  width: number,
  height: number,
  inputSize = SAM_INPUT_SIZE,
): SamPreprocessResult {
  const scale = inputSize / Math.max(width, height);
  const resizedWidth = Math.round(width * scale);
  const resizedHeight = Math.round(height * scale);
  const plane = inputSize * inputSize;
  const tensor = new Float32Array(plane * 3);

  const mean = [123.675, 116.28, 103.53];
  const std = [58.395, 57.12, 57.375];

  for (let y = 0; y < inputSize; y++) {
    for (let x = 0; x < inputSize; x++) {
      const dst = y * inputSize + x;
      if (x >= resizedWidth || y >= resizedHeight) {
        tensor[dst] = -mean[0] / std[0];
        tensor[plane + dst] = -mean[1] / std[1];
        tensor[plane * 2 + dst] = -mean[2] / std[2];
        continue;
      }

      const srcX = Math.min(width - 1, Math.round(x / scale));
      const srcY = Math.min(height - 1, Math.round(y / scale));
      const offset = (srcY * width + srcX) * 4;

      const r = imageData.data[offset];
      const g = imageData.data[offset + 1];
      const b = imageData.data[offset + 2];

      tensor[dst] = (r - mean[0]) / std[0];
      tensor[plane + dst] = (g - mean[1]) / std[1];
      tensor[plane * 2 + dst] = (b - mean[2]) / std[2];
    }
  }

  return { tensor, scale, resizedWidth, resizedHeight };
}

export function imagePointToSamCoords(
  x: number,
  y: number,
  scale: number,
): [number, number] {
  return [x * scale, y * scale];
}

export function resizeSamMask(
  mask: Float32Array,
  maskWidth: number,
  maskHeight: number,
  targetWidth: number,
  targetHeight: number,
): Float32Array {
  const output = new Float32Array(targetWidth * targetHeight);
  const xRatio = maskWidth / targetWidth;
  const yRatio = maskHeight / targetHeight;

  for (let y = 0; y < targetHeight; y++) {
    const srcY = Math.min(maskHeight - 1, y * yRatio);
    const y0 = Math.floor(srcY);
    const y1 = Math.min(maskHeight - 1, y0 + 1);
    const yLerp = srcY - y0;

    for (let x = 0; x < targetWidth; x++) {
      const srcX = Math.min(maskWidth - 1, x * xRatio);
      const x0 = Math.floor(srcX);
      const x1 = Math.min(maskWidth - 1, x0 + 1);
      const xLerp = srcX - x0;

      const top =
        mask[y0 * maskWidth + x0] * (1 - xLerp) +
        mask[y0 * maskWidth + x1] * xLerp;
      const bottom =
        mask[y1 * maskWidth + x0] * (1 - xLerp) +
        mask[y1 * maskWidth + x1] * xLerp;

      output[y * targetWidth + x] = top * (1 - yLerp) + bottom * yLerp;
    }
  }

  return output;
}

export function mergeClickMaskIntoAdjustments(
  manual: Float32Array,
  clickMask: Float32Array,
  label: 1 | 0,
  strength = 0.92,
): void {
  const sign = label === 1 ? 1 : -1;

  for (let i = 0; i < manual.length; i++) {
    const score = clickMask[i];
    if (score < 0.35) continue;
    const delta = sign * strength * (score - 0.35) / 0.65;
    manual[i] = Math.min(1, Math.max(-1, manual[i] + delta));
  }
}
