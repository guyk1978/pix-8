import type { ToolId } from "@/lib/tools";

const S = {
  stroke: "white",
  strokeWidth: 2.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none" as const,
};

function ResizerSketch() {
  return (
    <>
      <rect x="38" y="24" width="44" height="32" rx="1" {...S} />
      <path d="M30 40 H22 M30 36 V44" {...S} />
      <path d="M90 40 H98 M90 36 V44" {...S} />
      <path d="M60 16 V8 M56 12 H64" {...S} />
      <path d="M60 64 V72 M56 68 H64" {...S} />
    </>
  );
}

function ConverterSketch() {
  return (
    <>
      <rect x="14" y="28" width="28" height="24" rx="1" {...S} />
      <text x="28" y="44" textAnchor="middle" fill="white" fontSize="9" fontFamily="monospace">
        JPG
      </text>
      <path d="M48 40 H58" {...S} />
      <path d="M54 36 L58 40 L54 44" {...S} />
      <rect x="62" y="28" width="28" height="24" rx="1" {...S} />
      <text x="76" y="44" textAnchor="middle" fill="white" fontSize="9" fontFamily="monospace">
        WebP
      </text>
    </>
  );
}

function CompressorSketch() {
  return (
    <>
      <rect x="12" y="22" width="36" height="36" rx="1" {...S} />
      <text x="30" y="44" textAnchor="middle" fill="white" fontSize="10" fontFamily="monospace">
        2MB
      </text>
      <path d="M54 40 H66" {...S} />
      <path d="M62 36 L66 40 L62 44" {...S} />
      <rect x="70" y="30" width="24" height="20" rx="1" {...S} />
      <text x="82" y="44" textAnchor="middle" fill="white" fontSize="9" fontFamily="monospace">
        200K
      </text>
    </>
  );
}

function CropperSketch() {
  return (
    <>
      <rect x="20" y="16" width="80" height="48" rx="1" stroke="white" strokeWidth="1" strokeOpacity="0.35" fill="none" />
      <rect x="34" y="26" width="52" height="32" rx="1" stroke="white" strokeWidth="1.75" strokeDasharray="4 3" fill="rgba(255,255,255,0.08)" />
      <path d="M34 26 H42 M34 26 V34" {...S} />
      <path d="M86 26 H78 M86 26 V34" {...S} />
      <path d="M34 58 H42 M34 58 V50" {...S} />
      <path d="M86 58 H78 M86 58 V50" {...S} />
    </>
  );
}

function CustomCutterSketch() {
  return (
    <>
      <path
        d="M32 52 L48 24 L72 28 L88 48 L76 62 L44 58 Z"
        stroke="white"
        strokeWidth="1.75"
        strokeDasharray="5 3"
        fill="rgba(255,255,255,0.1)"
        strokeLinejoin="round"
      />
      <path d="M48 24 L48 18 M72 28 L78 26" {...S} strokeOpacity="0.7" />
    </>
  );
}

function RotateFlipSketch() {
  return (
    <>
      <rect x="42" y="26" width="36" height="28" rx="1" {...S} />
      <path d="M88 30 A18 18 0 0 1 88 50" {...S} />
      <path d="M84 46 L88 50 L92 46" {...S} />
    </>
  );
}

function WatermarkSketch() {
  return (
    <>
      <rect x="28" y="22" width="64" height="36" rx="1" {...S} strokeOpacity="0.5" />
      <text
        x="60"
        y="46"
        textAnchor="middle"
        fill="white"
        fillOpacity="0.85"
        fontSize="14"
        fontFamily="sans-serif"
        transform="rotate(-24 60 46)"
      >
        SAMPLE
      </text>
    </>
  );
}

function BgRemoverSketch() {
  return (
    <>
      <rect x="18" y="18" width="84" height="44" rx="1" stroke="white" strokeWidth="1" strokeDasharray="3 4" strokeOpacity="0.45" fill="none" />
      <circle cx="60" cy="38" r="10" {...S} />
      <path d="M48 54 C52 46 56 44 60 44 C64 44 68 46 72 54" {...S} />
      <path d="M22 22 L30 30 M98 22 L90 30" {...S} strokeOpacity="0.4" />
    </>
  );
}

