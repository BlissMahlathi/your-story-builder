import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, HardHat, Wheat, Building2, Landmark, Factory, HeartPulse } from "lucide-react";
import { SiteLayout, PageHero, SectionHeading } from "@/components/site/SiteLayout";
import { createPageHead } from "@/lib/seo";

export const Route = createFileRoute("/industries")({
  head: () =>
    createPageHead({
      title: "Industries We Serve | Shammah Innovation Holdings",
      description:
        "Shammah Innovation Holdings delivers integrated infrastructure, engineering, health and compliance services across mining, agriculture, construction, municipalities, industrial and healthcare sectors.",
      path: "/industries",
    }),
  component: IndustriesPage,
});

const INDUSTRIES = [
  {
    icon: HardHat,
    name: "Mining",
    slug: "mining",
    tagline: "DMRE-compliant. Production-critical.",
    description:
      "We keep mines running with pump dewatering (24/7 swap), mechanical and electrical maintenance, mine medicals (DME 29/29A), DMRE safety files, WULA legal support, environmental monitoring and COIDA compliance.",
    services: [
      "Mine dewatering — pump rental, installation & 24/7 maintenance",
      "Slurry & dewatering pump reconditioning",
      "DMRE compliance — EMP, WULA, mining permits & safety files",
      "Mine medical surveillance — DME 29/29A compliant",
      "Tailings water management & rehabilitation",
      "Mining equipment mechanical & electrical maintenance",
      "COIDA registration, claims & compliance",
    ],
    cta: "Mining Services",
  },
  {
    icon: Wheat,
    name: "Agriculture & Farming",
    slug: "agriculture",
    tagline: "Borehole to Harvest, Soil to Phone.",
    description:
      "From borehole siting to solar pump installation, smart IoT irrigation, cold room maintenance and government grant compliance — we make farms save 40% water and run from a phone.",
    services: [
      "Borehole siting, drilling supervision & yield testing",
      "Solar pump systems for remote farms",
      "Smart IoT irrigation — phone-controlled, weather-based",
      "Water quality testing — SANS 241 compliant",
      "Farm electrical — 3-phase, CoC, solar, generators",
      "Government grant compliance — CASP, Dept of Agriculture",
      "Crop & livestock insurance",
    ],
    cta: "Agriculture Services",
  },
  {
    icon: Building2,
    name: "Construction & Property Development",
    slug: "construction",
    tagline: "Design, build, comply.",
    description:
      "Civil construction, structural design, geotechnical investigation, urban planning, JBCC/GCC/FIDIC contract review — from site investigation to project handover.",
    services: [
      "Building construction — residential, commercial, industrial",
      "Structural design, supervision & BoQ",
      "Water & sewer reticulation, stormwater & roads",
      "Geotechnical investigations & borehole siting",
      "Town planning — rezoning, subdivision, SDP, SPLUMA",
      "Tender documentation & bid support",
      "JBCC, GCC & FIDIC contract review",
    ],
    cta: "Construction Services",
  },
  {
    icon: Landmark,
    name: "Municipalities & Public Sector",
    slug: "municipalities",
    tagline: "Infrastructure delivery. Regulatory compliance.",
    description:
      "Technical advisory, water services development planning, SPLUMA applications, EIA coordination and tender compliance support for municipalities and government departments.",
    services: [
      "Water services development planning",
      "Infrastructure master planning",
      "SPLUMA applications & compliance",
      "EIA coordination (NEMA, NWA)",
      "Tender compliance — CIDB, B-BBEE, COIDA, Tax clearance",
      "Project management & site supervision",
      "Water quality — SANS 241 testing & reports",
    ],
    cta: "Public Sector Services",
  },
  {
    icon: Factory,
    name: "Industrial Plants & Manufacturing",
    slug: "industrial",
    tagline: "Uptime through engineering.",
    description:
      "Process optimisation, PLC/SCADA integration, chemical dosing, HVAC, pump reconditioning, electrical CoC, IoT remote monitoring — keeping your plant running and compliant.",
    services: [
      "Process optimisation & SOP development",
      "PLC & SCADA integration",
      "Pump reconditioning, supply & maintenance",
      "Water & wastewater treatment — SANS 241",
      "Industrial electrical — CoC, motor rewinding, distribution boards",
      "Automated dosing & chemical supply",
      "HVAC & refrigeration maintenance",
    ],
    cta: "Industrial Services",
  },
  {
    icon: HeartPulse,
    name: "Clinics & Healthcare Facilities",
    slug: "healthcare",
    tagline: "Compliant clinics. Healthy workforces.",
    description:
      "On-site clinic setup, DMRE & DOL-compliant occupational medicals, certificate of fitness, medical records systems, audiometry, spirometry, HIV/TB programs and emergency response planning.",
    services: [
      "Pre-employment & periodic medical surveillance",
      "Certificate of Fitness (CoF) — doctor led",
      "DMRE compliant mine medicals (DME 29/29A)",
      "On-site clinic setup & management",
      "Audiometry, spirometry & biological monitoring",
      "Medical records management system (POPIA compliant)",
      "HIV/TB workplace programs & first aid coordination",
    ],
    cta: "Health Services",
  },
];

function IndustriesPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Who we serve"
        title="Industries We Serve"
        description="Shammah Innovation Holdings deploys specialist teams across six key sectors. Find your industry below to see exactly how we can support your operation."
        breadcrumb="Industries"
      />

      <section className="bg-background py-14">
        <div className="mx-auto max-w-7xl space-y-16 px-4">
          {INDUSTRIES.map((industry, index) => {
            const Icon = industry.icon;
            const isEven = index % 2 === 0;
            return (
              <article
                key={industry.slug}
                className={`grid gap-8 border border-border bg-card p-8 shadow-sm lg:grid-cols-[1fr_1.5fr] ${!isEven ? "lg:grid-cols-[1.5fr_1fr]" : ""}`}
              >
                <div className={`flex flex-col justify-center ${!isEven ? "lg:order-2" : ""}`}>
                  <span className="flex size-12 items-center justify-center bg-navy text-gold">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <h2 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight text-navy">
                    {industry.name}
                  </h2>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-gold">
                    {industry.tagline}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {industry.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      to="/quote"
                      className="inline-flex items-center gap-2 bg-navy px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-navy-deep"
                    >
                      Get a Quote <ArrowRight className="size-3.5" />
                    </Link>
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-2 border border-navy px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-navy transition-colors hover:bg-gold hover:border-gold"
                    >
                      {industry.cta}
                    </Link>
                  </div>
                </div>
                <div className={`${!isEven ? "lg:order-1" : ""}`}>
                  <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-navy">
                    Key Services
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {industry.services.map((service) => (
                      <li key={service} className="flex gap-3 text-sm text-foreground/80">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" />
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-navy-deep py-14 text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center">
          <SectionHeading
            center
            eyebrow="One partner"
            title="Don't see your industry?"
          />
          <p className="max-w-xl text-sm text-primary-foreground/75">
            Our eight divisions can be combined to address almost any complex operational challenge. Tell us what you need and we will scope a solution.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-navy-deep transition-colors hover:bg-gold-soft"
          >
            Contact Our Team <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
