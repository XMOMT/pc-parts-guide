import { withBasePath } from "@/lib/base-path";
import type { WorkloadSlug } from "@/lib/workload-pages/types";

/** Hero banner under the page title (≈2:1). */
export function getWorkloadCoverImage(slug: WorkloadSlug | string) {
  return withBasePath(`/workloads/${slug}.jpg`);
}

/** Full-viewport atmosphere layer (fixed background). */
export function getWorkloadBackgroundImage(slug: WorkloadSlug | string) {
  return withBasePath(`/workloads/${slug}-bg.jpg`);
}
