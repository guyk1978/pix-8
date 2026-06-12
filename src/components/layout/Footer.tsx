"use client";

import Link from "next/link";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { getToolTranslationKey } from "@/i18n";
import { JOIN_MY_PDF_URL } from "@/lib/external-links";
import {
  getCategoryRoute,
  getToolRoute,
} from "@/lib/navigationConfig";
import { SIDEBAR_NAV_CATEGORIES } from "@/lib/sidebarNav";
import { tools } from "@/lib/tools";

const footerLinkClassName =
  "font-mono text-xs text-muted transition-colors hover:text-foreground";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="glass-panel mt-auto border-x-0 border-b-0">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3 sm:col-span-2 lg:col-span-1">
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-sm font-medium text-foreground">
                pix
              </span>
              <span className="font-mono text-sm font-medium text-accent">
                -8
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              {t("footer.description")}
            </p>
          </div>

          <nav aria-label={t("footer.categories")} className="space-y-2">
            <span className="font-label text-muted">{t("footer.categories")}</span>
            <ul className="space-y-2">
              {SIDEBAR_NAV_CATEGORIES.map((category) => (
                <li key={category.id}>
                  <Link
                    href={getCategoryRoute(category.id)}
                    prefetch
                    className={footerLinkClassName}
                  >
                    {t(`nav.toolCategories.${category.id}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t("footer.tools")} className="space-y-2">
            <span className="font-label text-muted">{t("footer.tools")}</span>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
              {tools.map((tool) => (
                <li key={tool.id}>
                  <Link
                    href={getToolRoute(tool.id)}
                    prefetch
                    className={footerLinkClassName}
                  >
                    {t(getToolTranslationKey(tool.id, "name"))}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <a
            href={JOIN_MY_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex max-w-md flex-col gap-1 rounded-sm border border-border bg-card px-4 py-3 transition-colors hover:border-muted hover:bg-card-hover"
          >
            <span className="font-label text-foreground">
              {t("footer.joinMyPdfTitle")}
            </span>
            <span className="font-mono text-xs text-muted transition-colors group-hover:text-accent">
              {t("footer.joinMyPdfLink")}
            </span>
          </a>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-mono text-xs text-muted">
              {t("footer.copyright", { year })}
            </span>
            <span className="font-label text-muted">{t("footer.zeroUploads")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
