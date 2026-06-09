import type { ToolId } from "@/lib/tools";

interface ToolIconProps {
  id: ToolId;
  className?: string;
}

export function ToolIcon({ id, className = "h-5 w-5" }: ToolIconProps) {
  const props = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    "aria-hidden": true as const,
  };

  switch (id) {
    case "resizer":
      return (
        <svg {...props}>
          <path d="M4 8V4h4M20 16v4h-4M4 16v4h4M20 8V4h-4" />
          <rect x="7" y="7" width="10" height="10" rx="1" />
        </svg>
      );
    case "converter":
      return (
        <svg {...props}>
          <path d="M7 7h10v10H7z" />
          <path d="M4 12h3M17 12h3M12 4v3M12 17v3" />
        </svg>
      );
    case "compressor":
      return (
        <svg {...props}>
          <path d="M4 12h16" />
          <path d="M8 8l-4 4 4 4M16 8l4 4-4 4" />
        </svg>
      );
    case "cropper":
      return (
        <svg {...props}>
          <path d="M6 3v15a3 3 0 003 3h15" />
          <path d="M9 6h12v12" />
        </svg>
      );
    case "rotate-flip":
      return (
        <svg {...props}>
          <path d="M12 4V2M12 4a4 4 0 100 8M12 20v2M12 20a4 4 0 100-8" />
          <path d="M4 12H2M20 12h2" />
        </svg>
      );
    case "watermark":
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="14" rx="1" />
          <path d="M8 15l3-4 2 3 3-5 4 6" />
        </svg>
      );
    case "bg-remover":
      return (
        <svg {...props}>
          <path d="M5 5h14v14H5z" />
          <path d="M9 9h6M9 12h4M9 15h5" strokeDasharray="2 2" />
          <path d="M15 8l3 3-3 3" />
        </svg>
      );
    case "palette-extractor":
      return (
        <svg {...props}>
          <rect x="3" y="8" width="4" height="4" rx="1" />
          <rect x="10" y="8" width="4" height="4" rx="1" />
          <rect x="17" y="8" width="4" height="4" rx="1" />
          <path d="M3 16h18" />
          <path d="M7 4v4M12 4v4M17 4v4" />
        </svg>
      );
  }
}
