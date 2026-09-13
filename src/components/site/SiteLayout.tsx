import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumb?: string;
}) {
  return (
    <section className="clip-angle bg-navy pb-16 pt-14 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4">
        {eyebrow ? (
          <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-gold">{eyebrow}</p>
        ) : null}
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold uppercase leading-tight tracking-tight md:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/80">{description}</p>
        ) : null}
        {breadcrumb ? (
          <nav aria-label="Breadcrumb" className="mt-6 flex items-center gap-2 text-xs uppercase tracking-wide text-primary-foreground/70">
            <Link to="/" className="hover:text-gold">Home</Link>
            <ChevronRight className="size-3" aria-hidden="true" />
            <span className="text-gold">{breadcrumb}</span>
          </nav>
        ) : null}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  center,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-gold">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-navy md:text-4xl">{title}</h2>
      {description ? <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p> : null}
    </div>
  );
}
