"use client";

import { useMemo, useState } from "react";
import { ToolCard } from "@/components/dashboard/ToolCard";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { getToolTranslationKey } from "@/i18n";
import { dashboardSections, tools } from "@/lib/tools";

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

  const sectionLabels: Record<string, string> = {
    tools: t("nav.tools"),
    advanced: t("nav.advanced"),
  };

  return (
    <section className="space-y-8">
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

      {filteredTools.length === 0 ? (
        <div className="flex min-h-36 flex-col items-center justify-center border border-border bg-card p-8 text-center">
          <p className="font-label text-muted">{t("home.noTools")}</p>
          <p className="mt-2 text-sm text-muted">{t("home.noToolsHint")}</p>
        </div>
      ) : (
        dashboardSections.map((section) => {
          const sectionTools = filteredTools.filter((tool) =>
            section.categories.includes(tool.category),
          );

          if (sectionTools.length === 0) return null;

          const countLabel =
            sectionTools.length === 1
              ? `1 ${t("home.utility")}`
              : `${sectionTools.length} ${t("home.utilities")}`;

          return (
            <div key={section.id}>
              <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
                <h2 className="font-label text-foreground">
                  {sectionLabels[section.id] ?? section.label}
                </h2>
                <span className="font-mono text-xs tabular-nums text-muted">
                  {countLabel}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {sectionTools.map((tool, index) => (
                  <ToolCard key={tool.id} tool={tool} index={index} />
                ))}
              </div>
            </div>
          );
        })
      )}
    </section>
  );
}
