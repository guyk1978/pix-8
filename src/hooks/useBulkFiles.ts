"use client";

import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { loadImageFromFile } from "@/hooks/useImageProcessor";
import { resolveErrorMessage } from "@/i18n";

export interface BulkFileItem {
  id: string;
  file: File;
  url: string;
  width: number;
  height: number;
  name: string;
  mimeType: string;
}

export function useBulkFiles() {
  const { t, language } = useLanguage();
  const [items, setItems] = useState<BulkFileItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const revokeItemUrl = useCallback((url: string) => {
    URL.revokeObjectURL(url);
  }, []);

  const addFiles = useCallback(async (fileList: FileList | File[]) => {
    const files = Array.from(fileList).filter((file) =>
      file.type.startsWith("image/"),
    );

    if (files.length === 0) {
      setError(t("errors.invalidImageFiles"));
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const parsed = await Promise.all(
        files.map(async (file) => {
          const image = await loadImageFromFile(file);
          return {
            id: crypto.randomUUID(),
            file: image.file,
            url: image.objectUrl,
            width: image.width,
            height: image.height,
            name: image.name,
            mimeType: image.file.type,
          } satisfies BulkFileItem;
        }),
      );

      setItems((current) => [...current, ...parsed]);
    } catch (cause) {
      setError(resolveErrorMessage(language, cause, "errors.bulkLoadFailed"));
    } finally {
      setIsLoading(false);
    }
  }, [language, t]);

  const removeFile = useCallback(
    (id: string) => {
      setItems((current) => {
        const target = current.find((item) => item.id === id);
        if (target) revokeItemUrl(target.url);
        return current.filter((item) => item.id !== id);
      });
    },
    [revokeItemUrl],
  );

  const clear = useCallback(() => {
    setItems((current) => {
      for (const item of current) revokeItemUrl(item.url);
      return [];
    });
    setError(null);
  }, [revokeItemUrl]);

  useEffect(() => {
    return () => {
      setItems((current) => {
        for (const item of current) revokeItemUrl(item.url);
        return [];
      });
    };
  }, [revokeItemUrl]);

  const loadFromFiles = useCallback(
    async (files: File[]) => {
      setItems((current) => {
        for (const item of current) revokeItemUrl(item.url);
        return [];
      });

      if (files.length > 0) {
        await addFiles(files);
      }
    },
    [addFiles, revokeItemUrl],
  );

  return {
    items,
    addFiles,
    removeFile,
    clear,
    loadFromFiles,
    error,
    isLoading,
    setError,
  };
}
