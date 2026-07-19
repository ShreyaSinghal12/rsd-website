import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

/**
 * Raamesh Singhal Design — Footer ("footbar")
 * Near-black background, 3 columns (brand, quick links, contact info)
 * + bottom bar, + fixed floating social buttons bottom-right (as in the PDF).
 */

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact Us", href: "/contact" },
  { label: "Testimonials", href: "/testimonials" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#121212] font-sans text-slate-400">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#C9A26A]">
              Raamesh Singhal Design
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              An architecture and interior design practice crafting spaces
              that are as functional as they are beautiful. Based in
              Siliguri since 1995.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {["Fb", "Ig", "Wa"].map((label) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center border border-slate-700 text-xs text-slate-300 hover:border-[#C9A26A] hover:text-[#C9A26A] transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-white">Quick Links</h3>
            <ul className="mt-5 space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-[#C9A26A] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-sm font-semibold text-white">Contact Info</h3>
            <div className="mt-5 space-y-4 text-sm">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C9A26A]">
                  Address
                </p>
                <p className="mt-1 text-slate-400">
                  Time Square, 3rd Floor, Opp Ravi Auto, Sevoke Road, Siliguri
                </p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C9A26A]">
                  Phone
                </p>
                <a href="tel:+919800848155" className="mt-1 block text-slate-400 hover:text-[#C9A26A]">
                  +91 98008 48155
                </a>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C9A26A]">
                  Email
                </p>
                <a
                  href="mailto:rameshsinghaldesign@gmail.com"
                  className="mt-1 block text-slate-400 hover:text-[#C9A26A]"
                >
                  rameshsinghaldesign@gmail.com
                </a>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C9A26A]">
                  Hours
                </p>
                <p className="mt-1 text-slate-400">
                  Mon–Fri: 9:00 – 22:00
                  <br />
                  Saturday: 11:00 – 20:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-slate-500 sm:flex-row lg:px-10">
          <p>© 2024 Raamesh Singhal Design by Ramesh Singhal. All Rights Reserved.</p>
          <p className="tracking-[0.2em]">EST. 1995 — SILIGURI, INDIA</p>
        </div>
      </div>

      {/* Floating action buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <a
          href="https://wa.me/919800848155"
          aria-label="WhatsApp"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg"
        >
          <MessageCircle size={20} />
        </a>
        <a
          href="#"
          aria-label="Instagram"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white shadow-lg"
        >
          <span className="text-lg">📷</span>
        </a>
        <a
          href="#"
          aria-label="Facebook"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-lg"
        >
          <span className="text-lg font-bold">f</span>
        </a>
        <a
          href="/contact"
          aria-label="Chat"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2b2b2b] text-white shadow-lg"
        >
          <MessageCircle size={18} />
        </a>
        <a
          href="tel:+919800848155"
          aria-label="Call"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2b2b2b] text-white shadow-lg"
        >
          <Phone size={18} />
        </a>
      </div>
    </footer>
  );
}