import type {
  MagnifierLandingEntry,
  MagnifierLandingId,
} from "@/lib/magnifierLandings";

export interface MagnifierLandingBenefit {
  title: string;
  body: string;
}

export interface MagnifierLandingStep {
  title: string;
  body: string;
}

export interface MagnifierLandingDisplayFields {
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
  benefits: readonly MagnifierLandingBenefit[];
  howItWorksHeading: string;
  stepLabel: string;
  howItWorks: readonly MagnifierLandingStep[];
  faqHeading: string;
  closingCta: { heading: string; body: string; button: string };
}

export type MagnifierLandingLocaleEntry = MagnifierLandingEntry &
  MagnifierLandingDisplayFields;

export interface MagnifierLandingChrome {
  privacyNote: string;
  relatedUseCasesHeading: string;
  guidesHeading: string;
  toolCardTitle: string;
  toolCardExcerpt: string;
}

export interface MagnifierArticleLocale {
  href: string;
  title: string;
  excerpt: string;
}

export type MagnifierLandingsLocaleMap = Record<
  MagnifierLandingId,
  MagnifierLandingLocaleEntry
>;
