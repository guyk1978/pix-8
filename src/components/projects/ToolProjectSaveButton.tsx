"use client";

import { useId } from "react";
import { FolderPlus } from "lucide-react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useOptionalToolProjectContext } from "@/components/projects/ToolProjectContext";
import {
  toolActionSaveButtonClassName,
  toolActionTooltipClassName,
} from "@/components/tools/toolActionStyles";

interface ToolProjectSaveButtonProps {
  className?: string;
}

export function ToolProjectSaveButton({ className = "" }: ToolProjectSaveButtonProps) {
  const { t } = useLanguage();
  const projectContext = useOptionalToolProjectContext();
  const tooltipId = useId();

  if (!projectContext) return null;

  const { canSave, openSaveModal } = projectContext;

  return (
    <div className={`group relative w-full ${className}`}>
      <button
        type="button"
        disabled={!canSave}
        onClick={openSaveModal}
        aria-describedby={tooltipId}
        className={toolActionSaveButtonClassName}
      >
        <FolderPlus className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
        <span className="truncate">{t("projects.saveProject")}</span>
      </button>

      <div id={tooltipId} role="tooltip" className={toolActionTooltipClassName}>
        {t("projects.saveTooltip")}
      </div>
    </div>
  );
}
