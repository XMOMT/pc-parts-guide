import { siteConfig } from "@/lib/data";

export const workloadImageCredits = [
  {
    slug: "photo-editing",
    label: "Photo editing",
    detail:
      "Cover: Zulfugar Karimov on Unsplash. Background: Robert Bye on Unsplash. Unsplash License.",
  },
  {
    slug: "video-editing",
    label: "Video editing",
    detail:
      "Cover and background: photographers on Unsplash (Georgia de Lotz and others). Unsplash License.",
  },
  {
    slug: "3d-rendering",
    label: "3D rendering",
    detail:
      "Cover: Blender 3.3 screenshot on Wikimedia Commons (author VulcanSphere), licensed under CC BY-SA 4.0. Background: ThisisEngineering RAEng on Unsplash.",
  },
] as const;

export const gameImageCreditsIntro = `Where a game is listed on Steam, header and screenshot artwork on ${siteConfig.name} is typically sourced from the public Steam store CDN for identification and commentary. For a small set of non-Steam PC titles, we may use artwork provided through the RAWG Video Games Database API under their terms, with attribution on this page. We do not claim ownership of game trademarks, logos, or artwork. Publishers and platform holders retain all rights. If you are a rights holder and believe material should be updated or removed, contact ${siteConfig.contactEmail}.`;

export const rawgAttributionNotice =
  "This site uses the RAWG API and follows the RAWG API Terms of Service. Game metadata and images © their respective owners. RAWG.io";
