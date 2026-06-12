"use client";

import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useOptionalToolSidebar } from "@/components/layout/ToolSidebarContext";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface ToolSidebarSlotProps {
  id: string;
  order?: number;
  children: ReactNode;
  className?: string;
  /** Render in main workspace when no image is active (e.g. processing mode before upload). */
  showInlineWhenIdle?: boolean;
}

export function ToolSidebarSlot({
  id,
  order = 0,
  children,
  className = "",
  showInlineWhenIdle = false,
}: ToolSidebarSlotProps) {
  const { dir } = useLanguage();
  const sidebar = useOptionalToolSidebar();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const hasActiveImage = sidebar?.hasActiveImage ?? false;
  const registerSlotPresence = sidebar?.registerSlotPresence;
  const controlsContainer = sidebar?.controlsContainer;
  const useFloatingPanel = Boolean(
    sidebar && hasActiveImage && isDesktop && controlsContainer,
  );

  useEffect(() => {
    if (!registerSlotPresence || !useFloatingPanel) {
      registerSlotPresence?.(id, false);
      return;
    }

    registerSlotPresence(id, true);
    return () => registerSlotPresence(id, false);
  }, [registerSlotPresence, useFloatingPanel, id]);

  if (useFloatingPanel && controlsContainer) {
    return createPortal(
      <div
        className={`tool-sidebar-slot sidebar-control-stack w-full text-start ${className}`.trim()}
        style={{ order }}
        data-sidebar-slot={id}
        dir={dir}
      >
        {children}
      </div>,
      controlsContainer,
    );
  }

  if (!hasActiveImage) {
    if (!showInlineWhenIdle) {
      return null;
    }

    return <div className={className}>{children}</div>;
  }

  if (!isDesktop) {
    return (
      <div
        className={`tool-mobile-controls w-full text-start ${className}`.trim()}
        dir={dir}
      >
        {children}
      </div>
    );
  }

  return null;
}
