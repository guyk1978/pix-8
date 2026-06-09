export default function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <section className="mb-8 space-y-3">
        <p className="font-label text-muted">Settings</p>
        <h1 className="text-2xl font-medium tracking-tight text-foreground">
          Preferences
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted">
          Configure platform defaults. All settings are stored locally in your
          browser.
        </p>
      </section>

      <div className="space-y-4">
        <div className="border border-[#333] bg-[#161616] p-5">
          <p className="font-label text-muted">Privacy</p>
          <p className="mt-2 font-mono text-sm text-foreground">
            Metadata stripping enabled by default
          </p>
          <p className="mt-1 text-xs text-muted">
            EXIF and other metadata are removed from exported files unless
            disabled per tool.
          </p>
        </div>

        <div className="border border-[#333] bg-[#161616] p-5">
          <p className="font-label text-muted">Processing</p>
          <p className="mt-2 font-mono text-sm text-foreground">
            Client-side only
          </p>
          <p className="mt-1 text-xs text-muted">
            No files are uploaded. All utilities run in your browser via the
            Canvas API.
          </p>
        </div>
      </div>
    </div>
  );
}
