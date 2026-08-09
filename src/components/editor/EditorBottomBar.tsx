"use client";

import { useState } from "react";
import {
  ChevronDown,
  Crop,
  Download,
  FilePlus2,
  FlipHorizontal,
  Layers,
  Maximize2,
  Redo2,
  RotateCw,
  Save,
  Star,
  Type,
  Droplets,
  Undo2,
} from "lucide-react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useEditor } from "@/hooks/useEditorState";
import { useOptionalEditorMobilePanel } from "@/components/editor/EditorMobilePanelContext";
import { useToast } from "@/components/ui/ToastProvider";
import { sendCanvasToJoinMyPdf } from "@/lib/ecosystem/bridge";
import {
  buildJoinMyPdfHandoffUrl,
  isPopupBlockedError,
} from "@/lib/ecosystem/protocol";
import { BOTTOM_BAR_ACTIONS } from "@/lib/editor/editorCategories";
import type { EditorToolAction } from "@/lib/editor/layerTypes";
import type { ImageFormat } from "@/hooks/useImageProcessor";
import { SendToJoinMyPdfButton } from "@/components/ecosystem/SendToJoinMyPdfButton";
import { SaveProjectModal } from "@/components/projects/SaveProjectModal";

const BOTTOM_BAR_ICONS: Record<string, typeof Crop> = {
  cropper: Crop,
  "rotate-flip": RotateCw,
  resizer: Maximize2,
  "text-overlay": Type,
  watermark: Droplets,
};

const DOWNLOAD_FORMATS: ImageFormat[] = ["png", "jpeg", "webp"];

