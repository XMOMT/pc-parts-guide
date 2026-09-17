import type { UpscalingQualityMode, UpscalingTech } from "./types";

export type UpscaleTech = "DLSS" | "DLSS 3" | "FSR" | "FSR 2" | "FSR 3" | "XeSS";

/** Per-game upscaling support — overrides heuristics when set. */
const UPSCALING_OVERRIDES: Record<string, UpscaleTech[]> = {
  "the-witcher-3": ["DLSS", "FSR 2"],
  "cyberpunk-2077": ["DLSS", "FSR 2", "XeSS"],
  "battlefield-v": ["DLSS"],
  "metro-exodus": ["DLSS"],
  "control": ["DLSS"],
  "death-stranding": ["DLSS"],
  "fortnite": ["DLSS", "FSR", "XeSS"],
  "call-of-duty-modern-warfare-2019": ["DLSS", "FSR 2"],
  "call-of-duty-black-ops-cold-war": ["DLSS", "FSR 2"],
  "call-of-duty-vanguard": ["DLSS", "FSR 2"],
  "call-of-duty-modern-warfare-2-2022": ["DLSS", "FSR 2", "XeSS"],
  "call-of-duty-modern-warfare-3-2023": ["DLSS", "FSR 2", "XeSS"],
  "call-of-duty-black-ops-6": ["DLSS", "FSR 3", "XeSS"],
  "god-of-war": ["DLSS", "FSR 2"],
  "spider-man-remastered": ["DLSS", "FSR 2"],
  "uncharted-legacy-of-thieves": ["DLSS", "FSR 2"],
  "the-last-of-us-part-1": ["DLSS", "FSR 2"],
  "ratchet-clank-rift-apart": ["DLSS 3", "FSR 2"],
  "ghost-of-tsushima": ["DLSS 3", "FSR 3", "XeSS"],
  "horizon-zero-dawn": ["DLSS", "FSR 2"],
  "baldurs-gate-3": ["DLSS", "FSR 2", "XeSS"],
  "hogwarts-legacy": ["DLSS", "FSR 2", "XeSS"],
  "starfield": ["DLSS", "FSR 2"],
  "alan-wake-2": ["DLSS", "FSR 2", "XeSS"],
  "helldivers-2": ["FSR 2"],
  "elden-ring": [],
  "dark-souls-3": [],
  "sekiro": [],
  "overwatch": [],
  "rainbow-six-siege": [],
  "mortal-kombat-x": [],
  "street-fighter-6": [],
  "tekken-7": [],
  "tekken-8": [],
  "soulcalibur-vi": [],
  "sonic-forces": [],
  "lego-star-wars-skywalker-saga": [],
  "project-cars": [],
  "f1-22": [],
  "ea-sports-fc-23": [],
  "payday-3": [],
  "back-4-blood": [],
  "a-way-out": [],
};

const NO_UPSCALING = new Set([
  "elden-ring",
  "dark-souls-3",
  "sekiro",
  "cuphead",
  "life-is-strange",
  "overwatch",
  "rainbow-six-siege",
  "mortal-kombat-x",
  "street-fighter-6",
  "tekken-7",
  "tekken-8",
  "soulcalibur-vi",
  "sonic-forces",
  "lego-star-wars-skywalker-saga",
  "project-cars",
  "f1-22",
  "ea-sports-fc-23",
  "payday-3",
  "back-4-blood",
  "a-way-out",
]);

export function getUpscalingSupport(slug: string, year: number): UpscaleTech[] {
  if (slug in UPSCALING_OVERRIDES) {
    return UPSCALING_OVERRIDES[slug];
  }

  if (NO_UPSCALING.has(slug)) {
    return [];
  }

  if (year <= 2017) {
    return [];
  }

  if (year >= 2024) {
    return ["DLSS", "FSR 3", "XeSS"];
  }

  if (year >= 2022) {
    return ["DLSS", "FSR 2", "XeSS"];
  }

  if (year >= 2020) {
    return ["DLSS", "FSR 2"];
  }

  if (year >= 2019) {
    return ["DLSS", "FSR 2"];
  }

  if (year === 2018) {
    return ["DLSS"];
  }

  return [];
}

export function formatUpscalingSupport(support: readonly string[]): string {
  if (support.length === 0) {
    return "Not supported";
  }
  return support.join(", ");
}

export type UpscalingTechOption = {
  id: UpscalingTech;
  label: string;
};

export type UpscalingQualityOption = {
  id: UpscalingQualityMode;
  label: string;
};

function pickTechVersion(support: readonly string[], prefix: string): string {
  const matches = support.filter((t) => t.startsWith(prefix));
  if (matches.length === 0) return prefix;
  return matches.sort().at(-1) ?? prefix;
}

/** Row 1: Native + each supported upscaler (DLSS, FSR, XeSS). */
export function getUpscalingTechOptions(
  support: readonly string[],
): UpscalingTechOption[] {
  const options: UpscalingTechOption[] = [{ id: "native", label: "Native" }];

  if (support.some((t) => t.startsWith("DLSS"))) {
    options.push({ id: "dlss", label: pickTechVersion(support, "DLSS") });
  }
  if (support.some((t) => t.startsWith("FSR"))) {
    options.push({ id: "fsr", label: pickTechVersion(support, "FSR") });
  }
  if (support.includes("XeSS")) {
    options.push({ id: "xess", label: "XeSS" });
  }

  return options;
}

/** Row 2: quality modes for the selected upscaler (hidden for Native). */
export function getUpscalingQualityOptions(
  tech: UpscalingTech,
  support: readonly string[],
): UpscalingQualityOption[] {
  if (tech === "native") {
    return [];
  }

  if (tech === "dlss") {
    const version = pickTechVersion(support, "DLSS");
    const options: UpscalingQualityOption[] = [
      { id: "quality", label: `${version} Quality` },
      { id: "balanced", label: `${version} Balanced` },
      { id: "performance", label: `${version} Performance` },
    ];
    if (version === "DLSS 3") {
      options.push({ id: "ultra-performance", label: "DLSS 3 Ultra Performance" });
    }
    return options;
  }

  if (tech === "fsr") {
    const version = pickTechVersion(support, "FSR");
    const options: UpscalingQualityOption[] = [
      { id: "quality", label: `${version} Quality` },
    ];
    if (version !== "FSR") {
      options.push({ id: "balanced", label: `${version} Balanced` });
    }
    options.push({ id: "performance", label: `${version} Performance` });
    if (version === "FSR 3") {
      options.push({ id: "ultra-performance", label: "FSR 3 Ultra Performance" });
    }
    return options;
  }

  return [
    { id: "quality", label: "XeSS Quality" },
    { id: "balanced", label: "XeSS Balanced" },
    { id: "performance", label: "XeSS Performance" },
    { id: "ultra-performance", label: "XeSS Ultra Performance" },
  ];
}

export function getUpscalingSelectionLabel(
  tech: UpscalingTech,
  quality: UpscalingQualityMode,
  support: readonly string[],
): string {
  if (tech === "native") {
    return "Native";
  }
  return (
    getUpscalingQualityOptions(tech, support).find((o) => o.id === quality)?.label ??
    "Native"
  );
}

export function defaultUpscalingQuality(tech: UpscalingTech): UpscalingQualityMode {
  return tech === "native" ? "quality" : "quality";
}
