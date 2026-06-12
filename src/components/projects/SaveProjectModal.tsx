"use client";

import { useEffect, useId, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";

interface SaveProjectModalProps {
  open: boolean;
  defaultName: string;
  isSaving: boolean;
  onClose: () => void;
  onSave: (name: string) => void | Promise<void>;
}

export function SaveProjectModal({
  open,
  defaultName,
  isSaving,
  onClose,
  onSave,
}: SaveProjectModalProps) {
  const { t } = useLanguage();
  const inputId = useId();
  const [name, setName] = useState(defaultName);

  useEffect(() => {
    if (open) {
      setName(defaultName);
    }
  }, [defaultName, open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${inputId}-title`}
        className="borderless-float w-full max-w-md rounded-xl bg-card p-5"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id={`${inputId}-title`} className="font-label text-foreground">
          {t("projects.saveModalTitle")}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {t("projects.saveModalHint")}
        </p>

        <label htmlFor={inputId} className="mt-4 block font-label text-muted">
          {t("projects.projectName")}
        </label>
        <input
          id={inputId}
          type="text"
          value={name}
          disabled={isSaving}
          onChange={(event) => setName(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && name.trim()) {
              void onSave(name.trim());
            }
          }}
          placeholder={t("projects.projectNamePlaceholder")}
          className="tool-input mt-2 block w-full border-0 bg-background py-2.5 shadow-[var(--shadow-elevated)]"
          autoFocus
        />

        <div className="mt-5 flex flex-col gap-2 sm:flex-row-reverse">
          <button
            type="button"
            disabled={!name.trim() || isSaving}
            onClick={() => void onSave(name.trim())}
            className="borderless-interactive min-h-10 flex-1 rounded-lg bg-accent-muted px-4 py-2 font-label text-accent shadow-[var(--shadow-elevated)] transition-colors hover:bg-accent/20 hover:shadow-[var(--shadow-hover)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSaving ? t("common.processing") : t("projects.saveProject")}
          </button>
          <button
            type="button"
            disabled={isSaving}
            onClick={onClose}
            className="borderless-interactive min-h-10 flex-1 rounded-lg bg-background px-4 py-2 font-label text-foreground shadow-[var(--shadow-elevated)] transition-colors hover:bg-surface hover:shadow-[var(--shadow-hover)] disabled:opacity-40"
          >
            {t("common.cancel")}
          </button>
        </div>
      </div>
    </div>
  );
}