export function EditorBottomBar() {
  const { t, dir, language } = useLanguage();
  const {
    source,
    addToolAction,
    download,
    isFavorited,
    isSavingProject,
    toggleFavorite,
    saveProject,
    projectName,
    canUndo,
    canRedo,
    undo,
    redo,
    previewCanvasRef,
  } = useEditor();
  const mobilePanel = useOptionalEditorMobilePanel();
  const { showToast } = useToast();
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [sendingToPdf, setSendingToPdf] = useState(false);

  const handleSendToJoinMyPdf = async (intent: string) => {
    if (!source || !previewCanvasRef.current) {
      showToast(t("editor.uploadFirst"));
      return;
    }
    setSendingToPdf(true);
    setDownloadOpen(false);
    const locale = language === "he" ? "he" : "en";
    try {
      await sendCanvasToJoinMyPdf({
        canvas: previewCanvasRef.current,
        filename: source.name,
        mimeType: "image/png",
        intent,
        locale,
      });
      showToast(t("ecosystem.sentToJoinMyPdf"));
    } catch (error) {
      if (isPopupBlockedError(error)) {
        const url =
          error.fallbackUrl || buildJoinMyPdfHandoffUrl(intent, locale);
        showToast(t("ecosystem.popupBlocked"));
        const openManual = window.confirm(
          `${t("ecosystem.popupBlocked")}\n\n${t("ecosystem.popupBlockedHint")}`,
        );
        if (openManual) {
          window.open(url, "_blank", "noopener,noreferrer");
        }
      } else {
        showToast(
          error instanceof Error ? error.message : t("ecosystem.sendFailed"),
        );
      }
    } finally {
      setSendingToPdf(false);
    }
  };

  const handleQuickAction = (action: EditorToolAction) => {
    if (!source) {
      showToast(t("editor.uploadFirst"));
      return;
    }
    if (action === "rotate-flip") {
      addToolAction("rotate-flip");
      mobilePanel?.open();
      return;
    }
    addToolAction(action);
    mobilePanel?.open();
  };

  const defaultProjectName =
    projectName ??
    source?.name.replace(/\.[^.]+$/, "") ??
    t("editor.project.defaultName");

  return (
    <>
      <div dir={dir} lang={language} className="unified-editor-bottom-bar shrink-0">
        <div className="unified-editor-bottom-actions">
          <div className="unified-editor-history-group">
            <button
              type="button"
              className="unified-editor-history-btn"
              disabled={!source || !canUndo}
              aria-label={t("editor.bottomBar.undo")}
              onClick={undo}
            >
              <Undo2 className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            </button>
            <button
              type="button"
              className="unified-editor-history-btn"
              disabled={!source || !canRedo}
              aria-label={t("editor.bottomBar.redo")}
              onClick={redo}
            >
              <Redo2 className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            </button>
          </div>

          <button
            type="button"
            className={`unified-editor-pill-btn unified-editor-mobile-panel-btn${
              mobilePanel?.isOpen ? " is-active" : ""
            }`}
            aria-expanded={mobilePanel?.isOpen ?? false}
            aria-controls="editor-mobile-panel"
            onClick={() => mobilePanel?.toggle()}
          >
            <Layers className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            <span>{t("editor.mobilePanel.open")}</span>
          </button>

          {BOTTOM_BAR_ACTIONS.map((action) => {
            const Icon = BOTTOM_BAR_ICONS[action] ?? Crop;
            return (
              <button
                key={action}
                type="button"
                className="unified-editor-pill-btn"
                onClick={() => handleQuickAction(action)}
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                <span>{t(`tools.${action}.name`)}</span>
                <ChevronDown className="h-3 w-3 opacity-50" strokeWidth={2} aria-hidden />
              </button>
            );
          })}

          <button
            type="button"
            className="unified-editor-pill-btn"
            onClick={() => handleQuickAction("rotate-flip")}
            aria-label={t("editor.bottomBar.flip")}
          >
            <FlipHorizontal className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            <span>{t("editor.bottomBar.flip")}</span>
          </button>
        </div>

        <div className="unified-editor-bottom-primary">
          <button
            type="button"
            className={`unified-editor-fav-btn ${isFavorited ? "is-active" : ""}`}
            disabled={!source || isSavingProject}
            aria-label={t("editor.bottomBar.favorite")}
            aria-pressed={isFavorited}
            onClick={() => void toggleFavorite()}
          >
            <Star
              className="h-4 w-4"
              strokeWidth={2}
              fill={isFavorited ? "currentColor" : "none"}
              aria-hidden
            />
          </button>

          <button
            type="button"
            className="unified-editor-save-btn"
            disabled={!source || isSavingProject}
            onClick={() => setSaveOpen(true)}
          >
            <Save className="h-4 w-4" strokeWidth={2} aria-hidden />
            <span>{t("editor.bottomBar.save")}</span>
          </button>

          <SendToJoinMyPdfButton />

          <div className="relative flex">
            <button
              type="button"
              className="unified-editor-download-btn"
              disabled={!source}
              onClick={() => void download()}
            >
              <Download className="h-4 w-4" strokeWidth={2} aria-hidden />
              <span>{t("editor.bottomBar.download")}</span>
            </button>
            <button
              type="button"
              className="unified-editor-download-caret"
              disabled={!source}
              aria-expanded={downloadOpen}
              aria-label={t("editor.bottomBar.downloadOptions")}
              onClick={() => setDownloadOpen((v) => !v)}
            >
              <ChevronDown className="h-4 w-4" strokeWidth={2} aria-hidden />
            </button>

            {downloadOpen ? (
              <div className="unified-editor-download-menu" role="menu">
                {DOWNLOAD_FORMATS.map((format) => (
                  <button
                    key={format}
                    type="button"
                    role="menuitem"
                    className="unified-editor-dropdown-item"
                    onClick={() => {
                      void download(format);
                      setDownloadOpen(false);
                    }}
                  >
                    {format.toUpperCase()}
                  </button>
                ))}
                <div className="unified-editor-download-menu-divider" role="separator" />
                <button
                  type="button"
                  role="menuitem"
                  className="unified-editor-dropdown-item"
                  disabled={sendingToPdf}
                  onClick={() => void handleSendToJoinMyPdf("jpg-to-pdf")}
                >
                  <FilePlus2 className="me-1.5 inline h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                  {t("ecosystem.convertToPdf")}
                </button>
                <button
                  type="button"
                  role="menuitem"
                  className="unified-editor-dropdown-item"
                  disabled={sendingToPdf}
                  onClick={() => void handleSendToJoinMyPdf("sign-pdf")}
                >
                  {t("ecosystem.signInJoinMyPdf")}
                </button>
                <button
                  type="button"
                  role="menuitem"
                  className="unified-editor-dropdown-item"
                  disabled={sendingToPdf}
                  onClick={() => void handleSendToJoinMyPdf("merge-pdf")}
                >
                  {t("ecosystem.addToJoinMyPdf")}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <SaveProjectModal
        open={saveOpen}
        defaultName={defaultProjectName}
        isSaving={isSavingProject}
        onClose={() => setSaveOpen(false)}
        onSave={async (name) => {
          await saveProject(name);
          setSaveOpen(false);
        }}
      />
    </>
  );
}
