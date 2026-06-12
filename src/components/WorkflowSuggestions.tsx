"use client";

import { AppLink } from "@/components/layout/AppLink";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { getToolTranslationKey } from "@/i18n";
import type { ToolId } from "@/lib/tools";

export interface WorkflowLink {
  name: string;
  href: string;
}

interface WorkflowSuggestionsProps {
  suggestions: WorkflowLink[];
}

function toolIdFromHref(href: string): ToolId | null {
  const match = href.match(/^\/tools\/([^/]+)$/);
  return match?.[1] as ToolId | null;
}

export function WorkflowSuggestions({ suggestions }: WorkflowSuggestionsProps) {
  const { t, dir } = useLanguage();

  if (suggestions.length === 0) return null;

  const arrow = dir === "rtl" ? "←" : "→";

  return (
    <section
      className="mt-6 border-t border-dashed border-border pt-6"
      aria-label={t("toolShell.whatsNext")}
    >
      <h2 className="mb-3 font-label text-muted">{t("toolShell.whatsNext")}</h2>

      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:thin]">
        {suggestions.map((link) => {
          const toolId = toolIdFromHref(link.href);
          const label = toolId
            ? t(getToolTranslationKey(toolId, "name"))
            : link.name;

          return (
            <AppLink
              key={link.href}
              href={link.href}
              className="group shrink-0 rounded-sm border border-border bg-background px-4 py-2.5 font-label text-sm text-muted transition-all hover:border-muted hover:text-foreground hover:shadow-[var(--glow-hover)] focus-visible:border-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-muted"
            >
              <span className="flex items-center gap-2">
                <span>{label}</span>
                <span
                  aria-hidden="true"
                  className="font-mono text-[10px] text-muted transition-colors group-hover:text-accent"
                >
                  {arrow}
                </span>
              </span>
            </AppLink>
          );
        })}
      </div>
    </section>
  );
}
