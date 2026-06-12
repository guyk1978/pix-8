"use client";

import Link from "next/link";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { getToolTranslationKey } from "@/i18n";
import type { Article } from "@/lib/blog";
import { getToolById } from "@/lib/tools";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const { t } = useLanguage();
  const tool = getToolById(article.toolId);
  const toolName = tool
    ? t(getToolTranslationKey(tool.id, "name"))
    : article.toolId;

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group relative block overflow-hidden border border-border bg-card p-5 transition-colors hover:border-muted hover:bg-card-hover"
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="font-label text-muted">{toolName}</span>
        <time dateTime={article.date} className="font-mono text-[10px] text-muted">
          {article.date}
        </time>
      </div>
      <h2 className="text-base font-medium text-foreground group-hover:text-foreground">
        {article.title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{article.excerpt}</p>
      <span className="mt-4 inline-block font-label text-muted opacity-0 transition-opacity group-hover:opacity-100">
        {t("blog.readArticle")}
      </span>
    </Link>
  );
}
