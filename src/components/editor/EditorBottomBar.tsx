"use client";

import { useState } from "react";
import {
  ChevronDown,
  Crop,
  Download,
  FlipHorizontal,
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
import { BOTTOM_BAR_ACTIONS } from "@/lib/editor/editorCategories";
import type { EditorToolAction } from "@/lib/editor/layerTypes";
import type { ImageFormat } from "@/hooks/useImageProcessor";
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
  const { t } = useLanguage();
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
  } = useEditor();
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);

  const handleQuickAction = (action: EditorToolAction) => {
    if (action === "rotate-flip") {
      addToolAction("rotate-flip");
      return;
    }
    addToolAction(action);
  };

  const defaultProjectName =
    projectName ?? source?.name.replace(/\.[^.]+$/, "") ?? "Editor project";

  return (
    <>
      <div className="unified-editor-bottom-bar shrink-0">
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

          {BOTTOM_BAR_ACTIONS.map((action) => {
            const Icon = BOTTOM_BAR_ICONS[action] ?? Crop;
            return (
              <button
                key={action}
                type="button"
                className="unified-editor-pill-btn"
                disabled={!source}
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
            disabled={!source}
            onClick={() => addToolAction("rotate-flip")}
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
