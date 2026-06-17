export const IMAGE_COLLAGE_TOOL_HREF = "/tools/editor-studio/image-collage";

export const IMAGE_COLLAGE_LANDING_ACCENT = "#8E977D";

export const IMAGE_COLLAGE_ARTICLE = {
  href: "/articles/image-collage-guide",
  title:
    "The Complete Guide to Creating Stunning Photo Collages Online: Pix-8 Collage Maker",
  excerpt:
    "Learn layout design, five collage styles, image optimization, and how to build private multi-photo grids in your browser with Pix-8's Collage Maker.",
} as const;

/** What Image Collage Maker actually supports — use for intent-accurate copy. */
export const IMAGE_COLLAGE_CAPABILITIES = [
  "Upload multiple photos from your device",
  "Five layout presets: vertical strip, horizontal strip, 2-column grid, 2×2 grid, and 3×3 grid",
  "Adjustable gap spacing between cells",
  "Background color control for the collage canvas",
  "Live canvas preview as you adjust layout and spacing",
  "Download or copy flattened collage PNG output",
  "Optional EXIF metadata stripping before export",
  "On-device processing — images never uploaded to a server",
] as const;

/**
 * Add new Image Collage Maker SEO landing IDs here as union members.
 * Collage landing pages belong in this registry — not imageOverlayLandings,
 * memeGeneratorLandings, watermarkLandings, or other tool registries.
 */
export type ImageCollageLandingId =
  | "image-collage-maker-online"
  | "photo-collage-creator"
  | "make-a-photo-collage-free"
  | "online-collage-tool"
  | "create-photo-collage-for-instagram"
  | "combine-photos-into-one-image"
  | "layout-photo-collage-tool"
  | "grid-photo-collage-maker"
  | "client-side-photo-collage-maker"
  | "no-upload-collage-maker"
  | "browser-based-photo-layout-tool"
  | "privacy-focused-image-combiner"
  | "custom-photo-collage-layout"
  | "professional-collage-maker-online"
  | "high-resolution-photo-collage-creator"
  | "easy-image-grid-maker";

export interface ImageCollageLandingEntry {
  id: ImageCollageLandingId;
  path: string;
  linkTitle: string;
  linkExcerpt: string;
  seo: {
    title: string;
    description: string;
  };
  faq: readonly { question: string; answer: string }[];
}

export const IMAGE_COLLAGE_LANDINGS: Record<
  ImageCollageLandingId,
  ImageCollageLandingEntry
