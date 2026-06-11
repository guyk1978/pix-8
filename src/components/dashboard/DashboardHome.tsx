"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { DashboardTools } from "@/components/dashboard/DashboardTools";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { HOME_HEADER_IMAGES } from "@/lib/characters";

export function DashboardHome() {
  const { t, language } = useLanguage();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const headerAlt = `${t("home.title")} ${t("home.titleMuted")}`;
  const isDark = !mounted || resolvedTheme !== "light";
  const headerSrc = HOME_HEADER_IMAGES[isDark ? "dark" : "light"][language];

  return (
    <>
      <section className="w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={headerSrc}
          alt={headerAlt}
          className="block h-auto w-full"
          decoding="async"
        />
      </section>

      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
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
