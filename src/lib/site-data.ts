import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Division = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  icon: string;
  sort_order: number;
};

export type Service = {
  id: string;
  division_id: string;
  slug: string;
  name: string;
  description: string;
  capabilities: unknown;
  sort_order: number;
};

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  cover_url: string | null;
  author_name: string;
  published_at: string | null;
  created_at: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  alt_text: string;
  project_date: string | null;
};

export type DocumentItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  file_url: string;
};

export const COMPANY = {
  name: "Shammah Innovation Holdings",
  tagline: "Integrated infrastructure. Engineered progress.",
  registration: "2026/529633/07",
  phone: "+27 65 592 2639",
  whatsapp: "27655922639",
  email: "shammahinnovation@gmail.com",
  address: "Johannesburg, Gauteng, South Africa",
  hours: "Monday – Friday, 08:00 – 17:00",
};

export function capabilitiesOf(service: Pick<Service, "capabilities">): string[] {
  const value = service.capabilities;
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === "string");
  return [];
}

export const companyQuery = queryOptions({
  queryKey: ["company"],
  queryFn: async (): Promise<typeof COMPANY> => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .order("sort_order")
      .single();
    if (error) throw error;
    const value = data?.value;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return { ...COMPANY, ...(value as unknown as Partial<typeof COMPANY>) };
    }
    console.log("Using default company data:", COMPANY);
    return COMPANY;
  },
});

export const divisionsQuery = queryOptions({
  queryKey: ["divisions"],
  queryFn: async (): Promise<Division[]> => {
    const { data, error } = await supabase
      .from("service_divisions")
      .select("id, slug, name, summary, icon, sort_order")
      .eq("status", "published")
      .order("sort_order");
    if (error) throw error;
    return data ?? [];
  },
});

export const servicesQuery = queryOptions({
  queryKey: ["services"],
  queryFn: async (): Promise<Service[]> => {
    const { data, error } = await supabase
      .from("services")
      .select("id, division_id, slug, name, description, capabilities, sort_order")
      .eq("status", "published")
      .order("sort_order");
    console.log("Fetched services data:", data);
    if (error) throw error;
    return data ?? [];
  },
});

export const postsQuery = queryOptions({
  queryKey: ["posts"],
  queryFn: async (): Promise<Post[]> => {
    const { data, error } = await supabase
      .from("posts")
      .select(
        "id, slug, title, excerpt, body, category, cover_url, author_name, published_at, created_at",
      )
      .eq("status", "published")
      .order("published_at", { ascending: false, nullsFirst: false });
    if (error) throw error;
    return data ?? [];
  },
});

export const galleryQuery = queryOptions({
  queryKey: ["gallery"],

  queryFn: async (): Promise<GalleryItem[]> => {
    // 1. Fetch gallery items from database
    const { data: dbData, error: dbError } = await supabase
      .from("gallery_items")
      .select("id, title, description, category, image_url, alt_text, project_date")
      .eq("status", "published")
      .order("sort_order");

    console.log("Database gallery data:", dbData);

    if (dbError && dbError.code !== "42P01") {
      console.error("Database gallery error:", dbError);
    }

    let items: GalleryItem[] = dbData ?? [];

    // 2. Fetch images from private Storage bucket
    try {
      const { data: files, error: filesError } = await supabase.storage.from("gallary").list("", {
        limit: 100,
      });

      console.log("Storage files:", files);
      console.log("Storage error:", filesError);

      if (!filesError && files) {
        const storageItems = await Promise.all(
          files
            .filter((file) => file.name !== ".emptyFolderPlaceholder" && file.id)
            .map(async (file) => {
              // Create temporary URL for private image
              const { data, error } = await supabase.storage
                .from("gallary")
                .createSignedUrl(file.name, 3600);

              if (error) {
                console.error(`Error creating signed URL for ${file.name}:`, error);

                return null;
              }

              return {
                id: file.id || `storage-${file.name}`,
                title: file.name.replace(/\.[^/.]+$/, ""),
                description: "Uploaded via Storage",
                category: "Gallery Storage",
                image_url: data.signedUrl,
                alt_text: file.name,
                project_date: file.created_at || null,
              };
            }),
        );

        // Remove files for which signed URLs could not be created
        const validStorageItems = storageItems.filter((item): item is GalleryItem => item !== null);

        items = [...items, ...validStorageItems];

        console.log("Combined gallery items:", items);
      } else if (filesError) {
        console.error("Storage gallery error:", filesError);
      }
    } catch (e) {
      console.error("Error fetching from storage:", e);
    }

    return items;
  },
});

export const documentsQuery = queryOptions({
  queryKey: ["documents"],
  queryFn: async (): Promise<DocumentItem[]> => {
    const { data, error } = await supabase
      .from("documents")
      .select("id, title, category, description, file_url")
      .eq("status", "published")
      .order("sort_order");
    if (error) throw error;
    return data ?? [];
  },
});
