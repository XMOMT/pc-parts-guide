"use client";

import { useMemo, useState } from "react";
import { WorkloadTierCard } from "@/components/workloads/WorkloadTierCard";
import { adjustWorkloadTierConfig } from "@/lib/workload-pages/hardware-templates";
import type {
  WorkloadComplexity,
  WorkloadPerformanceTier,
  WorkloadSlug,
} from "@/lib/workload-pages/types";
import { WORKLOAD_COMPLEXITY_PRESETS } from "@/lib/workload-pages/types";

type WorkloadResolutionTabsProps = {
  slug: WorkloadSlug;
  tiers: WorkloadPerformanceTier[];
};

const tabButtonClass = (isActive: boolean) =>
  `rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
    isActive
      ? "border-brand-500 bg-brand-600/20 text-white"
      : "border-surface-800 bg-surface-900 text-surface-200 hover:border-brand-500/40 hover:text-white"
  }`;

const COMPLEXITY_LABELS: Record<WorkloadComplexity, string> = {
  basic: "Basic",
  standard: "Standard",
  advanced: "Advanced",
  professional: "Professional",
};

export default function WorkloadResolutionTabs({
  slug,
  tiers,
}: WorkloadResolutionTabsProps) {
  const [activeId, setActiveId] = useState(tiers[0]?.id ?? "");
  const [complexity, setComplexity] = useState<WorkloadComplexity>("standard");

  const activeTier = tiers.find((tier) => tier.id === activeId) ?? tiers[0];

  const activeConfig = useMemo(() => {
    if (!activeTier) return null;
    return adjustWorkloadTierConfig(activeTier.config, slug, activeTier.resolution, complexity);
  }, [activeTier, slug, complexity]);

  if (!activeTier || !activeConfig) return null;

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div role="tablist" aria-label="Select timeline or output resolution" className="flex flex-wrap gap-2">
          {tiers.map((tier) => {
            const isActive = tier.id === activeTier.id;
            return (
              <button
                key={tier.id}
                type="button"
                role="tab"
                id={`workload-tab-${tier.id}`}
                aria-selected={isActive}
                aria-controls={`workload-panel-${tier.id}`}
                onClick={() => setActiveId(tier.id)}
                className={tabButtonClass(isActive)}
              >
                {tier.resolution}
              </button>
            );
          })}
        </div>

        <div role="group" aria-label="Project complexity" className="flex flex-wrap gap-2">
          {WORKLOAD_COMPLEXITY_PRESETS.map((preset) => {
            const isActive = preset === complexity;
            return (
              <button
                key={preset}
                type="button"
                aria-pressed={isActive}
                onClick={() => setComplexity(preset)}
                className={tabButtonClass(isActive)}
              >
                {COMPLEXITY_LABELS[preset]}
              </button>
            );
          })}
        </div>
      </div>

      <div
        role="tabpanel"
        id={`workload-panel-${activeTier.id}`}
        aria-labelledby={`workload-tab-${activeTier.id}`}
        className="mt-6 min-h-[32rem]"
      >
        <WorkloadTierCard
          resolution={activeTier.resolution}
          complexity={complexity}
          config={activeConfig}
        />
      </div>
    </div>
  );
}
