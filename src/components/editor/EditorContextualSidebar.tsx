"use client";

import { ContextualScrollProvider, useContextualScrollContext } from "@/hooks/useContextualScroll";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useEditor } from "@/hooks/useEditorState";
import { EditorWorkspaceStrip } from "@/components/editor/EditorWorkspaceStrip";
import { EditorLayerPanel } from "@/components/editor/EditorLayerPanel";
import { EditorToolPanel } from "@/components/editor/EditorToolPanel";

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
  const { dir, language } = useLanguage();
  const { activeLayerId } = useEditor();

  return (
    <aside
      dir={dir}
      lang={language}
      className="unified-editor-sidebar contextual-sidebar editor-sidebar-dock editor-ui-enter flex min-h-0 w-72 shrink-0 flex-col lg:w-80"
    >
      <EditorWorkspaceStrip />
      <ContextualScrollProvider activeLayerId={activeLayerId}>
        <ContextualScrollRegion />
      </ContextualScrollProvider>
    </aside>
  );
}
