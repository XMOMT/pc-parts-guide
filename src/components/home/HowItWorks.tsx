import { howItWorksSteps } from "@/lib/data";

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-20" aria-labelledby="how-it-works-heading">
      <div className="section-container">
        <h2 id="how-it-works-heading" className="section-title text-center">
          How this site works
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-surface-200/70">
          No guesswork — just clear hardware guidance based on what you actually use your PC for.
        </p>

        <ol className="mt-12 grid gap-8 sm:grid-cols-3">
          {howItWorksSteps.map((item) => (
            <li key={item.step} className="relative text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-lg font-bold text-white">
                {item.step}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-surface-200/60">{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
