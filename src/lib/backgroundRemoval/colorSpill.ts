function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function pixelLuminance(r: number, g: number, b: number): number {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
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

function findNearestSubjectColor(
  data: Uint8ClampedArray,
  alpha: Float32Array,
  width: number,
  height: number,
  startX: number,
  startY: number,
  minAlpha = 0.82,
): [number, number, number] | null {
  const maxSteps = 24;
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [-1, 1],
    [1, -1],
    [-1, -1],
  ];

  for (const [dx, dy] of directions) {
    let x = startX;
    let y = startY;

    for (let step = 1; step <= maxSteps; step++) {
      x = Math.min(width - 1, Math.max(0, startX + dx * step));
      y = Math.min(height - 1, Math.max(0, startY + dy * step));
      const i = y * width + x;
      if (alpha[i] < minAlpha) continue;

      const offset = i * 4;
      return [data[offset], data[offset + 1], data[offset + 2]];
    }
  }

  return null;
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

function isSurroundedBySubject(
  alpha: Float32Array,
  width: number,
  height: number,
  x: number,
  y: number,
  minAlpha = 0.52,
  minNeighbors = 5,
): boolean {
  let count = 0;
  for (let dy = -2; dy <= 2; dy++) {
    for (let dx = -2; dx <= 2; dx++) {
      if (dx === 0 && dy === 0) continue;
      const nx = Math.min(width - 1, Math.max(0, x + dx));
      const ny = Math.min(height - 1, Math.max(0, y + dy));
      if (alpha[ny * width + nx] >= minAlpha) count++;
    }
  }
  return count >= minNeighbors;
}

function estimateInteriorSubjectColor(
  data: Uint8ClampedArray,
  alpha: Float32Array,
  isBg: Uint8Array,
): [number, number, number] | null {
  let sumR = 0;
  let sumG = 0;
  let sumB = 0;
  let count = 0;

  for (let i = 0; i < alpha.length; i++) {
    if (alpha[i] < 0.68 || isBg[i]) continue;
    const offset = i * 4;
    sumR += data[offset];
    sumG += data[offset + 1];
    sumB += data[offset + 2];
    count++;
  }

  if (count === 0) return null;
  return [sumR / count, sumG / count, sumB / count];
}

export interface BackgroundBleedOptions {
  strength?: number;
  /** Top fraction of image treated as hair zone (extra bleed removal). */
  hairZoneRatio?: number;
}

/**
 * Cuts background color bleed (green foliage, sky tint) on edges and inside
 * fine structures like hair curls. Also reduces white halos on bright garments.
 */
export function removeBackgroundBleed(
  data: Uint8ClampedArray,
  alpha: Float32Array,
  isBg: Uint8Array,
  width: number,
  height: number,
  bg: [number, number, number],
  options: BackgroundBleedOptions = {},
): void {
  const strength = options.strength ?? 0.88;
  const hairZoneRatio = options.hairZoneRatio ?? 0.48;
  if (strength <= 0.01) return;

  const fg = estimateInteriorSubjectColor(data, alpha, isBg);
  if (!fg) return;

  const hairLimit = Math.floor(height * hairZoneRatio);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      if (isBg[i]) continue;

      const a = alpha[i];
      if (a <= 0.03 || a >= 0.97) continue;

      const offset = i * 4;
      const r = data[offset];
      const g = data[offset + 1];
      const b = data[offset + 2];

      const distBg = colorDistance(r, g, b, bg);
      const distFg = colorDistance(r, g, b, fg);
      const bgBias = distFg - distBg;
      if (bgBias < 6) continue;

      const exterior = touchesBackground(isBg, width, height, i);
      const inHairZone = y < hairLimit;
      const fineDetail =
        a < 0.72 && isSurroundedBySubject(alpha, width, height, x, y);

      if (!exterior && !fineDetail && !inHairZone) continue;

      const bleedScore = clamp01(bgBias / 72);
      const semiTransparent = (1 - a) * a * 4;
      const zoneBoost = exterior ? 1 : inHairZone && fineDetail ? 0.92 : 0.65;
      const cut = strength * bleedScore * zoneBoost * (0.35 + semiTransparent);

      if (cut < 0.04) continue;

      const nearest =
        findNearestSubjectColor(data, alpha, width, height, x, y, 0.78) ?? fg;
      const newAlpha = clamp01(a * (1 - cut * 0.55));

      alpha[i] = newAlpha;
      const pull = Math.min(1, cut * 1.15);
      data[offset] = Math.round(r * (1 - pull) + nearest[0] * pull);
      data[offset + 1] = Math.round(g * (1 - pull) + nearest[1] * pull);
      data[offset + 2] = Math.round(b * (1 - pull) + nearest[2] * pull);
      data[offset + 3] = Math.round(newAlpha * 255);
    }
  }
}

