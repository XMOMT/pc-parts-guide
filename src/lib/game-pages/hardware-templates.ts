import { getUpscalingSelectionLabel } from "./upscaling";
import type {
  ComponentSpec,
  FpsTarget,
  QualityPreset,
  TierConfig,
  UpscalingQualityMode,
  UpscalingTech,
} from "./types";
import type { DemandTier } from "./classify";
import type { GameGenre } from "@/lib/game-genres";
import {
  getFpsNote,
  getSettingsTips,
  getTierSettingsLabel,
} from "./game-content";

type GpuPair = { minimum: string; recommended: string; notes?: string };
type CpuPair = { minimum: string; recommended: string; notes?: string };

type HardwareSet = {
  gpu: GpuPair;
  cpu: CpuPair;
  ram: ComponentSpec;
  storage: ComponentSpec;
};

const RAM_16: ComponentSpec = {
  label: "Memory",
  minimum: "16 GB (dual-channel)",
  recommended: "16 GB (dual-channel)",
  notes: "16 GB prevents stutter when multitasking or using mods.",
};

const RAM_16_32: ComponentSpec = {
  label: "Memory",
  minimum: "16 GB (dual-channel)",
  recommended: "32 GB (dual-channel)",
  notes: "32 GB recommended for 4K textures and background apps.",
};

const STORAGE: ComponentSpec = {
  label: "Storage",
  minimum: "50 GB SSD",
  recommended: "50 GB NVMe SSD",
  notes: "SSD recommended for faster load times.",
};

/** RT off hardware by demand tier and resolution — targets 60 FPS at Ultra/High */
const RT_OFF: Record<DemandTier, Record<"1080p" | "1440p" | "4K", HardwareSet>> = {
  light: {
    "1080p": {
      gpu: { minimum: "GTX 1050 Ti 4 GB / RX 560 4 GB", recommended: "GTX 1650 Super 4 GB / RX 5500 XT 4 GB" },
      cpu: { minimum: "Ryzen 5 2600 / Intel Core i5-8400", recommended: "Ryzen 5 3600 / Intel Core i5-10400" },
      ram: { label: "Memory", minimum: "8 GB", recommended: "16 GB (dual-channel)" },
      storage: STORAGE,
    },
    "1440p": {
      gpu: { minimum: "GTX 1660 Super 6 GB / RX 5600 XT 6 GB", recommended: "RTX 3060 12 GB / RX 6600 8 GB" },
      cpu: { minimum: "Ryzen 5 3600 / Intel Core i5-10400", recommended: "Ryzen 5 5600 / Intel Core i5-12400" },
      ram: RAM_16,
      storage: STORAGE,
    },
    "4K": {
      gpu: { minimum: "RTX 3060 12 GB / RX 6600 8 GB", recommended: "RTX 3060 Ti 8 GB / RX 6700 XT 12 GB", notes: "DLSS or FSR Quality recommended at 4K." },
      cpu: { minimum: "Ryzen 5 5600 / Intel Core i5-12400", recommended: "Ryzen 7 5700X / Intel Core i5-13400" },
      ram: RAM_16,
      storage: STORAGE,
    },
  },
  moderate: {
    "1080p": {
      gpu: { minimum: "GTX 1660 Super 6 GB / RX 5600 XT 6 GB", recommended: "RTX 3060 12 GB / RX 6600 8 GB" },
      cpu: { minimum: "Ryzen 5 3600 / Intel Core i5-10400", recommended: "Ryzen 5 5600 / Intel Core i5-12400" },
      ram: RAM_16,
      storage: STORAGE,
    },
    "1440p": {
      gpu: { minimum: "RTX 3060 12 GB / RX 6600 8 GB", recommended: "RTX 3060 Ti 8 GB / RX 6700 XT 12 GB", notes: "DLSS or FSR Quality helps maintain 60 FPS." },
      cpu: { minimum: "Ryzen 5 5600 / Intel Core i5-12400", recommended: "Ryzen 7 5700X / Intel Core i5-13400" },
      ram: RAM_16,
      storage: STORAGE,
    },
    "4K": {
      gpu: { minimum: "RTX 3070 8 GB / RX 6800 16 GB", recommended: "RTX 3080 10 GB / RX 6800 XT 16 GB", notes: "DLSS or FSR Quality essentially required at 4K." },
      cpu: { minimum: "Ryzen 7 5700X / Intel Core i7-12700", recommended: "Ryzen 7 7800X3D / Intel Core i7-13700" },
      ram: RAM_16_32,
      storage: STORAGE,
    },
  },
  demanding: {
    "1080p": {
      gpu: { minimum: "RTX 3060 12 GB / RX 6600 8 GB", recommended: "RTX 3060 Ti 8 GB / RX 6700 XT 12 GB" },
      cpu: { minimum: "Ryzen 5 5600 / Intel Core i5-12400", recommended: "Ryzen 7 5700X / Intel Core i5-13400" },
      ram: RAM_16,
      storage: STORAGE,
    },
    "1440p": {
      gpu: { minimum: "RTX 3060 Ti 8 GB / RX 6700 XT 12 GB", recommended: "RTX 3070 8 GB / RX 6800 16 GB", notes: "DLSS or FSR Quality recommended." },
      cpu: { minimum: "Ryzen 5 5600 / Intel Core i5-12400", recommended: "Ryzen 7 5700X / Intel Core i7-12700" },
      ram: RAM_16,
      storage: STORAGE,
    },
    "4K": {
      gpu: { minimum: "RTX 3080 10 GB / RX 6800 XT 16 GB", recommended: "RTX 4070 Super 12 GB / RX 7800 XT 16 GB", notes: "DLSS or FSR Quality required for stable 4K 60." },
      cpu: { minimum: "Ryzen 7 5700X / Intel Core i7-12700", recommended: "Ryzen 7 7800X3D / Intel Core i7-13700" },
      ram: RAM_16_32,
      storage: STORAGE,
    },
  },
  extreme: {
    "1080p": {
      gpu: { minimum: "RTX 3060 Ti 8 GB / RX 6700 XT 12 GB", recommended: "RTX 3070 8 GB / RX 6800 16 GB" },
      cpu: { minimum: "Ryzen 5 5600 / Intel Core i5-12400", recommended: "Ryzen 7 5700X / Intel Core i7-12700" },
      ram: RAM_16,
      storage: STORAGE,
    },
    "1440p": {
      gpu: { minimum: "RTX 3070 8 GB / RX 6800 16 GB", recommended: "RTX 4070 12 GB / RX 7800 XT 16 GB", notes: "DLSS or FSR Quality recommended." },
      cpu: { minimum: "Ryzen 7 5700X / Intel Core i7-12700", recommended: "Ryzen 7 7800X3D / Intel Core i7-13700" },
      ram: RAM_16,
      storage: STORAGE,
    },
    "4K": {
      gpu: { minimum: "RTX 3080 10 GB / RX 6800 XT 16 GB", recommended: "RTX 4070 Ti Super 16 GB / RX 7900 XT 20 GB", notes: "DLSS or FSR Quality required." },
      cpu: { minimum: "Ryzen 7 5700X / Intel Core i7-12700", recommended: "Ryzen 7 7800X3D / Intel Core i7-13700" },
      ram: RAM_16_32,
      storage: STORAGE,
    },
  },
};

