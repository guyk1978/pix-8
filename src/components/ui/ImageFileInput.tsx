"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";

interface ImageFileInputProps {
  id?: string;
  /** Pass `false` to hide the label row. Omit for the default “Replace Image” label. */
  label?: string | false;
  onFileChange: (file: File | null) => void;
  disabled?: boolean;
  accept?: string;
  multiple?: boolean;
  fileName?: string | null;
  chooseLabel?: string;
  emptyLabel?: string;
  className?: string;
}

export function ImageFileInput({
  id,
  label,
  onFileChange,
  disabled = false,
  accept = "image/*",
  multiple = false,
  fileName = null,
  chooseLabel,
  emptyLabel,
  className = "",
}: ImageFileInputProps) {
  const { t } = useLanguage();
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);
  const [pendingName, setPendingName] = useState<string | null>(null);
  const resolvedChooseLabel = chooseLabel ?? t("common.chooseFile");
  const resolvedEmptyLabel = emptyLabel ?? t("common.noFileChosen");
  const labelText =
    label === false ? null : typeof label === "string" ? label : t("common.replaceImage");

  useEffect(() => {
    setPendingName(null);
  }, [fileName]);

  const displayName = pendingName ?? fileName ?? resolvedEmptyLabel;
  const showingPlaceholder = displayName === resolvedEmptyLabel;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setPendingName(file?.name ?? null);
    onFileChange(file);
    event.target.value = "";
  };

  const field = (
    <div
      className={`flex min-h-11 items-center gap-3 rounded-sm border border-border bg-background px-3 py-2 ${className}`}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        className="shrink-0 font-label text-muted transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
      >
        {resolvedChooseLabel}
      </button>
      <span
        className={`min-w-0 flex-1 truncate font-mono text-xs ${
          showingPlaceholder ? "text-muted" : "text-foreground"
        }`}
        title={showingPlaceholder ? undefined : displayName}
      >
        {displayName}
      </span>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="sr-only"
        onChange={handleChange}
      />
    </div>
  );

  if (!labelText) {
    return field;
  }

  return (
    <div className="space-y-2 text-start">
      <label htmlFor={inputId} className="block font-label text-start text-muted">
        {labelText}
      </label>
      {field}
    </div>
  );
}
