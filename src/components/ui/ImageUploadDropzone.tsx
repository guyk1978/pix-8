"use client";

import type { ReactNode } from "react";
import { UploadZoneDefaultContent } from "@/components/ui/UploadZoneDefaultContent";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { WorkflowStep } from "@/components/tools/workflow/WorkflowStep";

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

  return (
    <WorkflowStep step="upload">
        <div
        className={`tool-dropzone tool-upload-zone relative flex cursor-pointer flex-col items-center justify-center transition-all duration-300 sm:min-h-64 upload-card-dropzone ${
          isDragging ? "tool-dropzone-active" : ""
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
          className="sr-only"
          onChange={(event) => {
            if (multiple && onFilesChange && event.target.files) {
              onFilesChange(event.target.files);
            } else {
              onFileChange(event.target.files?.[0] ?? null);
            }
            event.target.value = "";
          }}
        />

        {children ? (
          <div className="relative z-10 flex w-full flex-col items-center gap-4 p-6 sm:p-10">
            {children}
          </div>
        ) : (
          <UploadZoneDefaultContent
            inputId={inputId}
            headline={title}
            hint={hint}
            formatHint={formatHint}
            isDragging={isDragging}
          />
        )}
      </div>
    </WorkflowStep>
  );
}
