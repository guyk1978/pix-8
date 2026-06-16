import type {
  MemeGeneratorLandingChrome,
  MemeGeneratorLandingDisplayFields,
} from "@/lib/memeGeneratorLandingTypes";
import type { MemeGeneratorLandingId } from "@/lib/memeGeneratorLandings";

export const MEME_GENERATOR_LANDING_CHROME_EN: MemeGeneratorLandingChrome = {
  privacyNote:
    "Client-side processing only — your images never leave the browser.",
  relatedUseCasesHeading: "Related use cases",
  guidesHeading: "Guides",
  toolCardTitle: "Meme Generator",
  toolCardExcerpt:
    "Open the workspace — pick a template or upload an image and export in seconds.",
};

/** Per-landing EN display fields — add keys when new slugs are added to memeGeneratorLandings.ts. */
export const MEME_GENERATOR_LANDING_DISPLAY_EN: Record<
  MemeGeneratorLandingId,
  Omit<MemeGeneratorLandingDisplayFields, "capabilities">
> = {
  "meme-generator-online": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Meme Generator Online",
    titleAccent: "Classic Captions, On-Device",
    heroSubtitle:
      "Use a meme generator online in your browser — no upload, no account, no cloud queue. Pick a built-in template or load your own image locally, type top and bottom captions, preview on-device, and export one flattened file without sending pixels to a server.",
    primaryCta: "Make a Meme — Free",
    ctaNote: "No upload · No server · Flattened export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Classic two-line memes — not a full design suite",
      body: "Pix-8 Meme Generator renders top and bottom Impact-style captions on a client-side canvas in the browser — not a cloud meme app that ingests your files first. Choose from four built-in templates or upload your own image, type captions with live preview, then download or copy one flattened image. It does not include custom fonts, draggable text placement, video or GIF export, or AI image generation.",
    },
    benefitsHeading: "Why use a meme generator online in the browser?",
    benefitsIntro:
      "Cloud meme makers route every image through remote servers before you see a result. Pix-8 processes locally — the practical fit when you need a ",
    benefitsKeyword: "meme generator online",
    benefitsIntroAfter:
      " for social posts, team channels, or quick reactions without plugins, accounts, or off-device processing.",
    benefits: [
      {
        title: "Client-side rendering",
        body: "Your base image and captions are composited on a canvas in the browser tab. Pix-8 never receives your pixel data.",
      },
      {
        title: "Templates or your own image",
        body: "Start from four iconic meme templates or upload any JPG, PNG, or WEBP from your device as the base.",
      },
      {
        title: "Share-ready export",
        body: "Download or copy one flattened meme file, with optional EXIF metadata stripping before you post or send.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Meme Generator",
        body: "Navigate to Pix-8 Meme Generator in your browser — no install, no account, and no upload dialog.",
      },
      {
        title: "Pick a template or upload",
        body: "Select a built-in meme template or load your own image locally. Type top and bottom captions and preview the result on-device in your browser tab.",
      },
      {
        title: "Export your meme",
        body: "Download or copy one flattened image with captions baked in — ready to post or share immediately.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to make memes without uploading?",
      body: "Open Meme Generator, pick a template or upload an image, and type your captions — privately, entirely on your device.",
      button: "Open Meme Generator",
    },
  },
  "make-a-meme-online": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Make a Meme Online",
    titleAccent: "Type, Preview, Export",
    heroSubtitle:
      "Make a meme online in your browser — no upload, no account, no cloud queue. Choose a template or load your own image locally, add top and bottom captions with live preview, and export one flattened file without sending pixels to a server.",
    primaryCta: "Make a Meme — Free",
    ctaNote: "No upload · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "One image, two captions — the classic meme workflow",
      body: "Pix-8 Meme Generator is built to make a meme online quickly: load a base image on a client-side canvas, type top and bottom text in Impact style with auto-wrapping, preview as you edit, then download or copy one file. Four iconic templates are included, or use your own photo. It is not a general text editor, video meme maker, or AI image generator.",
    },
    benefitsHeading: "Why make memes online in the browser?",
    benefitsIntro:
      "Most online meme sites upload your image before rendering captions. Pix-8 keeps everything on-device — the direct fit when you want to ",
    benefitsKeyword: "make a meme online",
    benefitsIntroAfter:
      " for a group chat, social feed, or internal update without handing files to a remote server.",
    benefits: [
      {
        title: "No server upload",
        body: "Your image and captions never leave the browser tab. Pix-8 does not receive, store, or process your files on a backend.",
      },
      {
        title: "Fast caption workflow",
        body: "Type top and bottom text, see the classic white-on-black-outline layout update live, and export when it reads right.",
      },
      {
        title: "Templates or custom base",
        body: "Start from Distracted Boyfriend, Drake, Change My Mind, Two Buttons, or any image you upload from your device.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Meme Generator",
        body: "Go to Pix-8 Meme Generator in your browser — no install, no sign-up, and no file upload to a server.",
      },
      {
        title: "Add your image and text",
        body: "Pick a built-in template or open your own image locally. Enter top and bottom captions and watch the live preview on-device.",
      },
      {
        title: "Download or copy",
        body: "Save one flattened meme image to your device — ready to post, paste, or send immediately.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to make a meme without uploading?",
      body: "Open Meme Generator, add your image and captions, and export — privately, entirely on your device.",
      button: "Open Meme Generator",
    },
  },
  "free-meme-maker": {
    eyebrow: "Free · Client-side · No upload",
    titleMain: "Free Meme Maker",
    titleAccent: "No Account Required",
    heroSubtitle:
      "Use a free meme maker in your browser — no subscription, no account, no cloud queue. Load a template or your own image locally, type top and bottom captions on-device, and export one flattened file without sending pixels to a server or paying per download.",
    primaryCta: "Make a Meme — Free",
    ctaNote: "No account · No server · No export watermark",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Free access — not a freemium upload trap",
      body: "Pix-8 Meme Generator is a free meme maker that runs on a client-side canvas in your browser. Choose a built-in template or upload your image, add classic top-and-bottom captions, preview live, and export — without creating an account, without routing files through a remote server, and without Pix-8 branding stamped on your download. It is not a full graphic design suite, video meme editor, or AI generator.",
    },
    benefitsHeading: "Why use a free meme maker that runs locally?",
    benefitsIntro:
      "Many free meme sites fund themselves by uploading your images or watermarking exports. Pix-8 processes on-device — the practical fit when you need a ",
    benefitsKeyword: "free meme maker",
    benefitsIntroAfter:
      " that does not charge per file, require sign-up, or send photos off your machine.",
    benefits: [
      {
        title: "No paywall on export",
        body: "Download or copy your meme without a subscription, credit pack, or per-image fee from Pix-8.",
      },
      {
        title: "Client-side by default",
        body: "Templates and uploads stay in the browser tab. Pix-8 never receives your image data on a server.",
      },
      {
        title: "Classic meme format included",
        body: "Four iconic templates plus your own images, with Impact-style top and bottom captions and live preview.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Meme Generator",
        body: "Navigate to Pix-8 Meme Generator in your browser — free to open, no account, and no install.",
      },
      {
        title: "Choose template or upload",
        body: "Select a built-in meme template or load your own image locally. Type top and bottom captions and preview on-device.",
      },
      {
        title: "Export at no cost",
        body: "Download or copy one flattened meme from your device — ready to share with no Pix-8 watermark on the file.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for a free meme maker without uploading?",
      body: "Open Meme Generator, add your captions, and export — privately, entirely on your device.",
      button: "Open Meme Generator",
    },
  },
  "create-memes-from-photos": {
    eyebrow: "Photos · Client-side · No upload",
    titleMain: "Create Memes from Photos",
    titleAccent: "Your Image, Your Captions",
    heroSubtitle:
      "Create memes from photos in your browser — no upload, no account, no cloud queue. Open a JPG, PNG, or WEBP from your device, add top and bottom captions with live preview, and export one flattened file without sending your pictures to a server.",
    primaryCta: "Create from Photo — Free",
    ctaNote: "No upload · No server · Flattened export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Turn your photo into a meme — not a photo editor",
      body: "Pix-8 Meme Generator loads your photo locally and renders classic top-and-bottom Impact-style captions on a client-side canvas — not a cloud service that ingests your camera roll first. Type captions, preview live, and export one flattened image. Four built-in templates are also available if you prefer a preset base. It does not crop, filter, retouch, or batch-edit photo libraries.",
    },
    benefitsHeading: "Why create memes from photos in the browser?",
    benefitsIntro:
      "Photo-to-meme apps often upload your camera roll before adding text. Pix-8 keeps your pictures on-device — the direct fit when you need to ",
    benefitsKeyword: "create memes from photos",
    benefitsIntroAfter:
      " from personal shots, screenshots, or team images without routing files through a remote server.",
    benefits: [
      {
        title: "Your photos stay local",
        body: "Images are read from your device and composited in the browser tab. Pix-8 never receives your photo data on a server.",
      },
      {
        title: "Classic caption layout",
        body: "Add top and bottom Impact-style text with auto-wrapping and live preview — the standard meme format for shareable reactions.",
      },
      {
        title: "One export per photo",
        body: "Download or copy a single flattened meme file per session, with optional EXIF metadata stripping before you post.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Meme Generator",
        body: "Navigate to Pix-8 Meme Generator in your browser — no install, no account, and no server upload step.",
      },
      {
        title: "Load your photo",
        body: "Upload a JPG, PNG, or WEBP from your device, or pick a built-in template. Type top and bottom captions and preview on-device.",
      },
      {
        title: "Export your meme",
        body: "Download or copy one flattened image with captions baked into your photo — ready to share immediately.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to turn a photo into a meme?",
      body: "Open Meme Generator, load your image, add captions, and export — privately, entirely on your device.",
      button: "Open Meme Generator",
    },
  },
  "add-text-to-memes-online": {
    eyebrow: "Text · Client-side · No upload",
    titleMain: "Add Text to Memes Online",
    titleAccent: "Top & Bottom Captions",
    heroSubtitle:
      "Add text to memes online in your browser — no upload, no account, no cloud queue. Load a template or your own image locally, type top and bottom captions with live preview, and export one flattened file without sending pixels to a server.",
    primaryCta: "Add Meme Text — Free",
    ctaNote: "No upload · No server · Flattened export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Meme captions — not a full text editor",
      body: "Pix-8 Meme Generator adds top and bottom Impact-style text to an image on a client-side canvas — the classic meme caption workflow, not a typography studio. Type into two fields, preview live, and export one flattened file. For draggable text with font and color controls anywhere on a photo, use Pix-8 Text Overlay. Meme Generator does not support custom fonts, mid-image text blocks, or AI-generated captions.",
    },
    benefitsHeading: "Why add text to memes online in the browser?",
    benefitsIntro:
      "Caption tools that upload your image first expose every meme draft to a remote server. Pix-8 renders text locally — the practical fit when you need to ",
    benefitsKeyword: "add text to memes online",
    benefitsIntroAfter:
      " with the standard top-and-bottom layout, without accounts, plugins, or off-device processing.",
    benefits: [
      {
        title: "Client-side text rendering",
        body: "Captions are drawn on a canvas in your browser tab. Pix-8 never receives your image or typed text on a server.",
      },
      {
        title: "Classic meme typography",
        body: "Impact-style white text with black outline, auto-wrapped in the familiar top and bottom positions.",
      },
      {
        title: "Live preview as you type",
        body: "See captions update on your image in real time before you download or copy one flattened file.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Meme Generator",
        body: "Navigate to Pix-8 Meme Generator in your browser — no install, no account, and no upload dialog.",
      },
      {
        title: "Type top and bottom text",
        body: "Load a built-in template or your own image locally. Enter captions in the top and bottom fields and preview on-device.",
      },
      {
        title: "Export the captioned meme",
        body: "Download or copy one flattened image with text baked in — ready to post or send immediately.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to add text to memes without uploading?",
      body: "Open Meme Generator, type your captions, and export — privately, entirely on your device.",
      button: "Open Meme Generator",
    },
  },
  "make-memes-for-social-media": {
    eyebrow: "Social · Client-side · No upload",
    titleMain: "Make Memes for Social Media",
    titleAccent: "Post-Ready, On-Device",
    heroSubtitle:
      "Make memes for social media in your browser — no upload, no account, no cloud queue. Load a template or your own image locally, add top and bottom captions with live preview, and export one flattened file you can post to feeds, chats, or team channels without sending pixels to a server.",
    primaryCta: "Make a Meme — Free",
    ctaNote: "No upload · No server · Share-ready export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Shareable meme images — not a social scheduler",
      body: "Pix-8 Meme Generator helps you make memes for social media by rendering classic top-and-bottom captions on a client-side canvas — not a cloud studio that ingests your camera roll first. Pick a built-in template or upload your image, type captions with live preview, then download or copy one flattened file. It does not publish to platforms, batch-schedule posts, or export video or GIF memes.",
    },
    benefitsHeading: "Why make social media memes in the browser?",
    benefitsIntro:
      "Social meme apps often upload drafts before you can preview captions. Pix-8 keeps creation on-device — the practical fit when you need to ",
    benefitsKeyword: "make memes for social media",
    benefitsIntroAfter:
      " for Instagram, X, LinkedIn, Slack, or group chats without handing images to a remote server.",
    benefits: [
      {
        title: "Private by default",
        body: "Personal photos, screenshots, and internal jokes stay in the browser tab. Pix-8 never receives your image data on a server.",
      },
      {
        title: "Readable meme captions",
        body: "Impact-style top and bottom text with outline and auto-wrapping — the format audiences recognize in feeds and replies.",
      },
      {
        title: "Export and post",
        body: "Download or copy one flattened image per session, with optional EXIF metadata stripping before you share publicly.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Meme Generator",
        body: "Navigate to Pix-8 Meme Generator in your browser — no install, no account, and no upload to a social meme service.",
      },
      {
        title: "Build your meme",
        body: "Select a built-in template or load your own image locally. Type top and bottom captions and check readability in the live preview.",
      },
      {
        title: "Share to your feed",
        body: "Download or copy the flattened meme to your device — then post to your platform of choice.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to make social memes without uploading?",
      body: "Open Meme Generator, craft your caption, and export — privately, entirely on your device.",
      button: "Open Meme Generator",
    },
  },
  "fast-meme-creator": {
    eyebrow: "Fast · Client-side · No upload",
    titleMain: "Fast Meme Creator",
    titleAccent: "Live Preview, No Queue",
    heroSubtitle:
      "Use a fast meme creator in your browser — no install, no account, no upload wait. Pick a template or load your image locally, type top and bottom captions with instant live preview, and export one flattened file without sending pixels to a server.",
    primaryCta: "Create a Meme — Free",
    ctaNote: "No upload · No server · Instant preview",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Speed from a simple on-device workflow",
      body: "Pix-8 Meme Generator is a fast meme creator because everything runs on a client-side canvas in your browser — not a cloud app that ingests your file before rendering text. Choose a built-in template or upload your image, type two captions, preview live, and export. It does not include AI caption generation, batch queues, video export, or a multi-tool design timeline.",
    },
    benefitsHeading: "Why use a fast meme creator that runs locally?",
    benefitsIntro:
      "Cloud meme makers add latency through uploads and remote processing. Pix-8 renders captions in your browser tab — the direct fit when you need a ",
    benefitsKeyword: "fast meme creator",
    benefitsIntroAfter:
      " for a quick reaction post, team channel reply, or last-minute caption without waiting on a server.",
    benefits: [
      {
        title: "No upload delay",
        body: "Your image stays on your device. Pix-8 never queues your file on a remote server before you can add text.",
      },
      {
        title: "Live preview as you type",
        body: "See top and bottom captions update on the canvas immediately — adjust wording before you export.",
      },
      {
        title: "Three-step export",
        body: "Load image, type captions, download or copy one flattened meme — a focused workflow without extra screens.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Meme Generator",
        body: "Navigate to Pix-8 in your browser — no install, no sign-up, and no file upload to a remote service.",
      },
      {
        title: "Type with live preview",
        body: "Select a template or open your own image locally. Enter top and bottom captions and watch the meme update on-device in real time.",
      },
      {
        title: "Export immediately",
        body: "Download or copy one flattened image — ready to post or send without a server render step.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for a fast meme creator without uploading?",
      body: "Open Meme Generator, type your captions with live preview, and export — privately, entirely on your device.",
      button: "Open Meme Generator",
    },
  },
  "custom-meme-maker": {
    eyebrow: "Custom · Client-side · No upload",
    titleMain: "Custom Meme Maker",
    titleAccent: "Your Image, Your Words",
    heroSubtitle:
      "Use a custom meme maker in your browser — no upload, no account, no cloud queue. Start from your own JPG, PNG, or WEBP, or pick a built-in template, then write top and bottom captions with live preview and export one flattened file without sending pixels to a server.",
    primaryCta: "Make a Custom Meme — Free",
    ctaNote: "No upload · No server · Your captions",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Custom base and captions — not a full design studio",
      body: "Pix-8 Meme Generator is a custom meme maker because you supply the image and the wording — not a template-only app locked to stock formats. Load your file locally or choose a preset template, type top and bottom captions in the classic meme layout, preview on a client-side canvas, and export. It does not offer font selection, draggable text boxes, AI-generated jokes, or video meme export.",
    },
    benefitsHeading: "Why use a custom meme maker that runs locally?",
    benefitsIntro:
      "Online meme apps often require uploading your image before you can personalize captions. Pix-8 keeps customization on-device — the direct fit when you need a ",
    benefitsKeyword: "custom meme maker",
    benefitsIntroAfter:
      " for your own screenshot, reaction shot, or inside joke without handing files to a remote server.",
    benefits: [
      {
        title: "Your image as the base",
        body: "Upload JPG, PNG, or WEBP from your device — or switch to a built-in template when a preset format fits better.",
      },
      {
        title: "Your caption text",
        body: "Write top and bottom lines in the standard meme layout. Live preview updates as you type so you can refine wording before export.",
      },
      {
        title: "Private compositing",
        body: "All rendering happens in the browser tab. Pix-8 never receives your image data on a server.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Meme Generator",
        body: "Navigate to Pix-8 in your browser — no install, no sign-up, and no upload to a remote meme service.",
      },
      {
        title: "Choose your base",
        body: "Upload your own image locally or select one of four built-in templates. The canvas loads on-device before you add text.",
      },
      {
        title: "Caption and export",
        body: "Type top and bottom captions, check readability in live preview, then download or copy one flattened meme.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to make a custom meme without uploading?",
      body: "Open Meme Generator, choose your base, write your captions, and export — privately, entirely on your device.",
      button: "Open Meme Generator",
    },
  },
  "client-side-meme-generator": {
    eyebrow: "Client-side · No upload · On-device",
    titleMain: "Client-Side Meme Generator",
    titleAccent: "Canvas Rendering, No Server",
    heroSubtitle:
      "Use a client-side meme generator in your browser — your image stays on your device from load to export. Pick a template or open your own file locally, add top and bottom captions on a browser canvas with live preview, and download one flattened meme without transmitting pixels to a server.",
    primaryCta: "Open Meme Generator — Free",
    ctaNote: "No upload · No server · Client-side canvas",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Browser canvas architecture — not a cloud meme studio",
      body: "Pix-8 Meme Generator is a client-side meme generator because every step — image load, caption compositing, live preview, and export — runs on a canvas in your browser tab. Choose a built-in template or upload your image, type top and bottom captions in Impact style, and export locally. It does not route files through remote servers, generate AI jokes, or export video or GIF memes.",
    },
    benefitsHeading: "Why choose a client-side meme generator?",
    benefitsIntro:
      "Server-based meme tools treat your image as upload input. Pix-8 keeps compositing on-device — the direct fit when you need a ",
    benefitsKeyword: "client-side meme generator",
    benefitsIntroAfter:
      " for sensitive screenshots, internal jokes, or draft creatives that should never leave the browser.",
    benefits: [
      {
        title: "No server round trip",
        body: "Your file is read locally and rendered on a client-side canvas. Pix-8 never queues your image on a remote service before adding captions.",
      },
      {
        title: "Privacy by architecture",
        body: "Client-side processing is how the tool works — not a marketing claim. Images are composited in the browser tab and exported from your device.",
      },
      {
        title: "Standard meme output",
        body: "Classic top-and-bottom Impact-style captions on one base image — with live preview, download, copy, and optional EXIF stripping before share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open in your browser",
        body: "Navigate to Pix-8 Meme Generator — no install, no account, and no file upload to a remote meme API.",
      },
      {
        title: "Load on a client-side canvas",
        body: "Select a built-in template or open JPG, PNG, or WEBP from your device. The base image renders locally before you type captions.",
      },
      {
        title: "Caption and export on-device",
        body: "Enter top and bottom text, preview live on the canvas, then download or copy one flattened file — all without a server render step.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for a client-side meme generator?",
      body: "Open Meme Generator, composite captions on a browser canvas, and export — privately, entirely on your device.",
      button: "Open Meme Generator",
    },
  },
  "privacy-first-meme-maker": {
    eyebrow: "Privacy-first · Client-side · No upload",
    titleMain: "Privacy-First Meme Maker",
    titleAccent: "Your Image Never Leaves",
    heroSubtitle:
      "Use a privacy-first meme maker in your browser — personal photos, screenshots, and internal jokes stay on your device. Load a template or your own image locally, add top and bottom captions on a client-side canvas with live preview, and export without sending pixels to Pix-8 or any third-party server.",
    primaryCta: "Make a Meme — Free",
    ctaNote: "No upload · No server · On-device only",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Privacy by architecture — not a cloud meme studio",
      body: "Pix-8 Meme Generator is a privacy-first meme maker because your image is never uploaded for processing. Load a file locally or pick a built-in template, type top and bottom captions, preview on a client-side canvas, and export from your device. It does not ingest your camera roll on a remote server, generate AI jokes, watermark your download, or require an account to access basic meme creation.",
    },
    benefitsHeading: "Why use a privacy-first meme maker?",
    benefitsIntro:
      "Free meme sites often upload your image before you can add text. Pix-8 keeps creation on-device — the direct fit when you need a ",
    benefitsKeyword: "privacy-first meme maker",
    benefitsIntroAfter:
      " for sensitive screenshots, team channels, or personal photos you do not want routed through a remote service.",
    benefits: [
      {
        title: "No server upload",
        body: "Your image is read locally and composited in the browser tab. Pix-8 never receives your file on a backend for caption rendering.",
      },
      {
        title: "Optional EXIF stripping",
        body: "Remove embedded location and device metadata from exported memes before you post publicly — a practical privacy step the tool supports.",
      },
      {
        title: "No account required",
        body: "Open Meme Generator in your browser and start — no sign-up flow that ties your memes to a cloud profile.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Meme Generator",
        body: "Navigate to Pix-8 in your browser — no install, no account, and no file upload to a remote meme service.",
      },
      {
        title: "Load your image locally",
        body: "Select a built-in template or open JPG, PNG, or WEBP from your device. The base renders on a client-side canvas before captions are added.",
      },
      {
        title: "Caption and export privately",
        body: "Type top and bottom text with live preview, optionally strip EXIF metadata, then download or copy one flattened meme from your device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for a privacy-first meme maker?",
      body: "Open Meme Generator, add your captions on-device, and export — without uploading your image to a server.",
      button: "Open Meme Generator",
    },
  },
  "browser-based-meme-generator": {
    eyebrow: "Browser-based · Client-side · No upload",
    titleMain: "Browser-Based Meme Generator",
    titleAccent: "No Install, In Your Tab",
    heroSubtitle:
      "Use a browser-based meme generator — no desktop app, no extension, no upload queue. Open Pix-8 in your browser, load a template or your own image locally, add top and bottom captions on a client-side canvas with live preview, and export one flattened meme without sending pixels to a server.",
    primaryCta: "Open Meme Generator — Free",
    ctaNote: "No install · No server · Browser canvas",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Meme creation in a browser tab — not a desktop install",
      body: "Pix-8 Meme Generator is a browser-based meme generator because the full workflow runs in your web browser on a client-side canvas — not a native app or cloud studio that ingests your files first. Pick a built-in template or upload your image, type top and bottom captions, preview live, and export locally. It does not require a download, browser plugin, AI joke generator, or video meme export.",
    },
    benefitsHeading: "Why use a browser-based meme generator?",
    benefitsIntro:
      "Desktop meme apps add install friction and permissions. Pix-8 opens in a browser tab with on-device compositing — the direct fit when you need a ",
    benefitsKeyword: "browser-based meme generator",
    benefitsIntroAfter:
      " on any machine without routing images through a remote meme service.",
    benefits: [
      {
        title: "No install required",
        body: "Open Meme Generator in Chrome, Firefox, Safari, or Edge — no desktop download, extension, or account setup.",
      },
      {
        title: "Client-side canvas",
        body: "Your image loads locally and captions render on a browser canvas. Pix-8 never receives your file on a server for processing.",
      },
      {
        title: "Classic meme export",
        body: "Top and bottom Impact-style captions on one base image — download, copy, or optionally strip EXIF before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open in your browser",
        body: "Navigate to Pix-8 Meme Generator — no install, no sign-up, and no file upload to a remote service.",
      },
      {
        title: "Build on the canvas",
        body: "Select one of four built-in templates or open JPG, PNG, or WEBP from your device. Type top and bottom captions with live preview in the tab.",
      },
      {
        title: "Export from the browser",
        body: "Download or copy one flattened meme to your device — composited entirely on a client-side canvas, not on a remote server.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for a browser-based meme generator?",
      body: "Open Meme Generator in your browser, add captions on-device, and export — no install, no upload.",
      button: "Open Meme Generator",
    },
  },
  "no-upload-meme-creator": {
    eyebrow: "No upload · Client-side · On-device",
    titleMain: "No-Upload Meme Creator",
    titleAccent: "Open Locally, Export Privately",
    heroSubtitle:
      "Use a no-upload meme creator in your browser — your image never leaves your device for server processing. Open a template or your own JPG, PNG, or WEBP locally, add top and bottom captions on a client-side canvas with live preview, and export one flattened meme without transmitting pixels to Pix-8 or any third-party server.",
    primaryCta: "Create a Meme — Free",
    ctaNote: "No server upload · Client-side canvas",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Local file access — not a cloud upload queue",
      body: "Pix-8 Meme Generator is a no-upload meme creator because your image is read from your device and composited in the browser tab — not sent to a remote server before captions render. Choose a built-in template or open your own file, type top and bottom text, preview live, and export locally. It does not queue files on a backend, generate AI jokes, watermark downloads, or require an account.",
    },
    benefitsHeading: "Why use a no-upload meme creator?",
    benefitsIntro:
      "Cloud meme tools treat every image as upload input. Pix-8 skips the server entirely — the direct fit when you need a ",
    benefitsKeyword: "no-upload meme creator",
    benefitsIntroAfter:
      " for personal photos, screenshots, or internal content you refuse to route through a remote meme service.",
    benefits: [
      {
        title: "Zero server transfer",
        body: "Your file stays on your device from open to export. Pix-8 never receives your image on a backend for caption rendering.",
      },
      {
        title: "Live preview without upload wait",
        body: "See top and bottom captions update on a client-side canvas as you type — no waiting for a remote server to process your file first.",
      },
      {
        title: "Optional EXIF stripping",
        body: "Remove embedded location and device metadata from exported memes before you share publicly — supported before download or copy.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Meme Generator",
        body: "Navigate to Pix-8 in your browser — no install, no account, and no upload to a remote meme API.",
      },
      {
        title: "Open your image locally",
        body: "Select a built-in template or choose JPG, PNG, or WEBP from your device. The file is read locally — not uploaded to a server.",
      },
      {
        title: "Caption and export on-device",
        body: "Type top and bottom captions with live preview, optionally strip EXIF metadata, then download or copy one flattened meme from your browser.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for a no-upload meme creator?",
      body: "Open Meme Generator, add captions on-device, and export — your image never uploads to a server.",
      button: "Open Meme Generator",
    },
  },
  "upload-and-meme-your-photos": {
    eyebrow: "Photos · Client-side · No server upload",
    titleMain: "Upload and Meme Your Photos",
    titleAccent: "Open Locally, Caption On-Device",
    heroSubtitle:
      "Upload and meme your photos in your browser — open JPG, PNG, or WEBP from your device, add top and bottom captions on a client-side canvas with live preview, and export one flattened meme without sending your pictures to Pix-8 or any third-party server.",
    primaryCta: "Meme Your Photo — Free",
    ctaNote: "Local file open · No server upload",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Photo to meme — not a cloud camera-roll uploader",
      body: "Pix-8 Meme Generator lets you upload and meme your photos by opening files locally in the browser — not routing your camera roll through a remote server first. Pick a personal shot or screenshot, type top and bottom captions in the classic meme layout, preview live, and export one flattened image. It does not retouch photos, batch-process albums, or generate AI captions.",
    },
    benefitsHeading: "Why upload and meme photos without a server?",
    benefitsIntro:
      "Photo-meme apps often require a true cloud upload before captions appear. Pix-8 reads your file on-device — the direct fit when you want to ",
    benefitsKeyword: "upload and meme your photos",
    benefitsIntroAfter:
      " from camera roll shots, reaction pics, or team screenshots without handing images to a remote service.",
    benefits: [
      {
        title: "Open from your device",
        body: "Select JPG, PNG, or WEBP through the browser file picker. Your photo loads on a client-side canvas — not a server upload queue.",
      },
      {
        title: "Caption with live preview",
        body: "Type top and bottom Impact-style text and watch the meme update as you edit — standard two-line layout audiences recognize.",
      },
      {
        title: "Export privately",
        body: "Download or copy one flattened meme per photo, with optional EXIF metadata stripping before you share publicly.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Meme Generator",
        body: "Navigate to Pix-8 in your browser — no install, no account, and no cloud upload of your photo library.",
      },
      {
        title: "Upload your photo locally",
        body: "Choose a JPG, PNG, or WEBP from your device, or pick a built-in template. The image renders on a client-side canvas before captions are added.",
      },
      {
        title: "Meme and export",
        body: "Type top and bottom captions, check readability in live preview, then download or copy one flattened meme from your browser.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to upload and meme your photos?",
      body: "Open Meme Generator, pick a photo from your device, add captions on-device, and export — without a server upload.",
      button: "Open Meme Generator",
    },
  },
  "easy-meme-editor-for-images": {
    eyebrow: "Easy · Client-side · No upload",
    titleMain: "Easy Meme Editor for Images",
    titleAccent: "Simple Captions, On-Device",
    heroSubtitle:
      "Use an easy meme editor for images in your browser — no install, no account, no server upload. Open a template or your own JPG, PNG, or WEBP locally, type top and bottom captions with live preview on a client-side canvas, and export one flattened meme without sending pixels to a remote service.",
    primaryCta: "Edit a Meme — Free",
    ctaNote: "No upload · No server · Two caption fields",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "A focused meme editor — not a full image suite",
      body: "Pix-8 Meme Generator is an easy meme editor for images because the workflow stays minimal: load one image on a client-side canvas, enter top and bottom text, preview live, and export. Four built-in templates are included, or use your own photo. It does not offer layer panels, brush tools, crop presets, AI caption writers, or video meme export — simplicity by design, not feature omission disguised as ease.",
    },
    benefitsHeading: "Why use an easy meme editor that runs locally?",
    benefitsIntro:
      "Heavy meme apps bury captioning under design-tool complexity. Pix-8 keeps image-to-meme editing direct — the practical fit when you need an ",
    benefitsKeyword: "easy meme editor for images",
    benefitsIntroAfter:
      " for a quick reaction graphic, screenshot joke, or team post without learning a full editor.",
    benefits: [
      {
        title: "Two fields, one layout",
        body: "Top text and bottom text in the classic meme format — no layer stack, font picker, or drag handles to configure.",
      },
      {
        title: "Live preview on canvas",
        body: "See captions update on your image as you type on a client-side canvas — your file stays on your device throughout.",
      },
      {
        title: "One-click export",
        body: "Download or copy one flattened meme per session, with optional EXIF stripping before you share publicly.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Meme Generator",
        body: "Navigate to Pix-8 in your browser — no install, no sign-up, and no upload to a remote meme service.",
      },
      {
        title: "Load your image",
        body: "Pick a built-in template or open JPG, PNG, or WEBP from your device. The base renders locally before you add captions.",
      },
      {
        title: "Caption and export",
        body: "Type top and bottom text, check readability in live preview, then download or copy one flattened meme from your browser.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for an easy meme editor for images?",
      body: "Open Meme Generator, add captions on-device, and export — simple workflow, no server upload.",
      button: "Open Meme Generator",
    },
  },
  "professional-meme-creation-tool": {
    eyebrow: "Professional · Client-side · No upload",
    titleMain: "Professional Meme Creation Tool",
    titleAccent: "Consistent Output, On-Device",
    heroSubtitle:
      "Use a professional meme creation tool in your browser — no install, no account, no server upload. Load a template or your own image locally, add top and bottom captions with live preview on a client-side canvas, and export one flattened meme without transmitting pixels to Pix-8 or any third-party server.",
    primaryCta: "Create a Meme — Free",
    ctaNote: "No upload · No server · Reliable export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "A dependable meme workflow — not an enterprise creative suite",
      body: "Pix-8 Meme Generator is a professional meme creation tool because it produces consistent, readable top-and-bottom captions on a client-side canvas — not a cloud platform with brand portals and approval chains. Pick a template or open your image, type captions with live preview, and export one flattened file. It does not include team workspaces, scheduled publishing, custom font libraries, or AI joke generation.",
    },
    benefitsHeading: "Why teams choose a professional meme tool that runs locally?",
    benefitsIntro:
      "Cloud meme apps route internal screenshots through remote servers. Pix-8 keeps creation on-device — the direct fit when you need a ",
    benefitsKeyword: "professional meme creation tool",
    benefitsIntroAfter:
      " for comms, marketing drafts, or channel updates without exposing files to a third-party backend.",
    benefits: [
      {
        title: "Consistent meme format",
        body: "Impact-style top and bottom captions with outline and auto-wrapping — the readable standard audiences expect in professional feeds and internal channels.",
      },
      {
        title: "Private by architecture",
        body: "Images are composited on a client-side canvas in your browser. Pix-8 never receives your file on a server for caption rendering.",
      },
      {
        title: "Export-ready output",
        body: "Download or copy one flattened image per session, with optional EXIF metadata stripping before you publish or share externally.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Meme Generator",
        body: "Navigate to Pix-8 in your browser — no install, no sign-up, and no upload to a remote meme platform.",
      },
      {
        title: "Prepare your base image",
        body: "Select a built-in template or open JPG, PNG, or WEBP from your device. The image loads locally on a client-side canvas.",
      },
      {
        title: "Caption and export",
        body: "Enter top and bottom text, verify readability in live preview, then download or copy one flattened meme from your device.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for a professional meme creation tool?",
      body: "Open Meme Generator, craft captions on-device, and export — consistent format, no server upload.",
      button: "Open Meme Generator",
    },
  },
  "funny-meme-generator-online": {
    eyebrow: "Funny · Online · Client-side",
    titleMain: "Funny Meme Generator Online",
    titleAccent: "Your Joke, Your Captions",
    heroSubtitle:
      "Use a funny meme generator online in your browser — no install, no account, no server upload. Pick an iconic template or your own image, write top and bottom captions with live preview on a client-side canvas, and export one flattened meme without sending pixels to a remote service.",
    primaryCta: "Make a Funny Meme — Free",
    ctaNote: "No upload · No server · You write the joke",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "You write the humor — not an AI joke bot",
      body: "Pix-8 Meme Generator is a funny meme generator online because it gives you the classic meme canvas to craft your own punchlines — not a cloud app that auto-generates captions or ingests your camera roll first. Choose a built-in template or open your image locally, type top and bottom text, preview live, and export. It does not suggest jokes, apply comedy filters, or guarantee viral reach.",
    },
    benefitsHeading: "Why use a funny meme generator that runs locally?",
    benefitsIntro:
      "Meme apps that upload your image before you can caption it slow down the joke. Pix-8 keeps creation on-device — the direct fit when you need a ",
    benefitsKeyword: "funny meme generator online",
    benefitsIntroAfter:
      " for a quick reaction post, group chat reply, or inside joke without routing files through a remote server.",
    benefits: [
      {
        title: "Iconic meme templates",
        body: "Four built-in formats — Distracted Boyfriend, Drake, Change My Mind, Two Buttons — ready for your caption twist, or use your own photo as the base.",
      },
      {
        title: "Live preview as you type",
        body: "Refine punchlines on a client-side canvas with instant feedback — see top and bottom text land before you export.",
      },
      {
        title: "Private compositing",
        body: "Your image stays on your device. Pix-8 never receives your file on a server for caption rendering.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Meme Generator",
        body: "Navigate to Pix-8 in your browser — no install, no sign-up, and no upload to a remote meme service.",
      },
      {
        title: "Pick your setup",
        body: "Select a built-in template or open JPG, PNG, or WEBP from your device. The base loads locally on a client-side canvas.",
      },
      {
        title: "Write and export",
        body: "Type your funny top and bottom captions, check readability in live preview, then download or copy one flattened meme.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for a funny meme generator online?",
      body: "Open Meme Generator, write your captions on-device, and export — your humor, no server upload.",
      button: "Open Meme Generator",
    },
  },
};
