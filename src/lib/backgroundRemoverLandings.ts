export const BACKGROUND_REMOVER_TOOL_HREF = "/tools/optimization/bg-remover";

export const BACKGROUND_REMOVER_LANDING_ACCENT = "#8E977D";

export const BACKGROUND_REMOVER_ARTICLE = {
  href: "/articles/privacy-first-background-removal",
  title: "Privacy-first background removal",
  excerpt:
    "Why client-side background removal protects your assets and eliminates cloud upload risks.",
} as const;

/** What Background Remover actually supports — use for intent-accurate copy. */
export const BACKGROUND_REMOVER_CAPABILITIES = [
  "AI subject segmentation in the browser",
  "Transparent or solid-color background output",
  "Download or copy result to clipboard",
  "Optional EXIF metadata stripping before export",
  "On-device processing — images never uploaded",
] as const;

/**
 * Add new Background Remover SEO landing IDs here.
 * Landing pages belong in this registry — not imageAnnotatorLandings.
 */
export type BackgroundRemoverLandingId =
  | "remove-background-from-image-online"
  | "transparent-background-maker"
  | "remove-image-background-free"
  | "erase-background-online"
  | "background-remover-for-ecommerce"
  | "remove-background-for-marketing-graphics"
  | "background-eraser-for-social-media-photos"
  | "professional-background-removal-for-photographers"
  | "client-side-background-remover"
  | "browser-based-background-eraser"
  | "no-upload-image-background-remover"
  | "privacy-first-background-removal-tool";

export interface BackgroundRemoverLandingEntry {
  id: BackgroundRemoverLandingId;
  path: string;
  linkTitle: string;
  linkExcerpt: string;
  seo: {
    title: string;
    description: string;
  };
  faq: readonly { question: string; answer: string }[];
}

export const BACKGROUND_REMOVER_LANDINGS: Record<
  BackgroundRemoverLandingId,
  BackgroundRemoverLandingEntry
