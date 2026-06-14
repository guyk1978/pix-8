"use client";

import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { OverlayPresetGallery } from "@/components/tools/OverlayPresetGallery";
import { AppLink } from "@/components/layout/AppLink";
import { HelperErrorAlert } from "@/components/characters/HelperErrorAlert";
import { useCallback, useEffect, useRef, useState } from "react";
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
  DEFAULT_OVERLAY_TRANSFORM,
  renderImageOverlayCanvas,
  type OverlayTransform,
} from "@/lib/imageOverlayRender";
import {
  loadOverlayImage,
  OVERLAY_PRESETS,
  type OverlayPresetId,
} from "@/lib/overlayAssets";
import { displayToNaturalCoords } from "@/lib/textOverlayRender";

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function ImageOverlay() {
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
  const isRotatingRef = useRef(false);
  const overlayImageRef = useRef<HTMLImageElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [stripMetadata, setStripMetadata] = useState(true);
  const [selectedPresetId, setSelectedPresetId] =
    useState<OverlayPresetId | null>(null);
  const [overlayReady, setOverlayReady] = useState(false);
  const [transform, setTransform] = useState<OverlayTransform>(
    DEFAULT_OVERLAY_TRANSFORM,
  );

  useImageToolProject({
    toolId: "image-overlay",
    source,
    loadFile,
    getExtraPayload: () => ({
      stripMetadata,
      selectedPresetId,
      transform,
    }),
    applyPayload: (payload) => {
      applyBooleanPayload(payload, "stripMetadata", setStripMetadata);

      if (
        typeof payload.selectedPresetId === "string" &&
        OVERLAY_PRESETS.some((preset) => preset.id === payload.selectedPresetId)
      ) {
        setSelectedPresetId(payload.selectedPresetId as OverlayPresetId);
      }

      if (payload.transform && typeof payload.transform === "object") {
        setTransform(payload.transform as OverlayTransform);
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

    setTransform((current) => ({
      ...current,
      x: Math.round(source.width / 2),
      y: Math.round(source.height / 2),
    }));

    if (!selectedPresetId) {
      setSelectedPresetId("stars");
    }
  }, [source, selectedPresetId]);

  useEffect(() => {
    if (!selectedPresetId) {
      overlayImageRef.current = null;
      setOverlayReady(false);
      return;
    }

    const preset = OVERLAY_PRESETS.find((entry) => entry.id === selectedPresetId);
    if (!preset) return;

    let cancelled = false;
    setOverlayReady(false);

    void loadOverlayImage(preset.src)
      .then((image) => {
        if (cancelled) return;
        overlayImageRef.current = image;
        setOverlayReady(true);
      })
      .catch(() => {
        if (cancelled) return;
        overlayImageRef.current = null;
        setOverlayReady(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedPresetId]);

  useEffect(() => {
    if (!source || !previewCanvasRef.current || !overlayReady) return;

    const image = new Image();
    image.onload = () => {
      renderImageOverlayCanvas(
        image,
        source.width,
        source.height,
        overlayImageRef.current,
        transform,
        previewCanvasRef.current,
      );
    };
    image.src = source.url;
  }, [source, transform, overlayReady]);

  const updatePosition = useCallback((clientX: number, clientY: number) => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;

    const { x, y } = displayToNaturalCoords(clientX, clientY, canvas);
    setTransform((current) => ({ ...current, x, y }));
  }, []);

  const updateRotation = useCallback((clientX: number, clientY: number) => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;

    const { x, y } = displayToNaturalCoords(clientX, clientY, canvas);
    const centerX = transform.x > 0 ? transform.x : canvas.width / 2;
    const centerY = transform.y > 0 ? transform.y : canvas.height / 2;
    const angle =
      (Math.atan2(y - centerY, x - centerX) * 180) / Math.PI + 90;

    setTransform((current) => ({
      ...current,
      rotation: Math.round(angle),
    }));
  }, [transform.x, transform.y]);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (!source || !overlayReady) return;

      if (event.shiftKey) {
        isRotatingRef.current = true;
        setIsRotating(true);
      } else {
        isDraggingRef.current = true;
        setIsDragging(true);
        updatePosition(event.clientX, event.clientY);
      }

      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [source, overlayReady, updatePosition],
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (isRotatingRef.current) {
        updateRotation(event.clientX, event.clientY);
        return;
      }

      if (!isDraggingRef.current) return;
      updatePosition(event.clientX, event.clientY);
    },
    [updatePosition, updateRotation],
  );

  const handlePointerUp = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      isDraggingRef.current = false;
      isRotatingRef.current = false;
      setIsDragging(false);
      setIsRotating(false);
      event.currentTarget.releasePointerCapture(event.pointerId);
    },
    [],
  );

  const handleWheel = useCallback(
    (event: React.WheelEvent<HTMLCanvasElement>) => {
      if (!source || !overlayReady) return;

      event.preventDefault();
      const delta = event.deltaY > 0 ? -0.02 : 0.02;
      setTransform((current) => ({
        ...current,
        scale: clamp(current.scale + delta, 0.05, 0.75),
      }));
    },
    [source, overlayReady],
  );

  const patchTransform = useCallback((patch: Partial<OverlayTransform>) => {
    setTransform((current) => ({ ...current, ...patch }));
  }, []);

  const handleDownloadImage = useCallback(async () => {
    if (!source || !previewCanvasRef.current || !overlayReady) return;

    const format = resolveFormat(source.mimeType);
    const quality =
      format === "jpeg" || format === "webp" ? 0.92 : undefined;

    await handleDownload(
      previewCanvasRef.current,
      buildDownloadFilename(`${source.name}-overlay`, format),
      {
        format,
        quality,
        stripMetadata,
      },
    );
  }, [source, overlayReady, stripMetadata, handleDownload]);

  const handleCopyImage = useCallback(async () => {
    if (!source || !previewCanvasRef.current || !overlayReady) return;

    const format = resolveFormat(source.mimeType);
    const quality =
      format === "jpeg" || format === "webp" ? 0.92 : undefined;

    await handleCopyToClipboard(previewCanvasRef.current, {
      format,
      quality,
      stripMetadata,
    });
  }, [source, overlayReady, stripMetadata, handleCopyToClipboard]);

  const canDownload = !!source && overlayReady && !isProcessing;
  const opacityPercent = Math.round(transform.opacity * 100);
  const scalePercent = Math.round(transform.scale * 100);
  const positionDisplay = source
    ? `${transform.x}, ${transform.y}`
    : t("toolUi.imageOverlay.positionPlaceholder");

  const canvasCursor = isRotating
    ? "cursor-alias"
    : isDragging
      ? "cursor-grabbing"
      : "cursor-grab";

  return (
    <ToolWorkspace
      workflowState={{
        hasSource: !!source,
        hasConfigured: !!source && overlayReady,
        isProcessing,
        isReady: canDownload,
      }}
    >
      {!source ? (
        <ToolStyledUploadZone
          inputId="image-overlay-upload"
          onFileChange={handleFileChange}
          isDragging={isDraggingFile}
          onDraggingChange={setIsDraggingFile}
          formatHint={t("toolUi.imageOverlay.uploadHint")}
        />
      ) : (
        <>
          <ImageFileInput
            id="image-overlay-replace"
            fileName={source.file.name}
            onFileChange={handleFileChange}
          />

          <OverlayPresetGallery
            selectedPresetId={selectedPresetId}
            disabled={!source}
            onSelect={setSelectedPresetId}
          />

          <ToolWorkspacePreview
            hint={t("toolUi.imageOverlay.dragToPosition")}
            caption={
              <>
                {source.width} × {source.height}px · {positionDisplay} ·{" "}
                {transform.rotation}°
              </>
            }
          >
            <canvas
              ref={previewCanvasRef}
              className={`max-h-[min(50vh,420px)] max-w-full touch-none object-contain ${canvasCursor}`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onWheel={handleWheel}
            />
          </ToolWorkspacePreview>
        </>
      )}

      <ToolFieldsStage
        fields={[
          {
            label: t("toolUi.imageOverlay.position"),
            englishLabel: "Position",
            htmlFor: "image-overlay-position",
            children: (
              <output
                id="image-overlay-position"
                className={`tool-input block border-transparent bg-transparent font-mono text-xs ${
                  source ? "text-muted" : "text-muted/60"
                }`}
              >
                {positionDisplay}
              </output>
            ),
          },
          {
            label: t("toolUi.imageOverlay.controls"),
            englishLabel: "Controls",
            htmlFor: "image-overlay-opacity",
            children: (
              <div className="flex flex-col gap-5">
                <SliderControl
                  id="image-overlay-opacity"
                  label={t("toolUi.imageOverlay.opacity")}
                  value={opacityPercent}
                  min={5}
                  max={100}
                  step={5}
                  suffix="%"
                  disabled={!source || !overlayReady}
                  onChange={(value) =>
                    patchTransform({ opacity: value / 100 })
                  }
                />

                <SliderControl
                  id="image-overlay-scale"
                  label={t("toolUi.imageOverlay.size")}
                  value={scalePercent}
                  min={5}
                  max={75}
                  step={1}
                  suffix="%"
                  disabled={!source || !overlayReady}
                  onChange={(value) =>
                    patchTransform({ scale: value / 100 })
                  }
                />

                <SliderControl
                  id="image-overlay-rotation"
                  label={t("toolUi.imageOverlay.rotation")}
                  value={transform.rotation}
                  min={0}
                  max={359}
                  step={1}
                  suffix="°"
                  disabled={!source || !overlayReady}
                  onChange={(rotation) => patchTransform({ rotation })}
                />
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
        {t("toolUi.imageOverlay.footer")}
      </p>

      <section
        aria-labelledby="image-overlay-seo-title"
        className="mt-10 space-y-4 border-t border-border pt-8"
      >
        <h2
          id="image-overlay-seo-title"
          className="font-display text-lg text-foreground"
        >
          {t("toolUi.imageOverlay.seo.title")}
        </h2>
        <p className="font-mono text-xs leading-relaxed text-muted">
          {t("toolUi.imageOverlay.seo.intro")}
        </p>
        <p className="font-mono text-xs leading-relaxed text-muted">
          {t("toolUi.imageOverlay.seo.keywords")}
        </p>
        <ol className="list-decimal space-y-2 ps-5 font-mono text-xs leading-relaxed text-muted">
          <li>{t("toolUi.imageOverlay.seo.step1")}</li>
          <li>{t("toolUi.imageOverlay.seo.step2")}</li>
          <li>{t("toolUi.imageOverlay.seo.step3")}</li>
          <li>{t("toolUi.imageOverlay.seo.step4")}</li>
        </ol>
        <p className="font-mono text-xs leading-relaxed text-muted">
          {t("toolUi.imageOverlay.seo.outro")}
        </p>
        <p className="font-mono text-xs leading-relaxed">
          <AppLink
            href="/articles/online-photo-overlay-editor"
            className="text-accent underline-offset-2 hover:underline"
          >
            {t("toolUi.imageOverlay.seo.articleLink")}
          </AppLink>
        </p>
      </section>

      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </ToolWorkspace>
  );
}
