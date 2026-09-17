import type { NextConfig } from "next";

const repoName = process.env.GITHUB_PAGES_REPO ?? "pc-parts-guide";
const useGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = useGithubPages ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: useGithubPages,
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
