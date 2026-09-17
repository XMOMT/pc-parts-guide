import { games } from "@/lib/games";

export type SearchSuggestion = {
  label: string;
  href: string;
  type: "game" | "workload";
};

export type BuildCard = {
  label: string;
  description: string;
  href: string;
  icon: "gpu" | "cpu";
};

export type WorkloadCard = {
  label: string;
  description: string;
  href: string;
  icon: "video-editing" | "photo-editing" | "3d-rendering";
};

export const siteConfig = {
  name: "PC Parts Guide",
  description:
    "Find the right PC hardware for your games and workloads. Get budget-tiered build recommendations based on what you actually play and run.",
  /** Set NEXT_PUBLIC_SITE_URL when deploying (e.g. GitHub Pages). */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://pcpartsguide.com").replace(
    /\/$/,
    "",
  ),
  contactEmail: "xmomt.lt@gmail.com",
  /** Data controller / operator name shown in legal pages. */
  legalOperator: "PC Parts Guide",
};

export const navLinks = [
  { label: "Games", href: "/games" },
  { label: "Workloads", href: "/workloads" },
];

const workloadSuggestions: SearchSuggestion[] = [
  { label: "Photo Editing", href: "/workloads/photo-editing", type: "workload" },
  { label: "Video Editing", href: "/workloads/video-editing", type: "workload" },
  { label: "3D Rendering", href: "/workloads/3d-rendering", type: "workload" },
];

const gameSuggestions: SearchSuggestion[] = games.map((game) => ({
  label: game.title,
  href: `/games/${game.slug}`,
  type: "game" as const,
}));

export const searchSuggestions: SearchSuggestion[] = [
  ...gameSuggestions,
  ...workloadSuggestions,
];

export const quickLinks = [
  { label: "Cyberpunk 2077", href: "/games/cyberpunk-2077" },
  { label: "Video Editing", href: "/workloads/video-editing" },
  { label: "3D Rendering", href: "/workloads/3d-rendering" },
];

export const gpuBuildCards: BuildCard[] = [
  {
    label: "Best 1080p GPUs",
    description: "Top graphics cards for smooth 1080p gaming",
    href: "/builds/best-1080p-gpus",
    icon: "gpu",
  },
  {
    label: "Best 1440p GPUs",
    description: "Top graphics cards for high-refresh 1440p",
    href: "/builds/best-1440p-gpus",
    icon: "gpu",
  },
  {
    label: "Best 4K GPUs",
    description: "Top graphics cards for 4K and max settings",
    href: "/builds/best-4k-gpus",
    icon: "gpu",
  },
];

export const cpuBuildCards: BuildCard[] = [
  {
    label: "Best 1080p CPUs",
    description: "Top processors for 1080p gaming builds",
    href: "/builds/best-1080p-cpus",
    icon: "cpu",
  },
  {
    label: "Best 1440p CPUs",
    description: "Top processors for balanced 1440p systems",
    href: "/builds/best-1440p-cpus",
    icon: "cpu",
  },
  {
    label: "Best 4K CPUs",
    description: "Top processors for high-end 4K builds",
    href: "/builds/best-4k-cpus",
    icon: "cpu",
  },
];

export const workloadBrowseCards: WorkloadCard[] = [
  {
    label: "Photo Editing",
    description: "Hardware for Lightroom, Photoshop, and RAW workflows",
    href: "/workloads/photo-editing",
    icon: "photo-editing",
  },
  {
    label: "Video Editing",
    description: "Hardware for Premiere Pro, DaVinci Resolve, and more",
    href: "/workloads/video-editing",
    icon: "video-editing",
  },
  {
    label: "3D Rendering",
    description: "Hardware for Blender, Maya, and GPU rendering",
    href: "/workloads/3d-rendering",
    icon: "3d-rendering",
  },
];

export const howItWorksSteps = [
  {
    step: 1,
    title: "Search your game or workload",
    description: "Type any game title or use case — streaming, editing, rendering, and more.",
  },
  {
    step: 2,
    title: "See what affects performance",
    description: "We break down CPU, GPU, RAM, and storage bottlenecks for your specific scenario.",
  },
  {
    step: 3,
    title: "Get tiered build recommendations",
    description: "Compare budget, mid-range, and high-end builds matched to your target settings.",
  },
];

/** Main site pages shown in the footer (matches header nav + contact). */
export const footerExploreLinks = [
  ...navLinks,
  { label: "Contact", href: "/contact" },
];

/** Privacy & terms — keep linked when you collect user data (e.g. contact form). */
export const footerLegal = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Image Credits", href: "/credits" },
  { label: "Ad Choices", href: "/ad-choices" },
];
