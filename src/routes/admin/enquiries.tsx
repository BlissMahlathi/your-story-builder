import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export const Route = createFileRoute("/admin/enquiries")({
  component: AdminEnquiries,
});

const statuses = ["new", "in_progress", "responded", "closed"] as const;

type EnquiryStatus = (typeof statuses)[number];
type Enquiry = Database["public"]["Tables"]["enquiries"]["Row"];

function AdminEnquiries() {
  const queryClient = useQueryClient();
  const enquiries = useQuery({
    queryKey: ["admin-enquiries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("enquiries")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      status,
      internal_notes,
    }: {
      id: string;
      status: EnquiryStatus;
      internal_notes: string;
    }) => {
      const { error } = await supabase
        .from("enquiries")
        .update({ status, internal_notes })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Enquiry updated");
      queryClient.invalidateQueries({ queryKey: ["admin-enquiries"] });
    },
    onError: (error) => toast.error(`Could not update enquiry: ${error.message}`),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-navy">Enquiries</h1>
        <p className="mt-2 text-muted-foreground">
          Review quote requests and contact messages submitted through the website.
        </p>
      </div>

      {enquiries.isLoading ? (
        <p className="text-sm text-muted-foreground">Loading enquiries...</p>
      ) : null}
      {enquiries.isError ? (
        <p className="text-sm text-destructive">
          Unable to load enquiries. Check your staff access.
        </p>
      ) : null}
      {!enquiries.isLoading && enquiries.data?.length === 0 ? (
        <p className="text-sm text-muted-foreground">No enquiries have been received yet.</p>
      ) : null}

      <div className="space-y-4">
        {enquiries.data?.map((enquiry) => (
          <EnquiryCard
            key={enquiry.id}
            enquiry={enquiry}
            isSaving={updateMutation.isPending}
            onSave={(values) => updateMutation.mutate({ id: enquiry.id, ...values })}
          />
        ))}
      </div>
    </div>
  );
}

function EnquiryCard({
  enquiry,
  isSaving,
  onSave,
}: {
  enquiry: Enquiry;
  isSaving: boolean;
  onSave: (values: { status: EnquiryStatus; internal_notes: string }) => void;
}) {
  return <EnquiryCardContent enquiry={enquiry} isSaving={isSaving} onSave={onSave} />;
}

function EnquiryCardContent({
  enquiry,
  isSaving,
  onSave,
}: {
  enquiry: Enquiry;
  isSaving: boolean;
  onSave: (values: { status: EnquiryStatus; internal_notes: string }) => void;
}) {
  const [status, setStatus] = useState<EnquiryStatus>(enquiry.status);
  const [notes, setNotes] = useState(enquiry.internal_notes ?? "");

  return (
    <Card>
      <CardHeader className="gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <CardTitle className="text-lg">{enquiry.full_name}</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            {enquiry.type === "quote" ? "Quote request" : "Contact message"} ·{" "}
            {new Date(enquiry.created_at).toLocaleString("en-ZA")}
          </p>
        </div>
        <Badge variant={status === "new" ? "default" : "secondary"}>
          {status.replace("_", " ")}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-4 text-sm">
          <a
            className="inline-flex items-center gap-2 text-navy hover:text-gold"
            href={`mailto:${enquiry.email}`}
          >
            <Mail className="size-4" aria-hidden="true" /> {enquiry.email}
          </a>
          <a
            className="inline-flex items-center gap-2 text-navy hover:text-gold"
            href={`tel:${enquiry.phone}`}
          >
            <Phone className="size-4" aria-hidden="true" /> {enquiry.phone}
          </a>
        </div>
        <dl className="grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-semibold">Company</dt>
            <dd className="text-muted-foreground">{enquiry.company_name || "Not provided"}</dd>
          </div>
          <div>
            <dt className="font-semibold">Service</dt>
            <dd className="text-muted-foreground">
              {enquiry.service_requested || "Not specified"}
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Timeline</dt>
            <dd className="text-muted-foreground">{enquiry.timeline || "Not provided"}</dd>
          </div>
          <div>
            <dt className="font-semibold">Location</dt>
            <dd className="text-muted-foreground">{enquiry.location || "Not provided"}</dd>
          </div>
        </dl>
        <div className="border-l-4 border-gold bg-muted p-4 text-sm leading-relaxed">
          {enquiry.message}
        </div>
        <div className="grid gap-3 sm:grid-cols-[180px_1fr_auto] sm:items-end">
          <label className="grid gap-1 text-sm font-semibold">
            Status
            <select
              className="h-10 border border-input bg-background px-3 font-normal"
              value={status}
              onChange={(event) => setStatus(event.target.value as EnquiryStatus)}
            >
              {statuses.map((item) => (
                <option key={item} value={item}>
                  {item.replace("_", " ")}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1 text-sm font-semibold">
            Internal notes
            <Textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              maxLength={5000}
              placeholder="Add follow-up notes"
            />
          </label>
          <Button disabled={isSaving} onClick={() => onSave({ status, internal_notes: notes })}>
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
