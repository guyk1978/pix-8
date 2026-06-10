"use client";

import exifr from "exifr";
import { useCallback, useEffect, useState } from "react";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
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

async function readMetadataFields(file: File): Promise<MetadataField[]> {
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
        label: "Device",
        value: [record.Make, record.Model].filter(Boolean).join(" "),
      });
    }

    if (record.DateTimeOriginal) {
      fields.push({
        label: "Captured",
        value: String(record.DateTimeOriginal),
      });
    }

    if (record.Software) {
      fields.push({
        label: "Software",
        value: String(record.Software),
      });
    }

    if (
      typeof record.latitude === "number" &&
      typeof record.longitude === "number"
    ) {
      fields.push({
        label: "GPS",
        value: `${record.latitude.toFixed(5)}, ${record.longitude.toFixed(5)}`,
      });
    }

    if (record.Orientation) {
      fields.push({
        label: "Orientation",
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
        fields.push({ label: "Camera", value: parts.join(" · ") });
      }
    }

    return fields;
  } catch {
    return [];
  }
}

export function MetadataRemover() {
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
      const fields = await readMetadataFields(source.file);
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
        setError("Metadata could not be verified as removed.");
      }
    })()
      .catch((cause) => {
        if (cancelled) return;
        const message =
          cause instanceof Error
            ? cause.message
            : "Failed to remove metadata.";
        setError(message);
      })
      .finally(() => {
        if (!cancelled) setIsScanning(false);
      });

    return () => {
      cancelled = true;
    };
  }, [source, processImage, canvasRef, setError]);

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

  return (
    <div className="w-full">
      <div className="glass-panel rounded-sm border border-[#333] p-4 sm:p-6">
        <div
          className={`relative flex min-h-44 cursor-pointer flex-col items-center justify-center gap-3 rounded-sm border border-dashed p-5 transition-colors sm:min-h-48 sm:p-6 ${
            isDragging
              ? "border-accent bg-accent-muted"
              : "border-[#333] bg-background hover:border-muted"
          }`}
          onDragEnter={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={(event) => {
            event.preventDefault();
            if (!event.currentTarget.contains(event.relatedTarget as Node)) {
              setIsDragging(false);
            }
          }}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            setIsDragging(false);
            const file = event.dataTransfer.files[0];
            handleFileChange(file ?? null);
          }}
        >
          <input
            id="metadata-remover-upload"
            type="file"
            accept="image/*"
            aria-label="Upload image"
            className="absolute inset-0 cursor-pointer opacity-0"
            onChange={(event) => {
              handleFileChange(event.target.files?.[0] ?? null);
              event.target.value = "";
            }}
          />
          {source ? (
            <div className="pointer-events-none flex w-full flex-col items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={source.url}
                alt="Preview"
                className="max-h-40 max-w-full rounded-sm border border-[#333] object-contain sm:max-h-48"
              />
              <p className="max-w-full truncate px-2 text-center font-mono text-xs text-muted">
                {source.width} × {source.height}px · {formatFileSize(source.file.size)}
              </p>
            </div>
          ) : (
            <div className="pointer-events-none px-2 text-center">
              <p className="font-label text-muted">Upload</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Drop an image here or tap to browse
              </p>
              <p className="mt-1 font-mono text-[10px] text-muted">
                EXIF · GPS · IPTC stripped locally
              </p>
            </div>
          )}
        </div>

        {source && (
          <div className="mt-5 border border-[#333] bg-background p-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <p className="font-label text-muted">Detected metadata</p>
              {isScanning && (
                <span className="font-mono text-[10px] text-muted">Scanning…</span>
              )}
            </div>

            {metadataFields.length > 0 ? (
              <dl className="space-y-2">
                {metadataFields.map((field) => (
                  <div
                    key={field.label}
                    className="grid gap-1 border-b border-[#333] pb-2 last:border-0 last:pb-0 sm:grid-cols-[7rem_1fr]"
                  >
                    <dt className="font-label text-muted">{field.label}</dt>
                    <dd className="font-mono text-xs text-foreground">{field.value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="font-mono text-xs text-muted">
                {isScanning
                  ? "Reading embedded tags…"
                  : "No EXIF metadata detected in this file."}
              </p>
            )}
          </div>
        )}

        {source && metadataRemoved && cleanBlob && (
          <div className="mt-4 grid gap-3 border border-dashed border-[#333] bg-[#161616] p-4 sm:grid-cols-3">
            <div>
              <p className="font-label text-muted">Original</p>
              <p className="mt-1 font-mono text-sm text-foreground">
                {formatFileSize(source.file.size)}
              </p>
            </div>
            <div>
              <p className="font-label text-muted">Clean</p>
              <p className="mt-1 font-mono text-sm text-foreground">
                {formatFileSize(cleanBlob.size)}
              </p>
            </div>
            <div>
              <p className="font-label text-muted">Status</p>
              <p className="mt-1 font-mono text-sm text-accent">Metadata removed</p>
            </div>
          </div>
        )}

        {error && (
          <p className="mt-4 font-mono text-xs text-red-400" role="alert">
            {error}
          </p>
        )}

        <ToolOutputActions
          onDownload={handleDownloadClean}
          onCopy={handleCopyClean}
          downloadLabel="Download Clean Image"
          disabled={!canDownload}
          isProcessing={isWorking}
        />

        <p className="mt-3 text-center font-mono text-[10px] text-muted">
          Processing stays in your browser — nothing is uploaded.
        </p>
      </div>

      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </div>
  );
}
