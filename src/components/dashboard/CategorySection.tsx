"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AppLink } from "@/components/layout/AppLink";
import { ToolCard } from "@/components/dashboard/ToolCard";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  getHomeGridColumnsPerRow,
  type HomeToolCategoryId,
} from "@/lib/homeToolCategories";
import { getToolCategoryHref } from "@/lib/toolCategoryPages";
import type { Tool } from "@/lib/tools";

interface CategorySectionProps {
  categoryId: HomeToolCategoryId;
  tools: Tool[];
}

export function CategorySection({ categoryId, tools }: CategorySectionProps) {
  const { t } = useLanguage();
  const isLg = useMediaQuery("(min-width: 1024px)");
  const isSm = useMediaQuery("(min-width: 640px)");
  const [expanded, setExpanded] = useState(false);

  const columnsPerRow = getHomeGridColumnsPerRow(isLg, isSm);
  const hasOverflow = tools.length > columnsPerRow;
  const firstRowTools = hasOverflow ? tools.slice(0, columnsPerRow) : tools;
  const remainingTools = hasOverflow ? tools.slice(columnsPerRow) : [];

  const countLabel =
    tools.length === 1
      ? `1 ${t("home.utility")}`
      : `${tools.length} ${t("home.utilities")}`;

  const headingId = `home-category-${categoryId}-heading`;

  return (
    <section aria-labelledby={headingId} className="space-y-3">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h2 id={headingId} className="font-label text-foreground">
          <AppLink
            href={getToolCategoryHref(categoryId)}
            className="transition-colors hover:text-[color-mix(in_srgb,var(--glow-teal)_55%,var(--foreground))]"
          >
            {t(`nav.toolCategories.${categoryId}`)}
          </AppLink>
        </h2>
        <span className="font-mono text-xs tabular-nums text-muted">{countLabel}</span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {firstRowTools.map((tool, index) => (
          <ToolCard key={tool.id} tool={tool} index={index} />
        ))}
      </div>

      {hasOverflow && (
        <>
          <div
            id={`${headingId}-tools`}
            className="grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none"
            style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              <div className="grid grid-cols-1 gap-3 pt-3 sm:grid-cols-2 lg:grid-cols-3">
                {remainingTools.map((tool, index) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    index={columnsPerRow + index}
                  />
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={`${headingId}-tools`}
            onClick={() => setExpanded((value) => !value)}
            className="flex w-full items-center justify-center gap-2 rounded-sm border border-border bg-card px-4 py-2.5 font-label text-sm text-muted transition-[background-color,border-color,color] duration-200 hover:border-[color-mix(in_srgb,var(--glow-teal)_35%,var(--border))] hover:bg-card-hover hover:text-foreground"
          >
            {expanded ? t("home.showLess") : t("home.showMore")}
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ease-in-out motion-reduce:transition-none ${
                expanded ? "rotate-180" : ""
              }`}
              aria-hidden
            />
          </button>
        </>
      )}
    </section>
  );
}
