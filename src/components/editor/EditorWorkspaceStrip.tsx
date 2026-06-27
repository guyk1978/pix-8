"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { useId, useRef } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useEditor } from "@/hooks/useEditorState";

export function EditorWorkspaceStrip() {
  const { t } = useLanguage();
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    source,
    workspaceImages,
    activeWorkspaceImageId,
    addWorkspaceImage,
    activateWorkspaceImage,
  } = useEditor();

  if (!source) return null;

  return (
    <div className="unified-editor-workspace shrink-0 border-b border-[var(--editor-border)]">
      <p className="unified-editor-workspace-label">{t("editor.workspace.hint")}</p>

      <div className="unified-editor-workspace-strip">
        <button
          type="button"
          className="unified-editor-workspace-add"
          aria-label={t("editor.workspace.addAria")}
          onClick={() => inputRef.current?.click()}
        >
          <Plus className="h-5 w-5" strokeWidth={2} aria-hidden />
        </button>

        {workspaceImages.map((image, index) => {
          const isActive = image.id === activeWorkspaceImageId;

          return (
            <button
              key={image.id}
              type="button"
              className={`unified-editor-workspace-thumb ${
                isActive ? "is-active" : ""
              }`}
              aria-label={t("editor.workspace.imageAria", {
                name: image.name,
                number: index + 1,
              })}
              aria-pressed={isActive}
              onClick={() => {
                if (!isActive) void activateWorkspaceImage(image.id);
              }}
            >
              <Image
                src={image.url}
                alt=""
                fill
                sizes="56px"
                className="object-cover"
                unoptimized
              />
            </button>
          );
        })}
      </div>

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        onChange={(event) => {
          const files = event.target.files;
          if (files?.length) void addWorkspaceImage(files);
          event.target.value = "";
        }}
      />
    </div>
  );
}
