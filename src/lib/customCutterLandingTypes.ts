import type {
  CustomCutterLandingEntry,
  CustomCutterLandingId,
} from "@/lib/customCutterLandings";

export interface CustomCutterLandingBenefit {
  title: string;
  body: string;
}

export interface CustomCutterLandingStep {
  title: string;
  body: string;
}

export interface CustomCutterLandingDisplayFields {
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
  benefits: readonly CustomCutterLandingBenefit[];
  howItWorksHeading: string;
  stepLabel: string;
  howItWorks: readonly CustomCutterLandingStep[];
  faqHeading: string;
  closingCta: { heading: string; body: string; button: string };
}

export type CustomCutterLandingLocaleEntry = CustomCutterLandingEntry &
  CustomCutterLandingDisplayFields;

export interface CustomCutterLandingChrome {
  privacyNote: string;
  relatedUseCasesHeading: string;
  guidesHeading: string;
  toolCardTitle: string;
  toolCardExcerpt: string;
}

export interface CustomCutterArticleLocale {
  href: string;
  title: string;
  excerpt: string;
}

export type CustomCutterLandingsLocaleMap = Record<
  CustomCutterLandingId,
  CustomCutterLandingLocaleEntry
>;
