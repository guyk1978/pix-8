"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import "@/components/splash-page.css";

export function SplashPage() {
  return (
    <div className="splash-page dark">
      <div className="splash-page__content">
        <BrandLogo size="hero" className="splash-page__logo" />

        <p className="splash-page__tagline">
          Professional AI-Powered Image Editing, Locally in Your Browser.
        </p>
        <p className="splash-page__tagline splash-page__tagline--secondary" lang="he" dir="rtl">
          עריכת תמונות מקצועית עם AI — מקומית בדפדפן.
        </p>

        <div className="splash-page__actions">
          <Link href="/?lang=en" className="splash-page__button">
            English
          </Link>
          <Link href="/?lang=he" className="splash-page__button">
            עברית
          </Link>
        </div>
      </div>
    </div>
  );
}
