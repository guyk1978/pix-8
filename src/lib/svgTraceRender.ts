import type { ImageTracerOptions } from "imagetracerjs";

export type SvgColorMode = "color" | "grayscale" | "bw";

export interface SvgTraceSettings {
  /** 0 = low detail, 100 = high detail */
  complexity: number;
  colorMode: SvgColorMode;
  simplifyPaths: boolean;
}

export const DEFAULT_SVG_TRACE_SETTINGS: SvgTraceSettings = {
  complexity: 55,
  colorMode: "color",
  simplifyPaths: true,
};

const MAX_TRACE_DIMENSION = 1024;

type ImageTracerModule = typeof import("imagetracerjs").default;

let tracerPromise: Promise<ImageTracerModule> | null = null;

function loadImageTracer(): Promise<ImageTracerModule> {
  if (!tracerPromise) {
    tracerPromise = import("imagetracerjs").then((module) => module.default);
  }
  return tracerPromise;
}

function clampChannel(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function toGrayscaleImageData(imageData: ImageData): ImageData {
  const { data } = imageData;

  for (let i = 0; i < data.length; i += 4) {
    const gray = clampChannel(
      0.299 * data[i]! + 0.587 * data[i + 1]! + 0.114 * data[i + 2]!,
    );
    data[i] = gray;
    data[i + 1] = gray;
    data[i + 2] = gray;
  }

  return imageData;
}

function getTraceDimensions(
  width: number,
  height: number,
): { width: number; height: number; scale: number } {
  const longest = Math.max(width, height);
  if (longest <= MAX_TRACE_DIMENSION) {
    return { width, height, scale: 1 };
  }

  const scale = MAX_TRACE_DIMENSION / longest;
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
    scale,
  };
}

function buildTracerOptions(settings: SvgTraceSettings): ImageTracerOptions {
  const detail = settings.complexity / 100;
  const ltres = 2 - detail * 1.5;
  const qtres = 1.5 - detail;
  const pathomit = settings.simplifyPaths
    ? Math.round(18 - detail * 14)
    : Math.round(10 - detail * 8);

  let numberofcolors = Math.round(6 + detail * 26);
  if (settings.colorMode === "grayscale") {
    numberofcolors = Math.round(4 + detail * 10);
  } else if (settings.colorMode === "bw") {
    numberofcolors = 2;
  }

  return {
    ltres: Math.max(0.25, ltres),
    qtres: Math.max(0.25, qtres),
    pathomit: Math.max(0, pathomit),
    numberofcolors,
    colorsampling: 2,
    linefilter: settings.simplifyPaths,
    roundcoords: settings.simplifyPaths ? 1 : 2,
    viewbox: true,
    rightangleenhance: true,
    strokewidth: 1,
    scale: 1,
  };
}

function imageDataFromCanvas(canvas: HTMLCanvasElement): ImageData {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) {
    throw new Error("Canvas context unavailable.");
  }

  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function drawImageToTraceCanvas(
  image: HTMLImageElement,
  width: number,
  height: number,
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context unavailable.");
  }

  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(image, 0, 0, width, height);
  return canvas;
}

export async function traceImageToSvgAsync(
  image: HTMLImageElement,
  sourceWidth: number,
  sourceHeight: number,
  settings: SvgTraceSettings,
  shouldCancel?: () => boolean,
): Promise<string> {
  await new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => resolve());
  });

  if (shouldCancel?.()) {
    throw new DOMException("Aborted", "AbortError");
  }

  const tracer = await loadImageTracer();
  const { width, height } = getTraceDimensions(sourceWidth, sourceHeight);
  const canvas = drawImageToTraceCanvas(image, width, height);
  let imageData = imageDataFromCanvas(canvas);

  if (settings.colorMode !== "color") {
    imageData = toGrayscaleImageData(imageData);
  }

  await new Promise<void>((resolve) => {
    window.setTimeout(resolve, 0);
  });

  if (shouldCancel?.()) {
    throw new DOMException("Aborted", "AbortError");
  }

  const svg = tracer.imagedataToSVG(imageData, buildTracerOptions(settings));

  if (shouldCancel?.()) {
    throw new DOMException("Aborted", "AbortError");
  }

  return svg;
}

export function buildSvgDownloadFilename(sourceName: string): string {
  const base = sourceName.replace(/\.[^.]+$/, "");
  return `${base}-traced.svg`;
}

export async function downloadSvgFile(
  svg: string,
  filename: string,
): Promise<void> {
  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename.endsWith(".svg") ? filename : `${filename}.svg`;
  anchor.click();
  URL.revokeObjectURL(url);
}
