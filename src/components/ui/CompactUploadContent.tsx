"use client";

import type { ReactNode } from "react";
import { ExampleImageStrip } from "@/components/ui/ExampleImageStrip";
import { useLanguage } from "@/components/i18n/LanguageProvider";

interface CompactUploadContentProps {
  inputId: string;
  headline: string;
  formatHint?: string;
  isDragging?: boolean;
  multiple?: boolean;
  showExamples?: boolean;
  onExampleSelect?: (file: File) => void;
  children?: ReactNode;
}

export function CompactUploadContent({
  inputId,
  headline,
  formatHint,
  isDragging = false,
  multiple = false,
  showExamples = true,
  onExampleSelect,
  children,
}: CompactUploadContentProps) {
  const { t } = useLanguage();

  if (children) {
    return (
      <div className="compact-upload-panel compact-upload-panel--custom relative z-10">
        {children}
      </div>
    );
  }

  return (
    <div
      className={`compact-upload-panel relative z-10 ${
        isDragging ? "compact-upload-panel--dragging" : ""
      }`}
    >
      <p className="compact-upload-headline">{headline}</p>

      <label htmlFor={inputId} className="compact-upload-button-label">
        <span className="compact-upload-button">
          {multiple ? t("upload.addToBatch") : t("upload.uploadButton")}
        </span>
      </label>

      <p className="compact-upload-drop-hint">{t("upload.orDropFile")}</p>

      {formatHint ? (
        <p className="compact-upload-format">{formatHint}</p>
      ) : null}

      {!multiple && showExamples && onExampleSelect ? (
        <ExampleImageStrip
          onFileSelect={onExampleSelect}
          disabled={isDragging}
          className="compact-upload-examples"
        />
      ) : null}
    </div>
  );
}
