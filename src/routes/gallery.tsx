import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { galleryQuery } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { createPageHead } from "@/lib/seo";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ZoomIn } from "lucide-react";

export const Route = createFileRoute("/gallery")({
  head: () =>
    createPageHead({
      title: "Project Gallery | Shammah Innovation Holdings",
      description:
        "Photographs of completed construction, engineering, logistics, agriculture and workplace health projects delivered by Shammah Innovation Holdings.",
      path: "/gallery",
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
              <figure
                key={item.id}
                className="group flex flex-col border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="relative aspect-4/3 w-full overflow-hidden block focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2">
                      <img
                        src={item.image_url}
                        alt={item.alt_text || item.title}
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-navy/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="rounded-full bg-background/90 p-3 shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                          <ZoomIn className="size-6 text-navy" />
                        </div>
                      </div>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-5xl border-none bg-transparent p-0 shadow-none">
                    <DialogTitle className="sr-only">{item.title}</DialogTitle>
                    <DialogDescription className="sr-only">{item.description}</DialogDescription>
                    <div className="relative flex aspect-auto max-h-[85vh] w-full items-center justify-center overflow-hidden rounded-md">
                      <img
                        src={item.image_url}
                        alt={item.alt_text || item.title}
                        className="max-h-[85vh] w-auto object-contain"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
                <figcaption className="flex flex-1 flex-col p-5">
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
