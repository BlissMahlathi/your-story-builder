import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileCheck, CheckCircle2, Scale } from "lucide-react";
import { SiteLayout, PageHero, SectionHeading } from "@/components/site/SiteLayout";
import { COMPANY } from "@/lib/site-data";
import { createPageHead } from "@/lib/seo";

export const Route = createFileRoute("/tender-support")({
  head: () =>
    createPageHead({
      title: "Tender Support Services | Shammah Innovation Holdings",
      description:
        "Tender document review, JBCC/GCC/FIDIC contract review, COIDA, Tax, CIDB and B-BBEE compliance checks, tender objections and blacklisting disputes — Contract to Compliance.",
      path: "/tender-support",
    }),
  component: TenderSupportPage,
});

const SERVICES = [
  {
    ref: "5.7.2",
    title: "Tender Document Review",
    description: "We read the small print so you don't miss a disqualifying condition.",
    items: [
      "Tender document review — terms, conditions & risks",
      "Tender compliance check — all certificate requirements verified",
      "Construction & engineering contracts — JBCC, GCC, FIDIC review",
      "Letter of Good Standing facilitation — COIDA, Tax, UIF, CIDB, B-BBEE",
      "Tender objections & appeals",
      "Blacklisting disputes & rehabilitation",
    ],
  },
  {
    ref: "5.2.4",
    title: "Bid Preparation & Documentation",
    description: "We help you put together a compliant, competitive submission.",
    items: [
      "Tender documentation drafting & packaging",
      "BoQ preparation and costing support",
      "Safety file compilation & compliance sign-off",
      "Technical methodology write-ups",
      "Company profile and CV formatting",
      "Courier & physical submission logistics",
    ],
  },
  {
    ref: "5.7.1",
    title: "Corporate Compliance Documentation",
    description: "Keep your company documents current and compliant.",
    items: [
      "CIPC company registration, amendments & compliance",
      "Shareholder & joint venture (JV) agreements",
      "Subcontractor agreements",
      "Non-disclosure agreements (NDA)",
      "Service level agreements (SLA) drafting & vetting",
      "Debt collection letters & payment disputes",
    ],
  },
  {
    ref: "5.6.3",
    title: "Compliance Insurance & Certificates",
    description: "Your one-file compliance folder for every tender.",
    items: [
      "COIDA Letter of Good Standing",
      "UIF registration & compliance",
      "B-BBEE affidavit & scorecard advisory",
      "Motor fleet & contractor all-risk insurance",
      "Liability for subcontractors",
      "All certificates consolidated in one compliance file",
    ],
  },
];

const CERTIFICATIONS = [
  "COIDA", "CIDB", "B-BBEE", "Tax Clearance", "UIF", "DMRE",
  "SANS 241", "OHS Act", "POPIA", "JBCC", "GCC", "FIDIC",
];

function TenderSupportPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contract to Compliance"
        title="Tender Support Services"
        description="We review your tenders, draft your SLAs and employment contracts, ensure COIDA, CIDB and Tax compliance, handle WULA and DMRE legal requirements, and keep your operation legally protected."
        breadcrumb="Tender Support"
      />

      {/* Tagline banner */}
      <section className="bg-navy text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="flex flex-wrap items-center gap-x-12 gap-y-4">
            <Scale className="size-10 text-gold shrink-0" />
            <div>
              <p className="font-display text-xl font-bold uppercase text-primary-foreground">
                "Contract to Compliance"
              </p>
              <p className="mt-1 text-sm text-primary-foreground/70">
                {COMPANY.name} — legal, insurance and compliance advisory under one roof.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service blocks */}
      <section className="bg-background py-14">
        <div className="mx-auto max-w-7xl space-y-12 px-4">
          {SERVICES.map((svc) => (
            <div key={svc.ref} className="grid gap-6 border border-border bg-card p-8 shadow-sm lg:grid-cols-[1fr_2fr]">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">Section {svc.ref}</p>
                <h2 className="mt-2 font-display text-xl font-bold uppercase tracking-tight text-navy">
                  {svc.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{svc.description}</p>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {svc.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-foreground/80">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Compliance badges */}
      <section className="bg-secondary py-14">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            center
            eyebrow="Standards we work with"
            title="Compliance frameworks & certifications"
          />
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {CERTIFICATIONS.map((cert) => (
              <span
                key={cert}
                className="border border-gold/50 bg-background px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-navy"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-deep py-16 text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center">
          <FileCheck className="size-12 text-gold" />
          <h2 className="max-w-2xl font-display text-3xl font-bold uppercase">
            Need help with your next tender?
          </h2>
          <p className="max-w-xl text-sm text-primary-foreground/75">
            Send us the tender number or requirements and we will review your compliance standing and get you submission-ready.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/quote"
              className="bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-navy-deep transition-colors hover:bg-gold-soft"
            >
              Request Tender Support <ArrowRight className="ml-1 inline size-4" />
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
