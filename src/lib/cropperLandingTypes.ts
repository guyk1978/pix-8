import type {
  CropperLandingEntry,
  CropperLandingId,
} from "@/lib/cropperLandings";

export interface CropperLandingBenefit {
  title: string;
  body: string;
}

export interface CropperLandingStep {
  title: string;
  body: string;
}

export interface CropperLandingDisplayFields {
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
  benefits: readonly CropperLandingBenefit[];
  howItWorksHeading: string;
  stepLabel: string;
  howItWorks: readonly CropperLandingStep[];
  faqHeading: string;
  closingCta: { heading: string; body: string; button: string };
}

export type CropperLandingLocaleEntry = CropperLandingEntry &
  CropperLandingDisplayFields;

export interface CropperLandingChrome {
  privacyNote: string;
  relatedUseCasesHeading: string;
  guidesHeading: string;
  toolCardTitle: string;
  toolCardExcerpt: string;
}

export interface CropperArticleLocale {
  href: string;
  title: string;
  excerpt: string;
}

export type CropperLandingsLocaleMap = Record<
  CropperLandingId,
  CropperLandingLocaleEntry
>;
