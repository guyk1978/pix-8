"use client";

export type ProcessingMode = "single" | "batch";

interface ProcessingModeToggleProps {
  mode: ProcessingMode;
  onChange: (mode: ProcessingMode) => void;
}

const buttonClassName =
  "min-h-9 flex-1 rounded-sm border px-3 font-label text-xs transition-colors";

export function ProcessingModeToggle({
  mode,
  onChange,
}: ProcessingModeToggleProps) {
  return (
    <div className="mb-5 flex gap-2 border border-border bg-background p-1">
      <button
        type="button"
        onClick={() => onChange("single")}
        className={`${buttonClassName} ${
          mode === "single"
            ? "border-muted bg-surface text-foreground"
            : "border-transparent text-muted hover:text-foreground"
        }`}
      >
        Single Image
      </button>
      <button
        type="button"
        onClick={() => onChange("batch")}
        className={`${buttonClassName} ${
          mode === "batch"
            ? "border-muted bg-surface text-foreground"
            : "border-transparent text-muted hover:text-foreground"
        }`}
      >
        Batch (ZIP)
      </button>
    </div>
  );
}
