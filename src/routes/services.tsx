import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, CheckCircle2, Briefcase } from "lucide-react";
import { SiteLayout, PageHero, SectionHeading } from "@/components/site/SiteLayout";
import { divisionsQuery, servicesQuery, capabilitiesOf } from "@/lib/site-data";
import { DIVISION_ICONS } from "@/routes/index";
import { cn } from "@/lib/utils";
import { createPageHead } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () =>
    createPageHead({
      title: "Our Services | Shammah Innovation Holdings",
      description:
        "Explore seven divisions: IT and design, built environment, integrated engineering, agriculture, medical and occupational health, logistics, and risk and compliance.",
      path: "/services",
    }),
  component: ServicesPage,
});

function ServicesPage() {
  const divisions = useQuery(divisionsQuery);
  const services = useQuery(servicesQuery);
  const [active, setActive] = useState<string | null>(null);

  const shown = (divisions.data ?? []).filter((d) => !active || d.slug === active);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="What we do"
        title="Our Services"
        description="Seven integrated divisions, one accountable partner. Filter by division to see the full capability list for each area of our business."
        breadcrumb="Services"
      />

      <section className="bg-background py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActive(null)}
              className={cn(
                "px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors",
                active === null
                  ? "bg-navy text-primary-foreground"
                  : "bg-muted text-navy hover:bg-gold-soft",
              )}
            >
              All divisions
            </button>
            {(divisions.data ?? []).map((division) => (
              <button
                key={division.id}
                type="button"
                onClick={() => setActive(division.slug)}
                className={cn(
                  "px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors",
                  active === division.slug
                    ? "bg-navy text-primary-foreground"
                    : "bg-muted text-navy hover:bg-gold-soft",
                )}
              >
                {division.name}
              </button>
            ))}
          </div>

          {divisions.isLoading ? (
            <p className="mt-10 text-sm text-muted-foreground">Loading services…</p>
          ) : null}

          <div className="mt-12 space-y-16">
            {shown.map((division) => {
              const Icon = DIVISION_ICONS[division.icon] ?? Briefcase;
              const list = (services.data ?? []).filter((s) => s.division_id === division.id);
              return (
                <article key={division.id} id={division.slug}>
                  <div className="flex items-start gap-4 border-l-4 border-gold pl-4">
                    <span className="flex size-12 shrink-0 items-center justify-center bg-navy text-gold">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <div>
                      <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-navy">
                        {division.name}
                      </h2>
                      <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                        {division.summary}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {list.map((service) => (
                      <div
                        key={service.id}
                        className="group flex flex-col border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-gold hover:shadow-lg"
                      >
                        <h3 className="font-display text-base font-semibold uppercase tracking-wide text-navy group-hover:text-gold">
                          {service.name}
                        </h3>
                        {service.description ? (
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {service.description}
                          </p>
                        ) : null}
                        <ul className="mt-4 flex-1 space-y-2">
                          {capabilitiesOf(service).map((cap) => (
                            <li key={cap} className="flex gap-2 text-sm text-foreground/80">
                              <CheckCircle2
                                className="mt-0.5 size-4 shrink-0 text-gold"
                                aria-hidden="true"
                              />
                              <span>{cap}</span>
                            </li>
                          ))}
                        </ul>
                        <Link
                          to="/quote"
                          className="mt-6 inline-flex items-center justify-center gap-2 border border-navy px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-navy transition-colors hover:bg-gold hover:border-gold"
                        >
                          Get a Quote
                          <ArrowRight className="size-3.5" aria-hidden="true" />
                        </Link>
                      </div>
                    ))}
                    {list.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        Details for this division are coming soon.
                      </p>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-navy py-14 text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 md:flex-row md:items-center">
          <SectionHeading eyebrow="Next step" title="Need a tailored proposal?" />
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wide text-navy-deep transition-colors hover:bg-gold-soft"
          >
            Request a quote
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
