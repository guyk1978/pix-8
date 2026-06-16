import type {
  MemeGeneratorLandingEntry,
  MemeGeneratorLandingId,
} from "@/lib/memeGeneratorLandings";

export interface MemeGeneratorLandingBenefit {
  title: string;
  body: string;
}

export interface MemeGeneratorLandingStep {
  title: string;
  body: string;
}

export interface MemeGeneratorLandingDisplayFields {
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
  benefits: readonly MemeGeneratorLandingBenefit[];
  howItWorksHeading: string;
  stepLabel: string;
  howItWorks: readonly MemeGeneratorLandingStep[];
  faqHeading: string;
  closingCta: { heading: string; body: string; button: string };
}

export type MemeGeneratorLandingLocaleEntry = MemeGeneratorLandingEntry &
  MemeGeneratorLandingDisplayFields;

export interface MemeGeneratorLandingChrome {
  privacyNote: string;
  relatedUseCasesHeading: string;
  guidesHeading: string;
  toolCardTitle: string;
  toolCardExcerpt: string;
}

export interface MemeGeneratorArticleLocale {
  href: string;
  title: string;
  excerpt: string;
}

export type MemeGeneratorLandingsLocaleMap = Record<
  MemeGeneratorLandingId,
  MemeGeneratorLandingLocaleEntry
>;
