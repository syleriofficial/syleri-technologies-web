import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy",
  description: "How the Syleri Technologies website handles information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      updated="2026-10-04"
      intro="This page explains what information the Syleri Technologies website handles. We have kept the site simple so that the answer is short."
    >
      <h2>Who we are</h2>
      <p>This website, syleritechnologies.com, is operated by Syleri Technologies.</p>

      <h2>What this website does not do</h2>
      <ul>
        <li>It has no user accounts, sign-in or contact forms.</li>
        <li>It does not use analytics, advertising or tracking tools.</li>
        <li>It does not set cookies of its own.</li>
        <li>It loads its fonts from this website, not from a third-party font service.</li>
      </ul>

      <h2>Information stored in your browser</h2>
      <p>
        If you choose a light or dark theme, that preference is saved in your browser&rsquo;s local storage so the site
        remembers it on your next visit. It stays on your device and is not sent to us. You can remove it at any time by
        clearing site data in your browser.
      </p>

      <h2>Technical information processed when you visit</h2>
      <p>
        Like any website, delivering these pages requires processing technical information such as your IP address,
        browser type and the pages requested. Our hosting provider may process this information, including in server
        logs, to serve the website and keep it secure. We do not use it to build profiles of visitors.
      </p>

      <h2>Purchases and third-party sites</h2>
      <p>
        When you select a purchase button for a product, you leave this website for a checkout page
        operated by Lemon Squeezy. Lemon Squeezy processes your order and payment details under its own terms and privacy
        policy. Syleri Technologies does not receive or store your full payment card details through this website.
      </p>
      <p>
        Product live demos run on separate websites. Other sites we link to have their own
        privacy practices, and we encourage you to review them.
      </p>

      <h2>If you contact us</h2>
      <p>
        If you contact us, we use the information you send — such as your name, contact details and message — to reply
        to you and handle your request.
      </p>

      <h2>Changes to this page</h2>
      <p>
        If the website starts handling information differently, we will update this page and the date at the top before
        the change takes effect.
      </p>

      <h2>Questions</h2>
      <p>
        For questions about this page, see our <Link href="/contact">contact page</Link>.
      </p>
    </LegalPage>
  );
}
