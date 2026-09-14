import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { SiteLayout, PageHero, SectionHeading } from "@/components/site/SiteLayout";
import { COMPANY } from "@/lib/site-data";
import { createPageHead } from "@/lib/seo";

export const Route = createFileRoute("/insurance")({
  head: () =>
    createPageHead({
      title: "Insurance & Risk Advisory | Shammah Innovation Holdings",
      description:
        "Protecting your business (Eyer) and your workers (Eyee). COIDA registration, Contractor All-Risk, Public Liability, Group Life, Funeral and specialised agricultural insurance across South Africa.",
      path: "/insurance",
    }),
  component: InsurancePage,
});

const EMPLOYER = [
  "COIDA / Workmen's Compensation — Registration, Monthly Returns, Claims & Compliance (Dept of Labour)",
  "Contractor All-Risk Insurance — For construction, pump installation and mining sites",
  "Public Liability Insurance — For sites and workshops",
  "Professional Indemnity — For engineering designs, borehole siting and water treatment advice",
  "Asset Insurance — Pumps (rental fleet), generators, vehicles, tools and stock",
  "Business Interruption — Cover for operational downtime",
  "Plant & Equipment Insurance — TLB, excavator and heavy plant",
];

const EMPLOYEE = [
  "Group Life Cover — For all site workers (mining, farm, construction)",
  "Group Funeral Cover — Essential for staff retention and morale",
  "Group Personal Accident (GPA) — On duty & off duty; pays if a worker is injured",
  "Medical Aid & Gap Cover Advisory — For permanent staff and management",
  "Income Protection / Disability — If a worker cannot return to work",
  "Occupational Health Top-Up — Covers what COIDA does not pay",
];

const COMPLIANCE = [
  "UIF Registration & Compliance",
  "COIDA Letter of Good Standing — Tender prerequisite",
  "Liability for Subcontractors",
  "Motor Fleet Insurance — Bakkies and trucks",
];

const AGRI = [
  "Crop Insurance",
  "Livestock Insurance Referral",
  "Irrigation Equipment & Borehole Equipment Insurance",
  "Medical Malpractice — For on-site clinical staff",
];

const CLAIMS = [
  "We handle COIDA claims paperwork — worker injured, we file",
  "Group Funeral claims — fast payout for the family",
  "Monthly employee schedule updates — add or remove staff",
  "Compliance file — all insurance certificates in one file for tender submission",
  "HR & Finance liaison — we communicate directly with your HR team",
];

const SECTIONS = [
  {
    id: "employer",
    label: "5.6.1",
    title: "Employer Insurance — Eyer (The Company)",
    tagline: "Protect the business",
    items: EMPLOYER,
    bg: "bg-card",
  },
  {
    id: "employee",
    label: "5.6.2",
    title: "Employee Insurance — Eyee (The Worker)",
    tagline: "Protect the people",
    items: EMPLOYEE,
    bg: "bg-secondary",
  },
  {
    id: "compliance",
    label: "5.6.3",
    title: "Compulsory Compliance Insurance",
    tagline: "Stay tender-ready",
    items: COMPLIANCE,
    bg: "bg-card",
  },
  {
    id: "agri",
    label: "5.6.4",
    title: "Agriculture & Specialised Insurance",
    tagline: "Cover for farm operations",
    items: AGRI,
    bg: "bg-secondary",
  },
  {
    id: "claims",
    label: "5.6.5",
    title: "Claims & Administration Service",
    tagline: "We handle the paperwork",
    items: CLAIMS,
    bg: "bg-card",
  },
];

function InsurancePage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Division 5.6"
        title="Insurance & Risk Advisory"
        description="Employer & Employee Insure — protecting the Business (Eyer) and the Worker (Eyee). From COIDA compliance to Group Funeral cover, we keep your operation and your people protected."
        breadcrumb="Insurance"
      />

      {/* Eyer / Eyee intro */}
      <section className="bg-navy text-primary-foreground max-sm:mt--6">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 md:grid-cols-2">
          <div className="border border-gold/30 p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">Eyer</p>
            <h2 className="mt-2 font-display text-2xl font-bold uppercase text-primary-foreground">
              The Company
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-primary-foreground/75">
              COIDA Letter of Good Standing, Contractor All-Risk, Public Liability and Asset Cover —
              everything your business needs for tenders and site operations.
            </p>
          </div>
          <div className="border border-gold/30 p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">Eyee</p>
            <h2 className="mt-2 font-display text-2xl font-bold uppercase text-primary-foreground">
              The Worker
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-primary-foreground/75">
              Group Life, Funeral, Personal Accident and Medical cover — keeping your workforce
              protected on site and off duty.
            </p>
          </div>
        </div>
      </section>

      {/* Service sections */}
      {SECTIONS.map((section) => (
        <section key={section.id} className={`${section.bg} py-14`}>
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex items-start gap-4 border-l-4 border-gold pl-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
                  {section.label}
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold uppercase tracking-tight text-navy">
                  {section.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">{section.tagline}</p>
              </div>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-foreground/80">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-navy-deep py-16 text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center">
          <ShieldCheck className="size-12 text-gold" />
          <h2 className="max-w-2xl font-display text-3xl font-bold uppercase">
            Get your compliance file in order
          </h2>
          <p className="max-w-xl text-sm text-primary-foreground/75">
            Whether you need a COIDA Letter of Good Standing for a tender or group life cover for 50
            site workers, our team handles it end-to-end. Contact {COMPANY.name} today.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/quote"
              className="bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-navy-deep transition-colors hover:bg-gold-soft"
            >
              Get an Insurance Quote <ArrowRight className="ml-1 inline size-4" />
            </Link>
            <Link
              to="/contact"
              className="border border-white/30 px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:border-gold hover:text-gold"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
