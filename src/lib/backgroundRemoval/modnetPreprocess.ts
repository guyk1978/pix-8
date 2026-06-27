/** MODNet portrait matting — resize shorter side to 512, dimensions divisible by 32. */
export function modnetInferenceDimensions(
  width: number,
  height: number,
  inputSize = 512,
): { inferenceWidth: number; inferenceHeight: number; scaleX: number; scaleY: number } {
  let inferenceWidth = width;
  let inferenceHeight = height;

  if (Math.max(width, height) < inputSize || Math.min(width, height) > inputSize) {
    if (width >= height) {
      inferenceHeight = inputSize;
      inferenceWidth = Math.round((width / height) * inputSize);
    } else {
      inferenceWidth = inputSize;
      inferenceHeight = Math.round((height / width) * inputSize);
    }
  }

  inferenceWidth -= inferenceWidth % 32;
  inferenceHeight -= inferenceHeight % 32;
  inferenceWidth = Math.max(32, inferenceWidth);
  inferenceHeight = Math.max(32, inferenceHeight);

  return {
    inferenceWidth,
    inferenceHeight,
    scaleX: inferenceWidth / width,
    scaleY: inferenceHeight / height,
  };
}

export function imageDataToModnetTensor(
  imageData: ImageData,
  inferenceWidth: number,
  inferenceHeight: number,
  mean = 0.5,
  std = 0.5,
): Float32Array {
  const { data, width, height } = imageData;
  const plane = inferenceWidth * inferenceHeight;
  const tensor = new Float32Array(plane * 3);

  for (let y = 0; y < inferenceHeight; y++) {
    const srcY = Math.min(height - 1, Math.round(y / (inferenceHeight / height)));
    for (let x = 0; x < inferenceWidth; x++) {
      const srcX = Math.min(width - 1, Math.round(x / (inferenceWidth / width)));
      const srcOffset = (srcY * width + srcX) * 4;
      const dst = y * inferenceWidth + x;

      const r = data[srcOffset] / 255;
      const g = data[srcOffset + 1] / 255;
      const b = data[srcOffset + 2] / 255;

      tensor[dst] = (r - mean) / std;
      tensor[plane + dst] = (g - mean) / std;
      tensor[plane * 2 + dst] = (b - mean) / std;
    }
  }

  return tensor;
}

export function resizeMatteBilinear(
  matte: Float32Array,
  sourceWidth: number,
  sourceHeight: number,
  targetWidth: number,
  targetHeight: number,
): Float32Array {
  const output = new Float32Array(targetWidth * targetHeight);
  const xRatio = sourceWidth / targetWidth;
  const yRatio = sourceHeight / targetHeight;

  for (let y = 0; y < targetHeight; y++) {
    const srcY = Math.min(sourceHeight - 1, y * yRatio);
    const y0 = Math.floor(srcY);
    const y1 = Math.min(sourceHeight - 1, y0 + 1);
    const yLerp = srcY - y0;

    for (let x = 0; x < targetWidth; x++) {
      const srcX = Math.min(sourceWidth - 1, x * xRatio);
      const x0 = Math.floor(srcX);
      const x1 = Math.min(sourceWidth - 1, x0 + 1);
      const xLerp = srcX - x0;

      const top =
        matte[y0 * sourceWidth + x0] * (1 - xLerp) +
        matte[y0 * sourceWidth + x1] * xLerp;
      const bottom =
        matte[y1 * sourceWidth + x0] * (1 - xLerp) +
        matte[y1 * sourceWidth + x1] * xLerp;

      output[y * targetWidth + x] = top * (1 - yLerp) + bottom * yLerp;
    }
  }

  return output;
}
