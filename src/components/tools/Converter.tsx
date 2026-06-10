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
  type ImageFormat,
  buildDownloadFilename,
  formatToExtension,
  processImage as processImageCore,
  resolveFormat,
  useImageProcessor,
} from "@/hooks/useImageProcessor";
import { downloadZipArchive } from "@/lib/zipDownload";

const inputClassName =
  "w-full min-h-11 rounded-sm border border-border bg-background px-3 py-2.5 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent disabled:cursor-not-allowed disabled:opacity-50";

const FORMAT_OPTIONS: { label: string; value: ImageFormat }[] = [
  { label: "JPG", value: "jpeg" },
  { label: "PNG", value: "png" },
  { label: "WebP", value: "webp" },
];

export function Converter() {
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
  const [targetFormat, setTargetFormat] = useState<ImageFormat>("jpeg");
  const [stripMetadata, setStripMetadata] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [isBatchProcessing, setIsBatchProcessing] = useState(false);

  useEffect(() => {
    if (!source) return;
    setTargetFormat(resolveFormat(source.mimeType));
  }, [source]);

  const quality =
    targetFormat === "jpeg" || targetFormat === "webp" ? 0.92 : undefined;

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

  const convertFile = useCallback(
    async (file: File, width: number, height: number, name: string) => {
      return processImageCore(file, {
        width,
        height,
        format: targetFormat,
        quality,
        stripMetadata,
        canvas: canvasRef.current,
      });
    },
    [targetFormat, quality, stripMetadata, canvasRef],
  );

  const handleConvertDownload = useCallback(async () => {
    if (!source) return;

    const result = await processImage(source.file, {
      width: source.width,
      height: source.height,
      format: targetFormat,
      quality,
      stripMetadata,
      canvas: canvasRef.current,
    });

    if (!result) return;

    await handleDownload(
      result.blob,
      buildDownloadFilename(source.name, result.format),
      { stripMetadata },
    );
  }, [
    source,
    targetFormat,
    quality,
    stripMetadata,
    processImage,
    handleDownload,
    canvasRef,
  ]);

  const handleConvertCopy = useCallback(async () => {
    if (!source) return;

    const result = await processImage(source.file, {
      width: source.width,
      height: source.height,
      format: targetFormat,
      quality,
      stripMetadata,
      canvas: canvasRef.current,
    });

    if (!result) return;

    await handleCopyToClipboard(result.blob, { stripMetadata });
  }, [
    source,
    targetFormat,
    quality,
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
        const result = await convertFile(
          item.file,
          item.width,
          item.height,
          item.name,
        );
        entries.push({
          filename: buildDownloadFilename(item.name, result.format),
          blob: result.blob,
        });
      }

      await downloadZipArchive(entries, "pix-8-converted-images.zip");
    } catch (cause) {
      setError(resolveErrorMessage(language, cause, "errors.batchConvertFailed"));
    } finally {
      setIsBatchProcessing(false);
    }
  }, [bulk, convertFile, setError]);

  const busy = isProcessing || isBatchProcessing || bulk.isLoading;
  const canConvert = !!source && !busy && mode === "single";
  const canBatchConvert = bulk.items.length > 0 && !busy && mode === "batch";
  const outputExtension = formatToExtension(targetFormat);
  const displayError = error ?? bulk.error;

  return (
    <div className="w-full">
      <div className="glass-panel rounded-sm border border-border p-4 sm:p-6">
        <ProcessingModeToggle mode={mode} onChange={handleModeChange} />

        {mode === "single" ? (
          <ImageUploadDropzone
            inputId="converter-upload"
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
              inputId="converter-batch-upload"
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

        <div className="mt-5 space-y-2">
          <label htmlFor="converter-format" className="font-label text-muted">
            {t("toolUi.converter.targetFormat")}
          </label>
          <select
            id="converter-format"
            value={targetFormat}
            disabled={mode === "single" ? !source : bulk.items.length === 0}
            onChange={(event) =>
              setTargetFormat(event.target.value as ImageFormat)
            }
            className={inputClassName}
          >
            {FORMAT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {source && mode === "single" && (
          <p className="mt-3 font-mono text-xs text-muted">
            {t("toolUi.converter.output", {
              name: source.name,
              ext: outputExtension,
            })}
          </p>
        )}

        <div className="mt-5 border-t border-border pt-5">
          <StripMetadataToggle
            checked={stripMetadata}
            disabled={mode === "single" ? !source : bulk.items.length === 0}
            onChange={setStripMetadata}
          />
        </div>

        {displayError && (
          <p className="mt-4 font-mono text-xs text-red-400" role="alert">
            {displayError}
          </p>
        )}

        {mode === "single" ? (
          <ToolOutputActions
            onDownload={handleConvertDownload}
            onCopy={handleConvertCopy}
            downloadLabel={t("downloads.convertAndDownload")}
            disabled={!canConvert}
            isProcessing={busy}
          />
        ) : (
          <button
            type="button"
            disabled={!canBatchConvert}
            onClick={() => void handleBatchDownload()}
            className="mt-5 min-h-11 w-full rounded-sm border border-border bg-accent-muted px-4 py-3 font-label text-accent transition-colors hover:bg-accent/20 active:bg-accent/25 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {busy ? t("common.processing") : t("downloads.convertAllZip")}
          </button>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </div>
  );
}
