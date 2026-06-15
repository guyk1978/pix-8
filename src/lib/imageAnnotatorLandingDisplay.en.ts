import type {
  ImageAnnotatorLandingChrome,
  ImageAnnotatorLandingDisplayFields,
} from "@/lib/imageAnnotatorLandingTypes";
import type { ImageAnnotatorLandingId } from "@/lib/imageAnnotatorLandings";

export const IMAGE_ANNOTATOR_LANDING_CHROME_EN: ImageAnnotatorLandingChrome = {
  privacyNote: "Client-side canvas only — your image never leaves the browser.",
  relatedUseCasesHeading: "Related use cases",
  guidesHeading: "Guides",
  toolCardTitle: "Image Annotator tool",
  toolCardExcerpt:
    "Open the workspace — place tags, edit labels, and export locally.",
};

export const IMAGE_ANNOTATOR_LANDING_DISPLAY_EN: Record<
  ImageAnnotatorLandingId,
  Omit<ImageAnnotatorLandingDisplayFields, "capabilities">
> = {
  "annotate-images-online-free": {
    eyebrow: "Client-side · No upload · Free",
    titleMain: "Annotate Images Online Free",
    titleAccent: "Private Browser Annotation",
    heroSubtitle:
      "Place labeled tags on screenshots and photos without uploading a single byte. Pix-8 Image Annotator runs entirely in your browser — fast, free, and built for teams that treat image data as sensitive.",
    primaryCta: "Start Annotating — Free",
    ctaNote: "No account · No server upload · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Intent-accurate annotation",
      body: "Image Annotator places labeled pin markers — not freehand shapes, arrows, or blur tools. For screenshot feedback and tutorials, callouts with text labels are faster to place and stay sharp at any size.",
    },
    benefitsHeading: "Why annotate images in the browser?",
    benefitsIntro:
      "Most online editors route your file through a remote server. Pix-8 keeps annotation local — the core advantage when you need to ",
    benefitsKeyword: "annotate images online free",
    benefitsIntroAfter: "without compromising confidentiality.",
    benefits: [
      {
        title: "Privacy by architecture",
        body: "Client-side processing only. Your screenshots, mockups, and internal assets never touch a cloud server.",
      },
      {
        title: "Instant, upload-free speed",
        body: "No queue, no round-trip latency. Click to tag, drag to reposition, and export in seconds.",
      },
      {
        title: "Labeled callouts, not clutter",
        body: "Pin markers with readable text labels — built for feedback, tutorials, and QA without a drawing canvas.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Load your image",
        body: "Drag and drop a screenshot or photo into the Image Annotator. Standard formats open instantly in the browser.",
      },
      {
        title: "Place labeled tags",
        body: "Click anywhere to add a callout, type a short label, and drag the marker to the exact pixel you need.",
      },
      {
        title: "Flatten and share",
        body: "Download or copy a single flattened image with all tags rendered in — ready for Slack, tickets, or docs.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to annotate images online free?",
      body: "Open the Image Annotator, place your first labeled tag, and export a flattened screenshot in under a minute — privately, on your device.",
      button: "Open Image Annotator",
    },
  },
  "draw-arrows-on-images-online": {
    eyebrow: "Browser-native · Private · Free",
    titleMain: "Draw Arrows on Images Online",
    titleAccent: "With Labeled Callouts",
    heroSubtitle:
      "Searching for arrow tools usually means one thing: point at something in a screenshot. Pix-8 Image Annotator uses labeled pin markers instead of freehand arrows — same clarity, local processing, no upload.",
    primaryCta: "Place a Callout — Free",
    ctaNote: "No account · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Expectation management",
      body: "Pix-8 does not offer a freehand arrow or shape drawer. Image Annotator places labeled pin markers — a precise, readable alternative when you need to draw attention to a UI element, tutorial step, or defect.",
    },
    benefitsHeading: "Why point at screenshots in the browser?",
    benefitsIntro:
      "Cloud markup tools copy your file to a remote server before you mark anything. Pix-8 keeps processing local — when people search to ",
    benefitsKeyword: "draw arrows on images online",
    benefitsIntroAfter:
      ", labeled callouts deliver the same outcome with better privacy and speed.",
    benefits: [
      {
        title: "Zero server exposure",
        body: "Client-side canvas only. Screenshots of dashboards, wireframes, and unreleased work stay on your device — never uploaded.",
      },
      {
        title: "Mark up in seconds",
        body: "Skip the upload queue. Click to place a callout, type a label, drag to adjust, and export without round-trip latency.",
      },
      {
        title: "Same intent, sharper result",
        body: "Labeled pin callouts solve the “point here” problem without freehand lines — readable in tickets, docs, and chat at any zoom.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open your screenshot",
        body: "Drop a PNG, JPEG, or WebP into the Image Annotator. The file loads locally — no sign-in, no cloud storage.",
      },
      {
        title: "Place a labeled callout",
        body: "Click the element you need to highlight. Add a short caption — button name, step number, or fix note — and drag the marker to refine.",
      },
      {
        title: "Flatten and send",
        body: "Download or copy one image with every callout baked in. Paste into Jira, Slack, Notion, or email as-is.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to point at your screenshot?",
      body: "Open the Image Annotator, place a labeled callout, and share a flattened image in under a minute — free, private, on your device.",
      button: "Open Image Annotator",
    },
  },
  "add-text-to-image-online": {
    eyebrow: "Client-side · No upload · Free",
    titleMain: "Add Text to Image Online",
    titleAccent: "Labeled Callouts in Your Browser",
    heroSubtitle:
      "Attach short, readable text labels to any point on a screenshot — processed entirely on your device, with no account and no file upload.",
    primaryCta: "Add a Label — Free",
    ctaNote: "No account · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Intent-accurate text labeling",
      body: "Image Annotator adds short text on pin-style callouts — not free-floating typography blocks. For headlines, quotes, or custom fonts with drag positioning, use Pix-8 Text Overlay. For screenshot notes tied to a specific element, labeled markers are faster and stay sharp when resized.",
    },
    benefitsHeading: "Why add text to images in the browser?",
    benefitsIntro:
      "Cloud editors upload your file before you type a single character. Pix-8 keeps labeling local — the core advantage when you need to ",
    benefitsKeyword: "add text to image online",
    benefitsIntroAfter: "without exposing sensitive screenshots.",
    benefits: [
      {
        title: "Your image stays local",
        body: "Text labels render on a client-side canvas — screenshots of dashboards, mockups, and client work never touch a cloud server.",
      },
      {
        title: "Caption in seconds",
        body: "No upload queue. Click to place a callout, type your label, and export a flattened image without round-trip latency.",
      },
      {
        title: "Context where it belongs",
        body: "Short labels on pin markers keep notes tied to the exact pixel — clearer than a separate message explaining what you mean.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Upload your image",
        body: "Drop a screenshot or photo into the Image Annotator. The file loads locally — no sign-in, no cloud storage.",
      },
      {
        title: "Place and type your label",
        body: "Click where the text should point, enter a short caption — button name, step number, or fix note — and drag the marker to refine.",
      },
      {
        title: "Flatten and share",
        body: "Download or copy one image with every label baked into the pixels — ready for Slack, tickets, or docs.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to add text to your image?",
      body: "Open the Image Annotator, place your first labeled callout, and export a flattened screenshot in under a minute — privately, on your device.",
      button: "Open Image Annotator",
    },
  },
  "highlight-part-of-image-online": {
    eyebrow: "Browser-native · Private · Free",
    titleMain: "Highlight Part of Image Online",
    titleAccent: "Precise Callouts in Your Browser",
    heroSubtitle:
      "Draw attention to the exact element that matters — labeled pin markers on a local canvas, with zero upload and instant export.",
    primaryCta: "Mark a Region — Free",
    ctaNote: "No account · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Expectation management",
      body: "Pix-8 does not offer rectangular area highlights, spotlight masks, or blur-the-background tools. Image Annotator places labeled pin markers — a precise alternative when you need to draw attention to a UI element, tutorial step, or defect on a screenshot.",
    },
    benefitsHeading: "Why highlight screenshots in the browser?",
    benefitsIntro:
      "Cloud markup tools copy your file to a remote server before you mark anything. Pix-8 keeps processing local — when you need to ",
    benefitsKeyword: "highlight part of image online",
    benefitsIntroAfter:
      ", labeled callouts deliver clarity with better privacy and speed.",
    benefits: [
      {
        title: "Client-side only",
        body: "Screenshots of dashboards, mockups, and unreleased work stay on your device — never uploaded to a cloud server.",
      },
      {
        title: "Mark up in seconds",
        body: "No upload queue. Click to mark a region, type a short label, and share a flattened image without round-trip latency.",
      },
      {
        title: "Precision over boxes",
        body: "Pin callouts target one exact point with readable text — often clearer than a vague highlight rectangle on busy UI screenshots.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Load your image",
        body: "Open the Image Annotator and upload a screenshot or photo — the file is read locally, with no server transfer.",
      },
      {
        title: "Mark the area",
        body: "Click the element you need to highlight, enter a short label describing that region, and drag the marker to fine-tune its position.",
      },
      {
        title: "Flatten and share",
        body: "Download or copy one image with every callout rendered in — ready for tickets, docs, or chat.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to highlight your screenshot?",
      body: "Open the Image Annotator, place a labeled callout, and share a flattened image in under a minute — free, private, on your device.",
      button: "Open Image Annotator",
    },
  },
  "image-annotator-for-web-developers": {
    eyebrow: "Client-side · No upload · Built for dev workflows",
    titleMain: "Image Annotator for Web Developers",
    titleAccent: "Local Screenshot Markup",
    heroSubtitle:
      "Flag layout bugs, name components, and ship clearer PR feedback — labeled callouts on a local canvas, with zero server upload.",
    primaryCta: "Annotate a Screenshot — Free",
    ctaNote: "No account · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Built for dev workflows, not illustration",
      body: "Image Annotator places labeled pin markers — not freehand arrows, shapes, or Figma-style drawing. For the jobs developers actually need (PR feedback, QA notes, docs screenshots), callouts with text labels are faster to place and stay legible when pasted into GitHub, Jira, or Slack.",
    },
    benefitsHeading: "Why web developers annotate locally",
    benefitsIntro:
      "Cloud markup tools upload your screenshot before you mark a single pixel. Pix-8 keeps processing on-device — the right model when you need an ",
    benefitsKeyword: "image annotator for web developers",
    benefitsIntroAfter: "who work with staging URLs and sensitive UI.",
    benefits: [
      {
        title: "Staging stays local",
        body: "Screenshots of internal dashboards, localhost, and unreleased UI never leave your machine — no cloud upload before markup.",
      },
      {
        title: "PR-ready in seconds",
        body: "Skip the upload pipeline. Click to place a callout, type a component name or bug note, and export a flattened PNG for GitHub or Jira.",
      },
      {
        title: "Readable in code review",
        body: "Labeled pin markers stay sharp in PR threads and tickets — clearer than freehand arrows on dense interface screenshots.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Capture your UI",
        body: "Take a screenshot of the interface under review, then open it in the Image Annotator — loaded locally via the browser File API.",
      },
      {
        title: "Label the issue",
        body: "Click the element in question, add a short label (component name, CSS issue, step number), and drag the marker to the exact pixel.",
      },
      {
        title: "Attach to your workflow",
        body: "Flatten and download or copy one image with all callouts baked in — paste into a PR comment, ticket, or internal docs.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to annotate your next screenshot?",
      body: "Open the Image Annotator, label your first UI element, and attach a flattened image to your PR or ticket — privately, on your device.",
      button: "Open Image Annotator",
    },
  },
  "annotate-images-for-documentation": {
    eyebrow: "Client-side · No upload · Built for documentation",
    titleMain: "Annotate Images for Documentation",
    titleAccent: "Local Screenshot Markup",
    heroSubtitle:
      "Number tutorial steps, name UI controls, and ship clearer help articles — labeled callouts on a local canvas, with zero server upload.",
    primaryCta: "Annotate a Screenshot — Free",
    ctaNote: "No account · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Built for docs, not illustration",
      body: "Image Annotator places labeled pin markers — not freehand arrows, shapes, or Figma-style drawing. For the jobs technical writers actually need (step-by-step guides, UI references, release notes), callouts with text labels are faster to place and stay legible when embedded in help centers.",
    },
    benefitsHeading: "Why documentation teams annotate locally",
    benefitsIntro:
      "Cloud markup tools upload your screenshot before you mark a single pixel. Pix-8 keeps processing on-device — the right model when you need to ",
    benefitsKeyword: "annotate images for documentation",
    benefitsIntroAfter: "that include staging URLs or unreleased product UI.",
    benefits: [
      {
        title: "Docs stay private",
        body: "Screenshots of unreleased UI, internal tools, and staging environments never leave your machine — no cloud upload before markup.",
      },
      {
        title: "Publish-ready in seconds",
        body: "Skip the upload pipeline. Click to place a callout, type a step label or control name, and export a flattened PNG for your help article.",
      },
      {
        title: "Clear in tutorials",
        body: "Labeled pin markers stay sharp when embedded in docs — clearer than freehand arrows on dense interface screenshots.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Capture the screen",
        body: "Take a screenshot of the UI you are documenting, then open it in the Image Annotator — loaded locally via the browser File API.",
      },
      {
        title: "Label each step",
        body: "Click the control or area you are explaining, add a short label (button name, step number, setting name), and drag the marker to the exact pixel.",
      },
      {
        title: "Embed in your docs",
        body: "Flatten and download or copy one image with all callouts baked in — paste into Notion, Confluence, GitBook, or any CMS.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to annotate your next doc screenshot?",
      body: "Open the Image Annotator, label your first UI element, and embed a flattened image in your help article — privately, on your device.",
      button: "Open Image Annotator",
    },
  },
  "image-markup-for-remote-teams": {
    eyebrow: "Client-side · No upload · Built for distributed teams",
    titleMain: "Image Markup for Remote Teams",
    titleAccent: "Local Screenshot Callouts",
    heroSubtitle:
      "Give distributed teammates clearer async feedback — labeled pin markers on a local canvas, exported in seconds, with zero server upload.",
    primaryCta: "Annotate a Screenshot — Free",
    ctaNote: "No account · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Built for async handoffs, not live co-editing",
      body: "Image Annotator places labeled pin markers — not real-time collaboration, shared workspaces, or freehand drawing. For the jobs remote teams actually need (async feedback, QA notes, design reviews), callouts with text labels export fast and stay legible when pasted into Slack, Linear, or Jira.",
    },
    benefitsHeading: "Why remote teams markup locally",
    benefitsIntro:
      "Cloud markup tools upload your screenshot before you mark a single pixel. Pix-8 keeps processing on-device — the right model when you need ",
    benefitsKeyword: "image markup for remote teams",
    benefitsIntroAfter: "working across time zones with sensitive UI.",
    benefits: [
      {
        title: "Screenshots stay local",
        body: "Screenshots never leave the device — safe for internal dashboards, customer data, and unreleased UI shared across time zones.",
      },
      {
        title: "Async-ready exports",
        body: "Flatten labeled callouts into one PNG you can drop into Slack, Linear, Jira, or email without a markup account.",
      },
      {
        title: "Legible at a glance",
        body: "Text labels on pin markers stay sharp in thread thumbnails, unlike freehand scribbles on dense interface screenshots.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Capture the screen",
        body: "Capture the screen you need to discuss, then open it in Image Annotator — loaded locally via the browser File API.",
      },
      {
        title: "Label the point",
        body: "Click to place a labeled pin marker, type a short note (bug, question, step number), and drag it to the exact pixel.",
      },
      {
        title: "Share with the team",
        body: "Flatten and download or copy one image with all callouts baked in — paste it into your team channel or ticket.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to markup your next team screenshot?",
      body: "Open the Image Annotator, label your first callout, and share a flattened image with your team — privately, on your device.",
      button: "Open Image Annotator",
    },
  },
  "screenshot-annotation-tool-for-designers": {
    eyebrow: "Client-side · No upload · Built for design handoffs",
    titleMain: "Screenshot Annotation Tool for Designers",
    titleAccent: "Local Mockup Callouts",
    heroSubtitle:
      "Mark design handoffs with labeled pin callouts on a local canvas — name elements, flag spacing issues, and export shareable screenshots without uploading client work.",
    primaryCta: "Annotate a Screenshot — Free",
    ctaNote: "No account · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Built for design handoffs, not illustration",
      body: "Image Annotator places labeled pin markers — not freehand arrows, vector shapes, or Figma-style drawing. For the jobs designers actually need on static screenshots (handoff notes, review feedback, stakeholder markup), callouts with text labels are faster to place and stay legible when pasted into Slack, email, or tickets.",
    },
    benefitsHeading: "Why designers annotate screenshots locally",
    benefitsIntro:
      "Cloud markup tools upload your mockup before you mark a single pixel. Pix-8 keeps processing on-device — the right model when you need a ",
    benefitsKeyword: "screenshot annotation tool for designers",
    benefitsIntroAfter:
      " who share client work without exposing files to a server.",
    benefits: [
      {
        title: "Client work stays local",
        body: "Mockups, wireframes, and unreleased UI never leave your device before markup — no cloud upload before you place a callout.",
      },
      {
        title: "Handoff-ready in seconds",
        body: "Click to place a callout, type a component or layer note, and flatten one PNG for Slack, Figma comments, or email.",
      },
      {
        title: "Readable in design review",
        body: "Text labels on pin markers stay sharp in threads and tickets — clearer than freehand scribbles on dense interface screenshots.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open your screenshot",
        body: "Drop a PNG, JPEG, or WebP into Image Annotator — the file loads locally via the browser File API.",
      },
      {
        title: "Label the element",
        body: "Click the control or area under review, add a short label (component name, spacing note, revision number), and drag the marker to the exact pixel.",
      },
      {
        title: "Share the handoff",
        body: "Flatten and download or copy one image with all callouts baked in — paste into a design review, ticket, or stakeholder thread.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to annotate your next design screenshot?",
      body: "Open the Image Annotator, label your first element, and share a flattened handoff image — privately, on your device.",
      button: "Open Image Annotator",
    },
  },
  "fast-image-editor-for-marketing-teams": {
    eyebrow: "Client-side · No upload · Built for marketing workflows",
    titleMain: "Fast Image Editor for Marketing Teams",
    titleAccent: "Local Screenshot Markup",
    heroSubtitle:
      "Mark campaign screenshots with labeled pin callouts on a local canvas — flag copy changes, name UI elements, and export approval-ready images without uploading unreleased creative.",
    primaryCta: "Annotate a Screenshot — Free",
    ctaNote: "No account · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Built for fast screenshot markup, not full creative editing",
      body: "Image Annotator places labeled pin markers — not filters, crop tools, layers, or template builders. For the jobs marketing teams actually need on static screenshots (approval notes, feedback on ads, landing page reviews), callouts with text labels export in seconds and stay legible in Slack, email, or stakeholder threads.",
    },
    benefitsHeading: "Why marketing teams markup locally",
    benefitsIntro:
      "Cloud editors upload your creative before you mark anything. Pix-8 keeps processing on-device — the right model when you need a ",
    benefitsKeyword: "fast image editor for marketing teams",
    benefitsIntroAfter:
      " that annotates screenshots without server latency or asset exposure.",
    benefits: [
      {
        title: "Campaign assets stay local",
        body: "Ad screenshots, landing page captures, and pre-launch creative never leave your device — no cloud upload before markup.",
      },
      {
        title: "Approval-ready in seconds",
        body: "Skip the upload queue. Click to place a callout, type a revision note or CTA label, and flatten one PNG for your review thread.",
      },
      {
        title: "Clear in stakeholder threads",
        body: "Text labels on pin markers stay sharp in email and chat thumbnails — clearer than freehand scribbles on busy marketing screenshots.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open your screenshot",
        body: "Drop a PNG, JPEG, or WebP into Image Annotator — the file loads locally via the browser File API.",
      },
      {
        title: "Label the change",
        body: "Click the element under review, add a short label (headline edit, CTA note, version number), and drag the marker to the exact pixel.",
      },
      {
        title: "Share for approval",
        body: "Flatten and download or copy one image with all callouts baked in — paste into Slack, email, or your campaign approval workflow.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to markup your next campaign screenshot?",
      body: "Open the Image Annotator, place your first labeled callout, and share a flattened image with your team — privately, on your device.",
      button: "Open Image Annotator",
    },
  },
  "browser-based-image-annotator": {
    eyebrow: "Browser-native · Client-side · No upload",
    titleMain: "Browser-Based Image Annotator",
    titleAccent: "Private Screenshot Markup",
    heroSubtitle:
      "Annotate screenshots entirely in your browser — labeled pin callouts on a local canvas, no install, no account, and zero server upload.",
    primaryCta: "Open Annotator — Free",
    ctaNote: "No install · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Browser-based, not cloud-hosted markup",
      body: "Image Annotator runs in the tab on a client-side canvas — not a remote editor that copies your file to a server first. It places labeled pin markers, not freehand arrows, shapes, or collaborative layers. For screenshot feedback and tutorials, callouts with text labels open fast and export without a round-trip upload.",
    },
    benefitsHeading: "Why use a browser-based image annotator?",
    benefitsIntro:
      "Most online annotators route your file through a remote server before you mark anything. Pix-8 keeps every step in the browser — the core advantage of a ",
    benefitsKeyword: "browser-based image annotator",
    benefitsIntroAfter:
      " that processes screenshots locally with no install required.",
    benefits: [
      {
        title: "No install, no account",
        body: "Open a tab, load your screenshot, and start marking — no extension, desktop app, or sign-up wall before your first callout.",
      },
      {
        title: "Client-side by default",
        body: "Markup renders on a local canvas in the browser. Your screenshots, mockups, and internal assets never touch a cloud server.",
      },
      {
        title: "Export without upload latency",
        body: "Place labeled callouts, edit text in the Inspector, and flatten one shareable image in seconds — no queue, no round-trip.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open in your browser",
        body: "Navigate to Pix-8 Image Annotator and load a screenshot or photo — the file stays on your device via the browser File API.",
      },
      {
        title: "Place labeled callouts",
        body: "Click to add a pin marker, type a short label, and drag to reposition on the canvas — all processed client-side in the tab.",
      },
      {
        title: "Flatten and share",
        body: "Download or copy a single flattened image with every callout baked in — ready for Slack, tickets, email, or docs.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to annotate in your browser?",
      body: "Open the Image Annotator, place your first labeled callout, and export a flattened screenshot — privately, with no install and no upload.",
      button: "Open Image Annotator",
    },
  },
  "client-side-image-editor": {
    eyebrow: "On-device · No upload · Client-side canvas",
    titleMain: "Client-Side Image Editor",
    titleAccent: "Private Screenshot Markup",
    heroSubtitle:
      "Mark up screenshots entirely on your device — labeled pin callouts on a local browser canvas, with zero server upload and no cloud processing.",
    primaryCta: "Edit Locally — Free",
    ctaNote: "No server · No account · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Client-side markup, not a cloud creative suite",
      body: "Image Annotator runs on a client-side canvas in your browser — your file never leaves the machine. It places labeled pin markers, not filters, crop tools, layers, or retouching brushes. For screenshot feedback and handoffs, callouts with text labels are the fast, private alternative to uploading images to a cloud editor.",
    },
    benefitsHeading: "Why choose a client-side image editor?",
    benefitsIntro:
      "Cloud editors copy your file to a remote server before you touch a pixel. Pix-8 processes everything on-device — the core advantage of a ",
    benefitsKeyword: "client-side image editor",
    benefitsIntroAfter:
      " that keeps screenshot markup local, fast, and private.",
    benefits: [
      {
        title: "Zero server exposure",
        body: "Every operation runs on a client-side canvas in your browser. Screenshots, mockups, and sensitive assets never touch a cloud server.",
      },
      {
        title: "No upload latency",
        body: "Skip the round-trip. Click to place a callout, edit labels in the Inspector, and flatten one exportable image in seconds.",
      },
      {
        title: "Privacy by architecture",
        body: "Client-side processing is not a setting — it is how the tool works. Your file is read locally and stays on your device through export.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Load on your device",
        body: "Open Image Annotator in your browser and load a screenshot — the file is read locally via the File API, with no server transfer.",
      },
      {
        title: "Mark up client-side",
        body: "Click to place labeled pin markers, type short labels, and drag to reposition — all rendered on the on-device canvas.",
      },
      {
        title: "Export locally",
        body: "Flatten and download or copy one image with all callouts baked in — share without ever uploading the source file.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to edit screenshots client-side?",
      body: "Open the Image Annotator, place your first labeled callout, and export a flattened image — processed entirely on your device.",
      button: "Open Image Annotator",
    },
  },
  "privacy-focused-image-editor": {
    eyebrow: "Zero upload · Client-side · Privacy by design",
    titleMain: "Privacy-Focused Image Editor",
    titleAccent: "Local Screenshot Markup",
    heroSubtitle:
      "Annotate screenshots without sending a single byte to a server — labeled pin callouts on a client-side canvas, built for teams that treat image data as confidential.",
    primaryCta: "Annotate Privately — Free",
    ctaNote: "No upload · No account · On-device export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Privacy by architecture, not policy alone",
      body: "Image Annotator never routes your file through a remote server — markup runs on a client-side canvas in the browser. It places labeled pin markers, not filters, crop tools, or retouching brushes. For screenshot feedback where confidentiality matters, callouts with text labels export locally without a cloud round-trip.",
    },
    benefitsHeading: "Why privacy-focused teams choose local markup",
    benefitsIntro:
      "Most online editors upload your image before you annotate. Pix-8 keeps every step on-device — the defining advantage of a ",
    benefitsKeyword: "privacy-focused image editor",
    benefitsIntroAfter:
      " that processes screenshots locally with no server exposure.",
    benefits: [
      {
        title: "No file leaves your device",
        body: "Your screenshot is read locally via the browser File API. Pix-8 does not receive, store, or process the source image on any server.",
      },
      {
        title: "Markup without cloud latency",
        body: "Place labeled callouts, edit text in the Inspector, and flatten one exportable image in seconds — no upload queue before your first edit.",
      },
      {
        title: "Safe for sensitive screenshots",
        body: "Ideal for unreleased UI, client mockups, internal dashboards, and regulated workflows where uploading images to a third party is not an option.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Load locally",
        body: "Open Image Annotator in your browser and select a screenshot — the file stays on your device, with no server transfer.",
      },
      {
        title: "Annotate on-device",
        body: "Click to place labeled pin markers, type short labels, and drag to reposition — all rendered on the client-side canvas.",
      },
      {
        title: "Export without upload",
        body: "Download or copy a flattened image with every callout baked in — share the result, not your source file, via any channel you trust.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to annotate without uploading?",
      body: "Open the Image Annotator, place your first labeled callout, and export a flattened screenshot — privately, entirely on your device.",
      button: "Open Image Annotator",
    },
  },
  "no-install-image-annotation-tool": {
    eyebrow: "No install · Browser-native · Client-side",
    titleMain: "No-Install Image Annotation Tool",
    titleAccent: "Instant Browser Markup",
    heroSubtitle:
      "Annotate screenshots in your browser — no download, no extension, no account. Labeled pin callouts on a client-side canvas, with zero server upload.",
    primaryCta: "Annotate Now — Free",
    ctaNote: "No install · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Open and annotate — no install step",
      body: "Image Annotator runs in a browser tab on a client-side canvas — not a desktop installer or extension that requests system permissions. It places labeled pin markers, not freehand arrows, shapes, or collaborative layers. For quick screenshot feedback, callouts with text labels start fast and export without an install or upload.",
    },
    benefitsHeading: "Why use a no-install image annotation tool?",
    benefitsIntro:
      "Installable apps add friction before your first mark. Pix-8 opens in the browser and processes locally — the practical advantage of a ",
    benefitsKeyword: "no-install image annotation tool",
    benefitsIntroAfter:
      " that starts in seconds with no download or sign-up wall.",
    benefits: [
      {
        title: "Zero install friction",
        body: "Open a tab, load your screenshot, and place your first callout — no app store, extension, or admin approval required.",
      },
      {
        title: "Client-side by default",
        body: "Markup renders on a local canvas in the browser. Your screenshots never touch a cloud server before or during annotation.",
      },
      {
        title: "Shareable in one step",
        body: "Flatten labeled callouts into one PNG and paste into Slack, email, or tickets — no syncing through an installed app's cloud account.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open in your browser",
        body: "Navigate to Pix-8 Image Annotator — no download, no extension, no install wizard.",
      },
      {
        title: "Load and label",
        body: "Select a screenshot, click to place labeled pin markers, edit text in the Inspector, and drag markers on the client-side canvas.",
      },
      {
        title: "Flatten and send",
        body: "Download or copy one flattened image with all callouts baked in — ready to share immediately.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to annotate without installing anything?",
      body: "Open the Image Annotator in your browser, place your first labeled callout, and export a flattened screenshot — no install, no upload.",
      button: "Open Image Annotator",
    },
  },
  "lightweight-image-markup-tool": {
    eyebrow: "Lightweight · Focused · Client-side",
    titleMain: "Lightweight Image Markup Tool",
    titleAccent: "Focused Screenshot Callouts",
    heroSubtitle:
      "Mark up screenshots without heavyweight software. Labeled pin callouts on a client-side canvas — no upload, no bloat, no account.",
    primaryCta: "Mark Up Now — Free",
    ctaNote: "No bloat · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Markup without the overhead",
      body: "Image Annotator is a focused markup surface on a client-side canvas — not a full creative suite with layers, filters, or cloud asset libraries. It places labeled pin markers, not freehand arrows, shapes, or collaborative boards. For quick screenshot notes, callouts with text labels stay fast and export without heavyweight installs or uploads.",
    },
    benefitsHeading: "Why use a lightweight image markup tool?",
    benefitsIntro:
      "Heavy editors slow down a simple screenshot note. Pix-8 keeps markup minimal and local — the practical fit for a ",
    benefitsKeyword: "lightweight image markup tool",
    benefitsIntroAfter:
      " that places labeled callouts and exports in seconds.",
    benefits: [
      {
        title: "Focused workflow",
        body: "One canvas, labeled pin markers, and an Inspector panel — no toolbars, plugins, or account walls between you and your first callout.",
      },
      {
        title: "Client-side by default",
        body: "Markup renders on a local canvas in the browser. Your screenshots never touch a cloud server before or during markup.",
      },
      {
        title: "Portable output",
        body: "Flatten labeled callouts into one PNG and paste into Slack, email, or tickets — no syncing through a heavyweight editor's cloud account.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open the annotator",
        body: "Navigate to Pix-8 Image Annotator — a lightweight markup surface in your browser tab, no install required.",
      },
      {
        title: "Place labeled callouts",
        body: "Load a screenshot, click to place labeled pin markers, edit text in the Inspector, and drag markers on the client-side canvas.",
      },
      {
        title: "Flatten and share",
        body: "Download or copy one flattened image with all callouts baked in — ready to send immediately.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for lightweight screenshot markup?",
      body: "Open the Image Annotator, place your first labeled callout, and export a flattened screenshot — minimal UI, fully on your device.",
      button: "Open Image Annotator",
    },
  },
};
