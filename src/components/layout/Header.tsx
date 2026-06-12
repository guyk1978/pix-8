"use client";

import Link from "next/link";
import { Folder, Star } from "lucide-react";
import { ShareButton } from "@/components/ShareButton";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { PwaInstallButton } from "@/components/layout/PwaInstallButton";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const GITHUB_REPO_URL = "https://github.com/guyk1978/pix-8";

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b border-border bg-header/95 px-4 backdrop-blur-sm sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuToggle}
          className="flex h-9 w-9 items-center justify-center rounded-sm border border-border text-muted transition-colors hover:border-muted hover:text-foreground lg:hidden"
          aria-label={t("header.toggleNav")}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-4 w-4"
            aria-hidden
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>

        <div className="hidden sm:block">
          <p className="font-label text-muted">{t("header.platform")}</p>
          <p className="font-mono text-xs text-foreground">{t("header.tagline")}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/favorites"
          className="flex h-9 items-center gap-1.5 rounded-sm border border-border px-2.5 text-muted transition-colors hover:border-muted hover:bg-surface hover:text-foreground sm:px-3"
          title={t("nav.favorites")}
        >
          <Star className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
          <span className="hidden font-label text-xs md:inline">
            {t("nav.favorites")}
          </span>
        </Link>

        <Link
          href="/projects"
          className="flex h-9 items-center gap-1.5 rounded-sm border border-border px-2.5 text-muted transition-colors hover:border-muted hover:bg-surface hover:text-foreground sm:px-3"
          title={t("nav.projects")}
        >
          <Folder className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
          <span className="hidden font-label text-xs lg:inline">
            {t("nav.projects")}
          </span>
        </Link>

        <LanguageSwitcher />
        <ShareButton />
        <ThemeToggle />

        <PwaInstallButton />

        <span
          className="hidden items-center gap-1.5 rounded-sm border border-border px-2.5 py-1.5 sm:flex"
          title={t("header.localOnlyTitle")}
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-foreground" />
          <span className="font-label text-muted">{t("header.localOnly")}</span>
        </span>

        <a
          href={GITHUB_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-sm border border-border text-muted transition-colors hover:border-muted hover:text-foreground"
          aria-label={t("header.github")}
          title={t("header.githubTitle")}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </a>
      </div>
    </header>
  );
}
