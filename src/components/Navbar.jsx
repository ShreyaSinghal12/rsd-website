import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const links = [
    { label: 'Home', anchor: 'hero' },
    { label: 'About Us', anchor: 'about' },
    { label: 'Projects', anchor: 'portfolio' },
    { label: 'Testimonials', anchor: 'testimonials' },
    { label: 'Services', anchor: 'services' },
    { label: 'Contact Us', anchor: 'contact' },
]
export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [activeLink, setActiveLink] = useState('hero')
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024)
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const isProjectsActive = pathname.startsWith('/projects')

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 1024)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 60)

            if (pathname !== '/') {
                setActiveLink('projects-page')
                return
            }
            

            const sections = links.map(link => {
                const el = document.getElementById(link.anchor)
                if (!el) return null
                const rect = el.getBoundingClientRect()
                return { anchor: link.anchor, top: rect.top, bottom: rect.bottom }
            }).filter(Boolean)

            const triggerLine = 100
            let current = sections[0]?.anchor
            for (const s of sections) {
                if (s.top <= triggerLine) current = s.anchor
            }
            setActiveLink(current)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [pathname])

    const scrollTo = (anchor) => {
        if (pathname !== '/') {
            navigate('/')
            setTimeout(() => {
                const el = document.getElementById(anchor)
                if (el) el.scrollIntoView({ behavior: 'smooth' })
            }, 300)
        } else {
            const el = document.getElementById(anchor)
            if (el) el.scrollIntoView({ behavior: 'smooth' })
        }
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
                <div style={{
                    maxWidth: 1400, margin: '0 auto',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 68, padding: '0 1.5rem',
                }}>

                    {/* Logo */}
                    <button onClick={() => scrollTo('hero')}
                        style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: '0 1rem 0 0', borderRight: '1px solid rgba(26,26,24,0.1)', height: '100%' }}>
                        <img
                            src="https://raameshsinghaldesign.com/wp-content/uploads/2023/01/cropped-rsd-logo-1.png"
                            alt="RSD"
                            style={{ height: isMobile ? 32 : 38, width: 'auto' }}
                        />
                    </button>

                    {/* Desktop links */}
                    {!isMobile && (
                        <ul style={{ display: 'flex', listStyle: 'none', gap: '0.2rem', margin: 0, padding: 0, flex: 1, justifyContent: 'center' }}>
                            {links.map(link => {
                                const active = link.anchor === 'portfolio' ? (pathname === '/' ? activeLink === 'portfolio' : isProjectsActive) : activeLink === link.anchor
                                return (
                                    <li key={link.anchor}>
                                        <button onClick={() => scrollTo(link.anchor)}
                                            style={{ display: 'block', padding: '0.5rem 1rem', fontFamily: "'DM Sans',sans-serif", fontSize: '0.82rem', fontWeight: active ? 500 : 400, color: active ? '#1A1A18' : '#6B6860', background: 'none', border: 'none', borderBottom: active ? '1px solid #C9A96E' : '1px solid transparent', cursor: 'pointer', transition: 'color 0.25s' }}
                                            onMouseEnter={e => { if (!active) e.currentTarget.style.color = '#C9A96E' }}
                                            onMouseLeave={e => { if (!active) e.currentTarget.style.color = '#6B6860' }}>
                                            {link.label}
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    )}

                    {/* Desktop Book Consultation */}
                    {!isMobile && (
                        <button onClick={() => scrollTo('contact')}
                            style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', padding: '0.6rem 1.4rem', border: '1px solid #C9A96E', color: '#C9A96E', background: 'transparent', cursor: 'pointer', transition: 'all 0.3s', whiteSpace: 'nowrap', marginLeft: '1rem' }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#C9A96E'; e.currentTarget.style.color = '#1A1A18' }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C9A96E' }}>
                            Book Consultation
                        </button>
                    )}

                    {/* Hamburger — mobile only */}
                    {isMobile && (
                        <button
                            onClick={() => setMenuOpen(v => !v)}
                            style={{ display: 'flex', flexDirection: 'column', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}
                            aria-label="Toggle menu">
                            <span style={{ display: 'block', width: 26, height: 2, background: '#1A1A18', borderRadius: 2, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
                            <span style={{ display: 'block', width: 26, height: 2, background: '#1A1A18', borderRadius: 2, transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
                            <span style={{ display: 'block', width: 26, height: 2, background: '#1A1A18', borderRadius: 2, transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
                        </button>
                    )}
                </div>
            </nav>

            {/* Mobile full screen menu */}
            {/* Mobile drawer */}
            {isMobile && (
                <>
                    {/* Dark backdrop */}
                    <div
                        onClick={() => setMenuOpen(false)}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 98,
                            background: 'rgba(26,26,24,0.5)',
                            opacity: menuOpen ? 1 : 0,
                            pointerEvents: menuOpen ? 'auto' : 'none',
                            transition: 'opacity 0.3s ease',
                        }}
                    />

                    {/* Drawer panel */}
                    <div style={{
                        position: 'fixed', top: 0, right: 0, bottom: 0,
                        width: '72vw', maxWidth: 280,
                        zIndex: 99,
                        background: '#fff',
                        boxShadow: '-4px 0 24px rgba(26,26,24,0.12)',
                        display: 'flex', flexDirection: 'column',
                        padding: '5rem 2rem 2rem',
                        gap: '0.2rem',
                        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
                        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
                    }}>

                        {/* Close button */}
                        <button
                            onClick={() => setMenuOpen(false)}
                            style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#6B6860', lineHeight: 1 }}>
                            &#10005;
                        </button>


                        {/* Links */}
                        {links.map((link, i) => {
                            const active = link.anchor === 'portfolio' ? (pathname === '/' ? activeLink === 'portfolio' : isProjectsActive) : activeLink === link.anchor
                            return (
                                <button key={link.anchor}
                                    onClick={() => { setMenuOpen(false); setTimeout(() => scrollTo(link.anchor), 350) }}
                                    style={{
                                        fontFamily: "'DM Sans',sans-serif",
                                        fontSize: '0.95rem',
                                        fontWeight: active ? 500 : 400,
                                        color: active ? '#C9A96E' : '#1A1A18',
                                        background: active ? 'rgba(201,169,110,0.08)' : 'none',
                                        border: 'none',
                                        borderLeft: active ? '2px solid #C9A96E' : '2px solid transparent',
                                        cursor: 'pointer',
                                        padding: '0.75rem 1rem',
                                        textAlign: 'left',
                                        width: '100%',
                                        transition: 'all 0.2s',
                                        transitionDelay: menuOpen ? `${i * 40}ms` : '0ms',
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.color = '#C9A96E'; e.currentTarget.style.borderLeftColor = '#C9A96E' }}
                                    onMouseLeave={e => { e.currentTarget.style.color = active ? '#C9A96E' : '#1A1A18'; e.currentTarget.style.borderLeftColor = active ? '#C9A96E' : 'transparent' }}>
                                    {link.label}
                                </button>
                            )
                        })}

                        {/* Divider */}
                        <div style={{ height: 1, background: 'rgba(26,26,24,0.08)', margin: '1rem 0' }} />

                        {/* Book Consultation */}
                        <button
                            onClick={() => { setMenuOpen(false); setTimeout(() => scrollTo('contact'), 350) }}
                            style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '0.8rem 1rem', border: '1px solid #C9A96E', color: '#C9A96E', background: 'transparent', cursor: 'pointer', width: '100%', transition: 'all 0.3s' }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#C9A96E'; e.currentTarget.style.color = '#1A1A18' }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C9A96E' }}>
                            Book Consultation
                        </button>

                        {/* Contact info at bottom */}
                        <div style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
                            <a href="tel:+919800848155" style={{ display: 'block', fontSize: '0.85rem', color: '#6B6860', textDecoration: 'none', marginBottom: '0.4rem' }}>
                                +91 98008 48155
                            </a>
                            <a href="mailto:rameshsinghaldesign@gmail.com" style={{ display: 'block', fontSize: '0.75rem', color: '#6B6860', textDecoration: 'none' }}>
                                rameshsinghaldesign@gmail.com
                            </a>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}