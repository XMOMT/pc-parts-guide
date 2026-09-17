import Link from "next/link";
import type { WorkloadSlug } from "@/lib/workload-pages/types";

const creditBySlug: Partial<Record<WorkloadSlug, string>> = {
  "photo-editing": "Photos: Unsplash (see Image credits).",
  "video-editing": "Photos: Unsplash (see Image credits).",
  "3d-rendering":
    "Cover screenshot: Wikimedia Commons / CC BY-SA 4.0. Background: Unsplash.",
};

type WorkloadPhotoCreditProps = {
  slug: WorkloadSlug;
};

export default function WorkloadPhotoCredit({ slug }: WorkloadPhotoCreditProps) {
  const text = creditBySlug[slug];
  if (!text) return null;

  return (
    <p className="mt-2 max-w-3xl text-xs text-surface-200/40">
      {text}{" "}
      <Link href="/credits" className="text-brand-400/80 hover:text-brand-300">
        Image credits
      </Link>
    </p>
  );
}
