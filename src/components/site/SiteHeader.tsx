import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Phone, Mail, X } from "lucide-react";
import { COMPANY } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import logo from "@/assets/shammah-logo.jpeg";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/industries", label: "Industries" },
  { to: "/insurance", label: "Insurance" },
  { to: "/tender-support", label: "Tender Support" },
  { to: "/gallery", label: "Gallery" },
  { to: "/news", label: "News & Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-navy-deep text-primary-foreground/80 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs">
          <p className="tracking-wide">
            South African delivery partner <span className="mx-2 text-gold">/</span>{" "}
            {COMPANY.tagline}
          </p>
          <div className="flex items-center gap-6">
            <a
              href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 hover:text-gold"
            >
              <Phone className="size-3.5" aria-hidden="true" />
              {COMPANY.phone}
            </a>
            <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 hover:text-gold">
              <Mail className="size-3.5" aria-hidden="true" />
              {COMPANY.email}
            </a>
          </div>
        </div>
      </div>

      <div className="bg-navy text-primary-foreground shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <span className="flex size-11 shrink-0 items-center justify-center overflow-hidden bg-white ring-1 ring-gold/50">
              <img
                src={logo}
                alt="Shammah Innovation Holdings logo"
                className="size-full object-contain"
              />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-base font-semibold uppercase tracking-[0.08em] sm:text-lg">
                Shammah
              </span>
              <span className="block text-[10px] uppercase tracking-[0.22em] text-gold sm:text-[11px]">
                Innovation Holdings
              </span>
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="px-3 py-2 text-sm font-medium uppercase tracking-wide text-primary-foreground/85 transition-colors hover:text-gold [&.active]:text-gold"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/quote"
              className="ml-3 bg-gold px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-navy-deep transition-colors hover:bg-gold-soft"
            >
              Get a Quote
            </Link>
          </nav>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="lg:hidden"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        <div className={cn("border-t border-white/10 lg:hidden", open ? "block" : "hidden")}>
          <nav aria-label="Mobile" className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-white/5 py-3 text-sm font-medium uppercase tracking-wide text-primary-foreground/85 [&.active]:text-gold"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/quote"
              onClick={() => setOpen(false)}
              className="mt-3 mb-3 bg-gold px-5 py-3 text-center text-sm font-semibold uppercase tracking-wide text-navy-deep"
            >
              Get a Quote
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
