const collageSlugs = [
  "cyberpunk-2077",
  "elden-ring",
  "baldurs-gate-3",
  "the-witcher-3",
  "grand-theft-auto-v",
  "red-dead-redemption-2",
  "hogwarts-legacy",
  "starfield",
  "helldivers-2",
  "black-myth-wukong",
  "dragons-dogma-2",
  "ghost-of-tsushima",
  "god-of-war",
  "spider-man-remastered",
  "horizon-zero-dawn",
  "death-stranding",
  "sekiro",
  "dark-souls-3",
  "doom-eternal",
  "fallout-4",
  "monster-hunter-world",
  "resident-evil-4-remake",
  "street-fighter-6",
  "final-fantasy-xvi",
  "forza-horizon-5",
  "apex-legends",
  "remnant-2",
  "call-of-duty-modern-warfare-3-2023",
  "assassins-creed-valhalla",
  "far-cry-6",
  "pubg",
  "destiny-2",
  "nier-automata",
  "silent-hill-2-remake",
  "star-wars-jedi-survivor",
  "rainbow-six-siege",
  "battlefield-2042",
  "f1-22",
  "no-mans-sky",
  "control",
  "overwatch",
  "titanfall-2",
  "metro-exodus",
  "devil-may-cry-5",
  "tekken-8",
  "star-wars-outlaws",
  "hellblade-2",
  "kingdom-come-deliverance-2",
  "stellar-blade",
  "space-marine-2",
];

const tileRotations = [-4, 2, -2, 3, -3, 1, -1, 4];

export default function HeroGameCollage() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 scale-110 blur-[1.5px]">
        <div className="grid h-full w-full grid-cols-5 gap-2 p-2 sm:grid-cols-8 sm:gap-2.5 sm:p-3 lg:grid-cols-10">
          {collageSlugs.map((slug, index) => (
            <div
              key={slug}
              className="aspect-[460/215] overflow-hidden rounded-md shadow-lg shadow-black/40"
              style={{
                transform: `rotate(${tileRotations[index % tileRotations.length]}deg)`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/games/${slug}.jpg`}
                alt=""
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 bg-surface-950/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-surface-950/50 via-surface-950/85 to-surface-950" />
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_85%_75%_at_50%_45%,black_25%,transparent_100%)]" />
    </div>
  );
}
