import type { BuildPageContent, BuildSlug } from "./types";

const BUILD_PAGES: Record<BuildSlug, BuildPageContent> = {
  "best-1080p-gpus": {
    slug: "best-1080p-gpus",
    title: "Best 1080p GPUs",
    summary:
      "At 1920×1080 the GPU is rarely fully stressed in AAA games — the goal is high frame rates, stable frametimes, and enough VRAM for modern textures. These picks target 1080p Ultra and competitive high-refresh (144–240 Hz) as of 2026, with RTX 50 and RX 9000 series cards plus proven last-gen value options.",
    picks: [
      {
        tier: "budget",
        name: "GeForce RTX 5050 / Radeon RX 7600",
        summary: "Entry 1080p for esports and medium settings in newer titles.",
        details: [
          "RTX 5050 fits tight budgets and still gets DLSS 4 in supported games.",
          "RX 7600 remains a strong buy on sale for pure 1080p raster performance.",
          "Pair with a 6-core CPU; avoid expecting max settings in heavy 2024+ AAA games.",
        ],
      },
      {
        tier: "sweet-spot",
        name: "Radeon RX 9060 XT 16 GB / GeForce RTX 5060 Ti 16 GB",
        summary: "The 2026 default for 1080p high refresh — prioritize 16 GB models.",
        details: [
          "16 GB VRAM avoids the 8 GB trap as texture budgets grow; skip 8 GB variants unless you only play lightweight esports.",
          "RX 9060 XT 16 GB leads raster value; RTX 5060 Ti 16 GB wins ray tracing and DLSS-heavy titles.",
          "Expect well over 144 FPS in many titles at High/Ultra 1080p with headroom for streaming overlays.",
        ],
      },
      {
        tier: "high-end",
        name: "GeForce RTX 5060 / RTX 5070 (1080p high-refresh)",
        summary: "If you want 240 Hz+ in AAA games or max RT at 1080p without upgrading soon.",
        details: [
          "RTX 5060 is the straightforward mainstream NVIDIA 1080p card with full feature support.",
          "RTX 5070 is overkill for 1080p alone but makes sense for 1080p 360 Hz, stream encoding, or a future 1440p monitor.",
          "Only step up if your monitor’s refresh rate can use the extra frames.",
        ],
      },
    ],
    buyingTips: [
      "1080p is the most CPU-sensitive tier — balance spend with your processor, especially for sim and strategy games.",
      "Buy 16 GB VRAM when possible; 8 GB cards stutter in open-world games even at 1080p.",
      "Check case clearance and PSU: most picks here are dual-slot and need a quality 550–650 W unit.",
    ],
    supportsRayTracing: true,
    summaryRtOn:
      "Ray tracing at 1080p is lighter than at 1440p/4K. Modern GeForce RTX and Radeon RX (RDNA 2 and newer) both support in-game RT — pair with DLSS or FSR when enabling it. These picks assume RT Medium–High, not path tracing maxed.",
    picksRtOn: [
      {
        tier: "budget",
        name: "GeForce RTX 5060 8 GB / Radeon RX 9060 XT 16 GB",
        summary: "Entry ray tracing at 1080p from either vendor.",
        details: [
          "RTX 5060: DLSS 4 and solid RT in story-driven AAA at 1080p with Quality upscaling.",
          "RX 9060 XT 16 GB: RDNA 4 RT + FSR 4; 16 GB helps RT texture load vs 8 GB cards.",
          "Use RT Medium first — full RT Ultra still costs ~30–40% FPS at 1080p on both brands.",
        ],
      },
      {
        tier: "sweet-spot",
        name: "GeForce RTX 5060 Ti 16 GB / Radeon RX 9060 XT 16 GB",
        summary: "Best 1080p RT value — prioritize 16 GB on either side.",
        details: [
          "5060 Ti leads heavy RT and path-traced modes; 9060 XT is competitive at RT High with FSR Quality.",
          "16 GB avoids VRAM spikes when RT and high texture packs are enabled together.",
          "Strong for 1080p 144 Hz with RT in most current releases; compare prices between vendors.",
        ],
      },
      {
        tier: "high-end",
        name: "GeForce RTX 5070 12 GB / Radeon RX 9070 16 GB",
        summary: "Max RT headroom at 1080p or a GPU you can keep for 1440p RT later.",
        details: [
          "5070: comfortable RT Ultra at 1080p with DLSS; best for path tracing in select titles.",
          "9070: extra VRAM and strong RDNA 4 RT for 1080p max settings with FSR.",
          "Pair with 7800X3D / 9800X3D in CPU-heavy open worlds with RT enabled.",
        ],
      },
    ],
    buyingTipsRtOn: [
      "AMD and NVIDIA both ray trace at 1080p — pick by price, DLSS vs FSR in your games, and VRAM (16 GB preferred).",
      "Enable DLSS or FSR when using RT; native RT at high refresh often needs a tier above raster-only guides.",
      "Update Adrenalin or GeForce drivers — RT per-game performance shifts with major releases.",
    ],
  },
  "best-1440p-gpus": {
    slug: "best-1440p-gpus",
    title: "Best 1440p GPUs",
    summary:
      "1440p (2560×1440) is the performance sweet spot for most PC gamers in 2026: you need real GPU power, 16 GB VRAM is the practical floor, and upscaling (DLSS 4 / FSR 4) matters for ray tracing. These cards target 100–165 FPS at High/Ultra in modern AAA games.",
    picks: [
      {
        tier: "budget",
        name: "GeForce RTX 5070 12 GB / Radeon RX 9070 16 GB",
        summary: "Entry high-refresh 1440p with upscaling when you need to save money.",
        details: [
          "RTX 5070 12 GB is capable at 1440p but can run tight in heavy RT — use DLSS Quality.",
          "RX 9070 16 GB trades some RT performance for extra VRAM and strong raster FPS per dollar.",
          "Fine for 1440p 75–120 Hz panels; not the pick for max RT without upscaling.",
        ],
      },
      {
        tier: "sweet-spot",
        name: "Radeon RX 9070 XT 16 GB / GeForce RTX 5070 Ti 16 GB",
        summary: "Best balance of price, 1440p high-refresh, and longevity in 2026.",
        details: [
          "RX 9070 XT is the value leader for raw 1440p performance and 16 GB VRAM at sane prices.",
          "RTX 5070 Ti leads ray tracing, path tracing, and DLSS 4 — buy near MSRP, not inflated scalper pricing.",
          "Both handle 1440p Ultra in most AAA games; either is a sensible primary GPU for new builds.",
        ],
      },
      {
        tier: "high-end",
        name: "GeForce RTX 5080 16 GB",
        summary: "1440p max settings, high refresh, and headroom for path tracing.",
        details: [
          "RTX 5080 is for 1440p 240 Hz, ultrawide 1440p, or gamers who want 4K later without replacing the GPU.",
          "Full DLSS 4 stack and strong RT performance; pairs well with 9800X3D / 7800X3D without bottleneck.",
          "Overkill for 60 Hz 1440p — put the savings into a better monitor or CPU instead.",
        ],
      },
    ],
    buyingTips: [
      "16 GB VRAM is the comfortable minimum at 1440p in 2026; 12 GB works with upscaling but ages faster.",
      "AMD wins frames per dollar in raster; NVIDIA wins RT, DLSS, and NVENC if you stream.",
      "Match PSU to TDP: 9070 XT / 5070 Ti class typically wants a 750 W quality unit.",
    ],
    supportsRayTracing: true,
    summaryRtOn:
      "1440p with ray tracing needs 16 GB VRAM for most AAA titles and upscaling (DLSS or FSR) in daily use. GeForce RTX and Radeon RX both work — NVIDIA still leads path tracing and DLSS frame gen; AMD RX 9070 series is strong for RT High with FSR 4 at better value.",
    picksRtOn: [
      {
        tier: "budget",
        name: "GeForce RTX 5070 12 GB / Radeon RX 9070 16 GB",
        summary: "Entry 1440p ray tracing — AMD’s extra VRAM vs NVIDIA’s DLSS stack.",
        details: [
          "5070: RT High at 1440p with DLSS Quality; 12 GB may need lower textures in RT Ultra.",
          "9070: 16 GB and RDNA 4 RT for RT High + FSR Quality in most AAA games.",
          "Not ideal for max path tracing — step up a tier for Cyberpunk RT Overdrive or Alan Wake 2 max RT.",
        ],
      },
      {
        tier: "sweet-spot",
        name: "Radeon RX 9070 XT 16 GB / GeForce RTX 5070 Ti 16 GB",
        summary: "Default 1440p RT pair for 2026 — pick by price and upscaler in your library.",
        details: [
          "9070 XT: excellent RT High + FSR at 1440p; best AMD value for RT gaming.",
          "5070 Ti: leads RT Ultra, path tracing, and DLSS 4 frame generation.",
          "Target ~90–120 FPS at 1440p with RT on and upscaling in most current releases.",
        ],
      },
      {
        tier: "high-end",
        name: "GeForce RTX 5080 16 GB / Radeon RX 9070 XT 16 GB (max RT)",
        summary: "NVIDIA for path tracing and max RT; AMD when FSR + RT Ultra at 1440p high refresh is enough.",
        details: [
          "5080: RT Overdrive–class modes at 1440p with DLSS; best for ultrawide 1440p RT.",
          "9070 XT: push RT Ultra where titles allow with FSR Performance — compare benchmarks in your favorite games.",
          "750–850 W PSU recommended; RT increases average and peak power on both vendors.",
        ],
      },
    ],
    buyingTipsRtOn: [
      "RX 6000/7000/9000 and RTX 20-series and newer support hardware ray tracing — enable RT in-game, then add FSR or DLSS.",
      "At 1440p RT, treat upscaling as part of your preset — native RT Ultra rarely holds 165 Hz on either brand.",
      "Compare your game list: some titles favor AMD RT after updates; others are NVIDIA path-tracing showcases.",
    ],
  },
  "best-4k-gpus": {
    slug: "best-4k-gpus",
    title: "Best 4K GPUs",
    summary:
      "Native 4K at High/Ultra still demands top-tier GPUs in 2026. Upscaling (DLSS Performance / FSR) is standard for 60–120 FPS. These picks assume a 3840×2160 display and modern AAA titles, not just esports.",
    picks: [
      {
        tier: "budget",
        name: "Radeon RX 9070 XT 16 GB",
        summary: "Best value entry to 4K with upscaling — not max native RT.",
        details: [
          "Averages ~60 FPS in demanding titles with FSR and sensible settings.",
          "16 GB VRAM helps at 4K texture settings; RT is secondary on this tier.",
          "Ideal if you accept Quality/Balanced upscaling for AAA and want to spend less than RTX 5080 money.",
        ],
      },
      {
        tier: "sweet-spot",
        name: "GeForce RTX 5080 16 GB",
        summary: "Mainstream 4K high-end — the practical flagship for most 4K gamers.",
        details: [
          "Smooth 4K in most games with DLSS Quality; strong RT compared to last gen.",
          "16 GB is enough for 4K today; use DLSS in path-traced modes.",
          "Pairs with any modern 8-core CPU; GPU is the bottleneck at 4K.",
        ],
      },
      {
        tier: "enthusiast",
        name: "GeForce RTX 5090 32 GB",
        summary: "No-compromise 4K — high refresh, max RT, and AI/workload headroom.",
        details: [
          "32 GB GDDR7 for heavy RT, mods, and creator workloads on the same machine.",
          "Only pick when budget is unlimited and you target 4K 120 Hz+ with RT enabled.",
          "Requires strong cooling, 850 W+ PSU, and a case that fits triple-slot boards.",
        ],
      },
    ],
    buyingTips: [
      "At 4K, upgrade the GPU before the CPU — a 7800X3D class chip is already plenty.",
      "HDMI 2.1 / DisplayPort bandwidth matter for 4K 120 Hz; verify monitor and GPU outputs.",
      "GPU prices fluctuate with memory supply — compare street price to MSRP before buying.",
    ],
    supportsRayTracing: true,
    summaryRtOn:
      "4K ray tracing on any GPU assumes FSR or DLSS Performance for demanding AAA. Radeon RX 9070 XT can handle 4K RT Medium–High with FSR; GeForce RTX 5080/5090 lead RT Ultra and path-traced modes. Both vendors are valid — match tier to how aggressively you use RT.",
    picksRtOn: [
      {
        tier: "budget",
        name: "Radeon RX 9070 XT 16 GB / GeForce RTX 5080 16 GB",
        summary: "Value 4K RT (AMD) vs higher RT ceiling (NVIDIA) at the same resolution.",
        details: [
          "9070 XT: 4K with RT High/Medium + FSR Performance in many titles — best RT value at 4K.",
          "5080: stronger RT Ultra and path tracing with DLSS; minimum NVIDIA tier for serious 4K RT.",
          "Neither runs max path tracing at 4K native without upscaling — plan settings accordingly.",
        ],
      },
      {
        tier: "sweet-spot",
        name: "GeForce RTX 5080 16 GB / Radeon RX 9070 XT 16 GB (RT tuned)",
        summary: "5080 for max RT presets; 9070 XT when you accept FSR and one RT step below max.",
        details: [
          "5080: 4K 60–90 Hz with RT + DLSS Performance in most flagship games.",
          "9070 XT: comparable experience with FSR and RT High instead of Ultra in heavy titles.",
          "If frame rate falls short, drop RT one notch before lowering resolution.",
        ],
      },
      {
        tier: "enthusiast",
        name: "GeForce RTX 5090 32 GB",
        summary: "Top tier for 4K RT high refresh and path tracing; no AMD equivalent in this generation yet.",
        details: [
          "32 GB VRAM for RT + max textures, mods, and creator workloads.",
          "Target 4K 100+ FPS with RT + DLSS in the most demanding releases.",
          "850–1000 W PSU and strong airflow — RT load spikes power on long sessions.",
        ],
      },
    ],
    buyingTipsRtOn: [
      "4K RT on RX 9070 XT is real — use FSR 4 and sensible RT levels; do not assume only RTX can ray trace.",
      "Path-traced modes at 4K still favor RTX 5080/5090; AMD is strongest at RT High with upscaling.",
      "Always combine RT with FSR or DLSS at 4K; thermals and power draw rise on both AMD and NVIDIA.",
    ],
  },
  "best-1080p-cpus": {
    slug: "best-1080p-cpus",
    title: "Best 1080p CPUs",
    summary:
      "1080p gaming is the most CPU-bound resolution: cache, clock speed, and single-thread performance show up in minimum FPS and 1% lows. These picks prioritize gaming over productivity, with AM5 and LGA 1700/1851 options.",
    picks: [
      {
        tier: "budget",
        name: "Intel Core i5-12400F / Ryzen 5 5600",
        summary: "Still viable for 1080p paired with a mid-range GPU on DDR4 platforms.",
        details: [
          "Excellent value on used or clearance DDR4 builds; expect lower 1% lows in CPU-heavy games vs AM5.",
          "Target 60–144 FPS in AAA with a GPU like RX 7600 / RTX 5060 class.",
          "Upgrade path is limited — fine for budget esports rigs, not future 1440p plans.",
        ],
      },
      {
        tier: "sweet-spot",
        name: "Ryzen 5 7600 / Ryzen 5 9600X",
        summary: "Modern 6-core AM5 chips for high-refresh 1080p without X3D pricing.",
        details: [
          "7600 is the budget AM5 gaming CPU when 7800X3D is out of budget.",
          "9600X (Zen 5) improves efficiency and single-thread for competitive titles.",
          "Pair with fast DDR5 (6000 MT/s CL30 EXPO) for best results.",
        ],
      },
      {
        tier: "high-end",
        name: "Ryzen 7 7800X3D / Ryzen 7 9800X3D",
        summary: "Best gaming CPUs for 1080p high-refresh and sim/strategy titles.",
        details: [
          "9800X3D is fastest in CPU-limited games (~8% ahead of 7800X3D at 1080p in many tests).",
          "7800X3D is the value pick when $100+ cheaper — same 8 cores, 3D V-Cache, AM5 upgrade path.",
          "Intel Core i5-14600K alternative if you prefer LGA 1700 and already own DDR5.",
        ],
      },
    ],
    buyingTips: [
      "X3D chips excel in Flight Simulator, Cities Skylines, MMORPGs, and competitive shooters at low settings.",
      "Enable EXPO/XMP; slow RAM costs more FPS at 1080p than at 4K.",
      "A mid GPU + X3D often beats a flagship GPU + weak CPU at 1080p.",
    ],
  },
  "best-1440p-cpus": {
    slug: "best-1440p-cpus",
    title: "Best 1440p CPUs",
    summary:
      "At 1440p the GPU is usually the limiter in AAA games, but CPU choice still affects 1% lows, simulation titles, and high refresh targets (165–240 Hz). These picks balance gaming with light streaming and background tasks.",
    picks: [
      {
        tier: "budget",
        name: "Ryzen 5 7600 / Intel Core i5-13400F",
        summary: "Enough CPU for 1440p when paired with a 5070 / 9070-class GPU.",
        details: [
          "You will not saturate these in most AAA at 1440p Ultra — good for cost-conscious builds.",
          "Consider 7600X non-X3D if productivity (encoding, compile) matters occasionally.",
          "Upgrade GPU first if choosing between this tier and a better graphics card.",
        ],
      },
      {
        tier: "sweet-spot",
        name: "Ryzen 7 7800X3D",
        summary: "Best gaming value for 1440p high-refresh in 2026 when priced under ~$400.",
        details: [
          "Roughly within ~5% of 9800X3D at 1440p in many benchmarks — GPU choice matters more.",
          "8 cores handle Discord, browser, and capture without hurting frametimes.",
          "Default pick for a balanced 1440p gaming PC with a 9070 XT / 5070 Ti.",
        ],
      },
      {
        tier: "high-end",
        name: "Ryzen 7 9800X3D / Intel Core i7-14700K",
        summary: "Maximum 1440p consistency in CPU-heavy games plus stream encoding headroom.",
        details: [
          "9800X3D for pure gaming and AM5; 14700K if you stream with x264 or mix heavy productivity.",
          "Worth it for 1440p 240 Hz in sim/racing/MMO titles paired with RTX 5080-class GPUs.",
          "9950X3D only if you need 16 cores for work alongside gaming — overkill for most gamers.",
        ],
      },
    ],
    buyingTips: [
      "At 1440p, spend on GPU until you hit your target FPS, then upgrade CPU if 1% lows lag.",
      "7800X3D vs 9800X3D: buy whichever is cheaper per region — performance gap is modest at 1440p.",
      "B650 motherboards are fine for X3D chips; enable latest AGESA for best memory support.",
    ],
  },
  "best-4k-cpus": {
    slug: "best-4k-cpus",
    title: "Best 4K CPUs",
    summary:
      "4K gaming is GPU-bound in almost all AAA titles — CPU differences shrink to a few percent. Still, these CPUs avoid bottlenecks in RT-heavy engines, offer headroom for stream/recording, and support top-tier GPUs long term.",
    picks: [
      {
        tier: "sweet-spot",
        name: "Ryzen 7 7800X3D",
        summary: "The rational 4K gaming CPU — do not overspend here before the GPU.",
        details: [
          "Within ~2% of 9800X3D at 4K in typical GPU-limited testing.",
          "8 cores, low power, excellent gaming efficiency; money is better spent on RTX 5080 / 5090 class.",
          "Same AM5 platform as higher chips if you upgrade CPU later for productivity.",
        ],
      },
      {
        tier: "high-end",
        name: "Ryzen 7 9800X3D / Intel Core i7-14700K",
        summary: "When you also play CPU-heavy games at 4K medium or stream while gaming.",
        details: [
          "9800X3D for best frametimes in hybrid CPU/GPU bound titles (cities, MMO hubs).",
          "14700K for Quick Sync streaming, content creation, or Intel GPU QuickSync workflows.",
          "Neither replaces a faster GPU for native 4K Ultra in Cyberpunk-class titles.",
        ],
      },
      {
        tier: "enthusiast",
        name: "Ryzen 9 9950X3D / Core i9-14900K",
        summary: "4K gaming plus heavy productivity — rendering, compile, VM, stream x264.",
        details: [
          "9950X3D: 16-core X3D for creators who game on the same workstation.",
          "14900K: maximum Intel multi-thread; watch cooling and power draw.",
          "Pure 4K 60 Hz gaming alone does not need this tier.",
        ],
      },
    ],
    buyingTips: [
      "Buy the GPU first for 4K — RTX 5080 / 9070 XT minimum for comfortable Ultra with upscaling.",
      "PCIe 5.0 x16 from CPU is plenty; lane count rarely limits single-GPU 4K builds.",
      "32 GB DDR5 is standard; 64 GB only for creators, not gaming-only 4K rigs.",
    ],
  },
};

export function getBuildPageContent(slug: string): BuildPageContent | undefined {
  if (slug in BUILD_PAGES) {
    return BUILD_PAGES[slug as BuildSlug];
  }
  return undefined;
}

export function getAllBuildSlugs(): BuildSlug[] {
  return Object.keys(BUILD_PAGES) as BuildSlug[];
}
