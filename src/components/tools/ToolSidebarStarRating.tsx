"use client";

import { useToolSidebar } from "@/components/layout/ToolSidebarContext";
import { ToolStarRating } from "@/components/tools/ToolStarRating";

export function ToolSidebarStarRating() {
  const { toolId, toolName } = useToolSidebar();

  if (!toolId || !toolName) {
    return null;
  }

  return (
    <ToolStarRating toolId={toolId} toolName={toolName} variant="sidebar" />
  );
}
