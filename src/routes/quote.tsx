import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Phone, Mail } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { COMPANY, divisionsQuery, servicesQuery } from "@/lib/site-data";
import { supabase } from "@/integrations/supabase/client";
import { createPageHead } from "@/lib/seo";

export const Route = createFileRoute("/quote")({
  head: () =>
    createPageHead({
      title: "Get a Quote | Shammah Innovation Holdings",
      description:
        "Request a detailed quotation for construction, engineering, IT, agriculture, occupational health, logistics or compliance services.",
      path: "/quote",
    }),
  component: QuotePage,
});

const STEPS = [
  { title: "Submit your request", text: "Share your scope, quantities, location and timeline." },
  {
    title: "Technical review",
    text: "The relevant division reviews the requirement and clarifies details.",
  },
  { title: "Costed proposal", text: "You receive an itemised quotation with lead times." },
  { title: "Delivery", text: "On approval we mobilise and report progress throughout." },
];

function QuotePage() {
  const divisions = useQuery(divisionsQuery);
  const services = useQuery(servicesQuery);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSending(true);

    const { error } = await supabase.from("enquiries").insert({
      type: "quote",
      full_name: String(data.get("full_name") ?? "").slice(0, 120),
      company_name: String(data.get("company_name") ?? "").slice(0, 120),
      email: String(data.get("email") ?? "").slice(0, 160),
      phone: String(data.get("phone") ?? "").slice(0, 40),
      service_requested: String(data.get("service_requested") ?? "").slice(0, 160),
      quantity: String(data.get("quantity") ?? "").slice(0, 120),
      budget: String(data.get("budget") ?? "").slice(0, 120),
      timeline: String(data.get("timeline") ?? "").slice(0, 120),
      location: String(data.get("location") ?? "").slice(0, 160),
      message: String(data.get("message") ?? "").slice(0, 4000),
    });

    setSending(false);
    if (error) {
      toast.error("We could not submit your request. Please try again or call us.");
      return;
    }
    form.reset();
    setSent(true);
    toast.success("Quote request received — we will respond shortly.");
  }

  const options = (divisions.data ?? []).map((division) => ({
    division,
    items: (services.data ?? []).filter((service) => service.division_id === division.id),
  }));

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Pricing"
        title="Get a Quote"
        description="Give us the detail and we will return an itemised, costed proposal."
        breadcrumb="Get a Quote"
      />

      <section className="bg-background py-14">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[1.2fr_1fr]">
          <div className="border border-border bg-card p-6 shadow-sm md:p-8">
            <h2 className="font-display text-xl font-bold uppercase tracking-tight text-navy">
              Quote request
            </h2>
            {sent ? (
              <p className="mt-3 border-l-4 border-gold bg-muted p-4 text-sm text-foreground/80">
                Your request has been logged. Our team will contact you with a proposal.
              </p>
            ) : null}
            <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" name="full_name" required />
              <Field label="Company (optional)" name="company_name" />
              <Field label="Email address" name="email" type="email" required />
              <Field label="Phone number" name="phone" required />
              <div className="sm:col-span-2">
                <label
                  htmlFor="service_requested"
                  className="text-xs font-semibold uppercase tracking-wide text-navy"
                >
                  Service required
                </label>
                <select
                  id="service_requested"
                  name="service_requested"
                  required
                  className="mt-1 w-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-gold"
                >
                  <option value="">Select a service</option>
                  {options.map(({ division, items }) => (
                    <optgroup key={division.id} label={division.name}>
                      {items.map((service) => (
                        <option key={service.id} value={`${division.name} — ${service.name}`}>
                          {service.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                  <option value="Other / not listed">Other / not listed</option>
                </select>
              </div>
              <Field label="Quantity or scale" name="quantity" />
              <Field label="Indicative budget" name="budget" />
              <Field label="Required timeline" name="timeline" />
              <Field label="Site location" name="location" />
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="text-xs font-semibold uppercase tracking-wide text-navy"
                >
                  Project details
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  maxLength={4000}
                  className="mt-1 w-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-gold"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center justify-center gap-2 bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wide text-navy-deep transition-colors hover:bg-gold-soft disabled:opacity-60 sm:col-span-2"
              >
                {sending ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
                Submit request
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-navy p-6 text-primary-foreground">
              <h2 className="font-display text-lg font-bold uppercase tracking-tight">
                How it works
              </h2>
              <ol className="mt-5 space-y-5">
                {STEPS.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex size-8 shrink-0 items-center justify-center bg-gold font-display text-sm font-bold text-navy-deep">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-display text-sm font-semibold uppercase tracking-wide">
                        {step.title}
                      </p>
                      <p className="mt-1 text-sm text-primary-foreground/75">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="border border-border bg-card p-6">
              <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-navy">
                Prefer to speak to someone?
              </h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                  <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="hover:text-gold">
                    {COMPANY.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                  <a href={`mailto:${COMPANY.email}`} className="hover:text-gold">
                    {COMPANY.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-xs font-semibold uppercase tracking-wide text-navy">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        maxLength={160}
        className="mt-1 w-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-gold"
      />
    </div>
  );
}
