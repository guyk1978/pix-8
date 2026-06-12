"use client";

import Link from "next/link";
import { Folder, Star } from "lucide-react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { JOIN_MY_PDF_URL } from "@/lib/external-links";
import { APP_ROUTES } from "@/lib/navigationConfig";
import { isActiveHref } from "@/lib/routes";

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
      prefetch
      onClick={onNavigate}
      title={collapsed ? label : undefined}
      className={`sidebar-nav-link flex items-center rounded-md font-label ${
        collapsed ? "justify-center px-2 py-2.5" : "gap-3 px-3 py-2.5"
      } ${active ? "sidebar-nav-link-active" : "text-muted"}`}
    >
      {icon}
      <span className="sidebar-nav-label">{label}</span>
    </Link>
  );
}

interface NavigationSidebarContentProps {
  collapsed: boolean;
  onMobileClose: () => void;
  onToggleCollapse: () => void;
}

export function NavigationSidebarContent({
  collapsed,
  onMobileClose,
  onToggleCollapse,
}: NavigationSidebarContentProps) {
  const pathname = usePathname();
  const { t, dir } = useLanguage();
  const isRtl = dir === "rtl";

  return (
    <>
      <div
        className={`relative flex h-14 shrink-0 items-center ${
          collapsed ? "justify-center px-1" : "justify-between px-3"
        }`}
      >
        {!collapsed ? (
          <Link
            href={APP_ROUTES.home}
            prefetch
            onClick={onMobileClose}
            className="flex min-w-0 items-baseline gap-1 transition-opacity hover:opacity-80"
          >
            <span className="font-mono text-base font-medium text-foreground">pix</span>
            <span className="font-mono text-base font-medium text-muted">-8</span>
          </Link>
        ) : null}

        <button
          type="button"
          onClick={onToggleCollapse}
          className="sidebar-icon-button hidden h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted lg:inline-flex"
          aria-label={
            collapsed ? t("nav.expandSidebar") : t("nav.collapseSidebar")
          }
          title={collapsed ? t("nav.expandSidebar") : t("nav.collapseSidebar")}
        >
          <SidebarToggleIcon collapsed={collapsed} rtl={isRtl} />
        </button>
      </div>

      <nav
        className={`flex flex-1 flex-col gap-2 overflow-x-hidden overflow-y-auto ${
          collapsed ? "p-2" : "p-3"
        }`}
      >
        <NavItem
          href={APP_ROUTES.home}
          label={t("nav.dashboard")}
          icon={<DashboardIcon />}
          active={isActiveHref(pathname, APP_ROUTES.home)}
          collapsed={collapsed}
          onNavigate={onMobileClose}
        />

        <NavItem
          href={APP_ROUTES.blog}
          label={t("nav.blog")}
          icon={<BlogIcon />}
          active={
            isActiveHref(pathname, APP_ROUTES.blog) ||
            pathname.startsWith("/articles/")
          }
          collapsed={collapsed}
          onNavigate={onMobileClose}
        />

        <NavItem
          href={APP_ROUTES.favorites}
          label={t("nav.favorites")}
          icon={<FavoritesIcon />}
          active={isActiveHref(pathname, APP_ROUTES.favorites)}
          collapsed={collapsed}
          onNavigate={onMobileClose}
        />

        <NavItem
          href={APP_ROUTES.projects}
          label={t("nav.projects")}
          icon={<ProjectsIcon />}
          active={isActiveHref(pathname, APP_ROUTES.projects)}
          collapsed={collapsed}
          onNavigate={onMobileClose}
        />
      </nav>

      <div className={collapsed ? "p-2" : "p-3"}>
        <a
          href={JOIN_MY_PDF_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="sidebar-footer-detail sidebar-footer-card mb-2 block rounded-lg px-3 py-2.5"
        >
          <span className="block font-label text-xs text-foreground">
            {t("nav.joinMyPdf")}
          </span>
          <span className="mt-1 block font-mono text-[10px] text-muted">
            JoinMyPDF →
          </span>
        </a>

        <NavItem
          href={APP_ROUTES.settings}
          label={t("nav.settings")}
          icon={<SettingsIcon />}
          active={isActiveHref(pathname, APP_ROUTES.settings)}
          collapsed={collapsed}
          onNavigate={onMobileClose}
        />
        <p className="sidebar-footer-detail px-3 pt-3 font-mono text-[10px] text-muted">
          {t("nav.zeroUploads")}
        </p>
      </div>
    </>
  );
}
