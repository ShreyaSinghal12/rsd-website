import { useState, useEffect } from 'react'

const links = [
  { label: 'Home',         anchor: 'hero' },
  { label: 'About Us',     anchor: 'about' },
  { label: 'Services',     anchor: 'services' },
  { label: 'Projects',     anchor: 'portfolio' },
  { label: 'Testimonials', anchor: 'testimonials' },
  { label: 'Contact Us',   anchor: 'contact' },
]

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)
  const [activeLink, setActiveLink] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
      const offsets = links.map(link => {
        const el = document.getElementById(link.anchor)
        if (!el) return { anchor: link.anchor, top: Infinity }
        return { anchor: link.anchor, top: Math.abs(el.getBoundingClientRect().top - 80) }
      })
      const closest = offsets.reduce((a, b) => a.top < b.top ? a : b)
      setActiveLink(closest.anchor)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (anchor) => {
    const el = document.getElementById(anchor)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(247,244,239,0.97)',
        backdropFilter: 'blur(14px)',
        boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.07)' : 'none',
        transition: 'box-shadow 0.45s ease',
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', alignItems: 'stretch', height: 68 }}>

          {/* Logo */}
          <button onClick={() => scrollTo('hero')} style={{ display: 'flex', alignItems: 'center', padding: '0 2rem', borderRight: '1px solid rgba(26,26,24,0.1)', background: 'none', border: 'none', borderRight: '1px solid rgba(26,26,24,0.1)', cursor: 'pointer', flexShrink: 0 }}>
            <img src="http://raameshsinghaldesign.com/wp-content/uploads/2023/01/cropped-rsd-logo-1.png" alt="RSD" style={{ height: 38, width: 'auto' }}/>
          </button>

          {/* Desktop links */}
          <div className="hide-mobile" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ul style={{ display: 'flex', listStyle: 'none', gap: '0.2rem', margin: 0, padding: 0 }}>
              {links.map(link => {
                const active = activeLink === link.anchor
                return (
                  <li key={link.anchor}>
                    <button onClick={() => scrollTo(link.anchor)} style={{ display: 'block', padding: '0.5rem 1.1rem', fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', fontWeight: active ? 500 : 400, letterSpacing: '0.02em', color: active ? '#1A1A18' : '#6B6860', background: 'none', border: 'none', borderBottom: active ? '1px solid #C9A96E' : '1px solid transparent', cursor: 'pointer', transition: 'color 0.25s, border-color 0.25s' }}
                      onMouseEnter={e => { if (!active) e.currentTarget.style.color = '#C9A96E' }}
                      onMouseLeave={e => { if (!active) e.currentTarget.style.color = '#6B6860' }}>
                      {link.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Book Consultation */}
          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', borderLeft: '1px solid rgba(26,26,24,0.1)', padding: '0 1.8rem', flexShrink: 0 }}>
            <button onClick={() => scrollTo('contact')} style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', padding: '0.6rem 1.4rem', border: '1px solid #C9A96E', color: '#C9A96E', background: 'transparent', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#C9A96E'; e.currentTarget.style.color = '#1A1A18' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C9A96E' }}>
              Book Consultation
            </button>
          </div>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(v => !v)} className="show-mobile" style={{ marginLeft: 'auto', padding: '0 1.5rem', background: 'none', border: 'none', cursor: 'pointer', flexDirection: 'column', gap: 5 }} aria-label="Toggle menu">
            {[0, 1, 2].map(i => (
              <span key={i} style={{ display: 'block', width: 24, height: 1.5, background: '#1A1A18', transition: 'all 0.3s', transform: menuOpen ? i === 0 ? 'rotate(45deg) translate(4.5px, 4.5px)' : i === 2 ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'scaleX(0)' : 'none' }}/>
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 99, background: '#1A1A18', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem', opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'auto' : 'none', transition: 'opacity 0.4s ease' }}>
        {links.map((link, i) => (
          <button key={link.anchor}
            onClick={() => { setMenuOpen(false); setTimeout(() => scrollTo(link.anchor), 350) }}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: activeLink === link.anchor ? '#C9A96E' : '#E8E0D0', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.25s', transitionDelay: menuOpen ? `${i * 55}ms` : '0ms' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#C9A96E' }}
            onMouseLeave={e => { e.currentTarget.style.color = activeLink === link.anchor ? '#C9A96E' : '#E8E0D0' }}>
            {link.label}
          </button>
        ))}
        <button onClick={() => { setMenuOpen(false); setTimeout(() => scrollTo('contact'), 350) }} style={{ marginTop: '1rem', fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '0.9rem 2.2rem', border: '1px solid #C9A96E', color: '#C9A96E', background: 'none', cursor: 'pointer' }}>
          Book Consultation
        </button>
      </div>

      <style>{`
        @media (min-width: 901px) {
  .show-mobile { display: none !important; }
}
@media (max-width: 900px) {
  .hide-mobile { display: none !important; }
  .show-mobile { display: flex !important; }
}
      `}</style>
    </>
  )
}