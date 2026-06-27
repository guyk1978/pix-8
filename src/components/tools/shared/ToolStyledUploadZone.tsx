"use client";

import type { ReactNode } from "react";
import { CompactUploadContent } from "@/components/ui/CompactUploadContent";
import { useOptionalToolProjectContext } from "@/components/projects/ToolProjectContext";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { WorkflowStep } from "@/components/tools/workflow/WorkflowStep";
import { resolveUploadHeadline } from "@/lib/toolUploadCopy";
import type { ToolId } from "@/lib/tools";

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
  /** Resolve a tool-specific upload headline when `headline` is omitted. */
  toolId?: ToolId;
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
  formatHint,
  className = "",
  children,
  toolId,
  showExampleGallery = true,
}: ToolStyledUploadZoneProps) {
  const { t } = useLanguage();
  const contextToolId = useOptionalToolProjectContext()?.toolId;
  const resolvedToolId = toolId ?? contextToolId;
  const resolvedHeadline = resolveUploadHeadline(t, {
    headline,
    toolId: resolvedToolId,
    multiple,
  });

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
      <div className="tool-styled-upload-stage relative w-full">
        <div
          className={`tool-dropzone tool-styled-dropzone tool-upload-zone compact-upload-dropzone upload-card-dropzone relative flex w-full cursor-pointer items-center justify-center transition-all duration-300 ${
            compact ? "compact-upload-dropzone--tight" : ""
          } ${isDragging ? "tool-dropzone-active" : ""} ${className}`}
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
            className="sr-only"
            onChange={(event) => {
              handleFiles(event.target.files);
              event.target.value = "";
            }}
          />

          <CompactUploadContent
            inputId={inputId}
            headline={resolvedHeadline}
            formatHint={formatHint}
            isDragging={isDragging}
            multiple={multiple}
            showExamples={showExampleGallery}
            onExampleSelect={handleExampleSelect}
          >
            {children}
          </CompactUploadContent>
        </div>
      </div>
    </WorkflowStep>
  );
}
