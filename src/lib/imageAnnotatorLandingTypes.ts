import type { ImageAnnotatorLandingEntry, ImageAnnotatorLandingId } from "@/lib/imageAnnotatorLandings";

export interface ImageAnnotatorLandingBenefit {
  title: string;
  body: string;
}

export interface ImageAnnotatorLandingStep {
  title: string;
  body: string;
}

export interface ImageAnnotatorLandingDisplayFields {
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
  benefits: readonly ImageAnnotatorLandingBenefit[];
  howItWorksHeading: string;
  stepLabel: string;
  howItWorks: readonly ImageAnnotatorLandingStep[];
  faqHeading: string;
  closingCta: { heading: string; body: string; button: string };
}

export type ImageAnnotatorLandingLocaleEntry = ImageAnnotatorLandingEntry &
  ImageAnnotatorLandingDisplayFields;

export interface ImageAnnotatorLandingChrome {
  privacyNote: string;
  relatedUseCasesHeading: string;
  guidesHeading: string;
  toolCardTitle: string;
  toolCardExcerpt: string;
}

export interface ImageAnnotatorArticleLocale {
  href: string;
  title: string;
  excerpt: string;
}

export type ImageAnnotatorLandingsLocaleMap = Record<
  ImageAnnotatorLandingId,
  ImageAnnotatorLandingLocaleEntry
>;
