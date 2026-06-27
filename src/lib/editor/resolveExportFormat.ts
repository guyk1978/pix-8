import { resolveFormat, type ImageFormat } from "@/hooks/useImageProcessor";
import type { ConvertLayer } from "@/lib/editor/layerTypes";

/** Output format when a compress layer is active (matches Compressor tool). */
export function resolveCompressOutputFormat(
  sourceMimeType: string,
  convertLayer?: Pick<ConvertLayer, "format"> | null,
): ImageFormat {
  if (convertLayer) {
    return convertLayer.format === "png" ? "webp" : convertLayer.format;
  }
  const format = resolveFormat(sourceMimeType);
  return format === "png" ? "webp" : format;
}

export function resolveEditorDownloadFormat(
  sourceMimeType: string,
  options: {
    explicitFormat?: ImageFormat;
    compressLayerVisible: boolean;
    convertLayer?: Pick<ConvertLayer, "format"> | null;
  },
): ImageFormat {
  if (options.explicitFormat) {
    return options.explicitFormat;
  }
  if (options.compressLayerVisible) {
    return resolveCompressOutputFormat(sourceMimeType, options.convertLayer);
  }
  if (options.convertLayer) {
    return options.convertLayer.format;
  }
  return "png";
}
