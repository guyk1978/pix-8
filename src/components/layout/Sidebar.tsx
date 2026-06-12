"use client";

import Link from "next/link";
import { Folder, Star } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { SidebarProgressTracker } from "@/components/layout/SidebarProgressTracker";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { getToolTranslationKey } from "@/i18n";
import { JOIN_MY_PDF_URL } from "@/lib/external-links";
import { getToolCategoryHref } from "@/lib/toolCategoryPages";
import {
  findSidebarCategoryForPath,
  getSidebarCategoryTools,
  SIDEBAR_CATEGORY_IDS,
  SIDEBAR_NAV_CATEGORIES,
  type SidebarNavCategoryId,
} from "@/lib/sidebarNav";
import type { ToolId } from "@/lib/tools";

function NavIcon({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-4 w-4 shrink-0 text-muted">{children}</span>
  );
}

function DashboardIcon() {
  return (
    <NavIcon>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    </NavIcon>
  );
}

function FavoritesIcon() {
  return (
    <NavIcon>
      <Star strokeWidth={1.5} className="h-4 w-4" />
    </NavIcon>
  );
}

function ProjectsIcon() {
  return (
    <NavIcon>
      <Folder strokeWidth={1.5} className="h-4 w-4" />
    </NavIcon>
  );
}

function BlogIcon() {
  return (
    <NavIcon>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 6h16M4 12h10M4 18h16" />
      </svg>
    </NavIcon>
  );
}

function SettingsIcon() {
  return (
    <NavIcon>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    </NavIcon>
  );
}

function EditorStudioIcon() {
  return (
    <NavIcon>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
    </NavIcon>
  );
}

function OptimizationIcon() {
  return (
    <NavIcon>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    </NavIcon>
  );
}

function DevToolsIcon() {
  return (
    <NavIcon>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 18 22 12l-6-6" />
        <path d="M8 6 2 12l6 6" />
      </svg>
    </NavIcon>
  );
}

function EnhancementIcon() {
  return (
    <NavIcon>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3v2M12 19v2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M3 12h2M19 12h2M5.6 18.4l1.4-1.4M17 7l1.4-1.4" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    </NavIcon>
  );
}