/** RT on adds ~one GPU tier step; requires RTX/RDNA 2+ */
const RT_ON_STEP: Record<DemandTier, number> = {
  light: 0,
  moderate: 1,
  demanding: 1,
  extreme: 2,
};

const GPU_LADDER: GpuPair[] = [
  { minimum: "GTX 1050 Ti 4 GB / RX 560 4 GB", recommended: "GTX 1650 Super 4 GB / RX 5500 XT 4 GB" },
  { minimum: "GTX 1660 Super 6 GB / RX 5600 XT 6 GB", recommended: "RTX 3060 12 GB / RX 6600 8 GB" },
  { minimum: "RTX 3060 12 GB / RX 6600 8 GB", recommended: "RTX 3060 Ti 8 GB / RX 6700 XT 12 GB" },
  { minimum: "RTX 3060 Ti 8 GB / RX 6700 XT 12 GB", recommended: "RTX 3070 8 GB / RX 6800 16 GB" },
  { minimum: "RTX 3070 8 GB / RX 6800 16 GB", recommended: "RTX 4070 12 GB / RX 7800 XT 16 GB" },
  { minimum: "RTX 3080 10 GB / RX 6800 XT 16 GB", recommended: "RTX 4070 Super 12 GB / RX 7800 XT 16 GB" },
  { minimum: "RTX 3080 10 GB / RX 6800 XT 16 GB", recommended: "RTX 4070 Ti Super 16 GB / RX 7900 XT 20 GB" },
  { minimum: "RTX 4070 12 GB / RX 7800 XT 16 GB", recommended: "RTX 4080 16 GB / RX 7900 XTX 24 GB" },
];

