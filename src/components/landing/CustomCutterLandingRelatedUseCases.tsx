"use client";

import { AppLink } from "@/components/layout/AppLink";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import {
  CUSTOM_CUTTER_LANDING_ACCENT,
  CUSTOM_CUTTER_TOOL_HREF,
  type CustomCutterLandingId,
} from "@/lib/customCutterLandings";
import {
  getCustomCutterArticle,
  getCustomCutterLandingChrome,
  getRelatedCustomCutterLandingPages,
} from "@/lib/customCutterLandingsLocale";

const linkCardClassName =
  "group block rounded-sm border border-border bg-card p-4 transition-colors hover:border-[#8E977D]/40 hover:bg-card-hover";

interface CustomCutterLandingRelatedUseCasesProps {
  currentLandingId: CustomCutterLandingId;
}

export function CustomCutterLandingRelatedUseCases({
  currentLandingId,
}: CustomCutterLandingRelatedUseCasesProps) {
  const { language } = useLanguage();
  const relatedPages = getRelatedCustomCutterLandingPages(
    currentLandingId,
    language,
  );
  const article = getCustomCutterArticle(language);
  const chrome = getCustomCutterLandingChrome(language);

  return (
    <section className="mb-14 sm:mb-16">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 font-label text-foreground">
            {chrome.relatedUseCasesHeading}
          </h2>
          {relatedPages.length > 0 ? (
            <ul className="space-y-3">
              {relatedPages.map((page) => (
                <li key={page.path}>
                  <AppLink href={page.path} className={linkCardClassName}>
                    <h3
                      className="text-sm font-medium"
                      style={{ color: CUSTOM_CUTTER_LANDING_ACCENT }}
                    >
                      {page.linkTitle}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {page.linkExcerpt}
                    </p>
                  </AppLink>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div>
          <h2 className="mb-4 font-label text-foreground">
            {chrome.guidesHeading}
          </h2>
          <ul className="space-y-3">
            <li>
              <AppLink href={article.href} className={linkCardClassName}>
                <h3
                  className="text-sm font-medium"
                  style={{ color: CUSTOM_CUTTER_LANDING_ACCENT }}
                >
                  {article.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {article.excerpt}
                </p>
              </AppLink>
            </li>
            <li>
              <AppLink
                href={CUSTOM_CUTTER_TOOL_HREF}
                className="group block rounded-sm border border-dashed border-border bg-background p-4 transition-colors hover:border-[#8E977D]/35 hover:bg-card"
              >
                <h3 className="text-sm font-medium text-foreground">
                  {chrome.toolCardTitle}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {chrome.toolCardExcerpt}
                </p>
              </AppLink>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
