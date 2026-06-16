export const TEXT_OVERLAY_TOOL_HREF = "/tools/editor-studio/text-overlay";

export const TEXT_OVERLAY_LANDING_ACCENT = "#8E977D";

export const TEXT_OVERLAY_ARTICLE = {
  href: "/articles/adding-text-to-images",
  title: "Adding Impact: How to Add Text to Images Like a Pro",
  excerpt:
    "From quotes to product labels, learn how to add text to your images that is readable, stylish, and effective.",
} as const;

/** What Text Overlay actually supports — use for intent-accurate copy. */
export const TEXT_OVERLAY_CAPABILITIES = [
  "Draggable text positioning on the canvas",
  "Font family, size, and color controls",
  "Left, center, and right text alignment",
  "Optional text shadow and background box",
  "Download or copy flattened output",
  "Optional EXIF metadata stripping before export",
  "On-device processing — images never uploaded",
] as const;

/**
 * Add new Text Overlay SEO landing IDs here.
 * Landing pages belong in this registry — not imageAnnotatorLandings,
 * rotateFlipLandings, cropperLandings, customCutterLandings, or resizerLandings.
 */
export type TextOverlayLandingId =
  | "add-text-on-image-online"
  | "write-on-photo-online"
  | "free-text-over-image-tool"
  | "image-text-adder"
  | "add-watermark-to-image-online"
  | "add-text-to-photos-for-instagram"
  | "add-captions-to-images-online"
  | "add-logo-or-text-to-images"
  | "client-side-text-overlay-tool"
  | "add-text-to-image-with-fonts"
  | "custom-text-placement-on-image"
  | "professional-text-overlay-editor";

export interface TextOverlayLandingEntry {
  id: TextOverlayLandingId;
  path: string;
  linkTitle: string;
  linkExcerpt: string;
  seo: {
    title: string;
    description: string;
  };
  faq: readonly { question: string; answer: string }[];
}

export const TEXT_OVERLAY_LANDINGS: Record<
  TextOverlayLandingId,
  TextOverlayLandingEntry
