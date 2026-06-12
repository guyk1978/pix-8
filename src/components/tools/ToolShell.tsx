"use client";

import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import { RelatedArticles } from "@/components/articles/RelatedArticles";
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
  const toolName = t(getToolTranslationKey(tool.id, "name"));
  const toolDescription = t(getToolTranslationKey(tool.id, "description"));

  return (
    <WorkflowProvider toolId={tool.id}>
      <Suspense fallback={null}>
        <ToolProjectProvider toolId={tool.id}>
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-6 flex items-center gap-3">
          <Link
            href="/"
            className="font-label text-muted transition-colors hover:text-foreground"
          >
            {t("toolShell.backToDashboard")}
          </Link>
          <span className="text-border">/</span>
          <span className="font-label text-muted">{tool.tag}</span>
          <span className="text-border">/</span>
          <span className="font-label text-[var(--glow-teal)]">{toolName}</span>
        </div>

        <div className="glow-panel overflow-visible rounded-lg bg-card p-4 sm:p-6 lg:p-8">
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
