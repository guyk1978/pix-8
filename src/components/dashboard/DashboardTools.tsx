"use client";

import { useMemo, useState } from "react";
import { CategorySection } from "@/components/dashboard/CategorySection";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { getToolTranslationKey } from "@/i18n";
import { groupToolsByHomeCategory } from "@/lib/homeToolCategories";
import { tools } from "@/lib/tools";

export function DashboardTools() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return tools;

    return tools.filter((tool) => {
      const localizedName = t(getToolTranslationKey(tool.id, "name")).toLowerCase();
      const localizedDescription = t(
        getToolTranslationKey(tool.id, "description"),
      ).toLowerCase();

      return (
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        localizedName.includes(query) ||
        localizedDescription.includes(query)
      );
    });
  }, [searchQuery, t]);

  const categorizedTools = useMemo(
    () => groupToolsByHomeCategory(filteredTools),
    [filteredTools],
  );

  return (
    <section className="space-y-10">
      <div className="max-w-md">
        <label htmlFor="tool-search" className="sr-only">
          {t("home.searchLabel")}
        </label>
        <input
          id="tool-search"
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder={t("home.searchPlaceholder")}
          className="w-full rounded-sm border border-border bg-card px-4 py-2.5 font-mono text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-muted"
        />
      </div>

      {categorizedTools.length === 0 ? (
        <div className="flex min-h-36 flex-col items-center justify-center border border-border bg-card p-8 text-center">
          <p className="font-label text-muted">{t("home.noTools")}</p>
          <p className="mt-2 text-sm text-muted">{t("home.noToolsHint")}</p>
        </div>
      ) : (
        categorizedTools.map(({ category, tools: categoryTools }) => (
          <CategorySection
            key={category.id}
            categoryId={category.id}
            tools={categoryTools}
          />
        ))
      )}
    </section>
  );
}
