"use client";

import type { ReactNode } from "react";
import { useOptionalToolSidebar } from "@/components/layout/ToolSidebarContext";
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
  const embeddedToolbarLayout =
    useOptionalToolSidebar()?.embeddedToolbarLayout ?? false;

  if (embeddedToolbarLayout) {
    return (
      <section
        className={`embedded-preview-zone flex min-h-0 flex-1 flex-col text-start ${className}`.trim()}
      >
        <div className="embedded-preview-canvas transparency-checkerboard flex min-h-0 flex-1 items-center justify-center p-3 sm:p-6">
          {children}
        </div>
        {caption ? (
          <p className="embedded-preview-caption shrink-0 border-t border-border bg-card px-4 py-2 text-center font-mono text-xs text-muted">
            {caption}
          </p>
        ) : null}
      </section>
    );
  }

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
