"use client";

import { HelperErrorAlert } from "@/components/characters/HelperErrorAlert";
import { MemeTemplateGallery } from "@/components/tools/MemeTemplateGallery";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { resolveErrorMessage } from "@/i18n";
import { ImageFileInput } from "@/components/ui/ImageFileInput";
import { SupportingArticleLink } from "@/components/tools/SupportingArticleLink";
import { StripMetadataToggle } from "@/components/tools/StripMetadataToggle";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import { ToolStyledUploadZone } from "@/components/tools/shared/ToolStyledUploadZone";
import { ToolWorkspacePreview } from "@/components/tools/shared/ToolWorkspacePreview";
import { WorkflowSettings } from "@/components/tools/workflow/WorkflowStep";
import {
  buildDownloadFilename,
  resolveFormat,
  useImageProcessor,
} from "@/hooks/useImageProcessor";
import {
  applyBooleanPayload,
  useToolProject,
} from "@/hooks/useToolProject";
import { MAIN_IMAGE_KEY } from "@/lib/projects/types";
import {
  loadMemeTemplateAsFile,
  MEME_TEMPLATES,
  type MemeTemplateId,
} from "@/lib/memeTemplates";
import { renderMemeCanvas, type MemeSettings } from "@/lib/memeRender";

const inputClassName =
  "tool-input block min-h-11 border-transparent bg-transparent py-2.5";

