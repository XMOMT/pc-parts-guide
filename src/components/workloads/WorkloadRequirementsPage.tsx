import type { WorkloadPageContent } from "@/lib/workload-pages/types";
import WorkloadResolutionTabs from "@/components/workloads/WorkloadResolutionTabs";

type WorkloadRequirementsPageProps = {
  content: WorkloadPageContent;
};

export default function WorkloadRequirementsPage({ content }: WorkloadRequirementsPageProps) {
  return (
    <div className="space-y-12">
      <section aria-labelledby="workload-overview-heading">
        <h2 id="workload-overview-heading" className="text-xl font-bold text-white">
          Overview
        </h2>
        <p className="mt-3 max-w-3xl text-surface-200/70">{content.summary}</p>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-surface-800 bg-surface-900/30 px-4 py-3">
            <dt className="text-xs uppercase tracking-wider text-surface-200/40">Example apps</dt>
            <dd className="mt-1 text-sm text-white">{content.exampleApps.join(", ")}</dd>
          </div>
          <div className="rounded-lg border border-surface-800 bg-surface-900/30 px-4 py-3">
            <dt className="text-xs uppercase tracking-wider text-surface-200/40">Primary focus</dt>
            <dd className="mt-1 text-sm text-white">{content.primaryFocus}</dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="workload-tiers-heading">
        <h2 id="workload-tiers-heading" className="text-xl font-bold text-white">
          Hardware by resolution
        </h2>
        <p className="mt-2 text-sm text-surface-200/60">
          Choose 1080p, 1440p, or 4K to match your timeline, export, or render target, then
          pick project complexity (Basic through Professional). Minimum specs handle the
          workload with compromises; recommended adds headroom. At{" "}
          <span className="text-surface-200">Professional</span>, an optional NVIDIA RTX Pro
          (formerly Quadro) workstation row appears below the GeForce / RX graphics card.
        </p>

        <WorkloadResolutionTabs slug={content.slug} tiers={content.tiers} />
      </section>

      <section aria-labelledby="workload-notes-heading">
        <h2 id="workload-notes-heading" className="text-xl font-bold text-white">
          Performance notes
        </h2>
        <ul className="mt-4 space-y-2">
          {content.performanceNotes.map((note) => (
            <li key={note} className="text-sm text-surface-200/70">
              · {note}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="workload-bottlenecks-heading">
        <h2 id="workload-bottlenecks-heading" className="text-xl font-bold text-white">
          What affects performance
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {content.bottlenecks.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-surface-800 bg-surface-900/30 p-4"
            >
              <h3 className="font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-surface-200/60">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
