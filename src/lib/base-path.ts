/** Set at build time for GitHub Pages (e.g. `/pc-parts-guide`). Empty for local dev. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix public folder paths (`/games/...`, `/workloads/...`) for subpath hosting. */
export function withBasePath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!basePath) return normalized;
  return `${basePath}${normalized}`;
}
