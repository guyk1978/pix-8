import type {
  RotateFlipLandingEntry,
  RotateFlipLandingId,
} from "@/lib/rotateFlipLandings";

export interface RotateFlipLandingBenefit {
  title: string;
  body: string;
}

export interface RotateFlipLandingStep {
  title: string;
  body: string;
}

export interface RotateFlipLandingDisplayFields {
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
  benefits: readonly RotateFlipLandingBenefit[];
  howItWorksHeading: string;
  stepLabel: string;
  howItWorks: readonly RotateFlipLandingStep[];
  faqHeading: string;
  closingCta: { heading: string; body: string; button: string };
}

export type RotateFlipLandingLocaleEntry = RotateFlipLandingEntry &
  RotateFlipLandingDisplayFields;

export interface RotateFlipLandingChrome {
  privacyNote: string;
  relatedUseCasesHeading: string;
  guidesHeading: string;
  toolCardTitle: string;
  toolCardExcerpt: string;
}

export interface RotateFlipArticleLocale {
  href: string;
  title: string;
  excerpt: string;
}

export type RotateFlipLandingsLocaleMap = Record<
  RotateFlipLandingId,
  RotateFlipLandingLocaleEntry
>;
