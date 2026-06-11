"use client";

import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { HelperErrorAlert } from "@/components/characters/HelperErrorAlert";
import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { resolveErrorMessage } from "@/i18n";
import { BulkFileQueue } from "@/components/tools/BulkFileQueue";
import {
  ProcessingModeToggle,
  type ProcessingMode,
} from "@/components/tools/ProcessingModeToggle";
import { SliderControl } from "@/components/ui/SliderControl";
import { StripMetadataToggle } from "@/components/tools/StripMetadataToggle";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import { ToolFieldsStage } from "@/components/tools/shared/ToolFieldsStage";
import { ToolStyledUploadZone } from "@/components/tools/shared/ToolStyledUploadZone";
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
  }, [bulk, compressFile, setError, language]);

  const busy = isProcessing || isBatchProcessing || bulk.isLoading;
  const canCompress = !!source && !busy && mode === "single";
  const canBatchCompress = bulk.items.length > 0 && !busy && mode === "batch";
  const originalSize = source?.file.size ?? 0;
  const savings =
    estimatedSize !== null && originalSize > 0
      ? Math.max(0, Math.round((1 - estimatedSize / originalSize) * 100))
      : null;
  const displayError = error ?? bulk.error;
  const hasSource = mode === "single" ? !!source : bulk.items.length > 0;
  const fieldsDisabled = mode === "single" ? !source : bulk.items.length === 0;

  const estimatedDisplay =
    !source || mode !== "single"
      ? "—"
      : isEstimating
        ? t("toolUi.compressor.calculating")
        : estimatedSize !== null
          ? formatFileSize(estimatedSize)
          : "—";

  return (
    <ToolWorkspace
      workflowState={{
        hasSource,
        hasConfigured: hasSource,
        isProcessing: busy,
        isReady: mode === "single" ? canCompress : canBatchCompress,
      }}
    >
      <ProcessingModeToggle mode={mode} onChange={handleModeChange} />

      {mode === "single" ? (
        <ToolStyledUploadZone
          inputId="compressor-upload"
          onFileChange={handleFileChange}
          isDragging={isDragging}
          onDraggingChange={setIsDragging}
        >
          {source ? (
            <div className="pointer-events-none flex w-full flex-col items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={source.url}
                alt={t("alt.preview")}
                className="character-pixelated max-h-40 max-w-full rounded-sm border border-border object-contain sm:max-h-48"
              />
              <p className="max-w-full truncate px-2 text-center font-mono text-xs text-muted">
                {source.width} × {source.height}px · {source.file.name}
              </p>
            </div>
          ) : undefined}
        </ToolStyledUploadZone>
      ) : (
        <div className="space-y-4">
          <ToolStyledUploadZone
            inputId="compressor-batch-upload"
            multiple
            compact
            onFileChange={() => {}}
            onFilesChange={(files) => void bulk.addFiles(files)}
            isDragging={isDragging}
            onDraggingChange={setIsDragging}
            headline={t("upload.dropMultipleHint")}
            formatHint={t("upload.addToBatch")}
          />

          <BulkFileQueue
            items={bulk.items}
            onRemove={bulk.removeFile}
            onClear={bulk.clear}
          />
        </div>
      )}

      <ToolFieldsStage
        robotAlt={t("characters.robotAlt")}
        widthAlt={t("characters.widthAlt")}
        fields={[
          {
            label: t("common.quality"),
            englishLabel: "Quality",
            htmlFor: "compressor-quality",
            children: (
              <div className="px-1 py-2">
                <SliderControl
                  id="compressor-quality"
                  label=""
                  value={quality}
                  min={0}
                  max={100}
                  step={1}
                  suffix="%"
                  disabled={fieldsDisabled}
                  onChange={setQuality}
                />
                <div className="mt-2 flex justify-between font-mono text-[10px] text-muted">
                  <span>{t("toolUi.compressor.smallerFile")}</span>
                  <span>{t("toolUi.compressor.higherQuality")}</span>
                </div>
              </div>
            ),
          },
          {
            label: t("toolUi.compressor.estimatedSize"),
            englishLabel: "Estimated",
            htmlFor: "compressor-estimated-size",
            accentClass: "text-[var(--glow-purple)]",
            children: (
              <div className="tool-input flex min-h-[2.75rem] flex-col justify-center gap-1 border-transparent bg-transparent py-2">
                <output
                  id="compressor-estimated-size"
                  className="font-mono text-sm text-foreground"
                >
                  {estimatedDisplay}
                </output>
                {source && mode === "single" ? (
                  <p className="font-mono text-[10px] text-muted">
                    {t("toolUi.compressor.originalSize")}:{" "}
                    {formatFileSize(originalSize)}
                  </p>
                ) : null}
                {source && savings !== null && !isEstimating && mode === "single" ? (
                  <p className="font-mono text-[10px] text-accent">
                    {t("toolUi.compressor.reduction", { percent: savings })}
                  </p>
                ) : null}
              </div>
            ),
          },
        ]}
      />

      <div className="mt-2 flex justify-end border-t border-border pt-5 rtl:justify-start">
        <StripMetadataToggle
          checked={stripMetadata}
          disabled={fieldsDisabled}
          onChange={setStripMetadata}
        />
      </div>

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
