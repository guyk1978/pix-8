export const IMAGE_ANNOTATOR_TOOL_HREF = "/tools/editor-studio/image-annotator";

export const LANDING_ACCENT = "#8E977D";

export const IMAGE_ANNOTATOR_ARTICLE = {
  href: "/articles/image-annotator-guide",
  title: "How to Use the Image Annotator",
  excerpt:
    "Step-by-step guide: place labeled tags, reposition markers, and export flattened screenshots locally.",
} as const;

/** What Image Annotator actually supports — use for intent-accurate copy. */
export const IMAGE_ANNOTATOR_CAPABILITIES = [
  "Click-to-place labeled pin markers",
  "Drag markers to reposition on the canvas",
  "Edit tag labels in the Inspector panel",
  "Flatten and download or copy to clipboard",
  "Optional EXIF metadata stripping before export",
] as const;

export type ImageAnnotatorLandingId =
  | "annotate-images-online-free"
  | "draw-arrows-on-images-online"
  | "add-text-to-image-online"
  | "highlight-part-of-image-online"
  | "image-annotator-for-web-developers"
  | "annotate-images-for-documentation"
  | "image-markup-for-remote-teams"
  | "screenshot-annotation-tool-for-designers"
  | "fast-image-editor-for-marketing-teams"
  | "browser-based-image-annotator"
  | "client-side-image-editor"
  | "privacy-focused-image-editor"
  | "no-install-image-annotation-tool"
  | "lightweight-image-markup-tool";

export interface ImageAnnotatorLandingEntry {
  id: ImageAnnotatorLandingId;
  path: string;
  linkTitle: string;
  linkExcerpt: string;
  seo: {
    title: string;
    description: string;
  };
  faq: readonly { question: string; answer: string }[];
}

export const IMAGE_ANNOTATOR_LANDINGS: Record<
  ImageAnnotatorLandingId,
  ImageAnnotatorLandingEntry
