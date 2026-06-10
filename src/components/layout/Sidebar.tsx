"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { JOIN_MY_PDF_URL } from "@/lib/external-links";
import { tools, type ToolCategory } from "@/lib/tools";

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
      className={`h-3.5 w-3.5 text-muted transition-transform ${open ? "rotate-180" : ""}`}
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

function NavItem({
  href,
  label,
  icon,
  active,
  onNavigate,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`flex items-center gap-3 rounded-sm border px-3 py-2.5 font-label transition-colors ${
        active
          ? "border-border bg-surface text-foreground"
          : "border-transparent text-muted hover:border-border hover:bg-surface hover:text-foreground"
      }`}
    >
      {icon}
      <span>{label}</span>
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
      className={`block rounded-sm border border-transparent py-2 pl-9 pr-3 font-mono text-xs transition-colors ${
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
  onToggle,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-3 rounded-sm border border-transparent px-3 py-2.5 font-label text-muted transition-colors hover:border-border hover:bg-surface hover:text-foreground"
      >
        {icon}
        <span className="flex-1 text-left">{label}</span>
        <ChevronIcon open={open} />
      </button>
      {open && <div className="mt-1 space-y-0.5">{children}</div>}
    </div>
  );
}

export function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const [toolsOpen, setToolsOpen] = useState(true);
  const [advancedOpen, setAdvancedOpen] = useState(true);

  const toolsNav = tools.filter((tool) =>
    SIDEBAR_TOOLS_CATEGORIES.includes(tool.category),
  );
  const advancedNav = tools.filter((tool) =>
    SIDEBAR_ADVANCED_CATEGORIES.includes(tool.category),
  );

  const sidebarContent = (
    <>
      <div className="flex h-14 items-center border-b border-border px-4">
        <Link
          href="/"
          onClick={onMobileClose}
          className="flex items-baseline gap-1 transition-opacity hover:opacity-80"
        >
          <span className="font-mono text-base font-medium text-foreground">
            pix
          </span>
          <span className="font-mono text-base font-medium text-muted">-8</span>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
        <NavItem
          href="/"
          label="Dashboard"
          icon={<DashboardIcon />}
          active={pathname === "/"}
          onNavigate={onMobileClose}
        />

        <NavItem
          href="/blog"
          label="Blog"
          icon={<BlogIcon />}
          active={pathname === "/blog" || pathname.startsWith("/articles/")}
          onNavigate={onMobileClose}
        />

        <div className="mt-2">
          <ExpandableSection
            label="Tools"
            icon={<ToolsIcon />}
            open={toolsOpen}
            onToggle={() => setToolsOpen((current) => !current)}
          >
            {toolsNav.map((tool) => (
              <NestedLink
                key={tool.id}
                href={tool.href}
                label={tool.name}
                active={pathname === tool.href}
                onNavigate={onMobileClose}
              />
            ))}
          </ExpandableSection>
        </div>

        <ExpandableSection
          label="Advanced"
          icon={<AdvancedIcon />}
          open={advancedOpen}
          onToggle={() => setAdvancedOpen((current) => !current)}
        >
          {advancedNav.map((tool) => (
            <NestedLink
              key={tool.id}
              href={tool.href}
              label={tool.name}
              active={pathname === tool.href}
              onNavigate={onMobileClose}
            />
          ))}
        </ExpandableSection>
      </nav>

      <div className="border-t border-border p-3">
        <a
          href={JOIN_MY_PDF_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-2 block rounded-sm border border-border bg-card px-3 py-2.5 transition-colors hover:border-muted hover:bg-surface"
        >
          <span className="block font-label text-xs text-foreground">
            Combine images into a PDF
          </span>
          <span className="mt-1 block font-mono text-[10px] text-muted">
            JoinMyPDF →
          </span>
        </a>

        <NavItem
          href="/settings"
          label="Settings"
          icon={<SettingsIcon />}
          active={pathname === "/settings"}
          onNavigate={onMobileClose}
        />
        <p className="px-3 pt-3 font-mono text-[10px] text-muted">
          Zero uploads · Zero tracking
        </p>
      </div>
    </>
  );

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col border-r border-border bg-sidebar transition-transform lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