function findGpuIndex(gpu: GpuPair): number {
  const idx = GPU_LADDER.findIndex(
    (g) => g.recommended === gpu.recommended || g.minimum === gpu.minimum
  );
  return idx >= 0 ? idx : 2;
}

function stepGpu(gpu: GpuPair, steps: number, floorIndex = 0): GpuPair {
  const idx = Math.max(floorIndex, Math.min(findGpuIndex(gpu) + steps, GPU_LADDER.length - 1));
  const result = GPU_LADDER[idx];
  return {
    ...result,
    notes: gpu.notes ?? result.notes,
  };
}

const CPU_LADDER: CpuPair[] = [
  { minimum: "Ryzen 5 2600 / Intel Core i5-8400", recommended: "Ryzen 5 3600 / Intel Core i5-10400" },
  { minimum: "Ryzen 5 3600 / Intel Core i5-10400", recommended: "Ryzen 5 5600 / Intel Core i5-12400" },
  { minimum: "Ryzen 5 5600 / Intel Core i5-12400", recommended: "Ryzen 7 5700X / Intel Core i5-13400" },
  { minimum: "Ryzen 7 5700X / Intel Core i7-12700", recommended: "Ryzen 7 7800X3D / Intel Core i7-13700" },
];

function findCpuIndex(cpu: CpuPair): number {
  const idx = CPU_LADDER.findIndex(
    (c) => c.recommended === cpu.recommended || c.minimum === cpu.minimum,
  );
  return idx >= 0 ? idx : 2;
}

function stepCpu(cpu: CpuPair, steps: number): CpuPair {
  const idx = Math.max(0, Math.min(findCpuIndex(cpu) + steps, CPU_LADDER.length - 1));
  return CPU_LADDER[idx];
}

/** GPU steps relative to Ultra baseline (0 = no change). */
const QUALITY_GPU_STEPS: Record<QualityPreset, number> = {
  low: -3,
  medium: -2,
  high: -1,
  ultra: 0,
};

const QUALITY_CPU_STEPS: Record<QualityPreset, number> = {
  low: -2,
  medium: -1,
  high: 0,
  ultra: 0,
};

const PRESET_LABELS: Record<QualityPreset, string> = {
  low: "Low preset",
  medium: "Medium preset",
  high: "High preset",
  ultra: "Ultra preset",
};

function updateSettingsForPreset(settings: string, preset: QualityPreset): string {
  const rest = settings.replace(
    /^(Low|Medium|High|Ultra|High–Ultra) preset,?\s*/i,
    "",
  );
  return rest ? `${PRESET_LABELS[preset]}, ${rest}` : PRESET_LABELS[preset];
}

/** Minimum GPU ladder index when ray tracing is enabled (RTX 3060 class). */
const RT_GPU_FLOOR_INDEX = 2;

const UPSCALING_QUALITY_GPU_STEPS: Record<UpscalingQualityMode, number> = {
  quality: 0,
  balanced: -1,
  performance: -2,
  "ultra-performance": -3,
};

const NATIVE_RESOLUTION_GPU_BONUS: Record<"1080p" | "1440p" | "4K", number> = {
  "1080p": 0,
  "1440p": 1,
  "4K": 2,
};

/** Extra GPU steps when targeting 120 FPS instead of 60 (baseline templates assume 60). */
const FPS_TARGET_GPU_STEPS: Record<FpsTarget, Record<"1080p" | "1440p" | "4K", number>> = {
  60: { "1080p": 0, "1440p": 0, "4K": 0 },
  120: { "1080p": 1, "1440p": 2, "4K": 3 },
};

const FPS_TARGET_CPU_STEPS: Record<FpsTarget, Record<"1080p" | "1440p" | "4K", number>> = {
  60: { "1080p": 0, "1440p": 0, "4K": 0 },
  120: { "1080p": 0, "1440p": 1, "4K": 1 },
};

function replaceFpsInText(text: string, targetFps: FpsTarget): string {
  return text.replace(/\b60 FPS\b/g, `${targetFps} FPS`);
}

