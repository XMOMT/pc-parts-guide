import type { WorkloadComplexity, WorkloadResolution, WorkloadSlug, WorkloadTierConfig } from "./types";

type GpuPair = { minimum: string; recommended: string; notes?: string };
type CpuPair = { minimum: string; recommended: string; notes?: string };

type HardwareSet = {
  gpu: GpuPair;
  cpu: CpuPair;
  ram: { minimum: string; recommended: string; notes?: string };
  storage: { minimum: string; recommended: string; notes?: string };
};

const GPU_LADDER: GpuPair[] = [
  { minimum: "Integrated / GTX 1650 4 GB", recommended: "GTX 1660 Super 6 GB / RX 5500 XT 8 GB" },
  { minimum: "GTX 1660 Super 6 GB / RX 5500 XT 8 GB", recommended: "RTX 3060 12 GB / RX 6600 8 GB" },
  { minimum: "RTX 3060 12 GB / RX 6600 8 GB", recommended: "RTX 4060 8 GB / RX 7600 8 GB" },
  { minimum: "RTX 4060 8 GB / RX 7600 8 GB", recommended: "RTX 4060 Ti 16 GB / RX 7700 XT 12 GB" },
  { minimum: "RTX 4060 Ti 16 GB / RX 7700 XT 12 GB", recommended: "RTX 4070 12 GB / RX 7800 XT 16 GB" },
  { minimum: "RTX 4070 12 GB / RX 7800 XT 16 GB", recommended: "RTX 4070 Ti Super 16 GB / RX 7900 XT 20 GB" },
  { minimum: "RTX 4070 Ti Super 16 GB / RX 7900 XT 20 GB", recommended: "RTX 4080 Super 16 GB / RX 7900 XTX 24 GB" },
  { minimum: "RTX 4080 Super 16 GB / RX 7900 XTX 24 GB", recommended: "RTX 4090 24 GB / RX 7900 XTX 24 GB" },
];

const CPU_LADDER: CpuPair[] = [
  { minimum: "Ryzen 5 3600 / Intel Core i5-10400", recommended: "Ryzen 5 5600 / Intel Core i5-12400" },
  { minimum: "Ryzen 5 5600 / Intel Core i5-12400", recommended: "Ryzen 7 5700X / Intel Core i5-13400" },
  { minimum: "Ryzen 7 5700X / Intel Core i7-12700", recommended: "Ryzen 7 7800X3D / Intel Core i7-13700" },
  { minimum: "Ryzen 7 7800X3D / Intel Core i7-13700", recommended: "Ryzen 9 7900 / Intel Core i7-14700K" },
  { minimum: "Ryzen 9 7900 / Intel Core i7-14700K", recommended: "Ryzen 9 7950X / Intel Core i9-14900K" },
];

function findGpuIndex(gpu: GpuPair): number {
  const idx = GPU_LADDER.findIndex(
    (entry) => entry.recommended === gpu.recommended || entry.minimum === gpu.minimum,
  );
  return idx >= 0 ? idx : 2;
}

function findCpuIndex(cpu: CpuPair): number {
  const idx = CPU_LADDER.findIndex(
    (entry) => entry.recommended === cpu.recommended || entry.minimum === cpu.minimum,
  );
  return idx >= 0 ? idx : 1;
}

function stepGpu(gpu: GpuPair, steps: number, floor = 0): GpuPair {
  const idx = Math.max(floor, Math.min(findGpuIndex(gpu) + steps, GPU_LADDER.length - 1));
  const result = GPU_LADDER[idx];
  return { ...result, notes: gpu.notes ?? result.notes };
}

function stepCpu(cpu: CpuPair, steps: number): CpuPair {
  const idx = Math.max(0, Math.min(findCpuIndex(cpu) + steps, CPU_LADDER.length - 1));
  return CPU_LADDER[idx];
}

const COMPLEXITY_GPU_STEPS: Record<WorkloadComplexity, number> = {
  basic: -2,
  standard: 0,
  advanced: 1,
  professional: 2,
};

