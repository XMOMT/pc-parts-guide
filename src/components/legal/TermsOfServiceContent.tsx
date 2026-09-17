import Link from "next/link";
import { siteConfig } from "@/lib/data";

export default function TermsOfServiceContent() {
  const contactMailto = `mailto:${siteConfig.contactEmail}`;

  return (
    <>
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your access to and use of{" "}
        {siteConfig.name} at <Link href="/">{siteConfig.url}</Link> (the &quot;Site&quot;). By
        using the Site, you agree to these Terms. If you do not agree, do not use the Site.
      </p>

      <h2>About the Site</h2>
      <p>
        {siteConfig.name} publishes hardware guides, game performance recommendations, and
        workload-related content for informational purposes. We strive for accuracy but hardware,
        drivers, games, and prices change frequently.
      </p>

      <h2>Not professional advice</h2>
      <p>
        Content on the Site is general information only. It is not professional, financial,
        engineering, or purchasing advice. You are responsible for verifying compatibility,
        specifications, and suitability before buying components or changing system settings.
        Building and modifying PCs involves risk; follow manufacturer instructions and applicable
        safety practices.
      </p>

      <h2>Affiliate disclosure</h2>
      <p>
        Some links on the Site are affiliate links. If you click a link and make a qualifying
        purchase, we may earn a commission from the retailer or affiliate network. This does not
        increase the price you pay. Affiliate earnings help support the Site.
      </p>
      <p>
        Our product suggestions and tier rankings are based on our editorial criteria (performance,
        value, use case). Affiliate relationships do not dictate which products we recommend, but
        we may not list every alternative on the market. Where a link is affiliate-enabled, it will
        be subject to the retailer&apos;s terms and privacy policy.
      </p>

      <h2>Advertising</h2>
      <p>
        The Site may display third-party advertisements. Ads are provided by ad networks and
        advertisers we do not control. We are not responsible for the content of ads or for
        products or services advertised. Your interactions with advertisers are solely between you
        and them. See our <Link href="/privacy">Privacy Policy</Link> for how advertising partners
        may use data.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The Site&apos;s text, layout, branding, and original graphics are owned by us or our
        licensors and protected by copyright and other laws. You may view and share links to our
        pages for personal, non-commercial use. You may not scrape, republish large portions of
        the Site, use our content in competing products, or remove copyright notices without
        permission.
      </p>
      <p>
        Game titles, trademarks, and logos belong to their respective owners. We use them for
        identification and commentary only; we are not endorsed by those rights holders unless
        stated otherwise.
      </p>

      <h2>User conduct</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the Site in violation of any law or third-party rights;</li>
        <li>Attempt to gain unauthorized access to our systems or interfere with Site operation;</li>
        <li>Submit false, abusive, or spam content through the contact form;</li>
        <li>Use automated means to access the Site in a way that imposes unreasonable load; or</li>
        <li>Misrepresent your affiliation with us.</li>
      </ul>

      <h2>Third-party links and services</h2>
      <p>
        The Site links to retailers, documentation, and other third-party sites. We do not control
        and are not responsible for their content, availability, or practices. Your use of
        third-party sites is at your own risk and subject to their terms.
      </p>

      <h2>Disclaimer of warranties</h2>
      <p>
        THE SITE AND ALL CONTENT ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot;
        WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF
        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT
        THAT THE SITE WILL BE ERROR-FREE, UNINTERRUPTED, OR THAT RECOMMENDATIONS WILL MEET YOUR
        EXPECTATIONS OR ACHIEVE SPECIFIC FRAME RATES OR PERFORMANCE RESULTS.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE AND OUR OPERATORS, SUPPLIERS, AND PARTNERS WILL
        NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR
        ANY LOSS OF PROFITS, DATA, GOODWILL, OR HARDWARE DAMAGE, ARISING FROM YOUR USE OF THE SITE
        OR RELIANCE ON ITS CONTENT, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH
        DAMAGES. OUR TOTAL LIABILITY FOR ANY CLAIM RELATING TO THE SITE SHALL NOT EXCEED THE
        GREATER OF (A) THE AMOUNT YOU PAID US DIRECTLY FOR USE OF THE SITE IN THE TWELVE MONTHS
        BEFORE THE CLAIM (TYPICALLY ZERO FOR FREE ACCESS) OR (B) ONE HUNDRED U.S. DOLLARS (USD
        100).
      </p>
      <p>
        Some jurisdictions do not allow certain limitations; in those cases, our liability is
        limited to the fullest extent permitted by law.
      </p>

      <h2>Indemnity</h2>
      <p>
        You agree to indemnify and hold harmless us and our operators from claims, damages, and
        expenses (including reasonable legal fees) arising from your misuse of the Site or violation
        of these Terms.
      </p>

      <h2>Changes to the Site and Terms</h2>
      <p>
        We may modify, suspend, or discontinue any part of the Site at any time. We may update
        these Terms by posting a revised version with a new &quot;Last updated&quot; date. Material
        changes may also be noted on the Site where practical. Continued use after changes
        constitutes acceptance.
      </p>

      <h2>Governing law and disputes</h2>
      <p>
        These Terms are governed by the laws applicable to the operator of the Site, without regard
        to conflict-of-law rules. Any dispute shall be resolved in the courts of that jurisdiction,
        unless mandatory consumer protection laws in your country require otherwise. If you are a
        consumer in the EU or UK, you may also have rights under local law that cannot be waived by
        contract.
      </p>

      <h2>Severability</h2>
      <p>
        If any provision of these Terms is held invalid, the remaining provisions remain in effect.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these Terms: <a href={contactMailto}>{siteConfig.contactEmail}</a> or{" "}
        <Link href="/contact">Contact</Link>.
      </p>
    </>
  );
}
