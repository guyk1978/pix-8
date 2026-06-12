"use client";

import type { ReactNode } from "react";
import { AppLink } from "@/components/layout/AppLink";
import { usePathname } from "next/navigation";
import { Folder, Star } from "lucide-react";
import { ShareButton } from "@/components/ShareButton";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { AppsMenu } from "@/components/layout/AppsMenu";
import {
  headerNavTabClass,
  headerUtilityButtonClass,
} from "@/components/layout/headerNavStyles";
import { PwaInstallButton } from "@/components/layout/PwaInstallButton";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { BrandLogo, brandLogoAriaLabel } from "@/components/brand/BrandLogo";
import { APP_ROUTES } from "@/lib/navigationConfig";
import { isActiveHref, isToolPage } from "@/lib/routes";

const GITHUB_REPO_URL = "https://github.com/guyk1978/pix-8";

interface HeaderNavLinkProps {
  href: string;
  active: boolean;
  children: ReactNode;
  title?: string;
}

function HeaderNavLink({ href, active, children, title }: HeaderNavLinkProps) {
  return (
    <AppLink
      href={href}
      className={headerNavTabClass(active)}
      title={title}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </AppLink>
  );
}

export function Header() {
  const { t, dir, language } = useLanguage();
  const pathname = usePathname();
  const favoritesActive = isActiveHref(pathname, APP_ROUTES.favorites);
  const projectsActive = isActiveHref(pathname, APP_ROUTES.projects);
  const appsActive = isToolPage(pathname);

  return (
    <header
      dir={dir}
      lang={language}
      className="app-header sticky top-0 z-30 shrink-0 border-b border-border/60 bg-header/90 backdrop-blur-md"
    >
      <div className="app-header-inner mx-auto flex h-16 w-full max-w-[90rem] items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
        <div className="app-header-brand flex min-w-0 shrink-0 items-center">
          <AppLink
            href={APP_ROUTES.home}
            className="rounded-sm transition-opacity hover:opacity-80"
            aria-label={brandLogoAriaLabel(t)}
          >
            <BrandLogo size="md" />
          </AppLink>
        </div>

        <nav
          className="app-header-nav flex min-w-0 flex-1 items-center justify-center gap-8 lg:gap-10"
          aria-label={t("header.platform")}
        >
          <AppsMenu appsActive={appsActive} />
          <HeaderNavLink
            href={APP_ROUTES.favorites}
            active={favoritesActive}
            title={t("nav.favorites")}
          >
            <Star className="header-nav-tab-icon" strokeWidth={1.75} aria-hidden />
            <span>{t("nav.favorites")}</span>
          </HeaderNavLink>
          <HeaderNavLink
            href={APP_ROUTES.projects}
            active={projectsActive}
            title={t("nav.projects")}
          >
            <Folder className="header-nav-tab-icon" strokeWidth={1.75} aria-hidden />
            <span>{t("nav.projects")}</span>
          </HeaderNavLink>
        </nav>

        <div className="app-header-utilities flex shrink-0 items-center gap-1.5 sm:gap-2">
          <span
            className="header-status-badge me-1 hidden items-center gap-1.5 sm:flex"
            title={t("header.localOnlyTitle")}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-muted/70" aria-hidden />
            <span>{t("header.localOnly")}</span>
          </span>

          <LanguageSwitcher className={headerUtilityButtonClass} />
          <ShareButton className={headerUtilityButtonClass} />
          <ThemeToggle className={headerUtilityButtonClass} />
          <PwaInstallButton className={headerUtilityButtonClass} />

          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={headerUtilityButtonClass}
            aria-label={t("header.github")}
            title={t("header.githubTitle")}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