function PaletteExtractorSketch() {
  return (
    <>
      <circle cx="36" cy="34" r="4" fill="#f87171" stroke="white" strokeWidth="1" />
      <circle cx="48" cy="28" r="4" fill="#60a5fa" stroke="white" strokeWidth="1" />
      <circle cx="60" cy="36" r="4" fill="#4ade80" stroke="white" strokeWidth="1" />
      <path d="M68 42 L78 52 L78 58 L72 58 L68 52 Z" fill="white" fillOpacity="0.9" stroke="white" strokeWidth="1" />
      <rect x="24" y="48" width="10" height="10" rx="1" fill="#f87171" stroke="white" strokeWidth="1" />
      <rect x="38" y="48" width="10" height="10" rx="1" fill="#60a5fa" stroke="white" strokeWidth="1" />
      <rect x="52" y="48" width="10" height="10" rx="1" fill="#4ade80" stroke="white" strokeWidth="1" />
      <rect x="66" y="48" width="10" height="10" rx="1" fill="#fbbf24" stroke="white" strokeWidth="1" />
    </>
  );
}

function MetadataRemoverSketch() {
  return (
    <>
      <rect x="30" y="20" width="60" height="40" rx="1" {...S} />
      <text x="60" y="38" textAnchor="middle" fill="white" fontSize="10" fontFamily="monospace">
        EXIF
      </text>
      <path d="M34 48 H86" {...S} strokeWidth="2" />
      <path d="M38 52 H82" {...S} strokeOpacity="0.5" strokeWidth="1" />
    </>
  );
}

function ColorPickerSketch() {
  return (
    <>
      <rect x="24" y="24" width="48" height="32" rx="1" {...S} strokeOpacity="0.45" />
      <circle cx="42" cy="38" r="6" fill="#38bdf8" stroke="white" strokeWidth="1.5" />
      <path d="M58 52 L72 66 L76 62 L62 48 Z" fill="white" fillOpacity="0.95" stroke="white" strokeWidth="1" />
      <path d="M62 48 L58 52" {...S} />
    </>
  );
}

function TextOverlaySketch() {
  return (
    <>
      <rect x="22" y="20" width="76" height="40" rx="1" {...S} strokeOpacity="0.4" />
      <rect x="30" y="46" width="60" height="16" rx="1" fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="1.5" />
      <text x="60" y="57" textAnchor="middle" fill="white" fontSize="11" fontFamily="sans-serif">
        Hello
      </text>
    </>
  );
}

function ImageOverlaySketch() {
  return (
    <>
      <rect x="20" y="28" width="44" height="32" rx="1" {...S} strokeOpacity="0.5" />
      <rect x="56" y="20" width="44" height="32" rx="1" fill="rgba(255,255,255,0.12)" {...S} />
      <circle cx="72" cy="32" r="6" {...S} strokeOpacity="0.7" />
    </>
  );
}

function BorderGeneratorSketch() {
  return (
    <>
      <rect x="26" y="18" width="68" height="44" rx="1" stroke="white" strokeWidth="5" fill="none" />
      <rect x="38" y="30" width="44" height="20" rx="1" {...S} strokeOpacity="0.35" />
    </>
  );
}

function GrayscaleSketch() {
  return (
    <>
      <rect x="22" y="22" width="76" height="36" rx="1" {...S} />
      <line x1="60" y1="22" x2="60" y2="58" {...S} />
      <circle cx="42" cy="38" r="8" fill="#f472b6" stroke="white" strokeWidth="1" />
      <circle cx="78" cy="38" r="8" fill="#9ca3af" stroke="white" strokeWidth="1" />
    </>
  );
}

function FaviconSketch() {
  return (
    <>
      <rect x="24" y="24" width="72" height="32" rx="2" {...S} />
      <rect x="24" y="24" width="72" height="10" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="1" />
      <rect x="30" y="40" width="12" height="12" rx="1" fill="rgba(255,255,255,0.2)" {...S} />
      <path d="M33 46 L36 49 L39 43" stroke="white" strokeWidth="1.5" fill="none" />
    </>
  );
}

function SharpenerSketch() {
  return (
    <>
      <path d="M20 44 Q32 36 44 44 T68 44" {...S} strokeOpacity="0.45" />
      <path d="M20 52 L44 52 L68 52" {...S} strokeWidth="2.5" />
      <path d="M44 52 L48 46 M44 52 L48 58" {...S} />
    </>
  );
}

