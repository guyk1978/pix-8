"use client";

import { useEffect, useId, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useEditor } from "@/hooks/useEditorState";
import { useAdaptiveCanvasFrame } from "@/hooks/useAdaptiveCanvasFrame";
import { useEditorCanvasViewport } from "@/hooks/useEditorCanvasViewport";
import { useLiveFeedback } from "@/hooks/useLiveFeedback";
import { ImageUploadDropzone } from "@/components/ui/ImageUploadDropzone";
import { ExampleImageStrip } from "@/components/ui/ExampleImageStrip";
import { HomeProcessingGuide } from "@/components/dashboard/HomeProcessingGuide";
import { CanvasContainer } from "@/components/editor/CanvasContainer";
import { ImageWrapper } from "@/components/editor/ImageWrapper";
import { EditorCanvasDrag, useEditorCanvasDragHandlers } from "@/components/editor/EditorCanvasDrag";
import { useEditorMaskBrushHandlers } from "@/components/editor/useEditorMaskBrushHandlers";
import { EditorMaskBrushCursor } from "@/components/editor/EditorMaskBrushCursor";
import { EditorCanvasViewportControls } from "@/components/editor/EditorCanvasViewportControls";
import { useEditorMaskClickHandlers } from "@/components/editor/useEditorMaskClickHandlers";
import {
  cycleCanvasBackgroundMode,
  type CanvasBackgroundMode,
} from "@/lib/editor/canvasBackgroundMode";
import {
  ClickPulseOverlay,
  CursorOverlay,
  FloatingPreview,
  ScanningGridOverlay,
} from "@/components/ui/animations";

