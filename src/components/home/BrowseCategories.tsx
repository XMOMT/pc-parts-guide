import Link from "next/link";
import { BuildIcon, WorkloadIcon } from "@/components/ui/Icons";
import {
  cpuBuildCards,
  gpuBuildCards,
  workloadBrowseCards,
  type BuildCard,
  type WorkloadCard,
} from "@/lib/data";

function BuildCardLink({ card }: { card: BuildCard }) {
  return (
    <Link
      href={card.href}
      className="card-hover group flex items-start gap-4 rounded-xl border border-surface-800 bg-surface-900/50 p-5"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-600/10">
        <BuildIcon icon={card.icon} />
      </div>
      <div>
        <h3 className="font-semibold text-white group-hover:text-brand-400">
          {card.label}
        </h3>
        <p className="mt-1 text-sm text-surface-200/60">{card.description}</p>
      </div>
    </Link>
  );
}

function WorkloadCardLink({ card }: { card: WorkloadCard }) {
  const slug = card.href.replace(/^\/workloads\//, "");
  const coverSrc = `/workloads/${slug}.jpg`;

  return (
    <Link
      href={card.href}
      className="card-hover group overflow-hidden rounded-xl border border-surface-800 bg-surface-900/50"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-surface-900">
        <img
          src={coverSrc}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950/90 via-surface-950/20 to-transparent" />
        <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-lg bg-surface-950/60 backdrop-blur-sm">
          <WorkloadIcon icon={card.icon} />
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-white group-hover:text-brand-400">
          {card.label}
        </h3>
        <p className="mt-1 text-sm text-surface-200/60">{card.description}</p>
      </div>
    </Link>
  );
}

export default function BrowseCategories() {
  return (
    <>
      <section className="py-16 sm:py-20" aria-labelledby="gaming-heading">
        <div className="section-container">
          <h2 id="gaming-heading" className="section-title">
            Gaming
          </h2>
          <p className="mt-2 text-surface-200/70">
            Browse the best GPUs and CPUs for your target resolution.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gpuBuildCards.map((card) => (
              <BuildCardLink key={card.href} card={card} />
            ))}
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cpuBuildCards.map((card) => (
              <BuildCardLink key={card.href} card={card} />
            ))}
          </div>
        </div>
      </section>

      <section
        className="border-t border-surface-800 py-16 sm:py-20"
        aria-labelledby="workloads-heading"
      >
        <div className="section-container">
          <h2 id="workloads-heading" className="section-title">
            Workloads
          </h2>
          <p className="mt-2 text-surface-200/70">
            Find the right hardware for creative and productivity tasks.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {workloadBrowseCards.map((card) => (
              <WorkloadCardLink key={card.href} card={card} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
