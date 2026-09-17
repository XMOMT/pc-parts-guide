import type { GameGenre } from "@/lib/game-genres";
import type { Game } from "@/lib/games";
import type { DemandTier } from "./classify";

type ContentMeta = {
  demandTier: DemandTier;
  supportsRayTracing: boolean;
};

export function getSettingsPreset(
  genre: GameGenre,
  demand: DemandTier,
  supportsRayTracing: boolean,
): string {
  const quality = "Ultra baseline — use Low–Ultra toggles below";

  const presets: Record<GameGenre, string> = {
    FPS: `${quality}, competitive settings optional (shadows Medium–High)`,
    Shooter: `${quality}, balanced for 60 FPS in co-op and multiplayer`,
    "Battle Royale": "Competitive mix — High textures, Medium shadows, effects tuned for visibility",
    Fighting: `${quality}, 60 FPS target or uncapped for low input lag`,
    Racing: `${quality}, motion blur off, anti-aliasing TAA or DLSS`,
    Sports: `${quality}, stadium crowds and cloth simulation on`,
    Strategy: `${quality}, unit density scales with CPU — lower in huge late-game battles if needed`,
    Simulation: `${quality}, traffic and terrain density medium–high`,
    "Open World": `${quality}, draw distance High+, volumetric effects Medium–High`,
    "Action RPG": `${quality}, dense combat areas may need shadow or crowd tweaks`,
    RPG: `${quality}, turn-based scenes are lighter; real-time battles use Ultra where available`,
    "Action-Adventure": `${quality}, cinematic sections are GPU-heavy — cap frame rate if thermals spike`,
    Horror: `${quality}, film grain and chromatic aberration optional`,
    Survival: `${quality}, view distance High, foliage Medium–High in open zones`,
    Platformer: `${quality}, prioritize stable frame pacing over max eye candy`,
    Adventure: `${quality}, narrative hubs favor consistent 60 FPS over max settings`,
  };

  const preset = presets[genre];
  if (supportsRayTracing) {
    return `${preset}; ray tracing off unless noted in the RT tab`;
  }
  return preset;
}

export function getPageSummary(game: Game, meta: ContentMeta): string {
  const intro = game.description.trim().replace(/\.$/, "");
  const rtNote = meta.supportsRayTracing
    ? " Ray tracing is supported — use the toggles below to compare specs with RT on or off."
    : " This title does not support ray tracing — use the RT off tab for accurate recommendations.";

  const bottleneck = getPrimaryBottleneckSentence(game.genre, meta.demandTier);

  return `${intro}. Use the resolution tabs below to see estimated hardware for a steady 60 FPS.${rtNote} ${bottleneck}`;
}

function getPrimaryBottleneckSentence(genre: GameGenre, demand: DemandTier): string {
  if (genre === "Strategy" || genre === "Simulation") {
    return "CPU and RAM matter more here than in most action titles, especially in large scenes.";
  }
  if (genre === "FPS" || genre === "Battle Royale" || genre === "Fighting") {
    return "GPU drives eye candy, but a strong CPU helps hold high frame rates in busy multiplayer.";
  }
  if (genre === "Open World" || genre === "Survival" || genre === "Action RPG") {
    return "GPU and VRAM are the main limits; install on an SSD to cut down open-world load stutter.";
  }
  if (genre === "Racing" || genre === "Sports") {
    return "GPU is the primary bottleneck; stable frame times matter more than peak FPS.";
  }
  if (demand === "extreme") {
    return "This is a very demanding title — expect GPU and VRAM to be the first limits at high settings.";
  }
  return "GPU is usually the first component to upgrade for higher resolutions.";
}

export function getPerformanceNotes(
  game: Game,
  meta: ContentMeta,
): string[] {
  const notes: string[] = [];

  if (meta.supportsRayTracing) {
    notes.push(
      "Ray tracing needs an RTX 20-series or newer (NVIDIA) or RX 6000-series or newer (AMD) GPU and DirectX 12 on most titles.",
    );
  } else {
    notes.push(
      "This game does not support ray tracing — specs below reflect the RT off configuration.",
    );
  }

  notes.push(...getGenrePerformanceNotes(game.genre, meta.demandTier));
  notes.push(getRamNote(meta.demandTier));
  notes.push(getStorageNote(game.genre));

  return notes;
}

