"use client";

import { Suspense, useEffect, type ReactNode } from "react";
import { RelatedArticles } from "@/components/articles/RelatedArticles";
import { useOptionalToolSidebar } from "@/components/layout/ToolSidebarContext";
import { ToolProjectProvider } from "@/components/projects/ToolProjectContext";
import { ToolHeaderHero } from "@/components/tools/ToolHeaderHero";
import { WorkflowPanel } from "@/components/tools/workflow/WorkflowPanel";
import { WorkflowProvider } from "@/components/tools/workflow/WorkflowContext";
import { WorkflowSuggestions } from "@/components/WorkflowSuggestions";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { getToolTranslationKey } from "@/i18n";
import type { Article } from "@/lib/blog";
import type { Tool } from "@/lib/tools";
import { getWorkflowSuggestions } from "@/lib/workflows";

interface ToolShellProps {
  tool: Tool;
  children?: ReactNode;
  relatedArticlesEn?: Article[];
  relatedArticlesHe?: Article[];
}

export function ToolShell({
  tool,
  children,
  relatedArticlesEn = [],
  relatedArticlesHe = [],
}: ToolShellProps) {
  const { t } = useLanguage();
  const setToolMeta = useOptionalToolSidebar()?.setToolMeta;
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
          <div className="tool-page mx-auto w-full max-w-7xl px-4 py-6 text-start sm:px-8 sm:py-8">
            <div className="tool-workspace-shell">
              <WorkflowPanel>
                <ToolHeaderHero
                  toolId={tool.id}
                  title={toolName}
                  description={toolDescription}
                />

                <div className="relative z-10">
                  {children}

                  <WorkflowSuggestions suggestions={getWorkflowSuggestions(tool.id)} />
                </div>
              </WorkflowPanel>
            </div>

            <RelatedArticles
              articlesEn={relatedArticlesEn}
              articlesHe={relatedArticlesHe}
            />
          </div>
        </ToolProjectProvider>
      </Suspense>
    </WorkflowProvider>
  );
}
