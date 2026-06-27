"use client";

import { type ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ToolSidebarProvider } from "@/components/layout/ToolSidebarContext";
import { ToolWorkspaceLayout } from "@/components/layout/ToolWorkspaceLayout";
import { registerPwaServiceWorker } from "@/hooks/usePwaInstall";
import { isHomeDashboard } from "@/lib/routes";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const hideFooter = isHomeDashboard(pathname);

  useEffect(() => {
    registerPwaServiceWorker();
  }, []);

  return (
    <ToolSidebarProvider>
      <div className="flex min-h-screen min-w-0 flex-col overflow-x-clip bg-background">
        <Header />
        <ToolWorkspaceLayout>{children}</ToolWorkspaceLayout>
        {hideFooter ? null : <SiteFooter />}
      </div>
    </ToolSidebarProvider>
  );
}
