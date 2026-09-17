import fs from "fs";
import path from "path";
import Link from "next/link";
import {
  gameImageCreditsIntro,
  rawgAttributionNotice,
  workloadImageCredits,
} from "@/lib/legal/image-credits";
import { siteConfig } from "@/lib/data";

type RawgSourceEntry = {
  rawgName?: string;
  rawgUrl?: string;
  fetchedAt?: string;
};

function loadRawgSources(): Record<string, RawgSourceEntry> | null {
  try {
    const filePath = path.join(process.cwd(), "public", "games", "image-sources.json");
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, "utf8")) as Record<string, RawgSourceEntry>;
  } catch {
    return null;
  }
}

export default function ImageCreditsContent() {
  const contactMailto = `mailto:${siteConfig.contactEmail}`;
  const rawgSources = loadRawgSources();
  const rawgEntries = rawgSources ? Object.entries(rawgSources) : [];

  return (
    <>
      <p>{gameImageCreditsIntro}</p>

      <h2>Game artwork</h2>
      <p>
        Game pages may show cover art and in-game screenshots. These images are not official
        marketing assets from us. Titles and imagery are used under nominative fair use to describe
        compatibility and performance — see our{" "}
        <Link href="/terms">Terms of Service</Link>.
      </p>

      {rawgEntries.length > 0 && (
        <>
          <h2>RAWG-sourced titles</h2>
          <p>
            <a href="https://rawg.io/apidocs" rel="noopener noreferrer">
              {rawgAttributionNotice}
            </a>
          </p>
          <ul>
            {rawgEntries.map(([slug, entry]) => (
              <li key={slug}>
                <strong className="text-surface-100">{entry.rawgName ?? slug}</strong>
                {entry.rawgUrl ? (
                  <>
                    {" "}
                    —{" "}
                    <a href={entry.rawgUrl} rel="noopener noreferrer">
                      RAWG listing
                    </a>
                  </>
                ) : null}
                {entry.fetchedAt ? ` (fetched ${entry.fetchedAt})` : null}
              </li>
            ))}
          </ul>
        </>
      )}

      <h2>Workload photography</h2>
      <ul>
        {workloadImageCredits.map((entry) => (
          <li key={entry.slug}>
            <strong className="text-surface-100">{entry.label}:</strong> {entry.detail}
          </li>
        ))}
      </ul>
      <p>
        Unsplash license:{" "}
        <a href="https://unsplash.com/license" rel="noopener noreferrer">
          unsplash.com/license
        </a>
        . Blender screenshot:{" "}
        <a
          href="https://creativecommons.org/licenses/by-sa/4.0/"
          rel="noopener noreferrer"
        >
          CC BY-SA 4.0
        </a>
        .
      </p>

      <h2>Contact</h2>
      <p>
        Image or attribution corrections:{" "}
        <a href={contactMailto}>{siteConfig.contactEmail}</a> or{" "}
        <Link href="/contact">Contact</Link>.
      </p>
    </>
  );
}
