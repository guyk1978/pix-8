import type {
  ImageFiltersLandingEntry,
  ImageFiltersLandingId,
} from "@/lib/imagefiltersLandings";

export interface ImageFiltersLandingBenefit {
  title: string;
  body: string;
}

export interface ImageFiltersLandingStep {
  title: string;
  body: string;
}

export interface ImageFiltersLandingDisplayFields {
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
  benefits: readonly ImageFiltersLandingBenefit[];
  howItWorksHeading: string;
  stepLabel: string;
  howItWorks: readonly ImageFiltersLandingStep[];
  faqHeading: string;
  closingCta: { heading: string; body: string; button: string };
}

export type ImageFiltersLandingLocaleEntry = ImageFiltersLandingEntry &
  ImageFiltersLandingDisplayFields;

export interface ImageFiltersLandingChrome {
  privacyNote: string;
  relatedUseCasesHeading: string;
  guidesHeading: string;
  toolCardTitle: string;
  toolCardExcerpt: string;
}

export interface ImageFiltersArticleLocale {
  href: string;
  title: string;
  excerpt: string;
}

export type ImageFiltersLandingsLocaleMap = Record<
  ImageFiltersLandingId,
  ImageFiltersLandingLocaleEntry
>;
