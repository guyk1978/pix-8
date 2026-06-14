"use client";

import { type ReactNode, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { ToolSidebarProvider } from "@/components/layout/ToolSidebarContext";
import { ToolWorkspaceLayout } from "@/components/layout/ToolWorkspaceLayout";
import { registerPwaServiceWorker } from "@/hooks/usePwaInstall";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  useEffect(() => {
    registerPwaServiceWorker();
  }, []);

  return (
    <ToolSidebarProvider>
      <div className="flex min-h-screen min-w-0 flex-col overflow-x-clip bg-background">
        <Header />
        <ToolWorkspaceLayout>{children}</ToolWorkspaceLayout>
      </div>
    </ToolSidebarProvider>
  );
}