const COMPLEXITY_CPU_STEPS: Record<WorkloadComplexity, number> = {
  basic: -1,
  standard: 0,
  advanced: 0,
  professional: 1,
};

const COMPLEXITY_LABELS: Record<WorkloadComplexity, string> = {
  basic: "Basic",
  standard: "Standard",
  advanced: "Advanced",
  professional: "Professional",
};

const PHOTO_HARDWARE: Record<WorkloadResolution, HardwareSet> = {
  "1080p": {
    gpu: {
      minimum: "Integrated graphics or GTX 1650 4 GB",
      recommended: "GTX 1660 Super 6 GB / RX 5500 XT 8 GB",
      notes: "GPU helps with Develop panel, export, and AI denoise in Lightroom and Camera Raw.",
    },
    cpu: {
      minimum: "Ryzen 5 3600 / Intel Core i5-10400",
      recommended: "Ryzen 5 5600 / Intel Core i5-12400",
      notes: "CPU drives batch exports, panoramas, and heavy local adjustments.",
    },
    ram: {
      minimum: "16 GB (dual-channel)",
      recommended: "16 GB (dual-channel)",
      notes: "Enough for large catalogs and several high-res RAWs open at once.",
    },
    storage: {
      minimum: "512 GB SATA SSD",
      recommended: "1 TB NVMe SSD",
      notes: "Keep catalog and cache on SSD; store archives on a second drive.",
    },
  },
  "1440p": {
    gpu: {
      minimum: "GTX 1660 Super 6 GB / RX 5500 XT 8 GB",
      recommended: "RTX 3060 12 GB / RX 6600 8 GB",
    },
    cpu: {
      minimum: "Ryzen 5 5600 / Intel Core i5-12400",
      recommended: "Ryzen 7 5700X / Intel Core i5-13400",
    },
    ram: {
      minimum: "16 GB (dual-channel)",
      recommended: "32 GB (dual-channel)",
      notes: "32 GB helps when editing 45+ MP RAWs with many local adjustments.",
    },
    storage: {
      minimum: "512 GB NVMe SSD",
      recommended: "1 TB NVMe SSD",
    },
  },
  "4K": {
    gpu: {
      minimum: "RTX 3060 12 GB / RX 6600 8 GB",
      recommended: "RTX 4060 8 GB / RX 7600 8 GB",
      notes:
        "Adobe AI Denoise and Super Resolution on Windows target NVIDIA RTX GPUs; general RAW editing also runs on AMD RX.",
    },
    cpu: {
      minimum: "Ryzen 5 5600 / Intel Core i5-12400",
      recommended: "Ryzen 7 5700X / Intel Core i7-12700",
    },
    ram: {
      minimum: "32 GB (dual-channel)",
      recommended: "32 GB (dual-channel)",
      notes: "Large panoramas and stacked composites can exceed 16 GB quickly at 4K.",
    },
    storage: {
      minimum: "1 TB NVMe SSD",
      recommended: "2 TB NVMe SSD",
      notes: "RAW libraries grow fast — plan separate bulk storage for archives.",
    },
  },
};

