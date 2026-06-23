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
  buttonClassName?: string;
}

export function ToolProjectSaveButton({
  className = "",
  buttonClassName,
}: ToolProjectSaveButtonProps) {
  const { t } = useLanguage();
  const projectContext = useOptionalToolProjectContext();
  const tooltipId = useId();

  if (!projectContext) return null;

  const { canSave, openSaveModal } = projectContext;
  const resolvedButtonClassName =
    buttonClassName ?? toolActionSaveButtonClassName;

  return (
    <div className={`group relative min-w-0 flex-1 ${className}`.trim()}>
      <button
        type="button"
        disabled={!canSave}
        onClick={openSaveModal}
        aria-describedby={tooltipId}
        className={resolvedButtonClassName}
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
