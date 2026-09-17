import Link from "next/link";
import { siteConfig } from "@/lib/data";

export default function AdChoicesContent() {
  return (
    <>
      <p>
        {siteConfig.name} may display third-party advertisements. Ad partners may use cookies and
        similar technologies to deliver and measure ads, including interest-based advertising.
      </p>

      <h2>Your choices</h2>
      <ul>
        <li>
          Use the cookie banner on this site to accept or reject non-essential cookies used for ads
          and analytics.
        </li>
        <li>
          Google ad settings:{" "}
          <a href="https://adssettings.google.com/" rel="noopener noreferrer">
            adssettings.google.com
          </a>
        </li>
        <li>
          Digital Advertising Alliance (US):{" "}
          <a href="https://optout.aboutads.info/" rel="noopener noreferrer">
            optout.aboutads.info
          </a>
        </li>
        <li>
          Network Advertising Initiative:{" "}
          <a href="https://optout.networkadvertising.org/" rel="noopener noreferrer">
            optout.networkadvertising.org
          </a>
        </li>
        <li>
          European Interactive Digital Advertising Alliance:{" "}
          <a href="https://www.youronlinechoices.eu/" rel="noopener noreferrer">
            youronlinechoices.eu
          </a>
        </li>
      </ul>

      <h2>More information</h2>
      <p>
        See our <Link href="/privacy">Privacy Policy</Link> for how we and partners process data.
        Questions: <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>
    </>
  );
}
