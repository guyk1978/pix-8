"use client";

import { AppLink } from "@/components/layout/AppLink";
import { Folder } from "lucide-react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { useProjects } from "@/components/projects/ProjectsContext";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export function ProjectsPageContent() {
  const { t } = useLanguage();
  const { projects, isLoading } = useProjects();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-8 max-w-2xl space-y-3">
        <p className="font-label text-muted">{t("projects.eyebrow")}</p>
        <h1 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
          {t("projects.title")}
        </h1>
        <p className="text-sm leading-relaxed text-muted">
          {t("projects.description")}
        </p>
      </header>

      {isLoading ? (
        <p className="font-mono text-sm text-muted">{t("common.processing")}</p>
      ) : projects.length === 0 ? (
        <div className="flex min-h-48 flex-col items-center justify-center gap-3 border border-dashed border-border bg-card p-8 text-center">
          <Folder
            className="h-8 w-8 text-muted/60"
            strokeWidth={1.25}
            aria-hidden
          />
          <p className="font-label text-muted">{t("projects.empty")}</p>
          <p className="max-w-sm text-sm text-muted">{t("projects.emptyHint")}</p>
          <AppLink
            href="/"
            className="mt-2 rounded-sm border border-border bg-background px-4 py-2 font-label text-sm text-foreground transition-colors hover:border-muted hover:bg-surface"
          >
            {t("projects.browseTools")}
          </AppLink>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
