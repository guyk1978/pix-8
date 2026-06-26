"use client";

import { Star } from "lucide-react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useFavorites } from "@/components/favorites/FavoritesContext";
import { useOptionalToolSidebar } from "@/components/layout/ToolSidebarContext";
import { toolSidebarActionButtonClassName } from "@/components/tools/toolActionStyles";

const FAVORITE_COLOR = "#F5C518";

interface ToolSidebarFavoriteButtonProps {
  variant?: "sidebar" | "toolbar";
}

export function ToolSidebarFavoriteButton({
  variant = "sidebar",
}: ToolSidebarFavoriteButtonProps) {
  const { t } = useLanguage();
  const toolId = useOptionalToolSidebar()?.toolId ?? null;
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!toolId) {
    return null;
  }

  const active = isFavorite(toolId);
  const isToolbar = variant === "toolbar";

  return (
    <button
      type="button"
      data-favorite={active ? "true" : "false"}
      aria-pressed={active}
      aria-label={active ? t("favorites.removeLabel") : t("favorites.addLabel")}
      onClick={() => toggleFavorite(toolId)}
      className={
        isToolbar
          ? "embedded-toolbar-btn inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-md bg-foreground/[0.06] px-2.5 font-label text-[0.625rem] uppercase tracking-[0.06em] text-foreground/85 transition-colors duration-200 hover:bg-foreground/[0.1] hover:text-foreground"
          : toolSidebarActionButtonClassName
      }
    >
      <Star
        className={`shrink-0 ${isToolbar ? "h-3.5 w-3.5" : "h-4 w-4"}`}
        strokeWidth={active ? 1.25 : 1.5}
        fill={active ? FAVORITE_COLOR : "none"}
        stroke={active ? FAVORITE_COLOR : "currentColor"}
        style={
          active
            ? { fill: FAVORITE_COLOR, stroke: FAVORITE_COLOR, color: FAVORITE_COLOR }
            : undefined
        }
        aria-hidden
      />
      <span className={isToolbar ? "hidden sm:inline" : undefined}>
        {active ? t("favorites.removeLabel") : t("favorites.addLabel")}
      </span>
    </button>
  );
}
