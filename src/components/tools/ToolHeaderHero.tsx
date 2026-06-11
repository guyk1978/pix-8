"use client";

import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import { HelperCharacter } from "@/components/characters/HelperCharacter";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { WorkflowAnchor } from "@/components/tools/workflow/WorkflowStep";
import { useWorkflowOptional } from "@/components/tools/workflow/WorkflowContext";
import { CHARACTER_SIZES } from "@/lib/characters";
import type { ToolId } from "@/lib/tools";

interface ToolHeaderHeroProps {
  toolId: ToolId;
  title: string;
  description: string;
}

export function ToolHeaderHero({ toolId, title, description }: ToolHeaderHeroProps) {
  const { t, dir } = useLanguage();
  const workflow = useWorkflowOptional();
  const flip = dir === "rtl" ? "-scale-x-100" : "";
  const startCharacter = "resizer";
  const isStartActive = workflow?.activeStep === "start";
  const blueShift =
    dir === "rtl"
      ? "translate-x-4 sm:translate-x-7"
      : "-translate-x-4 sm:-translate-x-7";

  return (
    <div className="relative mb-8 overflow-x-clip">
      <div className="tool-title-hero relative z-0 flex items-center gap-4 rounded-md px-4 py-5 sm:gap-6 sm:px-6 sm:py-6">
        <WorkflowAnchor anchor="start" className="relative hidden shrink-0 sm:block">
          <HelperCharacter
            character={startCharacter}
            alt={t("characters.resizerAlt")}
            size={CHARACTER_SIZES.hero}
            glow="soft"
            pixelated
            className={flip}
            animate="wave"
          />
        </WorkflowAnchor>

        <div className="relative z-20 min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl font-medium tracking-tight text-foreground sm:text-2xl">
              {title}
            </h1>
            <FavoriteButton toolSlug={toolId} />
            <span className="tool-speech-bubble hidden font-label text-[10px] text-[var(--glow-teal)] sm:inline">
              {title}
            </span>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            {description}
          </p>
          {isStartActive ? (
            <p className="workflow-active-hint pointer-events-none mt-3 font-label text-[10px] leading-relaxed text-[var(--glow-teal)] sm:text-[11px]">
              {t("workflow.steps.start.hint")}
            </p>
          ) : null}
        </div>

        <div className="flex shrink-0 sm:hidden">
          <HelperCharacter
            character={startCharacter}
            alt={t("characters.resizerAlt")}
            size={CHARACTER_SIZES.heroMobile}
            glow="soft"
            pixelated
            className={flip}
            animate="wave"
          />
        </div>
      </div>

      <WorkflowAnchor
        anchor="startBrush"
        className={`pointer-events-none absolute top-[58%] z-10 -translate-y-1/2 end-0 ${blueShift}`}
      >
        <HelperCharacter
          character="blue"
          alt={t("characters.blueAlt")}
          size={CHARACTER_SIZES.blueHeroMobile}
          glow={false}
          pixelated
          className={`${flip} sm:hidden`}
          animate="float"
        />
        <HelperCharacter
          character="blue"
          alt={t("characters.blueAlt")}
          size={CHARACTER_SIZES.blueHero}
          glow={false}
          pixelated
          className={`${flip} hidden sm:block`}
          animate="float"
        />
      </WorkflowAnchor>
    </div>
  );
}
