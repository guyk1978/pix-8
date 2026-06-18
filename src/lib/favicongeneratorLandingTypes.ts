import type {
  FaviconGeneratorLandingEntry,
  FaviconGeneratorLandingId,
} from "@/lib/favicongeneratorLandings";

export interface FaviconGeneratorLandingBenefit {
  title: string;
  body: string;
}

export interface FaviconGeneratorLandingStep {
  title: string;
  body: string;
}

export interface FaviconGeneratorLandingDisplayFields {
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
  benefits: readonly FaviconGeneratorLandingBenefit[];
  howItWorksHeading: string;
  stepLabel: string;
  howItWorks: readonly FaviconGeneratorLandingStep[];
  faqHeading: string;
  closingCta: { heading: string; body: string; button: string };
}

export type FaviconGeneratorLandingLocaleEntry = FaviconGeneratorLandingEntry &
  FaviconGeneratorLandingDisplayFields;

export interface FaviconGeneratorLandingChrome {
  privacyNote: string;
  relatedUseCasesHeading: string;
  guidesHeading: string;
  toolCardTitle: string;
  toolCardExcerpt: string;
}

export interface FaviconGeneratorArticleLocale {
  href: string;
  title: string;
  excerpt: string;
}

export type FaviconGeneratorLandingsLocaleMap = Record<
  FaviconGeneratorLandingId,
  FaviconGeneratorLandingLocaleEntry
>;