const VIDEO_HARDWARE: Record<WorkloadResolution, HardwareSet> = {
  "1080p": {
    gpu: {
      minimum: "GTX 1660 Super 6 GB / RX 5600 XT 6 GB",
      recommended: "RTX 3060 12 GB / RX 6600 8 GB",
      notes: "GPU accelerates H.264/H.265 decode, effects, and color in Resolve and Premiere.",
    },
    cpu: {
      minimum: "Ryzen 5 5600 / Intel Core i5-12400",
      recommended: "Ryzen 7 5700X / Intel Core i7-12700",
      notes: "CPU still matters for ProRes, multicam, and when GPU effects are disabled.",
    },
    ram: {
      minimum: "16 GB (dual-channel)",
      recommended: "32 GB (dual-channel)",
      notes: "32 GB avoids cache purges with longer 1080p timelines and many clips.",
    },
    storage: {
      minimum: "1 TB NVMe SSD",
      recommended: "1 TB NVMe SSD",
      notes: "Use a fast scratch disk; avoid editing directly from HDD or network shares.",
    },
  },
  "1440p": {
    gpu: {
      minimum: "RTX 3060 12 GB / RX 6600 8 GB",
      recommended: "RTX 4060 8 GB / RX 7700 XT 12 GB",
    },
    cpu: {
      minimum: "Ryzen 7 5700X / Intel Core i7-12700",
      recommended: "Ryzen 7 7800X3D / Intel Core i7-13700",
    },
    ram: {
      minimum: "32 GB (dual-channel)",
      recommended: "32 GB (dual-channel)",
    },
    storage: {
      minimum: "1 TB NVMe SSD",
      recommended: "2 TB NVMe SSD",
    },
  },
  "4K": {
    gpu: {
      minimum: "RTX 4060 Ti 16 GB / RX 7700 XT 12 GB",
      recommended: "RTX 4070 12 GB / RX 7800 XT 16 GB",
      notes: "VRAM matters for 4K timelines with Fusion, noise reduction, and many nodes.",
    },
    cpu: {
      minimum: "Ryzen 7 7800X3D / Intel Core i7-13700",
      recommended: "Ryzen 9 7900 / Intel Core i7-14700K",
      notes: "H.264/H.265 export and heavy multicam still lean on CPU when codecs are not GPU-native.",
    },
    ram: {
      minimum: "32 GB (dual-channel)",
      recommended: "64 GB (dual-channel)",
      notes: "64 GB is typical for long 4K projects, After Effects comps, and RAM previews.",
    },
    storage: {
      minimum: "2 TB NVMe SSD",
      recommended: "2 TB NVMe SSD + secondary project drive",
      notes: "Sustained write speed matters for ProRes and high-bitrate proxies.",
    },
  },
};

const RENDER_3D_HARDWARE: Record<WorkloadResolution, HardwareSet> = {
  "1080p": {
    gpu: {
      minimum: "RTX 3060 12 GB / RX 6700 XT 12 GB",
      recommended: "RTX 4060 Ti 16 GB / RX 7700 XT 12 GB",
      notes: "Viewport and GPU render engines (Cycles, Redshift, Octane) need VRAM for textures.",
    },
    cpu: {
      minimum: "Ryzen 5 5600 / Intel Core i5-12400",
      recommended: "Ryzen 7 5800X / Intel Core i7-12700",
      notes: "CPU rendering and physics sims still scale with core count and clock.",
    },
    ram: {
      minimum: "32 GB (dual-channel)",
      recommended: "32 GB (dual-channel)",
      notes: "Scene complexity—not display resolution—often drives RAM needs first.",
    },
    storage: {
      minimum: "1 TB NVMe SSD",
      recommended: "2 TB NVMe SSD",
      notes: "Cache and bake files can fill drives quickly on animation projects.",
    },
  },
  "1440p": {
    gpu: {
      minimum: "RTX 4070 12 GB / RX 7800 XT 16 GB",
      recommended: "RTX 4070 Ti Super 16 GB / RX 7900 XT 20 GB",
    },
    cpu: {
      minimum: "Ryzen 7 5800X / Intel Core i7-12700",
      recommended: "Ryzen 9 7900 / Intel Core i7-14700K",
    },
    ram: {
      minimum: "32 GB (dual-channel)",
      recommended: "64 GB (dual-channel)",
    },
    storage: {
      minimum: "2 TB NVMe SSD",
      recommended: "2 TB NVMe SSD",
    },
  },
  "4K": {
    gpu: {
      minimum: "RTX 4070 Ti Super 16 GB / RX 7900 XT 20 GB",
      recommended: "RTX 4080 Super 16 GB / RX 7900 XTX 24 GB",
      notes: "Final-frame 4K GPU renders need headroom for high-res textures and AOVs.",
    },
    cpu: {
      minimum: "Ryzen 9 7900 / Intel Core i7-14700K",
      recommended: "Ryzen 9 7950X / Intel Core i9-14900K",
    },
    ram: {
      minimum: "64 GB (dual-channel)",
      recommended: "64 GB (dual-channel)",
      notes: "Complex scenes with millions of polygons or heavy simulations often need 64 GB+.",
    },
    storage: {
      minimum: "2 TB NVMe SSD",
      recommended: "4 TB NVMe SSD + archive HDD",
    },
  },
};

