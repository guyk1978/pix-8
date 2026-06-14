"use client";

import { UploadImageIcon } from "@/components/ui/UploadImageIcon";
import { useLanguage } from "@/components/i18n/LanguageProvider";

interface UploadZoneDefaultContentProps {
  headline?: string;
  hint?: string;
  hintBefore?: string;
  hintBrowse?: string;
  formatHint?: string;
  isDragging?: boolean;
  compact?: boolean;
}

function parseFormatTags(formatHint: string): string[] {
  return formatHint
    .split(/[·•|/]/)
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function UploadZoneDefaultContent({
  headline,
  hint,
  hintBefore,
  hintBrowse,
  formatHint,
  isDragging = false,
  compact = false,
}: UploadZoneDefaultContentProps) {
  const { t } = useLanguage();
  const resolvedHeadline = headline ?? t("upload.dropHeadline");
  const resolvedHintBefore = hintBefore ?? t("upload.dropHintBefore");
  const resolvedHintBrowse = hintBrowse ?? t("upload.dropHintBrowse");
  const resolvedFormatHint = formatHint ?? t("upload.formatsHint");
  const formatTags = parseFormatTags(resolvedFormatHint);

  return (
    <div
      className={`upload-zone-content pointer-events-none relative z-10 flex w-full flex-col items-center text-center ${
        compact ? "gap-3 px-4 py-6" : "gap-4 px-6 py-10 sm:px-12 sm:py-12"
      }`}
    >
      <UploadImageIcon
        className={`upload-zone-icon ${isDragging ? "upload-zone-icon--active" : ""}`}
      />

      <div className="space-y-2">
        <p
          className={`font-medium tracking-tight text-foreground ${
            compact ? "text-lg" : "text-xl sm:text-2xl"
          }`}
        >
          {resolvedHeadline}
        </p>

        {hint ? (
          <p className={`max-w-md text-muted ${compact ? "text-sm" : "text-base"}`}>
            {hint}
          </p>
        ) : (
          <p className={`max-w-md text-muted ${compact ? "text-sm" : "text-base"}`}>
            {resolvedHintBefore}
            <span className="upload-zone-browse">{resolvedHintBrowse}</span>
          </p>
        )}
      </div>

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
