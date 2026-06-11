"use client";

import { Star } from "lucide-react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useFavorites } from "@/components/favorites/FavoritesContext";
import type { ToolId } from "@/lib/tools";

interface FavoriteButtonProps {
  toolSlug: ToolId;
  className?: string;
  size?: "sm" | "md";
}

const sizeClassName = {
  sm: "h-7 w-7",
  md: "h-8 w-8",
} as const;

const iconSizeClassName = {
  sm: "h-5 w-5",
  md: "h-7 w-7",
} as const;

const FAVORITE_COLOR = "#F5C518";

export function FavoriteButton({
  toolSlug,
  className = "",
  size = "md",
}: FavoriteButtonProps) {
  const { t } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(toolSlug);

  return (
    <button
      type="button"
      data-favorite={active ? "true" : "false"}
      aria-pressed={active}
      aria-label={
        active ? t("favorites.removeLabel") : t("favorites.addLabel")
      }
      title={active ? t("favorites.removeLabel") : t("favorites.addLabel")}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleFavorite(toolSlug);
      }}
      className={`inline-flex shrink-0 items-center justify-center overflow-visible rounded-sm bg-transparent text-muted transition-colors hover:text-foreground ${sizeClassName[size]} ${className}`}
    >
      <Star
        className={iconSizeClassName[size]}
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
    </button>
  );
}
