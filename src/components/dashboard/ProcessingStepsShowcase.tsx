"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";

const STEPS = ["upload", "process", "download"] as const;

export function ProcessingStepsShowcase() {
  const { t } = useLanguage();

  return (
    <section className="processing-steps-section" aria-label={t("home.processingSteps.title")}>
      <div className="processing-steps-grid">
        {STEPS.map((step) => (
          <article key={step} className="processing-step">
            <h2 className="processing-step-title">
              {t(`home.processingSteps.${step}.label`)}
            </h2>
            <p className="processing-step-text">
              {t(`home.processingSteps.${step}.description`)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
