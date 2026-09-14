import { createFileRoute, Link } from "@tanstack/react-router";
import { Target, Eye, Gem, ArrowRight } from "lucide-react";
import { SiteLayout, PageHero, SectionHeading } from "@/components/site/SiteLayout";
import { COMPANY } from "@/lib/site-data";
import aboutImage from "@/assets/about-team.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Shammah Innovation Holdings" },
      {
        name: "description",
        content:
          "Shammah Innovation Holdings is a South African multi-disciplinary group delivering infrastructure, engineering, technology, agriculture, health, logistics and compliance services.",
      },
      { property: "og:title", content: "About Shammah Innovation Holdings" },
      {
        property: "og:description",
        content:
          "A registered South African group delivering integrated infrastructure and engineering services.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const PILLARS = [
  {
    icon: Target,
    title: "Our Mission",
    body: "To deliver integrated infrastructure, engineering and support services that are safe, compliant and commercially sound for every client we serve.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    body: "To be South Africa's most dependable multi-disciplinary partner, trusted for technical depth and honest delivery across sectors.",
  },
  {
    icon: Gem,
    title: "Our Values",
    body: "Integrity, accountability, technical excellence, respect for people and communities, and an uncompromising commitment to safety.",
  },
];

const APPROACH = [
  {
    step: "01",
    title: "Understand",
    body: "We start with the operational problem, site conditions and compliance requirements.",
  },
  {
    step: "02",
    title: "Plan",
    body: "Scope, programme, resourcing and costing are documented before work begins.",
  },
  {
    step: "03",
    title: "Deliver",
    body: "Qualified teams execute with supervision, safety controls and quality checks.",
  },
  {
    step: "04",
    title: "Support",
    body: "Handover documentation, maintenance and ongoing advisory keep assets performing.",
  },
];

function About() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Who we are"
        title="A multi-disciplinary group built for complex operations"
        description={COMPANY.tagline}
        breadcrumb="About"
      />

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 lg:grid-cols-2">
        <img
          src={aboutImage}
          alt="Shammah Innovation Holdings project team reviewing technical drawings"
          width={1280}
          height={960}
          loading="lazy"
          className="w-full object-cover shadow-xl"
        />
        <div>
          <SectionHeading eyebrow="Our story" title="One company, seven specialist divisions" />
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              {COMPANY.name} (Reg. No. {COMPANY.registration}) is a South African company that
              brings construction, engineering, technology, agriculture, occupational health,
              logistics and compliance capability under one accountable structure.
            </p>
            <p>
              Clients appoint us because coordinating multiple suppliers on a single project creates
              delay and risk. Our divisional model places qualified specialists on each work package
              while a single project lead stays responsible for programme, budget and reporting.
            </p>
            <p>
              We operate from {COMPANY.address}, serving public and private clients across the
              country, and we invest continuously in skills, equipment and quality systems.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="grid gap-6 md:grid-cols-3">
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className="border-t-4 border-gold bg-card p-8 shadow-sm">
                <pillar.icon className="size-8 text-gold" aria-hidden="true" />
                <h2 className="mt-5 font-display text-xl font-semibold uppercase tracking-wide text-navy">
                  {pillar.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeading center eyebrow="How we work" title="A disciplined delivery approach" />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {APPROACH.map((item) => (
            <div key={item.step} className="border border-border bg-card p-7">
              <span className="font-display text-3xl font-bold text-gold">{item.step}</span>
              <h3 className="mt-3 font-display text-lg font-semibold uppercase tracking-wide text-navy">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
        <Link
          to="/services"
          className="mt-12 inline-flex items-center gap-2 bg-navy px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-navy-deep"
        >
          See our full service list <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </section>
    </SiteLayout>
  );
}
