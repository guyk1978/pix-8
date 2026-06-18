import type {
  ColorPickerLandingEntry,
  ColorPickerLandingId,
} from "@/lib/colorpickerLandings";

export interface ColorPickerLandingBenefit {
  title: string;
  body: string;
}

export interface ColorPickerLandingStep {
  title: string;
  body: string;
}

export interface ColorPickerLandingDisplayFields {
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
  benefits: readonly ColorPickerLandingBenefit[];
  howItWorksHeading: string;
  stepLabel: string;
  howItWorks: readonly ColorPickerLandingStep[];
  faqHeading: string;
  closingCta: { heading: string; body: string; button: string };
}

export type ColorPickerLandingLocaleEntry = ColorPickerLandingEntry &
  ColorPickerLandingDisplayFields;

export interface ColorPickerLandingChrome {
  privacyNote: string;
  relatedUseCasesHeading: string;
  guidesHeading: string;
  toolCardTitle: string;
  toolCardExcerpt: string;
}

export interface ColorPickerArticleLocale {
  href: string;
  title: string;
  excerpt: string;
}

export type ColorPickerLandingsLocaleMap = Record<
  ColorPickerLandingId,
  ColorPickerLandingLocaleEntry
>;
