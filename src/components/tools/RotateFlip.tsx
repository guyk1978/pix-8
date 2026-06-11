"use client";

import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { HelperErrorAlert } from "@/components/characters/HelperErrorAlert";
import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { StripMetadataToggle } from "@/components/tools/StripMetadataToggle";
import { ToolFieldsStage } from "@/components/tools/shared/ToolFieldsStage";
import { ToolStyledUploadZone } from "@/components/tools/shared/ToolStyledUploadZone";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import {
  buildDownloadFilename,
  getTransformedDimensions,
  type ImageTransform,
  type RotationDegrees,
  resolveFormat,
  useImageProcessor,
} from "@/hooks/useImageProcessor";

const buttonClassName =
  "min-h-10 rounded-sm border border-border bg-background px-3 py-2 font-label text-muted transition-colors hover:border-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40";

const activeButtonClassName =
  "border-accent/40 bg-accent-muted text-accent";

export function RotateFlip() {
  const { t } = useLanguage();
  const {
    canvasRef,
    source,
    error,
    isProcessing,
    loadFile,
    processImage,
    handleDownload,
    handleCopyToClipboard,
  } = useImageProcessor();

  const [rotation, setRotation] = useState<RotationDegrees>(0);
  const [flipHorizontal, setFlipHorizontal] = useState(false);
  const [flipVertical, setFlipVertical] = useState(false);
  const [stripMetadata, setStripMetadata] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const transform: ImageTransform = {
    rotation,
    flipHorizontal,
    flipVertical,
  };

  const outputDimensions = source
    ? getTransformedDimensions(source.width, source.height, rotation)
    : null;

  useEffect(() => {
    if (!source) {
      setRotation(0);
      setFlipHorizontal(false);
      setFlipVertical(false);
    }
  }, [source]);

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) void loadFile(file);
    },
    [loadFile],
  );

  const rotateClockwise = useCallback(() => {
    setRotation((current) => ((current + 90) % 360) as RotationDegrees);
  }, []);

  const rotateCounterClockwise = useCallback(() => {
    setRotation((current) => ((current + 270) % 360) as RotationDegrees);
  }, []);

  const runTransform = useCallback(async () => {
    if (!source || !outputDimensions) return null;

    return processImage(source.file, {
      width: outputDimensions.width,
      height: outputDimensions.height,
      format: resolveFormat(source.mimeType),
      transform,
      stripMetadata,
      canvas: canvasRef.current,
    });
  }, [
    source,
    outputDimensions,
    transform,
    stripMetadata,
    processImage,
    canvasRef,
  ]);

  const handleDownloadImage = useCallback(async () => {
    const result = await runTransform();
    if (!result || !source) return;

    await handleDownload(
      result.blob,
      buildDownloadFilename(`${source.name}-transformed`, result.format),
      { stripMetadata },
    );
  }, [runTransform, source, stripMetadata, handleDownload]);

  const handleCopyImage = useCallback(async () => {
    const result = await runTransform();
    if (!result) return;

    await handleCopyToClipboard(result.blob, { stripMetadata });
  }, [runTransform, stripMetadata, handleCopyToClipboard]);

  const canDownload = !!source && !isProcessing;

  const outputSizeDisplay =
    outputDimensions && source
      ? `${outputDimensions.width} × ${outputDimensions.height}px`
      : t("toolUi.rotateFlip.outputPlaceholder");

  return (
    <ToolWorkspace
      workflowState={{
        hasSource: !!source,
        hasConfigured: !!source,
        isProcessing,
        isReady: canDownload,
      }}
    >
      {!source ? (
        <ToolStyledUploadZone
          inputId="rotate-flip-upload"
          onFileChange={handleFileChange}
          isDragging={isDragging}
          onDraggingChange={setIsDragging}
        />
      ) : (
        <>
          <div className="flex min-h-48 items-center justify-center overflow-hidden rounded-sm border border-border bg-background p-4 sm:min-h-56">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={source.url}
              alt={t("alt.transformPreview")}
              draggable={false}
              className="character-pixelated max-h-[min(50vh,420px)] max-w-full select-none object-contain transition-transform duration-200"
              style={{
                transform: `rotate(${rotation}deg) scaleX(${flipHorizontal ? -1 : 1}) scaleY(${flipVertical ? -1 : 1})`,
              }}
            />
          </div>

          <p className="mt-3 text-center font-mono text-xs text-muted">
            {source.width} × {source.height}px · {source.file.name}
          </p>
        </>
      )}

      <ToolFieldsStage
        robotAlt={t("characters.robotAlt")}
        widthAlt={t("characters.widthAlt")}
        fields={[
          {
            label: t("toolUi.rotateFlip.transform"),
            englishLabel: "Transform",
            htmlFor: "rotate-flip-cw",
            children: (
              <div className="grid grid-cols-2 gap-2 px-1 py-2.5">
                <button
                  id="rotate-flip-cw"
                  type="button"
                  disabled={!source}
                  onClick={rotateClockwise}
                  className={buttonClassName}
                >
                  {t("toolUi.rotateFlip.rotateCw")}
                </button>
                <button
                  type="button"
                  disabled={!source}
                  onClick={rotateCounterClockwise}
                  className={buttonClassName}
                >
                  {t("toolUi.rotateFlip.rotateCcw")}
                </button>
                <button
                  type="button"
                  disabled={!source}
                  onClick={() => setFlipHorizontal((value) => !value)}
                  className={`${buttonClassName} ${
                    flipHorizontal ? activeButtonClassName : ""
                  }`}
                >
                  {t("toolUi.rotateFlip.flipHorizontal")}
                </button>
                <button
                  type="button"
                  disabled={!source}
                  onClick={() => setFlipVertical((value) => !value)}
                  className={`${buttonClassName} ${
                    flipVertical ? activeButtonClassName : ""
                  }`}
                >
                  {t("toolUi.rotateFlip.flipVertical")}
                </button>
              </div>
            ),
          },
          {
            label: t("toolUi.rotateFlip.outputSize"),
            englishLabel: "Output",
            htmlFor: "rotate-flip-output-size",
            accentClass: "text-[var(--glow-purple)]",
            children: (
              <output
                id="rotate-flip-output-size"
                className={`tool-input block truncate border-transparent bg-transparent ${
                  !source ? "text-muted" : ""
                }`}
              >
                {outputSizeDisplay}
              </output>
            ),
          },
        ]}
      />

      <div className="mt-2 flex justify-end border-t border-border pt-5 rtl:justify-start">
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
        downloadLabel={t("downloads.downloadTransformed")}
        disabled={!canDownload}
        isProcessing={isProcessing}
      />

      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </ToolWorkspace>
  );
}
