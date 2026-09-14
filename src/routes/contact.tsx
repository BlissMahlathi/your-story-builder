import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock, MessageCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { COMPANY } from "@/lib/site-data";
import { supabase } from "@/integrations/supabase/client";
import { createPageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    createPageHead({
      title: "Contact Us | Shammah Innovation Holdings",
      description:
        "Get in touch with Shammah Innovation Holdings by phone, email or WhatsApp, or send us a message using the contact form.",
      path: "/contact",
    }),
  component: ContactPage,
});

function ContactPage() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSending(true);

    const { error } = await supabase.from("enquiries").insert({
      type: "contact",
      full_name: String(data.get("full_name") ?? "").slice(0, 120),
      company_name: String(data.get("company_name") ?? "").slice(0, 120),
      email: String(data.get("email") ?? "").slice(0, 160),
      phone: String(data.get("phone") ?? "").slice(0, 40),
      subject: String(data.get("subject") ?? "").slice(0, 160),
      message: String(data.get("message") ?? "").slice(0, 4000),
    });

    setSending(false);
    if (error) {
      toast.error("We could not send your message. Please try again or call us.");
      return;
    }
    form.reset();
    setSent(true);
    toast.success("Thank you — your message has been received.");
  }

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Talk to us"
        title="Contact Us"
        description="Tell us what you need and the right division will respond within one business day."
        breadcrumb="Contact"
      />

      <section className="bg-background py-14">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[1.2fr_1fr]">
          <div className="border border-border bg-card p-6 shadow-sm md:p-8">
            <h2 className="font-display text-xl font-bold uppercase tracking-tight text-navy">
              Send us a message
            </h2>
            {sent ? (
              <p className="mt-3 border-l-4 border-gold bg-muted p-4 text-sm text-foreground/80">
                Your message is with our team. We will be in touch shortly.
              </p>
            ) : null}
            <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" name="full_name" required />
              <Field label="Company (optional)" name="company_name" />
              <Field label="Email address" name="email" type="email" required />
              <Field label="Phone number" name="phone" required />
              <div className="sm:col-span-2">
                <Field label="Subject" name="subject" required />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="text-xs font-semibold uppercase tracking-wide text-navy"
                >
                  Message
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
                className="inline-flex items-center justify-center gap-2 bg-navy px-6 py-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-navy-deep disabled:opacity-60 sm:col-span-2"
              >
                {sending ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
                Send message
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-navy p-6 text-primary-foreground">
              <h2 className="font-display text-lg font-bold uppercase tracking-tight">
                Company details
              </h2>
              <ul className="mt-5 space-y-4 text-sm">
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
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                  <span>{COMPANY.address}</span>
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                  <span>{COMPANY.hours}</span>
                </li>
              </ul>
              <p className="mt-5 text-xs text-primary-foreground/70">
                Company registration {COMPANY.registration}
              </p>
            </div>

            <a
              href={`https://wa.me/${COMPANY.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-gold px-6 py-4 text-sm font-semibold uppercase tracking-wide text-navy-deep transition-colors hover:bg-gold-soft"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Chat with us on WhatsApp
            </a>

            <div className="border border-border bg-card p-6">
              <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-navy">
                Where we operate
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Head office in {COMPANY.address}. Project teams deploy nationally across all nine
                provinces.
              </p>
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
