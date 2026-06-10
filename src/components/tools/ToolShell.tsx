"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { RelatedArticles } from "@/components/articles/RelatedArticles";
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

  return (
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
      </div>

      <div className="mb-8 space-y-2">
        <h1 className="text-2xl font-medium tracking-tight text-foreground">
          {t(getToolTranslationKey(tool.id, "name"))}
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted">
          {t(getToolTranslationKey(tool.id, "description"))}
        </p>
      </div>

      <div className="border border-border bg-card p-4 sm:p-6">
        {children}
        <WorkflowSuggestions suggestions={getWorkflowSuggestions(tool.id)} />
      </div>

      <RelatedArticles
        articlesEn={relatedArticlesEn}
        articlesHe={relatedArticlesHe}
      />
    </div>
  );
}
