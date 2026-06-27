import {
  createInitialRelativeCropRegion,
  type RelativeCropRegion,
} from "@/lib/editor/cropRegion";
import { DEFAULT_LIGHT_ADJUST_SETTINGS } from "@/lib/lightAdjustRender";
import { DEFAULT_IMAGE_FILTER } from "@/lib/filterRender";
import { DEFAULT_SHARPEN_SETTINGS } from "@/lib/sharpenRender";
import { DEFAULT_DENOISE_SETTINGS } from "@/lib/denoiseRender";
import { DEFAULT_GRAIN_SETTINGS } from "@/lib/grainRender";
import { DEFAULT_LENS_CORRECTION_SETTINGS } from "@/lib/lensCorrectorRender";
import { DEFAULT_GRAYSCALE_SETTINGS } from "@/lib/grayscaleRender";
import { DEFAULT_COLLAGE_SETTINGS } from "@/lib/collageRender";
import { DEFAULT_SVG_TRACE_SETTINGS } from "@/lib/svgTraceRender";
import { DEFAULT_OVERLAY_TRANSFORM } from "@/lib/imageOverlayRender";
import type {
  AnnotatorLayer,
  BgRemoveLayer,
  BorderLayer,
  ColorAdjustLayer,
  CompressLayer,
  ConvertLayer,
  CropLayer,
  CustomCutLayer,
  DenoiseLayer,
  EditorLayer,
  ExportBase64Layer,
  ExportFaviconLayer,
  ExportSvgLayer,
  FilterLayer,
  GrainLayer,
  GrayscaleLayer,
  CollageLayer,
  ImageOverlayLayer,
  InvertLayer,
  LensLayer,
  MagnifierLayer,
  MemeLayer,
  MetadataLayer,
  PaletteLayer,
  ResizeLayer,
  SharpenLayer,
  SourceLayer,
  TextOverlayLayer,
  TransformLayer,
  WatermarkLayer,
} from "@/lib/editor/layerTypes";
import type { ToolId } from "@/lib/tools";

let layerIdCounter = 0;

export function createLayerId(): string {
  layerIdCounter += 1;
  return `layer-${Date.now()}-${layerIdCounter}`;
}

export function createSourceLayer(): SourceLayer {
  return {
    id: createLayerId(),
    type: "source",
    visible: true,
    locked: true,
    nameKey: "editor.layers.source",
  };
}

export function createBgRemoveLayer(): BgRemoveLayer {
  return {
    id: createLayerId(),
    type: "bg-remove",
    visible: true,
    locked: false,
    nameKey: "editor.layers.bgRemove",
    advancedEdges: 50,
    subjectMasking: 70,
    depthEstimation: 40,
    enabled: true,
    resultImage: null,
    processing: false,
  };
}

export function createResizeLayer(width: number, height: number): ResizeLayer {
  return {
    id: createLayerId(),
    type: "resize",
    visible: true,
    locked: false,
    nameKey: "editor.layers.resize",
    width,
    height,
    maintainAspect: true,
  };
}

export function createCropLayer(region?: RelativeCropRegion): CropLayer {
  return {
    id: createLayerId(),
    type: "crop",
    visible: true,
    locked: false,
    nameKey: "editor.layers.crop",
    region: region ?? createInitialRelativeCropRegion(),
  };
}

export function createTransformLayer(): TransformLayer {
  return {
    id: createLayerId(),
    type: "transform",
    visible: true,
    locked: false,
    nameKey: "editor.layers.transform",
    rotation: 0,
    flipHorizontal: false,
    flipVertical: false,
  };
}

export function createColorAdjustLayer(): ColorAdjustLayer {
  return {
    id: createLayerId(),
    type: "color-adjust",
    visible: true,
    locked: false,
    nameKey: "editor.layers.colorAdjust",
    settings: { ...DEFAULT_LIGHT_ADJUST_SETTINGS },
  };
}

export function createFilterLayer(): FilterLayer {
  return {
    id: createLayerId(),
    type: "filter",
    visible: true,
    locked: false,
    nameKey: "editor.layers.filter",
    filterId: DEFAULT_IMAGE_FILTER,
  };
}

