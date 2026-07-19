import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion';
import projects from '../data/projects';
import testimonials from '../data/testimonials';

const heroSlides = [
  { image: '/images/slides/1stSlide.jpg', title: 'Timeless Interiors', subtitle: 'Crafting Spaces That Inspire Living' },
  { image: '/images/slides/2ndSlide.jpeg', title: 'Innovative Architecture', subtitle: 'Blending Form, Function & Beauty' },
  { image: '/images/slides/3rdSLide.jpeg', title: 'Elegant Designs', subtitle: 'Where Vision Meets Reality' },
];

const categories = [
  { id: 'architecture', label: 'Architecture', image: '/images/Architecture_Projects/House_of_Three_Courts.jpg', count: 0 },
  { id: 'interior-design', label: 'Interior Design', image: '/images/interior_Projects/Contemporary_Vastu_House.jpg', count: 0 },
  { id: 'hotel-design', label: 'Hotel Design', image: '/images/projects/Hotel1.jpeg', count: 0 },
];

categories.forEach(cat => {
  cat.count = projects.filter(p => p.category === cat.id).length;
});

const stats = [
  { label: 'Projects Completed', value: 150, suffix: '+' },
  { label: 'Happy Clients', value: 120, suffix: '+' },
  { label: 'Years Experience', value: 24, suffix: '+' },
  { label: 'Awards Won', value: 15, suffix: '' },
];

const awards = [
  {
    title: "Architect of the Year Award (RESIDENTIAL)",
    organization: "Indian Institute of Architects (IIA) Delhi Chapter",
    year: "2021",
    image: "/images/awardsAndCertificates/Award1-trophy.png",
    certificateImage: "/images/awardsAndCertificates/Award1.png"
  },
  {
    title: "AWARD OF MERIT 2023, BEST INTERIOR DESIGN",
    organization: "Indian Institute of Architects (IIA) Delhi Chapter",
    year: "2023",
    image: "/images/awardsAndCertificates/Award2-trophy.png",
    certificateImage: "/images/awardsAndCertificates/Award2.png"
  },
  {
    title: "AWARD OF MERIT 2024, BEST ARCHITECTURE DESIGN",
    organization: "Indian Institute of Architects (IIA) Delhi Chapter",
    year: "2024",
    image: "/images/awardsAndCertificates/Award3-trophy.png",
    certificateImage: "/images/awardsAndCertificates/Award3.png"
  }
];

const pressItems = [
  { image: '/images/press/mag1.jpg', title: 'Architecture Digest' },
  { image: '/images/press/mag2.jpg', title: 'Interior Today' },
  { image: '/images/press/mag3.jpg', title: 'Design World' },
  { image: '/images/press/mag4.jpg', title: 'Home & Living' },
  { image: '/images/press/mag5.jpg', title: 'Modern Spaces' },
  { image: '/images/press/mag6.jpg', title: 'Design Weekly' },
  { image: '/images/press/mag7.jpg', title: 'Architecture Monthly' },
  { image: '/images/press/mag8.jpg', title: 'Interior Design Magazine' },
  { image: '/images/press/mag9.jpg', title: 'Luxury Living' },
];

const serviceItems = [
  {
    title: 'Architecture',
    desc: 'Creating iconic structures that define skylines and enrich communities through thoughtful design.',
    link: '/services/architecture',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3l2-4h14l2 4M5 21V10.7M19 21V10.7M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" />
      </svg>
    ),
  },
  {
    title: 'Interior Design',
    desc: 'Crafting immersive interiors that reflect personality, purpose, and the art of living beautifully.',
    link: '/services/interior-design',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
      </svg>
    ),
  },
  {
    title: 'Hotel Design',
    desc: 'Designing hospitality spaces that deliver unforgettable guest experiences and lasting impressions.',
    link: '/services/hotel-design',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
        <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M8 10h.01M16 10h.01M12 14h.01M8 14h.01M16 14h.01" />
      </svg>
    ),
  },
];

/* ── Floating Particles ─────────────────────────── */
function FloatingParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.4 + 0.1,
    })), []);

  return (
    <div className="particles-container">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

/* ── Animated Counter ────────────────────────────── */
function AnimatedCounter({ target, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(id); }
      else setCount(start);
    }, 16);
    return () => clearInterval(id);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Star Rating ─────────────────────────────────── */
function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24"
          fill={i < rating ? '#c9a84c' : 'none'}
          stroke="#c9a84c" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

