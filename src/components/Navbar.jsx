import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

/**
 * Raamesh Singhal Design — Navbar
 * Transparent over the hero image, turns solid navy on scroll.
 * Pill-shaped nav links, white "Get Quote" button — matches the PDF layout.
 */

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Awards", href: "/awards" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact us", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 font-sans transition-colors duration-300 ${
        scrolled ? "bg-[#16232E]/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        {/* Logo — swap for real logo/wordmark later */}
        <a href="/" className="text-3xl font-light tracking-wide text-white">
          Logo
        </a>

        {/* Desktop nav pill */}
        <nav className="hidden lg:flex items-center gap-1 rounded-full border border-white/25 bg-white/10 px-2 py-2 backdrop-blur-sm">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm text-white/90 hover:bg-white/15 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="/contact"
            className="hidden lg:inline-flex items-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#16232E] hover:bg-white/90 transition-colors"
          >
            Get Quote
          </a>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#16232E]/98 px-6 pb-6">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-lg px-3 py-3 text-sm text-white/90 hover:bg-white/10"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/contact"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#16232E]"
            >
              Get Quote
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}