function LightAdjusterSketch() {
  return (
    <>
      <circle cx="38" cy="34" r="10" {...S} />
      <path d="M38 18 V22 M38 46 V50 M22 34 H26 M50 34 H54 M26 26 L29 29 M47 39 L50 42 M47 29 L50 26 M26 42 L29 39" {...S} strokeOpacity="0.7" />
      <rect x="58" y="44" width="40" height="4" rx="1" fill="rgba(255,255,255,0.25)" stroke="white" strokeWidth="1" />
      <circle cx="78" cy="46" r="5" fill="white" fillOpacity="0.9" />
    </>
  );
}

function InverterSketch() {
  return (
    <>
      <rect x="24" y="22" width="72" height="36" rx="1" {...S} />
      <line x1="60" y1="22" x2="60" y2="58" {...S} />
      <rect x="28" y="26" width="28" height="28" fill="rgba(255,255,255,0.15)" stroke="none" />
      <rect x="64" y="26" width="28" height="28" fill="rgba(0,0,0,0.35)" stroke="none" />
    </>
  );
}

function DenoiserSketch() {
  return (
    <>
      <g stroke="white" strokeWidth="1" fill="white" fillOpacity="0.7">
        {[22, 30, 38, 46].map((x) =>
          [28, 36, 44, 52].map((y) => (
            <circle key={`${x}-${y}`} cx={x + (y % 3)} cy={y + (x % 2)} r="1.2" />
          )),
        )}
      </g>
      <path d="M58 40 H64" {...S} />
      <path d="M62 36 L66 40 L62 44" {...S} />
      <rect x="70" y="30" width="28" height="20" rx="1" fill="rgba(255,255,255,0.12)" {...S} />
    </>
  );
}

function CssPaletteSketch() {
  return (
    <>
      <text x="24" y="36" fill="white" fontSize="9" fontFamily="monospace">
        {"--c1: #f43"}
      </text>
      <text x="24" y="48" fill="white" fontSize="9" fontFamily="monospace">
        {"--c2: #38b"}
      </text>
      <rect x="78" y="28" width="10" height="10" fill="#f43" stroke="white" strokeWidth="1" />
      <rect x="92" y="28" width="10" height="10" fill="#38bdf8" stroke="white" strokeWidth="1" />
    </>
  );
}

function LensCorrectorSketch() {
  return (
    <>
      <path d="M24 30 Q60 18 96 30" {...S} strokeOpacity="0.45" strokeDasharray="3 3" />
      <path d="M24 50 H96" {...S} />
      <path d="M24 40 Q60 52 96 40" {...S} strokeOpacity="0.45" strokeDasharray="3 3" />
    </>
  );
}

function GrainSketch() {
  return (
    <>
      <rect x="28" y="22" width="64" height="36" rx="1" {...S} />
      <g stroke="white" strokeWidth="0.6" strokeOpacity="0.55">
        {Array.from({ length: 24 }, (_, i) => (
          <line
            key={i}
            x1={32 + (i % 6) * 10}
            y1={26 + Math.floor(i / 6) * 8}
            x2={36 + (i % 6) * 10}
            y2={30 + Math.floor(i / 6) * 8}
          />
        ))}
      </g>
    </>
  );
}

function Base64Sketch() {
  return (
    <>
      <rect x="22" y="24" width="36" height="32" rx="1" {...S} strokeOpacity="0.45" />
      <path d="M62 40 H68" {...S} />
      <path d="M66 36 L70 40 L66 44" {...S} />
      <text x="76" y="38" fill="white" fontSize="7" fontFamily="monospace">
        iVBOR
      </text>
      <text x="76" y="48" fill="white" fontSize="7" fontFamily="monospace">
        w0KGgo
      </text>
    </>
  );
}

function ImageFiltersSketch() {
  return (
    <>
      <rect x="22" y="22" width="76" height="36" rx="1" {...S} />
      <line x1="60" y1="22" x2="60" y2="58" {...S} />
      <circle cx="42" cy="38" r="8" fill="#fb923c" fillOpacity="0.5" stroke="white" strokeWidth="1" />
      <circle cx="78" cy="38" r="8" fill="#818cf8" fillOpacity="0.5" stroke="white" strokeWidth="1" />
      <path d="M52 52 H68" {...S} strokeOpacity="0.6" />
      <circle cx="60" cy="52" r="3" fill="white" />
    </>
  );
}

