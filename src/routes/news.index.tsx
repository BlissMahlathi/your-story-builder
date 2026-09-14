import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Search, CalendarDays, ArrowRight } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { postsQuery } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/news/")({
  head: () => ({
    meta: [
      { title: "News & Blog | Shammah Innovation Holdings" },
      {
        name: "description",
        content:
          "Company news, project updates and industry insight from the divisions of Shammah Innovation Holdings.",
      },
      { property: "og:title", content: "News & Blog | Shammah Innovation Holdings" },
      { property: "og:description", content: "Company news, project updates and industry insight." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NewsPage,
});

function formatDate(value: string | null) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" });
}

function NewsPage() {
  const posts = useQuery(postsQuery);
  const [term, setTerm] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const all = posts.data ?? [];
  const categories = Array.from(new Set(all.map((post) => post.category)));
  const shown = all.filter((post) => {
    const matchesCategory = !category || post.category === category;
    const haystack = `${post.title} ${post.excerpt}`.toLowerCase();
    return matchesCategory && haystack.includes(term.trim().toLowerCase());
  });

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Insight"
        title="News & Blog"
        description="Updates from our projects, divisions and the industries we serve."
        breadcrumb="News & Blog"
      />

      <section className="bg-background py-14">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[1fr_300px]">
          <div>
            {posts.isLoading ? <p className="text-sm text-muted-foreground">Loading articles…</p> : null}
            {!posts.isLoading && shown.length === 0 ? (
              <p className="text-sm text-muted-foreground">No articles match your search yet.</p>
            ) : null}

            <div className="grid gap-8 sm:grid-cols-2">
              {shown.map((post) => (
                <article key={post.id} className="flex flex-col border border-border bg-card shadow-sm">
                  {post.cover_url ? (
                    <div className="aspect-16/9 overflow-hidden">
                      <img src={post.cover_url} alt={post.title} loading="lazy" className="size-full object-cover" />
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">{post.category}</p>
                    <h2 className="mt-2 font-display text-lg font-semibold uppercase leading-snug tracking-wide text-navy">
                      {post.title}
                    </h2>
                    <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <CalendarDays className="size-3.5" aria-hidden="true" />
                      {formatDate(post.published_at ?? post.created_at)}
                    </p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                    <Link
                      to="/news/$slug"
                      params={{ slug: post.slug }}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-navy hover:text-gold"
                    >
                      Read article
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="space-y-8">
            <div className="border border-border bg-card p-5">
              <label htmlFor="search" className="font-display text-sm font-semibold uppercase tracking-wide text-navy">
                Search
              </label>
              <div className="mt-3 flex items-center gap-2 border border-input px-3 py-2">
                <Search className="size-4 text-muted-foreground" aria-hidden="true" />
                <input
                  id="search"
                  value={term}
                  onChange={(event) => setTerm(event.target.value)}
                  placeholder="Search articles"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>
            </div>

            <div className="border border-border bg-card p-5">
              <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-navy">Categories</h2>
              <div className="mt-3 flex flex-col items-start gap-2">
                <button
                  type="button"
                  onClick={() => setCategory(null)}
                  className={cn("text-sm", category === null ? "font-semibold text-gold" : "text-muted-foreground")}
                >
                  All categories
                </button>
                {categories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    className={cn("text-sm", category === item ? "font-semibold text-gold" : "text-muted-foreground")}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="border border-border bg-card p-5">
              <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-navy">Recent posts</h2>
              <ul className="mt-3 space-y-3">
                {all.slice(0, 4).map((post) => (
                  <li key={post.id}>
                    <Link
                      to="/news/$slug"
                      params={{ slug: post.slug }}
                      className="text-sm leading-snug text-foreground/80 hover:text-gold"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}
