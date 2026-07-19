import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const links = [
  { label: 'Home', anchor: 'hero' },
  { label: 'About us', anchor: 'about' },
  { label: 'Awards', anchor: 'awards-news' },
  { label: 'Services', anchor: 'services' },
  { label: 'Projects', anchor: 'portfolio' },
  { label: 'Testimonials', anchor: 'testimonials' },
  { label: 'Contact us', anchor: 'contact' },
]

const S = { gold: '#B98D4F', ink: '#1B2A38' }

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('hero')
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 1024 : false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isProjectsActive = pathname.startsWith('/projects')

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 1024)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const scrollTo = (anchor) => {
    setMenuOpen(false)
    if (pathname !== '/') {
      navigate('/')
      setTimeout(() => { const el = document.getElementById(anchor); if (el) el.scrollIntoView({ behavior: 'smooth' }) }, 300)
    } else {
      const el = document.getElementById(anchor)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
      if (pathname !== '/') { setActiveLink('projects-route'); return }
      const sections = links.map(link => {
        const el = document.getElementById(link.anchor)
        if (!el) return null
        const rect = el.getBoundingClientRect()
        return { anchor: link.anchor, top: rect.top }
      }).filter(Boolean).sort((a, b) => a.top - b.top)
      const triggerLine = 100
      let current = sections[0]?.anchor
      for (const s of sections) { if (s.top <= triggerLine) current = s.anchor }
      setActiveLink(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  const heroActive = pathname === '/' && !scrolled
  const textColor = heroActive ? '#fff' : S.ink

  return (
    <>
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '1.4rem 2rem', background: heroActive ? 'transparent' : 'rgba(250,248,242,0.96)', backdropFilter: heroActive ? 'none' : 'blur(10px)', boxShadow: heroActive ? 'none' : '0 2px 12px rgba(0,0,0,0.06)', transition: 'background 0.3s' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
          <button onClick={() => scrollTo('hero')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: '1.4rem', color: textColor }}>
            RSD
          </button>

          {!isMobile && (
            <nav style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: heroActive ? 'rgba(255,255,255,0.12)' : '#fff', borderRadius: 999, padding: '0.5rem 0.6rem', boxShadow: heroActive ? 'none' : '0 2px 10px rgba(0,0,0,0.06)' }}>
              {links.map(link => {
                const active = link.anchor === 'portfolio' ? (pathname === '/' ? activeLink === 'portfolio' : isProjectsActive) : (pathname === '/' && activeLink === link.anchor)
                return (
                  <button key={link.anchor} onClick={() => scrollTo(link.anchor)} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.88rem', fontWeight: active ? 600 : 400, color: active ? S.gold : textColor, background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem 0.9rem', borderRadius: 999, transition: 'color 0.2s' }}>
                    {link.label}
                  </button>
                )
              })}
            </nav>
          )}

          {!isMobile && (
            <button onClick={() => scrollTo('contact')} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.85rem', fontWeight: 500, padding: '0.75rem 1.6rem', background: heroActive ? '#fff' : S.ink, color: heroActive ? S.ink : '#fff', border: 'none', borderRadius: 999, cursor: 'pointer' }}>
              Get Quote
            </button>
          )}

          {isMobile && (
            <button onClick={() => setMenuOpen(v => !v)} aria-label="Menu" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.4rem', display: 'flex', flexDirection: 'column', gap: 5 }}>
              <span style={{ width: 24, height: 2, background: textColor, display: 'block' }} />
              <span style={{ width: 24, height: 2, background: textColor, display: 'block' }} />
              <span style={{ width: 24, height: 2, background: textColor, display: 'block' }} />
            </button>
          )}
        </div>
      </header>

      {isMobile && (
        <>
          <div onClick={() => setMenuOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 98, background: 'rgba(0,0,0,0.5)', opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'auto' : 'none', transition: 'opacity 0.3s' }} />
          <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 99, width: '72vw', maxWidth: 280, background: '#fff', transform: menuOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 0.35s ease', display: 'flex', flexDirection: 'column', padding: '5.5rem 2rem 2rem', gap: '0.4rem' }}>
            {links.map(link => (
              <button key={link.anchor} onClick={() => scrollTo(link.anchor)} style={{ textAlign: 'left', fontFamily: "'DM Sans',sans-serif", fontSize: '1rem', color: S.ink, background: 'none', border: 'none', cursor: 'pointer', padding: '0.75rem 0', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>{link.label}</button>
            ))}
            <button onClick={() => scrollTo('contact')} style={{ marginTop: '1.5rem', fontFamily: "'DM Sans',sans-serif", fontSize: '0.85rem', padding: '0.85rem 1.4rem', background: S.gold, color: '#fff', border: 'none', borderRadius: 999, cursor: 'pointer' }}>Get Quote</button>
          </div>
        </>
      )}
    </>
  )
}