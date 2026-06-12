export const toolActionStackClassName = "flex w-full flex-col gap-3";

export const toolActionRowClassName =
  "flex w-full flex-row flex-wrap items-stretch gap-3 sm:flex-nowrap";

const toolActionBaseClassName =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border px-4 py-2.5 font-label text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40";

export const toolActionSaveButtonClassName = `${toolActionBaseClassName} w-full border-border bg-surface text-foreground hover:border-muted hover:bg-surface-hover`;

export const toolActionButtonClassName = `${toolActionBaseClassName} min-w-0 flex-1 border-border bg-surface text-foreground hover:border-muted hover:bg-surface-hover`;

export const toolActionPrimaryClassName = `${toolActionBaseClassName} min-w-0 flex-1 border-[color-mix(in_srgb,var(--glow-teal)_40%,var(--border))] bg-accent-muted font-medium text-accent hover:border-[color-mix(in_srgb,var(--glow-teal)_55%,var(--border))] hover:bg-accent/20 active:bg-accent/25`;

export const toolActionTooltipClassName =
  "pointer-events-none absolute bottom-[calc(100%+0.5rem)] left-1/2 z-30 w-[min(17rem,calc(100vw-2rem))] -translate-x-1/2 rounded-sm border border-border bg-card px-3 py-2 text-center font-mono text-[10px] leading-relaxed text-foreground shadow-[var(--glass-shadow)] opacity-0 transition-opacity duration-200 group-hover:opacity-100";
