"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  loadFavoriteSlugs,
  saveFavoriteSlugs,
} from "@/lib/favorites";
import type { ToolId } from "@/lib/tools";

interface FavoritesContextValue {
  favorites: ToolId[];
  isFavorite: (toolSlug: ToolId) => boolean;
  toggleFavorite: (toolSlug: ToolId) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<ToolId[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setFavorites(loadFavoriteSlugs());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveFavoriteSlugs(favorites);
  }, [favorites, hydrated]);

  const isFavorite = useCallback(
    (toolSlug: ToolId) => favorites.includes(toolSlug),
    [favorites],
  );

  const toggleFavorite = useCallback((toolSlug: ToolId) => {
    setFavorites((current) =>
      current.includes(toolSlug)
        ? current.filter((slug) => slug !== toolSlug)
        : [...current, toolSlug],
    );
  }, []);

  const value = useMemo(
    () => ({
      favorites,
      isFavorite,
      toggleFavorite,
    }),
    [favorites, isFavorite, toggleFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }

  return context;
}
