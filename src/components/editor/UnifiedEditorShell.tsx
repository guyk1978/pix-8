"use client";

import { Suspense, useEffect } from "react";
import { EditorTopNav } from "@/components/editor/EditorTopNav";
import { EditorCanvas } from "@/components/editor/EditorCanvas";
import { EditorContextualSidebar } from "@/components/editor/EditorContextualSidebar";
import { EditorBottomBar } from "@/components/editor/EditorBottomBar";
import { EditorHistoryBindings } from "@/components/editor/EditorHistoryBindings";
import { EditorStatusMonitor } from "@/components/editor/EditorStatusMonitor";
import { EditorProjectLoader } from "@/components/editor/EditorProjectLoader";
import { EditorMobilePanelProvider } from "@/components/editor/EditorMobilePanelContext";
import { EditorProvider } from "@/hooks/useEditorState";
import { useOptionalToolSidebar } from "@/components/layout/ToolSidebarContext";

function EditorLayoutInner() {
  const setEmbeddedToolbarLayout = useOptionalToolSidebar()?.setEmbeddedToolbarLayout;

  useEffect(() => {
    setEmbeddedToolbarLayout?.(true);
    document.body.style.overflow = "hidden";
    return () => {
      setEmbeddedToolbarLayout?.(false);
      document.body.style.overflow = "";
    };
  }, [setEmbeddedToolbarLayout]);

  return (
    <EditorMobilePanelProvider>
      <section className="unified-editor flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden">
        <Suspense fallback={null}>
          <EditorProjectLoader />
        </Suspense>
        <EditorTopNav />
        <div
          className="unified-editor-body unified-editor-body--sticky-canvas flex min-h-0 flex-1 overflow-hidden"
          dir="ltr"
        >
          <EditorCanvas />
          <EditorContextualSidebar />
        </div>
        <EditorBottomBar />
        <EditorHistoryBindings />
        <EditorStatusMonitor />
      </section>
    </EditorMobilePanelProvider>
  );
}

export function UnifiedEditorShell() {
  return (
    <EditorProvider>
      <EditorLayoutInner />
    </EditorProvider>
  );
}
