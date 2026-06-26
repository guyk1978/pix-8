"use client";

import type { ReactNode } from "react";
import { useOptionalToolSidebar } from "@/components/layout/ToolSidebarContext";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { ToolStarRating } from "@/components/tools/ToolStarRating";
import {
  EmbeddedToolbarDropdown,
  EmbeddedToolbarMenuRow,
} from "@/components/tools/shared/EmbeddedToolbarDropdown";
import type { ToolId } from "@/lib/tools";

interface EmbeddedToolToolbarProps {
  toolId: ToolId;
  toolName: string;
  guide: ReactNode;
}

export function EmbeddedToolToolbar({
  toolId,
  toolName,
  guide,
}: EmbeddedToolToolbarProps) {
  const { t } = useLanguage();
  const sidebar = useOptionalToolSidebar();

  return (
    <div className="embedded-tool-toolbar shrink-0">
      <div
        id="embedded-toolbar-panels"
        className="embedded-toolbar-panels embedded-toolbar-panels--unified"
      >
        <EmbeddedToolbarMenuRow>
          <div
            ref={sidebar?.setToolbarControlsContainer}
            className="embedded-toolbar-controls"
          />
          <EmbeddedToolbarDropdown
            id="toolbar-rate"
            title={t("embeddedToolbar.rateSection")}
          >
            <ToolStarRating
              toolId={toolId}
              toolName={toolName}
              variant="toolbar"
            />
          </EmbeddedToolbarDropdown>
          <EmbeddedToolbarDropdown
            id="toolbar-actions"
            title={t("embeddedToolbar.actionsSection")}
          >
            <div
              ref={sidebar?.setToolbarActionsContainer}
              className="embedded-toolbar-actions"
            >
              {!sidebar?.hasActiveImage ? (
                <p className="embedded-toolbar-actions-empty">
                  {t("embeddedToolbar.actionsEmpty")}
                </p>
              ) : null}
            </div>
          </EmbeddedToolbarDropdown>
          {guide}
        </EmbeddedToolbarMenuRow>
      </div>
    </div>
  );
}
