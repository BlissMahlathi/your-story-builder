import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { galleryQuery } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Project Gallery | Shammah Innovation Holdings" },
      {
        name: "description",
        content:
          "Photographs of completed construction, engineering, logistics, agriculture and workplace health projects delivered by Shammah Innovation Holdings.",
      },
      { property: "og:title", content: "Project Gallery | Shammah Innovation Holdings" },
      {
        property: "og:description",
        content: "A visual record of our delivered projects across South Africa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const gallery = useQuery(galleryQuery);
  const [category, setCategory] = useState<string | null>(null);

  const items = gallery.data ?? [];
  const categories = Array.from(new Set(items.map((item) => item.category)));
  const shown = items.filter((item) => !category || item.category === category);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Our work"
        title="Project Gallery"
        description="Selected images from our sites, workshops, fleets and field teams."
        breadcrumb="Gallery"
      />

      <section className="bg-background py-14">
        <div className="mx-auto max-w-7xl px-4">
          {categories.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCategory(null)}
                className={cn(
                  "px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors",
                  category === null
                    ? "bg-navy text-primary-foreground"
                    : "bg-muted text-navy hover:bg-gold-soft",
                )}
              >
                All
              </button>
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={cn(
                    "px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors",
                    category === item
                      ? "bg-navy text-primary-foreground"
                      : "bg-muted text-navy hover:bg-gold-soft",
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          ) : null}

          {gallery.isLoading ? (
            <p className="mt-10 text-sm text-muted-foreground">Loading gallery…</p>
          ) : null}

          {!gallery.isLoading && items.length === 0 ? (
            <p className="mt-10 text-sm text-muted-foreground">
              Project photographs will appear here as soon as they are published.
            </p>
          ) : null}

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((item) => (
              <figure key={item.id} className="group border border-border bg-card shadow-sm">
                <div className="aspect-4/3 overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.alt_text || item.title}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <figcaption className="p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                    {item.category}
                  </p>
                  <h2 className="mt-1 font-display text-base font-semibold uppercase tracking-wide text-navy">
                    {item.title}
                  </h2>
                  {item.description ? (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  ) : null}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
