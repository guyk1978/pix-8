import type {
  WatermarkLandingEntry,
  WatermarkLandingId,
} from "@/lib/watermarkLandings";

export interface WatermarkLandingBenefit {
  title: string;
  body: string;
}

export interface WatermarkLandingStep {
  title: string;
  body: string;
}

export interface WatermarkLandingDisplayFields {
  eyebrow: string;
  titleMain: string;
  titleAccent: string;
  heroSubtitle: string;
  primaryCta: string;
  ctaNote: string;
  capabilities: readonly string[];
  capabilitiesHeading: string;
  featureCallout: { title: string; body: string };
  benefitsHeading: string;
  benefitsIntro: string;
  benefitsKeyword: string;
  benefitsIntroAfter: string;
  benefits: readonly WatermarkLandingBenefit[];
  howItWorksHeading: string;
  stepLabel: string;
  howItWorks: readonly WatermarkLandingStep[];
  faqHeading: string;
  closingCta: { heading: string; body: string; button: string };
}

export type WatermarkLandingLocaleEntry = WatermarkLandingEntry &
  WatermarkLandingDisplayFields;

export interface WatermarkLandingChrome {
  privacyNote: string;
  relatedUseCasesHeading: string;
  guidesHeading: string;
  toolCardTitle: string;
  toolCardExcerpt: string;
}

export interface WatermarkArticleLocale {
  href: string;
  title: string;
  excerpt: string;
}

export type WatermarkLandingsLocaleMap = Record<
  WatermarkLandingId,
  WatermarkLandingLocaleEntry
>;
