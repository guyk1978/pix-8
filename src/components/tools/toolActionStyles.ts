export const toolActionRowClassName =
  "flex w-full flex-row flex-wrap items-stretch gap-2 sm:flex-nowrap";

export const toolSidebarActionsClassName =
  "tool-sidebar-actions flex w-full flex-col items-stretch gap-2";

const toolActionBaseClassName =
  "tool-workspace-action inline-flex min-h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-none border border-border bg-card px-3 py-2.5 font-label text-sm text-foreground transition-[background-color,border-color,color] duration-200 hover:border-muted disabled:cursor-not-allowed disabled:opacity-40";

export const toolSidebarActionButtonClassName =
  "tool-sidebar-action-btn inline-flex min-h-11 w-full flex-none items-center justify-start gap-2.5 rounded-none border border-border bg-background px-3 py-2.5 font-label text-sm text-foreground transition-[background-color,border-color,color] duration-200 hover:border-muted hover:bg-card-hover disabled:cursor-not-allowed disabled:opacity-40";

export const toolActionSaveButtonClassName = toolActionBaseClassName;

export const toolActionButtonClassName = toolActionBaseClassName;

export const toolActionPrimaryClassName = `${toolActionBaseClassName} font-medium`;

export const embeddedToolbarButtonClassName =
  "embedded-toolbar-btn inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-md bg-foreground/[0.06] px-2.5 font-label text-[0.625rem] uppercase tracking-[0.06em] text-foreground/85 transition-colors duration-200 hover:bg-foreground/[0.1] hover:text-foreground disabled:cursor-not-allowed disabled:opacity-35";

export const embeddedToolbarPrimaryClassName =
  "embedded-toolbar-btn embedded-toolbar-btn-primary inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-md bg-[color-mix(in_srgb,var(--accent)_20%,var(--card))] px-3 font-label text-[0.625rem] font-semibold uppercase tracking-[0.06em] text-accent transition-colors duration-200 hover:bg-[color-mix(in_srgb,var(--accent)_30%,var(--card))] disabled:cursor-not-allowed disabled:opacity-35";

export const toolActionTooltipClassName =
  "pointer-events-none absolute bottom-[calc(100%+0.5rem)] left-1/2 z-30 w-[min(17rem,calc(100vw-2rem))] -translate-x-1/2 rounded-lg bg-card px-3 py-2 text-center font-mono text-[10px] leading-relaxed text-foreground shadow-[var(--shadow-elevated)] opacity-0 transition-opacity duration-200 group-hover:opacity-100";
