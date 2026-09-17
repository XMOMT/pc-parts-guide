import type { GamePageContent } from "@/lib/game-pages/types";
import ResolutionTabs from "@/components/games/ResolutionTabs";
import { formatUpscalingSupport } from "@/lib/game-pages/upscaling";

type GameRequirementsPageProps = {
  content: GamePageContent;
};

export default function GameRequirementsPage({ content }: GameRequirementsPageProps) {
  return (
    <div className="space-y-12">
      <section aria-labelledby="overview-heading">
        <h2 id="overview-heading" className="text-xl font-bold text-white">
          Overview
        </h2>
        <p className="mt-3 max-w-3xl text-surface-200/70">{content.summary}</p>

        {content.overviewCallouts && content.overviewCallouts.length > 0 && (
          <div className="mt-4 space-y-3">
            {content.overviewCallouts.map((callout) => (
              <aside
                key={callout.title}
                className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3"
              >
                <p className="text-sm font-semibold text-amber-200">{callout.title}</p>
                <p className="mt-1 text-sm text-amber-100/80">{callout.message}</p>
              </aside>
            ))}
          </div>
        )}

        <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-surface-800 bg-surface-900/30 px-4 py-3">
            <dt className="text-xs uppercase tracking-wider text-surface-200/40">Test preset</dt>
            <dd className="mt-1 text-sm text-white">{content.settingsPreset}</dd>
          </div>
          <div className="rounded-lg border border-surface-800 bg-surface-900/30 px-4 py-3">
            <dt className="text-xs uppercase tracking-wider text-surface-200/40">Upscaling</dt>
            <dd className="mt-1 text-sm text-white">
              {formatUpscalingSupport(content.upscalingSupport)}
            </dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="tiers-heading">
        <h2 id="tiers-heading" className="text-xl font-bold text-white">
          Hardware by target FPS
        </h2>
        <p className="mt-2 text-sm text-surface-200/60">
          Pick a resolution, 60 or 120 FPS target, quality preset (Low–Ultra), upscaler
          (Native, DLSS, FSR, or XeSS), upscaling quality when applicable, and ray
          tracing — specs update to match. Minimum gets you close to your target;
          recommended holds it with headroom.
        </p>

        <ResolutionTabs
          tiers={content.tiers}
          supportsRayTracing={content.supportsRayTracing ?? true}
          upscalingSupport={content.upscalingSupport}
        />
      </section>

      <section aria-labelledby="notes-heading">
        <h2 id="notes-heading" className="text-xl font-bold text-white">
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

      <section aria-labelledby="bottlenecks-heading">
        <h2 id="bottlenecks-heading" className="text-xl font-bold text-white">
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
