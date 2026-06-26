"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { applyCornerRadiusToCanvas } from "@/lib/roundCorners";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useToast } from "@/components/ui/ToastProvider";
import { translateErrorMessage } from "@/i18n";
import {
  useOptionalWorkspaceImageQueuePublisher,
  type WorkspaceQueueItem,
} from "@/hooks/WorkspaceImageQueueContext";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ImageFormat = "png" | "jpeg" | "webp";

export interface CropRegion {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type RotationDegrees = 0 | 90 | 180 | 270;

export interface ImageTransform {
  rotation?: RotationDegrees;
  flipHorizontal?: boolean;
  flipVertical?: boolean;
}

export type WatermarkPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface WatermarkSettings {
  opacity: number;
  position: WatermarkPosition;
  /** Scale relative to the main image width (0–1). */
  scale: number;
}

export interface WatermarkLayer extends WatermarkSettings {
  image: HTMLImageElement;
}

export interface ProcessingOptions {
  width: number;
  height: number;
  format?: ImageFormat;
  quality?: number;
  /** Source rectangle to crop from the original image (natural pixels). */
  crop?: CropRegion;
  /** Rotation and flip applied when drawing to canvas. */
  transform?: ImageTransform;
  /** Watermark overlay applied after the base image is drawn. */
  watermark?: WatermarkLayer;
  /** Strip EXIF/IPTC/XMP metadata from output. Defaults to true. */
  stripMetadata?: boolean;
  /** Rounded corner radius in output pixels. Defaults to 0. */
  cornerRadius?: number;
  /** Optional canvas to reuse instead of creating a new one. */
  canvas?: HTMLCanvasElement | null;
}

export interface ParsedImage {
  image: HTMLImageElement;
  objectUrl: string;
  file: File;
  width: number;
  height: number;
  name: string;
}

export interface ProcessedImage {
  canvas: HTMLCanvasElement;
  blob: Blob;
  format: ImageFormat;
  width: number;
  height: number;
  metadataStripped: boolean;
}

export interface ImageSource {
  file: File;
  url: string;
  width: number;
  height: number;
  name: string;
  mimeType: string;
}

export type DownloadOptions = Pick<
  ProcessingOptions,
  "format" | "quality" | "stripMetadata" | "cornerRadius"
>;

export const DEFAULT_STRIP_METADATA = true;
export const DEFAULT_CORNER_RADIUS = 0;

export type WorkspaceLoadMode = "add" | "replace";

export interface UseImageProcessorOptions {
  /** Reset tool-specific state when the user switches images in the filmstrip. */
  onWorkspaceImageSwitch?: () => void;
  /** Show the bottom image filmstrip for multi-image editing. */
  enableWorkspaceQueue?: boolean;
}

function buildImageSource(parsed: ParsedImage): ImageSource {
  return {
    file: parsed.file,
    url: parsed.objectUrl,
    width: parsed.width,
    height: parsed.height,
    name: parsed.name,
    mimeType: parsed.file.type,
  };
}

function buildQueueItem(parsed: ParsedImage, id: string): WorkspaceQueueItem {
  return {
    id,
    file: parsed.file,
    thumbUrl: parsed.objectUrl,
    name: parsed.name,
    width: parsed.width,
    height: parsed.height,
  };
}

// ---------------------------------------------------------------------------
// Loading / parsing
// ---------------------------------------------------------------------------

const FORMAT_MIME: Record<ImageFormat, string> = {
  png: "image/png",
  jpeg: "image/jpeg",
  webp: "image/webp",
};

const MIME_TO_FORMAT: Record<string, ImageFormat> = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/webp": "webp",
};

function revokeObjectUrl(url: string | null | undefined): void {
  if (url) URL.revokeObjectURL(url);
}

function getBaseName(file: File): string {
  return file.name.replace(/\.[^.]+$/, "") || "image";
}