const HARDWARE_BY_WORKLOAD: Record<WorkloadSlug, Record<WorkloadResolution, HardwareSet>> = {
  "photo-editing": PHOTO_HARDWARE,
  "video-editing": VIDEO_HARDWARE,
  "3d-rendering": RENDER_3D_HARDWARE,
};

/** NVIDIA RTX Pro (formerly Quadro) — paired with Professional complexity only. */
const WORKSTATION_GPU: Record<
  WorkloadSlug,
  Record<WorkloadResolution, { minimum: string; recommended: string; notes: string }>
> = {
  "photo-editing": {
    "1080p": {
      minimum: "NVIDIA RTX 2000 Ada (16 GB)",
      recommended: "NVIDIA RTX 4000 Ada (20 GB)",
      notes:
        "RTX Pro drivers are ISV-certified for Photoshop and Capture One; useful for multi-display, wide-gamut suites — optional for most photographers.",
    },
    "1440p": {
      minimum: "NVIDIA RTX 4000 Ada (20 GB)",
      recommended: "NVIDIA RTX 4000 Ada (20 GB)",
      notes: "Extra VRAM helps huge panoramas and deep Photoshop stacks without spilling to system RAM.",
    },
    "4K": {
      minimum: "NVIDIA RTX 4000 Ada (20 GB)",
      recommended: "NVIDIA RTX 5000 Ada (32 GB)",
      notes:
        "Studio retouching at 4K delivery with AI tools benefits from RTX Pro stability and VRAM; GeForce RTX 4070+ is the usual creator alternative.",
    },
  },
  "video-editing": {
    "1080p": {
      minimum: "NVIDIA RTX 2000 Ada (16 GB)",
      recommended: "NVIDIA RTX 4000 Ada (20 GB)",
      notes:
        "RTX Pro (formerly Quadro) tiers add certified DaVinci Resolve and Premiere drivers — compare to GeForce RTX 4060 Ti class above.",
    },
    "1440p": {
      minimum: "NVIDIA RTX 4000 Ada (20 GB)",
      recommended: "NVIDIA RTX 5000 Ada (32 GB)",
      notes: "32 GB VRAM holds longer 1440p timelines with Fusion and noise reduction without cache thrash.",
    },
    "4K": {
      minimum: "NVIDIA RTX 5000 Ada (32 GB)",
      recommended: "NVIDIA RTX 6000 Ada (48 GB)",
      notes:
        "Facility 4K grades and long ProRes timelines often standardize on RTX 5000/6000 Ada for VRAM and 10-bit I/O support — not a consumer GeForce replacement for every editor.",
    },
  },
  "3d-rendering": {
    "1080p": {
      minimum: "NVIDIA RTX 4000 Ada (20 GB)",
      recommended: "NVIDIA RTX 5000 Ada (32 GB)",
      notes:
        "Redshift, Octane, and many CUDA plugins require NVIDIA — RTX Pro adds ECC VRAM and certified Maya/Max drivers. Blender Cycles on AMD remains on the GeForce/RX row above.",
    },
    "1440p": {
      minimum: "NVIDIA RTX 5000 Ada (32 GB)",
      recommended: "NVIDIA RTX 6000 Ada (48 GB)",
      notes: "Heavy AOVs and texture-heavy lookdev at 1440p output commonly need 32 GB+ VRAM in production.",
    },
    "4K": {
      minimum: "NVIDIA RTX 6000 Ada (48 GB)",
      recommended: "NVIDIA RTX 6000 Ada (48 GB)",
      notes:
        "4K final-frame GPU renders and large simulations often need 48 GB VRAM; GeForce RTX 4090 (24 GB) is the typical freelancer cap before stepping to RTX Pro.",
    },
  },
};

