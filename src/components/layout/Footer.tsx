import Link from "next/link";
import AffiliateDisclosure from "@/components/legal/AffiliateDisclosure";
import EditorialDisclaimer from "@/components/legal/EditorialDisclaimer";
import { footerExploreLinks, footerLegal, siteConfig } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-auto border-t border-surface-700 bg-surface-950 shadow-[0_-16px_48px_rgba(0,0,0,0.55)]">
      <div className="section-container py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-lg font-bold text-white">{siteConfig.name}</p>
            <p className="mt-2 max-w-sm text-sm text-surface-200/70">
              Hardware recommendations based on the games you play and the work you do.
            </p>
            <EditorialDisclaimer className="mt-4" variant="compact" />
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-surface-200/50">
              Explore
            </h2>
            <ul className="mt-3 space-y-2">
              {footerExploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-surface-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/about" className="text-sm text-surface-200 hover:text-white">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-surface-200/50">
              Legal
            </h2>
            <ul className="mt-3 space-y-2">
              {footerLegal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-surface-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <AffiliateDisclosure className="mt-8" />

        <p className="mt-8 border-t border-surface-800 pt-6 text-center text-xs text-surface-200/55">
          &copy; 2026 {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
