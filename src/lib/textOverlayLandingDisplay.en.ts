import type {
  TextOverlayLandingChrome,
  TextOverlayLandingDisplayFields,
} from "@/lib/textOverlayLandingTypes";
import type { TextOverlayLandingId } from "@/lib/textOverlayLandings";

export const TEXT_OVERLAY_LANDING_CHROME_EN: TextOverlayLandingChrome = {
  privacyNote:
    "Client-side processing only — your image never leaves the browser.",
  relatedUseCasesHeading: "Related use cases",
  guidesHeading: "Guides",
  toolCardTitle: "Text Overlay tool",
  toolCardExcerpt:
    "Open the workspace — position text, style typography, and export locally.",
};

/** Add one key per landing ID as pages are created. */
export const TEXT_OVERLAY_LANDING_DISPLAY_EN: Record<
  TextOverlayLandingId,
  Omit<TextOverlayLandingDisplayFields, "capabilities">
> = {
  "add-text-on-image-online": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Add Text to Image Online",
    titleAccent: "Draggable Typography in Your Browser",
    heroSubtitle:
      "Add text to images online in your browser — no upload, no account, no cloud queue. Position typography on-device, style fonts and colors, and export without sending your file to a server.",
    primaryCta: "Add Text — Free",
    ctaNote: "No upload · No server · Browser canvas",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Free-positioned text, not pin labels",
      body: "Text Overlay places draggable text blocks on a client-side canvas — not pin-style callout labels. Choose font, size, color, and alignment, toggle shadow or a background box, then download or copy locally. For screenshot arrows and labeled markers, use Pix-8 Image Annotator instead. It does not include pins, arrows, or multi-annotation layers.",
    },
    benefitsHeading: "Why add text to images online in the browser?",
    benefitsIntro:
      "Cloud editors upload your file before you type a single character. Pix-8 keeps typography local — the direct fit when you need to ",
    benefitsKeyword: "add text to image online",
    benefitsIntroAfter:
      " with draggable positioning and export that never routes pixels through a remote server.",
    benefits: [
      {
        title: "Client-side by default",
        body: "Your image is read and composited locally in your browser tab. Pix-8 does not receive your pixel data.",
      },
      {
        title: "Typography you control",
        body: "Drag text into place, set font and color, align left/center/right, and tune shadow or background box before export.",
      },
      {
        title: "Flattened local export",
        body: "Download or copy one image with text baked in, with optional EXIF stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Text Overlay",
        body: "Navigate to Pix-8 Text Overlay in your browser — no install, no account, and no upload step.",
      },
      {
        title: "Type and position on-device",
        body: "Load an image locally, enter your text, drag it into place, and adjust font, color, and alignment on a client-side canvas.",
      },
      {
        title: "Download or copy",
        body: "Export the composited image from your machine — processed entirely client-side.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to add text to your image?",
      body: "Open Text Overlay, compose your typography, and export — privately, entirely in your browser tab.",
      button: "Open Text Overlay",
    },
  },
  "write-on-photo-online": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Write on Photo Online",
    titleAccent: "Type Directly on Your Photo in the Browser",
    heroSubtitle:
      "Write on photos online in your browser — no upload, no account, no cloud queue. Type your message, position it on-device, and export without sending your file to a server.",
    primaryCta: "Write on Photo — Free",
    ctaNote: "No upload · No server · Browser canvas",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Typed text on photos, not freehand drawing",
      body: "Text Overlay lets you type and place text on a client-side canvas — not handwriting, brush strokes, or pin-style callout labels. Set font, size, color, and alignment, toggle shadow or a background box, then download or copy locally. For screenshot arrows and labeled markers, use Pix-8 Image Annotator instead. It does not include pins, arrows, or a drawing pen.",
    },
    benefitsHeading: "Why write on photos online in the browser?",
    benefitsIntro:
      "Most online editors queue your photo on a remote server before you write a word. Pix-8 keeps composition local — the direct fit when you need to ",
    benefitsKeyword: "write on photo online",
    benefitsIntroAfter:
      " with typed captions and export that never routes pixels through a remote server.",
    benefits: [
      {
        title: "Client-side by default",
        body: "Your photo is read and composited locally in your browser tab. Pix-8 does not receive your pixel data.",
      },
      {
        title: "Type and place on-device",
        body: "Enter your message, drag it into position, and adjust font, color, and alignment on a client-side canvas.",
      },
      {
        title: "Flattened local export",
        body: "Download or copy one image with your text baked in, with optional EXIF stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Text Overlay",
        body: "Navigate to Pix-8 Text Overlay in your browser — no install, no account, and no upload step.",
      },
      {
        title: "Write and position on-device",
        body: "Load a photo locally, type your caption or message, drag it into place, and adjust styling on a client-side canvas.",
      },
      {
        title: "Download or copy",
        body: "Export the composited photo from your machine — processed entirely client-side.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to write on your photo?",
      body: "Open Text Overlay, type your message, and export — privately, entirely in your browser tab.",
      button: "Open Text Overlay",
    },
  },
  "free-text-over-image-tool": {
    eyebrow: "Free · Client-side · No upload",
    titleMain: "Free Text Over Image Tool",
    titleAccent: "Layer Typography on Your Image in the Browser",
    heroSubtitle:
      "A free text over image tool that runs in your browser — no upload, no account, no cloud queue. Place typed text over your image on-device and export without sending your file to a server.",
    primaryCta: "Add Text Over Image — Free",
    ctaNote: "No upload · No server · Browser canvas",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Text layered over your image, not pin callouts",
      body: "Text Overlay composites typed text over your image on a client-side canvas — not pin-style callout labels or a multi-layer PSD workflow. Set font, size, color, and alignment, toggle shadow or a background box, then download or copy locally. For screenshot arrows and labeled markers, use Pix-8 Image Annotator instead. It does not include pins, arrows, or separate editable layers after export.",
    },
    benefitsHeading: "Why use a free text over image tool in the browser?",
    benefitsIntro:
      "Many free editors still route your file through a remote server. Pix-8 keeps overlay composition local — the direct fit when you need a ",
    benefitsKeyword: "free text over image tool",
    benefitsIntroAfter:
      " with draggable typography and export that never uploads your pixels.",
    benefits: [
      {
        title: "Free and client-side",
        body: "Open the tool in your browser at no cost. Your image is read and composited locally — Pix-8 does not receive your pixel data.",
      },
      {
        title: "Text layered on-device",
        body: "Type your message, drag it over the image, and adjust font, color, and alignment on a client-side canvas.",
      },
      {
        title: "Flattened local export",
        body: "Download or copy one image with text baked in, with optional EXIF stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Text Overlay",
        body: "Navigate to Pix-8 Text Overlay in your browser — free, no install, and no account required.",
      },
      {
        title: "Layer text on-device",
        body: "Load an image locally, type your text, position it over the image, and adjust styling on a client-side canvas.",
      },
      {
        title: "Download or copy",
        body: "Export the composited image from your machine — processed entirely client-side.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to place text over your image?",
      body: "Open Text Overlay, layer your typography, and export — free, privately, entirely in your browser tab.",
      button: "Open Text Overlay",
    },
  },
  "image-text-adder": {
    eyebrow: "Client-side · No upload · Browser tool",
    titleMain: "Image Text Adder",
    titleAccent: "Add Typography to Images in Your Browser",
    heroSubtitle:
      "An image text adder that runs in your browser — no upload, no account, no cloud queue. Place typed text on your image on-device, style fonts and colors, and export without sending your file to a server.",
    primaryCta: "Add Text to Image — Free",
    ctaNote: "No upload · No server · Browser canvas",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Adds text to images, not pin callout labels",
      body: "Text Overlay is an image text adder for draggable typography on a client-side canvas — not pin-style callout labels. Choose font, size, color, and alignment, toggle shadow or a background box, then download or copy locally. For screenshot arrows and labeled markers, use Pix-8 Image Annotator instead. It does not include pins, arrows, or multi-annotation layers.",
    },
    benefitsHeading: "Why use an image text adder in the browser?",
    benefitsIntro:
      "Desktop apps and cloud editors often copy your file off-device before you add a caption. Pix-8 keeps text composition local — the direct fit when you need an ",
    benefitsKeyword: "image text adder",
    benefitsIntroAfter:
      " with draggable positioning and export that never routes pixels through a remote server.",
    benefits: [
      {
        title: "Client-side by default",
        body: "Your image is read and composited locally in your browser tab. Pix-8 does not receive your pixel data.",
      },
      {
        title: "Add and position on-device",
        body: "Type your text, drag it into place, and adjust font, color, and alignment on a client-side canvas.",
      },
      {
        title: "Flattened local export",
        body: "Download or copy one image with text baked in, with optional EXIF stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Text Overlay",
        body: "Navigate to Pix-8 Text Overlay in your browser — no install, no account, and no upload step.",
      },
      {
        title: "Add text on-device",
        body: "Load an image locally, enter your text, drag it into place, and adjust styling on a client-side canvas.",
      },
      {
        title: "Download or copy",
        body: "Export the composited image from your machine — processed entirely client-side.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to add text to your image?",
      body: "Open Text Overlay, place your typography, and export — privately, entirely in your browser tab.",
      button: "Open Text Overlay",
    },
  },
  "add-watermark-to-image-online": {
    eyebrow: "Watermark · Client-side · No upload",
    titleMain: "Add Watermark to Image Online",
    titleAccent: "Typed Text, Positioned in Your Browser",
    heroSubtitle:
      "Add watermark text to images online in your browser — no upload, no account, no cloud queue. Drag watermark typography into place, style it for readability, and export without sending your file to a server.",
    primaryCta: "Add Watermark Text",
    ctaNote: "No upload · No server · Browser canvas",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Typed watermark text, not logo overlays",
      body: "Text Overlay adds watermark-style typography on a client-side canvas — not image/logo watermark files. Choose font, size, color, and left/center/right alignment, then optionally enable text shadow or a background box for contrast. For PNG/SVG logo watermarks, use the Pix-8 Watermark tool in Editor Studio.",
    },
    benefitsHeading: "Why add watermark text online in the browser?",
    benefitsIntro:
      "Most online editors upload your image before you add a caption. Pix-8 keeps watermark composition local — the direct fit when you need to ",
    benefitsKeyword: "protect your images",
    benefitsIntroAfter:
      " without routing pixels through a remote server.",
    benefits: [
      {
        title: "Client-side processing",
        body: "Your image is read and composited locally in your browser tab; Pix-8 does not receive your pixel data.",
      },
      {
        title: "Watermark-ready typography",
        body: "Drag the watermark into position, then tune font, color, alignment, and optional shadow/background box for readability.",
      },
      {
        title: "Flattened export for sharing",
        body: "Download or copy one image with the watermark baked in, with optional EXIF stripping before you export.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Text Overlay",
        body: "Navigate to Pix-8 Text Overlay in your browser — no install, no account, and no upload step.",
      },
      {
        title: "Add watermark text on-device",
        body: "Load your image locally, type your watermark text, drag it into position, and adjust font, size, color, and alignment on a client-side canvas.",
      },
      {
        title: "Download or copy",
        body: "Export the composited image from your device — processed entirely client-side.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to add a watermark?",
      body: "Open Text Overlay, place your watermark typography, and export — privately, entirely in your browser tab.",
      button: "Open Text Overlay",
    },
  },
  "add-text-to-photos-for-instagram": {
    eyebrow: "Instagram · Client-side · No upload",
    titleMain: "Add Text to Photos for Instagram",
    titleAccent: "Captions and Headlines in Your Browser",
    heroSubtitle:
      "Add text to photos for Instagram in your browser — no upload, no account, no cloud queue. Type captions and headlines on-device, position typography for readability, and export before you post from your phone or desktop.",
    primaryCta: "Add Text — Free",
    ctaNote: "No upload · No server · Browser canvas",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Typography for posts, not Instagram presets",
      body: "Text Overlay adds typed captions and headlines on a client-side canvas — not feed resize presets, Story crop overlays, or direct posting. Choose font, size, color, and alignment, toggle shadow or a background box, then download or copy locally. For Instagram pixel dimensions, use Pix-8 Resizer. For aspect-ratio crops, use Pix-8 Cropper.",
    },
    benefitsHeading: "Why add text to Instagram photos in the browser?",
    benefitsIntro:
      "Social editors often upload your photo to a remote server before you type a caption. Pix-8 keeps typography local — the direct fit when you need to ",
    benefitsKeyword: "add text to photos for Instagram",
    benefitsIntroAfter:
      " with draggable positioning and export that never routes pixels through a remote server.",
    benefits: [
      {
        title: "Client-side by default",
        body: "Your photo is read and composited locally in your browser tab. Pix-8 does not receive your pixel data.",
      },
      {
        title: "Caption-ready typography",
        body: "Type headlines or captions, drag text into place, and tune font, color, and alignment for feed readability.",
      },
      {
        title: "Flattened local export",
        body: "Download or copy one image with text baked in, then upload to Instagram from your device.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Text Overlay",
        body: "Navigate to Pix-8 Text Overlay in your browser — no install, no account, and no upload step.",
      },
      {
        title: "Add text on-device",
        body: "Load a photo locally, type your caption or headline, drag it into place, and adjust styling on a client-side canvas.",
      },
      {
        title: "Download and post",
        body: "Export the composited image from your machine — then upload to Instagram from your device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to add text to your Instagram photo?",
      body: "Open Text Overlay, compose your caption, and export — privately, entirely in your browser tab.",
      button: "Open Text Overlay",
    },
  },
  "add-captions-to-images-online": {
    eyebrow: "Captions · Client-side · No upload",
    titleMain: "Add Captions to Images Online",
    titleAccent: "Readable Captions in Your Browser",
    heroSubtitle:
      "Add captions to images online in your browser — no upload, no account, no cloud queue. Type clear captions on-device, position them for readability, and export without sending your file to a server.",
    primaryCta: "Add Captions — Free",
    ctaNote: "No upload · No server · Browser canvas",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Caption text on images, not pin-style annotations",
      body: "Text Overlay adds caption text blocks on a client-side canvas — not arrows, pins, or numbered callouts. You type your caption, drag it into place, and tune font, size, color, alignment, and optional shadow or background box for contrast. For screenshot callouts with pins and labels, use Pix-8 Image Annotator instead. It does not include pins, arrows, or multi-annotation layers.",
    },
    benefitsHeading: "Why add captions to images online in the browser?",
    benefitsIntro:
      "Caption tools that rely on cloud processing upload your file before you describe what's in the frame. Pix-8 keeps captions local — the direct fit when you need to ",
    benefitsKeyword: "add captions to images online",
    benefitsIntroAfter:
      " with on-device positioning and export that never routes pixels through a remote server.",
    benefits: [
      {
        title: "Client-side captioning",
        body: "Your image is read and composited locally in your browser tab while you add captions. Pix-8 does not receive your pixel data.",
      },
      {
        title: "Caption layout you control",
        body: "Type captions, drag them into place, and adjust font, color, and left/center/right alignment on a client-side canvas so they stay legible over the image.",
      },
      {
        title: "Flattened local export",
        body: "Download or copy one image with captions baked in, with optional EXIF stripping before you share or archive.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Text Overlay",
        body: "Navigate to Pix-8 Text Overlay in your browser — no install, no account, and no upload step.",
      },
      {
        title: "Type and position captions on-device",
        body: "Load an image locally, type your caption text, drag it into position, and adjust styling on a client-side canvas.",
      },
      {
        title: "Download or copy",
        body: "Export the composited image with captions from your machine — processed entirely client-side.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to add captions to your images?",
      body: "Open Text Overlay, place your captions, and export — privately, entirely in your browser tab.",
      button: "Open Text Overlay",
    },
  },
  "add-logo-or-text-to-images": {
    eyebrow: "Logo · Text · Client-side · No upload",
    titleMain: "Add Logo or Text to Images",
    titleAccent: "Two Local Tools, One Browser Workflow",
    heroSubtitle:
      "Add logo or text to images in your browser — no upload, no account, no cloud queue. Type typography with Text Overlay or overlay a logo file with Watermark — both process on-device and export without sending your file to a server.",
    primaryCta: "Add Text — Free",
    ctaNote: "No upload · No server · Browser canvas",
    capabilitiesHeading: "What Text Overlay does",
    featureCallout: {
      title: "Text here, logo files in Watermark",
      body: "This page routes two intents. Pix-8 Text Overlay adds draggable typed text on a client-side canvas — font, size, color, alignment, and optional shadow or background box. For a logo or image mark (PNG, etc.), open Pix-8 Watermark in Editor Studio — opacity, scale, and preset position controls, all client-side. Neither tool includes pin-style callout labels; for screenshot markers, use Pix-8 Image Annotator.",
    },
    benefitsHeading: "Why add logo or text to images in the browser?",
    benefitsIntro:
      "Branding tools often upload your file before you place a mark or headline. Pix-8 keeps both workflows local — the direct fit when you need to ",
    benefitsKeyword: "add logo or text to images",
    benefitsIntroAfter:
      " with on-device composition and export that never routes pixels through a remote server.",
    benefits: [
      {
        title: "Client-side by default",
        body: "Your image is read and composited locally in your browser tab. Pix-8 does not receive your pixel data — whether you add typed text or a logo overlay.",
      },
      {
        title: "Right tool for each overlay",
        body: "Text Overlay handles typography you type and drag into place. Watermark handles logo or image files with opacity, scale, and position presets — both in Editor Studio, no upload step.",
      },
      {
        title: "Flattened local export",
        body: "Download or copy one image with your text or logo baked in, with optional EXIF stripping before you share or publish.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Choose your overlay type",
        body: "Open Pix-8 Text Overlay for typed text, or Watermark in Editor Studio for a logo or image file — no install, no account, and no upload step.",
      },
      {
        title: "Compose on-device",
        body: "Load your image locally. Type and position text with font and color controls, or load your logo, set opacity and scale, and pick a corner or center position on a client-side canvas.",
      },
      {
        title: "Download or copy",
        body: "Export the composited image from your machine — processed entirely client-side.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to add logo or text to your image?",
      body: "Open Text Overlay for typography or Watermark for a logo file — privately, entirely in your browser tab.",
      button: "Open Text Overlay",
    },
  },
  "client-side-text-overlay-tool": {
    eyebrow: "Client-side · Privacy-first · No upload",
    titleMain: "Client-Side Text Overlay Tool",
    titleAccent: "On-Device Typography for Images",
    heroSubtitle:
      "A client-side text overlay tool that runs entirely in your browser — no upload, no account, no cloud queue. Place and style text on images on-device and export without your pixels ever leaving the tab.",
    primaryCta: "Open Text Overlay — Free",
    ctaNote: "No upload · No server · Browser canvas",
    capabilitiesHeading: "What this client-side tool does",
    featureCallout: {
      title: "Local canvas, not a cloud pipeline",
      body: "Pix-8 Text Overlay is a true client-side text overlay tool. Your image is read locally, text blocks are rendered on a browser canvas, and you export from your machine — no server round-trips, no queue, and no hidden upload step. It focuses on fast, controlled typography rather than heavy multi-layer editing.",
    },
    benefitsHeading: "Why use a client-side text overlay tool?",
    benefitsIntro:
      "Most online editors quietly upload your file for background processing. Pix-8 keeps everything in the tab — the direct fit when you need a ",
    benefitsKeyword: "client-side text overlay tool",
    benefitsIntroAfter:
      " that never routes pixels through a remote server.",
    benefits: [
      {
        title: "Privacy by design",
        body: "Your image and text overlay never leave the browser. Composition happens on a client-side canvas; Pix-8 does not receive your pixel data.",
      },
      {
        title: "Deterministic, responsive typography",
        body: "Drag text into place, tune font, size, color, alignment, and optional shadow or background box — with immediate feedback, no network latency.",
      },
      {
        title: "Local export with metadata control",
        body: "Download or copy a flattened image with your text baked in, with optional EXIF stripping before you share, archive, or ship to production.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open the client-side editor",
        body: "Navigate to Pix-8 Text Overlay in your browser — no install, no login, and no upload step.",
      },
      {
        title: "Compose text on-device",
        body: "Load an image locally, add one or more text blocks, drag them into position, and adjust typography on a client-side canvas.",
      },
      {
        title: "Export locally",
        body: "Download or copy the composited image from your machine — processed fully on-device, with optional EXIF stripping.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to use a client-side text overlay tool?",
      body: "Open Text Overlay, compose your typography, and export — privately, entirely in your browser tab.",
      button: "Open Text Overlay",
    },
  },
  "add-text-to-image-with-fonts": {
    eyebrow: "Fonts · Client-side · No upload",
    titleMain: "Add Text to Image with Fonts",
    titleAccent: "Typography Controls in Your Browser",
    heroSubtitle:
      "Add text to images with fonts in your browser — no upload, no account, no cloud queue. Choose font family, size, and color on-device, position typography with drag controls, and export without sending your file to a server.",
    primaryCta: "Add Text with Fonts — Free",
    ctaNote: "No upload · No server · Browser canvas",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Built-in font controls, not pin labels",
      body: "Text Overlay lets you add text to images with fonts on a client-side canvas — sans-serif, serif, monospace, and impact-style options, plus size and color controls. Drag text into place, set alignment, and toggle optional shadow or background box, then download or copy locally. For screenshot callouts with pins and labels, use Pix-8 Image Annotator instead. It does not include custom font uploads or curved text.",
    },
    benefitsHeading: "Why add text to images with fonts in the browser?",
    benefitsIntro:
      "Font-heavy editors often upload your file before you pick a typeface. Pix-8 keeps typography local — the direct fit when you need to ",
    benefitsKeyword: "add text to image with fonts",
    benefitsIntroAfter:
      " with on-device font controls and export that never routes pixels through a remote server.",
    benefits: [
      {
        title: "Client-side font styling",
        body: "Your image is read and composited locally in your browser tab. Choose font family, size, and color on a client-side canvas — Pix-8 does not receive your pixel data.",
      },
      {
        title: "Readable typography controls",
        body: "Select from built-in font families, adjust size and color, align left/center/right, and tune optional shadow or background box before export.",
      },
      {
        title: "Flattened local export",
        body: "Download or copy one image with your styled text baked in, with optional EXIF stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Text Overlay",
        body: "Navigate to Pix-8 Text Overlay in your browser — no install, no account, and no upload step.",
      },
      {
        title: "Type and style with fonts on-device",
        body: "Load an image locally, enter your text, choose font family, size, and color, drag it into position, and adjust alignment on a client-side canvas.",
      },
      {
        title: "Download or copy",
        body: "Export the composited image with styled typography from your machine — processed entirely client-side.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to add text with fonts to your image?",
      body: "Open Text Overlay, set your typography, and export — privately, entirely in your browser tab.",
      button: "Open Text Overlay",
    },
  },
  "custom-text-placement-on-image": {
    eyebrow: "Placement · Client-side · No upload",
    titleMain: "Custom Text Placement on Image",
    titleAccent: "Drag Text Where You Need It",
    heroSubtitle:
      "Custom text placement on images in your browser — no upload, no account, no cloud queue. Drag text blocks into position on-device, tune typography for readability, and export without sending your file to a server.",
    primaryCta: "Place Text — Free",
    ctaNote: "No upload · No server · Browser canvas",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Free drag placement, not pin callouts",
      body: "Text Overlay gives you custom text placement on a client-side canvas — drag blocks anywhere on the image, then set font, size, color, alignment, and optional shadow or background box. For screenshot markers with pins and labeled callouts, use Pix-8 Image Annotator instead. It does not include snap guides, text rotation handles, or multi-layer layout timelines.",
    },
    benefitsHeading: "Why use custom text placement on images in the browser?",
    benefitsIntro:
      "Layout tools often upload your file before you nudge a headline into place. Pix-8 keeps placement local — the direct fit when you need ",
    benefitsKeyword: "custom text placement on image",
    benefitsIntroAfter:
      " with drag controls and export that never routes pixels through a remote server.",
    benefits: [
      {
        title: "Client-side placement",
        body: "Your image is read and composited locally in your browser tab. Drag text into position on a client-side canvas — Pix-8 does not receive your pixel data.",
      },
      {
        title: "Visual positioning control",
        body: "Move text blocks freely across the image, then adjust font, color, and left/center/right alignment so captions and headlines land where you need them.",
      },
      {
        title: "Flattened local export",
        body: "Download or copy one image with your placed text baked in, with optional EXIF stripping before you share or archive.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Text Overlay",
        body: "Navigate to Pix-8 Text Overlay in your browser — no install, no account, and no upload step.",
      },
      {
        title: "Drag text into position on-device",
        body: "Load an image locally, type your text, drag it anywhere on the canvas, and adjust font, size, color, and alignment on a client-side canvas.",
      },
      {
        title: "Download or copy",
        body: "Export the composited image with your custom placement from your machine — processed entirely client-side.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to place text on your image?",
      body: "Open Text Overlay, drag your text into position, and export — privately, entirely in your browser tab.",
      button: "Open Text Overlay",
    },
  },
  "professional-text-overlay-editor": {
    eyebrow: "Professional · Client-side · No upload",
    titleMain: "Professional Text Overlay Editor",
    titleAccent: "Controlled Typography in Your Browser",
    heroSubtitle:
      "A professional text overlay editor that runs in your browser — no upload, no account, no cloud queue. Compose readable typography on-device with font, placement, and export controls, without sending your file to a server.",
    primaryCta: "Open Text Overlay — Free",
    ctaNote: "No upload · No server · Browser canvas",
    capabilitiesHeading: "What this editor does",
    featureCallout: {
      title: "Focused typography editor, not a design suite",
      body: "Pix-8 Text Overlay is a professional text overlay editor for controlled typography on a client-side canvas — drag text into place, set font family, size, color, and alignment, and toggle optional shadow or background box for contrast. For screenshot callouts with pins and labels, use Pix-8 Image Annotator instead. It does not include template libraries, AI generation, or multi-layer PSD workflows.",
    },
    benefitsHeading: "Why use a professional text overlay editor in the browser?",
    benefitsIntro:
      "Heavy editors upload your file before you adjust a headline. Pix-8 keeps composition local — the direct fit when you need a ",
    benefitsKeyword: "professional text overlay editor",
    benefitsIntroAfter:
      " with on-device typography controls and export that never routes pixels through a remote server.",
    benefits: [
      {
        title: "Client-side workflow",
        body: "Your image is read and composited locally in your browser tab. Pix-8 does not receive your pixel data — suitable for client deliverables and internal assets.",
      },
      {
        title: "Typography you can standardize",
        body: "Drag text into position, set font family, size, and color, align left/center/right, and tune shadow or background box for consistent, readable output.",
      },
      {
        title: "Production-ready export",
        body: "Download or copy a flattened image with text baked in, with optional EXIF stripping before you share, archive, or hand off to another tool.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open the editor",
        body: "Navigate to Pix-8 Text Overlay in your browser — no install, no account, and no upload step.",
      },
      {
        title: "Compose typography on-device",
        body: "Load an image locally, add text blocks, drag them into position, and adjust font, size, color, and alignment on a client-side canvas.",
      },
      {
        title: "Export locally",
        body: "Download or copy the composited image from your machine — processed entirely client-side.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to use a professional text overlay editor?",
      body: "Open Text Overlay, compose your typography, and export — privately, entirely in your browser tab.",
      button: "Open Text Overlay",
    },
  },
};
