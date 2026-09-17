import type { WorkloadPageContent, WorkloadSlug } from "./types";
import { buildWorkloadTierConfig } from "./hardware-templates";

type WorkloadMeta = {
  title: string;
  summary: string;
  coverImageAlt: string;
  exampleApps: string[];
  primaryFocus: string;
  performanceNotes: string[];
  bottlenecks: { title: string; description: string }[];
};

const WORKLOAD_META: Record<WorkloadSlug, WorkloadMeta> = {
  "photo-editing": {
    title: "Photo Editing",
    coverImageAlt: "Photographer editing images at a desk with camera nearby",
    summary:
      "Photo workflows mix single-threaded RAW development with occasional batch exports and AI tools. CPU clock and RAM matter for responsiveness; a mid-range GPU covers GPU-accelerated develop, denoise, and export in Lightroom Classic, Photoshop, and Capture One. Resolution here means monitor workspace and typical export size — from 24 MP at 1080p-class displays to 45+ MP and 4K delivery.",
    exampleApps: ["Adobe Lightroom Classic", "Adobe Photoshop", "Capture One", "Affinity Photo"],
    primaryFocus: "CPU + RAM (GPU for AI & export)",
    performanceNotes: [
      "Lightroom Classic is mostly CPU-bound in Develop until you enable AI Denoise or export large batches — then the GPU spikes.",
      "A fast NVMe drive for the catalog and cache beats a faster GPU for library scrolling and auto-import.",
      "32 GB RAM is the practical ceiling for most photographers; more helps huge panoramas and Photoshop stacks, not casual RAW edits.",
      "Integrated graphics work for basic edits; discrete GPUs pay off for 4K displays, AI features, and frequent bulk export.",
      "Professional tier adds optional NVIDIA RTX Pro (formerly Quadro) picks for certified, multi-display studio setups — most photographers stay on GeForce or RX.",
    ],
    bottlenecks: [
      {
        title: "CPU",
        description:
          "Develop sliders, masking, and export queues scale with single-thread performance and sustained all-core load during batch jobs.",
      },
      {
        title: "RAM",
        description:
          "Large RAW files, many images open, and Photoshop layers consume memory — insufficient RAM forces disk cache and stutter.",
      },
      {
        title: "Storage",
        description:
          "Catalog, previews, and cache on SSD keep scrolling smooth; HDD archives are fine for cold storage only.",
      },
    ],
  },
  "video-editing": {
    title: "Video Editing",
    coverImageAlt: "Video production control room with multiview monitor and live switching desk",
    summary:
      "Video editing is timeline-bound: decode, effects, color, and encode all compete for CPU, GPU, and RAM. 1080p is forgiving on modern hardware; 1440p and especially 4K multicam with Fusion, After Effects, or heavy LUTs need strong GPUs, 32–64 GB RAM, and fast NVMe scratch disks. Pick a timeline resolution below — specs assume common NLE workflows, not gaming.",
    exampleApps: ["DaVinci Resolve", "Adobe Premiere Pro", "Final Cut Pro", "Avid Media Composer"],
    primaryFocus: "CPU + GPU + RAM",
    performanceNotes: [
      "DaVinci Resolve leans heavily on GPU for color and many effects; Premiere Pro often balances CPU decode with GPU acceleration depending on codec.",
      "H.264 and H.265 from consumer cameras are CPU-heavy to decode unless hardware decode is enabled and supported.",
      "Proxy workflows let minimum specs handle 4K timelines — recommended tiers assume native or lightly proxied 4K.",
      "Dual monitors and 32 GB+ RAM are standard for color grading; 64 GB helps long 4K timelines with nested comps.",
      "Studios often deploy NVIDIA RTX Pro (formerly Quadro) for extra VRAM, stable Resolve/Premiere drivers, and 4K+ grading — see Professional tier for RTX Ada workstation alternatives to GeForce.",
    ],
    bottlenecks: [
      {
        title: "GPU",
        description:
          "Color, noise reduction, transitions, and GPU-enabled codecs use VRAM and compute — 4K timelines exhaust 8 GB cards quickly.",
      },
      {
        title: "CPU",
        description:
          "Multicam sync, ProRes, and software encodes scale with cores; weak CPUs lag even with a strong GPU.",
      },
      {
        title: "Storage I/O",
        description:
          "High-bitrate footage and cache files need sustained NVMe throughput — a full scratch disk causes dropped frames and export failures.",
      },
    ],
  },
  "3d-rendering": {
    title: "3D Rendering",
    coverImageAlt: "Blender 3.3 interface on a desktop monitor — 3D viewport and UI",
    summary:
      "3D and VFX workloads are scene-complexity driven: polygon count, textures, simulations, and render engine choice matter more than monitor size alone. GPU renderers (Cycles GPU, Redshift, Octane, V-Ray GPU) need VRAM and CUDA/OptiX or HIP support; CPU fallbacks and physics still want cores. Resolution tabs reflect typical final output / viewport target — 4K frames and heavy AOVs need high-end GPUs and 64 GB RAM.",
    exampleApps: ["Blender", "Cinema 4D", "Autodesk Maya", "Unreal Engine (real-time)"],
    primaryFocus: "GPU VRAM + RAM",
    performanceNotes: [
      "Viewport smoothness depends on GPU and driver — final-frame GPU rendering depends on VRAM and shader complexity.",
      "64 GB system RAM is common for animation, fluid sims, and large environments; 32 GB is a realistic minimum for solo artists at 1080p output.",
      "NVIDIA cards dominate GPU render plugin support; Redshift and Octane are CUDA-only — AMD RX is for Blender HIP, not those engines.",
      "Unreal and real-time archviz prioritize GPU and fast storage over CPU core count compared to offline path tracing.",
      "Professional tier lists NVIDIA RTX Pro (RTX 4000–6000 Ada, formerly Quadro) where 32–48 GB VRAM and ISV drivers matter more than GeForce gaming value.",
    ],
    bottlenecks: [
      {
        title: "GPU / VRAM",
        description:
          "Textures, geometry, and render tiles live in VRAM — out-of-memory errors force CPU fallback or failed frames.",
      },
      {
        title: "RAM",
        description:
          "Simulations, caches, and high-poly scenes use system memory independent of GPU VRAM.",
      },
      {
        title: "CPU",
        description:
          "Physics, baking, and CPU render buckets still scale with cores when GPU paths are unavailable or hybrid rendering is used.",
      },
    ],
  },
};

export function buildWorkloadPageContent(slug: WorkloadSlug): WorkloadPageContent {
  const meta = WORKLOAD_META[slug];
  const resolutions = ["1080p", "1440p", "4K"] as const;

  return {
    slug,
    title: meta.title,
    summary: meta.summary,
    coverImageAlt: meta.coverImageAlt,
    exampleApps: meta.exampleApps,
    primaryFocus: meta.primaryFocus,
    performanceNotes: meta.performanceNotes,
    bottlenecks: meta.bottlenecks,
    tiers: resolutions.map((resolution) => ({
      id: `${slug}-${resolution}`,
      resolution,
      config: buildWorkloadTierConfig(slug, resolution),
    })),
  };
}
