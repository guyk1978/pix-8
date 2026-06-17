import type {
  MagnifierLandingChrome,
  MagnifierLandingDisplayFields,
} from "@/lib/magnifierLandingTypes";
import type { MagnifierLandingId } from "@/lib/magnifierLandings";

export const MAGNIFIER_LANDING_CHROME_EN: MagnifierLandingChrome = {
  privacyNote:
    "Client-side processing only — your image never leaves the browser.",
  relatedUseCasesHeading: "Related use cases",
  guidesHeading: "Guides",
  toolCardTitle: "Image Magnifier tool",
  toolCardExcerpt:
    "Open the workspace — zoom, pan, and sharpen locally in seconds.",
};

export const MAGNIFIER_LANDING_DISPLAY_EN: Record<
  MagnifierLandingId,
  Omit<MagnifierLandingDisplayFields, "capabilities">
> = {
  "free-image-magnifier": {
    eyebrow: "Free · Client-side · No upload",
    titleMain: "Free image magnifier",
    titleAccent: "32× zoom in the browser",
    heroSubtitle:
      "Use a free image magnifier in your browser — no upload, no account, no paywall. Load an image locally, scroll to zoom up to 32×, drag to pan across the canvas, and optionally sharpen the preview — all processed on-device without sending your file to a server.",
    primaryCta: "Magnify images — Free",
    ctaNote: "No cost · No server · On-device canvas",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Free magnification — not a freemium cloud editor",
      body: "Pix-8 Image Magnifier is free to open and use in the browser, and it processes your image on a client-side canvas — not a remote service with upload quotas or watermarked exports. Zoom up to 32×, pan with drag controls, track your viewport with the mini-map, and optionally sharpen the preview. It does not crop, resize, add pin labels, or batch-process folders.",
    },
    benefitsHeading: "Why use a free image magnifier in the browser?",
    benefitsIntro:
      "Freemium zoom tools often gate magnification behind accounts or route files through paid cloud tiers. Pix-8 is free and local — the practical fit when you need a ",
    benefitsKeyword: "free image magnifier",
    benefitsIntroAfter:
      " for screenshots, product photos, and documents without subscriptions or server uploads.",
    benefits: [
      {
        title: "No cost, no account",
        body: "Open the tool and magnify immediately. No subscription, no credit card, and no sign-up step before you zoom.",
      },
      {
        title: "Client-side by default",
        body: "Your image is read from your device and rendered on a local canvas. Pix-8 never receives your pixel data during zoom, pan, sharpening, or export.",
      },
      {
        title: "Full inspection controls",
        body: "Mouse-wheel zoom up to 32×, drag-to-pan, mini-map navigation, optional sharpening, and export of the current magnified view — all included.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Magnifier",
        body: "Navigate to Pix-8 Image Magnifier in your browser — free, no install, and no upload dialog before you start.",
      },
      {
        title: "Load and magnify locally",
        body: "Choose an image from your device. Scroll to zoom up to 32× and drag to pan. All rendering runs in your browser tab on a client-side canvas.",
      },
      {
        title: "Refine and export",
        body: "Optionally apply sharpening, compare with the original, then download or copy the current magnified view — still free, still on-device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to magnify images for free?",
      body: "Open Image Magnifier, load a local file, and inspect fine detail — at no cost, entirely on-device.",
      button: "Open Image Magnifier",
    },
  },
  "photo-zoom-tool": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Photo zoom tool",
    titleAccent: "32× magnification in the browser",
    heroSubtitle:
      "Use a free photo zoom tool in your browser — no upload, no account, no cloud queue. Load a photo locally, scroll to magnify up to 32×, drag to pan across the canvas, and inspect fine detail without sending your file to a server.",
    primaryCta: "Zoom photos — Free",
    ctaNote: "No upload · No server · On-device canvas",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Wheel zoom and pan — not a cloud photo viewer",
      body: "Pix-8 Image Magnifier decodes your photo on a client-side canvas in the browser — not a remote viewer that ingests files first. Scroll to zoom up to 32×, drag to pan when magnified, and use the mini-map to track your viewport. Optional sharpening refines edge clarity on the preview only. It does not crop frames, resize dimensions, or add annotation labels.",
    },
    benefitsHeading: "Why use a photo zoom tool in the browser?",
    benefitsIntro:
      "Cloud zoom viewers route every file through a remote server before you can inspect a single pixel. Pix-8 processes locally — the practical fit when you need a ",
    benefitsKeyword: "photo zoom tool",
    benefitsIntroAfter:
      " for product labels, screenshots, and fine print without moving sensitive images off-device.",
    benefits: [
      {
        title: "Client-side by default",
        body: "Your photo is read from your device and rendered on a local canvas. Pix-8 never receives your pixel data during zoom, pan, or export.",
      },
      {
        title: "Precise zoom controls",
        body: "Mouse-wheel magnification up to 32× with drag-to-pan navigation and a mini-map viewport indicator for large images.",
      },
      {
        title: "Preview-only sharpening",
        body: "Optional non-destructive sharpening helps recover edge clarity on the preview. The original file on disk is never modified.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Magnifier",
        body: "Navigate to Pix-8 Image Magnifier in your browser — no install, no account, and no upload step before you zoom.",
      },
      {
        title: "Load and zoom locally",
        body: "Open your photo from the device. Scroll to magnify up to 32× and drag to pan across the canvas. All rendering runs in your browser tab.",
      },
      {
        title: "Refine and export",
        body: "Optionally apply sharpening, compare with the original, then download or copy the current magnified view from your device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to zoom photos without uploading?",
      body: "Open Image Magnifier, load your first photo, and inspect fine detail — privately, entirely on-device.",
      button: "Open Image Magnifier",
    },
  },
  "inspect-image-details-online": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Inspect image details online",
    titleAccent: "Close-up clarity on-device",
    heroSubtitle:
      "Inspect image details online in your browser — no upload, no account, no cloud queue. Load a file locally, zoom up to 32× with mouse-wheel control, pan across the canvas, and apply optional sharpening to recover edge clarity — all without sending your image to a server.",
    primaryCta: "Inspect details — Free",
    ctaNote: "No upload · No server · Local canvas",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Magnification for inspection — not cloud analysis",
      body: "Pix-8 Image Magnifier renders your image on a client-side canvas in the browser — not a remote service that ingests files first. Zoom up to 32×, drag to pan, use the mini-map to stay oriented, and toggle sharpening to clarify edges on the preview. It is built for reading fine detail, not for adding pin labels, cropping frames, or resizing dimensions.",
    },
    benefitsHeading: "Why inspect image details online in the browser?",
    benefitsIntro:
      "Cloud inspection tools often require uploading sensitive screenshots, product photos, or documents before you can zoom in. Pix-8 keeps every operation local — the direct fit when you need to ",
    benefitsKeyword: "inspect image details online",
    benefitsIntroAfter:
      " without routing confidential assets through a remote server.",
    benefits: [
      {
        title: "Private, on-device rendering",
        body: "Your image is decoded and displayed on a local HTML5 canvas. Pix-8 never receives your pixel data during zoom, pan, sharpening, or export.",
      },
      {
        title: "Detail-oriented navigation",
        body: "Mouse-wheel zoom up to 32×, drag-to-pan, and a mini-map viewport indicator help you sweep across large or high-resolution images methodically.",
      },
      {
        title: "Sharpening without rewriting the file",
        body: "Optional non-destructive sharpening clarifies edges on the preview canvas. The original file on disk remains untouched.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Magnifier",
        body: "Navigate to Pix-8 Image Magnifier in your browser — no install, no account, and no upload dialog before inspection begins.",
      },
      {
        title: "Zoom and pan locally",
        body: "Load your image from the device. Scroll to magnify up to 32× and drag to pan across areas that need closer review. All rendering stays in your browser tab.",
      },
      {
        title: "Refine and capture the view",
        body: "Enable sharpening if edges need extra clarity, compare against the original, then download or copy the current magnified view from your device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to inspect image details without uploading?",
      body: "Open Image Magnifier, load a local file, and examine the pixels that matter — privately, entirely on-device.",
      button: "Open Image Magnifier",
    },
  },
  "high-resolution-image-inspector": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "High-resolution image inspector",
    titleAccent: "Navigate large files on-device",
    heroSubtitle:
      "Inspect high-resolution images in your browser — no upload, no account, no cloud queue. Load a large file locally, zoom up to 32× with mouse-wheel control, pan across the full canvas with the mini-map viewport indicator, and optionally sharpen the preview — all without sending your image to a server.",
    primaryCta: "Inspect hi-res images — Free",
    ctaNote: "No upload · No server · Local canvas",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Inspection at native resolution — not cloud upscaling",
      body: "Pix-8 Image Magnifier renders your high-resolution file on a client-side canvas in the browser — not a remote service that ingests large uploads first. Zoom up to 32×, drag to pan across wide or tall images, and use the mini-map to track your viewport. Optional sharpening clarifies edges on the preview only. It does not upscale megapixels, crop frames, or add pin-style annotation labels.",
    },
    benefitsHeading: "Why inspect high-resolution images in the browser?",
    benefitsIntro:
      "Cloud viewers often require uploading multi-megabyte files before you can zoom in. Pix-8 processes locally — the direct fit when you need a ",
    benefitsKeyword: "high-resolution image inspector",
    benefitsIntroAfter:
      " for product photography, scans, and large screenshots without routing heavy files through a remote server.",
    benefits: [
      {
        title: "Large files stay on-device",
        body: "Your high-resolution image is decoded and displayed on a local HTML5 canvas. Pix-8 never receives your pixel data during zoom, pan, sharpening, or export.",
      },
      {
        title: "Orientation on big canvases",
        body: "Mouse-wheel zoom up to 32×, drag-to-pan, and a mini-map viewport indicator help you navigate wide, tall, or multi-megapixel images methodically.",
      },
      {
        title: "Preview sharpening, file unchanged",
        body: "Optional non-destructive sharpening recovers edge clarity on the preview. The original high-resolution file on disk is never modified or upscaled.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Magnifier",
        body: "Navigate to Pix-8 Image Magnifier in your browser — no install, no account, and no upload dialog before inspection begins.",
      },
      {
        title: "Load and navigate locally",
        body: "Open your high-resolution file from the device. Scroll to zoom up to 32×, drag to pan, and use the mini-map to track position across the full image. All rendering stays in your browser tab.",
      },
      {
        title: "Refine and export the view",
        body: "Enable sharpening if edges need extra clarity, compare against the original, then download or copy the current magnified view from your device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to inspect high-resolution images without uploading?",
      body: "Open Image Magnifier, load a large local file, and examine fine detail at full zoom — privately, entirely on-device.",
      button: "Open Image Magnifier",
    },
  },
  "pixel-perfect-image-viewer": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Pixel-perfect image viewer",
    titleAccent: "32× zoom for pixel inspection",
    heroSubtitle:
      "Use a pixel-perfect image viewer in your browser — no upload, no account, no cloud queue. Load an image locally, zoom up to 32× to inspect individual pixels and edges, drag to pan across the canvas, and optionally sharpen the preview — all rendered on-device without sending your file to a server.",
    primaryCta: "View images — Free",
    ctaNote: "No upload · No server · Local canvas",
    capabilitiesHeading: "What this viewer does",
    featureCallout: {
      title: "Magnified pixel inspection — not a cloud proofing suite",
      body: "Pix-8 Image Magnifier renders your image on a client-side canvas and lets you zoom up to 32× for close pixel-level review — not a remote viewer with upload quotas or design-handoff overlays. Drag to pan, track position with the mini-map, and optionally sharpen edges on the preview. It does not include measurement rulers, ICC color proofing, vector guides, or pin-style annotation labels.",
    },
    benefitsHeading: "Why use a pixel-perfect image viewer in the browser?",
    benefitsIntro:
      "Cloud viewers often compress previews or require uploads before you can inspect at magnification. Pix-8 renders locally — the practical fit when you need a ",
    benefitsKeyword: "pixel-perfect image viewer",
    benefitsIntroAfter:
      " for UI screenshots, compression checks, and edge clarity review without routing files through a remote server.",
    benefits: [
      {
        title: "Native canvas rendering",
        body: "Your image is decoded and displayed on a local HTML5 canvas at its source resolution, then magnified on-device. Pix-8 never receives your pixel data.",
      },
      {
        title: "Precise zoom and pan",
        body: "Mouse-wheel magnification up to 32× with drag-to-pan lets you sweep across the canvas and examine pixels, edges, and artifacts at close range.",
      },
      {
        title: "Preview sharpening included",
        body: "Optional non-destructive sharpening recovers edge clarity on the preview. The original file on disk is never modified or upscaled.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Magnifier",
        body: "Navigate to Pix-8 Image Magnifier in your browser — no install, no account, and no upload step before viewing.",
      },
      {
        title: "Zoom to pixel level",
        body: "Load your image from the device. Scroll to magnify up to 32× and drag to pan across the canvas. Use the mini-map to stay oriented on large images.",
      },
      {
        title: "Refine and export",
        body: "Toggle sharpening if edges need extra clarity, compare with the original, then download or copy the current magnified view from your device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for pixel-level inspection without uploading?",
      body: "Open Image Magnifier, load a local file, and examine pixels at full zoom — privately, entirely on-device.",
      button: "Open Image Magnifier",
    },
  },
  "examine-photo-details-online": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Examine photo details online",
    titleAccent: "Close-up review on-device",
    heroSubtitle:
      "Examine photo details online in your browser — no upload, no account, no cloud queue. Load a photo locally, zoom up to 32× with mouse-wheel control, pan across the canvas, and optionally sharpen the preview to recover edge clarity — all without sending your file to a server.",
    primaryCta: "Examine photos — Free",
    ctaNote: "No upload · No server · Local canvas",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Photo examination at magnification — not a cloud editor",
      body: "Pix-8 Image Magnifier renders your photo on a client-side canvas in the browser — not a remote service that ingests files first. Zoom up to 32×, drag to pan, use the mini-map to track your viewport, and optionally sharpen edges on the preview. It is built for reading fine detail in photos, not for cropping, resizing, or adding pin-style annotation labels.",
    },
    benefitsHeading: "Why examine photo details online in the browser?",
    benefitsIntro:
      "Cloud photo viewers often require uploads before you can zoom into labels, textures, or compression artifacts. Pix-8 processes locally — the direct fit when you need to ",
    benefitsKeyword: "examine photo details online",
    benefitsIntroAfter:
      " for product shots, portraits, and screenshots without routing sensitive files through a remote server.",
    benefits: [
      {
        title: "Photos stay on-device",
        body: "Your photo is decoded and displayed on a local HTML5 canvas. Pix-8 never receives your pixel data during zoom, pan, sharpening, or export.",
      },
      {
        title: "Detail-focused navigation",
        body: "Mouse-wheel zoom up to 32×, drag-to-pan, and a mini-map viewport indicator help you sweep across the photo methodically.",
      },
      {
        title: "Preview sharpening included",
        body: "Optional non-destructive sharpening clarifies edges on the preview canvas. The original photo on disk is never modified.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Magnifier",
        body: "Navigate to Pix-8 Image Magnifier in your browser — no install, no account, and no upload dialog before examination begins.",
      },
      {
        title: "Load and examine locally",
        body: "Open your photo from the device. Scroll to magnify up to 32× and drag to pan across areas that need closer review. All rendering stays in your browser tab.",
      },
      {
        title: "Refine and export",
        body: "Enable sharpening if edges need extra clarity, compare against the original, then download or copy the current magnified view from your device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to examine photo details without uploading?",
      body: "Open Image Magnifier, load a local photo, and review fine detail at full zoom — privately, entirely on-device.",
      button: "Open Image Magnifier",
    },
  },
  "magnify-image-for-design-review": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Magnify image for design review",
    titleAccent: "Pixel-level review on-device",
    heroSubtitle:
      "Magnify images for design review in your browser — no upload, no account, no cloud queue. Load a mockup or export locally, zoom up to 32× to check spacing and edge clarity, pan across the canvas, and optionally sharpen the preview — all without sending confidential work-in-progress files to a server.",
    primaryCta: "Review designs — Free",
    ctaNote: "No upload · No server · Local canvas",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Magnified design inspection — not a collaborative review platform",
      body: "Pix-8 Image Magnifier renders your design export on a client-side canvas and lets you zoom up to 32× for close review — not a cloud proofing suite with comment threads or version diffs. Drag to pan, track position with the mini-map, and optionally sharpen edges on the preview. It does not add pin-style feedback labels, measurement overlays, or real-time team annotations.",
    },
    benefitsHeading: "Why magnify images for design review in the browser?",
    benefitsIntro:
      "Cloud review tools often require uploading WIP mockups before you can zoom into spacing or compression artifacts. Pix-8 processes locally — the practical fit when you need to ",
    benefitsKeyword: "magnify images for design review",
    benefitsIntroAfter:
      " on UI exports, marketing comps, and screenshot handoffs without routing confidential assets through a remote server.",
    benefits: [
      {
        title: "Confidential files stay local",
        body: "Your design export is decoded and displayed on a local HTML5 canvas. Pix-8 never receives your pixel data during zoom, pan, sharpening, or export.",
      },
      {
        title: "Spacing and edge review at zoom",
        body: "Mouse-wheel magnification up to 32× with drag-to-pan helps you verify typography, icon edges, and compression artifacts before sign-off.",
      },
      {
        title: "Sharpening on the preview only",
        body: "Optional non-destructive sharpening clarifies edges on the preview canvas. The original design file on disk is never modified.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Magnifier",
        body: "Navigate to Pix-8 Image Magnifier in your browser — no install, no account, and no upload step before review begins.",
      },
      {
        title: "Load and magnify locally",
        body: "Open your mockup or export from the device. Scroll to zoom up to 32× and drag to pan across UI regions that need closer inspection. All rendering stays in your browser tab.",
      },
      {
        title: "Refine or hand off feedback",
        body: "Toggle sharpening if edges need extra clarity, compare with the original, then export the magnified view — or switch to Image Annotator if you need labeled callouts on specific areas.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to magnify designs for review without uploading?",
      body: "Open Image Magnifier, load a local export, and inspect spacing and edges at full zoom — privately, entirely on-device.",
      button: "Open Image Magnifier",
    },
  },
  "client-side-image-magnifier": {
    eyebrow: "Client-side · No upload · On-device",
    titleMain: "Client-side image magnifier",
    titleAccent: "Magnification without a server",
    heroSubtitle:
      "Use a client-side image magnifier in your browser — no upload queue, no remote processing, no pixel data leaving your device. Load an image locally, scroll to zoom up to 32× on a browser canvas, drag to pan, and optionally sharpen the preview — all handled on-device by Pix-8 Image Magnifier.",
    primaryCta: "Magnify on-device — Free",
    ctaNote: "No server · Local canvas · Private by design",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Browser-native magnification — not a cloud upload pipeline",
      body: "Pix-8 Image Magnifier decodes your file and renders zoom on a client-side canvas in your browser tab — not a remote service that ingests uploads first. Scroll to magnify up to 32×, drag to pan, track position with the mini-map, and optionally sharpen edges on the preview. It does not crop, resize, upscale megapixels, add pin labels, or batch-process folders.",
    },
    benefitsHeading: "Why use a client-side image magnifier?",
    benefitsIntro:
      "Cloud magnifiers route every file through a remote server before you can inspect a single pixel. Pix-8 keeps the pipeline local — the direct fit when you need a ",
    benefitsKeyword: "client-side image magnifier",
    benefitsIntroAfter:
      " for screenshots, product photos, and sensitive documents without transmitting pixel data off your device.",
    benefits: [
      {
        title: "Pixel data stays on your device",
        body: "Your image is read from local storage and rendered on an HTML5 canvas in the browser. Pix-8 never receives your file during zoom, pan, sharpening, or export.",
      },
      {
        title: "No upload step before zoom",
        body: "Open the tool, choose a file, and magnify immediately. There is no server queue, no account gate, and no cloud storage dependency.",
      },
      {
        title: "Full local inspection controls",
        body: "Mouse-wheel zoom up to 32×, drag-to-pan, mini-map navigation, optional non-destructive sharpening, compare-original toggle, and export of the current view — all client-side.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Magnifier",
        body: "Navigate to Pix-8 Image Magnifier in your browser — no install required, and no upload dialog before magnification begins.",
      },
      {
        title: "Load and render locally",
        body: "Choose an image from your device. The browser decodes it onto a client-side canvas. Scroll to zoom up to 32× and drag to pan — all rendering stays in your tab.",
      },
      {
        title: "Refine and export on-device",
        body: "Optionally apply sharpening, compare with the original, then download or copy the magnified view. Processing never leaves your browser.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to magnify images client-side?",
      body: "Open Image Magnifier, load a local file, and inspect detail at full zoom — privately, entirely in your browser.",
      button: "Open Image Magnifier",
    },
  },
  "privacy-first-photo-zoom-tool": {
    eyebrow: "Private · Client-side · No upload",
    titleMain: "Privacy-first photo zoom tool",
    titleAccent: "Zoom without sending photos away",
    heroSubtitle:
      "Use a privacy-first photo zoom tool in your browser — no upload, no account, no remote storage. Load a photo locally, scroll to magnify up to 32× on a client-side canvas, drag to pan, and optionally sharpen the preview — your pixel data never leaves your device.",
    primaryCta: "Zoom privately — Free",
    ctaNote: "No upload · No server · On-device only",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Private photo zoom — not a cloud gallery viewer",
      body: "Pix-8 Image Magnifier decodes your photo on a client-side canvas in the browser — not a remote service that ingests uploads first. Scroll to zoom up to 32×, drag to pan, track your viewport with the mini-map, and optionally sharpen edges on the preview. It does not sync to cloud albums, crop frames, resize dimensions, add pin labels, or batch-process folders.",
    },
    benefitsHeading: "Why use a privacy-first photo zoom tool?",
    benefitsIntro:
      "Cloud photo viewers often require uploading portraits, documents, or product shots before you can zoom. Pix-8 keeps every step local — the practical fit when you need a ",
    benefitsKeyword: "privacy-first photo zoom tool",
    benefitsIntroAfter:
      " for sensitive images without transmitting pixel data to a remote server.",
    benefits: [
      {
        title: "Photos stay on your device",
        body: "Your file is read from local storage and rendered on an HTML5 canvas in the browser. Pix-8 never receives your photo during zoom, pan, sharpening, or export.",
      },
      {
        title: "No account or upload gate",
        body: "Open the tool, choose a photo, and zoom immediately. There is no sign-in step, no server queue, and no cloud dependency before magnification.",
      },
      {
        title: "Full zoom controls, locally",
        body: "Mouse-wheel magnification up to 32×, drag-to-pan, mini-map navigation, optional non-destructive sharpening, compare-original toggle, and export of the current view — all on-device.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Magnifier",
        body: "Navigate to Pix-8 Image Magnifier in your browser — no install, no account, and no upload dialog before you zoom.",
      },
      {
        title: "Load and zoom privately",
        body: "Open your photo from the device. Scroll to magnify up to 32× and drag to pan. All rendering runs in your browser tab on a client-side canvas.",
      },
      {
        title: "Refine and export on-device",
        body: "Optionally apply sharpening, compare with the original, then download or copy the magnified view — still private, still on your device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to zoom photos without uploading?",
      body: "Open Image Magnifier, load a local photo, and inspect fine detail — privately, entirely on-device.",
      button: "Open Image Magnifier",
    },
  },
  "no-upload-image-inspector": {
    eyebrow: "No upload · Client-side · On-device",
    titleMain: "No-upload image inspector",
    titleAccent: "Inspect locally, never upload",
    heroSubtitle:
      "Use a no-upload image inspector in your browser — no server queue, no cloud storage, no file transfer before inspection begins. Load an image locally, scroll to zoom up to 32×, drag to pan across the canvas, and optionally sharpen the preview — all processed on-device without sending your file away.",
    primaryCta: "Inspect images — Free",
    ctaNote: "No upload · No server · Local canvas",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Local image inspection — not a cloud upload inspector",
      body: "Pix-8 Image Magnifier decodes your file on a client-side canvas in the browser — not a remote inspector that ingests uploads first. Scroll to zoom up to 32×, drag to pan, track your viewport with the mini-map, and optionally sharpen edges on the preview. It does not crop, resize, upscale megapixels, add pin labels, or batch-process folders.",
    },
    benefitsHeading: "Why use a no-upload image inspector?",
    benefitsIntro:
      "Cloud image inspectors often require uploading screenshots, documents, or product photos before you can zoom into detail. Pix-8 skips the upload entirely — the practical fit when you need a ",
    benefitsKeyword: "no-upload image inspector",
    benefitsIntroAfter:
      " for sensitive files without routing pixel data through a remote server.",
    benefits: [
      {
        title: "Zero upload before inspection",
        body: "Open the tool, choose a file, and inspect immediately. Your image is read from local storage and rendered on an HTML5 canvas — never transmitted to Pix-8.",
      },
      {
        title: "Close-up review at full zoom",
        body: "Mouse-wheel magnification up to 32× with drag-to-pan and mini-map navigation helps you verify fine print, labels, textures, and compression artifacts.",
      },
      {
        title: "Sharpening on the preview only",
        body: "Optional non-destructive sharpening clarifies edges on the preview canvas. The original file on disk is never modified.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Magnifier",
        body: "Navigate to Pix-8 Image Magnifier in your browser — no install, no account, and no upload dialog before inspection starts.",
      },
      {
        title: "Load and inspect locally",
        body: "Choose an image from your device. Scroll to zoom up to 32× and drag to pan. All rendering runs in your browser tab on a client-side canvas.",
      },
      {
        title: "Refine and export on-device",
        body: "Optionally apply sharpening, compare with the original, then download or copy the magnified view — still local, still no upload.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to inspect images without uploading?",
      body: "Open Image Magnifier, load a local file, and review fine detail at full zoom — privately, entirely on-device.",
      button: "Open Image Magnifier",
    },
  },
  "browser-magnifying-glass-for-photos": {
    eyebrow: "In-browser · Client-side · No upload",
    titleMain: "Browser-based magnifying glass for photos",
    titleAccent: "Digital zoom, no install",
    heroSubtitle:
      "Use a browser-based magnifying glass for photos — no app install, no upload, no account. Load a photo locally, scroll to magnify up to 32× on a client-side canvas, drag to pan across detail, and optionally sharpen the preview — the digital equivalent of a loupe, processed entirely in your browser.",
    primaryCta: "Magnify photos — Free",
    ctaNote: "No install · No server · On-device canvas",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Digital magnifier in the browser — not a desktop app or cloud viewer",
      body: "Pix-8 Image Magnifier renders your photo on a client-side canvas and magnifies with scroll-to-zoom up to 32× — not a native app download or remote viewer that ingests uploads first. Drag to pan, track your viewport with the mini-map, and optionally sharpen edges on the preview. It does not crop frames, resize dimensions, add pin labels, or batch-process folders.",
    },
    benefitsHeading: "Why use a browser magnifying glass for photos?",
    benefitsIntro:
      "Desktop loupe apps require installs; cloud viewers route files through remote servers before you can zoom. Pix-8 runs in the tab and processes locally — the practical fit when you need a ",
    benefitsKeyword: "browser-based magnifying glass for photos",
    benefitsIntroAfter:
      " for product shots, portraits, and screenshots without leaving the browser or uploading files.",
    benefits: [
      {
        title: "No install, no upload",
        body: "Open Image Magnifier in any modern browser, choose a local photo, and magnify immediately. Your file is rendered on-device — never transmitted to Pix-8.",
      },
      {
        title: "Loupe-style zoom up to 32×",
        body: "Mouse-wheel magnification with drag-to-pan and mini-map navigation lets you examine fine detail the way a physical magnifying glass would — digitally, on your screen.",
      },
      {
        title: "Sharpening on the preview only",
        body: "Optional non-destructive sharpening clarifies edges on the preview canvas. The original photo on disk is never modified.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Magnifier",
        body: "Navigate to Pix-8 Image Magnifier in your browser — no download, no extension, and no upload step before magnification.",
      },
      {
        title: "Load and magnify locally",
        body: "Open your photo from the device. Scroll to zoom up to 32× and drag to pan across the area you want to inspect. All rendering stays in your browser tab.",
      },
      {
        title: "Refine and export",
        body: "Optionally apply sharpening, compare with the original, then download or copy the magnified view — still in-browser, still on-device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to use a magnifying glass for photos in your browser?",
      body: "Open Image Magnifier, load a local photo, and inspect fine detail at full zoom — privately, entirely on-device.",
      button: "Open Image Magnifier",
    },
  },
  "zoom-into-photo-online": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Zoom into photo online",
    titleAccent: "32× magnification in the browser",
    heroSubtitle:
      "Zoom into photo online in your browser — no upload, no account, no cloud queue. Load a photo locally, scroll to magnify up to 32×, drag to pan across the area you want to inspect, and optionally sharpen the preview — all processed on-device without sending your file to a server.",
    primaryCta: "Zoom into photos — Free",
    ctaNote: "No upload · No server · On-device canvas",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Online photo zoom — not a cloud upload viewer",
      body: "Pix-8 Image Magnifier decodes your photo on a client-side canvas in the browser — not a remote viewer that ingests uploads first. Scroll to zoom up to 32×, drag to pan when magnified, track your viewport with the mini-map, and optionally sharpen the preview. It does not crop frames, resize dimensions, add pin labels, or batch-process folders.",
    },
    benefitsHeading: "Why zoom into photo online in the browser?",
    benefitsIntro:
      "Online zoom tools often require uploading your photo before you can magnify detail. Pix-8 processes locally — the practical fit when you need to ",
    benefitsKeyword: "zoom into photo online",
    benefitsIntroAfter:
      " for product labels, portraits, screenshots, and fine print without routing files through a remote server.",
    benefits: [
      {
        title: "Zoom without uploading",
        body: "Your photo is read from your device and rendered on a local HTML5 canvas. Pix-8 never receives your pixel data during zoom, pan, sharpening, or export.",
      },
      {
        title: "Deep zoom with pan controls",
        body: "Mouse-wheel magnification up to 32× with drag-to-pan and mini-map navigation helps you move into and across detail in large photos.",
      },
      {
        title: "Sharpening on the preview only",
        body: "Optional non-destructive sharpening clarifies edges on the preview canvas. The original photo on disk is never modified.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Magnifier",
        body: "Navigate to Pix-8 Image Magnifier in your browser — no install, no account, and no upload step before you zoom.",
      },
      {
        title: "Load and zoom into the photo",
        body: "Choose a photo from your device. Scroll to magnify up to 32× and drag to pan across the canvas. All rendering runs in your browser tab on a client-side canvas.",
      },
      {
        title: "Refine and export",
        body: "Optionally apply sharpening, compare with the original, then download or copy the current magnified view — still online in the tab, still on-device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to zoom into a photo online?",
      body: "Open Image Magnifier, load a local photo, and inspect fine detail at full zoom — privately, entirely on-device.",
      button: "Open Image Magnifier",
    },
  },
  "detailed-image-viewer-tool": {
    eyebrow: "Client-side · No upload · On-device",
    titleMain: "Detailed image viewer tool",
    titleAccent: "Close-up viewing in the browser",
    heroSubtitle:
      "Use a detailed image viewer tool in your browser — no upload, no account, no cloud gallery. Load an image locally, scroll to zoom up to 32× for close-up detail, drag to pan across the canvas, and optionally sharpen the preview — all rendered on-device without sending your file to a server.",
    primaryCta: "View images in detail — Free",
    ctaNote: "No upload · No server · Local canvas",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Magnified detail viewer — not a cloud photo gallery",
      body: "Pix-8 Image Magnifier renders your image on a client-side canvas for close-up viewing — not a remote gallery that ingests uploads or runs slideshows. Scroll to zoom up to 32×, drag to pan, track your viewport with the mini-map, and optionally sharpen edges on the preview. It does not crop, resize, add pin labels, display EXIF metadata panels, or batch-process folders.",
    },
    benefitsHeading: "Why use a detailed image viewer tool?",
    benefitsIntro:
      "Cloud viewers often require uploading files before you can study texture, compression, or fine print at magnification. Pix-8 keeps viewing local — the practical fit when you need a ",
    benefitsKeyword: "detailed image viewer tool",
    benefitsIntroAfter:
      " for product shots, documents, and screenshots without routing pixel data through a remote server.",
    benefits: [
      {
        title: "Detail viewing without upload",
        body: "Your image is read from local storage and rendered on an HTML5 canvas in the browser. Pix-8 never receives your file during zoom, pan, sharpening, or export.",
      },
      {
        title: "Zoom and pan for close inspection",
        body: "Mouse-wheel magnification up to 32× with drag-to-pan and mini-map navigation helps you study labels, textures, edges, and artifacts across large images.",
      },
      {
        title: "Sharpening on the preview only",
        body: "Optional non-destructive sharpening clarifies edges on the preview canvas. The original file on disk is never modified.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Magnifier",
        body: "Navigate to Pix-8 Image Magnifier in your browser — no install, no account, and no upload step before viewing begins.",
      },
      {
        title: "Load and view in detail",
        body: "Choose an image from your device. Scroll to zoom up to 32× and drag to pan across areas that need closer study. All rendering runs in your browser tab on a client-side canvas.",
      },
      {
        title: "Refine and export",
        body: "Optionally apply sharpening, compare with the original, then download or copy the magnified view — still on-device, still private.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to view images in detail without uploading?",
      body: "Open Image Magnifier, load a local file, and study fine detail at full zoom — privately, entirely on-device.",
      button: "Open Image Magnifier",
    },
  },
  "magnify-small-text-on-images": {
    eyebrow: "Client-side · No upload · On-device",
    titleMain: "Magnify small text on images",
    titleAccent: "Read fine print at 32× zoom",
    heroSubtitle:
      "Magnify small text on images in your browser — no upload, no account, no cloud queue. Load an image locally, scroll to zoom up to 32× on labels and fine print, drag to pan to the text region, and optionally sharpen the preview — all processed on-device without sending your file to a server.",
    primaryCta: "Magnify text — Free",
    ctaNote: "No upload · No server · Local canvas",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Text magnification — not OCR or cloud upload",
      body: "Pix-8 Image Magnifier renders your image on a client-side canvas and lets you zoom up to 32× on small text — not a remote OCR service or upload-first viewer. Drag to pan to the label or paragraph, track position with the mini-map, and optionally sharpen edges on the preview. It does not extract text, translate content, add pin labels, or batch-process folders.",
    },
    benefitsHeading: "Why magnify small text on images in the browser?",
    benefitsIntro:
      "Cloud tools often require uploading screenshots or product photos before you can enlarge fine print. Pix-8 processes locally — the practical fit when you need to ",
    benefitsKeyword: "magnify small text on images",
    benefitsIntroAfter:
      " on labels, UI screenshots, and scanned documents without routing files through a remote server.",
    benefits: [
      {
        title: "Read labels without uploading",
        body: "Your image is read from local storage and rendered on an HTML5 canvas in the browser. Pix-8 never receives your file during zoom, pan, sharpening, or export.",
      },
      {
        title: "Zoom into text regions",
        body: "Mouse-wheel magnification up to 32× with drag-to-pan helps you center on ingredient lists, serial numbers, screenshot captions, and other small text blocks.",
      },
      {
        title: "Sharpen letter edges on preview",
        body: "Optional non-destructive sharpening clarifies text edges on the preview canvas. The original image on disk is never modified.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Magnifier",
        body: "Navigate to Pix-8 Image Magnifier in your browser — no install, no account, and no upload step before you zoom.",
      },
      {
        title: "Load and zoom to the text",
        body: "Choose an image from your device. Scroll to magnify up to 32× and drag to pan until the small text fills your view. All rendering runs in your browser tab on a client-side canvas.",
      },
      {
        title: "Refine and export",
        body: "Optionally apply sharpening if letter edges need extra clarity, compare with the original, then download or copy the magnified view — still on-device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to magnify small text without uploading?",
      body: "Open Image Magnifier, load a local image, and read fine print at full zoom — privately, entirely on-device.",
      button: "Open Image Magnifier",
    },
  },
};
