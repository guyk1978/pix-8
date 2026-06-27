"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { ToolSidebarPanel } from "@/components/layout/ToolSidebarPanel";
import { useOptionalToolSidebar } from "@/components/layout/ToolSidebarContext";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useActiveToolId } from "@/hooks/useActiveToolId";

interface ToolWorkspaceLayoutProps {
  children: ReactNode;
}

function ToolWorkspaceLayoutInner({ children }: ToolWorkspaceLayoutProps) {
  const { dir, language } = useLanguage();
  const activeToolId = useActiveToolId();
  const toolSidebar = useOptionalToolSidebar();
  const hasActiveImage = toolSidebar?.hasActiveImage ?? false;
  const embeddedToolbarLayout = toolSidebar?.embeddedToolbarLayout ?? false;
  const showSidebar =
    activeToolId !== null && hasActiveImage && !embeddedToolbarLayout;
  const sidebarOnRight = language === "he" || dir === "rtl";

  return (
    <div
      dir="ltr"
      className={`flex w-full min-w-0 flex-1 flex-row ${
        embeddedToolbarLayout
          ? "h-full min-h-0 items-stretch"
          : showSidebar
            ? "items-start tool-layout-with-sidebar"
            : "min-h-0 flex-1 items-start"
      }`}
    >
      {showSidebar && !sidebarOnRight ? <ToolSidebarPanel /> : null}

      <main
        dir={dir}
        lang={language}
        className={`app-main min-w-0 flex-1 bg-background text-start ${
          embeddedToolbarLayout
            ? "flex min-h-0 flex-col overflow-hidden"
            : showSidebar
              ? ""
              : "min-h-0 overflow-y-auto"
        }`}
      >
        {children}
      </main>

      {showSidebar && sidebarOnRight ? <ToolSidebarPanel /> : null}
    </div>
  );
}

export function ToolWorkspaceLayout({ children }: ToolWorkspaceLayoutProps) {
  return (
    <Suspense
      fallback={
        <main className="app-main min-h-0 min-w-0 flex-1 overflow-y-auto bg-background">
          {children}
        </main>
      }
    >
      <ToolWorkspaceLayoutInner>{children}</ToolWorkspaceLayoutInner>
    </Suspense>
  );
}
