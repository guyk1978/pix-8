"use client";

import type { ReactNode } from "react";
import { BrandLogo } from "@/components/brand/BrandLogo";
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
  const resolvedTitle = title ?? t("upload.title");
  const resolvedHint = hint ?? t("upload.dropHint");
  const resolvedFormatHint = formatHint ?? t("upload.formatsHint");

  return (
    <WorkflowStep step="upload">
      <div
        className={`tool-dropzone relative flex cursor-pointer flex-col items-center justify-center gap-3 p-6 transition-all duration-300 sm:min-h-64 sm:p-10 ${
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
          className="absolute inset-0 z-20 cursor-pointer opacity-0"
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
          <div className="relative z-10 flex w-full flex-col items-center gap-4">
            <BrandLogo size="lg" showGlow className={isDragging ? "scale-105 transition-transform" : ""} />
            {children}
          </div>
        ) : (
          <div className="pointer-events-none relative z-10 flex w-full flex-col items-center gap-4 text-center">
            <BrandLogo
              size="lg"
              showGlow
              className={`transition-transform duration-300 ${isDragging ? "scale-105" : ""}`}
            />

            <div>
              <p className="text-base font-medium text-foreground sm:text-lg">
                {resolvedHint}
              </p>
              <p className="mt-1 font-label text-muted">{resolvedTitle}</p>
              <p className="mt-2 font-mono text-[10px] text-muted">
                {resolvedFormatHint}
              </p>
            </div>
          </div>
        )}
      </div>
    </WorkflowStep>
  );
}
