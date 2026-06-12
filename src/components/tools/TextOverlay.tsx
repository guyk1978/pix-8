"use client";

import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { HelperErrorAlert } from "@/components/characters/HelperErrorAlert";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { SliderControl } from "@/components/ui/SliderControl";
import { StripMetadataToggle } from "@/components/tools/StripMetadataToggle";
import { ToolFieldsStage } from "@/components/tools/shared/ToolFieldsStage";
import { ToolStyledUploadZone } from "@/components/tools/shared/ToolStyledUploadZone";
import { ToolWorkspacePreview } from "@/components/tools/shared/ToolWorkspacePreview";
import { ImageFileInput } from "@/components/ui/ImageFileInput";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import {
  buildDownloadFilename,
  resolveFormat,
  useImageProcessor,
} from "@/hooks/useImageProcessor";
import { applyBooleanPayload, useImageToolProject } from "@/hooks/useToolProject";
import {
  displayToNaturalCoords,
  renderTextOverlayCanvas,
  type TextAlign,
  type TextOverlaySettings,
} from "@/lib/textOverlayRender";

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

const buttonClassName = "tool-chip-button disabled:cursor-not-allowed disabled:opacity-40";

const activeButtonClassName = "tool-chip-button-active";

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

  useImageToolProject({
    toolId: "text-overlay",
    source,
    loadFile,
    getExtraPayload: () => ({ stripMetadata, settings }),
    applyPayload: (payload) => {
      applyBooleanPayload(payload, "stripMetadata", setStripMetadata);
      if (payload.settings && typeof payload.settings === "object") {
        setSettings(payload.settings as TextOverlaySettings);
      }
    },
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

  const positionDisplay = source
    ? `${settings.x}, ${settings.y}`
    : t("toolUi.textOverlay.positionPlaceholder");

  return (
    <ToolWorkspace
      workflowState={{
        hasSource: !!source,
        hasConfigured: !!source && !!settings.text.trim(),
        isProcessing,
        isReady: canDownload,
      }}
    >
      {!source ? (
        <ToolStyledUploadZone
          inputId="text-overlay-upload"
          onFileChange={handleFileChange}
          isDragging={isDraggingFile}
          onDraggingChange={setIsDraggingFile}
          formatHint={t("toolUi.textOverlay.uploadHint")}
        />
      ) : (
        <>
          <ImageFileInput
            id="text-overlay-replace"
            fileName={source.file.name}
            onFileChange={handleFileChange}
          />
          <ToolWorkspacePreview
            hint={t("toolUi.textOverlay.dragToPosition")}
            caption={
              <>
                {source.width} × {source.height}px · {settings.x}, {settings.y}
              </>
            }
          >
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
          </ToolWorkspacePreview>
        </>
      )}

      <ToolFieldsStage
        fields={[
          {
            label: t("toolUi.textOverlay.text"),
            englishLabel: "Text",
            htmlFor: "text-overlay-content",
            children: (
              <textarea
                id="text-overlay-content"
                rows={4}
                disabled={!source}
                value={settings.text}
                onChange={(event) => patchSettings({ text: event.target.value })}
                className="tool-input block min-h-24 resize-y py-2.5"
                placeholder={t("toolUi.textOverlay.placeholder")}
              />
            ),
          },
          {
            label: t("toolUi.textOverlay.position"),
            englishLabel: "Position",
            htmlFor: "text-overlay-position",
            children: (
              <output
                id="text-overlay-position"
                className={`tool-input block border-transparent bg-transparent font-mono text-xs ${
                  source ? "text-muted" : "text-muted/60"
                }`}
              >
                {positionDisplay}
              </output>
            ),
          },
          {
            label: t("toolUi.textOverlay.style"),
            englishLabel: "Style",
            htmlFor: "text-overlay-font",
            children: (
              <div className="flex flex-col gap-5">
                <div className="tool-control-group">
                  <label
                    htmlFor="text-overlay-font"
                    className="tool-control-label"
                  >
                    {t("toolUi.textOverlay.font")}
                  </label>
                  <select
                    id="text-overlay-font"
                    disabled={!source}
                    value={settings.fontFamily}
                    onChange={(event) =>
                      patchSettings({ fontFamily: event.target.value })
                    }
                    className="tool-input block"
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

                <div className="tool-control-group">
                  <label
                    htmlFor="text-overlay-color"
                    className="tool-control-label"
                  >
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
                      className="h-10 w-12 shrink-0 cursor-pointer rounded-md p-1 disabled:opacity-50"
                    />
                    <span className="font-mono text-xs text-muted">{settings.color}</span>
                  </div>
                </div>

                <div className="tool-control-group">
                  <span className="tool-control-label">
                    {t("toolUi.textOverlay.alignment")}
                  </span>
                  <div className="flex flex-col gap-2">
                    {alignOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        disabled={!source}
                        onClick={() => patchSettings({ align: option.value })}
                        className={`${buttonClassName} ${
                          settings.align === option.value ? activeButtonClassName : ""
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="flex min-h-9 cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    disabled={!source}
                    checked={settings.shadow}
                    onChange={(event) =>
                      patchSettings({ shadow: event.target.checked })
                    }
                    className="h-4 w-4 shrink-0 accent-accent disabled:opacity-50"
                  />
                  <span className="tool-control-label normal-case">
                    {t("toolUi.textOverlay.textShadow")}
                  </span>
                </label>

                <label className="flex min-h-9 cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    disabled={!source}
                    checked={settings.backgroundBox}
                    onChange={(event) =>
                      patchSettings({ backgroundBox: event.target.checked })
                    }
                    className="h-4 w-4 shrink-0 accent-accent disabled:opacity-50"
                  />
                  <span className="tool-control-label normal-case">
                    {t("toolUi.textOverlay.backgroundBox")}
                  </span>
                </label>

                {settings.backgroundBox ? (
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
                ) : null}
              </div>
            ),
          },
        ]}
      />

      <StripMetadataToggle
        checked={stripMetadata}
        disabled={!source}
        onChange={setStripMetadata}
      />

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
