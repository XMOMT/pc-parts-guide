"use client";

import Link from "next/link";
import { withBasePath } from "@/lib/base-path";
import { useMemo, useState } from "react";
import type { Game, GameGenre } from "@/lib/games";
import { gameGenres } from "@/lib/games";

type GamesListProps = {
  games: Game[];
};

const genreOrder = new Map(gameGenres.map((genre, index) => [genre, index]));

export default function GamesList({ games }: GamesListProps) {
  const [query, setQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState<GameGenre | "all">("all");

  const filtered = useMemo(() => {
    const lower = query.toLowerCase().trim();
    return games.filter((game) => {
      const matchesGenre = genreFilter === "all" || game.genre === genreFilter;
      const matchesQuery =
        !lower ||
        game.title.toLowerCase().includes(lower) ||
        game.slug.includes(lower.replace(/\s+/g, "-"));
      return matchesGenre && matchesQuery;
    });
  }, [games, query, genreFilter]);

  const grouped = useMemo(() => {
    const groups = new Map<GameGenre, Game[]>();
    for (const game of filtered) {
      const list = groups.get(game.genre) ?? [];
      list.push(game);
      groups.set(game.genre, list);
    }

    return [...groups.entries()]
      .sort(([a], [b]) => (genreOrder.get(a) ?? 0) - (genreOrder.get(b) ?? 0))
      .map(([genre, genreGames]) => [
        genre,
        [...genreGames].sort((a, b) => a.title.localeCompare(b.title)),
      ] as const);
  }, [filtered]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <label className="sr-only" htmlFor="games-search">
          Search games
        </label>
        <input
          id="games-search"
          type="search"
          placeholder="Search games…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-surface-800 bg-surface-900 px-4 py-2.5 text-sm text-white placeholder:text-surface-200/40 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 sm:max-w-sm"
        />

        <label className="sr-only" htmlFor="genre-filter">
          Filter by genre
        </label>
        <select
          id="genre-filter"
          value={genreFilter}
          onChange={(e) =>
            setGenreFilter(e.target.value === "all" ? "all" : (e.target.value as GameGenre))
          }
          className="rounded-lg border border-surface-800 bg-surface-900 px-4 py-2.5 text-sm text-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        >
          <option value="all">All genres</option>
          {gameGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-4 text-sm text-surface-200/50">
        Showing {filtered.length} of {games.length} AAA PC games
      </p>

      {grouped.length === 0 ? (
        <p className="mt-8 text-surface-200/60">No games match your search.</p>
      ) : (
        <div className="mt-8 space-y-10">
          {grouped.map(([genre, genreGames]) => (
            <section key={genre} aria-labelledby={`genre-${genre}`}>
              <h2
                id={`genre-${genre}`}
                className="text-xl font-bold text-white"
              >
                {genre}
                <span className="ml-2 text-sm font-normal text-surface-200/50">
                  ({genreGames.length})
                </span>
              </h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {genreGames.map((game) => (
                  <li key={game.slug}>
                    <Link
                      href={`/games/${game.slug}`}
                      className="card-hover group relative block min-h-[3.25rem] overflow-hidden rounded-lg border border-surface-800 px-4 py-3"
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center opacity-35 transition-opacity group-hover:opacity-45"
                        style={{
                          backgroundImage: `url("${withBasePath(`/games/${game.slug}.jpg`)}")`,
                        }}
                        aria-hidden="true"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-surface-950/90 via-surface-950/75 to-surface-950/60 transition-colors group-hover:from-surface-950/85 group-hover:via-surface-950/65 group-hover:to-surface-950/50"
                        aria-hidden="true"
                      />
                      <span className="relative z-10 font-medium text-white group-hover:text-brand-400">
                        {game.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
