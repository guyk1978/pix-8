/** Letterbox fit for model input — preserves aspect ratio. */
export function letterboxDimensions(
  width: number,
  height: number,
  targetSize: number,
): { scale: number; drawWidth: number; drawHeight: number; offsetX: number; offsetY: number } {
  const scale = Math.min(targetSize / width, targetSize / height);
  const drawWidth = Math.round(width * scale);
  const drawHeight = Math.round(height * scale);
  const offsetX = Math.floor((targetSize - drawWidth) / 2);
  const offsetY = Math.floor((targetSize - drawHeight) / 2);
  return { scale, drawWidth, drawHeight, offsetX, offsetY };
}

/** Crop + upscale a letterboxed model mask back to full resolution. */
export function unletterboxMask(
  mask: Float32Array,
  modelSize: number,
  offsetX: number,
  offsetY: number,
  cropWidth: number,
  cropHeight: number,
  targetWidth: number,
  targetHeight: number,
): Float32Array {
  const cropped = new Float32Array(cropWidth * cropHeight);
  for (let y = 0; y < cropHeight; y++) {
    for (let x = 0; x < cropWidth; x++) {
      cropped[y * cropWidth + x] = mask[(offsetY + y) * modelSize + (offsetX + x)] ?? 0;
    }
  }

  const output = new Float32Array(targetWidth * targetHeight);
  const xRatio = cropWidth / targetWidth;
  const yRatio = cropHeight / targetHeight;

  for (let y = 0; y < targetHeight; y++) {
    const srcY = Math.min(cropHeight - 1, y * yRatio);
    const y0 = Math.floor(srcY);
    const y1 = Math.min(cropHeight - 1, y0 + 1);
    const yLerp = srcY - y0;

    for (let x = 0; x < targetWidth; x++) {
      const srcX = Math.min(cropWidth - 1, x * xRatio);
      const x0 = Math.floor(srcX);
      const x1 = Math.min(cropWidth - 1, x0 + 1);
      const xLerp = srcX - x0;

      const top =
        cropped[y0 * cropWidth + x0] * (1 - xLerp) +
        cropped[y0 * cropWidth + x1] * xLerp;
      const bottom =
        cropped[y1 * cropWidth + x0] * (1 - xLerp) +
        cropped[y1 * cropWidth + x1] * xLerp;

      output[y * targetWidth + x] = top * (1 - yLerp) + bottom * yLerp;
    }
  }

  return output;
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

/** Estimate background RGB from image border (before masking). */
export function estimateBorderBackgroundColor(
  data: Uint8ClampedArray,
  width: number,
  height: number,
): [number, number, number] {
  let sumR = 0;
  let sumG = 0;
  let sumB = 0;
  let count = 0;
  const border = Math.max(2, Math.round(Math.min(width, height) * 0.03));

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const onBorder =
        x < border || y < border || x >= width - border || y >= height - border;
      if (!onBorder) continue;

      const offset = (y * width + x) * 4;
      sumR += data[offset];
      sumG += data[offset + 1];
      sumB += data[offset + 2];
      count++;
    }
  }

  if (count === 0) return [128, 128, 128];
  return [sumR / count, sumG / count, sumB / count];
}

function colorDistance(
  r: number,
  g: number,
  b: number,
  ref: [number, number, number],
): number {
  const dr = r - ref[0];
  const dg = g - ref[1];
  const db = b - ref[2];
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

function isNearOpaqueSubject(
  alpha: Float32Array,
  width: number,
  height: number,
  x: number,
  y: number,
  radius = 3,
): boolean {
  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      const nx = Math.min(width - 1, Math.max(0, x + dx));
      const ny = Math.min(height - 1, Math.max(0, y + dy));
      if (alpha[ny * width + nx] > 0.55) return true;
    }
  }
  return false;
}

/**
 * Only boosts alpha on edge pixels adjacent to the subject — never on open background.
 */
export function recoverEdgeAlphaOnly(
  data: Uint8ClampedArray,
  alpha: Float32Array,
  width: number,
  height: number,
  strength = 0.35,
): Float32Array {
  if (strength <= 0.01) return alpha;

  const output = new Float32Array(alpha);
  const bg = estimateBorderBackgroundColor(data, width, height);

  let sumR = 0;
  let sumG = 0;
  let sumB = 0;
  let count = 0;
  for (let i = 0; i < alpha.length; i++) {
    if (alpha[i] < 0.6) continue;
    const offset = i * 4;
    sumR += data[offset];
    sumG += data[offset + 1];
    sumB += data[offset + 2];
    count++;
  }
  const fg: [number, number, number] =
    count > 0 ? [sumR / count, sumG / count, sumB / count] : [bg[0], bg[1], bg[2]];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      const a = alpha[i];
      if (a <= 0.04 || a >= 0.9) continue;
      if (!isNearOpaqueSubject(alpha, width, height, x, y)) continue;

      const offset = i * 4;
      const distBg = colorDistance(data[offset], data[offset + 1], data[offset + 2], bg);
      const distFg = colorDistance(data[offset], data[offset + 1], data[offset + 2], fg);
      const subjectScore = clamp01((distBg - distFg + 25) / 100);
      if (subjectScore < 0.35) continue;

      const boost = strength * subjectScore * (1 - a) * 0.5;
      output[i] = clamp01(a + boost);
    }
  }

  return output;
}

