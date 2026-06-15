export const RESIZER_TOOL_HREF = "/tools/editor-studio/resizer";

export const RESIZER_LANDING_ACCENT = "#8E977D";

export const RESIZER_ARTICLE = {
  href: "/articles/privacy-and-speed-local-resizing",
  title: "Browser-based image resizing guide",
  excerpt:
    "Why client-side image resizing protects your assets and keeps resize workflows fast.",
} as const;

/** What Resizer actually supports — use for intent-accurate copy. */
export const RESIZER_CAPABILITIES = [
  "Resize by width and height in the browser",
  "Lock aspect ratio toggle",
  "Single-image and batch resize",
  "Download or copy resized output",
  "Optional EXIF metadata stripping before export",
  "On-device processing — images never uploaded",
] as const;

/**
 * Add new Resizer SEO landing IDs here.
 * Landing pages belong in this registry — not imageAnnotatorLandings or backgroundRemoverLandings.
 */
export type ResizerLandingId =
  | "resize-image-online"
  | "change-image-dimensions"
  | "image-resizer-free"
  | "batch-image-resizer"
  | "resize-image-for-instagram"
  | "image-resizer-for-linkedin-profile"
  | "resize-photos-for-facebook-covers"
  | "image-dimensions-for-social-media"
  | "resize-image-to-pixels"
  | "maintain-aspect-ratio-image-resizer"
  | "resize-image-without-quality-loss"
  | "image-resizer-for-web-developers"
  | "client-side-image-resizer"
  | "privacy-focused-photo-resizer"
  | "no-upload-image-resizer"
  | "browser-based-photo-resizer";

export interface ResizerLandingEntry {
  id: ResizerLandingId;
  path: string;
  linkTitle: string;
  linkExcerpt: string;
  seo: {
    title: string;
    description: string;
  };
  faq: readonly { question: string; answer: string }[];
}

