"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";

export function SettingsPageContent() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <section className="mb-8 space-y-3">
        <p className="font-label text-muted">{t("settings.eyebrow")}</p>
        <h1 className="text-2xl font-medium tracking-tight text-foreground">
          {t("settings.title")}
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted">
          {t("settings.description")}
        </p>
      </section>

      <div className="space-y-4">
        <div className="border border-border bg-card p-5">
          <p className="font-label text-muted">{t("settings.privacy")}</p>
          <p className="mt-2 font-mono text-sm text-foreground">
            {t("settings.privacyValue")}
          </p>
          <p className="mt-1 text-xs text-muted">{t("settings.privacyHint")}</p>
        </div>

        <div className="border border-border bg-card p-5">
          <p className="font-label text-muted">{t("settings.processing")}</p>
          <p className="mt-2 font-mono text-sm text-foreground">
            {t("settings.processingValue")}
          </p>
          <p className="mt-1 text-xs text-muted">{t("settings.processingHint")}</p>
        </div>
      </div>
    </div>
  );
}
