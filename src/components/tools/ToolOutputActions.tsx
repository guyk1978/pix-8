"use client";

import { HelperSuccessHint } from "@/components/characters/HelperSuccessHint";
import { ProcessingIndicator } from "@/components/characters/ProcessingIndicator";
import { useLanguage } from "@/components/i18n/LanguageProvider";

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

const primaryButtonClassName =
  "min-h-11 flex-1 rounded-sm border border-[color-mix(in_srgb,var(--glow-teal)_40%,var(--border))] bg-accent-muted px-4 py-3 font-label text-accent shadow-[0_0_14px_color-mix(in_srgb,var(--glow-teal)_18%,transparent)] transition-colors hover:bg-accent/20 active:bg-accent/25 disabled:cursor-not-allowed disabled:opacity-40";

const secondaryButtonClassName =
  "min-h-11 flex-1 rounded-sm border border-border bg-background px-4 py-3 font-label text-foreground transition-colors hover:border-muted hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40";

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
  const resolvedCopyLabel = copyLabel ?? t("common.copyImage");

  const copyIsDisabled = copyDisabled ?? disabled;
  const isReady = showSuccessHint && !disabled && !isProcessing;

  return (
    <div className="mt-5 space-y-4">
      {isProcessing ? (
        <div className="flex justify-center py-2">
          <ProcessingIndicator active size="md" progress={80} />
        </div>
      ) : null}
      {isReady ? <HelperSuccessHint /> : null}

      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          disabled={disabled}
          onClick={() => void onDownload()}
          className={primaryButtonClassName}
        >
          {isProcessing ? t("common.processing") : downloadLabel}
        </button>
        <button
          type="button"
          disabled={copyIsDisabled}
          onClick={() => void onCopy()}
          className={secondaryButtonClassName}
        >
          {isProcessing ? t("common.processing") : resolvedCopyLabel}
        </button>
      </div>
    </div>
  );
}
