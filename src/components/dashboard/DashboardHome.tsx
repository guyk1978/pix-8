"use client";

import { CharacterRoster } from "@/components/characters/CharacterRoster";
import { HelperCharacter } from "@/components/characters/HelperCharacter";
import { ProcessingIndicator } from "@/components/characters/ProcessingIndicator";
import { DashboardTools } from "@/components/dashboard/DashboardTools";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { CHARACTER_SIZES } from "@/lib/characters";

export function DashboardHome() {
  const { t, dir } = useLanguage();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <section className="mb-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1 space-y-4">
            <p className="font-label text-muted">{t("home.eyebrow")}</p>
            <div className="flex items-start gap-5">
              <div className="min-w-0 flex-1 space-y-3">
                <h1 className="max-w-xl text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                  {t("home.title")}
                  <span className="block text-muted">{t("home.titleMuted")}</span>
                </h1>
                <p className="max-w-2xl text-sm leading-relaxed text-muted">
                  {t("home.description")}
                </p>
              </div>
              <HelperCharacter
                character="base"
                alt={t("characters.guideAlt")}
                size={CHARACTER_SIZES.dashboard}
                glow
                className={`hidden shrink-0 sm:block ${dir === "rtl" ? "-scale-x-100" : ""}`}
                animate="wave"
              />
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-center gap-3 self-center lg:self-start">
            <ProcessingIndicator size="lg" />
            <p className="max-w-[11rem] text-center font-label text-[10px] leading-relaxed text-muted">
              {t("characters.localProcessing")}
            </p>
          </div>
        </div>
      </section>

      <section className="glow-panel mb-10 overflow-visible rounded-sm bg-card px-4 py-6 sm:px-8 sm:py-8">
        <CharacterRoster />
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
  );
}
