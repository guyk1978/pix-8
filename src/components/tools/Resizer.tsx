"use client";

import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { resolveErrorMessage } from "@/i18n";
import { BulkFileQueue } from "@/components/tools/BulkFileQueue";
import { ImageUploadDropzone } from "@/components/ui/ImageUploadDropzone";
import {
  ProcessingModeToggle,
  type ProcessingMode,
} from "@/components/tools/ProcessingModeToggle";
import { StripMetadataToggle } from "@/components/tools/StripMetadataToggle";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import { useBulkFiles } from "@/hooks/useBulkFiles";
import {
  buildDownloadFilename,
  processImage as processImageCore,
  resolveFormat,
  useImageProcessor,
} from "@/hooks/useImageProcessor";
import { downloadZipArchive } from "@/lib/zipDownload";

const inputClassName =
  "w-full min-h-11 rounded-sm border border-border bg-background px-3 py-2.5 font-mono text-sm text-foreground tabular-nums outline-none transition-colors placeholder:text-muted focus:border-accent disabled:cursor-not-allowed disabled:opacity-50";

function resolveTargetDimensions(
  sourceWidth: number,
  sourceHeight: number,
  targetWidth: number,
  targetHeight: number,
  lockAspectRatio: boolean,
): { width: number; height: number } {
  if (!lockAspectRatio) {
    return { width: targetWidth, height: targetHeight };
  }

  const aspectRatio = sourceWidth / sourceHeight;
  const widthDriven = targetWidth / sourceWidth <= targetHeight / sourceHeight;

  if (widthDriven) {
    return {
      width: targetWidth,
      height: Math.max(1, Math.round(targetWidth / aspectRatio)),
    };
  }

  return {
    width: Math.max(1, Math.round(targetHeight * aspectRatio)),
    height: targetHeight,
  };
}