function getWorkstationGpu(
  slug: WorkloadSlug,
  resolution: WorkloadResolution,
): WorkloadTierConfig["workstationGpu"] {
  const spec = WORKSTATION_GPU[slug][resolution];
  return {
    label: "Workstation GPU (RTX Pro)",
    minimum: spec.minimum,
    recommended: spec.recommended,
    notes: spec.notes,
  };
}

function workloadSettingsLabel(
  slug: WorkloadSlug,
  resolution: WorkloadResolution,
  complexity: WorkloadComplexity,
): string {
  const complexityLabel = COMPLEXITY_LABELS[complexity].toLowerCase();

  if (slug === "photo-editing") {
    const canvas =
      resolution === "1080p"
        ? "24 MP RAW / 1080p display"
        : resolution === "1440p"
          ? "45 MP RAW / 1440p display"
          : "45+ MP RAW / 4K display";
    return `${COMPLEXITY_LABELS[complexity]} photo workflow — ${canvas}, batch export, catalog on SSD`;
  }

  if (slug === "video-editing") {
    const timeline =
      resolution === "1080p"
        ? "1080p timeline, single-camera"
        : resolution === "1440p"
          ? "1440p or scaled 4K timeline"
          : "4K timeline, multicam and heavy effects";
    return `${COMPLEXITY_LABELS[complexity]} video edit — ${timeline}, ${complexityLabel} grade and export`;
  }

  const renderTarget =
    resolution === "1080p"
      ? "1080p final frames / HD viewport"
      : resolution === "1440p"
        ? "1440p final frames / QHD viewport"
        : "4K final frames / 4K viewport";
  return `${COMPLEXITY_LABELS[complexity]} 3D scene — ${renderTarget}, ${complexityLabel} geometry and materials`;
}

function workloadSummaryNote(
  slug: WorkloadSlug,
  resolution: WorkloadResolution,
  complexity: WorkloadComplexity,
): string {
  const focus =
    slug === "photo-editing"
      ? "Balanced CPU and GPU for RAW editing and export"
      : slug === "video-editing"
        ? "CPU, GPU, and RAM for smooth timeline playback and export"
        : "GPU- and RAM-heavy estimates for viewport and final-frame rendering";

  return `${focus} at ${resolution} with a ${COMPLEXITY_LABELS[complexity].toLowerCase()} project profile. Minimum handles typical jobs with patience; recommended adds headroom for tight deadlines.`;
}

function workloadTips(slug: WorkloadSlug, resolution: WorkloadResolution): string[] {
  if (slug === "photo-editing") {
    return [
      "Store the Lightroom catalog on NVMe; keep originals on a fast secondary SSD when possible.",
      "Enable GPU acceleration in Camera Raw / Lightroom preferences if exports feel slow.",
      resolution === "4K"
        ? "For 4K monitors, export at full resolution only when delivering — use 1:2 preview while editing."
        : "Use Smart Previews for large travel catalogs to reduce disk churn.",
    ];
  }

  if (slug === "video-editing") {
    return [
      "Use proxy or optimized media for 4K and heavy codecs — timeline resolution drives RAM more than export size alone.",
      "Match your scratch disk to project codec: ProRes and DNx need sustained NVMe write speed.",
      resolution === "4K"
        ? "Close After Effects and browser tabs during 4K export — RAM contention causes cache drops."
        : "Enable hardware decoding in your NLE when available (NVIDIA/AMD/Intel).",
    ];
  }

  return [
    "Use GPU rendering when your engine supports it; fall back to CPU buckets for very large scenes only when needed.",
    "Keep texture and simulation caches on NVMe — network drives stall viewport updates.",
    resolution === "4K"
      ? "At 4K output, reduce texture resolution in lookdev until final render to save VRAM."
      : "Viewport resolution can stay below final render — do not size GPU only by monitor pixels.",
  ];
}