export function createWatermarkLayer(
  width = 800,
  height = 600,
): WatermarkLayer {
  return {
    id: createLayerId(),
    type: "watermark",
    visible: true,
    locked: false,
    nameKey: "editor.layers.watermark",
    text: "PIX-8",
    opacity: 0.6,
    fontSize: 24,
    x: Math.round(width * 0.85),
    y: Math.round(height * 0.92),
  };
}

export function createTextOverlayLayer(
  width: number,
  height: number,
): TextOverlayLayer {
  return {
    id: createLayerId(),
    type: "text-overlay",
    visible: true,
    locked: false,
    nameKey: "editor.layers.textOverlay",
    settings: {
      text: "Your text",
      fontFamily: "Impact, Arial Black, sans-serif",
      fontSizePercent: 6,
      color: "#ffffff",
      align: "center",
      shadow: true,
      backgroundBox: false,
      backgroundOpacity: 0.5,
      x: Math.round(width / 2),
      y: Math.round(height / 2),
    },
  };
}

export function createCompressLayer(): CompressLayer {
  return {
    id: createLayerId(),
    type: "compress",
    visible: true,
    locked: false,
    nameKey: "editor.layers.compress",
    quality: 85,
  };
}

export function createMetadataLayer(): MetadataLayer {
  return {
    id: createLayerId(),
    type: "metadata",
    visible: true,
    locked: false,
    nameKey: "editor.layers.metadata",
    stripMetadata: true,
  };
}

export function createConvertLayer(): ConvertLayer {
  return {
    id: createLayerId(),
    type: "convert",
    visible: true,
    locked: false,
    nameKey: "editor.layers.convert",
    format: "webp",
  };
}

export function createSharpenLayer(): SharpenLayer {
  return {
    id: createLayerId(),
    type: "sharpen",
    visible: true,
    locked: false,
    nameKey: "editor.layers.sharpen",
    settings: { ...DEFAULT_SHARPEN_SETTINGS },
  };
}

export function createDenoiseLayer(): DenoiseLayer {
  return {
    id: createLayerId(),
    type: "denoise",
    visible: true,
    locked: false,
    nameKey: "editor.layers.denoise",
    settings: { ...DEFAULT_DENOISE_SETTINGS },
  };
}

export function createBorderLayer(): BorderLayer {
  return {
    id: createLayerId(),
    type: "border",
    visible: true,
    locked: false,
    nameKey: "editor.layers.border",
    settings: { width: 12, color: "#007bff", cornerRadius: 0 },
  };
}

export function createInvertLayer(): InvertLayer {
  return {
    id: createLayerId(),
    type: "invert",
    visible: true,
    locked: false,
    nameKey: "editor.layers.invert",
    enabled: true,
  };
}

export function createGrainLayer(): GrainLayer {
  return {
    id: createLayerId(),
    type: "grain",
    visible: true,
    locked: false,
    nameKey: "editor.layers.grain",
    settings: { ...DEFAULT_GRAIN_SETTINGS },
  };
}

export function createLensLayer(): LensLayer {
  return {
    id: createLayerId(),
    type: "lens",
    visible: true,
    locked: false,
    nameKey: "editor.layers.lens",
    settings: { ...DEFAULT_LENS_CORRECTION_SETTINGS },
  };
}

export function createGrayscaleLayer(): GrayscaleLayer {
  return {
    id: createLayerId(),
    type: "grayscale",
    visible: true,
    locked: false,
    nameKey: "editor.layers.grayscale",
    settings: { ...DEFAULT_GRAYSCALE_SETTINGS },
  };
}

export function createImageOverlayLayer(): ImageOverlayLayer {
  return {
    id: createLayerId(),
    type: "image-overlay",
    visible: true,
    locked: false,
    nameKey: "editor.layers.imageOverlay",
    presetId: "stars",
    transform: { ...DEFAULT_OVERLAY_TRANSFORM },
    loadedImage: null,
  };
}

export function createCollageLayer(): CollageLayer {
  return {
    id: createLayerId(),
    type: "collage",
    visible: true,
    locked: false,
    nameKey: "editor.layers.collage",
    settings: { ...DEFAULT_COLLAGE_SETTINGS },
    includeSource: true,
    images: [],
  };
}

export function createMemeLayer(): MemeLayer {
  return {
    id: createLayerId(),
    type: "meme",
    visible: true,
    locked: false,
    nameKey: "editor.layers.meme",
    settings: { topText: "TOP TEXT", bottomText: "BOTTOM TEXT" },
  };
}

