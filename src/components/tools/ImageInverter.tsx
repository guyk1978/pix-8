"use client";

import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { HelperErrorAlert } from "@/components/characters/HelperErrorAlert";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { ImageFileInput } from "@/components/ui/ImageFileInput";
import { ToolStyledUploadZone } from "@/components/tools/shared/ToolStyledUploadZone";
import { ToolWorkspacePreview } from "@/components/tools/shared/ToolWorkspacePreview";
import { StripMetadataToggle } from "@/components/tools/StripMetadataToggle";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import { WorkflowSettings } from "@/components/tools/workflow/WorkflowStep";
import { renderInvertedCanvas } from "@/lib/invertRender";
import {
  buildDownloadFilename,
  resolveFormat,
  useImageProcessor,
} from "@/hooks/useImageProcessor";
import { applyBooleanPayload, useImageToolProject } from "@/hooks/useToolProject";
export function ImageInverter() {
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

  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [stripMetadata, setStripMetadata] = useState(true);
  const [inverted, setInverted] = useState(true);

  useImageToolProject({
    toolId: "image-inverter",
    source,
    loadFile,
    getExtraPayload: () => ({ stripMetadata, inverted }),
    applyPayload: (payload) => {
      applyBooleanPayload(payload, "stripMetadata", setStripMetadata);
      applyBooleanPayload(payload, "inverted", setInverted);
    },
  });

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) {
        setInverted(true);
        void loadFile(file);
      }
    },
    [loadFile],
  );

  useEffect(() => {
    if (!source || !previewCanvasRef.current) return;

    const image = new Image();
    image.onload = () => {
      renderInvertedCanvas(
        image,
        source.width,
        source.height,
        inverted,
        previewCanvasRef.current,
      );
    };
    image.src = source.url;
  }, [source, inverted]);

  const handleDownloadImage = useCallback(async () => {
    if (!source || !previewCanvasRef.current) return;

    const format = resolveFormat(source.mimeType);
    const quality =
      format === "jpeg" || format === "webp" ? 0.92 : undefined;
    const suffix = inverted ? "inverted" : "original";

    await handleDownload(
      previewCanvasRef.current,
      buildDownloadFilename(`${source.name}-${suffix}`, format),
      { format, quality, stripMetadata },
    );
  }, [source, inverted, stripMetadata, handleDownload]);

  const handleCopyImage = useCallback(async () => {
    if (!source || !previewCanvasRef.current) return;

    const format = resolveFormat(source.mimeType);
    const quality =
      format === "jpeg" || format === "webp" ? 0.92 : undefined;

    await handleCopyToClipboard(previewCanvasRef.current, {
      format,
      quality,
      stripMetadata,
    });
  }, [source, stripMetadata, handleCopyToClipboard]);

  const canDownload = !!source && !isProcessing;

  return (
    <ToolWorkspace hasActiveImage={!!source}>
        {!source ? (
          <ToolStyledUploadZone
            inputId="image-inverter-upload"
            onFileChange={handleFileChange}
            isDragging={isDraggingFile}
            onDraggingChange={setIsDraggingFile}
            formatHint={t("toolUi.imageInverter.uploadHint")}
          />
        ) : (
          <ImageFileInput
            id="image-inverter-replace"
            fileName={source.file.name}
            onFileChange={handleFileChange}
          />
        )}

        {source ? (
          <ToolWorkspacePreview
            hint={
              inverted
                ? t("toolUi.imageInverter.inverted")
                : t("common.original")
            }
            caption={
              <>
                {source.width} × {source.height}px · {source.file.name}
              </>
            }
          >
            <canvas
              ref={previewCanvasRef}
              className="max-h-[min(50vh,420px)] max-w-full object-contain"
            />
          </ToolWorkspacePreview>
        ) : null}

        <WorkflowSettings>
          <div className="space-y-4">
            <label className="flex min-h-11 cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                disabled={!source}
                checked={inverted}
                onChange={(event) => setInverted(event.target.checked)}
                className="h-4 w-4 shrink-0 rounded-sm border border-border bg-background accent-accent disabled:opacity-50"
              />
              <span className="font-label text-muted">
                {t("toolUi.imageInverter.invertColors")}
              </span>
            </label>
            <p className="font-mono text-[10px] leading-relaxed text-muted">
              {t("toolUi.imageInverter.invertHint")}
            </p>
          </div>
        </WorkflowSettings>

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
          {t("toolUi.imageInverter.footer")}
        </p>
      
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </ToolWorkspace>
  );
}
