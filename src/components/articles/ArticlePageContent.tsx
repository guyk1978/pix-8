"use client";

import { AppLink } from "@/components/layout/AppLink";
import { ArticleBody } from "@/components/articles/ArticleBody";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { getToolTranslationKey } from "@/i18n";
import { useLocalizedArticle } from "@/hooks/useLocalizedArticle";
import type { Article } from "@/lib/blog";
import type { Tool } from "@/lib/tools";

interface ArticlePageContentProps {
  articleEn: Article;
  articleHe?: Article;
  tool?: Tool;
}

export function ArticlePageContent({
  articleEn,
  articleHe,
  tool,
}: ArticlePageContentProps) {
  const { t } = useLanguage();
  const article = useLocalizedArticle(articleEn, articleHe);
  const toolName = tool ? t(getToolTranslationKey(tool.id, "name")) : t("blog.tool");

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <AppLink
          href="/blog"
          className="font-label text-muted transition-colors hover:text-foreground"
        >
          {t("blog.backToBlog")}
        </AppLink>
        <span className="text-border">/</span>
        <AppLink
          href={tool?.href ?? "/"}
          className="font-label text-muted transition-colors hover:text-foreground"
        >
          {toolName}
        </AppLink>
        <span className="text-border">/</span>
        <span className="font-label text-muted">{t("blog.article")}</span>
      </div>

      <article className="border border-border bg-card p-6 sm:p-8">
        <header className="space-y-3 border-b border-border pb-6">
          <p className="font-label text-muted">
            {t("blog.relatedTo", { tool: toolName })}
          </p>
          <h1 className="text-2xl font-medium tracking-tight text-foreground">
            {article.title}
          </h1>
          <p className="text-sm leading-relaxed text-muted">{article.excerpt}</p>
          <time
            dateTime={article.date}
            className="block font-mono text-xs text-muted"
          >
            {article.date}
          </time>
        </header>

        <ArticleBody content={article.content} />
      </article>
    </div>
  );
}
