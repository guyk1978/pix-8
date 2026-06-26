"use client";

import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { HelperErrorAlert } from "@/components/characters/HelperErrorAlert";
import { useCallback, useEffect, useRef, useState, type DragEvent } from "react";
import { ImageFileInput } from "@/components/ui/ImageFileInput";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { resolveErrorMessage } from "@/i18n";
import { SliderControl } from "@/components/ui/SliderControl";
import { StripMetadataToggle } from "@/components/tools/StripMetadataToggle";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import { WorkflowSettings } from "@/components/tools/workflow/WorkflowStep";
import { ToolStyledUploadZone } from "@/components/tools/shared/ToolStyledUploadZone";
import { ToolWorkspacePreview } from "@/components/tools/shared/ToolWorkspacePreview";
import { embeddedToolbarPrimaryClassName } from "@/components/tools/toolActionStyles";
import {
  buildDownloadFilename,
  loadImageFromFile,
  renderWatermarkedCanvas,
  type ParsedImage,
  type WatermarkPosition,
  resolveFormat,
  useImageProcessor,
} from "@/hooks/useImageProcessor";
import { useToolExportSettings } from "@/hooks/useToolExportSettings";
import {
  applyBooleanPayload,
  applyNumberPayload,
  useToolProject,
} from "@/hooks/useToolProject";
import { MAIN_IMAGE_KEY, WATERMARK_IMAGE_KEY } from "@/lib/projects/types";

const POSITIONS: { id: WatermarkPosition; label: string }[] = [
  { id: "top-left", label: "TL" },
  { id: "top-center", label: "TC" },
  { id: "top-right", label: "TR" },
  { id: "center-left", label: "CL" },
  { id: "center", label: "C" },
  { id: "center-right", label: "CR" },
  { id: "bottom-left", label: "BL" },
  { id: "bottom-center", label: "BC" },
  { id: "bottom-right", label: "BR" },
];

const positionButtonClassName =
  "min-h-9 rounded-sm border border-border bg-background font-mono text-[10px] text-muted transition-colors hover:border-muted hover:text-foreground";

const activePositionClassName = "border-accent/40 bg-accent-muted text-accent";

