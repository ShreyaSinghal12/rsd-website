import { Link } from 'react-router-dom';
import ChatWidget from './ChatWidget';

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
          {
            bg: '#25D366', label: 'WhatsApp', href: 'https://wa.me/919800848155',
            icon: <svg viewBox="0 0 24 24" width="22" height="22" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>,
          },
          {
            bg: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
            label: 'Instagram', href: 'https://instagram.com/raameshsinghaldesign',
            icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.4" cy="6.6" r="1" fill="white" stroke="none" /></svg>,
          },
          {
            bg: '#1877F2', label: 'Facebook', href: 'https://facebook.com/raameshsinghaldesign',
            icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" /></svg>,
          },
        ].map(s => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} style={{
            width: 44, height: 44, borderRadius: '50%',
            background: s.bg, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            transition: 'transform 0.3s ease',
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {s.icon}
          </a>
        ))}
      </div>

      {/* Bottom floating buttons: chat + call */}
      <div style={{
        position: 'fixed', right: 20, bottom: 30, zIndex: 90,
        display: 'flex', gap: 10,
      }}>
        <ChatWidget />
        <a href="tel:+918250841773" aria-label="Call us" style={{
          width: 44, height: 44, borderRadius: '50%',
          background: 'rgba(0,0,0,0.7)', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          transition: 'transform 0.3s ease',
        }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
        </a>
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