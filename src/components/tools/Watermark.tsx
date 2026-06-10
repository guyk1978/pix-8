"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ImageFileInput } from "@/components/ui/ImageFileInput";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { resolveErrorMessage } from "@/i18n";
import { SliderControl } from "@/components/ui/SliderControl";
import { StripMetadataToggle } from "@/components/tools/StripMetadataToggle";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import {
  buildDownloadFilename,
  loadImageFromFile,
  renderWatermarkedCanvas,
  type ParsedImage,
  type WatermarkPosition,
  resolveFormat,
  useImageProcessor,
} from "@/hooks/useImageProcessor";

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
  const [stripMetadata, setStripMetadata] = useState(true);

  const revokeWatermarkUrl = useCallback(() => {
    if (watermarkUrlRef.current) {
      URL.revokeObjectURL(watermarkUrlRef.current);
      watermarkUrlRef.current = null;
    }
  }, []);

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
      stripMetadata,
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
    stripMetadata,
    processImage,
    canvasRef,
  ]);

  const handleDownloadImage = useCallback(async () => {
    const result = await runWatermark();
    if (!result || !source) return;

    await handleDownload(
      result.blob,
      buildDownloadFilename(`${source.name}-watermarked`, result.format),
      { stripMetadata },
    );
  }, [runWatermark, source, stripMetadata, handleDownload]);

  const handleCopyImage = useCallback(async () => {
    const result = await runWatermark();
    if (!result) return;

    await handleCopyToClipboard(result.blob, { stripMetadata });
  }, [runWatermark, stripMetadata, handleCopyToClipboard]);

  const canDownload = !!source && !!watermark && !isProcessing;

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="glass-panel rounded-sm border border-border p-4 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <ImageFileInput
            id="watermark-main"
            label={t("watermark.mainImage")}
            fileName={source?.file.name}
            onFileChange={handleMainFile}
          />

          <ImageFileInput
            id="watermark-logo"
            label={t("watermark.watermarkImage")}
            fileName={watermark?.file.name}
            disabled={!source}
            onFileChange={(file) => void handleWatermarkFile(file)}
          />
        </div>

        <div className="mt-5">
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
        </div>

        <div className="mt-5">
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
        </div>

        <div className="mt-5 space-y-2">
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

        <div className="mt-5 flex min-h-48 items-center justify-center overflow-hidden rounded-sm border border-border bg-background p-3 sm:min-h-56">
          {source && watermark ? (
            <canvas
              ref={previewCanvasRef}
              className="max-h-[min(50vh,420px)] max-w-full object-contain"
            />
          ) : (
            <p className="px-4 text-center text-sm text-muted">
              {source
                ? t("watermark.addWatermarkHint")
                : t("watermark.uploadMainHint")}
            </p>
          )}
        </div>

        {source && (
          <p className="mt-3 text-center font-mono text-xs text-muted">
            {source.width} × {source.height}px · {source.file.name}
          </p>
        )}

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
          downloadLabel={t("downloads.downloadWatermarked")}
          disabled={!canDownload}
          isProcessing={isProcessing}
        />
      </div>

      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </div>
  );
}
