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
import { IMAGE_COLLAGE_ARTICLE } from "./imageCollageLandings";
import { IMAGE_FILTERS_ARTICLE } from "./imagefiltersLandings";
import { MAGNIFIER_ARTICLE } from "./magnifierLandings";
import { BASE64_ENCODER_ARTICLE } from "./base64encoderLandings";
import { IMAGE_TO_SVG_ARTICLE } from "./imagetosvgLandings";
import { PALETTE_EXTRACTOR_ARTICLE } from "./paletteextractorLandings";
import { PALETTE_EXTRACTOR_LANDINGS } from "./paletteextractorLandings";
import { COLOR_PICKER_ARTICLE } from "./colorpickerLandings";
import { COLOR_PICKER_LANDINGS } from "./colorpickerLandings";
import { CSS_PALETTE_GEN_ARTICLE } from "./csspalettegenLandings";
import { CSS_PALETTE_GEN_LANDINGS } from "./csspalettegenLandings";

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
const IMAGE_COLLAGE_TOOL_PATH = "/tools/editor-studio/image-collage";
const IMAGE_FILTERS_TOOL_PATH = "/tools/editor-studio/image-filters";
const MAGNIFIER_TOOL_PATH = "/tools/editor-studio/magnifier";
const BASE64_ENCODER_TOOL_PATH = "/tools/dev-tools/base64-encoder";
const IMAGE_TO_SVG_TOOL_PATH = "/tools/dev-tools/image-to-svg";
const PALETTE_EXTRACTOR_TOOL_PATH = "/tools/dev-tools/palette-extractor";
const COLOR_PICKER_TOOL_PATH = "/tools/dev-tools/color-picker";
const CSS_PALETTE_GEN_TOOL_PATH = "/tools/dev-tools/css-palette-gen";
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

  it("returns image-collage for Image Collage Maker tool URL", () => {
    assert.equal(
      resolveFooterResourceCategory(IMAGE_COLLAGE_TOOL_PATH),
      "image-collage",
    );
  });

  it("returns image-collage for image collage maker online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/image-collage-maker-online"),
      "image-collage",
    );
  });

  it("returns image-collage for photo collage creator landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/photo-collage-creator"),
      "image-collage",
    );
  });

  it("returns image-collage for make a photo collage free landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/make-a-photo-collage-free"),
      "image-collage",
    );
  });

  it("returns image-collage for online collage tool landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/online-collage-tool"),
      "image-collage",
    );
  });

  it("returns image-collage for create photo collage for Instagram landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/create-photo-collage-for-instagram"),
      "image-collage",
    );
  });

  it("returns image-collage for combine photos into one image landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/combine-photos-into-one-image"),
      "image-collage",
    );
  });

  it("returns image-collage for layout photo collage tool landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/layout-photo-collage-tool"),
      "image-collage",
    );
  });

  it("returns image-collage for grid photo collage maker landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/grid-photo-collage-maker"),
      "image-collage",
    );
  });

  it("returns image-collage for client-side photo collage maker landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/client-side-photo-collage-maker"),
      "image-collage",
    );
  });

  it("returns image-collage for no-upload collage maker landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/no-upload-collage-maker"),
      "image-collage",
    );
  });

  it("returns image-collage for browser-based photo layout tool landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/browser-based-photo-layout-tool"),
      "image-collage",
    );
  });

  it("returns image-collage for privacy-focused image combiner landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/privacy-focused-image-combiner"),
      "image-collage",
    );
  });

  it("returns image-collage for custom photo collage layout landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/custom-photo-collage-layout"),
      "image-collage",
    );
  });

  it("returns image-collage for professional collage maker online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/professional-collage-maker-online"),
      "image-collage",
    );
  });

  it("returns image-collage for high-resolution photo collage creator landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/high-resolution-photo-collage-creator"),
      "image-collage",
    );
  });

  it("returns image-collage for easy image grid maker landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/easy-image-grid-maker"),
      "image-collage",
    );
  });

  it("returns image-filters for Image Filters & Effects tool URL", () => {
    assert.equal(
      resolveFooterResourceCategory(IMAGE_FILTERS_TOOL_PATH),
      "image-filters",
    );
  });

  it("returns image-filters for add image filters online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/add-image-filters-online"),
      "image-filters",
    );
  });

  it("returns image-filters for photo effects online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/photo-effects-online"),
      "image-filters",
    );
  });

  it("returns image-filters for free image filter tool landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/free-image-filter-tool"),
      "image-filters",
    );
  });

  it("returns image-filters for apply filters to photos landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/apply-filters-to-photos"),
      "image-filters",
    );
  });

  it("returns image-filters for vintage photo filters online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/vintage-photo-filters-online"),
      "image-filters",
    );
  });

  it("returns image-filters for black and white photo effect landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/black-and-white-photo-effect"),
      "image-filters",
    );
  });

  it("returns image-filters for apply artistic effects to photos landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/apply-artistic-effects-to-photos"),
      "image-filters",
    );
  });

  it("returns image-filters for enhance photo colors online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/enhance-photo-colors-online"),
      "image-filters",
    );
  });

  it("returns image-filters for client-side image filters landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/client-side-image-filters"),
      "image-filters",
    );
  });

  it("returns image-filters for no-upload photo effects editor landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/no-upload-photo-effects-editor"),
      "image-filters",
    );
  });

  it("returns image-filters for privacy-first photo filter tool landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/privacy-first-photo-filter-tool"),
      "image-filters",
    );
  });

  it("returns image-filters for browser-based image processor landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/browser-based-image-processor"),
      "image-filters",
    );
  });

  it("returns image-filters for professional photo filters for social media landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        "/professional-photo-filters-for-social-media",
      ),
      "image-filters",
    );
  });

  it("returns image-filters for apply stunning effects to images landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/apply-stunning-effects-to-images"),
      "image-filters",
    );
  });

  it("returns image-filters for quick photo styler online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/quick-photo-styler-online"),
      "image-filters",
    );
  });

  it("returns image-magnifier for Image Magnifier tool URL", () => {
    assert.equal(
      resolveFooterResourceCategory(MAGNIFIER_TOOL_PATH),
      "image-magnifier",
    );
  });

  it("returns image-magnifier for photo zoom tool landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/photo-zoom-tool"),
      "image-magnifier",
    );
  });

  it("returns image-magnifier for inspect image details online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/inspect-image-details-online"),
      "image-magnifier",
    );
  });

  it("returns image-magnifier for free image magnifier landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/free-image-magnifier"),
      "image-magnifier",
    );
  });

  it("returns image-magnifier for high-resolution image inspector landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/high-resolution-image-inspector"),
      "image-magnifier",
    );
  });

  it("returns image-magnifier for pixel-perfect image viewer landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/pixel-perfect-image-viewer"),
      "image-magnifier",
    );
  });

  it("returns image-magnifier for examine photo details online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/examine-photo-details-online"),
      "image-magnifier",
    );
  });

  it("returns image-magnifier for magnify image for design review landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/magnify-image-for-design-review"),
      "image-magnifier",
    );
  });

  it("returns image-magnifier for client-side image magnifier landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/client-side-image-magnifier"),
      "image-magnifier",
    );
  });

  it("returns image-magnifier for privacy-first photo zoom tool landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/privacy-first-photo-zoom-tool"),
      "image-magnifier",
    );
  });

  it("returns image-magnifier for no-upload image inspector landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/no-upload-image-inspector"),
      "image-magnifier",
    );
  });

  it("returns image-magnifier for browser magnifying glass for photos landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/browser-magnifying-glass-for-photos"),
      "image-magnifier",
    );
  });

  it("returns image-magnifier for zoom into photo online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/zoom-into-photo-online"),
      "image-magnifier",
    );
  });

  it("returns image-magnifier for detailed image viewer tool landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/detailed-image-viewer-tool"),
      "image-magnifier",
    );
  });

  it("returns image-magnifier for magnify small text on images landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/magnify-small-text-on-images"),
      "image-magnifier",
    );
  });

  it("returns base64-encoder for Base64 Encoder tool URL", () => {
    assert.equal(
      resolveFooterResourceCategory(BASE64_ENCODER_TOOL_PATH),
      "base64-encoder",
    );
  });

  it("returns base64-encoder for base64 encoder online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/base64-encoder-online"),
      "base64-encoder",
    );
  });

  it("returns base64-encoder for base64 decoder online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/base64-decoder-online"),
      "base64-encoder",
    );
  });

  it("returns base64-encoder for convert text to base64 landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/convert-text-to-base64"),
      "base64-encoder",
    );
  });

  it("returns base64-encoder for decode base64 to text landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/decode-base64-to-text"),
      "base64-encoder",
    );
  });

  it("returns base64-encoder for base64 encode image landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/base64-encode-image"),
      "base64-encoder",
    );
  });

  it("returns base64-encoder for base64 file encoder landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/base64-file-encoder"),
      "base64-encoder",
    );
  });

  it("returns base64-encoder for online base64 tool for developers landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/online-base64-tool-for-developers"),
      "base64-encoder",
    );
  });

  it("returns base64-encoder for instant base64 conversion landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/instant-base64-conversion"),
      "base64-encoder",
    );
  });

  it("returns base64-encoder for client-side base64 encoder landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/client-side-base64-encoder"),
      "base64-encoder",
    );
  });

  it("returns base64-encoder for secure base64 decoder landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/secure-base64-decoder"),
      "base64-encoder",
    );
  });

  it("returns base64-encoder for no-upload base64 tool landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/no-upload-base64-tool"),
      "base64-encoder",
    );
  });

  it("returns base64-encoder for private base64 converter landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/private-base64-converter"),
      "base64-encoder",
    );
  });

  it("returns base64-encoder for base64 string to image converter landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/base64-string-to-image-converter"),
      "base64-encoder",
    );
  });

  it("returns base64-encoder for batch base64 encoder landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/batch-base64-encoder"),
      "base64-encoder",
    );
  });

  it("returns base64-encoder for human-readable to base64 converter landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/human-readable-to-base64-converter"),
      "base64-encoder",
    );
  });

  it("returns base64-encoder for base64 url-safe encoder landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/base64-url-safe-encoder"),
      "base64-encoder",
    );
  });

  it("returns image-to-svg for Image to SVG Converter tool URL", () => {
    assert.equal(
      resolveFooterResourceCategory(IMAGE_TO_SVG_TOOL_PATH),
      "image-to-svg",
    );
  });

  it("returns image-to-svg for image to svg converter online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/image-to-svg-converter-online"),
      "image-to-svg",
    );
  });

  it("returns image-to-svg for convert image to vector landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/convert-image-to-vector"),
      "image-to-svg",
    );
  });

  it("returns image-to-svg for png to svg converter landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/png-to-svg-converter"),
      "image-to-svg",
    );
  });

  it("returns image-to-svg for jpg to svg online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/jpg-to-svg-online"),
      "image-to-svg",
    );
  });

  it("returns image-to-svg for vectorize image online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/vectorize-image-online"),
      "image-to-svg",
    );
  });

  it("returns image-to-svg for free image to vector converter landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/free-image-to-vector-converter"),
      "image-to-svg",
    );
  });

  it("returns image-to-svg for svg trace online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/svg-trace-online"),
      "image-to-svg",
    );
  });

  it("returns image-to-svg for high-quality vector converter landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/high-quality-vector-converter"),
      "image-to-svg",
    );
  });

  it("returns image-to-svg for client-side image to svg converter landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/client-side-image-to-svg-converter"),
      "image-to-svg",
    );
  });

  it("returns image-to-svg for no-upload vector converter landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/no-upload-vector-converter"),
      "image-to-svg",
    );
  });

  it("returns image-to-svg for privacy-first svg generator landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/privacy-first-svg-generator"),
      "image-to-svg",
    );
  });

  it("returns image-to-svg for browser-based vectorization tool landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/browser-based-vectorization-tool"),
      "image-to-svg",
    );
  });

  it("returns image-to-svg for turn logo to svg landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/turn-logo-to-svg"),
      "image-to-svg",
    );
  });

  it("returns image-to-svg for convert pixel art to svg landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/convert-pixel-art-to-svg"),
      "image-to-svg",
    );
  });

  it("returns image-to-svg for smooth image to vector converter landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/smooth-image-to-vector-converter"),
      "image-to-svg",
    );
  });

  it("returns image-to-svg for svg path converter online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/svg-path-converter-online"),
      "image-to-svg",
    );
  });

  it("returns palette-extractor for Palette Extractor tool URL", () => {
    assert.equal(
      resolveFooterResourceCategory(PALETTE_EXTRACTOR_TOOL_PATH),
      "palette-extractor",
    );
  });

  it("returns palette-extractor for palette extractor online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/palette-extractor-online"),
      "palette-extractor",
    );
  });

  it("returns palette-extractor for extract color palette from image landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/extract-color-palette-from-image"),
      "palette-extractor",
    );
  });

  it("returns palette-extractor for extract dominant colors from image landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/extract-dominant-colors-from-image"),
      "palette-extractor",
    );
  });

  it("returns palette-extractor for client-side color palette extractor landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/client-side-color-palette-extractor"),
      "palette-extractor",
    );
  });

  it("returns palette-extractor for color palette generator from image landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/color-palette-generator-from-image"),
      "palette-extractor",
    );
  });

  it("returns palette-extractor for free image color extractor landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/free-image-color-extractor"),
      "palette-extractor",
    );
  });

  it("returns palette-extractor for private image color extractor landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/private-image-color-extractor"),
      "palette-extractor",
    );
  });

  it("returns palette-extractor for generate color scheme from image landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/generate-color-scheme-from-image"),
      "palette-extractor",
    );
  });

  it("returns palette-extractor for no-upload color scheme generator landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/no-upload-color-scheme-generator"),
      "palette-extractor",
    );
  });

  it("returns palette-extractor for browser-based palette builder landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/browser-based-palette-builder"),
      "palette-extractor",
    );
  });

  it("returns palette-extractor for get hex codes from image landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/get-hex-codes-from-image"),
      "palette-extractor",
    );
  });

  it("returns palette-extractor for extract brand colors from image landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/extract-brand-colors-from-image"),
      "palette-extractor",
    );
  });

  it("returns palette-extractor for auto color palette generator landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/auto-color-palette-generator"),
      "palette-extractor",
    );
  });

  it("returns palette-extractor for find color palette for design project landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/find-color-palette-for-design-project"),
      "palette-extractor",
    );
  });

  it("returns color-picker for Color Picker tool URL", () => {
    assert.equal(
      resolveFooterResourceCategory(COLOR_PICKER_TOOL_PATH),
      "color-picker",
    );
  });

  it("returns color-picker for image color picker online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/image-color-picker-online"),
      "color-picker",
    );
  });

  it("returns css-palette-gen for CSS Palette Generator tool URL", () => {
    assert.equal(
      resolveFooterResourceCategory(CSS_PALETTE_GEN_TOOL_PATH),
      "css-palette-gen",
    );
  });

  it("returns css-palette-gen for css color palette from photo landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory("/css-color-palette-from-photo"),
      "css-palette-gen",
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

  it("returns image-collage landing and guide links", () => {
    const links = getFooterResources("image-collage");
    assert.equal(links.length, 17);
    assert.equal(links[0]?.href, "/image-collage-maker-online");
    assert.equal(links[1]?.href, "/photo-collage-creator");
    assert.equal(links[2]?.href, "/make-a-photo-collage-free");
    assert.equal(links[3]?.href, "/online-collage-tool");
    assert.equal(links[4]?.href, "/create-photo-collage-for-instagram");
    assert.equal(links[5]?.href, "/combine-photos-into-one-image");
    assert.equal(links[6]?.href, "/layout-photo-collage-tool");
    assert.equal(links[7]?.href, "/grid-photo-collage-maker");
    assert.equal(links[8]?.href, "/client-side-photo-collage-maker");
    assert.equal(links[9]?.href, "/no-upload-collage-maker");
    assert.equal(links[10]?.href, "/browser-based-photo-layout-tool");
    assert.equal(links[11]?.href, "/privacy-focused-image-combiner");
    assert.equal(links[12]?.href, "/custom-photo-collage-layout");
    assert.equal(links[13]?.href, "/professional-collage-maker-online");
    assert.equal(links[14]?.href, "/high-resolution-photo-collage-creator");
    assert.equal(links[15]?.href, "/easy-image-grid-maker");
    assert.equal(links[16]?.href, IMAGE_COLLAGE_ARTICLE.href);
  });

  it("returns image-filters landing and guide links", () => {
    const links = getFooterResources("image-filters");
    assert.equal(links.length, 16);
    assert.equal(links[0]?.href, "/add-image-filters-online");
    assert.equal(links[0]?.label, "Add image filters online");
    assert.equal(links[1]?.href, "/photo-effects-online");
    assert.equal(links[1]?.label, "Photo effects online");
    assert.equal(links[2]?.href, "/free-image-filter-tool");
    assert.equal(links[2]?.label, "Free image filter tool");
    assert.equal(links[3]?.href, "/apply-filters-to-photos");
    assert.equal(links[3]?.label, "Apply filters to photos");
    assert.equal(links[4]?.href, "/vintage-photo-filters-online");
    assert.equal(links[4]?.label, "Vintage photo filters online");
    assert.equal(links[5]?.href, "/black-and-white-photo-effect");
    assert.equal(links[5]?.label, "Black & white photo effect");
    assert.equal(links[6]?.href, "/apply-artistic-effects-to-photos");
    assert.equal(links[6]?.label, "Artistic photo effects");
    assert.equal(links[7]?.href, "/enhance-photo-colors-online");
    assert.equal(links[7]?.label, "Enhance photo colors online");
    assert.equal(links[8]?.href, "/client-side-image-filters");
    assert.equal(links[8]?.label, "Client-side image filters");
    assert.equal(links[9]?.href, "/no-upload-photo-effects-editor");
    assert.equal(links[9]?.label, "No-upload photo effects");
    assert.equal(links[10]?.href, "/privacy-first-photo-filter-tool");
    assert.equal(links[10]?.label, "Privacy-first photo filters");
    assert.equal(links[11]?.href, "/browser-based-image-processor");
    assert.equal(links[11]?.label, "Browser-based image processor");
    assert.equal(links[12]?.href, "/professional-photo-filters-for-social-media");
    assert.equal(links[12]?.label, "Social media photo filters");
    assert.equal(links[13]?.href, "/apply-stunning-effects-to-images");
    assert.equal(links[13]?.label, "Stunning image effects");
    assert.equal(links[14]?.href, "/quick-photo-styler-online");
    assert.equal(links[14]?.label, "Quick photo styler");
    assert.equal(links[15]?.href, IMAGE_FILTERS_ARTICLE.href);
  });

  it("returns image-magnifier landing and guide links", () => {
    const links = getFooterResources("image-magnifier");
    assert.equal(links.length, 15);
    assert.equal(links[0]?.href, "/free-image-magnifier");
    assert.equal(links[0]?.label, "Free image magnifier");
    assert.equal(links[1]?.href, "/photo-zoom-tool");
    assert.equal(links[1]?.label, "Photo zoom tool");
    assert.equal(links[2]?.href, "/inspect-image-details-online");
    assert.equal(links[2]?.label, "Inspect image details");
    assert.equal(links[3]?.href, "/high-resolution-image-inspector");
    assert.equal(links[3]?.label, "Hi-res image inspector");
    assert.equal(links[4]?.href, "/pixel-perfect-image-viewer");
    assert.equal(links[4]?.label, "Pixel-perfect viewer");
    assert.equal(links[5]?.href, "/examine-photo-details-online");
    assert.equal(links[5]?.label, "Examine photo details");
    assert.equal(links[6]?.href, "/magnify-image-for-design-review");
    assert.equal(links[6]?.label, "Magnify for design review");
    assert.equal(links[7]?.href, "/client-side-image-magnifier");
    assert.equal(links[7]?.label, "Client-side magnifier");
    assert.equal(links[8]?.href, "/privacy-first-photo-zoom-tool");
    assert.equal(links[8]?.label, "Privacy-first zoom");
    assert.equal(links[9]?.href, "/no-upload-image-inspector");
    assert.equal(links[9]?.label, "No-upload inspector");
    assert.equal(links[10]?.href, "/browser-magnifying-glass-for-photos");
    assert.equal(links[10]?.label, "Browser magnifying glass");
    assert.equal(links[11]?.href, "/zoom-into-photo-online");
    assert.equal(links[11]?.label, "Zoom into photo");
    assert.equal(links[12]?.href, "/detailed-image-viewer-tool");
    assert.equal(links[12]?.label, "Detailed image viewer");
    assert.equal(links[13]?.href, "/magnify-small-text-on-images");
    assert.equal(links[13]?.label, "Magnify small text");
    assert.equal(links[14]?.href, MAGNIFIER_ARTICLE.href);
    assert.equal(
      links[14]?.label,
      "Online Image Magnifier: Zoom, Pan, and Sharpen to Discover Hidden Details",
    );
  });

  it("returns base64-encoder landing and guide links", () => {
    const links = getFooterResources("base64-encoder");
    assert.equal(links.length, 17);
    assert.equal(links[0]?.href, "/base64-encoder-online");
    assert.equal(links[0]?.label, "Base64 encoder online");
    assert.equal(links[1]?.href, "/base64-decoder-online");
    assert.equal(links[1]?.label, "Base64 decoder online");
    assert.equal(links[2]?.href, "/convert-text-to-base64");
    assert.equal(links[2]?.label, "Text to Base64");
    assert.equal(links[3]?.href, "/decode-base64-to-text");
    assert.equal(links[3]?.label, "Base64 to text");
    assert.equal(links[4]?.href, "/base64-encode-image");
    assert.equal(links[4]?.label, "Base64 encode image");
    assert.equal(links[5]?.href, "/base64-file-encoder");
    assert.equal(links[5]?.label, "Base64 file encoder");
    assert.equal(links[6]?.href, "/online-base64-tool-for-developers");
    assert.equal(links[6]?.label, "Base64 for developers");
    assert.equal(links[7]?.href, "/instant-base64-conversion");
    assert.equal(links[7]?.label, "Instant Base64 conversion");
    assert.equal(links[8]?.href, "/client-side-base64-encoder");
    assert.equal(links[8]?.label, "Client-side Base64 encoder");
    assert.equal(links[9]?.href, "/secure-base64-decoder");
    assert.equal(links[9]?.label, "Secure Base64 decoder");
    assert.equal(links[10]?.href, "/no-upload-base64-tool");
    assert.equal(links[10]?.label, "No-upload Base64 tool");
    assert.equal(links[11]?.href, "/private-base64-converter");
    assert.equal(links[11]?.label, "Private Base64 converter");
    assert.equal(links[12]?.href, "/base64-string-to-image-converter");
    assert.equal(links[12]?.label, "Base64 string to image");
    assert.equal(links[13]?.href, "/batch-base64-encoder");
    assert.equal(links[13]?.label, "Batch Base64 encoder");
    assert.equal(links[14]?.href, "/human-readable-to-base64-converter");
    assert.equal(links[14]?.label, "Human-readable to Base64");
    assert.equal(links[15]?.href, "/base64-url-safe-encoder");
    assert.equal(links[15]?.label, "URL-safe Base64 encoder");
    assert.equal(links[16]?.href, BASE64_ENCODER_ARTICLE.href);
    assert.equal(links[16]?.label, BASE64_ENCODER_ARTICLE.title);
  });

  it("returns image-to-svg landing and guide links", () => {
    const links = getFooterResources("image-to-svg");
    assert.equal(links.length, 17);
    assert.equal(links[0]?.href, "/image-to-svg-converter-online");
    assert.equal(links[0]?.label, "Image to SVG converter online");
    assert.equal(links[1]?.href, "/convert-image-to-vector");
    assert.equal(links[1]?.label, "Convert image to vector");
    assert.equal(links[2]?.href, "/png-to-svg-converter");
    assert.equal(links[2]?.label, "PNG to SVG converter");
    assert.equal(links[3]?.href, "/jpg-to-svg-online");
    assert.equal(links[3]?.label, "JPG to SVG online");
    assert.equal(links[4]?.href, "/vectorize-image-online");
    assert.equal(links[4]?.label, "Vectorize image online");
    assert.equal(links[5]?.href, "/free-image-to-vector-converter");
    assert.equal(links[5]?.label, "Free image to vector converter");
    assert.equal(links[6]?.href, "/svg-trace-online");
    assert.equal(links[6]?.label, "SVG trace online");
    assert.equal(links[7]?.href, "/high-quality-vector-converter");
    assert.equal(links[7]?.label, "High-quality vector converter");
    assert.equal(links[8]?.href, "/client-side-image-to-svg-converter");
    assert.equal(links[8]?.label, "Client-side image to SVG");
    assert.equal(links[9]?.href, "/no-upload-vector-converter");
    assert.equal(links[9]?.label, "No-upload vector converter");
    assert.equal(links[10]?.href, "/privacy-first-svg-generator");
    assert.equal(links[10]?.label, "Privacy-first SVG generator");
    assert.equal(links[11]?.href, "/browser-based-vectorization-tool");
    assert.equal(links[11]?.label, "Browser vectorization tool");
    assert.equal(links[12]?.href, "/turn-logo-to-svg");
    assert.equal(links[12]?.label, "Turn logo to SVG");
    assert.equal(links[13]?.href, "/convert-pixel-art-to-svg");
    assert.equal(links[13]?.label, "Pixel art to SVG");
    assert.equal(links[14]?.href, "/smooth-image-to-vector-converter");
    assert.equal(links[14]?.label, "Smooth image to vector");
    assert.equal(links[15]?.href, "/svg-path-converter-online");
    assert.equal(links[15]?.label, "SVG path converter online");
    assert.equal(links[16]?.href, IMAGE_TO_SVG_ARTICLE.href);
    assert.equal(links[16]?.label, IMAGE_TO_SVG_ARTICLE.title);
  });

  it("returns palette-extractor landing and guide links", () => {
    const links = getFooterResources("palette-extractor");
    assert.equal(links.length, 15);
    assert.equal(
      links[0]?.href,
      PALETTE_EXTRACTOR_LANDINGS["free-image-color-extractor"].path,
    );
    assert.equal(links[0]?.label, "Free image color extractor");
    assert.equal(
      links[1]?.href,
      PALETTE_EXTRACTOR_LANDINGS["get-hex-codes-from-image"].path,
    );
    assert.equal(links[1]?.label, "HEX codes from image");
    assert.equal(
      links[2]?.href,
      PALETTE_EXTRACTOR_LANDINGS["extract-brand-colors-from-image"].path,
    );
    assert.equal(links[2]?.label, "Brand colors from image");
    assert.equal(
      links[3]?.href,
      PALETTE_EXTRACTOR_LANDINGS["private-image-color-extractor"].path,
    );
    assert.equal(links[3]?.label, "Private color extractor");
    assert.equal(
      links[4]?.href,
      PALETTE_EXTRACTOR_LANDINGS["extract-dominant-colors-from-image"].path,
    );
    assert.equal(links[4]?.label, "Dominant colors from image");
    assert.equal(
      links[5]?.href,
      PALETTE_EXTRACTOR_LANDINGS["client-side-color-palette-extractor"].path,
    );
    assert.equal(links[5]?.label, "Client-side palette extractor");
    assert.equal(
      links[6]?.href,
      PALETTE_EXTRACTOR_LANDINGS["no-upload-color-scheme-generator"].path,
    );
    assert.equal(links[6]?.label, "No-upload scheme generator");
    assert.equal(
      links[7]?.href,
      PALETTE_EXTRACTOR_LANDINGS["auto-color-palette-generator"].path,
    );
    assert.equal(links[7]?.label, "Auto palette generator");
    assert.equal(
      links[8]?.href,
      PALETTE_EXTRACTOR_LANDINGS["find-color-palette-for-design-project"].path,
    );
    assert.equal(links[8]?.label, "Palette for design project");
    assert.equal(
      links[9]?.href,
      PALETTE_EXTRACTOR_LANDINGS["generate-color-scheme-from-image"].path,
    );
    assert.equal(links[9]?.label, "Color scheme from image");
    assert.equal(
      links[10]?.href,
      PALETTE_EXTRACTOR_LANDINGS["color-palette-generator-from-image"].path,
    );
    assert.equal(links[10]?.label, "Palette generator from image");
    assert.equal(
      links[11]?.href,
      PALETTE_EXTRACTOR_LANDINGS["extract-color-palette-from-image"].path,
    );
    assert.equal(links[11]?.label, "Extract palette from image");
    assert.equal(
      links[12]?.href,
      PALETTE_EXTRACTOR_LANDINGS["browser-based-palette-builder"].path,
    );
    assert.equal(links[12]?.label, "Browser palette builder");
    assert.equal(
      links[13]?.href,
      PALETTE_EXTRACTOR_LANDINGS["palette-extractor-online"].path,
    );
    assert.equal(links[13]?.label, "Palette extractor online");
    assert.equal(links[14]?.href, PALETTE_EXTRACTOR_ARTICLE.href);
    assert.equal(links[14]?.label, PALETTE_EXTRACTOR_ARTICLE.title);
  });

  it("returns color-picker landing and guide links", () => {
    const links = getFooterResources("color-picker");
    assert.equal(links.length, 2);
    assert.equal(
      links[0]?.href,
      COLOR_PICKER_LANDINGS["image-color-picker-online"].path,
    );
    assert.equal(links[0]?.label, "Image color picker online");
    assert.equal(links[1]?.href, COLOR_PICKER_ARTICLE.href);
    assert.equal(links[1]?.label, COLOR_PICKER_ARTICLE.title);
  });

  it("returns css-palette-gen landing and guide links", () => {
    const links = getFooterResources("css-palette-gen");
    assert.equal(links.length, 2);
    assert.equal(
      links[0]?.href,
      CSS_PALETTE_GEN_LANDINGS["css-color-palette-from-photo"].path,
    );
    assert.equal(links[0]?.label, "CSS palette from photo");
    assert.equal(links[1]?.href, CSS_PALETTE_GEN_ARTICLE.href);
    assert.equal(links[1]?.label, CSS_PALETTE_GEN_ARTICLE.title);
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
