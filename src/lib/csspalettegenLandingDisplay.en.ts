import type {
  CssPaletteGenLandingChrome,
  CssPaletteGenLandingDisplayFields,
} from "@/lib/csspalettegenLandingTypes";
import type { CssPaletteGenLandingId } from "@/lib/csspalettegenLandings";

export const CSS_PALETTE_GEN_LANDING_CHROME_EN: CssPaletteGenLandingChrome = {
  privacyNote:
    "Client-side processing only — your photo never leaves the browser.",
  relatedUseCasesHeading: "Related use cases",
  guidesHeading: "Guides",
  toolCardTitle: "CSS Palette Generator",
  toolCardExcerpt:
    "Open the workspace — extract roles and copy CSS, SCSS, JSON, or Tailwind locally.",
};

export const CSS_PALETTE_GEN_LANDING_DISPLAY_EN: Record<
  CssPaletteGenLandingId,
  Omit<CssPaletteGenLandingDisplayFields, "capabilities">
> = {
  "css-color-palette-from-photo": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "CSS color palette from photo",
    titleAccent: "CSS variables, SCSS, JSON, Tailwind",
    heroSubtitle:
      "Generate a CSS color palette from a photo in your browser — no upload, no account, no cloud queue. Load a photo locally, get up to five dominant colors with semantic role labels, and copy a ready-made CSS variables, SCSS, JSON, or Tailwind snippet on-device without sending your file to a server.",
    primaryCta: "Generate CSS palette — Free",
    ctaNote: "No upload · No server · Code-ready output",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Photo to code — not a HEX-only extractor",
      body: "Pix-8 CSS Palette Generator reads your photo on a client-side canvas, maps prominent colors to semantic roles — dominant, secondary, accent, and more — then exports a copy-ready snippet. It is not a cloud service that uploads files first, and not a swatch tool that lists HEX without code. Use Color Picker for single-pixel sampling; Palette Extractor for six HEX swatches without export.",
    },
    benefitsHeading: "Why generate a CSS color palette from a photo in the browser?",
    benefitsIntro:
      "Cloud palette tools often require uploading your reference photo before you get code. Pix-8 processes locally — the direct fit when you need a ",
    benefitsKeyword: "CSS color palette from photo",
    benefitsIntroAfter:
      " for UI projects, design tokens, or a Tailwind theme without routing files off-device.",
    benefits: [
      {
        title: "Copy-ready code output",
        body: "Copy CSS variables, SCSS, JSON, or Tailwind config snippets — not just a flat HEX list.",
      },
      {
        title: "Semantic role labels",
        body: "Each swatch is tagged dominant, secondary, accent, muted, or surface — a clear hierarchy for design.",
      },
      {
        title: "Client-side by default",
        body: "Your photo is decoded and analyzed in the browser tab. Pix-8 never receives your pixel data during extraction or copy.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open CSS Palette Generator",
        body: "Navigate to Pix-8 CSS Palette Generator in your browser — no install, no account, and no upload dialog before extraction.",
      },
      {
        title: "Upload a photo",
        body: "Choose a photo from your device. The tool identifies up to five dominant colors and assigns semantic role labels.",
      },
      {
        title: "Select format and copy",
        body: "Pick CSS, SCSS, JSON, or Tailwind and copy the snippet to your clipboard — one photo per session, entirely on-device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to turn a photo into CSS palette code?",
      body: "Open CSS Palette Generator, load a local photo, and copy code-ready tokens — privately, entirely on-device.",
      button: "Open CSS Palette Generator",
    },
  },
};
