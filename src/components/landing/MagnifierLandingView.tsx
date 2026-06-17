"use client";

import { MagnifierLandingRelatedUseCases } from "@/components/landing/MagnifierLandingRelatedUseCases";
import {
  LandingCapabilitiesList,
  LandingCtaButton,
  LandingFeatureCallout,
} from "@/components/landing/landingUi";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import {
  MAGNIFIER_LANDING_ACCENT,
  MAGNIFIER_TOOL_HREF,
  type MagnifierLandingId,
} from "@/lib/magnifierLandings";
import {
  getMagnifierLandingChrome,
  getMagnifierLandingEntry,
} from "@/lib/magnifierLandingsLocale";
import { Eye, Search, ZoomIn, type LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";

const DEFAULT_BENEFIT_ICONS = [ZoomIn, Search, Eye] as const;

interface MagnifierLandingViewProps {
  landingId: MagnifierLandingId;
}

export function MagnifierLandingView({
  landingId,
}: MagnifierLandingViewProps) {
  const { language, dir } = useLanguage();
  const landing = getMagnifierLandingEntry(language, landingId);
  const chrome = getMagnifierLandingChrome(language);
  const accent = MAGNIFIER_LANDING_ACCENT;

  return (
    <div
      dir={dir}
      lang={language}
      className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12"
      style={{ "--landing-accent": accent } as CSSProperties}
    >
      <section className="mb-14 sm:mb-16">
        <p
          className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em]"
          style={{ color: accent }}
        >
          {landing.eyebrow}
        </p>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
          <div className="max-w-2xl space-y-5">
            <h1 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
              {landing.titleMain} —{" "}
              <span className="text-muted">{landing.titleAccent}</span>
            </h1>
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              {landing.heroSubtitle}
            </p>
            <div
              className={`flex flex-col gap-3 sm:items-center ${
                dir === "rtl" ? "sm:flex-row-reverse sm:justify-end" : "sm:flex-row"
              }`}
            >
              <LandingCtaButton href={MAGNIFIER_TOOL_HREF} accent={accent}>
                {landing.primaryCta}
              </LandingCtaButton>
              <p className="font-mono text-[10px] text-muted">{landing.ctaNote}</p>
            </div>
          </div>

          <div className="rounded-sm border border-border bg-card p-5 sm:p-6">
            <p className="font-label text-muted">{landing.capabilitiesHeading}</p>
            <LandingCapabilitiesList
              capabilities={landing.capabilities}
              accent={accent}
            />
          </div>
        </div>
      </section>

      <section className="mb-14 sm:mb-16">
        <LandingFeatureCallout
          title={landing.featureCallout.title}
          body={landing.featureCallout.body}
          accent={accent}
        />
      </section>

      <section className="mb-14 sm:mb-16">
        <h2 className="mb-2 font-label text-foreground">{landing.benefitsHeading}</h2>
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-muted">
          {landing.benefitsIntro}
          <strong className="font-medium text-foreground">
            {landing.benefitsKeyword}
          </strong>
          {landing.benefitsIntroAfter}
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          {landing.benefits.map(({ title, body }, index) => {
            const Icon: LucideIcon = DEFAULT_BENEFIT_ICONS[index] ?? ZoomIn;
            return (
              <article
                key={title}
                className="rounded-sm border border-border bg-card p-5"
              >
                <div
                  className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-sm border border-border"
                  style={{ color: accent }}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                </div>
                <h3 className="text-sm font-medium text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mb-14 sm:mb-16">
        <h2 className="mb-8 font-label text-foreground">
          {landing.howItWorksHeading}
        </h2>
        <ol className="grid gap-4 md:grid-cols-3">
          {landing.howItWorks.map((step, index) => (
            <li
              key={step.title}
              className="rounded-sm border border-border bg-background p-5"
            >
              <p
                className="font-mono text-[10px] tabular-nums"
                style={{ color: accent }}
              >
                {landing.stepLabel} {index + 1}
              </p>
              <h3 className="mt-2 text-sm font-medium text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-14 sm:mb-16">
        <h2 className="mb-6 font-label text-foreground">{landing.faqHeading}</h2>
        <div className="space-y-3">
          {landing.faq.map((item) => (
            <details
              key={item.question}
              className="group rounded-sm border border-border bg-card open:bg-surface/40"
            >
              <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-3">
                  <h3 className="text-start text-sm font-medium">
                    {item.question}
                  </h3>
                  <span
                    className="shrink-0 font-mono text-xs text-muted transition-transform group-open:rotate-45"
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

      <MagnifierLandingRelatedUseCases currentLandingId={landingId} />

      <section className="rounded-sm border border-border bg-card p-6 text-center sm:p-8">
        <h2 className="text-xl font-medium tracking-tight text-foreground sm:text-2xl">
          {landing.closingCta.heading}
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted">
          {landing.closingCta.body}
        </p>
        <div className="mt-6 flex flex-col items-center gap-3">
          <LandingCtaButton href={MAGNIFIER_TOOL_HREF} accent={accent}>
            {landing.closingCta.button}
          </LandingCtaButton>
          <p className="font-mono text-[10px] leading-relaxed text-muted">
            {chrome.privacyNote}
          </p>
        </div>
      </section>
    </div>
  );
}
