import type { Metadata } from "next";
import { FavoritesPageContent } from "@/components/favorites/FavoritesPageContent";

export const metadata: Metadata = {
  title: "Favorites",
  description:
    "Your saved Pix-8 tools — quick access to the image utilities you use most.",
};

export default function FavoritesPage() {
  return <FavoritesPageContent />;
}
