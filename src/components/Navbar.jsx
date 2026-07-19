import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Services', path: '/services/architecture', hasDropdown: true },
  { label: 'Contact', path: '/contact' },
];

const serviceLinks = [
  { label: 'Architecture', path: '/services/architecture', icon: '📐' },
  { label: 'Interior Design', path: '/services/interior-design', icon: '🎨' },
  { label: 'Hotel Design', path: '/services/hotel-design', icon: '🏨' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [serviceDropdown, setServiceDropdown] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      // Scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServiceDropdown(false);
  }, [location]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0a0a0a]/90 backdrop-blur-xl shadow-lg shadow-black/30 border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="text-2xl font-bold tracking-wider">
              <span className="gold-gradient-text">RSD</span>
              <span className="text-white/80 text-sm font-light ml-2 hidden sm:inline group-hover:text-white transition-colors duration-300">
                Group of Design
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => {
              const isActive = link.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(link.path.split('/').slice(0, 2).join('/'));

              return (
                <div
                  key={link.path}
                  className="relative"
                  onMouseEnter={() => link.hasDropdown && setServiceDropdown(true)}
                  onMouseLeave={() => link.hasDropdown && setServiceDropdown(false)}
                >
                  <Link
                    to={link.path}
                    className={`relative px-4 py-2 text-sm tracking-wider uppercase transition-colors duration-300 ${
                      isActive ? 'text-amber-400' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {link.hasDropdown && (
                      <motion.span
                        animate={{ rotate: serviceDropdown ? 180 : 0 }}
                        className="ml-1 text-xs inline-block"
                      >
                        ▾
                      </motion.span>
                    )}

                    {/* Active indicator - gold underline */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full"
                        style={{ background: 'linear-gradient(90deg, #c9a84c, #e8c547)' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>

                  {/* Services Dropdown */}
                  {link.hasDropdown && (
                    <AnimatePresence>
                      {serviceDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 glass-card rounded-xl overflow-hidden min-w-[220px] shadow-2xl shadow-black/40"
                        >
                          {serviceLinks.map((s, i) => (
                            <Link
                              key={s.path}
                              to={s.path}
                              className="flex items-center gap-3 px-5 py-3.5 text-sm text-gray-300 hover:text-amber-400 hover:bg-white/5 transition-all duration-200 border-b border-white/5 last:border-0"
                            >
                              <span className="text-lg">{s.icon}</span>
                              <span>{s.label}</span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}

            {/* CTA Button */}
            <Link
              to="/contact"
              className="ml-4 px-5 py-2 text-sm font-medium tracking-wider uppercase shimmer-btn rounded-lg transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #c9a84c, #d4a843)',
                color: '#0a0a0a',
              }}
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2 relative w-10 h-10 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <motion.div
                animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }}
                className="w-6 h-0.5 bg-white rounded-full origin-center"
              />
              <motion.div
                animate={{ opacity: mobileOpen ? 0 : 1, scaleX: mobileOpen ? 0 : 1 }}
                className="w-6 h-0.5 bg-white rounded-full"
              />
              <motion.div
                animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }}
                className="w-6 h-0.5 bg-white rounded-full origin-center"
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden bg-[#0a0a0a]/98 backdrop-blur-xl overflow-hidden border-t border-white/5"
            >
              <div className="px-6 py-8 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      to={link.path}
                      className={`block py-3 text-lg tracking-wider uppercase transition-colors ${
                        location.pathname === link.path
                          ? 'text-amber-400'
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {link.label}
                    </Link>
                    {link.hasDropdown && (
                      <div className="ml-4 mb-2 space-y-1 border-l-2 border-amber-400/20 pl-4">
                        {serviceLinks.map(s => (
                          <Link
                            key={s.path}
                            to={s.path}
                            className="flex items-center gap-2 py-2 text-sm text-gray-400 hover:text-amber-400 transition-colors"
                          >
                            <span>{s.icon}</span>
                            <span>{s.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Mobile CTA */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navLinks.length * 0.08 }}
                  className="pt-4"
                >
                  <Link
                    to="/contact"
                    className="block w-full text-center py-3 rounded-lg font-medium tracking-wider uppercase text-sm"
                    style={{
                      background: 'linear-gradient(135deg, #c9a84c, #d4a843)',
                      color: '#0a0a0a',
                    }}
                  >
                    Get a Quote
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}