import type { GamePageContent } from "./types";
import { registerGamePage } from "./registry";

const theWitcher3: GamePageContent = {
  slug: "the-witcher-3",
  title: "The Witcher 3: Wild Hunt",
  coverImage: "/games/the-witcher-3.jpg",
  coverImageAlt: "The Witcher 3: Wild Hunt — Geralt in Kaer Morhen",
  summary:
    "The 2022 next-gen update added ray tracing, DLSS, and FSR 2 — and made the game noticeably heavier on GPU and VRAM. Use the resolution and ray tracing toggles below to see what you need for 60 FPS. Keep HairWorks off — beyond the performance hit, it is known to cause crashes on many setups. GPU is the main bottleneck; CPU only spikes in dense areas like Novigrad.",
  lastUpdated: "2026-03-06",
  settingsPreset: "Ultra graphics preset, HairWorks off (recommended — can crash if enabled)",
  upscalingSupport: ["DLSS", "FSR 2"],
  supportsRayTracing: true,
  overviewCallouts: [
    {
      title: "HairWorks: keep disabled",
      message:
        "NVIDIA HairWorks is not recommended. Beyond heavy performance cost, enabling it is widely reported to cause crashes and instability on PC — especially with the next-gen update. Leave it off in the in-game video settings.",
    },
  ],
  performanceNotes: [
    "Ray tracing requires DirectX 12 mode and an RTX or RDNA 2+ GPU. Toggle RT off to use DX11 for slightly better performance on older cards.",
    "CD Projekt Red's official RT specs target 1440p (RTAO/RTGI) and 4K (all RT features) with DLSS or FSR — not native resolution.",
    "The game is mostly GPU-bound. A mid-range CPU is enough; prioritize GPU and 16 GB RAM.",
    "Disable NVIDIA HairWorks — it tanks performance and is known to cause crashes on many PC setups.",
    "Install on an SSD. The next-gen patch recommends 50 GB; upcoming updates may require 70 GB.",
  ],
  tiers: [
    {
      id: "1080p-60",
      resolution: "1080p",
      targetFps: 60,
      rtOff: {
        settings: "Ultra preset, HairWorks off, HBAO+ on",
        gpu: {
          label: "Graphics card",
          minimum: "GTX 1660 Super 6 GB / RX 5600 XT 6 GB",
          recommended: "RTX 3060 12 GB / RX 6600 8 GB",
          notes: "6 GB VRAM is the practical floor for Ultra textures at 1080p.",
        },
        cpu: {
          label: "Processor",
          minimum: "Ryzen 5 3600 / Intel Core i5-10400",
          recommended: "Ryzen 5 5600 / Intel Core i5-12400",
          notes: "Matches CDPR's High preset CPU class (i5-7400 / Ryzen 5 1600).",
        },
        ram: {
          label: "Memory",
          minimum: "16 GB DDR4 (dual-channel)",
          recommended: "16 GB DDR4/DDR5 (dual-channel)",
        },
        storage: {
          label: "Storage",
          minimum: "50 GB SSD",
          recommended: "50 GB NVMe SSD",
        },
        fpsNote:
          "RTX 3060 averages 65–73 FPS at 1080p Ultra without ray tracing. GTX 1660 Super holds ~55–60 FPS on a High–Ultra mix.",
        settingsTips: [
          "Drop Shadow Quality to High if you dip below 60 FPS in forests.",
          "Set Background Characters to Medium in Novigrad if CPU usage spikes.",
          "Keep Foliage Visibility at High rather than Ultra for free FPS.",
        ],
      },
      rtOn: {
        settings: "Ultra preset, RTAO + RTGI on, DLSS Quality, HairWorks off",
        gpu: {
          label: "Graphics card",
          minimum: "RTX 3060 Ti 8 GB / RX 6700 XT 12 GB",
          recommended: "RTX 3070 8 GB / RX 6800 16 GB",
          notes: "Ray tracing requires an RTX or RDNA 2+ GPU. 8 GB VRAM minimum with DLSS.",
        },
        cpu: {
          label: "Processor",
          minimum: "Ryzen 5 5600 / Intel Core i5-12400",
          recommended: "Ryzen 7 5700X / Intel Core i5-13400",
        },
        ram: {
          label: "Memory",
          minimum: "16 GB (dual-channel)",
          recommended: "16 GB (dual-channel)",
        },
        storage: {
          label: "Storage",
          minimum: "50 GB SSD",
          recommended: "50 GB NVMe SSD",
        },
        fpsNote:
          "RTX 3070 holds ~60 FPS at 1080p with partial RT (RTAO/RTGI) and DLSS Quality. Full RT shadows add another ~15% GPU load.",
        settingsTips: [
          "Use DLSS Quality — native 1080p with RT rarely hits 60 FPS below a 3070.",
          "Disable RT shadows first if FPS drops; keep RTAO and RTGI for the biggest visual gain.",
          "Switch to DirectX 12 in launcher — required for ray tracing and DLSS.",
        ],
      },
    },
    {
      id: "1440p-60",
      resolution: "1440p",
      targetFps: 60,
      rtOff: {
        settings: "Ultra preset, DLSS Quality (RTX) or FSR Quality (AMD), HairWorks off",
        gpu: {
          label: "Graphics card",
          minimum: "RTX 3060 Ti 8 GB / RX 6700 XT 12 GB",
          recommended: "RTX 3070 8 GB / RX 6800 16 GB",
          notes: "Without RT, 3060 Ti is the entry point for 1440p Ultra with upscaling.",
        },
        cpu: {
          label: "Processor",
          minimum: "Ryzen 5 5600 / Intel Core i5-12400",
          recommended: "Ryzen 7 5700X / Intel Core i5-13400",
        },
        ram: {
          label: "Memory",
          minimum: "16 GB (dual-channel)",
          recommended: "16 GB (dual-channel)",
        },
        storage: {
          label: "Storage",
          minimum: "50 GB SSD",
          recommended: "50 GB NVMe SSD",
        },
        fpsNote:
          "RTX 3060 Ti / RX 6700 XT deliver ~60 FPS at 1440p Ultra without RT using DLSS/FSR Quality.",
        settingsTips: [
          "Use DLSS Quality or FSR Quality — native 1440p Ultra needs a 3070-class GPU.",
          "Turn Water Quality to High instead of Ultra for a small boost in coastal areas.",
        ],
      },
      rtOn: {
        settings: "Ultra preset, RTAO + RTGI on, DLSS Quality, HairWorks off",
        gpu: {
          label: "Graphics card",
          minimum: "RTX 3070 8 GB / RX 6700 XT 12 GB",
          recommended: "RTX 4070 12 GB / RX 7800 XT 16 GB",
          notes: "Matches CDPR's official 1440p Ultra spec (RTX 3070 / RX 6700 XT with partial RT + DLSS).",
        },
        cpu: {
          label: "Processor",
          minimum: "Ryzen 5 5600 / Intel Core i5-12400",
          recommended: "Ryzen 7 5700X / Intel Core i7-12700",
          notes: "CDPR lists i7-8700K / Ryzen 5 3600 for this tier.",
        },
        ram: {
          label: "Memory",
          minimum: "16 GB (dual-channel)",
          recommended: "16 GB (dual-channel)",
          notes: "16 GB is CDPR's official requirement for Ultra with ray tracing.",
        },
        storage: {
          label: "Storage",
          minimum: "50 GB SSD",
          recommended: "50 GB NVMe SSD",
        },
        fpsNote:
          "RTX 3070 / RX 6700 XT target ~60 FPS at 1440p with RTAO/RTGI and DLSS — per CDPR's official Ultra spec.",
        settingsTips: [
          "DLSS Quality is required — this matches CDPR's tested 1440p RT configuration.",
          "RT reflections off saves significant GPU load with minimal visual difference outdoors.",
          "Do not run native 1440p with RT; always use DLSS or FSR.",
        ],
      },
    },
    {
      id: "4k-60",
      resolution: "4K",
      targetFps: 60,
      rtOff: {
        settings: "Ultra preset, DLSS Quality (RTX) or FSR Quality (AMD), HairWorks off",
        gpu: {
          label: "Graphics card",
          minimum: "RTX 3080 10 GB / RX 6800 XT 16 GB",
          recommended: "RTX 4070 Super 12 GB / RX 7800 XT 16 GB",
          notes: "Without RT, 3080-class hardware with DLSS hits 4K 60.",
        },
        cpu: {
          label: "Processor",
          minimum: "Ryzen 7 5700X / Intel Core i7-12700",
          recommended: "Ryzen 7 7800X3D / Intel Core i7-13700",
        },
        ram: {
          label: "Memory",
          minimum: "16 GB (dual-channel)",
          recommended: "32 GB (dual-channel)",
        },
        storage: {
          label: "Storage",
          minimum: "50 GB SSD",
          recommended: "50 GB NVMe SSD",
        },
        fpsNote:
          "RTX 3080 / RX 6800 XT hit ~55–60 FPS at 4K Ultra with DLSS Quality and RT off. RTX 4070 Super holds a stable 60+.",
        settingsTips: [
          "DLSS Quality is essentially required for 4K 60 without ray tracing.",
          "Disable Motion Blur for maximum clarity at 4K.",
        ],
      },
      rtOn: {
        settings: "Ultra preset, all RT features on, DLSS Quality, HairWorks off",
        gpu: {
          label: "Graphics card",
          minimum: "RTX 3080 10 GB / RX 6800 XT 16 GB",
          recommended: "RTX 4070 Ti Super 16 GB / RX 7900 XT 20 GB",
          notes: "Matches CDPR's official 4K Ultra spec (RTX 3080 / RX 6800 XT, all RT + DLSS).",
        },
        cpu: {
          label: "Processor",
          minimum: "Ryzen 7 5700X / Intel Core i7-12700",
          recommended: "Ryzen 7 7800X3D / Intel Core i7-13700",
          notes: "CDPR lists i7-9700K / Ryzen 7 3700X for 4K with all ray tracing enabled.",
        },
        ram: {
          label: "Memory",
          minimum: "16 GB (dual-channel)",
          recommended: "32 GB (dual-channel)",
          notes: "16 GB is the official minimum; 32 GB recommended for HD texture mods with RT.",
        },
        storage: {
          label: "Storage",
          minimum: "50 GB SSD",
          recommended: "50 GB NVMe SSD",
        },
        fpsNote:
          "RTX 3080 / RX 6800 XT target ~60 FPS at 4K with all RT on and DLSS — per CDPR's official spec. RTX 4070 Ti Super adds headroom.",
        settingsTips: [
          "DLSS Quality is mandatory — native 4K with all RT needs RTX 4080-class hardware.",
          "This is CDPR's maximum preset: RTAO, RTGI, RT shadows, and RT reflections all enabled.",
          "If FPS dips below 60, drop to DLSS Balanced before disabling RT features.",
        ],
      },
    },
  ],
  bottlenecks: [
    {
      title: "GPU (primary)",
      description:
        "Draw distance, foliage, shadows, and ray tracing scale heavily with resolution. RT can add 30–50% GPU load on top of Ultra settings.",
    },
    {
      title: "VRAM",
      description:
        "Ultra textures at 1440p and 4K need 8 GB minimum; ray tracing pushes that to 10–12 GB. Stuttering is common below 8 GB with RT on.",
    },
    {
      title: "CPU (secondary)",
      description:
        "Most areas are GPU-bound, but Novigrad crowd scenes can drop 1% lows on older 4-core CPUs regardless of RT setting.",
    },
  ],
};

registerGamePage(theWitcher3);

export default theWitcher3;
