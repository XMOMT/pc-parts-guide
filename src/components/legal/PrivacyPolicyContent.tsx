import Link from "next/link";
import { siteConfig } from "@/lib/data";

export default function PrivacyPolicyContent() {
  const contactMailto = `mailto:${siteConfig.contactEmail}`;

  return (
    <>
      <p>
        This Privacy Policy describes how {siteConfig.name} (&quot;we,&quot; &quot;us,&quot; or
        &quot;our&quot;) collects, uses, and shares information when you visit{" "}
        <Link href="/">{siteConfig.url.replace(/^https?:\/\//, "")}</Link> (the &quot;Site&quot;) or
        otherwise interact with us.
      </p>

      <h2>Who we are</h2>
      <p>
        The Site is operated by {siteConfig.legalOperator} ({siteConfig.name}). For privacy-related
        questions or requests, contact us at{" "}
        <a href={contactMailto}>{siteConfig.contactEmail}</a> or through our{" "}
        <Link href="/contact">contact form</Link>.
      </p>

      <h2>Information we collect</h2>
      <p>We may collect the following types of information:</p>
      <ul>
        <li>
          <strong className="text-surface-100">Information you provide.</strong> When you use the
          contact form, we receive your name, email address, and message content so we can respond
          to your inquiry.
        </li>
        <li>
          <strong className="text-surface-100">Automatically collected data.</strong> Like most
          websites, our hosting and analytics or advertising partners may automatically receive
          technical data such as IP address, browser type, device type, operating system, referring
          URLs, pages viewed, and approximate location derived from IP address.
        </li>
        <li>
          <strong className="text-surface-100">Cookies and similar technologies.</strong> We and
          third parties may use cookies, pixels, and local storage to operate the Site, measure
          traffic, serve advertisements, and remember preferences. See the Cookies section below.
        </li>
        <li>
          <strong className="text-surface-100">Affiliate and purchase-related data.</strong> When
          you click an affiliate link, the retailer or affiliate network may assign a tracking
          identifier to attribute a qualifying purchase to us. We do not receive your full payment
          card details from those partners; we may receive aggregated or transaction-level reports
          (for example, that a purchase occurred and a commission was earned).
        </li>
      </ul>

      <h2>How we use information</h2>
      <p>We use information to:</p>
      <ul>
        <li>Operate, maintain, and improve the Site and our content;</li>
        <li>Respond to contact form messages and communicate with you;</li>
        <li>Display advertisements and measure ad performance;</li>
        <li>Track affiliate referrals and comply with affiliate program rules;</li>
        <li>Understand how visitors use the Site (analytics);</li>
        <li>Detect abuse, fraud, or security issues; and</li>
        <li>Comply with legal obligations.</li>
      </ul>

      <h2>Legal bases (EEA, UK, and similar regions)</h2>
      <p>
        If you are in the European Economic Area, the United Kingdom, or another jurisdiction that
        requires a legal basis for processing, we rely on: (a) <strong className="text-surface-100">consent</strong>{" "}
        where required for non-essential cookies and certain advertising; (b){" "}
        <strong className="text-surface-100">contract</strong> or steps at your request when you
        contact us; (c) <strong className="text-surface-100">legitimate interests</strong> in
        operating and improving the Site, securing it, and running advertising and affiliate
        programs, balanced against your rights; and (d){" "}
        <strong className="text-surface-100">legal obligation</strong> where applicable.
      </p>

      <h2>Advertising</h2>
      <p>
        We may show ads from third-party ad networks (for example, Google AdSense or other
        programmatic providers). Those partners may use cookies and similar technologies to serve
        ads based on your visits to this Site and other sites, to limit how often you see an ad,
        and to measure effectiveness. Personalized ads may be considered &quot;selling&quot; or
        &quot;sharing&quot; of personal information under some U.S. state laws; where required, we
        will provide appropriate notices and opt-out mechanisms.
      </p>
      <p>
        You can learn more about how Google uses data at{" "}
        <a href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer">
          Google&apos;s partner sites policy
        </a>
        . Industry opt-out tools include the{" "}
        <a href="https://optout.aboutads.info/" rel="noopener noreferrer">
          Digital Advertising Alliance
        </a>{" "}
        and the{" "}
        <a href="https://optout.networkadvertising.org/" rel="noopener noreferrer">
          Network Advertising Initiative
        </a>
        .
      </p>

      <h2>Affiliate links</h2>
      <p>
        Product links on the Site may be affiliate links. If you click such a link and complete a
        qualifying purchase, we may earn a commission. Affiliate partners and retailers may collect
        data under their own privacy policies. Our recommendations are editorial; affiliate
        relationships are disclosed in our{" "}
        <Link href="/terms">Terms of Service</Link>.
      </p>

      <h2>How we share information</h2>
      <p>We may share information with:</p>
      <ul>
        <li>
          <strong className="text-surface-100">Form delivery.</strong> Contact form submissions
          are processed by FormSubmit (formsubmit.co) to deliver email to us.
        </li>
        <li>
          <strong className="text-surface-100">Advertising and analytics providers</strong> as
          described above.
        </li>
        <li>
          <strong className="text-surface-100">Affiliate networks and retailers</strong> when you
          use affiliate links.
        </li>
        <li>
          <strong className="text-surface-100">Service providers</strong> that help us host or
          operate the Site, subject to confidentiality obligations.
        </li>
        <li>
          <strong className="text-surface-100">Authorities or others</strong> when required by law
          or to protect rights, safety, and security.
        </li>
      </ul>
      <p>We do not sell your contact form contents to third parties for their marketing.</p>

      <h2>Cookies</h2>
      <p>
        Cookies are small files stored on your device. We use essential cookies needed for basic
        Site function. With your consent where required, we and partners may use analytics and
        advertising cookies. When you first visit, our cookie banner lets you accept or reject
        non-essential cookies; your choice is stored in your browser. You can also control cookies
        through browser settings; blocking cookies may affect Site features and ad personalization.
      </p>

      <h2>Retention</h2>
      <p>
        We keep contact messages as long as needed to respond and for our records, unless you ask
        us to delete them sooner. Log and analytics data is typically retained for a limited period
        according to our providers&apos; settings. Affiliate reporting may be retained as required
        by program terms and tax or accounting rules.
      </p>

      <h2>International transfers</h2>
      <p>
        We and our service providers may process data in countries other than your own, including
        the United States. Where required, we rely on appropriate safeguards such as standard
        contractual clauses or equivalent mechanisms.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have rights to access, correct, delete, or restrict
        processing of your personal data, to object to certain processing, to withdraw consent, and
        to data portability. You may also have the right to lodge a complaint with a supervisory
        authority. To exercise rights, email{" "}
        <a href={contactMailto}>{siteConfig.contactEmail}</a>. We may need to verify your request.
      </p>

      <h2>Children</h2>
      <p>
        The Site is not directed at children under 16 (or the age required in your jurisdiction).
        We do not knowingly collect personal data from children. If you believe a child has provided
        data to us, contact us and we will take appropriate steps to delete it.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at
        the top will change when we do. Continued use of the Site after changes means you accept
        the updated policy.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this Privacy Policy:{" "}
        <a href={contactMailto}>{siteConfig.contactEmail}</a> or{" "}
        <Link href="/contact">Contact</Link>.
      </p>
    </>
  );
}
