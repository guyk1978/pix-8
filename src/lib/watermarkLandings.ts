export const WATERMARK_TOOL_HREF = "/tools/editor-studio/watermark";

export const WATERMARK_LANDING_ACCENT = "#8E977D";

export const WATERMARK_ARTICLE = {
  href: "/articles/protecting-your-work-with-watermarks",
  title: "Protecting Your Content: The Ultimate Guide to Watermarking",
  excerpt:
    "Learn how to effectively watermark your images to prevent unauthorized use while maintaining your brand's aesthetic.",
} as const;

/** What Watermark actually supports — use for intent-accurate copy. */
export const WATERMARK_CAPABILITIES = [
  "Load base photo and logo/watermark image locally",
  "Opacity and scale controls for the logo mark",
  "Nine position presets (corners, edges, and center)",
  "Download or copy watermarked output",
  "Optional EXIF metadata stripping before export",
  "On-device processing — images never uploaded to a server",
] as const;

/**
 * Add new Watermark SEO landing IDs here.
 * Logo and image-file overlays belong in this registry — not
 * imageOverlayLandings, textOverlayLandings, or imageAnnotatorLandings.
 */
export type WatermarkLandingId =
  | "add-logo-to-image-online"
  | "add-watermark-to-photos-online"
  | "brand-photos-with-logo"
  | "no-upload-watermark-maker"
  | "professional-image-watermarking-tool";

export interface WatermarkLandingEntry {
  id: WatermarkLandingId;
  path: string;
  linkTitle: string;
  linkExcerpt: string;
  seo: {
    title: string;
    description: string;
  };
  faq: readonly { question: string; answer: string }[];
}

export const WATERMARK_LANDINGS: Record<
  WatermarkLandingId,
  WatermarkLandingEntry
