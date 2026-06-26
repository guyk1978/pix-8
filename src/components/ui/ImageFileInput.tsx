"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useOptionalToolSidebar } from "@/components/layout/ToolSidebarContext";
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
  /** Embedded toolbar slot id — use a unique value when a tool has multiple file inputs. */
  toolbarSlotId?: string;
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
  toolbarSlotId = "replace-image",
}: ImageFileInputProps) {
  const { t } = useLanguage();
  const embeddedToolbarLayout =
    useOptionalToolSidebar()?.embeddedToolbarLayout ?? false;
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

  if (embeddedToolbarLayout && toolbarSlotId === "replace-image") {
    return null;
  }

  const field = (
    <div
      className={`flex items-center gap-2 rounded-md bg-foreground/[0.06] ${
        embeddedToolbarLayout
          ? "embedded-replace-chip h-8 max-w-[min(100%,13rem)] px-2"
          : "min-h-11 gap-3 border border-border bg-background px-3 py-2"
      } ${className}`}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        className={`shrink-0 font-label text-muted transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50 ${
          embeddedToolbarLayout ? "text-[0.625rem] uppercase tracking-wide" : ""
        }`}
      >
        {resolvedChooseLabel}
      </button>
      <span
        className={`min-w-0 flex-1 truncate font-mono ${
          embeddedToolbarLayout ? "text-[10px]" : "text-xs"
        } ${showingPlaceholder ? "text-muted" : "text-foreground"}`}
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

  const labeledField = embeddedToolbarLayout ? (
    <div className="embedded-replace-image-row flex min-w-0 items-center gap-1.5">
      <span className="embedded-micro-label shrink-0 font-label text-[0.625rem] uppercase tracking-wide text-muted">
        {labelText}
      </span>
      {field}
    </div>
  ) : (
    <div className="space-y-2 text-start">
      <label htmlFor={inputId} className="block font-label text-start text-muted">
        {labelText}
      </label>
      {field}
    </div>
  );

  if (embeddedToolbarLayout) {
    return labelText ? labeledField : field;
  }

  return labeledField;
}
