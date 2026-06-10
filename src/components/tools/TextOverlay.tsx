"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { StripMetadataToggle } from "@/components/tools/StripMetadataToggle";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import {
  buildDownloadFilename,
  resolveFormat,
  useImageProcessor,
} from "@/hooks/useImageProcessor";
import {
  displayToNaturalCoords,
  renderTextOverlayCanvas,
  type TextAlign,
  type TextOverlaySettings,
} from "@/lib/textOverlayRender";

const inputClassName =
  "w-full min-h-11 rounded-sm border border-border bg-background px-3 py-2 font-mono text-xs text-foreground outline-none transition-colors focus:border-muted disabled:cursor-not-allowed disabled:opacity-50";

const FONT_OPTIONS = [
  { value: "Inter, system-ui, sans-serif", label: "Sans" },
  { value: "Georgia, serif", label: "Serif" },
  { value: '"Roboto Mono", ui-monospace, monospace', label: "Mono" },
  { value: "Impact, Haettenschweiler, sans-serif", label: "Impact" },
];

const ALIGN_OPTIONS: { value: TextAlign; label: string }[] = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
];

const DEFAULT_SETTINGS: Omit<TextOverlaySettings, "x" | "y"> = {
  text: "Your quote here",
  fontFamily: FONT_OPTIONS[0].value,
  fontSizePercent: 6,
  color: "#ffffff",
  align: "center",
  shadow: true,
  backgroundBox: true,
  backgroundOpacity: 0.45,
};

