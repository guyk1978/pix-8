interface StripMetadataToggleProps {
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}

export function StripMetadataToggle({
  checked,
  disabled = false,
  onChange,
}: StripMetadataToggleProps) {
  return (
    <label className="flex min-h-11 cursor-pointer items-center gap-3">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 shrink-0 rounded-sm border border-border bg-background accent-accent disabled:cursor-not-allowed disabled:opacity-50"
      />
      <span className="font-label text-muted">Strip Metadata</span>
      {checked && (
        <span className="font-mono text-[10px] text-accent">Privacy Mode</span>
      )}
    </label>
  );
}
