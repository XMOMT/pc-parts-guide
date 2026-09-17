import { gameGenres, getGameGenre, type GameGenre } from "@/lib/game-genres";

export type Game = {
  slug: string;
  title: string;
  year: number;
  description: string;
  genre: GameGenre;
};

export type { GameGenre };
export { gameGenres };

type GameEntry = Omit<Game, "genre">;

/** AAA PC games released or ported to PC since 2015 */
const aaaGames: GameEntry[] = [
  // 2015
  { slug: "the-witcher-3", title: "The Witcher 3: Wild Hunt", year: 2015, description: "Open-world RPG with demanding draw distances and mod support." },
  { slug: "fallout-4", title: "Fallout 4", year: 2015, description: "Bethesda open-world shooter-RPG with heavy modding community." },
  { slug: "metal-gear-solid-v", title: "Metal Gear Solid V: The Phantom Pain", year: 2015, description: "Open-world stealth action with large-scale environments." },
  { slug: "batman-arkham-knight", title: "Batman: Arkham Knight", year: 2015, description: "Action-adventure with GPU-heavy rain and Batmobile sequences." },
  { slug: "star-wars-battlefront-2015", title: "Star Wars Battlefront (2015)", year: 2015, description: "Large-scale multiplayer battles with Frostbite destruction." },
  { slug: "just-cause-3", title: "Just Cause 3", year: 2015, description: "Open-world chaos sandbox with massive draw distances." },
  { slug: "mad-max", title: "Mad Max", year: 2015, description: "Open-world vehicular combat across a vast wasteland." },
  { slug: "assassins-creed-syndicate", title: "Assassin's Creed Syndicate", year: 2015, description: "Victorian London open world with dense urban geometry." },
  { slug: "call-of-duty-black-ops-3", title: "Call of Duty: Black Ops III", year: 2015, description: "Fast-paced FPS with zombies and multiplayer modes." },
  { slug: "rainbow-six-siege", title: "Rainbow Six Siege", year: 2015, description: "Tactical multiplayer FPS with destructible environments." },
  { slug: "battlefield-hardline", title: "Battlefield Hardline", year: 2015, description: "Large-scale multiplayer FPS with vehicles and destruction." },
  { slug: "grand-theft-auto-v", title: "Grand Theft Auto V", year: 2015, description: "Massive open-world action — PC port with enhanced visuals." },
  { slug: "dying-light", title: "Dying Light", year: 2015, description: "Open-world zombie parkour with co-op and night mechanics." },
  { slug: "mortal-kombat-x", title: "Mortal Kombat X", year: 2015, description: "Fighting game with cinematic fatalities and online play." },
  { slug: "project-cars", title: "Project CARS", year: 2015, description: "Simulation racing with detailed car and track models." },
  { slug: "life-is-strange", title: "Life is Strange", year: 2015, description: "Episodic narrative adventure with stylized environments." },

  // 2016
  { slug: "doom-2016", title: "DOOM (2016)", year: 2016, description: "Fast-paced FPS with Vulkan support and heavy action." },
  { slug: "dark-souls-3", title: "Dark Souls III", year: 2016, description: "Action RPG with detailed gothic environments and 60 FPS target." },
  { slug: "overwatch", title: "Overwatch", year: 2016, description: "Team-based hero shooter with stylized 6v6 multiplayer." },
  { slug: "dishonored-2", title: "Dishonored 2", year: 2016, description: "Immersive sim with dense level design and stealth action." },
  { slug: "titanfall-2", title: "Titanfall 2", year: 2016, description: "Fast-paced FPS with mechs and fluid movement." },
  { slug: "battlefield-1", title: "Battlefield 1", year: 2016, description: "WWI large-scale multiplayer with 64-player battles." },
  { slug: "watch-dogs-2", title: "Watch Dogs 2", year: 2016, description: "Open-world action in a detailed San Francisco recreation." },
  { slug: "deus-ex-mankind-divided", title: "Deus Ex: Mankind Divided", year: 2016, description: "Immersive sim RPG with ray-traced-ready detailed scenes." },
  { slug: "hitman-2016", title: "Hitman (2016)", year: 2016, description: "Sandbox assassination sim with large detailed levels." },
  { slug: "rise-of-the-tomb-raider", title: "Rise of the Tomb Raider", year: 2016, description: "Action-adventure with detailed environments and DX12." },
  { slug: "the-division", title: "Tom Clancy's The Division", year: 2016, description: "Online looter-shooter set in a detailed post-pandemic NYC." },
  { slug: "mirrors-edge-catalyst", title: "Mirror's Edge Catalyst", year: 2016, description: "First-person parkour action in a bright open city." },
  { slug: "quantum-break", title: "Quantum Break", year: 2016, description: "Action-adventure with time manipulation and heavy effects." },
  { slug: "gears-of-war-4", title: "Gears of War 4", year: 2016, description: "Third-person cover shooter with detailed destruction." },
  { slug: "civilization-vi", title: "Civilization VI", year: 2016, description: "Turn-based strategy that scales with CPU cores on large maps." },
  { slug: "xcom-2", title: "XCOM 2", year: 2016, description: "Tactical strategy with mod support and turn-based combat." },
  { slug: "total-war-warhammer", title: "Total War: Warhammer", year: 2016, description: "Large-scale strategy battles with thousands of units." },
  { slug: "no-mans-sky", title: "No Man's Sky", year: 2016, description: "Procedural universe exploration — significantly improved on PC." },
  { slug: "forza-horizon-3", title: "Forza Horizon 3", year: 2016, description: "Open-world racing with detailed car models and environments." },
  { slug: "mafia-3", title: "Mafia III", year: 2016, description: "Open-world action set in 1968 New Bordeaux." },

  // 2017
  { slug: "resident-evil-7", title: "Resident Evil 7", year: 2017, description: "First-person survival horror with VR support." },
  { slug: "mass-effect-andromeda", title: "Mass Effect: Andromeda", year: 2017, description: "Open-world sci-fi RPG with large planetary environments." },
  { slug: "prey-2017", title: "Prey (2017)", year: 2017, description: "Immersive sim on a detailed space station." },
  { slug: "destiny-2", title: "Destiny 2", year: 2017, description: "Online looter-shooter with large open patrol zones." },
  { slug: "assassins-creed-origins", title: "Assassin's Creed Origins", year: 2017, description: "Ancient Egypt open world with dense geometry and draw distance." },
  { slug: "wolfenstein-2", title: "Wolfenstein II: The New Colossus", year: 2017, description: "Linear FPS with heavy action and detailed cutscenes." },
  { slug: "call-of-duty-wwii", title: "Call of Duty: WWII", year: 2017, description: "WWII-era FPS with campaign and multiplayer." },
  { slug: "star-wars-battlefront-2", title: "Star Wars Battlefront II", year: 2017, description: "Large-scale Star Wars multiplayer with heroes and vehicles." },
  { slug: "for-honor", title: "For Honor", year: 2017, description: "Melee combat action with 4v4 and duel multiplayer." },
  { slug: "nier-automata", title: "NieR: Automata", year: 2017, description: "Action RPG with fast combat and large open zones." },
  { slug: "middle-earth-shadow-of-war", title: "Middle-earth: Shadow of War", year: 2017, description: "Open-world action with large-scale fortress sieges." },
  { slug: "tekken-7", title: "Tekken 7", year: 2017, description: "3D fighting game with detailed character models." },
  { slug: "pubg", title: "PlayerUnknown's Battlegrounds", year: 2017, description: "100-player battle royale — CPU and network intensive." },
  { slug: "fortnite", title: "Fortnite", year: 2017, description: "Battle royale/building hybrid — competitive at high frame rates." },
  { slug: "hellblade-senuas-sacrifice", title: "Hellblade: Senua's Sacrifice", year: 2017, description: "Cinematic action-adventure with high-fidelity character work." },
  { slug: "sonic-forces", title: "Sonic Forces", year: 2017, description: "3D platformer with modern and classic Sonic stages." },
  { slug: "cuphead", title: "Cuphead", year: 2017, description: "Run-and-gun boss rush with hand-drawn animation style." },
  { slug: "south-park-fractured-but-whole", title: "South Park: The Fractured but Whole", year: 2017, description: "Turn-based RPG set in the South Park universe." },
  { slug: "need-for-speed-payback", title: "Need for Speed Payback", year: 2017, description: "Arcade racing open world with story campaign." },

  // 2018
  { slug: "monster-hunter-world", title: "Monster Hunter: World", year: 2018, description: "Action RPG with large creature fights and co-op." },
  { slug: "far-cry-5", title: "Far Cry 5", year: 2018, description: "Open-world FPS set in rural Montana." },
  { slug: "shadow-of-the-tomb-raider", title: "Shadow of the Tomb Raider", year: 2018, description: "Action-adventure with ray tracing support on PC." },
  { slug: "assassins-creed-odyssey", title: "Assassin's Creed Odyssey", year: 2018, description: "Massive ancient Greece open world — very CPU and GPU demanding." },
  { slug: "battlefield-v", title: "Battlefield V", year: 2018, description: "WWII multiplayer with ray tracing and DLSS support." },
  { slug: "call-of-duty-black-ops-4", title: "Call of Duty: Black Ops 4", year: 2018, description: "Multiplayer-focused COD with battle royale Blackout mode." },
  { slug: "sea-of-thieves", title: "Sea of Thieves", year: 2018, description: "Online pirate adventure with stylized open seas." },
  { slug: "state-of-decay-2", title: "State of Decay 2", year: 2018, description: "Open-world zombie survival with base building." },
  { slug: "hitman-2", title: "Hitman 2", year: 2018, description: "Sandbox assassination with large detailed maps." },
  { slug: "just-cause-4", title: "Just Cause 4", year: 2018, description: "Open-world action with extreme weather and destruction." },
  { slug: "dragon-quest-xi", title: "Dragon Quest XI", year: 2018, description: "JRPG with colorful open areas and turn-based combat." },
  { slug: "soulcalibur-vi", title: "Soulcalibur VI", year: 2018, description: "Weapon-based 3D fighting game." },
  { slug: "vampyr", title: "Vampyr", year: 2018, description: "Action RPG set in 1918 London with moral choices." },
  { slug: "a-way-out", title: "A Way Out", year: 2018, description: "Co-op narrative adventure with split-screen and online play." },
  { slug: "spyro-reignited-trilogy", title: "Spyro Reignited Trilogy", year: 2018, description: "Remastered platformer trilogy with modern visuals." },

  // 2019
  { slug: "anthem", title: "Anthem", year: 2019, description: "Online action RPG with flying exosuits and co-op missions." },
  { slug: "sekiro", title: "Sekiro: Shadows Die Twice", year: 2019, description: "FromSoftware action-adventure demanding fast reactions at 60 FPS." },
  { slug: "metro-exodus", title: "Metro Exodus", year: 2019, description: "Story FPS with ray tracing and large open-zone levels." },
  { slug: "control", title: "Control", year: 2019, description: "Action-adventure with heavy RTX effects and destructible office building." },
  { slug: "borderlands-3", title: "Borderlands 3", year: 2019, description: "Looter-shooter with chaotic co-op and large open zones." },
  { slug: "call-of-duty-modern-warfare-2019", title: "Call of Duty: Modern Warfare (2019)", year: 2019, description: "Rebooted Modern Warfare with ray tracing and Warzone." },
  { slug: "resident-evil-2-remake", title: "Resident Evil 2 Remake", year: 2019, description: "Survival horror remake with detailed RE Engine graphics." },
  { slug: "devil-may-cry-5", title: "Devil May Cry 5", year: 2019, description: "Stylish action with high frame rate combat." },
  { slug: "gears-5", title: "Gears 5", year: 2019, description: "Third-person cover shooter with large open sections." },
  { slug: "the-outer-worlds", title: "The Outer Worlds", year: 2019, description: "First-person RPG with multiple planet hubs." },
  { slug: "star-wars-jedi-fallen-order", title: "Star Wars Jedi: Fallen Order", year: 2019, description: "Action-adventure with Souls-like combat and Unreal Engine 4." },
  { slug: "wolfenstein-youngblood", title: "Wolfenstein: Youngblood", year: 2019, description: "Co-op FPS with ray tracing support." },
  { slug: "rage-2", title: "RAGE 2", year: 2019, description: "Open-world FPS with Avalanche destruction and id shooting." },
  { slug: "the-division-2", title: "Tom Clancy's The Division 2", year: 2019, description: "Online looter-shooter in a detailed post-apocalyptic Washington D.C." },
  { slug: "apex-legends", title: "Apex Legends", year: 2019, description: "Free-to-play hero battle royale — competitive at 144+ FPS." },
  { slug: "remnant-from-the-ashes", title: "Remnant: From the Ashes", year: 2019, description: "Co-op souls-like shooter with procedural dungeons." },
  { slug: "crash-team-racing-nitro-fueled", title: "Crash Team Racing Nitro-Fueled", year: 2019, description: "Kart racing remaster with online multiplayer." },

  // 2020
  { slug: "doom-eternal", title: "DOOM Eternal", year: 2020, description: "Extremely fast FPS — benefits from high refresh rate displays." },
  { slug: "cyberpunk-2077", title: "Cyberpunk 2077", year: 2020, description: "Open-world RPG — ray tracing and path tracing at high settings." },
  { slug: "half-life-alyx", title: "Half-Life: Alyx", year: 2020, description: "VR-only FPS — requires VR-ready GPU and strong CPU." },
  { slug: "assassins-creed-valhalla", title: "Assassin's Creed Valhalla", year: 2020, description: "Viking open world — very demanding at high settings." },
  { slug: "watch-dogs-legion", title: "Watch Dogs: Legion", year: 2020, description: "Open-world London with ray tracing and DLSS." },
  { slug: "call-of-duty-black-ops-cold-war", title: "Call of Duty: Black Ops Cold War", year: 2020, description: "Cold War-era FPS with campaign, multiplayer, and Zombies." },
  { slug: "marvels-avengers", title: "Marvel's Avengers", year: 2020, description: "Online action RPG with hero combat and co-op." },
  { slug: "microsoft-flight-simulator", title: "Microsoft Flight Simulator", year: 2020, description: "Photorealistic sim — CPU, GPU, RAM, and bandwidth hungry." },
  { slug: "death-stranding", title: "Death Stranding", year: 2020, description: "Open-world delivery sim with DLSS — PC port." },
  { slug: "horizon-zero-dawn", title: "Horizon Zero Dawn", year: 2020, description: "Open-world action RPG — PC port with enhanced visuals." },
  { slug: "red-dead-redemption-2", title: "Red Dead Redemption 2", year: 2020, description: "Massive open-world western — one of the most demanding PC games." },
  { slug: "resident-evil-3-remake", title: "Resident Evil 3 Remake", year: 2020, description: "Survival horror remake with RE Engine and ray tracing." },
  { slug: "ghostrunner", title: "Ghostrunner", year: 2020, description: "Fast first-person slasher platformer at high frame rates." },
  { slug: "immortals-fenyx-rising", title: "Immortals Fenyx Rising", year: 2020, description: "Open-world action adventure in a mythological setting." },
  { slug: "dirt-5", title: "Dirt 5", year: 2020, description: "Arcade rally racing with ray tracing on PC." },
  { slug: "mafia-definitive-edition", title: "Mafia: Definitive Edition", year: 2020, description: "Open-world crime drama remake set in 1930s Lost Heaven." },
  { slug: "yakuza-like-a-dragon", title: "Yakuza: Like a Dragon", year: 2020, description: "JRPG set in detailed Japanese city districts." },

  // 2021
  { slug: "resident-evil-village", title: "Resident Evil Village", year: 2021, description: "Survival horror with RE Engine and ray tracing support." },
  { slug: "far-cry-6", title: "Far Cry 6", year: 2021, description: "Open-world FPS set on a tropical island dictatorship." },
  { slug: "halo-infinite", title: "Halo Infinite", year: 2021, description: "FPS with open-world campaign zone and free multiplayer." },
  { slug: "battlefield-2042", title: "Battlefield 2042", year: 2021, description: "Large-scale 128-player multiplayer with destruction." },
  { slug: "forza-horizon-5", title: "Forza Horizon 5", year: 2021, description: "Open-world racing in Mexico — benchmark-grade visuals." },
  { slug: "psychonauts-2", title: "Psychonauts 2", year: 2021, description: "3D platformer with creative psychedelic level design." },
  { slug: "guardians-of-the-galaxy", title: "Marvel's Guardians of the Galaxy", year: 2021, description: "Story-driven action-adventure with ray tracing." },
  { slug: "back-4-blood", title: "Back 4 Blood", year: 2021, description: "Co-op zombie shooter from Left 4 Dead creators." },
  { slug: "deathloop", title: "Deathloop", year: 2021, description: "Immersive sim FPS with time-loop mechanics and RTX." },
  { slug: "kena-bridge-of-spirits", title: "Kena: Bridge of Spirits", year: 2021, description: "Action-adventure with Pixar-quality character animation." },
  { slug: "hitman-3", title: "Hitman 3", year: 2021, description: "Sandbox assassination with ray tracing and large maps." },
  { slug: "outriders", title: "Outriders", year: 2021, description: "Online looter-shooter with ability-based combat." },
  { slug: "biomutant", title: "Biomutant", year: 2021, description: "Open-world action RPG with martial arts combat." },
  { slug: "new-world", title: "New World", year: 2021, description: "MMO with large-scale PvP wars — CPU and network intensive." },
  { slug: "age-of-empires-4", title: "Age of Empires IV", year: 2021, description: "RTS that scales with CPU on large unit counts." },
  { slug: "call-of-duty-vanguard", title: "Call of Duty: Vanguard", year: 2021, description: "WWII-era FPS campaign and multiplayer." },
  { slug: "mass-effect-legendary-edition", title: "Mass Effect Legendary Edition", year: 2021, description: "Remastered trilogy with updated visuals and all DLC." },
  { slug: "days-gone", title: "Days Gone", year: 2021, description: "Open-world zombie survival — PC port with enhanced features." },
  { slug: "nier-replicant", title: "NieR Replicant", year: 2021, description: "Action RPG remake with expanded combat and visuals." },
  { slug: "ratchet-clank-rift-apart", title: "Ratchet & Clank: Rift Apart", year: 2021, description: "Platformer with dimension-hopping — PC port with DLSS 3." },

  // 2022
  { slug: "elden-ring", title: "Elden Ring", year: 2022, description: "Open-world action RPG — demanding at max settings, 60 FPS target." },
  { slug: "god-of-war", title: "God of War", year: 2022, description: "Action-adventure PC port with DLSS and ultra settings." },
  { slug: "call-of-duty-modern-warfare-2-2022", title: "Call of Duty: Modern Warfare II", year: 2022, description: "Modern military FPS with Warzone 2 and campaign." },
  { slug: "spider-man-remastered", title: "Marvel's Spider-Man Remastered", year: 2022, description: "Open-world superhero action — ray tracing and DLSS on PC." },
  { slug: "uncharted-legacy-of-thieves", title: "Uncharted: Legacy of Thieves Collection", year: 2022, description: "Cinematic action-adventure PC port with DLSS." },
  { slug: "dying-light-2", title: "Dying Light 2 Stay Human", year: 2022, description: "Open-world parkour zombie survival with ray tracing." },
  { slug: "ghostwire-tokyo", title: "Ghostwire: Tokyo", year: 2022, description: "First-person action with detailed Tokyo and RTX effects." },
  { slug: "tiny-tinas-wonderlands", title: "Tiny Tina's Wonderlands", year: 2022, description: "Fantasy looter-shooter spin-off with co-op." },
  { slug: "sniper-elite-5", title: "Sniper Elite 5", year: 2022, description: "Tactical WWII sniper sim with large open maps." },
  { slug: "total-war-warhammer-3", title: "Total War: Warhammer III", year: 2022, description: "Grand strategy with massive real-time battles." },
  { slug: "lego-star-wars-skywalker-saga", title: "LEGO Star Wars: The Skywalker Saga", year: 2022, description: "Open-hub LEGO adventure covering all nine films." },
  { slug: "sonic-frontiers", title: "Sonic Frontiers", year: 2022, description: "Open-zone Sonic platformer with large explorable areas." },
  { slug: "stray", title: "Stray", year: 2022, description: "Third-person cat adventure in a detailed cybercity." },
  { slug: "gotham-knights", title: "Gotham Knights", year: 2022, description: "Open-world co-op action RPG set in Gotham City." },
  { slug: "the-callisto-protocol", title: "The Callisto Protocol", year: 2022, description: "Survival horror with ray tracing and detailed gore effects." },
  { slug: "plague-tale-requiem", title: "A Plague Tale: Requiem", year: 2022, description: "Story-driven action with massive rat swarm simulations." },
  { slug: "f1-22", title: "F1 22", year: 2022, description: "Official Formula 1 sim racing with VR support." },
  { slug: "ea-sports-fc-23", title: "EA Sports FC 23", year: 2022, description: "Football sim with large player counts and stadium detail." },

  // 2023
  { slug: "hogwarts-legacy", title: "Hogwarts Legacy", year: 2023, description: "Open-world wizarding RPG — very demanding with ray tracing." },
  { slug: "starfield", title: "Starfield", year: 2023, description: "Bethesda space RPG with vast planets and mod support." },
  { slug: "baldurs-gate-3", title: "Baldur's Gate 3", year: 2023, description: "CRPG with dense scenes — CPU-heavy in large battles." },
  { slug: "alan-wake-2", title: "Alan Wake 2", year: 2023, description: "Survival horror with path tracing — top-tier GPU demand." },
  { slug: "diablo-4", title: "Diablo IV", year: 2023, description: "Online action RPG with large open zones and co-op." },
  { slug: "lies-of-p", title: "Lies of P", year: 2023, description: "Souls-like action RPG with detailed Unreal Engine 4 visuals." },
  { slug: "armored-core-6", title: "Armored Core VI: Fires of Rubicon", year: 2023, description: "Mech action with fast combat and large boss fights." },
  { slug: "avatar-frontiers-of-pandora", title: "Avatar: Frontiers of Pandora", year: 2023, description: "Open-world action in Pandora with lush vegetation." },
  { slug: "call-of-duty-modern-warfare-3-2023", title: "Call of Duty: Modern Warfare III", year: 2023, description: "Modern military FPS with Zombies and Warzone." },
  { slug: "street-fighter-6", title: "Street Fighter 6", year: 2023, description: "Fighting game with 3D arenas and rollback netcode." },
  { slug: "remnant-2", title: "Remnant II", year: 2023, description: "Co-op souls-like shooter with procedural worlds." },
  { slug: "dead-space-2023", title: "Dead Space (2023)", year: 2023, description: "Survival horror remake with detailed Ishimura station." },
  { slug: "resident-evil-4-remake", title: "Resident Evil 4 Remake", year: 2023, description: "Action horror remake with RE Engine and ray tracing." },
  { slug: "the-last-of-us-part-1", title: "The Last of Us Part I", year: 2023, description: "Story action-adventure PC port with DLSS support." },
  { slug: "lords-of-the-fallen-2023", title: "Lords of the Fallen (2023)", year: 2023, description: "Souls-like action RPG with dual-world mechanics." },
  { slug: "like-a-dragon-gaiden", title: "Like a Dragon Gaiden", year: 2023, description: "Action-adventure spin-off set in detailed Japanese cities." },
  { slug: "payday-3", title: "PAYDAY 3", year: 2023, description: "Co-op heist FPS with destructible environments." },
  { slug: "forza-motorsport-2023", title: "Forza Motorsport (2023)", year: 2023, description: "Track racing sim with ray tracing and detailed car damage." },
  { slug: "assassins-creed-mirage", title: "Assassin's Creed Mirage", year: 2023, description: "Focused stealth action return to series roots in Baghdad." },
  { slug: "star-wars-jedi-survivor", title: "Star Wars Jedi: Survivor", year: 2023, description: "Action-adventure sequel with larger worlds and ray tracing." },
  { slug: "atomic-heart", title: "Atomic Heart", year: 2023, description: "FPS action in an alternate Soviet utopia with heavy effects." },
  { slug: "final-fantasy-xvi", title: "Final Fantasy XVI", year: 2023, description: "Action RPG with epic summon battles — PC port." },

  // 2024
  { slug: "helldivers-2", title: "Helldivers 2", year: 2024, description: "Co-op third-person shooter with large enemy swarms." },
  { slug: "dragons-dogma-2", title: "Dragon's Dogma 2", year: 2024, description: "Open-world action RPG with dense NPC and enemy AI." },
  { slug: "black-myth-wukong", title: "Black Myth: Wukong", year: 2024, description: "Action RPG with Unreal Engine 5 and ray tracing." },
  { slug: "star-wars-outlaws", title: "Star Wars Outlaws", year: 2024, description: "Open-world Star Wars action-adventure with DLSS 3." },
  { slug: "indiana-jones-great-circle", title: "Indiana Jones and the Great Circle", year: 2024, description: "First-person adventure with detailed global locations." },
  { slug: "hellblade-2", title: "Senua's Saga: Hellblade II", year: 2024, description: "Cinematic action with photorealistic character rendering." },
  { slug: "prince-of-persia-lost-crown", title: "Prince of Persia: The Lost Crown", year: 2024, description: "Metroidvania action platformer with stylized visuals." },
  { slug: "tekken-8", title: "Tekken 8", year: 2024, description: "Next-gen fighting game with Unreal Engine 5 heat effects." },
  { slug: "alone-in-the-dark-2024", title: "Alone in the Dark (2024)", year: 2024, description: "Survival horror reboot with detailed gothic environments." },
  { slug: "persona-3-reload", title: "Persona 3 Reload", year: 2024, description: "JRPG remake with modern Unreal Engine visuals." },
  { slug: "silent-hill-2-remake", title: "Silent Hill 2 Remake", year: 2024, description: "Survival horror remake with ray tracing and DLSS." },
  { slug: "call-of-duty-black-ops-6", title: "Call of Duty: Black Ops 6", year: 2024, description: "Campaign and multiplayer FPS with omnimovement." },
  { slug: "metaphor-refantazio", title: "Metaphor: ReFantazio", year: 2024, description: "JRPG from Atlus with stylish turn-based combat." },
  { slug: "space-marine-2", title: "Warhammer 40,000: Space Marine 2", year: 2024, description: "Third-person action with massive Tyranid hordes." },
  { slug: "avowed", title: "Avowed", year: 2024, description: "First-person fantasy RPG from Obsidian with detailed world." },
  { slug: "kingdom-come-deliverance-2", title: "Kingdom Come: Deliverance II", year: 2024, description: "Realistic medieval RPG with large open world." },
  { slug: "granblue-fantasy-relink", title: "Granblue Fantasy: Relink", year: 2024, description: "Action RPG with 4-player co-op and large boss fights." },
  { slug: "ghost-of-tsushima", title: "Ghost of Tsushima Director's Cut", year: 2024, description: "Open-world samurai action — PC port with DLSS 3." },
  { slug: "until-dawn-remake", title: "Until Dawn Remake", year: 2024, description: "Horror narrative adventure remade in Unreal Engine 5." },
  { slug: "stellar-blade", title: "Stellar Blade", year: 2024, description: "Action-adventure with detailed character models — PC port." },

  // 2025
  { slug: "monster-hunter-wilds", title: "Monster Hunter Wilds", year: 2025, description: "Open-zone action RPG with seamless monster hunts." },
  { slug: "assassins-creed-shadows", title: "Assassin's Creed Shadows", year: 2025, description: "Feudal Japan open world with dual protagonists." },
  { slug: "doom-the-dark-ages", title: "DOOM: The Dark Ages", year: 2025, description: "Medieval DOOM with large-scale demon battles." },
  { slug: "clair-obscur-expedition-33", title: "Clair Obscur: Expedition 33", year: 2025, description: "Turn-based RPG with real-time action and stunning visuals." },
  { slug: "split-fiction", title: "Split Fiction", year: 2025, description: "Co-op action-adventure from Hazelight with genre-shifting levels." },
  { slug: "mafia-the-old-country", title: "Mafia: The Old Country", year: 2025, description: "Prequel set in 1900s Sicily with cinematic storytelling." },
  { slug: "civilization-vii", title: "Sid Meier's Civilization VII", year: 2025, description: "4X strategy with ages system — CPU scales with empire size." },
  { slug: "borderlands-4", title: "Borderlands 4", year: 2025, description: "Looter-shooter sequel with new vault hunters and open zones." },
  { slug: "death-stranding-2", title: "Death Stranding 2: On the Beach", year: 2025, description: "Open-world delivery sim sequel — PC port." },
  { slug: "ninja-gaiden-4", title: "Ninja Gaiden 4", year: 2025, description: "Fast action hack-and-slash demanding high frame rates." },
];

// Remove duplicate slug if any slipped in
const seen = new Set<string>();
export const games: Game[] = aaaGames
  .filter((g) => {
    if (seen.has(g.slug)) return false;
    seen.add(g.slug);
    return true;
  })
  .map((game) => ({
    ...game,
    genre: getGameGenre(game.slug),
  }));

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}

export function getGamesByGenre(genre: GameGenre): Game[] {
  return games.filter((g) => g.genre === genre);
}

export function getGameSlugs(): string[] {
  return games.map((g) => g.slug);
}
