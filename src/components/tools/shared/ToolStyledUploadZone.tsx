"use client";

import type { ReactNode } from "react";
import { ImageGallery } from "@/components/ui/ImageGallery";
import { UploadZoneDefaultContent } from "@/components/ui/UploadZoneDefaultContent";
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
  /** Show sample images from public/examples/ below the dropzone (single-file mode only). */
  showExampleGallery?: boolean;
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
  showExampleGallery = true,
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

  const handleExampleSelect = (file: File) => {
    onFileChange(file);
  };

  return (
    <WorkflowStep step="upload">
      <div className="tool-styled-upload-stage relative w-full space-y-4">
        <div
          className={`tool-dropzone tool-styled-dropzone tool-upload-zone relative flex w-full cursor-pointer items-stretch transition-all duration-300 ${heightClass} ${
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
            <UploadZoneDefaultContent
              headline={headline}
              hint={hint}
              formatHint={formatHint}
              isDragging={isDragging}
              compact={compact}
            />
          )}
        </div>

        {!multiple && showExampleGallery ? (
          <ImageGallery
            onFileSelect={handleExampleSelect}
            disabled={isDragging}
          />
        ) : null}
      </div>
    </WorkflowStep>
  );
}
