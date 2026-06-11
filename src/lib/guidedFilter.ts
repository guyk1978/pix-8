function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function boxFilter(
  source: Float32Array,
  width: number,
  height: number,
  radius: number,
): Float32Array {
  const output = new Float32Array(source.length);
  const temp = new Float32Array(source.length);
  const window = radius * 2 + 1;

  for (let y = 0; y < height; y++) {
    let sum = 0;
    for (let x = -radius; x <= radius; x++) {
      const clampedX = Math.min(width - 1, Math.max(0, x));
      sum += source[y * width + clampedX];
    }
    temp[y * width] = sum / window;

    for (let x = 1; x < width; x++) {
      const removeX = Math.min(width - 1, Math.max(0, x - radius - 1));
      const addX = Math.min(width - 1, Math.max(0, x + radius));
      sum += source[y * width + addX] - source[y * width + removeX];
      temp[y * width + x] = sum / window;
    }
  }

  for (let x = 0; x < width; x++) {
    let sum = 0;
    for (let y = -radius; y <= radius; y++) {
      const clampedY = Math.min(height - 1, Math.max(0, y));
      sum += temp[clampedY * width + x];
    }
    output[x] = sum / window;

    for (let y = 1; y < height; y++) {
      const removeY = Math.min(height - 1, Math.max(0, y - radius - 1));
      const addY = Math.min(height - 1, Math.max(0, y + radius));
      sum += temp[addY * width + x] - temp[removeY * width + x];
      output[y * width + x] = sum / window;
    }
  }

  return output;
}

function multiply(a: Float32Array, b: Float32Array): Float32Array {
  const output = new Float32Array(a.length);
  for (let i = 0; i < a.length; i++) {
    output[i] = a[i] * b[i];
  }
  return output;
}

/**
 * Guided filter (He et al.) for soft alpha edge refinement.
 * `guide` should be a normalized grayscale image; `src` is the coarse alpha mask.
 */
export function guidedFilter(
  guide: Float32Array,
  src: Float32Array,
  width: number,
  height: number,
  radius = 6,
  epsilon = 0.01,
): Float32Array {
  const meanI = boxFilter(guide, width, height, radius);
  const meanP = boxFilter(src, width, height, radius);
  const meanIp = boxFilter(multiply(guide, src), width, height, radius);
  const meanII = boxFilter(multiply(guide, guide), width, height, radius);

  const a = new Float32Array(guide.length);
  const b = new Float32Array(guide.length);

  for (let i = 0; i < guide.length; i++) {
    const variance = meanII[i] - meanI[i] * meanI[i];
    const covariance = meanIp[i] - meanI[i] * meanP[i];
    a[i] = covariance / (variance + epsilon);
    b[i] = meanP[i] - a[i] * meanI[i];
  }

  const meanA = boxFilter(a, width, height, radius);
  const meanB = boxFilter(b, width, height, radius);
  const output = new Float32Array(guide.length);

  for (let i = 0; i < guide.length; i++) {
    output[i] = clamp01(meanA[i] * guide[i] + meanB[i]);
  }

  return output;
}

export function imageDataToGrayscaleGuide(imageData: ImageData): Float32Array {
  const { width, height, data } = imageData;
  const guide = new Float32Array(width * height);

  for (let i = 0; i < width * height; i++) {
    const offset = i * 4;
    guide[i] =
      (0.299 * data[offset] + 0.587 * data[offset + 1] + 0.114 * data[offset + 2]) /
      255;
  }

  return guide;
}