function WatermarkAwaitingOverlay({
  sourceUrl,
  error,
  onFile,
}: {
  sourceUrl: string;
  error: string | null;
  onFile: (file: File | null) => void;
}) {
  const { t } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
      const file = event.dataTransfer.files?.[0] ?? null;
      if (file?.type.startsWith("image/")) {
        void onFile(file);
      }
    },
    [onFile],
  );

  return (
    <div className="watermark-awaiting-overlay relative flex max-h-full max-w-full items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={sourceUrl}
        alt={t("alt.preview")}
        className="character-pixelated max-h-full max-w-full object-contain opacity-75"
      />
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center transition-colors sm:gap-4 sm:p-6 ${
          isDragging
            ? "bg-accent/15 ring-2 ring-inset ring-accent/40"
            : "bg-background/55 backdrop-blur-[2px]"
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
        onDrop={handleDrop}
      >
        <p className="max-w-sm text-sm text-foreground sm:text-base">
          {t("watermark.addWatermarkHint")}
        </p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`${embeddedToolbarPrimaryClassName} !h-10 !px-4 !text-xs sm:!text-[0.6875rem]`}
        >
          {t("watermark.chooseWatermark")}
        </button>
        <p className="font-mono text-[10px] text-muted sm:text-xs">
          {t("watermark.dropWatermarkHint")}
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(event) => {
            onFile(event.target.files?.[0] ?? null);
            event.target.value = "";
          }}
        />
        {error ? (
          <p className="max-w-sm rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function Watermark() {
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

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const watermarkUrlRef = useRef<string | null>(null);

  const [watermark, setWatermark] = useState<ParsedImage | null>(null);
  const [opacity, setOpacity] = useState(80);
  const [scale, setScale] = useState(20);
  const [position, setPosition] = useState<WatermarkPosition>("bottom-right");
  const {
    stripMetadata,
    setStripMetadata,
    cornerRadius,
    setCornerRadius,
    downloadOptions,
  } = useToolExportSettings();
  const [isDragging, setIsDragging] = useState(false);

  const revokeWatermarkUrl = useCallback(() => {
    if (watermarkUrlRef.current) {
      URL.revokeObjectURL(watermarkUrlRef.current);
      watermarkUrlRef.current = null;
    }
  }, []);

  useToolProject({
    toolId: "watermark",
    canSave: !!source,
    getToolState: () => ({
      ...downloadOptions,
      opacity,
      scale,
      position,
    }),
    getImages: () => {
      const images = source
        ? [{ key: MAIN_IMAGE_KEY, file: source.file }]
        : [];

      if (watermark) {
        images.push({ key: WATERMARK_IMAGE_KEY, file: watermark.file });
      }

      return images;
    },
    restore: async (settings, files) => {
      applyBooleanPayload(settings, "stripMetadata", setStripMetadata);
      applyNumberPayload(settings, "cornerRadius", setCornerRadius);
      applyNumberPayload(settings, "opacity", setOpacity);
      applyNumberPayload(settings, "scale", setScale);

      if (typeof settings.position === "string") {
        setPosition(settings.position as WatermarkPosition);
      }

      const mainFile = files.get(MAIN_IMAGE_KEY);
      if (mainFile) {
        await loadFile(mainFile);
      }

      const watermarkFile = files.get(WATERMARK_IMAGE_KEY);
      if (watermarkFile) {
        revokeWatermarkUrl();
        const parsed = await loadImageFromFile(watermarkFile);
        watermarkUrlRef.current = parsed.objectUrl;
        setWatermark(parsed);
      }
    },
  });

  const handleMainFile = useCallback(
    (file: File | null) => {
      if (file) void loadFile(file);
    },
    [loadFile],
  );

  const handleWatermarkFile = useCallback(
    async (file: File | null) => {
      if (!file) return;

      setError(null);

      try {
        revokeWatermarkUrl();
        const parsed = await loadImageFromFile(file);
        watermarkUrlRef.current = parsed.objectUrl;
        setWatermark(parsed);
      } catch (cause) {
        setError(
          resolveErrorMessage(language, cause, "toolUi.watermark.couldNotLoad"),
        );
      }
    },
    [language, revokeWatermarkUrl, setError],
  );

  useEffect(() => {
    return () => revokeWatermarkUrl();
  }, [revokeWatermarkUrl]);

  useEffect(() => {
    if (!source || !watermark || !previewCanvasRef.current) return;

    const mainImage = new Image();
    mainImage.onload = () => {
      renderWatermarkedCanvas(
        mainImage,
        source.width,
        source.height,
        {
          image: watermark.image,
          opacity: opacity / 100,
          position,
          scale: scale / 100,
        },
        previewCanvasRef.current,
      );
    };
    mainImage.src = source.url;
  }, [source, watermark, opacity, position, scale]);

  const runWatermark = useCallback(async () => {
    if (!source || !watermark) return null;

    return processImage(source.file, {
      width: source.width,
      height: source.height,
      format: resolveFormat(source.mimeType),
      ...downloadOptions,
      canvas: canvasRef.current,
      watermark: {
        image: watermark.image,
        opacity: opacity / 100,
        position,
        scale: scale / 100,
      },
    });
  }, [
    source,
    watermark,
    opacity,
    position,
    scale,
    downloadOptions,
    processImage,
    canvasRef,
  ]);

  const handleDownloadImage = useCallback(async () => {
    const result = await runWatermark();
    if (!result || !source) return;

    await handleDownload(
      result.blob,
      buildDownloadFilename(`${source.name}-watermarked`, result.format),
      { ...downloadOptions },
    );
  }, [runWatermark, source, downloadOptions, handleDownload]);

  const handleCopyImage = useCallback(async () => {
    const result = await runWatermark();
    if (!result) return;

    await handleCopyToClipboard(result.blob, { ...downloadOptions });
  }, [runWatermark, downloadOptions, handleCopyToClipboard]);

  const canDownload = !!source && !!watermark && !isProcessing;

  return (
    <ToolWorkspace
      workflowState={{
        hasSource: !!source,
        hasConfigured: !!watermark,
        isProcessing: Boolean(isProcessing),
        isReady: canDownload,
      }}
    >
        {!source ? (
          <ToolStyledUploadZone
            inputId="watermark-main-upload"
            onFileChange={handleMainFile}
            isDragging={isDragging}
            onDraggingChange={setIsDragging}
          />
        ) : (
          <>
            <ImageFileInput
              id="watermark-main"
              fileName={source.file.name}
              onFileChange={handleMainFile}
            />

            <ImageFileInput
              id="watermark-logo"
              toolbarSlotId="secondary-file-input"
              label={t("watermark.watermarkImage")}
              fileName={watermark?.file.name}
              onFileChange={(file) => void handleWatermarkFile(file)}
            />
          </>
        )}

        <WorkflowSettings>
          <div className="space-y-4">
            <SliderControl
              id="watermark-opacity"
              label={t("common.opacity")}
              value={opacity}
              min={0}
              max={100}
              step={1}
              suffix="%"
              disabled={!watermark}
              onChange={setOpacity}
            />

            <SliderControl
              id="watermark-size"
              label={t("common.size")}
              value={scale}
              min={5}
              max={50}
              step={1}
              suffix="%"
              disabled={!watermark}
              onChange={setScale}
            />

            <div className="space-y-2">
              <span className="font-label text-muted">{t("common.position")}</span>
              <div className="grid grid-cols-3 gap-1.5">
                {POSITIONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    disabled={!watermark}
                    onClick={() => setPosition(item.id)}
                    className={`${positionButtonClassName} ${
                      position === item.id ? activePositionClassName : ""
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </WorkflowSettings>

        {source ? (
          <ToolWorkspacePreview
            caption={
              <>
                {source.width} × {source.height}px · {source.file.name}
                {watermark ? ` · ${watermark.file.name}` : null}
              </>
            }
          >
            {watermark ? (
              <canvas
                ref={previewCanvasRef}
                className="max-h-[min(50vh,420px)] max-w-full object-contain"
              />
            ) : (
              <WatermarkAwaitingOverlay
                sourceUrl={source.url}
                error={error}
                onFile={(file) => void handleWatermarkFile(file)}
              />
            )}
          </ToolWorkspacePreview>
        ) : null}

        <StripMetadataToggle
          checked={stripMetadata}
          disabled={!source}
          onChange={setStripMetadata}
          cornerRadius={cornerRadius}
          onCornerRadiusChange={setCornerRadius}
          maxCornerRadius={
            source
              ? Math.floor(Math.min(source.width, source.height) / 2)
              : 200
          }
        />

        {error && watermark ? (
          <HelperErrorAlert message={error} className="mt-4" />
        ) : null}

        <ToolOutputActions
          onDownload={handleDownloadImage}
          onCopy={handleCopyImage}
          downloadLabel={t("downloads.downloadWatermarked")}
          disabled={!canDownload}
          isProcessing={isProcessing}
        />
      
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </ToolWorkspace>
  );
}
