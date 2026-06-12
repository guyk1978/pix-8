"use client";

import { Copy, Download } from "lucide-react";
import { HelperSuccessHint } from "@/components/characters/HelperSuccessHint";
import { ProcessingIndicator } from "@/components/characters/ProcessingIndicator";
import { ToolProjectSaveButton } from "@/components/projects/ToolProjectSaveButton";
import { useOptionalToolProjectContext } from "@/components/projects/ToolProjectContext";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { WorkflowStep } from "@/components/tools/workflow/WorkflowStep";
import {
  toolActionButtonClassName,
  toolActionPrimaryClassName,
  toolActionRowClassName,
  toolActionStackClassName,
} from "@/components/tools/toolActionStyles";

interface ToolOutputActionsProps {
  onDownload: () => void | Promise<void>;
  onCopy: () => void | Promise<void>;
  downloadLabel: string;
  disabled?: boolean;
  copyDisabled?: boolean;
  isProcessing?: boolean;
  copyLabel?: string;
  showSuccessHint?: boolean;
}

export function ToolOutputActions({
  onDownload,
  onCopy,
  downloadLabel,
  disabled = false,
  copyDisabled,
  isProcessing = false,
  copyLabel,
  showSuccessHint = true,
}: ToolOutputActionsProps) {
  const { t } = useLanguage();
  const projectContext = useOptionalToolProjectContext();
  const resolvedCopyLabel = copyLabel ?? t("common.copyImage");

  const copyIsDisabled = copyDisabled ?? disabled;
  const isReady = showSuccessHint && !disabled && !isProcessing;

  return (
    <>
      <WorkflowStep step="process">
        <div className={`flex justify-center ${isProcessing ? "py-2" : "h-0 overflow-hidden"}`}>
          {isProcessing ? (
            <ProcessingIndicator active size="md" progress={80} />
          ) : null}
        </div>
      </WorkflowStep>

      <WorkflowStep step="download">
        <div className="mt-5 space-y-4">
          {isReady ? <HelperSuccessHint /> : null}

          <div className={toolActionStackClassName}>
            {projectContext ? <ToolProjectSaveButton /> : null}

            <div className={toolActionRowClassName}>
              <button
                type="button"
                disabled={copyIsDisabled}
                onClick={() => void onCopy()}
                className={toolActionButtonClassName}
              >
                <Copy className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
                <span className="truncate">
                  {isProcessing ? t("common.processing") : resolvedCopyLabel}
                </span>
              </button>

              <button
                type="button"
                disabled={disabled}
                onClick={() => void onDownload()}
                className={toolActionPrimaryClassName}
              >
                <Download className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
                <span className="truncate">
                  {isProcessing ? t("common.processing") : downloadLabel}
                </span>
              </button>
            </div>
          </div>
        </div>
      </WorkflowStep>
    </>
  );
}
