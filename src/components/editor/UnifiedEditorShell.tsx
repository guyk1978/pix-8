"use client";

import { Suspense, useEffect } from "react";
import { EditorTopNav } from "@/components/editor/EditorTopNav";
import { EditorCanvas } from "@/components/editor/EditorCanvas";
import { EditorLayerPanel } from "@/components/editor/EditorLayerPanel";
import { EditorWorkspaceStrip } from "@/components/editor/EditorWorkspaceStrip";
import { EditorToolPanel } from "@/components/editor/EditorToolPanel";
import { EditorBottomBar } from "@/components/editor/EditorBottomBar";
import { EditorHistoryBindings } from "@/components/editor/EditorHistoryBindings";
import { EditorStatusMonitor } from "@/components/editor/EditorStatusMonitor";
import { EditorProjectLoader } from "@/components/editor/EditorProjectLoader";
import { EditorProvider } from "@/hooks/useEditorState";
import { PinnedToolsProvider } from "@/components/editor/PinnedToolsProvider";
import { EditorPinnedTools } from "@/components/editor/EditorPinnedTools";
import { useOptionalToolSidebar } from "@/components/layout/ToolSidebarContext";

function EditorLayoutInner() {
  const setEmbeddedToolbarLayout = useOptionalToolSidebar()?.setEmbeddedToolbarLayout;

  useEffect(() => {
    setEmbeddedToolbarLayout?.(true);
    return () => setEmbeddedToolbarLayout?.(false);
  }, [setEmbeddedToolbarLayout]);

  return (
    <section className="unified-editor flex min-h-0 w-full flex-1 flex-col">
      <Suspense fallback={null}>
        <EditorProjectLoader />
      </Suspense>
      <EditorTopNav />
      <div className="unified-editor-body flex min-h-0 flex-1 overflow-hidden">
        <EditorCanvas />
        <aside className="unified-editor-sidebar flex min-h-0 w-72 shrink-0 flex-col border-s lg:w-80">
          <EditorWorkspaceStrip />
          <EditorPinnedTools />
          <EditorLayerPanel />
          <EditorToolPanel />
        </aside>
      </div>
      <EditorBottomBar />
      <EditorHistoryBindings />
      <EditorStatusMonitor />
    </section>
  );
}

export function UnifiedEditorShell() {
  return (
    <EditorProvider>
      <PinnedToolsProvider>
        <EditorLayoutInner />
      </PinnedToolsProvider>
    </EditorProvider>
  );
}