> = {
  "add-text-on-image-online": {
    id: "add-text-on-image-online",
    path: "/add-text-on-image-online",
    linkTitle: "Add text on image",
    linkExcerpt:
      "Add text to images in your browser — client-side, no upload.",
    seo: {
      title: "Add Text to Image Online",
      description:
        "Add text to image online in your browser. Draggable typography on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I add text to an image online without uploading it?",
        answer:
          "Yes. Pix-8 Text Overlay runs entirely in your browser. Your image is read locally, text is rendered on a client-side canvas, and you export from your device. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "How is Text Overlay different from Image Annotator labels?",
        answer:
          "Text Overlay adds free-positioned text blocks with font, size, color, alignment, shadow, and background box controls — ideal for headlines, quotes, and banners. Image Annotator attaches short labels to pin-style callouts for screenshot markup. It does not include arrows, pins, numbered markers, or multi-layer annotation workflows.",
      },
      {
        question: "What styling options does this tool support?",
        answer:
          "You can drag text into position, choose font family and size, set color, align left/center/right, and toggle optional shadow and background box opacity. Then download or copy the flattened output, with optional EXIF stripping before export. It does not include curved text, stroke outlines, or multi-line text boxes with rich formatting.",
      },
    ],
  },
  "write-on-photo-online": {
    id: "write-on-photo-online",
    path: "/write-on-photo-online",
    linkTitle: "Write on photo",
    linkExcerpt:
      "Write on photos in your browser — client-side, no upload.",
    seo: {
      title: "Write on Photo Online",
      description:
        "Write on photo online in your browser. Type captions and messages on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I write on a photo online without uploading it?",
        answer:
          "Yes. Pix-8 Text Overlay runs entirely in your browser. Your photo is read locally, typed text is rendered on a client-side canvas, and you export from your device. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "Does this support handwriting or a pen tool?",
        answer:
          "No. Text Overlay lets you type text in a field and place it on the photo with drag positioning — not freehand drawing or stylus handwriting. For pin-style callout labels on screenshots, use Pix-8 Image Annotator. It does not include a brush, pen, or drawing canvas.",
      },
      {
        question: "What can I write on a photo with this tool?",
        answer:
          "You can add typed captions, quotes, titles, or short messages with font family, size, color, alignment, and optional shadow or background box. Then download or copy the flattened image, with optional EXIF stripping before export. It does not include curved text, stroke outlines, or multi-line rich formatting.",
      },
    ],
  },
  "free-text-over-image-tool": {
    id: "free-text-over-image-tool",
    path: "/free-text-over-image-tool",
    linkTitle: "Free text over image",
    linkExcerpt:
      "Free text over image tool in your browser — client-side, no upload.",
    seo: {
      title: "Free Text Over Image Tool",
      description:
        "Free text over image tool in your browser. Layer typed typography on-device — no upload, no account, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Is this text over image tool free to use?",
        answer:
          "Yes. Pix-8 Text Overlay is free to open in your browser — no subscription, no account, and no per-export fee. Your image is processed locally on a client-side canvas. Pix-8 does not charge to place text over your image.",
      },
      {
        question: "Do I need to upload my image to add text over it?",
        answer:
          "No. Your image is read locally in your browser tab. Text is composited on a client-side canvas and you export from your device. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What does text over image mean in this tool?",
        answer:
          "You type text and place it over your image with drag positioning, then export one flattened image with typography baked in. You can set font, size, color, alignment, and optional shadow or background box. It is not a multi-layer editor, template library, or pin-style callout annotator — for labeled screenshot markers, use Pix-8 Image Annotator.",
      },
    ],
  },
  "image-text-adder": {
    id: "image-text-adder",
    path: "/image-text-adder",
    linkTitle: "Image text adder",
    linkExcerpt:
      "Add text to images in your browser — client-side, no upload.",
    seo: {
      title: "Image Text Adder",
      description:
        "Image text adder in your browser. Place typed typography on-device — no upload, no account, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "What is an image text adder and how does Pix-8 work?",
        answer:
          "An image text adder lets you place typed text on a photo or graphic. Pix-8 Text Overlay reads your image locally, renders text on a client-side canvas with drag positioning, and exports a flattened result from your device. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "Do I need to upload my image to use this text adder?",
        answer:
          "No. Your image stays on your device. Text Overlay composites typography in your browser tab and you download or copy the output locally. No cloud upload step is required.",
      },
      {
        question: "How is Text Overlay different from Image Annotator labels?",
        answer:
          "Text Overlay is an image text adder for free-positioned typography — headlines, captions, and banners with font, size, color, alignment, shadow, and background box controls. Image Annotator attaches short labels to pin-style callouts for screenshot markup. It does not include arrows, pins, numbered markers, or multi-layer annotation workflows.",
      },
    ],
  },
  "add-watermark-to-image-online": {
    id: "add-watermark-to-image-online",
    path: "/add-watermark-to-image-online",
    linkTitle: "Add watermark",
    linkExcerpt:
      "Add watermark text to images in your browser — client-side, no upload.",
    seo: {
      title: "Add Watermark to Image Online",
      description:
        "Add watermark to image online in your browser. Place watermark text on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I add a watermark without uploading my image?",
        answer:
          "Yes. Pix-8 Text Overlay runs entirely in your browser. Your image is read locally, the watermark text is rendered on a client-side canvas, and you export from your device. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "Does this add logo/image watermarks (like a PNG mark)?",
        answer:
          "This landing is for typed watermark text. Text Overlay places typography only — for logo/image watermark overlays, use the Pix-8 Watermark tool in Editor Studio.",
      },
      {
        question: "Can I position and style the watermark text?",
        answer:
          "Yes. You can drag the watermark into position, choose font family, size, and color, set left/center/right alignment, and optionally enable text shadow or a background box for contrast. Then download or copy the flattened result, with optional EXIF stripping before export.",
      },
    ],
  },
  "add-text-to-photos-for-instagram": {
    id: "add-text-to-photos-for-instagram",
    path: "/add-text-to-photos-for-instagram",
    linkTitle: "Text for Instagram",
    linkExcerpt:
      "Add text to photos for Instagram in your browser — client-side, no upload.",
    seo: {
      title: "Add Text to Photos for Instagram",
      description:
        "Add text to photos for Instagram in your browser. Type captions and headlines on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question:
          "Can I add text to photos for Instagram without uploading them?",
        answer:
          "Yes. Pix-8 Text Overlay runs entirely in your browser. Your photo is read locally, text is rendered on a client-side canvas, and you export from your device. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "Does this resize or crop photos for Instagram feed or Stories?",
        answer:
          "No. Text Overlay adds typed typography to your existing photo — it does not resize to Instagram pixel dimensions or apply Story or Reels crop presets. For feed sizing, use Pix-8 Resizer. For aspect-ratio cropping, use Pix-8 Cropper. It does not include direct posting to Instagram.",
      },
      {
        question: "What text can I add for Instagram posts?",
        answer:
          "You can add captions, quotes, headlines, or short call-to-action lines with font family, size, color, alignment, and optional shadow or background box. Drag text into position, then download or copy the flattened image with optional EXIF stripping before you upload to Instagram from your device.",
      },
    ],
  },
  "add-captions-to-images-online": {
    id: "add-captions-to-images-online",
    path: "/add-captions-to-images-online",
    linkTitle: "Add captions to images",
    linkExcerpt:
      "Add captions to images in your browser — client-side, no upload.",
    seo: {
      title: "Add Captions to Images Online",
      description:
        "Add captions to images online in your browser. Place readable caption text on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I add captions to images online without uploading them?",
        answer:
          "Yes. Pix-8 Text Overlay runs entirely in your browser. Your image is read locally, caption text is rendered on a client-side canvas, and you export from your device. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "Is this for captions or full image annotations with pins?",
        answer:
          "This landing focuses on typed captions — one or more lines of text you place on the image with font, size, color, alignment, and optional shadow or background box controls. For pin-style callouts, arrows, or numbered markers on screenshots, use Pix-8 Image Annotator instead. Text Overlay does not include pins, arrows, or multi-layer annotation workflows.",
      },
      {
        question: "What kind of caption styling does this tool support?",
        answer:
          "You can drag captions into position, choose font family and size, set color, align left/center/right, and toggle optional shadow and background box opacity. Then download or copy the flattened output, with optional EXIF stripping before export. It does not include curved text, outline strokes, or rich multi-line text layouts.",
      },
    ],
  },
  "add-logo-or-text-to-images": {
    id: "add-logo-or-text-to-images",
    path: "/add-logo-or-text-to-images",
    linkTitle: "Logo or text on images",
    linkExcerpt:
      "Add logo or text to images in your browser — client-side, no upload.",
    seo: {
      title: "Add Logo or Text to Images",
      description:
        "Add logo or text to images in your browser. Typed text via Text Overlay, logo overlays via Watermark — on-device, no upload, no server. Private client-side tools by Pix-8.",
    },
    faq: [
      {
        question: "Can I add a logo or text to images without uploading them?",
        answer:
          "Yes. Pix-8 runs entirely in your browser. Your image is read locally, overlays are composited on a client-side canvas, and you export from your device. Files are never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "Which tool should I use — text or a logo file?",
        answer:
          "Use Pix-8 Text Overlay for typed text — draggable typography with font, size, color, alignment, and optional shadow or background box controls. Use Pix-8 Watermark in Editor Studio for logo or image file overlays — load a PNG or similar mark, set opacity, scale, and corner or center position, then export. Text Overlay does not place image files; Watermark does not add editable typed text blocks.",
      },
      {
        question: "What styling and export options are available?",
        answer:
          "Text Overlay lets you drag text into place and tune font, color, alignment, and optional shadow or background box, then download or copy flattened output with optional EXIF stripping. Watermark lets you scale and position a logo image with opacity controls and the same local download or copy export. Neither tool includes curved text, pin-style callout labels, or multi-layer PSD editing.",
      },
    ],
  },
  "client-side-text-overlay-tool": {
    id: "client-side-text-overlay-tool",
    path: "/client-side-text-overlay-tool",
    linkTitle: "Client-side text overlay",
    linkExcerpt:
      "Client-side text overlay tool in your browser — images never leave the tab.",
    seo: {
      title: "Client-Side Text Overlay Tool",
      description:
        "Client-side text overlay tool that runs fully in your browser. Place and style text on images on-device — no upload, no server. Private in-tab editor by Pix-8.",
    },
    faq: [
      {
        question: "What does client-side text overlay mean in Pix-8?",
        answer:
          "Client-side text overlay means the entire operation happens in your browser. Your image is read locally, text is composited on a canvas in the tab, and you export the result from your device. Pix-8 never receives your pixels or routes them through a remote server.",
      },
      {
        question:
          "How is this different from cloud-based text overlay tools?",
        answer:
          "Cloud tools typically upload your image to a server for processing. Pix-8 Text Overlay keeps everything local: no accounts, no queues, and no remote storage. You get draggable text blocks with font, size, color, alignment, shadow, and background box controls, then export a flattened image directly from your machine.",
      },
      {
        question: "Does this tool support brushes, AI, or multi-layer editing?",
        answer:
          "No. Pix-8 Text Overlay focuses on fast, deterministic typography: drag-positioned text blocks with styling controls and optional EXIF stripping before export. It does not include brushes, AI effects, PSD-style multi-layer timelines, or pin-style callout annotations — for labeled screenshot markers, use Pix-8 Image Annotator instead.",
      },
    ],
  },
  "add-text-to-image-with-fonts": {
    id: "add-text-to-image-with-fonts",
    path: "/add-text-to-image-with-fonts",
    linkTitle: "Text with fonts",
    linkExcerpt:
      "Add text to images with font controls in your browser — client-side, no upload.",
    seo: {
      title: "Add Text to Image with Fonts",
      description:
        "Add text to image with fonts in your browser. Choose font family, size, and color on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I add text to an image with fonts without uploading it?",
        answer:
          "Yes. Pix-8 Text Overlay runs entirely in your browser. Your image is read locally, typed text is rendered on a client-side canvas with your chosen font settings, and you export from your device. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "Which fonts does this tool support?",
        answer:
          "Text Overlay includes a built-in font family selector with sans-serif, serif, monospace, and impact-style options, plus size and color controls. You can align text left, center, or right and toggle optional shadow or background box. It does not include custom font uploads, Google Fonts browsing, or curved text paths.",
      },
      {
        question: "How is Text Overlay different from Image Annotator labels?",
        answer:
          "Text Overlay is for free-positioned typography with font, size, color, alignment, shadow, and background box controls — ideal for headlines, captions, and banners. Image Annotator attaches short labels to pin-style callouts for screenshot markup. It does not include arrows, pins, numbered markers, or multi-layer annotation workflows.",
      },
    ],
  },
  "custom-text-placement-on-image": {
    id: "custom-text-placement-on-image",
    path: "/custom-text-placement-on-image",
    linkTitle: "Custom text placement",
    linkExcerpt:
      "Custom text placement on images in your browser — client-side, no upload.",
    seo: {
      title: "Custom Text Placement on Image",
      description:
        "Custom text placement on image in your browser. Drag text into position on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question:
          "Can I place text anywhere on an image without uploading it?",
        answer:
          "Yes. Pix-8 Text Overlay runs entirely in your browser. Your image is read locally, text blocks are positioned with drag controls on a client-side canvas, and you export from your device. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "How precise is custom text placement?",
        answer:
          "You drag text blocks freely across the canvas and adjust font, size, color, and left/center/right alignment before export. Placement is manual and visual — not snap-to-grid, magnetic guides, or multi-select layout tools. For pin-style callout labels on screenshots, use Pix-8 Image Annotator instead.",
      },
      {
        question: "What styling options work with custom placement?",
        answer:
          "After positioning text, you can set font family, size, and color, align left/center/right, and toggle optional shadow or background box for contrast. Then download or copy the flattened output, with optional EXIF stripping before export. It does not include curved text paths, rotation handles, or multi-layer PSD editing.",
      },
    ],
  },
  "professional-text-overlay-editor": {
    id: "professional-text-overlay-editor",
    path: "/professional-text-overlay-editor",
    linkTitle: "Professional text overlay",
    linkExcerpt:
      "Professional text overlay editor in your browser — client-side, no upload.",
    seo: {
      title: "Professional Text Overlay Editor",
      description:
        "Professional text overlay editor in your browser. Controlled typography on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question:
          "What makes this a professional text overlay editor?",
        answer:
          "Pix-8 Text Overlay is a focused typography editor — draggable text blocks with font family, size, color, alignment, and optional shadow or background box controls, all on a client-side canvas. It is professional in the sense of precise, repeatable output for headlines, captions, and banners — not a full design suite with templates, AI effects, or multi-layer timelines.",
      },
      {
        question:
          "Can I use this editor without uploading my images?",
        answer:
          "Yes. The editor runs entirely in your browser. Your image is read locally, text is composited on a client-side canvas, and you export from your device. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "How is Text Overlay different from Image Annotator?",
        answer:
          "Text Overlay is a professional text overlay editor for free-positioned typography on images. Image Annotator is for screenshot markup with pin-style callouts, arrows, and short labels. Text Overlay does not include pins, arrows, numbered markers, or multi-annotation layers.",
      },
    ],
  },
};

export function listTextOverlayLandings(): TextOverlayLandingEntry[] {
  return Object.values(TEXT_OVERLAY_LANDINGS);
}

export function getTextOverlayLandingByPath(
  path: string,
): TextOverlayLandingEntry | undefined {
  return listTextOverlayLandings().find((entry) => entry.path === path);
}

export function getTextOverlayLandingBySlug(
  slug: string,
): TextOverlayLandingEntry | undefined {
  const normalized = slug.replace(/^\/+/, "");
  return listTextOverlayLandings().find(
    (entry) => entry.path === `/${normalized}`,
  );
}
