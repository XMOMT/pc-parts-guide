"use client";

import { useMemo, useState } from "react";
import AffiliateDisclosure from "@/components/legal/AffiliateDisclosure";
import EditorialDisclaimer from "@/components/legal/EditorialDisclaimer";
import type { BuildPageContent } from "@/lib/build-pages/types";
import { BUILD_PICK_TIER_LABELS } from "@/lib/build-pages/types";

const tierBadgeClass = (tier: BuildPageContent["picks"][number]["tier"]) => {
  switch (tier) {
    case "budget":
      return "border-emerald-500/40 bg-emerald-500/10 text-emerald-200";
    case "sweet-spot":
      return "border-brand-500/40 bg-brand-600/15 text-brand-200";
    case "high-end":
      return "border-violet-500/40 bg-violet-500/10 text-violet-200";
    case "enthusiast":
      return "border-amber-500/40 bg-amber-500/10 text-amber-200";
  }
};

const tabButtonClass = (isActive: boolean) =>
  `rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
    isActive
      ? "border-brand-500 bg-brand-600/20 text-white"
      : "border-surface-800 bg-surface-900 text-surface-200 hover:border-brand-500/40 hover:text-white"
  }`;

type BuildGuidePageProps = {
  content: BuildPageContent;
};

export default function BuildGuidePage({ content }: BuildGuidePageProps) {
  const [rayTracing, setRayTracing] = useState(false);

  const showRtToggle =
    content.supportsRayTracing && content.picksRtOn && content.picksRtOn.length > 0;

  const { summary, picks, buyingTips } = useMemo(() => {
    if (showRtToggle && rayTracing) {
      return {
        summary: content.summaryRtOn ?? content.summary,
        picks: content.picksRtOn ?? content.picks,
        buyingTips: content.buyingTipsRtOn ?? content.buyingTips,
      };
    }
    return {
      summary: content.summary,
      picks: content.picks,
      buyingTips: content.buyingTips,
    };
  }, [content, rayTracing, showRtToggle]);

  return (
    <div className="space-y-12">
      {showRtToggle && (
        <div
          role="group"
          aria-label="Ray tracing"
          className="inline-flex rounded-full border border-surface-800 bg-surface-900 p-1"
        >
          <button
            type="button"
            aria-pressed={!rayTracing}
            onClick={() => setRayTracing(false)}
            className={tabButtonClass(!rayTracing)}
          >
            RT off
          </button>
          <button
            type="button"
            aria-pressed={rayTracing}
            onClick={() => setRayTracing(true)}
            className={tabButtonClass(rayTracing)}
          >
            RT on
          </button>
        </div>
      )}

      <section aria-labelledby="build-summary-heading">
        <h2 id="build-summary-heading" className="sr-only">
          Summary
        </h2>
        <p className="max-w-3xl text-surface-200/70">{summary}</p>
      </section>

      <section aria-labelledby="build-picks-heading">
        <h2 id="build-picks-heading" className="text-xl font-bold text-white">
          Top picks{rayTracing && showRtToggle ? " · ray tracing" : ""}
        </h2>
        <ul className="mt-6 space-y-4">
          {picks.map((pick) => (
            <li
              key={`${pick.tier}-${pick.name}-${rayTracing ? "rt" : "raster"}`}
              className="rounded-xl border border-surface-800 bg-surface-900/50 p-6"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full border px-3 py-0.5 text-xs font-semibold uppercase tracking-wider ${tierBadgeClass(pick.tier)}`}
                >
                  {BUILD_PICK_TIER_LABELS[pick.tier]}
                </span>
                <h3 className="text-lg font-semibold text-white">{pick.name}</h3>
              </div>
              <p className="mt-3 text-sm text-surface-200/70">{pick.summary}</p>
              <ul className="mt-4 space-y-2">
                {pick.details.map((line) => (
                  <li key={line} className="text-sm text-surface-200/60">
                    · {line}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <AffiliateDisclosure />

      <EditorialDisclaimer className="max-w-3xl" />

      <section aria-labelledby="build-tips-heading" className="mt-10">
        <h2 id="build-tips-heading" className="text-xl font-bold text-white">
          Buying tips
        </h2>
        <ul className="mt-4 space-y-2">
          {buyingTips.map((tip) => (
            <li key={tip} className="text-sm text-surface-200/70">
              · {tip}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
