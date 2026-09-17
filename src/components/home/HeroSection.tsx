import Link from "next/link";
import HeroGameCollage from "@/components/home/HeroGameCollage";
import SearchBar from "@/components/home/SearchBar";
import { quickLinks } from "@/lib/data";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-surface-800 bg-surface-950 py-16 sm:py-24">
      <HeroGameCollage />

      <div className="section-container relative z-10 text-center">
        <h1 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Find the right PC for your games and workloads
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-surface-200/70 sm:text-lg">
          Search any title or use case for tiered hardware guidance — editorial estimates to
          help you research before you buy.
        </p>

        <div className="mt-10">
          <SearchBar />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm text-surface-200/50">Try:</span>
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-surface-800 bg-surface-900 px-3.5 py-1.5 text-sm text-surface-200 transition-colors hover:border-brand-500/40 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
