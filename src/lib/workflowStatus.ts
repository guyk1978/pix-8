import type { WorkflowStepId } from "@/lib/toolWorkflows";

let activeStep: WorkflowStepId | null = null;
const listeners = new Set<() => void>();

export function publishWorkflowStep(step: WorkflowStepId | null) {
  activeStep = step;
  for (const listener of listeners) {
    listener();
  }
}

export function subscribeWorkflowStep(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getPublishedWorkflowStep() {
  return activeStep;
}