function updateSettingsForUpscaling(settings: string, upscalingLabel: string): string {
  const withoutUpscaling = settings
    .replace(/,?\s*native resolution/gi, "")
    .replace(/,?\s*DLSS Quality or FSR Quality/gi, "")
    .replace(/,?\s*(DLSS|FSR|XeSS)[^,]*/gi, "")
    .replace(/,\s*,/g, ",")
    .replace(/,\s*$/, "")
    .trim();

  return withoutUpscaling
    ? `${withoutUpscaling}, ${upscalingLabel}`
    : upscalingLabel;
}

export function adjustTierConfigForUpscaling(
  config: TierConfig,
  tech: UpscalingTech,
  quality: UpscalingQualityMode,
  resolution: "1080p" | "1440p" | "4K",
  rayTracing: boolean,
  upscalingSupport: readonly string[],
): TierConfig {
  const effectiveTech =
    upscalingSupport.length === 0 && tech !== "native" ? "native" : tech;
  const upscalingLabel = getUpscalingSelectionLabel(
    effectiveTech,
    quality,
    upscalingSupport,
  );

  const gpuSteps =
    effectiveTech === "native"
      ? NATIVE_RESOLUTION_GPU_BONUS[resolution]
      : UPSCALING_QUALITY_GPU_STEPS[quality];

  if (gpuSteps === 0) {
    return {
      ...config,
      settings: updateSettingsForUpscaling(config.settings, upscalingLabel),
      fpsNote:
        effectiveTech !== "native"
          ? `${config.fpsNote} Upscaling: ${upscalingLabel}.`
          : config.fpsNote,
    };
  }

  const gpuFloor = rayTracing ? RT_GPU_FLOOR_INDEX : 0;
  const steppedGpu = stepGpu(
    {
      minimum: config.gpu.minimum,
      recommended: config.gpu.recommended,
      notes: config.gpu.notes,
    },
    gpuSteps,
    gpuFloor,
  );

  const upscalingNote =
    effectiveTech === "native" && resolution !== "1080p"
      ? `Native ${resolution} needs a stronger GPU than upscaled rendering.`
      : quality === "performance" || quality === "ultra-performance"
        ? "Lower upscaling quality modes trade sharpness for FPS — a weaker GPU can still hit your target frame rate."
        : effectiveTech === "dlss"
          ? "DLSS requires an NVIDIA RTX GPU."
          : effectiveTech === "xess"
            ? "XeSS works on Intel Arc and most modern GPUs via DX12."
            : undefined;

  return {
    ...config,
    settings: updateSettingsForUpscaling(config.settings, upscalingLabel),
    gpu: {
      ...config.gpu,
      ...steppedGpu,
      notes: upscalingNote ?? steppedGpu.notes ?? config.gpu.notes,
    },
    fpsNote: `${config.fpsNote} Upscaling: ${upscalingLabel}.`,
  };
}

export function adjustTierConfigForFpsTarget(
  config: TierConfig,
  targetFps: FpsTarget,
  resolution: "1080p" | "1440p" | "4K",
  rayTracing: boolean,
): TierConfig {
  const gpuSteps = FPS_TARGET_GPU_STEPS[targetFps][resolution];
  const cpuSteps = FPS_TARGET_CPU_STEPS[targetFps][resolution];

  const fpsNote = replaceFpsInText(config.fpsNote, targetFps);
  const gpuNotes = config.gpu.notes
    ? replaceFpsInText(config.gpu.notes, targetFps)
    : config.gpu.notes;

  if (gpuSteps === 0 && cpuSteps === 0) {
    return {
      ...config,
      fpsNote,
      gpu: { ...config.gpu, notes: gpuNotes },
    };
  }

  const gpuFloor = rayTracing ? RT_GPU_FLOOR_INDEX : 0;
  const steppedGpu = stepGpu(
    {
      minimum: config.gpu.minimum,
      recommended: config.gpu.recommended,
      notes: gpuNotes,
    },
    gpuSteps,
    gpuFloor,
  );

  const steppedCpu =
    cpuSteps > 0
      ? stepCpu(
          {
            minimum: config.cpu.minimum,
            recommended: config.cpu.recommended,
            notes: config.cpu.notes,
          },
          cpuSteps,
        )
      : config.cpu;

  const fpsTargetNote =
    targetFps === 120
      ? resolution === "4K"
        ? "120 FPS at 4K needs a high-end GPU — DLSS or FSR Performance helps."
        : "120 FPS needs roughly twice the GPU headroom of 60 FPS at the same settings."
      : undefined;

  return {
    ...config,
    gpu: {
      ...config.gpu,
      ...steppedGpu,
      notes: fpsTargetNote ?? steppedGpu.notes ?? config.gpu.notes,
    },
    cpu: { ...config.cpu, ...steppedCpu },
    fpsNote: `${fpsNote} Hardware adjusted for ${targetFps} FPS target.`,
  };
}

