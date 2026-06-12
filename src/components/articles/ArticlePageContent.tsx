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

      <article className="article-page border border-border bg-card p-6 sm:p-10">
        <header className="space-y-4 border-b border-border pb-8">
          <p className="font-label text-sm text-muted">
            {t("blog.relatedTo", { tool: toolName })}
          </p>
          <h1 className="article-page-title">{article.title}</h1>
          <p className="article-page-lead">{article.excerpt}</p>
          <time
            dateTime={article.date}
            className="block font-mono text-sm text-muted"
          >
            {article.date}
          </time>
        </header>

        <ArticleBody content={article.content} />
      </article>
    </div>
  );
}
