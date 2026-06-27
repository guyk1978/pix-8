"use client";

import { UploadImageIcon } from "@/components/ui/UploadImageIcon";
import { useLanguage } from "@/components/i18n/LanguageProvider";

interface UploadZoneDefaultContentProps {
  inputId: string;
  headline?: string;
  hint?: string;
  hintBefore?: string;
  hintBrowse?: string;
  formatHint?: string;
  isDragging?: boolean;
  compact?: boolean;
  showUploadButton?: boolean;
}

function parseFormatTags(formatHint: string): string[] {
  return formatHint
    .split(/[·•|/]/)
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function UploadZoneDefaultContent({
  inputId,
  headline,
  hint,
  hintBefore,
  hintBrowse,
  formatHint,
  isDragging = false,
  compact = false,
  showUploadButton = true,
}: UploadZoneDefaultContentProps) {
  const { t } = useLanguage();
  const resolvedHeadline = headline ?? t("upload.dropHeadline");
  const resolvedHint = hint ?? t("editor.upload.hint");
  const resolvedHintBefore = hintBefore ?? t("upload.dropHintBefore");
  const resolvedHintBrowse = hintBrowse ?? t("upload.dropHintBrowse");
  const resolvedFormatHint = formatHint ?? t("upload.formatsHint");
  const formatTags = parseFormatTags(resolvedFormatHint);

  return (
    <div
      className={`upload-zone-content pointer-events-none relative z-10 flex w-full flex-col items-center text-center ${
        compact ? "gap-3 px-4 py-6" : "gap-5 px-6 py-10 sm:px-10 sm:py-12"
      }`}
    >
      <UploadImageIcon
        className={`upload-zone-icon ${isDragging ? "upload-zone-icon--active" : ""}`}
      />

      <div className="upload-zone-copy space-y-2">
        <p
          className={`upload-zone-headline font-semibold tracking-tight ${
            compact ? "text-lg" : "text-xl sm:text-[1.65rem]"
          }`}
        >
          {resolvedHeadline}
        </p>

        {hint ? (
          <p
            className={`upload-zone-subtext mx-auto max-w-sm leading-relaxed ${
              compact ? "text-sm" : "text-sm sm:text-[0.9375rem]"
            }`}
          >
            {resolvedHint}
          </p>
        ) : (
          <p
            className={`upload-zone-subtext mx-auto max-w-sm leading-relaxed ${
              compact ? "text-sm" : "text-sm sm:text-[0.9375rem]"
            }`}
          >
            {resolvedHintBefore}
            <span className="upload-zone-browse">{resolvedHintBrowse}</span>
          </p>
        )}
      </div>

      {showUploadButton ? (
        <label htmlFor={inputId} className="upload-zone-button-label pointer-events-auto">
          <span className="upload-zone-button">{t("upload.uploadButton")}</span>
        </label>
      ) : null}

      <div className="upload-zone-format-tags" aria-label={t("upload.formatsLabel")}>
        {formatTags.map((tag) => (
          <span key={tag} className="upload-zone-format-tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