> = {
  "remove-background-from-image-online": {
    id: "remove-background-from-image-online",
    path: "/remove-background-from-image-online",
    linkTitle: "Remove background from image online",
    linkExcerpt:
      "Isolate subjects in your browser — transparent PNG output, no upload.",
    seo: {
      title: "Remove Background from Image Online",
      description:
        "Remove background from image online in your browser. AI segmentation on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I remove the background from an image online without uploading?",
        answer:
          "Yes. Pix-8 Background Remover runs entirely in your browser. Your file is read locally, AI segmentation processes on-device, and you export a PNG — transparent or on a solid color. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What output formats does this online background remover support?",
        answer:
          "Results export as PNG — either with a transparent background or on a solid color you choose. You can download the file or copy it to your clipboard. Optional EXIF metadata stripping is available before export. It does not include batch processing, manual brush refinement, or JPG export with transparency.",
      },
      {
        question: "How is this different from cloud background removal services?",
        answer:
          "Cloud services require uploading your image before any pixel is processed. Pix-8 keeps segmentation client-side, loads the AI model in your browser tab, and exports in seconds — free, with no account and no server round-trip.",
      },
    ],
  },
  "transparent-background-maker": {
    id: "transparent-background-maker",
    path: "/transparent-background-maker",
    linkTitle: "Transparent background maker",
    linkExcerpt:
      "Create transparent PNG cut-outs in your browser — client-side, no upload.",
    seo: {
      title: "Transparent Background Maker",
      description:
        "Transparent background maker in your browser. Export PNG cut-outs on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "How do I make an image background transparent online?",
        answer:
          "Open Pix-8 Background Remover, load your image, and run on-device AI segmentation. Select transparent output, then download or copy the result as PNG. Your file is read locally and is never uploaded to Pix-8 or any third-party server.",
      },
      {
        question: "Will my PNG actually have a transparent background?",
        answer:
          "Yes — when transparent mode is selected, Background Remover exports a PNG with an alpha channel around the segmented subject. You can also switch to a solid-color background if you need a flat fill instead. It does not include manual edge refinement brushes or batch processing.",
      },
      {
        question: "Is this transparent background maker free and private?",
        answer:
          "Yes. The tool is free with no account required. All segmentation runs client-side in your browser — your image stays on your device throughout the workflow, with no cloud upload step.",
      },
    ],
  },
  "remove-image-background-free": {
    id: "remove-image-background-free",
    path: "/remove-image-background-free",
    linkTitle: "Remove image background free",
    linkExcerpt:
      "Free background removal in your browser — no watermark, no upload.",
    seo: {
      title: "Remove Image Background Free",
      description:
        "Remove image background free in your browser. AI segmentation on-device — no watermark, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Is it really free to remove an image background?",
        answer:
          "Yes. Pix-8 Background Remover is free with no account, no watermark, and no export limits. Load an image, run on-device AI segmentation, and download or copy a PNG — transparent or on a solid color — at no cost.",
      },
      {
        question: "Are my images uploaded when I use this free background remover?",
        answer:
          "No. Your file is read locally via the browser File API and all segmentation runs on-device. It is never transmitted to Pix-8 or any third-party server — the privacy advantage of a free tool that keeps processing client-side.",
      },
      {
        question: "What can this free tool do — and what does it not include?",
        answer:
          "Background Remover segments subjects and exports PNG cut-outs with transparent or solid-color backgrounds. It does not include batch processing, manual mask brushes, paid tiers, or cloud storage sync. For a quick free cut-out, on-device segmentation and instant export are the core workflow.",
      },
    ],
  },
  "erase-background-online": {
    id: "erase-background-online",
    path: "/erase-background-online",
    linkTitle: "Erase background online",
    linkExcerpt:
      "Erase image backgrounds in your browser — client-side AI, no upload.",
    seo: {
      title: "Erase Background Online",
      description:
        "Erase background online in your browser. AI segmentation on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I erase a background from an image online without uploading?",
        answer:
          "Yes. Pix-8 Background Remover runs entirely in your browser. Your file is read locally, on-device AI segments the subject and effectively erases the surrounding background, and you export a PNG — transparent or on a solid color. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "How is erasing a background different from manual eraser tools?",
        answer:
          "Manual eraser brushes require pixel-by-pixel work. Background Remover uses AI subject segmentation to isolate the subject automatically, then exports a clean cut-out. It does not include freehand eraser brushes, manual mask refinement, or batch processing.",
      },
      {
        question: "Is erasing backgrounds online safe for private images?",
        answer:
          "With Pix-8, yes — because processing stays client-side. Your image is read via the browser File API and segmentation runs on your device. No cloud upload step means staging shots, portraits, and internal assets stay local throughout.",
      },
    ],
  },
  "background-remover-for-ecommerce": {
    id: "background-remover-for-ecommerce",
    path: "/background-remover-for-ecommerce",
    linkTitle: "E-commerce background remover",
    linkExcerpt:
      "Product cut-outs in your browser — transparent PNG, no upload.",
    seo: {
      title: "Background Remover for E-Commerce",
      description:
        "Background remover for e-commerce in your browser. Product cut-outs on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I prepare product photos for e-commerce without uploading them?",
        answer:
          "Yes. Pix-8 Background Remover runs entirely in your browser. Load a product shot locally, run on-device AI segmentation, and export a PNG with a transparent or solid-color background. Your file is never transmitted to Pix-8 or any third-party server — important when shots are unreleased or supplier-confidential.",
      },
      {
        question: "What output works best for marketplace and store listings?",
        answer:
          "Export PNG with a transparent background for compositing on store themes, or switch to a solid white or brand-color fill for channels that require a flat backdrop. Download or copy to clipboard, with optional EXIF stripping. It does not include batch processing, auto-resizing per marketplace spec, or direct Shopify or Amazon integration.",
      },
      {
        question: "How is this different from a cloud background remover for product photos?",
        answer:
          "Cloud tools upload every SKU image before segmentation. Pix-8 keeps processing client-side — load a product photo, segment on-device, and export a listing-ready cut-out in seconds, free, with no account and no server round-trip.",
      },
    ],
  },
  "remove-background-for-marketing-graphics": {
    id: "remove-background-for-marketing-graphics",
    path: "/remove-background-for-marketing-graphics",
    linkTitle: "Marketing graphics bg remover",
    linkExcerpt:
      "Cut out subjects for ads and social — client-side PNG, no upload.",
    seo: {
      title: "Remove Background for Marketing Graphics",
      description:
        "Remove background for marketing graphics in your browser. Transparent cut-outs on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I remove backgrounds for marketing graphics without uploading?",
        answer:
          "Yes. Pix-8 Background Remover runs entirely in your browser. Load a photo or product shot locally, run on-device AI segmentation, and export a PNG with a transparent or solid-color background. Your file is never transmitted to Pix-8 or any third-party server — useful when creatives are pre-launch or client-confidential.",
      },
      {
        question: "What marketing use cases does this background remover support?",
        answer:
          "Export transparent PNG cut-outs for compositing in ads, social posts, slide decks, and email headers — or use a solid brand-color fill. Download or copy to clipboard, with optional EXIF stripping. It does not include design templates, text overlay tools, batch processing, or direct export to ad platforms.",
      },
      {
        question: "How is this different from a cloud remover for campaign assets?",
        answer:
          "Cloud tools upload every asset before segmentation. Pix-8 keeps processing client-side — isolate a subject, export a compositing-ready PNG in seconds, free, with no account and no server round-trip for unreleased campaign imagery.",
      },
    ],
  },
  "background-eraser-for-social-media-photos": {
    id: "background-eraser-for-social-media-photos",
    path: "/background-eraser-for-social-media-photos",
    linkTitle: "Social media background eraser",
    linkExcerpt:
      "Erase backgrounds from social photos — client-side PNG, no upload.",
    seo: {
      title: "Background Eraser for Social Media Photos",
      description:
        "Background eraser for social media photos in your browser. Cut-outs on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I erase backgrounds from social media photos without uploading?",
        answer:
          "Yes. Pix-8 Background Remover runs entirely in your browser. Load a portrait, selfie, or product photo locally, run on-device AI segmentation, and export a PNG with a transparent or solid-color background. Your file is never transmitted to Pix-8 or any third-party server — important for personal and client-facing social content.",
      },
      {
        question: "What can I do with the cut-out for social posts?",
        answer:
          "Export a transparent PNG to layer on stories, feed posts, profile graphics, or thumbnails — or use a solid-color fill for a clean backdrop. Download or copy to clipboard, with optional EXIF stripping before you import into your design app or scheduler. It does not include direct posting to Instagram or LinkedIn, platform-specific auto-crop, filters, or batch processing.",
      },
      {
        question: "How is this different from in-app social media background tools?",
        answer:
          "Built-in app erasers often require uploading to the platform's servers and offer limited export control. Pix-8 processes client-side in your browser tab — erase the background, export a portable PNG, and use it anywhere, free, with no account and no server round-trip.",
      },
    ],
  },
  "professional-background-removal-for-photographers": {
    id: "professional-background-removal-for-photographers",
    path: "/professional-background-removal-for-photographers",
    linkTitle: "Background removal for photographers",
    linkExcerpt:
      "Client-side cut-outs for portraits — transparent PNG, no upload.",
    seo: {
      title: "Professional Background Removal for Photographers",
      description:
        "Professional background removal for photographers in your browser. Cut-outs on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can photographers remove backgrounds without uploading client files?",
        answer:
          "Yes. Pix-8 Background Remover runs entirely in your browser. Load a portrait, headshot, or product frame locally, run on-device AI segmentation, and export a PNG with a transparent or solid-color background. Files are never transmitted to Pix-8 or any third-party server — critical when working with unreleased client imagery or confidential shoots.",
      },
      {
        question: "Is this a replacement for pen-tool masking in Photoshop?",
        answer:
          "No. Background Remover uses AI subject segmentation for a fast first-pass cut-out — useful for proofs, composites, and quick client previews. It does not include manual pen paths, refine-edge brushes, frequency separation, batch tethering workflows, or PSD layer export. Complex hair and fine-edge work may still need traditional retouching tools.",
      },
      {
        question: "What output do photographers get from this tool?",
        answer:
          "A PNG with a transparent background or a solid-color fill you choose. Download or copy to clipboard, with optional EXIF metadata stripping before delivery. Import the cut-out into your usual editing or compositing workflow — free, with no account and no cloud upload step.",
      },
    ],
  },
  "client-side-background-remover": {
    id: "client-side-background-remover",
    path: "/client-side-background-remover",
    linkTitle: "Client-side background remover",
    linkExcerpt:
      "Remove backgrounds on-device — transparent PNG, no upload.",
    seo: {
      title: "Client-Side Background Remover",
      description:
        "Client-side background remover in your browser. AI segmentation on-device — no upload, no server. Private tool by Pix-8.",
    },
    faq: [
      {
        question: "What does client-side background removal mean?",
        answer:
          "Your image is read locally in the browser, AI segmentation runs on your device, and you export a PNG — transparent or on a solid color. Pix-8 does not receive, store, or process your file on any server. Client-side is the architecture, not an optional privacy setting.",
      },
      {
        question: "How is a client-side remover different from cloud background removal?",
        answer:
          "Cloud services require uploading your image before any pixel is processed — your file transits to and often persists on remote infrastructure. Pix-8 loads the AI model in your browser tab, segments on-device, and exports in seconds — free, with no account and no server round-trip.",
      },
      {
        question: "What can this client-side background remover actually do?",
        answer:
          "AI subject segmentation, transparent or solid-color PNG output, download or copy to clipboard, and optional EXIF metadata stripping before export. It does not include manual brush refinement, batch processing, or JPG export with transparency.",
      },
    ],
  },
  "browser-based-background-eraser": {
    id: "browser-based-background-eraser",
    path: "/browser-based-background-eraser",
    linkTitle: "Browser-based background eraser",
    linkExcerpt:
      "Erase backgrounds in your browser — no install, no upload.",
    seo: {
      title: "Browser-Based Background Eraser",
      description:
        "Browser-based background eraser in your browser. AI segmentation on-device — no install, no upload. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "What does a browser-based background eraser mean?",
        answer:
          "All segmentation runs in your web browser — no desktop install, no account, and no file upload to a server. Background Remover uses on-device AI to isolate subjects and erase the surrounding area, then exports a PNG. It does not include freehand eraser brushes, manual mask refinement, or batch processing.",
      },
      {
        question: "Are my images uploaded when I use this browser eraser?",
        answer:
          "No. Your file is read locally via the browser File API and processed on-device. It is never transmitted to Pix-8 or any third-party server — the core privacy advantage of a browser-based background eraser that keeps cut-outs client-side.",
      },
      {
        question: "How is this different from a desktop app or browser extension?",
        answer:
          "Desktop apps require installation and often route files through local caches you do not control. Extensions need permissions and may sync data. Pix-8 runs entirely in the tab — load an image, segment on-device, and export a transparent or solid-color PNG in seconds, free, with no server round-trip.",
      },
    ],
  },
  "no-upload-image-background-remover": {
    id: "no-upload-image-background-remover",
    path: "/no-upload-image-background-remover",
    linkTitle: "No-upload background remover",
    linkExcerpt:
      "Remove backgrounds without uploading — client-side PNG cut-outs.",
    seo: {
      title: "No-Upload Image Background Remover",
      description:
        "No-upload image background remover in your browser. AI segmentation on-device — your file never leaves your device. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Does this background remover really not upload my image?",
        answer:
          "Correct. Pix-8 Background Remover reads your file locally via the browser File API, runs on-device AI segmentation, and exports a PNG — transparent or on a solid color. Your image is never transmitted to Pix-8 or any third-party server. There is no upload dialog and no cloud processing step.",
      },
      {
        question: "How is a no-upload remover different from typical online background removers?",
        answer:
          "Most online removers require uploading your file before segmentation begins — your image transits to remote servers first. Pix-8 removes backgrounds without that step: load locally, segment on-device, export PNG. Free, with no account and no server round-trip.",
      },
      {
        question: "What can this no-upload image background remover do?",
        answer:
          "AI subject segmentation, transparent or solid-color PNG output, download or copy to clipboard, and optional EXIF metadata stripping before export. It does not include manual brush refinement, batch processing, or cloud storage sync.",
      },
    ],
  },
  "privacy-first-background-removal-tool": {
    id: "privacy-first-background-removal-tool",
    path: "/privacy-first-background-removal-tool",
    linkTitle: "Privacy-first background removal",
    linkExcerpt:
      "Remove backgrounds privately — client-side cut-outs, no upload.",
    seo: {
      title: "Privacy-First Background Removal Tool",
      description:
        "Privacy-first background removal tool in your browser. AI segmentation on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "What makes this a privacy-first background removal tool?",
        answer:
          "Pix-8 never routes your image through a remote server — segmentation runs on a client-side canvas in your browser. Your file is read locally, processed on-device, and exported as PNG. Privacy is the architecture, not an optional setting or privacy policy alone.",
      },
      {
        question: "Are images uploaded or stored when I remove backgrounds?",
        answer:
          "No. Pix-8 does not receive, store, or analyze your source file on any server. Background Remover reads your image via the browser File API, runs on-device AI segmentation, and lets you download or copy the result — with optional EXIF metadata stripping before export.",
      },
      {
        question: "What can this privacy-first background removal tool do?",
        answer:
          "AI subject segmentation, transparent or solid-color PNG output, download or copy to clipboard, and optional EXIF stripping before export. It does not include manual brush refinement, batch processing, cloud storage sync, or server-side model inference.",
      },
    ],
  },
};

export function listBackgroundRemoverLandings(): BackgroundRemoverLandingEntry[] {
  return Object.values(BACKGROUND_REMOVER_LANDINGS);
}

export function getBackgroundRemoverLandingByPath(
  path: string,
): BackgroundRemoverLandingEntry | undefined {
  return listBackgroundRemoverLandings().find((entry) => entry.path === path);
}

export function getBackgroundRemoverLandingBySlug(
  slug: string,
): BackgroundRemoverLandingEntry | undefined {
  const normalized = slug.replace(/^\/+/, "");
  return listBackgroundRemoverLandings().find(
    (entry) => entry.path === `/${normalized}`,
  );
}
