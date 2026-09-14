import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { galleryQuery } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Trash2, Upload } from "lucide-react";

export const Route = createFileRoute("/admin/gallery")({
  component: AdminGallery,
});

function AdminGallery() {
  const queryClient = useQueryClient();
  const gallery = useQuery(galleryQuery);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      // Check if it's a storage item
      if (id.startsWith("storage-")) {
        const fileName = id.replace("storage-", "");
        const { error } = await supabase.storage.from("gallary").remove([fileName]);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("gallery_items").delete().eq("id", id);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Image deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    },
    onError: (error) => {
      toast.error(`Error deleting image: ${error.message}`);
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async (uploadFile: File) => {
      const fileExt = uploadFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const { error } = await supabase.storage.from("gallary").upload(fileName, uploadFile);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Image uploaded successfully");
      setFile(null);
      // Reset file input
      const fileInput = document.getElementById("picture") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    },
    onError: (error) => {
      toast.error(`Upload failed: ${error.message}`);
    },
    onSettled: () => {
      setUploading(false);
    },
  });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    uploadMutation.mutate(file);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-navy">Gallery Management</h1>
        <p className="text-muted-foreground mt-2">Upload new images or remove existing ones.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleUpload} className="flex flex-col sm:flex-row items-end gap-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Picture</Label>
              <Input 
                id="picture" 
                type="file" 
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                required
              />
            </div>
            <Button type="submit" disabled={!file || uploading} className="bg-navy hover:bg-navy/90 text-white">
              <Upload className="mr-2 h-4 w-4" />
              {uploading ? "Uploading..." : "Upload Image"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.isLoading ? (
          <p className="text-sm text-muted-foreground">Loading gallery...</p>
        ) : gallery.data?.map((item) => (
          <div key={item.id} className="relative group rounded-md overflow-hidden border bg-card">
            <div className="aspect-square">
              <img 
                src={item.image_url} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
              <p className="text-white text-xs font-medium truncate">{item.title}</p>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => {
                  if (confirm("Are you sure you want to delete this image?")) {
                    deleteMutation.mutate(item.id);
                  }
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
