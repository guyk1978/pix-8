"use client";

import { Copy, Download } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { HelperSuccessHint } from "@/components/characters/HelperSuccessHint";
import { ProcessingIndicator } from "@/components/characters/ProcessingIndicator";
import { ToolSidebarFavoriteButton } from "@/components/favorites/ToolSidebarFavoriteButton";
import { MarkAsFinalResult } from "@/components/projects/MarkAsFinalResult";
import { ToolProjectSaveButton } from "@/components/projects/ToolProjectSaveButton";
import { useOptionalToolProjectContext } from "@/components/projects/ToolProjectContext";
import { ToolSidebarSlot } from "@/components/layout/ToolSidebarSlot";
import { useOptionalToolSidebar } from "@/components/layout/ToolSidebarContext";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { WorkflowStep } from "@/components/tools/workflow/WorkflowStep";
import {
  embeddedToolbarButtonClassName,
  embeddedToolbarPrimaryClassName,
  toolActionButtonClassName,
  toolActionPrimaryClassName,
  toolActionRowClassName,
  toolSidebarActionButtonClassName,
  toolSidebarActionsClassName,
} from "@/components/tools/toolActionStyles";
import { useToolWorkspaceActionsContainer } from "@/components/tools/ToolWorkspaceActions";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface ToolOutputActionsProps {
  onDownload: () => void | Promise<void>;
  onCopy: () => void | Promise<void>;
  downloadLabel: string;
  disabled?: boolean;
  copyDisabled?: boolean;
  isProcessing?: boolean;
  copyLabel?: string;
  showSuccessHint?: boolean;
}

interface ToolOutputActionsPanelProps extends ToolOutputActionsProps {
  layout?: "sidebar" | "workspace" | "toolbar";
}

function ToolOutputActionsPanel({
  layout = "workspace",
  onDownload,
  onCopy,
  downloadLabel,
  disabled = false,
  copyDisabled,
  isProcessing = false,
  copyLabel,
  showSuccessHint = true,
}: ToolOutputActionsPanelProps) {
  const { t } = useLanguage();
  const projectContext = useOptionalToolProjectContext();
  const resolvedCopyLabel = copyLabel ?? t("common.copyImage");
  const copyIsDisabled = copyDisabled ?? disabled;
  const isReady = showSuccessHint && !disabled && !isProcessing;
  const isSidebar = layout === "sidebar";
  const isToolbar = layout === "toolbar";
  const actionsClassName = isSidebar
    ? toolSidebarActionsClassName
    : isToolbar
      ? "embedded-toolbar-action-row flex flex-wrap items-center justify-end gap-1.5 sm:gap-2"
      : toolActionRowClassName;
  const buttonClassName = isSidebar
    ? toolSidebarActionButtonClassName
    : isToolbar
      ? embeddedToolbarButtonClassName
      : toolActionButtonClassName;
  const primaryClassName = isSidebar
    ? toolSidebarActionButtonClassName
    : isToolbar
      ? embeddedToolbarPrimaryClassName
      : toolActionPrimaryClassName;

  if (isToolbar) {
    return (
      <div className="embedded-actions-stack">
        <div className="embedded-quick-actions-grid">
          <ToolSidebarFavoriteButton variant="toolbar" />

          <button
            type="button"
            disabled={copyIsDisabled}
            onClick={() => void onCopy()}
            className={`${embeddedToolbarButtonClassName} w-full`}
          >
            <Copy className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} aria-hidden />
            <span className="truncate">
              {isProcessing ? t("common.processing") : resolvedCopyLabel}
            </span>
          </button>

          {projectContext ? (
            <ToolProjectSaveButton
              className="min-w-0"
              buttonClassName={`${embeddedToolbarButtonClassName} w-full`}
            />
          ) : (
            <span />
          )}
        </div>

        <button
          type="button"
          disabled={disabled}
          onClick={() => void onDownload()}
          className={`${embeddedToolbarPrimaryClassName} embedded-toolbar-download w-full`}
        >
          <Download className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} aria-hidden />
          <span className="truncate">
            {isProcessing ? t("common.processing") : downloadLabel}
          </span>
        </button>

        {projectContext?.resultMark ? (
          <MarkAsFinalResult compact className="embedded-mark-final-block w-full" />
        ) : null}
      </div>
    );
  }

  return (
    <div className={isSidebar ? "space-y-3" : "space-y-3"}>
      {projectContext?.resultMark ? <MarkAsFinalResult /> : null}

      <div className={actionsClassName}>
        {projectContext ? (
          <ToolProjectSaveButton
            className={isSidebar ? "w-full flex-none" : undefined}
            buttonClassName={
              isSidebar ? toolSidebarActionButtonClassName : undefined
            }
          />
        ) : null}

        <button
          type="button"
          disabled={copyIsDisabled}
          onClick={() => void onCopy()}
          className={buttonClassName}
        >
          <Copy className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
          <span className="truncate">
            {isProcessing ? t("common.processing") : resolvedCopyLabel}
          </span>
        </button>

        <button
          type="button"
          disabled={disabled}
          onClick={() => void onDownload()}
          className={primaryClassName}
        >
          <Download className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
          <span className="truncate">
            {isProcessing ? t("common.processing") : downloadLabel}
          </span>
        </button>
      </div>

      {isReady && !isSidebar ? <HelperSuccessHint /> : null}
    </div>
  );
}

function ActionsPortal({
  children,
  container,
}: {
  children: ReactNode;
  container: HTMLDivElement;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(children, container);
}

export function ToolOutputActions(props: ToolOutputActionsProps) {
  const { isProcessing = false } = props;
  const sidebar = useOptionalToolSidebar();
  const workspaceActionsContainer = useToolWorkspaceActionsContainer();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const hasActiveImage = sidebar?.hasActiveImage ?? false;
  const embeddedToolbarLayout = sidebar?.embeddedToolbarLayout ?? false;
  const toolbarActionsContainer = sidebar?.toolbarActionsContainer;
  const useToolbarPanel = Boolean(
    sidebar && embeddedToolbarLayout && hasActiveImage && toolbarActionsContainer,
  );
  const useSidebarPanel = Boolean(
    sidebar &&
      !embeddedToolbarLayout &&
      hasActiveImage &&
      isDesktop &&
      sidebar.controlsContainer,
  );

  const panelLayout = useToolbarPanel
    ? "toolbar"
    : useSidebarPanel
      ? "sidebar"
      : "workspace";

  const panel = hasActiveImage ? (
    <ToolOutputActionsPanel {...props} layout={panelLayout} />
  ) : null;

  return (
    <>
      <WorkflowStep step="process">
        <div className={`flex justify-center ${isProcessing ? "py-2" : "h-0 overflow-hidden"}`}>
          {isProcessing ? (
            <ProcessingIndicator active size="md" progress={80} />
          ) : null}
        </div>
      </WorkflowStep>

      <WorkflowStep step="download">
        {useSidebarPanel && panel ? (
          <ToolSidebarSlot id="tool-output-actions" order={1} className="w-full">
            {panel}
          </ToolSidebarSlot>
        ) : null}

        {useToolbarPanel && toolbarActionsContainer && panel ? (
          <ActionsPortal container={toolbarActionsContainer}>{panel}</ActionsPortal>
        ) : null}

        {!useSidebarPanel &&
        !useToolbarPanel &&
        hasActiveImage &&
        workspaceActionsContainer &&
        panel ? (
          <ActionsPortal container={workspaceActionsContainer}>{panel}</ActionsPortal>
        ) : null}
      </WorkflowStep>
    </>
  );
}