export function adjustTierConfig(
  base: TierConfig,
  options: {
    qualityPreset: QualityPreset;
    upscalingTech: UpscalingTech;
    upscalingQuality: UpscalingQualityMode;
    targetFps: FpsTarget;
    rayTracing: boolean;
    resolution: "1080p" | "1440p" | "4K";
    upscalingSupport: readonly string[];
  },
): TierConfig {
  const afterPreset = adjustTierConfigForPreset(
    base,
    options.qualityPreset,
    options.rayTracing,
  );
  const afterUpscaling = adjustTierConfigForUpscaling(
    afterPreset,
    options.upscalingTech,
    options.upscalingQuality,
    options.resolution,
    options.rayTracing,
    options.upscalingSupport,
  );
  return adjustTierConfigForFpsTarget(
    afterUpscaling,
    options.targetFps,
    options.resolution,
    options.rayTracing,
  );
}

export function adjustTierConfigForPreset(
  config: TierConfig,
  preset: QualityPreset,
  rayTracing: boolean,
): TierConfig {
  if (preset === "ultra") {
    return {
      ...config,
      settings: updateSettingsForPreset(config.settings, preset),
    };
  }

  const gpuSteps = QUALITY_GPU_STEPS[preset];
  const cpuSteps = QUALITY_CPU_STEPS[preset];
  const gpuFloor = rayTracing ? RT_GPU_FLOOR_INDEX : 0;

  const steppedGpu = stepGpu(
    { minimum: config.gpu.minimum, recommended: config.gpu.recommended, notes: config.gpu.notes },
    gpuSteps,
    gpuFloor,
  );

  const steppedCpu = stepCpu(
    { minimum: config.cpu.minimum, recommended: config.cpu.recommended, notes: config.cpu.notes },
    cpuSteps,
  );

  let ram = config.ram;
  if (preset === "low" && config.ram.recommended.includes("32 GB")) {
    ram = {
      ...config.ram,
      recommended: "16 GB (dual-channel)",
      notes: "16 GB is enough for Low settings; 32 GB only needed at higher presets.",
    };
  }

  return {
    ...config,
    settings: updateSettingsForPreset(config.settings, preset),
    gpu: {
      ...config.gpu,
      ...steppedGpu,
      notes: rayTracing
        ? "Ray tracing requires RTX 20-series or newer / RX 6000-series or newer. Lower presets reduce RT load but still need an RT-capable GPU."
        : steppedGpu.notes ?? config.gpu.notes,
    },
    cpu: { ...config.cpu, ...steppedCpu },
    ram,
    fpsNote: `${config.fpsNote} Hardware adjusted for ${PRESET_LABELS[preset].toLowerCase()}.`,
  };
}

export function getHardware(
  tier: DemandTier,
  resolution: "1080p" | "1440p" | "4K",
  rayTracing: boolean
): HardwareSet {
  const base = RT_OFF[tier][resolution];
  if (!rayTracing) return base;
  return {
    ...base,
    gpu: {
      ...stepGpu(base.gpu, RT_ON_STEP[tier] || 1),
      notes:
        "Ray tracing requires RTX 20-series or newer / RX 6000-series or newer. DLSS or FSR Quality recommended.",
    },
    cpu: {
      ...base.cpu,
      recommended:
        tier === "extreme" || resolution === "4K"
          ? "Ryzen 7 7800X3D / Intel Core i7-13700"
          : base.cpu.recommended,
    },
    ram:
      rayTracing && resolution === "4K"
        ? RAM_16_32
        : base.ram,
  };
}

export function buildTierConfig(
  tier: DemandTier,
  resolution: "1080p" | "1440p" | "4K",
  rayTracing: boolean,
  gameTitle: string,
  genre: GameGenre,
): TierConfig {
  const hw = getHardware(tier, resolution, rayTracing);

  return {
    settings: getTierSettingsLabel(genre, tier, resolution, rayTracing),
    gpu: { label: "Graphics card", ...hw.gpu },
    cpu: { label: "Processor", ...hw.cpu },
    ram: hw.ram,
    storage: hw.storage,
    fpsNote: getFpsNote(gameTitle, resolution, tier, rayTracing, genre),
    settingsTips: getSettingsTips(genre, resolution, rayTracing),
  };
}
