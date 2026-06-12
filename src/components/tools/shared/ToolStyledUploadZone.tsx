"use client";

import type { ReactNode } from "react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { WorkflowStep } from "@/components/tools/workflow/WorkflowStep";

interface ToolStyledUploadZoneProps {
  inputId: string;
  onFileChange: (file: File | null) => void;
  onFilesChange?: (files: FileList) => void;
  isDragging: boolean;
  onDraggingChange: (dragging: boolean) => void;
  multiple?: boolean;
  compact?: boolean;
  ariaLabel?: string;
  headline?: string;
  hint?: string;
  formatHint?: string;
  className?: string;
  children?: ReactNode;
}

export function ToolStyledUploadZone({
  inputId,
  onFileChange,
  onFilesChange,
  isDragging,
  onDraggingChange,
  multiple = false,
  compact = false,
  ariaLabel,
  headline,
  hint,
  formatHint,
  className = "",
  children,
}: ToolStyledUploadZoneProps) {
  const { t } = useLanguage();
  const heightClass = compact
    ? "min-h-[8rem] sm:min-h-32"
    : "min-h-[15.5rem] sm:min-h-[17.5rem]";

  const handleFiles = (files: FileList | null | undefined) => {
    if (!files || files.length === 0) return;
    if (multiple && onFilesChange) {
      onFilesChange(files);
    } else {
      onFileChange(files[0] ?? null);
    }
  };

  return (
    <WorkflowStep step="upload">
      <div className="tool-styled-upload-stage relative w-full">
        <div
          className={`tool-dropzone tool-styled-dropzone relative flex w-full cursor-pointer items-stretch transition-all duration-300 ${heightClass} ${
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
            handleFiles(event.dataTransfer.files);
          }}
        >
          <input
            id={inputId}
            type="file"
            accept="image/*"
            multiple={multiple}
            aria-label={
              ariaLabel ??
              (multiple ? t("upload.uploadImagesAria") : t("upload.uploadImageAria"))
            }
            className="absolute inset-0 z-20 cursor-pointer opacity-0"
            onChange={(event) => {
              handleFiles(event.target.files);
              event.target.value = "";
            }}
          />

          {children ? (
            <div className="relative z-10 flex w-full flex-col items-center justify-center gap-3 px-6 py-8 sm:px-10">
              {children}
            </div>
          ) : (
            <div className="relative z-10 flex w-full flex-col items-center justify-center gap-4 px-6 py-10 text-center sm:px-12 sm:py-12">
              <BrandLogo size="lg" showGlow />
              <p className="text-xl font-medium tracking-tight text-foreground sm:text-2xl">
                {headline ?? t("upload.dropHeadline")}
              </p>
              <p className="max-w-md text-base text-muted">
                {hint ?? t("upload.dropHint")}
              </p>
              <p className="mt-2 font-mono text-xs text-muted/90">
                {formatHint ?? t("upload.formatsHint")}
              </p>
            </div>
          )}
        </div>
      </div>
    </WorkflowStep>
  );
}
