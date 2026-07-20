import { Link } from 'react-router-dom';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About us', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Services', path: '/services' },
  { label: 'Contact us', path: '/contact' },
];

const services = [
  { label: 'Architecture', path: '/services/architecture' },
  { label: 'Interior Design', path: '/services/interior-design' },
  { label: 'Turnkey Projects', path: '/services/turnkey' },
  { label: 'PMC', path: '/services/pmc' },
];

export default function Footer() {
  return (
    <footer style={{ background: '#1c2a3a', color: '#ffffff' }}>
      {/* Main footer content */}
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '80px 40px 40px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '48px',
      }}>
        {/* Brand */}
        <div>
          <div style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: '2rem',
            marginBottom: 16,
          }}>
            <span style={{ color: '#b8953f' }}>RSD</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', fontFamily: 'Inter, sans-serif', fontWeight: 300, marginLeft: 8 }}>
              Group of Design
            </span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: 280 }}>
            Transforming visions into extraordinary spaces since 1995. Award-winning architecture & interior design.
          </p>
          {/* Social Icons */}
          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            {['Instagram', 'Facebook', 'LinkedIn'].map(name => (
              <a key={name} href="#" target="_blank" rel="noreferrer" aria-label={name}
                style={{
                  width: 40, height: 40, borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => { e.target.style.borderColor = 'rgba(184,149,63,0.5)'; e.target.style.color = '#b8953f'; }}
                onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.color = 'rgba(255,255,255,0.4)'; }}
              >
                {name[0]}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 24, color: 'rgba(255,255,255,0.8)' }}>
            Quick Links
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {quickLinks.map(link => (
              <Link key={link.path} to={link.path}
                style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', transition: 'color 0.3s ease' }}
                onMouseEnter={e => e.target.style.color = '#b8953f'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 24, color: 'rgba(255,255,255,0.8)' }}>
            Services
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {services.map(link => (
              <Link key={link.path} to={link.path}
                style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', transition: 'color 0.3s ease' }}
                onMouseEnter={e => e.target.style.color = '#b8953f'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 24, color: 'rgba(255,255,255,0.8)' }}>
            Get in Touch
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontSize: '0.9rem' }}>
            <a href="https://maps.google.com" target="_blank" rel="noreferrer"
              style={{ color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'flex-start', gap: 10, lineHeight: 1.5 }}>
              <span style={{ fontSize: '1.1rem', marginTop: 2 }}>📍</span>
              <span>Siliguri, West Bengal, India</span>
            </a>
            <a href="tel:+919829000000" style={{ color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: '1.1rem' }}>📞</span>
              <span>+91 98290 00000</span>
            </a>
            <a href="mailto:info@rsdgroup.in" style={{ color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: '1.1rem' }}>✉️</span>
              <span>info@rsdgroup.in</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '24px 40px' }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 16,
        }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} RSD Group of Design. All rights reserved.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem' }}>
            Designed with ❤️ in India
          </p>
        </div>
      </div>
    </footer>
  );
}
