"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { HomeProcessingGuide } from "@/components/dashboard/HomeProcessingGuide";
import { HomeToolSelector } from "@/components/dashboard/HomeToolSelector";
import { ToolShell } from "@/components/tools/ToolShell";
import { TOOL_COMPONENTS } from "@/lib/toolComponents";
import {
  DEFAULT_HOME_TOOL_ID,
  getHomeToolHref,
  resolveHomeToolId,
} from "@/lib/homeTool";
import { getToolById } from "@/lib/tools";
import type { ToolId } from "@/lib/tools";

export function DashboardEmbeddedTool() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toolId = resolveHomeToolId(searchParams.get("tool"));
  const tool = getToolById(toolId);

  useEffect(() => {
    if (!searchParams.get("tool")) {
      router.replace(getHomeToolHref(DEFAULT_HOME_TOOL_ID), { scroll: false });
    }
  }, [router, searchParams]);

  const handleToolChange = useCallback(
    (nextToolId: ToolId) => {
      if (nextToolId === toolId) return;
      router.replace(getHomeToolHref(nextToolId), { scroll: false });
    },
    [router, toolId],
  );

  if (!tool) return null;

  const ToolComponent = TOOL_COMPONENTS[tool.id];

  return (
    <section
      className="dashboard-embedded-tool mx-auto w-full max-w-5xl space-y-4 px-4 pt-5 pb-8 sm:px-6 sm:pt-6"
    >
      <div className="flex flex-wrap items-end justify-center gap-3">
        <HomeToolSelector value={toolId} onChange={handleToolChange} />
        <HomeProcessingGuide />
      </div>

      <ToolShell key={tool.id} tool={tool} embedded>
        {ToolComponent ? (
          <ToolComponent />
        ) : (
          <div className="flex min-h-48 flex-col items-center justify-center gap-3 p-8 text-center">
            <span className="font-label text-muted">Status</span>
            <p className="font-mono text-sm text-muted">
              Tool workspace — implementation pending
            </p>
          </div>
        )}
      </ToolShell>
    </section>
  );
}