export function createCustomCutLayer(): CustomCutLayer {
  return {
    id: createLayerId(),
    type: "custom-cut",
    visible: true,
    locked: false,
    nameKey: "editor.layers.customCut",
    mode: "keep",
    region: createInitialRelativeCropRegion(),
  };
}

export function createMagnifierLayer(): MagnifierLayer {
  return {
    id: createLayerId(),
    type: "magnifier",
    visible: true,
    locked: false,
    nameKey: "editor.layers.magnifier",
    zoom: 2,
  };
}

export function createPaletteLayer(
  mode: "extract" | "picker" | "css",
): PaletteLayer {
  return {
    id: createLayerId(),
    type: "palette",
    visible: true,
    locked: false,
    nameKey:
      mode === "css"
        ? "editor.layers.cssPalette"
        : mode === "picker"
          ? "editor.layers.colorPicker"
          : "editor.layers.palette",
    mode,
    colorCount: 6,
  };
}

export function createAnnotatorLayer(
  width: number,
  height: number,
): AnnotatorLayer {
  return {
    id: createLayerId(),
    type: "annotator",
    visible: true,
    locked: false,
    nameKey: "editor.layers.annotator",
    label: "Label",
    x: Math.round(width * 0.5),
    y: Math.round(height * 0.3),
  };
}

export function createExportSvgLayer(): ExportSvgLayer {
  return {
    id: createLayerId(),
    type: "export-svg",
    visible: true,
    locked: false,
    nameKey: "editor.layers.exportSvg",
    settings: { ...DEFAULT_SVG_TRACE_SETTINGS },
    svgOutput: null,
    processing: false,
  };
}

export function createExportFaviconLayer(): ExportFaviconLayer {
  return {
    id: createLayerId(),
    type: "export-favicon",
    visible: true,
    locked: false,
    nameKey: "editor.layers.exportFavicon",
    size: 32,
  };
}

export function createExportBase64Layer(): ExportBase64Layer {
  return {
    id: createLayerId(),
    type: "export-base64",
    visible: true,
    locked: false,
    nameKey: "editor.layers.exportBase64",
  };
}

export function findLayerById(
  layers: EditorLayer[],
  id: string | null,
): EditorLayer | undefined {
  if (!id) return undefined;
  return layers.find((layer) => layer.id === id);
}

export function createLayerForTool(
  toolId: ToolId,
  sourceWidth: number,
  sourceHeight: number,
): EditorLayer | null {
  switch (toolId) {
    case "bg-remover":
      return createBgRemoveLayer();
    case "resizer":
      return createResizeLayer(sourceWidth, sourceHeight);
    case "cropper":
      return createCropLayer();
    case "rotate-flip":
      return createTransformLayer();
    case "light-adjuster":
      return createColorAdjustLayer();
    case "image-filters":
      return createFilterLayer();
    case "watermark":
      return createWatermarkLayer(sourceWidth, sourceHeight);
    case "text-overlay":
      return createTextOverlayLayer(sourceWidth, sourceHeight);
    case "compressor":
      return createCompressLayer();
    case "metadata-remover":
      return createMetadataLayer();
    case "converter":
      return createConvertLayer();
    case "grayscale-converter":
      return createGrayscaleLayer();
    case "sharpener":
      return createSharpenLayer();
    case "denoiser":
      return createDenoiseLayer();
    case "border-generator":
      return createBorderLayer();
    case "image-inverter":
      return createInvertLayer();
    case "grain-generator":
      return createGrainLayer();
    case "lens-corrector":
      return createLensLayer();
    case "image-overlay":
      return createImageOverlayLayer();
    case "meme-generator":
      return createMemeLayer();
    case "custom-cutter":
      return createCustomCutLayer();
    case "magnifier":
      return createMagnifierLayer();
    case "palette-extractor":
      return createPaletteLayer("extract");
    case "color-picker":
      return createPaletteLayer("picker");
    case "css-palette-gen":
      return createPaletteLayer("css");
    case "image-annotator":
      return createAnnotatorLayer(sourceWidth, sourceHeight);
    case "image-to-svg":
      return createExportSvgLayer();
    case "favicon-generator":
      return createExportFaviconLayer();
    case "base64-encoder":
      return createExportBase64Layer();
    case "image-collage":
      return createCollageLayer();
    default:
      return null;
  }
}