export function MemeGenerator() {
  const { t, language } = useLanguage();
  const {
    canvasRef,
    source,
    error,
    isProcessing,
    loadFile,
    handleDownload,
    handleCopyToClipboard,
    setError,
  } = useImageProcessor();

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [isLoadingTemplate, setIsLoadingTemplate] = useState(false);
  const [stripMetadata, setStripMetadata] = useState(true);
  const [selectedTemplateId, setSelectedTemplateId] =
    useState<MemeTemplateId | null>(null);
  const [settings, setSettings] = useState<MemeSettings>({
    topText: "",
    bottomText: "",
  });

  useToolProject({
    toolId: "meme-generator",
    canSave: !!source,
    getPayload: () => ({
      stripMetadata,
      selectedTemplateId,
      settings,
    }),
    getImages: () =>
      source ? [{ key: MAIN_IMAGE_KEY, file: source.file }] : [],
    restore: async (payload, files) => {
      const file = files.get(MAIN_IMAGE_KEY);
      if (!file) return;

      applyBooleanPayload(payload, "stripMetadata", setStripMetadata);

      if (
        payload.selectedTemplateId === null ||
        typeof payload.selectedTemplateId === "string"
      ) {
        setSelectedTemplateId(payload.selectedTemplateId as MemeTemplateId | null);
      }

      if (payload.settings && typeof payload.settings === "object") {
        setSettings(payload.settings as MemeSettings);
      }

      await loadFile(file);
    },
  });

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (!file) return;
      setSelectedTemplateId(null);
      void loadFile(file);
    },
    [loadFile],
  );

  const handleTemplateSelect = useCallback(
    async (templateId: MemeTemplateId) => {
      const template = MEME_TEMPLATES.find((item) => item.id === templateId);
      if (!template) return;

      setIsLoadingTemplate(true);
      setError(null);

      try {
        const file = await loadMemeTemplateAsFile(template);
        setSelectedTemplateId(templateId);
        await loadFile(file);
      } catch (cause) {
        setError(
          resolveErrorMessage(language, cause, "toolUi.meme.templateLoadFailed"),
        );
      } finally {
        setIsLoadingTemplate(false);
      }
    },
    [language, loadFile, setError],
  );

  useEffect(() => {
    if (!source || !previewCanvasRef.current) return;

    const image = new Image();
    image.onload = () => {
      renderMemeCanvas(
        image,
        source.width,
        source.height,
        settings,
        previewCanvasRef.current,
      );
    };
    image.src = source.url;
  }, [source, settings]);

  const handleDownloadMeme = useCallback(async () => {
    if (!source || !previewCanvasRef.current) return;

    const format = resolveFormat(source.mimeType);
    const quality =
      format === "jpeg" || format === "webp" ? 0.92 : undefined;
    const baseName = selectedTemplateId
      ? `${selectedTemplateId}-meme`
      : `${source.name}-meme`;

    await handleDownload(
      previewCanvasRef.current,
      buildDownloadFilename(baseName, format),
      { format, quality, stripMetadata },
    );
  }, [source, selectedTemplateId, stripMetadata, handleDownload]);

  const handleCopyMeme = useCallback(async () => {
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

  const hasText = !!settings.topText.trim() || !!settings.bottomText.trim();
  const busy = isProcessing || isLoadingTemplate;
  const canDownload = !!source && !busy;

  const sourceLabel = selectedTemplateId
    ? t(`toolUi.meme.templates.${selectedTemplateId}.title`)
    : source?.file.name;

  return (
    <ToolWorkspace hasActiveImage={!!source}>
      <div className="space-y-4">
        {!source ? (
          <ToolStyledUploadZone
            inputId="meme-generator-upload"
            onFileChange={handleFileChange}
            isDragging={isDraggingFile}
            onDraggingChange={setIsDraggingFile}
            formatHint={t("toolUi.meme.uploadHint")}
          />
        ) : (
          <ImageFileInput
            id="meme-generator-replace"
            fileName={sourceLabel ?? source.file.name}
            onFileChange={handleFileChange}
          />
        )}

        <MemeTemplateGallery
          selectedTemplateId={selectedTemplateId}
          disabled={busy}
          isLoading={isLoadingTemplate}
          onSelect={(templateId) => void handleTemplateSelect(templateId)}
        />
      </div>

      {source ? (
        <ToolWorkspacePreview
          caption={
            <>
              {source.width} × {source.height}px · {sourceLabel}
              {hasText ? ` · ${t("toolUi.meme.livePreview")}` : ""}
            </>
          }
        >
          <div className="relative flex min-h-56 w-full items-center justify-center sm:min-h-72">
            <canvas
              ref={previewCanvasRef}
              className={`max-h-[min(60vh,520px)] max-w-full object-contain transition-opacity ${
                isLoadingTemplate ? "opacity-30" : "opacity-100"
              }`}
            />
            {isLoadingTemplate ? (
              <p className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 text-center text-sm text-muted">
                {t("toolUi.meme.loadingTemplate")}
              </p>
            ) : null}
          </div>
        </ToolWorkspacePreview>
      ) : null}

      <WorkflowSettings>
        <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="meme-top-text" className="font-label text-muted">
                {t("toolUi.meme.topText")}
              </label>
              <input
                id="meme-top-text"
                type="text"
                disabled={!source}
                value={settings.topText}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    topText: event.target.value,
                  }))
                }
                className={inputClassName}
                placeholder={t("toolUi.meme.topPlaceholder")}
                autoComplete="off"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="meme-bottom-text" className="font-label text-muted">
                {t("toolUi.meme.bottomText")}
              </label>
              <input
                id="meme-bottom-text"
                type="text"
                disabled={!source}
                value={settings.bottomText}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    bottomText: event.target.value,
                  }))
                }
                className={inputClassName}
                placeholder={t("toolUi.meme.bottomPlaceholder")}
                autoComplete="off"
              />
            </div>

            <p className="font-mono text-[10px] leading-relaxed text-muted">
              {t("toolUi.meme.styleHint")}
            </p>
        </div>
      </WorkflowSettings>

      <StripMetadataToggle
        checked={stripMetadata}
        disabled={!source}
        onChange={setStripMetadata}
      />

      {error ? <HelperErrorAlert message={error} className="mt-4" /> : null}

      <ToolOutputActions
        onDownload={handleDownloadMeme}
        onCopy={handleCopyMeme}
        downloadLabel={t("toolUi.meme.downloadMeme")}
        disabled={!canDownload}
        isProcessing={busy}
      />

      <p className="mt-3 text-center font-mono text-[10px] text-muted">
        {t("toolUi.meme.footer")}
      </p>

      <SupportingArticleLink
        slug="meme-generator-guide"
        label={t("toolUi.meme.guideLabel")}
        title={t("toolUi.meme.guideTitle")}
      />

      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </ToolWorkspace>
  );
}
