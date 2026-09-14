import logo from "@/assets/shammah-logo.jpeg";

const configuredSiteUrl = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "") ?? "";

export const SEO_IMAGE = logo;

export function getCanonicalUrl(path: string) {
  return `${configuredSiteUrl}${path.startsWith("/") ? path : `/${path}`}` || "/";
}

export function createPageHead({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}) {
  const url = getCanonicalUrl(path);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:image", content: SEO_IMAGE },
      { property: "og:image:alt", content: "Shammah Innovation Holdings logo" },
      { property: "og:site_name", content: "Shammah Innovation Holdings" },
      { property: "og:locale", content: "en_ZA" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: SEO_IMAGE },
      { name: "twitter:image:alt", content: "Shammah Innovation Holdings logo" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
