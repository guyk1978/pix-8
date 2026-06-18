import type {
  CssPaletteGenLandingEntry,
  CssPaletteGenLandingId,
} from "@/lib/csspalettegenLandings";

export interface CssPaletteGenLandingBenefit {
  title: string;
  body: string;
}

export interface CssPaletteGenLandingStep {
  title: string;
  body: string;
}

export interface CssPaletteGenLandingDisplayFields {
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
  benefits: readonly CssPaletteGenLandingBenefit[];
  howItWorksHeading: string;
  stepLabel: string;
  howItWorks: readonly CssPaletteGenLandingStep[];
  faqHeading: string;
  closingCta: { heading: string; body: string; button: string };
}

export type CssPaletteGenLandingLocaleEntry = CssPaletteGenLandingEntry &
  CssPaletteGenLandingDisplayFields;

export interface CssPaletteGenLandingChrome {
  privacyNote: string;
  relatedUseCasesHeading: string;
  guidesHeading: string;
  toolCardTitle: string;
  toolCardExcerpt: string;
}

export interface CssPaletteGenArticleLocale {
  href: string;
  title: string;
  excerpt: string;
}

export type CssPaletteGenLandingsLocaleMap = Record<
  CssPaletteGenLandingId,
  CssPaletteGenLandingLocaleEntry
>;
