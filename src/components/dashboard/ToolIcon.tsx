import {
  ArrowLeftRight,
  Aperture,
  Binary,
  Blend,
  Braces,
  Crop,
  Filter,
  FlipVertical2,
  Focus,
  Frame,
  Laugh,
  LayoutGrid,
  Globe,
  Maximize,
  Maximize2,
  Palette,
  Pipette,
  RotateCw,
  ScanLine,
  SlidersHorizontal,
  Spline,
  ShieldOff,
  Sparkles,
  Stamp,
  SunMedium,
  Type,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { ToolId } from "@/lib/tools";

const TOOL_ICONS: Record<ToolId, LucideIcon> = {
  resizer: Maximize2,
  converter: ArrowLeftRight,
  compressor: Zap,
  cropper: Crop,
  "rotate-flip": RotateCw,
  watermark: Stamp,
  "bg-remover": Sparkles,
  "palette-extractor": Palette,
  "metadata-remover": ShieldOff,
  "color-picker": Pipette,
  "text-overlay": Type,
  "border-generator": Frame,
  "grayscale-converter": Blend,
  "favicon-generator": Globe,
  sharpener: Focus,
  "light-adjuster": SunMedium,
  "image-inverter": FlipVertical2,
  denoiser: Filter,
  "css-palette-gen": Braces,
  "lens-corrector": Maximize,
  "grain-generator": Aperture,
  "base64-encoder": Binary,
  "image-filters": SlidersHorizontal,
  "image-to-svg": Spline,
  "image-collage": LayoutGrid,
  "meme-generator": Laugh,
};

interface ToolIconProps {
  id: ToolId;
  className?: string;
}

export function ToolIcon({ id, className = "h-5 w-5" }: ToolIconProps) {
  const Icon = TOOL_ICONS[id] ?? ScanLine;

  return (
    <Icon
      className={className}
      strokeWidth={1.5}
      aria-hidden
    />
  );
}