export const RESIZER_LANDINGS: Record<ResizerLandingId, ResizerLandingEntry> = {
  "resize-image-online": {
    id: "resize-image-online",
    path: "/resize-image-online",
    linkTitle: "Resize image online",
    linkExcerpt:
      "Resize images in your browser — client-side, no upload.",
    seo: {
      title: "Resize Image Online",
      description:
        "Resize image online in your browser. On-device processing — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I resize an image online without uploading it?",
        answer:
          "Yes. Pix-8 Resizer runs entirely in your browser. Your file is read locally, dimensions are applied on a client-side canvas, and you download or copy the result. It is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What can this online image resizer do?",
        answer:
          "Set target width and height, lock or unlock aspect ratio, resize a single image or a batch, then download or copy the output. Optional EXIF metadata stripping is available before export. It does not include AI upscaling, smart cropping, or server-side optimization.",
      },
      {
        question: "How is this different from cloud image resizers?",
        answer:
          "Cloud resizers require uploading your file before any pixel is resized. Pix-8 processes on-device in your browser tab and exports in seconds — free, with no account and no server round-trip.",
      },
    ],
  },
  "change-image-dimensions": {
    id: "change-image-dimensions",
    path: "/change-image-dimensions",
    linkTitle: "Change image dimensions",
    linkExcerpt:
      "Set width and height in your browser — client-side, no upload.",
    seo: {
      title: "Change Image Dimensions",
      description:
        "Change image dimensions in your browser. Set width and height on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I change image dimensions without uploading my file?",
        answer:
          "Yes. Pix-8 Resizer runs entirely in your browser. Load an image locally, enter target width and height, and export the result — your file is read on-device and is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What image dimensions can I set with this tool?",
        answer:
          "Enter width and height in pixels, with an optional aspect-ratio lock that recalculates the paired dimension as you type. Resize a single image or a batch, then download or copy the output. Optional EXIF stripping is available before export. It does not include preset social-media crop sizes, AI upscaling, or server-side recompression.",
      },
      {
        question: "How is changing dimensions in Pix-8 different from cloud resizers?",
        answer:
          "Cloud tools require uploading your image before dimensions are applied. Pix-8 changes width and height on a client-side canvas in your browser tab — free, with no account and no server round-trip.",
      },
    ],
  },
  "image-resizer-free": {
    id: "image-resizer-free",
    path: "/image-resizer-free",
    linkTitle: "Image resizer free",
    linkExcerpt:
      "Free image resizing in your browser — no watermark, no upload.",
    seo: {
      title: "Image Resizer Free",
      description:
        "Image resizer free in your browser. Resize on-device — no watermark, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Is this image resizer really free?",
        answer:
          "Yes. Pix-8 Resizer is free with no account, no watermark, and no export limits. Set width and height, lock aspect ratio if needed, and download or copy the resized output at no cost.",
      },
      {
        question: "Are my images uploaded when I use this free image resizer?",
        answer:
          "No. Your file is read locally via the browser File API and all resizing runs on-device. It is never transmitted to Pix-8 or any third-party server — the privacy advantage of a free tool that keeps processing client-side.",
      },
      {
        question: "What can this free image resizer do — and what does it not include?",
        answer:
          "Resizer sets target width and height, supports aspect-ratio lock, and exports single images or batches with optional EXIF stripping. It does not include paid tiers, AI upscaling, smart crop presets, or cloud storage sync.",
      },
    ],
  },
  "batch-image-resizer": {
    id: "batch-image-resizer",
    path: "/batch-image-resizer",
    linkTitle: "Batch image resizer",
    linkExcerpt:
      "Resize multiple images in your browser — client-side, no upload.",
    seo: {
      title: "Batch Image Resizer",
      description:
        "Batch image resizer in your browser. Resize multiple files on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I resize multiple images in a batch without uploading?",
        answer:
          "Yes. Pix-8 Resizer runs entirely in your browser. Switch to batch mode, add multiple images locally, apply the same width and height to each, and download a ZIP archive — files are read on-device and are never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "How does batch resizing work in this tool?",
        answer:
          "Enter target width and height once, optionally lock aspect ratio, then queue multiple images. Resizer processes each file on a client-side canvas and packages the outputs into a ZIP download. Optional EXIF stripping applies before export. It does not include folder monitoring, cloud batch APIs, or server-side parallel processing.",
      },
      {
        question: "Is batch image resizing free and private?",
        answer:
          "Yes. The tool is free with no account required. All batch resizing runs client-side in your browser — your images stay on your device throughout the workflow, with no cloud upload step.",
      },
    ],
  },
  "resize-image-for-instagram": {
    id: "resize-image-for-instagram",
    path: "/resize-image-for-instagram",
    linkTitle: "Resize image for Instagram",
    linkExcerpt:
      "Set Instagram pixel dimensions in your browser — client-side, no upload.",
    seo: {
      title: "Resize Image for Instagram",
      description:
        "Resize image for Instagram in your browser. Enter feed dimensions on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I resize an image for Instagram without uploading it?",
        answer:
          "Yes. Pix-8 Resizer runs entirely in your browser. Load your photo locally, enter target width and height — such as 1080×1080 for a square post — and download the result. Your file is read on-device and is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What Instagram dimensions can I set with this tool?",
        answer:
          "Enter any pixel width and height manually. Common Instagram feed targets include 1080×1080 (square), 1080×1350 (portrait), and 1080×566 (landscape). Use aspect-ratio lock to keep proportions while adjusting one dimension. The tool does not include one-click Instagram presets, feed preview, or platform-specific crop overlays.",
      },
      {
        question: "Is resizing for Instagram free and private?",
        answer:
          "Yes. The tool is free with no account required. All resizing runs client-side in your browser — your photos stay on your device before you post to Instagram, with no cloud upload step.",
      },
    ],
  },
  "image-resizer-for-linkedin-profile": {
    id: "image-resizer-for-linkedin-profile",
    path: "/image-resizer-for-linkedin-profile",
    linkTitle: "LinkedIn profile resizer",
    linkExcerpt:
      "Set LinkedIn profile dimensions in your browser — client-side, no upload.",
    seo: {
      title: "Image Resizer for LinkedIn Profile",
      description:
        "Image resizer for LinkedIn profile in your browser. Enter square profile dimensions on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I resize a LinkedIn profile photo without uploading it?",
        answer:
          "Yes. Pix-8 Resizer runs entirely in your browser. Load your headshot locally, enter target width and height — such as 400×400 or 1584×1584 for a square profile image — and download the result. Your file is read on-device and is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What LinkedIn profile dimensions can I set with this tool?",
        answer:
          "Enter any pixel width and height manually. LinkedIn profile photos are square; common targets include 400×400 (minimum display size) and 1584×1584 (higher-quality upload). Use aspect-ratio lock to keep a 1:1 ratio while adjusting one dimension. The tool does not include one-click LinkedIn presets, circular crop preview, or banner-image sizing.",
      },
      {
        question: "Is resizing for a LinkedIn profile free and private?",
        answer:
          "Yes. The tool is free with no account required. All resizing runs client-side in your browser — your photo stays on your device before you upload it to LinkedIn, with no cloud upload step.",
      },
    ],
  },
  "resize-photos-for-facebook-covers": {
    id: "resize-photos-for-facebook-covers",
    path: "/resize-photos-for-facebook-covers",
    linkTitle: "Facebook cover resizer",
    linkExcerpt:
      "Set Facebook cover dimensions in your browser — client-side, no upload.",
    seo: {
      title: "Resize Photos for Facebook Covers",
      description:
        "Resize photos for Facebook covers in your browser. Enter cover pixel dimensions on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I resize a Facebook cover photo without uploading it?",
        answer:
          "Yes. Pix-8 Resizer runs entirely in your browser. Load your image locally, enter target width and height — such as 820×312 or 1640×624 for a cover photo — and download the result. Your file is read on-device and is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What Facebook cover dimensions can I set with this tool?",
        answer:
          "Enter any pixel width and height manually. Common Facebook cover targets include 820×312 (display size) and 1640×624 (higher-quality upload). Use aspect-ratio lock to keep proportions while adjusting one dimension. The tool does not include one-click Facebook presets, safe-zone overlays, or mobile versus desktop cover preview.",
      },
      {
        question: "Is resizing for Facebook covers free and private?",
        answer:
          "Yes. The tool is free with no account required. All resizing runs client-side in your browser — your cover photo stays on your device before you upload it to Facebook, with no cloud upload step.",
      },
    ],
  },
  "image-dimensions-for-social-media": {
    id: "image-dimensions-for-social-media",
    path: "/image-dimensions-for-social-media",
    linkTitle: "Social media dimensions",
    linkExcerpt:
      "Set social media image dimensions in your browser — client-side, no upload.",
    seo: {
      title: "Image Dimensions for Social Media",
      description:
        "Image dimensions for social media in your browser. Enter platform pixel sizes on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I resize images to social media dimensions without uploading?",
        answer:
          "Yes. Pix-8 Resizer runs entirely in your browser. Load your image locally, enter the width and height your platform requires — such as 1080×1080 for an Instagram post or 820×312 for a Facebook cover — and download the result. Your file is read on-device and is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What social media image dimensions can I set with this tool?",
        answer:
          "Enter any pixel width and height manually. Common targets include 1080×1080 or 1080×1350 (Instagram feed), 400×400 or 1584×1584 (LinkedIn profile), and 820×312 or 1640×624 (Facebook cover). Use aspect-ratio lock to keep proportions while adjusting one dimension. The tool does not include a built-in dimension chart, one-click platform presets, or crop overlays per network.",
      },
      {
        question: "Is resizing to social media dimensions free and private?",
        answer:
          "Yes. The tool is free with no account required. All resizing runs client-side in your browser — your images stay on your device before you post to any social platform, with no cloud upload step.",
      },
    ],
  },
  "resize-image-to-pixels": {
    id: "resize-image-to-pixels",
    path: "/resize-image-to-pixels",
    linkTitle: "Resize to pixels",
    linkExcerpt:
      "Resize images to exact pixel dimensions in your browser — client-side, no upload.",
    seo: {
      title: "Resize Image to Pixels",
      description:
        "Resize image to pixels in your browser. Set exact width and height on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I resize an image to exact pixels without uploading?",
        answer:
          "Yes. Pix-8 Resizer runs entirely in your browser. Load your image locally, enter target width and height in pixels, and download the output at those exact dimensions. Your file is read on-device and is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "How does resizing to pixels work in this tool?",
        answer:
          "Type a pixel width and height, optionally lock aspect ratio so the paired dimension recalculates as you edit, then export a single image or a batch. Resizer applies dimensions on a client-side canvas with optional EXIF stripping before download. It does not include percentage-based resize, DPI conversion, AI upscaling, or server-side recompression.",
      },
      {
        question: "Is resizing to pixels free and private?",
        answer:
          "Yes. The tool is free with no account required. All pixel resizing runs client-side in your browser — your image stays on your device throughout the workflow, with no cloud upload step.",
      },
    ],
  },
  "maintain-aspect-ratio-image-resizer": {
    id: "maintain-aspect-ratio-image-resizer",
    path: "/maintain-aspect-ratio-image-resizer",
    linkTitle: "Aspect ratio resizer",
    linkExcerpt:
      "Resize with aspect ratio lock in your browser — client-side, no upload.",
    seo: {
      title: "Maintain Aspect Ratio Image Resizer",
      description:
        "Maintain aspect ratio image resizer in your browser. Lock proportions on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I resize an image while maintaining aspect ratio without uploading?",
        answer:
          "Yes. Pix-8 Resizer runs entirely in your browser. Load your image locally, enable aspect-ratio lock, and edit width or height — the paired dimension recalculates automatically. Your file is read on-device and is never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "How does aspect-ratio lock work in this resizer?",
        answer:
          "Toggle aspect-ratio lock, then change width or height in pixels. Resizer recalculates the other dimension to preserve the image's original proportions before resizing on a client-side canvas. Unlock the toggle to set width and height independently. It does not include smart crop, content-aware scaling, or focal-point preservation beyond standard canvas resize.",
      },
      {
        question: "Is aspect-ratio resizing free and private?",
        answer:
          "Yes. The tool is free with no account required. All resizing with aspect-ratio lock runs client-side in your browser — your image stays on your device throughout the workflow, with no cloud upload step.",
      },
    ],
  },
  "resize-image-without-quality-loss": {
    id: "resize-image-without-quality-loss",
    path: "/resize-image-without-quality-loss",
    linkTitle: "Quality-conscious resizer",
    linkExcerpt:
      "Resize images on a client-side canvas in your browser — no upload.",
    seo: {
      title: "Resize Image Without Quality Loss",
      description:
        "Resize image without quality loss in your browser. Client-side canvas resize on-device — no upload, no server. Private tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I resize an image without uploading it to a server?",
        answer:
          "Yes. Pix-8 Resizer runs entirely in your browser. Your file is read locally and resized on a client-side canvas — it is never transmitted to Pix-8 or any third-party server. Keeping processing on-device avoids extra compression cycles from cloud upload and download.",
      },
      {
        question: "Does this tool guarantee zero quality loss when resizing?",
        answer:
          "No tool can guarantee zero quality loss — any resize resamples pixels. Pix-8 applies dimensions on a client-side canvas, which is well suited to downscaling to a smaller width and height. Aspect-ratio lock prevents stretch distortion that can look like quality loss. It does not include AI upscaling, lossless algorithm selection, or a quality slider for recompression control.",
      },
      {
        question: "Is resizing without server recompression free and private?",
        answer:
          "Yes. The tool is free with no account required. All resizing runs client-side in your browser — your image stays on your device throughout the workflow, with no cloud upload step.",
      },
    ],
  },
  "image-resizer-for-web-developers": {
    id: "image-resizer-for-web-developers",
    path: "/image-resizer-for-web-developers",
    linkTitle: "Resizer for developers",
    linkExcerpt:
      "Resize assets to exact pixels in your browser — client-side, no upload.",
    seo: {
      title: "Image Resizer for Web Developers",
      description:
        "Image resizer for web developers in your browser. Set exact pixel dimensions on-device — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Can web developers resize images without uploading to a server?",
        answer:
          "Yes. Pix-8 Resizer runs entirely in your browser. Load assets locally, enter target width and height in pixels, and download or copy the output — files are read on-device and are never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What can this image resizer do for web development workflows?",
        answer:
          "Set exact pixel width and height, lock aspect ratio, resize a single asset or a batch, then download or copy the output. Batch mode exports a ZIP archive. Optional EXIF stripping is available before export. It does not include an npm package, CLI, REST API, srcset generation, or build-pipeline integration.",
      },
      {
        question: "Is this image resizer for web developers free and private?",
        answer:
          "Yes. The tool is free with no account required. All resizing runs client-side in your browser — staging assets and client files stay on your machine, with no cloud upload step.",
      },
    ],
  },
  "client-side-image-resizer": {
    id: "client-side-image-resizer",
    path: "/client-side-image-resizer",
    linkTitle: "Client-side resizer",
    linkExcerpt:
      "Resize images in your browser tab — on-device, no upload.",
    seo: {
      title: "Client-Side Image Resizer",
      description:
        "Client-side image resizer in your browser. On-device canvas processing — no upload, no server. Private tool by Pix-8.",
    },
    faq: [
      {
        question: "What does client-side image resizing mean?",
        answer:
          "Your image is read locally through the browser File API and resized on a canvas in your browser tab. Pixel data is not sent to Pix-8 or any third-party server for processing. You enter dimensions, export the result, and the file stays on your device throughout.",
      },
      {
        question: "How is a client-side resizer different from cloud image resizers?",
        answer:
          "Cloud resizers require uploading your file before any resize runs. Pix-8 Resizer processes on a client-side canvas — set width and height, lock aspect ratio, resize single images or batches, then download or copy. It does not include server-side APIs, cloud storage sync, or account-based file retention.",
      },
      {
        question: "Is this client-side image resizer free and private?",
        answer:
          "Yes. The tool is free with no account required. All resizing runs in your browser — your images are never uploaded as part of the resize workflow.",
      },
    ],
  },
  "privacy-focused-photo-resizer": {
    id: "privacy-focused-photo-resizer",
    path: "/privacy-focused-photo-resizer",
    linkTitle: "Privacy-focused resizer",
    linkExcerpt:
      "Resize photos privately in your browser — on-device, no upload.",
    seo: {
      title: "Privacy-Focused Photo Resizer",
      description:
        "Privacy-focused photo resizer in your browser. On-device processing — no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Is this photo resizer private — does it upload my images?",
        answer:
          "Yes, it is private by design. Pix-8 Resizer runs entirely in your browser. Your photo is read locally and resized on a client-side canvas — it is never transmitted to Pix-8 or any third-party server. No account is required, and there is no cloud file retention.",
      },
      {
        question: "What privacy features does this photo resizer include?",
        answer:
          "Client-side processing keeps your photo on your device throughout the workflow. Optional EXIF metadata stripping removes location and camera data before export. Set width and height, lock aspect ratio, and download or copy the output. It does not include end-to-end encryption, compliance certifications, or enterprise audit logging.",
      },
      {
        question: "Is a privacy-focused photo resizer free to use?",
        answer:
          "Yes. The tool is free with no account required. All resizing runs client-side in your browser — your photos stay on your device, with no cloud upload step.",
      },
    ],
  },
  "no-upload-image-resizer": {
    id: "no-upload-image-resizer",
    path: "/no-upload-image-resizer",
    linkTitle: "No-upload resizer",
    linkExcerpt:
      "Resize images without uploading — client-side in your browser.",
    seo: {
      title: "No-Upload Image Resizer",
      description:
        "No-upload image resizer in your browser. Resize on-device — no server, no cloud queue. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "Does this image resizer require an upload?",
        answer:
          "No. Pix-8 Resizer runs entirely in your browser. Your image is read locally through the File API and resized on a client-side canvas — it is never uploaded to Pix-8 or any third-party server. There is no cloud queue, no account, and no server-side processing step.",
      },
      {
        question: "How is a no-upload resizer different from cloud image resizers?",
        answer:
          "Cloud resizers require sending your file to a remote server before any resize runs. Pix-8 processes on-device — set width and height, lock aspect ratio, resize single images or batches, then download or copy. It does not include drag-to-cloud workflows, server APIs, or stored file history.",
      },
      {
        question: "Is this no-upload image resizer free?",
        answer:
          "Yes. The tool is free with no account required. All resizing runs client-side in your browser — your images stay on your device throughout, with no upload step.",
      },
    ],
  },
  "browser-based-photo-resizer": {
    id: "browser-based-photo-resizer",
    path: "/browser-based-photo-resizer",
    linkTitle: "Browser photo resizer",
    linkExcerpt:
      "Resize photos in your browser — no install, client-side, no upload.",
    seo: {
      title: "Browser-Based Photo Resizer",
      description:
        "Browser-based photo resizer in your browser. Resize on-device — no install, no upload, no server. Private client-side tool by Pix-8.",
    },
    faq: [
      {
        question: "What does a browser-based photo resizer mean?",
        answer:
          "All resizing runs in your web browser on a client-side canvas — no desktop install, no account, and no file upload to a server. Set width and height, lock aspect ratio, resize single photos or batches, then download or copy. It does not include AI upscaling, smart cropping, or offline PWA guarantees beyond standard browser behavior.",
      },
      {
        question: "Are my photos uploaded when I use this browser resizer?",
        answer:
          "No. Your file is read locally via the browser File API and resized on-device. It is never transmitted to Pix-8 or any third-party server — the core privacy advantage of a browser-based photo resizer that keeps processing client-side.",
      },
      {
        question: "How is this different from a desktop app or cloud photo resizer?",
        answer:
          "Desktop apps require installation; cloud resizers upload your photo before any resize runs. Pix-8 runs entirely in the tab — load a photo, set dimensions, and export in seconds — free, with no server round-trip and no app download.",
      },
    ],
  },
};

export function listResizerLandings(): ResizerLandingEntry[] {
  return Object.values(RESIZER_LANDINGS);
}

export function getResizerLandingByPath(
  path: string,
): ResizerLandingEntry | undefined {
  return listResizerLandings().find((entry) => entry.path === path);
}

export function getResizerLandingBySlug(
  slug: string,
): ResizerLandingEntry | undefined {
  const normalized = slug.replace(/^\/+/, "");
  return listResizerLandings().find(
    (entry) => entry.path === `/${normalized}`,
  );
}
