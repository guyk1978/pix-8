"use client";

import { Suspense } from "react";
import { UnifiedEditorShell } from "@/components/editor/UnifiedEditorShell";

function EditorFallback() {
  return (
    <div className="unified-editor flex min-h-0 flex-1 flex-col" aria-hidden>
      <div className="unified-editor-chrome h-10 border-b" />
      <div className="flex min-h-0 flex-1">
        <div className="unified-editor-canvas flex-1 transparency-checkerboard" />
        <div className="unified-editor-sidebar h-full w-72 border-s" />
      </div>
      <div className="unified-editor-chrome h-14 border-t" />
    </div>
  );
}

export function DashboardHome() {
  return (
    <Suspense fallback={<EditorFallback />}>
      <UnifiedEditorShell />
    </Suspense>
  );
}
