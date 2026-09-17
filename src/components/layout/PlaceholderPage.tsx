import Link from "next/link";

type PlaceholderPageProps = {
  title: string;
  description: string;
  breadcrumbs?: { label: string; href: string }[];
};

export default function PlaceholderPage({
  title,
  description,
  breadcrumbs,
}: PlaceholderPageProps) {
  return (
    <div className="section-container py-16">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-surface-200/50">
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.href}>
              {i > 0 && <span className="mx-2">/</span>}
              {i < breadcrumbs.length - 1 ? (
                <Link href={crumb.href} className="hover:text-white">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-surface-200">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}

      <h1 className="section-title">{title}</h1>
      <p className="mt-4 max-w-2xl text-surface-200/70">{description}</p>
      <p className="mt-8 rounded-lg border border-dashed border-surface-800 bg-surface-900/50 p-6 text-sm text-surface-200/50">
        This is a placeholder page. Content will be added in a future update.
      </p>
    </div>
  );
}
