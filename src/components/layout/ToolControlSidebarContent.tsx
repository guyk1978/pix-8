"use client";

import { ToolSidebarStarRating } from "@/components/tools/ToolSidebarStarRating";
import { AppLink } from "@/components/layout/AppLink";
import { useToolSidebar } from "@/components/layout/ToolSidebarContext";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { APP_ROUTES } from "@/lib/navigationConfig";

export function ToolControlSidebarContent() {
  const { t, dir } = useLanguage();
  const { toolName, toolTag, activeSlotCount, setControlsContainer, footerActions } =
    useToolSidebar();

  return (
    <div className="flex min-h-0 flex-col text-start" dir={dir}>
      {toolName ? (
        <header className="tool-sidebar-header shrink-0 px-5 pb-5 pt-5 text-start">
          <p className="tool-sidebar-category font-label text-[11px] uppercase tracking-[0.12em] text-[var(--glow-teal)]">
            {toolTag ?? t("toolSidebar.eyebrow")}
          </p>
          <h2 className="tool-sidebar-title mt-2 truncate text-2xl font-bold leading-none tracking-tight text-foreground">
            {toolName}
          </h2>
          <div className="mt-3">
            <ToolSidebarStarRating />
          </div>
        </header>
      ) : null}

      <div
        className="tool-sidebar-controls flex flex-col overflow-x-hidden px-5 py-3 text-start"
        dir={dir}
      >
        <div
          ref={setControlsContainer}
          className="tool-sidebar-slot-stack flex min-h-0 w-full min-w-0 flex-1 flex-col items-stretch gap-6 text-start"
          dir={dir}
        >
          {activeSlotCount === 0 ? (
            <p className="tool-sidebar-empty px-0 py-6 text-start text-sm leading-relaxed text-muted">
              {t("toolSidebar.empty")}
            </p>
          ) : null}
        </div>

        {footerActions ? (
          <div className="mt-5 space-y-2 pt-2">{footerActions}</div>
        ) : null}
      </div>

      <div className="shrink-0 p-4 text-start">
        <AppLink
          href={APP_ROUTES.home}
          className="sidebar-back-link flex min-h-11 w-full items-center justify-center rounded-lg px-3 py-2.5 text-base text-muted"
        >
          {t("toolSidebar.backToDashboard")}
        </AppLink>
      </div>
    </div>
  );
}
