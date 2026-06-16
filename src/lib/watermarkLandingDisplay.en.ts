import type {
  WatermarkLandingChrome,
  WatermarkLandingDisplayFields,
} from "@/lib/watermarkLandingTypes";
import type { WatermarkLandingId } from "@/lib/watermarkLandings";

export const WATERMARK_LANDING_CHROME_EN: WatermarkLandingChrome = {
  privacyNote:
    "Client-side processing only — your images never leave the browser.",
  relatedUseCasesHeading: "Related use cases",
  guidesHeading: "Guides",
  toolCardTitle: "Watermark tool",
  toolCardExcerpt:
    "Open the workspace — place your logo locally and export in seconds.",
};

export const WATERMARK_LANDING_DISPLAY_EN: Record<
  WatermarkLandingId,
  Omit<WatermarkLandingDisplayFields, "capabilities">
> = {
  "add-logo-to-image-online": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Add Logo to Image Online",
    titleAccent: "Brand Photos in the Browser",
    heroSubtitle:
      "Add a logo to image online in your browser — no upload, no account, no cloud queue. Load your photo and logo file locally, set opacity and position on-device, and export without sending your files to a server.",
    primaryCta: "Add Logo — Free",
    ctaNote: "No upload · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Place your logo file — not preset graphics",
      body: "Pix-8 Watermark loads your own logo or mark image and composites it onto your base photo on a client-side canvas — not a cloud editor that ingests files first. Adjust opacity, scale, and one of nine position presets, then download or copy one flattened image. It does not use decorative preset overlays (see Image Overlay), typed text blocks (see Text Overlay), or free-drag placement.",
    },
    benefitsHeading: "Why add a logo to images online in the browser?",
    benefitsIntro:
      "Cloud branding tools route every file through a remote server before you see a result. Pix-8 Watermark processes locally — the practical fit when you need to ",
    benefitsKeyword: "add logo to image online",
    benefitsIntroAfter:
      " without sending client proofs, product shots, or campaign assets off-device.",
    benefits: [
      {
        title: "Client-side by default",
        body: "Your base photo and logo file are composited on a local canvas in the browser. Pix-8 never receives your pixel data.",
      },
      {
        title: "Logo controls that matter",
        body: "Tune opacity and scale, then snap the mark to a corner, edge, or center preset before you export a branded image.",
      },
      {
        title: "Share-ready export",
        body: "Download or copy one watermarked file, with optional EXIF metadata stripping before you send or post.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Watermark",
        body: "Navigate to Pix-8 Watermark in your browser — no install, no account, and no server upload step.",
      },
      {
        title: "Load photo and logo",
        body: "Open your base image and logo file locally. Adjust opacity, scale, and position preset on-device in your browser tab.",
      },
      {
        title: "Download or copy",
        body: "Export the watermarked image to your device or copy to clipboard — ready for proofs, social posts, or client delivery.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to add your logo without uploading?",
      body: "Open Watermark, load your photo and logo file, and export a branded image — privately, entirely on your device.",
      button: "Open Watermark",
    },
  },
  "add-watermark-to-photos-online": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Add Watermark to Photos Online",
    titleAccent: "Brand Proofs in the Browser",
    heroSubtitle:
      "Add watermark to photos online in your browser — no upload, no account, no cloud queue. Load your photo and watermark image locally, set opacity and position on-device, and export without sending files to a server.",
    primaryCta: "Watermark Photos — Free",
    ctaNote: "No upload · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Image-file watermarks — not typed text",
      body: "Pix-8 Watermark loads your logo or mark image and composites it onto each photo on a client-side canvas — not a cloud editor that ingests files first. Adjust opacity, scale, and one of nine position presets, then download or copy one flattened image. For typed watermark text with font controls, use Pix-8 Text Overlay. It does not tile marks, batch-process folders, or apply free-drag placement.",
    },
    benefitsHeading: "Why watermark photos online in the browser?",
    benefitsIntro:
      "Cloud watermark tools route every file through a remote server before export. Pix-8 Watermark processes locally — the practical fit when you need to ",
    benefitsKeyword: "add watermark to photos online",
    benefitsIntroAfter:
      " for client proofs, portfolio samples, or social posts without sending assets off-device.",
    benefits: [
      {
        title: "Local processing",
        body: "Your photo and watermark image are composited on a canvas in the browser tab. Pix-8 never receives your pixel data.",
      },
      {
        title: "Consistent mark placement",
        body: "Set opacity and scale once, snap the watermark to a corner, edge, or center preset, and export a branded photo.",
      },
      {
        title: "Proof-ready export",
        body: "Download or copy one watermarked file per session, with optional EXIF metadata stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Watermark",
        body: "Navigate to Pix-8 Watermark in your browser — no install, no account, and no upload dialog.",
      },
      {
        title: "Load photo and mark",
        body: "Open your base photo and watermark image file locally. Tune opacity, scale, and position preset on-device in your browser tab.",
      },
      {
        title: "Export watermarked photo",
        body: "Download or copy the branded image to your device — ready to send as a proof or post immediately.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to watermark photos without uploading?",
      body: "Open Watermark, load your photo and mark image, and export a branded file — privately, entirely on your device.",
      button: "Open Watermark",
    },
  },
  "brand-photos-with-logo": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Brand Photos with Logo",
    titleAccent: "On-Device Branding",
    heroSubtitle:
      "Brand photos with logo in your browser — no upload, no account, no cloud queue. Load your photo and logo file locally, set opacity and position on-device, and export a branded image without sending files to a server.",
    primaryCta: "Brand Photos — Free",
    ctaNote: "No upload · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Your logo file on your photo — not preset graphics",
      body: "Pix-8 Watermark loads your own logo or mark image and composites it onto a base photo on a client-side canvas — not a cloud editor that ingests files first. Adjust opacity, scale, and one of nine position presets, then download or copy one flattened branded image. It does not design logos, add typed text blocks, or apply free-drag placement.",
    },
    benefitsHeading: "Why brand photos with logo in the browser?",
    benefitsIntro:
      "Cloud branding tools route every file through a remote server before export. Pix-8 Watermark processes locally — the practical fit when you need to ",
    benefitsKeyword: "brand photos with logo",
    benefitsIntroAfter:
      " for social posts, portfolio samples, or client deliverables without sending assets off-device.",
    benefits: [
      {
        title: "Private by design",
        body: "Your photo and logo file are composited on a canvas in the browser tab. Pix-8 never receives your pixel data.",
      },
      {
        title: "Controlled logo placement",
        body: "Tune opacity and scale, then snap your mark to a corner, edge, or center preset for consistent branded output.",
      },
      {
        title: "Ready to share",
        body: "Download or copy one branded file per session, with optional EXIF metadata stripping before you post or deliver.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Watermark",
        body: "Navigate to Pix-8 Watermark in your browser — no install, no account, and no upload dialog.",
      },
      {
        title: "Load photo and logo",
        body: "Open your base image and logo file locally. Adjust opacity, scale, and position preset on-device in your browser tab.",
      },
      {
        title: "Export branded photo",
        body: "Download or copy the branded image to your device — ready for social, portfolio, or client delivery.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to brand photos without uploading?",
      body: "Open Watermark, load your photo and logo file, and export a branded image — privately, entirely on your device.",
      button: "Open Watermark",
    },
  },
  "no-upload-watermark-maker": {
    eyebrow: "No upload · Client-side · Private",
    titleMain: "No-Upload Watermark Maker",
    titleAccent: "On-Device Proof Marks",
    heroSubtitle:
      "Use a no-upload watermark maker in your browser — no server, no account, no cloud queue. Load your photo and watermark image file locally, set opacity and position on-device, and export without transmitting pixels to a remote server.",
    primaryCta: "Watermark — Free",
    ctaNote: "No upload · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Watermark without a cloud upload step",
      body: "Pix-8 Watermark loads your base photo and logo or mark image file locally, then composites them on a client-side canvas in the browser — not a cloud watermark maker that ingests your files first. Adjust opacity, scale, and one of nine position presets, then download or copy one flattened image. It does not generate marks, add typed text blocks, or apply free-drag placement.",
    },
    benefitsHeading: "Why use a no-upload watermark maker?",
    benefitsIntro:
      "Cloud watermark tools route every file through a remote server before export. Pix-8 processes locally — the practical fit when you need a ",
    benefitsKeyword: "no-upload watermark maker",
    benefitsIntroAfter:
      " for client proofs, portfolio samples, or social posts without sending assets off-device.",
    benefits: [
      {
        title: "Zero upload pipeline",
        body: "Your photo and watermark file are read from your device and composited in the browser tab. Pix-8 never receives your pixel data.",
      },
      {
        title: "Controlled mark placement",
        body: "Tune opacity and scale, then snap your logo or mark to a corner, edge, or center preset before you export.",
      },
      {
        title: "Private export",
        body: "Download or copy one watermarked file per session, with optional EXIF metadata stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Watermark",
        body: "Navigate to Pix-8 Watermark in your browser — no install, no account, and no upload dialog.",
      },
      {
        title: "Load files locally",
        body: "Open your base photo and watermark image file from your device. Adjust opacity, scale, and position preset on-device in your browser tab.",
      },
      {
        title: "Export without uploading",
        body: "Download or copy the watermarked image from your device — ready to send as a proof or post immediately.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to watermark without uploading?",
      body: "Open Watermark, load your photo and mark image, and export privately — entirely on your device.",
      button: "Open Watermark",
    },
  },
  "professional-image-watermarking-tool": {
    eyebrow: "Professional · Client-side · No upload",
    titleMain: "Professional Image Watermarking Tool",
    titleAccent: "Proof-Ready Brand Marks",
    heroSubtitle:
      "Use a professional image watermarking tool in your browser — no upload, no account, no cloud queue. Load your photo and logo or mark file locally, set opacity and position on-device, and export client-ready proofs without sending pixels to a server.",
    primaryCta: "Watermark Images — Free",
    ctaNote: "No upload · No server · Client-side export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Image-file marks for professional delivery",
      body: "Pix-8 Watermark loads your base photo and logo or mark image file locally, then composites them on a client-side canvas in the browser — not a cloud watermark service that ingests files first. Adjust opacity, scale, and one of nine position presets, then download or copy one flattened image. It does not design logos, add typed text blocks, tile marks, or batch-process folders.",
    },
    benefitsHeading: "Why use a professional watermarking tool in the browser?",
    benefitsIntro:
      "Enterprise watermark platforms often route every file through remote infrastructure. Pix-8 processes locally — the practical fit when you need a ",
    benefitsKeyword: "professional image watermarking tool",
    benefitsIntroAfter:
      " for client proofs, portfolio samples, or campaign deliverables without transmitting assets off-device.",
    benefits: [
      {
        title: "Client-side by default",
        body: "Your photo and watermark file are composited on a canvas in the browser tab. Pix-8 never receives your pixel data.",
      },
      {
        title: "Consistent mark placement",
        body: "Set opacity and scale once, snap the mark to a corner, edge, or center preset, and export a branded file ready for review.",
      },
      {
        title: "Delivery-ready export",
        body: "Download or copy one watermarked file per session, with optional EXIF metadata stripping before you send to clients or post.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Watermark",
        body: "Navigate to Pix-8 Watermark in your browser — no install, no account, and no server upload step.",
      },
      {
        title: "Load photo and mark",
        body: "Open your base image and watermark image file locally. Adjust opacity, scale, and position preset on-device in your browser tab.",
      },
      {
        title: "Export proof-ready file",
        body: "Download or copy the watermarked image from your device — ready for client delivery or portfolio use.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for professional watermarking without uploading?",
      body: "Open Watermark, load your photo and mark file, and export a branded proof — privately, entirely on your device.",
      button: "Open Watermark",
    },
  },
};
