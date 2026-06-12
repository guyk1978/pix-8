"use client";

import Link from "next/link";
import { LayoutGrid, X } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useId,
  useMemo,
  useState,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { getToolTranslationKey } from "@/i18n";
import { headerNavTabClass } from "@/components/layout/headerNavStyles";
import {
  APP_ROUTES,
  getAppsMenuEntries,
  getAppsMenuUncategorized,
  validateNavigationConfig,
} from "@/lib/navigationConfig";
import { isActiveHref } from "@/lib/routes";
import type { SidebarNavCategoryId } from "@/lib/sidebarNav";
import type { ToolId } from "@/lib/tools";

function EditorStudioIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function OptimizationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function DevToolsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
      <path d="M16 18 22 12l-6-6" />
      <path d="M8 6 2 12l6 6" />
    </svg>
  );
}

function EnhancementIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
      <path d="M12 3v2M12 19v2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M3 12h2M19 12h2M5.6 18.4l1.4-1.4M17 7l1.4-1.4" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

const CATEGORY_ICONS: Record<SidebarNavCategoryId, ReactNode> = {
  "editor-studio": <EditorStudioIcon />,
  optimization: <OptimizationIcon />,
  "dev-tools": <DevToolsIcon />,
  enhancement: <EnhancementIcon />,
};

interface AppsMenuProps {
  appsActive?: boolean;
}

export function AppsMenu({ appsActive = false }: AppsMenuProps) {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelId = useId();

  const categories = useMemo(() => getAppsMenuEntries(), []);
  const uncategorized = useMemo(() => getAppsMenuUncategorized(), []);
  const toolCount = useMemo(
    () =>
      categories.reduce((total, category) => total + category.tools.length, 0) +
      uncategorized.length,
    [categories, uncategorized],
  );

  const getToolName = (toolId: ToolId) =>
    t(getToolTranslationKey(toolId, "name"));

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const issues = validateNavigationConfig();
      if (issues.length > 0) {
        console.warn("[navigation]", issues.join("; "));
      }
    }
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const handleMenuLinkClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
    closeMenu();
  };

  const renderToolLink = (tool: { id: ToolId; href: string }) => {
    const active = isActiveHref(pathname, tool.href);

    return (
      <li key={tool.id}>
        <Link
          href={tool.href}
          prefetch
          onClick={handleMenuLinkClick}
          className={`apps-menu-link block rounded-md px-3 py-2 font-label text-[13px] ${
            active ? "apps-menu-link-active" : "text-muted"
          }`}
        >
          {getToolName(tool.id)}
        </Link>
      </li>
    );
  };

  const menuPortal =
    open && mounted
      ? createPortal(
          <>
            <button
              type="button"
              aria-label={t("header.closeApps")}
              className="apps-menu-backdrop fixed inset-0 z-[100] bg-black/50 backdrop-blur-[2px]"
              onClick={closeMenu}
            />

            <div
              id={panelId}
              role="dialog"
              aria-label={t("nav.apps")}
              className="apps-menu-panel pointer-events-auto fixed start-3 end-3 top-[3.75rem] z-[101] max-h-[min(78vh,42rem)] overflow-hidden rounded-xl sm:start-auto sm:end-6 sm:w-[min(92vw,56rem)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--glow-teal)]">
                    {t("nav.toolCategoriesLabel")}
                  </p>
                  <p className="font-label text-sm text-foreground">
                    {t("nav.apps")}{" "}
                    <span className="text-muted">({toolCount})</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeMenu}
                  className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface/80 hover:text-foreground"
                  aria-label={t("header.closeApps")}
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>

              <div className="grid max-h-[calc(min(78vh,42rem)-4rem)] gap-4 overflow-y-auto px-4 pb-4 sm:grid-cols-2">
                {categories.map((category) => (
                  <section
                    key={category.id}
                    className="rounded-lg bg-surface/30 p-3 shadow-[var(--shadow-elevated)]"
                  >
                    <Link
                      href={category.href}
                      prefetch
                      onClick={handleMenuLinkClick}
                      className="apps-menu-link mb-2 flex items-center gap-2 rounded-md px-2 py-2 font-label text-sm text-foreground"
                    >
                      <span className="text-[var(--glow-teal)]">
                        {CATEGORY_ICONS[category.id]}
                      </span>
                      {t(`nav.toolCategories.${category.id}`)}
                    </Link>

                    <ul className="space-y-0.5">
                      {category.tools.map((tool) => renderToolLink(tool))}
                    </ul>
                  </section>
                ))}

                {uncategorized.length > 0 ? (
                  <section className="rounded-lg bg-surface/30 p-3 shadow-[var(--shadow-elevated)] sm:col-span-2">
                    <p className="mb-2 px-2 font-label text-sm text-foreground">
                      {t("nav.tools")}
                    </p>
                    <ul className="space-y-0.5">
                      {uncategorized.map((tool) => renderToolLink(tool))}
                    </ul>
                  </section>
                ) : null}
              </div>

              <div className="px-5 py-3">
                <Link
                  href={APP_ROUTES.home}
                  prefetch
                  onClick={handleMenuLinkClick}
                  className="apps-menu-link inline-block rounded-md px-2 py-1.5 font-label text-xs text-muted"
                >
                  {t("nav.dashboard")} →
                </Link>
              </div>
            </div>
          </>,
          document.body,
        )
      : null;

  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
        className={`${headerNavTabClass(open || appsActive)} apps-menu-trigger`}
        title={t("header.openApps")}
      >
        <LayoutGrid className="header-nav-tab-icon" strokeWidth={1.75} aria-hidden />
        <span>{t("nav.apps")}</span>
      </button>

      {menuPortal}
    </div>
  );
}
