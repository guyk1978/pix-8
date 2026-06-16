import type {
  RotateFlipLandingChrome,
  RotateFlipLandingDisplayFields,
} from "@/lib/rotateFlipLandingTypes";
import type { RotateFlipLandingId } from "@/lib/rotateFlipLandings";

export const ROTATE_FLIP_LANDING_CHROME_EN: RotateFlipLandingChrome = {
  privacyNote:
    "Client-side processing only — your image never leaves the browser.",
  relatedUseCasesHeading: "Related use cases",
  guidesHeading: "Guides",
  toolCardTitle: "Rotate & Flip tool",
  toolCardExcerpt:
    "Open the workspace — rotate, flip, preview output size, and export locally.",
};

/** Add one key per landing ID as pages are created. */
export const ROTATE_FLIP_LANDING_DISPLAY_EN: Record<
  RotateFlipLandingId,
  Omit<RotateFlipLandingDisplayFields, "capabilities">
> = {
  "rotate-image-online": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Rotate Image Online",
    titleAccent: "Private Browser Orientation",
    heroSubtitle:
      "Rotate images online in your browser — no upload, no account, no cloud queue. Apply 90° turns and flips on-device, preview output size, and export without sending your file to a server.",
    primaryCta: "Rotate Image — Free",
    ctaNote: "No upload · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Rotate online without a cloud upload",
      body: "Rotate & Flip applies 90° turns and horizontal or vertical flips on a client-side canvas in the browser — not a cloud API that receives your file first. Preview output dimensions after each transform, then download or copy. It does not include free-form angle rotation, batch processing, or server-side optimization.",
    },
    benefitsHeading: "Why rotate images online in the browser?",
    benefitsIntro:
      "Cloud rotators route every file through a remote server before you see a result. Pix-8 processes locally — the practical fit when you need to ",
    benefitsKeyword: "rotate image online",
    benefitsIntroAfter:
      " without sending product shots, scans, or internal assets off-device.",
    benefits: [
      {
        title: "Client-side by default",
        body: "Rotation runs on a local canvas in the browser. Your images never touch a cloud server before, during, or after the transform step.",
      },
      {
        title: "90° turns and flips",
        body: "Rotate clockwise or counter-clockwise in 90° steps, flip horizontal or vertical, and preview how output dimensions change before export.",
      },
      {
        title: "Instant export",
        body: "Download or copy the oriented file to your clipboard, with optional EXIF stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Rotate & Flip",
        body: "Navigate to Pix-8 Rotate & Flip in your browser — no install, no account, and no upload dialog.",
      },
      {
        title: "Apply rotation or flip",
        body: "Load an image locally, rotate 90° clockwise or counter-clockwise, or flip horizontal or vertical. Processing runs on-device in your browser tab.",
      },
      {
        title: "Download or copy",
        body: "Export the oriented image to your device or copy to clipboard — ready for your workflow immediately.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to rotate images without uploading?",
      body: "Open Rotate & Flip, load your first image, and export with the correct orientation — privately, entirely on your device.",
      button: "Open Rotate & Flip",
    },
  },
  "flip-image-online": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Flip Image Online",
    titleAccent: "Private Browser Mirroring",
    heroSubtitle:
      "Flip images online in your browser — no upload, no account, no cloud queue. Apply horizontal or vertical flips on-device, preview output size, and export without sending your file to a server.",
    primaryCta: "Flip Image — Free",
    ctaNote: "No upload · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Flip online without a cloud upload",
      body: "Rotate & Flip applies horizontal and vertical flips on a client-side canvas in the browser — not a cloud API that receives your file first. Preview output dimensions after each transform, then download or copy. It does not include perspective correction, AI mirroring, or batch processing.",
    },
    benefitsHeading: "Why flip images online in the browser?",
    benefitsIntro:
      "Cloud tools route every file through a remote server before you see a mirrored result. Pix-8 processes locally — the practical fit when you need to ",
    benefitsKeyword: "flip image online",
    benefitsIntroAfter:
      " without sending product shots, portraits, or internal assets off-device.",
    benefits: [
      {
        title: "Client-side by default",
        body: "Flips run on a local canvas in the browser. Your images never touch a cloud server before, during, or after the transform step.",
      },
      {
        title: "Horizontal and vertical flips",
        body: "Mirror images left/right or flip them top/bottom, combine with 90° rotation when needed, and preview how output dimensions change before export.",
      },
      {
        title: "Instant export",
        body: "Download or copy the flipped file to your clipboard, with optional EXIF stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Rotate & Flip",
        body: "Navigate to Pix-8 Rotate & Flip in your browser — no install, no account, and no upload dialog.",
      },
      {
        title: "Apply horizontal or vertical flip",
        body: "Load an image locally, flip it horizontally or vertically, and combine flips with 90° rotation if needed. Processing runs on-device in your browser tab.",
      },
      {
        title: "Download or copy",
        body: "Export the flipped image to your device or copy to clipboard — ready for your workflow immediately.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to flip images without uploading?",
      body: "Open Rotate & Flip, load your first image, and export with the exact mirror you need — privately, entirely on your device.",
      button: "Open Rotate & Flip",
    },
  },
  "mirror-image-online": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Mirror Image Online",
    titleAccent: "Private Browser Reflection",
    heroSubtitle:
      "Mirror images online in your browser — no upload, no account, no cloud queue. Apply a horizontal reflection on-device, preview output size, and export without sending your file to a server.",
    primaryCta: "Mirror Image — Free",
    ctaNote: "No upload · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Mirror online without a cloud upload",
      body: "Rotate & Flip applies a horizontal flip — a left-to-right reflection — on a client-side canvas in the browser, not a cloud API that receives your file first. Preview output dimensions, combine with vertical flip or 90° rotation if needed, then download or copy. It does not include perspective correction, AI mirroring, or batch processing.",
    },
    benefitsHeading: "Why mirror images online in the browser?",
    benefitsIntro:
      "Cloud tools route every file through a remote server before you see a reflected result. Pix-8 processes locally — the practical fit when you need to ",
    benefitsKeyword: "mirror image online",
    benefitsIntroAfter:
      " without sending product shots, portraits, or design assets off-device.",
    benefits: [
      {
        title: "Client-side by default",
        body: "Mirroring runs on a local canvas in the browser. Your images never touch a cloud server before, during, or after the transform step.",
      },
      {
        title: "Horizontal reflection",
        body: "Flip images left to right for a true mirror effect. Add vertical flip or 90° rotation when needed, and preview output dimensions before export.",
      },
      {
        title: "Instant export",
        body: "Download or copy the mirrored file to your clipboard, with optional EXIF stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Rotate & Flip",
        body: "Navigate to Pix-8 Rotate & Flip in your browser — no install, no account, and no upload dialog.",
      },
      {
        title: "Apply horizontal flip",
        body: "Load an image locally and flip it horizontally for a left-to-right mirror. Combine with vertical flip or 90° rotation if needed. Processing runs on-device in your browser tab.",
      },
      {
        title: "Download or copy",
        body: "Export the mirrored image to your device or copy to clipboard — ready for your workflow immediately.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to mirror images without uploading?",
      body: "Open Rotate & Flip, load your first image, and export with the reflection you need — privately, entirely on your device.",
      button: "Open Rotate & Flip",
    },
  },
  "free-photo-rotator-and-flipper": {
    eyebrow: "Free · Client-side · No upload",
    titleMain: "Free Photo Rotator and Flipper",
    titleAccent: "Private Browser Orientation",
    heroSubtitle:
      "Rotate and flip photos free in your browser — no upload, no account, no cloud queue. Apply 90° turns and horizontal or vertical flips on-device, preview output size, and export without sending your file to a server.",
    primaryCta: "Rotate & Flip — Free",
    ctaNote: "No upload · No server · No account",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Free rotation and flipping without a cloud upload",
      body: "Rotate & Flip applies 90° turns and horizontal or vertical flips on a client-side canvas in the browser — not a freemium cloud tool that ingests your file first. Preview output dimensions, then download or copy at no cost. It does not include free-form angle rotation, batch processing, or server-side optimization.",
    },
    benefitsHeading: "Why use a free photo rotator and flipper in the browser?",
    benefitsIntro:
      "Many free tools still upload your file before rotating or flipping. Pix-8 keeps processing local — the direct fit when you need a ",
    benefitsKeyword: "free photo rotator and flipper",
    benefitsIntroAfter:
      " that corrects orientation without accounts, watermarks, or server round-trips.",
    benefits: [
      {
        title: "Free with no account",
        body: "Open the tool, load a photo, and export — no signup, no trial limits, and no watermark on your output.",
      },
      {
        title: "Rotate and flip on-device",
        body: "Rotate 90° clockwise or counter-clockwise, flip horizontal or vertical, and preview output dimensions — all on a local canvas in your browser.",
      },
      {
        title: "Private by design",
        body: "Your photo is read locally and never uploaded to Pix-8 or any third-party server, with optional EXIF stripping before export.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Rotate & Flip",
        body: "Navigate to Pix-8 Rotate & Flip in your browser — free, no install, no account, and no upload dialog.",
      },
      {
        title: "Rotate or flip your photo",
        body: "Load an image locally, rotate 90° or flip horizontal or vertical. Processing runs on-device in your browser tab.",
      },
      {
        title: "Download or copy",
        body: "Export the oriented photo to your device or copy to clipboard — ready immediately, at no cost.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to rotate and flip photos for free?",
      body: "Open Rotate & Flip, load your first photo, and export with the correct orientation — privately, entirely on your device.",
      button: "Open Rotate & Flip",
    },
  },
  "flip-photo-horizontally-and-vertically": {
    eyebrow: "Both axes · Client-side · No upload",
    titleMain: "Flip Photo Horizontally and Vertically",
    titleAccent: "Private Two-Axis Control",
    heroSubtitle:
      "Flip photos horizontally and vertically in your browser — no upload, no account, no cloud queue. Apply either axis or both on-device, preview output size, and export without sending your file to a server.",
    primaryCta: "Flip Photo — Free",
    ctaNote: "No upload · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Horizontal and vertical flips without a cloud upload",
      body: "Rotate & Flip toggles horizontal flip (left-to-right mirror) and vertical flip (top-to-bottom inversion) independently on a client-side canvas — not a cloud API that receives your file first. Combine both axes or add 90° rotation when needed, preview output dimensions, then download or copy. It does not include perspective correction, free-form warp, or batch processing.",
    },
    benefitsHeading: "Why flip photos horizontally and vertically in the browser?",
    benefitsIntro:
      "Cloud flippers upload before you can test either axis. Pix-8 processes locally — the practical fit when you need to ",
    benefitsKeyword: "flip photo horizontally and vertically",
    benefitsIntroAfter:
      " without sending portraits, product shots, or design assets off-device.",
    benefits: [
      {
        title: "Client-side by default",
        body: "Both flips run on a local canvas in the browser. Your photos never touch a cloud server before, during, or after the transform step.",
      },
      {
        title: "Independent axis control",
        body: "Toggle horizontal flip, vertical flip, or both — combine with 90° rotation when needed, and preview how output dimensions change before export.",
      },
      {
        title: "Instant export",
        body: "Download or copy the flipped photo to your clipboard, with optional EXIF stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Rotate & Flip",
        body: "Navigate to Pix-8 Rotate & Flip in your browser — no install, no account, and no upload dialog.",
      },
      {
        title: "Toggle horizontal or vertical flip",
        body: "Load a photo locally, flip it horizontally, vertically, or both. Add 90° rotation if needed. Processing runs on-device in your browser tab.",
      },
      {
        title: "Download or copy",
        body: "Export the flipped photo to your device or copy to clipboard — ready for your workflow immediately.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to flip on both axes without uploading?",
      body: "Open Rotate & Flip, load your first photo, and export with the horizontal or vertical flip you need — privately, entirely on your device.",
      button: "Open Rotate & Flip",
    },
  },
  "rotate-image-90-degrees": {
    eyebrow: "90° turns · Client-side · No upload",
    titleMain: "Rotate Image 90 Degrees",
    titleAccent: "Precise Quarter-Turn Control",
    heroSubtitle:
      "Rotate images 90 degrees in your browser — no upload, no account, no cloud queue. Turn clockwise or counter-clockwise on-device, preview how output dimensions change, and export without sending your file to a server.",
    primaryCta: "Rotate 90° — Free",
    ctaNote: "No upload · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "90-degree rotation without a cloud upload",
      body: "Rotate & Flip applies 90° clockwise or counter-clockwise turns on a client-side canvas in the browser — not a cloud API that receives your file first. Each step is a quarter turn; width and height swap at 90° and 270°. Preview output dimensions, then download or copy. It does not include free-form angle rotation, batch processing, or server-side optimization.",
    },
    benefitsHeading: "Why rotate images 90 degrees in the browser?",
    benefitsIntro:
      "Cloud rotators upload before you can correct orientation. Pix-8 processes locally — the direct fit when you need to ",
    benefitsKeyword: "rotate image 90 degrees",
    benefitsIntroAfter:
      " without sending phone shots, scans, or internal assets off-device.",
    benefits: [
      {
        title: "Client-side by default",
        body: "90° rotation runs on a local canvas in the browser. Your images never touch a cloud server before, during, or after the transform step.",
      },
      {
        title: "Clockwise and counter-clockwise",
        body: "Turn images a quarter rotation in either direction. Preview how width and height swap before export — repeat clicks for 180° or 270°.",
      },
      {
        title: "Instant export",
        body: "Download or copy the rotated file to your clipboard, with optional EXIF stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Rotate & Flip",
        body: "Navigate to Pix-8 Rotate & Flip in your browser — no install, no account, and no upload dialog.",
      },
      {
        title: "Rotate 90° clockwise or counter-clockwise",
        body: "Load an image locally and apply a 90° turn in either direction. Processing runs on-device in your browser tab.",
      },
      {
        title: "Download or copy",
        body: "Export the correctly oriented image to your device or copy to clipboard — ready for your workflow immediately.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to rotate 90 degrees without uploading?",
      body: "Open Rotate & Flip, load your first image, and export with the correct quarter-turn orientation — privately, entirely on your device.",
      button: "Open Rotate & Flip",
    },
  },
  "fix-upside-down-pictures-online": {
    eyebrow: "Orientation fix · Client-side · No upload",
    titleMain: "Fix Upside Down Pictures Online",
    titleAccent: "Correct Orientation Privately",
    heroSubtitle:
      "Fix upside-down pictures online in your browser — no upload, no account, no cloud queue. Rotate 90° on-device until the image reads correctly, preview output size, and export without sending your file to a server.",
    primaryCta: "Fix Orientation — Free",
    ctaNote: "No upload · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Correct upside-down shots without a cloud upload",
      body: "Rotate & Flip applies 90° clockwise or counter-clockwise turns on a client-side canvas — not a cloud tool that ingests your file first. Two quarter-turns correct a fully upside-down image; one turn fixes a sideways shot. Preview output dimensions, then download or copy. It does not include automatic EXIF orientation, free-form angle rotation, or batch processing.",
    },
    benefitsHeading: "Why fix upside-down pictures online in the browser?",
    benefitsIntro:
      "Cloud orientation tools upload before you can see a corrected result. Pix-8 processes locally — the practical fit when you need to ",
    benefitsKeyword: "fix upside down pictures online",
    benefitsIntroAfter:
      " without sending phone photos, scans, or internal assets off-device.",
    benefits: [
      {
        title: "Client-side by default",
        body: "Orientation correction runs on a local canvas in the browser. Your pictures never touch a cloud server before, during, or after the fix.",
      },
      {
        title: "90° turns until correct",
        body: "Rotate clockwise or counter-clockwise in quarter-turns. Preview how the image reads after each step — repeat for 180° when fully upside down.",
      },
      {
        title: "Instant export",
        body: "Download or copy the corrected picture to your clipboard, with optional EXIF stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Rotate & Flip",
        body: "Navigate to Pix-8 Rotate & Flip in your browser — no install, no account, and no upload dialog.",
      },
      {
        title: "Rotate until upright",
        body: "Load the upside-down picture locally and rotate 90° clockwise or counter-clockwise until it reads correctly. Processing runs on-device in your browser tab.",
      },
      {
        title: "Download or copy",
        body: "Export the corrected picture to your device or copy to clipboard — ready for your workflow immediately.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to fix upside-down pictures without uploading?",
      body: "Open Rotate & Flip, load your first picture, and export with the correct orientation — privately, entirely on your device.",
      button: "Open Rotate & Flip",
    },
  },
  "mirror-selfie-online": {
    eyebrow: "Selfie · Client-side · No upload",
    titleMain: "Mirror Selfie Online",
    titleAccent: "Private Horizontal Flip",
    heroSubtitle:
      "Mirror selfies online in your browser — no upload, no account, no cloud queue. Apply a horizontal flip on-device for a mirror effect or to correct a mirrored front-camera shot, preview output size, and export without sending your photo to a server.",
    primaryCta: "Mirror Selfie — Free",
    ctaNote: "No upload · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Mirror selfies without a cloud upload",
      body: "Rotate & Flip applies a horizontal flip on a client-side canvas — not a cloud editor that ingests your selfie first. Create a mirror effect or flip again to correct a mirrored preview. Combine with 90° rotation or vertical flip if needed, then download or copy. It does not include beauty filters, face retouching, or background effects.",
    },
    benefitsHeading: "Why mirror selfies online in the browser?",
    benefitsIntro:
      "Cloud selfie tools upload your photo before any edit. Pix-8 processes locally — the practical fit when you need to ",
    benefitsKeyword: "mirror selfie online",
    benefitsIntroAfter:
      " without sending portraits or personal shots off-device.",
    benefits: [
      {
        title: "Client-side by default",
        body: "Selfie mirroring runs on a local canvas in the browser. Your photos never touch a cloud server before, during, or after the flip.",
      },
      {
        title: "Horizontal mirror control",
        body: "Flip left-to-right for a mirror effect, or flip again to correct a mirrored front-camera selfie. Preview the result before export.",
      },
      {
        title: "Instant export",
        body: "Download or copy the mirrored selfie to your clipboard, with optional EXIF stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Rotate & Flip",
        body: "Navigate to Pix-8 Rotate & Flip in your browser — no install, no account, and no upload dialog.",
      },
      {
        title: "Apply horizontal flip",
        body: "Load your selfie locally and flip it horizontally for a mirror effect or to correct orientation. Processing runs on-device in your browser tab.",
      },
      {
        title: "Download or copy",
        body: "Export the mirrored selfie to your device or copy to clipboard — ready to post or save immediately.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to mirror a selfie without uploading?",
      body: "Open Rotate & Flip, load your selfie, and export with the reflection you need — privately, entirely on your device.",
      button: "Open Rotate & Flip",
    },
  },
  "batch-rotate-images-online": {
    eyebrow: "Batch workflow · Client-side · No upload",
    titleMain: "Batch Rotate Images Online",
    titleAccent: "Private Sequential Processing",
    heroSubtitle:
      "Rotate multiple images online in your browser — no upload, no account, no cloud queue. Apply 90° turns on-device, export each file, and move through your set without sending images to a server.",
    primaryCta: "Rotate Image Set — Free",
    ctaNote: "No upload · No server · One-by-one workflow",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Batch-style rotation without cloud ingestion",
      body: "Rotate & Flip processes one image at a time on a client-side canvas, which gives you a practical batch workflow: load, rotate 90°, export, repeat. This is not simultaneous multi-file batch automation. You still get clockwise/counter-clockwise turns, optional flips, output-size preview, and local export.",
    },
    benefitsHeading: "Why use this for batch rotate workflows?",
    benefitsIntro:
      "Many batch rotators upload entire folders before any edit. Pix-8 keeps processing local — the practical fit when you need to ",
    benefitsKeyword: "batch rotate images online",
    benefitsIntroAfter:
      " in a private, file-by-file workflow without sending image sets off-device.",
    benefits: [
      {
        title: "Client-side by default",
        body: "Every image is read and transformed locally in your browser tab. Your files never touch a cloud server.",
      },
      {
        title: "Consistent 90° rotation steps",
        body: "Apply clockwise or counter-clockwise quarter-turns per file, preview output dimensions, then export before moving to the next image.",
      },
      {
        title: "Practical batch sequence",
        body: "Work through many images quickly in sequence with copy/download export and optional EXIF stripping on each output.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Rotate & Flip",
        body: "Navigate to Pix-8 Rotate & Flip in your browser — no install, no account, and no upload queue.",
      },
      {
        title: "Rotate each image in sequence",
        body: "Load one file, rotate 90° clockwise or counter-clockwise, and confirm orientation. Processing runs on-device.",
      },
      {
        title: "Export and repeat",
        body: "Download or copy the result, then load the next image in your set and repeat the same local workflow.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to run a private batch rotation workflow?",
      body: "Open Rotate & Flip and process your image set one-by-one — local, fast, and fully client-side.",
      button: "Open Rotate & Flip",
    },
  },
  "lossless-image-rotation-tool": {
    eyebrow: "90° rotation · Client-side · No upload",
    titleMain: "Lossless Image Rotation Tool",
    titleAccent: "Single-Pass Canvas Orientation",
    heroSubtitle:
      "Rotate images with minimal recompression in your browser — no upload, no account, no cloud queue. Apply 90° turns on-device in one pass, preview output size, and export without sending your file to a server.",
    primaryCta: "Rotate — Free",
    ctaNote: "No upload · No server · On-device export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Orientation correction without a cloud upload",
      body: "Rotate & Flip applies 90° clockwise or counter-clockwise turns on a client-side canvas — not a cloud API that ingests and re-exports your file. Export keeps your source format in a single on-device pass. JPEG and WebP may still be re-encoded by the browser; PNG preserves pixels without compression loss. It does not include arbitrary-angle rotation, batch automation, or a quality slider.",
    },
    benefitsHeading: "Why use a lossless image rotation tool in the browser?",
    benefitsIntro:
      "Cloud rotators add an upload and server recompression step before you see a result. Pix-8 processes locally — the practical fit when you need a ",
    benefitsKeyword: "lossless image rotation tool",
    benefitsIntroAfter:
      " that corrects orientation on-device without routing files through a remote server.",
    benefits: [
      {
        title: "Client-side by default",
        body: "Rotation runs on a local canvas in your browser. Your images never touch a cloud server before, during, or after export.",
      },
      {
        title: "90° pixel-accurate turns",
        body: "Quarter-turn rotation maps pixels without arbitrary-angle resampling. Preview output dimensions before export.",
      },
      {
        title: "Single-pass export",
        body: "Download or copy in one on-device step, with optional EXIF stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Rotate & Flip",
        body: "Navigate to Pix-8 Rotate & Flip in your browser — no install, no account, and no upload dialog.",
      },
      {
        title: "Apply a 90° rotation",
        body: "Load an image locally and rotate clockwise or counter-clockwise. Processing runs on-device in your browser tab.",
      },
      {
        title: "Download or copy",
        body: "Export the oriented image in your source format — ready for your workflow immediately.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to rotate with minimal recompression?",
      body: "Open Rotate & Flip, load your image, and export with correct orientation — privately, entirely on your device.",
      button: "Open Rotate & Flip",
    },
  },
  "batch-flip-photos-tool": {
    eyebrow: "Batch workflow · Client-side · No upload",
    titleMain: "Batch Flip Photos Tool",
    titleAccent: "Private Sequential Flipping",
    heroSubtitle:
      "Flip multiple photos in your browser — no upload, no account, no cloud queue. Apply horizontal or vertical flips on-device, export each file, and move through your set without sending images to a server.",
    primaryCta: "Flip Photo Set — Free",
    ctaNote: "No upload · No server · One-by-one workflow",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Batch-style flipping without cloud ingestion",
      body: "Rotate & Flip processes one image at a time on a client-side canvas, which gives you a practical batch workflow: load, flip horizontally or vertically, export, repeat. This is not simultaneous multi-file batch automation. You still get 90° rotation, output-size preview, and local export.",
    },
    benefitsHeading: "Why use this for batch flip workflows?",
    benefitsIntro:
      "Many batch flip tools upload entire folders before any edit. Pix-8 keeps processing local — the practical fit when you need a ",
    benefitsKeyword: "batch flip photos tool",
    benefitsIntroAfter:
      " in a private, file-by-file workflow without sending photo sets off-device.",
    benefits: [
      {
        title: "Client-side by default",
        body: "Every photo is read and flipped locally in your browser tab. Your files never touch a cloud server.",
      },
      {
        title: "Consistent flip steps",
        body: "Apply horizontal or vertical flips per file, preview output dimensions, then export before moving to the next photo.",
      },
      {
        title: "Practical batch sequence",
        body: "Work through many photos quickly in sequence with copy/download export and optional EXIF stripping on each output.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Rotate & Flip",
        body: "Navigate to Pix-8 Rotate & Flip in your browser — no install, no account, and no upload queue.",
      },
      {
        title: "Flip each photo in sequence",
        body: "Load one file, flip horizontally or vertically, and confirm the result. Processing runs on-device.",
      },
      {
        title: "Export and repeat",
        body: "Download or copy the result, then load the next photo in your set and repeat the same local workflow.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to run a private batch flip workflow?",
      body: "Open Rotate & Flip and process your photo set one-by-one — local, fast, and fully client-side.",
      button: "Open Rotate & Flip",
    },
  },
  "client-side-image-rotator": {
    eyebrow: "Client-side · On-device · No upload",
    titleMain: "Client-Side Image Rotator",
    titleAccent: "Your Browser, Your Pixels",
    heroSubtitle:
      "Rotate images client-side in your browser — no upload, no account, no cloud processing queue. Your file is read on-device, transforms are applied on a canvas in your tab, and you export without sending pixels to a server.",
    primaryCta: "Rotate Client-Side — Free",
    ctaNote: "No upload · No server · Browser canvas",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Rotate where the file already lives",
      body: "Rotate & Flip reads your image locally and applies transforms on a client-side canvas — not a cloud pipeline that ingests your file first. Rotate 90° clockwise or counter-clockwise, flip horizontally or vertically, preview output dimensions, then download or copy. It does not include server APIs, cloud storage, batch queues, or arbitrary-angle rotation.",
    },
    benefitsHeading: "Why use a client-side image rotator?",
    benefitsIntro:
      "Cloud tools route every file through a remote server before export. Pix-8 keeps processing in the browser tab — the direct architecture when you need a ",
    benefitsKeyword: "client-side image rotator",
    benefitsIntroAfter:
      " that never uploads your pixels for processing.",
    benefits: [
      {
        title: "Browser canvas processing",
        body: "Images are read via the File API and rotated on a canvas in your tab — no server round-trip for pixel operations.",
      },
      {
        title: "No upload workflow",
        body: "Your file stays on your device from load to export. Pix-8 does not receive your image data.",
      },
      {
        title: "Full orientation toolkit",
        body: "90° clockwise and counter-clockwise rotation, horizontal and vertical flips, live output-size preview, and optional EXIF stripping before download or copy.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Rotate & Flip in your browser",
        body: "Navigate to Pix-8 Rotate & Flip — no install, no account, and no upload step.",
      },
      {
        title: "Load and rotate on-device",
        body: "Select an image locally, apply 90° rotation or horizontal/vertical flips, and preview output dimensions. Processing runs on a client-side canvas in your browser tab.",
      },
      {
        title: "Export from your machine",
        body: "Download or copy the oriented file — processed entirely client-side on your device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to rotate client-side?",
      body: "Open Rotate & Flip, load your image locally, and export — entirely in your browser tab.",
      button: "Open Rotate & Flip",
    },
  },
  "no-upload-photo-flip-tool": {
    eyebrow: "No upload · Client-side · On-device",
    titleMain: "No-Upload Photo Flip Tool",
    titleAccent: "Private Browser Flipping",
    heroSubtitle:
      "Flip photos without uploading in your browser — no account, no cloud queue, no server processing step. Your file is read on-device, transformed on a canvas in your tab, and exported locally.",
    primaryCta: "Flip Without Upload — Free",
    ctaNote: "No upload · No server · Browser canvas",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Flip before your file ever leaves the device",
      body: "Rotate & Flip applies horizontal and vertical flips on a client-side canvas — not a cloud API that ingests your image first. You can combine flips with 90° clockwise or counter-clockwise rotation, preview output dimensions, then download or copy locally. It does not include cloud storage sync, server APIs, arbitrary-angle transforms, or multi-file batch automation.",
    },
    benefitsHeading: "Why use a no-upload photo flip tool?",
    benefitsIntro:
      "Many editors require a cloud upload before any transform appears. Pix-8 keeps the full workflow local — the direct architecture when you need a ",
    benefitsKeyword: "no-upload photo flip tool",
    benefitsIntroAfter:
      " that stays private from load to export.",
    benefits: [
      {
        title: "True no-upload workflow",
        body: "Your photo is processed on-device in your browser tab. Pix-8 does not receive your pixel data.",
      },
      {
        title: "Horizontal and vertical control",
        body: "Apply the exact flip direction you need, combine with 90° rotation, and confirm output dimensions before export.",
      },
      {
        title: "Clean local export",
        body: "Download or copy in one client-side pass, with optional EXIF stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Rotate & Flip",
        body: "Navigate to Pix-8 Rotate & Flip in your browser — no install, no account, and no upload dialog.",
      },
      {
        title: "Load and flip on-device",
        body: "Select a photo locally, flip horizontal or vertical, and optionally rotate 90° for final orientation.",
      },
      {
        title: "Export locally",
        body: "Download or copy the result from your machine — processed entirely client-side.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to flip photos with zero upload steps?",
      body: "Open Rotate & Flip, apply the flip you need, and export privately from your browser tab.",
      button: "Open Rotate & Flip",
    },
  },
  "private-browser-image-mirror": {
    eyebrow: "Private · Browser · No upload",
    titleMain: "Private Browser Image Mirror",
    titleAccent: "On-Device Reflection",
    heroSubtitle:
      "Mirror images privately in your browser — no upload, no account, no cloud processing queue. Your file is read on-device, reflected on a client-side canvas in your tab, and exported without sending pixels to a server.",
    primaryCta: "Mirror Privately — Free",
    ctaNote: "No upload · No server · Browser canvas",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Reflection without cloud ingestion",
      body: "Rotate & Flip mirrors images with a horizontal flip on a client-side canvas — not a cloud editor that ingests your file first. You can combine with vertical flip or 90° rotation, preview output dimensions, then download or copy locally. It does not include server APIs, cloud storage sync, free-form warp, or batch automation.",
    },
    benefitsHeading: "Why use a private browser image mirror?",
    benefitsIntro:
      "Cloud mirror tools route every file through a remote server before export. Pix-8 keeps reflection local — the direct architecture when you need a ",
    benefitsKeyword: "private browser image mirror",
    benefitsIntroAfter:
      " that never uploads your pixels for processing.",
    benefits: [
      {
        title: "Private by default",
        body: "Your image is processed on-device in your browser tab. Pix-8 does not receive your pixel data.",
      },
      {
        title: "Precise mirror control",
        body: "Apply a horizontal flip for left-to-right reflection, add vertical flip or 90° rotation when needed, and preview output dimensions before export.",
      },
      {
        title: "Local export path",
        body: "Download or copy in one client-side pass, with optional EXIF stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Rotate & Flip",
        body: "Navigate to Pix-8 Rotate & Flip in your browser — no install, no account, and no upload step.",
      },
      {
        title: "Mirror on-device",
        body: "Load an image locally and apply a horizontal flip for mirror reflection. Processing runs on a client-side canvas in your browser tab.",
      },
      {
        title: "Export privately",
        body: "Download or copy the mirrored image from your machine — processed entirely client-side.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to mirror images in a private browser workflow?",
      body: "Open Rotate & Flip, load your image locally, and export the reflection you need — entirely on your device.",
      button: "Open Rotate & Flip",
    },
  },
  "secure-image-rotation-online": {
    eyebrow: "Secure · Client-side · No upload",
    titleMain: "Secure Image Rotation Online",
    titleAccent: "Private On-Device Orientation",
    heroSubtitle:
      "Rotate images securely online in your browser — no upload, no account, no cloud queue. Your file is read on-device, transformed on a client-side canvas, and exported without sending pixels to a server.",
    primaryCta: "Rotate Securely — Free",
    ctaNote: "No upload · No server · Browser canvas",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Secure rotation without cloud ingestion",
      body: "Rotate & Flip applies 90° clockwise or counter-clockwise turns on a client-side canvas — not a cloud service that ingests your file first. You can preview output dimensions, then download or copy locally. Optional EXIF stripping helps remove metadata before export. It does not include arbitrary-angle rotation, server APIs, cloud storage sync, or compliance certification guarantees.",
    },
    benefitsHeading: "Why use secure image rotation online?",
    benefitsIntro:
      "Many online rotators route files through remote servers before export. Pix-8 keeps orientation correction local — the practical architecture when you need ",
    benefitsKeyword: "secure image rotation online",
    benefitsIntroAfter:
      " with client-side processing from load to export.",
    benefits: [
      {
        title: "Client-side security posture",
        body: "Your file stays in your browser tab. Pixel data is processed on-device and not uploaded to Pix-8.",
      },
      {
        title: "Controlled 90° rotation",
        body: "Apply clockwise or counter-clockwise quarter-turns, verify output dimensions, and keep transforms deterministic.",
      },
      {
        title: "Metadata-aware export",
        body: "Download or copy locally, with optional EXIF stripping before sharing.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Rotate & Flip",
        body: "Navigate to Pix-8 Rotate & Flip in your browser — no install, no account, and no upload step.",
      },
      {
        title: "Rotate on-device",
        body: "Load your image locally and apply 90° clockwise or counter-clockwise rotation on a client-side canvas.",
      },
      {
        title: "Export privately",
        body: "Download or copy the result from your machine — local workflow end-to-end.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for secure rotation without upload?",
      body: "Open Rotate & Flip, rotate your image, and export privately from your browser tab.",
      button: "Open Rotate & Flip",
    },
  },
};
