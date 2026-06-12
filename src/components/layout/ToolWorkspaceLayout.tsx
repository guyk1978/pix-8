"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ToolSidebarPanel } from "@/components/layout/ToolSidebarPanel";
import { useOptionalToolSidebar } from "@/components/layout/ToolSidebarContext";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { isToolPage } from "@/lib/routes";

interface ToolWorkspaceLayoutProps {
  children: ReactNode;
}

export function ToolWorkspaceLayout({ children }: ToolWorkspaceLayoutProps) {
  const pathname = usePathname();
  const { dir, language } = useLanguage();
  const hasActiveImage = useOptionalToolSidebar()?.hasActiveImage ?? false;
  const showSidebar = isToolPage(pathname) && hasActiveImage;
  const sidebarOnRight = language === "he" || dir === "rtl";

  return (
    <div
      dir="ltr"
      className={`flex min-h-0 min-w-0 flex-1 flex-row ${
        showSidebar ? "tool-layout-with-sidebar" : ""
      }`}
    >
      {showSidebar && !sidebarOnRight ? <ToolSidebarPanel /> : null}

      <main
        dir={dir}
        lang={language}
        className="app-main min-h-0 min-w-0 flex-1 overflow-y-auto bg-background text-start"
      >
        {children}
      </main>

      {showSidebar && sidebarOnRight ? <ToolSidebarPanel /> : null}
    </div>
  );
}
