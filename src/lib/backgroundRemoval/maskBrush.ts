export type MaskBrushTool = "add" | "remove" | "feather" | "clean";

export interface SmartCleanContext {
  referenceData: Uint8ClampedArray;
  width: number;
  height: number;
  bg: [number, number, number];
  fg: [number, number, number];
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
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

export function buildSmartCleanContext(
  referenceData: Uint8ClampedArray,
  width: number,
  height: number,
): SmartCleanContext {
  let sumR = 0;
  let sumG = 0;
  let sumB = 0;
  let bgCount = 0;
  let fgR = 0;
  let fgG = 0;
  let fgB = 0;
  let fgCount = 0;
  const border = Math.max(2, Math.round(Math.min(width, height) * 0.03));

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const onBorder =
        x < border || y < border || x >= width - border || y >= height - border;
      const offset = (y * width + x) * 4;
      const r = referenceData[offset];
      const g = referenceData[offset + 1];
      const b = referenceData[offset + 2];

      if (onBorder) {
        sumR += r;
        sumG += g;
        sumB += b;
        bgCount++;
      } else {
        fgR += r;
        fgG += g;
        fgB += b;
        fgCount++;
      }
    }
  }

  const bg: [number, number, number] =
    bgCount > 0
      ? [sumR / bgCount, sumG / bgCount, sumB / bgCount]
      : [128, 128, 128];
  const fg: [number, number, number] =
    fgCount > 0 ? [fgR / fgCount, fgG / fgCount, fgB / fgCount] : bg;

  return { referenceData, width, height, bg, fg };
}

export function resolveMaskBrushRadius(
  tool: MaskBrushTool,
  width: number,
  height: number,
  sizePercent: number,
): number {
  const minDim = Math.min(width, height);
  const size = Math.max(8, Math.min(100, sizePercent)) / 100;

  if (tool === "clean") {
    return Math.max(28, Math.round(minDim * (0.045 + size * 0.11)));
  }

  return Math.max(10, Math.round(minDim * (0.012 + size * 0.038)));
}

export function naturalBrushRadiusToDisplay(
  naturalRadius: number,
  canvas: HTMLCanvasElement,
): number {
  const rect = canvas.getBoundingClientRect();
  if (!rect.width || !rect.height || !canvas.width) return naturalRadius;
  const scale = Math.min(rect.width / canvas.width, rect.height / canvas.height);
  return naturalRadius * scale;
}

export function createManualMaskBuffer(width: number, height: number): Float32Array {
  return new Float32Array(width * height);
}

export function paintMaskBrush(
  buffer: Float32Array,
  width: number,
  height: number,
  centerX: number,
  centerY: number,
  radius: number,
  tool: MaskBrushTool,
  strength = 1,
  smartClean?: SmartCleanContext,
): void {
  const r = Math.max(1, radius);
  const r2 = r * r;
  const minX = Math.max(0, Math.floor(centerX - r));
  const maxX = Math.min(width - 1, Math.ceil(centerX + r));
  const minY = Math.max(0, Math.floor(centerY - r));
  const maxY = Math.min(height - 1, Math.ceil(centerY + r));

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const dx = x - centerX;
      const dy = y - centerY;
      const dist2 = dx * dx + dy * dy;
      if (dist2 > r2) continue;

      const falloff = 1 - Math.sqrt(dist2) / r;
      const i = y * width + x;

      if (tool === "add") {
        buffer[i] = Math.min(1, buffer[i] + 0.22 * falloff * strength);
      } else if (tool === "remove") {
        buffer[i] = Math.max(-1, buffer[i] - 0.28 * falloff * strength);
      } else if (tool === "clean") {
        if (!smartClean) continue;

        const refX = Math.min(
          smartClean.width - 1,
          Math.max(0, Math.round((x / width) * smartClean.width)),
        );
        const refY = Math.min(
          smartClean.height - 1,
          Math.max(0, Math.round((y / height) * smartClean.height)),
        );
        const refOffset = (refY * smartClean.width + refX) * 4;
        const refR = smartClean.referenceData[refOffset];
        const refG = smartClean.referenceData[refOffset + 1];
        const refB = smartClean.referenceData[refOffset + 2];

        const distBg = colorDistance(refR, refG, refB, smartClean.bg);
        const distFg = colorDistance(refR, refG, refB, smartClean.fg);
        const bgBias = distFg - distBg;

        if (bgBias < 10) continue;

        const smartStrength = clamp01(bgBias / 62);
        const soft = falloff * falloff * (3 - 2 * falloff);
        buffer[i] = Math.max(
          -1,
          buffer[i] - 0.3 * soft * smartStrength * strength,
        );
      } else {
        const blurRadius = Math.max(1, Math.round(r * 0.35));
        buffer[i] *= 1 - 0.15 * falloff * strength;
        softenMaskPixel(buffer, width, height, x, y, blurRadius, falloff * strength * 0.35);
      }
    }
  }
}

export function paintMaskBrushStroke(
  buffer: Float32Array,
  width: number,
  height: number,
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  radius: number,
  tool: MaskBrushTool,
  strength = 1,
  smartClean?: SmartCleanContext,
): void {
  const dx = toX - fromX;
  const dy = toY - fromY;
  const distance = Math.hypot(dx, dy);

  if (distance < 0.5) {
    paintMaskBrush(buffer, width, height, toX, toY, radius, tool, strength, smartClean);
    return;
  }

  const step = Math.max(1, radius * 0.28);
  const steps = Math.ceil(distance / step);

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    paintMaskBrush(
      buffer,
      width,
      height,
      fromX + dx * t,
      fromY + dy * t,
      radius,
      tool,
      strength,
      smartClean,
    );
  }
}

function softenMaskPixel(
  buffer: Float32Array,
  width: number,
  height: number,
  x: number,
  y: number,
  radius: number,
  amount: number,
): void {
  let sum = 0;
  let count = 0;

  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      const nx = Math.min(width - 1, Math.max(0, x + dx));
      const ny = Math.min(height - 1, Math.max(0, y + dy));
      sum += buffer[ny * width + nx];
      count++;
    }
  }

  const avg = sum / count;
  const i = y * width + x;
  buffer[i] += (avg - buffer[i]) * amount;
}

export function applyManualMaskAdjustments(
  alpha: Float32Array,
  manual: Float32Array | undefined,
): void {
  if (!manual) return;

  for (let i = 0; i < alpha.length; i++) {
    if (manual[i] === 0) continue;
    alpha[i] = Math.min(1, Math.max(0, alpha[i] + manual[i]));
  }
}
