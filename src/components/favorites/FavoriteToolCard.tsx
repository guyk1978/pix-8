"use client";

import Image from "next/image";
import { AppLink } from "@/components/layout/AppLink";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import { ToolPreviewSketch } from "@/components/favorites/ToolPreviewSketch";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { getToolTranslationKey } from "@/i18n";
import { getHomeToolHref } from "@/lib/homeTool";
import { getToolPreviewImageSrc } from "@/lib/toolPreviewImage";
import type { Tool } from "@/lib/tools";

interface FavoriteToolCardProps {
  tool: Tool;
}

export function FavoriteToolCard({ tool }: FavoriteToolCardProps) {
  const { t } = useLanguage();
  const toolName = t(getToolTranslationKey(tool.id, "name"));
  const previewSrc = getToolPreviewImageSrc(tool.id);

  return (
    <article className="group relative min-w-0 overflow-hidden rounded-none border border-border bg-card transition-[border-color,box-shadow] duration-200 hover:border-muted hover:shadow-[var(--shadow-hover)]">
      <div className="absolute top-2 z-10 end-2">
        <FavoriteButton
          toolSlug={tool.id}
          size="sm"
          className="rounded-none border border-border/80 bg-background/90 backdrop-blur-sm"
        />
      </div>

      <AppLink
        href={getHomeToolHref(tool.id)}
        className="block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-muted"
        aria-label={t("favorites.openTool", { name: toolName })}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-background">
          <Image
            src={previewSrc}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            unoptimized
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
            aria-hidden
          />
          <ToolPreviewSketch toolId={tool.id} />
          <div className="absolute inset-x-0 bottom-0 z-[3] p-3 sm:p-4">
            <h2 className="font-label text-sm font-medium leading-snug text-white drop-shadow-sm sm:text-base">
              {toolName}
            </h2>
          </div>
        </div>
      </AppLink>
    </article>
  );
}
