import type {
  ImageToSvgLandingEntry,
  ImageToSvgLandingId,
} from "@/lib/imagetosvgLandings";

export interface ImageToSvgLandingBenefit {
  title: string;
  body: string;
}

export interface ImageToSvgLandingStep {
  title: string;
  body: string;
}

export interface ImageToSvgLandingDisplayFields {
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
  benefits: readonly ImageToSvgLandingBenefit[];
  howItWorksHeading: string;
  stepLabel: string;
  howItWorks: readonly ImageToSvgLandingStep[];
  faqHeading: string;
  closingCta: { heading: string; body: string; button: string };
}

export type ImageToSvgLandingLocaleEntry = ImageToSvgLandingEntry &
  ImageToSvgLandingDisplayFields;

export interface ImageToSvgLandingChrome {
  privacyNote: string;
  relatedUseCasesHeading: string;
  guidesHeading: string;
  toolCardTitle: string;
  toolCardExcerpt: string;
}

export interface ImageToSvgArticleLocale {
  href: string;
  title: string;
  excerpt: string;
}

export type ImageToSvgLandingsLocaleMap = Record<
  ImageToSvgLandingId,
  ImageToSvgLandingLocaleEntry
>;
