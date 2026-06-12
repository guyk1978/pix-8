"use client";

import { AppLink } from "@/components/layout/AppLink";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useLocalizedArticles } from "@/hooks/useLocalizedArticle";
import type { Article } from "@/lib/blog";

interface RelatedArticlesProps {
  articlesEn: Article[];
  articlesHe: Article[];
}

export function RelatedArticles({
  articlesEn,
  articlesHe,
}: RelatedArticlesProps) {
  const { t } = useLanguage();
  const articles = useLocalizedArticles(articlesEn, articlesHe);

  if (articles.length === 0) return null;

  return (
    <section className="mt-8 border-t border-border pt-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-label text-foreground">
          {t("blog.relatedArticles")}
        </h2>
        <span className="font-mono text-xs text-muted">
          {t(
            articles.length === 1
              ? "blog.articleCountOne"
              : "blog.articleCount",
            { count: articles.length },
          )}
        </span>
      </div>

      <ul className="space-y-3">
        {articles.map((article) => (
          <li key={article.slug}>
            <AppLink
              href={`/articles/${article.slug}`}
              className="group block border border-border bg-card p-4 transition-colors hover:border-muted hover:bg-card-hover"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-medium text-foreground transition-colors group-hover:text-foreground">
                  {article.title}
                </h3>
                <time
                  dateTime={article.date}
                  className="font-mono text-[10px] text-muted"
                >
                  {article.date}
                </time>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {article.excerpt}
              </p>
            </AppLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
