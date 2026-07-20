import { Link } from 'react-router-dom';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact Us', path: '/contact' },
  { label: 'Testimonials', path: '/testimonials' },
];

export default function Footer() {
  return (
    <footer style={{ background: '#2a3441', color: '#ffffff' }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '72px 40px 40px',
        display: 'grid', gridTemplateColumns: '1.3fr 0.8fr 1fr',
        gap: 60,
      }}>
        {/* Brand Column */}
        <div>
          {/* Logo placeholder */}
          <div style={{ marginBottom: 16 }}>
            <div style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: '1.6rem', color: '#fff', marginBottom: 4,
            }}>
              <span style={{ color: '#b8953f' }}>RSD</span>
            </div>
            <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Raamesh Singhal Design
            </p>
          </div>
          <p style={{
            color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', lineHeight: 1.7, maxWidth: 280, marginBottom: 24,
          }}>
            An architecture and interior design practice crafting spaces that are as functional as they are beautiful. Based in Siliguri since 1995.
          </p>
          {/* Social icons */}
          <div style={{ display: 'flex', gap: 10 }}>
            {['Fb', 'Ig', 'Wa'].map(label => (
              <a key={label} href="#" style={{
                width: 36, height: 36, borderRadius: 6,
                border: '1px solid rgba(255,255,255,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)',
                transition: 'all 0.3s ease',
              }}
                onMouseEnter={e => { e.target.style.borderColor = '#b8953f'; e.target.style.color = '#b8953f'; }}
                onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.color = 'rgba(255,255,255,0.4)'; }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{
            fontSize: '0.7rem', fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.5)', marginBottom: 28,
          }}>
            Quick Links
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {quickLinks.map(link => (
              <Link key={link.path} to={link.path} style={{
                color: 'rgba(255,255,255,0.35)', fontSize: '0.88rem',
                transition: 'color 0.3s ease',
              }}
                onMouseEnter={e => e.target.style.color = '#b8953f'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.35)'}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h4 style={{
            fontSize: '0.7rem', fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.5)', marginBottom: 28,
          }}>
            Contact Info
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Address */}
            <div>
              <p style={{ fontSize: '0.7rem', color: '#b8953f', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 4, fontWeight: 500 }}>Address</p>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                Time Square, 3rd Floor, Opp Ravi Auto,<br />Sevoke Road, Siliguri
              </p>
            </div>
            {/* Phone */}
            <div>
              <p style={{ fontSize: '0.7rem', color: '#b8953f', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 4, fontWeight: 500 }}>Phone</p>
              <a href="tel:+919800848155" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>+91 98008 48155</a>
            </div>
            {/* Email */}
            <div>
              <p style={{ fontSize: '0.7rem', color: '#b8953f', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 4, fontWeight: 500 }}>Email</p>
              <a href="mailto:rameshsinghaldesign@gmail.com" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>rameshsinghaldesign@gmail.com</a>
            </div>
            {/* Hours */}
            <div>
              <p style={{ fontSize: '0.7rem', color: '#b8953f', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 4, fontWeight: 500 }}>Hours</p>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                Mon–Fri: 9:00 – 22:00<br />Saturday: 11:00 – 20:00
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '20px 40px' }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem' }}>
            © {new Date().getFullYear()} Raamesh Singhal Design by Ramesh Singhal. All Rights Reserved.
          </p>
          <p style={{
            color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            fontFamily: "'Inter', sans-serif",
          }}>
            EST. 1995 — SILIGURI, INDIA
          </p>
        </div>
      </div>

      {/* Floating social buttons (right side) */}
      <div style={{
        position: 'fixed', right: 20, bottom: 100, zIndex: 90,
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        {[
          { bg: '#25D366', label: 'Wa', href: 'https://wa.me/919800848155' },
          { bg: '#E4405F', label: 'Ig', href: 'https://instagram.com' },
          { bg: '#1877F2', label: 'Fb', href: 'https://facebook.com' },
        ].map(s => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer" style={{
            width: 44, height: 44, borderRadius: '50%',
            background: s.bg, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.8rem', fontWeight: 600,
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            transition: 'transform 0.3s ease',
          }}
            onMouseEnter={e => e.target.style.transform = 'scale(1.15)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          >
            {s.label}
          </a>
        ))}
      </div>

      {/* Bottom floating buttons */}
      <div style={{
        position: 'fixed', right: 20, bottom: 30, zIndex: 90,
        display: 'flex', gap: 10,
      }}>
        {[
          { bg: 'rgba(0,0,0,0.7)', label: '💬' },
          { bg: 'rgba(0,0,0,0.7)', label: '📞' },
        ].map((s, i) => (
          <a key={i} href="#" style={{
            width: 44, height: 44, borderRadius: '50%',
            background: s.bg, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.1rem', boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          }}>
            {s.label}
          </a>
        ))}
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          footer > div:first-child {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </footer>
  );
}