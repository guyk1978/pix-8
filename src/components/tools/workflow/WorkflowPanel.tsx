"use client";

import type { ReactNode } from "react";

export function WorkflowPanel({ children }: { children: ReactNode }) {
  return <div className="workflow-panel relative">{children}</div>;
}
