"use client";

interface BackgroundRemovalScanOverlayProps {
  label: string;
  sublabel?: string;
  progress?: number;
  variant?: "scan" | "download";
}

export function BackgroundRemovalScanOverlay({
  label,
  sublabel,
  progress,
  variant = "scan",
}: BackgroundRemovalScanOverlayProps) {
  return (
    <div
      className="bg-remover-scan-overlay pointer-events-none absolute inset-0 z-10 overflow-hidden"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="bg-remover-scan-dim absolute inset-0 bg-background/30" aria-hidden />

      {variant === "scan" ? (
        <>
          <div className="bg-remover-scan-beam" aria-hidden />
          <div className="bg-remover-scan-line" aria-hidden />
          <div className="bg-remover-scan-grid" aria-hidden />
        </>
      ) : progress !== undefined ? (
        <div
          className="absolute inset-x-6 top-1/2 max-w-md -translate-y-1/2 sm:inset-x-10"
          aria-hidden
        >
          <div className="h-1 overflow-hidden rounded-full bg-foreground/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[var(--glow-teal)] via-[var(--glow-purple)] to-[var(--glow-blue)] transition-[width] duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : null}

      <div className="bg-remover-scan-status absolute inset-x-0 bottom-0 border-t border-border/70 bg-background/88 px-4 py-2.5 text-center backdrop-blur-sm">
        <p className="font-label text-accent">{label}</p>
        {sublabel ? (
          <p className="mt-0.5 font-mono text-[10px] text-muted sm:text-xs">{sublabel}</p>
        ) : null}
      </div>
    </div>
  );
}
