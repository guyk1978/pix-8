"use client";

import { AppLink } from "@/components/layout/AppLink";
import { ToolCard } from "@/components/dashboard/ToolCard";
import { useFavorites } from "@/components/favorites/FavoritesContext";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { getToolById } from "@/lib/tools";

export function FavoritesPageContent() {
  const { t } = useLanguage();
  const { favorites } = useFavorites();

  const favoriteTools = favorites
    .map((toolId) => getToolById(toolId))
    .filter((tool): tool is NonNullable<ReturnType<typeof getToolById>> => !!tool);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-8 max-w-2xl space-y-3">
        <p className="font-label text-muted">{t("favorites.eyebrow")}</p>
        <h1 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
          {t("favorites.title")}
        </h1>
        <p className="text-sm leading-relaxed text-muted">
          {t("favorites.description")}
        </p>
      </header>

      {favoriteTools.length === 0 ? (
        <div className="flex min-h-48 flex-col items-center justify-center gap-3 border border-dashed border-border bg-card p-8 text-center">
          <p className="font-label text-muted">{t("favorites.empty")}</p>
          <p className="max-w-sm text-sm text-muted">{t("favorites.emptyHint")}</p>
          <AppLink
            href="/"
            className="mt-2 rounded-sm border border-border bg-background px-4 py-2 font-label text-sm text-foreground transition-colors hover:border-muted hover:bg-surface"
          >
            {t("favorites.browseTools")}
          </AppLink>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {favoriteTools.map((tool, index) => (
            <ToolCard key={tool.id} tool={tool} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
