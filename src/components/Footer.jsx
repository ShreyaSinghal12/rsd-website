import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronRight,
} from "lucide-react";

import {
  FaFacebook,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

/**
 * RSD Footer ("footbar")
 * 4 columns: brand/about, quick links, products, contact info
 * + bottom bar with copyright and legal links.
 * Swap the arrays / paragraph below once real copy is ready.
 */

const SOCIALS = [
  { icon: FaFacebook, href: "#", label: "FaFacebook" },
  { icon: FaTwitter, href: "#", label: "FaTwitter" },
  { icon: FaLinkedIn, href: "#", label: "FaLinkedIn" },
  { icon: FaInstagram, href: "#", label: "FaInstagram" },
];

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact Us", href: "/contact" },
];

const PRODUCTS = [
  { label: "Rolling Shutters", href: "/products/rolling-shutters" },
  { label: "Security Doors", href: "/products/security-doors" },
  { label: "Fire Rated Doors", href: "/products/fire-rated-doors" },
  { label: "Industrial Gates", href: "/products/industrial-gates" },
  { label: "Automatic Doors", href: "/products/automatic-doors" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1C32] text-slate-300 font-sans">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-white/10">
                <span className="text-lg font-extrabold tracking-tight text-[#F2811D]">
                  RSD
                </span>
              </div>
              <p className="text-lg font-extrabold tracking-tight text-white">
                RSD Industries
              </p>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Engineering durable steel doors and rolling shutters for
              industrial, commercial, and residential projects — built to
              perform for decades.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-600 text-slate-300 hover:border-[#F2811D] hover:text-[#F2811D] transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-slate-400 hover:text-[#F2811D] transition-colors"
                  >
                    <ChevronRight
                      size={14}
                      className="text-[#F2811D] transition-transform group-hover:translate-x-0.5"
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-white">
              Our Products
            </h3>
            <ul className="space-y-3">
              {PRODUCTS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-slate-400 hover:text-[#F2811D] transition-colors"
                  >
                    <ChevronRight
                      size={14}
                      className="text-[#F2811D] transition-transform group-hover:translate-x-0.5"
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-white">
              Contact Info
            </h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[#F2811D]" />
                <span>1245 Industrial Parkway, Suite 200, Springfield</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 shrink-0 text-[#F2811D]" />
                <a href="tel:+18005550142" className="hover:text-[#F2811D]">
                  +1 (800) 555-0142
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 shrink-0 text-[#F2811D]" />
                <a
                  href="mailto:info@rsdindustries.com"
                  className="hover:text-[#F2811D]"
                >
                  info@rsdindustries.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} className="mt-0.5 shrink-0 text-[#F2811D]" />
                <span>Mon – Sat: 9:00 AM – 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-slate-400 sm:flex-row">
          <p>© {year} RSD Industries. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            {LEGAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#F2811D] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}