"use client";

import { HelperErrorAlert } from "@/components/characters/HelperErrorAlert";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { WorkflowSettings } from "@/components/tools/workflow/WorkflowStep";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { resolveErrorMessage } from "@/i18n";
import { ImageFileInput } from "@/components/ui/ImageFileInput";
import { ToolStyledUploadZone } from "@/components/tools/shared/ToolStyledUploadZone";
import { useToast } from "@/components/ui/ToastProvider";
import { useImageProcessor } from "@/hooks/useImageProcessor";
import { useImageToolProject } from "@/hooks/useToolProject";
import { ToolProjectSaveButton } from "@/components/projects/ToolProjectSaveButton";
import {
  sampleColorFromCanvas,
  type SampledColor,
} from "@/lib/colorUtils";
import { ToolWorkspacePreview } from "@/components/tools/shared/ToolWorkspacePreview";

const MAGNIFIER_SIZE = 11;
const MAGNIFIER_ZOOM = 12;

interface PointerPosition {
  x: number;
  y: number;
  clientX: number;
  clientY: number;
}

function getNaturalCoords(
  clientX: number,
  clientY: number,
  image: HTMLImageElement,
): { x: number; y: number } {
  const rect = image.getBoundingClientRect();
  const scaleX = image.naturalWidth / rect.width;
  const scaleY = image.naturalHeight / rect.height;

  const x = Math.floor((clientX - rect.left) * scaleX);
  const y = Math.floor((clientY - rect.top) * scaleY);

  return {
    x: Math.max(0, Math.min(image.naturalWidth - 1, x)),
    y: Math.max(0, Math.min(image.naturalHeight - 1, y)),
  };
}

function drawMagnifier(
  magnifierCanvas: HTMLCanvasElement,
  sourceCanvas: HTMLCanvasElement,
  centerX: number,
  centerY: number,
): void {
  const ctx = magnifierCanvas.getContext("2d");
  if (!ctx) return;

  const half = Math.floor(MAGNIFIER_SIZE / 2);
  const sourceX = Math.max(0, centerX - half);
  const sourceY = Math.max(0, centerY - half);
  const sourceWidth = Math.min(
    MAGNIFIER_SIZE,
    sourceCanvas.width - sourceX,
  );
  const sourceHeight = Math.min(
    MAGNIFIER_SIZE,
    sourceCanvas.height - sourceY,
  );

  const outputSize = MAGNIFIER_SIZE * MAGNIFIER_ZOOM;
  magnifierCanvas.width = outputSize;
  magnifierCanvas.height = outputSize;

  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, outputSize, outputSize);
  ctx.drawImage(
    sourceCanvas,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    sourceWidth * MAGNIFIER_ZOOM,
    sourceHeight * MAGNIFIER_ZOOM,
  );

  ctx.strokeStyle = "#e8e8e8";
  ctx.lineWidth = 1;
  for (let i = 0; i <= MAGNIFIER_SIZE; i++) {
    const offset = i * MAGNIFIER_ZOOM;
    ctx.beginPath();
    ctx.moveTo(offset, 0);
    ctx.lineTo(offset, outputSize);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, offset);
    ctx.lineTo(outputSize, offset);
    ctx.stroke();
  }

  const centerOffset = half * MAGNIFIER_ZOOM;
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.strokeRect(
    centerOffset,
    centerOffset,
    MAGNIFIER_ZOOM,
    MAGNIFIER_ZOOM,
  );
}

