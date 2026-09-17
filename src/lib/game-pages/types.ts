export type QualityPreset = "low" | "medium" | "high" | "ultra";

export const QUALITY_PRESETS: QualityPreset[] = ["low", "medium", "high", "ultra"];

export type FpsTarget = 60 | 120;

export const FPS_TARGETS: FpsTarget[] = [60, 120];

export type UpscalingTech = "native" | "dlss" | "fsr" | "xess";

export type UpscalingQualityMode =
  | "quality"
  | "balanced"
  | "performance"
  | "ultra-performance";

export type ComponentSpec = {
  label: string;
  minimum: string;
  recommended: string;
  notes?: string;
};

export type TierConfig = {
  settings: string;
  gpu: ComponentSpec;
  cpu: ComponentSpec;
  ram: ComponentSpec;
  storage: ComponentSpec;
  fpsNote: string;
  settingsTips?: string[];
};

export type PerformanceTier = {
  id: string;
  resolution: "1080p" | "1440p" | "4K";
  targetFps: number;
  rtOff: TierConfig;
  rtOn: TierConfig;
};

export type GamePageContent = {
  slug: string;
  title: string;
  summary: string;
  coverImage?: string;
  coverImageAlt?: string;
  lastUpdated: string;
  settingsPreset: string;
  /** Supported upscaling technologies (DLSS, FSR, XeSS, etc.) */
  upscalingSupport: string[];
  supportsRayTracing?: boolean;
  performanceNotes: string[];
  tiers: PerformanceTier[];
  bottlenecks: { title: string; description: string }[];
  overviewCallouts?: { title: string; message: string }[];
};
