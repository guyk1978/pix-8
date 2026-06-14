"use client";

import { AppLink } from "@/components/layout/AppLink";
import { BrandLogo, brandLogoAriaLabel } from "@/components/brand/BrandLogo";
import { useToolSidebar } from "@/components/layout/ToolSidebarContext";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { APP_ROUTES } from "@/lib/navigationConfig";

export function ToolControlSidebarContent() {
  const { t, dir } = useLanguage();
  const { toolName, toolTag, activeSlotCount, setControlsContainer, footerActions } =
    useToolSidebar();

  return (
    <div className="flex min-h-0 flex-col text-start" dir={dir}>
      <div className="flex shrink-0 items-center justify-start px-5 py-4 text-start">
        <AppLink
          href={APP_ROUTES.home}
          className="transition-opacity hover:opacity-80"
          aria-label={brandLogoAriaLabel(t)}
        >
          <BrandLogo size="sm" />
        </AppLink>
      </div>

      {toolName ? (
        <div className="shrink-0 px-5 pb-3 text-start">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--glow-teal)]">
            {toolTag ?? t("toolSidebar.eyebrow")}
          </p>
          <p className="mt-1 truncate text-xl font-semibold leading-snug text-foreground">
            {toolName}
          </p>
        </div>
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
            <p className="px-2 py-5 text-center text-base leading-relaxed text-muted">
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
