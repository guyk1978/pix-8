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
}

export function ToolStarRating({ toolId, toolName }: ToolStarRatingProps) {
  const { t } = useLanguage();
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

  return (
    <section
      aria-label={t("toolRating.sectionLabel")}
      className="mt-8 border-t border-border pt-6"
      itemScope
      itemType="https://schema.org/SoftwareApplication"
    >
      <meta itemProp="name" content={toolName} />

      <div
        className="flex flex-col gap-3 rounded-lg border border-border bg-background/60 p-4 sm:flex-row sm:items-center sm:justify-between"
        itemProp="aggregateRating"
        itemScope
        itemType="https://schema.org/AggregateRating"
      >
        <div className="min-w-0">
          <p className="font-label text-sm text-foreground">
            {hasVoted ? t("toolRating.thankYou") : t("toolRating.prompt")}
          </p>
          <p className="mt-1 font-mono text-[10px] text-muted">
            <span itemProp="ratingValue">{formatRatingValue(aggregate.ratingValue)}</span>
            {" / "}
            <span itemProp="bestRating">5</span>
            {" · "}
            <span itemProp="ratingCount">{aggregate.ratingCount}</span>{" "}
            {t("toolRating.ratingsLabel")}
          </p>
          <meta itemProp="worstRating" content="1" />
        </div>

        <div
          className="flex items-center gap-1"
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
                className="inline-flex h-10 w-10 items-center justify-center rounded-sm transition-[color,transform,filter] duration-200 hover:scale-105 disabled:cursor-default disabled:hover:scale-100"
              >
                <Star
                  className={`h-5 w-5 transition-colors duration-200 ${
                    isActive
                      ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.35)]"
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
    </section>
  );
}
