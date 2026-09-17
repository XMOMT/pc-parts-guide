"use client";

import Image from "next/image";
import { useState } from "react";

type GameCoverProps = {
  slug: string;
  title: string;
  src?: string;
  alt?: string;
};

function CoverPlaceholder({ title, slug }: { title: string; slug: string }) {
  const hue = slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % 360;

  return (
    <div
      className="flex aspect-[460/215] w-full max-w-3xl items-center justify-center rounded-xl"
      style={{
        backgroundImage: `linear-gradient(135deg, hsl(${hue} 40% 25%) 0%, hsl(${(hue + 40) % 360} 30% 15%) 100%)`,
      }}
    >
      <span className="px-4 text-center text-lg font-semibold text-white/50">{title}</span>
    </div>
  );
}

export default function GameCover({ slug, title, src, alt }: GameCoverProps) {
  const [failed, setFailed] = useState(false);
  const imageSrc = src ?? `/games/${slug}.jpg`;
  const imageAlt = alt ?? `${title} cover art`;

  return (
    <div className="mt-6 w-full max-w-3xl">
      {failed ? (
        <CoverPlaceholder title={title} slug={slug} />
      ) : (
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={460}
          height={215}
          className="h-auto w-full rounded-xl"
          sizes="(max-width: 768px) 100vw, 768px"
          priority
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
