import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { COMPANY } from "@/lib/site-data";
import { createPageHead } from "@/lib/seo";
import { LegalBody, LegalSection } from "@/components/site/LegalBody";

export const Route = createFileRoute("/privacy")({
  head: () =>
    createPageHead({
      title: "Privacy Notice (POPIA) | Shammah Innovation Holdings",
      description:
        "How Shammah Innovation Holdings collects, uses, stores and protects personal information in line with South Africa's Protection of Personal Information Act.",
      path: "/privacy",
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Legal"
        title="Privacy Notice"
        description="How we process personal information under the Protection of Personal Information Act, 4 of 2013 (POPIA)."
        breadcrumb="Privacy"
      />
      <LegalBody updated="Last reviewed: September 2026">
        <LegalSection title="1. Who we are">
          <p>
            {COMPANY.name} (Reg. No. {COMPANY.registration}), of {COMPANY.address}, is the
            responsible party for the personal information processed through this website and in the
            course of our business. Contact us at {COMPANY.email} or {COMPANY.phone}.
          </p>
        </LegalSection>

        <LegalSection title="2. Information Officer">
          <p>
            Our Information Officer is registered with the Information Regulator (South Africa) and
            is accountable for POPIA compliance, this notice, and our PAIA manual. All privacy
            requests, questions and complaints should be sent to {COMPANY.email} marked "Attention:
            Information Officer".
          </p>
        </LegalSection>

        <LegalSection title="3. Personal information we collect">
          <ul>
            <li>
              <strong>Enquiry and quotation details</strong> — name, company, email address, phone
              number, service required, quantities, budget indication, timeline, site location and
              the message you send us.
            </li>
            <li>
              <strong>Contract and supplier information</strong> — company registration, tax and
              B-BBEE details, banking details and authorised contact persons, where we do business
              together.
            </li>
            <li>
              <strong>Technical information</strong> — limited log data such as IP address, browser
              type and pages visited, used to keep the website secure and available.
            </li>
            <li>
              <strong>Occupational health information</strong> — where our Medical &amp;
              Occupational Health division is contracted, health data is special personal
              information and is processed only by qualified practitioners under strict
              confidentiality, with the data subject's consent or as authorised by law.
            </li>
          </ul>
          <p>
            We do not knowingly collect information from children and we ask you not to send us
            personal information you do not need to share.
          </p>
        </LegalSection>

        <LegalSection title="4. Why we process it (lawful basis)">
          <ul>
            <li>Your consent, given when you submit a form on this website.</li>
            <li>To conclude or perform a contract with you, including quoting and delivery.</li>
            <li>Our legitimate interests in running, securing and improving our business.</li>
            <li>
              Compliance with legal obligations — tax, company, occupational health and safety, and
              record-keeping law.
            </li>
          </ul>
          <p>
            We will not use your information for a new, incompatible purpose without telling you
            first.
          </p>
        </LegalSection>

        <LegalSection title="5. Sharing your information">
          <p>
            We share personal information only where necessary: with employees and division teams
            handling your request; with vetted operators who host our website, database and email;
            with professional advisers, insurers and underwriters where relevant to your instruction;
            and with regulators or courts where the law requires it. Every operator is bound by a
            written agreement to process information only on our instruction and to keep it secure.
          </p>
        </LegalSection>

        <LegalSection title="6. Cross-border transfer">
          <p>
            Our website, database and email are hosted with reputable cloud providers that may store
            data outside South Africa. Where that happens, we rely on section 72 of POPIA and
            contractual safeguards requiring a level of protection substantially similar to POPIA.
          </p>
        </LegalSection>

        <LegalSection title="7. Security safeguards">
          <p>
            Access to enquiry records is restricted to authorised staff through individual accounts,
            role-based permissions and database-level access rules. Data is transmitted over
            encrypted connections and stored on managed infrastructure. If a security compromise
            affecting your personal information occurs, we will notify you and the Information
            Regulator as required by section 22 of POPIA.
          </p>
        </LegalSection>

        <LegalSection title="8. Retention">
          <p>
            Enquiries are retained while we deal with your request and for as long as needed for our
            business records or as required by law, after which they are deleted or de-identified.
            Contract and financial records are typically kept for five years as required by South
            African tax and company legislation.
          </p>
        </LegalSection>

        <LegalSection title="9. Your rights">
          <ul>
            <li>Ask what personal information we hold about you and request a copy.</li>
            <li>Ask us to correct, update or delete information that is wrong or excessive.</li>
            <li>Object to processing based on legitimate interests.</li>
            <li>Withdraw consent at any time, without affecting lawful processing before then.</li>
            <li>Ask us to stop sending you direct marketing.</li>
            <li>
              Lodge a complaint with the Information Regulator (South Africa) — enquiries@inforegulator.org.za.
            </li>
          </ul>
          <p>
            Send requests to {COMPANY.email}. We may ask for proof of identity and will respond
            within a reasonable time, normally 30 days.
          </p>
        </LegalSection>

        <LegalSection title="10. Cookies">
          <p>
            We use essential cookies to keep the website working and secure, and analytics cookies
            only where you accept them in our cookie banner. You can change your choice at any time
            by clearing this site's data in your browser and making a new selection.
          </p>
        </LegalSection>

        <LegalSection title="11. Changes to this notice">
          <p>
            We may update this notice as our services or the law change. The current version is
            always published on this page. See also our{" "}
            <Link to="/terms" className="font-semibold text-navy underline">
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link to="/paia" className="font-semibold text-navy underline">
              PAIA information
            </Link>
            .
          </p>
        </LegalSection>
      </LegalBody>
    </SiteLayout>
  );
}
