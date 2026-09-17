import type { WorkloadSlug } from "./types";

export type Workload = {
  slug: WorkloadSlug;
  title: string;
  description: string;
};

export const workloads: Workload[] = [
  {
    slug: "photo-editing",
    title: "Photo Editing",
    description: "Lightroom, Photoshop, and RAW workflows from 1080p displays to 4K delivery.",
  },
  {
    slug: "video-editing",
    title: "Video Editing",
    description: "Premiere Pro, DaVinci Resolve, and timeline hardware for 1080p through 4K.",
  },
  {
    slug: "3d-rendering",
    title: "3D Rendering",
    description: "Blender, Maya, and GPU/CPU rendering from HD viewports to 4K final frames.",
  },
];

export function getWorkloadSlugs(): WorkloadSlug[] {
  return workloads.map((w) => w.slug);
}

export function getWorkloadBySlug(slug: string): Workload | undefined {
  return workloads.find((w) => w.slug === slug);
}
