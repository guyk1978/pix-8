"use client";

interface ToolOutputActionsProps {
  onDownload: () => void | Promise<void>;
  onCopy: () => void | Promise<void>;
  downloadLabel: string;
  disabled?: boolean;
  copyDisabled?: boolean;
  isProcessing?: boolean;
  copyLabel?: string;
}

const primaryButtonClassName =
  "min-h-11 flex-1 rounded-sm border border-border bg-accent-muted px-4 py-3 font-label text-accent transition-colors hover:bg-accent/20 active:bg-accent/25 disabled:cursor-not-allowed disabled:opacity-40";

const secondaryButtonClassName =
  "min-h-11 flex-1 rounded-sm border border-border bg-background px-4 py-3 font-label text-foreground transition-colors hover:border-muted hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40";

export function ToolOutputActions({
  onDownload,
  onCopy,
  downloadLabel,
  disabled = false,
  copyDisabled,
  isProcessing = false,
  copyLabel = "Copy Image",
}: ToolOutputActionsProps) {
  const copyIsDisabled = copyDisabled ?? disabled;

  return (
    <div className="mt-5 flex flex-col gap-2 sm:flex-row">
      <button
        type="button"
        disabled={disabled}
        onClick={() => void onDownload()}
        className={primaryButtonClassName}
      >
        {isProcessing ? "Processing…" : downloadLabel}
      </button>
      <button
        type="button"
        disabled={copyIsDisabled}
        onClick={() => void onCopy()}
        className={secondaryButtonClassName}
      >
        {isProcessing ? "Processing…" : copyLabel}
      </button>
    </div>
  );
}
