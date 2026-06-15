import type {
  BackgroundRemoverLandingChrome,
  BackgroundRemoverLandingDisplayFields,
} from "@/lib/backgroundRemoverLandingTypes";
import type { BackgroundRemoverLandingId } from "@/lib/backgroundRemoverLandings";

export const BACKGROUND_REMOVER_LANDING_CHROME_EN: BackgroundRemoverLandingChrome =
  {
    privacyNote:
      "Client-side processing only — your image never leaves the browser.",
    relatedUseCasesHeading: "Related use cases",
    guidesHeading: "Guides",
    toolCardTitle: "Background Remover tool",
    toolCardExcerpt:
      "Open the workspace — remove backgrounds locally and export PNG.",
  };

export const BACKGROUND_REMOVER_LANDING_DISPLAY_EN: Record<
  BackgroundRemoverLandingId,
  Omit<BackgroundRemoverLandingDisplayFields, "capabilities">
> = {
  "remove-background-from-image-online": {
    eyebrow: "Client-side · No upload · Free",
    titleMain: "Remove Background from Image Online",
    titleAccent: "Private Browser Masking",
    heroSubtitle:
      "Isolate subjects from photos in your browser — no upload, no account, no cloud queue. AI segmentation runs on-device and exports a transparent or solid-color PNG.",
    primaryCta: "Remove Background — Free",
    ctaNote: "No upload · No server · PNG export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Background removal without the upload step",
      body: "Background Remover segments subjects in your browser tab using on-device AI — not a cloud API that receives your file first. Choose transparent or solid-color output, then download or copy PNG. It does not include batch processing, manual mask brushes, or collaborative editing layers.",
    },
    benefitsHeading: "Why remove image backgrounds online in the browser?",
    benefitsIntro:
      "Cloud removers route every file through a remote server before you see a result. Pix-8 processes locally — the practical fit when you need to ",
    benefitsKeyword: "remove background from image online",
    benefitsIntroAfter:
      " without sending product shots, portraits, or internal assets off-device.",
    benefits: [
      {
        title: "Privacy by architecture",
        body: "Segmentation runs on a client-side canvas in the browser. Your images never touch a cloud server before, during, or after removal.",
      },
      {
        title: "Transparent or solid output",
        body: "Export a cut-out with a transparent background or place the subject on a solid color — ready for listings, slides, or compositing.",
      },
      {
        title: "Instant export",
        body: "Download or copy the result to your clipboard as PNG, with optional EXIF stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Background Remover",
        body: "Navigate to Pix-8 Background Remover in your browser — no install, no account, no upload dialog.",
      },
      {
        title: "Load and process",
        body: "Select an image, let on-device AI segment the subject, and preview the cut-out on a transparent or solid background.",
      },
      {
        title: "Download or copy",
        body: "Export PNG to your device or copy to clipboard — ready to paste into your workflow immediately.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to remove backgrounds without uploading?",
      body: "Open Background Remover, load your first image, and export a cut-out PNG — privately, entirely on your device.",
      button: "Open Background Remover",
    },
  },
  "transparent-background-maker": {
    eyebrow: "Transparent PNG · Client-side · Free",
    titleMain: "Transparent Background Maker",
    titleAccent: "PNG Cut-Outs in Your Browser",
    heroSubtitle:
      "Turn photos into transparent PNGs in your browser — no upload, no account, no cloud queue. On-device AI segments the subject and exports a cut-out with a true alpha channel.",
    primaryCta: "Make Transparent PNG — Free",
    ctaNote: "No upload · No server · Alpha PNG export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Transparent output without a cloud upload",
      body: "Background Remover creates transparent PNG cut-outs in your browser tab using on-device AI segmentation — not a cloud service that stores your file. Toggle transparent or solid-color output, then download or copy. It does not include batch processing, manual mask brushes, or layer-based compositing tools.",
    },
    benefitsHeading: "Why use a transparent background maker in the browser?",
    benefitsIntro:
      "Most online makers upload your image before exporting transparency. Pix-8 keeps segmentation local — the direct path when you need a ",
    benefitsKeyword: "transparent background maker",
    benefitsIntroAfter:
      " that outputs alpha PNGs without routing files through a remote server.",
    benefits: [
      {
        title: "True alpha PNG export",
        body: "Segment the subject and export a PNG with a transparent background — ready for listings, logos, slides, and compositing.",
      },
      {
        title: "Client-side by default",
        body: "AI segmentation runs on a local canvas in the browser. Your images never touch a cloud server before or during export.",
      },
      {
        title: "Solid-color fallback",
        body: "Need a flat fill instead of transparency? Switch to solid-color output and pick a background color before download.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Background Remover",
        body: "Navigate to Pix-8 Background Remover — a transparent background maker that runs entirely in your browser tab.",
      },
      {
        title: "Segment and preview",
        body: "Load an image, run on-device AI segmentation, and preview the cut-out on the transparency checkerboard.",
      },
      {
        title: "Export transparent PNG",
        body: "Download or copy the alpha PNG to your clipboard — ready to drop into your design or storefront.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to make a transparent background?",
      body: "Open Background Remover, load your image, and export a transparent PNG — privately, entirely on your device.",
      button: "Open Background Remover",
    },
  },
  "remove-image-background-free": {
    eyebrow: "Free · No watermark · Client-side",
    titleMain: "Remove Image Background Free",
    titleAccent: "No Upload, No Paywall",
    heroSubtitle:
      "Remove image backgrounds for free in your browser — no account, no watermark, no credit counter. On-device AI segmentation exports a transparent or solid-color PNG without sending your file to a server.",
    primaryCta: "Remove Background — Free",
    ctaNote: "Free · No watermark · No server upload",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Free cut-outs without the upload tax",
      body: "Background Remover is free to use with no watermark and no export cap — segmentation runs on-device in your browser tab, not behind a freemium cloud API. Export transparent or solid-color PNG, then download or copy. It does not include batch processing, manual refinement brushes, or subscription upsells.",
    },
    benefitsHeading: "Why remove image backgrounds free in the browser?",
    benefitsIntro:
      "Free cloud removers often trade privacy for cost — your file uploads before you export. Pix-8 removes backgrounds locally — the practical way to ",
    benefitsKeyword: "remove image background free",
    benefitsIntroAfter:
      " without watermarks, paywalls, or routing sensitive shots through a remote server.",
    benefits: [
      {
        title: "Free with no watermark",
        body: "No account, no credit system, no branded export stamp. Segment and download PNG cut-outs at zero cost.",
      },
      {
        title: "Client-side by default",
        body: "AI segmentation runs on a local canvas in the browser. Your images never touch a cloud server before, during, or after removal.",
      },
      {
        title: "Instant PNG export",
        body: "Choose transparent or solid-color output, then download or copy to clipboard — with optional EXIF stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open for free",
        body: "Navigate to Pix-8 Background Remover — no sign-up, no trial gate, no install required.",
      },
      {
        title: "Load and segment",
        body: "Select an image, run on-device AI segmentation, and preview the cut-out on transparent or solid background.",
      },
      {
        title: "Download at no cost",
        body: "Export PNG to your device or copy to clipboard — free, with no watermark on the result.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to remove backgrounds for free?",
      body: "Open Background Remover, load your first image, and export a cut-out PNG — free, private, entirely on your device.",
      button: "Open Background Remover",
    },
  },
  "erase-background-online": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Erase Background Online",
    titleAccent: "AI Cut-Outs in Your Browser",
    heroSubtitle:
      "Erase image backgrounds online in your browser — no upload, no account, no cloud queue. On-device AI segments the subject and exports a transparent or solid-color PNG without sending your file to a server.",
    primaryCta: "Erase Background — Free",
    ctaNote: "No upload · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Erase backgrounds without a cloud upload",
      body: "Background Remover uses on-device AI segmentation to isolate subjects and erase the surrounding area — not a cloud API that stores your file first. Export transparent or solid-color PNG, then download or copy. It does not include freehand eraser brushes, manual edge refinement, or batch processing.",
    },
    benefitsHeading: "Why erase backgrounds online in the browser?",
    benefitsIntro:
      "Online erasers that upload first expose every file before you see a result. Pix-8 erases locally — the direct path when you need to ",
    benefitsKeyword: "erase background online",
    benefitsIntroAfter:
      " without routing product shots, portraits, or confidential assets through a remote server.",
    benefits: [
      {
        title: "AI segmentation, not manual erasing",
        body: "Subject detection replaces pixel-by-pixel erasing — isolate the foreground automatically and export a clean cut-out in seconds.",
      },
      {
        title: "Client-side by default",
        body: "Segmentation runs on a local canvas in the browser. Your images never touch a cloud server before, during, or after the erase step.",
      },
      {
        title: "Portable PNG output",
        body: "Download or copy a transparent or solid-color PNG — ready for listings, slides, or compositing, with optional EXIF stripping.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open in your browser",
        body: "Navigate to Pix-8 Background Remover — erase backgrounds online with no install, no account, and no upload dialog.",
      },
      {
        title: "Load and erase",
        body: "Select an image, run on-device AI segmentation to erase the background, and preview the cut-out on transparent or solid fill.",
      },
      {
        title: "Export and share",
        body: "Download or copy the PNG to your clipboard — ready to use immediately in your workflow.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to erase backgrounds online?",
      body: "Open Background Remover, load your image, and export a cut-out PNG — privately, entirely on your device.",
      button: "Open Background Remover",
    },
  },
  "background-remover-for-ecommerce": {
    eyebrow: "E-commerce · Client-side · No upload",
    titleMain: "Background Remover for E-Commerce",
    titleAccent: "Listing-Ready Product Cut-Outs",
    heroSubtitle:
      "Prepare product photos for listings in your browser — no upload, no account, no cloud queue. On-device AI segments each item and exports a transparent or solid-color PNG without sending supplier shots to a server.",
    primaryCta: "Remove Background — Free",
    ctaNote: "No upload · No server · PNG export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Product cut-outs without uploading your catalog",
      body: "Background Remover isolates products on a client-side canvas using on-device AI — not a cloud API that receives every SKU before segmentation. Export transparent PNG for compositing or solid-color fills for flat-backdrop listings, then download or copy. It does not include batch processing, marketplace auto-sizing, or store platform integrations.",
    },
    benefitsHeading: "Why use a background remover for e-commerce in the browser?",
    benefitsIntro:
      "Cloud removers expose unreleased inventory and supplier imagery on remote servers. Pix-8 processes locally — the practical fit for a ",
    benefitsKeyword: "background remover for e-commerce",
    benefitsIntroAfter:
      " that keeps product shots on-device while you export listing-ready cut-outs.",
    benefits: [
      {
        title: "Confidential product shots",
        body: "Segmentation runs in the browser. Unreleased SKUs, supplier samples, and internal photography never leave your device.",
      },
      {
        title: "Transparent or white-backdrop PNG",
        body: "Export alpha PNG for store themes or switch to a solid fill — common for marketplaces that require a clean product backdrop.",
      },
      {
        title: "Fast single-SKU workflow",
        body: "Load one product image, segment, and export in seconds — download or copy with optional EXIF stripping before upload to your store.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Background Remover",
        body: "Navigate to Pix-8 in your browser — no install, no account, and no catalog upload step.",
      },
      {
        title: "Segment the product",
        body: "Load a product photo, run on-device AI segmentation, and preview the cut-out on transparent or solid background.",
      },
      {
        title: "Export for your listing",
        body: "Download or copy PNG and add to your store, marketplace, or design file — privately processed on your device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to prep product photos without uploading?",
      body: "Open Background Remover, load a product shot, and export a listing-ready cut-out — privately, entirely on your device.",
      button: "Open Background Remover",
    },
  },
  "remove-background-for-marketing-graphics": {
    eyebrow: "Marketing · Client-side · No upload",
    titleMain: "Remove Background for Marketing Graphics",
    titleAccent: "Compositing-Ready Cut-Outs",
    heroSubtitle:
      "Isolate subjects for ads, social, and slide decks in your browser — no upload, no account, no cloud queue. On-device AI exports transparent or solid-color PNGs without sending campaign assets to a server.",
    primaryCta: "Remove Background — Free",
    ctaNote: "No upload · No server · PNG export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Cut-outs for compositing — not a full design suite",
      body: "Background Remover segments subjects on a client-side canvas using on-device AI — not a cloud API that stores your campaign files. Export transparent PNG for layering in your design tool, or solid-color fills for quick placements. It does not include templates, typography tools, batch processing, or direct ad-platform publishing.",
    },
    benefitsHeading: "Why remove backgrounds for marketing graphics in the browser?",
    benefitsIntro:
      "Cloud removers upload pre-launch creatives before you composite a single layer. Pix-8 processes locally — the practical fit when you need to ",
    benefitsKeyword: "remove background for marketing graphics",
    benefitsIntroAfter:
      " without exposing unreleased ads, client shots, or internal assets on a remote server.",
    benefits: [
      {
        title: "Pre-launch creative privacy",
        body: "Segmentation runs in the browser. Campaign drafts, client photography, and unreleased visuals stay on your device throughout.",
      },
      {
        title: "Transparent PNG for compositing",
        body: "Export alpha PNG cut-outs ready to layer in ads, social graphics, presentations, and email headers.",
      },
      {
        title: "Brand-color solid fills",
        body: "Switch to a solid background color when a flat branded backdrop fits the placement faster than transparency.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Background Remover",
        body: "Navigate to Pix-8 in your browser — no install, no account, and no asset upload step.",
      },
      {
        title: "Isolate the subject",
        body: "Load a marketing photo or product shot, run on-device AI segmentation, and preview on transparent or solid background.",
      },
      {
        title: "Export to your design file",
        body: "Download or copy PNG and drop into your ad layout, slide deck, or social template — privately processed on your device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to prep marketing cut-outs without uploading?",
      body: "Open Background Remover, load your asset, and export a compositing-ready PNG — privately, entirely on your device.",
      button: "Open Background Remover",
    },
  },
  "background-eraser-for-social-media-photos": {
    eyebrow: "Social · Client-side · No upload",
    titleMain: "Background Eraser for Social Media Photos",
    titleAccent: "Portable Cut-Outs for Posts",
    heroSubtitle:
      "Erase backgrounds from portraits, selfies, and product shots in your browser — no upload, no account, no platform lock-in. On-device AI exports transparent or solid-color PNGs without sending personal photos to a server.",
    primaryCta: "Erase Background — Free",
    ctaNote: "No upload · No server · PNG export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Social-ready cut-outs without platform upload",
      body: "Background Remover erases backgrounds on a client-side canvas using on-device AI — not a social app's cloud eraser that receives your photo first. Export transparent PNG for stories and posts, or solid-color fills for clean thumbnails. It does not include direct publishing to social platforms, aspect-ratio presets per network, filters, or batch processing.",
    },
    benefitsHeading: "Why use a background eraser for social media photos in the browser?",
    benefitsIntro:
      "In-app erasers route personal photos through platform servers. Pix-8 erases locally — the practical fit when you need a ",
    benefitsKeyword: "background eraser for social media photos",
    benefitsIntroAfter:
      " that exports a portable PNG without uploading selfies, portraits, or client content to the cloud.",
    benefits: [
      {
        title: "Personal photo privacy",
        body: "Segmentation runs in the browser. Selfies, portraits, and client-facing shots stay on your device — not on a social platform's processing servers.",
      },
      {
        title: "Transparent PNG for posts",
        body: "Export alpha cut-outs to layer on feed graphics, stories, thumbnails, and profile assets in any editor or scheduler.",
      },
      {
        title: "Platform-agnostic export",
        body: "Download or copy PNG and use across networks — no lock-in to one app's built-in eraser or export limits.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Background Remover",
        body: "Navigate to Pix-8 in your browser — erase social photo backgrounds with no install, no account, and no upload step.",
      },
      {
        title: "Load and erase",
        body: "Select a social photo, run on-device AI segmentation, and preview the cut-out on transparent or solid background.",
      },
      {
        title: "Export for your post",
        body: "Download or copy PNG and import into your design tool or social workflow — privately processed on your device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to erase backgrounds for social posts?",
      body: "Open Background Remover, load your photo, and export a cut-out PNG — privately, entirely on your device.",
      button: "Open Background Remover",
    },
  },
  "professional-background-removal-for-photographers": {
    eyebrow: "Photography · Client-side · No upload",
    titleMain: "Professional Background Removal for Photographers",
    titleAccent: "Private Client Cut-Outs",
    heroSubtitle:
      "Remove backgrounds from portraits and studio frames in your browser — no upload, no account, no cloud queue. On-device AI segments subjects and exports transparent or solid-color PNGs without sending client files to a server.",
    primaryCta: "Remove Background — Free",
    ctaNote: "No upload · No server · PNG export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "A fast cut-out pass — not a full retouching suite",
      body: "Background Remover delivers AI subject segmentation on a client-side canvas — a quick isolation step before you composite in your editor. Export transparent PNG or solid fills, then download or copy. It does not replace pen-tool masking, refine-edge brushes, batch tethering, PSD layers, or studio tether integrations.",
    },
    benefitsHeading: "Why photographers use client-side background removal",
    benefitsIntro:
      "Cloud removers expose unreleased client imagery on remote servers. Pix-8 processes locally — the practical first step for ",
    benefitsKeyword: "professional background removal for photographers",
    benefitsIntroAfter:
      " who need fast cut-outs without compromising shoot confidentiality.",
    benefits: [
      {
        title: "Client file confidentiality",
        body: "Segmentation runs in the browser. Portraits, headshots, and unreleased client frames stay on your device — not on a cloud processing queue.",
      },
      {
        title: "Transparent PNG for compositing",
        body: "Export alpha cut-outs ready to layer in composites, mockups, and presentation proofs before full retouching.",
      },
      {
        title: "EXIF control before delivery",
        body: "Optional metadata stripping on export — useful when sharing proofs without embedding camera or location data.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Background Remover",
        body: "Navigate to Pix-8 in your browser — no install, no account, and no client file upload step.",
      },
      {
        title: "Segment the subject",
        body: "Load a portrait or studio frame, run on-device AI segmentation, and preview the cut-out on transparent or solid background.",
      },
      {
        title: "Export to your workflow",
        body: "Download or copy PNG and import into your editing or compositing tool — privately processed on your device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for private background removal on client shots?",
      body: "Open Background Remover, load a frame, and export a cut-out PNG — privately, entirely on your device.",
      button: "Open Background Remover",
    },
  },
  "client-side-background-remover": {
    eyebrow: "On-device · No upload · Client-side",
    titleMain: "Client-Side Background Remover",
    titleAccent: "Private On-Device Cut-Outs",
    heroSubtitle:
      "Remove image backgrounds entirely on your device — no upload, no account, no cloud queue. On-device AI segments subjects and exports transparent or solid-color PNGs without sending your file to a server.",
    primaryCta: "Remove Background — Free",
    ctaNote: "No upload · No server · PNG export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Client-side segmentation — not a cloud processing pipeline",
      body: "Background Remover runs in your browser tab — your file never leaves the machine. AI subject segmentation produces a cut-out on transparent or solid background, then you download or copy PNG. It does not include manual edge brushes, batch queues, or server-side model inference.",
    },
    benefitsHeading: "Why choose a client-side background remover?",
    benefitsIntro:
      "Cloud removers copy your image to a remote server before segmentation starts. Pix-8 processes on-device — the defining advantage of a ",
    benefitsKeyword: "client-side background remover",
    benefitsIntroAfter:
      " that keeps cut-outs local, fast, and private.",
    benefits: [
      {
        title: "Zero server exposure",
        body: "Segmentation runs in the browser. Your image is read locally and is never transmitted to Pix-8 or any third-party server.",
      },
      {
        title: "No upload latency",
        body: "Skip the cloud queue. Load a file, run on-device AI segmentation, and export PNG in seconds — no round-trip before the first pixel is processed.",
      },
      {
        title: "Privacy by architecture",
        body: "Client-side processing is how the tool works — not a toggle. Optional EXIF stripping on export adds another layer of control before you share the result.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Background Remover",
        body: "Navigate to Pix-8 in your browser — no install, no account, and no upload step.",
      },
      {
        title: "Segment on-device",
        body: "Load your image locally, run AI subject segmentation in the browser tab, and preview the cut-out on transparent or solid background.",
      },
      {
        title: "Export without upload",
        body: "Download or copy PNG — privately processed on your device, ready for your design tool or compositing workflow.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to remove backgrounds without uploading?",
      body: "Open Background Remover, load an image, and export a cut-out PNG — entirely on your device.",
      button: "Open Background Remover",
    },
  },
  "browser-based-background-eraser": {
    eyebrow: "In-browser · No install · Client-side",
    titleMain: "Browser-Based Background Eraser",
    titleAccent: "Private Cut-Outs in Your Tab",
    heroSubtitle:
      "Erase image backgrounds in your browser — no install, no account, no cloud upload. On-device AI segments subjects and exports transparent or solid-color PNGs without leaving your browser tab.",
    primaryCta: "Erase Background — Free",
    ctaNote: "No install · No upload · PNG export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Browser-based erasing — not a desktop install or cloud API",
      body: "Background Remover runs in your browser tab on a client-side canvas — no app download, no extension permissions, and no server upload before segmentation. AI subject detection erases the surrounding area and exports transparent or solid-color PNG. It does not include freehand eraser brushes, manual edge refinement, or batch queues.",
    },
    benefitsHeading: "Why use a browser-based background eraser?",
    benefitsIntro:
      "Desktop erasers need installs; cloud tools upload first. Pix-8 erases in the tab — the practical path when you need a ",
    benefitsKeyword: "browser-based background eraser",
    benefitsIntroAfter:
      " that works on any machine without routing files through a remote server.",
    benefits: [
      {
        title: "No install required",
        body: "Open a browser tab and start erasing — no desktop app, no extension, and no account setup before your first cut-out.",
      },
      {
        title: "Client-side segmentation",
        body: "AI runs on-device in the browser. Your image is read locally and never transmitted to Pix-8 or any third-party server.",
      },
      {
        title: "Instant PNG export",
        body: "Download or copy a transparent or solid-color PNG — ready for slides, listings, or compositing, with optional EXIF stripping.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open in your browser",
        body: "Navigate to Pix-8 Background Remover — erase backgrounds with no install, no account, and no upload dialog.",
      },
      {
        title: "Load and segment",
        body: "Select an image, run on-device AI segmentation to erase the background, and preview the cut-out on transparent or solid fill.",
      },
      {
        title: "Export from the tab",
        body: "Download or copy PNG to your clipboard — privately processed on your device, ready for your next tool.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to erase backgrounds in your browser?",
      body: "Open Background Remover in a tab, load your image, and export a cut-out PNG — no install, entirely on your device.",
      button: "Open Background Remover",
    },
  },
  "no-upload-image-background-remover": {
    eyebrow: "No upload · Client-side · On-device",
    titleMain: "No-Upload Image Background Remover",
    titleAccent: "Your File Never Leaves Your Device",
    heroSubtitle:
      "Remove image backgrounds without uploading — no cloud queue, no server transfer, no account. On-device AI segments subjects and exports transparent or solid-color PNGs while your file stays local throughout.",
    primaryCta: "Remove Background — Free",
    ctaNote: "No upload · No server · PNG export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "No-upload removal — not a cloud API with a privacy toggle",
      body: "Background Remover never routes your file through a remote server — segmentation runs on a client-side canvas in your browser. AI isolates the subject and exports transparent or solid-color PNG, then you download or copy. It does not include manual edge brushes, batch queues, or server-side model inference.",
    },
    benefitsHeading: "Why choose a no-upload image background remover?",
    benefitsIntro:
      "Upload-first removers expose every file before you see a cut-out. Pix-8 skips that step entirely — the direct answer when you need a ",
    benefitsKeyword: "no-upload image background remover",
    benefitsIntroAfter:
      " that processes portraits, products, and confidential assets without a cloud transfer.",
    benefits: [
      {
        title: "Zero upload step",
        body: "Load an image from your device and segment immediately — no drag-to-cloud dialog, no server queue, and no third-party storage.",
      },
      {
        title: "Local file handling only",
        body: "Your image is read via the browser File API and processed on-device. Pix-8 does not receive, store, or analyze your source file on any server.",
      },
      {
        title: "Private PNG export",
        body: "Download or copy a transparent or solid-color cut-out — with optional EXIF stripping before you share the result.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Background Remover",
        body: "Navigate to Pix-8 in your browser — remove backgrounds with no account and no upload step.",
      },
      {
        title: "Load locally",
        body: "Select an image from your device. The file stays on your machine while on-device AI segments the subject.",
      },
      {
        title: "Export without uploading",
        body: "Download or copy PNG — transparent or solid fill — privately processed, never transmitted to a server.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to remove backgrounds without uploading?",
      body: "Open Background Remover, load an image locally, and export a cut-out PNG — your file never leaves your device.",
      button: "Open Background Remover",
    },
  },
  "privacy-first-background-removal-tool": {
    eyebrow: "Privacy by design · Client-side · No upload",
    titleMain: "Privacy-First Background Removal Tool",
    titleAccent: "Local Cut-Outs, Zero Server Exposure",
    heroSubtitle:
      "Remove image backgrounds without sending a single byte to a server — on-device AI segments subjects and exports transparent or solid-color PNGs while your file stays on your device throughout.",
    primaryCta: "Remove Background — Free",
    ctaNote: "No upload · No server · PNG export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Privacy by architecture — not a cloud API with a privacy toggle",
      body: "Background Remover never routes your file through a remote server — segmentation runs on a client-side canvas in your browser. AI isolates the subject and exports transparent or solid-color PNG, then you download or copy. It does not include manual edge brushes, batch queues, or server-side model inference.",
    },
    benefitsHeading: "Why privacy-first teams choose local background removal",
    benefitsIntro:
      "Most online removers upload your image before any pixel is processed. Pix-8 keeps every step on-device — the defining advantage of a ",
    benefitsKeyword: "privacy-first background removal tool",
    benefitsIntroAfter:
      " that protects confidential portraits, product shots, and unreleased assets.",
    benefits: [
      {
        title: "No file leaves your device",
        body: "Your image is read locally via the browser File API. Pix-8 does not receive, store, or process the source file on any server.",
      },
      {
        title: "Segmentation without cloud latency",
        body: "Run on-device AI segmentation and export PNG in seconds — no upload queue before your first cut-out preview.",
      },
      {
        title: "Safe for sensitive imagery",
        body: "Ideal for client portraits, unreleased product shots, and regulated workflows where uploading images to a third party is not an option. Optional EXIF stripping on export.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Background Remover",
        body: "Navigate to Pix-8 in your browser — remove backgrounds with no account and no server transfer.",
      },
      {
        title: "Segment on-device",
        body: "Load an image locally, run AI subject segmentation in the browser, and preview the cut-out on transparent or solid background.",
      },
      {
        title: "Export privately",
        body: "Download or copy PNG — optionally strip EXIF metadata before sharing the result, not your source file.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for privacy-first background removal?",
      body: "Open Background Remover, load an image, and export a cut-out PNG — privately, entirely on your device.",
      button: "Open Background Remover",
    },
  },
};
