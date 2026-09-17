import { buildWorkloadPageContent } from "./content";
import { getWorkloadBySlug } from "./workloads";
import type { WorkloadPageContent, WorkloadSlug } from "./types";

export function getWorkloadPageContent(slug: string): WorkloadPageContent | undefined {
  const workload = getWorkloadBySlug(slug);
  if (!workload) {
    return undefined;
  }
  return buildWorkloadPageContent(workload.slug as WorkloadSlug);
}

export type { WorkloadPageContent, WorkloadSlug } from "./types";
export { workloads, getWorkloadSlugs, getWorkloadBySlug } from "./workloads";
