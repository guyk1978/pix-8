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
  /** Embedded home toolbar target — defaults to the settings/controls panel. */
  panel?: "controls" | "actions";
}

export function ToolSidebarSlot({
  id,
  order = 0,
  children,
  className = "",
  showInlineWhenIdle = false,
  panel = "controls",
}: ToolSidebarSlotProps) {
  const { dir } = useLanguage();
  const sidebar = useOptionalToolSidebar();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const hasActiveImage = sidebar?.hasActiveImage ?? false;
  const embeddedToolbarLayout = sidebar?.embeddedToolbarLayout ?? false;
  const registerSlotPresence = sidebar?.registerSlotPresence;
  const controlsContainer = sidebar?.controlsContainer;
  const toolbarControlsContainer = sidebar?.toolbarControlsContainer;
  const toolbarActionsContainer = sidebar?.toolbarActionsContainer;
  const toolbarVisible = hasActiveImage || showInlineWhenIdle;
  const useToolbarControlsPanel = Boolean(
    sidebar &&
      embeddedToolbarLayout &&
      panel === "controls" &&
      toolbarControlsContainer &&
      toolbarVisible,
  );
  const useToolbarActionsPanel = Boolean(
    sidebar &&
      embeddedToolbarLayout &&
      panel === "actions" &&
      toolbarActionsContainer &&
      toolbarVisible,
  );
  const useFloatingPanel = Boolean(
    sidebar &&
      !embeddedToolbarLayout &&
      panel === "controls" &&
      hasActiveImage &&
      isDesktop &&
      controlsContainer,
  );

  useEffect(() => {
    if (!registerSlotPresence) return;

    const present =
      useToolbarControlsPanel || useToolbarActionsPanel || useFloatingPanel;
    registerSlotPresence(id, present);
    return () => registerSlotPresence(id, false);
  }, [
    registerSlotPresence,
    useToolbarControlsPanel,
    useToolbarActionsPanel,
    useFloatingPanel,
    id,
  ]);

  const slotContent = (
    <div
      className={`tool-sidebar-slot sidebar-control-stack w-full text-start ${className}`.trim()}
      style={{ order }}
      data-sidebar-slot={id}
      dir={dir}
    >
      {children}
    </div>
  );

  if (useToolbarControlsPanel && toolbarControlsContainer) {
    return createPortal(slotContent, toolbarControlsContainer);
  }

  if (useToolbarActionsPanel && toolbarActionsContainer) {
    return createPortal(slotContent, toolbarActionsContainer);
  }

  if (useFloatingPanel && controlsContainer) {
    return createPortal(slotContent, controlsContainer);
  }

  if (embeddedToolbarLayout && panel === "actions") {
    return null;
  }

  if (!hasActiveImage) {
    if (!showInlineWhenIdle) {
      return null;
    }

    if (embeddedToolbarLayout && toolbarControlsContainer && panel === "controls") {
      return createPortal(slotContent, toolbarControlsContainer);
    }

    return <div className={className}>{children}</div>;
  }

  if (!isDesktop && !embeddedToolbarLayout) {
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
