import type {
  TextOverlayLandingEntry,
  TextOverlayLandingId,
} from "@/lib/textOverlayLandings";

export interface TextOverlayLandingBenefit {
  title: string;
  body: string;
}

export interface TextOverlayLandingStep {
  title: string;
  body: string;
}

export interface TextOverlayLandingDisplayFields {
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
  benefits: readonly TextOverlayLandingBenefit[];
  howItWorksHeading: string;
  stepLabel: string;
  howItWorks: readonly TextOverlayLandingStep[];
  faqHeading: string;
  closingCta: { heading: string; body: string; button: string };
}

export type TextOverlayLandingLocaleEntry = TextOverlayLandingEntry &
  TextOverlayLandingDisplayFields;

export interface TextOverlayLandingChrome {
  privacyNote: string;
  relatedUseCasesHeading: string;
  guidesHeading: string;
  toolCardTitle: string;
  toolCardExcerpt: string;
}

export interface TextOverlayArticleLocale {
  href: string;
  title: string;
  excerpt: string;
}

export type TextOverlayLandingsLocaleMap = Record<
  TextOverlayLandingId,
  TextOverlayLandingLocaleEntry
>;
