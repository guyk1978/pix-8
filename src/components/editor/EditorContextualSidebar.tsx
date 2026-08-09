"use client";

import { X } from "lucide-react";
import { ContextualScrollProvider, useContextualScrollContext } from "@/hooks/useContextualScroll";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useEditor } from "@/hooks/useEditorState";
import { EditorWorkspaceStrip } from "@/components/editor/EditorWorkspaceStrip";
import { EditorLayerPanel } from "@/components/editor/EditorLayerPanel";
import { EditorToolPanel } from "@/components/editor/EditorToolPanel";
import { useOptionalEditorMobilePanel } from "@/components/editor/EditorMobilePanelContext";

function ContextualScrollRegion() {
  const { scrollRef } = useContextualScrollContext();

  return (
    <div ref={scrollRef} className="contextual-scroller">
      <EditorLayerPanel />
      <EditorToolPanel />
    </div>
  );
}

export function EditorContextualSidebar() {
  const { t, dir, language } = useLanguage();
  const { activeLayerId } = useEditor();
  const mobilePanel = useOptionalEditorMobilePanel();
  const isMobileOpen = mobilePanel?.isOpen ?? false;

  return (
    <>
      {isMobileOpen ? (
        <button
          type="button"
          className="unified-editor-mobile-backdrop"
          aria-label={t("editor.mobilePanel.close")}
          onClick={mobilePanel?.close}
        />
      ) : null}

      <aside
        dir={dir}
        lang={language}
        className={`unified-editor-sidebar contextual-sidebar editor-sidebar-dock editor-ui-enter flex min-h-0 w-72 shrink-0 flex-col lg:w-80${
          isMobileOpen ? " is-mobile-open" : ""
        }`}
        id="editor-mobile-panel"
        aria-label={t("editor.mobilePanel.title")}
      >
        <div className="unified-editor-mobile-sheet-header">
          <p className="unified-editor-mobile-sheet-title">
            {t("editor.mobilePanel.title")}
          </p>
          <button
            type="button"
            className="unified-editor-mobile-sheet-close"
            aria-label={t("editor.mobilePanel.close")}
            onClick={mobilePanel?.close}
          >
            <X className="h-4 w-4" strokeWidth={2} aria-hidden />
          </button>
        </div>
        <EditorWorkspaceStrip />
        <ContextualScrollProvider activeLayerId={activeLayerId}>
          <ContextualScrollRegion />
        </ContextualScrollProvider>
      </aside>
    </>
  );
}
