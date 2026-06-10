"use client";

import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { HelperErrorAlert } from "@/components/characters/HelperErrorAlert";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { ImageFileInput } from "@/components/ui/ImageFileInput";
import { ImageUploadDropzone } from "@/components/ui/ImageUploadDropzone";
import { SliderControl } from "@/components/ui/SliderControl";
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
  { value: "Inter, system-ui, sans-serif", labelKey: "sans" },
  { value: "Georgia, serif", labelKey: "serif" },
  { value: '"Roboto Mono", ui-monospace, monospace', labelKey: "mono" },
  { value: "Impact, Haettenschweiler, sans-serif", labelKey: "impact" },
] as const;

const ALIGN_OPTIONS: { value: TextAlign; labelKey: "left" | "center" | "right" }[] = [
  { value: "left", labelKey: "left" },
  { value: "center", labelKey: "center" },
  { value: "right", labelKey: "right" },
];

export function TextOverlay() {
  const { t } = useLanguage();
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

  const defaultSettings = useMemo(
    (): Omit<TextOverlaySettings, "x" | "y"> => ({
      text: t("toolUi.textOverlay.defaultText"),
      fontFamily: FONT_OPTIONS[0].value,
      fontSizePercent: 6,
      color: "#ffffff",
      align: "center",
      shadow: true,
      backgroundBox: true,
      backgroundOpacity: 0.45,
    }),
    [t],
  );

  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [stripMetadata, setStripMetadata] = useState(true);
  const [settings, setSettings] = useState<TextOverlaySettings>({
    ...defaultSettings,
    x: 0,
    y: 0,
  });

  const fontOptions = useMemo(
    () =>
      FONT_OPTIONS.map((font) => ({
        ...font,
        label: t(`toolUi.textOverlay.${font.labelKey}`),
      })),
    [t],
  );

  const alignOptions = useMemo(
    () =>
      ALIGN_OPTIONS.map((option) => ({
        ...option,
        label: t(`toolUi.textOverlay.${option.labelKey}`),
      })),
    [t],
  );

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
    <ToolWorkspace>
        {!source ? (
          <ImageUploadDropzone
            inputId="text-overlay-upload"
            onFileChange={handleFileChange}
            isDragging={isDraggingFile}
            onDraggingChange={setIsDraggingFile}
            formatHint={t("toolUi.textOverlay.uploadHint")}
          />
        ) : (
          <ImageFileInput
            id="text-overlay-replace"
            fileName={source.file.name}
            onFileChange={handleFileChange}
          />
        )}

        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="font-label text-muted">{t("common.preview")}</span>
              <span className="font-mono text-[10px] text-muted">
                {t("toolUi.textOverlay.dragToPosition")}
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
                  {t("toolUi.textOverlay.previewHint")}
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
                {t("toolUi.textOverlay.text")}
              </label>
              <textarea
                id="text-overlay-content"
                rows={4}
                disabled={!source}
                value={settings.text}
                onChange={(event) => patchSettings({ text: event.target.value })}
                className={`${inputClassName} min-h-24 resize-y py-2.5`}
                placeholder={t("toolUi.textOverlay.placeholder")}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="text-overlay-font" className="font-label text-muted">
                {t("toolUi.textOverlay.font")}
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
                {fontOptions.map((font) => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </select>
            </div>

            <SliderControl
              id="text-overlay-size"
              label={t("common.size")}
              value={settings.fontSizePercent}
              min={2}
              max={14}
              step={0.5}
              suffix="%"
              disabled={!source}
              onChange={(fontSizePercent) => patchSettings({ fontSizePercent })}
            />

            <div className="space-y-2">
              <label htmlFor="text-overlay-color" className="font-label text-muted">
                {t("common.color")}
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
              <span className="font-label text-muted">
                {t("toolUi.textOverlay.alignment")}
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {alignOptions.map((option) => (
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
              <span className="font-label text-muted">
                {t("toolUi.textOverlay.textShadow")}
              </span>
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
              <span className="font-label text-muted">
                {t("toolUi.textOverlay.backgroundBox")}
              </span>
            </label>

            {settings.backgroundBox && (
              <div className="space-y-2">
                <SliderControl
                  id="text-overlay-bg-opacity"
                  label={t("toolUi.textOverlay.boxOpacity")}
                  value={Math.round(settings.backgroundOpacity * 100)}
                  min={10}
                  max={90}
                  step={5}
                  suffix="%"
                  disabled={!source}
                  onChange={(value) =>
                    patchSettings({ backgroundOpacity: value / 100 })
                  }
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

        {error ? (
          <HelperErrorAlert message={error} className="mt-4" />
        ) : null}

        <ToolOutputActions
          onDownload={handleDownloadImage}
          onCopy={handleCopyImage}
          downloadLabel={t("downloads.download")}
          disabled={!canDownload}
          isProcessing={isProcessing}
        />

        <p className="mt-3 text-center font-mono text-[10px] text-muted">
          {t("toolUi.textOverlay.footer")}
        </p>
      
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </ToolWorkspace>
  );
}
