import type { LiveFeedbackPhase } from "@/hooks/useLiveFeedback";

export const AI_MOTION_EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

export const liveFeedbackPhaseClass: Record<LiveFeedbackPhase, string> = {
  idle: "live-feedback-phase--idle",
  processing: "live-feedback-phase--processing",
  success: "live-feedback-phase--success",
  failed: "live-feedback-phase--failed",
  correction: "live-feedback-phase--correction",
};
