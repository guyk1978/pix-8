"use client";

import Link from "next/link";
import { ToolCard } from "@/components/dashboard/ToolCard";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import {
  getToolCategoryHref,
  TOOL_CATEGORY_FAQ_COUNT,
} from "@/lib/toolCategoryPages";
import {
  getSidebarCategoryTools,
  SIDEBAR_NAV_CATEGORIES,
  type SidebarNavCategoryId,
} from "@/lib/sidebarNav";

interface ToolCategoryPageContentProps {
  categoryId: SidebarNavCategoryId;
}

export function ToolCategoryPageContent({
  categoryId,
}: ToolCategoryPageContentProps) {
  const { t } = useLanguage();
  const category = SIDEBAR_NAV_CATEGORIES.find((item) => item.id === categoryId);
  const tools = category ? getSidebarCategoryTools(category) : [];
  const contentKey = `toolCategoryPages.${categoryId}`;

  const otherCategories = SIDEBAR_NAV_CATEGORIES.filter(
    (item) => item.id !== categoryId,
  );

  const faqItems = Array.from({ length: TOOL_CATEGORY_FAQ_COUNT }, (_, index) => {
    const n = index + 1;
    return {
      question: t(`${contentKey}.faq${n}Question`),
      answer: t(`${contentKey}.faq${n}Answer`),
    };
  });

  const benefitItems = [1, 2, 3].map((n) =>
    t(`${contentKey}.benefit${n}`),
  );

  const toolCountLabel =
    tools.length === 1
      ? t("toolCategoryPages.toolCountOne")
      : t("toolCategoryPages.toolCount", { count: tools.length });

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <nav
        aria-label={t("toolCategoryPages.breadcrumbLabel")}
        className="mb-6 font-mono text-[10px] text-muted"
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="transition-colors hover:text-foreground">
              {t("toolCategoryPages.breadcrumbHome")}
            </Link>
          </li>
          <li aria-hidden>·</li>
          <li>
            <Link href="/" className="transition-colors hover:text-foreground">
              {t("toolCategoryPages.breadcrumbTools")}
            </Link>
          </li>
          <li aria-hidden>·</li>
          <li className="text-foreground">{t(`nav.toolCategories.${categoryId}`)}</li>
        </ol>
      </nav>

      <header className="mb-10 max-w-3xl space-y-4">
        <p className="font-label text-muted">{t("toolCategoryPages.eyebrow")}</p>
        <h1 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
          {t(`${contentKey}.title`)}
        </h1>
        <p className="text-sm leading-relaxed text-muted">
          {t(`${contentKey}.description`)}
        </p>
        <p className="text-sm leading-relaxed text-muted">
          {t(`${contentKey}.intro`)}
        </p>
      </header>

      <section className="mb-10">
        <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
          <h2 className="font-label text-foreground">
            {t("toolCategoryPages.toolsHeading")}
          </h2>
          <span className="font-mono text-xs tabular-nums text-muted">
            {toolCountLabel}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, index) => (
            <ToolCard key={tool.id} tool={tool} index={index} />
          ))}
        </div>
      </section>

      <section className="glow-panel mb-10 rounded-sm border border-border bg-card p-5 sm:p-6">
        <h2 className="font-label text-foreground">
          {t(`${contentKey}.benefitsTitle`)}
        </h2>
        <ul className="mt-4 space-y-3">
          {benefitItems.map((benefit) => (
            <li
              key={benefit}
              className="flex gap-3 text-sm leading-relaxed text-muted"
            >
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--glow-teal)]"
                aria-hidden
              />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-label text-foreground">
          {t("toolCategoryPages.faqHeading")}
        </h2>
        <div className="space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group rounded-sm border border-border bg-card open:bg-surface/40"
            >
              <summary className="cursor-pointer list-none px-4 py-3 font-label text-sm text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-3">
                  {item.question}
                  <span
                    className="font-mono text-xs text-muted transition-transform group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="border-t border-border px-4 py-3 text-sm leading-relaxed text-muted">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="mb-10 rounded-sm border border-dashed border-border bg-background p-4 text-center sm:p-5">
        <p className="font-mono text-[10px] text-muted">
          {t("toolCategoryPages.privacyNote")}
        </p>
      </section>

      <section>
        <h2 className="mb-4 font-label text-foreground">
          {t("toolCategoryPages.otherCategories")}
        </h2>
        <div className="grid gap-2 sm:grid-cols-3">
          {otherCategories.map((item) => (
            <Link
              key={item.id}
              href={getToolCategoryHref(item.id)}
              className="rounded-sm border border-border bg-card px-4 py-3 font-label text-sm text-muted transition-colors hover:border-muted hover:bg-surface hover:text-foreground"
            >
              {t(`nav.toolCategories.${item.id}`)}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