export interface ColorSpillOptions {
  /** Pixels brighter than this on semi-transparent edges are treated as spill. */
  luminanceThreshold?: number;
  /** 0–1 blend toward recovered subject color. */
  strength?: number;
}

/**
 * Detects bright background halos (e.g. white sky glow) on exterior edges and
 * fills RGB from the nearest opaque subject pixel.
 */
export function fixColorSpillHalos(
  data: Uint8ClampedArray,
  alpha: Float32Array,
  isBg: Uint8Array,
  width: number,
  height: number,
  options: ColorSpillOptions = {},
): void {
  const luminanceThreshold = options.luminanceThreshold ?? 188;
  const strength = options.strength ?? 0.88;

  if (strength <= 0.01) return;

  let interiorR = 0;
  let interiorG = 0;
  let interiorB = 0;
  let interiorCount = 0;

  for (let i = 0; i < alpha.length; i++) {
    if (alpha[i] < 0.72 || isBg[i]) continue;
    const offset = i * 4;
    interiorR += data[offset];
    interiorG += data[offset + 1];
    interiorB += data[offset + 2];
    interiorCount++;
  }

  if (interiorCount === 0) return;

  const fallback: [number, number, number] = [
    interiorR / interiorCount,
    interiorG / interiorCount,
    interiorB / interiorCount,
  ];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      if (isBg[i]) continue;

      const a = alpha[i];
      if (a <= 0.04 || a >= 0.94) continue;
      if (!touchesBackground(isBg, width, height, i)) continue;

      const offset = i * 4;
      const r = data[offset];
      const g = data[offset + 1];
      const b = data[offset + 2];
      const lum = pixelLuminance(r, g, b);

      const semiTransparent = (1 - a) * a * 4;
      const haloScore = clamp01((lum - luminanceThreshold) / 42);
      const lightFringe = clamp01((lum - 155) / 90) * semiTransparent;
      if (haloScore * semiTransparent < 0.05 && lightFringe < 0.12) continue;

      const nearest =
        findNearestSubjectColor(data, alpha, width, height, x, y) ?? fallback;
      const pull =
        strength * Math.min(1, Math.max(haloScore, lightFringe) + semiTransparent * 0.4);

      data[offset] = Math.round(r * (1 - pull) + nearest[0] * pull);
      data[offset + 1] = Math.round(g * (1 - pull) + nearest[1] * pull);
      data[offset + 2] = Math.round(b * (1 - pull) + nearest[2] * pull);
    }
  }
}

/** Fills small alpha gaps inside the subject (finger gaps, thin straps). */
export function fillEnclosedAlphaGaps(
  alpha: Float32Array,
  isBg: Uint8Array,
  width: number,
  height: number,
  maxAlpha = 0.3,
  minNeighborAlpha = 0.56,
): Float32Array {
  const output = new Float32Array(alpha);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      if (isBg[i]) continue;

      const a = alpha[i];
      if (a > maxAlpha) continue;
      if (!isSurroundedBySubject(alpha, width, height, x, y, minNeighborAlpha, 6)) {
        continue;
      }

      let sum = 0;
      let count = 0;
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          if (dx === 0 && dy === 0) continue;
          const nx = Math.min(width - 1, Math.max(0, x + dx));
          const ny = Math.min(height - 1, Math.max(0, y + dy));
          const neighbor = alpha[ny * width + nx];
          if (neighbor >= minNeighborAlpha) {
            sum += neighbor;
            count++;
          }
        }
      }

      if (count < 4) continue;
      output[i] = clamp01(Math.max(a, (sum / count) * 0.93));
    }
  }

  return output;
}
