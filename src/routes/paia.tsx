import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { COMPANY } from "@/lib/site-data";
import { createPageHead } from "@/lib/seo";
import { LegalBody, LegalSection } from "@/components/site/LegalBody";

export const Route = createFileRoute("/paia")({
  head: () =>
    createPageHead({
      title: "PAIA & Access to Information | Shammah Innovation Holdings",
      description:
        "Our Promotion of Access to Information Act manual summary, Information Officer details and how to request access to records.",
      path: "/paia",
    }),
  component: PaiaPage,
});

function PaiaPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Legal"
        title="PAIA Information"
        description="Access to records under the Promotion of Access to Information Act, 2 of 2000."
        breadcrumb="PAIA"
      />
      <LegalBody updated="Last reviewed: September 2026">
        <LegalSection title="1. Purpose of this page">
          <p>
            This is a summary of the PAIA manual of {COMPANY.name} (Reg. No. {COMPANY.registration}),
            prepared in terms of section 51 of PAIA and read together with POPIA. The full manual is
            available free of charge on request at our head office or by email.
          </p>
        </LegalSection>

        <LegalSection title="2. Information Officer">
          <p>
            The Information Officer is the chief executive of the company, supported by a deputy
            where designated. All PAIA and POPIA requests must be addressed to:
          </p>
          <ul>
            <li>Attention: The Information Officer, {COMPANY.name}</li>
            <li>Address: {COMPANY.address}</li>
            <li>Email: {COMPANY.email}</li>
            <li>Telephone: {COMPANY.phone}</li>
          </ul>
        </LegalSection>

        <LegalSection title="3. Records held">
          <ul>
            <li>Company statutory, governance and shareholding records.</li>
            <li>Financial, tax, payroll and banking records.</li>
            <li>Client contracts, quotations, project files and correspondence.</li>
            <li>Supplier and subcontractor records.</li>
            <li>Employee records, including occupational health and safety documentation.</li>
            <li>Insurance, risk, legal and compliance records.</li>
            <li>Marketing material, website content and enquiry records.</li>
          </ul>
          <p>
            Some records are available without a formal PAIA request — for example company profiles,
            published policies and marketing material. Others are automatically available under other
            legislation, such as records lodged with the Companies and Intellectual Property
            Commission or the South African Revenue Service.
          </p>
        </LegalSection>

        <LegalSection title="4. How to request a record">
          <ol className="ml-5 list-decimal space-y-2">
            <li>
              Complete the prescribed PAIA request form (Form C, published by the Information
              Regulator) or send a written request with the same detail.
            </li>
            <li>
              Identify the record, your right that the record is required to exercise or protect, and
              how you wish to receive it.
            </li>
            <li>Provide proof of identity and, where you act for another person, your authority.</li>
            <li>Submit the request to the Information Officer at the address above.</li>
          </ol>
          <p>
            We respond within 30 days, which may be extended once by a further 30 days with notice to
            you. Prescribed request and access fees may apply. If a request is refused, we give
            written reasons and explain how to appeal or approach the Information Regulator or a
            court.
          </p>
        </LegalSection>

        <LegalSection title="5. Grounds for refusal">
          <p>
            A request may be refused where PAIA requires it — for example to protect another person's
            privacy, third-party commercial information, confidential legal advice, records
            protected by law, or research information. Where possible we sever the protected parts
            and release the rest.
          </p>
        </LegalSection>

        <LegalSection title="6. Information Regulator">
          <p>
            Information Regulator (South Africa), JD House, 27 Stiemens Street, Braamfontein,
            Johannesburg. Email: enquiries@inforegulator.org.za. Complaints regarding PAIA or POPIA
            may be lodged directly with the Regulator.
          </p>
        </LegalSection>

        <LegalSection title="7. Related notices">
          <p>
            See our{" "}
            <Link to="/privacy" className="font-semibold text-navy underline">
              Privacy Notice
            </Link>{" "}
            and{" "}
            <Link to="/terms" className="font-semibold text-navy underline">
              Terms of Use
            </Link>
            .
          </p>
        </LegalSection>
      </LegalBody>
    </SiteLayout>
  );
}