function getGenrePerformanceNotes(genre: GameGenre, demand: DemandTier): string[] {
  switch (genre) {
    case "FPS":
    case "Shooter":
    case "Battle Royale":
      return [
        "Lower shadow and post-processing settings recover FPS quickly in multiplayer without hurting visibility.",
        demand === "light"
          ? "Competitive players often cap settings to hit 144+ FPS on mid-range hardware."
          : "DLSS or FSR Quality helps at 1440p and 4K even when ray tracing is off.",
      ];
    case "Fighting":
      return [
        "Input lag matters more than visual fidelity — keep frame pacing stable over maxed textures.",
        "Background apps and overlays can cause micro-stutter during online matches.",
      ];
    case "Racing":
    case "Sports":
      return [
        "Turn off motion blur and limit crowd or cloth detail if frame times become uneven.",
        "VRAM fills quickly with high-resolution texture packs and replays enabled.",
      ];
    case "Strategy":
    case "Simulation":
      return [
        "Late-game scenes with many units or vehicles stress CPU cores — a 6-core/12-thread CPU is a practical floor.",
        "RAM speed and capacity help more here than in pure GPU-bound shooters.",
      ];
    case "Open World":
    case "Survival":
    case "Action RPG":
      return [
        "Dense cities, foliage, and weather effects spike both GPU and CPU usage.",
        "Mod support or texture overhauls can push VRAM past 8 GB even at 1080p.",
      ];
    case "RPG":
      return [
        "Turn-based combat is lighter than real-time action, but large hubs still benefit from a mid-range GPU.",
        "Save frequently on HDD installs — long load screens are common without an SSD.",
      ];
    case "Horror":
      return [
        "Dark indoor scenes hide frame drops — cap FPS or use a frame limiter if audio desync appears.",
        "Ray-traced reflections and shadows are among the most expensive RT features in corridor-heavy games.",
      ];
    case "Platformer":
    case "Adventure":
      return [
        "Stable 60 FPS keeps platforming and QTE sequences responsive.",
        "Art-heavy titles may look great on modest GPUs when shadows and anti-aliasing are tuned down one step.",
      ];
    default:
      return [
        "Start at the recommended preset and lower shadows or volumetrics first if FPS dips below 60.",
        "DLSS or FSR Quality is worth enabling at 1440p and 4K on supported hardware.",
      ];
  }
}

function getRamNote(demand: DemandTier): string {
  if (demand === "extreme" || demand === "demanding") {
    return "16 GB RAM is the minimum for modern AAA titles; 32 GB helps at 4K, with mods, or while streaming.";
  }
  return "16 GB dual-channel RAM is recommended for all modern PC games; 8 GB is only viable on lighter titles.";
}

function getStorageNote(genre: GameGenre): string {
  if (genre === "Open World" || genre === "Survival" || genre === "RPG") {
    return "Install on an SSD — open-world streaming and large saves stutter badly on hard drives.";
  }
  if (genre === "Simulation") {
    return "Simulation titles benefit from fast storage for cache files and large asset packs.";
  }
  return "An SSD reduces load times; NVMe is helpful but not required for most single-player games.";
}

