"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useToast } from "@/components/ui/ToastProvider";
import {
  copyImageToClipboard,
  useImageProcessor,
} from "@/hooks/useImageProcessor";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import {
  buildFaviconExport,
  DEFAULT_FAVICON_SETTINGS,
  downloadBlob,
  FAVICON_PREVIEW_SIZES,
  renderFaviconCanvas,
  type FaviconExportFormat,
  type FaviconSettings,
} from "@/lib/faviconRender";

const inputClassName =
  "w-full min-h-11 rounded-sm border border-[#333] bg-background px-3 py-2 font-mono text-xs text-foreground outline-none transition-colors focus:border-muted disabled:cursor-not-allowed disabled:opacity-50";

const FORMAT_OPTIONS: { value: FaviconExportFormat; label: string }[] = [
  { value: "ico", label: "ICO (16 + 32 + 48)" },
  { value: "png", label: "PNG (32×32)" },
];

export function FaviconGenerator() {
  const { source, error, isProcessing, loadFile, setError } = useImageProcessor();
  const { showToast } = useToast();

  const sourceCanvasRef = useRef<HTMLCanvasElement>(null);
  const previewRefs = useRef<Record<number, HTMLCanvasElement | null>>({});
  const loadedImageRef = useRef<HTMLImageElement | null>(null);

  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [settings, setSettings] = useState<FaviconSettings>(
    DEFAULT_FAVICON_SETTINGS,
  );
  const [exportFormat, setExportFormat] = useState<FaviconExportFormat>("ico");

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) {
        setSettings(DEFAULT_FAVICON_SETTINGS);
        void loadFile(file);
      }
    },
    [loadFile],
  );

  const renderPreviews = useCallback(
    (image: HTMLImageElement) => {
      if (sourceCanvasRef.current) {
        renderFaviconCanvas(image, 128, settings, sourceCanvasRef.current);
      }

      for (const size of FAVICON_PREVIEW_SIZES) {
        const canvas = previewRefs.current[size];
        if (canvas) {
          renderFaviconCanvas(image, size, settings, canvas);
        }
      }
    },
    [settings],
  );

  useEffect(() => {
    if (!source) {
      loadedImageRef.current = null;
      return;
    }

    const image = new Image();
    image.onload = () => {
      loadedImageRef.current = image;
      requestAnimationFrame(() => renderPreviews(image));
    };
    image.src = source.url;
  }, [source, renderPreviews]);

  const exportFavicon = useCallback(async () => {
    if (!source) return null;

    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Failed to load image."));
      img.src = source.url;
    });

    return buildFaviconExport(image, settings, exportFormat);
  }, [source, settings, exportFormat]);

  const handleDownload = useCallback(async () => {
    if (!source) return;

    setIsExporting(true);
    setError(null);

    try {
      const result = await exportFavicon();
      if (!result) return;

      downloadBlob(result.blob, result.filename);
      showToast(result.filename, { title: "Favicon ready" });
    } catch (cause) {
      const message =
        cause instanceof Error ? cause.message : "Export failed.";
      setError(message);
    } finally {
      setIsExporting(false);
    }
  }, [source, exportFavicon, showToast, setError]);

  const handleCopy = useCallback(async () => {
    if (!source) return;

    setIsExporting(true);
    setError(null);

    try {
      const result = await exportFavicon();
      if (!result) return;

      await copyImageToClipboard(result.blob);
      showToast("Favicon copied — paste into your design tool", {
        title: "Copied to clipboard",
      });
    } catch (cause) {
      const message =
        cause instanceof Error ? cause.message : "Could not copy image.";
      setError(message);
    } finally {
      setIsExporting(false);
    }
  }, [source, exportFavicon, showToast, setError]);

  const busy = isProcessing || isExporting;
  const canDownload = !!source && !busy;

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
              id="favicon-generator-upload"
              type="file"
              accept="image/*"
              aria-label="Upload logo or image"
              className="absolute inset-0 cursor-pointer opacity-0"
              onChange={(event) => {
                handleFileChange(event.target.files?.[0] ?? null);
                event.target.value = "";
              }}
            />
            <div className="pointer-events-none px-2 text-center">
              <p className="font-label text-muted">Upload</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Drop your logo here or tap to browse
              </p>
              <p className="mt-1 font-mono text-[10px] text-muted">
                PNG · ICO · browser tab icons
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <label htmlFor="favicon-generator-replace" className="font-label text-muted">
              Replace Image
            </label>
            <input
              id="favicon-generator-replace"
              type="file"
              accept="image/*"
              onChange={(event) => {
                handleFileChange(event.target.files?.[0] ?? null);
                event.target.value = "";
              }}
              className={`${inputClassName} file:mr-3 file:border-0 file:bg-transparent file:font-label file:text-muted`}
            />
          </div>
        )}

        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <div className="space-y-4">
            <div className="space-y-3">
              <span className="font-label text-muted">Crop preview</span>
              <div className="flex min-h-40 items-center justify-center overflow-hidden rounded-sm border border-[#333] bg-background p-4">
                {source ? (
                  <canvas
                    ref={sourceCanvasRef}
                    className="max-h-36 max-w-full object-contain"
                  />
                ) : (
                  <p className="px-4 text-center text-sm text-muted">
                    Upload a logo to preview the square crop.
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <span className="font-label text-muted">Tab icon preview</span>
              <div className="grid grid-cols-3 gap-3">
                {FAVICON_PREVIEW_SIZES.map((size) => (
                  <div
                    key={size}
                    className="flex flex-col items-center gap-2 rounded-sm border border-[#333] bg-background p-3"
                  >
                    <canvas
                      ref={(node) => {
                        previewRefs.current[size] = node;
                        if (node && loadedImageRef.current) {
                          renderFaviconCanvas(
                            loadedImageRef.current,
                            size,
                            settings,
                            node,
                          );
                        }
                      }}
                      width={size}
                      height={size}
                      className="border border-[#333]"
                      style={{
                        width: size * 2,
                        height: size * 2,
                        imageRendering: "pixelated",
                      }}
                    />
                    <span className="font-mono text-[10px] text-muted">
                      {size}×{size}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {source && (
              <p className="text-center font-mono text-[10px] text-muted">
                Source {source.width} × {source.height}px · {source.file.name}
              </p>
            )}
          </div>

          <div className="space-y-4 border border-[#333] bg-background p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label htmlFor="favicon-zoom" className="font-label text-muted">
                  Zoom
                </label>
                <span className="font-mono text-[10px] text-foreground">
                  {settings.zoom.toFixed(2)}×
                </span>
              </div>
              <input
                id="favicon-zoom"
                type="range"
                min={0.6}
                max={1.8}
                step={0.05}
                disabled={!source}
                value={settings.zoom}
                onChange={(event) =>
                  setSettings({ zoom: Number(event.target.value) })
                }
                className="h-2 w-full cursor-pointer appearance-none rounded-sm bg-[#161616] accent-accent disabled:opacity-50"
              />
              <p className="font-mono text-[10px] text-muted">
                Center-crops to a square before resizing.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="favicon-format" className="font-label text-muted">
                Export format
              </label>
              <select
                id="favicon-format"
                disabled={!source}
                value={exportFormat}
                onChange={(event) =>
                  setExportFormat(event.target.value as FaviconExportFormat)
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
          </div>
        </div>

        {error && (
          <p className="mt-4 font-mono text-xs text-red-400" role="alert">
            {error}
          </p>
        )}

        <ToolOutputActions
          onDownload={handleDownload}
          onCopy={handleCopy}
          downloadLabel="Download"
          disabled={!canDownload}
          isProcessing={busy}
        />

        <p className="mt-3 text-center font-mono text-[10px] text-muted">
          Icons are generated locally — your logo never leaves the browser.
        </p>
      </div>
    </div>
  );
}
