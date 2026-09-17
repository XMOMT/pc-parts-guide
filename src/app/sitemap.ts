import type { MetadataRoute } from "next";
import { games } from "@/lib/games";
import { siteConfig } from "@/lib/data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/games",
    "/workloads",
    "/workloads/photo-editing",
    "/workloads/video-editing",
    "/workloads/3d-rendering",
    "/about",
    "/contact",
    "/builds/best-1080p-gpus",
    "/builds/best-1440p-gpus",
    "/builds/best-4k-gpus",
    "/builds/best-1080p-cpus",
    "/builds/best-1440p-cpus",
    "/builds/best-4k-cpus",
    "/budget",
    "/budget/mid-range",
    "/budget/high-end",
    "/privacy",
    "/terms",
    "/credits",
    "/ad-choices",
  ];

  const gameRoutes = games.map((g) => `/games/${g.slug}`);
  const allRoutes = [...new Set([...staticRoutes, ...gameRoutes])];

  return allRoutes.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/games") || path.startsWith("/workloads") ? 0.8 : 0.6,
  }));
}
