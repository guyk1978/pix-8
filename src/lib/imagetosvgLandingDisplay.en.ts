import type {
  ImageToSvgLandingChrome,
  ImageToSvgLandingDisplayFields,
} from "@/lib/imagetosvgLandingTypes";
import type { ImageToSvgLandingId } from "@/lib/imagetosvgLandings";

export const IMAGE_TO_SVG_LANDING_CHROME_EN: ImageToSvgLandingChrome = {
  privacyNote:
    "Client-side processing only — your image never leaves the browser.",
  relatedUseCasesHeading: "Related use cases",
  guidesHeading: "Guides",
  toolCardTitle: "Image to SVG Converter",
  toolCardExcerpt:
    "Open the workspace — trace raster images to vectors locally in seconds.",
};

export const IMAGE_TO_SVG_LANDING_DISPLAY_EN: Record<
  ImageToSvgLandingId,
  Omit<ImageToSvgLandingDisplayFields, "capabilities">
> = {
  "image-to-svg-converter-online": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Image to SVG converter online",
    titleAccent: "raster to vector in the browser",
    heroSubtitle:
      "Use an image to SVG converter online in your browser — no upload, no account, no cloud queue. Load a PNG or JPEG locally, trace it to scalable SVG with color, grayscale, or black-and-white modes, tune path complexity, preview the result, then download or copy the markup — all processed on-device without sending your file to a server.",
    primaryCta: "Convert images — Free",
    ctaNote: "No upload · No server · SVG on-device",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Browser tracing — not a cloud vectorization service",
      body: "Pix-8 Image to SVG Converter reads your raster file locally and traces paths in the browser — not a remote pipeline that ingests uploads first. Adjust complexity, pick a color mode, optionally simplify paths, review the live preview, then download or copy SVG output. It does not batch-convert folders, edit existing SVG source files, or match dedicated desktop illustration tools on every asset type.",
    },
    benefitsHeading: "Why use an image to SVG converter online in the browser?",
    benefitsIntro:
      "Cloud converters route every file through a remote server before you see vector output. Pix-8 processes locally — the practical fit when you need an ",
    benefitsKeyword: "image to SVG converter online",
    benefitsIntroAfter:
      " for logos, icons, and simple graphics without moving source files off-device.",
    benefits: [
      {
        title: "Client-side by default",
        body: "Your image is read from your device and traced in the browser tab. Pix-8 never receives your pixel data during preview, download, or copy.",
      },
      {
        title: "Tracing controls you can tune",
        body: "Choose color, grayscale, or black-and-white output, adjust path complexity, and optionally simplify paths before you commit to a download.",
      },
      {
        title: "Preview before export",
        body: "Review the traced SVG in the workspace, then download the file or copy the markup — no server round-trip between trace and export.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image to SVG Converter",
        body: "Navigate to Pix-8 Image to SVG Converter in your browser — no install, no account, and no upload dialog before you trace.",
      },
      {
        title: "Load and trace locally",
        body: "Choose a PNG or JPEG from your device. Set color mode, complexity, and path simplification, then let the browser trace the image on-device.",
      },
      {
        title: "Download or copy SVG",
        body: "Confirm the live preview, then download the SVG file or copy the markup to your clipboard — ready for code, design tools, or the web.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to convert images to SVG without uploading?",
      body: "Open Image to SVG Converter, load a local file, and export scalable vector output — privately, entirely on-device.",
      button: "Open Image to SVG Converter",
    },
  },
  "convert-image-to-vector": {
    eyebrow: "Vector · Client-side · No upload",
    titleMain: "Convert image to vector",
    titleAccent: "scalable paths in the browser",
    heroSubtitle:
      "Convert image to vector in your browser — no upload, no account, no cloud queue. Load a PNG or JPEG locally, trace raster pixels into scalable SVG paths with color, grayscale, or black-and-white modes, tune complexity and path simplification, preview the vector output, then download or copy — all processed on-device without sending your file to a server.",
    primaryCta: "Convert to vector — Free",
    ctaNote: "No upload · No server · Vector on-device",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Raster-to-vector tracing — not a hosted conversion API",
      body: "Pix-8 Image to SVG Converter traces your image into SVG path data in the browser — not a remote service that stores uploads before vectorization. Pick a color mode, adjust how much detail is preserved, optionally simplify paths, and review the preview before export. It outputs SVG vector markup from local PNG or JPEG files; it does not produce EPS or AI files, batch-process directories, or replace manual redrawing in professional illustration software.",
    },
    benefitsHeading: "Why convert image to vector in the browser?",
    benefitsIntro:
      "Hosted vector converters usually require uploading your source before you see path output. Pix-8 keeps tracing local — the practical fit when you need to ",
    benefitsKeyword: "convert image to vector",
    benefitsIntroAfter:
      " for logos, icons, and simple artwork without routing originals through a third-party server.",
    benefits: [
      {
        title: "Vectors without cloud upload",
        body: "Your raster file is read and traced in the browser tab. Pix-8 never receives your pixel data during preview, download, or copy.",
      },
      {
        title: "Controls for trace quality",
        body: "Choose color, grayscale, or black-and-white output, adjust path complexity, and optionally simplify paths to manage file size before you export SVG.",
      },
      {
        title: "Scalable SVG export",
        body: "Download traced vector markup or copy it to your clipboard — ready for the web, design tools, or code that expects resolution-independent graphics.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image to SVG Converter",
        body: "Navigate to Pix-8 Image to SVG Converter in your browser — no install, no account, and no upload step before vectorization begins.",
      },
      {
        title: "Trace the image on-device",
        body: "Load a PNG or JPEG from your device. Select a tracing mode, set complexity and path simplification, and let the browser build vector paths locally.",
      },
      {
        title: "Export scalable vector output",
        body: "Review the live preview, then download the SVG file or copy the markup — your converted vector stays on-device until you choose to export it.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to convert a raster image to vector paths?",
      body: "Open Image to SVG Converter, load a local file, and export scalable SVG — privately, entirely on-device.",
      button: "Open Image to SVG Converter",
    },
  },
  "png-to-svg-converter": {
    eyebrow: "PNG · Client-side · No upload",
    titleMain: "PNG to SVG converter",
    titleAccent: "trace PNG to scalable paths",
    heroSubtitle:
      "Use a PNG to SVG converter in your browser — no upload, no account, no cloud queue. Load a PNG file locally, trace it into scalable SVG with color, grayscale, or black-and-white modes, tune path complexity and simplification, preview the result, then download or copy the markup — all processed on-device without sending your file to a server.",
    primaryCta: "Convert PNG — Free",
    ctaNote: "No upload · No server · SVG on-device",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "PNG tracing in the browser — not a cloud file converter",
      body: "Pix-8 Image to SVG Converter reads your PNG locally and traces it into SVG path data in the browser — not a remote service that stores uploads before conversion. Adjust complexity, pick a color mode, optionally simplify paths, and review the live preview before export. JPEG files are also supported; the tool does not batch-convert folders, resize PNGs before tracing, or output formats other than SVG.",
    },
    benefitsHeading: "Why use a PNG to SVG converter in the browser?",
    benefitsIntro:
      "Cloud PNG converters route every file through a remote server before you see SVG output. Pix-8 processes locally — the practical fit when you need a ",
    benefitsKeyword: "PNG to SVG converter",
    benefitsIntroAfter:
      " for logos, icons, and UI assets without moving source files off-device.",
    benefits: [
      {
        title: "PNG stays on your device",
        body: "Your PNG is read and traced in the browser tab. Pix-8 never receives your pixel data during preview, download, or copy.",
      },
      {
        title: "Tracing tuned for PNG artwork",
        body: "Choose color, grayscale, or black-and-white output, adjust path complexity, and optionally simplify paths — then confirm results in the live preview before export.",
      },
      {
        title: "Scalable SVG from PNG",
        body: "Download traced SVG markup or copy it to your clipboard — ready for the web, design tools, or code that needs resolution-independent graphics.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image to SVG Converter",
        body: "Navigate to Pix-8 Image to SVG Converter in your browser — no install, no account, and no upload dialog before you convert PNG to SVG.",
      },
      {
        title: "Load your PNG locally",
        body: "Choose a PNG file from your device. Set color mode, complexity, and path simplification, then let the browser trace the image on-device.",
      },
      {
        title: "Download or copy SVG",
        body: "Review the live preview, then download the SVG file or copy the markup — your converted output stays local until you export it.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to convert PNG to SVG without uploading?",
      body: "Open Image to SVG Converter, load a local PNG, and export scalable SVG — privately, entirely on-device.",
      button: "Open Image to SVG Converter",
    },
  },
  "jpg-to-svg-online": {
    eyebrow: "JPG · Online · No upload",
    titleMain: "JPG to SVG online",
    titleAccent: "trace JPEG to scalable paths",
    heroSubtitle:
      "Convert JPG to SVG online in your browser — no upload, no account, no cloud queue. Load a JPEG file locally, trace it into scalable SVG with color, grayscale, or black-and-white modes, tune path complexity and simplification, preview the result, then download or copy the markup — all processed on-device without sending your photo to a server.",
    primaryCta: "Convert JPG — Free",
    ctaNote: "No upload · No server · SVG on-device",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Online JPG tracing — not a hosted photo converter",
      body: "Pix-8 Image to SVG Converter reads your JPEG locally and traces it into SVG path data in the browser — not a remote service that ingests uploads before conversion. Adjust complexity, pick a color mode, optionally simplify paths, and review the live preview before export. PNG files are also accepted; the tool does not batch-convert folders, repair JPEG artifacts, or output formats other than SVG.",
    },
    benefitsHeading: "Why convert JPG to SVG online in the browser?",
    benefitsIntro:
      "Hosted JPG converters route every file through a remote server before you see vector output. Pix-8 processes locally — the practical fit when you need ",
    benefitsKeyword: "JPG to SVG online",
    benefitsIntroAfter:
      " for logos, icons, and simple graphics without moving source photos off-device.",
    benefits: [
      {
        title: "JPEG stays on your device",
        body: "Your JPG is read and traced in the browser tab. Pix-8 never receives your pixel data during preview, download, or copy.",
      },
      {
        title: "Tracing controls before export",
        body: "Choose color, grayscale, or black-and-white output, adjust path complexity, and optionally simplify paths — then confirm results in the live preview.",
      },
      {
        title: "Scalable SVG from JPG",
        body: "Download traced SVG markup or copy it to your clipboard — ready for the web, design tools, or code that needs resolution-independent graphics.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image to SVG Converter",
        body: "Navigate to Pix-8 Image to SVG Converter in your browser — no install, no account, and no upload dialog before you convert JPG to SVG online.",
      },
      {
        title: "Load your JPEG locally",
        body: "Choose a .jpg or .jpeg file from your device. Set color mode, complexity, and path simplification, then let the browser trace the image on-device.",
      },
      {
        title: "Download or copy SVG",
        body: "Review the live preview, then download the SVG file or copy the markup — your converted output stays local until you export it.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to convert JPG to SVG online without uploading?",
      body: "Open Image to SVG Converter, load a local JPEG, and export scalable SVG — privately, entirely on-device.",
      button: "Open Image to SVG Converter",
    },
  },
  "vectorize-image-online": {
    eyebrow: "Vectorize · Online · No upload",
    titleMain: "Vectorize image online",
    titleAccent: "raster to paths in the browser",
    heroSubtitle:
      "Vectorize image online in your browser — no upload, no account, no cloud queue. Load a PNG or JPEG locally, trace raster pixels into scalable SVG paths with color, grayscale, or black-and-white modes, tune complexity and path simplification, preview the vector output, then download or copy — all processed on-device without sending your file to a server.",
    primaryCta: "Vectorize images — Free",
    ctaNote: "No upload · No server · On-device tracing",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Online vectorization in the browser — not a cloud trace farm",
      body: "Pix-8 Image to SVG Converter vectorizes your raster file by tracing paths locally in the browser — not a remote service that queues uploads before processing. Adjust complexity, pick a color mode, optionally simplify paths, and review the live preview before export. It outputs SVG from PNG or JPEG sources; it does not batch-vectorize folders, edit existing vector files, or match dedicated desktop illustration tools on every asset.",
    },
    benefitsHeading: "Why vectorize image online in the browser?",
    benefitsIntro:
      "Cloud vectorization tools route every raster through a remote server before you see path output. Pix-8 keeps tracing local — the practical fit when you need to ",
    benefitsKeyword: "vectorize image online",
    benefitsIntroAfter:
      " for logos, icons, and simple artwork without moving source files off-device.",
    benefits: [
      {
        title: "Vectorize without cloud upload",
        body: "Your image is read and traced in the browser tab. Pix-8 never receives your pixel data during preview, download, or copy.",
      },
      {
        title: "Trace settings you control",
        body: "Choose color, grayscale, or black-and-white output, adjust path complexity, and optionally simplify paths before you commit to a vector export.",
      },
      {
        title: "Preview then export SVG",
        body: "Review traced paths in the live preview, then download the SVG file or copy the markup — ready for scalable use on the web or in design workflows.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image to SVG Converter",
        body: "Navigate to Pix-8 Image to SVG Converter in your browser — no install, no account, and no upload dialog before you vectorize image online.",
      },
      {
        title: "Trace the raster on-device",
        body: "Load a PNG or JPEG from your device. Set color mode, complexity, and path simplification, then let the browser build vector paths locally.",
      },
      {
        title: "Download or copy vector output",
        body: "Confirm the live preview, then download the SVG file or copy the markup — your vectorized output stays on-device until you export it.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to vectorize an image without uploading?",
      body: "Open Image to SVG Converter, load a local raster file, and export scalable SVG — privately, entirely on-device.",
      button: "Open Image to SVG Converter",
    },
  },
  "free-image-to-vector-converter": {
    eyebrow: "Free · Client-side · No upload",
    titleMain: "Free image to vector converter",
    titleAccent: "trace raster to SVG at no cost",
    heroSubtitle:
      "Use a free image to vector converter in your browser — no subscription, no credit card, no upload queue. Load a PNG or JPEG locally, trace it into scalable SVG with color, grayscale, or black-and-white modes, tune path complexity and simplification, preview the result, then download or copy — all processed on-device without sending your file to a server.",
    primaryCta: "Convert to vector — Free",
    ctaNote: "No cost · No server · On-device tracing",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Free tracing in the browser — not a freemium cloud converter",
      body: "Pix-8 Image to SVG Converter is free to open and traces your raster file locally in the browser — not a remote service with upload quotas or watermarked exports. Adjust complexity, pick a color mode, optionally simplify paths, and review the live preview before download. It does not batch-convert folders, charge per export, or output formats other than SVG.",
    },
    benefitsHeading: "Why use a free image to vector converter in the browser?",
    benefitsIntro:
      "Freemium vector converters often gate exports behind accounts or route files through paid cloud tiers. Pix-8 is free and local — the practical fit when you need a ",
    benefitsKeyword: "free image to vector converter",
    benefitsIntroAfter:
      " for logos, icons, and simple graphics without subscriptions or server uploads.",
    benefits: [
      {
        title: "No cost, no account",
        body: "Open the tool and trace immediately. No subscription, no credit card, and no sign-up step before you convert raster to vector.",
      },
      {
        title: "Client-side by default",
        body: "Your image is read from your device and traced in the browser tab. Pix-8 never receives your pixel data during preview, download, or copy.",
      },
      {
        title: "Full tracing controls included",
        body: "Color, grayscale, and black-and-white modes, path complexity slider, optional simplification, live preview, and SVG download or copy — included at no charge.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image to SVG Converter",
        body: "Navigate to Pix-8 Image to SVG Converter in your browser — free to use, no install, and no upload dialog before you trace.",
      },
      {
        title: "Load and trace locally",
        body: "Choose a PNG or JPEG from your device. Set color mode, complexity, and path simplification, then let the browser trace the image on-device.",
      },
      {
        title: "Download or copy SVG",
        body: "Review the live preview, then download the SVG file or copy the markup — free export, entirely on-device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to convert image to vector for free?",
      body: "Open Image to SVG Converter, load a local file, and export scalable SVG — privately, at no cost, entirely on-device.",
      button: "Open Image to SVG Converter",
    },
  },
  "svg-trace-online": {
    eyebrow: "Trace · Online · No upload",
    titleMain: "SVG trace online",
    titleAccent: "raster to paths in the browser",
    heroSubtitle:
      "SVG trace online in your browser — no upload, no account, no cloud queue. Load a PNG or JPEG locally, trace raster pixels into scalable SVG paths with color, grayscale, or black-and-white modes, tune path complexity and simplification, preview the traced output, then download or copy — all processed on-device without sending your file to a server.",
    primaryCta: "Trace to SVG — Free",
    ctaNote: "No upload · No server · On-device trace",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Browser-based SVG tracing — not a cloud trace service",
      body: "Pix-8 Image to SVG Converter traces your raster file into SVG path data locally in the browser — not a remote pipeline that ingests uploads before tracing begins. Adjust complexity, pick a color mode, optionally simplify paths, and review the live preview before export. It traces PNG or JPEG sources to SVG output; it does not edit existing SVG files, batch-trace directories, or output formats other than SVG.",
    },
    benefitsHeading: "Why SVG trace online in the browser?",
    benefitsIntro:
      "Cloud trace services route every raster through a remote server before you see SVG paths. Pix-8 processes locally — the practical fit when you need ",
    benefitsKeyword: "SVG trace online",
    benefitsIntroAfter:
      " for logos, icons, and simple artwork without moving source files off-device.",
    benefits: [
      {
        title: "Trace without cloud upload",
        body: "Your image is read and traced in the browser tab. Pix-8 never receives your pixel data during preview, download, or copy.",
      },
      {
        title: "Controls for trace quality",
        body: "Choose color, grayscale, or black-and-white output, adjust path complexity, and optionally simplify paths before you commit to traced SVG export.",
      },
      {
        title: "Preview traced paths first",
        body: "Review the SVG trace in the live preview, then download the file or copy the markup — no server round-trip between trace and export.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image to SVG Converter",
        body: "Navigate to Pix-8 Image to SVG Converter in your browser — no install, no account, and no upload dialog before you SVG trace online.",
      },
      {
        title: "Trace the image on-device",
        body: "Load a PNG or JPEG from your device. Set color mode, complexity, and path simplification, then let the browser build SVG paths locally.",
      },
      {
        title: "Download or copy traced SVG",
        body: "Confirm the live preview, then download the SVG file or copy the markup — your traced output stays on-device until you export it.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to SVG trace online without uploading?",
      body: "Open Image to SVG Converter, load a local raster file, and export traced SVG — privately, entirely on-device.",
      button: "Open Image to SVG Converter",
    },
  },
  "high-quality-vector-converter": {
    eyebrow: "Quality · Control · No upload",
    titleMain: "High-quality vector converter",
    titleAccent: "tune paths before you export",
    heroSubtitle:
      "Use a high-quality vector converter in your browser — no upload, no account, no cloud queue. Load a PNG or JPEG locally, trace raster pixels into scalable SVG paths, tune path complexity and simplification for cleaner output, preview the result in real time, then download or copy — all processed on-device without sending your file to a server.",
    primaryCta: "Convert to vector — Free",
    ctaNote: "No upload · No server · On-device tracing",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Quality controls in the browser — not a black-box cloud converter",
      body: "Pix-8 Image to SVG Converter traces your raster file locally and puts path complexity, color mode, and simplification in your hands — not a remote pipeline that returns vectors you cannot inspect before export. Review the live preview, then download or copy SVG output. It converts PNG or JPEG sources to SVG; it does not batch-convert folders, edit existing vector files, or guarantee illustration-grade results on every complex photograph.",
    },
    benefitsHeading: "Why use a high-quality vector converter in the browser?",
    benefitsIntro:
      "Cloud converters often hide tracing settings behind uploads and opaque processing. Pix-8 keeps quality tuning local — the practical fit when you need a ",
    benefitsKeyword: "high-quality vector converter",
    benefitsIntroAfter:
      " for logos, icons, and simple artwork with preview-before-export and on-device processing.",
    benefits: [
      {
        title: "Tune trace quality locally",
        body: "Adjust path complexity, choose color, grayscale, or black-and-white output, and optionally simplify paths — all before you commit to SVG export, with no server round-trip.",
      },
      {
        title: "Preview paths before export",
        body: "Review traced vector output in the live preview, then download the SVG file or copy the markup — your image never leaves the browser tab during conversion.",
      },
      {
        title: "Client-side by default",
        body: "Your raster file is read and traced on-device. Pix-8 does not receive your pixel data during preview, download, or copy.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image to SVG Converter",
        body: "Navigate to Pix-8 Image to SVG Converter in your browser — no install, no account, and no upload dialog before you convert to vector.",
      },
      {
        title: "Tune tracing settings on-device",
        body: "Load a PNG or JPEG from your device. Set color mode, path complexity, and optional simplification, then let the browser build vector paths locally.",
      },
      {
        title: "Confirm preview, then export SVG",
        body: "Check the live preview for path quality, then download the SVG file or copy the markup — your vector output stays on-device until you export it.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to convert to vector with quality controls?",
      body: "Open Image to SVG Converter, load a local raster file, tune tracing settings, and export scalable SVG — privately, entirely on-device.",
      button: "Open Image to SVG Converter",
    },
  },
  "client-side-image-to-svg-converter": {
    eyebrow: "Client-side · No upload · Browser",
    titleMain: "Client-side image to SVG converter",
    titleAccent: "tracing stays in your browser tab",
    heroSubtitle:
      "Use a client-side image to SVG converter in your browser — no upload, no account, no cloud queue. Load a PNG or JPEG from your device, trace raster pixels into scalable SVG paths with color, grayscale, or black-and-white modes, tune path complexity and simplification, preview the result, then download or copy — all processed on-device without sending your file to a server.",
    primaryCta: "Convert to SVG — Free",
    ctaNote: "Client-side · No server · On-device tracing",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Client-side tracing — not a cloud upload converter",
      body: "Pix-8 Image to SVG Converter runs tracing logic in your browser tab — not on a remote server that ingests files before processing. Adjust complexity, pick a color mode, optionally simplify paths, and review the live preview before export. It converts PNG or JPEG sources to SVG output; it does not batch-convert folders, edit existing SVG files, or output formats other than SVG.",
    },
    benefitsHeading: "Why use a client-side image to SVG converter?",
    benefitsIntro:
      "Cloud converters route every raster through a remote server before you see SVG output. Pix-8 keeps conversion local — the practical fit when you need a ",
    benefitsKeyword: "client-side image to SVG converter",
    benefitsIntroAfter:
      " for logos, icons, and simple graphics without moving source files off-device.",
    benefits: [
      {
        title: "Tracing runs in the browser",
        body: "Your image is read and traced in the browser tab. Pix-8 never receives your pixel data during preview, download, or copy.",
      },
      {
        title: "No upload step before conversion",
        body: "Load a file from your device and trace immediately — no sign-up, no cloud queue, and no server round-trip between load and SVG export.",
      },
      {
        title: "Full tracing controls on-device",
        body: "Color, grayscale, and black-and-white modes, path complexity slider, optional simplification, live preview, and SVG download or copy — all client-side.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image to SVG Converter",
        body: "Navigate to Pix-8 Image to SVG Converter in your browser — no install, no account, and no upload dialog before client-side conversion begins.",
      },
      {
        title: "Trace the image locally",
        body: "Load a PNG or JPEG from your device. Set color mode, complexity, and path simplification, then let the browser build SVG paths on-device.",
      },
      {
        title: "Download or copy SVG",
        body: "Review the live preview, then download the SVG file or copy the markup — your traced output stays client-side until you export it.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for client-side image to SVG conversion?",
      body: "Open Image to SVG Converter, load a local file, and export scalable SVG — privately, entirely in your browser tab.",
      button: "Open Image to SVG Converter",
    },
  },
  "no-upload-vector-converter": {
    eyebrow: "No upload · On-device · Browser",
    titleMain: "No-upload vector converter",
    titleAccent: "trace raster to SVG without a server",
    heroSubtitle:
      "Use a no-upload vector converter in your browser — no account, no cloud queue, no file transfer before tracing begins. Load a PNG or JPEG from your device, trace raster pixels into scalable SVG paths with color, grayscale, or black-and-white modes, tune path complexity and simplification, preview the result, then download or copy — all processed on-device without sending your image to a server.",
    primaryCta: "Convert to vector — Free",
    ctaNote: "No upload · No server · On-device tracing",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Vector conversion without upload — not a cloud trace service",
      body: "Pix-8 Image to SVG Converter traces your raster file locally in the browser — not a remote pipeline that requires uploading before you see vector output. Adjust complexity, pick a color mode, optionally simplify paths, and review the live preview before export. It converts PNG or JPEG sources to SVG; it does not batch-convert folders, edit existing vector files, or replace dedicated desktop vectorization on every complex photograph.",
    },
    benefitsHeading: "Why use a no-upload vector converter?",
    benefitsIntro:
      "Cloud vector converters route every raster through a remote server before tracing begins. Pix-8 keeps conversion local — the practical fit when you need a ",
    benefitsKeyword: "no-upload vector converter",
    benefitsIntroAfter:
      " for logos, icons, and simple artwork without moving source files off-device.",
    benefits: [
      {
        title: "No upload before tracing",
        body: "Load a file from your device and convert to vector immediately — no sign-up step, no cloud queue, and no server ingestion of your raster before SVG export.",
      },
      {
        title: "On-device processing by default",
        body: "Your image is read and traced in the browser tab. Pix-8 never receives your pixel data during preview, download, or copy.",
      },
      {
        title: "Tracing controls included",
        body: "Color, grayscale, and black-and-white modes, path complexity slider, optional simplification, live preview, and SVG download or copy — all without uploading your source file.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image to SVG Converter",
        body: "Navigate to Pix-8 Image to SVG Converter in your browser — no install, no account, and no upload dialog before vector conversion.",
      },
      {
        title: "Load and trace locally",
        body: "Choose a PNG or JPEG from your device. Set color mode, complexity, and path simplification, then let the browser trace the image on-device.",
      },
      {
        title: "Download or copy SVG",
        body: "Review the live preview, then download the SVG file or copy the markup — your vector output stays on-device until you export it.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to convert to vector without uploading?",
      body: "Open Image to SVG Converter, load a local raster file, and export scalable SVG — privately, entirely on-device.",
      button: "Open Image to SVG Converter",
    },
  },
  "privacy-first-svg-generator": {
    eyebrow: "Privacy-first · No upload · Browser",
    titleMain: "Privacy-first SVG generator",
    titleAccent: "trace raster to SVG on-device",
    heroSubtitle:
      "Use a privacy-first SVG generator in your browser — no upload, no account, no cloud queue. Load a PNG or JPEG from your device, trace raster pixels into scalable SVG paths with color, grayscale, or black-and-white modes, tune path complexity and simplification, preview the generated markup, then download or copy — all processed on-device without sending your image to a server.",
    primaryCta: "Generate SVG — Free",
    ctaNote: "Privacy-first · No server · On-device tracing",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Private SVG generation in the browser — not a cloud upload service",
      body: "Pix-8 Image to SVG Converter generates SVG path data from your raster file locally in the browser — not on a remote server that ingests uploads before tracing. Adjust complexity, pick a color mode, optionally simplify paths, and review the live preview before export. It traces PNG or JPEG sources to SVG output; it does not generate SVG from text prompts, batch-process folders, or output formats other than SVG.",
    },
    benefitsHeading: "Why use a privacy-first SVG generator?",
    benefitsIntro:
      "Cloud SVG tools route every raster through a remote server before you see vector output. Pix-8 keeps generation local — the practical fit when you need a ",
    benefitsKeyword: "privacy-first SVG generator",
    benefitsIntroAfter:
      " for logos, icons, and simple artwork without exposing source files to a third party.",
    benefits: [
      {
        title: "Your image stays on-device",
        body: "Tracing runs in the browser tab. Pix-8 never receives your pixel data during preview, download, or copy — no upload step before SVG generation begins.",
      },
      {
        title: "No account or cloud queue",
        body: "Open the tool, load a local file, and generate SVG immediately — no sign-up, no file transfer to a remote pipeline, and no waiting on server-side processing.",
      },
      {
        title: "Full tracing controls included",
        body: "Color, grayscale, and black-and-white modes, path complexity slider, optional simplification, live preview, and SVG download or copy — all client-side.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image to SVG Converter",
        body: "Navigate to Pix-8 Image to SVG Converter in your browser — no install, no account, and no upload dialog before private SVG generation.",
      },
      {
        title: "Trace the image locally",
        body: "Load a PNG or JPEG from your device. Set color mode, complexity, and path simplification, then let the browser generate SVG paths on-device.",
      },
      {
        title: "Download or copy SVG",
        body: "Review the live preview, then download the SVG file or copy the markup — your generated output stays on-device until you export it.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to generate SVG without uploading?",
      body: "Open Image to SVG Converter, load a local raster file, and export scalable SVG — privately, entirely on-device.",
      button: "Open Image to SVG Converter",
    },
  },
  "browser-based-vectorization-tool": {
    eyebrow: "Browser · On-device · No upload",
    titleMain: "Browser-based vectorization tool",
    titleAccent: "trace raster to SVG in your tab",
    heroSubtitle:
      "Use a browser-based vectorization tool — no install, no upload, no account. Load a PNG or JPEG from your device, trace raster pixels into scalable SVG paths with color, grayscale, or black-and-white modes, tune path complexity and simplification, preview the vector output, then download or copy — all processed on-device in your browser tab without sending your file to a server.",
    primaryCta: "Vectorize in browser — Free",
    ctaNote: "No install · No server · On-device tracing",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Vectorization in the browser tab — not a cloud trace service",
      body: "Pix-8 Image to SVG Converter vectorizes your raster file by tracing paths locally in the browser — not on a remote server that requires uploading before processing. Adjust complexity, pick a color mode, optionally simplify paths, and review the live preview before export. It outputs SVG from PNG or JPEG sources; it does not batch-vectorize folders, edit existing vector files, or match dedicated desktop illustration tools on every asset.",
    },
    benefitsHeading: "Why use a browser-based vectorization tool?",
    benefitsIntro:
      "Desktop vectorization suites require installs; cloud tools route every file through a remote server. Pix-8 runs in the browser — the practical fit when you need a ",
    benefitsKeyword: "browser-based vectorization tool",
    benefitsIntroAfter:
      " for logos, icons, and simple artwork without plugins, uploads, or moving source files off-device.",
    benefits: [
      {
        title: "No install — runs in your tab",
        body: "Open Image to SVG Converter in any modern browser. Vectorization runs locally in the tab — no desktop app, no plugin, and no server upload before tracing begins.",
      },
      {
        title: "On-device tracing by default",
        body: "Your image is read and traced in the browser. Pix-8 never receives your pixel data during preview, download, or copy.",
      },
      {
        title: "Tracing controls in the browser",
        body: "Color, grayscale, and black-and-white modes, path complexity slider, optional simplification, live preview, and SVG download or copy — all without leaving the browser tab.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image to SVG Converter",
        body: "Navigate to Pix-8 Image to SVG Converter in your browser — no install, no account, and no upload dialog before browser-based vectorization.",
      },
      {
        title: "Vectorize the raster on-device",
        body: "Load a PNG or JPEG from your device. Set color mode, complexity, and path simplification, then let the browser trace vector paths locally.",
      },
      {
        title: "Download or copy SVG",
        body: "Review the live preview, then download the SVG file or copy the markup — your vectorized output stays on-device until you export it.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to vectorize in the browser without uploading?",
      body: "Open Image to SVG Converter, load a local raster file, and export scalable SVG — privately, entirely in your browser tab.",
      button: "Open Image to SVG Converter",
    },
  },
  "turn-logo-to-svg": {
    eyebrow: "Logo · SVG · No upload",
    titleMain: "Turn logo to SVG",
    titleAccent: "trace raster marks to scalable paths",
    heroSubtitle:
      "Turn logo to SVG in your browser — no upload, no account, no cloud queue. Load a PNG or JPEG logo from your device, trace raster pixels into scalable SVG paths with color, grayscale, or black-and-white modes, tune path complexity and simplification for cleaner edges, preview the traced mark, then download or copy — all processed on-device without sending your logo file to a server.",
    primaryCta: "Trace logo to SVG — Free",
    ctaNote: "No upload · No server · On-device tracing",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Logo tracing in the browser — not a cloud upload converter",
      body: "Pix-8 Image to SVG Converter traces your logo raster locally in the browser — not on a remote server that ingests uploads before tracing. Adjust complexity, pick a color mode, optionally simplify paths, and review the live preview before export. It outputs SVG from PNG or JPEG logo files; it does not open native vector source files, batch-convert logo folders, or replace manual logo redrawing in professional illustration software.",
    },
    benefitsHeading: "Why turn logo to SVG in the browser?",
    benefitsIntro:
      "Cloud logo converters route every raster through a remote server before you see SVG paths. Pix-8 keeps tracing local — the practical fit when you need to ",
    benefitsKeyword: "turn logo to SVG",
    benefitsIntroAfter:
      " for web, app, or print-ready markup without moving brand assets off-device.",
    benefits: [
      {
        title: "Trace logos without cloud upload",
        body: "Your logo file is read and traced in the browser tab. Pix-8 never receives your pixel data during preview, download, or copy.",
      },
      {
        title: "Tune paths for cleaner marks",
        body: "Choose color, grayscale, or black-and-white output, adjust path complexity, and optionally simplify paths — useful for flat logos and icon marks before SVG export.",
      },
      {
        title: "Preview before you commit",
        body: "Review the traced logo in the live preview, then download the SVG file or copy the markup — no server round-trip between trace and export.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image to SVG Converter",
        body: "Navigate to Pix-8 Image to SVG Converter in your browser — no install, no account, and no upload dialog before you turn logo to SVG.",
      },
      {
        title: "Load your logo file locally",
        body: "Choose a PNG or JPEG logo from your device. Set color mode, complexity, and path simplification, then let the browser trace the mark on-device.",
      },
      {
        title: "Download or copy SVG",
        body: "Confirm the live preview, then download the SVG file or copy the markup — your traced logo stays on-device until you export it.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to turn your logo to SVG without uploading?",
      body: "Open Image to SVG Converter, load a local logo file, and export scalable SVG — privately, entirely on-device.",
      button: "Open Image to SVG Converter",
    },
  },
  "convert-pixel-art-to-svg": {
    eyebrow: "Pixel art · SVG · No upload",
    titleMain: "Convert pixel art to SVG",
    titleAccent: "trace sprites to scalable paths",
    heroSubtitle:
      "Convert pixel art to SVG in your browser — no upload, no account, no cloud queue. Load a PNG or JPEG pixel art export from your device, trace raster pixels into scalable SVG paths with color, grayscale, or black-and-white modes, tune path complexity and simplification, preview the traced result, then download or copy — all processed on-device without sending your sprite file to a server.",
    primaryCta: "Trace pixel art — Free",
    ctaNote: "No upload · No server · On-device tracing",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Pixel art tracing in the browser — not a cloud upload converter",
      body: "Pix-8 Image to SVG Converter traces your pixel art raster locally in the browser — not on a remote server that ingests uploads before processing. Adjust complexity, pick a color mode, optionally simplify paths, and review the live preview before export. It outputs path-based SVG from PNG or JPEG sources; it does not auto-slice sprite sheets, rebuild art as per-pixel rectangles, or output formats other than SVG.",
    },
    benefitsHeading: "Why convert pixel art to SVG in the browser?",
    benefitsIntro:
      "Cloud converters route every sprite through a remote server before you see vector output. Pix-8 keeps tracing local — the practical fit when you need to ",
    benefitsKeyword: "convert pixel art to SVG",
    benefitsIntroAfter:
      " for scalable web or UI assets without moving source files off-device.",
    benefits: [
      {
        title: "Trace sprites without cloud upload",
        body: "Your pixel art file is read and traced in the browser tab. Pix-8 never receives your pixel data during preview, download, or copy.",
      },
      {
        title: "Color modes for limited palettes",
        body: "Choose color, grayscale, or black-and-white tracing, adjust path complexity, and optionally simplify paths — useful for flat pixel art with hard edges before SVG export.",
      },
      {
        title: "Preview before you export",
        body: "Review the traced result in the live preview, then download the SVG file or copy the markup — no server round-trip between trace and export.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image to SVG Converter",
        body: "Navigate to Pix-8 Image to SVG Converter in your browser — no install, no account, and no upload dialog before you convert pixel art to SVG.",
      },
      {
        title: "Load your pixel art locally",
        body: "Choose a PNG or JPEG export from your device. Set color mode, complexity, and path simplification, then let the browser trace the art on-device.",
      },
      {
        title: "Download or copy SVG",
        body: "Confirm the live preview, then download the SVG file or copy the markup — your traced pixel art stays on-device until you export it.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to convert pixel art to SVG without uploading?",
      body: "Open Image to SVG Converter, load a local pixel art file, and export scalable SVG — privately, entirely on-device.",
      button: "Open Image to SVG Converter",
    },
  },
  "smooth-image-to-vector-converter": {
    eyebrow: "Smooth paths · Control · No upload",
    titleMain: "Smooth image to vector converter",
    titleAccent: "tune traced paths before export",
    heroSubtitle:
      "Use a smooth image to vector converter in your browser — no upload, no account, no cloud queue. Load a PNG or JPEG from your device, trace raster pixels into scalable SVG paths, adjust path complexity and optional simplification for cleaner curves, preview the result in real time, then download or copy — all processed on-device without sending your file to a server.",
    primaryCta: "Convert to vector — Free",
    ctaNote: "No upload · No server · On-device tracing",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Path tuning in the browser — not a black-box smooth-vector service",
      body: "Pix-8 Image to SVG Converter traces your raster file locally and lets you adjust complexity and path simplification before export — not a remote service that returns vectors you cannot inspect. Review the live preview, then download or copy SVG output. It converts PNG or JPEG sources to path-based SVG; it does not run a dedicated smoothing pass, batch-convert folders, or guarantee illustration-smooth results on every complex photograph.",
    },
    benefitsHeading: "Why use a smooth image to vector converter?",
    benefitsIntro:
      "Cloud converters often hide tracing settings behind uploads and fixed output. Pix-8 puts path tuning in your hands — the practical fit when you need a ",
    benefitsKeyword: "smooth image to vector converter",
    benefitsIntroAfter:
      " for logos, icons, and simple artwork with simplification and preview-before-export on-device.",
    benefits: [
      {
        title: "Simplify paths for cleaner output",
        body: "Enable optional path simplification and adjust complexity to reduce jagged segments — tune traced curves before you commit to SVG export, all in the browser tab.",
      },
      {
        title: "Preview smoothness before export",
        body: "Review traced paths in the live preview, then download the SVG file or copy the markup — your image never leaves the browser during conversion.",
      },
      {
        title: "Client-side by default",
        body: "Your raster file is read and traced on-device. Pix-8 does not receive your pixel data during preview, download, or copy.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image to SVG Converter",
        body: "Navigate to Pix-8 Image to SVG Converter in your browser — no install, no account, and no upload dialog before you convert image to vector.",
      },
      {
        title: "Tune tracing for smoother paths",
        body: "Load a PNG or JPEG from your device. Set color mode, path complexity, and optional simplification, then let the browser trace vector paths locally.",
      },
      {
        title: "Confirm preview, then export SVG",
        body: "Check the live preview for path quality, then download the SVG file or copy the markup — your vector output stays on-device until you export it.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to convert image to vector with path controls?",
      body: "Open Image to SVG Converter, load a local raster file, tune complexity and simplification, and export scalable SVG — privately, entirely on-device.",
      button: "Open Image to SVG Converter",
    },
  },
  "svg-path-converter-online": {
    eyebrow: "SVG paths · Online · No upload",
    titleMain: "SVG path converter online",
    titleAccent: "raster to path markup in the browser",
    heroSubtitle:
      "Use an SVG path converter online in your browser — no upload, no account, no cloud queue. Load a PNG or JPEG from your device, trace raster pixels into scalable SVG path markup with color, grayscale, or black-and-white modes, tune path complexity and simplification, preview the path output, then download or copy — all processed on-device without sending your file to a server.",
    primaryCta: "Convert to SVG paths — Free",
    ctaNote: "No upload · No server · On-device tracing",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Online path tracing in the browser — not a cloud upload converter",
      body: "Pix-8 Image to SVG Converter builds SVG path data from your raster file locally in the browser — not on a remote server that ingests uploads before tracing. Adjust complexity, pick a color mode, optionally simplify paths, and review the live preview before export. It outputs path-based SVG from PNG or JPEG sources; it does not edit existing SVG path markup, batch-convert folders, or output formats other than SVG.",
    },
    benefitsHeading: "Why use an SVG path converter online?",
    benefitsIntro:
      "Cloud converters route every raster through a remote server before you see path output. Pix-8 keeps path tracing local — the practical fit when you need an ",
    benefitsKeyword: "SVG path converter online",
    benefitsIntroAfter:
      " for logos, icons, and simple artwork without moving source files off-device.",
    benefits: [
      {
        title: "Build paths without cloud upload",
        body: "Your image is read and traced in the browser tab. Pix-8 never receives your pixel data during preview, download, or copy.",
      },
      {
        title: "Controls for path output",
        body: "Choose color, grayscale, or black-and-white tracing, adjust path complexity, and optionally simplify paths before you export SVG path markup.",
      },
      {
        title: "Preview paths before export",
        body: "Review traced paths in the live preview, then download the SVG file or copy the markup — no server round-trip between trace and export.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image to SVG Converter",
        body: "Navigate to Pix-8 Image to SVG Converter in your browser — no install, no account, and no upload dialog before you use an SVG path converter online.",
      },
      {
        title: "Trace paths on-device",
        body: "Load a PNG or JPEG from your device. Set color mode, complexity, and path simplification, then let the browser build SVG paths locally.",
      },
      {
        title: "Download or copy SVG paths",
        body: "Confirm the live preview, then download the SVG file or copy the path markup — your traced output stays on-device until you export it.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to convert raster to SVG paths without uploading?",
      body: "Open Image to SVG Converter, load a local raster file, and export path-based SVG — privately, entirely on-device.",
      button: "Open Image to SVG Converter",
    },
  },
};
