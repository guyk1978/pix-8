import { DashboardTools } from "@/components/dashboard/DashboardTools";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <section className="mb-10 space-y-3">
        <p className="font-label text-muted">Dashboard</p>
        <h1 className="max-w-xl text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
          Process images locally.
          <span className="block text-muted">Nothing leaves your browser.</span>
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted">
          Select a utility from the grid below. All processing runs client-side
          via the Canvas API — no uploads, no tracking.
        </p>
      </section>

      <DashboardTools />

      <section className="mt-10 grid gap-3 border border-border bg-card p-4 sm:grid-cols-3 sm:p-5">
        <div className="space-y-1">
          <p className="font-label text-muted">Processing</p>
          <p className="font-mono text-sm text-foreground">Client-side</p>
        </div>
        <div className="space-y-1">
          <p className="font-label text-muted">Uploads</p>
          <p className="font-mono text-sm text-foreground">None</p>
        </div>
        <div className="space-y-1">
          <p className="font-label text-muted">Engine</p>
          <p className="font-mono text-sm text-foreground">Canvas API</p>
        </div>
      </section>
    </div>
  );
}
