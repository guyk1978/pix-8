"use client";

import type { ReactNode } from "react";
import { AppLink } from "@/components/layout/AppLink";
import { FooterResources } from "@/components/layout/FooterResources";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { getToolTranslationKey } from "@/i18n";
import { resolveFooterResourceCategory } from "@/lib/footerResources";
import { getToolRoute } from "@/lib/navigationConfig";
import {
  SITE_FOOTER_ACCENT,
  SITE_FOOTER_LEGAL_LINKS,
  SITE_FOOTER_RELATED_TOOL_IDS,
  SITE_FOOTER_UTILITY_LINKS,
  type SiteFooterLink,
} from "@/lib/siteFooterLinks";
import { usePathname } from "next/navigation";

const footerLinkClassName =
  "block w-fit max-w-full truncate font-mono text-xs transition-opacity hover:opacity-80";

interface FooterLinkItemProps {
  link: SiteFooterLink;
}

function FooterLinkItem({ link }: FooterLinkItemProps) {
  const style = { color: SITE_FOOTER_ACCENT };

  if (link.external) {
    return (
      <a
        href={link.href}
        className={footerLinkClassName}
        style={style}
        target="_blank"
        rel="noopener noreferrer"
        title={link.label}
      >
        {link.label}
      </a>
    );
  }

  return (
    <AppLink
      href={link.href}
      className={footerLinkClassName}
      style={style}
      title={link.label}
    >
      {link.label}
    </AppLink>
  );
}

interface FooterColumnProps {
  title: string;
  ariaLabel: string;
  children: ReactNode;
}

function FooterColumn({ title, ariaLabel, children }: FooterColumnProps) {
  return (
    <div className="min-w-0 space-y-3">
      <h2 className="font-label text-sm" style={{ color: SITE_FOOTER_ACCENT }}>
        {title}
      </h2>
      <nav aria-label={ariaLabel}>{children}</nav>
    </div>
  );
}

export function SiteFooter() {
  const { t } = useLanguage();
  const pathname = usePathname() ?? "/";
  const year = new Date().getFullYear();
  const hasResourceLinks = resolveFooterResourceCategory(pathname) !== null;

  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div
          className={`grid min-w-0 gap-8 ${
            hasResourceLinks
              ? "sm:grid-cols-2 lg:grid-cols-4"
              : "sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {hasResourceLinks ? (
            <div className="min-w-0">
              <FooterResources />
            </div>
          ) : null}

          <FooterColumn
            title={t("siteFooter.relatedTools")}
            ariaLabel={t("siteFooter.relatedToolsNav")}
          >
            <ul className="space-y-2">
              {SITE_FOOTER_RELATED_TOOL_IDS.map((toolId) => (
                <li key={toolId}>
                  <AppLink
                    href={getToolRoute(toolId)}
                    className={footerLinkClassName}
                    style={{ color: SITE_FOOTER_ACCENT }}
                    title={t(getToolTranslationKey(toolId, "name"))}
                  >
                    {t(getToolTranslationKey(toolId, "name"))}
                  </AppLink>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn
            title={t("siteFooter.legal")}
            ariaLabel={t("siteFooter.legalNav")}
          >
            <ul className="space-y-2">
              {SITE_FOOTER_LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <FooterLinkItem link={link} />
                </li>
              ))}
              {SITE_FOOTER_UTILITY_LINKS.map((link) => (
                <li key={link.href}>
                  <FooterLinkItem link={link} />
                </li>
              ))}
            </ul>
          </FooterColumn>

          <div className="min-w-0 space-y-3">
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-sm font-medium text-foreground">
                pix
              </span>
              <span
                className="font-mono text-sm font-medium"
                style={{ color: SITE_FOOTER_ACCENT }}
              >
                -8
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              {t("siteFooter.mission")}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-xs text-muted">
            {t("footer.copyright", { year })}
          </span>
          <span className="font-label text-xs text-muted">
            {t("footer.zeroUploads")}
          </span>
        </div>
      </div>
    </footer>
  );
}