/** Converts a File into a decoded HTMLImageElement via an object URL. */
async function fileToImageElement(
  file: File,
): Promise<{ image: HTMLImageElement; objectUrl: string }> {
  const objectUrl = URL.createObjectURL(file);

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Failed to decode image"));
      img.src = objectUrl;
    });

    return { image, objectUrl };
  } catch (error) {
    revokeObjectUrl(objectUrl);
    throw error;
  }
}

async function parseImageFile(file: File): Promise<ParsedImage> {
  const hasImageMime = file.type.startsWith("image/");
  const hasImageExtension = /\.(jpe?g|png|gif|webp|bmp|avif|svg)$/i.test(
    file.name,
  );

  if (!hasImageMime && !hasImageExtension) {
    throw new Error("Please select a valid image file.");
  }

  const { image, objectUrl } = await fileToImageElement(file);

  return {
    image,
    objectUrl,
    file,
    width: image.naturalWidth,
    height: image.naturalHeight,
    name: getBaseName(file),
  };
}

/** Loads an image file for tools that need direct access to the HTMLImageElement. */
export async function loadImageFromFile(file: File): Promise<ParsedImage> {
  return parseImageFile(file);
}

// ---------------------------------------------------------------------------
// Transformation
// ---------------------------------------------------------------------------

export function resolveFormat(
  sourceMime: string,
  requested?: ImageFormat,
): ImageFormat {
  if (requested) return requested;
  return MIME_TO_FORMAT[sourceMime] ?? "png";
}

export function resolveStripMetadata(
  options: Partial<ProcessingOptions>,
): boolean {
  return options.stripMetadata ?? DEFAULT_STRIP_METADATA;
}

export function formatToMime(format: ImageFormat): string {
  return FORMAT_MIME[format];
}

export function formatToExtension(format: ImageFormat): string {
  return format === "jpeg" ? "jpg" : format;
}

export function buildDownloadFilename(
  baseName: string,
  format: ImageFormat,
): string {
  return `${baseName}.${formatToExtension(format)}`;
}

export function getTransformedDimensions(
  width: number,
  height: number,
  rotation: RotationDegrees = 0,
): { width: number; height: number } {
  return rotation === 90 || rotation === 270
    ? { width: height, height: width }
    : { width, height };
}

export function hasActiveTransform(transform?: ImageTransform): boolean {
  if (!transform) return false;
  return (
    (transform.rotation ?? 0) !== 0 ||
    !!transform.flipHorizontal ||
    !!transform.flipVertical
  );
}

