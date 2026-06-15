import type {
  CropperLandingChrome,
  CropperLandingDisplayFields,
} from "@/lib/cropperLandingTypes";
import type { CropperLandingId } from "@/lib/cropperLandings";

export const CROPPER_LANDING_CHROME_EN: CropperLandingChrome = {
  privacyNote:
    "Client-side processing only — your image never leaves the browser.",
  relatedUseCasesHeading: "Related use cases",
  guidesHeading: "Guides",
  toolCardTitle: "Cropper tool",
  toolCardExcerpt:
    "Open the workspace — crop photos locally and export in seconds.",
};

/** Add one key per landing ID as pages are created. */
export const CROPPER_LANDING_DISPLAY_EN: Record<
  CropperLandingId,
  Omit<CropperLandingDisplayFields, "capabilities">
> = {
  "crop-image-online": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Crop Image Online",
    titleAccent: "Private Browser Cropping",
    heroSubtitle:
      "Crop images online in your browser — no upload, no account, no cloud queue. Drag your crop selection on-device, lock an aspect ratio, and export without sending your file to a server.",
    primaryCta: "Crop Image — Free",
    ctaNote: "No upload · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Crop online without a cloud upload",
      body: "Cropper applies your selection on a client-side canvas in the browser — not a cloud API that receives your file first. Choose aspect-ratio presets or social media ratios, preview crop dimensions, then download or copy. It does not include AI auto-crop, batch queues, or server-side recompression.",
    },
    benefitsHeading: "Why crop images online in the browser?",
    benefitsIntro:
      "Cloud croppers route every file through a remote server before you see a result. Pix-8 processes locally — the practical fit when you need to ",
    benefitsKeyword: "crop image online",
    benefitsIntroAfter:
      " without sending product shots, portraits, or internal assets off-device.",
    benefits: [
      {
        title: "Client-side by default",
        body: "Cropping runs on a local canvas in the browser. Your images never touch a cloud server before, during, or after the crop step.",
      },
      {
        title: "Precise framing",
        body: "Drag and resize the crop area, lock aspect ratio with presets, and preview width and height before export.",
      },
      {
        title: "Instant export",
        body: "Download or copy the cropped file to your clipboard, with optional EXIF stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Cropper",
        body: "Navigate to Pix-8 Cropper in your browser — no install, no account, and no upload dialog.",
      },
      {
        title: "Frame your crop",
        body: "Load an image, drag the crop selection, and choose an aspect-ratio or social media preset. Processing runs on-device in your browser tab.",
      },
      {
        title: "Download or copy",
        body: "Export the cropped image to your device or copy to clipboard — ready for your workflow immediately.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to crop images without uploading?",
      body: "Open Cropper, load your first image, and export your frame — privately, entirely on your device.",
      button: "Open Cropper",
    },
  },
  "free-image-cropper": {
    eyebrow: "Free · Client-side · No upload",
    titleMain: "Free Image Cropper",
    titleAccent: "No Watermark, No Server",
    heroSubtitle:
      "Crop images free in your browser — no watermark, no account, no cloud upload. Drag your crop selection on-device, lock an aspect ratio, and export without sending your file to a server.",
    primaryCta: "Crop Free — Start Now",
    ctaNote: "No watermark · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Free cropping without the upload trade-off",
      body: "Pix-8 Cropper is free to use with no watermark and no export cap — and processing stays on a client-side canvas in your browser, not a cloud API that receives your file first. Choose aspect-ratio or social media presets, preview crop dimensions, then download or copy. It does not include paid tiers, AI auto-crop, or server-side optimization.",
    },
    benefitsHeading: "Why use a free image cropper that runs locally?",
    benefitsIntro:
      "Free cloud croppers often cost privacy — your file uploads before the first pixel is cropped. Pix-8 crops on-device — the practical fit when you need a ",
    benefitsKeyword: "free image cropper",
    benefitsIntroAfter:
      " with no watermark, no account, and no server round-trip.",
    benefits: [
      {
        title: "Free with no watermark",
        body: "Crop and export at no cost — no account, no subscription tier, and no watermark stamped on your output.",
      },
      {
        title: "Client-side by default",
        body: "Your image is read locally and cropped on a canvas in the browser. It never touches a cloud server before, during, or after cropping.",
      },
      {
        title: "Full crop workflow",
        body: "Drag-and-resize selection, aspect-ratio presets, social media ratios, and download or copy with optional EXIF stripping.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Cropper",
        body: "Navigate to Pix-8 Cropper in your browser — free cropping with no install, no account, and no upload dialog.",
      },
      {
        title: "Frame your crop",
        body: "Load an image, drag the crop selection, and choose an aspect-ratio or social media preset. Processing runs on-device in your browser tab.",
      },
      {
        title: "Export for free",
        body: "Download or copy the cropped file — no watermark, privately processed on your device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to crop images for free?",
      body: "Open Cropper, load your first image, and export your frame — free, privately, entirely on your device.",
      button: "Open Cropper",
    },
  },
  "crop-photos-to-size": {
    eyebrow: "Precise framing · Client-side · No upload",
    titleMain: "Crop Photos to Size",
    titleAccent: "Frame to Pixel Dimensions",
    heroSubtitle:
      "Crop photos to size in your browser — no upload, no account, no cloud queue. Drag your selection on-device, preview output width and height in pixels, and export without sending your file to a server.",
    primaryCta: "Crop to Size — Free",
    ctaNote: "No upload · No server · Live size preview",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Crop to size by framing — not scaling the full image",
      body: "Cropper reframes your photo on a client-side canvas — drag the selection until the live size preview shows your target width and height in pixels. Lock aspect ratio with presets or social media ratios, then download or copy. It does not include typed dimension fields or batch cropping — use Resizer when you need to scale the entire image to exact pixels without reframing.",
    },
    benefitsHeading: "Why crop photos to size in the browser?",
    benefitsIntro:
      "Cloud tools upload before you can check output dimensions. Pix-8 frames locally — the direct workflow when you need to ",
    benefitsKeyword: "crop photos to size",
    benefitsIntroAfter:
      " with a live pixel preview and no server round-trip.",
    benefits: [
      {
        title: "Live size preview",
        body: "See output width and height in pixels as you drag the crop area — frame to your target before export.",
      },
      {
        title: "Ratio-locked framing",
        body: "Use aspect-ratio presets or social media ratios to hold proportions while you position the selection.",
      },
      {
        title: "Client-side export",
        body: "Download or copy the cropped photo — with optional EXIF stripping — processed entirely on your device.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Cropper",
        body: "Navigate to Pix-8 Cropper in your browser — no install, no account, and no upload dialog.",
      },
      {
        title: "Frame to your size",
        body: "Load a photo, drag the crop selection, and watch the live width-and-height preview. Lock an aspect-ratio or social media preset to hold proportions.",
      },
      {
        title: "Download or copy",
        body: "Export the cropped photo at the framed dimensions — privately processed on your device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to crop photos to your target size?",
      body: "Open Cropper, load your photo, and frame to the dimensions in the preview — entirely on your device.",
      button: "Open Cropper",
    },
  },
  "image-cutter-online": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Image Cutter Online",
    titleAccent: "Cut to Selection in Your Browser",
    heroSubtitle:
      "Cut images online in your browser — no upload, no account, no cloud queue. Drag a crop selection on-device, lock an aspect ratio, and export the cut without sending your file to a server.",
    primaryCta: "Cut Image — Free",
    ctaNote: "No upload · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Cut online by cropping to a selection",
      body: "Cropper defines your cut with a draggable rectangular selection on a client-side canvas — not a cloud API that ingests your file first. Resize the cut area, apply aspect-ratio or social media presets, preview output dimensions, then download or copy. It does not include freeform cut-out removal or batch queues — use Custom Cutter for keep-or-remove region cutouts with transparent PNG output.",
    },
    benefitsHeading: "Why use an image cutter online in the browser?",
    benefitsIntro:
      "Cloud cutters upload before you define a cut. Pix-8 processes locally — the practical fit when you need an ",
    benefitsKeyword: "image cutter online",
    benefitsIntroAfter:
      " that cuts to your selection without routing files through a remote server.",
    benefits: [
      {
        title: "Client-side cutting",
        body: "Your image is read locally and cut on a canvas in the browser. Pix-8 does not receive your file data.",
      },
      {
        title: "Precise selection",
        body: "Drag and resize the cut area, lock aspect ratio with presets, and preview output width and height before export.",
      },
      {
        title: "Instant export",
        body: "Download or copy the cut image to your clipboard, with optional EXIF stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Cropper",
        body: "Navigate to Pix-8 Cropper in your browser — no install, no account, and no upload dialog.",
      },
      {
        title: "Define your cut",
        body: "Load an image, drag the crop selection to frame what to keep, and choose an aspect-ratio or social media preset. Processing runs on-device in your browser tab.",
      },
      {
        title: "Download or copy",
        body: "Export the cut image to your device or copy to clipboard — ready for your workflow immediately.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to cut images without uploading?",
      body: "Open Cropper, load your first image, and export your cut — privately, entirely on your device.",
      button: "Open Cropper",
    },
  },
  "crop-image-to-square": {
    eyebrow: "1:1 · Client-side · No upload",
    titleMain: "Crop Image to Square",
    titleAccent: "Lock a 1:1 Frame in Your Browser",
    heroSubtitle:
      "Crop images to square in your browser — no upload, no account, no cloud queue. Lock the 1:1 aspect ratio on-device, position your selection, and export a square without sending your file to a server.",
    primaryCta: "Crop to Square — Free",
    ctaNote: "No upload · No server · 1:1 lock",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Square crops with a locked 1:1 ratio",
      body: "Cropper holds a perfect square when you select the 1:1 aspect-ratio preset or the Instagram square social preset — drag the selection to frame your subject on a client-side canvas, not a cloud upload first. The live size preview shows equal width and height in pixels before export. It does not include AI auto-centering, fixed platform pixel templates, or batch square queues.",
    },
    benefitsHeading: "Why crop images to square in the browser?",
    benefitsIntro:
      "Cloud croppers upload before you can lock a ratio. Pix-8 squares locally — the direct path when you need to ",
    benefitsKeyword: "crop image to square",
    benefitsIntroAfter:
      " with a 1:1 lock and a live pixel preview on your device.",
    benefits: [
      {
        title: "1:1 aspect lock",
        body: "Select the 1:1 preset or Instagram square social preset — the crop area stays square as you drag and resize.",
      },
      {
        title: "Live square preview",
        body: "See matching width and height in pixels before export — frame to your target square size on-device.",
      },
      {
        title: "Private export",
        body: "Download or copy the square crop — with optional EXIF stripping — processed entirely in your browser.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Cropper",
        body: "Navigate to Pix-8 Cropper in your browser — no install, no account, and no upload dialog.",
      },
      {
        title: "Lock 1:1 and frame",
        body: "Load an image, choose the 1:1 aspect-ratio or Instagram square preset, and position the crop selection. Processing runs on-device in your browser tab.",
      },
      {
        title: "Download or copy",
        body: "Export the square image to your device or copy to clipboard — ready for feeds, avatars, or thumbnails.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to crop a square without uploading?",
      body: "Open Cropper, load your image, lock 1:1, and export your square — privately, entirely on your device.",
      button: "Open Cropper",
    },
  },
  "crop-image-to-16-9": {
    eyebrow: "16:9 · Client-side · No upload",
    titleMain: "Crop Image to 16:9",
    titleAccent: "Lock Widescreen in Your Browser",
    heroSubtitle:
      "Crop images to 16:9 in your browser — no upload, no account, no cloud queue. Lock the widescreen aspect ratio on-device, position your selection, and export without sending your file to a server.",
    primaryCta: "Crop to 16:9 — Free",
    ctaNote: "No upload · No server · 16:9 lock",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "16:9 crops with a locked widescreen ratio",
      body: "Cropper holds a 16:9 frame when you select the 16:9 aspect-ratio preset or the landscape cover social preset — drag the selection to compose on a client-side canvas, not a cloud upload first. The live size preview shows output width and height in pixels before export. It does not include fixed platform pixel templates, AI auto-centering, or batch widescreen queues.",
    },
    benefitsHeading: "Why crop images to 16:9 in the browser?",
    benefitsIntro:
      "Cloud croppers upload before you can lock a ratio. Pix-8 frames locally — the direct path when you need to ",
    benefitsKeyword: "crop image to 16:9",
    benefitsIntroAfter:
      " with a widescreen lock and a live pixel preview on your device.",
    benefits: [
      {
        title: "16:9 aspect lock",
        body: "Select the 16:9 preset or landscape cover social preset — the crop area stays widescreen as you drag and resize.",
      },
      {
        title: "Live dimension preview",
        body: "See output width and height in pixels before export — frame to your target widescreen size on-device.",
      },
      {
        title: "Private export",
        body: "Download or copy the 16:9 crop — with optional EXIF stripping — processed entirely in your browser.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Cropper",
        body: "Navigate to Pix-8 Cropper in your browser — no install, no account, and no upload dialog.",
      },
      {
        title: "Lock 16:9 and frame",
        body: "Load an image, choose the 16:9 aspect-ratio or landscape cover preset, and position the crop selection. Processing runs on-device in your browser tab.",
      },
      {
        title: "Download or copy",
        body: "Export the widescreen image to your device or copy to clipboard — ready for video thumbnails, banners, or slides.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to crop to 16:9 without uploading?",
      body: "Open Cropper, load your image, lock 16:9, and export your widescreen frame — privately, entirely on your device.",
      button: "Open Cropper",
    },
  },
  "crop-image-to-4-3": {
    eyebrow: "4:3 · Client-side · No upload",
    titleMain: "Crop Image to 4:3",
    titleAccent: "Lock Classic Ratio in Your Browser",
    heroSubtitle:
      "Crop images to 4:3 in your browser — no upload, no account, no cloud queue. Lock the classic aspect ratio on-device, position your selection, and export without sending your file to a server.",
    primaryCta: "Crop to 4:3 — Free",
    ctaNote: "No upload · No server · 4:3 lock",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "4:3 crops with a locked classic ratio",
      body: "Cropper holds a 4:3 frame when you select the 4:3 aspect-ratio preset — drag the selection to compose on a client-side canvas, not a cloud upload first. The live size preview shows output width and height in pixels before export. It does not include fixed platform pixel templates, AI auto-centering, or batch 4:3 queues.",
    },
    benefitsHeading: "Why crop images to 4:3 in the browser?",
    benefitsIntro:
      "Cloud croppers upload before you can lock a ratio. Pix-8 frames locally — the direct path when you need to ",
    benefitsKeyword: "crop image to 4:3",
    benefitsIntroAfter:
      " with a classic ratio lock and a live pixel preview on your device.",
    benefits: [
      {
        title: "4:3 aspect lock",
        body: "Select the 4:3 preset — the crop area stays at classic photo and slide proportions as you drag and resize.",
      },
      {
        title: "Live dimension preview",
        body: "See output width and height in pixels before export — frame to your target 4:3 size on-device.",
      },
      {
        title: "Private export",
        body: "Download or copy the 4:3 crop — with optional EXIF stripping — processed entirely in your browser.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Cropper",
        body: "Navigate to Pix-8 Cropper in your browser — no install, no account, and no upload dialog.",
      },
      {
        title: "Lock 4:3 and frame",
        body: "Load an image, choose the 4:3 aspect-ratio preset, and position the crop selection. Processing runs on-device in your browser tab.",
      },
      {
        title: "Download or copy",
        body: "Export the 4:3 image to your device or copy to clipboard — ready for slides, prints, or legacy displays.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to crop to 4:3 without uploading?",
      body: "Open Cropper, load your image, lock 4:3, and export your classic frame — privately, entirely on your device.",
      button: "Open Cropper",
    },
  },
  "free-aspect-ratio-image-cropper": {
    eyebrow: "Aspect ratios · Free · Client-side",
    titleMain: "Free Aspect Ratio Image Cropper",
    titleAccent: "Lock Ratios in Your Browser",
    heroSubtitle:
      "Crop images by aspect ratio in your browser — no upload, no account, no cloud queue. Choose from built-in ratio presets on-device, frame your selection, and export without sending your file to a server.",
    primaryCta: "Crop by Ratio — Free",
    ctaNote: "No upload · No server · Ratio presets",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Free aspect-ratio cropping with built-in presets",
      body: "Cropper locks common ratios — free, 1:1, 16:9, 4:3, 9:16, and 4:5 — plus social media presets for platform-standard proportions. Drag the selection on a client-side canvas, not a cloud upload first. The live size preview shows output width and height in pixels before export. It does not include custom typed ratio inputs, AI auto-centering, or batch ratio queues.",
    },
    benefitsHeading: "Why use a free aspect ratio cropper in the browser?",
    benefitsIntro:
      "Cloud croppers upload before you can lock a ratio. Pix-8 presets run locally — the direct path when you need a ",
    benefitsKeyword: "free aspect ratio image cropper",
    benefitsIntroAfter:
      " with built-in locks and a live pixel preview on your device.",
    benefits: [
      {
        title: "Built-in ratio presets",
        body: "Switch between free, 1:1, 16:9, 4:3, 9:16, and 4:5 — or apply social media presets — while the crop area holds the selected ratio.",
      },
      {
        title: "Free, no watermark",
        body: "Lock aspect ratios and export at no cost — no account, no subscription tier, and no watermark on your output.",
      },
      {
        title: "Client-side processing",
        body: "Your image is read locally and cropped on a canvas in the browser — never uploaded to Pix-8 or a third-party server.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Cropper",
        body: "Navigate to Pix-8 Cropper in your browser — free ratio cropping with no install, no account, and no upload dialog.",
      },
      {
        title: "Choose a ratio preset",
        body: "Load an image, select an aspect-ratio or social media preset, and position the crop selection. Processing runs on-device in your browser tab.",
      },
      {
        title: "Download or copy",
        body: "Export the ratio-locked crop to your device or copy to clipboard — free, privately processed on your device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to crop by aspect ratio for free?",
      body: "Open Cropper, load your image, lock a ratio preset, and export your frame — free, privately, entirely on your device.",
      button: "Open Cropper",
    },
  },
  "crop-image-without-quality-loss": {
    eyebrow: "Quality · Client-side · No upload",
    titleMain: "Crop Image Without Quality Loss",
    titleAccent: "On-Device Canvas, No Server Recompression",
    heroSubtitle:
      "Crop images in your browser without an extra server compression cycle — no upload, no account, no cloud queue. Extract your selection on a client-side canvas on-device, preview output dimensions, and export from your machine.",
    primaryCta: "Crop On-Device — Free",
    ctaNote: "No upload · No server · Canvas crop",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Client-side crop without a cloud recompression step",
      body: "Cropper extracts your selection at the crop preview's pixel dimensions on a client-side canvas — not a server that receives, recompresses, and returns your file. Drag and resize the selection, lock aspect-ratio presets if needed, and export in a single on-device pass. It does not include AI enhancement, lossless algorithm presets, or a quality slider for output compression.",
    },
    benefitsHeading: "Why crop without quality loss in the browser?",
    benefitsIntro:
      "Cloud croppers add upload and download compression on top of pixel extraction. Pix-8 crops locally — the practical path when you need to ",
    benefitsKeyword: "crop image without quality loss",
    benefitsIntroAfter:
      " from a single on-device pass without a server round-trip.",
    benefits: [
      {
        title: "Single on-device crop pass",
        body: "Your image is read locally and the selected region is extracted once on a client-side canvas — no cloud upload and download that can add compression artifacts.",
      },
      {
        title: "Natural-pixel crop preview",
        body: "The live size preview shows output width and height in pixels before export — frame your selection at the dimensions you intend to keep.",
      },
      {
        title: "Private export",
        body: "Download or copy the cropped file — with optional EXIF stripping before export.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Cropper",
        body: "Navigate to Pix-8 Cropper — no install, no account, and no upload step.",
      },
      {
        title: "Frame your selection",
        body: "Load your image, drag and resize the crop area, and check the live pixel preview. Cropping runs on-device in your browser tab.",
      },
      {
        title: "Export from your device",
        body: "Download or copy the cropped output — processed privately without a server recompression cycle.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to crop on-device without uploading?",
      body: "Open Cropper, frame your selection, and export from a single client-side pass — entirely on your device.",
      button: "Open Cropper",
    },
  },
  "precision-image-cropper": {
    eyebrow: "Pixel preview · Client-side · No upload",
    titleMain: "Precision Image Cropper",
    titleAccent: "Frame to Exact Pixels in Your Browser",
    heroSubtitle:
      "Crop images with precision in your browser — no upload, no account, no cloud queue. Drag corner handles, read live output dimensions on-device, lock aspect ratios when needed, and export without sending your file to a server.",
    primaryCta: "Crop with Precision — Free",
    ctaNote: "No upload · No server · Live pixel readout",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Precise framing with a live pixel readout",
      body: "Cropper shows output width and height in pixels as you drag and resize the selection on a client-side canvas — not a cloud cropper that uploads before you can check dimensions. Lock ratios with aspect or social presets, fine-tune from corner handles, then download or copy. It does not include typed dimension fields, ruler overlays, grid snap guides, or AI auto-framing.",
    },
    benefitsHeading: "Why use a precision image cropper in the browser?",
    benefitsIntro:
      "Cloud croppers hide output dimensions behind an upload step. Pix-8 previews locally — the direct workflow when you need a ",
    benefitsKeyword: "precision image cropper",
    benefitsIntroAfter:
      " with handle-based control and a live pixel readout on your device.",
    benefits: [
      {
        title: "Live pixel readout",
        body: "See output width and height in pixels update as you drag and resize — frame to the exact crop dimensions shown in the preview.",
      },
      {
        title: "Handle-based control",
        body: "Move the selection and resize from corner handles for deliberate framing — with optional aspect-ratio locks via presets.",
      },
      {
        title: "Client-side processing",
        body: "Your image is read locally and cropped on a canvas in the browser — never uploaded to Pix-8 or a third-party server.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Cropper",
        body: "Navigate to Pix-8 Cropper in your browser — no install, no account, and no upload dialog.",
      },
      {
        title: "Adjust with precision",
        body: "Load an image, drag the crop selection, resize from corner handles, and watch the live pixel preview. Processing runs on-device in your browser tab.",
      },
      {
        title: "Download or copy",
        body: "Export the framed crop to your device or copy to clipboard — at the dimensions shown in the preview.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to crop with pixel-level preview?",
      body: "Open Cropper, fine-tune your selection, and export at the dimensions in the live readout — privately, entirely on your device.",
      button: "Open Cropper",
    },
  },
  "crop-image-for-ecommerce-product-photos": {
    eyebrow: "E-commerce · Client-side · No upload",
    titleMain: "Crop Image for E-Commerce Product Photos",
    titleAccent: "Consistent Listing Frames in Your Browser",
    heroSubtitle:
      "Crop product photos for e-commerce in your browser — no upload, no account, no cloud queue. Frame SKUs on-device with live pixel preview, lock square ratios for catalog thumbnails, and export without sending supplier shots to a server.",
    primaryCta: "Crop Product Photos — Free",
    ctaNote: "No upload · No server · Live size preview",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Product framing without uploading your catalog",
      body: "Cropper reframes product shots on a client-side canvas — drag the selection until the live preview shows your target width and height in pixels, then lock 1:1 or Instagram square for consistent thumbnails. Download or copy the crop with optional EXIF stripping. It does not include batch SKU processing, marketplace auto-sizing templates, AI product detection, or automatic white-backdrop cut-outs — use Background Remover for transparent PNG exports.",
    },
    benefitsHeading: "Why crop e-commerce product photos in the browser?",
    benefitsIntro:
      "Cloud croppers route unreleased inventory through remote servers before you can check output size. Pix-8 frames locally — the practical fit when you need to ",
    benefitsKeyword: "crop image for e-commerce product photos",
    benefitsIntroAfter:
      " with consistent dimensions and private on-device processing.",
    benefits: [
      {
        title: "Confidential product shots",
        body: "Cropping runs in the browser. Unreleased SKUs, supplier samples, and internal photography never leave your device.",
      },
      {
        title: "Square catalog presets",
        body: "Lock 1:1 or Instagram square for uniform listing thumbnails — while the live preview shows exact output pixels.",
      },
      {
        title: "Fast single-SKU workflow",
        body: "Load one product image, frame the item, and export in seconds — download or copy before upload to your store.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Cropper",
        body: "Navigate to Pix-8 Cropper in your browser — no install, no account, and no catalog upload step.",
      },
      {
        title: "Frame the product",
        body: "Load a product shot, drag the crop selection around the item, and lock a square preset if needed. Processing runs on-device in your browser tab.",
      },
      {
        title: "Export for your listing",
        body: "Download or copy the cropped image at the pixel dimensions shown in the preview — ready for your storefront or marketplace upload.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to crop product photos without uploading?",
      body: "Open Cropper, frame your SKU, and export at listing dimensions — privately, entirely on your device.",
      button: "Open Cropper",
    },
  },
  "professional-photo-cropper": {
    eyebrow: "Photography · Client-side · No upload",
    titleMain: "Professional Photo Cropper",
    titleAccent: "Precise Framing Without Cloud Upload",
    heroSubtitle:
      "Crop photos professionally in your browser — no upload, no account, no cloud queue. Frame client and editorial shots on-device with live pixel preview, lock aspect ratios when needed, and export without sending files to a server.",
    primaryCta: "Crop Photos — Free",
    ctaNote: "No upload · No server · Live pixel readout",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Professional framing on a client-side canvas",
      body: "Cropper reframes photos with drag-and-resize selection, corner handles, and a live width-and-height readout in pixels — not a cloud editor that receives client files first. Lock aspect-ratio or social presets, export with optional EXIF stripping, and deliver without a watermark. It does not include RAW workflows, non-destructive layers, batch studio queues, or AI retouch.",
    },
    benefitsHeading: "Why use a professional photo cropper in the browser?",
    benefitsIntro:
      "Cloud croppers route unreleased client imagery through remote servers before you can check output size. Pix-8 frames locally — the practical fit for a ",
    benefitsKeyword: "professional photo cropper",
    benefitsIntroAfter:
      " that keeps shoots confidential while you export precise crops.",
    benefits: [
      {
        title: "Client file confidentiality",
        body: "Cropping runs in the browser. Unreleased portraits, editorial selects, and client deliverables never leave your device.",
      },
      {
        title: "Live pixel readout",
        body: "See output width and height in pixels as you adjust the selection — frame deliverables to exact dimensions before export.",
      },
      {
        title: "Clean professional export",
        body: "Download or copy cropped output with no watermark — optional EXIF stripping before handoff to clients or publishers.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Cropper",
        body: "Navigate to Pix-8 Cropper in your browser — no install, no account, and no client-file upload step.",
      },
      {
        title: "Frame with precision",
        body: "Load a photo, drag the crop selection, resize from corner handles, and lock an aspect-ratio preset if needed. Processing runs on-device in your browser tab.",
      },
      {
        title: "Export your crop",
        body: "Download or copy the framed image at the pixel dimensions shown in the preview — ready for client delivery or publication.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to crop photos professionally without uploading?",
      body: "Open Cropper, frame your shot, and export at preview dimensions — privately, entirely on your device.",
      button: "Open Cropper",
    },
  },
  "client-side-image-cropper": {
    eyebrow: "Client-side · On-device · No upload",
    titleMain: "Client-Side Image Cropper",
    titleAccent: "Your Browser, Your Pixels",
    heroSubtitle:
      "Crop images client-side in your browser — no upload, no account, no cloud processing queue. Your file is read on-device, the selection is applied on a canvas in your tab, and you export without sending pixels to a server.",
    primaryCta: "Crop Client-Side — Free",
    ctaNote: "No upload · No server · Browser canvas",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Crop where the file already lives",
      body: "Cropper reads your image locally and applies the selection on a client-side canvas — not a cloud pipeline that ingests your file first. Drag and resize the crop area, lock aspect-ratio or social presets, preview output dimensions, then download or copy. It does not include server APIs, cloud storage, batch queues, or offline PWA guarantees beyond standard browser behavior.",
    },
    benefitsHeading: "Why use a client-side image cropper?",
    benefitsIntro:
      "Cloud tools route every file through a remote server before export. Pix-8 keeps processing in the browser tab — the direct architecture when you need a ",
    benefitsKeyword: "client-side image cropper",
    benefitsIntroAfter:
      " that never uploads your pixels for processing.",
    benefits: [
      {
        title: "Browser canvas processing",
        body: "Images are read via the File API and cropped on a canvas in your tab — no server round-trip for pixel operations.",
      },
      {
        title: "No upload workflow",
        body: "Your file stays on your device from load to export. Pix-8 does not receive your image data.",
      },
      {
        title: "Full crop toolkit",
        body: "Drag-and-resize selection, aspect-ratio and social presets, live size preview, and optional EXIF stripping before download or copy.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Cropper in your browser",
        body: "Navigate to Pix-8 Cropper — no install, no account, and no upload step.",
      },
      {
        title: "Load and crop on-device",
        body: "Select an image locally, frame your crop selection, and choose aspect-ratio or social presets. Processing runs on a client-side canvas in your browser tab.",
      },
      {
        title: "Export from your machine",
        body: "Download or copy the cropped file — processed entirely client-side on your device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to crop client-side?",
      body: "Open Cropper, load your image locally, and export — entirely in your browser tab.",
      button: "Open Cropper",
    },
  },
  "privacy-focused-image-cutter": {
    eyebrow: "Privacy · Client-side · No upload",
    titleMain: "Privacy-Focused Image Cutter",
    titleAccent: "Your Images Stay on Your Device",
    heroSubtitle:
      "Cut images with privacy in your browser — no upload, no account, no cloud retention. Your file is read on-device, the selection is applied on a client-side canvas, and you export without sending your image to a server.",
    primaryCta: "Cut Privately — Free",
    ctaNote: "No upload · No server · On-device export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Private cutting without a cloud upload",
      body: "Cropper applies your rectangular cut on a client-side canvas in your browser — not a cloud cutter that stores your file first. Drag and resize the selection, lock aspect-ratio or social presets, optionally strip EXIF metadata before export, then download or copy. It does not include encrypted cloud storage, compliance badges, or account-based file history.",
    },
    benefitsHeading: "Why use a privacy-focused image cutter?",
    benefitsIntro:
      "Cloud cutters upload sensitive images before any cut runs. Pix-8 keeps files local — the practical path when you need a ",
    benefitsKeyword: "privacy-focused image cutter",
    benefitsIntroAfter:
      " that never routes your images through a remote server.",
    benefits: [
      {
        title: "On-device processing",
        body: "Your image is read locally and cut on a canvas in the browser. Pix-8 does not receive your image data.",
      },
      {
        title: "Optional EXIF stripping",
        body: "Remove location and camera metadata before export — a practical privacy step before sharing cut images.",
      },
      {
        title: "No account required",
        body: "Free to use with no sign-up and no cloud file retention tied to an account.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Cropper",
        body: "Navigate to Pix-8 Cropper — no install, no account, and no upload step.",
      },
      {
        title: "Cut on your device",
        body: "Load your image locally, drag a crop selection to define the cut, and toggle optional EXIF stripping. Processing runs on-device in your browser tab.",
      },
      {
        title: "Export privately",
        body: "Download or copy the cut image — your file never left your machine for processing.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to cut images privately?",
      body: "Open Cropper, load your image locally, and export — entirely on your device.",
      button: "Open Cropper",
    },
  },
  "no-upload-image-cropper": {
    eyebrow: "No upload · Client-side · On-device",
    titleMain: "No-Upload Image Cropper",
    titleAccent: "Crop Without Sending Your File",
    heroSubtitle:
      "Crop images without uploading in your browser — no account, no cloud queue, no server processing step. Your file is read on-device, the selection is applied on a client-side canvas, and you export from your machine.",
    primaryCta: "Crop Without Upload — Free",
    ctaNote: "No upload · No server · On-device export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Crop without an upload step",
      body: "Cropper reads your image locally and applies the selection on a client-side canvas — not a cloud tool that ingests your file first. Drag and resize the crop area, lock aspect-ratio or social presets, preview output dimensions, then download or copy. It does not include cloud storage, server-side APIs, batch cropping, or account-based file retention.",
    },
    benefitsHeading: "Why use a no-upload image cropper?",
    benefitsIntro:
      "Most online croppers start with an upload. Pix-8 skips that step — the direct workflow when you need a ",
    benefitsKeyword: "no-upload image cropper",
    benefitsIntroAfter:
      " that processes files entirely on your device.",
    benefits: [
      {
        title: "Zero upload workflow",
        body: "Load an image from your machine — no drag-to-cloud, no server queue, and no transfer to Pix-8.",
      },
      {
        title: "Client-side canvas crop",
        body: "The cut is applied on a canvas in your browser tab. Your pixels are not sent elsewhere for processing.",
      },
      {
        title: "Private export",
        body: "Download or copy the cropped file — with optional EXIF stripping before export.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Cropper",
        body: "Navigate to Pix-8 Cropper — no install, no account, and no upload step.",
      },
      {
        title: "Load locally and crop",
        body: "Select an image from your device, frame your crop selection, and choose aspect-ratio or social presets. Processing runs on-device in your browser tab.",
      },
      {
        title: "Export without uploading",
        body: "Download or copy the cropped file — your image was never sent to a server.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to crop without uploading?",
      body: "Open Cropper, load your image locally, and export — entirely on your device.",
      button: "Open Cropper",
    },
  },
  "browser-based-image-cropper-tool": {
    eyebrow: "In-browser · No install · Client-side",
    titleMain: "Browser-Based Image Cropper Tool",
    titleAccent: "Crop Images in Your Tab",
    heroSubtitle:
      "Crop images in your browser — no install, no account, no cloud upload. Your file is read on-device, the selection is applied on a client-side canvas, and you export without leaving your browser tab.",
    primaryCta: "Crop in Browser — Free",
    ctaNote: "No install · No upload · On-device export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Browser-based cropping — not a desktop install or cloud upload",
      body: "Cropper runs in your browser tab on a client-side canvas — no app download, no extension permissions, and no server upload before crop. Drag and resize the selection, lock aspect-ratio or social presets, preview output dimensions, then download or copy. It does not include AI auto-crop, batch cropping, or cloud storage sync.",
    },
    benefitsHeading: "Why use a browser-based image cropper tool?",
    benefitsIntro:
      "Desktop apps need installs; cloud tools upload first. Pix-8 crops in the tab — the practical path when you need a ",
    benefitsKeyword: "browser-based image cropper tool",
    benefitsIntroAfter:
      " that works on any machine without routing images through a remote server.",
    benefits: [
      {
        title: "No install required",
        body: "Open a browser tab and start cropping — no desktop app, no extension, and no account setup before your first export.",
      },
      {
        title: "Client-side canvas crop",
        body: "Images are read locally and cropped on a canvas in your tab. Pix-8 does not receive your image data.",
      },
      {
        title: "Full crop toolkit",
        body: "Drag-and-resize selection, aspect-ratio and social presets, live size preview, and optional EXIF stripping before download or copy.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open in your browser",
        body: "Navigate to Pix-8 Cropper — crop images with no install, no account, and no upload dialog.",
      },
      {
        title: "Load and crop on-device",
        body: "Select an image locally, frame your crop selection, and choose aspect-ratio or social presets. Processing runs on a client-side canvas in your browser tab.",
      },
      {
        title: "Export from the tab",
        body: "Download or copy the cropped file — privately processed on your device, ready for sharing or upload elsewhere.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to crop images in your browser?",
      body: "Open Cropper in a tab, load your image, and export — no install, entirely on your device.",
      button: "Open Cropper",
    },
  },
};