export function Resizer() {
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
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [stripMetadata, setStripMetadata] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [isBatchProcessing, setIsBatchProcessing] = useState(false);

  const aspectRatio =
    source && source.height > 0 ? source.width / source.height : 1;

  useEffect(() => {
    if (!source) {
      setWidth("");
      setHeight("");
      return;
    }

    setWidth(String(source.width));
    setHeight(String(source.height));
  }, [source]);

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

  const handleWidthChange = useCallback(
    (value: string) => {
      setWidth(value);
      if (!lockAspectRatio || !value) return;

      const nextWidth = Number(value);
      if (!Number.isFinite(nextWidth) || nextWidth <= 0) return;

      setHeight(String(Math.round(nextWidth / aspectRatio)));
    },
    [lockAspectRatio, aspectRatio],
  );

  const handleHeightChange = useCallback(
    (value: string) => {
      setHeight(value);
      if (!lockAspectRatio || !value) return;

      const nextHeight = Number(value);
      if (!Number.isFinite(nextHeight) || nextHeight <= 0) return;

      setWidth(String(Math.round(nextHeight * aspectRatio)));
    },
    [lockAspectRatio, aspectRatio],
  );

  const parsedWidth = Number(width);
  const parsedHeight = Number(height);
  const hasValidDimensions =
    Number.isFinite(parsedWidth) &&
    Number.isFinite(parsedHeight) &&
    parsedWidth > 0 &&
    parsedHeight > 0;

  const runResizeForFile = useCallback(
    async (file: File, fileWidth: number, fileHeight: number) => {
      const dimensions = resolveTargetDimensions(
        fileWidth,
        fileHeight,
        parsedWidth,
        parsedHeight,
        lockAspectRatio,
      );

      return processImageCore(file, {
        width: dimensions.width,
        height: dimensions.height,
        format: resolveFormat(file.type),
        stripMetadata,
        canvas: canvasRef.current,
      });
    },
    [parsedWidth, parsedHeight, lockAspectRatio, stripMetadata, canvasRef],
  );

  const handleResizeDownload = useCallback(async () => {
    if (!source || !hasValidDimensions) return;

    const result = await processImage(source.file, {
      width: parsedWidth,
      height: parsedHeight,
      format: resolveFormat(source.mimeType),
      stripMetadata,
      canvas: canvasRef.current,
    });

    if (!result) return;

    await handleDownload(
      result.blob,
      buildDownloadFilename(`${source.name}-resized`, result.format),
      { stripMetadata },
    );
  }, [
    source,
    hasValidDimensions,
    parsedWidth,
    parsedHeight,
    stripMetadata,
    processImage,
    handleDownload,
    canvasRef,
  ]);

  const handleResizeCopy = useCallback(async () => {
    if (!source || !hasValidDimensions) return;

    const result = await processImage(source.file, {
      width: parsedWidth,
      height: parsedHeight,
      format: resolveFormat(source.mimeType),
      stripMetadata,
      canvas: canvasRef.current,
    });

    if (!result) return;

    await handleCopyToClipboard(result.blob, { stripMetadata });
  }, [
    source,
    hasValidDimensions,
    parsedWidth,
    parsedHeight,
    stripMetadata,
    processImage,
    handleCopyToClipboard,
    canvasRef,
  ]);

  const handleBatchDownload = useCallback(async () => {
    if (!hasValidDimensions || bulk.items.length === 0) return;

    setIsBatchProcessing(true);
    setError(null);
    bulk.setError(null);

    try {
      const entries = [];

      for (const item of bulk.items) {
        const result = await runResizeForFile(
          item.file,
          item.width,
          item.height,
        );
        entries.push({
          filename: buildDownloadFilename(
            `${item.name}-resized`,
            result.format,
          ),
          blob: result.blob,
        });
      }

      await downloadZipArchive(entries, "pix-8-resized-images.zip");
    } catch (cause) {
      setError(resolveErrorMessage(language, cause, "errors.batchResizeFailed"));
    } finally {
      setIsBatchProcessing(false);
    }
  }, [hasValidDimensions, bulk, runResizeForFile, setError]);

  const canResize =
    !!source && hasValidDimensions && !isProcessing && !isBatchProcessing;
  const canBatchResize =
    bulk.items.length > 0 && hasValidDimensions && !isBatchProcessing;
  const busy = isProcessing || isBatchProcessing || bulk.isLoading;
  const displayError = error ?? bulk.error;

  return (
    <div className="w-full">
      <div className="glass-panel rounded-sm border border-border p-4 sm:p-6">
        <ProcessingModeToggle mode={mode} onChange={handleModeChange} />

        {mode === "single" ? (
          <ImageUploadDropzone
            inputId="resizer-upload"
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
              inputId="resizer-batch-upload"
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

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="resizer-width" className="font-label text-muted">
              {t("common.width")}
            </label>
            <input
              id="resizer-width"
              type="number"
              inputMode="numeric"
              min={1}
              value={width}
              disabled={mode === "single" ? !source : bulk.items.length === 0}
              onChange={(event) => handleWidthChange(event.target.value)}
              className={inputClassName}
              placeholder="—"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="resizer-height" className="font-label text-muted">
              {t("common.height")}
            </label>
            <input
              id="resizer-height"
              type="number"
              inputMode="numeric"
              min={1}
              value={height}
              disabled={mode === "single" ? !source : bulk.items.length === 0}
              onChange={(event) => handleHeightChange(event.target.value)}
              className={inputClassName}
              placeholder="—"
            />
          </div>
        </div>

        <div className="mt-5 space-y-3 border-t border-border pt-5">
          <StripMetadataToggle
            checked={stripMetadata}
            disabled={mode === "single" ? !source : bulk.items.length === 0}
            onChange={setStripMetadata}
          />
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex min-h-11 cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={lockAspectRatio}
              disabled={mode === "single" ? !source : bulk.items.length === 0}
              onChange={(event) => setLockAspectRatio(event.target.checked)}
              className="h-4 w-4 shrink-0 rounded-sm border border-border bg-background accent-accent"
            />
            <span className="font-label text-muted">
              {t("toolUi.resizer.maintainAspectRatio")}
            </span>
          </label>

          {source && lockAspectRatio && mode === "single" && (
            <span className="font-mono text-xs tabular-nums text-muted sm:text-right">
              {aspectRatio.toFixed(3)} : 1
            </span>
          )}
        </div>

        {displayError && (
          <p className="mt-4 font-mono text-xs text-red-400" role="alert">
            {displayError}
          </p>
        )}

        {mode === "single" ? (
          <ToolOutputActions
            onDownload={handleResizeDownload}
            onCopy={handleResizeCopy}
            downloadLabel={t("downloads.resizeAndDownload")}
            disabled={!canResize}
            isProcessing={busy}
          />
        ) : (
          <button
            type="button"
            disabled={!canBatchResize}
            onClick={() => void handleBatchDownload()}
            className="mt-5 min-h-11 w-full rounded-sm border border-border bg-accent-muted px-4 py-3 font-label text-accent transition-colors hover:bg-accent/20 active:bg-accent/25 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {busy ? t("common.processing") : t("downloads.resizeAllZip")}
          </button>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </div>
  );
}
