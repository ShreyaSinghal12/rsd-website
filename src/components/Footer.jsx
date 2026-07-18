import { useLocation, useNavigate } from 'react-router-dom'

const S = { gold: '#C9A96E', ink: '#111110', cream: '#F2EEE6', mid: '#A39F94', line: 'rgba(201,169,110,0.22)' }

const quickLinks = [
  { label: 'Home', anchor: 'hero' },
  { label: 'About Us', anchor: 'about' },
  { label: 'Services', anchor: 'services' },
  { label: 'Projects', anchor: 'portfolio' },
  { label: 'Awards and News', anchor: 'awards-news' },
  { label: 'Testimonials', anchor: 'testimonials' },
  { label: 'Contact Us', anchor: 'contact' },
]

export default function Footer() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const scrollTo = (anchor) => {
    if (pathname !== '/') {
      navigate('/')
      setTimeout(() => { const el = document.getElementById(anchor); if (el) el.scrollIntoView({ behavior: 'smooth' }) }, 300)
    } else {
      const el = document.getElementById(anchor)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer style={{ background: S.ink, borderTop: `1px solid ${S.line}`, padding: '4rem 0 0' }}>
      <div className="footer-grid" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem 3rem', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1.2fr', gap: '3rem' }}>

        <div>
          <img src="https://raameshsinghaldesign.com/wp-content/uploads/2023/01/cropped-rsd-logo-1.png" alt="Raamesh Singhal Design" style={{ height: 44, width: 'auto', display: 'block', filter: 'brightness(100)', marginBottom: '1.2rem' }} />
          <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.05rem', color: S.cream, marginBottom: '0.9rem', fontStyle: 'italic' }}>One studio. One standard. One name on every decision.</p>
          <p style={{ fontSize: '0.85rem', color: S.mid, lineHeight: 1.8, maxWidth: 340 }}>Architecture, interiors, and turnkey execution held under one accountable team since 1995 — serving Siliguri, Sikkim, Nepal, Bhutan, and Assam.</p>
        </div>

        <div>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: S.gold, marginBottom: '1.2rem' }}>Quick Links</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {quickLinks.map(link => (
              <button key={link.anchor} onClick={() => scrollTo(link.anchor)} style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", fontSize: '0.88rem', color: S.mid, padding: 0, transition: 'color 0.25s' }} onMouseEnter={e => e.currentTarget.style.color = S.gold} onMouseLeave={e => e.currentTarget.style.color = S.mid}>{link.label}</button>
            ))}
          </div>
        </div>

        <div>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: S.gold, marginBottom: '1.2rem' }}>Contact</p>
          <p style={{ fontSize: '0.88rem', color: S.mid, lineHeight: 1.8, marginBottom: '0.9rem' }}>Time Square, 3rd Floor, Opp Ravi Auto,<br />Sevoke Road, Siliguri</p>
          <a href="tel:+919800848155" style={{ display: 'block', fontSize: '0.88rem', color: S.mid, textDecoration: 'none', marginBottom: '0.4rem', transition: 'color 0.25s' }} onMouseEnter={e => e.currentTarget.style.color = S.gold} onMouseLeave={e => e.currentTarget.style.color = S.mid}>+91 98008 48155</a>
          <a href="tel:+918250841773" style={{ display: 'block', fontSize: '0.88rem', color: S.mid, textDecoration: 'none', marginBottom: '0.4rem', transition: 'color 0.25s' }} onMouseEnter={e => e.currentTarget.style.color = S.gold} onMouseLeave={e => e.currentTarget.style.color = S.mid}>+91 82508 41773</a>
          <a href="mailto:rameshsinghaldesign@gmail.com" style={{ display: 'block', fontSize: '0.88rem', color: S.mid, textDecoration: 'none', marginBottom: '0.9rem', transition: 'color 0.25s' }} onMouseEnter={e => e.currentTarget.style.color = S.gold} onMouseLeave={e => e.currentTarget.style.color = S.mid}>rameshsinghaldesign@gmail.com</a>
          <p style={{ fontSize: '0.82rem', color: S.mid, lineHeight: 1.7 }}>Mon-Fri: 9:00-22:00<br />Saturday: 11:00-20:00</p>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${S.line}`, padding: '1.4rem 2rem', textAlign: 'center' }}>
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.65rem', letterSpacing: '0.12em', color: S.mid }}>© {new Date().getFullYear()} Raamesh Singhal Design. All rights reserved. · Est. 1995 · Siliguri, India</p>
      </div>
    </footer>
  )
}