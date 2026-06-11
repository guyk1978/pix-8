"use client";

import { useEffect, type ReactNode } from "react";
import { useWorkflowOptional } from "@/components/tools/workflow/WorkflowContext";
import { publishWorkflowStep } from "@/lib/workflowStatus";
import type { WorkflowState } from "@/lib/toolWorkflows";

interface ToolWorkspaceProps {
  children: ReactNode;
  workflowState?: WorkflowState;
}

export function ToolWorkspace({ children, workflowState }: ToolWorkspaceProps) {
  const workflow = useWorkflowOptional();

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
    if (!workflow) {
      publishWorkflowStep(null);
      return;
    }

    publishWorkflowStep(workflow.activeStep);
    return () => publishWorkflowStep(null);
  }, [workflow?.activeStep, workflow]);

  return (
    <div className="tool-workspace relative z-[1] w-full space-y-5">{children}</div>
  );
}
