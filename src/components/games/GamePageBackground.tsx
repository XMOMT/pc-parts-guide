"use client";

import { useState } from "react";

type GamePageBackgroundProps = {
  slug: string;
};

/** Viewport-fixed background — hidden if artwork is missing or fails to load. */
export default function GamePageBackground({ slug }: GamePageBackgroundProps) {
  const [hidden, setHidden] = useState(false);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 h-[100dvh] w-full overflow-hidden"
      aria-hidden="true"
    >
      {!hidden && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/games/${slug}-bg.jpg`}
          alt=""
          decoding="async"
          fetchPriority="low"
          className="absolute left-1/2 top-0 h-full w-full min-h-[100dvh] min-w-full max-w-none -translate-x-1/2 object-cover object-center opacity-60"
          onError={() => setHidden(true)}
        />
      )}
      <div className="absolute inset-0 bg-surface-950/35" />
      <div className="absolute inset-0 bg-gradient-to-b from-surface-950/25 via-surface-950/50 to-surface-950/80" />
    </div>
  );
}
