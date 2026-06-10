"use client";

import { ArticleCard } from "@/components/articles/ArticleCard";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useLocalizedArticles } from "@/hooks/useLocalizedArticle";
import type { Article } from "@/lib/blog";

interface BlogPageContentProps {
  articlesEn: Article[];
  articlesHe: Article[];
}

export function BlogPageContent({
  articlesEn,
  articlesHe,
}: BlogPageContentProps) {
  const { t } = useLanguage();
  const articles = useLocalizedArticles(articlesEn, articlesHe);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <section className="mb-10 space-y-3">
        <p className="font-label text-muted">{t("blog.eyebrow")}</p>
        <h1 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
          {t("blog.title")}
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted">
          {t("blog.description")}
        </p>
      </section>

      {articles.length === 0 ? (
        <div className="flex min-h-40 items-center justify-center border border-dashed border-border bg-card p-8 text-center">
          <p className="text-sm text-muted">{t("blog.empty")}</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
