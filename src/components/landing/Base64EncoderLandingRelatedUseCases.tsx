"use client";

import { AppLink } from "@/components/layout/AppLink";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import {
  BASE64_ENCODER_LANDING_ACCENT,
  BASE64_ENCODER_TOOL_HREF,
  type Base64EncoderLandingId,
} from "@/lib/base64encoderLandings";
import {
  getBase64EncoderArticle,
  getBase64EncoderLandingChrome,
  getRelatedBase64EncoderLandingPages,
} from "@/lib/base64encoderLandingsLocale";

const linkCardClassName =
  "group block rounded-sm border border-border bg-card p-4 transition-colors hover:border-[#5B7FA6]/40 hover:bg-card-hover";

interface Base64EncoderLandingRelatedUseCasesProps {
  currentLandingId: Base64EncoderLandingId;
}

export function Base64EncoderLandingRelatedUseCases({
  currentLandingId,
}: Base64EncoderLandingRelatedUseCasesProps) {
  const { language } = useLanguage();
  const relatedPages = getRelatedBase64EncoderLandingPages(
    currentLandingId,
    language,
  );
  const article = getBase64EncoderArticle(language);
  const chrome = getBase64EncoderLandingChrome(language);

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
                      style={{ color: BASE64_ENCODER_LANDING_ACCENT }}
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
                  style={{ color: BASE64_ENCODER_LANDING_ACCENT }}
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
                href={BASE64_ENCODER_TOOL_HREF}
                className="group block rounded-sm border border-dashed border-border bg-background p-4 transition-colors hover:border-[#5B7FA6]/35 hover:bg-card"
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
