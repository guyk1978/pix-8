import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildFooterResourceRegistry,
  getFooterResources,
  resolveFooterResourceCategory,
} from "./footerResources";
import { IMAGE_ANNOTATOR_LANDINGS } from "./imageAnnotatorLandings";
import { IMAGE_ANNOTATOR_LANDINGS_HE } from "./imageAnnotatorLandings.he";
import { BACKGROUND_REMOVER_LANDINGS } from "./backgroundRemoverLandings";
import { RESIZER_LANDINGS } from "./resizerLandings";
import { CROPPER_ARTICLE, CROPPER_LANDINGS } from "./cropperLandings";
import { CUSTOM_CUTTER_ARTICLE, CUSTOM_CUTTER_LANDINGS } from "./customCutterLandings";
import { ROTATE_FLIP_ARTICLE } from "./rotateFlipLandings";
import { TEXT_OVERLAY_ARTICLE } from "./textOverlayLandings";
import { IMAGE_OVERLAY_ARTICLE } from "./imageOverlayLandings";
import { WATERMARK_ARTICLE } from "./watermarkLandings";
import { MEME_GENERATOR_ARTICLE } from "./memeGeneratorLandings";

const ANNOTATOR_TOOL_PATH = "/tools/editor-studio/image-annotator";
const BG_REMOVER_TOOL_PATH = "/tools/optimization/bg-remover";
const RESIZER_TOOL_PATH = "/tools/editor-studio/resizer";
const CROPPER_TOOL_PATH = "/tools/editor-studio/cropper";
const CUSTOM_CUTTER_TOOL_PATH = "/tools/editor-studio/custom-cutter";
const ROTATE_FLIP_TOOL_PATH = "/tools/editor-studio/rotate-flip";
const TEXT_OVERLAY_TOOL_PATH = "/tools/editor-studio/text-overlay";
const IMAGE_OVERLAY_TOOL_PATH = "/tools/editor-studio/image-overlay";
const WATERMARK_TOOL_PATH = "/tools/editor-studio/watermark";
const MEME_GENERATOR_TOOL_PATH = "/tools/editor-studio/meme-generator";
const ANNOTATE_LANDING_PATH =
  IMAGE_ANNOTATOR_LANDINGS["annotate-images-online-free"].path;
const DEV_LANDING_PATH =
  IMAGE_ANNOTATOR_LANDINGS["image-annotator-for-web-developers"].path;
const COMPRESSOR_TOOL_PATH = "/tools/optimization/compressor";

