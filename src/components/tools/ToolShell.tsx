"use client";

import { Suspense, useEffect, type ReactNode } from "react";
import { RelatedArticles } from "@/components/articles/RelatedArticles";
import { useOptionalToolSidebar } from "@/components/layout/ToolSidebarContext";
import { ToolProjectProvider } from "@/components/projects/ToolProjectContext";
import { WorkspaceImageQueueProvider } from "@/hooks/WorkspaceImageQueueContext";
import { ToolStarRating } from "@/components/tools/ToolStarRating";
import { ToolHeaderHero } from "@/components/tools/ToolHeaderHero";
import { WorkflowPanel } from "@/components/tools/workflow/WorkflowPanel";
import { WorkflowProvider } from "@/components/tools/workflow/WorkflowContext";
import { WorkflowSuggestions } from "@/components/WorkflowSuggestions";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { ToolExportOptionsProvider } from "@/hooks/useToolExportSettings";
import { getToolTranslationKey } from "@/i18n";
import type { Article } from "@/lib/blog";
import type { Tool } from "@/lib/tools";
import { getWorkflowSuggestions } from "@/lib/workflows";

interface ToolShellProps {
  tool: Tool;
  children?: ReactNode;
  relatedArticlesEn?: Article[];
  relatedArticlesHe?: Article[];
  /** Lighter shell for the home dashboard workspace */
  embedded?: boolean;
}

export function ToolShell({
  tool,
  children,
  relatedArticlesEn = [],
  relatedArticlesHe = [],
  embedded = false,
}: ToolShellProps) {
  const { t } = useLanguage();
  const toolSidebar = useOptionalToolSidebar();
  const setToolMeta = toolSidebar?.setToolMeta;
  const hasActiveImage = toolSidebar?.hasActiveImage ?? false;
  const toolName = t(getToolTranslationKey(tool.id, "name"));
  const toolDescription = t(getToolTranslationKey(tool.id, "description"));

  useEffect(() => {
    setToolMeta?.({
      toolId: tool.id,
      toolName,
      toolTag: tool.tag,
    });

    return () => setToolMeta?.(null);
  }, [tool.id, tool.tag, toolName, setToolMeta]);

  return (
    <WorkflowProvider toolId={tool.id}>
      <Suspense fallback={null}>
        <ToolProjectProvider toolId={tool.id}>
          <WorkspaceImageQueueProvider>
          <div
            className={`tool-page mx-auto w-full text-start ${
              embedded
                ? "embedded-tool-page flex h-full min-h-0 flex-1 flex-col px-0 py-0 max-w-none"
                : "max-w-7xl px-4 py-6 sm:px-8 sm:py-8"
            }`}
          >
            <div
              className={`tool-workspace-shell ${
                embedded ? "flex min-h-0 flex-1 flex-col" : ""
              }`}
            >
              <WorkflowPanel>
                {!embedded ? (
                  <ToolHeaderHero
                    toolId={tool.id}
                    title={toolName}
                    description={toolDescription}
                  />
                ) : null}

                <div className={`relative z-10 ${embedded ? "flex min-h-0 flex-1 flex-col" : ""}`}>
                  <ToolExportOptionsProvider>
                    {children}
                  </ToolExportOptionsProvider>

                  {!embedded ? (
                    <WorkflowSuggestions suggestions={getWorkflowSuggestions(tool.id)} />
                  ) : null}
                </div>
              </WorkflowPanel>
            </div>

            {!embedded ? (
              <>
                {!hasActiveImage ? (
                  <ToolStarRating toolId={tool.id} toolName={toolName} />
                ) : null}

                <RelatedArticles
                  articlesEn={relatedArticlesEn}
                  articlesHe={relatedArticlesHe}
                />
              </>
            ) : null}
          </div>
          </WorkspaceImageQueueProvider>
        </ToolProjectProvider>
      </Suspense>
    </WorkflowProvider>
  );
}