function drawTransformedImage(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  outputWidth: number,
  outputHeight: number,
  transform: ImageTransform,
): void {
  const rotation = transform.rotation ?? 0;
  const flipHorizontal = transform.flipHorizontal ?? false;
  const flipVertical = transform.flipVertical ?? false;
  const sourceWidth = image.naturalWidth;
  const sourceHeight = image.naturalHeight;

  ctx.clearRect(0, 0, outputWidth, outputHeight);
  ctx.save();
  ctx.translate(outputWidth / 2, outputHeight / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.scale(flipHorizontal ? -1 : 1, flipVertical ? -1 : 1);
  ctx.drawImage(
    image,
    -sourceWidth / 2,
    -sourceHeight / 2,
    sourceWidth,
    sourceHeight,
  );
  ctx.restore();
}

export function computeWatermarkDimensions(
  mainWidth: number,
  watermarkWidth: number,
  watermarkHeight: number,
  scale: number,
): { width: number; height: number } {
  const targetWidth = mainWidth * scale;
  const aspect = watermarkHeight / watermarkWidth;
  return {
    width: targetWidth,
    height: targetWidth * aspect,
  };
}

export function getWatermarkCoordinates(
  canvasWidth: number,
  canvasHeight: number,
  watermarkWidth: number,
  watermarkHeight: number,
  position: WatermarkPosition,
): { x: number; y: number } {
  const padding = Math.max(8, Math.round(Math.min(canvasWidth, canvasHeight) * 0.02));

  const xLeft = padding;
  const xCenter = (canvasWidth - watermarkWidth) / 2;
  const xRight = canvasWidth - watermarkWidth - padding;
  const yTop = padding;
  const yCenter = (canvasHeight - watermarkHeight) / 2;
  const yBottom = canvasHeight - watermarkHeight - padding;

  switch (position) {
    case "top-left":
      return { x: xLeft, y: yTop };
    case "top-center":
      return { x: xCenter, y: yTop };
    case "top-right":
      return { x: xRight, y: yTop };
    case "center-left":
      return { x: xLeft, y: yCenter };
    case "center":
      return { x: xCenter, y: yCenter };
    case "center-right":
      return { x: xRight, y: yCenter };
    case "bottom-left":
      return { x: xLeft, y: yBottom };
    case "bottom-center":
      return { x: xCenter, y: yBottom };
    case "bottom-right":
      return { x: xRight, y: yBottom };
  }
}

export function drawWatermarkOverlay(
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  watermark: WatermarkLayer,
): void {
  const { width, height } = computeWatermarkDimensions(
    canvasWidth,
    watermark.image.naturalWidth,
    watermark.image.naturalHeight,
    watermark.scale,
  );

  const { x, y } = getWatermarkCoordinates(
    canvasWidth,
    canvasHeight,
    width,
    height,
    watermark.position,
  );

  ctx.save();
  ctx.globalAlpha = watermark.opacity;
  ctx.drawImage(watermark.image, x, y, width, height);
  ctx.restore();
}

export function renderWatermarkedCanvas(
  mainImage: HTMLImageElement,
  canvasWidth: number,
  canvasHeight: number,
  watermark: WatermarkLayer | undefined,
  canvas?: HTMLCanvasElement | null,
): HTMLCanvasElement {
  const target = canvas ?? document.createElement("canvas");
  target.width = canvasWidth;
  target.height = canvasHeight;

  const ctx = target.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context unavailable.");
  }

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(mainImage, 0, 0, canvasWidth, canvasHeight);

  if (watermark) {
    drawWatermarkOverlay(ctx, canvasWidth, canvasHeight, watermark);
  }

  return target;
}

export function transformImage(
  image: HTMLImageElement,
  options: ProcessingOptions,
): HTMLCanvasElement {
  const canvas = options.canvas ?? document.createElement("canvas");
  canvas.width = options.width;
  canvas.height = options.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context unavailable.");
  }

  ctx.clearRect(0, 0, options.width, options.height);

  if (options.crop) {
    const { x, y, width, height } = options.crop;
    ctx.drawImage(image, x, y, width, height, 0, 0, options.width, options.height);
  } else if (options.transform && hasActiveTransform(options.transform)) {
    drawTransformedImage(
      ctx,
      image,
      options.width,
      options.height,
      options.transform,
    );
  } else {
    ctx.drawImage(image, 0, 0, options.width, options.height);
  }

  if (options.watermark) {
    drawWatermarkOverlay(ctx, options.width, options.height, options.watermark);
  }

  return canvas;
}

export function canvasToBlob(
  canvas: HTMLCanvasElement,
  format: ImageFormat,
  quality?: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Failed to encode image."));
      },
      formatToMime(format),
      quality,
    );
  });
}

// ---------------------------------------------------------------------------
// Privacy / metadata stripping
// ---------------------------------------------------------------------------

/**
 * Copies pixel data onto a fresh canvas. Source-file metadata (EXIF, IPTC, XMP)
 * is never written into this buffer — only decoded RGBA pixels are transferred.
 */
function createMetadataFreeCanvas(source: HTMLCanvasElement): HTMLCanvasElement {
  const clean = document.createElement("canvas");
  clean.width = source.width;
  clean.height = source.height;

  const ctx = clean.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context unavailable.");
  }

  ctx.drawImage(source, 0, 0);
  return clean;
}

