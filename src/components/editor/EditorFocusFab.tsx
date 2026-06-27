"use client";

import { PanelTopOpen } from "lucide-react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useEditorFocusMode } from "@/components/editor/EditorFocusModeContext";

export function EditorFocusFab() {
  const { t } = useLanguage();
  const { isHeaderVisible, setIsHeaderVisible } = useEditorFocusMode();

  if (isHeaderVisible) {
    return null;
  }

  return (
    <button
      type="button"
      className="editor-focus-fab"
      onClick={() => setIsHeaderVisible(true)}
      aria-label={t("editor.focusMode.showHeader")}
      title={t("editor.focusMode.showHeader")}
    >
      <PanelTopOpen size={16} strokeWidth={1.75} aria-hidden />
      <span className="editor-focus-fab-label">{t("editor.focusMode.showHeader")}</span>
    </button>
  );
}
