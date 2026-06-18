import type {
  FaviconGeneratorLandingChrome,
  FaviconGeneratorLandingDisplayFields,
} from "@/lib/favicongeneratorLandingTypes";
import type { FaviconGeneratorLandingId } from "@/lib/favicongeneratorLandings";

export const FAVICON_GENERATOR_LANDING_CHROME_EN: FaviconGeneratorLandingChrome =
  {
    privacyNote:
      "Client-side processing only — your image never leaves the browser.",
    relatedUseCasesHeading: "Related use cases",
    guidesHeading: "Guides",
    toolCardTitle: "Favicon Generator tool",
    toolCardExcerpt:
      "Open the workspace — preview tab icons and export ICO or PNG locally.",
  };

export const FAVICON_GENERATOR_LANDING_DISPLAY_EN: Record<
  FaviconGeneratorLandingId,
  Omit<FaviconGeneratorLandingDisplayFields, "capabilities">
> = {
  "favicon-generator-online": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Favicon generator online",
    titleAccent: "ICO or PNG, browser-ready",
    heroSubtitle:
      "Use a favicon generator online in your browser — no upload, no account, no cloud queue. Load a logo locally, preview how it reads at 16×16, 32×32, and 48×48, adjust zoom framing, and export favicon.ico or PNG on-device without sending your file to a server.",
    primaryCta: "Generate favicon — Free",
    ctaNote: "No upload · No server · Tab-icon preview",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "On-device export — not a cloud icon converter",
      body: "Pix-8 Favicon Generator renders your source image on a client-side canvas with a center-square crop and zoom control — not a remote service that stores your logo first. Live previews show how the mark reads in a browser tab before you download favicon.ico (16, 32, and 48 px) or a 32×32 PNG. It does not build PWA manifests or Apple touch icon sets.",
    },
    benefitsHeading: "Why use a favicon generator online in the browser?",
    benefitsIntro:
      "Cloud favicon tools often require uploading your logo before you can preview a single tab size. Pix-8 processes locally — the direct fit when you need a ",
    benefitsKeyword: "favicon generator online",
    benefitsIntroAfter:
      " for site launches, staging domains, and client handoffs without routing brand assets off-device.",
    benefits: [
      {
        title: "Tab-size preview before export",
        body: "See 16×16, 32×32, and 48×48 previews plus a browser-tab mockup so you can judge legibility before downloading.",
      },
      {
        title: "Zoom framing for small icons",
        body: "A zoom slider tightens the center square crop so lettermarks and logos stay crisp at favicon scale.",
      },
      {
        title: "Client-side by default",
        body: "Your image is decoded and exported in the browser tab. Pix-8 never receives your file during preview or download.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Favicon Generator",
        body: "Navigate to Pix-8 Favicon Generator in your browser — no install, no account, and no upload dialog before you preview.",
      },
      {
        title: "Load and frame",
        body: "Choose an image from your device. Adjust zoom to center the mark, then review tab and size previews at 16, 32, and 48 pixels.",
      },
      {
        title: "Export ICO or PNG",
        body: "Select favicon.ico or PNG, then download — one source image per session, entirely on-device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to generate a favicon without uploading?",
      body: "Open Favicon Generator, load a local logo, preview tab sizes, and export ICO or PNG — privately, entirely on-device.",
      button: "Open Favicon Generator",
    },
  },
  "create-favicon-from-image": {
    eyebrow: "From image · Client-side · No upload",
    titleMain: "Create favicon from image",
    titleAccent: "any logo or photo, locally",
    heroSubtitle:
      "Create a favicon from any image in your browser — no upload, no account, no cloud queue. Load a PNG, JPEG, or WebP from your device, frame the center square with zoom, preview tab sizes at 16×16 through 48×48, and export favicon.ico or PNG on-device without sending your source file to a server.",
    primaryCta: "Create favicon — Free",
    ctaNote: "No upload · No server · Image to ICO/PNG",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Image to favicon on-device — not a hosted converter",
      body: "Pix-8 Favicon Generator turns a single raster image into browser-ready icon files using a client-side canvas, center-square crop, and zoom control — not a remote pipeline that stores your logo first. Tab and size previews show readability before you download. It does not vectorize artwork, resize unrelated assets, or generate full PWA icon packs.",
    },
    benefitsHeading: "Why create a favicon from an image in the browser?",
    benefitsIntro:
      "Hosted converters often require uploading your source image before export. Pix-8 processes locally — the direct path when you need to ",
    benefitsKeyword: "create favicon from image",
    benefitsIntroAfter:
      " for a new domain, staging site, or client project without moving brand files off-device.",
    benefits: [
      {
        title: "Any raster source image",
        body: "Start from a logo, app icon, or photo your browser can decode — then crop to a square favicon frame with zoom control.",
      },
      {
        title: "Readability checks at real sizes",
        body: "Preview 16×16, 32×32, and 48×48 outputs plus a tab mockup before committing to favicon.ico or PNG.",
      },
      {
        title: "Client-side by default",
        body: "Decoding, cropping, and export run in the browser tab. Pix-8 never receives your source image during preview or download.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Favicon Generator",
        body: "Navigate to Pix-8 Favicon Generator in your browser — no install, no account, and no upload step before you load an image.",
      },
      {
        title: "Load your image",
        body: "Choose a file from your device. Adjust zoom to center the mark in the square crop, then review tab and pixel-size previews.",
      },
      {
        title: "Download ICO or PNG",
        body: "Pick favicon.ico or PNG and save — one source image per session, exported entirely on-device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to turn an image into a favicon?",
      body: "Open Favicon Generator, load a local image, preview tab sizes, and export ICO or PNG — privately, entirely on-device.",
      button: "Open Favicon Generator",
    },
  },
  "free-favicon-maker": {
    eyebrow: "Free · Client-side · No upload",
    titleMain: "Free favicon maker",
    titleAccent: "no account, no paywall",
    heroSubtitle:
      "Use a free favicon maker in your browser — no subscription, no upload, no export credits. Load an image locally, preview tab icons at 16×16, 32×32, and 48×48, adjust zoom framing, and download favicon.ico or PNG on-device without sending your file to a server.",
    primaryCta: "Make favicon — Free",
    ctaNote: "No account · No server · Free export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Free and on-device — not a freemium cloud converter",
      body: "Pix-8 Favicon Generator is free to use in the browser with client-side rendering, center-square crop, and tab-size previews — not a hosted maker that uploads your logo first or limits exports unless you upgrade. Download favicon.ico (16, 32, and 48 px) or PNG without an account. It does not sell icon packs, PWA manifests, or batch folder conversion.",
    },
    benefitsHeading: "Why use a free favicon maker in the browser?",
    benefitsIntro:
      "Many makers advertise free tiers but require accounts or uploads before export. Pix-8 runs locally — the straightforward option when you need a ",
    benefitsKeyword: "free favicon maker",
    benefitsIntroAfter:
      " for a personal site, side project, or client prototype without subscription friction or off-device file routing.",
    benefits: [
      {
        title: "No account or paywall",
        body: "Open the tool, load an image, and export ICO or PNG — no sign-up, subscription, or per-download fee.",
      },
      {
        title: "Preview before you commit",
        body: "Review 16×16, 32×32, and 48×48 sizes plus a browser-tab mockup so you export once with confidence.",
      },
      {
        title: "Client-side by default",
        body: "Rendering and export happen in your browser tab. Pix-8 never receives your image during preview or download.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open the free maker",
        body: "Navigate to Pix-8 Favicon Generator in your browser — no install, no account, and no payment step.",
      },
      {
        title: "Load and preview",
        body: "Choose an image from your device. Adjust zoom, then check tab and pixel-size previews at 16, 32, and 48.",
      },
      {
        title: "Export at no cost",
        body: "Download favicon.ico or PNG — one source image per session, processed entirely on-device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to make a favicon for free?",
      body: "Open Favicon Generator, load a local image, preview tab sizes, and export ICO or PNG — privately, entirely on-device, at no cost.",
      button: "Open Favicon Generator",
    },
  },
  "convert-image-to-favicon": {
    eyebrow: "Convert · Client-side · No upload",
    titleMain: "Convert image to favicon",
    titleAccent: "ICO or PNG, on-device",
    heroSubtitle:
      "Convert an image to favicon in your browser — no upload, no account, no cloud queue. Load a PNG, JPEG, or WebP locally, frame the center square with zoom, preview tab sizes at 16×16 through 48×48, and export favicon.ico or PNG on-device without sending your source file to a server.",
    primaryCta: "Convert to favicon — Free",
    ctaNote: "No upload · No server · Image to ICO/PNG",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Image-to-favicon conversion on-device — not a hosted pipeline",
      body: "Pix-8 Favicon Generator converts a single raster image into browser-ready icon files using a client-side canvas, center-square crop, and zoom control — not a remote converter that stores your logo first. Tab and size previews confirm readability before export. It does not vectorize artwork, emit SVG favicons, or generate full PWA icon sets.",
    },
    benefitsHeading: "Why convert an image to favicon in the browser?",
    benefitsIntro:
      "Hosted converters often upload your source file before producing a favicon.ico. Pix-8 processes locally — the direct fit when you need to ",
    benefitsKeyword: "convert image to favicon",
    benefitsIntroAfter:
      " for a site deploy, CMS update, or static project without routing brand assets off-device.",
    benefits: [
      {
        title: "Raster in, favicon out",
        body: "Load a logo or photo your browser can decode, crop to a square frame, and export ICO or PNG sized for browser tabs.",
      },
      {
        title: "Size previews before download",
        body: "Check 16×16, 32×32, and 48×48 renders plus a tab mockup so the converted icon reads clearly at real favicon scale.",
      },
      {
        title: "Client-side by default",
        body: "Decoding, cropping, and export run in the browser tab. Pix-8 never receives your source image during conversion or download.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Favicon Generator",
        body: "Navigate to Pix-8 Favicon Generator in your browser — no install, no account, and no upload step before conversion.",
      },
      {
        title: "Load and frame the image",
        body: "Choose a file from your device. Adjust zoom on the center square crop, then review tab and pixel-size previews.",
      },
      {
        title: "Export ICO or PNG",
        body: "Download the converted favicon — one source image per session, exported entirely on-device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to convert an image to a favicon?",
      body: "Open Favicon Generator, load a local image, preview tab sizes, and export ICO or PNG — privately, entirely on-device.",
      button: "Open Favicon Generator",
    },
  },
  "generate-favicon-for-website": {
    eyebrow: "Website · Client-side · No upload",
    titleMain: "Generate favicon for website",
    titleAccent: "tab-ready ICO or PNG",
    heroSubtitle:
      "Generate a favicon for your website in the browser — no upload, no account, no cloud queue. Load a logo locally, preview how it reads in a browser tab at 16×16, 32×32, and 48×48, adjust zoom framing, and export favicon.ico or PNG on-device without sending brand files to a server.",
    primaryCta: "Generate favicon — Free",
    ctaNote: "No upload · No server · Site-ready export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Site favicon export on-device — not a hosted brand kit",
      body: "Pix-8 Favicon Generator turns one local image into favicon.ico or PNG using client-side rendering, a center-square crop, and tab-size previews — not a SaaS workflow that stores your logo or writes your HTML. Download files ready for your site root or head link tag. It does not deploy to your host, edit CMS templates, or generate Apple touch or PWA icon sets.",
    },
    benefitsHeading: "Why generate a website favicon in the browser?",
    benefitsIntro:
      "Many site builders route logos through cloud converters before you get a favicon.ico. Pix-8 processes locally — the practical path when you need to ",
    benefitsKeyword: "generate favicon for website",
    benefitsIntroAfter:
      " launches, staging previews, and client sites without uploading unreleased brand assets.",
    benefits: [
      {
        title: "Tab preview before deploy",
        body: "See how your mark reads in a browser-tab mockup and at 16×16, 32×32, and 48×48 before you add files to your project.",
      },
      {
        title: "Export formats sites expect",
        body: "Download multi-size favicon.ico or a 32×32 PNG — common outputs for root-folder or head link deployment.",
      },
      {
        title: "Client-side by default",
        body: "Generation runs in your browser tab. Pix-8 never receives your logo during preview or export.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Favicon Generator",
        body: "Navigate to Pix-8 Favicon Generator in your browser — no install, no account, and no upload before you generate.",
      },
      {
        title: "Load your site logo",
        body: "Choose an image from your device. Adjust zoom on the center crop, then confirm tab and pixel-size previews.",
      },
      {
        title: "Export for your site",
        body: "Download favicon.ico or PNG and add it to your project — one source image per session, generated entirely on-device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to generate your site favicon?",
      body: "Open Favicon Generator, load a local logo, preview tab sizes, and export ICO or PNG — privately, entirely on-device.",
      button: "Open Favicon Generator",
    },
  },
  "favicon-icon-maker-for-web": {
    eyebrow: "Web icons · Client-side · No upload",
    titleMain: "Favicon icon maker for web",
    titleAccent: "browser-tab ICO or PNG",
    heroSubtitle:
      "Use a favicon icon maker for web in your browser — no upload, no account, no cloud queue. Load a logo locally, preview tab icons at 16×16, 32×32, and 48×48, adjust zoom framing, and export favicon.ico or PNG on-device without sending your source file to a server.",
    primaryCta: "Make web icon — Free",
    ctaNote: "No upload · No server · Tab-icon export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Web tab icons on-device — not a generic cloud icon studio",
      body: "Pix-8 Favicon Generator focuses on browser-tab favicon output — client-side canvas rendering, center-square crop, zoom control, and tab mockup previews — not a broad icon design suite that uploads assets first. Export favicon.ico (16, 32, and 48 px) or PNG for web projects. It does not author SVG icons, build icon fonts, or ship full PWA icon grids.",
    },
    benefitsHeading: "Why use a favicon icon maker for web in the browser?",
    benefitsIntro:
      "General design tools and cloud studios often require uploads and broad workflows unrelated to a single tab icon. Pix-8 processes locally — the focused fit when you need a ",
    benefitsKeyword: "favicon icon maker for web",
    benefitsIntroAfter:
      " projects, static sites, and front-end handoffs without routing logos off-device.",
    benefits: [
      {
        title: "Built for tab-scale icons",
        body: "Center-square crop, zoom framing, and previews at 16×16, 32×32, and 48×48 — sized for how browsers display favicons.",
      },
      {
        title: "Tab mockup before export",
        body: "See how your icon reads in a browser-tab preview so you catch blur and clipping before adding files to your web project.",
      },
      {
        title: "Client-side by default",
        body: "Icon rendering and export run in the browser tab. Pix-8 never receives your source image during preview or download.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Favicon Generator",
        body: "Navigate to Pix-8 Favicon Generator in your browser — no install, no account, and no upload before you make a web icon.",
      },
      {
        title: "Load and preview",
        body: "Choose an image from your device. Adjust zoom on the center crop, then review tab and pixel-size previews.",
      },
      {
        title: "Export ICO or PNG",
        body: "Download favicon files for your web project — one source image per session, made entirely on-device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to make a web favicon icon?",
      body: "Open Favicon Generator, load a local logo, preview tab sizes, and export ICO or PNG — privately, entirely on-device.",
      button: "Open Favicon Generator",
    },
  },
  "create-favicon-sizes-online": {
    eyebrow: "Multi-size · Client-side · No upload",
    titleMain: "Create favicon sizes online",
    titleAccent: "16, 32, and 48 px previews",
    heroSubtitle:
      "Create favicon sizes online in your browser — no upload, no account, no cloud queue. Load an image locally, preview 16×16, 32×32, and 48×48 side by side, adjust zoom framing, and export a multi-size favicon.ico or 32×32 PNG on-device without sending your source file to a server.",
    primaryCta: "Create sizes — Free",
    ctaNote: "No upload · No server · 16–48px preview",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Three tab sizes previewed — not a full icon grid generator",
      body: "Pix-8 Favicon Generator shows live previews at 16×16, 32×32, and 48×48, then exports favicon.ico with those sizes embedded or a single 32×32 PNG — all on a client-side canvas with zoom control. It is not a hosted pack builder for dozens of PWA dimensions or platform-specific touch icons.",
    },
    benefitsHeading: "Why create favicon sizes online in the browser?",
    benefitsIntro:
      "Size-pack tools online often upload your logo before rendering a grid. Pix-8 processes locally — the direct path when you need to ",
    benefitsKeyword: "create favicon sizes online",
    benefitsIntroAfter:
      " and confirm 16, 32, and 48 px legibility before dropping files into your project.",
    benefits: [
      {
        title: "Side-by-side size previews",
        body: "Compare 16×16, 32×32, and 48×48 renders plus a browser-tab mockup before you export — no guesswork at favicon scale.",
      },
      {
        title: "ICO bundles three sizes",
        body: "Download one favicon.ico with 16, 32, and 48 px embedded, or export a 32×32 PNG when a single asset is enough.",
      },
      {
        title: "Client-side by default",
        body: "Each size is rendered in your browser tab from one local source image. Pix-8 never receives your file during preview or export.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Favicon Generator",
        body: "Navigate to Pix-8 Favicon Generator in your browser — no install, no account, and no upload before size previews appear.",
      },
      {
        title: "Load and compare sizes",
        body: "Choose an image from your device. Adjust zoom, then review 16×16, 32×32, and 48×48 previews and the tab mockup.",
      },
      {
        title: "Export ICO or PNG",
        body: "Download multi-size favicon.ico or 32×32 PNG — one source image per session, generated entirely on-device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to create favicon sizes without uploading?",
      body: "Open Favicon Generator, load a local image, preview 16–48 px sizes, and export ICO or PNG — privately, entirely on-device.",
      button: "Open Favicon Generator",
    },
  },
  "client-side-favicon-generator": {
    eyebrow: "Client-side · No upload · On-device",
    titleMain: "Client-side favicon generator",
    titleAccent: "private browser export",
    heroSubtitle:
      "Use a client-side favicon generator in your browser — no upload, no account, no server round trip. Load an image locally, preview tab icons at 16×16, 32×32, and 48×48, adjust zoom framing, and export favicon.ico or PNG on-device while your source file stays in the browser tab.",
    primaryCta: "Generate locally — Free",
    ctaNote: "No upload · No server · Browser canvas",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Browser canvas processing — not a cloud conversion API",
      body: "Pix-8 Favicon Generator decodes your image on a client-side canvas, applies a center-square crop with zoom control, and renders tab-size previews before export — not a remote API that ingests your logo first. Download favicon.ico (16, 32, and 48 px) or PNG without transmitting pixel data to Pix-8. It does not offer team cloud libraries, CDN deployment, or automated HTML injection.",
    },
    benefitsHeading: "Why choose a client-side favicon generator?",
    benefitsIntro:
      "Cloud favicon tools route logos through remote servers by default. Pix-8 keeps processing in the browser — the privacy-first fit when you need a ",
    benefitsKeyword: "client-side favicon generator",
    benefitsIntroAfter:
      " for unreleased brands, client work under NDA, and local-first workflows.",
    benefits: [
      {
        title: "No server upload step",
        body: "Load from your device and export on the same machine — decoding, crop, preview, and download happen without sending your image to Pix-8.",
      },
      {
        title: "Preview before export",
        body: "Review 16×16, 32×32, and 48×48 renders plus a browser-tab mockup so you export once with confidence.",
      },
      {
        title: "Session-local processing",
        body: "One source image per browser session, processed in-memory on a canvas. No account, no hosted project history, no cloud storage.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open in your browser",
        body: "Navigate to Pix-8 Favicon Generator — processing runs in the tab via client-side canvas, not a remote worker.",
      },
      {
        title: "Load and preview locally",
        body: "Choose an image from your device. Adjust zoom, then check tab and pixel-size previews — all rendered on-device.",
      },
      {
        title: "Export without uploading",
        body: "Download favicon.ico or PNG from the browser session. Your source file never leaves your machine through Pix-8.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for a private, client-side favicon workflow?",
      body: "Open Favicon Generator, load a local image, preview tab sizes, and export ICO or PNG — entirely in your browser, with no upload.",
      button: "Open Favicon Generator",
    },
  },
  "no-upload-favicon-creator": {
    eyebrow: "No upload · Client-side · Private",
    titleMain: "No-upload favicon creator",
    titleAccent: "local load, on-device export",
    heroSubtitle:
      "Use a no-upload favicon creator in your browser — no drag-and-drop to a remote server, no account, no cloud queue. Pick an image from your device, preview tab icons at 16×16, 32×32, and 48×48, adjust zoom framing, and export favicon.ico or PNG on-device while your file stays local to the browser session.",
    primaryCta: "Create favicon — Free",
    ctaNote: "No upload · No server · Local file only",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Create without uploading — not a hosted conversion inbox",
      body: "Pix-8 Favicon Generator never asks you to send your logo to a server first. The image loads from your device into a client-side canvas, where center-square crop, zoom control, and tab previews run before you download favicon.ico (16, 32, and 48 px) or PNG. It is not a cloud inbox that stores uploads, emails results, or builds multi-platform icon kits.",
    },
    benefitsHeading: "Why use a no-upload favicon creator?",
    benefitsIntro:
      "Upload-first favicon tools expose logos to third-party infrastructure by default. Pix-8 skips that step — the right match when you need a ",
    benefitsKeyword: "no-upload favicon creator",
    benefitsIntroAfter:
      " for confidential client marks, pre-launch sites, and privacy-sensitive workflows.",
    benefits: [
      {
        title: "Zero server transfer",
        body: "Load from disk or gallery and export in the same browser session — Pix-8 does not receive your image during preview or download.",
      },
      {
        title: "Tab previews before save",
        body: "Check 16×16, 32×32, and 48×48 renders plus a browser-tab mockup so you commit to an export without sending files off-device.",
      },
      {
        title: "Client-side by default",
        body: "Decoding, cropping, and favicon export run on a local canvas. No hosted storage, no conversion queue, no account gate.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Favicon Generator",
        body: "Navigate to Pix-8 in your browser — there is no upload dialog or cloud drop zone before you start.",
      },
      {
        title: "Load locally",
        body: "Choose an image from your device. Adjust zoom, then review tab and pixel-size previews rendered on-device.",
      },
      {
        title: "Export without uploading",
        body: "Download favicon.ico or PNG — one source image per session, created entirely in your browser.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to create a favicon with no upload?",
      body: "Open Favicon Generator, load a local image, preview tab sizes, and export ICO or PNG — privately, entirely on-device.",
      button: "Open Favicon Generator",
    },
  },
  "privacy-first-favicon-tool": {
    eyebrow: "Privacy-first · Client-side · No upload",
    titleMain: "Privacy-first favicon tool",
    titleAccent: "your logo stays local",
    heroSubtitle:
      "Use a privacy-first favicon tool in your browser — no upload, no account, no remote conversion queue. Load an image from your device, preview tab icons at 16×16, 32×32, and 48×48, adjust zoom framing, and export favicon.ico or PNG on-device while your source file never leaves the browser session.",
    primaryCta: "Create privately — Free",
    ctaNote: "No upload · No server · On-device only",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Local processing by design — not a data-collection converter",
      body: "Pix-8 Favicon Generator decodes, crops, previews, and exports on a client-side canvas — not a hosted pipeline that ingests your logo for analytics or storage. Download favicon.ico (16, 32, and 48 px) or PNG without transmitting pixel data to Pix-8. It does not run server-side virus scans, retain upload history, or sync projects to a cloud account.",
    },
    benefitsHeading: "Why choose a privacy-first favicon tool?",
    benefitsIntro:
      "Remote favicon services treat your logo as upload input by default. Pix-8 keeps files on your machine — the deliberate choice when you need a ",
    benefitsKeyword: "privacy-first favicon tool",
    benefitsIntroAfter:
      " for confidential marks, pre-release sites, and local-only design workflows.",
    benefits: [
      {
        title: "No remote asset routing",
        body: "Load from your device and export in the same browser tab — Pix-8 does not receive your image during preview or download.",
      },
      {
        title: "Preview before you share anything",
        body: "Review 16×16, 32×32, and 48×48 renders and a tab mockup locally before you add files to a repo or CMS — without uploading the source first.",
      },
      {
        title: "Session-local by default",
        body: "One source image per browser session, processed in-memory on a canvas. No account, no hosted project library, no cloud inbox.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Favicon Generator",
        body: "Navigate to Pix-8 in your browser — processing stays in the tab, not on a remote worker that stores uploads.",
      },
      {
        title: "Load and preview locally",
        body: "Choose an image from your device. Adjust zoom, then confirm tab and pixel-size previews rendered on-device.",
      },
      {
        title: "Export without uploading",
        body: "Download favicon.ico or PNG from the browser session. Your logo is not sent to Pix-8 for conversion.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for a privacy-first favicon workflow?",
      body: "Open Favicon Generator, load a local image, preview tab sizes, and export ICO or PNG — privately, entirely on-device.",
      button: "Open Favicon Generator",
    },
  },
  "browser-based-icon-generator": {
    eyebrow: "In-browser · Client-side · No install",
    titleMain: "Browser-based icon generator",
    titleAccent: "tab favicons in your browser",
    heroSubtitle:
      "Use a browser-based icon generator for tab favicons — no install, no upload, no account. Open Pix-8 in any modern browser, load an image from your device, preview icons at 16×16, 32×32, and 48×48, adjust zoom framing, and export favicon.ico or PNG on-device while processing stays in the browser tab.",
    primaryCta: "Generate in browser — Free",
    ctaNote: "No install · No upload · Client-side only",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Favicon generation in the tab — not a hosted icon factory",
      body: "Pix-8 Favicon Generator decodes, crops, previews, and exports on a client-side canvas inside your browser. Download favicon.ico (16, 32, and 48 px) or a 32×32 PNG without sending pixel data to Pix-8. It does not install a desktop app, publish multi-platform app-icon sets, or trace SVG artwork into tab icons.",
    },
    benefitsHeading: "Why use a browser-based icon generator?",
    benefitsIntro:
      "Desktop icon suites and cloud converters add install steps or upload queues by default. Pix-8 runs in a browser tab — the direct path when you need a ",
    benefitsKeyword: "browser-based icon generator",
    benefitsIntroAfter:
      " for quick tab favicons from a local logo, with client-side processing and no server handoff.",
    benefits: [
      {
        title: "No install required",
        body: "Open a browser tab and start — favicon preview and export run client-side without a desktop package or browser extension.",
      },
      {
        title: "Tab-size preview on-device",
        body: "Review 16×16, 32×32, and 48×48 renders and a tab mockup in the browser before you download favicon.ico or PNG.",
      },
      {
        title: "Local files stay local",
        body: "Load from your device and export in the same session — Pix-8 does not receive your image during preview or download.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Favicon Generator",
        body: "Navigate to Pix-8 in your browser — no installer, plugin, or sign-up gate before you begin.",
      },
      {
        title: "Load and frame locally",
        body: "Choose an image from your device. Adjust zoom on a center-square crop, then confirm tab and pixel-size previews rendered in-browser.",
      },
      {
        title: "Export from the browser",
        body: "Download favicon.ico or PNG from the tab session. Your source file is not uploaded for conversion.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to generate tab icons in your browser?",
      body: "Open Favicon Generator, load a local image, preview tab sizes, and export ICO or PNG — entirely in-browser, on-device.",
      button: "Open Favicon Generator",
    },
  },
  "best-online-tool-to-create-favicon": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Best online tool to create a favicon",
    titleAccent: "preview, export, stay local",
    heroSubtitle:
      "Looking for the best online tool to create a favicon? Pix-8 Favicon Generator runs in your browser with client-side processing — no upload, no account. Load an image from your device, preview tab icons at 16×16, 32×32, and 48×48, adjust zoom framing, and export favicon.ico or PNG on-device before you add files to your site.",
    primaryCta: "Create favicon — Free",
    ctaNote: "No upload · No account · On-device only",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "A focused online favicon workflow — not a generic icon suite",
      body: "Pix-8 is built for browser tab favicons from one local raster source per session. Preview real tab sizes, tune zoom on a center-square crop, then download favicon.ico (16, 32, and 48 px) or a 32×32 PNG — all on a client-side canvas without sending pixel data to Pix-8. It does not rank or compare third-party tools, and it does not ship PWA manifests or Apple touch icon packs.",
    },
    benefitsHeading: "Why Pix-8 fits the best online favicon workflow",
    benefitsIntro:
      "The strongest online favicon tools combine tab-size preview, practical export formats, and local processing. Pix-8 delivers that stack when you need the ",
    benefitsKeyword: "best online tool to create a favicon",
    benefitsIntroAfter:
      " without routing your logo through a remote conversion server.",
    benefits: [
      {
        title: "Preview before you commit",
        body: "Review 16×16, 32×32, and 48×48 renders plus a tab mockup in the browser — so small-icon clarity is visible before export.",
      },
      {
        title: "Export formats sites actually use",
        body: "Download multi-size favicon.ico or a 32×32 PNG from the same session — no second tool for standard tab icons.",
      },
      {
        title: "Client-side by default",
        body: "Load from your device and export in the browser tab. Pix-8 does not receive your image during preview or download.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Favicon Generator",
        body: "Start in your browser — no install, sign-up wall, or upload queue before you load a logo.",
      },
      {
        title: "Load and tune locally",
        body: "Choose an image from your device. Adjust zoom, then confirm tab and pixel-size previews rendered on-device.",
      },
      {
        title: "Export favicon files",
        body: "Download favicon.ico or PNG from the browser session. Your source file is not uploaded for conversion.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to create your favicon online?",
      body: "Open Favicon Generator, load a local image, preview tab sizes, and export ICO or PNG — client-side, entirely in your browser.",
      button: "Open Favicon Generator",
    },
  },
  "make-favicon-for-wordpress": {
    eyebrow: "WordPress · Client-side · No upload",
    titleMain: "Make favicon for WordPress",
    titleAccent: "export locally, upload in WP",
    heroSubtitle:
      "Need to make a favicon for WordPress? Pix-8 Favicon Generator runs in your browser with client-side processing — no upload to Pix-8, no account. Load a logo from your device, preview tab icons at 16×16, 32×32, and 48×48, adjust zoom framing, export favicon.ico or PNG on-device, then add the file through your WordPress Site Identity or theme settings.",
    primaryCta: "Make favicon — Free",
    ctaNote: "No upload to Pix-8 · On-device only",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Favicon file creation — not a WordPress plugin or admin connector",
      body: "Pix-8 builds browser-tab favicon files from one local raster image per session. Preview real tab sizes, tune zoom on a center-square crop, then download favicon.ico (16, 32, and 48 px) or a 32×32 PNG on a client-side canvas. It does not log into wp-admin, edit your theme files, inject link tags, or sync assets to your WordPress media library automatically.",
    },
    benefitsHeading: "Why use Pix-8 to make a WordPress favicon?",
    benefitsIntro:
      "WordPress needs a finished favicon file before Site Identity can display it. Pix-8 handles that export step locally when you ",
    benefitsKeyword: "make a favicon for WordPress",
    benefitsIntroAfter:
      " — with tab-size preview and client-side processing, without routing your logo through a remote converter first.",
    benefits: [
      {
        title: "Preview tab sizes before upload",
        body: "Review 16×16, 32×32, and 48×48 renders and a tab mockup in the browser — so your mark reads clearly before you add it to WordPress.",
      },
      {
        title: "Export ICO or PNG for Site Identity",
        body: "Download multi-size favicon.ico or a 32×32 PNG from the same session — formats you can upload through standard WordPress site settings.",
      },
      {
        title: "Logo stays on your device",
        body: "Load from your machine and export in the browser tab. Pix-8 does not receive your image during preview or download.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Favicon Generator",
        body: "Start in your browser — client-side processing, no upload queue and no Pix-8 account required.",
      },
      {
        title: "Load and preview locally",
        body: "Choose your WordPress site logo or mark from your device. Adjust zoom, then confirm tab and pixel-size previews rendered on-device.",
      },
      {
        title: "Export, then add in WordPress",
        body: "Download favicon.ico or PNG, then upload through Appearance → Customize → Site Identity or your theme’s favicon setting.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to make your WordPress favicon?",
      body: "Open Favicon Generator, load a local image, preview tab sizes, export ICO or PNG, then upload the file in WordPress — all processing stays on-device.",
      button: "Open Favicon Generator",
    },
  },
  "professional-favicon-maker-for-business": {
    eyebrow: "Business · Client-side · No upload",
    titleMain: "Professional favicon maker for business",
    titleAccent: "your mark, tab-ready",
    heroSubtitle:
      "Need a professional favicon maker for business? Pix-8 Favicon Generator runs in your browser with client-side processing — no upload, no account. Load a company logo from your device, preview tab icons at 16×16, 32×32, and 48×48, adjust zoom framing, and export favicon.ico or PNG on-device before your business site goes live.",
    primaryCta: "Make business favicon — Free",
    ctaNote: "No upload · No account · On-device only",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Tab favicon export for business sites — not an enterprise brand suite",
      body: "Pix-8 turns one local raster logo per session into browser-tab favicon files. Preview real tab sizes, tune zoom on a center-square crop, then download favicon.ico (16, 32, and 48 px) or a 32×32 PNG on a client-side canvas — without transmitting pixel data to Pix-8. It does not manage brand portals, assign team seats, or deliver full cross-platform icon grids for app stores.",
    },
    benefitsHeading: "Why businesses use this favicon maker",
    benefitsIntro:
      "A business site needs a favicon that stays legible at tab scale. Pix-8 gives you preview, export, and local processing when you need a ",
    benefitsKeyword: "professional favicon maker for business",
    benefitsIntroAfter:
      " — without routing your company mark through a remote conversion server first.",
    benefits: [
      {
        title: "Tab-size QA before launch",
        body: "Review 16×16, 32×32, and 48×48 renders and a tab mockup in the browser — so your logo holds up in real browser chrome.",
      },
      {
        title: "Export files ready for your site",
        body: "Download multi-size favicon.ico or a 32×32 PNG from the same session — standard formats for business websites and staging deploys.",
      },
      {
        title: "Client-side for sensitive marks",
        body: "Load from your device and export in the browser tab. Pix-8 does not receive your logo during preview or download.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Favicon Generator",
        body: "Start in your browser — client-side processing, no enterprise sign-up or upload queue required.",
      },
      {
        title: "Load your business logo",
        body: "Choose a company mark from your device. Adjust zoom, then confirm tab and pixel-size previews rendered on-device.",
      },
      {
        title: "Export for your website",
        body: "Download favicon.ico or PNG and add it to your business site root, CMS, or deployment pipeline.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to ship a business favicon?",
      body: "Open Favicon Generator, load a local logo, preview tab sizes, and export ICO or PNG — client-side, entirely on-device.",
      button: "Open Favicon Generator",
    },
  },
  "favicon-converter-for-all-browsers": {
    eyebrow: "Cross-browser · Client-side · No upload",
    titleMain: "Favicon converter for all browsers",
    titleAccent: "one ICO, major browsers",
    heroSubtitle:
      "Need a favicon converter for all browsers? Pix-8 Favicon Generator runs in your browser with client-side processing — no upload, no account. Load an image from your device, preview tab icons at 16×16, 32×32, and 48×48, adjust zoom framing, and export multi-size favicon.ico or PNG on-device for standard cross-browser tab display.",
    primaryCta: "Convert favicon — Free",
    ctaNote: "No upload · Multi-size ICO · On-device only",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Standard cross-browser favicon export — not per-browser icon packs",
      body: "Pix-8 embeds 16×16, 32×32, and 48×48 into one favicon.ico, or exports a 32×32 PNG — formats major browsers already read from site roots and HTML head tags. Preview tab sizes on a client-side canvas before download, without sending pixel data to Pix-8. It does not generate Safari pinned-tab SVGs, Firefox site-specific manifests, or separate assets tuned for each browser engine.",
    },
    benefitsHeading: "Why use this cross-browser favicon converter?",
    benefitsIntro:
      "Browsers pick favicon sizes from a small set of standard files. Pix-8 exports that set locally when you need a ",
    benefitsKeyword: "favicon converter for all browsers",
    benefitsIntroAfter:
      " — with tab-size preview and client-side processing, without a remote upload step.",
    benefits: [
      {
        title: "Multi-size ICO in one file",
        body: "Download favicon.ico with 16×16, 32×32, and 48×48 embedded — the format most browsers resolve from a single site-root file.",
      },
      {
        title: "Preview tab scale before deploy",
        body: "Review pixel-size renders and a tab mockup in the browser so your mark stays legible across common tab chrome.",
      },
      {
        title: "Convert locally, not on a server",
        body: "Load from your device and export in the same browser tab. Pix-8 does not receive your image during preview or download.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Favicon Generator",
        body: "Start in any modern browser tab — client-side processing, no upload queue required.",
      },
      {
        title: "Load and preview sizes",
        body: "Choose an image from your device. Adjust zoom, then confirm 16×16, 32×32, and 48×48 previews rendered on-device.",
      },
      {
        title: "Export ICO or PNG",
        body: "Download multi-size favicon.ico or a 32×32 PNG and add it to your site root or HTML head for browser pickup.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to convert a cross-browser favicon?",
      body: "Open Favicon Generator, load a local image, preview tab sizes, and export ICO or PNG — client-side, entirely on-device.",
      button: "Open Favicon Generator",
    },
  },
};
