"use client";

import type { ReactNode } from "react";
import { HelperCharacter } from "@/components/characters/HelperCharacter";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { WorkflowStep } from "@/components/tools/workflow/WorkflowStep";
import { CHARACTER_SIZES } from "@/lib/characters";

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
  const { t, dir } = useLanguage();

  const resolvedAriaLabel =
    ariaLabel ??
    (multiple ? t("upload.uploadImagesAria") : t("upload.uploadImageAria"));
  const resolvedTitle = title ?? t("upload.title");
  const resolvedHint = hint ?? t("upload.dropHint");
  const resolvedFormatHint = formatHint ?? t("upload.formatsHint");
  const characterSize = isDragging
    ? CHARACTER_SIZES.uploadActive
    : CHARACTER_SIZES.upload;

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

        {children ? (
          <div className="relative z-10 flex w-full flex-col items-center gap-4">
            <HelperCharacter
              character="uploadSmile"
              alt={t("characters.uploadAlt")}
              size={Math.round(characterSize * 0.88)}
              glow="upload"
              className={`mb-1 ${dir === "rtl" ? "-scale-x-100" : ""}`}
              animate="float"
            />
            {children}
          </div>
        ) : (
          <div className="pointer-events-none relative z-10 flex w-full flex-col items-center gap-4 text-center">
            <HelperCharacter
              character="uploadSmile"
              alt={t("characters.uploadAlt")}
              size={characterSize}
              glow="upload"
              className={`transition-transform duration-300 ${
                dir === "rtl" ? "-scale-x-100" : ""
              } ${isDragging ? "scale-110" : ""}`}
              animate={isDragging ? "wave" : "float"}
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