/** Checks JPEG blobs for an embedded Exif segment (should not appear after canvas export). */
async function verifyMetadataStripped(blob: Blob): Promise<void> {
  if (!blob.type.includes("jpeg")) return;

  const header = new Uint8Array(await blob.slice(0, 512).arrayBuffer());
  for (let i = 0; i < header.length - 3; i++) {
    const isExifMarker =
      header[i] === 0x45 &&
      header[i + 1] === 0x78 &&
      header[i + 2] === 0x69 &&
      header[i + 3] === 0x66;

    if (isExifMarker) {
      throw new Error("Metadata detected in output — export rejected.");
    }
  }
}

function resolveCornerRadius(options: Pick<ProcessingOptions, "cornerRadius">): number {
  const radius = options.cornerRadius ?? DEFAULT_CORNER_RADIUS;
  return Number.isFinite(radius) && radius > 0 ? radius : 0;
}

function canPassthroughOriginal(
  parsed: ParsedImage,
  options: ProcessingOptions,
  format: ImageFormat,
): boolean {
  return (
    !options.crop &&
    !hasActiveTransform(options.transform) &&
    !options.watermark &&
    options.stripMetadata === false &&
    resolveCornerRadius(options) === 0 &&
    parsed.width === options.width &&
    parsed.height === options.height &&
    format === resolveFormat(parsed.file.type) &&
    options.quality === undefined
  );
}

async function exportCanvasBlob(
  canvas: HTMLCanvasElement,
  format: ImageFormat,
  quality: number | undefined,
  stripMetadata: boolean,
  cornerRadius: number,
): Promise<Blob> {
  let exportCanvas = canvas;

  if (cornerRadius > 0) {
    exportCanvas = applyCornerRadiusToCanvas(exportCanvas, cornerRadius);
  }

  if (stripMetadata) {
    exportCanvas = createMetadataFreeCanvas(exportCanvas);
  }

  const blob = await canvasToBlob(exportCanvas, format, quality);

  if (stripMetadata) {
    await verifyMetadataStripped(blob);
  }

  return blob;
}

async function prepareOutputBlob(
  output: HTMLCanvasElement | Blob,
  format: ImageFormat,
  quality: number | undefined,
  stripMetadata: boolean,
  cornerRadius: number,
): Promise<Blob> {
  if (output instanceof HTMLCanvasElement) {
    return exportCanvasBlob(output, format, quality, stripMetadata, cornerRadius);
  }

  if (cornerRadius > 0 || stripMetadata) {
    const bitmap = await createImageBitmap(output);
    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      bitmap.close();
      throw new Error("Canvas context unavailable.");
    }

    ctx.drawImage(bitmap, 0, 0);
    bitmap.close();

    return exportCanvasBlob(canvas, format, quality, stripMetadata, cornerRadius);
  }

  return output;
}

// ---------------------------------------------------------------------------
// Core engine API
// ---------------------------------------------------------------------------

export async function processImage(
  file: File,
  options: ProcessingOptions,
): Promise<ProcessedImage> {
  const parsed = await parseImageFile(file);
  const stripMetadata = resolveStripMetadata(options);
  const cornerRadius = resolveCornerRadius(options);
  const format = resolveFormat(file.type, options.format);

  try {
    const canvas = transformImage(parsed.image, options);

    if (canPassthroughOriginal(parsed, options, format)) {
      return {
        canvas,
        blob: parsed.file,
        format,
        width: options.width,
        height: options.height,
        metadataStripped: false,
      };
    }

    const blob = await exportCanvasBlob(
      canvas,
      format,
      options.quality,
      stripMetadata,
      cornerRadius,
    );

    return {
      canvas,
      blob,
      format,
      width: options.width,
      height: options.height,
      metadataStripped: stripMetadata,
    };
  } finally {
    revokeObjectUrl(parsed.objectUrl);
  }
}

