import { getWorkloadBackgroundImage } from "@/lib/workload-images";
import type { WorkloadSlug } from "@/lib/workload-pages/types";

type WorkloadPageBackgroundProps = {
  slug: WorkloadSlug;
};

/** Viewport-fixed background — crop stays put when tabs change content height. */
export default function WorkloadPageBackground({ slug }: WorkloadPageBackgroundProps) {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 h-[100dvh] w-full overflow-hidden"
      aria-hidden="true"
    >
      <img
        src={getWorkloadBackgroundImage(slug)}
        alt=""
        decoding="async"
        fetchPriority="low"
        className="absolute left-1/2 top-0 h-full w-full min-h-[100dvh] min-w-full max-w-none -translate-x-1/2 object-cover object-center opacity-55"
      />
      <div className="absolute inset-0 bg-surface-950/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-surface-950/30 via-surface-950/55 to-surface-950/85" />
    </div>
  );
}
