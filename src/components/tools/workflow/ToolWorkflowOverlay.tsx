"use client";

import { useMemo } from "react";
import { useWorkflow } from "@/components/tools/workflow/WorkflowContext";
import { buildWorkflowPaths } from "@/lib/workflowPaths";

export function ToolWorkflowOverlay() {
  const { toolId, steps, getAnchors, activeStep, containerRect, layoutTick } =
    useWorkflow();

  const paths = useMemo(() => {
    if (!containerRect) return [];

    const anchors = getAnchors();
    const stepOrder = steps.map((step) => step.id);

    return buildWorkflowPaths(toolId, stepOrder, anchors, activeStep, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toolId, steps, getAnchors, activeStep, containerRect, layoutTick]);

  if (!containerRect || paths.length === 0) return null;

  return (
    <div
      className="workflow-ring-layer pointer-events-none absolute inset-0 z-0 overflow-visible"
      aria-hidden
    >
      <svg
        className="absolute inset-0 h-full w-full overflow-visible"
        width={containerRect.width}
        height={containerRect.height}
      >
        <defs>
          <linearGradient
            id="workflow-line-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="var(--glow-teal)" />
            <stop offset="45%" stopColor="var(--glow-purple)" />
            <stop offset="100%" stopColor="#e879f9" />
          </linearGradient>
        </defs>

        {paths.map((path) => (
          <path
            key={path.id}
            d={path.d}
            fill="none"
            stroke="url(#workflow-line-gradient)"
            strokeWidth={path.active ? 2 : 1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={path.loop ? "6 8" : path.active ? "none" : "4 6"}
            opacity={path.active ? 0.9 : path.loop ? 0.35 : 0.55}
          />
        ))}
      </svg>
    </div>
  );
}
