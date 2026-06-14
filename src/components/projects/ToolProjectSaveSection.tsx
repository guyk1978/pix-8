"use client";

import { MarkAsFinalResult } from "@/components/projects/MarkAsFinalResult";
import { ToolProjectSaveButton } from "@/components/projects/ToolProjectSaveButton";
import { useOptionalToolProjectContext } from "@/components/projects/ToolProjectContext";

export function ToolProjectSaveSection() {
  const projectContext = useOptionalToolProjectContext();

  if (!projectContext) return null;

  return (
    <div className="flex w-full flex-col gap-3">
      <MarkAsFinalResult />
      <ToolProjectSaveButton />
    </div>
  );
}
