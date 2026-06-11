"use client";

import Link from "next/link";
import { useLanguage } from "@/components/i18n/LanguageProvider";

interface SupportingArticleLinkProps {
  slug: string;
  label: string;
  title: string;
}

export function SupportingArticleLink({
  slug,
  label,
  title,
}: SupportingArticleLinkProps) {
  const { dir } = useLanguage();
  const arrow = dir === "rtl" ? "←" : "→";

  return (
    <div className="mt-4 border-t border-dashed border-border pt-4 text-center">
      <p className="font-mono text-[10px] text-muted">{label}</p>
      <Link
        href={`/articles/${slug}`}
        className="mt-2 inline-flex items-center gap-2 font-label text-sm text-[var(--glow-teal)] transition-colors hover:text-foreground"
      >
        <span>{title}</span>
        <span aria-hidden>{arrow}</span>
      </Link>
    </div>
  );
}
