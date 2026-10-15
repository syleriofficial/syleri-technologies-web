import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Terms",
  description: "Terms of use for the Syleri Technologies website: product licenses, website content, acceptable use, accuracy, liability and changes.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms"
      updated="2026-10-01"
      intro="These terms apply to your use of the Syleri Technologies website. By using the website, you agree to them."
    >
      <h2>About these terms</h2>
      <p>
        These terms cover this website only. They do not grant any license to Syleri Technologies products and do not
        replace any product license.
      </p>

      <h2>Products and licenses</h2>
      <p>
        Your use of any Syleri Technologies product is governed by the license that applies to that
        product. Product pages on this website summarize license terms for convenience; where a summary and the product
        license differ, the product license applies.
      </p>
      <p>
        Purchases are completed through Lemon Squeezy, and the checkout process is also subject to Lemon Squeezy&rsquo;s
        own terms.
      </p>

      <h2>Website content</h2>
      <p>
        The content of this website — including text, design and product descriptions — belongs to Syleri Technologies
        unless stated otherwise. You may view and share links to it, but you may not copy or republish substantial parts
        of it without permission.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Do not attempt to disrupt the website, gain unauthorized access to it, or use it for any unlawful purpose.
      </p>

      <h2>Accuracy</h2>
      <p>
        We work to keep product information accurate and up to date, including what each product does and does not
        include. The website is nonetheless provided &ldquo;as is&rdquo;, and we may change, correct or remove content at
        any time.
      </p>

      <h2>Links to other websites</h2>
      <p>
        This website links to sites we do not control, such as checkout pages and product demos. We are not responsible
        for their content or practices.
      </p>

      <h2>Liability</h2>
      <p>
        To the extent permitted by applicable law, Syleri Technologies is not liable for any loss arising from your use
        of this website. Nothing in these terms limits any rights you have that cannot be limited by law.
      </p>

      <h2>Changes to these terms</h2>
      <p>We may update these terms from time to time. The date at the top of this page shows when they last changed.</p>

      <h2>Questions</h2>
      <p>
        For questions about these terms, see our <Link href="/contact">contact page</Link>.
      </p>
    </LegalPage>
  );
}
