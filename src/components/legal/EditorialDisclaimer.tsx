import Link from "next/link";

type EditorialDisclaimerProps = {
  className?: string;
  variant?: "default" | "compact";
};

export default function EditorialDisclaimer({
  className = "",
  variant = "default",
}: EditorialDisclaimerProps) {
  const text =
    variant === "compact"
      ? "Independent site — not affiliated with game publishers or hardware brands. Names and artwork are for identification only. Performance tiers are estimates."
      : "PC Parts Guide is independent and is not affiliated with, endorsed by, or sponsored by game publishers, hardware manufacturers, or retailers. Game names and artwork are used for identification and commentary only. FPS and hardware tiers are editorial estimates, not guarantees — see our Terms of Service.";

  return (
    <p
      className={`text-xs leading-relaxed text-surface-200/45 ${className}`}
      role="note"
    >
      {text}{" "}
      <Link href="/terms" className="text-brand-400/90 hover:text-brand-300">
        Terms
      </Link>
      {" · "}
      <Link href="/credits" className="text-brand-400/90 hover:text-brand-300">
        Image credits
      </Link>
    </p>
  );
}
