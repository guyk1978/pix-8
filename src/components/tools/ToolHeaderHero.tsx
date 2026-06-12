"use client";

import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { WorkflowAnchor } from "@/components/tools/workflow/WorkflowStep";
import { useWorkflowOptional } from "@/components/tools/workflow/WorkflowContext";
import type { ToolId } from "@/lib/tools";

interface ToolHeaderHeroProps {
  toolId: ToolId;
  title: string;
  description: string;
}

export function ToolHeaderHero({ toolId, title, description }: ToolHeaderHeroProps) {
  const { t } = useLanguage();
  const workflow = useWorkflowOptional();
  const isStartActive = workflow?.activeStep === "start";

  return (
    <div className="tool-header-minimal relative mb-8 text-start">
      <WorkflowAnchor anchor="start" className="sr-only">
        <span aria-hidden>{title}</span>
      </WorkflowAnchor>

      <div className="flex flex-wrap items-start justify-start gap-3">
        <div className="min-w-0 w-full max-w-2xl">
          <div className="flex flex-wrap items-center justify-start gap-3">
            <h1 className="text-2xl font-medium tracking-tight text-foreground sm:text-[1.75rem]">
              {title}
            </h1>
            <FavoriteButton toolSlug={toolId} />
          </div>
          <p className="mt-2 text-base leading-relaxed text-muted">
            {description}
          </p>
          {isStartActive ? (
            <p className="workflow-active-hint pointer-events-none mt-3 font-label text-sm leading-relaxed text-[var(--glow-teal)]">
              {t("workflow.steps.start.hint")}
            </p>
          ) : null}
        </div>
      </div>

      <WorkflowAnchor anchor="startBrush" className="sr-only">
        <span aria-hidden />
      </WorkflowAnchor>
    </div>
  );
}
