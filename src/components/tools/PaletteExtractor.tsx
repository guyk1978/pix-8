"use client";

import { useCallback, useEffect, useState } from "react";
import { StripMetadataToggle } from "@/components/tools/StripMetadataToggle";
import { useToast } from "@/components/ui/ToastProvider";
import { useImageProcessor } from "@/hooks/useImageProcessor";
import {
  extractDominantColors,
  type PaletteColor,
} from "@/lib/paletteExtraction";

function loadImageElement(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to load image."));
    image.src = url;
  });
}

export function PaletteExtractor() {
  const { source, error, loadFile, setError } = useImageProcessor();
  const { showToast } = useToast();

  const [palette, setPalette] = useState<PaletteColor[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [stripMetadata, setStripMetadata] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  useEffect(() => {
    if (!source) {
      setPalette([]);
      return;
    }

    let cancelled = false;
    setIsExtracting(true);
    setError(null);

    void loadImageElement(source.url)
      .then((image) => {
        if (cancelled) return;
        setPalette(extractDominantColors(image));
      })
      .catch((cause) => {
        if (cancelled) return;
        const message =
          cause instanceof Error
            ? cause.message
            : "Could not extract palette.";
        setError(message);
        setPalette([]);
      })
      .finally(() => {
        if (!cancelled) setIsExtracting(false);
      });

    return () => {
      cancelled = true;
    };
  }, [source, setError]);

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) void loadFile(file);
    },
    [loadFile],
  );

  const handleCopyHex = useCallback(
    async (hex: string) => {
      try {
        await navigator.clipboard.writeText(hex);
        setCopiedHex(hex);
        showToast(hex, { title: "Copied!" });
        window.setTimeout(() => setCopiedHex(null), 1500);
      } catch {
        setError("Could not copy to clipboard.");
      }
    },
    [showToast, setError],
  );

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="rounded-sm border border-[#333] bg-[#161616] p-4 sm:p-6">
        {!source ? (
          <div
            className={`relative flex min-h-44 cursor-pointer flex-col items-center justify-center gap-3 rounded-sm border border-dashed p-5 transition-colors sm:min-h-48 sm:p-6 ${
              isDragging
                ? "border-muted bg-surface"
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
              handleFileChange(event.dataTransfer.files[0] ?? null);
            }}
          >
            <input
              id="palette-upload"
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
                PNG · JPEG · WebP
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="palette-replace"
                className="font-label text-muted"
              >
                Replace Image
              </label>
              <input
                id="palette-replace"
                type="file"
                accept="image/*"
                onChange={(event) => {
                  handleFileChange(event.target.files?.[0] ?? null);
                  event.target.value = "";
                }}
                className="w-full min-h-11 rounded-sm border border-[#333] bg-background px-3 py-2 font-mono text-xs text-foreground outline-none transition-colors file:mr-3 file:border-0 file:bg-transparent file:font-label file:text-muted focus:border-muted"
              />
            </div>

            <div className="flex min-h-40 items-center justify-center overflow-hidden rounded-sm border border-[#333] bg-background p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={source.url}
                alt="Source preview"
                className="max-h-48 max-w-full object-contain"
              />
            </div>
          </div>
        )}

        <section className="mt-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-label text-foreground">Extracted Palette</h2>
            {source && (
              <span className="font-mono text-xs text-muted">
                {isExtracting ? "Analyzing…" : `${palette.length} colors`}
              </span>
            )}
          </div>

          {!source ? (
            <div className="flex min-h-28 items-center justify-center rounded-sm border border-dashed border-[#333] bg-background p-6 text-center">
              <p className="text-sm text-muted">
                Upload an image to extract dominant colors.
              </p>
            </div>
          ) : isExtracting ? (
            <div className="flex min-h-28 items-center justify-center rounded-sm border border-[#333] bg-background p-6">
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#333] border-t-foreground" />
                <p className="font-label text-muted">Extracting colors…</p>
              </div>
            </div>
          ) : palette.length === 0 ? (
            <div className="flex min-h-28 items-center justify-center rounded-sm border border-[#333] bg-background p-6 text-center">
              <p className="text-sm text-muted">
                No colors could be extracted from this image.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
              {palette.map((color) => (
                <button
                  key={color.hex}
                  type="button"
                  onClick={() => void handleCopyHex(color.hex)}
                  className="group flex flex-col items-center gap-2 rounded-sm border border-transparent p-1 transition-colors hover:border-[#333] focus-visible:border-muted focus-visible:outline-none"
                  aria-label={`Copy ${color.hex} to clipboard`}
                >
                  <span
                    className="h-14 w-full rounded-md border border-[#333] shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)] transition-transform group-hover:scale-[1.03] sm:h-16"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span
                    className={`font-mono text-[10px] uppercase tracking-wide transition-colors sm:text-xs ${
                      copiedHex === color.hex
                        ? "text-foreground"
                        : "text-muted group-hover:text-foreground"
                    }`}
                  >
                    {copiedHex === color.hex ? "Copied!" : color.hex}
                  </span>
                </button>
              ))}
            </div>
          )}
        </section>

        {source && (
          <p className="mt-4 text-center font-mono text-xs text-muted">
            {source.width} × {source.height}px · {source.file.name}
          </p>
        )}

        <div className="mt-5 border-t border-[#333] pt-5">
          <StripMetadataToggle
            checked={stripMetadata}
            disabled={!source}
            onChange={setStripMetadata}
          />
          {stripMetadata && source && (
            <p className="mt-2 font-mono text-[10px] text-muted">
              Privacy Mode active — source metadata stays local and is never
              transmitted.
            </p>
          )}
        </div>

        {error && (
          <p className="mt-4 font-mono text-xs text-red-400" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
