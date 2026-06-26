"use client";

import { Suspense } from "react";
import { DashboardEmbeddedTool } from "@/components/dashboard/DashboardEmbeddedTool";

function EmbeddedToolFallback() {
  return (
    <div
      className="embedded-tool-workspace flex min-h-0 flex-1 flex-col"
      aria-hidden
    >
      <div className="h-16 shrink-0 border-b border-border bg-card" />
      <div className="embedded-tool-canvas min-h-0 flex-1 transparency-checkerboard" />
    </div>
  );
}

export function DashboardHome() {
  return (
    <Suspense fallback={<EmbeddedToolFallback />}>
      <DashboardEmbeddedTool />
    </Suspense>
  );
}
