import type {
  PaletteExtractorLandingEntry,
  PaletteExtractorLandingId,
} from "@/lib/paletteextractorLandings";

export interface PaletteExtractorLandingBenefit {
  title: string;
  body: string;
}

export interface PaletteExtractorLandingStep {
  title: string;
  body: string;
}

export interface PaletteExtractorLandingDisplayFields {
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
  benefits: readonly PaletteExtractorLandingBenefit[];
  howItWorksHeading: string;
  stepLabel: string;
  howItWorks: readonly PaletteExtractorLandingStep[];
  faqHeading: string;
  closingCta: { heading: string; body: string; button: string };
}

export type PaletteExtractorLandingLocaleEntry = PaletteExtractorLandingEntry &
  PaletteExtractorLandingDisplayFields;

export interface PaletteExtractorLandingChrome {
  privacyNote: string;
  relatedUseCasesHeading: string;
  guidesHeading: string;
  toolCardTitle: string;
  toolCardExcerpt: string;
}

export interface PaletteExtractorArticleLocale {
  href: string;
  title: string;
  excerpt: string;
}

export type PaletteExtractorLandingsLocaleMap = Record<
  PaletteExtractorLandingId,
  PaletteExtractorLandingLocaleEntry
>;