function ImageToSvgSketch() {
  return (
    <>
      <g stroke="white" strokeWidth="1" fill="rgba(255,255,255,0.15)">
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2].map((col) => (
            <rect key={`${row}-${col}`} x={24 + col * 10} y={26 + row * 10} width="8" height="8" />
          )),
        )}
      </g>
      <path d="M58 40 H64" {...S} />
      <path d="M62 36 L66 40 L62 44" {...S} />
      <path d="M72 48 Q80 28 92 36 T96 52" {...S} strokeWidth="2" />
    </>
  );
}

function CollageSketch() {
  return (
    <>
      <rect x="24" y="24" width="32" height="24" rx="1" {...S} />
      <rect x="60" y="24" width="32" height="24" rx="1" {...S} />
      <rect x="24" y="52" width="32" height="24" rx="1" {...S} />
      <rect x="60" y="52" width="32" height="24" rx="1" {...S} />
    </>
  );
}

function MemeSketch() {
  return (
    <>
      <rect x="28" y="20" width="64" height="40" rx="1" {...S} strokeOpacity="0.45" />
      <rect x="28" y="20" width="64" height="10" fill="rgba(0,0,0,0.35)" stroke="none" />
      <rect x="28" y="50" width="64" height="10" fill="rgba(0,0,0,0.35)" stroke="none" />
      <text x="60" y="28" textAnchor="middle" fill="white" fontSize="7" fontFamily="sans-serif">
        TOP
      </text>
      <text x="60" y="58" textAnchor="middle" fill="white" fontSize="7" fontFamily="sans-serif">
        BOTTOM
      </text>
    </>
  );
}

function MagnifierSketch() {
  return (
    <>
      <circle cx="52" cy="36" r="16" {...S} strokeWidth="2" />
      <circle cx="52" cy="36" r="8" {...S} strokeOpacity="0.5" />
      <path d="M64 48 L78 62" {...S} strokeWidth="2.5" />
    </>
  );
}

function AnnotatorSketch() {
  return (
    <>
      <rect x="24" y="22" width="72" height="36" rx="1" {...S} strokeOpacity="0.35" />
      <circle cx="48" cy="38" r="5" fill="#f87171" stroke="white" strokeWidth="1.5" />
      <path d="M53 38 H72" {...S} />
      <path d="M68 34 L72 38 L68 42" {...S} />
      <path d="M58 50 L66 58 L74 46" {...S} strokeDasharray="4 3" />
    </>
  );
}

const SKETCHES: Record<ToolId, () => React.JSX.Element> = {
  resizer: ResizerSketch,
  converter: ConverterSketch,
  compressor: CompressorSketch,
  cropper: CropperSketch,
  "custom-cutter": CustomCutterSketch,
  "rotate-flip": RotateFlipSketch,
  watermark: WatermarkSketch,
  "bg-remover": BgRemoverSketch,
  "palette-extractor": PaletteExtractorSketch,
  "metadata-remover": MetadataRemoverSketch,
  "color-picker": ColorPickerSketch,
  "text-overlay": TextOverlaySketch,
  "image-overlay": ImageOverlaySketch,
  "border-generator": BorderGeneratorSketch,
  "grayscale-converter": GrayscaleSketch,
  "favicon-generator": FaviconSketch,
  sharpener: SharpenerSketch,
  "light-adjuster": LightAdjusterSketch,
  "image-inverter": InverterSketch,
  denoiser: DenoiserSketch,
  "css-palette-gen": CssPaletteSketch,
  "lens-corrector": LensCorrectorSketch,
  "grain-generator": GrainSketch,
  "base64-encoder": Base64Sketch,
  "image-filters": ImageFiltersSketch,
  "image-to-svg": ImageToSvgSketch,
  "image-collage": CollageSketch,
  "meme-generator": MemeSketch,
  magnifier: MagnifierSketch,
  "image-annotator": AnnotatorSketch,
};

interface ToolPreviewSketchProps {
  toolId: ToolId;
}

export function ToolPreviewSketch({ toolId }: ToolPreviewSketchProps) {
  const Sketch = SKETCHES[toolId];

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center pb-8"
      aria-hidden
    >
      <svg
        viewBox="0 0 120 80"
        className="h-[62%] w-[78%] max-h-40 max-w-[15rem] drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)] sm:max-h-44 sm:max-w-[17rem]"
        role="presentation"
      >
        <Sketch />
      </svg>
    </div>
  );
}
