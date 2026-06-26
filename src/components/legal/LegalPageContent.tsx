"use client";

import { AppLink } from "@/components/layout/AppLink";
import { ArticleBody } from "@/components/articles/ArticleBody";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import type { LegalPage } from "@/lib/legalPages";

interface LegalPageContentProps {
  pageEn: LegalPage;
  pageHe?: LegalPage | null;
  homeLabelKey: string;
}

export function LegalPageContent({
  pageEn,
  pageHe,
  homeLabelKey,
}: LegalPageContentProps) {
  const { language, t } = useLanguage();
  const page = language === "he" && pageHe ? pageHe : pageEn;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <AppLink
          href="/"
          className="font-label text-muted transition-colors hover:text-foreground"
        >
          {t(homeLabelKey)}
        </AppLink>
        <span className="text-border">/</span>
        <span className="font-label text-muted">{page.title}</span>
      </div>

      <article className="article-page border border-border bg-card p-6 sm:p-10">
        <header className="space-y-4 border-b border-border pb-8">
          <h1 className="article-page-title">{page.title}</h1>
          <time
            dateTime={page.lastUpdated}
            className="block font-mono text-sm text-muted"
          >
            {t("legal.lastUpdated", { date: page.lastUpdated })}
          </time>
        </header>

        <ArticleBody content={page.content} />
      </article>
    </div>
  );
}
