import type {
  ImageCollageLandingEntry,
  ImageCollageLandingId,
} from "@/lib/imageCollageLandings";

export interface ImageCollageLandingBenefit {
  title: string;
  body: string;
}

export interface ImageCollageLandingStep {
  title: string;
  body: string;
}

export interface ImageCollageLandingDisplayFields {
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
  benefits: readonly ImageCollageLandingBenefit[];
  howItWorksHeading: string;
  stepLabel: string;
  howItWorks: readonly ImageCollageLandingStep[];
  faqHeading: string;
  closingCta: { heading: string; body: string; button: string };
}

export type ImageCollageLandingLocaleEntry = ImageCollageLandingEntry &
  ImageCollageLandingDisplayFields;

export interface ImageCollageLandingChrome {
  privacyNote: string;
  relatedUseCasesHeading: string;
  guidesHeading: string;
  toolCardTitle: string;
  toolCardExcerpt: string;
}

export interface ImageCollageArticleLocale {
  href: string;
  title: string;
  excerpt: string;
}

export type ImageCollageLandingsLocaleMap = Record<
  ImageCollageLandingId,
  ImageCollageLandingLocaleEntry
>;