export function buildWorkloadTierConfig(
  slug: WorkloadSlug,
  resolution: WorkloadResolution,
): WorkloadTierConfig {
  const hw = HARDWARE_BY_WORKLOAD[slug][resolution];
  const complexity: WorkloadComplexity = "standard";

  return {
    settings: workloadSettingsLabel(slug, resolution, complexity),
    gpu: { label: "Graphics card", ...hw.gpu },
    cpu: { label: "Processor", ...hw.cpu },
    ram: { label: "Memory", ...hw.ram },
    storage: { label: "Storage", ...hw.storage },
    summaryNote: workloadSummaryNote(slug, resolution, complexity),
    settingsTips: workloadTips(slug, resolution),
  };
}

export function adjustWorkloadTierConfig(
  base: WorkloadTierConfig,
  slug: WorkloadSlug,
  resolution: WorkloadResolution,
  complexity: WorkloadComplexity,
): WorkloadTierConfig {
  if (complexity === "standard") {
    return {
      ...base,
      settings: workloadSettingsLabel(slug, resolution, complexity),
      summaryNote: workloadSummaryNote(slug, resolution, complexity),
    };
  }

  const gpuSteps = COMPLEXITY_GPU_STEPS[complexity];
  const cpuSteps = COMPLEXITY_CPU_STEPS[complexity];

  const gpuFloor = slug === "photo-editing" ? 0 : 1;

  const steppedGpu = stepGpu(
    {
      minimum: base.gpu.minimum,
      recommended: base.gpu.recommended,
      notes: base.gpu.notes,
    },
    gpuSteps,
    gpuFloor,
  );

  const steppedCpu = stepCpu(
    {
      minimum: base.cpu.minimum,
      recommended: base.cpu.recommended,
      notes: base.cpu.notes,
    },
    cpuSteps,
  );

  let ram = base.ram;
  if (
    (slug === "video-editing" || slug === "3d-rendering") &&
    complexity === "professional" &&
    !base.ram.recommended.includes("64 GB")
  ) {
    ram = {
      ...base.ram,
      recommended: "64 GB (dual-channel)",
      notes: "Professional timelines and scenes benefit from 64 GB for fewer cache purges.",
    };
  }

  if (slug === "photo-editing" && complexity === "basic") {
    ram = {
      ...base.ram,
      minimum: "16 GB (dual-channel)",
      recommended: "16 GB (dual-channel)",
      notes: "Basic JPEG and light RAW workflows rarely need more than 16 GB.",
    };
  }

  const workstationGpu =
    complexity === "professional" ? getWorkstationGpu(slug, resolution) : undefined;

  let summaryNote = `${workloadSummaryNote(slug, resolution, complexity)} Adjusted for ${COMPLEXITY_LABELS[complexity].toLowerCase()} workload intensity.`;
  if (workstationGpu) {
    summaryNote +=
      " GeForce/RX rows target creators; expand the RTX Pro section below for certified studio GPUs.";
  }

  let settingsTips = base.settingsTips;
  if (complexity === "professional" && slug === "3d-rendering") {
    settingsTips = [
      ...(base.settingsTips ?? []),
      "CUDA-only renderers (Redshift, Octane) do not run on AMD — use the RTX Pro row or GeForce RTX, not Radeon, for those engines.",
    ];
  }

  return {
    ...base,
    settings: workloadSettingsLabel(slug, resolution, complexity),
    gpu: { ...base.gpu, ...steppedGpu },
    workstationGpu,
    cpu: { ...base.cpu, ...steppedCpu },
    ram,
    summaryNote,
    settingsTips,
  };
}
