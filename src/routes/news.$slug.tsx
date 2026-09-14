import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, CalendarDays, User } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { postsQuery } from "@/lib/site-data";

export const Route = createFileRoute("/news/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `Article | Shammah Innovation Holdings` },
      {
        name: "description",
        content: `Read the article "${params.slug.replace(/-/g, " ")}" from Shammah Innovation Holdings.`,
      },
      { property: "og:title", content: "Article | Shammah Innovation Holdings" },
      { property: "og:description", content: "News and insight from Shammah Innovation Holdings." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  const { slug } = Route.useParams();
  const posts = useQuery(postsQuery);
  const post = (posts.data ?? []).find((item) => item.slug === slug);

  if (posts.isLoading) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-3xl px-4 py-20 text-sm text-muted-foreground">Loading article…</div>
      </SiteLayout>
    );
  }

  if (!post) {
    return (
      <SiteLayout>
        <PageHero eyebrow="News" title="Article not found" breadcrumb="News & Blog" />
        <div className="mx-auto max-w-3xl px-4 py-16">
          <Link to="/news" className="inline-flex items-center gap-2 text-sm font-semibold uppercase text-navy hover:text-gold">
            <ArrowLeft className="size-4" aria-hidden="true" /> Back to all articles
          </Link>
        </div>
      </SiteLayout>
    );
  }

  const date = post.published_at ?? post.created_at;

  return (
    <SiteLayout>
      <PageHero eyebrow={post.category} title={post.title} breadcrumb="News & Blog" />
      <article className="bg-background py-14">
        <div className="mx-auto max-w-3xl px-4">
          <div className="flex flex-wrap items-center gap-5 text-xs uppercase tracking-wide text-muted-foreground">
            <span className="flex items-center gap-2">
              <CalendarDays className="size-3.5" aria-hidden="true" />
              {new Date(date).toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" })}
            </span>
            <span className="flex items-center gap-2">
              <User className="size-3.5" aria-hidden="true" />
              {post.author_name}
            </span>
          </div>

          {post.cover_url ? (
            <img src={post.cover_url} alt={post.title} className="mt-6 w-full object-cover" loading="lazy" />
          ) : null}

          {post.excerpt ? (
            <p className="mt-8 border-l-4 border-gold pl-4 text-base leading-relaxed text-foreground/80">
              {post.excerpt}
            </p>
          ) : null}

          <div className="mt-8 space-y-4 text-base leading-relaxed text-foreground/85">
            {post.body
              .split(/\n\s*\n/)
              .filter(Boolean)
              .map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
          </div>

          <Link
            to="/news"
            className="mt-12 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-navy hover:text-gold"
          >
            <ArrowLeft className="size-4" aria-hidden="true" /> Back to all articles
          </Link>
        </div>
      </article>
    </SiteLayout>
  );
}
