"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { resolveErrorMessage } from "@/i18n";
import { ImageFileInput } from "@/components/ui/ImageFileInput";
import { ImageUploadDropzone } from "@/components/ui/ImageUploadDropzone";
import { StripMetadataToggle } from "@/components/tools/StripMetadataToggle";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import {
  buildDownloadFilename,
  useImageProcessor,
} from "@/hooks/useImageProcessor";
import {
  applySegmentationMask,
  canvasToPngBlob,
  getPersonSegmentationMask,
  loadBodyPixModel,
  type BackgroundMode,
  type SegmentationMask,
} from "@/lib/bodyPixRemoval";

const toggleButtonClassName =
  "min-h-10 flex-1 rounded-sm border border-border bg-background px-3 py-2 font-label text-muted transition-colors hover:border-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40";

const activeToggleClassName = "border-accent/40 bg-accent-muted text-accent";

type ProcessingPhase = "idle" | "loading-model" | "segmenting";

function loadImageElement(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to load image."));
    image.src = url;
  });
}

export function BackgroundRemover() {
  const { t, language } = useLanguage();
  const {
    canvasRef,
    source,
    error,
    loadFile,
    handleDownload,
    handleCopyToClipboard,
    setError,
  } = useImageProcessor();

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const sourceImageRef = useRef<HTMLImageElement | null>(null);
  const maskRef = useRef<SegmentationMask | null>(null);

  const [backgroundMode, setBackgroundMode] =
    useState<BackgroundMode>("transparent");
  const [backgroundColor, setBackgroundColor] = useState("#121212");
  const [stripMetadata, setStripMetadata] = useState(true);
  const [processingPhase, setProcessingPhase] = useState<ProcessingPhase>("idle");
  const [hasProcessed, setHasProcessed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const isBusy = processingPhase !== "idle";

  const paintPreview = useCallback(
    (mode: BackgroundMode, color: string) => {
      const canvas = previewCanvasRef.current;
      const image = sourceImageRef.current;
      const mask = maskRef.current;

      if (!canvas || !image || !mask) return;

      applySegmentationMask(image, mask, {
        backgroundMode: mode,
        backgroundColor: mode === "solid" ? color : undefined,
        canvas,
      });
    },
    [],
  );

  useLayoutEffect(() => {
    if (!hasProcessed) return;
    paintPreview(backgroundMode, backgroundColor);
  }, [hasProcessed, backgroundMode, backgroundColor, paintPreview]);

  useEffect(() => {
    if (!source) {
      sourceImageRef.current = null;
      return;
    }

    let cancelled = false;

    void loadImageElement(source.url).then((image) => {
      if (!cancelled) {
        sourceImageRef.current = image;
      }
    });

    return () => {
      cancelled = true;
    };
  }, [source]);

  const resetProcessing = useCallback(() => {
    maskRef.current = null;
    setHasProcessed(false);
  }, []);

  const handleFileChange = useCallback(
    (file: File | null) => {
      resetProcessing();
      if (file) void loadFile(file);
    },
    [loadFile, resetProcessing],
  );

  const handleModeChange = useCallback((mode: BackgroundMode) => {
    setBackgroundMode(mode);
  }, []);

  const handleColorChange = useCallback((color: string) => {
    setBackgroundColor(color);
  }, []);

  const handleProcess = useCallback(async () => {
    if (!source) return;

    setError(null);
    setProcessingPhase("loading-model");

    try {
      await loadBodyPixModel();
      setProcessingPhase("segmenting");

      const image = await loadImageElement(source.url);
      sourceImageRef.current = image;

      const mask = await getPersonSegmentationMask(image);
      maskRef.current = mask;
      setHasProcessed(true);
    } catch (cause) {
      setError(resolveErrorMessage(language, cause, "errors.backgroundRemovalFailed"));
    } finally {
      setProcessingPhase("idle");
    }
  }, [source, setError]);

  const handleDownloadImage = useCallback(async () => {
    if (!source || !maskRef.current || !sourceImageRef.current) return;

    setError(null);

    try {
      const resultCanvas = applySegmentationMask(
        sourceImageRef.current,
        maskRef.current,
        {
          backgroundMode,
          backgroundColor:
            backgroundMode === "solid" ? backgroundColor : undefined,
          canvas: canvasRef.current,
        },
      );

      const blob = await canvasToPngBlob(resultCanvas);

      await handleDownload(
        blob,
        buildDownloadFilename(`${source.name}-nobg`, "png"),
        { stripMetadata },
      );
    } catch (cause) {
      setError(resolveErrorMessage(language, cause, "errors.downloadFailed"));
    }
  }, [
    source,
    backgroundMode,
    backgroundColor,
    stripMetadata,
    handleDownload,
    canvasRef,
    setError,
  ]);

  const handleCopyImage = useCallback(async () => {
    if (!source || !maskRef.current || !sourceImageRef.current) return;

    setError(null);

    try {
      const resultCanvas = applySegmentationMask(
        sourceImageRef.current,
        maskRef.current,
        {
          backgroundMode,
          backgroundColor:
            backgroundMode === "solid" ? backgroundColor : undefined,
          canvas: canvasRef.current,
        },
      );

      const blob = await canvasToPngBlob(resultCanvas);
      await handleCopyToClipboard(blob, { stripMetadata, format: "png" });
    } catch (cause) {
      setError(resolveErrorMessage(language, cause, "errors.copyImageFailed"));
    }
  }, [
    source,
    backgroundMode,
    backgroundColor,
    stripMetadata,
    handleCopyToClipboard,
    canvasRef,
    setError,
  ]);

  const processingLabel =
    processingPhase === "loading-model"
      ? t("toolUi.bgRemover.loadingModel")
      : processingPhase === "segmenting"
        ? t("toolUi.bgRemover.segmenting")
        : null;

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="glass-panel rounded-sm border border-border p-4 sm:p-6">
        {!source ? (
          <ImageUploadDropzone
            inputId="bg-remover-upload"
            onFileChange={handleFileChange}
            isDragging={isDragging}
            onDraggingChange={setIsDragging}
            formatHint={t("toolUi.bgRemover.bestResults")}
          />
        ) : (
          <ImageFileInput
            id="bg-remover-replace"
            fileName={source.file.name}
            onFileChange={handleFileChange}
          />
        )}

        <div className="mt-5 space-y-2">
          <span className="font-label text-muted">{t("toolUi.bgRemover.background")}</span>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={!source || isBusy}
              onClick={() => handleModeChange("transparent")}
              className={`${toggleButtonClassName} ${
                backgroundMode === "transparent" ? activeToggleClassName : ""
              }`}
            >
              {t("toolUi.bgRemover.transparent")}
            </button>
            <button
              type="button"
              disabled={!source || isBusy}
              onClick={() => handleModeChange("solid")}
              className={`${toggleButtonClassName} ${
                backgroundMode === "solid" ? activeToggleClassName : ""
              }`}
            >
              {t("toolUi.bgRemover.solidColor")}
            </button>
          </div>
        </div>

        {backgroundMode === "solid" && (
          <div className="mt-4 flex items-center gap-3">
            <label htmlFor="bg-remover-color" className="font-label text-muted">
              {t("common.color")}
            </label>
            <input
              id="bg-remover-color"
              type="color"
              value={backgroundColor}
              disabled={!source || isBusy}
              onInput={(event) => handleColorChange(event.currentTarget.value)}
              onChange={(event) => handleColorChange(event.currentTarget.value)}
              className="h-10 w-14 cursor-pointer rounded-sm border border-border bg-background disabled:cursor-not-allowed disabled:opacity-50"
            />
            <span className="font-mono text-xs text-muted">{backgroundColor}</span>
          </div>
        )}

        <div
          className={`relative mt-5 flex min-h-48 items-center justify-center overflow-hidden rounded-sm border border-border p-3 sm:min-h-56 ${
            backgroundMode === "transparent" && !hasProcessed
              ? "bg-[repeating-conic-gradient(#1a1a1a_0%_25%,#222_0%_50%)] bg-[length:16px_16px]"
              : ""
          }`}
          style={
            backgroundMode === "solid" ? { backgroundColor } : undefined
          }
        >
          {isBusy && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-background/80 backdrop-blur-sm">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-accent" />
              <p className="font-label text-accent">{processingLabel}</p>
              <p className="font-mono text-[10px] text-muted">
                {t("toolUi.bgRemover.processingLocal")}
              </p>
            </div>
          )}

          <canvas
            ref={previewCanvasRef}
            className={`max-h-[min(50vh,420px)] max-w-full ${
              hasProcessed ? "block" : "hidden"
            }`}
          />

          {!hasProcessed && source && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={source.url}
              alt={t("alt.originalPreview")}
              className="max-h-[min(50vh,420px)] max-w-full object-contain"
            />
          )}
        </div>

        {source && (
          <p className="mt-3 text-center font-mono text-xs text-muted">
            {source.width} × {source.height}px · {source.file.name}
            {hasProcessed && backgroundMode === "solid" && (
              <> · {t("toolUi.bgRemover.backgroundColor", { color: backgroundColor })}</>
            )}
          </p>
        )}

        <div className="mt-5 border-t border-border pt-5">
          <StripMetadataToggle
            checked={stripMetadata}
            disabled={!source || isBusy}
            onChange={setStripMetadata}
          />
        </div>

        {error && (
          <p className="mt-4 font-mono text-xs text-red-400" role="alert">
            {error}
          </p>
        )}

        <div className="mt-5 space-y-2">
          <button
            type="button"
            disabled={!source || isBusy}
            onClick={() => void handleProcess()}
            className="min-h-11 w-full rounded-sm border border-border bg-background px-4 py-3 font-label text-foreground transition-colors hover:border-muted disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isBusy ? t("common.processing") : t("toolUi.bgRemover.removeBackground")}
          </button>

          <ToolOutputActions
            onDownload={handleDownloadImage}
            onCopy={handleCopyImage}
            downloadLabel={t("downloads.downloadPng")}
            disabled={!hasProcessed || isBusy}
            isProcessing={isBusy}
          />
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </div>
  );
}
