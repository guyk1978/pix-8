"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { useId, useRef } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useOptionalWorkspaceImageQueue } from "@/hooks/WorkspaceImageQueueContext";

export function WorkspaceImageFilmstrip() {
  const { t } = useLanguage();
  const queue = useOptionalWorkspaceImageQueue();
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  if (!queue || queue.items.length === 0) {
    return null;
  }

  const handleAdd = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    queue.addFiles(files);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="workspace-image-filmstrip shrink-0">
      <div
        className="workspace-image-filmstrip-track"
        role="toolbar"
        aria-label={t("workspaceQueue.toolbarLabel")}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          aria-label={t("workspaceQueue.addImagesAria")}
          onChange={(event) => handleAdd(event.target.files)}
        />

        <button
          type="button"
          className="workspace-image-filmstrip-add"
          aria-label={t("workspaceQueue.addImage")}
          disabled={queue.isLoading}
          onClick={() => inputRef.current?.click()}
        >
          <Plus className="h-5 w-5" aria-hidden="true" />
          <span className="workspace-image-filmstrip-add-label">
            {t("workspaceQueue.addImage")}
          </span>
        </button>

        <div className="workspace-image-filmstrip-items" role="list">
          {queue.items.map((item, index) => {
            const isActive = item.id === queue.activeId;

            return (
              <button
                key={item.id}
                type="button"
                role="listitem"
                aria-current={isActive ? "true" : undefined}
                aria-label={t("workspaceQueue.imageLabel", {
                  name: item.name,
                  index: index + 1,
                })}
                disabled={queue.isLoading}
                onClick={() => queue.selectItem(item.id)}
                className={`workspace-image-filmstrip-thumb ${
                  isActive ? "workspace-image-filmstrip-thumb--active" : ""
                }`}
              >
                <Image
                  src={item.thumbUrl}
                  alt=""
                  fill
                  sizes="72px"
                  className="object-cover"
                  unoptimized
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
