import type {
  ResizerLandingChrome,
  ResizerLandingDisplayFields,
} from "@/lib/resizerLandingTypes";
import type { ResizerLandingId } from "@/lib/resizerLandings";

export const RESIZER_LANDING_CHROME_EN: ResizerLandingChrome = {
  privacyNote:
    "Client-side processing only — your image never leaves the browser.",
  relatedUseCasesHeading: "Related use cases",
  guidesHeading: "Guides",
  toolCardTitle: "Resizer tool",
  toolCardExcerpt:
    "Open the workspace — resize images locally and export in seconds.",
};

/** Add one key per landing ID as pages are created. */
export const RESIZER_LANDING_DISPLAY_EN: Record<
  ResizerLandingId,
  Omit<ResizerLandingDisplayFields, "capabilities">
> = {
  "resize-image-online": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Resize Image Online",
    titleAccent: "Private Browser Resizing",
    heroSubtitle:
      "Resize images online in your browser — no upload, no account, no cloud queue. Set width and height on-device, lock aspect ratio, and export without sending your file to a server.",
    primaryCta: "Resize Image — Free",
    ctaNote: "No upload · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Resize online without a cloud upload",
      body: "Resizer applies your target dimensions on a client-side canvas in the browser — not a cloud API that receives your file first. Lock aspect ratio, resize single images or a batch, then download or copy. It does not include AI upscaling, smart crop presets, or server-side compression.",
    },
    benefitsHeading: "Why resize images online in the browser?",
    benefitsIntro:
      "Cloud resizers route every file through a remote server before you see a result. Pix-8 processes locally — the practical fit when you need to ",
    benefitsKeyword: "resize image online",
    benefitsIntroAfter:
      " without sending product shots, portraits, or internal assets off-device.",
    benefits: [
      {
        title: "Client-side by default",
        body: "Resizing runs on a local canvas in the browser. Your images never touch a cloud server before, during, or after the resize step.",
      },
      {
        title: "Precise dimensions",
        body: "Set width and height in pixels, toggle aspect-ratio lock, and preview the output before export — single image or batch.",
      },
      {
        title: "Instant export",
        body: "Download or copy the resized file to your clipboard, with optional EXIF stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Resizer",
        body: "Navigate to Pix-8 Resizer in your browser — no install, no account, and no upload dialog.",
      },
      {
        title: "Set dimensions",
        body: "Load an image, enter target width and height, and lock aspect ratio if needed. Processing runs on-device in your browser tab.",
      },
      {
        title: "Download or copy",
        body: "Export the resized image to your device or copy to clipboard — ready for your workflow immediately.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to resize images without uploading?",
      body: "Open Resizer, load your first image, and export at your target dimensions — privately, entirely on your device.",
      button: "Open Resizer",
    },
  },
  "change-image-dimensions": {
    eyebrow: "Width & height · Client-side · No upload",
    titleMain: "Change Image Dimensions",
    titleAccent: "Precise Pixels, Private Processing",
    heroSubtitle:
      "Change image dimensions in your browser — no upload, no account, no cloud queue. Enter target width and height on-device, lock aspect ratio, and export without sending your file to a server.",
    primaryCta: "Change Dimensions — Free",
    ctaNote: "No upload · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Dimension control without a cloud upload",
      body: "Resizer applies your width and height on a client-side canvas in the browser — not a cloud API that stores your file first. Toggle aspect-ratio lock, resize single images or a batch, then download or copy. It does not include preset platform crop sizes, AI upscaling, or server-side optimization.",
    },
    benefitsHeading: "Why change image dimensions in the browser?",
    benefitsIntro:
      "Cloud tools upload before they resize. Pix-8 sets pixels locally — the direct path when you need to ",
    benefitsKeyword: "change image dimensions",
    benefitsIntroAfter:
      " for listings, documents, or exports without routing files through a remote server.",
    benefits: [
      {
        title: "Pixel-level control",
        body: "Enter exact width and height in pixels. Lock aspect ratio to preserve proportions while you adjust one dimension.",
      },
      {
        title: "Client-side processing",
        body: "Dimension changes run on a local canvas in the browser. Your source file never touches a cloud server.",
      },
      {
        title: "Batch or single export",
        body: "Apply the same dimensions to one image or a batch, then download or copy — with optional EXIF stripping.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Resizer",
        body: "Navigate to Pix-8 Resizer in your browser — change dimensions with no install, no account, and no upload step.",
      },
      {
        title: "Enter width and height",
        body: "Load an image, type target dimensions in pixels, and toggle aspect-ratio lock. Preview applies on-device in your browser tab.",
      },
      {
        title: "Export privately",
        body: "Download or copy the resized file — privately processed on your device, ready for your next tool.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to change image dimensions without uploading?",
      body: "Open Resizer, load an image, set your target width and height, and export — entirely on your device.",
      button: "Open Resizer",
    },
  },
  "image-resizer-free": {
    eyebrow: "Free · Client-side · No upload",
    titleMain: "Image Resizer Free",
    titleAccent: "No Watermark, No Server",
    heroSubtitle:
      "Resize images free in your browser — no watermark, no account, no cloud upload. Set width and height on-device, lock aspect ratio, and export without sending your file to a server.",
    primaryCta: "Resize Free — Start Now",
    ctaNote: "No watermark · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Free resizing without the upload trade-off",
      body: "Pix-8 Resizer is free to use with no watermark and no export cap — and processing stays on a client-side canvas in your browser, not a cloud API that receives your file first. Set dimensions, resize single images or a batch, then download or copy. It does not include paid tiers, AI upscaling, or server-side optimization.",
    },
    benefitsHeading: "Why use a free image resizer that runs locally?",
    benefitsIntro:
      "Free cloud resizers often cost privacy — your file uploads before the first pixel moves. Pix-8 resizes on-device — the practical fit when you need an ",
    benefitsKeyword: "image resizer free",
    benefitsIntroAfter:
      " with no watermark, no account, and no server round-trip.",
    benefits: [
      {
        title: "Free with no watermark",
        body: "Resize and export at no cost — no account, no subscription tier, and no watermark stamped on your output.",
      },
      {
        title: "Client-side by default",
        body: "Your image is read locally and processed on a canvas in the browser. It never touches a cloud server before, during, or after resizing.",
      },
      {
        title: "Full resize workflow",
        body: "Width and height in pixels, aspect-ratio lock, single or batch export — download or copy with optional EXIF stripping.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Resizer",
        body: "Navigate to Pix-8 Resizer in your browser — free resizing with no install, no account, and no upload dialog.",
      },
      {
        title: "Set your dimensions",
        body: "Load an image, enter target width and height, and toggle aspect-ratio lock. Processing runs on-device in your browser tab.",
      },
      {
        title: "Export for free",
        body: "Download or copy the resized file — no watermark, privately processed on your device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to resize images for free?",
      body: "Open Resizer, load your first image, and export at your target dimensions — free, privately, entirely on your device.",
      button: "Open Resizer",
    },
  },
  "batch-image-resizer": {
    eyebrow: "Batch · Client-side · No upload",
    titleMain: "Batch Image Resizer",
    titleAccent: "Multiple Files, One Private Workflow",
    heroSubtitle:
      "Resize multiple images in your browser — no upload, no account, no cloud queue. Apply the same dimensions on-device, process each file locally, and download a ZIP without sending your images to a server.",
    primaryCta: "Resize Batch — Free",
    ctaNote: "No upload · No server · ZIP export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Batch resizing without a cloud upload queue",
      body: "Resizer processes each image on a client-side canvas in your browser — not a cloud batch API that receives your files first. Set width and height once, queue multiple images, and download a ZIP archive. It does not include folder watch automation, server-side parallel farms, or preset platform crop sizes.",
    },
    benefitsHeading: "Why use a batch image resizer in the browser?",
    benefitsIntro:
      "Cloud batch tools upload every file before resizing starts. Pix-8 queues locally — the practical path when you need a ",
    benefitsKeyword: "batch image resizer",
    benefitsIntroAfter:
      " that applies one dimension set across many files without a server round-trip.",
    benefits: [
      {
        title: "One size, many files",
        body: "Enter width and height once, add multiple images, and apply the same dimensions across the batch — with optional aspect-ratio lock.",
      },
      {
        title: "Client-side batch processing",
        body: "Each file is read locally and resized on a canvas in the browser. Your batch never touches a cloud server.",
      },
      {
        title: "ZIP download",
        body: "Export all resized outputs in one ZIP archive — with optional EXIF stripping before download.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Resizer in batch mode",
        body: "Navigate to Pix-8 Resizer and switch to batch mode — no install, no account, and no upload step.",
      },
      {
        title: "Queue and set dimensions",
        body: "Add multiple images, enter target width and height, and toggle aspect-ratio lock. Each file processes on-device in your browser tab.",
      },
      {
        title: "Download ZIP",
        body: "Export all resized images in one ZIP archive — privately processed on your device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to batch-resize without uploading?",
      body: "Open Resizer, switch to batch mode, queue your images, and download a ZIP — entirely on your device.",
      button: "Open Resizer",
    },
  },
  "resize-image-for-instagram": {
    eyebrow: "Instagram · Client-side · No upload",
    titleMain: "Resize Image for Instagram",
    titleAccent: "Feed Dimensions, On Your Device",
    heroSubtitle:
      "Resize images for Instagram in your browser — no upload, no account, no cloud queue. Enter feed pixel dimensions on-device, lock aspect ratio if needed, and export before you post.",
    primaryCta: "Resize for Instagram — Free",
    ctaNote: "No upload · No server · On-device export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Instagram-ready pixels without a cloud upload",
      body: "Resizer applies the width and height you enter on a client-side canvas — not a social-media API that receives your photo first. Type common feed targets such as 1080×1080 or 1080×1350, toggle aspect-ratio lock, and download or copy the output. It does not include one-click Instagram presets, Stories or Reels crop overlays, or feed preview simulation.",
    },
    benefitsHeading: "Why resize for Instagram in the browser?",
    benefitsIntro:
      "Cloud resizers upload your photo before any pixel changes. Pix-8 processes locally — the practical path when you need to ",
    benefitsKeyword: "resize image for Instagram",
    benefitsIntroAfter:
      " at exact feed dimensions without sending files to a server first.",
    benefits: [
      {
        title: "Enter feed pixel dimensions",
        body: "Set width and height manually — 1080×1080, 1080×1350, 1080×566, or any target you need — with optional aspect-ratio lock.",
      },
      {
        title: "Client-side processing",
        body: "Your photo is read locally and resized on a canvas in the browser. Nothing is uploaded before you post to Instagram.",
      },
      {
        title: "Private export",
        body: "Download or copy the resized file — with optional EXIF stripping before export.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Resizer",
        body: "Navigate to Pix-8 Resizer — no install, no account, and no upload step.",
      },
      {
        title: "Set Instagram dimensions",
        body: "Load your image, enter target width and height, and toggle aspect-ratio lock. Processing runs on-device in your browser tab.",
      },
      {
        title: "Export and post",
        body: "Download or copy the resized file, then upload to Instagram from your device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to resize for Instagram without uploading?",
      body: "Open Resizer, enter your feed dimensions, and export — entirely on your device.",
      button: "Open Resizer",
    },
  },
  "image-resizer-for-linkedin-profile": {
    eyebrow: "LinkedIn · Client-side · No upload",
    titleMain: "Image Resizer for LinkedIn Profile",
    titleAccent: "Square Profile Pixels, On Your Device",
    heroSubtitle:
      "Resize profile photos for LinkedIn in your browser — no upload, no account, no cloud queue. Enter square pixel dimensions on-device, lock aspect ratio for 1:1, and export before you update your profile.",
    primaryCta: "Resize for LinkedIn — Free",
    ctaNote: "No upload · No server · On-device export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Profile-ready pixels without a cloud upload",
      body: "Resizer applies the width and height you enter on a client-side canvas — not a professional-network API that receives your headshot first. Type square targets such as 400×400 or 1584×1584, toggle aspect-ratio lock, and download or copy the output. It does not include one-click LinkedIn presets, circular crop preview, or LinkedIn banner sizing.",
    },
    benefitsHeading: "Why use an image resizer for LinkedIn profile photos in the browser?",
    benefitsIntro:
      "Cloud resizers upload your headshot before any pixel changes. Pix-8 processes locally — the practical path when you need an ",
    benefitsKeyword: "image resizer for LinkedIn profile",
    benefitsIntroAfter:
      " photos at exact square dimensions without sending files to a server first.",
    benefits: [
      {
        title: "Enter square profile dimensions",
        body: "Set width and height manually — 400×400, 1584×1584, or any square target — with optional aspect-ratio lock for 1:1.",
      },
      {
        title: "Client-side processing",
        body: "Your photo is read locally and resized on a canvas in the browser. Nothing is uploaded before you update LinkedIn.",
      },
      {
        title: "Private export",
        body: "Download or copy the resized file — with optional EXIF stripping before export.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Resizer",
        body: "Navigate to Pix-8 Resizer — no install, no account, and no upload step.",
      },
      {
        title: "Set profile dimensions",
        body: "Load your headshot, enter target width and height, and lock aspect ratio for a square crop. Processing runs on-device in your browser tab.",
      },
      {
        title: "Export and upload",
        body: "Download or copy the resized file, then upload to your LinkedIn profile from your device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to resize for LinkedIn without uploading?",
      body: "Open Resizer, enter your profile dimensions, and export — entirely on your device.",
      button: "Open Resizer",
    },
  },
  "resize-photos-for-facebook-covers": {
    eyebrow: "Facebook · Client-side · No upload",
    titleMain: "Resize Photos for Facebook Covers",
    titleAccent: "Cover Dimensions, On Your Device",
    heroSubtitle:
      "Resize photos for Facebook covers in your browser — no upload, no account, no cloud queue. Enter cover pixel dimensions on-device, lock aspect ratio if needed, and export before you update your page.",
    primaryCta: "Resize Cover — Free",
    ctaNote: "No upload · No server · On-device export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Cover-ready pixels without a cloud upload",
      body: "Resizer applies the width and height you enter on a client-side canvas — not a social-platform API that receives your cover photo first. Type common targets such as 820×312 or 1640×624, toggle aspect-ratio lock, and download or copy the output. It does not include one-click Facebook presets, safe-zone guides, or mobile versus desktop cover preview.",
    },
    benefitsHeading: "Why resize photos for Facebook covers in the browser?",
    benefitsIntro:
      "Cloud resizers upload your cover image before any pixel changes. Pix-8 processes locally — the practical path when you need to ",
    benefitsKeyword: "resize photos for Facebook covers",
    benefitsIntroAfter:
      " at exact banner dimensions without sending files to a server first.",
    benefits: [
      {
        title: "Enter cover pixel dimensions",
        body: "Set width and height manually — 820×312, 1640×624, or any target you need — with optional aspect-ratio lock.",
      },
      {
        title: "Client-side processing",
        body: "Your photo is read locally and resized on a canvas in the browser. Nothing is uploaded before you update Facebook.",
      },
      {
        title: "Private export",
        body: "Download or copy the resized file — with optional EXIF stripping before export.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Resizer",
        body: "Navigate to Pix-8 Resizer — no install, no account, and no upload step.",
      },
      {
        title: "Set cover dimensions",
        body: "Load your image, enter target width and height, and toggle aspect-ratio lock. Processing runs on-device in your browser tab.",
      },
      {
        title: "Export and upload",
        body: "Download or copy the resized file, then upload as your Facebook cover from your device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to resize Facebook covers without uploading?",
      body: "Open Resizer, enter your cover dimensions, and export — entirely on your device.",
      button: "Open Resizer",
    },
  },
  "image-dimensions-for-social-media": {
    eyebrow: "Social · Client-side · No upload",
    titleMain: "Image Dimensions for Social Media",
    titleAccent: "Platform Pixels, On Your Device",
    heroSubtitle:
      "Set image dimensions for social media in your browser — no upload, no account, no cloud queue. Enter the pixel width and height each platform requires on-device, lock aspect ratio if needed, and export before you post.",
    primaryCta: "Set Dimensions — Free",
    ctaNote: "No upload · No server · On-device export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Social-ready pixels without a cloud upload",
      body: "Resizer applies the width and height you enter on a client-side canvas — not a social-media API that receives your files first. Type Instagram, LinkedIn, or Facebook targets from your own dimension reference, toggle aspect-ratio lock, and download or copy the output. It does not include a built-in dimension chart, one-click platform presets, or per-network crop overlays.",
    },
    benefitsHeading: "Why set image dimensions for social media in the browser?",
    benefitsIntro:
      "Cloud resizers upload every asset before pixels change. Pix-8 processes locally — the practical path when you need ",
    benefitsKeyword: "image dimensions for social media",
    benefitsIntroAfter:
      " applied at exact pixel sizes across platforms without a server round-trip.",
    benefits: [
      {
        title: "Enter any platform's pixels",
        body: "Set width and height manually — Instagram feed, LinkedIn profile, Facebook cover, or any target from your dimension reference — with optional aspect-ratio lock.",
      },
      {
        title: "Client-side processing",
        body: "Each image is read locally and resized on a canvas in the browser. Nothing is uploaded before you post to a social platform.",
      },
      {
        title: "Batch or single export",
        body: "Resize one asset or queue multiple images at the same dimensions — with optional EXIF stripping before download.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Resizer",
        body: "Navigate to Pix-8 Resizer — no install, no account, and no upload step.",
      },
      {
        title: "Enter platform dimensions",
        body: "Load your image, type the width and height your social platform requires, and toggle aspect-ratio lock. Processing runs on-device in your browser tab.",
      },
      {
        title: "Export and post",
        body: "Download or copy the resized file, then upload to your social platform from your device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to set social media dimensions without uploading?",
      body: "Open Resizer, enter your platform pixel sizes, and export — entirely on your device.",
      button: "Open Resizer",
    },
  },
  "resize-image-to-pixels": {
    eyebrow: "Pixels · Client-side · No upload",
    titleMain: "Resize Image to Pixels",
    titleAccent: "Exact Width and Height, On Your Device",
    heroSubtitle:
      "Resize images to pixels in your browser — no upload, no account, no cloud queue. Enter exact width and height on-device, lock aspect ratio if needed, and export at the pixel dimensions you specify.",
    primaryCta: "Resize to Pixels — Free",
    ctaNote: "No upload · No server · Exact pixel export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Exact pixel output without a cloud upload",
      body: "Resizer maps your image to the pixel width and height you enter on a client-side canvas — not a server that receives your file first. Type dimensions such as 800×600 or 1920×1080, toggle aspect-ratio lock, and download or copy the result. It does not include percentage resize, DPI-to-pixel conversion, AI upscaling, or smart cropping.",
    },
    benefitsHeading: "Why resize images to pixels in the browser?",
    benefitsIntro:
      "Cloud resizers upload your file before any pixel is written. Pix-8 processes locally — the direct path when you need to ",
    benefitsKeyword: "resize image to pixels",
    benefitsIntroAfter:
      " at a specific width and height without a server round-trip.",
    benefits: [
      {
        title: "Exact pixel width and height",
        body: "Enter target dimensions in pixels — any width and height you need — with optional aspect-ratio lock that recalculates the paired value as you type.",
      },
      {
        title: "Client-side canvas resize",
        body: "Your image is read locally and resampled on a canvas in the browser. Output matches the pixel dimensions you set.",
      },
      {
        title: "Private export",
        body: "Download or copy the resized file — single image or batch — with optional EXIF stripping before export.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Resizer",
        body: "Navigate to Pix-8 Resizer — no install, no account, and no upload step.",
      },
      {
        title: "Enter pixel dimensions",
        body: "Load your image, type target width and height in pixels, and toggle aspect-ratio lock. Processing runs on-device in your browser tab.",
      },
      {
        title: "Export at exact pixels",
        body: "Download or copy the output at the pixel dimensions you specified — privately processed on your device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to resize to pixels without uploading?",
      body: "Open Resizer, enter your target width and height, and export — entirely on your device.",
      button: "Open Resizer",
    },
  },
  "maintain-aspect-ratio-image-resizer": {
    eyebrow: "Aspect ratio · Client-side · No upload",
    titleMain: "Maintain Aspect Ratio Image Resizer",
    titleAccent: "Lock Proportions, On Your Device",
    heroSubtitle:
      "Resize images while maintaining aspect ratio in your browser — no upload, no account, no cloud queue. Lock proportions on-device, edit one dimension, and export without distortion from a stretched resize.",
    primaryCta: "Resize with Lock — Free",
    ctaNote: "No upload · No server · Proportional export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Proportional resize without a cloud upload",
      body: "Resizer recalculates the paired dimension when aspect-ratio lock is on — not a server that receives your file first. Edit width or height in pixels, toggle the lock, and download or copy the output from a client-side canvas. It does not include smart crop, content-aware scaling, or automatic focal-point framing.",
    },
    benefitsHeading: "Why use a maintain aspect ratio image resizer in the browser?",
    benefitsIntro:
      "Cloud resizers upload your file before proportions are preserved. Pix-8 locks locally — the practical path when you need a ",
    benefitsKeyword: "maintain aspect ratio image resizer",
    benefitsIntroAfter:
      " that recalculates dimensions on-device without a server round-trip.",
    benefits: [
      {
        title: "Aspect-ratio lock toggle",
        body: "Enable lock, edit width or height, and the paired dimension updates automatically to preserve original proportions.",
      },
      {
        title: "Client-side processing",
        body: "Your image is read locally and resized on a canvas in the browser. Proportions are calculated before export — nothing is uploaded.",
      },
      {
        title: "Flexible export",
        body: "Download or copy the resized file — single image or batch — with optional EXIF stripping before export.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Resizer",
        body: "Navigate to Pix-8 Resizer — no install, no account, and no upload step.",
      },
      {
        title: "Lock aspect ratio",
        body: "Load your image, enable aspect-ratio lock, and enter target width or height. The paired dimension recalculates on-device in your browser tab.",
      },
      {
        title: "Export proportionally",
        body: "Download or copy the resized file at locked proportions — privately processed on your device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to resize with aspect ratio lock?",
      body: "Open Resizer, enable the lock, set your dimensions, and export — entirely on your device.",
      button: "Open Resizer",
    },
  },
  "resize-image-without-quality-loss": {
    eyebrow: "Quality · Client-side · No upload",
    titleMain: "Resize Image Without Quality Loss",
    titleAccent: "On-Device Canvas, No Server Recompression",
    heroSubtitle:
      "Resize images in your browser without an extra server compression cycle — no upload, no account, no cloud queue. Apply dimensions on a client-side canvas on-device, lock aspect ratio to avoid stretch, and export from your machine.",
    primaryCta: "Resize On-Device — Free",
    ctaNote: "No upload · No server · Canvas resize",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Client-side resize without a cloud recompression step",
      body: "Resizer maps your image to target width and height on a client-side canvas — not a server that receives, recompresses, and returns your file. Aspect-ratio lock prevents stretched distortion. Best suited to downscaling to smaller pixel dimensions. It does not include AI upscaling, lossless algorithm presets, or a quality slider for output compression.",
    },
    benefitsHeading: "Why resize without quality loss in the browser?",
    benefitsIntro:
      "Cloud resizers add upload and download compression on top of pixel resampling. Pix-8 resizes locally — the practical path when you need to ",
    benefitsKeyword: "resize image without quality loss",
    benefitsIntroAfter:
      " from a single on-device pass without a server round-trip.",
    benefits: [
      {
        title: "Single on-device resize pass",
        body: "Your image is read locally and resampled once on a client-side canvas — no cloud upload and download that can add compression artifacts.",
      },
      {
        title: "Aspect-ratio lock",
        body: "Prevent stretched distortion by locking proportions while you set width and height — a common cause of perceived quality loss.",
      },
      {
        title: "Private export",
        body: "Download or copy the resized file — with optional EXIF stripping before export.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Resizer",
        body: "Navigate to Pix-8 Resizer — no install, no account, and no upload step.",
      },
      {
        title: "Set dimensions on canvas",
        body: "Load your image, enter target width and height, and toggle aspect-ratio lock. Resampling runs on-device in your browser tab.",
      },
      {
        title: "Export from your device",
        body: "Download or copy the resized output — processed privately without a server recompression cycle.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to resize on-device without uploading?",
      body: "Open Resizer, set your dimensions, and export from a single client-side pass — entirely on your device.",
      button: "Open Resizer",
    },
  },
  "image-resizer-for-web-developers": {
    eyebrow: "Developers · Client-side · No upload",
    titleMain: "Image Resizer for Web Developers",
    titleAccent: "Exact Pixels, On Your Machine",
    heroSubtitle:
      "Resize images for web development in your browser — no upload, no account, no cloud queue. Set exact pixel dimensions on-device, batch-export assets, and copy output without sending files to a server.",
    primaryCta: "Resize Assets — Free",
    ctaNote: "No upload · No server · Pixel-precise export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Asset resizing without a cloud upload step",
      body: "Resizer applies pixel width and height on a client-side canvas — not an API that receives your staging assets first. Enter dimensions for thumbnails, placeholders, or UI mocks, toggle aspect-ratio lock, and download, copy, or batch-export a ZIP. It does not include npm/CLI tooling, srcset builders, or automated responsive breakpoint presets.",
    },
    benefitsHeading: "Why use an image resizer for web developers in the browser?",
    benefitsIntro:
      "Cloud resizers add an upload step before any asset is resized. Pix-8 processes locally — the practical path when you need an ",
    benefitsKeyword: "image resizer for web developers",
    benefitsIntroAfter:
      " that outputs exact pixel dimensions from your machine without a server round-trip.",
    benefits: [
      {
        title: "Exact pixel dimensions",
        body: "Enter width and height in pixels for UI assets, thumbnails, and placeholders — with optional aspect-ratio lock.",
      },
      {
        title: "Client-side processing",
        body: "Assets are read locally and resized on a canvas in the browser. Staging files never leave your machine.",
      },
      {
        title: "Batch and copy export",
        body: "Download single files, copy output to the clipboard, or batch-resize and export a ZIP archive.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Resizer",
        body: "Navigate to Pix-8 Resizer — no install, no account, and no upload step.",
      },
      {
        title: "Set asset dimensions",
        body: "Load your image, enter target width and height in pixels, and toggle aspect-ratio lock. Processing runs on-device in your browser tab.",
      },
      {
        title: "Export to your workflow",
        body: "Download, copy, or batch-export resized assets — privately processed on your device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to resize dev assets without uploading?",
      body: "Open Resizer, set pixel dimensions, and export — entirely on your device.",
      button: "Open Resizer",
    },
  },
  "client-side-image-resizer": {
    eyebrow: "Client-side · On-device · No upload",
    titleMain: "Client-Side Image Resizer",
    titleAccent: "Your Browser, Your Pixels",
    heroSubtitle:
      "Resize images client-side in your browser — no upload, no account, no cloud processing queue. Your file is read on-device, dimensions are applied on a canvas in your tab, and you export without sending pixels to a server.",
    primaryCta: "Resize Client-Side — Free",
    ctaNote: "No upload · No server · Browser canvas",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Resize where the file already lives",
      body: "Resizer reads your image locally and applies width and height on a client-side canvas — not a cloud pipeline that ingests your file first. Toggle aspect-ratio lock, resize single images or batches, then download or copy. It does not include server APIs, cloud storage, or offline PWA guarantees beyond standard browser behavior.",
    },
    benefitsHeading: "Why use a client-side image resizer?",
    benefitsIntro:
      "Cloud tools route every file through a remote server before export. Pix-8 keeps processing in the browser tab — the direct architecture when you need a ",
    benefitsKeyword: "client-side image resizer",
    benefitsIntroAfter:
      " that never uploads your pixels for processing.",
    benefits: [
      {
        title: "Browser canvas processing",
        body: "Images are read via the File API and resized on a canvas in your tab — no server round-trip for pixel operations.",
      },
      {
        title: "No upload workflow",
        body: "Your file stays on your device from load to export. Pix-8 does not receive your image data.",
      },
      {
        title: "Full resize toolkit",
        body: "Set pixel width and height, lock aspect ratio, batch-resize to a ZIP, and optionally strip EXIF before download.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Resizer in your browser",
        body: "Navigate to Pix-8 Resizer — no install, no account, and no upload step.",
      },
      {
        title: "Load and resize on-device",
        body: "Select an image locally, enter target dimensions, and toggle aspect-ratio lock. Processing runs on a client-side canvas in your browser tab.",
      },
      {
        title: "Export from your machine",
        body: "Download or copy the resized file — processed entirely client-side on your device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to resize client-side?",
      body: "Open Resizer, load your image locally, and export — entirely in your browser tab.",
      button: "Open Resizer",
    },
  },
  "privacy-focused-photo-resizer": {
    eyebrow: "Privacy · Client-side · No upload",
    titleMain: "Privacy-Focused Photo Resizer",
    titleAccent: "Your Photos Stay on Your Device",
    heroSubtitle:
      "Resize photos with privacy in your browser — no upload, no account, no cloud retention. Your file is read on-device, processed on a client-side canvas, and exported without sending your photo to a server.",
    primaryCta: "Resize Privately — Free",
    ctaNote: "No upload · No server · On-device export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Private resizing without a cloud upload",
      body: "Resizer processes your photo on a client-side canvas in your browser — not a cloud service that stores your file first. Set dimensions, optionally strip EXIF metadata before export, and download or copy the result. It does not include encrypted cloud storage, compliance badges, or account-based file history.",
    },
    benefitsHeading: "Why use a privacy-focused photo resizer?",
    benefitsIntro:
      "Cloud resizers upload sensitive photos before any resize runs. Pix-8 keeps files local — the practical path when you need a ",
    benefitsKeyword: "privacy-focused photo resizer",
    benefitsIntroAfter:
      " that never routes your images through a remote server.",
    benefits: [
      {
        title: "On-device processing",
        body: "Your photo is read locally and resized on a canvas in the browser. Pix-8 does not receive your image data.",
      },
      {
        title: "Optional EXIF stripping",
        body: "Remove location and camera metadata before export — a practical privacy step before sharing resized photos.",
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
        title: "Open Resizer",
        body: "Navigate to Pix-8 Resizer — no install, no account, and no upload step.",
      },
      {
        title: "Resize on your device",
        body: "Load your photo locally, enter target dimensions, and toggle optional EXIF stripping. Processing runs on-device in your browser tab.",
      },
      {
        title: "Export privately",
        body: "Download or copy the resized file — your photo never left your machine for processing.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to resize photos privately?",
      body: "Open Resizer, load your photo locally, and export — entirely on your device.",
      button: "Open Resizer",
    },
  },
  "no-upload-image-resizer": {
    eyebrow: "No upload · Client-side · On-device",
    titleMain: "No-Upload Image Resizer",
    titleAccent: "Resize Without Sending Your File",
    heroSubtitle:
      "Resize images without uploading in your browser — no account, no cloud queue, no server processing step. Your file is read on-device, dimensions are applied on a client-side canvas, and you export from your machine.",
    primaryCta: "Resize Without Upload — Free",
    ctaNote: "No upload · No server · On-device export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Resize without an upload step",
      body: "Resizer reads your image locally and applies width and height on a client-side canvas — not a cloud tool that ingests your file first. Toggle aspect-ratio lock, resize single images or batches, then download or copy. It does not include cloud storage, server-side APIs, or account-based file retention.",
    },
    benefitsHeading: "Why use a no-upload image resizer?",
    benefitsIntro:
      "Most online resizers start with an upload. Pix-8 skips that step — the direct workflow when you need a ",
    benefitsKeyword: "no-upload image resizer",
    benefitsIntroAfter:
      " that processes files entirely on your device.",
    benefits: [
      {
        title: "Zero upload workflow",
        body: "Load an image from your machine — no drag-to-cloud, no server queue, and no transfer to Pix-8.",
      },
      {
        title: "Client-side canvas resize",
        body: "Dimensions are applied on a canvas in your browser tab. Your pixels are not sent elsewhere for processing.",
      },
      {
        title: "Private export",
        body: "Download or copy the resized file — with optional EXIF stripping before export.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Resizer",
        body: "Navigate to Pix-8 Resizer — no install, no account, and no upload step.",
      },
      {
        title: "Load locally and resize",
        body: "Select an image from your device, enter target width and height, and toggle aspect-ratio lock. Processing runs on-device in your browser tab.",
      },
      {
        title: "Export without uploading",
        body: "Download or copy the resized file — your image was never sent to a server.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to resize without uploading?",
      body: "Open Resizer, load your image locally, and export — entirely on your device.",
      button: "Open Resizer",
    },
  },
  "browser-based-photo-resizer": {
    eyebrow: "In-browser · No install · Client-side",
    titleMain: "Browser-Based Photo Resizer",
    titleAccent: "Resize Photos in Your Tab",
    heroSubtitle:
      "Resize photos in your browser — no install, no account, no cloud upload. Your file is read on-device, dimensions are applied on a client-side canvas, and you export without leaving your browser tab.",
    primaryCta: "Resize in Browser — Free",
    ctaNote: "No install · No upload · On-device export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Browser-based resizing — not a desktop install or cloud upload",
      body: "Resizer runs in your browser tab on a client-side canvas — no app download, no extension permissions, and no server upload before resize. Set width and height, toggle aspect-ratio lock, resize single photos or batches, then download or copy. It does not include AI upscaling, platform presets, or cloud storage sync.",
    },
    benefitsHeading: "Why use a browser-based photo resizer?",
    benefitsIntro:
      "Desktop apps need installs; cloud tools upload first. Pix-8 resizes in the tab — the practical path when you need a ",
    benefitsKeyword: "browser-based photo resizer",
    benefitsIntroAfter:
      " that works on any machine without routing photos through a remote server.",
    benefits: [
      {
        title: "No install required",
        body: "Open a browser tab and start resizing — no desktop app, no extension, and no account setup before your first export.",
      },
      {
        title: "Client-side canvas resize",
        body: "Photos are read locally and resized on a canvas in your tab. Pix-8 does not receive your image data.",
      },
      {
        title: "Full resize toolkit",
        body: "Set pixel width and height, lock aspect ratio, batch-resize to a ZIP, and optionally strip EXIF before download.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open in your browser",
        body: "Navigate to Pix-8 Resizer — resize photos with no install, no account, and no upload dialog.",
      },
      {
        title: "Load and resize on-device",
        body: "Select a photo locally, enter target width and height, and toggle aspect-ratio lock. Processing runs on a client-side canvas in your browser tab.",
      },
      {
        title: "Export from the tab",
        body: "Download or copy the resized photo — privately processed on your device, ready for sharing or upload elsewhere.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to resize photos in your browser?",
      body: "Open Resizer in a tab, load your photo, and export — no install, entirely on your device.",
      button: "Open Resizer",
    },
  },
};
