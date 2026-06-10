"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useToast } from "@/components/ui/ToastProvider";
import {
  fileToDataUrl,
  formatBase64Output,
  formatByteCount,
} from "@/lib/base64Encode";
import { useImageProcessor } from "@/hooks/useImageProcessor";

export function Base64Encoder() {
  const { source, error, loadFile, setError } = useImageProcessor();
  const { showToast } = useToast();

  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [includePrefix, setIncludePrefix] = useState(true);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [isEncoding, setIsEncoding] = useState(false);
  const [copied, setCopied] = useState(false);

  const output = useMemo(
    () => (dataUrl ? formatBase64Output(dataUrl, includePrefix) : ""),
    [dataUrl, includePrefix],
  );

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) void loadFile(file);
    },
    [loadFile],
  );

  useEffect(() => {
    if (!source) {
      setDataUrl(null);
      return;
    }

    let cancelled = false;
    setIsEncoding(true);
    setError(null);

    void fileToDataUrl(source.file)
      .then((encoded) => {
        if (!cancelled) setDataUrl(encoded);
      })
      .catch((cause) => {
        if (cancelled) return;
        const message =
          cause instanceof Error ? cause.message : "Could not encode image.";
        setError(message);
        setDataUrl(null);
      })
      .finally(() => {
        if (!cancelled) setIsEncoding(false);
      });

    return () => {
      cancelled = true;
    };
  }, [source, setError]);

  const handleCopy = useCallback(async () => {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      showToast(
        includePrefix ? "Data URL copied" : "Base64 string copied",
        { title: "Copied!" },
      );
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setError("Could not copy to clipboard.");
    }
  }, [output, includePrefix, showToast, setError]);

  return (
    <div className="w-full">
      <div className="glass-panel rounded-sm border border-[#333] p-4 sm:p-6">
        {!source ? (
          <div
            className={`relative flex min-h-44 cursor-pointer flex-col items-center justify-center gap-3 rounded-sm border border-dashed p-5 transition-colors sm:min-h-48 sm:p-6 ${
              isDraggingFile
                ? "border-accent bg-accent-muted"
                : "border-[#333] bg-background hover:border-muted"
            }`}
            onDragEnter={(event) => {
              event.preventDefault();
              setIsDraggingFile(true);
            }}
            onDragLeave={(event) => {
              event.preventDefault();
              if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                setIsDraggingFile(false);
              }
            }}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              setIsDraggingFile(false);
              handleFileChange(event.dataTransfer.files[0] ?? null);
            }}
          >
            <input
              id="base64-encoder-upload"
              type="file"
              accept="image/*"
              aria-label="Upload image"
              className="absolute inset-0 cursor-pointer opacity-0"
              onChange={(event) => {
                handleFileChange(event.target.files?.[0] ?? null);
                event.target.value = "";
              }}
            />
            <div className="pointer-events-none px-2 text-center">
              <p className="font-label text-muted">Upload</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Drop an image here or tap to browse
              </p>
              <p className="mt-1 font-mono text-[10px] text-muted">
                PNG · JPEG · WebP · GIF
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="base64-encoder-replace" className="font-label text-muted">
                Replace Image
              </label>
              <input
                id="base64-encoder-replace"
                type="file"
                accept="image/*"
                onChange={(event) => {
                  handleFileChange(event.target.files?.[0] ?? null);
                  event.target.value = "";
                }}
                className="w-full min-h-11 rounded-sm border border-[#333] bg-background px-3 py-2 font-mono text-xs text-foreground outline-none transition-colors file:mr-3 file:border-0 file:bg-transparent file:font-label file:text-muted focus:border-muted"
              />
            </div>

            <div className="flex min-h-32 items-center justify-center overflow-hidden rounded-sm border border-[#333] bg-background p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={source.url}
                alt="Source preview"
                className="max-h-40 max-w-full object-contain"
              />
            </div>
          </div>
        )}

        <section className="mt-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-label text-foreground">Base64 Output</h2>
            {source && dataUrl && !isEncoding && (
              <span className="font-mono text-[10px] text-muted">
                {output.length.toLocaleString()} chars ·{" "}
                {formatByteCount(source.file.size)}
              </span>
            )}
          </div>

          {!source ? (
            <div className="flex min-h-28 items-center justify-center rounded-sm border border-dashed border-[#333] bg-background p-6 text-center">
              <p className="text-sm text-muted">
                Upload an image to generate a Base64 string.
              </p>
            </div>
          ) : isEncoding ? (
            <div className="flex min-h-28 items-center justify-center rounded-sm border border-[#333] bg-background p-6">
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#333] border-t-foreground" />
                <p className="font-label text-muted">Encoding…</p>
              </div>
            </div>
          ) : (
            <>
              <label className="flex min-h-11 cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={includePrefix}
                  onChange={(event) => setIncludePrefix(event.target.checked)}
                  disabled={!dataUrl}
                  className="h-4 w-4 shrink-0 rounded-sm border border-[#333] bg-background accent-accent disabled:cursor-not-allowed disabled:opacity-50"
                />
                <span className="font-label text-muted">
                  Include data-URL prefix
                </span>
                {includePrefix && (
                  <span className="font-mono text-[10px] text-accent">
                    data:image/…;base64,
                  </span>
                )}
              </label>

              <textarea
                readOnly
                value={output}
                rows={8}
                aria-label="Base64 output"
                className="w-full resize-y rounded-sm border border-[#333] bg-background p-4 font-mono text-[11px] leading-relaxed text-muted outline-none focus:border-muted"
              />

              <button
                type="button"
                onClick={() => void handleCopy()}
                disabled={!output}
                className="min-h-11 w-full rounded-sm border border-[#333] bg-accent-muted px-4 py-3 font-label text-accent transition-colors hover:bg-accent/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {copied ? "Copied!" : "Copy to Clipboard"}
              </button>
            </>
          )}
        </section>

        {source && (
          <p className="mt-4 text-center font-mono text-[10px] text-muted">
            {source.width} × {source.height}px · encoding runs locally
          </p>
        )}

        {error && (
          <p className="mt-4 font-mono text-xs text-red-400" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
