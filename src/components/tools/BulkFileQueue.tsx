"use client";

import type { BulkFileItem } from "@/hooks/useBulkFiles";

interface BulkFileQueueProps {
  items: BulkFileItem[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function BulkFileQueue({ items, onRemove, onClear }: BulkFileQueueProps) {
  if (items.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <p className="font-label text-muted">
          {items.length} image{items.length === 1 ? "" : "s"} queued
        </p>
        <button
          type="button"
          onClick={onClear}
          className="font-mono text-[10px] text-muted transition-colors hover:text-foreground"
        >
          Clear all
        </button>
      </div>

      <ul className="max-h-52 space-y-2 overflow-y-auto [scrollbar-width:thin]">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-3 border border-[#333] bg-background p-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.url}
              alt=""
              className="h-10 w-10 shrink-0 border border-[#333] object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate font-mono text-xs text-foreground">
                {item.file.name}
              </p>
              <p className="font-mono text-[10px] text-muted">
                {item.width} × {item.height}px · {formatFileSize(item.file.size)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="shrink-0 font-mono text-[10px] text-muted transition-colors hover:text-foreground"
              aria-label={`Remove ${item.file.name}`}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