> = {
  "annotate-images-online-free": {
    id: "annotate-images-online-free",
    path: "/annotate-images-online-free",
    linkTitle: "Annotate images online free",
    linkExcerpt:
      "Tag screenshots with labeled callouts — private, browser-based annotation with no upload.",
    seo: {
      title: "Annotate Images Online Free",
      description:
        "Annotate images online free in your browser. Tag screenshots instantly — no upload, no server. Private client-side processing by Pix-8.",
    },
    faq: [
      {
        question: "Is it really free to annotate images online?",
        answer:
          "Yes. Pix-8 Image Annotator is free with no account, no watermark, and no export limits. Place labeled tags, then download or copy the flattened result at no cost.",
      },
      {
        question: "Are my images uploaded to a server when I annotate online?",
        answer:
          "No. Annotation runs entirely in your browser on a client-side canvas. Your file is read locally and is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What can I annotate with this tool?",
        answer:
          "The Image Annotator places labeled pin markers on screenshots and photos — ideal for UI feedback, tutorial steps, and QA notes. It does not include freehand drawing, arrows, or shape tools.",
      },
    ],
  },
  "draw-arrows-on-images-online": {
    id: "draw-arrows-on-images-online",
    path: "/draw-arrows-on-images-online",
    linkTitle: "Point at elements in screenshots",
    linkExcerpt:
      "Need to highlight a UI element? Labeled callouts solve the same intent as arrows — without freehand drawing.",
    seo: {
      title: "Draw Arrows on Images Online",
      description:
        "Point at screenshots online in your browser. Labeled callouts replace arrows for feedback — no upload, no server. Free client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I draw freehand arrows on images in Pix-8?",
        answer:
          "Not currently. Image Annotator uses labeled pin markers instead of hand-drawn arrows. Click to place a callout, add a label, and drag to reposition — a faster, sharper alternative for screenshots and bug reports.",
      },
      {
        question: "Can I mark up images online without uploading?",
        answer:
          "Yes. Every step runs locally in your browser. Place callouts, edit labels, and export a flattened image without sending your file to a server.",
      },
      {
        question: "When are labeled callouts better than arrows?",
        answer:
          "For UI feedback, tutorials, and tickets, text labels stay readable at any zoom level and flatten into one shareable image. You get the clarity of an arrow-and-caption workflow without drawing tools.",
      },
    ],
  },
  "add-text-to-image-online": {
    id: "add-text-to-image-online",
    path: "/add-text-to-image-online",
    linkTitle: "Add text to images",
    linkExcerpt:
      "Label screenshots with short callout text — private, browser-based, no upload.",
    seo: {
      title: "Add Text to Image Online",
      description:
        "Add text to image online in your browser. Label screenshots with callout tags — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I add free-floating text anywhere on the image?",
        answer:
          "Not with Image Annotator. This tool attaches short text labels to pin-style callout markers — ideal for naming UI elements, numbering tutorial steps, or noting defects. For draggable headline or banner text with font controls, use Pix-8 Text Overlay instead.",
      },
      {
        question: "Are my images uploaded when I add text online?",
        answer:
          "No. Every label is rendered on a client-side canvas in your browser. Your file is read locally and is never sent to Pix-8 or any third-party server.",
      },
      {
        question: "Is it free to add text to images online with Pix-8?",
        answer:
          "Yes. No account, watermark, or export limit. Place labeled callouts, edit text in the Inspector, and download or copy the flattened result at no cost.",
      },
    ],
  },
  "highlight-part-of-image-online": {
    id: "highlight-part-of-image-online",
    path: "/highlight-part-of-image-online",
    linkTitle: "Highlight part of image online",
    linkExcerpt:
      "Mark screenshot regions with labeled callouts — private, browser-based, no upload.",
    seo: {
      title: "Highlight Part of Image Online",
      description:
        "Highlight part of image online in your browser. Place labeled callouts on screenshots — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I highlight a rectangular area or blur the rest of the image?",
        answer:
          "Not with Image Annotator. This tool places labeled pin markers on specific points — ideal for naming a button, flagging a defect, or numbering a tutorial step. For blur or vignette effects on the full image, use Pix-8 Image Filters. For free-positioned text blocks, use Text Overlay.",
      },
      {
        question: "Is highlighting an image online private with Pix-8?",
        answer:
          "Yes. Every label is rendered on a client-side canvas in your browser. Your file is never uploaded to Pix-8 or any third-party server.",
      },
      {
        question: "When is a labeled callout better than a highlight box?",
        answer:
          "On dense UI screenshots, a highlight rectangle often obscures the very detail you mean to show. A labeled marker names the element and points to the exact pixel — staying legible when the image is resized or pasted into Slack, Jira, or email.",
      },
    ],
  },
  "image-annotator-for-web-developers": {
    id: "image-annotator-for-web-developers",
    path: "/image-annotator-for-web-developers",
    linkTitle: "Image annotator for web developers",
    linkExcerpt:
      "Label UI screenshots for PRs and tickets — private, browser-based, no upload.",
    seo: {
      title: "Image Annotator for Web Developers",
      description:
        "Image annotator for web developers. Label UI screenshots in your browser — no upload, no server. Private client-side markup by Pix-8.",
    },
    faq: [
      {
        question: "Is this image annotator built for developer workflows?",
        answer:
          "Yes — for naming a misaligned button, flagging a spacing issue, numbering a tutorial step, or marking a regression in QA. Image Annotator places labeled pin markers on screenshots. It does not include freehand drawing, arrows, shape tools, or code export.",
      },
      {
        question: "Are screenshots uploaded when I annotate as a web developer?",
        answer:
          "No. All markup runs on a client-side canvas in your browser. Your file is read locally and is never transmitted to Pix-8 or any third-party server — important when screenshots contain staging URLs, user data, or unreleased product UI.",
      },
      {
        question: "How is this different from browser DevTools or a design tool?",
        answer:
          "DevTools inspect the DOM; they do not produce a shareable annotated image. Design tools require accounts and cloud uploads. Pix-8 Image Annotator flattens labeled callouts into a single image you can paste into a PR or ticket — fast, free, and fully local.",
      },
    ],
  },
  "annotate-images-for-documentation": {
    id: "annotate-images-for-documentation",
    path: "/annotate-images-for-documentation",
    linkTitle: "Annotate images for documentation",
    linkExcerpt:
      "Label screenshots for help articles and tutorials — private, browser-based, no upload.",
    seo: {
      title: "Annotate Images for Documentation",
      description:
        "Annotate images for documentation in your browser. Label screenshots with callout tags — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Is this tool suited for technical documentation screenshots?",
        answer:
          "Yes — for numbering tutorial steps, naming UI controls, and flagging areas in help articles. Image Annotator places labeled pin markers on screenshots. It does not include freehand drawing, arrows, shape tools, or collaborative cloud editing.",
      },
      {
        question: "Are documentation screenshots uploaded to a server?",
        answer:
          "No. All markup runs on a client-side canvas in your browser. Your file is read locally and is never transmitted to Pix-8 or any third-party server — important when docs include staging URLs or unreleased product UI.",
      },
      {
        question: "How is this different from annotating inside Notion or Confluence?",
        answer:
          "Built-in editors often require uploads and offer limited markup. Pix-8 flattens labeled callouts into a single portable image you can embed anywhere — fast, free, and fully local, with no account required.",
      },
    ],
  },
  "image-markup-for-remote-teams": {
    id: "image-markup-for-remote-teams",
    path: "/image-markup-for-remote-teams",
    linkTitle: "Image markup for remote teams",
    linkExcerpt:
      "Label screenshots for async feedback — private, browser-based, no upload.",
    seo: {
      title: "Image Markup for Remote Teams",
      description:
        "Image markup for remote teams in your browser. Label screenshots with callouts — no upload, no server. Private client-side processing by Pix-8.",
    },
    faq: [
      {
        question: "Is this image markup tool built for remote team workflows?",
        answer:
          "Yes — for async UI feedback, QA handoffs, and design reviews across time zones. Image Annotator places labeled pin markers on screenshots. It does not include real-time co-editing, shared workspaces, comment threads, or freehand drawing tools.",
      },
      {
        question: "Are team screenshots uploaded to a server when we mark them up?",
        answer:
          "No. All processing runs on a client-side canvas in each teammate's browser. The file is read locally and is never transmitted to Pix-8 or any third-party server — important when screenshots contain staging URLs, user data, or confidential UI.",
      },
      {
        question: "How is this different from Slack markup or a cloud annotation app?",
        answer:
          "Built-in markup is often limited or tied to a single platform. Cloud tools require uploads before you mark a pixel. Pix-8 flattens labeled callouts into a portable image anyone on the team can open — fast, free, fully local, and no account required.",
      },
    ],
  },
  "screenshot-annotation-tool-for-designers": {
    id: "screenshot-annotation-tool-for-designers",
    path: "/screenshot-annotation-tool-for-designers",
    linkTitle: "Screenshot annotation for designers",
    linkExcerpt:
      "Label mockup screenshots for design handoffs — private, browser-based, no upload.",
    seo: {
      title: "Screenshot Annotation Tool for Designers",
      description:
        "Screenshot annotation tool for designers in your browser. Label mockups with callouts — no upload, no server. Private client-side processing by Pix-8.",
    },
    faq: [
      {
        question: "Is this screenshot annotation tool built for designer workflows?",
        answer:
          "Yes — for naming UI elements, flagging spacing or alignment issues, numbering review steps, and clarifying handoff notes on static screenshots. Image Annotator places labeled pin markers. It does not include freehand drawing, arrows, shape tools, layers, or Figma-style collaborative editing.",
      },
      {
        question: "Are design screenshots uploaded when I annotate them?",
        answer:
          "No. All markup runs on a client-side canvas in your browser. Your file is read locally and is never transmitted to Pix-8 or any third-party server — important when mockups contain client branding, unreleased product UI, or confidential layouts.",
      },
      {
        question: "How is this different from annotating inside Figma or a design tool?",
        answer:
          "Design tools are built for editable files and often require cloud accounts. Pix-8 flattens labeled callouts into a single portable screenshot anyone can open — fast, free, fully local, and ideal when you need a screenshot annotation tool for designers who share feedback outside the source file.",
      },
    ],
  },
  "fast-image-editor-for-marketing-teams": {
    id: "fast-image-editor-for-marketing-teams",
    path: "/fast-image-editor-for-marketing-teams",
    linkTitle: "Fast markup for marketing teams",
    linkExcerpt:
      "Label campaign screenshots for reviews — private, browser-based, no upload.",
    seo: {
      title: "Fast Image Editor for Marketing Teams",
      description:
        "Fast image editor for marketing teams in your browser. Label campaign screenshots with callouts — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Is this a full image editor for marketing teams?",
        answer:
          "Not in the traditional sense. Pix-8 Image Annotator is a fast screenshot markup tool — it places labeled pin markers on images for campaign feedback, approval notes, and asset reviews. It does not include filters, cropping, layers, text banners, or template design. For free-positioned headline text, use Pix-8 Text Overlay.",
      },
      {
        question: "Are marketing assets uploaded when I mark up screenshots?",
        answer:
          "No. All processing runs on a client-side canvas in your browser. Your file is read locally and is never transmitted to Pix-8 or any third-party server — important when creatives include unreleased campaigns, client branding, or pre-launch landing pages.",
      },
      {
        question: "Why would a marketing team use this instead of a cloud editor?",
        answer:
          "Cloud tools add upload latency before you mark a single pixel. Pix-8 flattens labeled callouts into one shareable image in seconds — fast, free, fully local, and ideal when you need a fast image editor for marketing teams who annotate screenshots for Slack, email, or approval threads.",
      },
    ],
  },
  "browser-based-image-annotator": {
    id: "browser-based-image-annotator",
    path: "/browser-based-image-annotator",
    linkTitle: "Browser-based image annotator",
    linkExcerpt:
      "Label screenshots in your browser — private, client-side markup with no upload.",
    seo: {
      title: "Browser-Based Image Annotator",
      description:
        "Browser-based image annotator for screenshots. Label callouts in your browser — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "What does browser-based image annotation mean?",
        answer:
          "All markup runs in your web browser on a client-side canvas — no desktop install, no account, and no file upload to a server. Image Annotator places labeled pin markers on screenshots. It does not include freehand drawing, arrows, shape tools, or cloud collaboration.",
      },
      {
        question: "Are my images uploaded when I use this browser annotator?",
        answer:
          "No. Your file is read locally via the browser File API and processed on-device. It is never transmitted to Pix-8 or any third-party server — the core privacy advantage of a browser-based image annotator that keeps markup client-side.",
      },
      {
        question: "How is this different from a browser extension or cloud markup app?",
        answer:
          "Extensions often require install permissions; cloud apps upload your screenshot before you annotate. Pix-8 runs entirely in the tab, flattens labeled callouts into one portable image, and exports in seconds — free, with no server round-trip.",
      },
    ],
  },
  "client-side-image-editor": {
    id: "client-side-image-editor",
    path: "/client-side-image-editor",
    linkTitle: "Client-side image editor",
    linkExcerpt:
      "Mark up screenshots on-device — private browser markup with no upload.",
    seo: {
      title: "Client-Side Image Editor",
      description:
        "Client-side image editor for screenshots. Label callouts on-device — no upload, no server. Private browser tool by Pix-8.",
    },
    faq: [
      {
        question: "What is a client-side image editor?",
        answer:
          "A client-side image editor processes your file entirely on your device — in Pix-8's case, in the browser on a local canvas. Image Annotator places labeled pin markers on screenshots for feedback and tutorials. It does not include filters, cropping, layers, retouching, or full creative editing. For free-positioned text blocks, use Pix-8 Text Overlay.",
      },
      {
        question: "Does client-side mean my images are never uploaded?",
        answer:
          "Yes. Your file is read locally via the browser File API and all markup runs on-device. It is never transmitted to Pix-8 or any third-party server — the defining privacy property of a true client-side image editor for screenshot markup.",
      },
      {
        question: "How is this different from a cloud image editor?",
        answer:
          "Cloud editors upload your image before any edit. Pix-8 keeps every pixel on your machine, flattens labeled callouts into one shareable image, and exports in seconds — free, with no account and no server round-trip.",
      },
    ],
  },
  "privacy-focused-image-editor": {
    id: "privacy-focused-image-editor",
    path: "/privacy-focused-image-editor",
    linkTitle: "Privacy-focused image editor",
    linkExcerpt:
      "Mark up screenshots privately — client-side browser tool with no upload.",
    seo: {
      title: "Privacy-Focused Image Editor",
      description:
        "Privacy-focused image editor for screenshots. Label callouts on-device — no upload, no server. Client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "What makes this a privacy-focused image editor?",
        answer:
          "Your file is read locally and all markup runs on a client-side canvas in your browser — never uploaded to Pix-8 or any third-party server. Image Annotator places labeled pin markers on screenshots. It does not include filters, cropping, layers, or full creative editing — privacy comes from architecture, not a toggle.",
      },
      {
        question: "Can Pix-8 see or store my images?",
        answer:
          "No. Pix-8 does not receive, store, or process your source file on a server. Annotation, label editing, and export flattening all happen on-device in the browser tab.",
      },
      {
        question: "How is this different from a privacy policy on a cloud editor?",
        answer:
          "A cloud editor must upload your image to apply any edit — privacy policies govern what happens after upload. Pix-8 avoids upload entirely: labeled callouts flatten into one portable image you control, with no account required.",
      },
    ],
  },
  "no-install-image-annotation-tool": {
    id: "no-install-image-annotation-tool",
    path: "/no-install-image-annotation-tool",
    linkTitle: "No-install image annotation",
    linkExcerpt:
      "Annotate screenshots in your browser — no download, no upload, no account.",
    seo: {
      title: "No-Install Image Annotation Tool",
      description:
        "No-install image annotation tool in your browser. Label screenshots with callouts — no download, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Do I need to install software to annotate images?",
        answer:
          "No. Pix-8 Image Annotator runs entirely in your browser tab — no desktop app, browser extension, or plugin required. Open the page, load a screenshot, and place labeled pin markers on a client-side canvas. It does not include freehand drawing, arrows, shape tools, or offline native apps.",
      },
      {
        question: "Are my images uploaded when I use this no-install annotator?",
        answer:
          "No. Your file is read locally via the browser File API and all markup runs on-device. It is never transmitted to Pix-8 or any third-party server — the privacy advantage of a no-install tool that keeps processing client-side.",
      },
      {
        question: "How is this different from a downloadable annotation app?",
        answer:
          "Downloadable apps require install permissions and often sync to cloud storage. Pix-8 opens in one tab, flattens labeled callouts into a portable image, and exports in seconds — free, with no install step and no server round-trip.",
      },
    ],
  },
  "lightweight-image-markup-tool": {
    id: "lightweight-image-markup-tool",
    path: "/lightweight-image-markup-tool",
    linkTitle: "Lightweight image markup tool",
    linkExcerpt:
      "Focused screenshot markup — labeled callouts, client-side canvas, no upload.",
    seo: {
      title: "Lightweight Image Markup Tool",
      description:
        "Lightweight image markup tool in your browser. Label screenshots with callouts — no bloat, no server. Private client-side processing by Pix-8.",
    },
    faq: [
      {
        question: "What makes this a lightweight image markup tool?",
        answer:
          "Image Annotator focuses on one job: labeled pin callouts on screenshots. No layers panel, filters, asset libraries, or account setup — markup runs on a client-side canvas in your browser. It does not include freehand drawing, arrows, shape tools, or full creative editing suites.",
      },
      {
        question: "Are my images uploaded when I use this markup tool?",
        answer:
          "No. Your file is read locally via the browser File API and all markup runs on-device. It is never transmitted to Pix-8 or any third-party server — a lightweight workflow that keeps processing client-side.",
      },
      {
        question: "How is this different from a full image editor?",
        answer:
          "Full editors carry toolbars, plugins, and cloud sync you may not need for a quick screenshot note. Pix-8 places labeled pin markers, flattens them into one portable image, and exports in seconds — free, with no server round-trip and no heavyweight install.",
      },
    ],
  },
};

