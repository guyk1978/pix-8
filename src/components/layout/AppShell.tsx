"use client";

import { type ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { ToolSidebarProvider } from "@/components/layout/ToolSidebarContext";
import { ToolWorkspaceLayout } from "@/components/layout/ToolWorkspaceLayout";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <ToolSidebarProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <ToolWorkspaceLayout>{children}</ToolWorkspaceLayout>
      </div>
    </ToolSidebarProvider>
  );
}
