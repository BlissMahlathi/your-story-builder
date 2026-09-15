import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function LegalBody({ children, updated }: { children: ReactNode; updated?: string }) {
  return (
    <section className="bg-background py-14">
      <div className="mx-auto max-w-3xl px-4">
        {updated ? (
          <p className="mb-8 border-l-4 border-gold bg-muted px-4 py-3 text-xs font-semibold uppercase tracking-wide text-navy">
            {updated}
          </p>
        ) : null}
        <div className="space-y-10">{children}</div>
      </div>
    </section>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Reveal>
      <article>
        <h2 className="font-display text-xl font-bold uppercase tracking-tight text-navy">
          {title}
        </h2>
        <div className="legal-prose mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-foreground [&_ul]:space-y-2">
          {children}
        </div>
      </article>
    </Reveal>
  );
}
