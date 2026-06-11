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
import { StripMetadataToggle } from "@/components/tools/StripMetadataToggle";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import { ToolFieldsStage } from "@/components/tools/shared/ToolFieldsStage";
import { ToolStyledUploadZone } from "@/components/tools/shared/ToolStyledUploadZone";
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

const inputClassName = "tool-input";

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
    async (file: File, width: number, height: number) => {
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
        const result = await convertFile(item.file, item.width, item.height);
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
  }, [bulk, convertFile, setError, language]);

  const busy = isProcessing || isBatchProcessing || bulk.isLoading;
  const canConvert = !!source && !busy && mode === "single";
  const canBatchConvert = bulk.items.length > 0 && !busy && mode === "batch";
  const outputExtension = formatToExtension(targetFormat);
  const displayError = error ?? bulk.error;
  const hasSource = mode === "single" ? !!source : bulk.items.length > 0;
  const fieldsDisabled = mode === "single" ? !source : bulk.items.length === 0;

  const outputPreview =
    source && mode === "single"
      ? `${source.name}.${outputExtension}`
      : t("toolUi.converter.outputPlaceholder");

  return (
    <ToolWorkspace
      workflowState={{
        hasSource,
        hasConfigured: hasSource,
        isProcessing: busy,
        isReady: mode === "single" ? canConvert : canBatchConvert,
      }}
    >
      <ProcessingModeToggle mode={mode} onChange={handleModeChange} />

      {mode === "single" ? (
        <ToolStyledUploadZone
          inputId="converter-upload"
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
            inputId="converter-batch-upload"
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
            label: t("toolUi.converter.targetFormat"),
            englishLabel: "Format",
            htmlFor: "converter-format",
            children: (
              <select
                id="converter-format"
                value={targetFormat}
                disabled={fieldsDisabled}
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
            ),
          },
          {
            label: t("toolUi.converter.outputLabel"),
            englishLabel: "Output",
            htmlFor: "converter-output-preview",
            accentClass: "text-[var(--glow-purple)]",
            children: (
              <output
                id="converter-output-preview"
                className={`${inputClassName} block truncate ${fieldsDisabled ? "text-muted" : ""}`}
              >
                {outputPreview}
              </output>
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

      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </ToolWorkspace>
  );
}
