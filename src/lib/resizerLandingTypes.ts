import type {
  ResizerLandingEntry,
  ResizerLandingId,
} from "@/lib/resizerLandings";

export interface ResizerLandingBenefit {
  title: string;
  body: string;
}

export interface ResizerLandingStep {
  title: string;
  body: string;
}

export interface ResizerLandingDisplayFields {
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
  benefits: readonly ResizerLandingBenefit[];
  howItWorksHeading: string;
  stepLabel: string;
  howItWorks: readonly ResizerLandingStep[];
  faqHeading: string;
  closingCta: { heading: string; body: string; button: string };
}

export type ResizerLandingLocaleEntry = ResizerLandingEntry &
  ResizerLandingDisplayFields;

export interface ResizerLandingChrome {
  privacyNote: string;
  relatedUseCasesHeading: string;
  guidesHeading: string;
  toolCardTitle: string;
  toolCardExcerpt: string;
}

export interface ResizerArticleLocale {
  href: string;
  title: string;
  excerpt: string;
}

export type ResizerLandingsLocaleMap = Record<
  ResizerLandingId,
  ResizerLandingLocaleEntry
>;
