"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import {
  useWorkflowOptional,
  type AnchorRect,
} from "@/components/tools/workflow/WorkflowContext";
import type { WorkflowAnchorId, WorkflowStepId } from "@/lib/toolWorkflows";

interface WorkflowStepProps {
  step: WorkflowStepId;
  children: ReactNode;
  className?: string;
}

interface WorkflowAnchorProps {
  anchor: WorkflowAnchorId;
  children: ReactNode;
  className?: string;
  showHint?: boolean;
}

function useAnchorMeasure(
  anchorId: WorkflowAnchorId,
  containerRect: AnchorRect | null | undefined,
  registerAnchor:
    | ((step: WorkflowAnchorId, rect: AnchorRect | null) => void)
    | undefined,
) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!registerAnchor) return;

    const element = ref.current;
    if (!element) return;

    const measure = () => {
      if (!containerRect) return;

      const rect = element.getBoundingClientRect();
      registerAnchor(anchorId, {
        x: rect.left - containerRect.x,
        y: rect.top - containerRect.y,
        width: rect.width,
        height: rect.height,
      });
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(element);
    window.addEventListener("scroll", measure, true);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", measure, true);
      window.removeEventListener("resize", measure);
    };
  }, [
    registerAnchor,
    anchorId,
    containerRect?.x,
    containerRect?.y,
    containerRect?.width,
    containerRect?.height,
  ]);

  return ref;
}

export function WorkflowAnchor({
  anchor,
  children,
  className = "",
  showHint = false,
}: WorkflowAnchorProps) {
  const { t } = useLanguage();
  const workflow = useWorkflowOptional();
  const stepMeta = workflow?.steps.find((entry) => entry.id === anchor);
  const ref = useAnchorMeasure(
    anchor,
    workflow?.containerRect ?? null,
    workflow?.registerAnchor,
  );
  const isActive = workflow?.activeStep === anchor;

  return (
    <div
      ref={ref}
      data-workflow-anchor={anchor}
      className={`${isActive ? "workflow-step-active" : ""} ${className}`.trim()}
    >
      {children}
      {showHint && isActive && stepMeta ? (
        <p className="workflow-active-hint pointer-events-none mt-2 text-center font-label text-[10px] leading-relaxed text-[var(--glow-teal)] sm:text-[11px]">
          {t(stepMeta.hintKey)}
        </p>
      ) : null}
    </div>
  );
}

export function WorkflowStep({ step, children, className = "" }: WorkflowStepProps) {
  const { t } = useLanguage();
  const workflow = useWorkflowOptional();
  const stepMeta = workflow?.steps.find((entry) => entry.id === step);
  const ref = useAnchorMeasure(
    step,
    workflow?.containerRect ?? null,
    workflow?.registerAnchor,
  );
  const isActive = workflow?.activeStep === step;

  return (
    <div
      ref={ref}
      data-workflow-step={step}
      className={`relative ${isActive ? "workflow-step-active" : ""} ${className}`}
    >
      {children}
      {isActive && stepMeta ? (
        <p className="workflow-active-hint pointer-events-none mt-2 text-center font-label text-[10px] leading-relaxed text-[var(--glow-teal)] sm:text-[11px]">
          {t(stepMeta.hintKey)}
        </p>
      ) : null}
    </div>
  );
}

/** Wrap tool-specific settings between upload and output */
export function WorkflowSettings({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <WorkflowStep step="configure" className={className}>
      {children}
    </WorkflowStep>
  );
}
