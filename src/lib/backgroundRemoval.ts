export type {
  BackgroundMode,
  BackgroundRemovalOptions,
  RemovalPhase,
  RemovalProgress,
} from "@/lib/backgroundRemoval/types";

export {
  assertSegmentationModelAssetPresent,
  getSegmentationModelMissingMessage,
  isSegmentationModelAssetPresent,
  resetSegmentationModelAssetCheck,
  SEGMENTATION_MODEL_FILENAME,
  SEGMENTATION_MODEL_PUBLIC_DIR,
} from "@/lib/backgroundRemoval/modelAssetCheck";

export {
  disposeBackgroundRemovalEngine,
  getBackgroundRemovalEngineError,
  hasBackgroundRemovalEngineFailed,
  isBackgroundRemovalEngineAvailable,
  isBackgroundRemovalModelReady,
  removeImageBackgroundInWorker as removeImageBackground,
  resetBackgroundRemovalEngine,
  warmBackgroundRemovalEngine,
} from "@/lib/backgroundRemoval/engine";

export {
  disposeClickSegmentationEngine,
  encodeClickSegmentationImage,
  getClickSegmentationError,
  hasClickSegmentationFailed,
  isClickSegmentationAvailable,
  isClickSegmentationReady,
  segmentAtClick,
  warmClickSegmentationEngine,
  type ClickSegmentationEmbedding,
} from "@/lib/backgroundRemoval/clickSegmentationEngine";

function loadImageElement(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to load image."));
    image.src = url;
  });
}

export async function blobToImage(blob: Blob): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(blob);
  try {
    return await loadImageElement(url);
  } finally {
    URL.revokeObjectURL(url);
  }
}

function drawImageCover(
  ctx: CanvasRenderingContext2D,
  source: CanvasImageSource,
  x: number,
  y: number,
  width: number,
  height: number,
): void {
  const sourceWidth =
    "naturalWidth" in source ? source.naturalWidth : (source as ImageBitmap).width;
  const sourceHeight =
    "naturalHeight" in source
      ? source.naturalHeight
      : (source as ImageBitmap).height;

  if (!sourceWidth || !sourceHeight) return;

  const scale = Math.max(width / sourceWidth, height / sourceHeight);
  const drawWidth = sourceWidth * scale;
  const drawHeight = sourceHeight * scale;
  const offsetX = x + (width - drawWidth) / 2;
  const offsetY = y + (height - drawHeight) / 2;

  ctx.drawImage(source, offsetX, offsetY, drawWidth, drawHeight);
}

function getCanvasSourceSize(source: CanvasImageSource): { width: number; height: number } {
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

export function renderResultToCanvas(
  image: CanvasImageSource,
  options: import("@/lib/backgroundRemoval/types").BackgroundRemovalOptions,
): HTMLCanvasElement {
  const { width, height } = getCanvasSourceSize(image);
  const canvas = options.canvas ?? document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context unavailable.");
  }

  const backgroundOpacity = (options.backgroundOpacity ?? 100) / 100;
  const subjectOpacity = (options.subjectOpacity ?? 100) / 100;

  ctx.clearRect(0, 0, width, height);

  if (options.backgroundMode === "solid" && options.backgroundColor) {
    ctx.save();
    ctx.globalAlpha = backgroundOpacity;
    ctx.fillStyle = options.backgroundColor;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  } else if (options.backgroundMode === "image" && options.backgroundImage) {
    ctx.save();
    ctx.globalAlpha = backgroundOpacity;
    drawImageCover(ctx, options.backgroundImage, 0, 0, width, height);
    ctx.restore();
  }

  ctx.save();
  ctx.globalAlpha = subjectOpacity;
  ctx.drawImage(image, 0, 0, width, height);
  ctx.restore();

  return canvas;
}

export function canvasToPngBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Failed to encode PNG."));
      },
      "image/png",
    );
  });
}
