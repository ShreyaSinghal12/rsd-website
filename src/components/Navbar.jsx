import { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

import {
  FaFacebook,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

/**
 * RSD Navbar
 * - Slim dark utility bar (contact info + socials) on top
 * - Main nav bar below it (logo, links, CTA button)
 * - Collapses into a slide-down mobile menu under `md`
 *
 * Swap CONTACT / SOCIALS / NAV_LINKS content below once real copy is ready.
 */

const CONTACT = {
  phone: "+1 (800) 555-0142",
  email: "info@rsdindustries.com",
  hours: "Mon – Sat: 9:00 AM – 6:00 PM",
};

const SOCIALS = [
  { icon: FaFacebook, href: "#", label: "FaFacebook" },
  { icon: FaTwitter, href: "#", label: "FaTwitter" },
  { icon: FaLinkedin, href: "#", label: "FaLinkedIn" },
  { icon: FaInstagram, href: "#", label: "FaInstagram" },
];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "Rolling Shutters", href: "/products/rolling-shutters" },
      { label: "Security Doors", href: "/products/security-doors" },
      { label: "Fire Rated Doors", href: "/products/fire-rated-doors" },
    ],
  },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full font-sans">
      {/* Utility bar */}
      <div className="hidden md:block bg-[#0B1C32] text-slate-300 text-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${CONTACT.phone}`}
              className="flex items-center gap-2 hover:text-[#F2811D] transition-colors"
            >
              <Phone size={14} />
              {CONTACT.phone}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-2 hover:text-[#F2811D] transition-colors"
            >
              <Mail size={14} />
              {CONTACT.email}
            </a>
            <span className="flex items-center gap-2 text-slate-400">
              <MapPin size={14} />
              {CONTACT.hours}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-600 text-slate-300 hover:border-[#F2811D] hover:text-[#F2811D] transition-colors"
              >
                <Icon size={13} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div
        className={`bg-white transition-shadow ${
          scrolled ? "shadow-md" : "shadow-sm"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[#0B1C32]">
              <span className="text-lg font-extrabold tracking-tight text-[#F2811D]">
                RSD
              </span>
            </div>
            <div className="leading-tight">
              <p className="text-lg font-extrabold tracking-tight text-[#0B1C32]">
                RSD Industries
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Steel Doors &amp; Shutters
              </p>
            </div>
          </a>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <div key={link.label} className="relative group">
                <a
                  href={link.href}
                  className="flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-[#0B1C32] hover:text-[#F2811D] transition-colors py-2"
                >
                  {link.label}
                  {link.children && <ChevronDown size={14} />}
                </a>
                {link.children && (
                  <div className="invisible absolute left-0 top-full w-56 rounded-lg border border-slate-100 bg-white py-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100">
                    {link.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-[#F2811D]"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/quote"
              className="hidden lg:inline-flex items-center rounded-md bg-[#F2811D] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-sm hover:bg-[#d76f13] transition-colors"
            >
              Get A Quote
            </a>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-[#0B1C32]"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-lg">
          <nav className="flex flex-col px-6 py-4">
            {NAV_LINKS.map((link) => (
              <div key={link.label} className="border-b border-slate-100 last:border-0">
                <button
                  className="flex w-full items-center justify-between py-3 text-sm font-semibold uppercase tracking-wide text-[#0B1C32]"
                  onClick={() =>
                    link.children
                      ? setOpenSubmenu((cur) => (cur === link.label ? null : link.label))
                      : undefined
                  }
                >
                  <a href={link.href}>{link.label}</a>
                  {link.children && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        openSubmenu === link.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>
                {link.children && openSubmenu === link.label && (
                  <div className="pb-2 pl-3">
                    {link.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="block py-2 text-sm font-medium text-slate-500"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a
              href="/quote"
              className="mt-4 inline-flex items-center justify-center rounded-md bg-[#F2811D] px-5 py-3 text-sm font-bold uppercase tracking-wide text-white"
            >
              Get A Quote
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}