import Link from "next/link";
import type { ReactNode } from "react";

type LegalDocumentLayoutProps = {
  title: string;
  description: string;
  lastUpdated: string;
  children: ReactNode;
};

export const legalBodyClass =
  "max-w-3xl space-y-3 text-sm leading-relaxed text-surface-200/75 [&_a]:text-brand-400 [&_a]:underline-offset-2 hover:[&_a]:text-brand-300 [&_h2]:mb-2 [&_h2]:mt-10 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-white [&_h2:first-of-type]:mt-6 [&_li]:ml-4 [&_li]:list-disc [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_ul]:space-y-2 [&_ul]:pl-5";

export default function LegalDocumentLayout({
  title,
  description,
  lastUpdated,
  children,
}: LegalDocumentLayoutProps) {
  return (
    <div className="section-container py-16">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-surface-200/50">
        <Link href="/" className="hover:text-white">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-surface-200">{title}</span>
      </nav>

      <h1 className="section-title">{title}</h1>
      <p className="mt-4 max-w-2xl text-surface-200/70">{description}</p>
      <p className="mt-2 text-xs text-surface-200/45">Last updated: {lastUpdated}</p>

      <article className={legalBodyClass}>{children}</article>
    </div>
  );
}
