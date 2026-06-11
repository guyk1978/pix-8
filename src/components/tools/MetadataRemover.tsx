"use client";

import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { HelperErrorAlert } from "@/components/characters/HelperErrorAlert";
import exifr from "exifr";
import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { resolveErrorMessage } from "@/i18n";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import { ToolFieldsStage } from "@/components/tools/shared/ToolFieldsStage";
import { ToolStyledUploadZone } from "@/components/tools/shared/ToolStyledUploadZone";
import {
  buildDownloadFilename,
  resolveFormat,
  useImageProcessor,
} from "@/hooks/useImageProcessor";

interface MetadataField {
  label: string;
  value: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function readMetadataFields(
  file: File,
  t: (key: string) => string,
): Promise<MetadataField[]> {
  try {
    const data = await exifr.parse(file, {
      gps: true,
      tiff: true,
      exif: true,
    });

    if (!data || typeof data !== "object") return [];

    const fields: MetadataField[] = [];
    const record = data as Record<string, unknown>;

    if (record.Make || record.Model) {
      fields.push({
        label: t("toolUi.metadataRemover.device"),
        value: [record.Make, record.Model].filter(Boolean).join(" "),
      });
    }

    if (record.DateTimeOriginal) {
      fields.push({
        label: t("toolUi.metadataRemover.captured"),
        value: String(record.DateTimeOriginal),
      });
    }

    if (record.Software) {
      fields.push({
        label: t("toolUi.metadataRemover.software"),
        value: String(record.Software),
      });
    }

    if (
      typeof record.latitude === "number" &&
      typeof record.longitude === "number"
    ) {
      fields.push({
        label: t("toolUi.metadataRemover.gps"),
        value: `${record.latitude.toFixed(5)}, ${record.longitude.toFixed(5)}`,
      });
    }

    if (record.Orientation) {
      fields.push({
        label: t("toolUi.metadataRemover.orientation"),
        value: String(record.Orientation),
      });
    }

    if (record.ExposureTime || record.FNumber || record.ISO) {
      const parts = [
        record.ExposureTime ? `1/${Math.round(1 / Number(record.ExposureTime))}s` : null,
        record.FNumber ? `f/${record.FNumber}` : null,
        record.ISO ? `ISO ${record.ISO}` : null,
      ].filter(Boolean);
      if (parts.length > 0) {
        fields.push({
          label: t("toolUi.metadataRemover.camera"),
          value: parts.join(" · "),
        });
      }
    }

    return fields;
  } catch {
    return [];
  }
}

export function MetadataRemover() {
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

  const [isDragging, setIsDragging] = useState(false);
  const [metadataFields, setMetadataFields] = useState<MetadataField[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [cleanBlob, setCleanBlob] = useState<Blob | null>(null);
  const [cleanFormat, setCleanFormat] = useState<"png" | "jpeg" | "webp">("jpeg");
  const [metadataRemoved, setMetadataRemoved] = useState(false);

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) void loadFile(file);
    },
    [loadFile],
  );

  useEffect(() => {
    if (!source) {
      setMetadataFields([]);
      setCleanBlob(null);
      setMetadataRemoved(false);
      return;
    }

    let cancelled = false;
    setIsScanning(true);
    setCleanBlob(null);
    setMetadataRemoved(false);
    setError(null);

    void (async () => {
      const fields = await readMetadataFields(source.file, t);
      if (cancelled) return;
      setMetadataFields(fields);

      const format = resolveFormat(source.mimeType);
      const quality =
        format === "jpeg" || format === "webp" ? 0.95 : undefined;

      const result = await processImage(source.file, {
        width: source.width,
        height: source.height,
        format,
        quality,
        stripMetadata: true,
        canvas: canvasRef.current,
      });

      if (cancelled) return;

      if (result?.metadataStripped) {
        setCleanBlob(result.blob);
        setCleanFormat(result.format);
        setMetadataRemoved(true);
      } else if (result) {
        setError(t("toolUi.metadataRemover.verifyFailed"));
      }
    })()
      .catch((cause) => {
        if (cancelled) return;
        setError(
          resolveErrorMessage(language, cause, "toolUi.metadataRemover.removeFailed"),
        );
      })
      .finally(() => {
        if (!cancelled) setIsScanning(false);
      });

    return () => {
      cancelled = true;
    };
  }, [source, processImage, canvasRef, setError, t, language]);

  const handleDownloadClean = useCallback(async () => {
    if (!source || !cleanBlob || !metadataRemoved) return;

    await handleDownload(
      cleanBlob,
      buildDownloadFilename(`${source.name}-clean`, cleanFormat),
      { stripMetadata: true, format: cleanFormat },
    );
  }, [source, cleanBlob, metadataRemoved, cleanFormat, handleDownload]);

  const handleCopyClean = useCallback(async () => {
    if (!cleanBlob || !metadataRemoved) return;

    await handleCopyToClipboard(cleanBlob, {
      stripMetadata: true,
      format: cleanFormat,
    });
  }, [cleanBlob, metadataRemoved, cleanFormat, handleCopyToClipboard]);

  const isWorking = isScanning || isProcessing;
  const canDownload = !!source && metadataRemoved && !!cleanBlob && !isWorking;

  const cleanOutputContent = !source ? (
    <span className="text-muted">{t("toolUi.metadataRemover.scanPlaceholder")}</span>
  ) : isScanning ? (
    <span className="text-muted">{t("toolUi.metadataRemover.scanning")}</span>
  ) : (
    <div className="space-y-2 py-1">
      <p className="font-mono text-sm text-foreground">
        {cleanBlob ? formatFileSize(cleanBlob.size) : "—"}
        {source ? (
          <span className="text-muted">
            {" "}
            · {t("common.original")}: {formatFileSize(source.file.size)}
          </span>
        ) : null}
      </p>
      {metadataRemoved ? (
        <p className="font-mono text-[10px] text-accent">
          {t("toolUi.metadataRemover.metadataRemoved")}
        </p>
      ) : null}
    </div>
  );

  return (
    <ToolWorkspace
      workflowState={{
        hasSource: !!source,
        hasConfigured: metadataRemoved && !!cleanBlob,
        isProcessing: isWorking,
        isReady: canDownload,
      }}
    >
      <ToolStyledUploadZone
        inputId="metadata-remover-upload"
        onFileChange={handleFileChange}
        isDragging={isDragging}
        onDraggingChange={setIsDragging}
        formatHint={t("toolUi.metadataRemover.uploadHint")}
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
              {source.width} × {source.height}px · {formatFileSize(source.file.size)}
            </p>
          </div>
        ) : undefined}
      </ToolStyledUploadZone>

      <ToolFieldsStage
        robotAlt={t("characters.robotAlt")}
        widthAlt={t("characters.widthAlt")}
        fields={[
          {
            label: t("toolUi.metadataRemover.detectedMetadata"),
            englishLabel: "Metadata",
            htmlFor: "metadata-remover-detected",
            children: (
              <div
                id="metadata-remover-detected"
                className="max-h-40 overflow-y-auto px-1 py-2.5"
              >
                {!source ? (
                  <p className="font-mono text-xs text-muted">
                    {t("toolUi.metadataRemover.scanPlaceholder")}
                  </p>
                ) : isScanning ? (
                  <p className="font-mono text-xs text-muted">
                    {t("toolUi.metadataRemover.readingTags")}
                  </p>
                ) : metadataFields.length > 0 ? (
                  <dl className="space-y-2">
                    {metadataFields.map((field) => (
                      <div
                        key={field.label}
                        className="grid gap-1 border-b border-border pb-2 last:border-0 last:pb-0 sm:grid-cols-[6.5rem_1fr]"
                      >
                        <dt className="font-label text-muted">{field.label}</dt>
                        <dd className="font-mono text-xs text-foreground">
                          {field.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="font-mono text-xs text-muted">
                    {t("toolUi.metadataRemover.noMetadata")}
                  </p>
                )}
              </div>
            ),
          },
          {
            label: t("toolUi.metadataRemover.cleanOutput"),
            englishLabel: "Clean",
            htmlFor: "metadata-remover-clean-output",
            accentClass: "text-[var(--glow-purple)]",
            children: (
              <output
                id="metadata-remover-clean-output"
                className="tool-input block min-h-[2.75rem] border-transparent bg-transparent py-2"
              >
                {cleanOutputContent}
              </output>
            ),
          },
        ]}
      />

      {error ? (
        <HelperErrorAlert message={error} className="mt-4" />
      ) : null}

      <ToolOutputActions
        onDownload={handleDownloadClean}
        onCopy={handleCopyClean}
        downloadLabel={t("downloads.downloadCleanImage")}
        disabled={!canDownload}
        isProcessing={isWorking}
      />

      <p className="mt-3 text-center font-mono text-[10px] text-muted">
        {t("toolUi.metadataRemover.footer")}
      </p>

      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </ToolWorkspace>
  );
}
