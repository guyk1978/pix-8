import type {
  ImageFiltersLandingChrome,
  ImageFiltersLandingDisplayFields,
} from "@/lib/imagefiltersLandingTypes";
import type { ImageFiltersLandingId } from "@/lib/imagefiltersLandings";

export const IMAGE_FILTERS_LANDING_CHROME_EN: ImageFiltersLandingChrome = {
  privacyNote:
    "Client-side processing only — your images never leave the browser.",
  relatedUseCasesHeading: "Related use cases",
  guidesHeading: "Guides",
  toolCardTitle: "Image Filters & Effects tool",
  toolCardExcerpt:
    "Open the workspace — apply filters locally and export in seconds.",
};

export const IMAGE_FILTERS_LANDING_DISPLAY_EN: Record<
  ImageFiltersLandingId,
  Omit<ImageFiltersLandingDisplayFields, "capabilities">
> = {
  "add-image-filters-online": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Add Image Filters Online",
    titleAccent: "Mood Presets in the Browser",
    heroSubtitle:
      "Add image filters online in your browser — no upload, no account, no cloud queue. Load your photo locally, apply grayscale, sepia, vintage, blur, or vignette on-device, preview with a before/after slider, and export without sending pixels to a server.",
    primaryCta: "Apply Filters — Free",
    ctaNote: "No upload · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Five filter presets — not a cloud editor",
      body: "Pix-8 Image Filters & Effects loads your photo and renders grayscale, sepia, vintage, blur, or vignette on a client-side canvas — not a cloud service that ingests files first. Drag the before/after divider to compare, then download or copy one flattened image. It does not batch folders, apply custom LUTs, or add text overlays, decorative stickers, or pin-style annotation labels.",
    },
    benefitsHeading: "Why add image filters online in the browser?",
    benefitsIntro:
      "Cloud filter apps route every file through a remote server before you see a result. Pix-8 processes locally — the practical fit when you need to ",
    benefitsKeyword: "add image filters online",
    benefitsIntroAfter:
      " for social posts, portfolio samples, or campaign assets without sending photos off-device.",
    benefits: [
      {
        title: "Client-side by default",
        body: "Your photo is filtered on a local canvas in the browser tab. Pix-8 never receives your pixel data.",
      },
      {
        title: "Before/after preview",
        body: "Compare the original and filtered versions with a live slider before you commit to an export.",
      },
      {
        title: "Share-ready export",
        body: "Download or copy one filtered file per session, with optional EXIF metadata stripping before you post or send.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Filters & Effects",
        body: "Navigate to Pix-8 Image Filters in your browser — no install, no account, and no server upload step.",
      },
      {
        title: "Load photo and choose a filter",
        body: "Open your image locally. Select grayscale, sepia, vintage, blur, or vignette and preview the effect with the before/after slider on-device.",
      },
      {
        title: "Download or copy",
        body: "Export the filtered image to your device or copy to clipboard — ready for social posts, proofs, or client delivery.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to filter images without uploading?",
      body: "Open Image Filters & Effects, load your photo, pick a preset, and export — privately, entirely on your device.",
      button: "Open Image Filters",
    },
  },
  "photo-effects-online": {
    eyebrow: "Online · Client-side · No upload",
    titleMain: "Photo Effects Online",
    titleAccent: "Five Presets, One Browser",
    heroSubtitle:
      "Apply photo effects online in your browser — no upload, no account, no cloud queue. Load your image locally, try grayscale, sepia, vintage, blur, or vignette on-device, compare with a before/after slider, and export without routing pixels through a remote server.",
    primaryCta: "Try Effects — Free",
    ctaNote: "No upload · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Preset effects — not an AI style engine",
      body: "Pix-8 Image Filters & Effects renders grayscale, sepia, vintage, blur, and vignette on a client-side canvas — not a cloud editor that ingests your files first. Drag the before/after divider to judge the mood, then download or copy one flattened image. It does not generate AI looks, animate GIFs, batch-process folders, or add decorative overlays or pin-style labels.",
    },
    benefitsHeading: "Why apply photo effects online in the browser?",
    benefitsIntro:
      "Online effect apps typically upload every photo before you see a result. Pix-8 processes on-device — the direct fit when you need ",
    benefitsKeyword: "photo effects online",
    benefitsIntroAfter:
      " for social posts, portfolio polish, or mood boards without sending originals off your machine.",
    benefits: [
      {
        title: "Local rendering",
        body: "Effects are calculated on a canvas in your browser tab. Pix-8 never receives your pixel data.",
      },
      {
        title: "Mood presets that ship",
        body: "Switch between grayscale, sepia, vintage, blur, and vignette and preview each with the before/after slider before export.",
      },
      {
        title: "One-file delivery",
        body: "Download or copy a single processed image per session, with optional EXIF metadata stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Filters & Effects",
        body: "Go to Pix-8 Image Filters in your browser — no install, no account, and no upload dialog.",
      },
      {
        title: "Load a photo and pick an effect",
        body: "Open your image locally. Select grayscale, sepia, vintage, blur, or vignette and preview the change with the before/after slider on-device.",
      },
      {
        title: "Export the result",
        body: "Download or copy the effected photo to your device — ready to post, print, or send as a proof.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for photo effects without uploading?",
      body: "Open Image Filters & Effects, load your photo, choose a preset, and export — privately, entirely on your device.",
      button: "Open Image Filters",
    },
  },
  "free-image-filter-tool": {
    eyebrow: "Free · Client-side · No upload",
    titleMain: "Free Image Filter Tool",
    titleAccent: "No Account, No Server",
    heroSubtitle:
      "Use a free image filter tool in your browser — no subscription, no account, no cloud queue. Load your photo locally, apply grayscale, sepia, vintage, blur, or vignette on-device, preview with a before/after slider, and export without paying or sending files to a remote server.",
    primaryCta: "Filter Images — Free",
    ctaNote: "No account · No upload · Client-side export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Free presets — not a freemium upload trap",
      body: "Pix-8 Image Filters & Effects gives you grayscale, sepia, vintage, blur, and vignette on a client-side canvas at no cost — not a free trial that requires uploading your photo first. Compare with the before/after slider, then download or copy one flattened image. It does not watermark exports, gate downloads behind signup, batch folders, or add text blocks or pin-style labels.",
    },
    benefitsHeading: "Why use a free image filter tool in the browser?",
    benefitsIntro:
      "Many free filter apps still route files through a server or lock exports behind accounts. Pix-8 processes locally — the practical fit when you need a ",
    benefitsKeyword: "free image filter tool",
    benefitsIntroAfter:
      " that keeps photos on your device while you try presets and export.",
    benefits: [
      {
        title: "No paywall on export",
        body: "Apply presets and download or copy one filtered image per session without a subscription or per-file fee.",
      },
      {
        title: "Client-side processing",
        body: "Your photo is filtered on a canvas in the browser tab. Pix-8 never receives your pixel data.",
      },
      {
        title: "Honest preset set",
        body: "Grayscale, sepia, vintage, blur, and vignette with a live before/after slider — no invented AI filters or batch queues.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Filters & Effects",
        body: "Go to Pix-8 Image Filters in your browser — free access, no install, and no account signup.",
      },
      {
        title: "Load a photo and pick a filter",
        body: "Open your image locally. Select a preset and preview the result with the before/after slider on-device.",
      },
      {
        title: "Download or copy for free",
        body: "Export the filtered image to your device or clipboard — no payment step and no server upload.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for a free filter tool that stays local?",
      body: "Open Image Filters & Effects, load your photo, choose a preset, and export — free, private, entirely on your device.",
      button: "Open Image Filters",
    },
  },
  "apply-filters-to-photos": {
    eyebrow: "Photos · Client-side · No upload",
    titleMain: "Apply Filters to Photos",
    titleAccent: "One Preset, Local Export",
    heroSubtitle:
      "Apply filters to photos in your browser — no upload, no account, no cloud queue. Load a photo from your device, try grayscale, sepia, vintage, blur, or vignette on-device, judge the result with a before/after slider, and export without sending your pictures to a remote server.",
    primaryCta: "Filter a Photo — Free",
    ctaNote: "No upload · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Apply one preset per photo — not batch automation",
      body: "Pix-8 Image Filters & Effects lets you apply grayscale, sepia, vintage, blur, or vignette to a loaded photo on a client-side canvas — not a cloud editor that ingests your library first. Compare with the before/after slider, then download or copy one export per session. It does not batch folders, stack multiple filters, or add pin-style annotation labels or decorative overlays.",
    },
    benefitsHeading: "Why apply filters to photos in the browser?",
    benefitsIntro:
      "Cloud photo apps upload every image before you can test a look. Pix-8 filters locally — the direct fit when you need to ",
    benefitsKeyword: "apply filters to photos",
    benefitsIntroAfter:
      " for social posts, client proofs, or portfolio polish without routing pictures off your device.",
    benefits: [
      {
        title: "Photos stay on-device",
        body: "Each image is read from your device and filtered on a local canvas in the browser. Pix-8 never receives your pixel data.",
      },
      {
        title: "Preset comparison built in",
        body: "Switch between grayscale, sepia, vintage, blur, and vignette and preview each with the before/after slider before you export.",
      },
      {
        title: "Ready to post or send",
        body: "Download or copy one filtered photo per session, with optional EXIF metadata stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Filters & Effects",
        body: "Navigate to Pix-8 Image Filters in your browser — no install, no account, and no upload step.",
      },
      {
        title: "Load a photo and apply a filter",
        body: "Open your image locally. Choose grayscale, sepia, vintage, blur, or vignette and preview the filtered photo with the before/after slider on-device.",
      },
      {
        title: "Export and repeat if needed",
        body: "Download or copy the filtered image, then load your next photo in a new session — one export per pass.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to filter photos without uploading?",
      body: "Open Image Filters & Effects, load your photo, apply a preset, and export — privately, entirely on your device.",
      button: "Open Image Filters",
    },
  },
  "vintage-photo-filters-online": {
    eyebrow: "Vintage · Client-side · No upload",
    titleMain: "Vintage Photo Filters Online",
    titleAccent: "Retro Preset in the Browser",
    heroSubtitle:
      "Use vintage photo filters online in your browser — no upload, no account, no cloud queue. Load your photo locally, apply the Vintage preset on-device, compare with Sepia or other moods using the before/after slider, and export without sending pictures to a remote server.",
    primaryCta: "Try Vintage — Free",
    ctaNote: "No upload · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "One Vintage preset — not a film-stock library",
      body: "Pix-8 Image Filters & Effects includes a dedicated Vintage preset that fades and warms tones on a client-side canvas — not a cloud filter pack that ingests your album first. Preview against the original with the before/after slider, then download or copy one export. Sepia, grayscale, blur, and vignette are separate presets you can compare in the same session — but only one applies per export. No batch folders, AI retro styles, or pin-style labels.",
    },
    benefitsHeading: "Why use vintage photo filters online in the browser?",
    benefitsIntro:
      "Retro filter apps often upload every photo before you see a grade. Pix-8 renders locally — the practical fit when you need ",
    benefitsKeyword: "vintage photo filters online",
    benefitsIntroAfter:
      " for social posts, nostalgia projects, or portfolio samples without routing images off your device.",
    benefits: [
      {
        title: "Vintage preset on-device",
        body: "Your photo is graded on a local canvas in the browser. Pix-8 never receives your pixel data.",
      },
      {
        title: "Compare before you commit",
        body: "Switch between Vintage, Sepia, and other presets and judge each look with the live before/after slider.",
      },
      {
        title: "Export one retro still",
        body: "Download or copy one filtered photo per session, with optional EXIF metadata stripping before you post or send.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Filters & Effects",
        body: "Navigate to Pix-8 Image Filters in your browser — no install, no account, and no upload step.",
      },
      {
        title: "Load a photo and select Vintage",
        body: "Open your image locally. Choose the Vintage preset — or compare Sepia and other moods — and preview the retro look with the before/after slider on-device.",
      },
      {
        title: "Download or copy",
        body: "Export the vintage-graded photo to your device or clipboard — ready for social posts, prints, or client proofs.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for a vintage look without uploading?",
      body: "Open Image Filters & Effects, load your photo, select Vintage, and export — privately, entirely on your device.",
      button: "Open Image Filters",
    },
  },
  "black-and-white-photo-effect": {
    eyebrow: "Monochrome · Client-side · No upload",
    titleMain: "Black and White Photo Effect",
    titleAccent: "Grayscale Preset in the Browser",
    heroSubtitle:
      "Apply a black and white photo effect in your browser — no upload, no account, no cloud queue. Load your photo locally, select the Grayscale preset on-device, preview with a before/after slider, and export without sending pictures to a remote server.",
    primaryCta: "Go Black & White — Free",
    ctaNote: "No upload · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "One Grayscale preset — not selective color editing",
      body: "Pix-8 Image Filters & Effects converts your loaded photo to monochrome with the Grayscale preset on a client-side canvas — not a cloud editor that ingests files first. Drag the before/after divider to judge contrast, then download or copy one flattened image. Sepia, vintage, blur, and vignette are separate presets in the same workspace. It does not isolate one color channel, batch folders, or add pin-style annotation labels.",
    },
    benefitsHeading: "Why apply a black and white photo effect in the browser?",
    benefitsIntro:
      "Cloud editors upload every photo before you see monochrome. Pix-8 processes locally — the direct fit when you need a ",
    benefitsKeyword: "black and white photo effect",
    benefitsIntroAfter:
      " for portraits, editorial stills, or social posts without routing images off your device.",
    benefits: [
      {
        title: "Monochrome on-device",
        body: "The Grayscale preset runs on a local canvas in your browser tab. Pix-8 never receives your pixel data.",
      },
      {
        title: "Before/after preview",
        body: "Compare color and monochrome side by side with the live slider before you export.",
      },
      {
        title: "Single-file export",
        body: "Download or copy one black-and-white image per session, with optional EXIF metadata stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Filters & Effects",
        body: "Navigate to Pix-8 Image Filters in your browser — no install, no account, and no upload step.",
      },
      {
        title: "Load a photo and select Grayscale",
        body: "Open your image locally. Choose the Grayscale preset and preview the black-and-white result with the before/after slider on-device.",
      },
      {
        title: "Download or copy",
        body: "Export the monochrome photo to your device or clipboard — ready to post, print, or deliver as a proof.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for black and white without uploading?",
      body: "Open Image Filters & Effects, load your photo, select Grayscale, and export — privately, entirely on your device.",
      button: "Open Image Filters",
    },
  },
  "apply-artistic-effects-to-photos": {
    eyebrow: "Artistic · Client-side · No upload",
    titleMain: "Apply Artistic Effects to Photos",
    titleAccent: "Mood Presets, Local Export",
    heroSubtitle:
      "Apply artistic effects to photos in your browser — no upload, no account, no cloud queue. Load your image locally, try sepia, vintage, vignette, blur, or grayscale on-device, preview each mood with a before/after slider, and export without sending pictures to a remote server.",
    primaryCta: "Try Artistic Effects — Free",
    ctaNote: "No upload · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Mood presets — not generative art filters",
      body: "Pix-8 Image Filters & Effects applies sepia, vintage, vignette, blur, and grayscale as single-click presets on a client-side canvas — not an AI art engine or cloud style transfer service. Drag the before/after divider to judge each look, then download or copy one flattened image. It does not paint over photos, add decorative sticker overlays, or place pin-style annotation labels — for layered graphics, see Image Overlay.",
    },
    benefitsHeading: "Why apply artistic effects to photos in the browser?",
    benefitsIntro:
      "Artistic filter apps often upload every image before you see a grade. Pix-8 processes locally — the practical fit when you need to ",
    benefitsKeyword: "apply artistic effects to photos",
    benefitsIntroAfter:
      " for editorial stills, mood boards, or social posts without routing files off your device.",
    benefits: [
      {
        title: "Artistic grades on-device",
        body: "Sepia, vintage, vignette, blur, and grayscale render on a local canvas in your browser tab. Pix-8 never receives your pixel data.",
      },
      {
        title: "Compare moods before export",
        body: "Switch between presets and preview each artistic direction with the live before/after slider.",
      },
      {
        title: "One look per export",
        body: "Download or copy one styled photo per session, with optional EXIF metadata stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Filters & Effects",
        body: "Navigate to Pix-8 Image Filters in your browser — no install, no account, and no upload step.",
      },
      {
        title: "Load a photo and pick a mood",
        body: "Open your image locally. Select sepia, vintage, vignette, blur, or grayscale and preview the artistic effect with the before/after slider on-device.",
      },
      {
        title: "Download or copy",
        body: "Export the styled photo to your device or clipboard — ready for portfolios, posts, or client proofs.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for artistic effects without uploading?",
      body: "Open Image Filters & Effects, load your photo, choose a mood preset, and export — privately, entirely on your device.",
      button: "Open Image Filters",
    },
  },
  "enhance-photo-colors-online": {
    eyebrow: "Color tone · Client-side · No upload",
    titleMain: "Enhance Photo Colors Online",
    titleAccent: "Warm Presets, Local Export",
    heroSubtitle:
      "Enhance photo colors online in your browser — no upload, no account, no cloud queue. Load your image locally, warm tones with Sepia or Vintage on-device, compare each grade with a before/after slider, and export without sending pictures to a remote server.",
    primaryCta: "Try Color Presets — Free",
    ctaNote: "No upload · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Color-tone presets — not saturation sliders",
      body: "Pix-8 Image Filters & Effects reshapes color mood with Sepia and Vintage presets on a client-side canvas — not a cloud editor with HSL wheels that ingests your library first. Drag the before/after divider to judge each warm grade against the original, then download or copy one flattened image. Grayscale, blur, and vignette are separate presets in the same workspace. It does not boost vibrance, isolate color channels, or add pin-style annotation labels — for brightness and contrast sliders, see Light Adjuster.",
    },
    benefitsHeading: "Why enhance photo colors online in the browser?",
    benefitsIntro:
      "Color-enhancement apps often upload every image before you see a grade. Pix-8 processes locally — the practical fit when you need to ",
    benefitsKeyword: "enhance photo colors online",
    benefitsIntroAfter:
      " for social posts, product stills, or portfolio samples without routing files off your device.",
    benefits: [
      {
        title: "Warm tones on-device",
        body: "Sepia and Vintage presets render on a local canvas in your browser tab. Pix-8 never receives your pixel data.",
      },
      {
        title: "Compare grades before export",
        body: "Switch between Sepia, Vintage, and other presets and judge each color direction with the live before/after slider.",
      },
      {
        title: "One look per export",
        body: "Download or copy one color-graded photo per session, with optional EXIF metadata stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Filters & Effects",
        body: "Navigate to Pix-8 Image Filters in your browser — no install, no account, and no upload step.",
      },
      {
        title: "Load a photo and pick a warm preset",
        body: "Open your image locally. Select Sepia or Vintage — or compare other moods — and preview the color shift with the before/after slider on-device.",
      },
      {
        title: "Download or copy",
        body: "Export the color-graded photo to your device or clipboard — ready for posts, prints, or client proofs.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to warm your colors without uploading?",
      body: "Open Image Filters & Effects, load your photo, choose Sepia or Vintage, and export — privately, entirely on your device.",
      button: "Open Image Filters",
    },
  },
  "client-side-image-filters": {
    eyebrow: "Client-side · No upload · On-device",
    titleMain: "Client-Side Image Filters",
    titleAccent: "Local Canvas, Private Export",
    heroSubtitle:
      "Use client-side image filters in your browser — no upload, no account, no cloud queue. Load your photo locally, apply grayscale, sepia, vintage, blur, or vignette on a device canvas, preview with a before/after slider, and export without sending pixels to a remote server.",
    primaryCta: "Try Client-Side Filters — Free",
    ctaNote: "No upload · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Client-side canvas — not a cloud filter pipeline",
      body: "Pix-8 Image Filters & Effects renders grayscale, sepia, vintage, blur, and vignette on a client-side canvas in your browser tab — not a remote service that ingests your library before you see a grade. Drag the before/after divider to compare each preset against the original, then download or copy one flattened image. It does not upload files to Pix-8, batch-process folders, apply custom LUTs, or add pin-style annotation labels — privacy comes from architecture, not a toggle.",
    },
    benefitsHeading: "Why use client-side image filters?",
    benefitsIntro:
      "Cloud filter apps route every photo through a server before export. Pix-8 keeps filtering local — the direct fit when you need ",
    benefitsKeyword: "client-side image filters",
    benefitsIntroAfter:
      " for confidential stills, client proofs, or everyday edits without an upload step.",
    benefits: [
      {
        title: "Pixels stay on your device",
        body: "Your photo is read locally and filtered on a client-side canvas in the browser. Pix-8 never receives your image data.",
      },
      {
        title: "Five presets, one workspace",
        body: "Switch between grayscale, sepia, vintage, blur, and vignette and judge each look with the live before/after slider.",
      },
      {
        title: "Export without a server round-trip",
        body: "Download or copy one filtered photo per session, with optional EXIF metadata stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Filters & Effects",
        body: "Navigate to Pix-8 Image Filters in your browser — no install, no account, and no upload step.",
      },
      {
        title: "Load a photo and select a preset",
        body: "Open your image locally. Choose grayscale, sepia, vintage, blur, or vignette and preview the filtered result with the before/after slider on-device.",
      },
      {
        title: "Download or copy",
        body: "Export the filtered photo from your device or clipboard — ready for posts, prints, or client delivery.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for client-side filters without uploading?",
      body: "Open Image Filters & Effects, load your photo, pick a preset, and export — privately, entirely on your device.",
      button: "Open Image Filters",
    },
  },
  "no-upload-photo-effects-editor": {
    eyebrow: "No upload · Client-side · On-device",
    titleMain: "No-Upload Photo Effects Editor",
    titleAccent: "Open Locally, Export Privately",
    heroSubtitle:
      "Use a no-upload photo effects editor in your browser — your image never leaves your device for server processing. Load a photo locally, apply grayscale, sepia, vintage, blur, or vignette on a client-side canvas, preview with a before/after slider, and export without transmitting pixels to Pix-8 or any third-party server.",
    primaryCta: "Try Photo Effects — Free",
    ctaNote: "No server upload · Client-side canvas",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Local file access — not a cloud upload queue",
      body: "Pix-8 Image Filters & Effects is a no-upload photo effects editor because your photo is read from your device and filtered in the browser tab — not sent to a remote server before presets render. Choose grayscale, sepia, vintage, blur, or vignette, drag the before/after divider to compare, then download or copy one flattened image. It does not queue files on a backend, stack multiple effects, batch folders, or add pin-style annotation labels — for text or graphics on images, see Text Overlay or Image Overlay.",
    },
    benefitsHeading: "Why use a no-upload photo effects editor?",
    benefitsIntro:
      "Cloud effect tools treat every photo as upload input. Pix-8 skips the server entirely — the direct fit when you need a ",
    benefitsKeyword: "no-upload photo effects editor",
    benefitsIntroAfter:
      " for client proofs, personal stills, or internal content you refuse to route through a remote filter service.",
    benefits: [
      {
        title: "Zero server transfer",
        body: "Your file stays on your device from open to export. Pix-8 never receives your image on a backend for effect rendering.",
      },
      {
        title: "Live preview without upload wait",
        body: "Switch between five presets and judge each look with the before/after slider — no queue, no processing spinner on a remote server.",
      },
      {
        title: "One effect per export",
        body: "Download or copy one filtered photo per session, with optional EXIF metadata stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Filters & Effects",
        body: "Navigate to Pix-8 Image Filters in your browser — no install, no account, and no upload step.",
      },
      {
        title: "Load a photo and pick an effect",
        body: "Open your image locally. Select grayscale, sepia, vintage, blur, or vignette and preview the result with the before/after slider on-device.",
      },
      {
        title: "Download or copy",
        body: "Export the effected photo from your device or clipboard — ready for posts, prints, or client delivery.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for photo effects without uploading?",
      body: "Open Image Filters & Effects, load your photo, choose a preset, and export — privately, entirely on your device.",
      button: "Open Image Filters",
    },
  },
  "privacy-first-photo-filter-tool": {
    eyebrow: "Privacy-first · Client-side · No upload",
    titleMain: "Privacy-First Photo Filter Tool",
    titleAccent: "Your Photos Never Leave",
    heroSubtitle:
      "Use a privacy-first photo filter tool in your browser — confidential stills, client proofs, and personal photos stay on your device. Load an image locally, apply grayscale, sepia, vintage, blur, or vignette on a client-side canvas, preview with a before/after slider, and export without sending pixels to Pix-8 or any third-party server.",
    primaryCta: "Filter Privately — Free",
    ctaNote: "No upload · No server · On-device only",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Privacy by architecture — not a cloud filter studio",
      body: "Pix-8 Image Filters & Effects is a privacy-first photo filter tool because your image is never uploaded for processing. Load a file locally, select grayscale, sepia, vintage, blur, or vignette, drag the before/after divider to compare, and export from your device. It does not ingest your library on a remote server, apply custom LUT packs, stack multiple presets, or add pin-style annotation labels — confidentiality is built into how the tool runs, not bolted on as a premium option.",
    },
    benefitsHeading: "Why use a privacy-first photo filter tool?",
    benefitsIntro:
      "Free filter apps often upload your photo before you see a grade. Pix-8 keeps filtering on-device — the direct fit when you need a ",
    benefitsKeyword: "privacy-first photo filter tool",
    benefitsIntroAfter:
      " for sensitive portraits, legal stills, or internal assets you refuse to route through a remote filter service.",
    benefits: [
      {
        title: "No server ingestion",
        body: "Your file stays on your device from open to export. Pix-8 never receives your image on a backend for filter rendering.",
      },
      {
        title: "Five presets, local preview",
        body: "Switch between grayscale, sepia, vintage, blur, and vignette and judge each look with the live before/after slider — entirely in your browser tab.",
      },
      {
        title: "Export without a cloud round-trip",
        body: "Download or copy one filtered photo per session, with optional EXIF metadata stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Filters & Effects",
        body: "Navigate to Pix-8 Image Filters in your browser — no install, no account, and no upload step.",
      },
      {
        title: "Load a photo and select a filter",
        body: "Open your image locally. Choose grayscale, sepia, vintage, blur, or vignette and preview the filtered result with the before/after slider on-device.",
      },
      {
        title: "Download or copy",
        body: "Export the filtered photo from your device or clipboard — ready for posts, prints, or confidential delivery.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to filter photos without uploading?",
      body: "Open Image Filters & Effects, load your photo, pick a preset, and export — privately, entirely on your device.",
      button: "Open Image Filters",
    },
  },
  "browser-based-image-processor": {
    eyebrow: "Browser-based · Client-side · No install",
    titleMain: "Browser-Based Image Processor",
    titleAccent: "Filter Presets in the Tab",
    heroSubtitle:
      "Use a browser-based image processor for photo filters — no desktop app, no extension, no upload queue. Open Pix-8 in your browser, load an image locally, apply grayscale, sepia, vintage, blur, or vignette on a client-side canvas, preview with a before/after slider, and export without sending pixels to a server.",
    primaryCta: "Process in Browser — Free",
    ctaNote: "No install · No upload · On-device",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Browser filter processing — not a desktop suite or cloud pipeline",
      body: "Pix-8 Image Filters & Effects is a browser-based image processor for filter presets — your photo is read locally and rendered on a client-side canvas in the tab, not ingested by a remote server first. Choose grayscale, sepia, vintage, blur, or vignette, compare with the before/after slider, then download or copy one flattened image. It does not crop, resize, batch folders, stack layers, or add pin-style annotation labels — for those workflows, use other Pix-8 tools built for each job.",
    },
    benefitsHeading: "Why use a browser-based image processor for filters?",
    benefitsIntro:
      "Desktop editors and cloud studios often require installs or uploads before you see a grade. Pix-8 runs in the browser tab — the practical fit when you need a ",
    benefitsKeyword: "browser-based image processor",
    benefitsIntroAfter:
      " for quick filter passes on stills without routing files off your device.",
    benefits: [
      {
        title: "No install required",
        body: "Open Image Filters & Effects in Chrome, Firefox, Safari, or Edge — filter processing runs on a client-side canvas without a desktop download.",
      },
      {
        title: "Process locally in the tab",
        body: "Your photo stays on your device from load to export. Pix-8 never receives your pixel data on a backend server.",
      },
      {
        title: "Five presets, one export",
        body: "Switch between grayscale, sepia, vintage, blur, and vignette, judge each look with the before/after slider, then download or copy one filtered file.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Filters & Effects",
        body: "Navigate to Pix-8 Image Filters in your browser — no install, no account, and no upload step.",
      },
      {
        title: "Load an image and select a preset",
        body: "Open your photo locally. Choose grayscale, sepia, vintage, blur, or vignette and preview the processed result with the before/after slider on-device.",
      },
      {
        title: "Download or copy",
        body: "Export the filtered image from your device or clipboard — ready for posts, prints, or client delivery.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to process filters in your browser?",
      body: "Open Image Filters & Effects, load your photo, pick a preset, and export — privately, entirely on your device.",
      button: "Open Image Filters",
    },
  },
  "professional-photo-filters-for-social-media": {
    eyebrow: "Social · Client-side · No upload",
    titleMain: "Professional Photo Filters for Social Media",
    titleAccent: "Post-Ready, On-Device",
    heroSubtitle:
      "Apply professional photo filters for social media in your browser — no upload, no account, no cloud queue. Load your image locally, grade with grayscale, sepia, vintage, blur, or vignette on a client-side canvas, preview with a before/after slider, and export one file you can post to feeds, stories, or team channels without sending pixels to a server.",
    primaryCta: "Filter for Social — Free",
    ctaNote: "No upload · No server · Share-ready export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Shareable filtered stills — not a social scheduler",
      body: "Pix-8 Image Filters & Effects helps you apply professional photo filters for social media by rendering grayscale, sepia, vintage, blur, or vignette on a client-side canvas — not a cloud studio that ingests your camera roll first. Compare each look with the before/after slider, then download or copy one flattened image. It does not publish to platforms, batch-schedule posts, watermark exports behind signup, or add pin-style annotation labels — for text on images, see Text Overlay.",
    },
    benefitsHeading: "Why use professional photo filters for social media in the browser?",
    benefitsIntro:
      "Social filter apps often upload every draft before you see a grade. Pix-8 processes locally — the practical fit when you need ",
    benefitsKeyword: "professional photo filters for social media",
    benefitsIntroAfter:
      " for feed posts, story stills, or brand content you want to export privately before uploading.",
    benefits: [
      {
        title: "Polished looks on-device",
        body: "Five presets render on a local canvas in your browser tab. Pix-8 never receives your pixel data on a backend server.",
      },
      {
        title: "Compare before you post",
        body: "Switch between grayscale, sepia, vintage, blur, and vignette and judge each social-ready grade with the live before/after slider.",
      },
      {
        title: "One export per session",
        body: "Download or copy one filtered photo to upload to your platform of choice, with optional EXIF metadata stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Filters & Effects",
        body: "Navigate to Pix-8 Image Filters in your browser — no install, no account, and no upload step.",
      },
      {
        title: "Load a photo and pick a social look",
        body: "Open your image locally. Select grayscale, sepia, vintage, blur, or vignette and preview the filtered result with the before/after slider on-device.",
      },
      {
        title: "Download or copy",
        body: "Export the filtered still to your device or clipboard — ready to upload to Instagram, LinkedIn, X, or any feed you manage.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for social-ready filters without uploading?",
      body: "Open Image Filters & Effects, load your photo, choose a preset, and export — privately, entirely on your device.",
      button: "Open Image Filters",
    },
  },
  "apply-stunning-effects-to-images": {
    eyebrow: "Effects · Client-side · No upload",
    titleMain: "Apply Stunning Effects to Images",
    titleAccent: "Mood Presets, Local Export",
    heroSubtitle:
      "Apply stunning effects to images in your browser — no upload, no account, no cloud queue. Load your image locally, try grayscale, sepia, vintage, blur, or vignette on a client-side canvas, preview each look with a before/after slider, and export without sending pictures to a remote server.",
    primaryCta: "Try Stunning Effects — Free",
    ctaNote: "No upload · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "Striking preset looks — not generative VFX",
      body: "Pix-8 Image Filters & Effects applies grayscale, sepia, vintage, blur, and vignette as single-click presets on a client-side canvas — not an AI effects engine or cloud style-transfer service. Drag the before/after divider to judge each dramatic grade against the original, then download or copy one flattened image. It does not animate GIFs, paint over photos, add decorative sticker overlays, or place pin-style annotation labels.",
    },
    benefitsHeading: "Why apply stunning effects to images in the browser?",
    benefitsIntro:
      "Effect apps often upload every image before you see a grade. Pix-8 processes locally — the direct fit when you need to ",
    benefitsKeyword: "apply stunning effects to images",
    benefitsIntroAfter:
      " for portfolio stills, editorial samples, or social posts without routing files off your device.",
    benefits: [
      {
        title: "Dramatic grades on-device",
        body: "Grayscale, sepia, vintage, blur, and vignette render on a local canvas in your browser tab. Pix-8 never receives your pixel data.",
      },
      {
        title: "Preview impact before export",
        body: "Switch between presets and judge each stunning direction with the live before/after slider.",
      },
      {
        title: "One look per export",
        body: "Download or copy one effected image per session, with optional EXIF metadata stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Filters & Effects",
        body: "Navigate to Pix-8 Image Filters in your browser — no install, no account, and no upload step.",
      },
      {
        title: "Load an image and pick an effect",
        body: "Open your photo locally. Select grayscale, sepia, vintage, blur, or vignette and preview the stunning effect with the before/after slider on-device.",
      },
      {
        title: "Download or copy",
        body: "Export the effected image to your device or clipboard — ready for portfolios, posts, or client proofs.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready for stunning effects without uploading?",
      body: "Open Image Filters & Effects, load your image, choose a preset, and export — privately, entirely on your device.",
      button: "Open Image Filters",
    },
  },
  "quick-photo-styler-online": {
    eyebrow: "Quick · Client-side · No upload",
    titleMain: "Quick Photo Styler Online",
    titleAccent: "One-Click Presets, Fast Export",
    heroSubtitle:
      "Use a quick photo styler online in your browser — no upload, no account, no cloud queue. Load your image locally, apply grayscale, sepia, vintage, blur, or vignette with a single click on a client-side canvas, preview with a before/after slider, and export without sending pictures to a remote server.",
    primaryCta: "Style a Photo — Free",
    ctaNote: "No upload · No server · Instant export",
    capabilitiesHeading: "What this tool does",
    featureCallout: {
      title: "One-click preset styling — not a manual grade editor",
      body: "Pix-8 Image Filters & Effects is a quick photo styler because each look applies in one click on a client-side canvas — not a cloud editor with sliders that ingests your file first. Load a photo, tap grayscale, sepia, vintage, blur, or vignette, drag the before/after divider to judge the style, then download or copy one flattened image. It does not offer HSL wheels, tone curves, batch folders, or pin-style annotation labels — speed comes from focused presets, not stripped-down pro tools.",
    },
    benefitsHeading: "Why use a quick photo styler online?",
    benefitsIntro:
      "Cloud stylers often queue your upload before you see a grade. Pix-8 styles on-device — the direct fit when you need a ",
    benefitsKeyword: "quick photo styler online",
    benefitsIntroAfter:
      " for a fast mood pass on a still before you post, print, or send a proof.",
    benefits: [
      {
        title: "Style in one click",
        body: "Five presets apply instantly on a local canvas — grayscale, sepia, vintage, blur, and vignette without routing your file through a server.",
      },
      {
        title: "No upload wait",
        body: "Your photo stays on your device from load to export. Pix-8 never receives your pixel data on a backend.",
      },
      {
        title: "Export and move on",
        body: "Download or copy one styled photo per session, with optional EXIF metadata stripping before you share.",
      },
    ],
    howItWorksHeading: "How it works",
    stepLabel: "Step",
    howItWorks: [
      {
        title: "Open Image Filters & Effects",
        body: "Navigate to Pix-8 Image Filters in your browser — no install, no account, and no upload step.",
      },
      {
        title: "Load a photo and pick a style",
        body: "Open your image locally. Click grayscale, sepia, vintage, blur, or vignette and preview the styled result with the before/after slider on-device.",
      },
      {
        title: "Download or copy",
        body: "Export the styled photo to your device or clipboard — ready for posts, prints, or client delivery.",
      },
    ],
    faqHeading: "Frequently asked questions",
    closingCta: {
      heading: "Ready to style a photo without uploading?",
      body: "Open Image Filters & Effects, load your image, choose a preset, and export — privately, entirely on your device.",
      button: "Open Image Filters",
    },
  },
};
