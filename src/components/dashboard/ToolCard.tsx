"use client";

import { AppLink } from "@/components/layout/AppLink";
import { ToolIcon } from "@/components/dashboard/ToolIcon";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { getToolTranslationKey } from "@/i18n";
import type { Tool } from "@/lib/tools";

interface ToolCardProps {
  tool: Tool;
  index: number;
}

export function ToolCard({ tool, index }: ToolCardProps) {
  const { t } = useLanguage();

  return (
    <div className="group relative rounded-lg bg-card shadow-[var(--shadow-elevated)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-card-hover hover:shadow-[var(--shadow-hover)]">
      <div className="absolute top-3 z-10 end-3">
        <FavoriteButton toolSlug={tool.id} size="sm" />
      </div>

      <AppLink href={tool.href} className="flex gap-4 p-4 sm:p-5">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-background text-muted shadow-[var(--shadow-elevated)] transition-all duration-200 group-hover:text-foreground group-hover:shadow-[var(--shadow-hover)]"
          aria-hidden
        >
          <ToolIcon id={tool.id} className="h-[18px] w-[18px]" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2 pe-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
              <h3 className="text-sm font-medium leading-none tracking-tight text-foreground">
                {t(getToolTranslationKey(tool.id, "name"))}
              </h3>
              {tool.status === "ready" && (
                <span className="rounded-md bg-background px-1.5 py-0.5 font-label text-muted shadow-[var(--shadow-elevated)]">
                  {t("common.ready")}
                </span>
              )}
            </div>
            <span className="font-mono text-[10px] tabular-nums text-muted">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <p className="line-clamp-2 text-xs leading-relaxed text-muted">
            {t(getToolTranslationKey(tool.id, "description"))}
          </p>

          <div className="mt-auto flex items-center justify-between pt-1">
            <span className="font-label text-muted">{tool.tag}</span>
            <span className="font-label text-muted opacity-0 transition-opacity group-hover:opacity-100">
              {t("common.open")}
            </span>
          </div>
        </div>
      </AppLink>
    </div>
  );
}
