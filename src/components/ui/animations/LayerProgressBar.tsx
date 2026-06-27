"use client";

import type { LiveFeedbackPhase } from "@/hooks/useLiveFeedback";
import { liveFeedbackPhaseClass } from "@/components/ui/animations/types";

interface LayerProgressBarProps {
  phase: LiveFeedbackPhase;
  progress: number | null;
  label?: string;
}

export function LayerProgressBar({ phase, progress, label }: LayerProgressBarProps) {
  if (phase === "idle") return null;

  const width =
    phase === "processing" && progress !== null
      ? `${Math.max(8, Math.min(100, progress))}%`
      : phase === "success"
        ? "100%"
        : undefined;

  return (
    <div
      className={`live-feedback-layer-progress ${liveFeedbackPhaseClass[phase]}`}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress ?? undefined}
    >
      <span
        className="live-feedback-layer-progress__bar"
        style={width ? { width } : undefined}
      />
    </div>
  );
}