export function ColorPicker() {
  const { t, language } = useLanguage();
  const { source, error, loadFile, setError } = useImageProcessor();
  const { showToast } = useToast();

  const pickCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const magnifierRef = useRef<HTMLCanvasElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [pointer, setPointer] = useState<PointerPosition | null>(null);
  const [hoverColor, setHoverColor] = useState<SampledColor | null>(null);
  const [pickedColor, setPickedColor] = useState<SampledColor | null>(null);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  useImageToolProject({
    toolId: "color-picker",
    source,
    loadFile,
    getExtraPayload: () => ({
      pickedColor,
      hoverColor,
    }),
    applyPayload: (payload) => {
      if (payload.pickedColor && typeof payload.pickedColor === "object") {
        setPickedColor(payload.pickedColor as SampledColor);
      }
      if (payload.hoverColor && typeof payload.hoverColor === "object") {
        setHoverColor(payload.hoverColor as SampledColor);
      }
    },
  });

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) {
        setIsReady(false);
        setPointer(null);
        setHoverColor(null);
        setPickedColor(null);
        void loadFile(file);
      }
    },
    [loadFile],
  );

  useEffect(() => {
    if (!source) {
      setIsReady(false);
      return;
    }

    const image = new Image();
    let cancelled = false;

    image.onload = () => {
      if (cancelled) return;

      const canvas = pickCanvasRef.current;
      if (!canvas) return;

      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setError(t("toolUi.colorPicker.canvasUnavailable"));
        return;
      }

      ctx.drawImage(image, 0, 0);
      setIsReady(true);
    };

    image.onerror = () => {
      if (!cancelled) setError(t("toolUi.colorPicker.loadFailed"));
    };

    image.src = source.url;

    return () => {
      cancelled = true;
    };
  }, [source, setError, t]);

  useEffect(() => {
    if (!pointer || !pickCanvasRef.current || !magnifierRef.current) return;
    drawMagnifier(
      magnifierRef.current,
      pickCanvasRef.current,
      pointer.x,
      pointer.y,
    );
  }, [pointer, hoverColor]);

  const updateSample = useCallback(
    (clientX: number, clientY: number, commit = false) => {
      const image = imageRef.current;
      const canvas = pickCanvasRef.current;
      if (!image || !canvas || !isReady) return;

      const { x, y } = getNaturalCoords(clientX, clientY, image);

      try {
        const color = sampleColorFromCanvas(canvas, x, y);
        setPointer({ x, y, clientX, clientY });
        setHoverColor(color);

        if (commit) {
          setPickedColor(color);
        }
      } catch (cause) {
        setError(
          resolveErrorMessage(language, cause, "toolUi.colorPicker.sampleFailed"),
        );
      }
    },
    [isReady, language, setError],
  );

  const handlePointerMove = useCallback(
    (event: React.MouseEvent<HTMLImageElement>) => {
      updateSample(event.clientX, event.clientY);
    },
    [updateSample],
  );

  const handlePointerLeave = useCallback(() => {
    setPointer(null);
    setHoverColor(null);
  }, []);

  const handlePick = useCallback(
    (event: React.MouseEvent<HTMLImageElement>) => {
      updateSample(event.clientX, event.clientY, true);
    },
    [updateSample],
  );

  const handleCopy = useCallback(
    async (value: string, format: string) => {
      try {
        await navigator.clipboard.writeText(value);
        setCopiedFormat(format);
        showToast(value, { title: t("common.copied") });
        window.setTimeout(() => setCopiedFormat(null), 1500);
      } catch {
        setError(t("toast.couldNotCopy"));
      }
    },
    [showToast, setError, t],
  );

  const activeColor = pickedColor ?? hoverColor;

  const magnifierStyle = pointer
    ? {
        left: Math.min(
          pointer.clientX + 16,
          (viewerRef.current?.getBoundingClientRect().right ?? pointer.clientX) -
            MAGNIFIER_SIZE * MAGNIFIER_ZOOM -
            8,
        ),
        top: Math.max(
          (viewerRef.current?.getBoundingClientRect().top ?? 0) + 8,
          pointer.clientY - MAGNIFIER_SIZE * MAGNIFIER_ZOOM - 16,
        ),
      }
    : undefined;

  return (
    <ToolWorkspace
      workflowState={{
        hasSource: !!source,
        hasConfigured: true,
        isProcessing: false,
        isReady: !!source,
      }}
    >
        {!source ? (
          <ToolStyledUploadZone
            inputId="color-picker-upload"
            onFileChange={handleFileChange}
            isDragging={isDragging}
            onDraggingChange={setIsDragging}
            formatHint={t("toolUi.colorPicker.clickHint")}
          />
        ) : (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-label text-muted">{t("common.replaceImage")}</span>
              <span className="font-mono text-[10px] text-muted">
                {source.width} × {source.height}px
              </span>
            </div>
            <ImageFileInput
              id="color-picker-replace"
              label={false}
              fileName={source.file.name}
              onFileChange={handleFileChange}
            />

            <ToolWorkspacePreview hint={t("toolUi.colorPicker.hoverHint")}>
              <div ref={viewerRef} className="relative w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={imageRef}
                  src={source.url}
                  alt={t("alt.colorSamplingSource")}
                  className="mx-auto block max-h-[28rem] w-full cursor-crosshair object-contain"
                  onMouseMove={handlePointerMove}
                  onMouseLeave={handlePointerLeave}
                  onClick={handlePick}
                />

                {pointer && (
                  <div
                    className="pointer-events-none fixed z-50 rounded-sm border border-border bg-card p-1 shadow-lg"
                    style={magnifierStyle}
                  >
                    <p className="mb-1 px-1 font-mono text-[9px] text-muted">
                      {pointer.x}, {pointer.y}
                    </p>
                    <canvas
                      ref={magnifierRef}
                      className="block"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
            </ToolWorkspacePreview>
          </div>
        )}

        <WorkflowSettings>
          <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-label text-foreground">{t("toolUi.colorPicker.sampledColor")}</h2>
            {pointer && (
              <span className="font-mono text-[10px] text-muted">
                {t("toolUi.colorPicker.pixel", { x: pointer.x, y: pointer.y })}
              </span>
            )}
          </div>

          {!activeColor ? (
            <div className="flex min-h-28 items-center justify-center rounded-sm border border-dashed border-border bg-background p-6 text-center">
              <p className="text-sm text-muted">
                {t("toolUi.colorPicker.uploadHint")}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4 border border-border bg-background p-4">
                <span
                  className="h-16 w-16 shrink-0 rounded-sm border border-border"
                  style={{ backgroundColor: activeColor.hex }}
                />
                <div className="min-w-0 space-y-1">
                  <p className="font-label text-muted">
                    {pickedColor
                      ? t("toolUi.colorPicker.lockedSample")
                      : t("toolUi.colorPicker.livePreview")}
                  </p>
                  <p className="truncate font-mono text-sm text-foreground">
                    {activeColor.hex}
                  </p>
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-3">
                {(
                  [
                    { label: "HEX", value: activeColor.hex, key: "hex" },
                    { label: "RGB", value: activeColor.rgb, key: "rgb" },
                    { label: "HSL", value: activeColor.hsl, key: "hsl" },
                  ] as const
                ).map((format) => (
                  <button
                    key={format.key}
                    type="button"
                    onClick={() => void handleCopy(format.value, format.key)}
                    className="flex min-h-11 flex-col items-start gap-1 rounded-sm border border-border bg-card px-3 py-2.5 text-start transition-colors hover:border-muted hover:bg-surface"
                  >
                    <span className="font-label text-muted">{format.label}</span>
                    <span
                      className={`truncate font-mono text-xs ${
                        copiedFormat === format.key
                          ? "text-accent"
                          : "text-foreground"
                      }`}
                    >
                      {copiedFormat === format.key
                        ? t("common.copied")
                        : format.value}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          </div>
        </WorkflowSettings>

        {error ? (
          <HelperErrorAlert message={error} className="mt-4" />
        ) : null}

        <div className="mt-4">
          <ToolProjectSaveButton />
        </div>

        <p className="mt-4 text-center font-mono text-[10px] text-muted">
          {t("toolUi.colorPicker.footer")}
        </p>
      
      <canvas ref={pickCanvasRef} className="hidden" aria-hidden="true" />
    </ToolWorkspace>
  );
}