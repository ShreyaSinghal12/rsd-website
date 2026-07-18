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

const S = { gold: '#C9A96E', ink: '#141412', cream: '#F2EEE6', mid: '#A39F94', line: 'rgba(201,169,110,0.22)' }

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

  const linkStyle = (active) => ({ fontFamily: "'DM Sans',sans-serif", fontSize: '0.92rem', fontWeight: active ? 500 : 400, color: active ? S.cream : S.mid, background: 'none', border: 'none', cursor: 'pointer', padding: '0.4rem 0', borderBottom: active ? `2px solid ${S.gold}` : '2px solid transparent', transition: 'color 0.25s, border-color 0.25s' })

  return (
    <>
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? 'rgba(20,20,18,0.97)' : 'rgba(20,20,18,0.92)', backdropFilter: 'blur(10px)', borderBottom: `1px solid ${S.line}` }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 2rem', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
          <button onClick={() => scrollTo('hero')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.6rem', padding: 0 }}>
            <img src="https://raameshsinghaldesign.com/wp-content/uploads/2023/01/cropped-rsd-logo-1.png" alt="Raamesh Singhal Design" style={{ height: 40, width: 'auto', display: 'block', filter: 'brightness(100)' }} />
          </button>

          {!isMobile && (
            <nav style={{ display: 'flex', alignItems: 'center', gap: '1.8rem' }}>
              {links.map(link => {
                const active = link.anchor === 'portfolio' ? (pathname === '/' ? activeLink === 'portfolio' : isProjectsActive) : (pathname === '/' && activeLink === link.anchor)
                return (
                  <button key={link.anchor} onClick={() => scrollTo(link.anchor)} style={linkStyle(active)} onMouseEnter={e => e.currentTarget.style.color = S.cream} onMouseLeave={e => { if (!active) e.currentTarget.style.color = S.mid }}>{link.label}</button>
                )
              })}
            </nav>
          )}

          {!isMobile && (
            <button onClick={() => scrollTo('contact')} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.85rem', fontWeight: 500, padding: '0.7rem 1.7rem', borderRadius: '999px', background: '#FFFFFF', color: '#141412', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={e => { e.currentTarget.style.background = S.gold; e.currentTarget.style.color = '#FFFFFF' }} onMouseLeave={e => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.color = '#141412' }}>Get Quote</button>
          )}

          {isMobile && (
            <button onClick={() => setMenuOpen(v => !v)} aria-label="Menu" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.4rem', display: 'flex', flexDirection: 'column', gap: 5 }}>
              <span style={{ width: 24, height: 2, background: S.cream, display: 'block', transition: 'transform 0.3s', transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
              <span style={{ width: 24, height: 2, background: S.cream, display: 'block', opacity: menuOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
              <span style={{ width: 24, height: 2, background: S.cream, display: 'block', transition: 'transform 0.3s', transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
            </button>
          )}
        </div>
      </header>

      {isMobile && (
        <>
          <div onClick={() => setMenuOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 98, background: 'rgba(10,10,8,0.6)', opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'auto' : 'none', transition: 'opacity 0.3s' }} />
          <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 99, width: '72vw', maxWidth: 280, background: S.ink, borderLeft: `1px solid ${S.line}`, transform: menuOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 0.35s ease', display: 'flex', flexDirection: 'column', padding: '5.5rem 2rem 2rem', gap: '0.4rem' }}>
            {links.map(link => {
              const active = link.anchor === 'portfolio' ? (pathname === '/' ? activeLink === 'portfolio' : isProjectsActive) : (pathname === '/' && activeLink === link.anchor)
              return (
                <button key={link.anchor} onClick={() => scrollTo(link.anchor)} style={{ textAlign: 'left', fontFamily: "'DM Sans',sans-serif", fontSize: '1rem', color: active ? '#C9A96E' : S.cream, background: 'none', border: 'none', cursor: 'pointer', padding: '0.75rem 0', borderBottom: `1px solid ${S.line}` }}>{link.label}</button>
              )
            })}
            <button onClick={() => scrollTo('contact')} style={{ marginTop: '1.5rem', fontFamily: "'DM Mono',monospace", fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '0.85rem 1.4rem', background: '#C9A96E', color: S.ink, border: 'none', cursor: 'pointer' }}>Book Consultation</button>
          </div>
        </>
      )}
    </>
  )
}