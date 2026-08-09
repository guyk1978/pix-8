"use client";

import { AppLink } from "@/components/layout/AppLink";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useLocalizedArticles } from "@/hooks/useLocalizedArticle";
import { getToolTranslationKey } from "@/i18n";
import { getToolRoute } from "@/lib/navigationConfig";
import { SITE_FOOTER_RELATED_TOOL_IDS } from "@/lib/siteFooterLinks";
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
        <h1 className="article-hub-title text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t("blog.title")}
        </h1>
        <p className="article-page-lead max-w-2xl">
          {t("blog.description")}
        </p>
      </section>

      <section className="mb-10 space-y-3">
        <h2 className="font-label text-sm text-muted">{t("blog.featuredTools")}</h2>
        <ul className="flex flex-wrap gap-2">
          {SITE_FOOTER_RELATED_TOOL_IDS.map((toolId) => (
            <li key={toolId}>
              <AppLink
                href={getToolRoute(toolId)}
                className="inline-flex rounded-md border border-border bg-card px-3 py-1.5 font-label text-sm text-foreground transition-colors hover:border-muted hover:bg-card-hover"
              >
                {t(getToolTranslationKey(toolId, "name"))}
              </AppLink>
            </li>
          ))}
          <li>
            <AppLink
              href="/"
              className="inline-flex rounded-md border border-border bg-card px-3 py-1.5 font-label text-sm text-[var(--glow-teal)] transition-colors hover:border-muted hover:bg-card-hover"
            >
              {t("nav.dashboard")}
            </AppLink>
          </li>
        </ul>
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