export function getLandingByPath(path: string): ImageAnnotatorLandingEntry | undefined {
  return Object.values(IMAGE_ANNOTATOR_LANDINGS).find(
    (entry) => entry.path === path,
  );
}

export function getLandingBySlug(slug: string): ImageAnnotatorLandingEntry | undefined {
  const normalized = slug.replace(/^\/+/, "");
  return Object.values(IMAGE_ANNOTATOR_LANDINGS).find(
    (entry) => entry.path === `/${normalized}`,
  );
}

/** @deprecated Use getRelatedLandingPages from @/lib/imageAnnotatorLandingsLocale */

/** @deprecated Use IMAGE_ANNOTATOR_LANDINGS[id].path */
export const ANNOTATE_IMAGES_LANDING_PATH =
  IMAGE_ANNOTATOR_LANDINGS["annotate-images-online-free"].path;

/** @deprecated Use IMAGE_ANNOTATOR_LANDINGS[id].seo */
export const ANNOTATE_IMAGES_LANDING_SEO =
  IMAGE_ANNOTATOR_LANDINGS["annotate-images-online-free"].seo;

/** @deprecated Use IMAGE_ANNOTATOR_LANDINGS[id].faq */
export const ANNOTATE_IMAGES_FAQ =
  IMAGE_ANNOTATOR_LANDINGS["annotate-images-online-free"].faq;

/** @deprecated Use IMAGE_ANNOTATOR_TOOL_HREF */
export const ANNOTATE_IMAGES_TOOL_HREF = IMAGE_ANNOTATOR_TOOL_HREF;

/** @deprecated Use IMAGE_ANNOTATOR_LANDINGS[id].path */
export const DRAW_ARROWS_LANDING_PATH =
  IMAGE_ANNOTATOR_LANDINGS["draw-arrows-on-images-online"].path;

/** @deprecated Use IMAGE_ANNOTATOR_LANDINGS[id].seo */
export const DRAW_ARROWS_LANDING_SEO =
  IMAGE_ANNOTATOR_LANDINGS["draw-arrows-on-images-online"].seo;

/** @deprecated Use IMAGE_ANNOTATOR_LANDINGS[id].faq */
export const DRAW_ARROWS_FAQ =
  IMAGE_ANNOTATOR_LANDINGS["draw-arrows-on-images-online"].faq;

/** @deprecated Use IMAGE_ANNOTATOR_TOOL_HREF */
export const DRAW_ARROWS_TOOL_HREF = IMAGE_ANNOTATOR_TOOL_HREF;