/** Remove background color spill on semi-transparent edge pixels only. */
export function decontaminateEdgeRgb(
  data: Uint8ClampedArray,
  alpha: Float32Array,
  bg: [number, number, number],
  amount = 0.75,
): void {
  if (amount <= 0.01) return;

  for (let i = 0; i < alpha.length; i++) {
    const a = alpha[i];
    if (a <= 0.05 || a >= 0.95) continue;

    const offset = i * 4;
    const invA = 1 / Math.max(a, 0.08);
    const r = data[offset];
    const g = data[offset + 1];
    const b = data[offset + 2];

    data[offset] = Math.round(clamp01((r - (1 - a) * bg[0]) * invA / 255) * 255);
    data[offset + 1] = Math.round(clamp01((g - (1 - a) * bg[1]) * invA / 255) * 255);
    data[offset + 2] = Math.round(clamp01((b - (1 - a) * bg[2]) * invA / 255) * 255);
  }
}

/** Hard-clear background pixels the model marked as empty. */
export function snapBackgroundAlpha(
  alpha: Float32Array,
  threshold = 0.08,
): Float32Array {
  const output = new Float32Array(alpha.length);
  for (let i = 0; i < alpha.length; i++) {
    output[i] = alpha[i] < threshold ? 0 : alpha[i];
  }
  return output;
}

/**
 * Flood-fill from image borders through low-alpha pixels — marks definite background.
 * Enclosed low-alpha regions (straps, shirt folds) stay foreground.
 */
export function buildBackgroundReachabilityMask(
  alpha: Float32Array,
  width: number,
  height: number,
  connectThreshold = 0.14,
): Uint8Array {
  const isBg = new Uint8Array(alpha.length);
  const queue = new Int32Array(alpha.length);
  let head = 0;
  let tail = 0;

  const enqueue = (index: number) => {
    if (isBg[index] || alpha[index] > connectThreshold) return;
    isBg[index] = 1;
    queue[tail++] = index;
  };

  for (let x = 0; x < width; x++) {
    enqueue(x);
    enqueue((height - 1) * width + x);
  }
  for (let y = 0; y < height; y++) {
    enqueue(y * width);
    enqueue(y * width + width - 1);
  }

  while (head < tail) {
    const i = queue[head++];
    const x = i % width;
    const y = (i / width) | 0;

    if (x > 0) enqueue(i - 1);
    if (x < width - 1) enqueue(i + 1);
    if (y > 0) enqueue(i - width);
    if (y < height - 1) enqueue(i + width);
  }

  return isBg;
}

function touchesBackground(
  isBg: Uint8Array,
  width: number,
  height: number,
  index: number,
): boolean {
  const x = index % width;
  const y = (index / width) | 0;

  if (x > 0 && isBg[index - 1]) return true;
  if (x < width - 1 && isBg[index + 1]) return true;
  if (y > 0 && isBg[index - width]) return true;
  if (y < height - 1 && isBg[index + width]) return true;
  return false;
}

function localAlphaMax(
  alpha: Float32Array,
  width: number,
  height: number,
  x: number,
  y: number,
  radius: number,
): number {
  let max = 0;
  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      const nx = Math.min(width - 1, Math.max(0, x + dx));
      const ny = Math.min(height - 1, Math.max(0, y + dy));
      max = Math.max(max, alpha[ny * width + nx]);
    }
  }
  return max;
}

/** Tighten semi-transparent fringe on the exterior silhouette only. */
export function cleanExteriorEdgeAlpha(
  alpha: Float32Array,
  isBg: Uint8Array,
  width: number,
  height: number,
): Float32Array {
  const output = new Float32Array(alpha.length);

  for (let i = 0; i < alpha.length; i++) {
    if (isBg[i]) {
      output[i] = 0;
      continue;
    }

    const a = alpha[i];
    if (!touchesBackground(isBg, width, height, i)) {
      output[i] = a;
      continue;
    }

    if (a < 0.2) {
      output[i] = 0;
    } else if (a < 0.48) {
      output[i] = a * 0.25;
    } else if (a < 0.72) {
      output[i] = a * 0.55;
    } else {
      output[i] = Math.min(1, a * 0.92 + 0.06);
    }
  }

  return output;
}

/**
 * Clears only border-connected background; fills enclosed holes inside the subject.
 */
