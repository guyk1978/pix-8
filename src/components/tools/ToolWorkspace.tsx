"use client";

import { useEffect, type ReactNode } from "react";
import { useOptionalToolSidebar } from "@/components/layout/ToolSidebarContext";
import { useWorkflowOptional } from "@/components/tools/workflow/WorkflowContext";
import { publishWorkflowStep } from "@/lib/workflowStatus";
import type { WorkflowState } from "@/lib/toolWorkflows";

interface ToolWorkspaceProps {
  children: ReactNode;
  workflowState?: WorkflowState;
  /** When set, drives floating sidebar visibility (falls back to workflowState.hasSource). */
  hasActiveImage?: boolean;
}

export function ToolWorkspace({
  children,
  workflowState,
  hasActiveImage,
}: ToolWorkspaceProps) {
  const workflow = useWorkflowOptional();
  const setHasActiveImage = useOptionalToolSidebar()?.setHasActiveImage;
  const activeImage = hasActiveImage ?? workflowState?.hasSource ?? false;

  useEffect(() => {
    if (!workflow || !workflowState) return;

    workflow.setState(workflowState);
  }, [
    workflow?.setState,
    workflowState?.hasSource,
    workflowState?.hasConfigured,
    workflowState?.isProcessing,
    workflowState?.isReady,
  ]);

  useEffect(() => {
    setHasActiveImage?.(activeImage);
    return () => setHasActiveImage?.(false);
  }, [activeImage, setHasActiveImage]);

  useEffect(() => {
    if (!workflow) {
      publishWorkflowStep(null);
      return;
    }

    publishWorkflowStep(workflow.activeStep);
    return () => publishWorkflowStep(null);
  }, [workflow?.activeStep, workflow]);

  return (
    <div className="tool-workspace relative z-[1] w-full space-y-5 text-start">{children}</div>
  );
}