async function blobToPngBlob(blob: Blob): Promise<Blob> {
  const bitmap = await createImageBitmap(blob);
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    throw new Error("Canvas context unavailable.");
  }

  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();

  return exportCanvasBlob(canvas, "png", undefined, true, 0);
}

export async function copyImageToClipboard(
  output: HTMLCanvasElement | Blob,
  options?: DownloadOptions,
): Promise<void> {
  if (!navigator.clipboard?.write) {
    throw new Error("Clipboard is not supported in this browser.");
  }

  const stripMetadata = resolveStripMetadata(options ?? {});
  const cornerRadius = resolveCornerRadius(options ?? {});
  const format = options?.format ?? "png";

  const pngBlob =
    output instanceof HTMLCanvasElement || cornerRadius > 0 || stripMetadata
      ? await prepareOutputBlob(
          output,
          "png",
          options?.quality,
          stripMetadata,
          cornerRadius,
        )
      : output.type === "image/png"
        ? output
        : await blobToPngBlob(output);

  await navigator.clipboard.write([
    new ClipboardItem({ "image/png": pngBlob }),
  ]);
}

export async function handleDownload(
  output: HTMLCanvasElement | Blob,
  filename: string,
  options?: DownloadOptions,
): Promise<void> {
  const stripMetadata = resolveStripMetadata(options ?? {});
  const cornerRadius = resolveCornerRadius(options ?? {});
  const format = options?.format ?? "png";

  const blob = await prepareOutputBlob(
    output,
    format,
    options?.quality,
    stripMetadata,
    cornerRadius,
  );

  const hasExtension = /\.[a-z0-9]+$/i.test(filename);
  const fullName = hasExtension
    ? filename
    : `${filename}.${formatToExtension(format)}`;

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fullName;
  anchor.click();
  revokeObjectUrl(url);
}

// ---------------------------------------------------------------------------
// React hook
// ---------------------------------------------------------------------------

