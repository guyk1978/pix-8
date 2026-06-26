"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { EmbeddedToolToolbar } from "@/components/dashboard/EmbeddedToolToolbar";
import { HomeProcessingGuide } from "@/components/dashboard/HomeProcessingGuide";
import { HomeToolSelector } from "@/components/dashboard/HomeToolSelector";
import { useOptionalToolSidebar } from "@/components/layout/ToolSidebarContext";
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
  const setEmbeddedToolbarLayout = useOptionalToolSidebar()?.setEmbeddedToolbarLayout;
  const controlsExpanded =
    useOptionalToolSidebar()?.embeddedToolbarExpanded ?? true;
  const setControlsExpanded =
    useOptionalToolSidebar()?.setEmbeddedToolbarExpanded ?? (() => {});

  useEffect(() => {
    setEmbeddedToolbarLayout?.(true);
    setControlsExpanded(true);
    return () => setEmbeddedToolbarLayout?.(false);
  }, [setEmbeddedToolbarLayout, setControlsExpanded, toolId]);

  const handleToolChange = useCallback(
    (nextToolId: ToolId) => {
      if (nextToolId === toolId) return;
      router.replace(getHomeToolHref(nextToolId), { scroll: false });
    },
    [router, toolId],
  );

  useEffect(() => {
    if (!searchParams.get("tool")) {
      router.replace(getHomeToolHref(DEFAULT_HOME_TOOL_ID), { scroll: false });
    }
  }, [router, searchParams]);

  if (!tool) return null;

  const ToolComponent = TOOL_COMPONENTS[tool.id];

  return (
    <section
      className={`embedded-tool-workspace flex min-h-0 w-full flex-1 flex-col ${controlsExpanded ? "" : "embedded-tool-workspace--focus"}`.trim()}
    >
      <EmbeddedToolToolbar
        controlsExpanded={controlsExpanded}
        onControlsExpandedChange={setControlsExpanded}
        toolSelector={
          <HomeToolSelector
          value={toolId}
          onChange={handleToolChange}
          variant="toolbar"
        />
        }
        guide={<HomeProcessingGuide />}
      />

      <div className="embedded-tool-canvas min-h-0 flex-1 overflow-hidden">
        <ToolShell key={tool.id} tool={tool} embedded>
          {ToolComponent ? (
            <ToolComponent />
          ) : (
            <div className="flex h-full min-h-[50vh] flex-col items-center justify-center gap-3 p-8 text-center">
              <span className="font-label text-muted">Status</span>
              <p className="font-mono text-sm text-muted">
                Tool workspace — implementation pending
              </p>
            </div>
          )}
        </ToolShell>
      </div>
    </section>
  );
}
