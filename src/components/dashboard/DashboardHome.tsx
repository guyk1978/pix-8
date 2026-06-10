"use client";

import { DashboardTools } from "@/components/dashboard/DashboardTools";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export function DashboardHome() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <section className="mb-10 space-y-3">
        <p className="font-label text-muted">{t("home.eyebrow")}</p>
        <h1 className="max-w-xl text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
          {t("home.title")}
          <span className="block text-muted">{t("home.titleMuted")}</span>
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted">
          {t("home.description")}
        </p>
      </section>

      <DashboardTools />

      <section className="mt-10 grid gap-3 border border-border bg-card p-4 sm:grid-cols-3 sm:p-5">
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
  );
}
