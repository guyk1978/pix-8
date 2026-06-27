"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useEditor } from "@/hooks/useEditorState";
import { EditorLayerParams } from "@/components/editor/EditorLayerParams";

export function EditorToolPanel() {
  const { t } = useLanguage();
  const { activeLayer, source } = useEditor();

  if (!source || !activeLayer || activeLayer.type === "source") {
    return (
      <div className="unified-editor-params unified-editor-divider-top">
        <header className="unified-editor-panel-header">
          <h2 className="unified-editor-panel-title">{t("editor.params.title")}</h2>
        </header>
        <p className="unified-editor-params-empty">{t("editor.params.empty")}</p>
      </div>
    );
  }

  return (
    <div className="unified-editor-params unified-editor-divider-top">
      <header className="unified-editor-panel-header">
        <h2 className="unified-editor-panel-title">{t("editor.params.title")}</h2>
        <span className="unified-editor-panel-meta">{t(activeLayer.nameKey)}</span>
      </header>
      <div className="unified-editor-params-body">
        <EditorLayerParams layer={activeLayer} />
      </div>
    </div>
  );
}