export function TextOverlay() {
  const {
    canvasRef,
    source,
    error,
    isProcessing,
    loadFile,
    handleDownload,
    handleCopyToClipboard,
  } = useImageProcessor();

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const isDraggingRef = useRef(false);

  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [stripMetadata, setStripMetadata] = useState(true);
  const [settings, setSettings] = useState<TextOverlaySettings>({
    ...DEFAULT_SETTINGS,
    x: 0,
    y: 0,
  });

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) void loadFile(file);
    },
    [loadFile],
  );

  useEffect(() => {
    if (!source) return;

    setSettings((current) => ({
      ...current,
      x: Math.round(source.width / 2),
      y: Math.round(source.height / 2),
    }));
  }, [source]);

  useEffect(() => {
    if (!source || !previewCanvasRef.current) return;

    const image = new Image();
    image.onload = () => {
      renderTextOverlayCanvas(
        image,
        source.width,
        source.height,
        settings,
        previewCanvasRef.current,
      );
    };
    image.src = source.url;
  }, [source, settings]);

  const updatePosition = useCallback((clientX: number, clientY: number) => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;

    const { x, y } = displayToNaturalCoords(clientX, clientY, canvas);
    setSettings((current) => ({ ...current, x, y }));
  }, []);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (!source) return;
      isDraggingRef.current = true;
      setIsDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
      updatePosition(event.clientX, event.clientY);
    },
    [source, updatePosition],
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (!isDraggingRef.current) return;
      updatePosition(event.clientX, event.clientY);
    },
    [updatePosition],
  );

  const handlePointerUp = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      isDraggingRef.current = false;
      setIsDragging(false);
      event.currentTarget.releasePointerCapture(event.pointerId);
    },
    [],
  );

  const handleDownloadImage = useCallback(async () => {
    if (!source || !previewCanvasRef.current || !settings.text.trim()) return;

    const format = resolveFormat(source.mimeType);
    const quality =
      format === "jpeg" || format === "webp" ? 0.92 : undefined;

    await handleDownload(previewCanvasRef.current, buildDownloadFilename(`${source.name}-text`, format), {
      format,
      quality,
      stripMetadata,
    });
  }, [source, settings.text, stripMetadata, handleDownload]);

  const handleCopyImage = useCallback(async () => {
    if (!source || !previewCanvasRef.current || !settings.text.trim()) return;

    const format = resolveFormat(source.mimeType);
    const quality =
      format === "jpeg" || format === "webp" ? 0.92 : undefined;

    await handleCopyToClipboard(previewCanvasRef.current, {
      format,
      quality,
      stripMetadata,
    });
  }, [source, settings.text, stripMetadata, handleCopyToClipboard]);

  const canDownload =
    !!source && !!settings.text.trim() && !isProcessing;

  const patchSettings = useCallback(
    (patch: Partial<TextOverlaySettings>) => {
      setSettings((current) => ({ ...current, ...patch }));
    },
    [],
  );

  return (
    <div className="w-full">
      <div className="glass-panel rounded-sm border border-border p-4 sm:p-6">
        {!source ? (
          <div
            className={`relative flex min-h-44 cursor-pointer flex-col items-center justify-center gap-3 rounded-sm border border-dashed p-5 transition-colors sm:min-h-48 sm:p-6 ${
              isDraggingFile
                ? "border-accent bg-accent-muted"
                : "border-border bg-background hover:border-muted"
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
              id="text-overlay-upload"
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
                Quotes · labels · social captions
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <label htmlFor="text-overlay-replace" className="font-label text-muted">
              Replace Image
            </label>
            <input
              id="text-overlay-replace"
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
            <div className="flex items-center justify-between gap-2">
              <span className="font-label text-muted">Preview</span>
              <span className="font-mono text-[10px] text-muted">
                Drag to position text
              </span>
            </div>
            <div className="flex min-h-56 items-center justify-center overflow-hidden rounded-sm border border-border bg-background p-3 sm:min-h-72">
              {source ? (
                <canvas
                  ref={previewCanvasRef}
                  className={`max-h-[min(50vh,420px)] max-w-full touch-none object-contain ${
                    isDragging ? "cursor-grabbing" : "cursor-grab"
                  }`}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                />
              ) : (
                <p className="px-4 text-center text-sm text-muted">
                  Upload an image to add text overlay.
                </p>
              )}
            </div>
            {source && (
              <p className="text-center font-mono text-[10px] text-muted">
                {source.width} × {source.height}px · {settings.x}, {settings.y}
              </p>
            )}
          </div>

          <div className="space-y-4 border border-border bg-background p-4">
            <div className="space-y-2">
              <label htmlFor="text-overlay-content" className="font-label text-muted">
                Text
              </label>
              <textarea
                id="text-overlay-content"
                rows={4}
                disabled={!source}
                value={settings.text}
                onChange={(event) => patchSettings({ text: event.target.value })}
                className={`${inputClassName} min-h-24 resize-y py-2.5`}
                placeholder="Enter quote or label…"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="text-overlay-font" className="font-label text-muted">
                Font
              </label>
              <select
                id="text-overlay-font"
                disabled={!source}
                value={settings.fontFamily}
                onChange={(event) =>
                  patchSettings({ fontFamily: event.target.value })
                }
                className={inputClassName}
              >
                {FONT_OPTIONS.map((font) => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label htmlFor="text-overlay-size" className="font-label text-muted">
                  Size
                </label>
                <span className="font-mono text-[10px] text-foreground">
                  {settings.fontSizePercent}%
                </span>
              </div>
              <input
                id="text-overlay-size"
                type="range"
                min={2}
                max={14}
                step={0.5}
                disabled={!source}
                value={settings.fontSizePercent}
                onChange={(event) =>
                  patchSettings({ fontSizePercent: Number(event.target.value) })
                }
                className="h-2 w-full cursor-pointer appearance-none rounded-sm bg-track accent-accent disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="text-overlay-color" className="font-label text-muted">
                Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="text-overlay-color"
                  type="color"
                  disabled={!source}
                  value={settings.color}
                  onChange={(event) =>
                    patchSettings({ color: event.target.value })
                  }
                  className="h-11 w-14 shrink-0 cursor-pointer rounded-sm border border-border bg-background p-1 disabled:opacity-50"
                />
                <span className="font-mono text-xs text-muted">{settings.color}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-label text-muted">Alignment</span>
              <div className="grid grid-cols-3 gap-1.5">
                {ALIGN_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    disabled={!source}
                    onClick={() => patchSettings({ align: option.value })}
                    className={`min-h-9 rounded-sm border font-mono text-[10px] transition-colors disabled:opacity-50 ${
                      settings.align === option.value
                        ? "border-accent/40 bg-accent-muted text-accent"
                        : "border-border bg-card text-muted hover:border-muted hover:text-foreground"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex min-h-11 cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                disabled={!source}
                checked={settings.shadow}
                onChange={(event) =>
                  patchSettings({ shadow: event.target.checked })
                }
                className="h-4 w-4 shrink-0 rounded-sm border border-border bg-background accent-accent disabled:opacity-50"
              />
              <span className="font-label text-muted">Text shadow</span>
            </label>

            <label className="flex min-h-11 cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                disabled={!source}
                checked={settings.backgroundBox}
                onChange={(event) =>
                  patchSettings({ backgroundBox: event.target.checked })
                }
                className="h-4 w-4 shrink-0 rounded-sm border border-border bg-background accent-accent disabled:opacity-50"
              />
              <span className="font-label text-muted">Background box</span>
            </label>

            {settings.backgroundBox && (
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor="text-overlay-bg-opacity"
                    className="font-label text-muted"
                  >
                    Box opacity
                  </label>
                  <span className="font-mono text-[10px] text-foreground">
                    {Math.round(settings.backgroundOpacity * 100)}%
                  </span>
                </div>
                <input
                  id="text-overlay-bg-opacity"
                  type="range"
                  min={10}
                  max={90}
                  step={5}
                  disabled={!source}
                  value={Math.round(settings.backgroundOpacity * 100)}
                  onChange={(event) =>
                    patchSettings({
                      backgroundOpacity: Number(event.target.value) / 100,
                    })
                  }
                  className="h-2 w-full cursor-pointer appearance-none rounded-sm bg-track accent-accent disabled:opacity-50"
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 border-t border-border pt-5">
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
          isProcessing={isProcessing}
        />

        <p className="mt-3 text-center font-mono text-[10px] text-muted">
          Text is baked into the export locally — nothing is uploaded.
        </p>
      </div>

      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </div>
  );
}
