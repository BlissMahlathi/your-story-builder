import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { COMPANY } from "@/lib/site-data";
import logo from "@/assets/shammah-logo.jpeg";

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-primary-foreground/75">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center overflow-hidden bg-white ring-1 ring-gold/50">
              <img
                src={logo}
                alt="Shammah Innovation Holdings logo"
                className="size-full object-contain"
              />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-base font-semibold uppercase tracking-[0.08em] text-primary-foreground">
                Shammah
              </span>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-gold">
                Innovation Holdings
              </span>
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed">{COMPANY.tagline}</p>
          <p className="mt-4 text-xs">Reg. No. {COMPANY.registration}</p>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Company
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-gold">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-gold">
                Our Services
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:text-gold">
                Project Gallery
              </Link>
            </li>
            <li>
              <Link to="/news" className="hover:text-gold">
                News &amp; Blog
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Get Started
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/quote" className="hover:text-gold">
                Request a Quote
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gold">
                Contact Us
              </Link>
            </li>
            <li>
              <a
                href={`https://wa.me/${COMPANY.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold"
              >
                WhatsApp Us
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Contact
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              {COMPANY.address}
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="hover:text-gold">
                {COMPANY.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <a href={`mailto:${COMPANY.email}`} className="break-all hover:text-gold">
                {COMPANY.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              {COMPANY.hours}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 text-xs">
          © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
