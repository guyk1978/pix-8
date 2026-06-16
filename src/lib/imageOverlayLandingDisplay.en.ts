import type {
  ImageOverlayLandingChrome,
  ImageOverlayLandingDisplayFields,
} from "@/lib/imageOverlayLandingTypes";
import type { ImageOverlayLandingId } from "@/lib/imageOverlayLandings";

export const IMAGE_OVERLAY_LANDING_CHROME_EN: ImageOverlayLandingChrome = {
  privacyNote:
    "Client-side processing only — your image never leaves the browser.",
  relatedUseCasesHeading: "Related use cases",
  guidesHeading: "Guides",
  toolCardTitle: "Image Overlay tool",
  toolCardExcerpt:
    "Open the workspace — layer preset overlays locally and export in seconds.",
};

/** Add one key per landing ID as pages are created. */
export const IMAGE_OVERLAY_LANDING_DISPLAY_EN: Record<
  ImageOverlayLandingId,
  Omit<ImageOverlayLandingDisplayFields, "capabilities">
> = {
  "add-image-overlay-online": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Add Image Overlay Online",
    titleAccent: "Private Browser Layering",
    heroSubtitle:
      "Add image overlay online in your browser — no upload, no account, no cloud queue. Pick a transparent preset, drag it into place on-device, and export without sending your file to a server.",
    primaryCta: "Add Overlay — Free",
    ctaNote: "No upload · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Layer overlays without a cloud upload",
      body: "Image Overlay composites preset transparent graphics on a client-side canvas in the browser — not a cloud editor that receives your file first. Choose from stars, flowers, birds, sparkles, or hearts, adjust opacity, size, and rotation, then download or copy. It does not include custom overlay uploads, batch queues, or server-side filters.",
    },
    benefitsHeading: "Why add image overlays online in the browser?",
    benefitsIntro:
      "Cloud overlay tools route every file through a remote server before you see a result. Pix-8 processes locally — the practical fit when you need to ",
    benefitsKeyword: "add image overlay online",
    benefitsIntroAfter:
      " without sending portraits, product shots, or campaign assets off-device.",
    benefits: [
      {
        title: "Client-side by default",
        body: "Your base image and overlay are composited on a local canvas in the browser. Pix-8 never receives your pixel data.",
      },
      {
        title: "Preset graphics, precise placement",
        body: "Select a transparent overlay from the built-in library, drag it into position, and fine-tune opacity, size, and rotation before export.",
      },
      {
        title: "Instant flattened export",
        body: "Download or copy a single merged image to your clipboard, with optional EXIF stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Overlay",
        body: "Navigate to Pix-8 Image Overlay in your browser — no install, no account, and no upload dialog.",
      },
      {
        title: "Choose and position a preset",
        body: "Load your base image locally, pick a transparent overlay from the preset gallery, and drag it into place. Adjust opacity, size, and rotation on-device in your browser tab.",
      },
      {
        title: "Download or copy",
        body: "Export the merged image to your device or copy to clipboard — ready for your feed or workflow immediately.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to add an image overlay without uploading?",
      body: "Open Image Overlay, load your first photo, and layer a transparent preset — privately, entirely on your device.",
      button: "Open Image Overlay",
    },
  },
  "overlay-images-online": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Overlay Images Online",
    titleAccent: "Merge Presets in the Browser",
    heroSubtitle:
      "Overlay images online in your browser — no upload, no account, no cloud queue. Load a photo locally, place a transparent preset graphic on-device, and export a flattened merge without sending your file to a server.",
    primaryCta: "Overlay Images — Free",
    ctaNote: "No upload · No server · Flattened export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Overlay photos online without cloud compositing",
      body: "Image Overlay merges a preset transparent graphic onto your photo on a client-side canvas — not a cloud compositor that ingests your file first. Pick stars, flowers, birds, sparkles, or hearts, adjust opacity, size, and rotation, then download or copy one flattened image. It does not include multi-layer stacks, custom overlay uploads, or batch processing.",
    },
    benefitsHeading: "Why overlay images online in the browser?",
    benefitsIntro:
      "Online overlay editors often require uploading before you can place a single graphic. Pix-8 composites locally — the practical fit when you need to ",
    benefitsKeyword: "overlay images online",
    benefitsIntroAfter:
      " for social posts, portraits, or product shots without routing pixels through a remote server.",
    benefits: [
      {
        title: "Local compositing",
        body: "Your photo and preset overlay are merged on a canvas in the browser tab. Processing stays on-device from load to export.",
      },
      {
        title: "Controlled preset placement",
        body: "Drag the overlay into position, then dial in opacity, scale, and rotation before you flatten and save.",
      },
      {
        title: "Share-ready output",
        body: "Download or copy one merged image, with optional EXIF metadata stripping before you post or send.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open the overlay workspace",
        body: "Go to Pix-8 Image Overlay in your browser — no install, no account, and no server upload step.",
      },
      {
        title: "Load and layer a preset",
        body: "Open your base image locally, select a transparent preset from the gallery, and drag it into place. Tuning runs on-device in your browser.",
      },
      {
        title: "Export the merged image",
        body: "Download or copy the flattened result — one file with the overlay baked in, ready to use immediately.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to overlay images without uploading?",
      body: "Open Image Overlay, load your photo, and merge a transparent preset — privately, entirely on your device.",
      button: "Open Image Overlay",
    },
  },
  "put-one-image-over-another": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Put One Image Over Another",
    titleAccent: "Layer on a Local Canvas",
    heroSubtitle:
      "Put one image over another in your browser — no upload, no account, no cloud queue. Load your base photo locally, place a transparent preset graphic on top on-device, and export a flattened merge without sending your files to a server.",
    primaryCta: "Layer Images — Free",
    ctaNote: "No upload · No server · Flattened export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Place a graphic over your photo — locally",
      body: "Image Overlay puts a preset transparent graphic on top of your base image on a client-side canvas — not a cloud editor that ingests both files first. Choose stars, flowers, birds, sparkles, or hearts, drag into position, adjust opacity, size, and rotation, then download or copy one flattened result. It does not accept a custom second image upload or multi-layer compositing.",
    },
    benefitsHeading: "Why put one image over another in the browser?",
    benefitsIntro:
      "Desktop editors and cloud tools often require uploading both files before you can layer them. Pix-8 composites on-device — the practical fit when you need to ",
    benefitsKeyword: "put one image over another",
    benefitsIntroAfter:
      " for social graphics, portraits, or product shots without routing pixels through a remote server.",
    benefits: [
      {
        title: "On-device layering",
        body: "Your base photo and preset overlay are merged on a canvas in the browser. Pix-8 never receives your pixel data.",
      },
      {
        title: "Top-layer control",
        body: "Drag the preset graphic into place, then fine-tune opacity, scale, and rotation before you flatten and export.",
      },
      {
        title: "Single merged file",
        body: "Download or copy one flattened image with the overlay baked in, with optional EXIF stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Overlay",
        body: "Navigate to Pix-8 Image Overlay in your browser — no install, no account, and no server upload step.",
      },
      {
        title: "Load base, place the top layer",
        body: "Open your base photo locally, pick a transparent preset from the gallery, and drag it on top. Adjust opacity, size, and rotation on-device in your browser tab.",
      },
      {
        title: "Export the composite",
        body: "Download or copy the flattened image — one file with the top graphic merged into your base photo.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to layer one image over another?",
      body: "Open Image Overlay, load your base photo, and place a transparent preset on top — privately, entirely on your device.",
      button: "Open Image Overlay",
    },
  },
  "image-merger-tool": {
    eyebrow: "Free · Client-side · No upload",
    titleMain: "Image Merger Tool",
    titleAccent: "Flatten Overlays Locally",
    heroSubtitle:
      "Use a free image merger tool in your browser — no upload, no account, no cloud queue. Load your photo locally, merge a transparent preset graphic on-device, and export one flattened file without sending pixels to a server.",
    primaryCta: "Merge Image — Free",
    ctaNote: "No upload · No server · One merged file",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Merge to one file — without a cloud merger",
      body: "Image Overlay flattens a preset transparent graphic onto your base photo on a client-side canvas — not a cloud merger that ingests your files first. Choose stars, flowers, birds, sparkles, or hearts, adjust opacity, size, and rotation, then download or copy one merged image. It does not merge photo grids, batch folders, or custom second-image uploads.",
    },
    benefitsHeading: "Why use a browser-based image merger?",
    benefitsIntro:
      "Cloud merger tools route every file through a remote server before export. Pix-8 merges locally — the practical fit when you need an ",
    benefitsKeyword: "image merger tool",
    benefitsIntroAfter:
      " that flattens a graphic onto your photo without sending assets off-device.",
    benefits: [
      {
        title: "Client-side merge",
        body: "Your base photo and preset overlay are composited on a local canvas in the browser. Pix-8 never receives your pixel data.",
      },
      {
        title: "One flattened export",
        body: "Download or copy a single merged image with the overlay baked in — not a layered project file or multi-image archive.",
      },
      {
        title: "Placement control",
        body: "Drag the preset into position, then fine-tune opacity, scale, and rotation before you flatten and save.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Overlay",
        body: "Navigate to Pix-8 Image Overlay in your browser — no install, no account, and no upload dialog.",
      },
      {
        title: "Load and merge on-device",
        body: "Open your base photo locally, select a transparent preset from the gallery, and position it on the canvas. Merging runs entirely in your browser tab.",
      },
      {
        title: "Download the merged file",
        body: "Export one flattened image to your device or copy to clipboard — ready to share immediately, with optional EXIF stripping.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to merge an image without uploading?",
      body: "Open Image Overlay, load your photo, and flatten a transparent preset into one file — privately, entirely on your device.",
      button: "Open Image Overlay",
    },
  },
  "add-transparent-image-overlay": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Add Transparent Image Overlay",
    titleAccent: "Preset Layers in the Browser",
    heroSubtitle:
      "Add transparent image overlay in your browser — no upload, no account, no cloud queue. Load your photo locally, pick a preset graphic with built-in transparency, drag it into place on-device, and export without sending your file to a server.",
    primaryCta: "Add Transparent Overlay — Free",
    ctaNote: "No upload · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Transparent presets — not custom file uploads",
      body: "Image Overlay composites preset transparent graphics on a client-side canvas in the browser — not a cloud editor that ingests your file first. Choose stars, flowers, birds, sparkles, or hearts, drag into position, adjust opacity, size, and rotation, then download or copy one flattened image. It does not accept custom overlay uploads, tiled watermarks, or batch queues.",
    },
    benefitsHeading: "Why add transparent image overlays in the browser?",
    benefitsIntro:
      "Cloud overlay tools route every file through a remote server before you see a result. Pix-8 processes locally — the practical fit when you need to ",
    benefitsKeyword: "add transparent image overlay",
    benefitsIntroAfter:
      " for social posts, portraits, or product shots without sending assets off-device.",
    benefits: [
      {
        title: "Local compositing",
        body: "Your base image and transparent preset are merged on a canvas in the browser tab. Pix-8 never receives your pixel data.",
      },
      {
        title: "Built-in transparency",
        body: "Select a preset graphic with transparency already baked in, drag it into position, and fine-tune opacity before export.",
      },
      {
        title: "Flattened export",
        body: "Download or copy one merged image to your device, with optional EXIF metadata stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Overlay",
        body: "Navigate to Pix-8 Image Overlay in your browser — no install, no account, and no upload dialog.",
      },
      {
        title: "Pick a transparent preset",
        body: "Load your base image locally, choose a preset from the gallery, and drag it into place. Adjust opacity, size, and rotation on-device in your browser tab.",
      },
      {
        title: "Export the merged image",
        body: "Download or copy the flattened result — one file with the transparent overlay baked in, ready to post or send.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to add a transparent overlay without uploading?",
      body: "Open Image Overlay, load your photo, and layer a transparent preset — privately, entirely on your device.",
      button: "Open Image Overlay",
    },
  },
  "client-side-image-overlay-tool": {
    eyebrow: "Client-side · No upload · Private",
    titleMain: "Client-Side Image Overlay Tool",
    titleAccent: "On-Device Layering",
    heroSubtitle:
      "Use a client-side image overlay tool in your browser — no upload, no account, no cloud queue. Your photo stays on-device while you place a preset transparent graphic, adjust opacity and position locally, and export without sending pixels to a server.",
    primaryCta: "Open Image Overlay — Free",
    ctaNote: "No upload · No server · On-device export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Overlay compositing runs in your browser tab",
      body: "Pix-8 Image Overlay reads your photo locally and composites a preset transparent graphic on a client-side canvas — not a cloud pipeline that ingests files first. Choose stars, flowers, birds, sparkles, or hearts, drag into position, adjust opacity, size, and rotation, then download or copy one flattened image. It does not accept custom overlay uploads, batch queues, or server-side processing.",
    },
    benefitsHeading: "Why use a client-side image overlay tool?",
    benefitsIntro:
      "Cloud overlay editors route every file through a remote server before export. Pix-8 processes entirely in the browser — the practical fit when you need a ",
    benefitsKeyword: "client-side image overlay tool",
    benefitsIntroAfter:
      " that keeps portraits, product shots, and campaign assets on your device from load to export.",
    benefits: [
      {
        title: "Zero server transfer",
        body: "Your base image and preset overlay are merged on a local canvas. Pix-8 never receives your pixel data during editing or export.",
      },
      {
        title: "Preset placement control",
        body: "Drag a transparent graphic into position, then fine-tune opacity, scale, and rotation before you flatten and save.",
      },
      {
        title: "Private export path",
        body: "Download or copy one merged file from your device, with optional EXIF metadata stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Overlay",
        body: "Navigate to Pix-8 Image Overlay in your browser — no install, no account, and no server upload step.",
      },
      {
        title: "Composite on-device",
        body: "Load your base image locally, select a preset from the gallery, and drag it into place. All overlay tuning runs in your browser tab.",
      },
      {
        title: "Export locally",
        body: "Download or copy the flattened result from your device — one file with the overlay baked in, ready to use immediately.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for client-side overlay compositing?",
      body: "Open Image Overlay, load your photo, and layer a preset transparent graphic — privately, entirely on your device.",
      button: "Open Image Overlay",
    },
  },
  "browser-based-image-overlay": {
    eyebrow: "Browser · Client-side · No install",
    titleMain: "Browser-Based Image Overlay",
    titleAccent: "No Install Required",
    heroSubtitle:
      "Use browser-based image overlay in your browser — no install, no upload, no account. Load your photo locally, place a preset transparent graphic on-device, adjust opacity and position in the browser tab, and export without sending pixels to a server.",
    primaryCta: "Open Image Overlay — Free",
    ctaNote: "No install · No upload · Browser export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Overlay compositing in your browser tab",
      body: "Pix-8 Image Overlay composites preset transparent graphics on a client-side canvas in the browser — not a desktop app or cloud editor that ingests your file first. Choose stars, flowers, birds, sparkles, or hearts, drag into position, adjust opacity, size, and rotation, then download or copy one flattened image. It does not accept custom overlay uploads, batch queues, or server-side processing.",
    },
    benefitsHeading: "Why use browser-based image overlay?",
    benefitsIntro:
      "Desktop overlay tools require installs and cloud editors route files through remote servers. Pix-8 runs in the browser — the practical fit when you need ",
    benefitsKeyword: "browser-based image overlay",
    benefitsIntroAfter:
      " for social posts, portraits, or product shots without plugins, accounts, or off-device processing.",
    benefits: [
      {
        title: "No install required",
        body: "Open Image Overlay in any modern browser tab. No desktop download, no plugin, and no account signup before you start.",
      },
      {
        title: "On-device compositing",
        body: "Your base image and preset overlay are merged on a local canvas in the browser. Pix-8 never receives your pixel data.",
      },
      {
        title: "Instant browser export",
        body: "Download or copy one flattened file from the browser tab, with optional EXIF metadata stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open in your browser",
        body: "Navigate to Pix-8 Image Overlay — no install, no account, and no server upload step.",
      },
      {
        title: "Layer a preset locally",
        body: "Load your base image from your device, select a transparent preset from the gallery, and drag it into place. All tuning runs in the browser tab.",
      },
      {
        title: "Export from the browser",
        body: "Download or copy the flattened result — one file with the overlay baked in, ready to post or send immediately.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for browser-based overlay compositing?",
      body: "Open Image Overlay in your browser, load your photo, and layer a preset transparent graphic — privately, entirely on your device.",
      button: "Open Image Overlay",
    },
  },
  "privacy-focused-image-compositor": {
    eyebrow: "Private · Client-side · No upload",
    titleMain: "Privacy-Focused Image Compositor",
    titleAccent: "On-Device Layering",
    heroSubtitle:
      "Use a privacy-focused image compositor in your browser — no upload, no account, no cloud queue. Load your photo locally, composite a preset transparent graphic on-device, adjust opacity and position in the browser tab, and export without sending pixels to a server.",
    primaryCta: "Composite Images — Free",
    ctaNote: "No upload · No server · Private export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Composite locally — not on a remote server",
      body: "Pix-8 Image Overlay merges a preset transparent graphic onto your base photo on a client-side canvas in the browser — not a cloud compositor that ingests your file first. Choose stars, flowers, birds, sparkles, or hearts, drag into position, adjust opacity, size, and rotation, then download or copy one flattened image. It does not accept custom overlay uploads, multi-layer stacks, or batch queues.",
    },
    benefitsHeading: "Why use a privacy-focused image compositor?",
    benefitsIntro:
      "Cloud compositors route every file through a remote server before export. Pix-8 processes locally — the practical fit when you need a ",
    benefitsKeyword: "privacy-focused image compositor",
    benefitsIntroAfter:
      " for social posts, portraits, or product shots without transmitting assets off-device.",
    benefits: [
      {
        title: "Data stays on-device",
        body: "Your base image and preset overlay are merged on a canvas in the browser tab. Pix-8 never receives your pixel data.",
      },
      {
        title: "No cloud upload step",
        body: "Load your photo from your device, place a graphic, and export — without routing files through a remote compositing server.",
      },
      {
        title: "Optional metadata stripping",
        body: "Download or copy one flattened file per session, with optional EXIF metadata removal before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Overlay",
        body: "Navigate to Pix-8 Image Overlay in your browser — no install, no account, and no server upload step.",
      },
      {
        title: "Composite on-device",
        body: "Load your base image locally, select a preset from the gallery, and drag it into place. All compositing runs in your browser tab.",
      },
      {
        title: "Export privately",
        body: "Download or copy the flattened result from your device — one file with the overlay baked in, ready to use immediately.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to composite images without uploading?",
      body: "Open Image Overlay, load your photo, and merge a preset transparent graphic — privately, entirely on your device.",
      button: "Open Image Overlay",
    },
  },
  "combine-two-images-online": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Combine Two Images Online",
    titleAccent: "Merge Layers in the Browser",
    heroSubtitle:
      "Combine two images online in your browser — no upload, no account, no cloud queue. Load your base photo locally, layer a preset transparent graphic on-device, adjust opacity and position, and export one merged file without sending pixels to a server.",
    primaryCta: "Combine Images — Free",
    ctaNote: "No upload · No server · One merged file",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Base photo plus preset graphic — not two custom uploads",
      body: "Pix-8 Image Overlay combines your base image with one preset transparent graphic on a client-side canvas in the browser — not a cloud merger that ingests both files first. Choose stars, flowers, birds, sparkles, or hearts, drag into position, adjust opacity, size, and rotation, then download or copy one flattened result. It does not merge photo grids, accept a second custom image upload, or queue batch folders.",
    },
    benefitsHeading: "Why combine two images online in the browser?",
    benefitsIntro:
      "Cloud image combiners route every file through a remote server before export. Pix-8 merges locally — the practical fit when you need to ",
    benefitsKeyword: "combine two images online",
    benefitsIntroAfter:
      " for social graphics, portraits, or product shots without sending assets off-device.",
    benefits: [
      {
        title: "Local merge",
        body: "Your base photo and preset graphic are combined on a canvas in the browser tab. Pix-8 never receives your pixel data.",
      },
      {
        title: "Placement control",
        body: "Drag the preset layer into position, then fine-tune opacity, scale, and rotation before you flatten and save.",
      },
      {
        title: "Single combined file",
        body: "Download or copy one merged image with the graphic baked in, with optional EXIF metadata stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Overlay",
        body: "Navigate to Pix-8 Image Overlay in your browser — no install, no account, and no upload dialog.",
      },
      {
        title: "Load base, add the layer",
        body: "Open your base photo locally, select a transparent preset from the gallery, and drag it on top. Adjust opacity, size, and rotation on-device in your browser tab.",
      },
      {
        title: "Export the combined image",
        body: "Download or copy one flattened file — your base photo merged with the preset graphic, ready to post or send.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to combine images without uploading?",
      body: "Open Image Overlay, load your photo, and merge a preset transparent graphic — privately, entirely on your device.",
      button: "Open Image Overlay",
    },
  },
  "overlay-images-with-transparency": {
    eyebrow: "Transparent · Client-side · No upload",
    titleMain: "Overlay Images with Transparency",
    titleAccent: "Opacity Control On-Device",
    heroSubtitle:
      "Overlay images with transparency in your browser — no upload, no account, no cloud queue. Load your photo locally, place a preset graphic with built-in transparency, fine-tune opacity on-device, and export without sending pixels to a server.",
    primaryCta: "Overlay with Transparency — Free",
    ctaNote: "No upload · No server · Opacity control",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Preset graphics with adjustable transparency",
      body: "Pix-8 Image Overlay layers preset transparent graphics on a client-side canvas in the browser — not a cloud editor that ingests your file first. Choose stars, flowers, birds, sparkles, or hearts, drag into position, dial in opacity, size, and rotation, then download or copy one flattened image. It does not accept custom overlay uploads, tiled watermarks, or batch queues.",
    },
    benefitsHeading: "Why overlay images with transparency in the browser?",
    benefitsIntro:
      "Cloud overlay tools route every file through a remote server before you can tune transparency. Pix-8 processes locally — the practical fit when you need to ",
    benefitsKeyword: "overlay images with transparency",
    benefitsIntroAfter:
      " for social posts, portraits, or product shots without sending assets off-device.",
    benefits: [
      {
        title: "On-device compositing",
        body: "Your base image and transparent preset are merged on a canvas in the browser tab. Pix-8 never receives your pixel data.",
      },
      {
        title: "Opacity you control",
        body: "Select a preset with built-in transparency, drag it into place, and fine-tune opacity before you flatten and export.",
      },
      {
        title: "Flattened export",
        body: "Download or copy one merged file per session, with optional EXIF metadata stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Overlay",
        body: "Navigate to Pix-8 Image Overlay in your browser — no install, no account, and no upload dialog.",
      },
      {
        title: "Place and tune transparency",
        body: "Load your base image locally, pick a preset from the gallery, and drag it into position. Adjust opacity, size, and rotation on-device in your browser tab.",
      },
      {
        title: "Export the merged image",
        body: "Download or copy the flattened result — one file with the transparent overlay baked in, ready to post or send.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to overlay with transparency?",
      body: "Open Image Overlay, load your photo, and layer a preset graphic with opacity control — privately, entirely on your device.",
      button: "Open Image Overlay",
    },
  },
  "image-layer-editor-online": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Image Layer Editor Online",
    titleAccent: "One Layer, On-Device",
    heroSubtitle:
      "Use an image layer editor online in your browser — no upload, no account, no cloud queue. Load your photo locally, place a preset transparent graphic on-device, adjust opacity and position, and export one flattened file without sending pixels to a server.",
    primaryCta: "Edit Layers — Free",
    ctaNote: "No upload · No server · Flattened export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Layer one preset graphic — not a full layer stack",
      body: "Pix-8 Image Overlay lets you place a single preset transparent graphic on your base photo on a client-side canvas in the browser — not a cloud editor with a multi-layer panel. Choose stars, flowers, birds, sparkles, or hearts, drag into position, adjust opacity, size, and rotation, then download or copy one flattened image. It does not accept custom layer uploads, unlimited stacks, or batch queues.",
    },
    benefitsHeading: "Why use an image layer editor online?",
    benefitsIntro:
      "Desktop layer editors require installs and cloud tools route files through remote servers. Pix-8 runs in the browser — the practical fit when you need an ",
    benefitsKeyword: "image layer editor online",
    benefitsIntroAfter:
      " for social graphics, portraits, or product shots without plugins, accounts, or off-device processing.",
    benefits: [
      {
        title: "Client-side editing",
        body: "Your base image and preset layer are composited on a canvas in the browser tab. Pix-8 never receives your pixel data.",
      },
      {
        title: "Layer placement control",
        body: "Drag the preset into position, then fine-tune opacity, scale, and rotation before you flatten and export.",
      },
      {
        title: "Single flattened file",
        body: "Download or copy one merged image with the layer baked in, with optional EXIF metadata stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Overlay",
        body: "Navigate to Pix-8 Image Overlay in your browser — no install, no account, and no upload dialog.",
      },
      {
        title: "Add and position a layer",
        body: "Load your base image locally, select a transparent preset from the gallery, and drag it into place. Adjust opacity, size, and rotation on-device in your browser tab.",
      },
      {
        title: "Export the flattened image",
        body: "Download or copy one file with the layer merged into your photo — ready to post or send immediately.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to edit image layers without uploading?",
      body: "Open Image Overlay, load your photo, and place a preset transparent graphic — privately, entirely on your device.",
      button: "Open Image Overlay",
    },
  },
};
