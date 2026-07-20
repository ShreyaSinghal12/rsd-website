import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', anchor: 'hero' },
  { label: 'About us', anchor: 'about' },
  { label: 'Awards', anchor: 'awards-news' },
  { label: 'Services', anchor: 'services' },
  { label: 'Projects', anchor: 'projects' },
  { label: 'Testimonials', anchor: 'testimonials' },
  { label: 'Contact us', anchor: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // If already on the homepage, scroll straight to the section.
  // Otherwise navigate home first and pass the target anchor along,
  // so Home can scroll to it once it has mounted.
  const goToAnchor = (anchor) => {
    if (location.pathname === '/') {
      const el = document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: anchor } });
    }
  };

  const isHero = location.pathname === '/' && !scrolled;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '16px 40px',
          transition: 'all 0.4s ease',
          background: scrolled ? 'rgba(248, 244, 237, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : 'none',
        }}
      >
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <button onClick={() => goToAnchor('hero')} style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: '1.8rem',
            fontWeight: 400,
            color: isHero ? '#ffffff' : '#1c2a3a',
            transition: 'color 0.4s ease',
            letterSpacing: '-0.02em',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}>
            Logo
          </button>

          {/* Desktop Pill Nav */}
          <div className="desktop-nav" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: scrolled ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            borderRadius: '50px',
            padding: '6px 8px',
            border: scrolled ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255,255,255,0.2)',
          }}>
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => goToAnchor(link.anchor)}
                style={{
                  padding: '8px 16px',
                  fontSize: '0.85rem',
                  fontWeight: 400,
                  color: isHero ? '#ffffff' : '#1c2a3a',
                  borderRadius: '50px',
                  background: 'transparent',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Get Quote Button */}
          <button
            onClick={() => goToAnchor('contact')}
            className="desktop-nav"
            style={{
              padding: '10px 28px',
              borderRadius: '50px',
              fontSize: '0.9rem',
              fontWeight: 600,
              background: isHero ? '#ffffff' : 'var(--navy)',
              color: isHero ? '#1c2a3a' : '#ffffff',
              transition: 'all 0.3s ease',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Get Quote
          </button>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-toggle"
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: '5px',
              padding: '8px',
              zIndex: 200,
            }}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }}
              style={{ width: 24, height: 2, background: isHero && !mobileOpen ? '#fff' : '#1c2a3a', borderRadius: 2, transformOrigin: 'center' }}
            />
            <motion.div
              animate={{ opacity: mobileOpen ? 0 : 1 }}
              style={{ width: 24, height: 2, background: isHero && !mobileOpen ? '#fff' : '#1c2a3a', borderRadius: 2 }}
            />
            <motion.div
              animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }}
              style={{ width: 24, height: 2, background: isHero && !mobileOpen ? '#fff' : '#1c2a3a', borderRadius: 2, transformOrigin: 'center' }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              background: 'var(--cream)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <button
                  onClick={() => { setMobileOpen(false); goToAnchor(link.anchor); }}
                  style={{
                    display: 'block',
                    padding: '12px 24px',
                    fontSize: '1.5rem',
                    fontFamily: "'Playfair Display', serif",
                    color: 'var(--navy)',
                    textAlign: 'center',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {link.label}
                </button>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.06 }}
              style={{ marginTop: 16 }}
            >
              <button
                onClick={() => { setMobileOpen(false); goToAnchor('contact'); }}
                className="btn-primary"
              >
                Get Quote
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
}