"use client";

import type { ReactNode } from "react";
import { HelperCharacter } from "@/components/characters/HelperCharacter";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { WorkflowStep } from "@/components/tools/workflow/WorkflowStep";
import { CHARACTER_SIZES } from "@/lib/characters";

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
  const { t, dir } = useLanguage();
  const characterSize = isDragging
    ? CHARACTER_SIZES.uploadActive
    : CHARACTER_SIZES.upload;
  const heightClass = compact
    ? "min-h-[8rem] sm:min-h-32"
    : "min-h-[15.5rem] sm:min-h-[17.5rem]";
  const uploadGuideClass = `pointer-events-none absolute top-1/2 z-10 -translate-y-1/2 ${
    dir === "rtl"
      ? "left-1/2 translate-x-[3.75rem] sm:translate-x-[4.5rem]"
      : "left-1/2 -translate-x-[calc(100%+3.75rem)] sm:-translate-x-[calc(100%+4.5rem)]"
  }`;

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
      <div className="tool-styled-upload-stage relative overflow-visible">
        <div
          className={`tool-dropzone tool-styled-dropzone relative flex cursor-pointer items-stretch overflow-visible transition-all duration-300 ${heightClass} ${
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
            <>
              <div className={uploadGuideClass} dir="ltr">
                <HelperCharacter
                  character="uploadWithArrow"
                  alt={t("characters.uploadSmileAlt")}
                  size={characterSize}
                  glow="soft"
                  pixelated
                  className={`transition-transform duration-300 ${
                    dir === "rtl" ? "-scale-x-100" : ""
                  } ${isDragging ? "scale-110" : ""}`}
                  animate={isDragging ? "wave" : "float"}
                />
              </div>
              <div className="relative z-10 flex w-full flex-col items-center justify-center gap-3 px-4 py-8 sm:px-16">
                {children}
              </div>
            </>
          ) : (
            <>
              <div className={uploadGuideClass} dir="ltr">
                <HelperCharacter
                  character="uploadWithArrow"
                  alt={t("characters.uploadSmileAlt")}
                  size={characterSize}
                  glow="soft"
                  pixelated
                  className={`transition-transform duration-300 ${
                    dir === "rtl" ? "-scale-x-100" : ""
                  } ${isDragging ? "scale-110" : ""}`}
                  animate={isDragging ? "wave" : "float"}
                />
              </div>
              <div className="relative z-10 flex w-full flex-col items-center justify-center gap-3 px-4 py-8 text-center sm:px-16 sm:py-9">
                <p className="text-lg font-medium tracking-tight text-foreground sm:text-xl">
                  {headline ?? t("upload.dropHeadline")}
                </p>
                <p className="max-w-md text-sm text-foreground/75 sm:text-base">
                  {hint ?? t("upload.dropHint")}
                </p>
                <p className="mt-1 font-mono text-[10px] text-muted/80 sm:text-xs">
                  {formatHint ?? t("upload.formatsHint")}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </WorkflowStep>
  );
}
