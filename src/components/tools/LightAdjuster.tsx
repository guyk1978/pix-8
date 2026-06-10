"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { StripMetadataToggle } from "@/components/tools/StripMetadataToggle";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import {
  DEFAULT_LIGHT_ADJUST_SETTINGS,
  renderLightAdjustedCanvas,
  type LightAdjustSettings,
} from "@/lib/lightAdjustRender";
import {
  buildDownloadFilename,
  resolveFormat,
  useImageProcessor,
} from "@/hooks/useImageProcessor";

const inputClassName =
  "w-full min-h-11 rounded-sm border border-[#333] bg-background px-3 py-2 font-mono text-xs text-foreground outline-none transition-colors focus:border-muted disabled:cursor-not-allowed disabled:opacity-50";

const PRESETS: { label: string; settings: LightAdjustSettings }[] = [
  { label: "Balanced", settings: { brightness: 0, contrast: 100 } },
  { label: "Brighten", settings: { brightness: 18, contrast: 105 } },
  { label: "Punch", settings: { brightness: 5, contrast: 125 } },
];

export function LightAdjuster() {
  const {
    canvasRef,
    source,
    error,
    isProcessing,
    loadFile,
    handleDownload,
    handleCopyToClipboard,
    setError,
  } = useImageProcessor();

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [isAdjusting, setIsAdjusting] = useState(false);
  const [stripMetadata, setStripMetadata] = useState(true);
  const [settings, setSettings] = useState<LightAdjustSettings>(
    DEFAULT_LIGHT_ADJUST_SETTINGS,
  );

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) {
        setSettings(DEFAULT_LIGHT_ADJUST_SETTINGS);
        void loadFile(file);
      }
    },
    [loadFile],
  );

  useEffect(() => {
    if (!source || !previewCanvasRef.current) return;

    let cancelled = false;
    setIsAdjusting(true);
    setError(null);

    const timer = window.setTimeout(() => {
      const image = new Image();
      image.onload = () => {
        if (cancelled) return;

        try {
          renderLightAdjustedCanvas(
            image,
            source.width,
            source.height,
            settings,
            previewCanvasRef.current,
          );
        } catch (cause) {
          const message =
            cause instanceof Error ? cause.message : "Adjustment failed.";
          setError(message);
        } finally {
          if (!cancelled) setIsAdjusting(false);
        }
      };

      image.onerror = () => {
        if (!cancelled) {
          setError("Failed to load image.");
          setIsAdjusting(false);
        }
      };

      image.src = source.url;
    }, 100);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [source, settings, setError]);

  const handleDownloadImage = useCallback(async () => {
    if (!source || !previewCanvasRef.current) return;

    const format = resolveFormat(source.mimeType);
    const quality =
      format === "jpeg" || format === "webp" ? 0.92 : undefined;

    await handleDownload(
      previewCanvasRef.current,
      buildDownloadFilename(`${source.name}-adjusted`, format),
      { format, quality, stripMetadata },
    );
  }, [source, stripMetadata, handleDownload]);

  const handleCopyImage = useCallback(async () => {
    if (!source || !previewCanvasRef.current) return;

    const format = resolveFormat(source.mimeType);
    const quality =
      format === "jpeg" || format === "webp" ? 0.92 : undefined;

    await handleCopyToClipboard(previewCanvasRef.current, {
      format,
      quality,
      stripMetadata,
    });
  }, [source, stripMetadata, handleCopyToClipboard]);

  const patchSettings = useCallback((patch: Partial<LightAdjustSettings>) => {
    setSettings((current) => ({ ...current, ...patch }));
  }, []);

  const busy = isProcessing || isAdjusting;
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
              id="light-adjuster-upload"
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
                Brightness · contrast · exposure fix
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <label htmlFor="light-adjuster-replace" className="font-label text-muted">
              Replace Image
            </label>
            <input
              id="light-adjuster-replace"
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
          <div className="space-y-3">
            <span className="font-label text-muted">Preview</span>
            <div className="flex min-h-56 items-center justify-center overflow-hidden rounded-sm border border-[#333] bg-background p-3 sm:min-h-72">
              {source ? (
                <canvas
                  ref={previewCanvasRef}
                  className="max-h-[min(50vh,420px)] max-w-full object-contain"
                />
              ) : (
                <p className="px-4 text-center text-sm text-muted">
                  Upload an image to adjust brightness and contrast.
                </p>
              )}
            </div>
            {source && (
              <p className="text-center font-mono text-[10px] text-muted">
                {source.width} × {source.height}px ·{" "}
                {isAdjusting
                  ? "Applying…"
                  : `brightness ${settings.brightness > 0 ? "+" : ""}${settings.brightness} · contrast ${settings.contrast}%`}
              </p>
            )}
          </div>

          <div className="space-y-4 border border-[#333] bg-background p-4">
            <div className="space-y-2">
              <span className="font-label text-muted">Presets</span>
              <div className="grid grid-cols-3 gap-1.5">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    disabled={!source}
                    onClick={() => setSettings(preset.settings)}
                    className="min-h-9 rounded-sm border border-[#333] bg-[#161616] font-mono text-[10px] text-muted transition-colors hover:border-muted hover:text-foreground disabled:opacity-50"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label htmlFor="light-brightness" className="font-label text-muted">
                  Brightness
                </label>
                <span className="font-mono text-[10px] text-foreground">
                  {settings.brightness > 0 ? "+" : ""}
                  {settings.brightness}
                </span>
              </div>
              <input
                id="light-brightness"
                type="range"
                min={-50}
                max={50}
                step={1}
                disabled={!source || isAdjusting}
                value={settings.brightness}
                onChange={(event) =>
                  patchSettings({ brightness: Number(event.target.value) })
                }
                className="h-2 w-full cursor-pointer appearance-none rounded-sm bg-[#161616] accent-accent disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label htmlFor="light-contrast" className="font-label text-muted">
                  Contrast
                </label>
                <span className="font-mono text-[10px] text-foreground">
                  {settings.contrast}%
                </span>
              </div>
              <input
                id="light-contrast"
                type="range"
                min={50}
                max={150}
                step={1}
                disabled={!source || isAdjusting}
                value={settings.contrast}
                onChange={(event) =>
                  patchSettings({ contrast: Number(event.target.value) })
                }
                className="h-2 w-full cursor-pointer appearance-none rounded-sm bg-[#161616] accent-accent disabled:opacity-50"
              />
            </div>

            <button
              type="button"
              disabled={!source}
              onClick={() => setSettings(DEFAULT_LIGHT_ADJUST_SETTINGS)}
              className="min-h-9 w-full rounded-sm border border-[#333] bg-[#161616] font-mono text-[10px] text-muted transition-colors hover:border-muted hover:text-foreground disabled:opacity-50"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="mt-5 border-t border-[#333] pt-5">
          <StripMetadataToggle
            checked={stripMetadata}
            disabled={!source}
            onChange={setStripMetadata}
          />
        </div>

        {error && (
          <p className="mt-4 font-mono text-xs text-red-400" role="alert">
            {error}
          </p>
        )}

        <ToolOutputActions
          onDownload={handleDownloadImage}
          onCopy={handleCopyImage}
          downloadLabel="Download"
          disabled={!canDownload}
          isProcessing={busy}
        />

        <p className="mt-3 text-center font-mono text-[10px] text-muted">
          Adjustments run locally — your image never leaves the browser.
        </p>
      </div>

      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </div>
  );
}
