"use client";

import type { ReactNode } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";

interface ImageUploadDropzoneProps {
  inputId: string;
  onFileChange: (file: File | null) => void;
  onFilesChange?: (files: FileList) => void;
  isDragging: boolean;
  onDraggingChange: (dragging: boolean) => void;
  multiple?: boolean;
  ariaLabel?: string;
  title?: string;
  hint?: string;
  formatHint?: string;
  children?: ReactNode;
  className?: string;
}

export function ImageUploadDropzone({
  inputId,
  onFileChange,
  onFilesChange,
  isDragging,
  onDraggingChange,
  multiple = false,
  ariaLabel,
  title,
  hint,
  formatHint,
  children,
  className = "",
}: ImageUploadDropzoneProps) {
  const { t } = useLanguage();

  const resolvedAriaLabel =
    ariaLabel ??
    (multiple ? t("upload.uploadImagesAria") : t("upload.uploadImageAria"));
  const resolvedTitle = title ?? t("upload.title");
  const resolvedHint = hint ?? t("upload.dropHint");

  return (
    <div
      className={`relative flex min-h-44 cursor-pointer flex-col items-center justify-center gap-3 rounded-sm border border-dashed p-5 transition-colors sm:min-h-48 sm:p-6 ${
        isDragging
          ? "border-accent bg-accent-muted"
          : "border-border bg-background hover:border-muted"
      } ${className}`}
      onDragEnter={(event) => {
        event.preventDefault();
        onDraggingChange(true);
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          onDraggingChange(false);
        }
      }}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        onDraggingChange(false);
        if (multiple && onFilesChange) {
          onFilesChange(event.dataTransfer.files);
        } else {
          onFileChange(event.dataTransfer.files[0] ?? null);
        }
      }}
    >
      <input
        id={inputId}
        type="file"
        accept="image/*"
        multiple={multiple}
        aria-label={resolvedAriaLabel}
        className="absolute inset-0 cursor-pointer opacity-0"
        onChange={(event) => {
          if (multiple && onFilesChange && event.target.files) {
            onFilesChange(event.target.files);
          } else {
            onFileChange(event.target.files?.[0] ?? null);
          }
          event.target.value = "";
        }}
      />
      {children ?? (
        <div className="pointer-events-none px-2 text-center">
          <p className="font-label text-muted">{resolvedTitle}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{resolvedHint}</p>
          {formatHint ? (
            <p className="mt-1 font-mono text-[10px] text-muted">{formatHint}</p>
          ) : null}
        </div>
      )}
    </div>
  );
}
