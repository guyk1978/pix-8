export const MEME_GENERATOR_TOOL_HREF = "/tools/editor-studio/meme-generator";

export const MEME_GENERATOR_LANDING_ACCENT = "#8E977D";

export const MEME_GENERATOR_ARTICLE = {
  href: "/articles/meme-generator-guide",
  title:
    "The Complete Guide to the Pix-8 Meme Generator: Mastering Viral Content in Your Browser",
  excerpt:
    "Learn meme history, virality psychology, iconic formats, brand strategy, and how to craft classic top-and-bottom captions privately with Pix-8.",
} as const;

/** What Meme Generator actually supports — use for intent-accurate copy. */
export const MEME_GENERATOR_CAPABILITIES = [
  "Built-in meme templates (Distracted Boyfriend, Drake, Change My Mind, Two Buttons)",
  "Upload your own image as the meme base",
  "Classic top and bottom Impact-style captions with outline",
  "Live canvas preview as you type",
  "Download or copy flattened output",
  "Optional EXIF metadata stripping before export",
  "On-device processing — images never uploaded to a server",
] as const;

/**
 * Add new Meme Generator SEO landing IDs here as union members.
 * Meme landing pages belong in this registry — not textOverlayLandings,
 * imageOverlayLandings, watermarkLandings, or imageAnnotatorLandings.
 */
export type MemeGeneratorLandingId =
  | "meme-generator-online"
  | "make-a-meme-online"
  | "free-meme-maker"
  | "create-memes-from-photos"
  | "add-text-to-memes-online"
  | "make-memes-for-social-media"
  | "fast-meme-creator"
  | "custom-meme-maker"
  | "client-side-meme-generator"
  | "privacy-first-meme-maker"
  | "browser-based-meme-generator"
  | "no-upload-meme-creator"
  | "upload-and-meme-your-photos"
  | "easy-meme-editor-for-images"
  | "professional-meme-creation-tool"
  | "funny-meme-generator-online";

export interface MemeGeneratorLandingEntry {
  id: MemeGeneratorLandingId;
  path: string;
  linkTitle: string;
  linkExcerpt: string;
  seo: {
    title: string;
    description: string;
  };
  faq: readonly { question: string; answer: string }[];
}

export const MEME_GENERATOR_LANDINGS: Record<
  MemeGeneratorLandingId,
  MemeGeneratorLandingEntry
