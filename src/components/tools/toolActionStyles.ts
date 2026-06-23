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

export const toolActionTooltipClassName =
  "pointer-events-none absolute bottom-[calc(100%+0.5rem)] left-1/2 z-30 w-[min(17rem,calc(100vw-2rem))] -translate-x-1/2 rounded-lg bg-card px-3 py-2 text-center font-mono text-[10px] leading-relaxed text-foreground shadow-[var(--shadow-elevated)] opacity-0 transition-opacity duration-200 group-hover:opacity-100";
