import Link from "next/link";

type AffiliateDisclosureProps = {
  className?: string;
};

/** FTC-style notice for pages with product recommendations / future buy links. */
export default function AffiliateDisclosure({ className = "" }: AffiliateDisclosureProps) {
  return (
    <p
      className={`rounded-lg border border-surface-800/80 bg-surface-900/40 px-4 py-3 text-xs leading-relaxed text-surface-200/60 ${className}`}
      role="note"
    >
      <strong className="font-medium text-surface-200/80">Affiliate disclosure:</strong> Some links
      on this site may be affiliate links. If you click and make a qualifying purchase, we may earn
      a commission at no extra cost to you. Our picks are editorial; affiliate relationships do not
      set our rankings.{" "}
      <Link href="/terms" className="text-brand-400/90 hover:text-brand-300">
        Terms of Service
      </Link>
    </p>
  );
}
