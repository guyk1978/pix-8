/**
 * MODNet photographic portrait matting — better edges than u2netp on
 * bright backgrounds and fine structures (hands, hair). ~25 MB, WASM-friendly.
 */
export const SEGMENTATION_MODEL = {
  cacheKey: "modnet-photographic-onnx-v1",
  /** Same-origin path — populated by `npm run setup-ml-assets` */
  url: "/models/modnet_photographic.onnx",
  inputSize: 512,
} as const;

export const MODNET_MEAN = 0.5;
export const MODNET_STD = 0.5;

/** MobileSAM — lazy-loaded for click-based mask correction only. */
export const CLICK_SEGMENTATION_MODELS = {
  encoder: {
    cacheKey: "mobilesam-encoder-v1",
    url: "https://huggingface.co/Acly/MobileSAM/resolve/main/mobile_sam_image_encoder.onnx",
  },
  decoder: {
    cacheKey: "mobilesam-decoder-v1",
    url: "https://huggingface.co/Acly/MobileSAM/resolve/main/sam_mask_decoder_single.onnx",
  },
  inputSize: 1024,
} as const;

export const SAM_PIXEL_MEAN = [123.675, 116.28, 103.53] as const;
export const SAM_PIXEL_STD = [58.395, 57.12, 57.375] as const;

/** Self-hosted ONNX Runtime WASM (copied to public/ort by setup-ml-assets) */
export const ONNX_WASM_PATH = "/ort/";

export const IMAGENET_MEAN = [0.485, 0.456, 0.406] as const;
export const IMAGENET_STD = [0.229, 0.224, 0.225] as const;

/** Guided filter radius / regularization for alpha matting */
export const GUIDED_FILTER_RADIUS = 6;
export const GUIDED_FILTER_EPSILON = 0.0065;

/**
 * Gamma applied to refined alpha (< 1 keeps more of the subject on difficult images).
 */
export const ALPHA_PRESERVATION_GAMMA = 0.9;
