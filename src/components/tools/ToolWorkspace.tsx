"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { WorkspaceImageFilmstrip } from "@/components/ui/WorkspaceImageFilmstrip";
import { useOptionalToolSidebar } from "@/components/layout/ToolSidebarContext";
import { PreviewCornerRadiusEffect } from "@/components/tools/shared/PreviewCornerRadiusEffect";
import {
  ToolWorkspaceActionsProvider,
  ToolWorkspaceActionsTarget,
} from "@/components/tools/ToolWorkspaceActions";
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
  const workspaceRootRef = useRef<HTMLDivElement>(null);
  const workflow = useWorkflowOptional();
  const sidebar = useOptionalToolSidebar();
  const setHasActiveImage = sidebar?.setHasActiveImage;
  const embeddedToolbarLayout = sidebar?.embeddedToolbarLayout ?? false;
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
    <ToolWorkspaceActionsProvider>
        <div
          ref={workspaceRootRef}
          className={`tool-workspace relative z-[1] w-full text-start ${
            embeddedToolbarLayout
              ? "embedded-tool-workspace-inner flex h-full min-h-0 flex-1 flex-col"
              : "flex flex-col gap-5"
          }`}
        >
          <PreviewCornerRadiusEffect rootRef={workspaceRootRef} />
          <div className={embeddedToolbarLayout ? "min-h-0 flex-1 overflow-auto" : undefined}>
            {!embeddedToolbarLayout ? <ToolWorkspaceActionsTarget /> : null}
            {children}
          </div>
          {embeddedToolbarLayout ? <WorkspaceImageFilmstrip /> : null}
        </div>
    </ToolWorkspaceActionsProvider>
  );
}
