"use client";

import { Suspense, type ReactNode, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ToolSidebarProvider } from "@/components/layout/ToolSidebarContext";
import { ToolWorkspaceLayout } from "@/components/layout/ToolWorkspaceLayout";
import { registerPwaServiceWorker } from "@/hooks/usePwaInstall";
import { isHomeDashboard, isSplashEntry } from "@/lib/routes";

interface AppShellProps {
  children: ReactNode;
}

function AppShellFrame({ children }: AppShellProps) {
  const pathname = usePathname();
  const hideFooter = isHomeDashboard(pathname);

  return (
    <div className={`flex min-w-0 flex-col overflow-x-clip bg-background ${
      hideFooter ? "h-screen overflow-hidden" : "min-h-screen"
    }`}>
      <Header />
      <ToolWorkspaceLayout>{children}</ToolWorkspaceLayout>
      {hideFooter ? null : <SiteFooter />}
    </div>
  );
}

function AppShellInner({ children }: AppShellProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isSplash = isSplashEntry(pathname, searchParams.get("lang"));

  if (isSplash) {
    return <>{children}</>;
  }

  return (
    <ToolSidebarProvider>
      <AppShellFrame>{children}</AppShellFrame>
    </ToolSidebarProvider>
  );
}

export function AppShell({ children }: AppShellProps) {
  useEffect(() => {
    registerPwaServiceWorker();
  }, []);

  return (
    <Suspense fallback={<>{children}</>}>
      <AppShellInner>{children}</AppShellInner>
    </Suspense>
  );
}
