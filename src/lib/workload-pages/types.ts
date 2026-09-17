import type { ComponentSpec } from "@/lib/game-pages/types";

export type WorkloadSlug = "photo-editing" | "video-editing" | "3d-rendering";

export type WorkloadResolution = "1080p" | "1440p" | "4K";

export type WorkloadComplexity = "basic" | "standard" | "advanced" | "professional";

export const WORKLOAD_COMPLEXITY_PRESETS: WorkloadComplexity[] = [
  "basic",
  "standard",
  "advanced",
  "professional",
];

export type WorkstationGpuSpec = {
  label: string;
  minimum: string;
  recommended: string;
  notes?: string;
};

export type WorkloadTierConfig = {
  settings: string;
  gpu: ComponentSpec;
  /** NVIDIA RTX Pro (formerly Quadro) — shown on Professional complexity only. */
  workstationGpu?: WorkstationGpuSpec;
  cpu: ComponentSpec;
  ram: ComponentSpec;
  storage: ComponentSpec;
  summaryNote: string;
  settingsTips?: string[];
};

export type WorkloadPerformanceTier = {
  id: string;
  resolution: WorkloadResolution;
  config: WorkloadTierConfig;
};

export type WorkloadPageContent = {
  slug: WorkloadSlug;
  title: string;
  summary: string;
  coverImageAlt?: string;
  exampleApps: string[];
  /** Short label for overview (e.g. "GPU + RAM"). */
  primaryFocus: string;
  performanceNotes: string[];
  bottlenecks: { title: string; description: string }[];
  tiers: WorkloadPerformanceTier[];
};
