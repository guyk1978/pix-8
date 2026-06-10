"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";
import type { Article } from "@/lib/blog";

export function useLocalizedArticle(
  english: Article,
  hebrew?: Article,
): Article {
  const { language } = useLanguage();
  if (language === "he" && hebrew) return hebrew;
  return english;
}

export function useLocalizedArticles(
  english: Article[],
  hebrew: Article[],
): Article[] {
  const { language } = useLanguage();
  if (language === "en") return english;

  const hebrewBySlug = new Map(hebrew.map((article) => [article.slug, article]));
  return english.map(
    (article) => hebrewBySlug.get(article.slug) ?? article,
  );
}
