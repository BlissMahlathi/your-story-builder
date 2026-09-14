import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  Building2,
  Cog,
  HeartPulse,
  MonitorCog,
  ShieldCheck,
  Sprout,
  Truck,
  Briefcase,
  CheckCircle2,
} from "lucide-react";
import { SiteLayout, SectionHeading } from "@/components/site/SiteLayout";
import { divisionsQuery, postsQuery, COMPANY } from "@/lib/site-data";
import heroImage from "@/assets/hero-infrastructure.jpg";
import ctaImage from "@/assets/cta-logistics.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shammah Innovation Holdings | Integrated Infrastructure & Engineering" },
      {
        name: "description",
        content:
          "Shammah Innovation Holdings delivers construction, engineering, IT, agriculture, occupational health, logistics and compliance services across South Africa.",
      },
      { property: "og:title", content: "Shammah Innovation Holdings" },
      {
        property: "og:description",
        content:
          "One trusted partner for infrastructure, engineering, technology, agriculture, health, logistics and compliance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

export const DIVISION_ICONS: Record<string, typeof Briefcase> = {
  "building-2": Building2,
  cog: Cog,
  "monitor-cog": MonitorCog,
  sprout: Sprout,
  "heart-pulse": HeartPulse,
  truck: Truck,
  "shield-check": ShieldCheck,
  briefcase: Briefcase,
};

const STATS = [
  { value: "7", label: "Operating divisions" },
  { value: "21+", label: "Service offerings" },
  { value: "10+", label: "Years of delivery" },
  { value: "100%", label: "Compliance focus" },
];

const PROMISES = [
  "One accountable partner across every discipline",
  "Qualified professionals and compliant workmanship",
  "Transparent pricing and clear project reporting",
  "Safety, quality and environmental standards upheld",
];

function Home() {
  const divisions = useQuery(divisionsQuery);
  const posts = useQuery(postsQuery);

  return (
    <SiteLayout>
      <section className="relative isolate overflow-hidden bg-navy-deep">
        <img
          src={heroImage}
          alt="Engineers reviewing plans on a South African construction site at sunset"
          width={1920}
          height={1088}
          className="absolute inset-0 size-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy-deep/40" />
        <div className="relative mx-auto grid max-w-7xl items-end gap-12 px-4 py-24 md:py-32 lg:grid-cols-[1fr_280px]">
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-gold">
              Multi-disciplinary solutions
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold uppercase leading-[1.02] text-primary-foreground md:text-6xl">
              Infrastructure that moves business forward
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/80 md:text-lg">
              One accountable partner for construction, engineering, technology, agriculture, health, logistics and
              compliance across South Africa.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-navy-deep transition-colors hover:bg-gold-soft"
            >
              Request a Quote <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 border border-white/30 px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:border-gold hover:text-gold"
            >
              Explore Services
            </Link>
            </div>
          </div>
          <div className="hidden border-l border-gold/60 pl-6 lg:block">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">Built for</p>
            <p className="mt-3 font-display text-2xl font-semibold uppercase leading-tight text-primary-foreground">
              Complex operations
            </p>
            <p className="mt-3 text-sm leading-relaxed text-primary-foreground/65">
              Practical delivery, clear reporting and standards you can rely on.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-navy text-primary-foreground">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="border-l-2 border-gold pl-4">
              <p className="font-display text-3xl font-bold text-gold md:text-4xl">{stat.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-primary-foreground/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeading
          center
          eyebrow="Our divisions"
          title="Capability across seven divisions"
          description="From civil construction and engineering to digital systems, agriculture, occupational health, transport and compliance advisory."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(divisions.data ?? []).map((division) => {
            const Icon = DIVISION_ICONS[division.icon] ?? Briefcase;
            return (
              <Link
                key={division.id}
                to="/services"
                search={{ division: division.slug }}
                className="group border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-gold hover:shadow-xl"
              >
                <span className="flex size-12 items-center justify-center bg-navy text-gold transition-colors group-hover:bg-gold group-hover:text-navy-deep">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold uppercase tracking-wide text-navy">
                  {division.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{division.summary}</p>
                 <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gold">
                   View division <ArrowRight className="size-3.5" aria-hidden="true" />
                </span>
              </Link>
            );
          })}
          {divisions.isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-56 animate-pulse border border-border bg-muted" />
              ))
            : null}
        </div>
      </section>

      <section className="bg-secondary">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Why Shammah"
              title="Built on competence, compliance and care"
              description={`${COMPANY.name} brings specialist teams together under one registered entity, so clients coordinate one contract instead of many suppliers.`}
            />
            <ul className="mt-8 space-y-4">
              {PROMISES.map((promise) => (
                <li key={promise} className="flex gap-3 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
                  {promise}
                </li>
              ))}
            </ul>
            <Link
              to="/about"
              className="mt-9 inline-flex items-center gap-2 bg-navy px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-navy-deep"
            >
              About the company <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <img
            src={ctaImage}
            alt="Logistics fleet and industrial plant at dusk"
            width={1600}
            height={900}
            loading="lazy"
            className="clip-angle w-full object-cover shadow-2xl"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Insights" title="Latest news & updates" />
          <Link to="/news" className="text-xs font-semibold uppercase tracking-wide text-gold hover:underline">
            View all articles
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {(posts.data ?? []).slice(0, 3).map((post) => (
            <Link
              key={post.id}
              to="/news/$slug"
              params={{ slug: post.slug }}
              className="group border border-border bg-card p-6 transition-all hover:border-gold hover:shadow-lg"
            >
              <span className="bg-navy px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-gold">
                {post.category}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold uppercase leading-snug text-navy group-hover:text-gold">
                {post.title}
              </h3>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-navy-deep">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-16 text-center">
          <h2 className="max-w-2xl font-display text-3xl font-bold uppercase text-primary-foreground md:text-4xl">
            Ready to scope your next project?
          </h2>
          <p className="max-w-xl text-sm text-primary-foreground/75">
            Send us your requirements and our team will respond with a detailed proposal.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/quote"
              className="bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-navy-deep transition-colors hover:bg-gold-soft"
            >
              Get a Quote
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