describe("resolveFooterResourceCategory", () => {
  it("returns annotator for Image Annotator tool URL", () => {
    assert.equal(resolveFooterResourceCategory(ANNOTATOR_TOOL_PATH), "annotator");
  });

  it("returns annotator for annotator landing page URLs", () => {
    assert.equal(resolveFooterResourceCategory(ANNOTATE_LANDING_PATH), "annotator");
    assert.equal(resolveFooterResourceCategory(DEV_LANDING_PATH), "annotator");
  });

  it("normalizes trailing slashes before resolving", () => {
    assert.equal(
      resolveFooterResourceCategory(`${ANNOTATE_LANDING_PATH}/`),
      "annotator",
    );
  });

  it("returns compressor for compressor tool URL", () => {
    assert.equal(resolveFooterResourceCategory(COMPRESSOR_TOOL_PATH), "compressor");
  });

  it("returns remover for Background Remover tool URL", () => {
    assert.equal(resolveFooterResourceCategory(BG_REMOVER_TOOL_PATH), "remover");
  });

  it("returns resizer for Resizer tool URL", () => {
    assert.equal(resolveFooterResourceCategory(RESIZER_TOOL_PATH), "resizer");
  });

  it("returns cropper for Cropper tool URL", () => {
    assert.equal(resolveFooterResourceCategory(CROPPER_TOOL_PATH), "cropper");
  });

  it("returns custom-cutter for Custom Cutter tool URL", () => {
    assert.equal(
      resolveFooterResourceCategory(CUSTOM_CUTTER_TOOL_PATH),
      "custom-cutter",
    );
  });

  it("returns rotate-flip for Rotate & Flip tool URL", () => {
    assert.equal(
      resolveFooterResourceCategory(ROTATE_FLIP_TOOL_PATH),
      "rotate-flip",
    );
  });

  it("returns text-overlay for Text Overlay tool URL", () => {
    assert.equal(
      resolveFooterResourceCategory(TEXT_OVERLAY_TOOL_PATH),
      "text-overlay",
    );
  });

  it("returns image-overlay for Image Overlay tool URL", () => {
    assert.equal(
      resolveFooterResourceCategory(IMAGE_OVERLAY_TOOL_PATH),
      "image-overlay",
    );
  });

  it("returns watermark for Watermark tool URL", () => {
    assert.equal(
      resolveFooterResourceCategory(WATERMARK_TOOL_PATH),
      "watermark",
    );
  });

  it("returns meme-generator for Meme Generator tool URL", () => {
    assert.equal(
      resolveFooterResourceCategory(MEME_GENERATOR_TOOL_PATH),
      "meme-generator",
    );
  });

  it("returns meme-generator for meme generator online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/meme-generator-online"),
      "meme-generator",
    );
  });

  it("returns meme-generator for make a meme online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/make-a-meme-online"),
      "meme-generator",
    );
  });

  it("returns meme-generator for free meme maker landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/free-meme-maker"),
      "meme-generator",
    );
  });

  it("returns meme-generator for create memes from photos landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/create-memes-from-photos"),
      "meme-generator",
    );
  });

  it("returns meme-generator for add text to memes online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/add-text-to-memes-online"),
      "meme-generator",
    );
  });

  it("returns meme-generator for make memes for social media landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/make-memes-for-social-media"),
      "meme-generator",
    );
  });

  it("returns meme-generator for fast meme creator landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/fast-meme-creator"),
      "meme-generator",
    );
  });

  it("returns meme-generator for custom meme maker landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/custom-meme-maker"),
      "meme-generator",
    );
  });

  it("returns meme-generator for client-side meme generator landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/client-side-meme-generator"),
      "meme-generator",
    );
  });

  it("returns meme-generator for privacy-first meme maker landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/privacy-first-meme-maker"),
      "meme-generator",
    );
  });

  it("returns meme-generator for browser-based meme generator landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/browser-based-meme-generator"),
      "meme-generator",
    );
  });

  it("returns meme-generator for no-upload meme creator landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/no-upload-meme-creator"),
      "meme-generator",
    );
  });

  it("returns meme-generator for upload and meme your photos landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/upload-and-meme-your-photos"),
      "meme-generator",
    );
  });

  it("returns meme-generator for easy meme editor for images landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/easy-meme-editor-for-images"),
      "meme-generator",
    );
  });

  it("returns meme-generator for professional meme creation tool landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/professional-meme-creation-tool"),
      "meme-generator",
    );
  });

  it("returns meme-generator for funny meme generator online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/funny-meme-generator-online"),
      "meme-generator",
    );
  });

  it("returns watermark for professional image watermarking tool landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/professional-image-watermarking-tool"),
      "watermark",
    );
  });

  it("returns watermark for no-upload watermark maker landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/no-upload-watermark-maker"),
      "watermark",
    );
  });

  it("returns watermark for brand photos with logo landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/brand-photos-with-logo"),
      "watermark",
    );
  });

  it("returns watermark for add watermark to photos online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/add-watermark-to-photos-online"),
      "watermark",
    );
  });

  it("returns watermark for add logo to image online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/add-logo-to-image-online"),
      "watermark",
    );
  });

  it("returns image-overlay for image layer editor online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/image-layer-editor-online"),
      "image-overlay",
    );
  });

  it("returns image-overlay for overlay images with transparency landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/overlay-images-with-transparency"),
      "image-overlay",
    );
  });

  it("returns image-overlay for combine two images online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/combine-two-images-online"),
      "image-overlay",
    );
  });

  it("returns image-overlay for privacy-focused image compositor landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/privacy-focused-image-compositor"),
      "image-overlay",
    );
  });

  it("returns image-overlay for browser-based image overlay landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/browser-based-image-overlay"),
      "image-overlay",
    );
  });

  it("returns image-overlay for client-side image overlay tool landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/client-side-image-overlay-tool"),
      "image-overlay",
    );
  });

  it("returns image-overlay for add transparent image overlay landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/add-transparent-image-overlay"),
      "image-overlay",
    );
  });

  it("returns image-overlay for add image overlay online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/add-image-overlay-online"),
      "image-overlay",
    );
  });

  it("returns image-overlay for overlay images online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/overlay-images-online"),
      "image-overlay",
    );
  });

  it("returns image-overlay for put one image over another landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/put-one-image-over-another"),
      "image-overlay",
    );
  });

  it("returns image-overlay for image merger tool landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/image-merger-tool"),
      "image-overlay",
    );
  });

  it("returns text-overlay for add text on image online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/add-text-on-image-online"),
      "text-overlay",
    );
  });

  it("returns text-overlay for image text adder landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/image-text-adder"),
      "text-overlay",
    );
  });

  it("returns text-overlay for add watermark to image online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/add-watermark-to-image-online"),
      "text-overlay",
    );
  });

  it("returns text-overlay for add text to photos for Instagram landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/add-text-to-photos-for-instagram"),
      "text-overlay",
    );
  });

  it("returns rotate-flip for rotate image online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/rotate-image-online"),
      "rotate-flip",
    );
  });

  it("returns rotate-flip for mirror image online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/mirror-image-online"),
      "rotate-flip",
    );
  });

  it("returns rotate-flip for free photo rotator and flipper landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/free-photo-rotator-and-flipper"),
      "rotate-flip",
    );
  });

  it("returns rotate-flip for flip photo horizontally and vertically landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        "/flip-photo-horizontally-and-vertically",
      ),
      "rotate-flip",
    );
  });

  it("returns rotate-flip for rotate image 90 degrees landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/rotate-image-90-degrees"),
      "rotate-flip",
    );
  });

  it("returns rotate-flip for fix upside down pictures online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/fix-upside-down-pictures-online"),
      "rotate-flip",
    );
  });

  it("returns rotate-flip for mirror selfie online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/mirror-selfie-online"),
      "rotate-flip",
    );
  });

  it("returns rotate-flip for batch rotate images online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/batch-rotate-images-online"),
      "rotate-flip",
    );
  });

  it("returns rotate-flip for lossless image rotation tool landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/lossless-image-rotation-tool"),
      "rotate-flip",
    );
  });

  it("returns rotate-flip for batch flip photos tool landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/batch-flip-photos-tool"),
      "rotate-flip",
    );
  });

  it("returns rotate-flip for client-side image rotator landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/client-side-image-rotator"),
      "rotate-flip",
    );
  });

  it("returns rotate-flip for no-upload photo flip tool landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/no-upload-photo-flip-tool"),
      "rotate-flip",
    );
  });

  it("returns rotate-flip for private browser image mirror landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/private-browser-image-mirror"),
      "rotate-flip",
    );
  });

  it("returns rotate-flip for secure image rotation online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/secure-image-rotation-online"),
      "rotate-flip",
    );
  });

  it("returns custom-cutter for custom image cutter landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        CUSTOM_CUTTER_LANDINGS["custom-image-cutter"].path,
      ),
      "custom-cutter",
    );
  });

  it("returns custom-cutter for freeform image cropping landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        CUSTOM_CUTTER_LANDINGS["freeform-image-cropping"].path,
      ),
      "custom-cutter",
    );
  });

  it("returns custom-cutter for cut out shapes from images landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        CUSTOM_CUTTER_LANDINGS["cut-out-shapes-from-images"].path,
      ),
      "custom-cutter",
    );
  });

  it("returns custom-cutter for custom shape photo cutter landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        CUSTOM_CUTTER_LANDINGS["custom-shape-photo-cutter"].path,
      ),
      "custom-cutter",
    );
  });

  it("returns custom-cutter for precision image cutter tool landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        CUSTOM_CUTTER_LANDINGS["precision-image-cutter-tool"].path,
      ),
      "custom-cutter",
    );
  });

  it("returns custom-cutter for client-side custom image cutter landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        CUSTOM_CUTTER_LANDINGS["client-side-custom-image-cutter"].path,
      ),
      "custom-cutter",
    );
  });

  it("returns custom-cutter for browser-based custom cropper landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        CUSTOM_CUTTER_LANDINGS["browser-based-custom-cropper"].path,
      ),
      "custom-cutter",
    );
  });

  it("returns custom-cutter for no-upload custom shape cutter landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        CUSTOM_CUTTER_LANDINGS["no-upload-custom-shape-cutter"].path,
      ),
      "custom-cutter",
    );
  });

  it("returns custom-cutter for cut image to custom size landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        CUSTOM_CUTTER_LANDINGS["cut-image-to-custom-size"].path,
      ),
      "custom-cutter",
    );
  });

  it("returns custom-cutter for custom crop for digital design landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        CUSTOM_CUTTER_LANDINGS["custom-crop-for-digital-design"].path,
      ),
      "custom-cutter",
    );
  });

  it("returns custom-cutter for easy custom photo cutter landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        CUSTOM_CUTTER_LANDINGS["easy-custom-photo-cutter"].path,
      ),
      "custom-cutter",
    );
  });

  it("returns custom-cutter for creative image cutting tool landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        CUSTOM_CUTTER_LANDINGS["creative-image-cutting-tool"].path,
      ),
      "custom-cutter",
    );
  });

  it("returns cropper for crop image online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        CROPPER_LANDINGS["crop-image-online"].path,
      ),
      "cropper",
    );
  });

  it("returns cropper for free image cropper landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        CROPPER_LANDINGS["free-image-cropper"].path,
      ),
      "cropper",
    );
  });

  it("returns cropper for crop photos to size landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        CROPPER_LANDINGS["crop-photos-to-size"].path,
      ),
      "cropper",
    );
  });

  it("returns cropper for image cutter online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        CROPPER_LANDINGS["image-cutter-online"].path,
      ),
      "cropper",
    );
  });

  it("returns cropper for crop image to square landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        CROPPER_LANDINGS["crop-image-to-square"].path,
      ),
      "cropper",
    );
  });

  it("returns cropper for crop image to 16:9 landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        CROPPER_LANDINGS["crop-image-to-16-9"].path,
      ),
      "cropper",
    );
  });

  it("returns cropper for crop image to 4:3 landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        CROPPER_LANDINGS["crop-image-to-4-3"].path,
      ),
      "cropper",
    );
  });

  it("returns cropper for free aspect ratio image cropper landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        CROPPER_LANDINGS["free-aspect-ratio-image-cropper"].path,
      ),
      "cropper",
    );
  });

  it("returns cropper for crop image without quality loss landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        CROPPER_LANDINGS["crop-image-without-quality-loss"].path,
      ),
      "cropper",
    );
  });

  it("returns cropper for precision image cropper landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        CROPPER_LANDINGS["precision-image-cropper"].path,
      ),
      "cropper",
    );
  });

  it("returns cropper for crop image for ecommerce product photos landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        CROPPER_LANDINGS["crop-image-for-ecommerce-product-photos"].path,
      ),
      "cropper",
    );
  });

  it("returns cropper for professional photo cropper landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        CROPPER_LANDINGS["professional-photo-cropper"].path,
      ),
      "cropper",
    );
  });

  it("returns cropper for client-side image cropper landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        CROPPER_LANDINGS["client-side-image-cropper"].path,
      ),
      "cropper",
    );
  });

  it("returns cropper for privacy-focused image cutter landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        CROPPER_LANDINGS["privacy-focused-image-cutter"].path,
      ),
      "cropper",
    );
  });

  it("returns cropper for no-upload image cropper landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        CROPPER_LANDINGS["no-upload-image-cropper"].path,
      ),
      "cropper",
    );
  });

  it("returns cropper for browser-based image cropper tool landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        CROPPER_LANDINGS["browser-based-image-cropper-tool"].path,
      ),
      "cropper",
    );
  });

  it("returns resizer for resize image online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        RESIZER_LANDINGS["resize-image-online"].path,
      ),
      "resizer",
    );
  });

  it("returns resizer for change image dimensions landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        RESIZER_LANDINGS["change-image-dimensions"].path,
      ),
      "resizer",
    );
  });

  it("returns resizer for image resizer free landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        RESIZER_LANDINGS["image-resizer-free"].path,
      ),
      "resizer",
    );
  });

  it("returns resizer for batch image resizer landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        RESIZER_LANDINGS["batch-image-resizer"].path,
      ),
      "resizer",
    );
  });

  it("returns resizer for resize image for Instagram landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        RESIZER_LANDINGS["resize-image-for-instagram"].path,
      ),
      "resizer",
    );
  });

  it("returns resizer for LinkedIn profile image resizer landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        RESIZER_LANDINGS["image-resizer-for-linkedin-profile"].path,
      ),
      "resizer",
    );
  });

  it("returns resizer for Facebook cover resize landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        RESIZER_LANDINGS["resize-photos-for-facebook-covers"].path,
      ),
      "resizer",
    );
  });

  it("returns resizer for social media image dimensions landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        RESIZER_LANDINGS["image-dimensions-for-social-media"].path,
      ),
      "resizer",
    );
  });

  it("returns resizer for resize image to pixels landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        RESIZER_LANDINGS["resize-image-to-pixels"].path,
      ),
      "resizer",
    );
  });

  it("returns resizer for maintain aspect ratio image resizer landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        RESIZER_LANDINGS["maintain-aspect-ratio-image-resizer"].path,
      ),
      "resizer",
    );
  });

  it("returns resizer for resize image without quality loss landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        RESIZER_LANDINGS["resize-image-without-quality-loss"].path,
      ),
      "resizer",
    );
  });

  it("returns resizer for web developers image resizer landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        RESIZER_LANDINGS["image-resizer-for-web-developers"].path,
      ),
      "resizer",
    );
  });

  it("returns resizer for client-side image resizer landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        RESIZER_LANDINGS["client-side-image-resizer"].path,
      ),
      "resizer",
    );
  });

  it("returns resizer for privacy-focused photo resizer landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        RESIZER_LANDINGS["privacy-focused-photo-resizer"].path,
      ),
      "resizer",
    );
  });

  it("returns resizer for no-upload image resizer landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        RESIZER_LANDINGS["no-upload-image-resizer"].path,
      ),
      "resizer",
    );
  });

  it("returns resizer for browser-based photo resizer landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        RESIZER_LANDINGS["browser-based-photo-resizer"].path,
      ),
      "resizer",
    );
  });

  it("returns null for unknown URLs", () => {
    assert.equal(resolveFooterResourceCategory("/"), null);
    assert.equal(resolveFooterResourceCategory("/blog"), null);
    assert.equal(resolveFooterResourceCategory("/not-a-real-page"), null);
  });

  it("returns annotator for documentation landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        IMAGE_ANNOTATOR_LANDINGS["annotate-images-for-documentation"].path,
      ),
      "annotator",
    );
  });

  it("returns annotator for remote teams landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        IMAGE_ANNOTATOR_LANDINGS["image-markup-for-remote-teams"].path,
      ),
      "annotator",
    );
  });

  it("returns annotator for designers landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        IMAGE_ANNOTATOR_LANDINGS["screenshot-annotation-tool-for-designers"].path,
      ),
      "annotator",
    );
  });

  it("returns annotator for marketing teams landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        IMAGE_ANNOTATOR_LANDINGS["fast-image-editor-for-marketing-teams"].path,
      ),
      "annotator",
    );
  });

  it("returns annotator for browser-based landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        IMAGE_ANNOTATOR_LANDINGS["browser-based-image-annotator"].path,
      ),
      "annotator",
    );
  });

  it("returns annotator for client-side editor landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        IMAGE_ANNOTATOR_LANDINGS["client-side-image-editor"].path,
      ),
      "annotator",
    );
  });

  it("returns annotator for privacy-focused editor landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        IMAGE_ANNOTATOR_LANDINGS["privacy-focused-image-editor"].path,
      ),
      "annotator",
    );
  });

  it("returns annotator for no-install annotation landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        IMAGE_ANNOTATOR_LANDINGS["no-install-image-annotation-tool"].path,
      ),
      "annotator",
    );
  });

  it("returns annotator for lightweight markup landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        IMAGE_ANNOTATOR_LANDINGS["lightweight-image-markup-tool"].path,
      ),
      "annotator",
    );
  });

  it("returns remover for remove background online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        BACKGROUND_REMOVER_LANDINGS["remove-background-from-image-online"].path,
      ),
      "remover",
    );
  });

  it("returns remover for transparent background maker landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        BACKGROUND_REMOVER_LANDINGS["transparent-background-maker"].path,
      ),
      "remover",
    );
  });

  it("returns remover for remove image background free landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        BACKGROUND_REMOVER_LANDINGS["remove-image-background-free"].path,
      ),
      "remover",
    );
  });

  it("returns remover for erase background online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        BACKGROUND_REMOVER_LANDINGS["erase-background-online"].path,
      ),
      "remover",
    );
  });

  it("returns remover for e-commerce background remover landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        BACKGROUND_REMOVER_LANDINGS["background-remover-for-ecommerce"].path,
      ),
      "remover",
    );
  });

  it("returns remover for marketing graphics landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        BACKGROUND_REMOVER_LANDINGS["remove-background-for-marketing-graphics"].path,
      ),
      "remover",
    );
  });

  it("returns remover for social media photos landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        BACKGROUND_REMOVER_LANDINGS["background-eraser-for-social-media-photos"].path,
      ),
      "remover",
    );
  });

  it("returns remover for photographers landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        BACKGROUND_REMOVER_LANDINGS["professional-background-removal-for-photographers"].path,
      ),
      "remover",
    );
  });

  it("returns remover for client-side background remover landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        BACKGROUND_REMOVER_LANDINGS["client-side-background-remover"].path,
      ),
      "remover",
    );
  });

  it("returns remover for browser-based background eraser landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        BACKGROUND_REMOVER_LANDINGS["browser-based-background-eraser"].path,
      ),
      "remover",
    );
  });

  it("returns remover for no-upload image background remover landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        BACKGROUND_REMOVER_LANDINGS["no-upload-image-background-remover"].path,
      ),
      "remover",
    );
  });

  it("returns remover for privacy-first background removal tool landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        BACKGROUND_REMOVER_LANDINGS["privacy-first-background-removal-tool"].path,
      ),
      "remover",
    );
  });
});

