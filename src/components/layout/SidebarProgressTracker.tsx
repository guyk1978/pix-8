"use client";

import { useSyncExternalStore } from "react";
import { HelperCharacter } from "@/components/characters/HelperCharacter";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { CHARACTER_SIZES } from "@/lib/characters";
import {
  getPublishedWorkflowStep,
  subscribeWorkflowStep,
} from "@/lib/workflowStatus";

const STEP_KEYS = ["upload", "process", "download"] as const;

const ACTIVE_RING: Record<(typeof STEP_KEYS)[number], string> = {
  upload: "120 94",
  process: "90 124",
  download: "60 154",
};

export function SidebarProgressTracker() {
  const { t } = useLanguage();
  const activeStep = useSyncExternalStore(
    subscribeWorkflowStep,
    getPublishedWorkflowStep,
    () => null,
  );

  const sidebarStep =
    activeStep === "upload"
      ? "upload"
      : activeStep === "download"
        ? "download"
        : activeStep === "process" || activeStep === "configure"
          ? "process"
          : "upload";

  const ringDash = ACTIVE_RING[sidebarStep];
  const processingCharacter =
    sidebarStep === "process" ? "processingAlt" : "processing";

  return (
    <div className="mx-3 mb-4 flex flex-col items-center gap-3 rounded-md border border-border bg-card p-4">
      <div className="relative flex h-32 w-32 items-center justify-center">
        <svg
          className="absolute inset-0 h-full w-full -rotate-90 animate-processing-ring"
          viewBox="0 0 80 80"
          aria-hidden
        >
          <circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke="var(--glow-ring-track)"
            strokeWidth="4"
          />
          <circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke="url(#sidebar-progress-gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={ringDash}
          />
          <defs>
            <linearGradient
              id="sidebar-progress-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="25%" stopColor="#f97316" />
              <stop offset="50%" stopColor="#a78bfa" />
              <stop offset="75%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2dd4bf" />
            </linearGradient>
          </defs>
        </svg>

        <HelperCharacter
          character={processingCharacter}
          alt={t("characters.processingAlt")}
          size={CHARACTER_SIZES.sidebar}
          glow
          className="relative z-[1]"
          animate="float"
        />
      </div>

      <div className="flex flex-col items-center gap-0.5 text-center">
        {STEP_KEYS.map((step) => (
          <span
            key={step}
            className={`font-label text-[8px] leading-tight ${
              sidebarStep === step
                ? "text-[var(--glow-teal)]"
                : "text-muted"
            }`}
          >
            {t(`progress.${step}`)}
          </span>
        ))}
      </div>
    </div>
  );
}
