"use client";

import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { HelperErrorAlert } from "@/components/characters/HelperErrorAlert";
import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { resolveErrorMessage } from "@/i18n";
import { BulkFileQueue } from "@/components/tools/BulkFileQueue";
import { ImageUploadDropzone } from "@/components/ui/ImageUploadDropzone";
import {
  ProcessingModeToggle,
  type ProcessingMode,
} from "@/components/tools/ProcessingModeToggle";
import { SliderControl } from "@/components/ui/SliderControl";
import { StripMetadataToggle } from "@/components/tools/StripMetadataToggle";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import { useBulkFiles } from "@/hooks/useBulkFiles";
import {
  buildDownloadFilename,
  processImage as processImageCore,
  resolveFormat,
  type ImageFormat,
  useImageProcessor,
} from "@/hooks/useImageProcessor";
import { downloadZipArchive } from "@/lib/zipDownload";

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getCompressionFormat(sourceMime: string): ImageFormat {
  const format = resolveFormat(sourceMime);
  return format === "png" ? "webp" : format;
}

export function Compressor() {
  const { t, language } = useLanguage();
  const {
    canvasRef,
    source,
    error,
    isProcessing,
    loadFile,
    processImage,
    handleDownload,
    handleCopyToClipboard,
    setError,
  } = useImageProcessor();

  const bulk = useBulkFiles();

  const [mode, setMode] = useState<ProcessingMode>("single");
  const [quality, setQuality] = useState(80);
  const [stripMetadata, setStripMetadata] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [estimatedSize, setEstimatedSize] = useState<number | null>(null);
  const [isEstimating, setIsEstimating] = useState(false);
  const [isBatchProcessing, setIsBatchProcessing] = useState(false);

  const outputFormat = source ? getCompressionFormat(source.mimeType) : "jpeg";
  const qualityNormalized = quality / 100;

  const handleModeChange = useCallback(
    (nextMode: ProcessingMode) => {
      setMode(nextMode);
      setError(null);
      bulk.setError(null);
    },
    [bulk, setError],
  );

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) void loadFile(file);
    },
    [loadFile],
  );

  useEffect(() => {
    if (!source || mode !== "single") {
      setEstimatedSize(null);
      return;
    }

    let cancelled = false;
    setIsEstimating(true);

    const timer = window.setTimeout(() => {
      void (async () => {
        try {
          const result = await processImageCore(source.file, {
            width: source.width,
            height: source.height,
            format: outputFormat,
            quality: qualityNormalized,
            stripMetadata,
            canvas: canvasRef.current,
          });

          if (cancelled) return;
          setEstimatedSize(result.blob.size);
        } catch {
          if (!cancelled) setEstimatedSize(null);
        } finally {
          if (!cancelled) setIsEstimating(false);
        }
      })();
    }, 300);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [source, quality, outputFormat, qualityNormalized, stripMetadata, canvasRef, mode]);

  const compressFile = useCallback(
    async (file: File, width: number, height: number, mimeType: string) => {
      const format = getCompressionFormat(mimeType);
      return processImageCore(file, {
        width,
        height,
        format,
        quality: qualityNormalized,
        stripMetadata,
        canvas: canvasRef.current,
      });
    },
    [qualityNormalized, stripMetadata, canvasRef],
  );

  const handleCompressDownload = useCallback(async () => {
    if (!source) return;

    const result = await processImage(source.file, {
      width: source.width,
      height: source.height,
      format: outputFormat,
      quality: qualityNormalized,
      stripMetadata,
      canvas: canvasRef.current,
    });

    if (!result) return;

    await handleDownload(
      result.blob,
      buildDownloadFilename(`${source.name}-optimized`, result.format),
      { stripMetadata },
    );
  }, [
    source,
    outputFormat,
    qualityNormalized,
    stripMetadata,
    processImage,
    handleDownload,
    canvasRef,
  ]);

  const handleCompressCopy = useCallback(async () => {
    if (!source) return;

    const result = await processImage(source.file, {
      width: source.width,
      height: source.height,
      format: outputFormat,
      quality: qualityNormalized,
      stripMetadata,
      canvas: canvasRef.current,
    });

    if (!result) return;

    await handleCopyToClipboard(result.blob, { stripMetadata });
  }, [
    source,
    outputFormat,
    qualityNormalized,
    stripMetadata,
    processImage,
    handleCopyToClipboard,
    canvasRef,
  ]);

  const handleBatchDownload = useCallback(async () => {
    if (bulk.items.length === 0) return;

    setIsBatchProcessing(true);
    setError(null);
    bulk.setError(null);

    try {
      const entries = [];

      for (const item of bulk.items) {
        const result = await compressFile(
          item.file,
          item.width,
          item.height,
          item.mimeType,
        );
        entries.push({
          filename: buildDownloadFilename(
            `${item.name}-optimized`,
            result.format,
          ),
          blob: result.blob,
        });
      }

      await downloadZipArchive(entries, "pix-8-compressed-images.zip");
    } catch (cause) {
      setError(resolveErrorMessage(language, cause, "errors.batchCompressFailed"));
    } finally {
      setIsBatchProcessing(false);
    }
  }, [bulk, compressFile, setError]);

  const busy = isProcessing || isBatchProcessing || bulk.isLoading;
  const canCompress = !!source && !busy && mode === "single";
  const canBatchCompress = bulk.items.length > 0 && !busy && mode === "batch";
  const originalSize = source?.file.size ?? 0;
  const savings =
    estimatedSize !== null && originalSize > 0
      ? Math.max(0, Math.round((1 - estimatedSize / originalSize) * 100))
      : null;
  const displayError = error ?? bulk.error;

  return (
    <ToolWorkspace>
        <ProcessingModeToggle mode={mode} onChange={handleModeChange} />

        {mode === "single" ? (
          <ImageUploadDropzone
            inputId="compressor-upload"
            onFileChange={handleFileChange}
            isDragging={isDragging}
            onDraggingChange={setIsDragging}
            formatHint={t("upload.formatsHint")}
          >
            {source ? (
              <div className="pointer-events-none flex w-full flex-col items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={source.url}
                  alt={t("alt.preview")}
                  className="max-h-40 max-w-full rounded-sm border border-border object-contain sm:max-h-48"
                />
                <p className="max-w-full truncate px-2 text-center font-mono text-xs text-muted">
                  {source.width} × {source.height}px · {source.file.name}
                </p>
              </div>
            ) : undefined}
          </ImageUploadDropzone>
        ) : (
          <div className="space-y-4">
            <ImageUploadDropzone
              inputId="compressor-batch-upload"
              multiple
              onFileChange={() => {}}
              onFilesChange={(files) => void bulk.addFiles(files)}
              isDragging={isDragging}
              onDraggingChange={setIsDragging}
              title={t("upload.addToBatch")}
              hint={t("upload.dropMultipleHint")}
              className="min-h-32 sm:min-h-32"
            />

            <BulkFileQueue
              items={bulk.items}
              onRemove={bulk.removeFile}
              onClear={bulk.clear}
            />
          </div>
        )}

        <div className="mt-5 space-y-3">
          <SliderControl
            id="compressor-quality"
            label={t("common.quality")}
            value={quality}
            min={0}
            max={100}
            step={1}
            suffix="%"
            disabled={mode === "single" ? !source : bulk.items.length === 0}
            onChange={setQuality}
          />
          <div className="flex justify-between font-mono text-[10px] text-muted">
            <span>{t("toolUi.compressor.smallerFile")}</span>
            <span>{t("toolUi.compressor.higherQuality")}</span>
          </div>
        </div>

        <div className="mt-5 border-t border-border pt-5">
          <StripMetadataToggle
            checked={stripMetadata}
            disabled={mode === "single" ? !source : bulk.items.length === 0}
            onChange={setStripMetadata}
          />
        </div>

        {source && mode === "single" && (
          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-5">
            <div className="space-y-1">
              <p className="font-label text-muted">
                {t("toolUi.compressor.originalSize")}
              </p>
              <p className="font-mono text-sm text-foreground">
                {formatFileSize(originalSize)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-label text-muted">
                {t("toolUi.compressor.estimatedSize")}
              </p>
              <p className="font-mono text-sm text-foreground">
                {isEstimating
                  ? t("toolUi.compressor.calculating")
                  : estimatedSize !== null
                    ? formatFileSize(estimatedSize)
                    : "—"}
              </p>
            </div>
          </div>
        )}

        {source && savings !== null && !isEstimating && mode === "single" && (
          <p className="mt-3 font-mono text-xs text-accent">
            {t("toolUi.compressor.reduction", { percent: savings })}
          </p>
        )}

        {displayError ? (
          <HelperErrorAlert message={displayError} className="mt-4" />
        ) : null}

        {mode === "single" ? (
          <ToolOutputActions
            onDownload={handleCompressDownload}
            onCopy={handleCompressCopy}
            downloadLabel={t("downloads.downloadOptimized")}
            disabled={!canCompress}
            isProcessing={busy}
          />
        ) : (
          <button
            type="button"
            disabled={!canBatchCompress}
            onClick={() => void handleBatchDownload()}
            className="mt-5 min-h-11 w-full rounded-sm border border-border bg-accent-muted px-4 py-3 font-label text-accent transition-colors hover:bg-accent/20 active:bg-accent/25 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {busy ? t("common.processing") : t("downloads.compressAllZip")}
          </button>
        )}
      
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </ToolWorkspace>
  );
}
