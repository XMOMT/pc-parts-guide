export type BuildSlug =
  | "best-1080p-gpus"
  | "best-1440p-gpus"
  | "best-4k-gpus"
  | "best-1080p-cpus"
  | "best-1440p-cpus"
  | "best-4k-cpus";

export type BuildPickTier = "budget" | "sweet-spot" | "high-end" | "enthusiast";

export type BuildPick = {
  tier: BuildPickTier;
  name: string;
  summary: string;
  details: string[];
};

export type BuildPageContent = {
  slug: BuildSlug;
  title: string;
  summary: string;
  picks: BuildPick[];
  buyingTips: string[];
  /** GPU guides: alternate picks when targeting ray tracing / path tracing. */
  supportsRayTracing?: boolean;
  picksRtOn?: BuildPick[];
  summaryRtOn?: string;
  buyingTipsRtOn?: string[];
};

export const BUILD_PICK_TIER_LABELS: Record<BuildPickTier, string> = {
  budget: "Budget",
  "sweet-spot": "Sweet spot",
  "high-end": "High-end",
  enthusiast: "Enthusiast",
};
