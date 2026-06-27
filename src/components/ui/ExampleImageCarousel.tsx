"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { EXAMPLE_IMAGES_PAGE_SIZE } from "@/lib/exampleImages";

interface ExampleImageCarouselProps<T> {
  items: readonly T[];
  pageSize?: number;
  className?: string;
  trackClassName?: string;
  children: (pageItems: T[], startIndex: number) => ReactNode;
}

export function ExampleImageCarousel<T>({
  items,
  pageSize = EXAMPLE_IMAGES_PAGE_SIZE,
  className = "",
  trackClassName = "",
  children,
}: ExampleImageCarouselProps<T>) {
  const { t, dir } = useLanguage();
  const [page, setPage] = useState(0);

  const pages = useMemo(() => {
    const chunks: T[][] = [];
    for (let index = 0; index < items.length; index += pageSize) {
      chunks.push(items.slice(index, index + pageSize));
    }
    return chunks;
  }, [items, pageSize]);

  const totalPages = Math.max(1, pages.length);
  const clampedPage = Math.min(page, totalPages - 1);

  useEffect(() => {
    setPage((current) => Math.min(current, totalPages - 1));
  }, [items.length, totalPages]);

  const showNav = items.length > pageSize;
  const slideOffset = clampedPage * 100;
  const slideTransform =
    dir === "rtl"
      ? `translateX(${slideOffset}%)`
      : `translateX(-${slideOffset}%)`;

  return (
    <div
      className={`example-image-carousel ${
        showNav ? "example-image-carousel--paged" : ""
      } ${className}`.trim()}
      data-total-pages={totalPages}
      data-current-page={clampedPage + 1}
    >
      {showNav ? (
        <button
          type="button"
          className="example-image-carousel-nav example-image-carousel-nav--prev"
          disabled={clampedPage === 0}
          aria-label={t("upload.exampleCarouselPrev")}
          onClick={() => setPage((current) => Math.max(0, current - 1))}
        >
          <ChevronLeft size={26} strokeWidth={2.25} aria-hidden />
        </button>
      ) : null}

      <div className="example-image-carousel-viewport">
        <div
          className={`example-image-carousel-slides ${
            showNav ? "" : "example-image-carousel-slides--static"
          }`.trim()}
          style={showNav ? { transform: slideTransform } : undefined}
        >
          {pages.map((pageItems, pageIndex) => (
            <div
              key={pageIndex}
              className={`example-image-carousel-slide ${trackClassName}`.trim()}
            >
              {children(pageItems, pageIndex * pageSize)}
            </div>
          ))}
        </div>
      </div>

      {showNav ? (
        <button
          type="button"
          className="example-image-carousel-nav example-image-carousel-nav--next"
          disabled={clampedPage >= totalPages - 1}
          aria-label={t("upload.exampleCarouselNext")}
          onClick={() =>
            setPage((current) => Math.min(totalPages - 1, current + 1))
          }
        >
          <ChevronRight size={26} strokeWidth={2.25} aria-hidden />
        </button>
      ) : null}
    </div>
  );
}