export function EditorCanvas() {
  const { t } = useLanguage();
  const {
    source,
    previewCanvasRef,
    isComposing,
    loadFile,
    layers,
    isClickSegmentationLoading,
    maskClickMode,
  } = useEditor();
  const liveFeedback = useLiveFeedback();
  const [isDragging, setIsDragging] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [canvasBackgroundMode, setCanvasBackgroundMode] =
    useState<CanvasBackgroundMode>("grid");
  const inputId = useId();
  const drag = useEditorCanvasDragHandlers();
  const maskBrush = useEditorMaskBrushHandlers();
  const maskClick = useEditorMaskClickHandlers();
  const imageWidth = source?.width ?? 0;
  const imageHeight = source?.height ?? 0;

  const { workspaceRef, frame } = useAdaptiveCanvasFrame(imageWidth, imageHeight);
  const viewport = useEditorCanvasViewport(
    imageWidth,
    imageHeight,
    frame.contentWidth,
    frame.contentHeight,
  );

  const showTransparencyGrid = layers.some(
    (layer) =>
      layer.type === "bg-remove" &&
      layer.visible &&
      layer.enabled &&
      layer.backgroundMode === "transparent",
  );

  useEffect(() => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;

    const syncSize = () => {
      setCanvasSize({
        width: canvas.width,
        height: canvas.height,
      });
    };

    syncSize();
    const observer = new ResizeObserver(syncSize);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [previewCanvasRef, source, isComposing, layers]);

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (maskClick.canClick) {
      maskClick.handlePointerDown(event);
      return;
    }
    if (maskBrush.canPaint) {
      maskBrush.onPointerDown(event);
      return;
    }
    if (drag.canDrag) {
      drag.onPointerDown(event);
      return;
    }
    if (viewport.canPan) {
      viewport.handlePanPointerDown(event);
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (viewport.isPanning) {
      viewport.handlePanPointerMove(event);
      return;
    }
    if (maskClick.canClick) {
      maskClick.handlePointerMove(event);
      return;
    }
    if (maskBrush.canPaint) {
      maskBrush.onPointerMove(event);
      return;
    }
    drag.onPointerMove(event);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (viewport.isPanning) {
      viewport.endPan(event);
      return;
    }
    if (maskBrush.canPaint) {
      maskBrush.onPointerUp(event);
      return;
    }
    drag.onPointerUp(event);
  };

  if (!source) {
    return (
      <div className="unified-editor-canvas unified-editor-canvas--empty flex min-h-0 flex-1 flex-col items-center justify-center p-6 sm:p-10">
        <div className="unified-editor-upload-wrap w-full max-w-xl space-y-6">
          <div className="unified-editor-empty-intro space-y-2 text-center">
            <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
              {t("editor.upload.title")}
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              {t("editor.upload.hint")}
            </p>
            <ol className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-2 pt-1 text-[0.7rem] font-label uppercase tracking-[0.06em] text-muted">
              <li className="rounded-md border border-border/70 bg-card/60 px-2.5 py-1">
                {t("home.processingSteps.upload.label")}
              </li>
              <li aria-hidden className="text-border">
                →
              </li>
              <li className="rounded-md border border-border/70 bg-card/60 px-2.5 py-1">
                {t("home.processingSteps.process.label")}
              </li>
              <li aria-hidden className="text-border">
                →
              </li>
              <li className="rounded-md border border-border/70 bg-card/60 px-2.5 py-1">
                {t("home.processingSteps.download.label")}
              </li>
            </ol>
            <div className="flex justify-center pt-1">
              <HomeProcessingGuide />
            </div>
          </div>
          <ImageUploadDropzone
            inputId={inputId}
            isDragging={isDragging}
            onDraggingChange={setIsDragging}
            onFileChange={(file) => {
              if (file) void loadFile(file);
            }}
            title={t("upload.dropHeadline")}
            hint={t("editor.upload.hint")}
            className="upload-card-dropzone unified-editor-dropzone"
          />
          <ExampleImageStrip
            onFileSelect={(file) => void loadFile(file)}
            disabled={isDragging}
            className="unified-editor-examples"
          />
        </div>
      </div>
    );
  }

  const wrapperCursorClass = viewport.isPanning
    ? "image-wrapper--panning"
    : viewport.canPan
      ? "image-wrapper--can-pan"
      : "";

  return (
    <div className="unified-editor-canvas sticky-canvas-column">
      <div className="canvas-anchor is-anchored">
        <EditorCanvasViewportControls
          canvasBackgroundMode={canvasBackgroundMode}
          onCycleBackground={() =>
            setCanvasBackgroundMode((current) => cycleCanvasBackgroundMode(current))
          }
        />
        <div
          ref={workspaceRef}
          className={`canvas-workspace canvas-workspace--${canvasBackgroundMode}`}
        >
          <CanvasContainer width={frame.frameWidth} height={frame.frameHeight}>
            <ImageWrapper
              viewportRef={viewport.viewportRef}
              contentWidth={frame.contentWidth}
              contentHeight={frame.contentHeight}
              stageWidth={imageWidth}
              stageHeight={imageHeight}
              stageTransform={viewport.stageTransform}
              className={wrapperCursorClass}
              ariaLabel={t("editor.canvas.zoom")}
              onWheel={viewport.handleWheel}
            >
                <div
                  className={`unified-editor-canvas-inner ${
                    showTransparencyGrid ? "transparency-checkerboard" : ""
                  }`}
                >
                  <div className="unified-editor-hologram" aria-hidden />
                  <canvas
                    ref={previewCanvasRef}
                    className={`unified-editor-preview-canvas live-feedback-canvas shadow-2xl ${
                      liveFeedback.isCanvasUpdating ? "is-updating" : ""
                    } ${drag.canDrag ? "unified-editor-preview-canvas--draggable" : ""} ${
                      maskBrush.canPaint ? "unified-editor-preview-canvas--mask-brush" : ""
                    } ${maskClick.canClick ? "unified-editor-preview-canvas--mask-click" : ""} ${
                      viewport.canPan &&
                      !drag.canDrag &&
                      !maskBrush.canPaint &&
                      !maskClick.canClick
                        ? "unified-editor-preview-canvas--pannable"
                        : ""
                    }`}
                    style={{ opacity: liveFeedback.canvasOpacity }}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    onPointerLeave={(event) => {
                      if (viewport.isPanning) {
                        viewport.endPan(event);
                      }
                      maskBrush.onPointerLeave();
                      maskClick.handlePointerLeave();
                    }}
                  />
                  <ScanningGridOverlay
                    active={liveFeedback.isScanningGridVisible}
                    width={canvasSize.width}
                    height={canvasSize.height}
                  />
                  {maskBrush.cursor ? (
                    <EditorMaskBrushCursor
                      x={maskBrush.cursor.x}
                      y={maskBrush.cursor.y}
                      radius={maskBrush.cursor.displayRadius}
                      mode={maskBrush.cursor.mode}
                    />
                  ) : null}
                  {maskClick.cursor ? (
                    <CursorOverlay
                      active={Boolean(maskClickMode)}
                      x={maskClick.cursor.x}
                      y={maskClick.cursor.y}
                    />
                  ) : null}
                  {maskClick.naturalPoint && maskClick.cursor ? (
                    <FloatingPreview
                      active={maskClick.canClick}
                      x={maskClick.cursor.x}
                      y={maskClick.cursor.y}
                      sourceCanvas={previewCanvasRef.current}
                      naturalX={maskClick.naturalPoint.x}
                      naturalY={maskClick.naturalPoint.y}
                    />
                  ) : null}
                  <ClickPulseOverlay
                    pulses={maskClick.pulses}
                    onPulseEnd={maskClick.removePulse}
                  />
                  <EditorCanvasDrag />
                  {viewport.canPan &&
                  !drag.canDrag &&
                  !maskBrush.canPaint &&
                  !maskClick.canClick ? (
                    <span className="unified-editor-pan-hint" aria-live="polite">
                      {t("editor.canvas.panHint")}
                    </span>
                  ) : null}
                  {isComposing || isClickSegmentationLoading ? (
                    <div
                      className="unified-editor-processing live-feedback-processing-badge"
                      role="status"
                    >
                      <span className="unified-editor-processing-dot" />
                      {isClickSegmentationLoading
                        ? t("editor.params.maskClickLoading")
                        : t("editor.processing")}
                    </div>
                  ) : null}
                </div>
              </ImageWrapper>
          </CanvasContainer>
        </div>
      </div>
    </div>
  );
}
