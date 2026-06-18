import type {
  ColorPickerLandingChrome,
  ColorPickerLandingDisplayFields,
} from "@/lib/colorpickerLandingTypes";
import type { ColorPickerLandingId } from "@/lib/colorpickerLandings";

export const COLOR_PICKER_LANDING_CHROME_EN: ColorPickerLandingChrome = {
  privacyNote:
    "Client-side processing only — your image never leaves the browser.",
  relatedUseCasesHeading: "Related use cases",
  guidesHeading: "Guides",
  toolCardTitle: "Color Picker tool",
  toolCardExcerpt:
    "Open the workspace — sample pixels and copy HEX, RGB, or HSL locally.",
};

export const COLOR_PICKER_LANDING_DISPLAY_EN: Record<
  ColorPickerLandingId,
  Omit<ColorPickerLandingDisplayFields, "capabilities">
> = {
  "image-color-picker-online": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Image color picker online",
    titleAccent: "pixel-perfect HEX, RGB, HSL",
    heroSubtitle:
      "Use an image color picker online in your browser — no upload, no account, no cloud queue. Load an image locally, hover to preview any pixel, click to lock a sample, and copy HEX, RGB, or HSL on-device without sending your file to a server.",
    primaryCta: "Pick colors — Free",
    ctaNote: "No upload · No server · Pixel sampling",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Pixel sampling on-device — not a cloud palette extractor",
      body: "Pix-8 Color Picker reads your image on a client-side canvas and samples the exact pixel under your cursor — not a remote service that uploads files first or auto-ranks dominant colors. A magnifier loupe shows pixel coordinates and a zoomed grid before you lock a sample and copy HEX, RGB, or HSL. It does not extract multi-color palettes — use Pix-8 Palette Extractor for that.",
    },
    benefitsHeading: "Why use an image color picker online in the browser?",
    benefitsIntro:
      "Cloud color tools often require uploading your reference image before you can sample a single pixel. Pix-8 processes locally — the direct fit when you need an ",
    benefitsKeyword: "image color picker online",
    benefitsIntroAfter:
      " for logo matching, UI accents, and brand consistency without routing files off-device.",
    benefits: [
      {
        title: "Pixel-level precision",
        body: "Hover for a live preview, click to lock, and copy the exact HEX, RGB, or HSL value from the sampled pixel — with coordinate readout.",
      },
      {
        title: "Magnifier for fine detail",
        body: "A zoomed loupe with a pixel grid helps you target small text, icon edges, and compression artifacts before you commit a sample.",
      },
      {
        title: "Client-side by default",
        body: "Your image is decoded and sampled in the browser tab. Pix-8 never receives your pixel data during hover, click, or copy.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Color Picker",
        body: "Navigate to Pix-8 Color Picker in your browser — no install, no account, and no upload dialog before you sample.",
      },
      {
        title: "Load and hover",
        body: "Choose an image from your device. Move the cursor over the photo to preview pixel color values with the magnifier loupe.",
      },
      {
        title: "Click and copy",
        body: "Click to lock a sample, then copy HEX, RGB, or HSL to your clipboard — one image per session, entirely on-device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to pick colors without uploading?",
      body: "Open Color Picker, load a local image, and copy exact pixel values — privately, entirely on-device.",
      button: "Open Color Picker",
    },
  },
};
