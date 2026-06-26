"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Star } from "lucide-react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import {
  computeAggregateRating,
  fetchPublicRatingOverrides,
  formatRatingValue,
  getResolvedSeed,
  getUserVote,
  saveUserVote,
  updateToolJsonLdScript,
  type ToolAggregateRating,
  type ToolRatingsSeedFile,
} from "@/lib/toolRatings";
import type { ToolId } from "@/lib/tools";

interface ToolStarRatingProps {
  toolId: ToolId;
  toolName: string;
  variant?: "page" | "sidebar" | "toolbar";
}

export function ToolStarRating({
  toolId,
  toolName,
  variant = "page",
}: ToolStarRatingProps) {
  const { t, dir } = useLanguage();
  const [overrides, setOverrides] = useState<ToolRatingsSeedFile | null>(null);
  const [userVote, setUserVote] = useState<number | null>(null);
  const [hoverValue, setHoverValue] = useState(0);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setUserVote(getUserVote(toolId));
    setHasHydrated(true);

    void fetchPublicRatingOverrides().then((data) => {
      if (data) setOverrides(data);
    });
  }, [toolId]);

  const seed = useMemo(
    () => getResolvedSeed(toolId, overrides),
    [toolId, overrides],
  );

  const aggregate = useMemo(
    (): ToolAggregateRating => computeAggregateRating(seed, userVote),
    [seed, userVote],
  );

  useEffect(() => {
    if (!hasHydrated) return;
    updateToolJsonLdScript(toolId, aggregate);
  }, [aggregate, hasHydrated, toolId]);

  const handleRate = useCallback(
    (value: number) => {
      if (userVote !== null) return;

      saveUserVote(toolId, value);
      setUserVote(value);
    },
    [toolId, userVote],
  );

  const activeValue = hoverValue || userVote || 0;
  const hasVoted = userVote !== null;
  const isSidebar = variant === "sidebar";
  const isToolbar = variant === "toolbar";
  const isCompact = isSidebar || isToolbar;

  return (
    <section
      aria-label={t("toolRating.sectionLabel")}
      className={
        isToolbar
          ? "embedded-toolbar-rating"
          : isSidebar
            ? "tool-sidebar-rating"
            : "mt-8 border-t border-border pt-6"
      }
      itemScope
      itemType="https://schema.org/SoftwareApplication"
    >
      <meta itemProp="name" content={toolName} />

      <div
        className={
          isToolbar
            ? "embedded-toolbar-rating-card"
            : isSidebar
              ? "flex flex-col gap-2 rounded-none border border-border bg-background px-3 py-3"
              : "flex flex-col gap-3 rounded-lg border border-border bg-background/60 p-4 sm:flex-row sm:items-center sm:justify-between"
        }
        itemProp="aggregateRating"
        itemScope
        itemType="https://schema.org/AggregateRating"
      >
        {isToolbar ? (
          <p className="embedded-toolbar-rating-title font-label text-xs text-foreground">
            {hasVoted ? t("toolRating.thankYou") : t("toolRating.prompt")}
          </p>
        ) : null}

        <div
          className={
            isToolbar
              ? "embedded-toolbar-rating-row"
              : "flex w-full items-center justify-between gap-2"
          }
          dir={isToolbar ? dir : undefined}
        >
          {!isToolbar ? (
            <div className="min-w-0">
              <p
                className={`font-label text-foreground ${
                  isCompact ? "text-xs" : "text-sm"
                }`}
              >
                {hasVoted ? t("toolRating.thankYou") : t("toolRating.prompt")}
              </p>
              <p
                className={`font-mono text-muted ${
                  isCompact ? "mt-0.5 text-[10px]" : "mt-1 text-[10px]"
                }`}
              >
                <span itemProp="ratingValue">
                  {formatRatingValue(aggregate.ratingValue)}
                </span>
                {" / "}
                <span itemProp="bestRating">5</span>
                {" · "}
                <span itemProp="ratingCount">{aggregate.ratingCount}</span>{" "}
                {t("toolRating.ratingsLabel")}
              </p>
              <meta itemProp="worstRating" content="1" />
            </div>
          ) : null}

          {isToolbar ? (
            <>
              <p className="embedded-toolbar-rating-stats shrink-0 font-mono text-muted">
                <span itemProp="ratingValue">
                  {formatRatingValue(aggregate.ratingValue)}
                </span>
                {" / "}
                <span itemProp="bestRating">5</span>
                {" · "}
                <span itemProp="ratingCount">{aggregate.ratingCount}</span>{" "}
                {t("toolRating.ratingsLabel")}
              </p>
              <meta itemProp="worstRating" content="1" />
            </>
          ) : null}

          <div
            className={`flex shrink-0 items-center gap-0.5 ${
              isCompact && !isToolbar ? "justify-start" : ""
            }`}
            role="group"
            aria-label={t("toolRating.starsLabel")}
            onMouseLeave={() => setHoverValue(0)}
          >
          {Array.from({ length: 5 }, (_, index) => {
            const starValue = index + 1;
            const isActive = starValue <= activeValue;

            return (
              <button
                key={starValue}
                type="button"
                disabled={hasVoted}
                aria-label={t("toolRating.rateStars", { count: starValue })}
                aria-pressed={userVote === starValue}
                onMouseEnter={() => {
                  if (!hasVoted) setHoverValue(starValue);
                }}
                onFocus={() => {
                  if (!hasVoted) setHoverValue(starValue);
                }}
                onBlur={() => setHoverValue(0)}
                onClick={() => handleRate(starValue)}
                className={
                  isToolbar
                    ? "inline-flex h-7 w-7 items-center justify-center rounded-md transition-[color,transform] duration-200 hover:scale-105 disabled:cursor-default disabled:hover:scale-100"
                    : isSidebar
                      ? "inline-flex h-8 w-8 items-center justify-center rounded-none transition-[color,transform] duration-200 hover:scale-105 disabled:cursor-default disabled:hover:scale-100"
                      : "inline-flex h-10 w-10 items-center justify-center rounded-sm transition-[color,transform,filter] duration-200 hover:scale-105 disabled:cursor-default disabled:hover:scale-100"
                }
              >
                <Star
                  className={`transition-colors duration-200 ${
                    isToolbar ? "h-3.5 w-3.5" : isSidebar ? "h-4 w-4" : "h-5 w-5"
                  } ${
                    isActive
                      ? isCompact
                        ? "fill-amber-400 text-amber-400"
                        : "fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.35)]"
                      : "fill-transparent text-muted"
                  }`}
                  strokeWidth={1.5}
                  aria-hidden
                />
              </button>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
