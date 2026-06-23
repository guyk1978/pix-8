"use client";

import { DashboardEmbeddedTool } from "@/components/dashboard/DashboardEmbeddedTool";
import { Suspense } from "react";

function EmbeddedToolFallback() {
  return (
    <div
      className="mx-auto w-full max-w-5xl space-y-4 px-4 pt-5 pb-8 sm:px-6"
      aria-hidden
    >
      <div className="h-10 rounded-none border border-border bg-card" />
      <div className="min-h-[24rem] rounded-none border border-border bg-card" />
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
