"use client";

import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { HelperErrorAlert } from "@/components/characters/HelperErrorAlert";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
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
  createAnnotationId,
  displayToNaturalCoords,
  findAnnotationAtPoint,
  naturalToDisplayCoords,
  renderAnnotationPreviewCanvas,
  type ImageAnnotation,
} from "@/lib/imageAnnotatorRender";
import { Trash2 } from "lucide-react";

const LONG_PRESS_MS = 500;
const DRAG_THRESHOLD = 6;

interface PendingTagInput {
  id: string;
  x: number;
  y: number;
}

export function ImageAnnotator() {
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
  const previewImageRef = useRef<HTMLImageElement | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const dragAnnotationIdRef = useRef<string | null>(null);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const pointerStartRef = useRef({ x: 0, y: 0 });
  const longPressTimerRef = useRef<number | null>(null);
  const movedDuringPointerRef = useRef(false);

  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [stripMetadata, setStripMetadata] = useState(true);
  const [annotations, setAnnotations] = useState<ImageAnnotation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pendingInput, setPendingInput] = useState<PendingTagInput | null>(null);
  const [pendingLabel, setPendingLabel] = useState("");
  const [overlayTick, setOverlayTick] = useState(0);

  useImageToolProject({
    toolId: "image-annotator",
    source,
    loadFile,
    getToolState: () => ({ stripMetadata, annotations }),
    applyToolState: (settings) => {
      applyBooleanPayload(settings, "stripMetadata", setStripMetadata);
      if (Array.isArray(settings.annotations)) {
        setAnnotations(settings.annotations as ImageAnnotation[]);
      }
    },
  });

  const bumpOverlay = useCallback(() => {
    setOverlayTick((current) => current + 1);
  }, []);

  const redrawPreview = useCallback(() => {
    const canvas = previewCanvasRef.current;
    const image = previewImageRef.current;
    if (!canvas || !image || !source) return;

    renderAnnotationPreviewCanvas(
      image,
      source.width,
      source.height,
      annotations,
      canvas,
    );
    bumpOverlay();
  }, [annotations, bumpOverlay, source]);

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) {
        setAnnotations([]);
        setSelectedId(null);
        setPendingInput(null);
        setPendingLabel("");
        void loadFile(file);
      }
    },
    [loadFile],
  );

  useEffect(() => {
    if (!source) {
      previewImageRef.current = null;
      return;
    }

    const image = new Image();
    image.onload = () => {
      previewImageRef.current = image;
      redrawPreview();
    };
    image.src = source.url;

    return () => {
      previewImageRef.current = null;
    };
  }, [source, redrawPreview]);

  useEffect(() => {
    redrawPreview();
  }, [annotations, redrawPreview]);

  useEffect(() => {
    if (!source) return;

    const onResize = () => bumpOverlay();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [bumpOverlay, source]);

  const openTagInput = useCallback((x: number, y: number) => {
    const id = createAnnotationId();
    setPendingInput({ id, x, y });
    setPendingLabel("");
    setSelectedId(id);
  }, []);

  const clearLongPress = useCallback(() => {
    if (longPressTimerRef.current !== null) {
      window.clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);

  const commitPendingTag = useCallback(() => {
    if (!pendingInput) return;

    const label = pendingLabel.trim() || t("toolUi.imageAnnotator.defaultLabel");
    setAnnotations((current) => [
      ...current,
      {
        id: pendingInput.id,
        x: pendingInput.x,
        y: pendingInput.y,
        label,
      },
    ]);
    setPendingInput(null);
    setPendingLabel("");
    setSelectedId(pendingInput.id);
  }, [pendingInput, pendingLabel, t]);

  const cancelPendingTag = useCallback(() => {
    setPendingInput(null);
    setPendingLabel("");
    setSelectedId(null);
  }, []);

  const handleCanvasPointerDown = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (!source || !previewCanvasRef.current || pendingInput) return;

      const { x, y } = displayToNaturalCoords(
        event.clientX,
        event.clientY,
        previewCanvasRef.current,
      );
      const hit = findAnnotationAtPoint(annotations, x, y, previewCanvasRef.current);

      pointerStartRef.current = { x: event.clientX, y: event.clientY };
      movedDuringPointerRef.current = false;

      if (hit) {
        dragAnnotationIdRef.current = hit.id;
        dragStartRef.current = { x: hit.x, y: hit.y };
        setSelectedId(hit.id);
        event.currentTarget.setPointerCapture(event.pointerId);
        return;
      }

      clearLongPress();
      longPressTimerRef.current = window.setTimeout(() => {
        openTagInput(x, y);
        movedDuringPointerRef.current = true;
      }, LONG_PRESS_MS);
    },
    [annotations, clearLongPress, openTagInput, pendingInput, source],
  );

  const handleCanvasPointerMove = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (!previewCanvasRef.current) return;

      const movedDistance = Math.hypot(
        event.clientX - pointerStartRef.current.x,
        event.clientY - pointerStartRef.current.y,
      );

      if (movedDistance > DRAG_THRESHOLD) {
        movedDuringPointerRef.current = true;
        clearLongPress();
      }

      const dragId = dragAnnotationIdRef.current;
      if (!dragId) return;

      const { x, y } = displayToNaturalCoords(
        event.clientX,
        event.clientY,
        previewCanvasRef.current,
      );

      setAnnotations((current) =>
        current.map((annotation) =>
          annotation.id === dragId ? { ...annotation, x, y } : annotation,
        ),
      );
    },
    [clearLongPress],
  );

  const handleCanvasPointerUp = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      clearLongPress();

      if (dragAnnotationIdRef.current) {
        dragAnnotationIdRef.current = null;
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
        return;
      }

      if (
        !movedDuringPointerRef.current &&
        !pendingInput &&
        previewCanvasRef.current
      ) {
        const { x, y } = displayToNaturalCoords(
          event.clientX,
          event.clientY,
          previewCanvasRef.current,
        );
        const hit = findAnnotationAtPoint(
          annotations,
          x,
          y,
          previewCanvasRef.current,
        );
        if (!hit) {
          openTagInput(x, y);
        }
      }
    },
    [annotations, clearLongPress, openTagInput, pendingInput],
  );

  const handleExport = useCallback(async () => {
    const image = previewImageRef.current;
    if (!source || !image || !canvasRef.current) return;

    renderAnnotationPreviewCanvas(
      image,
      source.width,
      source.height,
      annotations,
      canvasRef.current,
    );

    const format = resolveFormat(source.mimeType);
    const quality = format === "jpeg" || format === "webp" ? 0.95 : undefined;

    await handleDownload(
      canvasRef.current,
      buildDownloadFilename(`${source.name}-annotated`, format),
      { format, quality, stripMetadata },
    );
  }, [annotations, canvasRef, handleDownload, source, stripMetadata]);

  const handleCopy = useCallback(async () => {
    const image = previewImageRef.current;
    if (!source || !image || !canvasRef.current) return;

    renderAnnotationPreviewCanvas(
      image,
      source.width,
      source.height,
      annotations,
      canvasRef.current,
    );

    await handleCopyToClipboard(canvasRef.current, {
      format: "png",
      stripMetadata,
    });
  }, [
    annotations,
    canvasRef,
    handleCopyToClipboard,
    source,
    stripMetadata,
  ]);

  const updateAnnotationLabel = useCallback((id: string, label: string) => {
    setAnnotations((current) =>
      current.map((annotation) =>
        annotation.id === id ? { ...annotation, label } : annotation,
      ),
    );
  }, []);

  const deleteAnnotation = useCallback((id: string) => {
    setAnnotations((current) =>
      current.filter((annotation) => annotation.id !== id),
    );
    setSelectedId((current) => (current === id ? null : current));
    if (pendingInput?.id === id) {
      setPendingInput(null);
      setPendingLabel("");
    }
  }, [pendingInput]);

  const getMarkerStyle = useCallback(
    (x: number, y: number) => {
      const canvas = previewCanvasRef.current;
      if (!canvas) return { left: 0, top: 0 };

      const { left, top } = naturalToDisplayCoords(x, y, canvas);
      void overlayTick;
      return { left, top };
    },
    [overlayTick],
  );

  const hasConfigured = !!source && annotations.length > 0;
  const canExport = hasConfigured;

  return (
    <ToolWorkspace
      workflowState={{
        hasSource: !!source,
        hasConfigured,
        isProcessing,
        isReady: canExport,
      }}
    >
      {!source ? (
        <ToolStyledUploadZone
          inputId="image-annotator-upload"
          onFileChange={handleFileChange}
          isDragging={isDraggingFile}
          onDraggingChange={setIsDraggingFile}
          formatHint={t("toolUi.imageAnnotator.uploadHint")}
        />
      ) : (
        <>
          <ImageFileInput
            id="image-annotator-replace"
            fileName={source.file.name}
            onFileChange={handleFileChange}
          />

          <ToolWorkspacePreview
            hint={t("toolUi.imageAnnotator.previewHint")}
            caption={t("toolUi.imageAnnotator.dragHint", {
              count: annotations.length,
            })}
          >
            <div
              ref={overlayRef}
              className="relative inline-block max-w-full touch-none"
            >
              <canvas
                ref={previewCanvasRef}
                width={source.width}
                height={source.height}
                className="block max-h-[min(56vh,520px)] w-full cursor-crosshair rounded-sm border border-border"
                onPointerDown={handleCanvasPointerDown}
                onPointerMove={handleCanvasPointerMove}
                onPointerUp={handleCanvasPointerUp}
                onPointerCancel={handleCanvasPointerUp}
              />

              {pendingInput && previewCanvasRef.current ? (
                <div
                  className="absolute z-20 -translate-x-1/2 -translate-y-full"
                  style={{
                    left: getMarkerStyle(pendingInput.x, pendingInput.y).left,
                    top: getMarkerStyle(pendingInput.x, pendingInput.y).top - 8,
                  }}
                >
                  <form
                    className="min-w-[min(16rem,calc(100vw-2rem))] rounded-lg border border-border bg-card p-3 shadow-[var(--shadow-elevated)]"
                    onSubmit={(event) => {
                      event.preventDefault();
                      commitPendingTag();
                    }}
                  >
                    <label
                      htmlFor="annotator-pending-label"
                      className="tool-control-label block"
                    >
                      {t("toolUi.imageAnnotator.tagLabel")}
                    </label>
                    <input
                      id="annotator-pending-label"
                      type="text"
                      autoFocus
                      value={pendingLabel}
                      onChange={(event) => setPendingLabel(event.target.value)}
                      placeholder={t("toolUi.imageAnnotator.tagPlaceholder")}
                      className="tool-input mt-2 block w-full border-0 bg-background py-2 shadow-[var(--shadow-elevated)]"
                    />
                    <div className="mt-3 flex gap-2">
                      <button
                        type="submit"
                        className="tool-chip-button-active min-h-9 flex-1"
                      >
                        {t("toolUi.imageAnnotator.addTag")}
                      </button>
                      <button
                        type="button"
                        onClick={cancelPendingTag}
                        className="tool-chip-button min-h-9 flex-1"
                      >
                        {t("common.cancel")}
                      </button>
                    </div>
                  </form>
                </div>
              ) : null}
            </div>
          </ToolWorkspacePreview>
        </>
      )}

      <ToolFieldsStage
        fields={[
          {
            label: t("toolUi.imageAnnotator.inspector"),
            englishLabel: "INSPECTOR",
            htmlFor: "annotator-inspector",
            children: (
              <div id="annotator-inspector" className="flex flex-col gap-3">
                {annotations.length === 0 ? (
                  <p className="font-mono text-[10px] leading-relaxed text-muted">
                    {t("toolUi.imageAnnotator.inspectorEmpty")}
                  </p>
                ) : (
                  <ul className="flex flex-col gap-2">
                    {annotations.map((annotation) => {
                      const isSelected = selectedId === annotation.id;
                      return (
                        <li
                          key={annotation.id}
                          className={`rounded-lg border px-3 py-2.5 transition-colors ${
                            isSelected
                              ? "border-accent/40 bg-accent-muted/40"
                              : "border-border bg-background/60"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => setSelectedId(annotation.id)}
                            className="w-full text-start"
                          >
                            <span className="font-label text-sm text-foreground">
                              {annotation.label || t("toolUi.imageAnnotator.defaultLabel")}
                            </span>
                            <span className="mt-1 block font-mono text-[10px] text-muted">
                              {t("toolUi.imageAnnotator.coordinates", {
                                x: annotation.x,
                                y: annotation.y,
                              })}
                            </span>
                          </button>
                          <div className="mt-2 flex items-center gap-2">
                            <input
                              type="text"
                              value={annotation.label}
                              onChange={(event) =>
                                updateAnnotationLabel(
                                  annotation.id,
                                  event.target.value,
                                )
                              }
                              className="tool-input min-h-9 flex-1 border-0 bg-background px-2 py-1.5 text-sm shadow-[var(--shadow-elevated)]"
                              aria-label={t("toolUi.imageAnnotator.editLabel")}
                            />
                            <button
                              type="button"
                              onClick={() => deleteAnnotation(annotation.id)}
                              className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-sm border border-border text-muted transition-colors hover:border-red-500/40 hover:text-red-400"
                              aria-label={t("toolUi.imageAnnotator.deleteTag")}
                            >
                              <Trash2 className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
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

      <ToolOutputActions
        onDownload={handleExport}
        onCopy={handleCopy}
        downloadLabel={t("toolUi.imageAnnotator.flattenDownload")}
        copyLabel={t("toolUi.imageAnnotator.flattenCopy")}
        disabled={!canExport}
        isProcessing={isProcessing}
      />

      {error ? (
        <HelperErrorAlert message={error} className="mt-4" />
      ) : null}

      <p className="mt-3 text-center font-mono text-[10px] text-muted">
        {t("toolUi.imageAnnotator.footer")}
      </p>

      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </ToolWorkspace>
  );
}
