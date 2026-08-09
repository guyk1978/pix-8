"use client";

import { Suspense, type ReactNode, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ToolSidebarProvider } from "@/components/layout/ToolSidebarContext";
import { ToolWorkspaceLayout } from "@/components/layout/ToolWorkspaceLayout";
import { EditorFocusFab } from "@/components/editor/EditorFocusFab";
import {
  EditorFocusModeProvider,
  useOptionalEditorFocusMode,
} from "@/components/editor/EditorFocusModeContext";
import { registerPwaServiceWorker } from "@/hooks/usePwaInstall";
import { isHomeDashboard, isSplashEntry } from "@/lib/routes";

interface AppShellProps {
  children: ReactNode;
}

function AppShellFallback({ children }: AppShellProps) {
  return (
    <div className="app-shell flex min-h-screen min-w-0 flex-col overflow-x-clip bg-background">
      <div className="app-header-wrapper" aria-hidden>
        <div className="h-16 border-b border-border/60 bg-header/90" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  );
}

function AppShellFrameInner({ children }: AppShellProps) {
  const pathname = usePathname();
  const hideFooter = isHomeDashboard(pathname);
  const focusMode = useOptionalEditorFocusMode();
  const isHeaderVisible =
    !hideFooter || (focusMode?.isHeaderVisible ?? true);

  return (
    <div
      className={`app-shell flex min-w-0 flex-col overflow-x-clip bg-background ${
        hideFooter ? "app-shell--editor-focus h-screen overflow-hidden" : "min-h-screen"
      } ${hideFooter && !isHeaderVisible ? "app-shell--header-hidden" : ""}`}
    >
      <div className="app-header-wrapper" aria-hidden={!isHeaderVisible}>
        <Header />
      </div>
      {hideFooter && !isHeaderVisible ? <EditorFocusFab /> : null}
      <ToolWorkspaceLayout>{children}</ToolWorkspaceLayout>
      {hideFooter ? null : <SiteFooter />}
    </div>
  );
}

function AppShellFrame({ children }: AppShellProps) {
  return (
    <EditorFocusModeProvider>
      <AppShellFrameInner>{children}</AppShellFrameInner>
    </EditorFocusModeProvider>
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
    <Suspense fallback={<AppShellFallback>{children}</AppShellFallback>}>
      <AppShellInner>{children}</AppShellInner>
    </Suspense>
  );
}
