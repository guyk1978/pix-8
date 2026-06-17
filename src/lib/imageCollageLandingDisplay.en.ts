import type {
  ImageCollageLandingChrome,
  ImageCollageLandingDisplayFields,
} from "@/lib/imageCollageLandingTypes";
import type { ImageCollageLandingId } from "@/lib/imageCollageLandings";

export const IMAGE_COLLAGE_LANDING_CHROME_EN: ImageCollageLandingChrome = {
  privacyNote:
    "Client-side processing only — your images never leave the browser.",
  relatedUseCasesHeading: "Related use cases",
  guidesHeading: "Guides",
  toolCardTitle: "Image Collage Maker",
  toolCardExcerpt:
    "Open the workspace — upload photos, pick a layout, and export in seconds.",
};

/** Per-landing EN display fields — add keys when new slugs are added to imageCollageLandings.ts. */
export const IMAGE_COLLAGE_LANDING_DISPLAY_EN: Record<
  ImageCollageLandingId,
  Omit<ImageCollageLandingDisplayFields, "capabilities">
> = {
  "image-collage-maker-online": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Image Collage Maker Online",
    titleAccent: "Multi-Photo Grids, On-Device",
    heroSubtitle:
      "Use an image collage maker online in your browser — no install, no account, no server upload. Load multiple photos locally, pick a vertical strip, horizontal row, or grid layout, adjust spacing and background on a client-side canvas, and export one flattened collage without sending pixels to a remote service.",
    primaryCta: "Make a Collage — Free",
    ctaNote: "No upload · No server · Flattened PNG export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Multi-photo grids — not a full design suite",
      body: "Pix-8 Image Collage Maker is an image collage maker online because it arranges your photos into preset layouts on a client-side canvas — not a cloud app that ingests your camera roll first. Upload multiple images, choose from five layout presets, tune gap and background color with live preview, then download or copy one flattened PNG. It does not include free-drag cell placement, custom grid dimensions, text captions, decorative overlays, or AI layout suggestions.",
    },
    benefitsHeading: "Why use an image collage maker that runs locally?",
    benefitsIntro:
      "Collage apps that upload every photo before you see a grid slow down the workflow. Pix-8 keeps compositing on-device — the direct fit when you need an ",
    benefitsKeyword: "image collage maker online",
    benefitsIntroAfter:
      " for trip recaps, before-and-after boards, or product grids without routing files through a remote server.",
    benefits: [
      {
        title: "Five layout presets",
        body: "Vertical strip, horizontal row, two-column grid, 2×2 grid, or 3×3 grid — pick the structure that matches your story, then export one combined image.",
      },
      {
        title: "Live preview on canvas",
        body: "Adjust gap spacing and background color with instant feedback on a client-side canvas before you download or copy.",
      },
      {
        title: "Private compositing",
        body: "Your photos stay on your device. Pix-8 never receives your files on a server for collage rendering.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Collage Maker",
        body: "Navigate to Pix-8 in your browser — no install, no sign-up, and no upload to a remote collage service.",
      },
      {
        title: "Upload and choose a layout",
        body: "Add multiple JPG, PNG, or WEBP files from your device, select a vertical, horizontal, or grid preset, and tune gap and background locally.",
      },
      {
        title: "Export your collage",
        body: "Preview the combined canvas, then download or copy one flattened PNG — with optional EXIF metadata stripping before you share.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for an image collage maker online?",
      body: "Open Image Collage Maker, arrange your photos on-device, and export — no server upload.",
      button: "Open Image Collage Maker",
    },
  },
  "photo-collage-creator": {
    eyebrow: "Creator · Client-side · No upload",
    titleMain: "Photo Collage Creator",
    titleAccent: "Build Grids From Your Photos",
    heroSubtitle:
      "Use a photo collage creator in your browser — no install, no account, no server upload. Load multiple images locally, choose a strip or grid preset, tune gap and background on a client-side canvas with live preview, and export one flattened collage without sending your photos to a remote service.",
    primaryCta: "Create a Collage — Free",
    ctaNote: "No upload · No server · Flattened PNG export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "A collage creator — not a stock template library",
      body: "Pix-8 Image Collage Maker is a photo collage creator because it composites your own images into preset layouts on a client-side canvas — not a cloud app with licensed stock tiles or AI-generated scenes. Upload your photos, pick vertical, horizontal, or grid structure, adjust spacing and background, then export. It does not supply ready-made design templates, decorative stickers, typed captions, or automatic face-aware cropping.",
    },
    benefitsHeading: "Why use a photo collage creator that runs locally?",
    benefitsIntro:
      "Collage services that queue uploads before you can preview a grid add friction to creative work. Pix-8 processes on-device — the practical fit when you need a ",
    benefitsKeyword: "photo collage creator",
    benefitsIntroAfter:
      " for event recaps, portfolio boards, or side-by-side comparisons without routing personal photos through a remote server.",
    benefits: [
      {
        title: "Your photos, your layout",
        body: "Start from your own JPG, PNG, or WEBP files — vertical strip, horizontal row, two-column grid, 2×2, or 3×3 — not pre-filled stock imagery.",
      },
      {
        title: "Spacing and background control",
        body: "Set gap between cells and canvas background color with live preview on a client-side canvas before export.",
      },
      {
        title: "Private export",
        body: "Download or copy one flattened PNG from your device, with optional EXIF metadata stripping — Pix-8 never stores your files.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Collage Maker",
        body: "Launch Pix-8 in your browser — no install, no sign-up, and no cloud upload queue.",
      },
      {
        title: "Add photos and pick a preset",
        body: "Upload multiple images from your device, select a strip or grid layout, and adjust gap and background locally.",
      },
      {
        title: "Create and export",
        body: "Review the live canvas preview, then download or copy one combined collage PNG ready to share.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to create a photo collage?",
      body: "Open Image Collage Maker, load your photos on-device, and export — no server upload.",
      button: "Open Image Collage Maker",
    },
  },
  "make-a-photo-collage-free": {
    eyebrow: "Free · Client-side · No upload",
    titleMain: "Make a Photo Collage Free",
    titleAccent: "No Account, No Server",
    heroSubtitle:
      "Make a photo collage free in your browser — no install, no sign-up, no server upload. Load multiple images locally, pick a strip or grid preset, adjust spacing and background on a client-side canvas with live preview, and export one flattened collage without paying per export or sending your photos to a remote service.",
    primaryCta: "Make a Collage — Free",
    ctaNote: "No account · No upload · Flattened PNG export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Free means on-device — not a freemium upload funnel",
      body: "Pix-8 Image Collage Maker lets you make a photo collage free because the workflow runs on a client-side canvas in your browser — not a cloud app that gates exports behind accounts or uploads your gallery first. Choose a layout preset, tune gap and background, preview live, and download or copy one PNG. Free does not mean stock templates, AI layouts, or unlimited cloud storage — it means no fee and no server transfer of your pixels.",
    },
    benefitsHeading: "Why make a photo collage free in the browser?",
    benefitsIntro:
      "Free collage sites often monetize through uploads, watermarks, or export limits. Pix-8 keeps compositing local — the direct fit when you need to ",
    benefitsKeyword: "make a photo collage free",
    benefitsIntroAfter:
      " for a personal project, team recap, or quick share without accounts, subscriptions, or off-device processing.",
    benefits: [
      {
        title: "No account or paywall",
        body: "Open Image Collage Maker, arrange your photos, and export — no sign-up, no subscription, and no watermark added by the tool.",
      },
      {
        title: "Five layout presets",
        body: "Vertical strip, horizontal row, two-column grid, 2×2, or 3×3 — enough structure for most collage needs without a paid template library.",
      },
      {
        title: "Private client-side rendering",
        body: "Your photos stay on your device. Pix-8 never receives your files on a server for collage compositing.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Collage Maker",
        body: "Navigate to Pix-8 in your browser — free to use, no account required, and no remote upload queue.",
      },
      {
        title: "Upload photos and pick a layout",
        body: "Add multiple JPG, PNG, or WEBP files from your device, select a preset, and adjust gap and background locally.",
      },
      {
        title: "Export for free",
        body: "Preview on a client-side canvas, then download or copy one flattened collage PNG — optional EXIF stripping included.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to make a photo collage free?",
      body: "Open Image Collage Maker, load your photos on-device, and export — no account, no server upload.",
      button: "Open Image Collage Maker",
    },
  },
  "online-collage-tool": {
    eyebrow: "Online · Browser · Client-side",
    titleMain: "Online Collage Tool",
    titleAccent: "No Install, No Upload",
    heroSubtitle:
      "Use an online collage tool in your browser — no desktop software, no account, no server upload. Load multiple photos locally, select a strip or grid preset, adjust spacing and background on a client-side canvas with live preview, and export one flattened collage without sending your files to a remote service.",
    primaryCta: "Open Collage Tool — Free",
    ctaNote: "No install · No upload · Flattened PNG export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "A browser collage tool — not a cloud photo editor",
      body: "Pix-8 Image Collage Maker is an online collage tool because the full workflow runs in your browser tab on a client-side canvas — not a SaaS platform that ingests your library before you can preview a grid. Upload photos, pick one of five layout presets, tune gap and background, preview live, and export. It does not include cloud sync, collaborative editing, AI scene generation, or a marketplace of paid collage templates.",
    },
    benefitsHeading: "Why use an online collage tool that stays local?",
    benefitsIntro:
      "Many online tools mean upload-first processing. Pix-8 keeps compositing on-device — the practical fit when you need an ",
    benefitsKeyword: "online collage tool",
    benefitsIntroAfter:
      " for quick grids, comparison boards, or multi-photo posts without installing software or routing files through a remote server.",
    benefits: [
      {
        title: "Runs in the browser",
        body: "No install required — open Image Collage Maker in any modern browser and start combining photos immediately.",
      },
      {
        title: "Preset layouts with live preview",
        body: "Five strip and grid presets with adjustable gap and background, rendered on a client-side canvas as you edit.",
      },
      {
        title: "On-device export",
        body: "Download or copy one flattened PNG from your device — your photos never leave the browser for compositing.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open the collage tool",
        body: "Navigate to Pix-8 Image Collage Maker in your browser — no download, no sign-up, and no remote upload queue.",
      },
      {
        title: "Combine your photos",
        body: "Upload multiple JPG, PNG, or WEBP files, choose a vertical, horizontal, or grid preset, and adjust spacing and background locally.",
      },
      {
        title: "Export from the browser",
        body: "Review the live canvas preview, then download or copy one flattened collage PNG — optional EXIF stripping before share.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for an online collage tool that respects privacy?",
      body: "Open Image Collage Maker, combine photos on-device, and export — no install, no server upload.",
      button: "Open Image Collage Maker",
    },
  },
  "create-photo-collage-for-instagram": {
    eyebrow: "Instagram · Client-side · No upload",
    titleMain: "Create Photo Collage for Instagram",
    titleAccent: "Combine, Export, Post Yourself",
    heroSubtitle:
      "Create a photo collage for Instagram in your browser — no install, no account, no server upload. Load multiple photos locally, pick a 2×2 grid, vertical strip, or other preset, adjust spacing and background on a client-side canvas with live preview, and export one flattened PNG to upload to Instagram from your device.",
    primaryCta: "Build Instagram Collage — Free",
    ctaNote: "No upload · No direct post · Flattened PNG export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Collage layouts for feed posts — not an Instagram publisher",
      body: "Pix-8 Image Collage Maker helps you create a photo collage for Instagram by combining your images into one exportable file on a client-side canvas — not a social scheduler, not a Story template shop, and not a direct-to-feed publisher. Use the 2×2 grid for four-up posts, vertical strips for tall recaps, or horizontal rows for comparisons. Export PNG, then upload through the Instagram app. It does not apply Instagram aspect-ratio presets, filters, captions, or automatic carousel splitting.",
    },
    benefitsHeading: "Why build an Instagram collage on-device?",
    benefitsIntro:
      "Collage apps that upload your camera roll before compositing expose personal photos to remote servers. Pix-8 keeps the workflow local — the practical fit when you need to ",
    benefitsKeyword: "create a photo collage for Instagram",
    benefitsIntroAfter:
      " for a trip recap, product grid, or before-and-after board without routing files through a cloud editor first.",
    benefits: [
      {
        title: "2×2 grid for four-up posts",
        body: "Combine up to four photos in one square-style layout — a common format for single Instagram feed posts with multiple moments.",
      },
      {
        title: "Vertical and horizontal strips",
        body: "Stack or line up photos for recap carousels-in-one-image or comparison posts, with gap and background control on a client-side canvas.",
      },
      {
        title: "Private compositing",
        body: "Your photos stay on your device until you choose to export and upload to Instagram yourself — Pix-8 never receives your files on a server.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Collage Maker",
        body: "Navigate to Pix-8 in your browser — no install and no sign-up required before you start combining photos.",
      },
      {
        title: "Pick an Instagram-friendly layout",
        body: "Upload your photos, select 2×2, vertical strip, horizontal row, or another preset, and tune gap and background with live preview.",
      },
      {
        title: "Export and upload to Instagram",
        body: "Download or copy one flattened PNG from your device, then post it through the Instagram app — optional EXIF stripping before export.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to create a photo collage for Instagram?",
      body: "Open Image Collage Maker, combine photos on-device, export PNG, and upload to Instagram — no server transfer.",
      button: "Open Image Collage Maker",
    },
  },
  "combine-photos-into-one-image": {
    eyebrow: "Merge · Client-side · No upload",
    titleMain: "Combine Photos Into One Image",
    titleAccent: "Multiple Files, One Export",
    heroSubtitle:
      "Combine photos into one image in your browser — no install, no account, no server upload. Load multiple pictures locally, choose a strip or grid preset, adjust spacing and background on a client-side canvas with live preview, and export one flattened file without sending your photos to a remote service.",
    primaryCta: "Combine Photos — Free",
    ctaNote: "No upload · No server · Single flattened PNG",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Multi-photo merge — not a layer compositor",
      body: "Pix-8 Image Collage Maker combines photos into one image by tiling them in preset layouts on a client-side canvas — not by stacking transparent layers or blending two files with a decorative overlay. Pick vertical, horizontal, or grid structure, tune gap and background, preview live, and export one PNG. It does not auto-stitch panoramas, merge HDR brackets, or place one small graphic on top of a single base photo like Image Overlay.",
    },
    benefitsHeading: "Why combine photos into one image on-device?",
    benefitsIntro:
      "Merge tools that upload every file before compositing add delay and privacy risk. Pix-8 processes locally — the direct fit when you need to ",
    benefitsKeyword: "combine photos into one image",
    benefitsIntroAfter:
      " for a contact sheet, comparison board, or shareable recap without routing your gallery through a cloud editor.",
    benefits: [
      {
        title: "One file out",
        body: "Export a single flattened PNG that contains every selected photo in your chosen layout — ready to download, copy, or share.",
      },
      {
        title: "Flexible grid and strip presets",
        body: "Vertical stack, horizontal row, two-column grid, 2×2, or 3×3 — pick the structure that matches how many photos you need in one image.",
      },
      {
        title: "Private client-side merge",
        body: "Your photos stay on your device during compositing. Pix-8 never receives your files on a server.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Collage Maker",
        body: "Navigate to Pix-8 in your browser — no install, no sign-up, and no remote upload queue.",
      },
      {
        title: "Add photos and choose a layout",
        body: "Upload multiple JPG, PNG, or WEBP files, select how they should tile together, and adjust gap and background locally.",
      },
      {
        title: "Export one combined image",
        body: "Preview the merged canvas, then download or copy one flattened PNG — optional EXIF metadata stripping before export.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to combine photos into one image?",
      body: "Open Image Collage Maker, merge photos on-device, and export — no server upload.",
      button: "Open Image Collage Maker",
    },
  },
  "layout-photo-collage-tool": {
    eyebrow: "Layouts · Client-side · No upload",
    titleMain: "Layout Photo Collage Tool",
    titleAccent: "Five Presets, Live Preview",
    heroSubtitle:
      "Use a layout photo collage tool in your browser — no install, no account, no server upload. Upload multiple photos locally, switch between five strip and grid presets, tune gap spacing and background on a client-side canvas with live preview, and export one flattened collage without sending your files to a remote service.",
    primaryCta: "Pick a Layout — Free",
    ctaNote: "No upload · No server · Five presets",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Preset layouts — not a free-form design canvas",
      body: "Pix-8 Image Collage Maker is a layout photo collage tool because it tiles your photos into five built-in structures on a client-side canvas — not a drag-and-drop page builder or AI layout generator. Choose vertical strip, horizontal row, two-column grid, 2×2, or 3×3, adjust gap and background, preview live, and export one PNG. It does not offer custom grid dimensions, overlapping cells, per-photo resize handles, or a library of branded collage templates.",
    },
    benefitsHeading: "Why use a layout collage tool that runs locally?",
    benefitsIntro:
      "Layout apps that upload your gallery before you can preview a grid slow experimentation. Pix-8 keeps compositing on-device — the practical fit when you need a ",
    benefitsKeyword: "layout photo collage tool",
    benefitsIntroAfter:
      " to compare strip versus grid structures, spacing, and background before exporting one combined image.",
    benefits: [
      {
        title: "Five structure presets",
        body: "Vertical strip, horizontal row, two-column grid, 2×2, and 3×3 — switch presets and see the layout update on a client-side canvas instantly.",
      },
      {
        title: "Spacing and background control",
        body: "Set gap between cells and canvas background color with live preview — refine the look before you export.",
      },
      {
        title: "Private on-device layout",
        body: "Your photos stay on your device during layout and export. Pix-8 never receives your files on a server.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Collage Maker",
        body: "Navigate to Pix-8 in your browser — no install, no sign-up, and no remote upload queue.",
      },
      {
        title: "Choose a layout preset",
        body: "Upload your photos, select vertical, horizontal, or grid structure, and adjust gap and background locally with live preview.",
      },
      {
        title: "Export the composed collage",
        body: "Download or copy one flattened PNG with your chosen layout baked in — optional EXIF metadata stripping before share.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for a layout photo collage tool?",
      body: "Open Image Collage Maker, pick a preset on-device, and export — no server upload.",
      button: "Open Image Collage Maker",
    },
  },
  "grid-photo-collage-maker": {
    eyebrow: "Grids · Client-side · No upload",
    titleMain: "Grid Photo Collage Maker",
    titleAccent: "2-Col, 2×2, 3×3",
    heroSubtitle:
      "Use a grid photo collage maker in your browser — no install, no account, no server upload. Upload multiple photos locally, tile them into two-column, 2×2, or 3×3 grid presets on a client-side canvas, adjust gap spacing and background with live preview, and export one flattened collage without sending your files to a remote service.",
    primaryCta: "Build a Grid — Free",
    ctaNote: "No upload · No server · Grid presets",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Fixed grid presets — not a custom grid builder",
      body: "Pix-8 Image Collage Maker is a grid photo collage maker because it tiles your photos into three built-in grid structures on a client-side canvas — two-column, 2×2, and 3×3. Adjust gap and background, preview live, and export one PNG. Vertical and horizontal strip layouts are also available in the same tool if you need a row or column instead. It does not offer arbitrary row and column counts, overlapping cells, per-photo resize handles, or a template marketplace.",
    },
    benefitsHeading: "Why use a grid collage maker that runs locally?",
    benefitsIntro:
      "Grid collage apps that upload your gallery before you can preview cells add friction. Pix-8 keeps compositing on-device — the practical fit when you need a ",
    benefitsKeyword: "grid photo collage maker",
    benefitsIntroAfter:
      " to compare two-column, 2×2, and 3×3 structures with spacing and background control before exporting one combined image.",
    benefits: [
      {
        title: "Three grid presets",
        body: "Two-column, 2×2, and 3×3 — switch grid structure and see cells update on a client-side canvas instantly.",
      },
      {
        title: "Gap and background tuning",
        body: "Set spacing between grid cells and canvas background color with live preview — refine the mosaic before export.",
      },
      {
        title: "Private on-device grids",
        body: "Your photos stay on your device during grid layout and export. Pix-8 never receives your files on a server.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Collage Maker",
        body: "Navigate to Pix-8 in your browser — no install, no sign-up, and no remote upload queue.",
      },
      {
        title: "Select a grid preset",
        body: "Upload your photos, choose two-column, 2×2, or 3×3, and adjust gap and background locally with live preview.",
      },
      {
        title: "Export the grid collage",
        body: "Download or copy one flattened PNG with your grid baked in — optional EXIF metadata stripping before share.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for a grid photo collage maker?",
      body: "Open Image Collage Maker, pick a grid on-device, and export — no server upload.",
      button: "Open Image Collage Maker",
    },
  },
  "client-side-photo-collage-maker": {
    eyebrow: "Client-side · No upload · Private",
    titleMain: "Client-Side Photo Collage Maker",
    titleAccent: "On-Device Compositing",
    heroSubtitle:
      "Use a client-side photo collage maker in your browser — no install, no account, no server upload. Your photos are read locally, composited on a browser canvas with five strip and grid presets, gap and background controls, and live preview, then exported from your device without transmitting files to a remote service.",
    primaryCta: "Compose On-Device — Free",
    ctaNote: "Client-side · No server · Private",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Browser canvas compositing — not a cloud collage service",
      body: "Pix-8 Image Collage Maker is a client-side photo collage maker because layout, preview, and export run in your browser tab on a local canvas — not on a server that ingests your gallery first. Upload photos, pick a preset, tune gap and background, and export one PNG from your device. It does not offer cloud sync, collaborative editing, server-side AI layout, or a template marketplace.",
    },
    benefitsHeading: "Why choose a client-side collage maker?",
    benefitsIntro:
      "Cloud collage tools queue your photos on a remote server before you can preview a grid. Pix-8 keeps the full workflow on-device — the practical fit when you need a ",
    benefitsKeyword: "client-side photo collage maker",
    benefitsIntroAfter:
      " that composes, previews, and exports without sending your files off your machine.",
    benefits: [
      {
        title: "On-device compositing",
        body: "Layout, gap tuning, background color, and live preview run on a browser canvas — your photos never leave your device for server rendering.",
      },
      {
        title: "No account or cloud queue",
        body: "Open the tool, load photos locally, and export — no sign-up, no remote upload queue, and no cloud storage of your collage files.",
      },
      {
        title: "Optional EXIF stripping",
        body: "Remove location and camera metadata from the exported PNG on-device before you share — processed locally, not on a server.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Collage Maker",
        body: "Navigate to Pix-8 in your browser — client-side processing starts locally with no install or sign-up.",
      },
      {
        title: "Compose on a local canvas",
        body: "Upload photos from your device, pick a strip or grid preset, adjust gap and background, and preview live on a browser canvas.",
      },
      {
        title: "Export from your device",
        body: "Download or copy one flattened PNG composed on-device — optional EXIF metadata stripping before share.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for a client-side photo collage maker?",
      body: "Open Image Collage Maker, compose on-device, and export — no server upload.",
      button: "Open Image Collage Maker",
    },
  },
  "no-upload-collage-maker": {
    eyebrow: "No upload · On-device · Private",
    titleMain: "No-Upload Collage Maker",
    titleAccent: "Zero Server Transmission",
    heroSubtitle:
      "Use a no-upload collage maker in your browser — no install, no account, no remote file transfer. Your photos are read locally, arranged on a client-side canvas with five strip and grid presets, gap and background controls, and live preview, then exported from your device without uploading files to Pix-8 or any third-party server.",
    primaryCta: "Make a Collage — No Upload",
    ctaNote: "No upload · No server · On-device",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "No server upload — not a cloud collage platform",
      body: "Pix-8 Image Collage Maker is a no-upload collage maker because your photos never leave your device for server processing, storage, or preview. Load images locally, pick a preset, tune gap and background on a browser canvas, and export one PNG. It does not queue your gallery on a remote server, sync to a cloud account, or offer collaborative cloud editing.",
    },
    benefitsHeading: "Why use a no-upload collage maker?",
    benefitsIntro:
      "Collage apps that require a server upload before preview add latency and privacy risk. Pix-8 keeps files on your machine — the practical fit when you need a ",
    benefitsKeyword: "no-upload collage maker",
    benefitsIntroAfter:
      " to compose, preview, and export without transmitting your photos off-device.",
    benefits: [
      {
        title: "Zero server transmission",
        body: "Photos are read from your device and composited on a browser canvas — Pix-8 never receives your image files on a server.",
      },
      {
        title: "No account or upload queue",
        body: "Open the tool, load photos locally, and export — no sign-up, no remote upload step, and no cloud storage of your collage.",
      },
      {
        title: "Local preview and export",
        body: "Pick a layout preset, adjust gap and background, preview live on-device, then download or copy one flattened PNG locally.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Collage Maker",
        body: "Navigate to Pix-8 in your browser — no install, no sign-up, and no server upload required to start.",
      },
      {
        title: "Load photos locally",
        body: "Select images from your device, pick a strip or grid preset, and adjust gap and background with live on-device preview.",
      },
      {
        title: "Export without uploading",
        body: "Download or copy one flattened PNG from your browser — optional EXIF metadata stripping before share, all processed locally.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for a no-upload collage maker?",
      body: "Open Image Collage Maker, compose on-device, and export — your photos never leave your machine.",
      button: "Open Image Collage Maker",
    },
  },
  "browser-based-photo-layout-tool": {
    eyebrow: "Browser · Layouts · No install",
    titleMain: "Browser-Based Photo Layout Tool",
    titleAccent: "Five Presets in Your Tab",
    heroSubtitle:
      "Use a browser-based photo layout tool — no desktop install, no account, no server upload. Open Pix-8 in your browser, load photos locally, arrange them with five strip and grid presets on a client-side canvas, tune gap spacing and background with live preview, and export one flattened collage without sending files to a remote service.",
    primaryCta: "Open in Browser — Free",
    ctaNote: "No install · Client-side · Five presets",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "In-browser layout — not a desktop app or cloud editor",
      body: "Pix-8 Image Collage Maker is a browser-based photo layout tool because the full workflow runs in your tab on a client-side canvas — not as a downloadable program or a cloud platform that ingests your gallery first. Pick vertical strip, horizontal row, two-column grid, 2×2, or 3×3, adjust gap and background, preview live, and export one PNG. It does not offer plug-in installs, collaborative cloud editing, or arbitrary custom grid builders.",
    },
    benefitsHeading: "Why use a browser-based photo layout tool?",
    benefitsIntro:
      "Desktop layout software adds install friction; cloud editors upload before preview. Pix-8 runs in your browser on-device — the practical fit when you need a ",
    benefitsKeyword: "browser-based photo layout tool",
    benefitsIntroAfter:
      " to arrange photos into strip or grid structures without installing software or transmitting files to a server.",
    benefits: [
      {
        title: "No install required",
        body: "Open a browser tab and start laying out photos — no desktop app, no extension, and no sign-up to begin.",
      },
      {
        title: "Five layout presets in-browser",
        body: "Vertical strip, horizontal row, two-column grid, 2×2, and 3×3 — switch presets and preview on a client-side canvas instantly.",
      },
      {
        title: "Private client-side compositing",
        body: "Photos stay on your device during layout and export. Pix-8 never receives your files on a server.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Collage Maker in your browser",
        body: "Navigate to Pix-8 in any modern browser — no install, no plug-in, and no remote upload queue.",
      },
      {
        title: "Pick a photo layout preset",
        body: "Load images locally, choose strip or grid structure, and adjust gap and background with live in-browser preview.",
      },
      {
        title: "Export from the browser tab",
        body: "Download or copy one flattened PNG composed client-side — optional EXIF metadata stripping before share.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for a browser-based photo layout tool?",
      body: "Open Image Collage Maker in your browser, lay out photos on-device, and export — no install, no server upload.",
      button: "Open Image Collage Maker",
    },
  },
  "privacy-focused-image-combiner": {
    eyebrow: "Private · On-device · No upload",
    titleMain: "Privacy-Focused Image Combiner",
    titleAccent: "Combine Without Transmission",
    heroSubtitle:
      "Use a privacy-focused image combiner in your browser — no install, no account, no server upload. Load multiple photos locally, merge them into one flattened image on a client-side canvas with five strip and grid presets, tune gap and background with live preview, and export from your device without transmitting files to Pix-8 or any third-party server.",
    primaryCta: "Combine Privately — Free",
    ctaNote: "No upload · No server · On-device",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Private multi-photo combining — not a cloud merge service",
      body: "Pix-8 Image Collage Maker is a privacy-focused image combiner because it merges multiple photos into one PNG on a client-side canvas — your files never leave your device for server processing or storage. Pick a strip or grid preset, adjust gap and background, preview live, and export. It does not upload your gallery to a remote queue, sync to a cloud account, or offer server-side AI layout generation.",
    },
    benefitsHeading: "Why use a privacy-focused image combiner?",
    benefitsIntro:
      "Cloud combiners expose personal photos to remote servers before you can preview a merge. Pix-8 keeps combining on-device — the practical fit when you need a ",
    benefitsKeyword: "privacy-focused image combiner",
    benefitsIntroAfter:
      " to merge multiple photos into one file without transmitting your gallery off your machine.",
    benefits: [
      {
        title: "No server transmission",
        body: "Photos are read from your device and merged on a browser canvas — Pix-8 never receives your image files on a server.",
      },
      {
        title: "Optional EXIF stripping",
        body: "Remove location and camera metadata from the combined PNG on-device before you share — processed locally, not on a server.",
      },
      {
        title: "No account required",
        body: "Open the tool, load photos locally, combine, and export — no sign-up, no cloud storage, and no remote upload queue.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Collage Maker",
        body: "Navigate to Pix-8 in your browser — private combining starts locally with no install or sign-up.",
      },
      {
        title: "Combine photos on-device",
        body: "Upload images from your device, pick a strip or grid preset, and adjust gap and background with live client-side preview.",
      },
      {
        title: "Export one merged image",
        body: "Download or copy one flattened PNG merged on your device — optional EXIF metadata stripping before share.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for a privacy-focused image combiner?",
      body: "Open Image Collage Maker, combine photos on-device, and export — no server upload.",
      button: "Open Image Collage Maker",
    },
  },
  "custom-photo-collage-layout": {
    eyebrow: "Customize · Presets · Client-side",
    titleMain: "Custom Photo Collage Layout",
    titleAccent: "Gap, Background, Presets",
    heroSubtitle:
      "Shape a custom photo collage layout in your browser — no install, no account, no server upload. Load photos locally, switch between five strip and grid presets, tune gap spacing and background color on a client-side canvas with live preview, and export one flattened collage without sending your files to a remote service.",
    primaryCta: "Customize Layout — Free",
    ctaNote: "Five presets · Gap & background · On-device",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Preset customization — not a free-form layout designer",
      body: "Pix-8 Image Collage Maker supports a custom photo collage layout within five built-in structures — not a drag-and-drop page builder or arbitrary grid editor. Pick vertical strip, horizontal row, two-column grid, 2×2, or 3×3, then customize gap spacing and background with live preview on a client-side canvas. It does not offer custom row and column counts, overlapping cells, per-photo resize handles, or a library of branded collage templates.",
    },
    benefitsHeading: "Why customize collage layout on-device?",
    benefitsIntro:
      "Layout tools that upload your gallery before you can tune spacing slow iteration. Pix-8 keeps adjustments on a local canvas — the practical fit when you need a ",
    benefitsKeyword: "custom photo collage layout",
    benefitsIntroAfter:
      " with control over preset structure, gap spacing, and background before exporting one combined image.",
    benefits: [
      {
        title: "Five structures to start from",
        body: "Vertical strip, horizontal row, two-column grid, 2×2, and 3×3 — switch presets and see your layout update on a client-side canvas instantly.",
      },
      {
        title: "Gap and background tuning",
        body: "Set spacing between cells and canvas background color with live preview — refine the look within each preset before export.",
      },
      {
        title: "Private on-device layout",
        body: "Customization runs in your browser on a local canvas. Pix-8 never receives your photos on a server.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Collage Maker",
        body: "Navigate to Pix-8 in your browser — no install, no sign-up, and no remote upload queue.",
      },
      {
        title: "Customize your layout",
        body: "Upload photos, pick a strip or grid preset, and adjust gap spacing and background locally with live preview.",
      },
      {
        title: "Export the tuned collage",
        body: "Download or copy one flattened PNG with your layout choices baked in — optional EXIF metadata stripping before share.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to customize a photo collage layout?",
      body: "Open Image Collage Maker, tune presets on-device, and export — no server upload.",
      button: "Open Image Collage Maker",
    },
  },
  "professional-collage-maker-online": {
    eyebrow: "Professional · Online · Client-side",
    titleMain: "Professional Collage Maker Online",
    titleAccent: "Reliable On-Device Output",
    heroSubtitle:
      "Use a professional collage maker online in your browser — no install, no account, no server upload. Load multiple photos locally, arrange them with five strip and grid presets on a client-side canvas, tune gap spacing and background with live preview, and export one flattened collage without transmitting files to a remote service.",
    primaryCta: "Compose Professionally — Free",
    ctaNote: "No upload · Live preview · Flat PNG export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Disciplined layout workflow — not an enterprise design suite",
      body: "Pix-8 Image Collage Maker is a professional collage maker online because it offers a consistent, repeatable path from local photos to a flattened export on a client-side canvas — not a cloud platform with brand governance or AI scene building. Pick a preset, refine gap and background, preview live, and download one PNG. It does not include team workspaces, custom font branding, batch processing, or arbitrary drag-and-drop page design.",
    },
    benefitsHeading: "Why professionals choose on-device collage composition?",
    benefitsIntro:
      "Cloud collage tools add upload latency and privacy exposure before you can review a layout. Pix-8 keeps compositing local — the practical fit when you need a ",
    benefitsKeyword: "professional collage maker online",
    benefitsIntroAfter:
      " that produces clean, repeatable grid and strip output without sending client photos to a server.",
    benefits: [
      {
        title: "Consistent preset workflow",
        body: "Five strip and grid structures with gap and background controls — the same reliable steps from upload to export every time.",
      },
      {
        title: "Live preview before export",
        body: "Review spacing and background on a client-side canvas before you download or copy one flattened PNG.",
      },
      {
        title: "Private client-side processing",
        body: "Photos stay on your device during layout and export. Pix-8 never receives your files on a server.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Collage Maker",
        body: "Navigate to Pix-8 in your browser — no install, no sign-up, and no remote upload queue.",
      },
      {
        title: "Compose with presets",
        body: "Upload photos locally, select a strip or grid preset, and adjust gap and background with live canvas preview.",
      },
      {
        title: "Export a flattened file",
        body: "Download or copy one PNG with your layout baked in — optional EXIF metadata stripping before share.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for a professional collage maker online?",
      body: "Open Image Collage Maker, compose on-device, and export — no server upload.",
      button: "Open Image Collage Maker",
    },
  },
  "high-resolution-photo-collage-creator": {
    eyebrow: "PNG export · Client-side · No upload",
    titleMain: "High-Resolution Photo Collage Creator",
    titleAccent: "Crisp Flattened PNG",
    heroSubtitle:
      "Use a high-resolution photo collage creator in your browser — no install, no account, no server upload. Load photos locally, arrange them with five strip and grid presets on a client-side canvas, preview live, and export one flattened PNG composed on-device without transmitting files to a remote service.",
    primaryCta: "Create Collage — Free",
    ctaNote: "PNG export · On-device · Five presets",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Fixed-cell PNG export — not a full-resolution stitcher",
      body: "Pix-8 Image Collage Maker is a photo collage creator that exports a crisp flattened PNG from a client-side canvas — each photo renders in a 360×360 pixel cell with cover crop. Pick vertical strip, horizontal row, two-column grid, 2×2, or 3×3, tune gap and background, preview live, and download. It does not upscale cells, accept custom export dimensions, set print DPI, or preserve each source photo at its native pixel dimensions.",
    },
    benefitsHeading: "Why export collage PNG on-device?",
    benefitsIntro:
      "Server collage tools re-encode your gallery before export. Pix-8 composites locally and flattens to PNG — the practical fit when you need a ",
    benefitsKeyword: "high-resolution photo collage creator",
    benefitsIntroAfter:
      " that delivers a sharp, lossless composited file without uploading source photos to a remote service.",
    benefits: [
      {
        title: "Lossless PNG flatten",
        body: "Export one flattened PNG from the client-side canvas — no server recompression of your composited collage.",
      },
      {
        title: "Predictable canvas output",
        body: "Each cell renders at 360×360 pixels; total export dimensions follow your chosen layout preset and gap spacing.",
      },
      {
        title: "Private client-side render",
        body: "Photos stay on your device during compositing and export. Pix-8 never receives your files on a server.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Collage Maker",
        body: "Navigate to Pix-8 in your browser — compositing starts locally with no install or sign-up.",
      },
      {
        title: "Compose on a client-side canvas",
        body: "Upload photos, pick a strip or grid preset, adjust gap and background, and preview the flattened layout live.",
      },
      {
        title: "Export flattened PNG",
        body: "Download or copy one PNG from the canvas — optional EXIF metadata stripping before share.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for a high-resolution photo collage creator?",
      body: "Open Image Collage Maker, compose on-device, and export PNG — no server upload.",
      button: "Open Image Collage Maker",
    },
  },
  "easy-image-grid-maker": {
    eyebrow: "Easy · Grids · Client-side",
    titleMain: "Easy Image Grid Maker",
    titleAccent: "Three Presets, Live Preview",
    heroSubtitle:
      "Use an easy image grid maker in your browser — no install, no account, no server upload. Upload photos locally, tile them into two-column, 2×2, or 3×3 grid presets on a client-side canvas, adjust gap and background with live preview, and export one flattened collage without sending your files to a remote service.",
    primaryCta: "Make a Grid — Free",
    ctaNote: "No upload · Three grids · On-device",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Preset grids — not a custom grid designer",
      body: "Pix-8 Image Collage Maker is an easy image grid maker because it tiles your photos into three built-in grid structures on a client-side canvas — two-column, 2×2, and 3×3. Adjust gap and background, preview live, and export one PNG. Vertical and horizontal strips are available in the same tool if you need a row or column. It does not offer arbitrary grid sizes, overlapping cells, drag-and-drop placement, or a template marketplace.",
    },
    benefitsHeading: "Why use an easy image grid maker on-device?",
    benefitsIntro:
      "Grid apps that upload your gallery before preview add friction. Pix-8 keeps tiling local — the practical fit when you need an ",
    benefitsKeyword: "easy image grid maker",
    benefitsIntroAfter:
      " to arrange photos into a simple grid and export without installing software or transmitting files to a server.",
    benefits: [
      {
        title: "Three grid presets",
        body: "Two-column, 2×2, and 3×3 — pick a structure and see cells update on a client-side canvas instantly.",
      },
      {
        title: "Short workflow",
        body: "Upload photos, choose a grid, tune gap and background, preview live, and download or copy one PNG — no sign-up required.",
      },
      {
        title: "Private on-device grids",
        body: "Your photos stay on your device during grid layout and export. Pix-8 never receives your files on a server.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Collage Maker",
        body: "Navigate to Pix-8 in your browser — no install, no sign-up, and no remote upload queue.",
      },
      {
        title: "Pick a grid preset",
        body: "Upload your photos, select two-column, 2×2, or 3×3, and adjust gap and background locally with live preview.",
      },
      {
        title: "Export the grid",
        body: "Download or copy one flattened PNG with your grid baked in — optional EXIF metadata stripping before share.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for an easy image grid maker?",
      body: "Open Image Collage Maker, tile photos on-device, and export — no server upload.",
      button: "Open Image Collage Maker",
    },
  },
};
