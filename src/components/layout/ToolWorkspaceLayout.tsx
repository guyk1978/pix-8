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
      className={`flex w-full min-w-0 flex-row items-start ${
        showSidebar ? "tool-layout-with-sidebar" : "min-h-0 flex-1"
      }`}
    >
      {showSidebar && !sidebarOnRight ? <ToolSidebarPanel /> : null}

      <main
        dir={dir}
        lang={language}
        className={`app-main min-w-0 flex-1 bg-background text-start ${
          showSidebar ? "" : "min-h-0 overflow-y-auto"
        }`}
      >
        {children}
      </main>

      {showSidebar && sidebarOnRight ? <ToolSidebarPanel /> : null}
    </div>
  );
}
