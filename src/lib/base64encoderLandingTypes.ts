import type {
  Base64EncoderLandingEntry,
  Base64EncoderLandingId,
} from "@/lib/base64encoderLandings";

export interface Base64EncoderLandingBenefit {
  title: string;
  body: string;
}

export interface Base64EncoderLandingStep {
  title: string;
  body: string;
}

export interface Base64EncoderLandingDisplayFields {
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
  benefits: readonly Base64EncoderLandingBenefit[];
  howItWorksHeading: string;
  stepLabel: string;
  howItWorks: readonly Base64EncoderLandingStep[];
  faqHeading: string;
  closingCta: { heading: string; body: string; button: string };
}

export type Base64EncoderLandingLocaleEntry = Base64EncoderLandingEntry &
  Base64EncoderLandingDisplayFields;

export interface Base64EncoderLandingChrome {
  privacyNote: string;
  relatedUseCasesHeading: string;
  guidesHeading: string;
  toolCardTitle: string;
  toolCardExcerpt: string;
}

export interface Base64EncoderArticleLocale {
  href: string;
  title: string;
  excerpt: string;
}

export type Base64EncoderLandingsLocaleMap = Record<
  Base64EncoderLandingId,
  Base64EncoderLandingLocaleEntry
>;
