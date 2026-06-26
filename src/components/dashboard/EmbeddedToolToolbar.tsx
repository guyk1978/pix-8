"use client";

import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { useOptionalToolSidebar } from "@/components/layout/ToolSidebarContext";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { ToolStarRating } from "@/components/tools/ToolStarRating";
import type { ToolId } from "@/lib/tools";

interface EmbeddedToolToolbarProps {
  toolId: ToolId;
  toolName: string;
  toolSelector: ReactNode;
  guide: ReactNode;
  controlsExpanded: boolean;
  onControlsExpandedChange: (expanded: boolean) => void;
}

export function EmbeddedToolToolbar({
  toolId,
  toolName,
  toolSelector,
  guide,
  controlsExpanded,
  onControlsExpandedChange,
}: EmbeddedToolToolbarProps) {
  const { t } = useLanguage();
  const sidebar = useOptionalToolSidebar();

  return (
    <div className="embedded-tool-toolbar shrink-0">
      <div
        className={`embedded-toolbar-collapse ${controlsExpanded ? "is-expanded" : "is-collapsed"}`}
      >
        <div className="embedded-toolbar-collapse-inner">
          <div id="embedded-toolbar-panels" className="embedded-toolbar-panels">
            <section className="embedded-toolbar-panel embedded-toolbar-panel-settings">
              <div className="embedded-toolbar-panel-head">
                <div className="embedded-toolbar-panel-head-main">{toolSelector}</div>
                <div className="embedded-toolbar-panel-head-aside">{guide}</div>
              </div>
              <div
                ref={sidebar?.setToolbarControlsContainer}
                className="embedded-toolbar-controls"
              />
            </section>

            <section className="embedded-toolbar-panel embedded-toolbar-panel-actions">
              <ToolStarRating
                toolId={toolId}
                toolName={toolName}
                variant="toolbar"
              />
              <p className="embedded-toolbar-section-label">
                {t("home.quickActionsLabel")}
              </p>
              <div
                ref={sidebar?.setToolbarActionsContainer}
                className="embedded-toolbar-actions"
              />
            </section>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="embedded-toolbar-toggle"
        onClick={() => onControlsExpandedChange(!controlsExpanded)}
        aria-expanded={controlsExpanded}
        aria-controls="embedded-toolbar-panels"
      >
        <ChevronDown
          className="embedded-toolbar-toggle-icon"
          size={14}
          strokeWidth={2.25}
          aria-hidden
        />
        <span>
          {controlsExpanded
            ? t("home.collapseControls")
            : t("home.expandControls")}
        </span>
      </button>
    </div>
  );
}
