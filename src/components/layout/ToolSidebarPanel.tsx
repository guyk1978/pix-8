"use client";

import { useEffect } from "react";
import { ToolControlSidebarContent } from "@/components/layout/ToolControlSidebarContent";
import { useOptionalToolSidebar } from "@/components/layout/ToolSidebarContext";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useActiveToolId } from "@/hooks/useActiveToolId";

export function ToolSidebarPanel() {
  const { t, dir } = useLanguage();
  const activeToolId = useActiveToolId();
  const toolSidebar = useOptionalToolSidebar();
  const hasActiveImage = toolSidebar?.hasActiveImage ?? false;
  const setToolMeta = toolSidebar?.setToolMeta;
  const toolMode = activeToolId !== null;

  useEffect(() => {
    if (!toolMode) {
      setToolMeta?.(null);
    }
  }, [toolMode, setToolMeta]);

  if (!toolMode || !hasActiveImage) {
    return null;
  }

  return (
    <aside
      dir={dir}
      lang={dir === "rtl" ? "he" : "en"}
      className="tool-sidebar-panel flex min-h-0 flex-col text-start"
      data-visible="true"
      aria-label={t("toolSidebar.panelLabel")}
    >
      <ToolControlSidebarContent />
    </aside>
  );
}
