import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { COMPANY } from "@/lib/site-data";
import { createPageHead } from "@/lib/seo";
import { LegalBody, LegalSection } from "@/components/site/LegalBody";

export const Route = createFileRoute("/terms")({
  head: () =>
    createPageHead({
      title: "Terms of Use | Shammah Innovation Holdings",
      description:
        "The terms that govern use of the Shammah Innovation Holdings website, quotations, electronic communications and intellectual property.",
      path: "/terms",
    }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        description="The conditions on which we make this website and its content available to you."
        breadcrumb="Terms"
      />
      <LegalBody updated="Last reviewed: September 2026">
        <LegalSection title="1. Acceptance">
          <p>
            By accessing this website you agree to these terms. If you do not agree, please do not
            use the site. These terms are governed by the laws of the Republic of South Africa and
            are subject to the jurisdiction of South African courts.
          </p>
        </LegalSection>

        <LegalSection title="2. Company information (ECTA section 43)">
          <ul>
            <li>Registered name: {COMPANY.name}</li>
            <li>Registration number: {COMPANY.registration}</li>
            <li>Physical and postal address: {COMPANY.address}</li>
            <li>
              Telephone: {COMPANY.phone} · Email: {COMPANY.email}
            </li>
            <li>Website: this website, operated by {COMPANY.name}</li>
          </ul>
        </LegalSection>

        <LegalSection title="3. Information on this site">
          <p>
            Content is provided for general information about our divisions and capabilities. While
            we take care to keep it accurate, it does not constitute professional, engineering,
            medical, legal or financial advice, and it is not an offer capable of acceptance. Always
            obtain a written quotation or scope of work before relying on pricing, timelines or
            technical detail.
          </p>
        </LegalSection>

        <LegalSection title="4. Quotations and contracts">
          <p>
            Quotations are valid for the period stated, are subject to written acceptance, and are
            based on the information you supply. Scope changes, site conditions or material price
            movements are dealt with through a written variation. Work is performed subject to our
            standard conditions of contract, provided with each quotation.
          </p>
        </LegalSection>

        <LegalSection title="5. Electronic communications">
          <p>
            You consent to receiving communications from us electronically in response to your
            enquiry, in accordance with the Electronic Communications and Transactions Act, 25 of
            2002. Electronic quotations, acceptances and signatures have the same effect as their
            paper equivalents unless the law requires otherwise.
          </p>
        </LegalSection>

        <LegalSection title="6. Intellectual property">
          <p>
            All text, images, layout, logos and design on this site belong to {COMPANY.name} or its
            licensors and may not be copied, reproduced or reused without written permission, except
            for ordinary personal or internal business reference.
          </p>
        </LegalSection>

        <LegalSection title="7. Third-party links">
          <p>
            Links to third-party sites or services are provided for convenience. We do not control
            those sites and are not responsible for their content, security or privacy practices.
          </p>
        </LegalSection>

        <LegalSection title="8. Limitation of liability">
          <p>
            To the extent permitted by law, we are not liable for any indirect or consequential loss
            arising from use of this website or reliance on its content, or from interruptions,
            errors or unavailability of the site. Nothing in these terms limits liability that cannot
            lawfully be limited, including under the Consumer Protection Act, 68 of 2008.
          </p>
        </LegalSection>

        <LegalSection title="9. Acceptable use">
          <p>
            You may not attempt to gain unauthorised access to our systems, submit unlawful or
            harmful content, scrape the site at scale, or interfere with its operation. Unauthorised
            access is an offence under the Cybercrimes Act, 19 of 2020.
          </p>
        </LegalSection>

        <LegalSection title="10. Privacy">
          <p>
            Personal information is processed as set out in our{" "}
            <Link to="/privacy" className="font-semibold text-navy underline">
              Privacy Notice
            </Link>
            . Access to records is dealt with in our{" "}
            <Link to="/paia" className="font-semibold text-navy underline">
              PAIA information
            </Link>
            .
          </p>
        </LegalSection>

        <LegalSection title="11. Changes">
          <p>
            We may update these terms from time to time. The version published on this page applies
            to your use of the site.
          </p>
        </LegalSection>
      </LegalBody>
    </SiteLayout>
  );
}
