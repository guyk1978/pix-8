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
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
} as const;

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
      className={`inline-flex shrink-0 items-center justify-center rounded-sm border border-border bg-background text-muted transition-colors hover:border-muted hover:bg-surface hover:text-foreground ${
        active
          ? "border-[color-mix(in_srgb,var(--glow-teal)_35%,var(--border))] bg-accent-muted text-[var(--glow-teal)]"
          : ""
      } ${sizeClassName[size]} ${className}`}
    >
      <Star
        className={iconSizeClassName[size]}
        strokeWidth={1.5}
        fill={active ? "currentColor" : "none"}
        aria-hidden
      />
    </button>
  );
}
