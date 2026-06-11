/** U2Net-portrait lite — ONNX, WASM-friendly, ~4.7 MB (served same-origin) */
export const SEGMENTATION_MODEL = {
  cacheKey: "u2netp-onnx-v1",
  /** Same-origin path — populated by `npm run setup-ml-assets` */
  url: "/models/u2netp.onnx",
  inputSize: 320,
} as const;

/** Self-hosted ONNX Runtime WASM (copied to public/ort by setup-ml-assets) */
export const ONNX_WASM_PATH = "/ort/";

export const IMAGENET_MEAN = [0.485, 0.456, 0.406] as const;
export const IMAGENET_STD = [0.229, 0.224, 0.225] as const;

/** Guided filter radius / regularization for alpha matting */
export const GUIDED_FILTER_RADIUS = 5;
export const GUIDED_FILTER_EPSILON = 0.008;
