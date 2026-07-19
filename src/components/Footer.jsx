import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
];

const services = [
  { label: 'Architecture', path: '/services/architecture' },
  { label: 'Interior Design', path: '/services/interior-design' },
  { label: 'Hotel Design', path: '/services/hotel-design' },
];

const socialLinks = [
  {
    name: 'Instagram',
    url: 'https://instagram.com/rsdgroupofdesign',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com/rsdgroupofdesign',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/company/rsdgroupofdesign',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/5 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px]">
        <div className="w-full h-full" style={{ background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)' }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-12 relative">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="text-2xl font-bold tracking-wider mb-4">
            <span className="gold-gradient-text">RSD</span>
            <span className="text-white/60 text-sm font-light ml-2">Group of Design</span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Transforming visions into extraordinary spaces since 2000. Award-winning architecture & interior design.
          </p>
          {/* Social Icons */}
          <div className="flex gap-3">
            {socialLinks.map(s => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={s.name}
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-gray-500 hover:text-amber-400 hover:border-amber-400/30 hover:bg-amber-400/5 transition-all duration-300"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
          <div className="space-y-3">
            {quickLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className="block text-gray-500 text-sm hover:text-amber-400 hover:translate-x-1 transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Services</h4>
          <div className="space-y-3">
            {services.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className="block text-gray-500 text-sm hover:text-amber-400 hover:translate-x-1 transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Get in Touch</h4>
          <div className="space-y-4 text-sm">
            <a href="https://maps.google.com" target="_blank" rel="noreferrer"
              className="flex items-start gap-3 text-gray-500 hover:text-gray-300 transition-colors group">
              <span className="text-lg mt-0.5">📍</span>
              <span>C-19A, C-scheme, Ashok Marg,<br />Jaipur, Rajasthan 302001</span>
            </a>
            <a href="tel:+919829000000" className="flex items-center gap-3 text-gray-500 hover:text-amber-400 transition-colors">
              <span className="text-lg">📞</span>
              <span>+91 98290 00000</span>
            </a>
            <a href="mailto:info@rsdgroup.in" className="flex items-center gap-3 text-gray-500 hover:text-amber-400 transition-colors">
              <span className="text-lg">✉️</span>
              <span>info@rsdgroup.in</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} RSD Group of Design. All rights reserved.
          </p>
          <p className="text-gray-700 text-xs">
            Designed with ❤️ in Jaipur
          </p>
        </div>
      </div>
    </footer>
  );
}