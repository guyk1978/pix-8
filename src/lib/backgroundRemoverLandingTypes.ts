import type {
  BackgroundRemoverLandingEntry,
  BackgroundRemoverLandingId,
} from "@/lib/backgroundRemoverLandings";

export interface BackgroundRemoverLandingBenefit {
  title: string;
  body: string;
}

export interface BackgroundRemoverLandingStep {
  title: string;
  body: string;
}

export interface BackgroundRemoverLandingDisplayFields {
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
  benefits: readonly BackgroundRemoverLandingBenefit[];
  howItWorksHeading: string;
  stepLabel: string;
  howItWorks: readonly BackgroundRemoverLandingStep[];
  faqHeading: string;
  closingCta: { heading: string; body: string; button: string };
}

export type BackgroundRemoverLandingLocaleEntry = BackgroundRemoverLandingEntry &
  BackgroundRemoverLandingDisplayFields;

export interface BackgroundRemoverLandingChrome {
  privacyNote: string;
  relatedUseCasesHeading: string;
  guidesHeading: string;
  toolCardTitle: string;
  toolCardExcerpt: string;
}

export interface BackgroundRemoverArticleLocale {
  href: string;
  title: string;
  excerpt: string;
}

export type BackgroundRemoverLandingsLocaleMap = Record<
  BackgroundRemoverLandingId,
  BackgroundRemoverLandingLocaleEntry
>;