> = {
  "image-collage-maker-online": {
    id: "image-collage-maker-online",
    path: "/image-collage-maker-online",
    linkTitle: "Image collage maker",
    linkExcerpt:
      "Image collage maker online in your browser — client-side, no upload.",
    seo: {
      title: "Image Collage Maker Online",
      description:
        "Image collage maker online in your browser. Arrange photos on-device — no upload, no server. Private Image Collage Maker by Pix-8.",
    },
    faq: [
      {
        question:
          "Can I use this image collage maker online without uploading photos to a server?",
        answer:
          "Yes. Pix-8 Image Collage Maker runs entirely in your browser. Your photos are read locally, arranged on a client-side canvas, and exported from your device. Your images are never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "What layouts does this online collage maker support?",
        answer:
          "Five presets: vertical strip, horizontal strip, two-column grid, 2×2 grid (up to four photos), and 3×3 grid (up to nine photos). You can adjust gap spacing and background color, with live canvas preview. It does not include free-drag cell placement, custom grid sizes, text captions, decorative overlays, or video collage export.",
      },
      {
        question: "How is Image Collage Maker different from Image Overlay?",
        answer:
          "Image Collage Maker arranges multiple full photos into one grid or strip layout and exports a single flattened PNG. Image Overlay places one built-in decorative graphic (stars, flowers, birds, sparkles, hearts) on a single base photo. Collage Maker does not layer logos, watermarks, or typed text — use Pix-8 Watermark or Text Overlay for those workflows.",
      },
    ],
  },
  "photo-collage-creator": {
    id: "photo-collage-creator",
    path: "/photo-collage-creator",
    linkTitle: "Photo collage creator",
    linkExcerpt:
      "Photo collage creator in your browser — grids and strips, client-side, no upload.",
    seo: {
      title: "Photo Collage Creator",
      description:
        "Photo collage creator in your browser. Build multi-photo grids on-device — no upload, no server. Private Image Collage Maker by Pix-8.",
    },
    faq: [
      {
        question: "Can I create a photo collage without uploading my images?",
        answer:
          "Yes. Pix-8 Image Collage Maker runs entirely in your browser. Your photos are loaded locally, composited on a client-side canvas, and exported from your device. Your images are never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "How many photos can I include in one collage?",
        answer:
          "Upload as many images as your layout needs. Vertical and horizontal strips scale with your photo count. The 2×2 grid uses up to four photos; the 3×3 grid uses up to nine. Gap spacing and background color are adjustable with live preview. The tool does not auto-crop faces, reorder cells by drag-and-drop, or add text or stickers.",
      },
      {
        question: "Is this photo collage creator free to use?",
        answer:
          "Yes. Open Image Collage Maker in your browser with no account, no subscription, and no per-export fee. Choose a layout preset, adjust spacing and background, and download or copy one flattened PNG. Pix-8 does not add a watermark to your export. It does not include AI layout generation, template libraries beyond the five presets, or batch export of multiple collage files at once.",
      },
    ],
  },
  "make-a-photo-collage-free": {
    id: "make-a-photo-collage-free",
    path: "/make-a-photo-collage-free",
    linkTitle: "Free photo collage",
    linkExcerpt:
      "Make a photo collage free in your browser — no account, client-side, no upload.",
    seo: {
      title: "Make a Photo Collage Free",
      description:
        "Make a photo collage free in your browser. No account, no upload, no server. Private Image Collage Maker by Pix-8.",
    },
    faq: [
      {
        question: "Is it really free to make a photo collage here?",
        answer:
          "Yes. Pix-8 Image Collage Maker is free with no account, no subscription, and no per-export charge. Open it in your browser, upload photos locally, pick a layout preset, and download or copy one flattened PNG. Pix-8 does not add a watermark to your collage export.",
      },
      {
        question: "Can I make a photo collage free without uploading to a server?",
        answer:
          "Yes. The tool runs entirely in your browser. Your photos are read on-device, arranged on a client-side canvas, and exported from your device. They are never transmitted to Pix-8 or any third-party server — free does not mean trading privacy for cloud processing.",
      },
      {
        question: "What is included in the free collage workflow?",
        answer:
          "Upload multiple photos, choose from five layout presets (vertical strip, horizontal strip, two-column grid, 2×2 grid, or 3×3 grid), adjust gap spacing and background color with live preview, and export one flattened PNG with optional EXIF metadata stripping. It does not include premium template packs, AI auto-layout, text captions, decorative stickers, or batch export of multiple collage files.",
      },
    ],
  },
  "online-collage-tool": {
    id: "online-collage-tool",
    path: "/online-collage-tool",
    linkTitle: "Online collage tool",
    linkExcerpt:
      "Online collage tool in your browser — grids and strips, client-side, no upload.",
    seo: {
      title: "Online Collage Tool",
      description:
        "Online collage tool in your browser. Combine photos on-device — no install, no upload, no server. Private Image Collage Maker by Pix-8.",
    },
    faq: [
      {
        question: "Do I need to install software to use this online collage tool?",
        answer:
          "No. Pix-8 Image Collage Maker runs in your browser tab — no desktop app, no mobile install, and no plugin. Open the tool, upload photos locally, pick a layout preset, and export one flattened PNG from your device.",
      },
      {
        question: "Does this online collage tool upload my photos to a server?",
        answer:
          "No. Your photos are read on-device and composited on a client-side canvas. Pix-8 never receives your image files on a server for collage rendering. Export happens locally in your browser.",
      },
      {
        question: "What can this online collage tool do?",
        answer:
          "Upload multiple photos, choose from five layout presets (vertical strip, horizontal strip, two-column grid, 2×2 grid, or 3×3 grid), adjust gap spacing and background color with live preview, and download or copy one flattened PNG with optional EXIF metadata stripping. It does not support drag-and-drop cell reordering, custom grid dimensions, text overlays, decorative stickers, video collages, or cloud project saving.",
      },
    ],
  },
  "create-photo-collage-for-instagram": {
    id: "create-photo-collage-for-instagram",
    path: "/create-photo-collage-for-instagram",
    linkTitle: "Instagram collage",
    linkExcerpt:
      "Create photo collage for Instagram in your browser — client-side, no upload.",
    seo: {
      title: "Create Photo Collage for Instagram",
      description:
        "Create photo collage for Instagram in your browser. Combine photos on-device — no upload, no server. Private Image Collage Maker by Pix-8.",
    },
    faq: [
      {
        question:
          "Can I create a photo collage for Instagram without uploading my images?",
        answer:
          "Yes. Pix-8 Image Collage Maker runs entirely in your browser. Your photos are read locally, arranged on a client-side canvas, and exported from your device. Your images are never transmitted to Pix-8 or any third-party server.",
      },
      {
        question:
          "Does this tool post directly to Instagram or match Story dimensions?",
        answer:
          "No. Image Collage Maker does not connect to Instagram, schedule posts, or apply platform-specific crop presets such as 1080×1920 Stories or 1:1 feed frames. You export one flattened PNG from your browser and upload it to Instagram yourself. The 2×2 grid preset fits four photos in one square-style layout; vertical and horizontal strips suit recap posts — use Pix-8 Resizer afterward if you need exact pixel dimensions.",
      },
      {
        question: "Which collage layout works best for Instagram?",
        answer:
          "For a four-photo grid in one post, use the 2×2 preset. For event recaps or step-by-step sequences, try the vertical strip. For side-by-side comparisons, use the horizontal strip or two-column grid. Adjust gap and background color with live preview, then export PNG. The tool does not add Instagram filters, captions, stickers, Reels export, or carousel splitting into multiple slides automatically.",
      },
    ],
  },
  "combine-photos-into-one-image": {
    id: "combine-photos-into-one-image",
    path: "/combine-photos-into-one-image",
    linkTitle: "Combine photos into one",
    linkExcerpt:
      "Combine photos into one image in your browser — client-side, no upload.",
    seo: {
      title: "Combine Photos Into One Image",
      description:
        "Combine photos into one image in your browser. Merge multiple photos on-device — no upload, no server. Private Image Collage Maker by Pix-8.",
    },
    faq: [
      {
        question: "Can I combine photos into one image without uploading to a server?",
        answer:
          "Yes. Pix-8 Image Collage Maker runs entirely in your browser. Your photos are read locally, arranged on a client-side canvas, and merged into one flattened PNG exported from your device. Your images are never transmitted to Pix-8 or any third-party server.",
      },
      {
        question: "How many photos can I merge into one image?",
        answer:
          "Upload as many photos as your chosen layout supports. Vertical and horizontal strips scale with your photo count. The 2×2 grid combines up to four photos; the 3×3 grid combines up to nine. Gap spacing and background color are adjustable with live preview. The tool does not blend photos with transparency layers, stitch panoramas automatically, or merge two images with a decorative overlay graphic.",
      },
      {
        question:
          "How is combining photos into one image different from Image Overlay?",
        answer:
          "Image Collage Maker arranges multiple full photos into a grid or strip and exports one combined file. Pix-8 Image Overlay places one built-in decorative graphic on a single base photo — it is not designed for multi-photo grid layouts. Collage Maker does not free-drag individual photos, add typed captions, or layer a logo file like Pix-8 Watermark.",
      },
    ],
  },
  "layout-photo-collage-tool": {
    id: "layout-photo-collage-tool",
    path: "/layout-photo-collage-tool",
    linkTitle: "Layout collage tool",
    linkExcerpt:
      "Layout photo collage tool in your browser — five presets, client-side, no upload.",
    seo: {
      title: "Layout Photo Collage Tool",
      description:
        "Layout photo collage tool in your browser. Five grid and strip presets on-device — no upload, no server. Private Image Collage Maker by Pix-8.",
    },
    faq: [
      {
        question: "What layout options does this photo collage tool offer?",
        answer:
          "Five presets: vertical strip, horizontal strip, two-column grid, 2×2 grid, and 3×3 grid. You can adjust gap spacing between cells and background color, with live canvas preview as you edit. It does not include free-drag photo placement, custom row and column counts, rotated cells, or a template marketplace beyond these presets.",
      },
      {
        question:
          "Can I use this layout collage tool without uploading photos to a server?",
        answer:
          "Yes. Pix-8 Image Collage Maker runs entirely in your browser. Your photos are read locally, laid out on a client-side canvas, and exported from your device. Your images are never transmitted to Pix-8 or any third-party server.",
      },
      {
        question:
          "Can I reorder photos or resize individual cells in the layout?",
        answer:
          "Photos fill cells in upload order within the selected preset. You can switch between the five layout presets, change gap spacing, and set background color — all with live preview. The tool does not support drag-and-drop cell reordering, per-cell crop handles, individual photo scaling, or overlapping layered layouts.",
      },
    ],
  },
  "grid-photo-collage-maker": {
    id: "grid-photo-collage-maker",
    path: "/grid-photo-collage-maker",
    linkTitle: "Grid collage maker",
    linkExcerpt:
      "Grid photo collage maker in your browser — 2-col, 2×2, 3×3, client-side, no upload.",
    seo: {
      title: "Grid Photo Collage Maker",
      description:
        "Grid photo collage maker in your browser. Two-column, 2×2, and 3×3 grids on-device — no upload, no server. Private Image Collage Maker by Pix-8.",
    },
    faq: [
      {
        question: "What grid sizes does this photo collage maker support?",
        answer:
          "Three grid presets: two-column, 2×2, and 3×3. Photos tile into cells in upload order with adjustable gap spacing and background color, plus live canvas preview. The same tool also offers vertical and horizontal strip layouts if you need a single row or column instead of a grid. It does not support custom row and column counts, free-drag cell placement, or per-cell crop handles.",
      },
      {
        question:
          "Does this grid collage maker upload my photos to a server?",
        answer:
          "No. Pix-8 Image Collage Maker processes everything in your browser. Your photos are read locally, arranged on a client-side canvas, and exported from your device. Your images are never transmitted to Pix-8 or any third-party server.",
      },
      {
        question:
          "Can I build a custom grid with any number of rows and columns?",
        answer:
          "No. Grid structure is limited to the built-in two-column, 2×2, and 3×3 presets. You can switch between them, tune gap spacing, set background color, and preview live before export. The tool does not offer arbitrary grid dimensions, overlapping cells, individual photo scaling within a cell, or drag-and-drop reordering of photos.",
      },
    ],
  },
  "client-side-photo-collage-maker": {
    id: "client-side-photo-collage-maker",
    path: "/client-side-photo-collage-maker",
    linkTitle: "Client-side collage",
    linkExcerpt:
      "Client-side photo collage maker in your browser — on-device, no upload.",
    seo: {
      title: "Client-Side Photo Collage Maker",
      description:
        "Client-side photo collage maker in your browser. Compose collages on-device — no upload, no server. Private Image Collage Maker by Pix-8.",
    },
    faq: [
      {
        question:
          "What does client-side mean for this photo collage maker?",
        answer:
          "Your photos are read from your device, arranged on a browser canvas, and exported locally — the compositing work runs in your tab, not on a Pix-8 server. You can pick layout presets, adjust gap and background, preview live, and download or copy one flattened PNG. Optional EXIF metadata stripping runs before export. It does not include cloud storage, account sync, or server-side rendering.",
      },
      {
        question: "Are my photos uploaded or stored on Pix-8 servers?",
        answer:
          "No. Pix-8 Image Collage Maker never transmits your image files to Pix-8 or any third-party server for collage processing. Files stay on your device during upload selection, layout, preview, and export.",
      },
      {
        question:
          "Does client-side processing require installing desktop software?",
        answer:
          "No. The collage maker runs entirely in a modern web browser — no install, no plug-in, and no sign-up. Client-side here means on-device canvas compositing, not a downloadable app. The tool offers five built-in layout presets with gap and background controls; it does not add cloud collaboration, AI layout generation, or arbitrary custom grid builders.",
      },
    ],
  },
  "no-upload-collage-maker": {
    id: "no-upload-collage-maker",
    path: "/no-upload-collage-maker",
    linkTitle: "No-upload collage",
    linkExcerpt:
      "No-upload collage maker in your browser — on-device, no server.",
    seo: {
      title: "No-Upload Collage Maker",
      description:
        "No-upload collage maker in your browser. Compose photo collages on-device — no server, no transmission. Private Image Collage Maker by Pix-8.",
    },
    faq: [
      {
        question: "Does this no-upload collage maker send my photos to a server?",
        answer:
          "No. Pix-8 Image Collage Maker reads your photos locally, arranges them on a browser canvas, and exports from your device. Your image files are never uploaded to Pix-8 or any third-party server for collage processing, storage, or preview.",
      },
      {
        question: "How is a no-upload collage maker different from cloud collage apps?",
        answer:
          "Cloud collage tools typically queue your gallery on a remote server before you can preview a layout. Pix-8 keeps the full workflow in your browser — upload selection, preset layout, gap and background tuning, live preview, and PNG export all run on-device. It does not include cloud sync, collaborative editing, or server-side AI layout generation.",
      },
      {
        question: "Do I need an account to use this no-upload collage maker?",
        answer:
          "No. Open the tool in your browser — no sign-up, no install, and no remote upload step. You can pick from five built-in strip and grid presets, adjust spacing and background, preview live, and download or copy one flattened PNG. Optional EXIF metadata stripping runs locally before export.",
      },
    ],
  },
  "browser-based-photo-layout-tool": {
    id: "browser-based-photo-layout-tool",
    path: "/browser-based-photo-layout-tool",
    linkTitle: "Browser layout tool",
    linkExcerpt:
      "Browser-based photo layout tool — five presets, client-side, no upload.",
    seo: {
      title: "Browser-Based Photo Layout Tool",
      description:
        "Browser-based photo layout tool in your tab. Five strip and grid presets on-device — no install, no server. Private Image Collage Maker by Pix-8.",
    },
    faq: [
      {
        question:
          "What does browser-based mean for this photo layout tool?",
        answer:
          "The full layout workflow runs in a modern web browser tab — no desktop app, no plug-in, and no sign-up. You load photos locally, pick from five strip and grid presets, adjust gap and background on a client-side canvas with live preview, and export one flattened PNG. Processing stays on your device; your photos are not sent to Pix-8 or any third-party server for layout rendering.",
      },
      {
        question:
          "Do I need to install software to use this browser photo layout tool?",
        answer:
          "No. Open Pix-8 Image Collage Maker in Chrome, Firefox, Safari, Edge, or another modern browser. Layout, preview, and export run in the tab — there is no download, no desktop installer, and no browser extension required. It does not replace a full design suite with free-drag page building or custom grid dimensions beyond the five built-in presets.",
      },
      {
        question:
          "Can I arrange photos into layouts without uploading them to a server?",
        answer:
          "Yes. Photos are read from your device via the browser File API and composited on a local canvas. Gap spacing, background color, live preview, and PNG export all run client-side. Optional EXIF metadata stripping happens before export on your device. The tool does not queue your gallery on a remote server or store collage files in a cloud account.",
      },
    ],
  },
  "privacy-focused-image-combiner": {
    id: "privacy-focused-image-combiner",
    path: "/privacy-focused-image-combiner",
    linkTitle: "Private image combiner",
    linkExcerpt:
      "Privacy-focused image combiner in your browser — on-device, no upload.",
    seo: {
      title: "Privacy-Focused Image Combiner",
      description:
        "Privacy-focused image combiner in your browser. Combine photos on-device — no upload, no server. Private Image Collage Maker by Pix-8.",
    },
    faq: [
      {
        question:
          "What makes this a privacy-focused image combiner?",
        answer:
          "Your photos are read locally, arranged on a browser canvas, and merged into one flattened PNG exported from your device — Pix-8 never receives your image files on a server. Optional EXIF metadata stripping removes location and camera data before share, processed on-device. The tool does not create accounts, sync to cloud storage, or transmit your gallery for server-side compositing.",
      },
      {
        question:
          "How is a privacy-focused image combiner different from cloud collage apps?",
        answer:
          "Cloud combiners typically upload your photos before you can preview or merge them. Pix-8 Image Collage Maker keeps combining in your browser — pick from five strip and grid presets, adjust gap and background with live preview, and export one PNG locally. It does not store collage files on remote servers, offer collaborative cloud editing, or use server-side AI to auto-arrange photos.",
      },
      {
        question:
          "How is combining images here different from Pix-8 Image Overlay?",
        answer:
          "Image Collage Maker combines multiple full photos into one grid or strip layout and exports a single merged file. Pix-8 Image Overlay places one built-in decorative graphic on a single base photo — it is not designed for multi-photo grid combining. Collage Maker does not free-drag individual photos, add typed captions, or layer a logo file like Pix-8 Watermark.",
      },
    ],
  },
  "custom-photo-collage-layout": {
    id: "custom-photo-collage-layout",
    path: "/custom-photo-collage-layout",
    linkTitle: "Custom collage layout",
    linkExcerpt:
      "Custom photo collage layout in your browser — presets, spacing, client-side.",
    seo: {
      title: "Custom Photo Collage Layout",
      description:
        "Custom photo collage layout in your browser. Tune gap, background, and presets on-device — no upload, no server. Private Image Collage Maker by Pix-8.",
    },
    faq: [
      {
        question: "What can I customize in this photo collage layout?",
        answer:
          "Choose from five built-in structures — vertical strip, horizontal strip, two-column grid, 2×2, and 3×3 — then adjust gap spacing between cells and canvas background color with live preview on a client-side canvas. Photos fill cells in upload order. You can switch presets and refine spacing and background before export. It does not include drag-and-drop cell placement, per-cell crop handles, individual photo scaling, or overlapping layered layouts.",
      },
      {
        question:
          "Can I build a fully custom grid with any number of rows and columns?",
        answer:
          "No. Layout structure is limited to the five built-in presets — you customize appearance within those structures, not arbitrary grid dimensions. You cannot set custom row and column counts, rotate cells, or design free-form collage templates beyond gap, background, and preset selection. The tool does not offer a template marketplace or AI-generated custom layouts.",
      },
      {
        question:
          "Does customizing a collage layout require uploading photos to a server?",
        answer:
          "No. Pix-8 Image Collage Maker runs entirely in your browser. Your photos are read locally, laid out on a client-side canvas, and exported from your device. Gap, background, and live preview adjustments all run on-device — your images are never transmitted to Pix-8 or any third-party server.",
      },
    ],
  },
  "professional-collage-maker-online": {
    id: "professional-collage-maker-online",
    path: "/professional-collage-maker-online",
    linkTitle: "Pro collage maker",
    linkExcerpt:
      "Professional collage maker online in your browser — client-side, no upload.",
    seo: {
      title: "Professional Collage Maker Online",
      description:
        "Professional collage maker online in your browser. Compose collages on-device — no upload, no server. Private Image Collage Maker by Pix-8.",
    },
    faq: [
      {
        question: "What makes this a professional collage maker online?",
        answer:
          "Pix-8 Image Collage Maker delivers a consistent, repeatable workflow: load multiple photos locally, pick from five strip and grid presets, tune gap spacing and background with live canvas preview, and export one flattened PNG. Professional here means reliable layout output and on-device privacy — not enterprise brand kits, team approval queues, AI layout generation, or collaborative cloud workspaces.",
      },
      {
        question:
          "Is this professional collage maker suitable for work deliverables?",
        answer:
          "Yes, when you need a clean multi-photo grid or strip for presentations, documentation, social posts, or client previews. Your photos stay on your device — nothing is uploaded to Pix-8 or a third-party server. Optional EXIF stripping helps before public sharing. It does not enforce brand templates, add typed captions or logos, batch-export multiple collages, or schedule posts to platforms.",
      },
      {
        question: "What does this professional collage tool include?",
        answer:
          "Five layout presets, adjustable gap spacing, background color control, live canvas preview, download or copy flattened PNG output, and optional EXIF metadata removal — all processed client-side in your browser. It does not include custom grid dimensions, drag-and-drop cell reordering, per-photo crop handles, text overlays, watermark layers, or a template marketplace.",
      },
    ],
  },
  "high-resolution-photo-collage-creator": {
    id: "high-resolution-photo-collage-creator",
    path: "/high-resolution-photo-collage-creator",
    linkTitle: "HD collage creator",
    linkExcerpt:
      "High-resolution photo collage creator — PNG export, client-side, no upload.",
    seo: {
      title: "High-Resolution Photo Collage Creator",
      description:
        "High-resolution photo collage creator in your browser. Flattened PNG export on-device — no upload, no server. Private Image Collage Maker by Pix-8.",
    },
    faq: [
      {
        question:
          "What resolution does this photo collage creator output?",
        answer:
          "Pix-8 Image Collage Maker composites each photo into fixed 360×360 pixel cells on a client-side canvas, then exports one flattened PNG. Total export size depends on your layout — for example, a 2×2 grid is roughly 732 pixels wide with default gap spacing; a 3×3 grid is roughly 1,104 pixels wide. Output is lossless PNG from the canvas. The tool does not offer custom export dimensions, DPI settings, or upscaling beyond the built-in cell size.",
      },
      {
        question:
          "Will my collage keep the full resolution of each source photo?",
        answer:
          "Photos are cover-cropped into 360×360 pixel cells — detail beyond what fits each cell is trimmed, not preserved at the source file's native dimensions. Starting with sharp source images still helps within each cell. For a single image at full native resolution, use Pix-8 Resizer separately. Collage Maker does not stitch full-resolution originals into oversized cells or export print-ready DPI metadata.",
      },
      {
        question:
          "Does creating a high-resolution collage require uploading photos to a server?",
        answer:
          "No. Compositing and PNG export run entirely in your browser on a local canvas. Your photos are read from your device and are never transmitted to Pix-8 or any third-party server. Optional EXIF metadata stripping runs on-device before export. The tool offers five strip and grid presets with gap and background controls — not cloud rendering or server-side upscaling.",
      },
    ],
  },
  "easy-image-grid-maker": {
    id: "easy-image-grid-maker",
    path: "/easy-image-grid-maker",
    linkTitle: "Easy image grid",
    linkExcerpt:
      "Easy image grid maker in your browser — three grids, client-side, no upload.",
    seo: {
      title: "Easy Image Grid Maker",
      description:
        "Easy image grid maker in your browser. Tile photos into grids on-device — no install, no server. Private Image Collage Maker by Pix-8.",
    },
    faq: [
      {
        question: "What makes this an easy image grid maker?",
        answer:
          "Upload photos locally, pick a grid preset — two-column, 2×2, or 3×3 — adjust gap spacing and background color, preview live on a client-side canvas, and export one flattened PNG. No install, no account, and no server upload. Easy here means a short preset workflow — not a drag-and-drop design canvas, custom row and column builder, or AI auto-layout.",
      },
      {
        question: "Which grid layouts are available?",
        answer:
          "Three grid presets: two-column, 2×2 (up to four photos), and 3×3 (up to nine photos). Photos fill cells in upload order. Vertical and horizontal strip layouts are also in the same tool if you need a single row or column instead of a grid. The tool does not support arbitrary grid dimensions, drag-and-drop cell reordering, or per-cell crop handles.",
      },
      {
        question:
          "Does this easy grid maker upload my photos to a server?",
        answer:
          "No. Pix-8 Image Collage Maker runs entirely in your browser. Your photos are read locally, tiled on a client-side canvas, and exported from your device. Your images are never transmitted to Pix-8 or any third-party server.",
      },
    ],
  },
};

export function listImageCollageLandings(): ImageCollageLandingEntry[] {
  return Object.values(IMAGE_COLLAGE_LANDINGS);
}

export function getImageCollageLandingByPath(
  path: string,
): ImageCollageLandingEntry | undefined {
  return listImageCollageLandings().find((entry) => entry.path === path);
}

export function getImageCollageLandingBySlug(
  slug: string,
): ImageCollageLandingEntry | undefined {
  const normalized = slug.replace(/^\/+/, "");
  return listImageCollageLandings().find(
    (entry) => entry.path === `/${normalized}`,
  );
}
