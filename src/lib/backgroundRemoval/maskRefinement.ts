import {
  applyManualMaskAdjustments,
  type MaskBrushTool,
} from "@/lib/backgroundRemoval/maskBrush";
import { fixColorSpillHalos, fillEnclosedAlphaGaps, removeBackgroundBleed } from "@/lib/backgroundRemoval/colorSpill";
import {
  buildBackgroundReachabilityMask,
  estimateBorderBackgroundColor,
  isolateForegroundAlpha,
  recoverEdgeAlphaOnly,
  recoverLimbsFromReference,
} from "@/lib/backgroundRemoval/alphaMatting";

export type { MaskBrushTool };

export interface MaskRefinementSettings {
  /** 0–100 — sharpens soft mask edges (hair, straps). */
  refineEdge: number;
  /** 0–100 — preserves fine subject structure (hands, fingers). */
  smartMaskingStrength: number;
  /** 0–100 — removes background color spill / sky glow on edges. */
  decontaminateColor: number;
  smartHandRecognition: boolean;
}

export interface MaskRefinementContext {
  referenceSource?: CanvasImageSource | null;
  manualAdjustments?: Float32Array;
  spillBackgroundRgb?: [number, number, number];
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function readSourceSize(source: CanvasImageSource): { width: number; height: number } {
  if (source instanceof HTMLImageElement) {
    return {
      width: source.naturalWidth || source.width,
      height: source.naturalHeight || source.height,
    };
  }
  if (source instanceof HTMLVideoElement) {
    return { width: source.videoWidth, height: source.videoHeight };
  }
  if (source instanceof HTMLCanvasElement || source instanceof ImageBitmap) {
    return { width: source.width, height: source.height };
  }
  throw new Error("Unsupported image source.");
}

function boxBlurAlpha(
  alpha: Float32Array,
  width: number,
  height: number,
  radius: number,
): Float32Array {
  if (radius <= 0) return alpha;

  const output = new Float32Array(alpha.length);
  const temp = new Float32Array(alpha.length);
  const window = radius * 2 + 1;

  for (let y = 0; y < height; y++) {
    let sum = 0;
    for (let x = -radius; x <= radius; x++) {
      const cx = Math.min(width - 1, Math.max(0, x));
      sum += alpha[y * width + cx];
    }
    temp[y * width] = sum / window;

    for (let x = 1; x < width; x++) {
      const removeX = Math.min(width - 1, Math.max(0, x - radius - 1));
      const addX = Math.min(width - 1, Math.max(0, x + radius));
      sum += alpha[y * width + addX] - alpha[y * width + removeX];
      temp[y * width + x] = sum / window;
    }
  }

  for (let x = 0; x < width; x++) {
    let sum = 0;
    for (let y = -radius; y <= radius; y++) {
      const cy = Math.min(height - 1, Math.max(0, y));
      sum += temp[cy * width + x];
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

function restoreDetailFromReference(
  data: Uint8ClampedArray,
  alpha: Float32Array,
  width: number,
  height: number,
  reference: CanvasImageSource,
  includeHair: boolean,
  isBg: Uint8Array,
): void {
  const refCanvas = document.createElement("canvas");
  refCanvas.width = width;
  refCanvas.height = height;
  const refCtx = refCanvas.getContext("2d");
  if (!refCtx) return;

  refCtx.drawImage(reference, 0, 0, width, height);
  const refData = refCtx.getImageData(0, 0, width, height).data;

  const regions = includeHair
    ? [
        { top: 0, bottom: Math.floor(height * 0.42) },
        { top: Math.floor(height * 0.22), bottom: height },
      ]
    : [{ top: Math.floor(height * 0.22), bottom: height }];

  for (const region of regions) {
    for (let y = region.top; y < region.bottom; y++) {
      for (let x = 0; x < width; x++) {
        const i = y * width + x;
        if (isBg[i]) continue;
        const a = alpha[i];
        if (a > 0.88) continue;

        const offset = i * 4;
        const refR = refData[offset];
        const refG = refData[offset + 1];
        const refB = refData[offset + 2];
        const refLum = (refR + refG + refB) / 3;
        if (refLum < 22 || refLum > 248) continue;

        let neighborAlpha = 0;
        let neighborCount = 0;
        for (let dy = -3; dy <= 3; dy++) {
          for (let dx = -3; dx <= 3; dx++) {
            if (dx === 0 && dy === 0) continue;
            const nx = Math.min(width - 1, Math.max(0, x + dx));
            const ny = Math.min(height - 1, Math.max(0, y + dy));
            const neighbor = alpha[ny * width + nx];
            if (neighbor > 0.4) {
              neighborAlpha += neighbor;
              neighborCount++;
            }
          }
        }

        if (neighborCount < 2 && a > 0.15) continue;
        const avgNeighbor = neighborCount > 0 ? neighborAlpha / neighborCount : a;

        const targetAlpha =
          a < 0.08
            ? clamp01(avgNeighbor * 0.55 + 0.08)
            : clamp01(a + (avgNeighbor - a) * 0.4);

        if (targetAlpha <= a + 0.03) continue;

        data[offset] = refR;
        data[offset + 1] = refG;
        data[offset + 2] = refB;
        data[offset + 3] = Math.round(targetAlpha * 255);
        alpha[i] = targetAlpha;
      }
    }
  }
}

function refineAlphaChannel(
  alpha: Float32Array,
  width: number,
  height: number,
  settings: MaskRefinementSettings,
): Float32Array {
  const strength = settings.smartMaskingStrength / 100;
  const gamma = 1 - strength * 0.65;
  const edgeAmount = settings.refineEdge / 100;

  let refined = new Float32Array(alpha.length);
  for (let i = 0; i < alpha.length; i++) {
    refined[i] = Math.pow(clamp01(alpha[i]), gamma);
  }

  if (edgeAmount > 0.01) {
    const radius = Math.max(1, Math.round(1 + edgeAmount * 6));
    const blurred = boxBlurAlpha(refined, width, height, radius);
    const sharpen = 2 + edgeAmount * 2.5;
    for (let i = 0; i < refined.length; i++) {
      const sharp = refined[i] + edgeAmount * (refined[i] - blurred[i]) * sharpen;
      refined[i] = clamp01(sharp);
    }
  }

  return refined;
}

function isNearAlphaEdge(
  alpha: Float32Array,
  width: number,
  height: number,
  index: number,
): boolean {
  const x = index % width;
  const y = Math.floor(index / width);
  const center = alpha[index];

  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      const nx = Math.min(width - 1, Math.max(0, x + dx));
      const ny = Math.min(height - 1, Math.max(0, y + dy));
      const neighbor = alpha[ny * width + nx];
      if (Math.abs(center - neighbor) > 0.06) return true;
    }
  }

  return false;
}

function parseHexColor(hex: string): [number, number, number] {
  const normalized = hex.replace("#", "");
  if (normalized.length === 3) {
    return [
      parseInt(normalized[0] + normalized[0], 16),
      parseInt(normalized[1] + normalized[1], 16),
      parseInt(normalized[2] + normalized[2], 16),
    ];
  }
  if (normalized.length >= 6) {
    return [
      parseInt(normalized.slice(0, 2), 16),
      parseInt(normalized.slice(2, 4), 16),
      parseInt(normalized.slice(4, 6), 16),
    ];
  }
  return [0, 0, 0];
}

function decontaminateRgb(
  data: Uint8ClampedArray,
  alpha: Float32Array,
  isBg: Uint8Array,
  width: number,
  height: number,
  amount: number,
  spillBackgroundRgb: [number, number, number],
): void {
  if (amount <= 0.01) return;

  let sumR = 0;
  let sumG = 0;
  let sumB = 0;
  let count = 0;

  for (let i = 0; i < alpha.length; i++) {
    if (alpha[i] < 0.65 || isBg[i]) continue;
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
  const strength = amount / 100;
  const [bgR, bgG, bgB] = spillBackgroundRgb;

  for (let i = 0; i < alpha.length; i++) {
    if (isBg[i]) continue;

    const a = clamp01(alpha[i]);
    if (a <= 0.01) continue;

    const offset = i * 4;
    let r = data[offset];
    let g = data[offset + 1];
    let b = data[offset + 2];

    const edge = isNearAlphaEdge(alpha, width, height, i);
    const touchesBg =
      (i % width > 0 && isBg[i - 1]) ||
      (i % width < width - 1 && isBg[i + 1]) ||
      (i >= width && isBg[i - width]) ||
      (i < alpha.length - width && isBg[i + width]);
    const exteriorEdge = edge && touchesBg;

    if (exteriorEdge && a < 0.92) {
      const invA = 1 / Math.max(a, 0.12);
      r = clamp01((r - (1 - a) * bgR) * invA / 255) * 255;
      g = clamp01((g - (1 - a) * bgG) * invA / 255) * 255;
      b = clamp01((b - (1 - a) * bgB) * invA / 255) * 255;
    }

    const semiTransparent = exteriorEdge ? (1 - a) * a * 4 : 0;
    const pull = strength * Math.min(1, semiTransparent + (exteriorEdge ? 0.2 : 0));

    if (pull <= 0.005) {
      data[offset] = Math.round(r);
      data[offset + 1] = Math.round(g);
      data[offset + 2] = Math.round(b);
      continue;
    }

    data[offset] = Math.round(r * (1 - pull) + interiorR * pull);
    data[offset + 1] = Math.round(g * (1 - pull) + interiorG * pull);
    data[offset + 2] = Math.round(b * (1 - pull) + interiorB * pull);
  }
}

/**
 * Applies client-side mask refinement to an AI cutout (RGBA).
 */
export function applyMaskRefinement(
  source: CanvasImageSource,
  settings: MaskRefinementSettings,
  context: MaskRefinementContext = {},
): HTMLCanvasElement {
  const { width, height } = readSourceSize(source);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context unavailable.");

  ctx.drawImage(source, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height);
  const { data } = imageData;

  const alpha = new Float32Array(width * height);
  for (let i = 0; i < alpha.length; i++) {
    alpha[i] = data[i * 4 + 3] / 255;
  }

  let refinedAlpha = refineAlphaChannel(alpha, width, height, settings);
  const { alpha: isolatedAlpha, isBg } = isolateForegroundAlpha(
    refinedAlpha,
    width,
    height,
    0.12,
    0.34,
  );
  refinedAlpha = fillEnclosedAlphaGaps(isolatedAlpha, isBg, width, height);

  const recoveryStrength = (settings.smartMaskingStrength / 100) * 0.45;
  if (recoveryStrength > 0.05) {
    refinedAlpha = recoverEdgeAlphaOnly(
      data,
      refinedAlpha,
      width,
      height,
      recoveryStrength,
    );
  }

  applyManualMaskAdjustments(refinedAlpha, context.manualAdjustments);

  for (let i = 0; i < refinedAlpha.length; i++) {
    data[i * 4 + 3] = Math.round(refinedAlpha[i] * 255);
  }

  let refData: Uint8ClampedArray | null = null;
  if (context.referenceSource) {
    const refCanvas = document.createElement("canvas");
    refCanvas.width = width;
    refCanvas.height = height;
    const refCtx = refCanvas.getContext("2d");
    if (refCtx) {
      refCtx.drawImage(context.referenceSource, 0, 0, width, height);
      refData = refCtx.getImageData(0, 0, width, height).data;
    }
  }

  if (settings.smartHandRecognition && refData) {
    recoverLimbsFromReference(
      data,
      refinedAlpha,
      refData,
      isBg,
      width,
      height,
      0.55 + (settings.smartMaskingStrength / 100) * 0.35,
    );
    refinedAlpha = fillEnclosedAlphaGaps(refinedAlpha, isBg, width, height, 0.38, 0.52);
    restoreDetailFromReference(
      data,
      refinedAlpha,
      width,
      height,
      context.referenceSource!,
      settings.smartMaskingStrength >= 50,
      isBg,
    );
  }

  const spillBg =
    context.spillBackgroundRgb ??
    estimateBorderBackgroundColor(data, width, height);
  const updatedIsBg = buildBackgroundReachabilityMask(
    refinedAlpha,
    width,
    height,
    0.13,
  );
  decontaminateRgb(
    data,
    refinedAlpha,
    updatedIsBg,
    width,
    height,
    settings.decontaminateColor,
    spillBg,
  );
  removeBackgroundBleed(data, refinedAlpha, updatedIsBg, width, height, spillBg, {
    strength: 0.7 + (settings.decontaminateColor / 100) * 0.28,
  });
  fixColorSpillHalos(data, refinedAlpha, updatedIsBg, width, height, {
    luminanceThreshold: 172,
    strength: 0.75 + (settings.decontaminateColor / 100) * 0.22,
  });

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

export function maskRefinementSettingsFromLayer(layer: {
  advancedEdges: number;
  subjectMasking: number;
  depthEstimation: number;
  smartHandRecognition: boolean;
}): MaskRefinementSettings {
  return {
    refineEdge: layer.advancedEdges,
    smartMaskingStrength: layer.subjectMasking,
    decontaminateColor: layer.depthEstimation,
    smartHandRecognition: layer.smartHandRecognition,
  };
}

export function spillBackgroundFromLayer(layer: {
  backgroundMode: string;
  backgroundColor: string;
}): [number, number, number] {
  if (layer.backgroundMode === "solid") {
    return parseHexColor(layer.backgroundColor);
  }
  return [0, 0, 0];
}
