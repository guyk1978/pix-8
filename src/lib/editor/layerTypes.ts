import type { ImageTransform, RotationDegrees, ImageFormat } from "@/hooks/useImageProcessor";
import type { RelativeCropRegion } from "@/lib/editor/cropRegion";
import type { ImageFilterId } from "@/lib/filterRender";
import type { LightAdjustSettings } from "@/lib/lightAdjustRender";
import type { SharpenSettings } from "@/lib/sharpenRender";
import type { DenoiseSettings } from "@/lib/denoiseRender";
import type { BorderSettings } from "@/lib/borderRender";
import type { GrainSettings } from "@/lib/grainRender";
import type { LensCorrectionSettings } from "@/lib/lensCorrectorRender";
import type { GrayscaleSettings } from "@/lib/grayscaleRender";
import type { TextOverlaySettings } from "@/lib/textOverlayRender";
import type { OverlayPresetId } from "@/lib/overlayAssets";
import type { OverlayTransform } from "@/lib/imageOverlayRender";
import type { CollageSettings } from "@/lib/collageRender";
import type { SvgTraceSettings } from "@/lib/svgTraceRender";
import type { MemeSettings } from "@/lib/memeRender";
import type { ToolId } from "@/lib/tools";

export type EditorLayerType =
  | "source"
  | "bg-remove"
  | "resize"
  | "crop"
  | "transform"
  | "color-adjust"
  | "filter"
  | "watermark"
  | "text-overlay"
  | "compress"
  | "metadata"
  | "convert"
  | "sharpen"
  | "denoise"
  | "border"
  | "invert"
  | "grain"
  | "lens"
  | "grayscale"
  | "image-overlay"
  | "collage"
  | "meme"
  | "custom-cut"
  | "magnifier"
  | "palette"
  | "annotator"
  | "export-svg"
  | "export-favicon"
  | "export-base64";

export interface BaseLayer {
  id: string;
  type: EditorLayerType;
  visible: boolean;
  locked: boolean;
  nameKey: string;
}

export interface SourceLayer extends BaseLayer {
  type: "source";
}

export interface BgRemoveLayer extends BaseLayer {
  type: "bg-remove";
  advancedEdges: number;
  subjectMasking: number;
  depthEstimation: number;
  enabled: boolean;
  resultImage: HTMLImageElement | null;
  processing: boolean;
}

export interface ResizeLayer extends BaseLayer {
  type: "resize";
  width: number;
  height: number;
  maintainAspect: boolean;
}

export interface CropLayer extends BaseLayer {
  type: "crop";
  region: RelativeCropRegion;
}

export interface TransformLayer extends BaseLayer {
  type: "transform";
  rotation: RotationDegrees;
  flipHorizontal: boolean;
  flipVertical: boolean;
}

export interface ColorAdjustLayer extends BaseLayer {
  type: "color-adjust";
  settings: LightAdjustSettings;
}

export interface FilterLayer extends BaseLayer {
  type: "filter";
  filterId: ImageFilterId;
}

export interface WatermarkLayer extends BaseLayer {
  type: "watermark";
  text: string;
  opacity: number;
  fontSize: number;
  x: number;
  y: number;
}

export interface TextOverlayLayer extends BaseLayer {
  type: "text-overlay";
  settings: TextOverlaySettings;
}

export interface CompressLayer extends BaseLayer {
  type: "compress";
  quality: number;
}

export interface MetadataLayer extends BaseLayer {
  type: "metadata";
  stripMetadata: boolean;
}

export interface ConvertLayer extends BaseLayer {
  type: "convert";
  format: ImageFormat;
}

export interface SharpenLayer extends BaseLayer {
  type: "sharpen";
  settings: SharpenSettings;
}

export interface DenoiseLayer extends BaseLayer {
  type: "denoise";
  settings: DenoiseSettings;
}

export interface BorderLayer extends BaseLayer {
  type: "border";
  settings: BorderSettings;
}

export interface InvertLayer extends BaseLayer {
  type: "invert";
  enabled: boolean;
}

export interface GrainLayer extends BaseLayer {
  type: "grain";
  settings: GrainSettings;
}

export interface LensLayer extends BaseLayer {
  type: "lens";
  settings: LensCorrectionSettings;
}

export interface GrayscaleLayer extends BaseLayer {
  type: "grayscale";
  settings: GrayscaleSettings;
}

export interface ImageOverlayLayer extends BaseLayer {
  type: "image-overlay";
  presetId: OverlayPresetId;
  transform: OverlayTransform;
  loadedImage: HTMLImageElement | null;
}

export interface CollageImageSlot {
  id: string;
  fileName: string;
  file: File | null;
  objectUrl: string | null;
  loadedImage: HTMLImageElement | null;
}

export interface CollageLayer extends BaseLayer {
  type: "collage";
  settings: CollageSettings;
  includeSource: boolean;
  images: CollageImageSlot[];
}

export interface MemeLayer extends BaseLayer {
  type: "meme";
  settings: MemeSettings;
}

export type CustomCutMode = "keep" | "remove";

export interface CustomCutLayer extends BaseLayer {
  type: "custom-cut";
  mode: CustomCutMode;
  region: RelativeCropRegion;
}

export interface MagnifierLayer extends BaseLayer {
  type: "magnifier";
  zoom: number;
}

export type PaletteMode = "extract" | "picker" | "css";

export interface PaletteLayer extends BaseLayer {
  type: "palette";
  mode: PaletteMode;
  colorCount: number;
}

export interface AnnotatorLayer extends BaseLayer {
  type: "annotator";
  label: string;
  x: number;
  y: number;
}

export interface ExportSvgLayer extends BaseLayer {
  type: "export-svg";
  settings: SvgTraceSettings;
  svgOutput: string | null;
  processing: boolean;
}

export interface ExportFaviconLayer extends BaseLayer {
  type: "export-favicon";
  size: 16 | 32 | 48 | 64 | 128 | 256;
}

export interface ExportBase64Layer extends BaseLayer {
  type: "export-base64";
}

export type EditorLayer =
  | SourceLayer
  | BgRemoveLayer
  | ResizeLayer
  | CropLayer
  | TransformLayer
  | ColorAdjustLayer
  | FilterLayer
  | WatermarkLayer
  | TextOverlayLayer
  | CompressLayer
  | MetadataLayer
  | ConvertLayer
  | SharpenLayer
  | DenoiseLayer
  | BorderLayer
  | InvertLayer
  | GrainLayer
  | LensLayer
  | GrayscaleLayer
  | ImageOverlayLayer
  | CollageLayer
  | MemeLayer
  | CustomCutLayer
  | MagnifierLayer
  | PaletteLayer
  | AnnotatorLayer
  | ExportSvgLayer
  | ExportFaviconLayer
  | ExportBase64Layer;

export interface EditorSource {
  file: File;
  url: string;
  width: number;
  height: number;
  name: string;
  image: HTMLImageElement;
}

export type EditorCategoryId = "ai-assist" | "optimization" | "metadata" | "design";

export type EditorToolAction = ToolId;

export interface EditorDimensions {
  width: number;
  height: number;
}

export function layerToTransform(layer: TransformLayer): ImageTransform {
  return {
    rotation: layer.rotation,
    flipHorizontal: layer.flipHorizontal,
    flipVertical: layer.flipVertical,
  };
}

export function isVisualEffectLayer(layer: EditorLayer): boolean {
  return ![
    "source",
    "compress",
    "metadata",
    "convert",
    "magnifier",
    "palette",
    "export-svg",
    "export-favicon",
    "export-base64",
  ].includes(layer.type);
}