const CATEGORY_ICONS: Record<SidebarNavCategoryId, ReactNode> = {
  "editor-studio": <EditorStudioIcon />,
  optimization: <OptimizationIcon />,
  "dev-tools": <DevToolsIcon />,
  enhancement: <EnhancementIcon />,
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={`sidebar-section-chevron h-3 w-3 shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function SidebarToggleIcon({ collapsed, rtl }: { collapsed: boolean; rtl: boolean }) {
  const pointsInward = collapsed ? !rtl : rtl;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-4 w-4"
      aria-hidden
    >
      {pointsInward ? (
        <path d="M9 6l6 6-6 6M4 6v12" />
      ) : (
        <path d="M15 6l-6 6 6 6M20 6v12" />
      )}
    </svg>
  );
}

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

function NavItem({
  href,
  label,
  icon,
  active,
  collapsed,
  onNavigate,
}: {
  href: string;
  label: string;
  icon: ReactNode;
  active: boolean;
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      title={collapsed ? label : undefined}
      className={`flex items-center rounded-sm border font-label transition-colors ${
        collapsed ? "justify-center px-2 py-2.5" : "gap-3 px-3 py-2.5"
      } ${
        active
          ? "border-border bg-surface text-foreground"
          : "border-transparent text-muted hover:border-border hover:bg-surface hover:text-foreground"
      }`}
    >
      {icon}
      <span className="sidebar-nav-label">{label}</span>
    </Link>
  );
}

function NestedLink({
  href,
  label,
  active,
  onNavigate,
}: {
  href: string;
  label: string;
  active: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`sidebar-nested block rounded-sm border border-transparent py-1.5 pe-3 ps-3 font-mono text-[11px] leading-snug transition-colors ${
        active
          ? "border-border bg-surface text-foreground shadow-[inset_2px_0_0_var(--glow-teal)]"
          : "text-muted hover:border-border hover:bg-surface/80 hover:text-foreground"
      }`}
    >
      {label}
    </Link>
  );
}

function CategorySection({
  categoryId,
  label,
  icon,
  open,
  active,
  collapsed,
  onToggle,
  onExpandSidebar,
  onNavigate,
  children,
}: {
  categoryId: SidebarNavCategoryId;
  label: string;
  icon: ReactNode;
  open: boolean;
  active: boolean;
  collapsed: boolean;
  onToggle: () => void;
  onExpandSidebar: () => void;
  onNavigate?: () => void;
  children: ReactNode;
}) {
  const categoryHref = getToolCategoryHref(categoryId);

  if (collapsed) {
    return (
      <div className="sidebar-category-group">
        <Link
          href={categoryHref}
          onClick={onNavigate}
          title={label}
          className={`sidebar-category-header flex w-full items-center justify-center rounded-sm border border-border/50 bg-surface/30 px-2 py-2 font-label text-muted backdrop-blur-sm transition-colors hover:border-border hover:bg-surface/60 hover:text-foreground ${
            active ? "border-border bg-surface text-foreground" : ""
          }`}
        >
          {icon}
        </Link>
      </div>
    );
  }

  return (
    <div className="sidebar-category-group">
      <div
        className={`sidebar-category-header flex w-full items-center rounded-sm border border-border/50 bg-surface/30 font-label text-muted backdrop-blur-sm transition-colors hover:border-border hover:bg-surface/60 ${
          active ? "border-border bg-surface text-foreground" : ""
        }`}
      >
        <Link
          href={categoryHref}
          onClick={onNavigate}
          className="flex min-w-0 flex-1 items-center gap-2 px-2.5 py-2 text-muted transition-colors hover:text-foreground"
        >
          {icon}
          <span className="sidebar-nav-label truncate text-start text-[11px] tracking-wide">
            {label}
          </span>
        </Link>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-label={label}
          className="flex h-full shrink-0 items-center px-2 py-2 text-muted transition-colors hover:text-foreground"
        >
          <ChevronIcon open={open} />
        </button>
      </div>
      {open ? (
        <div className="sidebar-category-tools mt-1 space-y-0.5">{children}</div>
      ) : null}
    </div>
  );
}

function createInitialCategoryState(): Record<SidebarNavCategoryId, boolean> {
  return SIDEBAR_CATEGORY_IDS.reduce(
    (state, categoryId) => {
      state[categoryId] = true;
      return state;
    },
    {} as Record<SidebarNavCategoryId, boolean>,
  );
}

export function Sidebar({
  mobileOpen,
  onMobileClose,
  collapsed,
  onToggleCollapse,
}: SidebarProps) {
  const pathname = usePathname();
  const { t, dir } = useLanguage();
  const [categoryOpen, setCategoryOpen] = useState(createInitialCategoryState);
  const isRtl = dir === "rtl";

  const getToolName = (toolId: ToolId) =>
    t(getToolTranslationKey(toolId, "name"));

  const activeCategoryId = useMemo(
    () => findSidebarCategoryForPath(pathname),
    [pathname],
  );

  useEffect(() => {
    if (!activeCategoryId) return;

    setCategoryOpen((current) => ({
      ...current,
      [activeCategoryId]: true,
    }));
  }, [activeCategoryId]);

  const sidebarContent = (
    <>
      <div
        className={`relative flex h-14 shrink-0 items-center border-b border-border ${
          collapsed ? "justify-center px-1" : "justify-between px-3"
        }`}
      >
        {!collapsed ? (
          <Link
            href="/"
            onClick={onMobileClose}
            className="flex min-w-0 items-baseline gap-1 transition-opacity hover:opacity-80"
          >
            <span className="font-mono text-base font-medium text-foreground">
              pix
            </span>
            <span className="font-mono text-base font-medium text-muted">-8</span>
          </Link>
        ) : null}

        <button
          type="button"
          onClick={onToggleCollapse}
          className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-border text-muted transition-colors hover:border-muted hover:text-foreground lg:inline-flex"
          aria-label={
            collapsed ? t("nav.expandSidebar") : t("nav.collapseSidebar")
          }
          title={collapsed ? t("nav.expandSidebar") : t("nav.collapseSidebar")}
        >
          <SidebarToggleIcon collapsed={collapsed} rtl={isRtl} />
        </button>
      </div>

      <SidebarProgressTracker collapsed={collapsed} />

      <nav
        className={`flex flex-1 flex-col gap-1 overflow-x-hidden overflow-y-auto ${
          collapsed ? "p-2" : "p-3"
        }`}
      >
        <NavItem
          href="/"
          label={t("nav.dashboard")}
          icon={<DashboardIcon />}
          active={pathname === "/"}
          collapsed={collapsed}
          onNavigate={onMobileClose}
        />

        <NavItem
          href="/blog"
          label={t("nav.blog")}
          icon={<BlogIcon />}
          active={pathname === "/blog" || pathname.startsWith("/articles/")}
          collapsed={collapsed}
          onNavigate={onMobileClose}
        />

        <NavItem
          href="/favorites"
          label={t("nav.favorites")}
          icon={<FavoritesIcon />}
          active={pathname === "/favorites"}
          collapsed={collapsed}
          onNavigate={onMobileClose}
        />

        <NavItem
          href="/projects"
          label={t("nav.projects")}
          icon={<ProjectsIcon />}
          active={pathname === "/projects"}
          collapsed={collapsed}
          onNavigate={onMobileClose}
        />

        <div className={collapsed ? "mt-1 space-y-1" : "mt-3 space-y-2"}>
          {!collapsed ? (
            <p className="px-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              {t("nav.toolCategoriesLabel")}
            </p>
          ) : null}

          {SIDEBAR_NAV_CATEGORIES.map((category) => (
            <CategorySection
              key={category.id}
              categoryId={category.id}
              label={t(`nav.toolCategories.${category.id}`)}
              icon={CATEGORY_ICONS[category.id]}
              open={categoryOpen[category.id]}
              active={activeCategoryId === category.id}
              collapsed={collapsed}
              onNavigate={onMobileClose}
              onToggle={() =>
                setCategoryOpen((current) => ({
                  ...current,
                  [category.id]: !current[category.id],
                }))
              }
              onExpandSidebar={() => {
                onToggleCollapse();
                setCategoryOpen((current) => ({
                  ...current,
                  [category.id]: true,
                }));
              }}
            >
              {getSidebarCategoryTools(category).map((tool) => (
                <NestedLink
                  key={tool.id}
                  href={tool.href}
                  label={getToolName(tool.id)}
                  active={pathname === tool.href}
                  onNavigate={onMobileClose}
                />
              ))}
            </CategorySection>
          ))}
        </div>
      </nav>

      <div className={`border-t border-border ${collapsed ? "p-2" : "p-3"}`}>
        <a
          href={JOIN_MY_PDF_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="sidebar-footer-detail mb-2 block rounded-sm border border-border bg-card px-3 py-2.5 transition-colors hover:border-muted hover:bg-surface"
        >
          <span className="block font-label text-xs text-foreground">
            {t("nav.joinMyPdf")}
          </span>
          <span className="mt-1 block font-mono text-[10px] text-muted">
            JoinMyPDF →
          </span>
        </a>

        <NavItem
          href="/settings"
          label={t("nav.settings")}
          icon={<SettingsIcon />}
          active={pathname === "/settings"}
          collapsed={collapsed}
          onNavigate={onMobileClose}
        />
        <p className="sidebar-footer-detail px-3 pt-3 font-mono text-[10px] text-muted">
          {t("nav.zeroUploads")}
        </p>
      </div>
    </>
  );

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label={t("header.closeNav")}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        data-collapsed={collapsed ? "true" : "false"}
        className={`sidebar-shell fixed inset-y-0 start-0 z-50 flex w-60 shrink-0 flex-col overflow-hidden border-e border-border bg-sidebar transition-transform lg:static lg:translate-x-0 ${
          collapsed ? "lg:w-[60px]" : "lg:w-60"
        } ${
          mobileOpen
            ? "translate-x-0"
            : "max-lg:-translate-x-full max-lg:rtl:translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