describe("getFooterResources", () => {
  const annotatorEntries = buildFooterResourceRegistry("en").filter(
    (entry) => entry.category === "annotator",
  );

  it("returns annotator links sorted by priority ascending", () => {
    const links = getFooterResources("annotator", { limit: 20 });
    const priorities = links.map(
      (link) =>
        buildFooterResourceRegistry("en").find((entry) => entry.href === link.href)!
          .priority,
    );

    for (let index = 1; index < priorities.length; index += 1) {
      assert.ok(
        priorities[index] >= priorities[index - 1],
        "expected non-decreasing priority order",
      );
    }
  });

  it("returns all annotator links by default (no cap)", () => {
    const links = getFooterResources("annotator");
    assert.equal(links.length, annotatorEntries.length);
  });

  it("respects a custom limit", () => {
    const links = getFooterResources("annotator", { limit: 3 });
    assert.equal(links.length, 3);
  });

  it("excludes the current page path from results", () => {
    const links = getFooterResources("annotator", {
      currentPath: ANNOTATE_LANDING_PATH,
      limit: 20,
    });

    assert.ok(
      links.every((link) => link.href !== ANNOTATE_LANDING_PATH),
      "current landing page should be excluded",
    );
    assert.equal(links.length, annotatorEntries.length - 1);
  });

  it("excludes current path when it has a trailing slash", () => {
    const links = getFooterResources("annotator", {
      currentPath: `${DEV_LANDING_PATH}/`,
      limit: 20,
    });

    assert.ok(links.every((link) => link.href !== DEV_LANDING_PATH));
  });

  it("returns highest-priority links first when limited", () => {
    const links = getFooterResources("annotator", { limit: 2 });
    assert.deepEqual(links.map((link) => link.href), [
      IMAGE_ANNOTATOR_LANDINGS["annotate-images-online-free"].path,
      IMAGE_ANNOTATOR_LANDINGS["image-annotator-for-web-developers"].path,
    ]);
  });

  it("returns an empty array for categories with no registry entries", () => {
    assert.deepEqual(getFooterResources("compressor"), []);
  });

  it("returns custom-cutter landing and guide links", () => {
    const links = getFooterResources("custom-cutter");
    assert.equal(links.length, 13);
    assert.equal(
      links[0]?.href,
      CUSTOM_CUTTER_LANDINGS["custom-image-cutter"].path,
    );
    assert.equal(
      links[1]?.href,
      CUSTOM_CUTTER_LANDINGS["freeform-image-cropping"].path,
    );
    assert.equal(
      links[2]?.href,
      CUSTOM_CUTTER_LANDINGS["cut-out-shapes-from-images"].path,
    );
    assert.equal(
      links[3]?.href,
      CUSTOM_CUTTER_LANDINGS["custom-shape-photo-cutter"].path,
    );
    assert.equal(
      links[4]?.href,
      CUSTOM_CUTTER_LANDINGS["precision-image-cutter-tool"].path,
    );
    assert.equal(
      links[5]?.href,
      CUSTOM_CUTTER_LANDINGS["client-side-custom-image-cutter"].path,
    );
    assert.equal(
      links[6]?.href,
      CUSTOM_CUTTER_LANDINGS["browser-based-custom-cropper"].path,
    );
    assert.equal(
      links[7]?.href,
      CUSTOM_CUTTER_LANDINGS["no-upload-custom-shape-cutter"].path,
    );
    assert.equal(
      links[8]?.href,
      CUSTOM_CUTTER_LANDINGS["cut-image-to-custom-size"].path,
    );
    assert.equal(
      links[9]?.href,
      CUSTOM_CUTTER_LANDINGS["custom-crop-for-digital-design"].path,
    );
    assert.equal(
      links[10]?.href,
      CUSTOM_CUTTER_LANDINGS["easy-custom-photo-cutter"].path,
    );
    assert.equal(
      links[11]?.href,
      CUSTOM_CUTTER_LANDINGS["creative-image-cutting-tool"].path,
    );
    assert.equal(links[12]?.href, CUSTOM_CUTTER_ARTICLE.href);
  });

  it("returns rotate-flip landing and guide links", () => {
    const links = getFooterResources("rotate-flip");
    assert.equal(links.length, 16);
    assert.equal(links[0]?.href, "/rotate-image-online");
    assert.equal(links[1]?.href, "/flip-image-online");
    assert.equal(links[2]?.href, "/mirror-image-online");
    assert.equal(links[3]?.href, "/free-photo-rotator-and-flipper");
    assert.equal(links[4]?.href, "/flip-photo-horizontally-and-vertically");
    assert.equal(links[5]?.href, "/rotate-image-90-degrees");
    assert.equal(links[6]?.href, "/fix-upside-down-pictures-online");
    assert.equal(links[7]?.href, "/mirror-selfie-online");
    assert.equal(links[8]?.href, "/batch-rotate-images-online");
    assert.equal(links[9]?.href, "/lossless-image-rotation-tool");
    assert.equal(links[10]?.href, "/batch-flip-photos-tool");
    assert.equal(links[11]?.href, "/client-side-image-rotator");
    assert.equal(links[12]?.href, "/no-upload-photo-flip-tool");
    assert.equal(links[13]?.href, "/private-browser-image-mirror");
    assert.equal(links[14]?.href, "/secure-image-rotation-online");
    assert.equal(links[15]?.href, ROTATE_FLIP_ARTICLE.href);
  });

  it("returns text-overlay landing and guide links", () => {
    const links = getFooterResources("text-overlay");
    assert.equal(links.length, 13);
    assert.equal(links[0]?.href, "/add-text-on-image-online");
    assert.equal(links[1]?.href, "/write-on-photo-online");
    assert.equal(links[2]?.href, "/add-watermark-to-image-online");
    assert.equal(links[3]?.href, "/free-text-over-image-tool");
    assert.equal(links[4]?.href, "/image-text-adder");
    assert.equal(links[5]?.href, "/add-text-to-photos-for-instagram");
    assert.equal(links[6]?.href, "/add-captions-to-images-online");
    assert.equal(links[7]?.href, "/add-logo-or-text-to-images");
    assert.equal(links[8]?.href, "/client-side-text-overlay-tool");
    assert.equal(links[9]?.href, "/add-text-to-image-with-fonts");
    assert.equal(links[10]?.href, "/custom-text-placement-on-image");
    assert.equal(links[11]?.href, TEXT_OVERLAY_ARTICLE.href);
    assert.equal(links[12]?.href, "/professional-text-overlay-editor");
  });

  it("returns image-overlay landing and guide links", () => {
    const links = getFooterResources("image-overlay");
    assert.equal(links.length, 12);
    assert.equal(links[0]?.href, "/add-image-overlay-online");
    assert.equal(links[1]?.href, "/overlay-images-online");
    assert.equal(links[2]?.href, "/put-one-image-over-another");
    assert.equal(links[3]?.href, "/image-merger-tool");
    assert.equal(links[4]?.href, "/add-transparent-image-overlay");
    assert.equal(links[5]?.href, "/client-side-image-overlay-tool");
    assert.equal(links[6]?.href, "/browser-based-image-overlay");
    assert.equal(links[7]?.href, "/privacy-focused-image-compositor");
    assert.equal(links[8]?.href, "/combine-two-images-online");
    assert.equal(links[9]?.href, "/overlay-images-with-transparency");
    assert.equal(links[10]?.href, "/image-layer-editor-online");
    assert.equal(links[11]?.href, IMAGE_OVERLAY_ARTICLE.href);
  });

  it("returns watermark landing and guide links", () => {
    const links = getFooterResources("watermark");
    assert.equal(links.length, 6);
    assert.equal(links[0]?.href, "/add-logo-to-image-online");
    assert.equal(links[1]?.href, "/add-watermark-to-photos-online");
    assert.equal(links[2]?.href, "/brand-photos-with-logo");
    assert.equal(links[3]?.href, "/no-upload-watermark-maker");
    assert.equal(links[4]?.href, "/professional-image-watermarking-tool");
    assert.equal(links[5]?.href, WATERMARK_ARTICLE.href);
  });

  it("returns meme-generator landing and guide links", () => {
    const links = getFooterResources("meme-generator");
    assert.equal(links.length, 17);
    assert.equal(links[0]?.href, "/meme-generator-online");
    assert.equal(links[1]?.href, "/make-a-meme-online");
    assert.equal(links[2]?.href, "/free-meme-maker");
    assert.equal(links[3]?.href, "/create-memes-from-photos");
    assert.equal(links[4]?.href, "/add-text-to-memes-online");
    assert.equal(links[5]?.href, "/make-memes-for-social-media");
    assert.equal(links[6]?.href, "/fast-meme-creator");
    assert.equal(links[7]?.href, "/custom-meme-maker");
    assert.equal(links[8]?.href, "/client-side-meme-generator");
    assert.equal(links[9]?.href, "/privacy-first-meme-maker");
    assert.equal(links[10]?.href, "/browser-based-meme-generator");
    assert.equal(links[11]?.href, "/no-upload-meme-creator");
    assert.equal(links[12]?.href, "/upload-and-meme-your-photos");
    assert.equal(links[13]?.href, "/easy-meme-editor-for-images");
    assert.equal(links[14]?.href, "/professional-meme-creation-tool");
    assert.equal(links[15]?.href, "/funny-meme-generator-online");
    assert.equal(links[16]?.href, MEME_GENERATOR_ARTICLE.href);
  });

  it("returns resizer landing and guide links", () => {
    const links = getFooterResources("resizer");
    assert.equal(links.length, 17);
    assert.equal(
      links[0]?.href,
      RESIZER_LANDINGS["resize-image-online"].path,
    );
    assert.equal(
      links[1]?.href,
      RESIZER_LANDINGS["change-image-dimensions"].path,
    );
    assert.equal(
      links[2]?.href,
      RESIZER_LANDINGS["image-resizer-free"].path,
    );
    assert.equal(
      links[3]?.href,
      RESIZER_LANDINGS["batch-image-resizer"].path,
    );
    assert.equal(
      links[4]?.href,
      RESIZER_LANDINGS["resize-image-for-instagram"].path,
    );
    assert.equal(
      links[5]?.href,
      RESIZER_LANDINGS["image-resizer-for-linkedin-profile"].path,
    );
    assert.equal(
      links[6]?.href,
      RESIZER_LANDINGS["resize-photos-for-facebook-covers"].path,
    );
    assert.equal(
      links[7]?.href,
      RESIZER_LANDINGS["image-dimensions-for-social-media"].path,
    );
    assert.equal(
      links[8]?.href,
      RESIZER_LANDINGS["resize-image-to-pixels"].path,
    );
    assert.equal(
      links[9]?.href,
      RESIZER_LANDINGS["maintain-aspect-ratio-image-resizer"].path,
    );
    assert.equal(
      links[10]?.href,
      RESIZER_LANDINGS["resize-image-without-quality-loss"].path,
    );
    assert.equal(
      links[11]?.href,
      RESIZER_LANDINGS["image-resizer-for-web-developers"].path,
    );
    assert.equal(
      links[12]?.href,
      RESIZER_LANDINGS["client-side-image-resizer"].path,
    );
    assert.equal(
      links[13]?.href,
      RESIZER_LANDINGS["privacy-focused-photo-resizer"].path,
    );
    assert.equal(
      links[14]?.href,
      RESIZER_LANDINGS["no-upload-image-resizer"].path,
    );
    assert.equal(
      links[15]?.href,
      RESIZER_LANDINGS["browser-based-photo-resizer"].path,
    );
    assert.equal(links[16]?.href, "/articles/privacy-and-speed-local-resizing");
  });

  it("returns cropper landing and guide links", () => {
    const links = getFooterResources("cropper");
    assert.equal(links.length, 17);
    assert.equal(
      links[0]?.href,
      CROPPER_LANDINGS["crop-image-online"].path,
    );
    assert.equal(
      links[1]?.href,
      CROPPER_LANDINGS["free-image-cropper"].path,
    );
    assert.equal(
      links[2]?.href,
      CROPPER_LANDINGS["crop-photos-to-size"].path,
    );
    assert.equal(
      links[3]?.href,
      CROPPER_LANDINGS["image-cutter-online"].path,
    );
    assert.equal(
      links[4]?.href,
      CROPPER_LANDINGS["crop-image-to-square"].path,
    );
    assert.equal(
      links[5]?.href,
      CROPPER_LANDINGS["crop-image-to-16-9"].path,
    );
    assert.equal(
      links[6]?.href,
      CROPPER_LANDINGS["crop-image-to-4-3"].path,
    );
    assert.equal(
      links[7]?.href,
      CROPPER_LANDINGS["free-aspect-ratio-image-cropper"].path,
    );
    assert.equal(
      links[8]?.href,
      CROPPER_LANDINGS["crop-image-without-quality-loss"].path,
    );
    assert.equal(
      links[9]?.href,
      CROPPER_LANDINGS["precision-image-cropper"].path,
    );
    assert.equal(
      links[10]?.href,
      CROPPER_LANDINGS["crop-image-for-ecommerce-product-photos"].path,
    );
    assert.equal(
      links[11]?.href,
      CROPPER_LANDINGS["professional-photo-cropper"].path,
    );
    assert.equal(
      links[12]?.href,
      CROPPER_LANDINGS["client-side-image-cropper"].path,
    );
    assert.equal(
      links[13]?.href,
      CROPPER_LANDINGS["privacy-focused-image-cutter"].path,
    );
    assert.equal(
      links[14]?.href,
      CROPPER_LANDINGS["no-upload-image-cropper"].path,
    );
    assert.equal(
      links[15]?.href,
      CROPPER_LANDINGS["browser-based-image-cropper-tool"].path,
    );
    assert.equal(links[16]?.href, CROPPER_ARTICLE.href);
  });

  it("returns remover landing and guide links", () => {
    const links = getFooterResources("remover");
    assert.equal(links.length, 13);
    assert.equal(
      links[0]?.href,
      BACKGROUND_REMOVER_LANDINGS["remove-background-from-image-online"].path,
    );
    assert.equal(
      links[1]?.href,
      BACKGROUND_REMOVER_LANDINGS["transparent-background-maker"].path,
    );
    assert.equal(
      links[2]?.href,
      BACKGROUND_REMOVER_LANDINGS["remove-image-background-free"].path,
    );
    assert.equal(
      links[3]?.href,
      BACKGROUND_REMOVER_LANDINGS["erase-background-online"].path,
    );
    assert.equal(
      links[4]?.href,
      BACKGROUND_REMOVER_LANDINGS["background-remover-for-ecommerce"].path,
    );
    assert.equal(
      links[5]?.href,
      BACKGROUND_REMOVER_LANDINGS["remove-background-for-marketing-graphics"].path,
    );
    assert.equal(
      links[6]?.href,
      BACKGROUND_REMOVER_LANDINGS["background-eraser-for-social-media-photos"].path,
    );
    assert.equal(
      links[7]?.href,
      BACKGROUND_REMOVER_LANDINGS["professional-background-removal-for-photographers"].path,
    );
    assert.equal(
      links[8]?.href,
      BACKGROUND_REMOVER_LANDINGS["client-side-background-remover"].path,
    );
    assert.equal(
      links[9]?.href,
      BACKGROUND_REMOVER_LANDINGS["browser-based-background-eraser"].path,
    );
    assert.equal(links[10]?.href, "/articles/privacy-first-background-removal");
    assert.equal(
      links[11]?.href,
      BACKGROUND_REMOVER_LANDINGS["no-upload-image-background-remover"].path,
    );
    assert.equal(
      links[12]?.href,
      BACKGROUND_REMOVER_LANDINGS["privacy-first-background-removal-tool"].path,
    );
  });

  it("returns Hebrew labels when locale is he", () => {
    const links = getFooterResources("annotator", { locale: "he", limit: 1 });
    assert.equal(links[0]?.label, IMAGE_ANNOTATOR_LANDINGS_HE["annotate-images-online-free"].linkTitle);
  });

  it("does not duplicate hrefs in annotator registry", () => {
    const hrefs = buildFooterResourceRegistry("en")
      .filter((entry) => entry.category === "annotator")
      .map((entry) => entry.href);
    assert.equal(hrefs.length, new Set(hrefs).size);
  });
});
