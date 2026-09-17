import Link from "next/link";
import { getWorkloadCoverImage } from "@/lib/workload-images";
import type { Workload } from "@/lib/workload-pages/workloads";

type WorkloadsListProps = {
  workloads: Workload[];
};

export default function WorkloadsList({ workloads }: WorkloadsListProps) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {workloads.map((workload) => (
        <li key={workload.slug}>
          <Link
            href={`/workloads/${workload.slug}`}
            className="card-hover group flex h-full flex-col overflow-hidden rounded-xl border border-surface-800 bg-surface-900/50"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-surface-900">
              <img
                src={getWorkloadCoverImage(workload.slug)}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-950/80 via-transparent to-transparent" />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h2 className="text-lg font-semibold text-white group-hover:text-brand-400">
                {workload.title}
              </h2>
              <p className="mt-2 flex-1 text-sm text-surface-200/60">{workload.description}</p>
              <span className="mt-4 text-sm font-medium text-brand-400">View requirements →</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
