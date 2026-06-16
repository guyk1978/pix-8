import type {
  CustomCutterLandingChrome,
  CustomCutterLandingDisplayFields,
} from "@/lib/customCutterLandingTypes";
import type { CustomCutterLandingId } from "@/lib/customCutterLandings";

export const CUSTOM_CUTTER_LANDING_CHROME_EN: CustomCutterLandingChrome = {
  privacyNote:
    "Client-side processing only — your image never leaves the browser.",
  relatedUseCasesHeading: "Related use cases",
  guidesHeading: "Guides",
  toolCardTitle: "Custom Cutter tool",
  toolCardExcerpt:
    "Open the workspace — draw a selection, keep or remove the region, and export transparent cutouts locally.",
};

/** Add one key per landing ID as pages are created. */
export const CUSTOM_CUTTER_LANDING_DISPLAY_EN: Record<
  CustomCutterLandingId,
  Omit<CustomCutterLandingDisplayFields, "capabilities">
> = {
  "custom-image-cutter": {
    eyebrow: "Custom cut · Client-side · No upload",
    titleMain: "Custom Image Cutter",
    titleAccent: "Keep or Remove Any Region",
    heroSubtitle:
      "Cut images with a custom selection in your browser — no upload, no account, no cloud queue. Draw a rectangular region on-device, keep or remove it, and export transparent PNG cutouts without sending your file to a server.",
    primaryCta: "Cut Custom — Free",
    ctaNote: "No upload · No server · Transparent export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Custom keep-or-remove cutting — not ratio-based cropping",
      body: "Custom Cutter reads your image locally and applies your selection on a client-side canvas — not a cloud tool that ingests your file first. Draw and resize a rectangular region, choose keep or remove, then download or copy transparent PNG output. It does not include aspect-ratio presets, social media ratios, AI auto-selection, or batch cutting.",
    },
    benefitsHeading: "Why use a custom image cutter?",
    benefitsIntro:
      "Most online cutters crop to fixed ratios or upload your file first. Pix-8 keeps cutting local — the direct fit when you need a ",
    benefitsKeyword: "custom image cutter",
    benefitsIntroAfter:
      " that isolates or removes a region with transparent output.",
    benefits: [
      {
        title: "Keep or remove selection",
        body: "Draw a rectangular region and export what is inside (keep) or outside (remove) — with transparent PNG output for cutouts.",
      },
      {
        title: "Client-side canvas processing",
        body: "Your image is read locally and cut on a canvas in your browser tab. Pix-8 does not receive your image data.",
      },
      {
        title: "Precise region control",
        body: "Drag to draw the selection, resize from corner handles, reset and redraw, then export with optional EXIF stripping.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Custom Cutter",
        body: "Navigate to Pix-8 Custom Cutter — no install, no account, and no upload dialog.",
      },
      {
        title: "Draw and choose keep or remove",
        body: "Load an image locally, drag a rectangular selection, resize as needed, then choose keep selection or remove selection. Processing runs on-device in your browser tab.",
      },
      {
        title: "Export transparent cutout",
        body: "Download or copy the result — a transparent PNG cutout processed entirely on your device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to cut a custom region without uploading?",
      body: "Open Custom Cutter, draw your selection, and export — privately, entirely on your device.",
      button: "Open Custom Cutter",
    },
  },
  "freeform-image-cropping": {
    eyebrow: "Freeform · Client-side · No upload",
    titleMain: "Freeform Image Cropping",
    titleAccent: "Draw Any Region, Export Locally",
    heroSubtitle:
      "Crop images freeform in your browser — no upload, no account, no aspect-ratio lock. Draw a rectangular selection at any size on-device, keep or remove the region, and export transparent PNG cutouts without sending your file to a server.",
    primaryCta: "Crop Freeform — Free",
    ctaNote: "No upload · No server · Transparent export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Unconstrained region cropping — not ratio-locked reframing",
      body: "Custom Cutter lets you draw a rectangular selection anywhere on the image without aspect-ratio presets — then keep or remove that region on a client-side canvas. Resize from corner handles, reset and redraw, then download or copy transparent PNG output. It does not include lasso tools, pen paths, polygon masks, AI auto-selection, or batch cropping.",
    },
    benefitsHeading: "Why use freeform image cropping?",
    benefitsIntro:
      "Preset croppers lock you to fixed ratios before you frame. Pix-8 keeps the selection flexible — the practical path when you need ",
    benefitsKeyword: "freeform image cropping",
    benefitsIntroAfter:
      " that isolates any rectangular region with transparent cutout export.",
    benefits: [
      {
        title: "Any position, any size",
        body: "Draw a rectangular selection without aspect-ratio locks — place and resize the region freely on your image before export.",
      },
      {
        title: "Keep or remove the region",
        body: "Export what is inside the selection (keep) or outside it (remove) — with transparent PNG output for cutouts.",
      },
      {
        title: "Client-side processing",
        body: "Your image is read locally and cropped on a canvas in your browser tab. Pix-8 does not receive your image data.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Custom Cutter",
        body: "Navigate to Pix-8 Custom Cutter — no install, no account, and no upload dialog.",
      },
      {
        title: "Draw your freeform region",
        body: "Load an image locally, drag a rectangular selection at any size, and resize from corner handles. Processing runs on-device in your browser tab.",
      },
      {
        title: "Keep, remove, and export",
        body: "Choose keep selection or remove selection, then download or copy the transparent PNG cutout — processed entirely on your device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to crop freeform without uploading?",
      body: "Open Custom Cutter, draw your region, and export — privately, entirely on your device.",
      button: "Open Custom Cutter",
    },
  },
  "cut-out-shapes-from-images": {
    eyebrow: "Cut out · Client-side · No upload",
    titleMain: "Cut Out Shapes From Images",
    titleAccent: "Isolate Regions With Transparent Output",
    heroSubtitle:
      "Cut shapes out of images in your browser — no upload, no account, no cloud queue. Draw a selection around any region on-device, keep or remove it, and export transparent PNG cutouts without sending your file to a server.",
    primaryCta: "Cut Out Shapes — Free",
    ctaNote: "No upload · No server · Transparent PNG",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Region cutouts with transparent export — not multi-shape vector tools",
      body: "Custom Cutter isolates rectangular regions on a client-side canvas — draw a selection around a subject or area, choose keep or remove, and export transparent PNG output. Resize from corner handles, reset and redraw as needed. It does not include circle, polygon, lasso, pen-path, or AI shape-detection tools — use Background Remover for full-image background removal.",
    },
    benefitsHeading: "Why cut out shapes from images in the browser?",
    benefitsIntro:
      "Cloud cutout tools upload your file before any region is isolated. Pix-8 processes locally — the practical path when you need to ",
    benefitsKeyword: "cut out shapes from images",
    benefitsIntroAfter:
      " with transparent output and no server round-trip.",
    benefits: [
      {
        title: "Transparent PNG cutouts",
        body: "Remove a selected region and export with a transparent background — ready for compositing, slides, or product mockups.",
      },
      {
        title: "Keep or remove any region",
        body: "Draw a rectangular selection around the shape or area you want, then export what is inside (keep) or outside (remove).",
      },
      {
        title: "Client-side processing",
        body: "Your image is read locally and processed on a canvas in your browser tab. Pix-8 does not receive your image data.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Custom Cutter",
        body: "Navigate to Pix-8 Custom Cutter — no install, no account, and no upload dialog.",
      },
      {
        title: "Select the region to cut out",
        body: "Load an image locally, drag a rectangular selection around the shape or area, and resize from corner handles. Processing runs on-device in your browser tab.",
      },
      {
        title: "Export the cutout",
        body: "Choose keep selection or remove selection, then download or copy the transparent PNG — processed entirely on your device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to cut out shapes without uploading?",
      body: "Open Custom Cutter, frame your region, and export a transparent cutout — privately, entirely on your device.",
      button: "Open Custom Cutter",
    },
  },
  "custom-shape-photo-cutter": {
    eyebrow: "Photo cut · Client-side · No upload",
    titleMain: "Custom Shape Photo Cutter",
    titleAccent: "Cut Photo Regions Locally",
    heroSubtitle:
      "Cut photos with custom regions in your browser — no upload, no account, no cloud queue. Draw a rectangular selection on any photo on-device, keep or remove the area, and export transparent PNG cutouts without sending your file to a server.",
    primaryCta: "Cut Photos — Free",
    ctaNote: "No upload · No server · Transparent PNG",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Custom photo region cutting — not preset shape templates",
      body: "Custom Cutter reads your photo locally and applies a rectangular selection on a client-side canvas — not a cloud cutter that ingests your file first. Draw and resize the region, choose keep or remove, then download or copy transparent PNG output. It does not include circle, star, polygon, lasso, or AI auto-cutout tools — use Background Remover for full-image background removal.",
    },
    benefitsHeading: "Why use a custom shape photo cutter?",
    benefitsIntro:
      "Template croppers force fixed shapes before you frame the subject. Pix-8 lets you define the region — the practical fit when you need a ",
    benefitsKeyword: "custom shape photo cutter",
    benefitsIntroAfter:
      " that isolates photo areas with transparent export and no upload.",
    benefits: [
      {
        title: "Photo-ready cutouts",
        body: "Isolate a product, portrait, or graphic element from a photo and export with a transparent background for compositing.",
      },
      {
        title: "Custom rectangular regions",
        body: "Draw and resize a selection at any position on the photo — no aspect-ratio lock, no preset shape library.",
      },
      {
        title: "Client-side processing",
        body: "Photos are read locally and cut on a canvas in your browser tab. Pix-8 does not receive your image data.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Custom Cutter",
        body: "Navigate to Pix-8 Custom Cutter — no install, no account, and no upload dialog.",
      },
      {
        title: "Frame your photo region",
        body: "Load a photo locally, drag a rectangular selection around the area to cut, and resize from corner handles. Processing runs on-device in your browser tab.",
      },
      {
        title: "Export the photo cutout",
        body: "Choose keep selection or remove selection, then download or copy the transparent PNG — processed entirely on your device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to cut photos with custom regions?",
      body: "Open Custom Cutter, load your photo, and export a transparent cutout — privately, entirely on your device.",
      button: "Open Custom Cutter",
    },
  },
  "precision-image-cutter-tool": {
    eyebrow: "Precision · Client-side · No upload",
    titleMain: "Precision Image Cutter Tool",
    titleAccent: "Pixel-Accurate Region Cutting",
    heroSubtitle:
      "Cut images precisely in your browser — no upload, no account, no cloud queue. Drag and resize your selection on-device, read width and height in pixels, and export keep-or-remove cutouts without sending your file to a server.",
    primaryCta: "Cut Precisely — Free",
    ctaNote: "No upload · No server · Pixel readout",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Precise region cutting — not ratio-locked crop reframing",
      body: "Custom Cutter shows selection width and height in pixels as you drag and resize on a client-side canvas — not a cloud cutter that ingests your file first. Position the cut area with corner handles, reset and redraw if needed, then keep or remove the region and export transparent PNG output. It does not include typed coordinate fields, ruler overlays, snap-to-grid, or AI edge detection.",
    },
    benefitsHeading: "Why use a precision image cutter tool?",
    benefitsIntro:
      "Imprecise selections waste time in compositing workflows. Pix-8 gives you handle-level control — the direct fit when you need a ",
    benefitsKeyword: "precision image cutter tool",
    benefitsIntroAfter:
      " that reads selection dimensions before you export a cutout.",
    benefits: [
      {
        title: "Pixel readout as you adjust",
        body: "See selection width and height in pixels while you drag and resize — frame your cut area before export.",
      },
      {
        title: "Corner-handle control",
        body: "Position the selection precisely, resize from handles, and reset to redraw when the first pass is not right.",
      },
      {
        title: "Client-side cutout export",
        body: "Keep or remove the defined region and download or copy transparent PNG output — processed entirely on your device.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Custom Cutter",
        body: "Navigate to Pix-8 Custom Cutter — no install, no account, and no upload dialog.",
      },
      {
        title: "Position and resize precisely",
        body: "Load an image locally, drag the selection into place, and resize from corner handles while reading pixel dimensions on screen. Processing runs on-device in your browser tab.",
      },
      {
        title: "Export the precise cutout",
        body: "Choose keep selection or remove selection, then download or copy the transparent PNG — your image was never sent to a server.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to cut images with precision?",
      body: "Open Custom Cutter, frame your selection to pixel dimensions, and export — privately, entirely on your device.",
      button: "Open Custom Cutter",
    },
  },
  "client-side-custom-image-cutter": {
    eyebrow: "Client-side · On-device · No upload",
    titleMain: "Client-Side Custom Image Cutter",
    titleAccent: "Your Browser, Your Cutouts",
    heroSubtitle:
      "Cut images client-side in your browser — no upload, no account, no cloud processing queue. Your file is read on-device, the selection is applied on a canvas in your tab, and you export keep-or-remove cutouts without sending pixels to a server.",
    primaryCta: "Cut Client-Side — Free",
    ctaNote: "No upload · No server · Browser canvas",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Custom cutting where the file already lives",
      body: "Custom Cutter reads your image locally and applies keep-or-remove selection on a client-side canvas — not a cloud pipeline that ingests your file first. Drag and resize the cut area, export transparent PNG output, then download or copy. It does not include server APIs, cloud storage, batch queues, or offline PWA guarantees beyond standard browser behavior.",
    },
    benefitsHeading: "Why use a client-side custom image cutter?",
    benefitsIntro:
      "Cloud tools route every file through a remote server before export. Pix-8 keeps cutting in the browser tab — the direct architecture when you need a ",
    benefitsKeyword: "client-side custom image cutter",
    benefitsIntroAfter:
      " that never uploads your pixels for processing.",
    benefits: [
      {
        title: "Browser canvas processing",
        body: "Images are read via the File API and cut on a canvas in your tab — no server round-trip for pixel operations.",
      },
      {
        title: "No upload workflow",
        body: "Your file stays on your device from load to export. Pix-8 does not receive your image data.",
      },
      {
        title: "Full cutout toolkit",
        body: "Draw-and-resize selection, keep or remove the region, transparent PNG export, and optional EXIF stripping before download or copy.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Custom Cutter in your browser",
        body: "Navigate to Pix-8 Custom Cutter — no install, no account, and no upload step.",
      },
      {
        title: "Load and cut on-device",
        body: "Select an image locally, draw your cut selection, and choose keep or remove. Processing runs on a client-side canvas in your browser tab.",
      },
      {
        title: "Export from your machine",
        body: "Download or copy the cutout — processed entirely client-side on your device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to cut images client-side?",
      body: "Open Custom Cutter, load your image locally, and export — entirely in your browser tab.",
      button: "Open Custom Cutter",
    },
  },
  "browser-based-custom-cropper": {
    eyebrow: "In-browser · No install · Client-side",
    titleMain: "Browser-Based Custom Cropper",
    titleAccent: "Cut Images in Your Tab",
    heroSubtitle:
      "Cut images in your browser — no install, no account, no cloud upload. Your file is read on-device, the selection is applied on a client-side canvas, and you export keep-or-remove cutouts without leaving your browser tab.",
    primaryCta: "Cut in Browser — Free",
    ctaNote: "No install · No upload · On-device export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Browser-based custom cutting — not a desktop install or cloud upload",
      body: "Custom Cutter runs in your browser tab on a client-side canvas — no app download, no extension permissions, and no server upload before cut. Draw and resize the selection, choose keep or remove, export transparent PNG output, then download or copy. It does not include AI auto-cutout, batch cutting, or cloud storage sync.",
    },
    benefitsHeading: "Why use a browser-based custom cropper?",
    benefitsIntro:
      "Desktop apps need installs; cloud tools upload first. Pix-8 cuts in the tab — the practical path when you need a ",
    benefitsKeyword: "browser-based custom cropper",
    benefitsIntroAfter:
      " that works on any machine without routing images through a remote server.",
    benefits: [
      {
        title: "No install required",
        body: "Open a browser tab and start cutting — no desktop app, no extension, and no account setup before your first export.",
      },
      {
        title: "Client-side canvas cut",
        body: "Images are read locally and cut on a canvas in your tab. Pix-8 does not receive your image data.",
      },
      {
        title: "Full cutout toolkit",
        body: "Draw-and-resize selection, keep or remove the region, transparent PNG export, and optional EXIF stripping before download or copy.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open in your browser",
        body: "Navigate to Pix-8 Custom Cutter — cut images with no install, no account, and no upload dialog.",
      },
      {
        title: "Load and cut on-device",
        body: "Select an image locally, draw your cut selection, and choose keep or remove. Processing runs on a client-side canvas in your browser tab.",
      },
      {
        title: "Export from the tab",
        body: "Download or copy the cutout — privately processed on your device, ready for sharing or upload elsewhere.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to cut images in your browser?",
      body: "Open Custom Cutter in a tab, load your image, and export — no install, entirely on your device.",
      button: "Open Custom Cutter",
    },
  },
  "no-upload-custom-shape-cutter": {
    eyebrow: "No upload · Client-side · On-device",
    titleMain: "No-Upload Custom Shape Cutter",
    titleAccent: "Cut Shapes Without Sending Your File",
    heroSubtitle:
      "Cut custom shapes without uploading in your browser — no account, no cloud queue, no server processing step. Draw a rectangular selection on-device, keep or remove the region, and export transparent PNG cutouts from your machine.",
    primaryCta: "Cut Without Upload — Free",
    ctaNote: "No upload · No server · Transparent PNG",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Custom shape cutting without an upload step",
      body: "Custom Cutter reads your image locally and applies a rectangular selection on a client-side canvas — not a cloud tool that ingests your file first. Draw and resize the region, choose keep or remove, export transparent PNG output, then download or copy. It does not include circle, star, polygon, lasso, AI auto-cutout, cloud storage, or account-based file retention.",
    },
    benefitsHeading: "Why use a no-upload custom shape cutter?",
    benefitsIntro:
      "Most online cutters start with an upload. Pix-8 skips that step — the direct workflow when you need a ",
    benefitsKeyword: "no-upload custom shape cutter",
    benefitsIntroAfter:
      " that defines cutout regions entirely on your device.",
    benefits: [
      {
        title: "Zero upload workflow",
        body: "Load an image from your machine — no drag-to-cloud, no server queue, and no transfer to Pix-8.",
      },
      {
        title: "Custom rectangular regions",
        body: "Draw and resize a selection at any position — keep or remove the area with transparent PNG export.",
      },
      {
        title: "Client-side canvas cut",
        body: "The cut is applied on a canvas in your browser tab. Your pixels are not sent elsewhere for processing.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Custom Cutter",
        body: "Navigate to Pix-8 Custom Cutter — no install, no account, and no upload step.",
      },
      {
        title: "Load locally and define your shape",
        body: "Select an image from your device, draw your cut selection, and choose keep or remove. Processing runs on-device in your browser tab.",
      },
      {
        title: "Export without uploading",
        body: "Download or copy the transparent PNG cutout — your image was never sent to a server.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to cut shapes without uploading?",
      body: "Open Custom Cutter, load your image locally, and export — entirely on your device.",
      button: "Open Custom Cutter",
    },
  },
  "cut-image-to-custom-size": {
    eyebrow: "Custom size · Client-side · No upload",
    titleMain: "Cut Image to Custom Size",
    titleAccent: "Target Pixel Dimensions Locally",
    heroSubtitle:
      "Cut images to custom size in your browser — no upload, no account, no cloud queue. Drag and resize your selection on-device, read width and height in pixels, and export keep-or-remove cutouts at your target dimensions without sending your file to a server.",
    primaryCta: "Cut to Size — Free",
    ctaNote: "No upload · No server · Pixel readout",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Custom-size cutouts — not full-image crop reframing",
      body: "Custom Cutter shows selection width and height in pixels as you drag and resize on a client-side canvas — not a cloud tool that ingests your file first. Frame the cut area to your target dimensions, choose keep or remove, then download or copy transparent PNG output. It does not include typed dimension fields, aspect-ratio presets, social media ratios, or batch cutting.",
    },
    benefitsHeading: "Why cut images to custom size in the browser?",
    benefitsIntro:
      "Fixed presets rarely match the exact cutout you need. Pix-8 lets you size the selection — the practical fit when you need to ",
    benefitsKeyword: "cut image to custom size",
    benefitsIntroAfter:
      " with a live pixel readout and no upload.",
    benefits: [
      {
        title: "Live dimension readout",
        body: "See selection width and height in pixels while you resize — match your target size before export.",
      },
      {
        title: "Sized cutout export",
        body: "Keep or remove the defined region and export transparent PNG output at the dimensions shown in the readout.",
      },
      {
        title: "Client-side processing",
        body: "Images are read locally and cut on a canvas in your browser tab. Pix-8 does not receive your image data.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Custom Cutter",
        body: "Navigate to Pix-8 Custom Cutter — no install, no account, and no upload dialog.",
      },
      {
        title: "Resize to your target size",
        body: "Load an image locally, drag the selection into place, and resize from corner handles while reading pixel width and height on screen. Processing runs on-device in your browser tab.",
      },
      {
        title: "Export the sized cutout",
        body: "Choose keep selection or remove selection, then download or copy the transparent PNG — your image was never sent to a server.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to cut images to custom size?",
      body: "Open Custom Cutter, frame your selection to target dimensions, and export — privately, entirely on your device.",
      button: "Open Custom Cutter",
    },
  },
  "custom-crop-for-digital-design": {
    eyebrow: "Digital design · Client-side · No upload",
    titleMain: "Custom Crop for Digital Design",
    titleAccent: "Isolate Assets for Compositing",
    heroSubtitle:
      "Custom crop for digital design in your browser — no upload, no account, no cloud queue. Draw a selection around any asset on-device, keep or remove the region, and export transparent PNG cutouts for layouts, mockups, and presentations without sending files to a server.",
    primaryCta: "Crop for Design — Free",
    ctaNote: "No upload · No server · Transparent PNG",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Design-ready cutouts — not a full layout or vector editor",
      body: "Custom Cutter isolates rectangular regions on a client-side canvas — draw a selection around a UI element, icon, or graphic, choose keep or remove, and export transparent PNG output for compositing. Resize from corner handles, read selection dimensions in pixels, then download or copy. It does not include artboards, layer panels, pen-path tools, or AI shape detection — use Background Remover for full-image background removal.",
    },
    benefitsHeading: "Why use a custom crop for digital design?",
    benefitsIntro:
      "Cloud cutout tools route client assets through remote servers. Pix-8 processes locally — the practical fit when you need a ",
    benefitsKeyword: "custom crop for digital design",
    benefitsIntroAfter:
      " that exports transparent cutouts without an upload step.",
    benefits: [
      {
        title: "Compositing-ready PNG",
        body: "Export keep-or-remove cutouts with transparent backgrounds — drop assets into design tools, slides, or mockups.",
      },
      {
        title: "Flexible region control",
        body: "Draw and resize a rectangular selection at any position — isolate the element you need without aspect-ratio lock.",
      },
      {
        title: "Client-side asset handling",
        body: "Design files are read locally and cut on a canvas in your browser tab. Pix-8 does not receive your image data.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Custom Cutter",
        body: "Navigate to Pix-8 Custom Cutter — no install, no account, and no upload dialog.",
      },
      {
        title: "Isolate your design element",
        body: "Load an asset locally, draw a selection around the region you need, and choose keep or remove. Processing runs on-device in your browser tab.",
      },
      {
        title: "Export for your layout",
        body: "Download or copy the transparent PNG cutout — privately processed on your device, ready for your design workflow.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to crop assets for digital design?",
      body: "Open Custom Cutter, isolate your element, and export — privately, entirely on your device.",
      button: "Open Custom Cutter",
    },
  },
  "easy-custom-photo-cutter": {
    eyebrow: "Simple · Client-side · No upload",
    titleMain: "Easy Custom Photo Cutter",
    titleAccent: "Cut Photos in Three Steps",
    heroSubtitle:
      "Cut photos easily in your browser — no install, no account, no cloud upload. Load a photo on-device, drag a selection, choose keep or remove, and export transparent PNG cutouts without sending your file to a server.",
    primaryCta: "Cut Photos Easily — Free",
    ctaNote: "No install · No upload · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Straightforward photo cutting — not a complex desktop suite",
      body: "Custom Cutter keeps the workflow direct on a client-side canvas — load a photo, draw a rectangular selection, choose keep or remove, and export transparent PNG output. Resize from corner handles, reset and redraw when needed, then download or copy. It does not include layer panels, pen-path tools, AI auto-cutout, or batch queues.",
    },
    benefitsHeading: "Why use an easy custom photo cutter?",
    benefitsIntro:
      "Heavy editors add steps before you export a cutout. Pix-8 stays minimal — the practical fit when you need an ",
    benefitsKeyword: "easy custom photo cutter",
    benefitsIntroAfter:
      " that runs in your browser with no upload.",
    benefits: [
      {
        title: "Three-step workflow",
        body: "Load a photo, draw your selection, and export — no install, no account setup, and no cloud processing queue.",
      },
      {
        title: "Drag-and-resize control",
        body: "Frame your cut area with corner handles, read selection dimensions in pixels, and reset to redraw if the first pass is not right.",
      },
      {
        title: "Client-side photo handling",
        body: "Photos are read locally and cut on a canvas in your browser tab. Pix-8 does not receive your image data.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Custom Cutter",
        body: "Navigate to Pix-8 Custom Cutter in your browser — no install, no account, and no upload dialog.",
      },
      {
        title: "Draw your photo selection",
        body: "Load a photo locally, drag a rectangular selection around the area you need, and choose keep or remove. Processing runs on-device in your browser tab.",
      },
      {
        title: "Export your cutout",
        body: "Download or copy the transparent PNG — privately processed on your device, ready to share or drop into your project.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to cut photos easily?",
      body: "Open Custom Cutter, load your photo, and export — privately, entirely on your device.",
      button: "Open Custom Cutter",
    },
  },
  "creative-image-cutting-tool": {
    eyebrow: "Creative cut · Client-side · No upload",
    titleMain: "Creative Image Cutting Tool",
    titleAccent: "Isolate Elements for Visual Work",
    heroSubtitle:
      "Cut images creatively in your browser — no upload, no account, no cloud queue. Draw a custom selection on-device, keep or remove the region, and export transparent PNG cutouts for compositing, collages, and creative projects without sending your file to a server.",
    primaryCta: "Cut Creatively — Free",
    ctaNote: "No upload · No server · Transparent PNG",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Creative region cutting — not a full studio or AI cutout engine",
      body: "Custom Cutter isolates rectangular regions on a client-side canvas — draw a selection around any visual element, choose keep or remove, and export transparent PNG output for your creative workflow. Resize from corner handles, reset and redraw, then download or copy. It does not include lasso, polygon, pen-path tools, layer stacks, or AI shape detection.",
    },
    benefitsHeading: "Why use a creative image cutting tool?",
    benefitsIntro:
      "Preset croppers limit how you isolate elements in visual work. Pix-8 gives you direct region control — the practical fit when you need a ",
    benefitsKeyword: "creative image cutting tool",
    benefitsIntroAfter:
      " that exports transparent cutouts with no upload.",
    benefits: [
      {
        title: "Transparent cutout export",
        body: "Keep or remove a defined region and export PNG with transparency — ready for compositing, mood boards, or layered layouts.",
      },
      {
        title: "Freeform region framing",
        body: "Draw and resize a selection at any position on the image — no aspect-ratio lock, no preset shape library.",
      },
      {
        title: "Client-side creative workflow",
        body: "Images are read locally and cut on a canvas in your browser tab. Pix-8 does not receive your image data.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Custom Cutter",
        body: "Navigate to Pix-8 Custom Cutter — no install, no account, and no upload dialog.",
      },
      {
        title: "Frame your creative cut",
        body: "Load an image locally, draw a selection around the element or area you need, and choose keep or remove. Processing runs on-device in your browser tab.",
      },
      {
        title: "Export for your project",
        body: "Download or copy the transparent PNG cutout — privately processed on your device, ready for your creative workflow.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to cut images for creative work?",
      body: "Open Custom Cutter, frame your selection, and export — privately, entirely on your device.",
      button: "Open Custom Cutter",
    },
  },
};
