"use client";

import { Star } from "lucide-react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useFavorites } from "@/components/favorites/FavoritesContext";
import { useToolSidebar } from "@/components/layout/ToolSidebarContext";
import { toolSidebarActionButtonClassName } from "@/components/tools/toolActionStyles";

const FAVORITE_COLOR = "#F5C518";

export function ToolSidebarFavoriteButton() {
  const { t } = useLanguage();
  const { toolId } = useToolSidebar();
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!toolId) {
    return null;
  }

  const active = isFavorite(toolId);

  return (
    <button
      type="button"
      data-favorite={active ? "true" : "false"}
      aria-pressed={active}
      aria-label={active ? t("favorites.removeLabel") : t("favorites.addLabel")}
      onClick={() => toggleFavorite(toolId)}
      className={toolSidebarActionButtonClassName}
    >
      <Star
        className="h-4 w-4 shrink-0"
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
      <span>{active ? t("favorites.removeLabel") : t("favorites.addLabel")}</span>
    </button>
  );
}