> = {
  "add-logo-to-image-online": {
    id: "add-logo-to-image-online",
    path: "/add-logo-to-image-online",
    linkTitle: "Add logo to image",
    linkExcerpt:
      "Add a logo to images in your browser — client-side, no upload.",
    seo: {
      title: "Add Logo to Image Online",
      description:
        "Add logo to image online in your browser. Place your logo file on-device — no upload, no server. Private client-side Watermark tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I add a logo to an image online without uploading to a server?",
        answer:
          "Yes. Pix-8 Watermark runs entirely in your browser. Your base photo and logo file are read locally, composited on a client-side canvas, and exported from your device. They are never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What image formats can I use as a logo?",
        answer:
          "Watermark accepts a logo or mark image file from your device — typically PNG with transparency for clean placement on photos. Load your base image, then load the logo file, adjust opacity, scale, and position preset, and export. It does not generate logos, convert vector files, or add typed text — for draggable typography, use Pix-8 Text Overlay.",
      },
      {
        question: "How is Watermark different from Image Overlay or Text Overlay?",
        answer:
          "Watermark places your own logo or image file on a photo with opacity, scale, and nine position presets — ideal for branding and proof marks. Image Overlay layers built-in decorative presets (stars, flowers, birds, sparkles, hearts) with drag positioning. Text Overlay adds typed text with font and color controls. Watermark does not include free-drag logo placement, decorative preset overlays, or pin-style annotation labels.",
      },
    ],
  },
  "add-watermark-to-photos-online": {
    id: "add-watermark-to-photos-online",
    path: "/add-watermark-to-photos-online",
    linkTitle: "Watermark photos online",
    linkExcerpt:
      "Watermark photos online in your browser — logo file, client-side, no upload.",
    seo: {
      title: "Add Watermark to Photos Online",
      description:
        "Add watermark to photos online in your browser. Place your logo mark on-device — no upload, no server. Private client-side Watermark tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I watermark photos online without uploading them to a server?",
        answer:
          "Yes. Pix-8 Watermark runs entirely in your browser. Your photos and watermark image file are read locally, composited on a client-side canvas, and exported from your device. They are never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "Can I add typed text as a watermark on this page?",
        answer:
          "Pix-8 Watermark places a logo or image file on your photo — typically a PNG mark with transparency. It does not add editable typed text blocks. For text watermarks with font, size, and color controls, use Pix-8 Text Overlay. Watermark does not include free-drag placement; it uses opacity, scale, and nine position presets.",
      },
      {
        question: "How is this different from Image Overlay decorative presets?",
        answer:
          "Watermark composites your own logo or mark image file onto a photo for branding and proof protection. Image Overlay layers built-in decorative presets (stars, flowers, birds, sparkles, hearts) with drag positioning — not your logo file. Watermark does not include batch folders, tiled watermarks, or automated multi-file queues.",
      },
    ],
  },
  "brand-photos-with-logo": {
    id: "brand-photos-with-logo",
    path: "/brand-photos-with-logo",
    linkTitle: "Brand photos with logo",
    linkExcerpt:
      "Brand photos with your logo in the browser — client-side, no upload.",
    seo: {
      title: "Brand Photos with Logo",
      description:
        "Brand photos with logo in your browser. Composite your logo file on-device — no upload, no server. Private client-side Watermark tool by Pix-8.",
    },
    faq: [
      {
        question: "Can I brand photos with my logo without uploading files to a server?",
        answer:
          "Yes. Pix-8 Watermark runs entirely in your browser. Your photo and logo file are read locally, composited on a client-side canvas, and exported from your device. They are never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "Does this tool create or design logos for me?",
        answer:
          "No. Watermark composites an existing logo or mark image file onto your photo — typically a PNG with transparency. It does not generate logos, convert vector artwork, or add typed brand text. For editable typography on images, use Pix-8 Text Overlay. Logo placement uses opacity, scale, and nine position presets — not free-drag positioning.",
      },
      {
        question: "Can I brand multiple photos at once?",
        answer:
          "Watermark processes one base photo per session. Load your image and logo file, set opacity, scale, and position preset, then download or copy one branded export. It does not batch-process folders, apply tiled logos, or queue multiple files automatically.",
      },
    ],
  },
  "no-upload-watermark-maker": {
    id: "no-upload-watermark-maker",
    path: "/no-upload-watermark-maker",
    linkTitle: "No-upload watermark",
    linkExcerpt:
      "No-upload watermark maker in your browser — logo file, client-side, private.",
    seo: {
      title: "No-Upload Watermark Maker",
      description:
        "No-upload watermark maker in your browser. Place your logo mark on-device — no server, no cloud queue. Private client-side Watermark tool by Pix-8.",
    },
    faq: [
      {
        question: "Does this watermark maker upload my photos to a server?",
        answer:
          "No. Pix-8 Watermark runs entirely in your browser. Your base photo and watermark image file are read locally, composited on a client-side canvas, and exported from your device. They are never transmitted to Pix-8 or any third-party server — there is no upload step.",
      },
      {
        question: "Can I add typed text as a watermark without uploading?",
        answer:
          "Pix-8 Watermark places a logo or image file on your photo — typically a PNG mark with transparency. It does not add editable typed text blocks. For text watermarks with font, size, and color controls without server upload, use Pix-8 Text Overlay. Watermark uses opacity, scale, and nine position presets — not free-drag placement.",
      },
      {
        question: "How is this different from cloud watermark makers?",
        answer:
          "Cloud watermark makers typically require uploading your photo before you can place a mark. Pix-8 Watermark composites your logo or image file on-device, then exports one flattened file per session. It does not batch-process folders, tile marks across images, or queue multiple files automatically.",
      },
    ],
  },
  "professional-image-watermarking-tool": {
    id: "professional-image-watermarking-tool",
    path: "/professional-image-watermarking-tool",
    linkTitle: "Pro image watermarking",
    linkExcerpt:
      "Professional image watermarking tool in your browser — logo file, client-side, no upload.",
    seo: {
      title: "Professional Image Watermarking Tool",
      description:
        "Professional image watermarking tool in your browser. Place your logo mark on-device — no upload, no server. Private client-side Watermark by Pix-8.",
    },
    faq: [
      {
        question: "Is this a professional watermarking tool that keeps files private?",
        answer:
          "Yes. Pix-8 Watermark runs entirely in your browser. Your base photo and watermark image file are read locally, composited on a client-side canvas, and exported from your device. They are never transmitted to Pix-8 or any third-party server — suitable for client proofs and portfolio work without cloud upload.",
      },
      {
        question: "Can I add typed text watermarks with this tool?",
        answer:
          "Pix-8 Watermark places a logo or image file on your photo — typically a PNG mark with transparency. It does not add editable typed text blocks with font controls. For professional text watermarks, use Pix-8 Text Overlay. Watermark uses opacity, scale, and nine position presets — not free-drag placement or tiled batch marks.",
      },
      {
        question: "Does it support batch watermarking or automated workflows?",
        answer:
          "Watermark processes one base photo per session. Load your image and mark file, set opacity, scale, and position preset, then download or copy one watermarked export. It does not batch-process folders, apply tiled logos, queue multiple files, or integrate with DAM or CMS platforms.",
      },
    ],
  },
};

export function listWatermarkLandings(): WatermarkLandingEntry[] {
  return Object.values(WATERMARK_LANDINGS);
}

export function getWatermarkLandingByPath(
  path: string,
): WatermarkLandingEntry | undefined {
  return listWatermarkLandings().find((entry) => entry.path === path);
}

export function getWatermarkLandingBySlug(
  slug: string,
): WatermarkLandingEntry | undefined {
  const normalized = slug.replace(/^\/+/, "");
  return listWatermarkLandings().find(
    (entry) => entry.path === `/${normalized}`,
  );
}
