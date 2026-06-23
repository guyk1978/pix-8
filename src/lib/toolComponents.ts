import type { ComponentType } from "react";
import { Base64Encoder } from "@/components/tools/Base64Encoder";
import { BackgroundRemover } from "@/components/tools/BackgroundRemover";
import { Compressor } from "@/components/tools/Compressor";
import { Converter } from "@/components/tools/Converter";
import { Cropper } from "@/components/tools/Cropper";
import { CustomCutter } from "@/components/tools/CustomCutter";
import { ColorPicker } from "@/components/tools/ColorPicker";
import { BorderGenerator } from "@/components/tools/BorderGenerator";
import { FaviconGenerator } from "@/components/tools/FaviconGenerator";
import { CssPaletteGenerator } from "@/components/tools/CssPaletteGenerator";
import { GrainGenerator } from "@/components/tools/GrainGenerator";
import { LensCorrector } from "@/components/tools/LensCorrector";
import { Denoiser } from "@/components/tools/Denoiser";
import { ImageCollageMaker } from "@/components/tools/ImageCollageMaker";
import { ImageFilters } from "@/components/tools/ImageFilters";
import { ImageInverter } from "@/components/tools/ImageInverter";
import { ImageToSvgConverter } from "@/components/tools/ImageToSvgConverter";
import { LightAdjuster } from "@/components/tools/LightAdjuster";
import { Sharpener } from "@/components/tools/Sharpener";
import { GrayscaleConverter } from "@/components/tools/GrayscaleConverter";
import { ImageAnnotator } from "@/components/tools/ImageAnnotator";
import { ImageMagnifier } from "@/components/tools/ImageMagnifier";
import { ImageOverlay } from "@/components/tools/ImageOverlay";
import { TextOverlay } from "@/components/tools/TextOverlay";
import { MemeGenerator } from "@/components/tools/MemeGenerator";
import { MetadataRemover } from "@/components/tools/MetadataRemover";
import { PaletteExtractor } from "@/components/tools/PaletteExtractor";
import { Resizer } from "@/components/tools/Resizer";
import { RotateFlip } from "@/components/tools/RotateFlip";
import { Watermark } from "@/components/tools/Watermark";
import type { ToolId } from "@/lib/tools";

export const TOOL_COMPONENTS: Partial<Record<ToolId, ComponentType>> = {
  resizer: Resizer,
  converter: Converter,
  compressor: Compressor,
  cropper: Cropper,
  "custom-cutter": CustomCutter,
  "rotate-flip": RotateFlip,
  watermark: Watermark,
  "bg-remover": BackgroundRemover,
  "palette-extractor": PaletteExtractor,
  "metadata-remover": MetadataRemover,
  "color-picker": ColorPicker,
  "text-overlay": TextOverlay,
  "image-overlay": ImageOverlay,
  "border-generator": BorderGenerator,
  "grayscale-converter": GrayscaleConverter,
  "favicon-generator": FaviconGenerator,
  sharpener: Sharpener,
  "light-adjuster": LightAdjuster,
  "image-inverter": ImageInverter,
  denoiser: Denoiser,
  "css-palette-gen": CssPaletteGenerator,
  "lens-corrector": LensCorrector,
  "grain-generator": GrainGenerator,
  "base64-encoder": Base64Encoder,
  "image-filters": ImageFilters,
  "image-to-svg": ImageToSvgConverter,
  "image-collage": ImageCollageMaker,
  "meme-generator": MemeGenerator,
  magnifier: ImageMagnifier,
  "image-annotator": ImageAnnotator,
};
