import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero, SectionHeading } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { COMPANY } from "@/lib/site-data";
import { createPageHead } from "@/lib/seo";

const FAQ_GROUPS = [
  {
    heading: "Working with us",
    items: [
      {
        q: "What services does Shammah Innovation Holdings provide?",
        a: "We operate seven divisions: IT & Design Services, Built Environment, Integrated Engineering, Agriculture & Agri-Tech, Medical & Occupational Health, Logistics & Transport, and Insurance, Risk, Legal & Compliance. Each division can be contracted on its own or combined into a single turnkey package.",
      },
      {
        q: "Where do you operate?",
        a: `Our head office is in ${COMPANY.address}. Project teams mobilise nationally across all nine provinces of South Africa.`,
      },
      {
        q: "Do you work with small projects as well as large contracts?",
        a: "Yes. We deliver everything from single-site maintenance and once-off supply to multi-disciplinary infrastructure programmes. Scope, quantities and timelines determine the team we assign.",
      },
      {
        q: "Are you registered and compliant?",
        a: `Yes. Shammah Innovation Holdings is a registered South African company (Reg. No. ${COMPANY.registration}). Compliance documents, tax and statutory certificates are supplied with every formal quotation or tender submission on request.`,
      },
    ],
  },
  {
    heading: "Quotes and projects",
    items: [
      {
        q: "How do I get a quotation?",
        a: "Complete the Get a Quote form with your scope, quantities, location and timeline. The relevant division reviews the request, clarifies any technical details with you, and issues an itemised proposal with lead times.",
      },
      {
        q: "How quickly will I hear back?",
        a: "We acknowledge every enquiry within one business day. Straightforward supply quotes are usually issued within 48 hours; multi-discipline or site-dependent proposals may require a site visit first.",
      },
      {
        q: "Is a quotation binding?",
        a: "A quotation is valid for the period stated on the document and is subject to written acceptance. Material price movements, scope changes or site conditions discovered after acceptance are handled through a formal variation.",
      },
      {
        q: "Can you support tenders and RFPs?",
        a: "Yes. We assist with tender documentation, compliance packs, pricing schedules and consortium arrangements. See our Tender Support page for details.",
      },
    ],
  },
  {
    heading: "Privacy and data",
    items: [
      {
        q: "What personal information do you collect through this website?",
        a: "Only what you give us in the contact and quote forms — your name, company, email address, phone number and the details of your enquiry — plus limited technical information needed to keep the site secure and working.",
      },
      {
        q: "How is my information used?",
        a: "Strictly to respond to your enquiry, prepare quotations and manage the resulting business relationship. We do not sell personal information and we do not send marketing you have not asked for.",
      },
      {
        q: "How long do you keep my enquiry?",
        a: "Enquiries are kept for as long as needed to serve you and to meet legal record-keeping duties, then deleted or anonymised. You may ask us to delete your details at any time.",
      },
      {
        q: "How do I exercise my POPIA rights?",
        a: `Email our Information Officer at ${COMPANY.email} to access, correct, object to or request deletion of your personal information. Full detail is in our Privacy Notice and PAIA information page.`,
      },
    ],
  },
];

export const Route = createFileRoute("/faq")({
  head: () =>
    createPageHead({
      title: "Frequently Asked Questions | Shammah Innovation Holdings",
      description:
        "Answers about our divisions, quotations, project delivery, compliance and how we protect your personal information under POPIA.",
      path: "/faq",
    }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Support"
        title="Frequently Asked Questions"
        description="Quick answers about our divisions, quotations, compliance and privacy."
        breadcrumb="FAQ"
      />

      <section className="bg-background py-14">
        <div className="mx-auto max-w-4xl px-4">
          {FAQ_GROUPS.map((group, groupIndex) => (
            <Reveal key={group.heading} delay={groupIndex * 0.05} className="mb-12 last:mb-0">
              <SectionHeading eyebrow={`0${groupIndex + 1}`} title={group.heading} />
              <Accordion type="single" collapsible className="mt-5">
                {group.items.map((item) => (
                  <AccordionItem key={item.q} value={item.q} className="border-border">
                    <AccordionTrigger className="text-left font-display text-base font-semibold uppercase tracking-tight text-navy hover:text-gold">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          ))}

          <div className="mt-4 border-l-4 border-gold bg-muted p-6">
            <h2 className="font-display text-lg font-bold uppercase tracking-tight text-navy">
              Still have a question?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Call {COMPANY.phone}, email {COMPANY.email} or{" "}
              <Link to="/contact" className="font-semibold text-navy underline">
                send us a message
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
