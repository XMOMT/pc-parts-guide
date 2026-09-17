import Link from "next/link";
import { siteConfig } from "@/lib/data";

export default function AboutContent() {
  return (
    <>
      <p>
        {siteConfig.name} helps you choose PC hardware based on the games you play and the creative
        work you do. We publish tiered CPU and GPU guidance — budget through high-end — with
        resolution, ray tracing, and workload complexity in mind.
      </p>

      <h2>How we recommend hardware</h2>
      <p>
        Recommendations combine published game specs, typical community benchmarks, and editorial
        judgment. They are starting points for research, not guaranteed frame rates or official
        compatibility certification.
      </p>

      <h2>Independence</h2>
      <p>
        We are not owned by a retailer or hardware vendor. We may earn money through advertising
        and affiliate links; that does not determine our tier rankings. See our{" "}
        <Link href="/terms">Terms of Service</Link> and affiliate disclosure on build guides.
      </p>

      <h2>Contact</h2>
      <p>
        Corrections, rights inquiries, or partnerships:{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a> or the{" "}
        <Link href="/contact">contact form</Link>.
      </p>
    </>
  );
}