> = {
  "meme-generator-online": {
    id: "meme-generator-online",
    path: "/meme-generator-online",
    linkTitle: "Meme generator online",
    linkExcerpt:
      "Meme generator online in your browser — templates, client-side, no upload.",
    seo: {
      title: "Meme Generator Online",
      description:
        "Meme generator online in your browser. Classic top-and-bottom captions on-device — no upload, no server. Private Meme Generator by Pix-8.",
    },
    faq: [
      {
        question:
          "Can I use this meme generator online without uploading my image to a server?",
        answer:
          "Yes. Pix-8 Meme Generator runs entirely in your browser. Your image is read locally, captions are rendered on a client-side canvas, and you export from your device. Your photo is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What meme formats does this support?",
        answer:
          "Meme Generator adds classic top and bottom Impact-style captions with white text and a black outline — the standard meme layout. Choose from four built-in templates (Distracted Boyfriend, Drake Hotline Bling, Change My Mind, Two Buttons) or upload your own image as the base. It does not support custom fonts, draggable text blocks, video memes, GIF export, or AI-generated images.",
      },
      {
        question: "How is this different from Text Overlay or Image Overlay?",
        answer:
          "Meme Generator is built for the classic two-line meme format with auto-wrapped Impact-style captions on a single base image. Text Overlay adds free-form typed text with font, color, alignment, and shadow controls. Image Overlay layers built-in decorative presets (stars, flowers, birds, sparkles, hearts) on a photo. Meme Generator does not batch-process folders or queue multiple files automatically.",
      },
    ],
  },
  "make-a-meme-online": {
    id: "make-a-meme-online",
    path: "/make-a-meme-online",
    linkTitle: "Make a meme online",
    linkExcerpt:
      "Make a meme online in your browser — captions, client-side, no upload.",
    seo: {
      title: "Make a Meme Online",
      description:
        "Make a meme online in your browser. Type top-and-bottom captions on-device — no upload, no server. Private Meme Generator by Pix-8.",
    },
    faq: [
      {
        question: "Can I make a meme online without uploading my image?",
        answer:
          "Yes. Pix-8 Meme Generator runs entirely in your browser. Your image stays on your device, captions render on a client-side canvas, and you export locally. Nothing is sent to Pix-8 or any third-party server.",
      },
      {
        question: "Do I need Photoshop or an app to make a meme?",
        answer:
          "No install required. Open Meme Generator in your browser, pick one of four built-in templates or upload your own JPG, PNG, or WEBP, type top and bottom captions in the classic Impact style, and download or copy one flattened image. It does not include custom fonts, free-drag text placement, or video or GIF export.",
      },
      {
        question: "Can I make memes from my own photos?",
        answer:
          "Yes. Upload any image from your device as the meme base, then add top and bottom captions with live preview. Built-in templates (Distracted Boyfriend, Drake Hotline Bling, Change My Mind, Two Buttons) are also available. Meme Generator processes one image per export — it does not batch folders or add decorative overlay presets like Image Overlay.",
      },
    ],
  },
  "free-meme-maker": {
    id: "free-meme-maker",
    path: "/free-meme-maker",
    linkTitle: "Free meme maker",
    linkExcerpt:
      "Free meme maker in your browser — no account, client-side, no upload.",
    seo: {
      title: "Free Meme Maker",
      description:
        "Free meme maker in your browser. Classic captions on-device — no account, no upload, no server. Private Meme Generator by Pix-8.",
    },
    faq: [
      {
        question: "Is this free meme maker really free to use?",
        answer:
          "Yes. Pix-8 Meme Generator is free with no account, no subscription, and no export watermark added by the tool. Open it in your browser, add captions to a template or your own image, and download or copy the result. Pix-8 does not charge per export or gate features behind a paywall for this workflow.",
      },
      {
        question: "Does a free meme maker mean my images get uploaded?",
        answer:
          "Not with Pix-8. This meme maker runs entirely in your browser. Your image is read locally, captions render on a client-side canvas, and you export from your device. Your files are never transmitted to Pix-8 or any third-party server — free does not mean trading privacy for access.",
      },
      {
        question: "What can I do with this free meme maker?",
        answer:
          "Pick from four built-in templates (Distracted Boyfriend, Drake Hotline Bling, Change My Mind, Two Buttons) or upload your own JPG, PNG, or WEBP. Add top and bottom Impact-style captions with live preview, then download or copy one flattened image. It does not include custom fonts, draggable text, video or GIF export, AI image generation, or batch folder processing.",
      },
    ],
  },
  "create-memes-from-photos": {
    id: "create-memes-from-photos",
    path: "/create-memes-from-photos",
    linkTitle: "Memes from photos",
    linkExcerpt:
      "Create memes from photos in your browser — client-side, no upload.",
    seo: {
      title: "Create Memes from Photos",
      description:
        "Create memes from photos in your browser. Add captions to your images on-device — no upload, no server. Private Meme Generator by Pix-8.",
    },
    faq: [
      {
        question: "Can I create memes from my own photos without uploading them?",
        answer:
          "Yes. Pix-8 Meme Generator runs entirely in your browser. Open a JPG, PNG, or WEBP from your device, add top and bottom captions on a client-side canvas, and export locally. Your photo is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What photo formats work as a meme base?",
        answer:
          "Meme Generator accepts JPG, PNG, and WEBP files loaded from your device. Add classic top and bottom Impact-style captions with live preview, then download or copy one flattened image. It does not edit RAW files, batch-process photo folders, or auto-generate captions with AI.",
      },
      {
        question: "Do I have to use my own photo, or are templates available?",
        answer:
          "Both. Upload any photo from your device as the meme base, or start from four built-in templates (Distracted Boyfriend, Drake Hotline Bling, Change My Mind, Two Buttons). Each export covers one image with top and bottom captions — not multi-panel collages, free-drag text blocks, or decorative overlay presets like Image Overlay.",
      },
    ],
  },
  "add-text-to-memes-online": {
    id: "add-text-to-memes-online",
    path: "/add-text-to-memes-online",
    linkTitle: "Add text to memes",
    linkExcerpt:
      "Add text to memes online in your browser — captions, client-side, no upload.",
    seo: {
      title: "Add Text to Memes Online",
      description:
        "Add text to memes online in your browser. Top-and-bottom captions on-device — no upload, no server. Private Meme Generator by Pix-8.",
    },
    faq: [
      {
        question: "Can I add text to memes online without uploading my image?",
        answer:
          "Yes. Pix-8 Meme Generator runs entirely in your browser. Load a template or your own JPG, PNG, or WEBP locally, type top and bottom captions on a client-side canvas, and export from your device. Your image is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What kind of text can I add to a meme?",
        answer:
          "Meme Generator adds classic top and bottom Impact-style captions — white text with a black outline, auto-wrapped and centered in the standard meme layout. You type into two fields with live preview. It does not support custom fonts, draggable text blocks, color pickers, shadows, or multiple free-form text layers like Pix-8 Text Overlay.",
      },
      {
        question: "How is this different from Text Overlay?",
        answer:
          "Meme Generator is built for the two-line meme caption format on one base image — top text and bottom text in Impact style. Text Overlay adds editable typed text anywhere on a photo with font, size, color, alignment, and shadow controls. Meme Generator does not place text mid-image, support font selection, or batch-caption multiple files in one session.",
      },
    ],
  },
  "make-memes-for-social-media": {
    id: "make-memes-for-social-media",
    path: "/make-memes-for-social-media",
    linkTitle: "Memes for social media",
    linkExcerpt:
      "Make memes for social media in your browser — client-side, no upload.",
    seo: {
      title: "Make Memes for Social Media",
      description:
        "Make memes for social media in your browser. Classic captions on-device — no upload, no server. Private Meme Generator by Pix-8.",
    },
    faq: [
      {
        question:
          "Can I make memes for social media without uploading my images?",
        answer:
          "Yes. Pix-8 Meme Generator runs entirely in your browser. Load a template or your own JPG, PNG, or WEBP locally, add top and bottom captions on a client-side canvas, and export from your device. Your image is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question:
          "Does this resize memes for Instagram, TikTok, or other platforms?",
        answer:
          "Meme Generator exports one flattened image with classic top-and-bottom Impact-style captions — ready to download or copy and post. It does not include platform-specific dimension presets, aspect-ratio crops, or scheduled publishing. To resize output for a specific feed format, export from Meme Generator and open the file in Pix-8 Resizer separately.",
      },
      {
        question: "What meme formats work best for social feeds?",
        answer:
          "The tool produces the standard two-line meme layout — white Impact-style text with black outline on a single base image. Choose from four built-in templates or upload your own photo. Live preview helps you check readability before export. It does not create video memes, GIFs, carousel posts, or multi-image stories in one session.",
      },
    ],
  },
  "fast-meme-creator": {
    id: "fast-meme-creator",
    path: "/fast-meme-creator",
    linkTitle: "Fast meme creator",
    linkExcerpt:
      "Fast meme creator in your browser — live preview, client-side, no upload.",
    seo: {
      title: "Fast Meme Creator",
      description:
        "Fast meme creator in your browser. Type captions with live preview on-device — no upload, no server. Private Meme Generator by Pix-8.",
    },
    faq: [
      {
        question: "Why is this a fast meme creator compared to cloud tools?",
        answer:
          "Pix-8 Meme Generator runs entirely in your browser. There is no account setup, no server upload queue, and no round trip before you see captions on your image. Load a template or your own JPG, PNG, or WEBP locally, type top and bottom text with live preview, and export from your device. Speed depends on your hardware, but the workflow stays on-device from start to finish.",
      },
      {
        question: "How quickly can I go from image to exported meme?",
        answer:
          "Open Meme Generator in your browser, pick one of four built-in templates or upload an image, enter top and bottom captions, and download or copy one flattened file. Live preview updates as you type — no waiting for a remote render. It does not auto-generate captions, batch-process folders, or produce video or GIF memes.",
      },
      {
        question: "Do I need to install software for a fast workflow?",
        answer:
          "No install required. Meme Generator works in the browser with classic Impact-style top and bottom captions on a client-side canvas. Your image is never transmitted to Pix-8 or any third-party server. For draggable text with custom fonts and colors, use Pix-8 Text Overlay instead — Meme Generator is optimized for the standard two-line meme format, not a full design suite.",
      },
    ],
  },
  "custom-meme-maker": {
    id: "custom-meme-maker",
    path: "/custom-meme-maker",
    linkTitle: "Custom meme maker",
    linkExcerpt:
      "Custom meme maker in your browser — your image, your captions, client-side.",
    seo: {
      title: "Custom Meme Maker",
      description:
        "Custom meme maker in your browser. Upload your image or pick a template, add your captions on-device — no upload, no server. Private Meme Generator by Pix-8.",
    },
    faq: [
      {
        question: "What can I customize with this meme maker?",
        answer:
          "You choose the base image and write your own top and bottom captions. Upload a JPG, PNG, or WEBP from your device, or start from one of four built-in templates. Pix-8 renders classic Impact-style text with outline on a client-side canvas with live preview. It does not support custom fonts, draggable text placement, color pickers, or mid-image text blocks — for that level of typography control, use Pix-8 Text Overlay.",
      },
      {
        question: "Is my custom meme processed on a server?",
        answer:
          "No. Pix-8 Meme Generator runs entirely in your browser. Your image is loaded locally, captions are composited on-device, and you download or copy one flattened file without transmitting pixels to Pix-8 or any third-party server.",
      },
      {
        question: "Can I use my own photo instead of a template?",
        answer:
          "Yes. Upload any JPG, PNG, or WEBP as the meme base, then type your top and bottom captions. Built-in templates (Distracted Boyfriend, Drake, Change My Mind, Two Buttons) remain available if you prefer a preset format. The tool exports one flattened image per session — it does not batch-customize multiple files, create video memes, or auto-generate captions with AI.",
      },
    ],
  },
  "client-side-meme-generator": {
    id: "client-side-meme-generator",
    path: "/client-side-meme-generator",
    linkTitle: "Client-side meme generator",
    linkExcerpt:
      "Client-side meme generator in your browser — canvas rendering, no upload.",
    seo: {
      title: "Client-Side Meme Generator",
      description:
        "Client-side meme generator in your browser. Canvas rendering on-device — no upload, no server. Private Meme Generator by Pix-8.",
    },
    faq: [
      {
        question: "What does client-side mean for this meme generator?",
        answer:
          "Your image is read locally via the browser File API, captions are composited on a client-side canvas, and you export from your device. Pix-8 Meme Generator does not transmit your file to Pix-8 or any third-party server. Client-side here means the architecture — not a privacy toggle you enable separately.",
      },
      {
        question: "How is a client-side meme generator different from cloud meme apps?",
        answer:
          "Cloud meme makers upload your image before rendering text. Pix-8 runs entirely in the browser tab: choose a built-in template or upload JPG, PNG, or WEBP locally, type top and bottom Impact-style captions with live preview, then download or copy one flattened file. It does not include server-side AI captions, collaborative editing, video meme export, or batch processing.",
      },
      {
        question: "What meme features run client-side?",
        answer:
          "Template selection, image loading, caption rendering, live preview, and export all run on a client-side canvas in your browser. Four built-in templates are available, or upload your own base image. The tool produces classic top-and-bottom meme captions — not custom fonts, draggable text placement, or mid-image typography. For that, use Pix-8 Text Overlay.",
      },
    ],
  },
  "privacy-first-meme-maker": {
    id: "privacy-first-meme-maker",
    path: "/privacy-first-meme-maker",
    linkTitle: "Privacy-first meme maker",
    linkExcerpt:
      "Privacy-first meme maker in your browser — on-device, no upload.",
    seo: {
      title: "Privacy-First Meme Maker",
      description:
        "Privacy-first meme maker in your browser. Memes stay on your device — no upload, no server. Private Meme Generator by Pix-8.",
    },
    faq: [
      {
        question: "What makes this a privacy-first meme maker?",
        answer:
          "Pix-8 Meme Generator never routes your image through a remote server. Your file is read locally, captions are composited on a client-side canvas in your browser, and you export from your device. Privacy comes from the architecture — not a toggle, account setting, or marketing badge alone.",
      },
      {
        question: "Are my images uploaded when I make memes?",
        answer:
          "No. Your JPG, PNG, or WEBP is loaded from your device and processed on a client-side canvas. Pix-8 does not receive, store, or analyze your image on a server. Optional EXIF metadata stripping before export helps reduce location and device data embedded in the file you share publicly.",
      },
      {
        question: "What can this privacy-first meme maker do?",
        answer:
          "Choose from four built-in templates or upload your own image, add classic top-and-bottom Impact-style captions with live preview, then download or copy one flattened file. It does not include custom fonts, draggable text placement, AI caption generation, video or GIF export, or collaborative cloud editing.",
      },
    ],
  },
  "browser-based-meme-generator": {
    id: "browser-based-meme-generator",
    path: "/browser-based-meme-generator",
    linkTitle: "Browser-based meme generator",
    linkExcerpt:
      "Browser-based meme generator — no install, client-side, no upload.",
    seo: {
      title: "Browser-Based Meme Generator",
      description:
        "Browser-based meme generator with no install. Create memes on a client-side canvas — no upload, no server. Private Meme Generator by Pix-8.",
    },
    faq: [
      {
        question: "What does browser-based mean for this meme generator?",
        answer:
          "Pix-8 Meme Generator runs entirely in your web browser on a client-side canvas — no desktop app, browser extension, or plugin required. Open the page, load a template or your own JPG, PNG, or WEBP locally, type top and bottom captions with live preview, and export from your device. Your image is never uploaded to Pix-8 or any third-party server.",
      },
      {
        question: "Do I need to install software to use this meme generator?",
        answer:
          "No install required. Meme Generator works in a browser tab with classic Impact-style top and bottom captions. Four built-in templates are included, or upload your own image as the base. It does not include offline native apps, video or GIF meme export, AI caption generation, or collaborative cloud editing.",
      },
      {
        question: "How is a browser-based meme generator different from a cloud meme site?",
        answer:
          "Cloud meme sites often upload your image before rendering text. Pix-8 keeps compositing in the browser tab on a client-side canvas — your file is read locally and stays on-device through export. The tool produces one flattened image per session with standard two-line meme captions, not custom fonts or draggable text placement.",
      },
    ],
  },
  "no-upload-meme-creator": {
    id: "no-upload-meme-creator",
    path: "/no-upload-meme-creator",
    linkTitle: "No-upload meme creator",
    linkExcerpt:
      "No-upload meme creator in your browser — client-side, on-device.",
    seo: {
      title: "No-Upload Meme Creator",
      description:
        "No-upload meme creator in your browser. Open images locally, add captions on-device — no server upload. Private Meme Generator by Pix-8.",
    },
    faq: [
      {
        question: "Does this meme creator upload my images to a server?",
        answer:
          "No. Pix-8 Meme Generator reads your file locally via the browser File API and composites captions on a client-side canvas. Your JPG, PNG, or WEBP is never transmitted to Pix-8 or any third-party server. Opening an image from your device is not the same as uploading it to a remote meme service.",
      },
      {
        question: "How is a no-upload meme creator different from typical meme sites?",
        answer:
          "Many online meme makers require a server upload before you can preview captions. Pix-8 runs entirely in your browser tab: pick a built-in template or open your own image locally, type top and bottom Impact-style captions with live preview, then download or copy one flattened file — all without a remote upload step.",
      },
      {
        question: "What can I do without uploading?",
        answer:
          "Load one of four built-in templates or open your own image from your device, add classic top-and-bottom meme captions, preview live on a client-side canvas, and export with optional EXIF stripping. It does not include AI caption generation, video or GIF export, batch processing, custom fonts, or draggable text placement.",
      },
    ],
  },
  "upload-and-meme-your-photos": {
    id: "upload-and-meme-your-photos",
    path: "/upload-and-meme-your-photos",
    linkTitle: "Upload & meme photos",
    linkExcerpt:
      "Upload and meme your photos in your browser — local, no server upload.",
    seo: {
      title: "Upload and Meme Your Photos",
      description:
        "Upload and meme your photos in your browser. Open images locally, add captions on-device — no server upload. Private Meme Generator by Pix-8.",
    },
    faq: [
      {
        question: "When you say upload, does my photo go to a server?",
        answer:
          "No. In Pix-8 Meme Generator, you open a photo from your device through the browser file picker — the file is read locally on a client-side canvas. Your JPG, PNG, or WEBP is never transmitted to Pix-8 or any third-party server. Upload here means select from your device, not send to a cloud meme service.",
      },
      {
        question: "What photos can I turn into memes?",
        answer:
          "Open any JPG, PNG, or WEBP from your phone, camera roll, or desktop as the meme base. Add classic top and bottom Impact-style captions with live preview, then download or copy one flattened image. Four built-in templates are also available if you prefer a preset format instead of your own photo.",
      },
      {
        question: "Can I meme multiple photos at once?",
        answer:
          "Meme Generator processes one image per session — open a photo, add top and bottom captions, and export one flattened file. It does not batch-meme photo folders, create carousel posts, auto-generate captions with AI, or apply filters and crops before captioning.",
      },
    ],
  },
  "easy-meme-editor-for-images": {
    id: "easy-meme-editor-for-images",
    path: "/easy-meme-editor-for-images",
    linkTitle: "Easy meme editor",
    linkExcerpt:
      "Easy meme editor for images in your browser — simple, client-side.",
    seo: {
      title: "Easy Meme Editor for Images",
      description:
        "Easy meme editor for images in your browser. Add captions on-device — no upload, no server. Private Meme Generator by Pix-8.",
    },
    faq: [
      {
        question: "What makes this an easy meme editor for images?",
        answer:
          "Pix-8 Meme Generator keeps the workflow simple: open a built-in template or your own JPG, PNG, or WEBP locally, type top and bottom captions in two fields, preview live on a client-side canvas, and export one flattened file. There are no layers, font menus, or draggable text handles to learn — but it is also not a full image editor with crop, filter, or retouch tools.",
      },
      {
        question: "Does this easy editor upload my images?",
        answer:
          "No. Your image is read locally in the browser and composited on-device. Pix-8 never transmits your file to a server for caption rendering. Optional EXIF metadata stripping is available before export.",
      },
      {
        question: "What image editing can this meme editor do?",
        answer:
          "It adds classic top-and-bottom Impact-style meme captions to one base image with live preview — the standard two-line meme format. It does not crop, resize, filter, or retouch photos, support custom fonts or mid-image text blocks, batch-edit multiple images, or export video or GIF memes. For free-positioned typography anywhere on an image, use Pix-8 Text Overlay.",
      },
    ],
  },
  "professional-meme-creation-tool": {
    id: "professional-meme-creation-tool",
    path: "/professional-meme-creation-tool",
    linkTitle: "Pro meme creation tool",
    linkExcerpt:
      "Professional meme creation tool in your browser — client-side, no upload.",
    seo: {
      title: "Professional Meme Creation Tool",
      description:
        "Professional meme creation tool in your browser. Caption images on-device — no upload, no server. Private Meme Generator by Pix-8.",
    },
    faq: [
      {
        question: "What makes this a professional meme creation tool?",
        answer:
          "Pix-8 Meme Generator delivers a consistent, repeatable workflow: load a built-in template or your own JPG, PNG, or WEBP locally, add top and bottom Impact-style captions with live preview on a client-side canvas, and export one flattened file. Professional here means reliable output and on-device privacy — not enterprise brand kits, team approval queues, AI caption writers, or collaborative cloud workspaces.",
      },
      {
        question: "Is this suitable for work or brand communications?",
        answer:
          "Yes, when you need the standard two-line meme format for internal channels, social posts, or team updates. Your images stay on your device — nothing is uploaded to Pix-8 or a third-party server. Optional EXIF stripping helps before public sharing. It does not enforce brand font guidelines, watermark logos on export, or schedule posts to platforms.",
      },
      {
        question: "What does this professional meme tool include?",
        answer:
          "Four built-in templates, upload your own image as the base, classic top-and-bottom captions with outline, live canvas preview, download or copy flattened output, and optional EXIF metadata removal. It does not include custom fonts, draggable text placement, video or GIF export, batch processing, or AI-generated jokes.",
      },
    ],
  },
  "funny-meme-generator-online": {
    id: "funny-meme-generator-online",
    path: "/funny-meme-generator-online",
    linkTitle: "Funny meme generator",
    linkExcerpt:
      "Funny meme generator online in your browser — client-side, no upload.",
    seo: {
      title: "Funny Meme Generator Online",
      description:
        "Funny meme generator online in your browser. Write your captions on-device — no upload, no server. Private Meme Generator by Pix-8.",
    },
    faq: [
      {
        question: "Does this funny meme generator write jokes for me?",
        answer:
          "No. Pix-8 Meme Generator does not auto-generate captions, suggest punchlines, or use AI humor. You write the top and bottom text — the tool renders classic Impact-style captions on a client-side canvas with live preview. Four built-in templates (Distracted Boyfriend, Drake, Change My Mind, Two Buttons) provide recognizable formats; you supply the funny wording.",
      },
      {
        question: "Can I make funny memes from my own photos online?",
        answer:
          "Yes. Open Meme Generator in your browser, upload a JPG, PNG, or WEBP from your device or pick a built-in template, type your captions, and export one flattened file. Everything runs on a client-side canvas — your image is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What makes memes from this tool shareable?",
        answer:
          "Readable top-and-bottom Impact-style text with outline on a single base image — the layout audiences recognize in feeds and group chats. Live preview helps you refine wording before export. It does not create video memes, GIFs, reaction sound clips, or AI-generated joke captions.",
      },
    ],
  },
};

export function listMemeGeneratorLandings(): MemeGeneratorLandingEntry[] {
  return Object.values(MEME_GENERATOR_LANDINGS);
}

export function getMemeGeneratorLandingByPath(
  path: string,
): MemeGeneratorLandingEntry | undefined {
  return listMemeGeneratorLandings().find((entry) => entry.path === path);
}

export function getMemeGeneratorLandingBySlug(
  slug: string,
): MemeGeneratorLandingEntry | undefined {
  const normalized = slug.replace(/^\/+/, "");
  return listMemeGeneratorLandings().find(
    (entry) => entry.path === `/${normalized}`,
  );
}
