import type { WorkloadComplexity, WorkloadTierConfig } from "@/lib/workload-pages/types";

function ComponentRow({
  spec,
}: {
  spec: { label: string; minimum: string; recommended: string; notes?: string };
}) {
  return (
    <div className="border-b border-surface-800 py-4 last:border-0">
      <p className="text-sm font-medium text-brand-400">{spec.label}</p>
      <dl className="mt-2 grid gap-2 sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase tracking-wider text-surface-200/40">Minimum</dt>
          <dd className="mt-0.5 text-sm text-white">{spec.minimum}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wider text-surface-200/40">Recommended</dt>
          <dd className="mt-0.5 text-sm text-white">{spec.recommended}</dd>
        </div>
      </dl>
      {spec.notes && (
        <p className="mt-2 text-xs text-surface-200/50">{spec.notes}</p>
      )}
    </div>
  );
}

const COMPLEXITY_LABELS: Record<WorkloadComplexity, string> = {
  basic: "Basic",
  standard: "Standard",
  advanced: "Advanced",
  professional: "Professional",
};

type WorkloadTierCardProps = {
  resolution: string;
  complexity: WorkloadComplexity;
  config: WorkloadTierConfig;
};

export function WorkloadTierCard({
  resolution,
  complexity,
  config,
}: WorkloadTierCardProps) {
  return (
    <article className="rounded-xl border border-surface-800 bg-surface-900/50 p-6">
      <header>
        <h3 className="text-xl font-bold text-white">
          {resolution} · {COMPLEXITY_LABELS[complexity]} project
        </h3>
        <p className="mt-1 text-sm text-surface-200/60">{config.settings}</p>
      </header>

      <p className="mt-4 rounded-lg bg-brand-600/10 px-4 py-3 text-sm text-brand-200">
        {config.summaryNote}
      </p>

      <div className="mt-4">
        <ComponentRow spec={config.gpu} />
        {config.workstationGpu && (
          <div className="border-b border-surface-800 py-4">
            <ComponentRow spec={config.workstationGpu} />
            <p className="mt-1 text-xs text-surface-200/45">
              Consumer specs above · studio alternative below (same Professional profile).
            </p>
          </div>
        )}
        <ComponentRow spec={config.cpu} />
        <ComponentRow spec={config.ram} />
        <ComponentRow spec={config.storage} />
      </div>

      {config.settingsTips && config.settingsTips.length > 0 && (
        <div className="mt-4 border-t border-surface-800 pt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-surface-200/40">
            Workflow tips
          </p>
          <ul className="mt-2 space-y-1.5">
            {config.settingsTips.map((tip) => (
              <li key={tip} className="text-sm text-surface-200/70">
                · {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