export function useImageProcessor(options: UseImageProcessorOptions = {}) {
  const {
    onWorkspaceImageSwitch,
    enableWorkspaceQueue = true,
  } = options;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewUrlRef = useRef<string | null>(null);
  const workspaceItemsRef = useRef<WorkspaceQueueItem[]>([]);
  const onWorkspaceImageSwitchRef = useRef(onWorkspaceImageSwitch);
  const publishWorkspaceQueue = useOptionalWorkspaceImageQueuePublisher();
  const { t, language } = useLanguage();
  const { showToast } = useToast();

  const [source, setSource] = useState<ImageSource | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [workspaceItems, setWorkspaceItems] = useState<WorkspaceQueueItem[]>([]);
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string | null>(null);
  const [isWorkspaceLoading, setIsWorkspaceLoading] = useState(false);

  useEffect(() => {
    onWorkspaceImageSwitchRef.current = onWorkspaceImageSwitch;
  }, [onWorkspaceImageSwitch]);

  useEffect(() => {
    workspaceItemsRef.current = workspaceItems;
  }, [workspaceItems]);

  useEffect(() => {
    if (!enableWorkspaceQueue || !source || workspaceItems.length > 0) return;

    const id = crypto.randomUUID();
    const item: WorkspaceQueueItem = {
      id,
      file: source.file,
      thumbUrl: source.url,
      name: source.name,
      width: source.width,
      height: source.height,
    };

    workspaceItemsRef.current = [item];
    setWorkspaceItems([item]);
    setActiveWorkspaceId(id);
  }, [enableWorkspaceQueue, source, workspaceItems.length]);

  const revokeWorkspaceItemUrl = useCallback((id: string) => {
    const item = workspaceItemsRef.current.find((entry) => entry.id === id);
    if (item) revokeObjectUrl(item.thumbUrl);
  }, []);

  const clearPreviewUrl = useCallback(() => {
    const current = previewUrlRef.current;
    if (!current) return;

    const stillUsed = workspaceItemsRef.current.some(
      (item) => item.thumbUrl === current,
    );

    if (!stillUsed) {
      revokeObjectUrl(current);
    }

    previewUrlRef.current = null;
  }, []);

  const clearWorkspaceQueue = useCallback(() => {
    for (const item of workspaceItemsRef.current) {
      revokeObjectUrl(item.thumbUrl);
    }
    workspaceItemsRef.current = [];
    setWorkspaceItems([]);
    setActiveWorkspaceId(null);
  }, []);

  const applyParsedImage = useCallback(
    (parsed: ParsedImage, itemId: string | null) => {
      clearPreviewUrl();
      previewUrlRef.current = parsed.objectUrl;
      setSource(buildImageSource(parsed));
      setActiveWorkspaceId(itemId);
    },
    [clearPreviewUrl],
  );

  const activateWorkspaceItem = useCallback(
    async (id: string) => {
      if (!enableWorkspaceQueue) return;

      const item = workspaceItemsRef.current.find((entry) => entry.id === id);
      if (!item || id === activeWorkspaceId) return;

      onWorkspaceImageSwitchRef.current?.();
      clearPreviewUrl();
      previewUrlRef.current = item.thumbUrl;
      setSource({
        file: item.file,
        url: item.thumbUrl,
        width: item.width,
        height: item.height,
        name: item.name,
        mimeType: item.file.type,
      });
      setActiveWorkspaceId(id);
      setError(null);
    },
    [activeWorkspaceId, clearPreviewUrl, enableWorkspaceQueue],
  );

  const loadFile = useCallback(
    async (file: File, workspaceMode: WorkspaceLoadMode = "replace") => {
      setError(null);

      try {
        const parsed = await parseImageFile(file);

        if (!enableWorkspaceQueue) {
          applyParsedImage(parsed, null);
          return;
        }

        if (workspaceMode === "add" || workspaceItemsRef.current.length === 0) {
          if (
            workspaceMode === "add" &&
            workspaceItemsRef.current.length > 0
          ) {
            onWorkspaceImageSwitchRef.current?.();
          }

          const id = crypto.randomUUID();
          const item = buildQueueItem(parsed, id);
          setWorkspaceItems((current) => [...current, item]);
          applyParsedImage(parsed, id);
          return;
        }

        const activeId = activeWorkspaceId;
        if (!activeId) {
          const id = crypto.randomUUID();
          const item = buildQueueItem(parsed, id);
          setWorkspaceItems([item]);
          applyParsedImage(parsed, id);
          return;
        }

        revokeWorkspaceItemUrl(activeId);
        const item = buildQueueItem(parsed, activeId);
        setWorkspaceItems((current) =>
          current.map((entry) => (entry.id === activeId ? item : entry)),
        );
        applyParsedImage(parsed, activeId);
      } catch (cause) {
        const message =
          cause instanceof Error
            ? translateErrorMessage(language, cause.message)
            : t("errors.loadImageFailed");
        setError(message);
      }
    },
    [
      activeWorkspaceId,
      applyParsedImage,
      enableWorkspaceQueue,
      language,
      revokeWorkspaceItemUrl,
      t,
    ],
  );

  const addWorkspaceFiles = useCallback(
    async (fileList: FileList | File[]) => {
      if (!enableWorkspaceQueue) return;

      const files = Array.from(fileList).filter((file) =>
        file.type.startsWith("image/"),
      );

      if (files.length === 0) {
        setError(t("errors.invalidImageFiles"));
        return;
      }

      setIsWorkspaceLoading(true);
      setError(null);

      try {
        for (const file of files) {
          await loadFile(file, "add");
        }
      } finally {
        setIsWorkspaceLoading(false);
      }
    },
    [enableWorkspaceQueue, loadFile, t],
  );

  const clear = useCallback(() => {
    clearPreviewUrl();
    clearWorkspaceQueue();
    setSource(null);
    setError(null);
  }, [clearPreviewUrl, clearWorkspaceQueue]);

  const runProcessImage = useCallback(
    async (
      file: File,
      options: ProcessingOptions,
    ): Promise<ProcessedImage | null> => {
      setIsProcessing(true);
      setError(null);

      try {
        return await processImage(file, {
          stripMetadata: DEFAULT_STRIP_METADATA,
          ...options,
          canvas: options.canvas ?? canvasRef.current,
        });
      } catch (cause) {
        const message =
          cause instanceof Error
            ? translateErrorMessage(language, cause.message)
            : t("errors.processingFailed");
        setError(message);
        return null;
      } finally {
        setIsProcessing(false);
      }
    },
    [language, t],
  );

  const runHandleDownload = useCallback(
    async (
      output: HTMLCanvasElement | Blob,
      filename: string,
      options?: DownloadOptions,
    ) => {
      setError(null);

      try {
        const format = options?.format ?? "png";
        const hasExtension = /\.[a-z0-9]+$/i.test(filename);
        const fullName = hasExtension
          ? filename
          : `${filename}.${formatToExtension(format)}`;

        await handleDownload(output, filename, {
          stripMetadata: DEFAULT_STRIP_METADATA,
          cornerRadius: DEFAULT_CORNER_RADIUS,
          ...options,
        });

        showToast(t("toast.fileGenerated", { filename: fullName }), {
          title: t("toast.conversionHistory"),
        });
      } catch (cause) {
        const message =
          cause instanceof Error
            ? translateErrorMessage(language, cause.message)
            : t("errors.downloadFailed");
        setError(message);
      }
    },
    [language, showToast, t],
  );

  const runHandleCopyToClipboard = useCallback(
    async (output: HTMLCanvasElement | Blob, options?: DownloadOptions) => {
      setError(null);

      try {
        await copyImageToClipboard(output, {
          stripMetadata: DEFAULT_STRIP_METADATA,
          cornerRadius: DEFAULT_CORNER_RADIUS,
          ...options,
        });

        showToast(t("toast.imageCopiedPaste"), {
          title: t("toast.copiedToClipboard"),
        });
      } catch (cause) {
        const message =
          cause instanceof Error
            ? translateErrorMessage(language, cause.message)
            : t("errors.copyImageFailed");
        setError(message);
      }
    },
    [language, showToast, t],
  );

  useEffect(() => {
    return () => {
      clearPreviewUrl();
      for (const item of workspaceItemsRef.current) {
        revokeObjectUrl(item.thumbUrl);
      }
    };
  }, [clearPreviewUrl]);

  useEffect(() => {
    if (!publishWorkspaceQueue || !enableWorkspaceQueue) {
      publishWorkspaceQueue?.(null);
      return;
    }

    if (workspaceItems.length === 0) {
      publishWorkspaceQueue(null);
      return;
    }

    publishWorkspaceQueue({
      items: workspaceItems,
      activeId: activeWorkspaceId,
      isLoading: isWorkspaceLoading,
      selectItem: (id) => {
        void activateWorkspaceItem(id);
      },
      addFiles: (files) => {
        void addWorkspaceFiles(files);
      },
    });
  }, [
    activateWorkspaceItem,
    activeWorkspaceId,
    addWorkspaceFiles,
    enableWorkspaceQueue,
    isWorkspaceLoading,
    publishWorkspaceQueue,
    workspaceItems,
  ]);

  useEffect(() => {
    return () => publishWorkspaceQueue?.(null);
  }, [publishWorkspaceQueue]);

  return {
    canvasRef,
    source,
    error,
    isProcessing,
    loadFile,
    addWorkspaceFiles,
    workspaceItems,
    activeWorkspaceId,
    activateWorkspaceItem,
    clear,
    processImage: runProcessImage,
    handleDownload: runHandleDownload,
    handleCopyToClipboard: runHandleCopyToClipboard,
    setError,
  };
}
