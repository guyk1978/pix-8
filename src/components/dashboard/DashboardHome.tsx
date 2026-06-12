"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { DashboardTools } from "@/components/dashboard/DashboardTools";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { getToolCategoryHref } from "@/lib/toolCategoryPages";
import { SIDEBAR_NAV_CATEGORIES } from "@/lib/sidebarNav";

export function DashboardHome() {
  const { t } = useLanguage();

  return (
    <>
      <section className="brand-logo-hero-section">
        <BrandLogo size="hero" showTagline showGlow />
      </section>

      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <section className="mb-8">
          <p className="mb-3 font-label text-muted">{t("home.browseCategories")}</p>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {SIDEBAR_NAV_CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={getToolCategoryHref(category.id)}
                className="rounded-sm border border-border bg-card px-3 py-3 font-label text-sm text-muted transition-colors hover:border-[color-mix(in_srgb,var(--glow-teal)_35%,var(--border))] hover:bg-card-hover hover:text-foreground"
              >
                {t(`nav.toolCategories.${category.id}`)}
              </Link>
            ))}
          </div>
        </section>

        <DashboardTools />

        <section className="glow-panel mt-10 grid gap-3 rounded-sm bg-card p-4 sm:grid-cols-3 sm:p-5">
          <div className="space-y-1">
            <p className="font-label text-muted">{t("home.processing")}</p>
            <p className="font-mono text-sm text-foreground">
              {t("home.processingValue")}
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-label text-muted">{t("home.uploads")}</p>
            <p className="font-mono text-sm text-foreground">
              {t("home.uploadsValue")}
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-label text-muted">{t("home.engine")}</p>
            <p className="font-mono text-sm text-foreground">
              {t("home.engineValue")}
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