export function isolateForegroundAlpha(
  alpha: Float32Array,
  width: number,
  height: number,
  connectThreshold = 0.14,
  holeFillThreshold = 0.4,
): { alpha: Float32Array; isBg: Uint8Array } {
  const isBg = buildBackgroundReachabilityMask(
    alpha,
    width,
    height,
    connectThreshold,
  );
  const filled = new Float32Array(alpha.length);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      if (isBg[i]) {
        filled[i] = 0;
        continue;
      }

      const a = alpha[i];
      if (a >= holeFillThreshold) {
        filled[i] = a;
        continue;
      }

      const neighborMax = localAlphaMax(alpha, width, height, x, y, 3);
      if (neighborMax > 0.52) {
        filled[i] = Math.max(a, Math.min(1, neighborMax * 0.96));
      } else {
        filled[i] = a;
      }
    }
  }

  return {
    alpha: cleanExteriorEdgeAlpha(filled, isBg, width, height),
    isBg,
  };
}

function dilateMask(
  mask: Uint8Array,
  width: number,
  height: number,
  radius: number,
): Uint8Array {
  const output = new Uint8Array(mask.length);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      if (!mask[i]) continue;
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const nx = Math.min(width - 1, Math.max(0, x + dx));
          const ny = Math.min(height - 1, Math.max(0, y + dy));
          output[ny * width + nx] = 1;
        }
      }
    }
  }
  return output;
}

/**
 * Restores under-segmented limbs (hands, arms, straps) using the reference photo.
 */
export function recoverLimbsFromReference(
  data: Uint8ClampedArray,
  alpha: Float32Array,
  refData: Uint8ClampedArray,
  isBg: Uint8Array,
  width: number,
  height: number,
  strength = 0.72,
): void {
  if (strength <= 0.02) return;

  const bg = estimateBorderBackgroundColor(refData, width, height);

  let sumR = 0;
  let sumG = 0;
  let sumB = 0;
  let count = 0;
  for (let i = 0; i < alpha.length; i++) {
    if (alpha[i] < 0.68 || isBg[i]) continue;
    const offset = i * 4;
    sumR += refData[offset];
    sumG += refData[offset + 1];
    sumB += refData[offset + 2];
    count++;
  }
  if (count === 0) return;

  const fg: [number, number, number] = [sumR / count, sumG / count, sumB / count];

  const core = new Uint8Array(alpha.length);
  for (let i = 0; i < alpha.length; i++) {
    if (alpha[i] > 0.7 && !isBg[i]) core[i] = 1;
  }
  const nearCore = dilateMask(core, width, height, 14);

  const limbTop = Math.floor(height * 0.1);

  for (let y = limbTop; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      if (isBg[i] || alpha[i] > 0.84) continue;
      if (!nearCore[i]) continue;

      const offset = i * 4;
      const refR = refData[offset];
      const refG = refData[offset + 1];
      const refB = refData[offset + 2];
      const distBg = colorDistance(refR, refG, refB, bg);
      const distFg = colorDistance(refR, refG, refB, fg);
      const subjectScore = clamp01((distBg - distFg + 18) / 85);
      if (subjectScore < 0.26) continue;

      const boost = strength * subjectScore * (0.92 - alpha[i]) * 0.9;
      if (boost < 0.04) continue;

      const newAlpha = clamp01(alpha[i] + boost);
      alpha[i] = newAlpha;
      data[offset] = refR;
      data[offset + 1] = refG;
      data[offset + 2] = refB;
      data[offset + 3] = Math.round(newAlpha * 255);
    }
  }
}

/** Remove background spill on exterior edge pixels only (avoids rainbow fringing). */
export function decontaminateExteriorEdgeRgb(
  data: Uint8ClampedArray,
  alpha: Float32Array,
  isBg: Uint8Array,
  width: number,
  height: number,
  bg: [number, number, number],
  amount = 0.65,
): void {
  if (amount <= 0.01) return;

  let sumR = 0;
  let sumG = 0;
  let sumB = 0;
  let count = 0;
  for (let i = 0; i < alpha.length; i++) {
    if (alpha[i] < 0.62 || isBg[i]) continue;
    const offset = i * 4;
    sumR += data[offset];
    sumG += data[offset + 1];
    sumB += data[offset + 2];
    count++;
  }
  if (count === 0) return;

  const interiorR = sumR / count;
  const interiorG = sumG / count;
  const interiorB = sumB / count;
  const strength = amount;

  for (let i = 0; i < alpha.length; i++) {
    if (isBg[i]) continue;

    const a = alpha[i];
    if (a <= 0.04 || a >= 0.94) continue;
    if (!touchesBackground(isBg, width, height, i)) continue;

    const offset = i * 4;
    let r = data[offset];
    let g = data[offset + 1];
    let b = data[offset + 2];

    const spillR = r - (1 - a) * bg[0];
    const spillG = g - (1 - a) * bg[1];
    const spillB = b - (1 - a) * bg[2];
    const invA = 1 / Math.max(a, 0.12);
    r = clamp01(spillR * invA / 255) * 255;
    g = clamp01(spillG * invA / 255) * 255;
    b = clamp01(spillB * invA / 255) * 255;

    const pull = strength * (1 - a) * 0.85;
    data[offset] = Math.round(r * (1 - pull) + interiorR * pull);
    data[offset + 1] = Math.round(g * (1 - pull) + interiorG * pull);
    data[offset + 2] = Math.round(b * (1 - pull) + interiorB * pull);
  }
}
