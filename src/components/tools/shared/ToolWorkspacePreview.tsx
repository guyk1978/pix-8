"use client";

import type { ReactNode } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";

interface ToolWorkspacePreviewProps {
  children: ReactNode;
  caption?: ReactNode;
  hint?: ReactNode;
  className?: string;
}

/** Main-workspace preview shell — image/canvas only, no configuration controls. */
export function ToolWorkspacePreview({
  children,
  caption,
  hint,
  className = "",
}: ToolWorkspacePreviewProps) {
  const { t } = useLanguage();

  return (
    <section className={`tool-workspace-zone tool-preview-zone text-start ${className}`.trim()}>
      <div className="mb-3 flex items-center justify-between gap-2 text-start">
        <span className="tool-zone-title text-start">{t("common.preview")}</span>
        {hint ? (
          <span className="text-end font-mono text-xs text-muted">{hint}</span>
        ) : null}
      </div>
      <div className="tool-preview-canvas sm:min-h-56">{children}</div>
      {caption ? (
        <p className="mt-3 text-center font-mono text-xs text-muted">{caption}</p>
      ) : null}
    </section>
  );
}
