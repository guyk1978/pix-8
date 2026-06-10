"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

const inputClassName =
  "w-full min-h-11 rounded-sm border border-[#333] bg-background px-3 py-2 font-mono text-xs text-foreground outline-none transition-colors file:mr-3 file:border-0 file:bg-transparent file:font-label file:text-muted focus:border-accent disabled:cursor-not-allowed disabled:opacity-50";

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
  "min-h-9 rounded-sm border border-[#333] bg-background font-mono text-[10px] text-muted transition-colors hover:border-muted hover:text-foreground";

const activePositionClassName = "border-accent/40 bg-accent-muted text-accent";

export function Watermark() {
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
        const message =
          cause instanceof Error
            ? cause.message
            : "Could not load the watermark image.";
        setError(message);
      }
    },
    [revokeWatermarkUrl, setError],
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
      <div className="glass-panel rounded-sm border border-[#333] p-4 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="watermark-main" className="font-label text-muted">
              Main Image
            </label>
            <input
              id="watermark-main"
              type="file"
              accept="image/*"
              onChange={(event) => {
                handleMainFile(event.target.files?.[0] ?? null);
                event.target.value = "";
              }}
              className={inputClassName}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="watermark-logo" className="font-label text-muted">
              Watermark Image
            </label>
            <input
              id="watermark-logo"
              type="file"
              accept="image/*"
              disabled={!source}
              onChange={(event) => {
                void handleWatermarkFile(event.target.files?.[0] ?? null);
                event.target.value = "";
              }}
              className={inputClassName}
            />
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="watermark-opacity" className="font-label text-muted">
              Opacity
            </label>
            <span className="font-mono text-sm tabular-nums text-foreground">
              {opacity}%
            </span>
          </div>
          <input
            id="watermark-opacity"
            type="range"
            min={0}
            max={100}
            step={1}
            value={opacity}
            disabled={!watermark}
            onChange={(event) => setOpacity(Number(event.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-sm bg-background accent-accent disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <span className="font-label text-muted">Size</span>
            <span className="font-mono text-sm tabular-nums text-foreground">
              {scale}%
            </span>
          </div>
          <input
            id="watermark-size"
            type="range"
            min={5}
            max={50}
            step={1}
            value={scale}
            disabled={!watermark}
            onChange={(event) => setScale(Number(event.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-sm bg-background accent-accent disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="mt-5 space-y-2">
          <span className="font-label text-muted">Position</span>
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

        <div className="mt-5 flex min-h-48 items-center justify-center overflow-hidden rounded-sm border border-[#333] bg-background p-3 sm:min-h-56">
          {source && watermark ? (
            <canvas
              ref={previewCanvasRef}
              className="max-h-[min(50vh,420px)] max-w-full object-contain"
            />
          ) : (
            <p className="px-4 text-center text-sm text-muted">
              {source
                ? "Add a watermark image to preview the result"
                : "Upload a main image to begin"}
            </p>
          )}
        </div>

        {source && (
          <p className="mt-3 text-center font-mono text-xs text-muted">
            {source.width} × {source.height}px · {source.file.name}
          </p>
        )}

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
          downloadLabel="Download Watermarked"
          disabled={!canDownload}
          isProcessing={isProcessing}
        />
      </div>

      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </div>
  );
}
