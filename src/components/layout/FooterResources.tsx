"use client";

import { AppLink } from "@/components/layout/AppLink";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import {
  getFooterResources,
  resolveFooterResourceCategory,
  type FooterResourceCategory,
  type FooterResourceEntry,
} from "@/lib/footerResources";
import { SITE_FOOTER_ACCENT } from "@/lib/siteFooterLinks";
import { usePathname } from "next/navigation";

const footerLinkClassName =
  "block w-fit max-w-full truncate font-mono text-xs transition-opacity hover:opacity-80";

interface FooterResourcesProps {
  /** Override auto-detection from the current URL. */
  category?: FooterResourceCategory | null;
  limit?: number;
}

function ResourceLinkItem({
  link,
}: {
  link: Pick<FooterResourceEntry, "href" | "label">;
}) {
  return (
    <AppLink
      href={link.href}
      className={footerLinkClassName}
      style={{ color: SITE_FOOTER_ACCENT }}
      title={link.label}
    >
      {link.label}
    </AppLink>
  );
}

export function FooterResources({
  category: categoryOverride,
  limit,
}: FooterResourcesProps) {
  const { t, language } = useLanguage();
  const pathname = usePathname() ?? "/";

  const category =
    categoryOverride !== undefined
      ? categoryOverride
      : resolveFooterResourceCategory(pathname);

  if (!category) return null;

  const links = getFooterResources(category, {
    currentPath: pathname,
    limit,
    locale: language,
  });

  if (links.length === 0) return null;

  return (
    <div className="space-y-3">
      <h2 className="font-label text-sm" style={{ color: SITE_FOOTER_ACCENT }}>
        {t("siteFooter.resources")}
      </h2>
      <nav aria-label={t("siteFooter.resourcesNav")}>
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <ResourceLinkItem link={link} />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