export function getBottlenecks(genre: GameGenre) {
  const gpuDescription =
    genre === "Strategy" || genre === "Simulation"
      ? "Still important for high resolutions, but not always the first limit in huge CPU-heavy scenes."
      : "Resolution, texture quality, shadows, and ray tracing scale directly with GPU power. Upgrade here first for higher resolutions.";

  const cpuDescription =
    genre === "Strategy" || genre === "Simulation"
      ? "Large battles, traffic sims, and simulation ticks scale with CPU core count and single-thread speed."
      : genre === "FPS" || genre === "Battle Royale"
        ? "Multiplayer and draw-call-heavy scenes can bottleneck older 4-core CPUs before the GPU is maxed."
        : "Most titles are GPU-bound, but dense cities and simulation workloads can stress older CPUs.";

  const vramDescription =
    genre === "Open World" || genre === "Action RPG"
      ? "High-resolution texture packs and long view distances need 8 GB minimum, 10–12 GB for 1440p/4K Ultra."
      : "Higher resolutions and texture packs need 8 GB minimum, 10–12 GB for 1440p/4K Ultra. Ray tracing adds VRAM pressure.";

  return [
    { title: "GPU (primary)", description: gpuDescription },
    { title: "VRAM", description: vramDescription },
    { title: "CPU (secondary)", description: cpuDescription },
  ];
}

export function getTierSettingsLabel(
  genre: GameGenre,
  demand: DemandTier,
  resolution: "1080p" | "1440p" | "4K",
  rayTracing: boolean,
): string {
  const rtLabel = rayTracing ? "ray tracing on" : "ray tracing off";
  const upscaling =
    resolution === "1080p" && !rayTracing
      ? "native resolution"
      : "DLSS Quality or FSR Quality";

  const quality = "Ultra preset";

  const genreHints: Partial<Record<GameGenre, string>> = {
    FPS: "shadows Medium–High",
    "Battle Royale": "competitive visibility settings",
    Fighting: "low-latency preset",
    Racing: "motion blur off",
    Sports: "crowd detail High",
    Strategy: "unit count friendly settings",
    Simulation: "simulation density medium–high",
    "Open World": "draw distance High+",
    Horror: "ambient effects High",
    Platformer: "stable frame pacing preset",
  };

  const hint = genreHints[genre];
  const base = hint ? `${quality}, ${hint}` : quality;

  return `${base}, ${rtLabel}, ${upscaling}`;
}

export function getSettingsTips(
  genre: GameGenre,
  resolution: "1080p" | "1440p" | "4K",
  rayTracing: boolean,
): string[] {
  if (rayTracing) {
    return [
      "Use DLSS Quality or FSR Quality — native resolution with ray tracing rarely holds 60 FPS.",
      "Disable RT shadows or reflections first if FPS drops below 60.",
      genre === "Horror" || genre === "Action-Adventure"
        ? "Indoor RT reflections are expensive — try RT global illumination only."
        : "DirectX 12 mode is required for ray tracing on most supported titles.",
    ];
  }

  const tips = [
    "Drop shadow quality or volumetric effects first if FPS dips below 60.",
    resolution !== "1080p"
      ? "DLSS or FSR Quality adds headroom at 1440p and 4K even without ray tracing."
      : "At 1080p, lower post-processing before touching texture quality.",
  ];

  if (genre === "Strategy" || genre === "Simulation") {
    tips.push("Lower unit density or simulation rate if CPU usage stays at 100% in large scenes.");
  } else if (genre === "Open World" || genre === "Survival") {
    tips.push("Reduce crowd density or foliage in dense cities if frame times spike.");
  } else if (genre === "Fighting" || genre === "FPS") {
    tips.push("Cap background apps — inconsistent frame times feel worse than slightly lower settings.");
  } else {
    tips.push("Close browser tabs and overlays — 16 GB RAM fills quickly in modern AAA games.");
  }

  return tips;
}

export function getFpsNote(
  gameTitle: string,
  resolution: "1080p" | "1440p" | "4K",
  demand: DemandTier,
  rayTracing: boolean,
  genre: GameGenre,
): string {
  const rtLabel = rayTracing ? "ray tracing on" : "ray tracing off";
  const focus =
    genre === "Strategy" || genre === "Simulation"
      ? "CPU and GPU estimates"
      : "GPU-focused estimates";

  return `${focus} for ${gameTitle} at ${resolution}, 60 FPS, ${rtLabel}. Based on ${demand} demand tier and typical ${genre.toLowerCase()} workloads — verify against your in-game settings.`;
}
