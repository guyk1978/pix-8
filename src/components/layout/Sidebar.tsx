"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SidebarProgressTracker } from "@/components/layout/SidebarProgressTracker";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { getToolTranslationKey } from "@/i18n";
import { JOIN_MY_PDF_URL } from "@/lib/external-links";
import { tools, type ToolCategory, type ToolId } from "@/lib/tools";

const SIDEBAR_TOOLS_CATEGORIES: ToolCategory[] = [
  "basic-editing",
  "optimization",
];
const SIDEBAR_ADVANCED_CATEGORIES: ToolCategory[] = ["advanced"];

function NavIcon({ children }: { children: React.ReactNode }) {
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

function ToolsIcon() {
  return (
    <NavIcon>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    </NavIcon>
  );
}

function AdvancedIcon() {
  return (
    <NavIcon>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="3" />
      </svg>
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

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={`sidebar-section-chevron h-3.5 w-3.5 shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
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
  icon: React.ReactNode;
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
      className={`sidebar-nested block rounded-sm border border-transparent py-2 ps-9 pe-3 font-mono text-xs transition-colors ${
        active
          ? "border-border bg-surface text-foreground"
          : "text-muted hover:border-border hover:bg-surface hover:text-foreground"
      }`}
    >
      {label}
    </Link>
  );
}

function ExpandableSection({
  label,
  icon,
  open,
  collapsed,
  onToggle,
  onExpandSidebar,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  open: boolean;
  collapsed: boolean;
  onToggle: () => void;
  onExpandSidebar: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <button
        type="button"
        title={collapsed ? label : undefined}
        onClick={() => {
          if (collapsed) {
            onExpandSidebar();
            return;
          }
          onToggle();
        }}
        className={`flex w-full items-center rounded-sm border border-transparent font-label text-muted transition-colors hover:border-border hover:bg-surface hover:text-foreground ${
          collapsed ? "justify-center px-2 py-2.5" : "gap-3 px-3 py-2.5"
        }`}
      >
        {icon}
        <span className="sidebar-nav-label flex-1 text-start">{label}</span>
        <ChevronIcon open={open} />
      </button>
      {open && <div className="mt-1 space-y-0.5">{children}</div>}
    </div>
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
  const [toolsOpen, setToolsOpen] = useState(true);
  const [advancedOpen, setAdvancedOpen] = useState(true);
  const isRtl = dir === "rtl";

  const getToolName = (toolId: ToolId) => t(getToolTranslationKey(toolId, "name"));

  const toolsNav = tools.filter((tool) =>
    SIDEBAR_TOOLS_CATEGORIES.includes(tool.category),
  );
  const advancedNav = tools.filter((tool) =>
    SIDEBAR_ADVANCED_CATEGORIES.includes(tool.category),
  );

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

        <div className={collapsed ? "" : "mt-2"}>
          <ExpandableSection
            label={t("nav.tools")}
            icon={<ToolsIcon />}
            open={toolsOpen}
            collapsed={collapsed}
            onToggle={() => setToolsOpen((current) => !current)}
            onExpandSidebar={() => {
              onToggleCollapse();
              setToolsOpen(true);
            }}
          >
            {toolsNav.map((tool) => (
              <NestedLink
                key={tool.id}
                href={tool.href}
                label={getToolName(tool.id)}
                active={pathname === tool.href}
                onNavigate={onMobileClose}
              />
            ))}
          </ExpandableSection>
        </div>

        <ExpandableSection
          label={t("nav.advanced")}
          icon={<AdvancedIcon />}
          open={advancedOpen}
          collapsed={collapsed}
          onToggle={() => setAdvancedOpen((current) => !current)}
          onExpandSidebar={() => {
            onToggleCollapse();
            setAdvancedOpen(true);
          }}
        >
          {advancedNav.map((tool) => (
            <NestedLink
              key={tool.id}
              href={tool.href}
              label={getToolName(tool.id)}
              active={pathname === tool.href}
              onNavigate={onMobileClose}
            />
          ))}
        </ExpandableSection>
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
