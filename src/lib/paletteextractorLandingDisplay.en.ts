import type {
  PaletteExtractorLandingChrome,
  PaletteExtractorLandingDisplayFields,
} from "@/lib/paletteextractorLandingTypes";
import type { PaletteExtractorLandingId } from "@/lib/paletteextractorLandings";

export const PALETTE_EXTRACTOR_LANDING_CHROME_EN: PaletteExtractorLandingChrome =
  {
    privacyNote:
      "Client-side processing only — your image never leaves the browser.",
    relatedUseCasesHeading: "Related use cases",
    guidesHeading: "Guides",
    toolCardTitle: "Palette Extractor tool",
    toolCardExcerpt:
      "Open the workspace — extract dominant colors locally in seconds.",
  };

export const PALETTE_EXTRACTOR_LANDING_DISPLAY_EN: Record<
  PaletteExtractorLandingId,
  Omit<PaletteExtractorLandingDisplayFields, "capabilities">
> = {
  "palette-extractor-online": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Palette extractor online",
    titleAccent: "dominant HEX colors in the browser",
    heroSubtitle:
      "Use a palette extractor online in your browser — no upload, no account, no cloud queue. Load an image locally, extract up to six dominant colors with deduplication, and copy HEX values on-device without sending your file to a server.",
    primaryCta: "Extract palette — Free",
    ctaNote: "No upload · No server · Copy-ready HEX",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "On-device color analysis — not a cloud mood-board uploader",
      body: "Pix-8 Palette Extractor reads your image locally and ranks dominant colors on a client-side canvas — not a remote service that ingests files first. Review up to six deduplicated swatches, copy HEX codes in one click, and optionally enable metadata stripping for privacy-conscious workflows. It does not export CSS variables, batch folders, or pixel-precise samples.",
    },
    benefitsHeading: "Why use a palette extractor online in the browser?",
    benefitsIntro:
      "Cloud palette tools route every image through a remote server before you see a single HEX code. Pix-8 processes locally — the practical fit when you need a ",
    benefitsKeyword: "palette extractor online",
    benefitsIntroAfter:
      " for mood boards, brand references, and design comps without moving source files off-device.",
    benefits: [
      {
        title: "Client-side by default",
        body: "Your image is read from your device and analyzed in the browser tab. Pix-8 never receives your pixel data during extraction or copy.",
      },
      {
        title: "Dominant colors, deduplicated",
        body: "Up to six ranked swatches surface the colors that actually define your image — near-duplicates filtered so the palette stays usable.",
      },
      {
        title: "Copy-ready HEX output",
        body: "Click any swatch to copy its HEX value to the clipboard — ready for Figma, CSS, or your design system notes.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Palette Extractor",
        body: "Navigate to Pix-8 Palette Extractor in your browser — no install, no account, and no upload dialog before you analyze.",
      },
      {
        title: "Load an image locally",
        body: "Choose a photo from your device. The file is decoded on-device and sampled on a client-side canvas to identify dominant colors.",
      },
      {
        title: "Copy HEX values",
        body: "Review the extracted swatches and click to copy each HEX code — one image per session, entirely in your browser tab.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to extract a palette without uploading?",
      body: "Open Palette Extractor, load a local image, and copy dominant HEX colors — privately, entirely on-device.",
      button: "Open Palette Extractor",
    },
  },
  "client-side-color-palette-extractor": {
    eyebrow: "Client-side · No upload · On-device",
    titleMain: "Client-side color palette extractor",
    titleAccent: "dominant HEX without a server",
    heroSubtitle:
      "Use a client-side color palette extractor in your browser — no upload, no account, no cloud queue. Your image is decoded locally, analyzed on a client-side canvas, and reduced to up to six deduplicated dominant HEX swatches without routing pixel data through a remote server.",
    primaryCta: "Extract palette — Free",
    ctaNote: "No upload · No server · Client-side canvas",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Browser-local extraction — not a cloud ingest pipeline",
      body: "Pix-8 Palette Extractor is architected for client-side analysis: your image stays on your device while a local canvas ranks dominant colors and filters near-duplicates. Copy HEX swatches in one click, with optional EXIF metadata stripping for privacy-conscious handoffs. It does not upload files, export CSS tokens, batch-process folders, or sample individual pixels on click.",
    },
    benefitsHeading: "Why use a client-side color palette extractor?",
    benefitsIntro:
      "Upload-first palette services send every reference file to a remote server before ranking begins. Pix-8 runs entirely in the browser — the architectural fit when you need a ",
    benefitsKeyword: "client-side color palette extractor",
    benefitsIntroAfter:
      " for confidential brand assets, client mockups, or internal design references that must not leave the device.",
    benefits: [
      {
        title: "Zero server upload",
        body: "Image decoding, sampling, and palette ranking occur in your browser tab. Pix-8 never receives your pixel data during extraction or copy.",
      },
      {
        title: "Deduplicated dominant swatches",
        body: "Up to six ranked colors surface with near-duplicates filtered — usable HEX codes derived from actual pixel coverage on a local canvas.",
      },
      {
        title: "Optional metadata stripping",
        body: "Toggle EXIF removal before you copy or hand off swatches — a practical privacy step for photos that carry location or device metadata.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Palette Extractor",
        body: "Load Pix-8 Palette Extractor in your browser — no install, no account, and no upload dialog before analysis.",
      },
      {
        title: "Analyze on a local canvas",
        body: "Choose an image from your device. The file is decoded client-side and sampled to rank dominant colors — entirely on-device.",
      },
      {
        title: "Copy HEX swatches",
        body: "Review the extracted palette and click any swatch to copy its HEX value — one image per session, no server round-trip.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to extract palettes without uploading?",
      body: "Open Palette Extractor, load a local image, and copy dominant HEX swatches — client-side, entirely on-device.",
      button: "Open Palette Extractor",
    },
  },
  "extract-dominant-colors-from-image": {
    eyebrow: "Dominant colors · Client-side · No upload",
    titleMain: "Extract dominant colors from image",
    titleAccent: "ranked HEX swatches on-device",
    heroSubtitle:
      "Extract dominant colors from any image in your browser — no upload, no account, no cloud queue. Load a photo locally, rank up to six colors by pixel coverage with deduplication, and copy HEX values on-device without sending your file to a remote server.",
    primaryCta: "Extract dominant colors — Free",
    ctaNote: "No upload · No server · Copy-ready HEX",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Coverage-ranked colors — not manual pixel picking",
      body: "Pix-8 Palette Extractor ranks hues by how much of your image they cover on a client-side canvas — not a cloud analyzer that uploads files first or a color picker that samples one pixel at a time. Review up to six deduplicated swatches and copy HEX codes in one click. It does not export CSS variables or JSON tokens — for code-ready output, use Pix-8 CSS Palette Generator.",
    },
    benefitsHeading: "Why extract dominant colors from an image in the browser?",
    benefitsIntro:
      "Upload-first color tools send every reference file to a remote server before ranking begins. Pix-8 processes locally — the direct fit when you need to ",
    benefitsKeyword: "extract dominant colors from an image",
    benefitsIntroAfter:
      " for brand audits, UI references, or mood boards without exposing source assets off-device.",
    benefits: [
      {
        title: "Ranked by coverage",
        body: "Colors surface by pixel frequency across your image — analyzed on a client-side canvas, not guessed from preset libraries.",
      },
      {
        title: "Distinct swatches only",
        body: "Near-duplicate shades are filtered so you receive up to six usable HEX codes instead of redundant variations of the same hue.",
      },
      {
        title: "Client-side by default",
        body: "Your image is decoded and ranked in the browser tab. Pix-8 never receives your pixel data during extraction or copy.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Palette Extractor",
        body: "Navigate to Pix-8 Palette Extractor in your browser — no install, no account, and no server upload before analysis begins.",
      },
      {
        title: "Load your image",
        body: "Choose a photo or graphic from your device. The file is decoded locally and sampled to rank dominant colors by coverage.",
      },
      {
        title: "Copy dominant HEX codes",
        body: "Review the ranked swatches and click any color to copy its HEX value — one image per session, entirely on-device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to extract dominant colors without uploading?",
      body: "Open Palette Extractor, load a local image, and copy ranked HEX swatches — privately, entirely on-device.",
      button: "Open Palette Extractor",
    },
  },
  "extract-color-palette-from-image": {
    eyebrow: "From image · Client-side · No upload",
    titleMain: "Extract color palette from image",
    titleAccent: "dominant HEX swatches on-device",
    heroSubtitle:
      "Extract a color palette from any image in your browser — no upload, no account, no cloud queue. Load a photo locally, identify up to six dominant colors with deduplication, and copy HEX values on-device without routing your file through a remote server.",
    primaryCta: "Extract colors — Free",
    ctaNote: "No upload · No server · Copy-ready HEX",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Palette from your image — not a stock-color picker",
      body: "Pix-8 Palette Extractor analyzes pixel coverage on a client-side canvas to rank the colors that actually appear in your file — not a preset swatch library or AI mood-board generator. Review up to six deduplicated swatches and copy HEX codes in one click. It does not sample individual pixels, export design tokens, or process multiple files in one batch.",
    },
    benefitsHeading: "Why extract a color palette from an image in the browser?",
    benefitsIntro:
      "Upload-first palette tools send every reference file to a remote server before you see a single swatch. Pix-8 processes locally — the direct fit when you need to ",
    benefitsKeyword: "extract a color palette from an image",
    benefitsIntroAfter:
      " for branding, UI comps, or mood references without exposing source assets off-device.",
    benefits: [
      {
        title: "Image-in, palette-out",
        body: "Load one image from your device and get ranked dominant colors derived from its actual pixel data — analyzed entirely in the browser tab.",
      },
      {
        title: "Distinct swatches only",
        body: "Near-duplicate shades are filtered so you receive up to six usable HEX codes instead of redundant variations of the same hue.",
      },
      {
        title: "Private by architecture",
        body: "Your image never uploads to Pix-8 or a third-party server during extraction, sampling, or copy — client-side processing end to end.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Palette Extractor",
        body: "Navigate to Pix-8 Palette Extractor in your browser — no install, no account, and no server upload before analysis begins.",
      },
      {
        title: "Load your source image",
        body: "Choose a photo or graphic from your device. The file is decoded locally and sampled on a client-side canvas to rank dominant colors.",
      },
      {
        title: "Copy the palette HEX codes",
        body: "Review the extracted swatches and click any color to copy its HEX value — one image per session, ready for your design workflow.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to pull colors from your image?",
      body: "Open Palette Extractor, load a local file, and copy dominant HEX swatches — privately, entirely on-device.",
      button: "Open Palette Extractor",
    },
  },
  "color-palette-generator-from-image": {
    eyebrow: "Generator · Client-side · No upload",
    titleMain: "Color palette generator from image",
    titleAccent: "HEX swatches built on-device",
    heroSubtitle:
      "Generate a color palette from any image in your browser — no upload, no account, no cloud queue. Load a photo locally, rank up to six dominant colors with deduplication, and copy HEX swatches on-device without sending your file to a remote server.",
    primaryCta: "Generate palette — Free",
    ctaNote: "No upload · No server · Copy-ready HEX",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Palette generation from your image — not a preset library",
      body: "Pix-8 Palette Extractor builds a palette from pixel data in your file on a client-side canvas — not a stock swatch catalog or cloud mood-board service. Review up to six deduplicated swatches and copy HEX codes in one click. It does not export CSS variables, JSON tokens, or Tailwind config — for code-ready palette output, use Pix-8 CSS Palette Generator. It does not sample individual pixels on click.",
    },
    benefitsHeading: "Why generate a color palette from an image in the browser?",
    benefitsIntro:
      "Cloud palette generators often require uploading your reference image before any swatches appear. Pix-8 processes locally — the practical fit when you need a ",
    benefitsKeyword: "color palette generator from image",
    benefitsIntroAfter:
      " that turns photos and mockups into usable HEX codes without routing files off-device.",
    benefits: [
      {
        title: "Generated from your pixels",
        body: "The palette is derived from actual color coverage in your image — ranked and deduplicated on a client-side canvas, not pulled from preset libraries.",
      },
      {
        title: "Up to six usable swatches",
        body: "Dominant colors surface as distinct HEX codes you can copy immediately — filtered so near-duplicate shades do not clutter the palette.",
      },
      {
        title: "Client-side by default",
        body: "Your image is read and analyzed in the browser tab only. Pix-8 never receives your pixel data during generation or copy.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Palette Extractor",
        body: "Navigate to Pix-8 Palette Extractor in your browser — no install, no account, and no server upload before palette generation.",
      },
      {
        title: "Load your image",
        body: "Choose a photo or graphic from your device. The file is decoded locally and analyzed to rank the dominant colors in your image.",
      },
      {
        title: "Copy your palette HEX codes",
        body: "Review the generated swatches and click any color to copy its HEX value — one image per session, ready for design or handoff to CSS Palette Generator.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to generate a palette from your image?",
      body: "Open Palette Extractor, load a local file, and copy dominant HEX swatches — privately, entirely on-device.",
      button: "Open Palette Extractor",
    },
  },
  "free-image-color-extractor": {
    eyebrow: "Free · Client-side · No upload",
    titleMain: "Free image color extractor",
    titleAccent: "dominant HEX colors in the browser",
    heroSubtitle:
      "Use a free image color extractor in your browser — no upload, no account, no paywall. Load an image locally, extract up to six dominant colors with deduplication, and copy HEX swatches on-device without sending your file to a server.",
    primaryCta: "Extract colors — Free",
    ctaNote: "No cost · No server · On-device canvas",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Free extraction on-device — not a freemium cloud analyzer",
      body: "Pix-8 Palette Extractor is free to open and processes your image on a client-side canvas — not a remote service with upload quotas, watermarked previews, or paywalled exports. Review up to six deduplicated swatches and copy HEX codes in one click. It does not export CSS variables, batch folders, or pixel-precise samples on click.",
    },
    benefitsHeading: "Why use a free image color extractor in the browser?",
    benefitsIntro:
      "Freemium color tools often gate extraction behind accounts or route files through paid cloud tiers. Pix-8 is free and local — the direct fit when you need a ",
    benefitsKeyword: "free image color extractor",
    benefitsIntroAfter:
      " for reference photos, brand mockups, and mood boards without subscriptions or server uploads.",
    benefits: [
      {
        title: "No cost, no account",
        body: "Open the tool and extract colors immediately. No subscription, no credit card, and no sign-up step before you copy a HEX code.",
      },
      {
        title: "Client-side by default",
        body: "Your image is read from your device and analyzed on a local canvas. Pix-8 never receives your pixel data during extraction or copy.",
      },
      {
        title: "Copy-ready dominant colors",
        body: "Up to six ranked swatches with near-duplicates filtered out — each with a one-click HEX copy for your design workflow.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Palette Extractor",
        body: "Navigate to Pix-8 Palette Extractor in your browser — free, no install, and no upload dialog before you start.",
      },
      {
        title: "Load an image locally",
        body: "Choose a photo from your device. The file is decoded on-device and sampled on a client-side canvas to rank dominant colors.",
      },
      {
        title: "Copy HEX swatches",
        body: "Review the extracted colors and click any swatch to copy its HEX value — one image per session, entirely in your browser tab.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to extract colors for free?",
      body: "Open Palette Extractor, load a local image, and copy dominant HEX swatches — no paywall, entirely on-device.",
      button: "Open Palette Extractor",
    },
  },
  "private-image-color-extractor": {
    eyebrow: "Private · Client-side · No upload",
    titleMain: "Private image color extractor",
    titleAccent: "confidential HEX extraction on-device",
    heroSubtitle:
      "Use a private image color extractor in your browser — no upload, no account, no cloud storage. Load a photo locally, extract up to six dominant colors with deduplication, and copy HEX swatches on-device without transmitting your source file to a remote server.",
    primaryCta: "Extract colors — Free",
    ctaNote: "No upload · No account · On-device only",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Confidential extraction — not a cloud ingest with data retention",
      body: "Pix-8 Palette Extractor keeps your image on your device while a client-side canvas ranks dominant colors and filters near-duplicates. Copy HEX swatches in one click, with optional EXIF metadata stripping for photos that carry location or device data. It does not upload files, require sign-in, sync palettes to a cloud account, or export CSS tokens.",
    },
    benefitsHeading: "Why use a private image color extractor?",
    benefitsIntro:
      "Upload-based color tools store or process reference files on remote infrastructure you do not control. Pix-8 runs locally — the practical fit when you need a ",
    benefitsKeyword: "private image color extractor",
    benefitsIntroAfter:
      " for client mockups, unreleased brand assets, or internal references that must not leave the browser tab.",
    benefits: [
      {
        title: "No server upload step",
        body: "Your image is decoded and analyzed in the browser tab. Pix-8 never receives your pixel data during extraction, sampling, or copy.",
      },
      {
        title: "Optional EXIF stripping",
        body: "Toggle metadata removal before you copy swatches — a practical privacy control for photos that embed location, device, or timestamp data.",
      },
      {
        title: "No account required",
        body: "Open the tool and extract colors immediately. No sign-in, no cloud sync, and no palette gallery stored on remote servers.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Palette Extractor",
        body: "Navigate to Pix-8 Palette Extractor in your browser — no install, no account, and no upload dialog before analysis.",
      },
      {
        title: "Load your image privately",
        body: "Choose a photo from your device. The file stays local while a client-side canvas ranks dominant colors and deduplicates near-matching shades.",
      },
      {
        title: "Copy HEX swatches",
        body: "Review the extracted colors and click any swatch to copy its HEX value — one image per session, entirely on-device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to extract colors without exposing your image?",
      body: "Open Palette Extractor, load a local file, and copy dominant HEX swatches — privately, entirely on-device.",
      button: "Open Palette Extractor",
    },
  },
  "no-upload-color-scheme-generator": {
    eyebrow: "No upload · Client-side · On-device",
    titleMain: "No-upload color scheme generator",
    titleAccent: "HEX schemes without a server step",
    heroSubtitle:
      "Use a no-upload color scheme generator in your browser — no file transfer, no account, no cloud queue. Load an image locally, rank up to six dominant colors with deduplication, and copy HEX swatches on-device without an upload dialog or remote ingest pipeline.",
    primaryCta: "Build scheme — Free",
    ctaNote: "No upload · No server · Copy-ready HEX",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Scheme generation without upload — not a cloud ingest workflow",
      body: "Pix-8 Palette Extractor builds a color scheme from your image on a client-side canvas — there is no upload step, no remote storage, and no server-side color analysis. Review up to six deduplicated swatches and copy HEX codes together. It does not export CSS variables, batch-process folders, or sample individual pixels on click.",
    },
    benefitsHeading: "Why use a no-upload color scheme generator?",
    benefitsIntro:
      "Most online scheme tools route your reference image through a remote server before any swatches appear. Pix-8 skips upload entirely — the direct fit when you need a ",
    benefitsKeyword: "no-upload color scheme generator",
    benefitsIntroAfter:
      " for confidential mockups, client references, or internal brand assets that must not leave the browser tab.",
    benefits: [
      {
        title: "No upload dialog",
        body: "Load an image from your device and generate a scheme immediately — your file is decoded locally, never sent to Pix-8 or a third-party server.",
      },
      {
        title: "Up to six scheme colors",
        body: "Dominant hues rank by pixel coverage with near-duplicates filtered — multiple HEX swatches you can copy together for branding or UI work.",
      },
      {
        title: "Client-side by architecture",
        body: "Scheme generation runs in the browser tab on a local canvas. No cloud account, no remote palette gallery, and no server round-trip.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Palette Extractor",
        body: "Navigate to Pix-8 Palette Extractor in your browser — no install, no account, and critically, no upload step before scheme generation.",
      },
      {
        title: "Load your image locally",
        body: "Choose a photo or graphic from your device. The file stays on-device while a client-side canvas ranks dominant colors for your scheme.",
      },
      {
        title: "Copy the scheme HEX codes",
        body: "Review the swatches and click any color to copy its HEX value — one image per session, entirely without uploading your source file.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to build a scheme without uploading?",
      body: "Open Palette Extractor, load a local image, and copy dominant HEX swatches — no upload, entirely on-device.",
      button: "Open Palette Extractor",
    },
  },
  "browser-based-palette-builder": {
    eyebrow: "Browser · No install · Client-side",
    titleMain: "Browser-based palette builder",
    titleAccent: "dominant HEX swatches in your tab",
    heroSubtitle:
      "Use a browser-based palette builder — no install, no upload, no desktop app. Open Pix-8 in any modern browser, load an image locally, and build a palette of up to six deduplicated dominant colors with one-click HEX copy, entirely on a client-side canvas without sending your file to a server.",
    primaryCta: "Build palette — Free",
    ctaNote: "No install · No upload · Browser canvas",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Palette from your image in the browser — not a desktop swatch editor",
      body: "Pix-8 Palette Extractor builds a palette from dominant colors in your image on a client-side canvas — not a installed design app with manual swatch trays or a cloud builder that uploads files first. Review up to six deduplicated swatches and copy HEX codes in one click. It does not export CSS variables, provide a drag-and-drop palette editor, or batch-process folders.",
    },
    benefitsHeading: "Why use a browser-based palette builder?",
    benefitsIntro:
      "Desktop palette tools require installs and updates; cloud builders route files through remote servers. Pix-8 runs in the browser tab — the practical fit when you need a ",
    benefitsKeyword: "browser-based palette builder",
    benefitsIntroAfter:
      " for quick reference extraction, mood boards, or design handoffs without software installs or server uploads.",
    benefits: [
      {
        title: "No install required",
        body: "Open the tool in Chrome, Firefox, Safari, or Edge — no desktop app, plugin, or extension before you build a palette from your image.",
      },
      {
        title: "Built from your image data",
        body: "Up to six dominant colors rank by pixel coverage on a local canvas — deduplicated swatches derived from your file, not a preset library.",
      },
      {
        title: "Client-side by default",
        body: "Your image is decoded and analyzed in the browser tab. Pix-8 never receives your pixel data during palette building or copy.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open in your browser",
        body: "Navigate to Pix-8 Palette Extractor — no download, no account, and no upload dialog before palette building begins.",
      },
      {
        title: "Load an image locally",
        body: "Choose a photo or graphic from your device. The file is decoded on-device and sampled to rank dominant colors for your palette.",
      },
      {
        title: "Copy palette HEX codes",
        body: "Review the built swatches and click any color to copy its HEX value — one image per session, entirely in your browser tab.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to build a palette in your browser?",
      body: "Open Palette Extractor, load a local image, and copy dominant HEX swatches — no install, entirely on-device.",
      button: "Open Palette Extractor",
    },
  },
  "get-hex-codes-from-image": {
    eyebrow: "HEX codes · Client-side · One-click copy",
    titleMain: "Get HEX codes from image",
    titleAccent: "up to six dominant swatches on-device",
    heroSubtitle:
      "Get HEX codes from any image in your browser — no upload, no account, no cloud queue. Load a photo locally, extract up to six dominant colors with deduplication, and copy each HEX value on-device with one click without sending your file to a remote server.",
    primaryCta: "Get HEX codes — Free",
    ctaNote: "No upload · No server · One-click copy",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Multiple HEX codes from coverage — not single-pixel eyedropper",
      body: "Pix-8 Palette Extractor ranks dominant colors by pixel coverage and surfaces up to six deduplicated HEX codes you can copy in one click — not a cloud uploader that ingests files first, and not a color picker that samples one pixel at a time. It outputs HEX swatches only — not RGB, HSL, CSS variables, or JSON tokens. For pixel-level HEX with RGB and HSL, use Pix-8 Color Picker.",
    },
    benefitsHeading: "Why get HEX codes from an image in the browser?",
    benefitsIntro:
      "Upload-based color tools send every reference file to a remote server before you copy a single HEX code. Pix-8 processes locally — the direct fit when you need to ",
    benefitsKeyword: "get HEX codes from an image",
    benefitsIntroAfter:
      " for brand matching, UI references, or design handoffs without routing files off-device.",
    benefits: [
      {
        title: "One-click HEX copy",
        body: "Each dominant swatch displays a copy-ready HEX code — click to copy to your clipboard without retyping or manual conversion.",
      },
      {
        title: "Up to six distinct codes",
        body: "Dominant colors rank by pixel coverage with near-duplicates filtered — multiple HEX values from one image, not one swatch at a time.",
      },
      {
        title: "Client-side by default",
        body: "Your image is decoded and analyzed in the browser tab. Pix-8 never receives your pixel data during extraction or copy.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Palette Extractor",
        body: "Navigate to Pix-8 Palette Extractor in your browser — no install, no account, and no upload dialog before HEX extraction.",
      },
      {
        title: "Load your image",
        body: "Choose a photo or graphic from your device. The file is decoded locally and sampled to rank dominant colors as HEX swatches.",
      },
      {
        title: "Click and copy HEX",
        body: "Review the swatches and click any color to copy its HEX code — one image per session, entirely on-device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to copy HEX codes without uploading?",
      body: "Open Palette Extractor, load a local image, and copy dominant HEX swatches — privately, entirely on-device.",
      button: "Open Palette Extractor",
    },
  },
  "extract-brand-colors-from-image": {
    eyebrow: "Brand reference · Client-side · No upload",
    titleMain: "Extract brand colors from image",
    titleAccent: "dominant HEX from logos and mockups",
    heroSubtitle:
      "Extract brand colors from any image in your browser — no upload, no account, no cloud queue. Load a logo, packaging photo, or brand mockup locally, surface up to six dominant colors with deduplication, and copy HEX values on-device without sending confidential assets to a remote server.",
    primaryCta: "Extract brand colors — Free",
    ctaNote: "No upload · No server · Copy-ready HEX",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Dominant colors from your brand image — not a style-guide matcher",
      body: "Pix-8 Palette Extractor ranks the colors that actually appear in your logo or mockup on a client-side canvas — not a cloud service that uploads brand assets or an AI that claims to verify official palette names. Review up to six deduplicated HEX swatches and copy codes as a reference starting point. It does not match trademark databases, assign primary or accent roles, or export CSS tokens — for code output, use Pix-8 CSS Palette Generator.",
    },
    benefitsHeading: "Why extract brand colors from an image in the browser?",
    benefitsIntro:
      "Upload-first color tools route logos and mockups through remote servers before you see a swatch. Pix-8 processes locally — the practical fit when you need to ",
    benefitsKeyword: "extract brand colors from an image",
    benefitsIntroAfter:
      " for design comps, social graphics, or client references without exposing brand assets off-device.",
    benefits: [
      {
        title: "From logo to HEX reference",
        body: "Load a brand image from your device and get dominant colors ranked by pixel coverage — analyzed entirely in the browser tab.",
      },
      {
        title: "Confidential by default",
        body: "Logos and mockups stay on your device during extraction and copy. Pix-8 never receives your pixel data or uploads your source file.",
      },
      {
        title: "Copy-ready swatches",
        body: "Up to six deduplicated HEX codes you can click to copy — a fast reference from your image, ready for Figma or your style notes.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Palette Extractor",
        body: "Navigate to Pix-8 Palette Extractor in your browser — no install, no account, and no upload dialog before analysis.",
      },
      {
        title: "Load your brand image",
        body: "Choose a logo, packaging photo, or mockup from your device. The file is decoded locally and sampled to rank dominant brand-relevant colors.",
      },
      {
        title: "Copy HEX swatches",
        body: "Review the extracted colors and click any swatch to copy its HEX value — one image per session, entirely on-device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to pull brand colors without uploading?",
      body: "Open Palette Extractor, load a local brand image, and copy dominant HEX swatches — privately, entirely on-device.",
      button: "Open Palette Extractor",
    },
  },
  "auto-color-palette-generator": {
    eyebrow: "Automatic · Client-side · No upload",
    titleMain: "Auto color palette generator",
    titleAccent: "dominant HEX swatches on load",
    heroSubtitle:
      "Use an auto color palette generator in your browser — no upload, no account, no manual swatch picking. Load an image locally and the tool automatically ranks up to six dominant colors with deduplication, then copy HEX values on-device without sending your file to a remote server.",
    primaryCta: "Generate palette — Free",
    ctaNote: "No upload · No server · Automatic extraction",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Automatic extraction from your image — not AI color invention",
      body: "Pix-8 Palette Extractor automatically ranks dominant colors by pixel coverage when your image loads on a client-side canvas — not a generative AI that invents palettes from text, and not a manual builder where you place swatches by hand. Review up to six deduplicated HEX codes and copy in one click. It does not export CSS variables, name colors with AI, or batch-process folders.",
    },
    benefitsHeading: "Why use an auto color palette generator in the browser?",
    benefitsIntro:
      "Manual palette builders and cloud auto-generators often require uploads or tedious swatch placement. Pix-8 extracts automatically on-device — the practical fit when you need an ",
    benefitsKeyword: "auto color palette generator",
    benefitsIntroAfter:
      " that turns a reference photo or mockup into copy-ready HEX swatches without routing files off-device.",
    benefits: [
      {
        title: "Palette on image load",
        body: "Dominant colors rank automatically from pixel coverage — no manual eyedropper pass or swatch tray assembly required.",
      },
      {
        title: "Deduplicated swatches",
        body: "Near-duplicate shades filter out so you receive up to six distinct HEX codes ready to copy — not redundant variations of the same hue.",
      },
      {
        title: "Client-side by default",
        body: "Automatic extraction runs in the browser tab on a local canvas. Pix-8 never receives your pixel data during analysis or copy.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Palette Extractor",
        body: "Navigate to Pix-8 Palette Extractor in your browser — no install, no account, and no upload dialog before automatic extraction.",
      },
      {
        title: "Load your image",
        body: "Choose a photo or graphic from your device. The tool automatically analyzes pixel coverage and ranks dominant colors on a client-side canvas.",
      },
      {
        title: "Copy the auto-generated HEX codes",
        body: "Review the swatches and click any color to copy its HEX value — one image per session, entirely on-device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for automatic palette extraction?",
      body: "Open Palette Extractor, load a local image, and copy auto-ranked HEX swatches — privately, entirely on-device.",
      button: "Open Palette Extractor",
    },
  },
  "find-color-palette-for-design-project": {
    eyebrow: "Design project · Client-side · No upload",
    titleMain: "Find color palette for design project",
    titleAccent: "HEX swatches from your reference image",
    heroSubtitle:
      "Find a color palette for your design project in the browser — no upload, no account, no cloud mood-board queue. Load a reference photo or mockup locally, surface up to six dominant colors with deduplication, and copy HEX swatches on-device without sending project assets to a remote server.",
    primaryCta: "Find palette — Free",
    ctaNote: "No upload · No server · Copy-ready HEX",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Palette from your reference — not a stock theme marketplace",
      body: "Pix-8 Palette Extractor ranks dominant colors from your project reference on a client-side canvas — not a curated palette marketplace, design-system generator, or cloud service that stores your mockups. Review up to six deduplicated HEX swatches and copy codes for comps and handoff. It does not export CSS tokens, build Figma libraries, or batch-process project folders.",
    },
    benefitsHeading: "Why find a color palette for a design project in the browser?",
    benefitsIntro:
      "Upload-first palette tools route reference images through remote servers before you copy a single HEX code. Pix-8 processes locally — the practical fit when you need to ",
    benefitsKeyword: "find a color palette for a design project",
    benefitsIntroAfter:
      " from a mood photo, UI mockup, or client reference without exposing project files off-device.",
    benefits: [
      {
        title: "Reference image to palette",
        body: "Load one inspiration image and get up to six dominant HEX codes ranked by pixel coverage — analyzed entirely in the browser tab.",
      },
      {
        title: "Fast comp starting point",
        body: "Copy swatches directly into Figma, slides, or style notes — a quick palette anchor before you refine against your full design system.",
      },
      {
        title: "Client-side by default",
        body: "Project references stay on your device during extraction and copy. Pix-8 never receives your pixel data or uploads your source file.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Palette Extractor",
        body: "Navigate to Pix-8 Palette Extractor in your browser — no install, no account, and no upload dialog before palette extraction.",
      },
      {
        title: "Load your reference image",
        body: "Choose a mood photo, mockup, or inspiration still from your device. Dominant colors rank automatically on a client-side canvas.",
      },
      {
        title: "Copy HEX for your project",
        body: "Review the swatches and click any color to copy its HEX value — one image per session, ready for your design workflow.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to find a palette for your project?",
      body: "Open Palette Extractor, load a local reference image, and copy dominant HEX swatches — privately, entirely on-device.",
      button: "Open Palette Extractor",
    },
  },
  "generate-color-scheme-from-image": {
    eyebrow: "Color scheme · Client-side · No upload",
    titleMain: "Generate color scheme from image",
    titleAccent: "cohesive HEX swatches on-device",
    heroSubtitle:
      "Generate a color scheme from any image in your browser — no upload, no account, no cloud queue. Load a photo locally, rank up to six dominant colors with deduplication, and copy HEX swatches on-device without sending your reference file to a remote server.",
    primaryCta: "Build color scheme — Free",
    ctaNote: "No upload · No server · Copy-ready HEX",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Scheme from your image — not a template palette library",
      body: "Pix-8 Palette Extractor builds a color scheme from pixel coverage in your file on a client-side canvas — not a stock theme pack or cloud mood-board service. Review up to six deduplicated swatches and copy HEX codes together for branding or UI work. It does not auto-label roles like primary or accent, export CSS variables, or batch-process folders.",
    },
    benefitsHeading: "Why generate a color scheme from an image in the browser?",
    benefitsIntro:
      "Cloud scheme generators often require uploading your reference image before any colors appear. Pix-8 processes locally — the practical fit when you need to ",
    benefitsKeyword: "generate a color scheme from an image",
    benefitsIntroAfter:
      " for brand references, UI comps, and presentation decks without routing files off-device.",
    benefits: [
      {
        title: "Cohesive multi-color output",
        body: "Up to six dominant colors ranked from your image — filtered so near-duplicates do not dilute the scheme.",
      },
      {
        title: "Derived from real pixel data",
        body: "The scheme reflects actual color coverage in your file, analyzed on a client-side canvas — not preset swatch books.",
      },
      {
        title: "Private client-side workflow",
        body: "Your image is read and processed in the browser tab only. Pix-8 never receives your pixel data during scheme generation or copy.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Palette Extractor",
        body: "Navigate to Pix-8 Palette Extractor in your browser — no install, no account, and no server upload before scheme generation.",
      },
      {
        title: "Load your reference image",
        body: "Choose a photo or graphic from your device. The file is decoded locally and analyzed to rank the dominant colors that form your scheme.",
      },
      {
        title: "Copy the scheme HEX codes",
        body: "Review the swatches and click any color to copy its HEX value — one image per session, ready for design handoff or CSS Palette Generator.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to build a scheme from your image?",
      body: "Open Palette Extractor, load a local file, and copy dominant HEX swatches — privately, entirely on-device.",
      button: "Open Palette Extractor",
    },
  },
};
