import type {
  ImageOverlayLandingEntry,
  ImageOverlayLandingId,
} from "@/lib/imageOverlayLandings";

export interface ImageOverlayLandingBenefit {
  title: string;
  body: string;
}

export interface ImageOverlayLandingStep {
  title: string;
  body: string;
}

export interface ImageOverlayLandingDisplayFields {
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
  benefits: readonly ImageOverlayLandingBenefit[];
  howItWorksHeading: string;
  stepLabel: string;
  howItWorks: readonly ImageOverlayLandingStep[];
  faqHeading: string;
  closingCta: { heading: string; body: string; button: string };
}

export type ImageOverlayLandingLocaleEntry = ImageOverlayLandingEntry &
  ImageOverlayLandingDisplayFields;

export interface ImageOverlayLandingChrome {
  privacyNote: string;
  relatedUseCasesHeading: string;
  guidesHeading: string;
  toolCardTitle: string;
  toolCardExcerpt: string;
}

export interface ImageOverlayArticleLocale {
  href: string;
  title: string;
  excerpt: string;
}

export type ImageOverlayLandingsLocaleMap = Record<
  ImageOverlayLandingId,
  ImageOverlayLandingLocaleEntry
>;