/* ── Horizontal Scroll ───────────────────────────── */
function HorizontalScroll({ children }) {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [viewportW, setViewportW] = useState(0);

  useEffect(() => {
    if (scrollRef.current) setScrollRange(scrollRef.current.scrollWidth);
    setViewportW(window.innerWidth);
    const handleResize = () => setViewportW(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const progress = useMotionValue(0);
  const x = useTransform(progress, [0, 1], [0, -scrollRange + viewportW]);
  const xSpring = useSpring(x, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const { top } = container.getBoundingClientRect();
      const h = container.offsetHeight - window.innerHeight;
      const pct = Math.max(0, Math.min(1, -top / h));
      progress.set(pct);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [progress]);

  const heightFactor = scrollRange / viewportW;

  return (
    <div ref={containerRef} style={{ height: `${heightFactor * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div ref={scrollRef} style={{ x: xSpring }} className="flex gap-8 px-8">
          {children}
        </motion.div>
      </div>
    </div>
  );
}

/* ── Section Header ──────────────────────────────── */
function SectionHeader({ label, title, align = 'center' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`mb-16 ${align === 'center' ? 'text-center' : ''}`}
    >
      <p className="gold-gradient-text tracking-[0.3em] uppercase text-sm mb-3 font-medium">{label}</p>
      <h2 className="text-4xl md:text-5xl font-bold">{title}</h2>
      {align === 'center' && (
        <div className="mt-4 mx-auto w-16 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)' }} />
      )}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════ */
/* ══  MAIN HOME PAGE  ═════════════════════════════ */
/* ══════════════════════════════════════════════════ */
export default function Home() {
  const [heroIdx, setHeroIdx] = useState(0);
  const navigate = useNavigate();
  const [selectedAward, setSelectedAward] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  /* auto-advance hero */
  useEffect(() => {
    const id = setInterval(() => setHeroIdx(i => (i + 1) % heroSlides.length), 5000);
    return () => clearInterval(id);
  }, []);

  /* auto-advance testimonials */
  useEffect(() => {
    const id = setInterval(() => setActiveTestimonial(i => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, []);

  const servicesRef = useRef(null);
  const servicesInView = useInView(servicesRef, { once: true, margin: '-100px' });

  return (
    <main className="bg-[#0a0a0a] text-white overflow-x-hidden">

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative h-screen">
        {/* Background with Ken Burns */}
        <AnimatePresence mode="wait">
          <motion.div
            key={heroIdx}
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1, transition: { opacity: { duration: 1 }, scale: { duration: 8, ease: 'linear' } } }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            className="absolute inset-0"
          >
            <img src={heroSlides[heroIdx].image} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-[#0a0a0a]/20" />
          </motion.div>
        </AnimatePresence>

        {/* Floating Particles */}
        <FloatingParticles />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="gold-gradient-text tracking-[0.4em] uppercase text-sm mb-6 font-medium"
          >
            RSD Group of Design
          </motion.p>
          <AnimatePresence mode="wait">
            <motion.h1
              key={heroIdx}
              initial={{ y: 50, opacity: 0, filter: 'blur(10px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: -30, opacity: 0, filter: 'blur(5px)' }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]"
            >
              {heroSlides[heroIdx].title}
            </motion.h1>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${heroIdx}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg md:text-xl text-gray-300/90 max-w-xl font-light"
            >
              {heroSlides[heroIdx].subtitle}
            </motion.p>
          </AnimatePresence>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-10 flex gap-4"
          >
            <Link
              to="/projects"
              className="shimmer-btn px-8 py-3.5 text-sm font-medium tracking-widest uppercase rounded-lg transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #d4a843)', color: '#0a0a0a' }}
            >
              View Our Work
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 border border-white/20 text-white/90 hover:border-amber-400/50 hover:text-amber-400 transition-all duration-300 tracking-widest uppercase text-sm rounded-lg backdrop-blur-sm"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setHeroIdx(i)}
              className="group relative p-1"
            >
              <div className={`w-8 h-1 rounded-full transition-all duration-500 ${
                i === heroIdx ? 'bg-amber-400' : 'bg-white/20 group-hover:bg-white/40'
              }`} />
            </button>
          ))}
        </div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-24 left-1/2 z-10"
          style={{ animation: 'bounce-subtle 2s ease-in-out infinite' }}
        >
          <div className="w-5 h-8 rounded-full border-2 border-white/20 flex justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-1 bg-amber-400 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════ VIDEO REEL ═══════════════ */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <SectionHeader label="Showreel" title="Experience Our Vision" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mb-12 max-w-2xl mx-auto -mt-8"
          >
            A glimpse into the world of RSD — where every space tells a story
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl shadow-amber-900/10 group"
          >
            <video
              autoPlay muted loop playsInline
              className="w-full aspect-video object-cover"
              src="/videos/OfficeVideos.mp4"
            />
            <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ ABOUT SNIPPET ═══════════════ */}
      <section className="py-28 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="gold-gradient-text tracking-[0.3em] uppercase text-sm mb-3 font-medium">About Us</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">A Legacy of<br />Design Excellence</h2>
            <p className="text-gray-400 leading-relaxed mb-6 text-lg">
              With over two decades of experience, RSD Group of Design has been at the forefront of
              architectural innovation. Founded by Ar. Ramesh Singhal and Ar. Sonika Singhal, we transform
              spaces into living works of art — blending modern aesthetics with timeless functionality.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 text-amber-400 hover:gap-4 transition-all group text-sm font-medium tracking-wider uppercase">
              Learn more about us
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-5"
          >
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3 }}
                className="glow-card bg-[#141414] rounded-2xl p-7 text-center border border-white/5"
              >
                <p className="text-4xl font-bold gold-gradient-text">
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </p>
                <p className="text-sm text-gray-500 mt-2 tracking-wide">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ SERVICES ═══════════════ */}
      <section ref={servicesRef} className="py-28">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader label="What We Do" title="Our Services" />

          <div className="grid md:grid-cols-3 gap-8">
            {serviceItems.map((svc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.2, duration: 0.6 }}
              >
                <Link to={svc.link}
                  className="group block glow-card bg-[#111] rounded-2xl p-8 border border-white/5 h-full relative overflow-hidden"
                >
                  {/* Ambient glow on hover */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-amber-400/0 group-hover:bg-amber-400/5 transition-all duration-700 blur-3xl" />

                  <div className="text-amber-400 mb-6">{svc.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-amber-400 transition-colors">{svc.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{svc.desc}</p>
                  <span className="inline-flex items-center gap-2 text-amber-400 text-sm font-medium group-hover:gap-3 transition-all">
                    Explore
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CATEGORIES HORIZONTAL SCROLL ═══════════════ */}
      <section className="bg-[#0d0d0d] py-16">
        <div className="max-w-6xl mx-auto px-6 mb-12">
          <SectionHeader label="Portfolio" title="Browse by Category" />
        </div>

        <HorizontalScroll>
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              whileHover={{ scale: 1.02 }}
              className="min-w-[400px] md:min-w-[500px] h-[60vh] relative rounded-2xl overflow-hidden cursor-pointer group flex-shrink-0"
              onClick={() => navigate(`/projects/${cat.id}`)}
            >
              <img src={cat.image} alt={cat.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <p className="text-2xl font-bold">{cat.label}</p>
                <p className="gold-gradient-text text-sm mt-1 font-medium">{cat.count} Projects</p>
              </div>
              {/* Corner accent */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-amber-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </HorizontalScroll>
      </section>

      {/* ═══════════════ FEATURED PROJECTS ═══════════════ */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="gold-gradient-text tracking-[0.3em] uppercase text-sm mb-3 font-medium">Selected Work</p>
              <h2 className="text-4xl md:text-5xl font-bold">Featured Projects</h2>
            </div>
            <Link to="/projects" className="hidden md:inline-flex items-center gap-2 text-amber-400 hover:gap-4 transition-all text-sm font-medium tracking-wider">
              View all <span>→</span>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.slice(0, 4).map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Link to={`/projects/${p.category}`} className="group block rounded-2xl overflow-hidden relative">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={p.image} alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="gold-gradient-text text-xs uppercase tracking-wider font-medium">{p.category.replace('-', ' ')}</p>
                    <h3 className="text-xl font-semibold mt-1">{p.title}</h3>
                    {p.location && <p className="text-gray-300 text-sm mt-1">{p.location}</p>}
                  </div>
                  {/* Corner accents */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-white/0 group-hover:border-white/30 transition-all duration-500" />
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-white/0 group-hover:border-amber-400/40 transition-all duration-500" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="md:hidden text-center mt-8">
            <Link to="/projects" className="text-amber-400 text-sm font-medium tracking-wider">View all projects →</Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ AWARDS ═══════════════ */}
      <section className="py-28 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader label="Recognition" title="Awards & Accolades" />

          <div className="grid md:grid-cols-3 gap-8">
            {awards.map((award, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glow-card bg-[#141414] rounded-2xl p-8 border border-white/5 text-center cursor-pointer group"
                onClick={() => setSelectedAward(award)}
              >
                <div className="w-28 h-28 mx-auto mb-6 relative">
                  <div className="absolute inset-0 rounded-full bg-amber-400/5 blur-xl group-hover:bg-amber-400/10 transition-colors" />
                  <img src={award.image} alt={award.title} className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_20px_rgba(201,168,76,0.2)] group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-base font-semibold mb-2 leading-tight">{award.title}</h3>
                <p className="text-gray-500 text-sm mb-1">{award.organization}</p>
                <p className="gold-gradient-text text-sm font-semibold">{award.year}</p>
                <p className="text-gray-600 text-xs mt-3 opacity-0 group-hover:opacity-100 transition-opacity">Click to view certificate →</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Award Certificate Modal */}
      <AnimatePresence>
        {selectedAward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
            onClick={() => setSelectedAward(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-[#141414] rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-auto border border-white/10"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold pr-4">{selectedAward.title}</h3>
                <button onClick={() => setSelectedAward(null)}
                  className="text-gray-400 hover:text-white text-2xl w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors">
                  ×
                </button>
              </div>
              <img src={selectedAward.certificateImage} alt={selectedAward.title} className="w-full rounded-lg" />
              <div className="mt-4 text-center">
                <p className="text-gray-400">{selectedAward.organization}</p>
                <p className="gold-gradient-text font-semibold">{selectedAward.year}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════ PRESS / PUBLICATIONS ═══════════════ */}
      <section className="py-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 mb-12">
          <SectionHeader label="Media" title="Featured In" />
        </div>

        <div className="relative">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
            className="flex gap-8"
          >
            {[...pressItems, ...pressItems].map((item, i) => (
              <div key={i} className="min-w-[250px] md:min-w-[300px] flex-shrink-0 group">
                <div className="rounded-xl overflow-hidden relative">
                  <img src={item.image} alt={item.title} className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-700" />
                  {/* Frosted overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 backdrop-blur-0 group-hover:backdrop-blur-[2px] transition-all duration-500 flex items-end justify-center pb-6">
                    <p className="text-white font-semibold text-sm opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 tracking-wider">
                      {item.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ TEXT TESTIMONIALS ═══════════════ */}
      <section className="py-28 bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeader label="Client Love" title="What Our Clients Say" />

          <div className="relative min-h-[250px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                {/* Large quote mark */}
                <div className="gold-gradient-text text-7xl font-serif leading-none mb-6">"</div>

                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light italic mb-8 max-w-3xl mx-auto">
                  {testimonials[activeTestimonial].quote}
                </p>

                <div className="flex flex-col items-center gap-3">
                  <StarRating rating={testimonials[activeTestimonial].rating} />
                  <div>
                    <p className="font-semibold text-white">{testimonials[activeTestimonial].name}</p>
                    <p className="text-sm text-gray-500">{testimonials[activeTestimonial].project}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Testimonial Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === activeTestimonial ? 'bg-amber-400 w-6' : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ VIDEO TESTIMONIALS ═══════════════ */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader label="Testimonials" title="Hear From Our Clients" />

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: "Client Testimonial 1", video: "/videos/Testimonials/Testimonial1.mp4" },
              { name: "Client Testimonial 2", video: "/videos/Testimonials/Testimonial2.mp4" },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="rounded-2xl overflow-hidden border border-white/5 shadow-xl shadow-black/30"
              >
                <video controls className="w-full aspect-video object-cover" src={t.video} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ BOOK SECTION ═══════════════ */}
      <section className="py-28 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-amber-400/5 rounded-3xl blur-2xl" />
              <img src="/images/book/book_image.png" alt="RSD Architecture Book"
                className="relative max-h-[500px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="gold-gradient-text tracking-[0.3em] uppercase text-sm mb-3 font-medium">Publication</p>
            <h2 className="text-4xl font-bold mb-6">Our Book</h2>
            <p className="text-gray-400 leading-relaxed mb-8 text-lg">
              Explore our comprehensive collection of architectural works, design philosophies, and
              the stories behind some of India's most innovative residential and commercial spaces.
            </p>
            <a
              href="https://www.amazon.in/dp/example"
              target="_blank"
              rel="noreferrer"
              className="shimmer-btn inline-block px-8 py-3.5 font-semibold rounded-lg transition-colors text-sm tracking-wider uppercase"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #d4a843)', color: '#0a0a0a' }}
            >
              Get Your Copy
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-transparent to-amber-400/5" />
        <FloatingParticles />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Ready to Transform<br />Your Space?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mb-10 max-w-2xl mx-auto text-lg"
          >
            Let's collaborate to create something extraordinary. Get in touch with our team today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/contact"
              className="shimmer-btn inline-block px-12 py-4 font-semibold rounded-xl text-lg tracking-wider"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #d4a843)', color: '#0a0a0a' }}
            >
              Start Your Project
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}