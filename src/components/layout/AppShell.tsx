"use client";

import { Suspense, type ReactNode, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ToolSidebarProvider } from "@/components/layout/ToolSidebarContext";
import { ToolWorkspaceLayout } from "@/components/layout/ToolWorkspaceLayout";
import {
  EditorFocusFab,
} from "@/components/editor/EditorFocusFab";
import {
  EditorFocusModeProvider,
  useOptionalEditorFocusMode,
} from "@/components/editor/EditorFocusModeContext";
import { registerPwaServiceWorker } from "@/hooks/usePwaInstall";
import { isHomeDashboard, isSplashEntry } from "@/lib/routes";

interface AppShellProps {
  children: ReactNode;
}

function AppShellFrameInner({ children }: AppShellProps) {
  const pathname = usePathname();
  const hideFooter = isHomeDashboard(pathname);
  const focusMode = useOptionalEditorFocusMode();
  const isHeaderVisible = focusMode?.isHeaderVisible ?? true;

  return (
    <div
      className={`app-shell flex min-w-0 flex-col overflow-x-clip bg-background ${
        hideFooter ? "app-shell--editor-focus h-screen overflow-hidden" : "min-h-screen"
      } ${hideFooter && !isHeaderVisible ? "app-shell--header-hidden" : ""}`}
    >
      <div className="app-header-wrapper" aria-hidden={!isHeaderVisible}>
        <Header />
      </div>
      {hideFooter && focusMode ? <EditorFocusFab /> : null}
      <ToolWorkspaceLayout>{children}</ToolWorkspaceLayout>
      {hideFooter ? null : <SiteFooter />}
    </div>
  );
}

function AppShellFrame({ children }: AppShellProps) {
  const pathname = usePathname();
  const hideFooter = isHomeDashboard(pathname);

  if (hideFooter) {
    return (
      <EditorFocusModeProvider>
        <AppShellFrameInner>{children}</AppShellFrameInner>
      </EditorFocusModeProvider>
    );
  }

  return <AppShellFrameInner>{children}</AppShellFrameInner>;
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
