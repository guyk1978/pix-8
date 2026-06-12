export const toolActionStackClassName = "flex w-full flex-col gap-3";

export const toolActionRowClassName =
  "flex w-full flex-row flex-wrap items-stretch gap-3 sm:flex-nowrap";

const toolActionBaseClassName =
  "tool-workspace-action inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-label text-sm transition-[background-color,box-shadow,color] duration-200 disabled:cursor-not-allowed disabled:opacity-40";

export const toolActionSaveButtonClassName = `${toolActionBaseClassName} w-full`;

export const toolActionButtonClassName = `${toolActionBaseClassName} min-w-0 flex-1`;

export const toolActionPrimaryClassName = `${toolActionBaseClassName} min-w-0 flex-1 font-medium text-foreground`;

export const toolActionTooltipClassName =
  "pointer-events-none absolute bottom-[calc(100%+0.5rem)] left-1/2 z-30 w-[min(17rem,calc(100vw-2rem))] -translate-x-1/2 rounded-lg bg-card px-3 py-2 text-center font-mono text-[10px] leading-relaxed text-foreground shadow-[var(--shadow-elevated)] opacity-0 transition-opacity duration-200 group-hover:opacity-100";
