import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';

/* ═══════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════ */

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=80',
    title: 'Where Imagination\nMeets Interior\nDesign',
    subtitle: 'A single studio, holding the vision from first sketch to\nfinal handover, so your legacy is left to no one\'s chance but ours.',
  },
  {
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80',
    title: 'Crafting Spaces\nThat Tell\nYour Story',
    subtitle: 'From concept to completion, we create environments\nthat inspire and transform everyday living.',
  },
  {
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80',
    title: 'Architecture\nBeyond\nBoundaries',
    subtitle: 'Pushing the limits of design to create structures\nthat stand the test of time.',
  },
];

const stats = [
  { value: '30+', label: 'Years of Experience' },
  { value: '500+', label: 'Projects Delivered' },
  { value: '90%', label: 'Repeat & Referral' },
  { value: '6', label: 'Project Typologies' },
];

const expertise = [
  { label: 'Architecture', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' },
  { label: 'Interior Design', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80' },
  { label: 'Turnkey Projects', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80' },
  { label: 'PMC', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80' },
];

const serviceTypes = [
  { label: 'Residential', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80' },
  { label: 'Hotels & Hospitality', image: 'https://images.unsplash.com/photo-1590490360182-c33d955c3792?w=800&q=80' },
  { label: 'Builders & Developers', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80' },
  { label: 'Retails & Shop', image: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=800&q=80' },
];

const whyUsPoints = [
  {
    number: '01',
    title: 'One Studio, Full Ownership',
    desc: 'Architecture, interiors, procurement, and execution — all under one roof. No gaps between vision and delivery.',
  },
  {
    number: '02',
    title: 'Design That Endures',
    desc: 'We create timeless spaces that transcend trends, focusing on quality materials and thoughtful craftsmanship.',
  },
  {
    number: '03',
    title: '30+ Years of Trust',
    desc: 'Three decades of consistent delivery, with 90% of our business from repeat clients and referrals.',
  },
  {
    number: '04',
    title: 'Regional Expertise',
    desc: 'Deep understanding of local climate, culture, and lifestyle across Siliguri, Sikkim, Assam, Nepal, and Bhutan.',
  },
];

const founders = [
  {
    role: 'Founder',
    name: 'Ramesh Singhal',
    quote: '"Design creates possibilities. Execution determines whether those possibilities become reality"',
    image: null,
  },
  {
    role: 'Co-Founder',
    name: 'Sonika Singhal',
    quote: '"The most meaningful spaces are not the ones people admire. They are the ones people never want to leave."',
    image: null,
  },
];

const awards = [
  { name: 'The Pillar', image: null },
  { name: 'The Horizon', image: null },
  { name: 'The Keystone', image: null },
];

const certificates = [
  { title: 'Century Venture Award', image: null },
  { title: 'MahaVastu Certification', image: null },
  { title: 'Certificate of Appreciation', image: null },
  { title: 'Design Excellence', image: null },
  { title: 'Best Interior Design', image: null },
];

const testimonials = [
  {
    name: 'Mr. Rajesh Agarwal',
    rating: 5,
    quote: 'They took the time to understand my preferences before developing a design strategy. The result was a cohesive and stylish look I could never have achieved on my own. I am so glad I gave them a chance.',
    image: null,
  },
  {
    name: 'Mrs. Priya Sharma',
    rating: 5,
    quote: 'They took the time to understand my preferences before developing a design strategy. The result was a cohesive and stylish look I could never have achieved on my own. I am so glad I gave them a chance.',
    image: null,
  },
  {
    name: 'Mr. Ankit Gupta',
    rating: 5,
    quote: 'They took the time to understand my preferences before developing a design strategy. The result was a cohesive and stylish look I could never have achieved on my own. I am so glad I gave them a chance.',
    image: null,
  },
];

const bookFeatures = [
  'Uncover the blind spots in your projects',
  'Understand what today\'s premium buyer truly desires',
  'Design, position & communicate for maximum desire',
  'Create projects that sell faster, at better value',
];

/* ═══════════════════════════════════════════════
   ANIMATED COUNTER
   ═══════════════════════════════════════════════ */
function AnimatedStat({ value, label, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      style={{
        textAlign: 'center',
        padding: '20px 0',
        borderRight: '1px solid rgba(0,0,0,0.08)',
      }}
    >
      <div className="stat-number">{value}</div>
      <div className="stat-label">{label}</div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   SECTION HEADER
   ═══════════════════════════════════════════════ */
function SectionHeader({ label, title, subtitle, align = 'center', dark = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{ textAlign: align, marginBottom: 60 }}
    >
      {label && (
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.75rem',
          fontWeight: 500,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          marginBottom: 12,
        }}>
          {label}
        </p>
      )}
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontWeight: 800,
        fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
        color: dark ? '#ffffff' : 'var(--navy)',
        lineHeight: 1.15,
        letterSpacing: '-0.01em',
      }}
        dangerouslySetInnerHTML={title ? { __html: title } : undefined}
      />
      {subtitle && (
        <p style={{
          maxWidth: 700,
          margin: align === 'center' ? '16px auto 0' : '16px 0 0',
          color: dark ? 'rgba(255,255,255,0.6)' : 'var(--text-medium)',
          fontSize: '0.95rem',
          lineHeight: 1.7,
        }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   IMAGE CARD
   ═══════════════════════════════════════════════ */
function ImageCard({ image, label, aspectRatio = '4/3', onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onClick={onClick}
      style={{
        position: 'relative',
        borderRadius: 12,
        overflow: 'hidden',
        aspectRatio,
        cursor: 'pointer',
      }}
    >
      <img
        src={image}
        alt={label}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.7s ease',
        }}
        onMouseEnter={e => e.target.style.transform = 'scale(1.08)'}
        onMouseLeave={e => e.target.style.transform = 'scale(1)'}
      />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 50%)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: 20,
        left: 24,
        fontFamily: "'Playfair Display', serif",
        fontSize: '1.2rem',
        fontStyle: 'italic',
        color: '#ffffff',
        textShadow: '0 2px 10px rgba(0,0,0,0.4)',
      }}>
        {label}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   STAR RATING
   ═══════════════════════════════════════════════ */
function StarRating({ rating = 5 }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24"
          fill={i < rating ? '#f5c518' : '#ccc'} stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   CERTIFICATE CAROUSEL
   ═══════════════════════════════════════════════ */
function CertificateCarousel() {
  const scrollRef = useRef(null);
  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ position: 'relative', marginTop: 48 }}>
      {/* Left arrow */}
      <button onClick={() => scroll(-1)} style={{
        position: 'absolute', left: -20, top: '50%', transform: 'translateY(-50%)',
        zIndex: 5, width: 44, height: 44, borderRadius: '50%',
        background: '#fff', border: '1px solid rgba(0,0,0,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.2rem', color: 'var(--text-dark)', cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
      }}>
        ‹
      </button>

      {/* Scrollable area */}
      <div ref={scrollRef} style={{
        display: 'flex', gap: 24, overflowX: 'auto', scrollSnapType: 'x mandatory',
        paddingBottom: 8, scrollbarWidth: 'none', msOverflowStyle: 'none',
      }}>
        <style>{`.cert-scroll::-webkit-scrollbar { display: none; }`}</style>
        {certificates.map((cert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            style={{
              minWidth: 280, scrollSnapAlign: 'start',
              background: 'linear-gradient(135deg, #8B7355, #6B5940)',
              borderRadius: 8, padding: 16,
              boxShadow: '4px 4px 15px rgba(0,0,0,0.2)',
            }}
          >
            {/* Inner frame */}
            <div style={{
              background: '#f8f4ed', borderRadius: 4, padding: 20,
              aspectRatio: '4/5',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2px solid #d4c5a9',
            }}>
              <div style={{ textAlign: 'center', color: 'var(--text-light)' }}>
                <div style={{ fontSize: '2rem', marginBottom: 8 }}>🏆</div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-dark)' }}>
                  {cert.title}
                </p>
                <p style={{ fontSize: '0.75rem', marginTop: 4, color: 'var(--text-light)' }}>
                  Ramesh Singhal Design
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Right arrow */}
      <button onClick={() => scroll(1)} style={{
        position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)',
        zIndex: 5, width: 44, height: 44, borderRadius: '50%',
        background: '#fff', border: '1px solid rgba(0,0,0,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.2rem', color: 'var(--text-dark)', cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
      }}>
        ›
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   CONTACT FORM
   ═══════════════════════════════════════════════ */
function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); alert('Thank you! We will get back to you soon.'); };

  const inputStyle = {
    width: '100%', padding: '14px 0', border: 'none',
    borderBottom: '1px solid rgba(0,0,0,0.12)', background: 'transparent',
    fontSize: '0.95rem', color: 'var(--text-dark)', outline: 'none',
    fontFamily: 'Inter, sans-serif', transition: 'border-color 0.3s ease',
  };
  const labelStyle = {
    fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: 500,
    display: 'block', marginBottom: 4,
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <label style={labelStyle}>Name</label>
        <input name="name" value={form.name} onChange={handleChange} style={inputStyle}
          onFocus={e => e.target.style.borderBottomColor = 'var(--gold)'}
          onBlur={e => e.target.style.borderBottomColor = 'rgba(0,0,0,0.12)'} />
      </div>
      <div>
        <label style={labelStyle}>Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} style={inputStyle}
          onFocus={e => e.target.style.borderBottomColor = 'var(--gold)'}
          onBlur={e => e.target.style.borderBottomColor = 'rgba(0,0,0,0.12)'} />
      </div>
      <div>
        <label style={labelStyle}>Phone</label>
        <input name="phone" type="tel" value={form.phone} onChange={handleChange} style={inputStyle}
          onFocus={e => e.target.style.borderBottomColor = 'var(--gold)'}
          onBlur={e => e.target.style.borderBottomColor = 'rgba(0,0,0,0.12)'} />
      </div>
      <div>
        <label style={labelStyle}>Service Required</label>
        <input name="service" value={form.service} onChange={handleChange} style={inputStyle}
          onFocus={e => e.target.style.borderBottomColor = 'var(--gold)'}
          onBlur={e => e.target.style.borderBottomColor = 'rgba(0,0,0,0.12)'} />
      </div>
      <div>
        <label style={labelStyle}>Message</label>
        <textarea name="message" value={form.message} onChange={handleChange} rows={4}
          style={{ ...inputStyle, resize: 'vertical', fontFamily: 'Inter, sans-serif' }}
          onFocus={e => e.target.style.borderBottomColor = 'var(--gold)'}
          onBlur={e => e.target.style.borderBottomColor = 'rgba(0,0,0,0.12)'} />
      </div>
      <button type="submit" style={{
        padding: '16px 48px', background: 'var(--gold)',
        color: '#fff', border: 'none', borderRadius: 8,
        fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer',
        letterSpacing: '0.05em', transition: 'all 0.3s ease',
        alignSelf: 'flex-start',
      }}
        onMouseEnter={e => { e.target.style.background = '#9a7a30'; e.target.style.transform = 'translateY(-2px)'; }}
        onMouseLeave={e => { e.target.style.background = 'var(--gold)'; e.target.style.transform = 'translateY(0)'; }}
      >
        Submit
      </button>
    </form>
  );
}

/* ═══════════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════════ */
export default function Home() {
  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setHeroIdx(i => (i + 1) % heroSlides.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      {/* ═══════════════ HERO ═══════════════ */}
      <section style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={heroIdx}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{
              opacity: 1, scale: 1,
              transition: { opacity: { duration: 1 }, scale: { duration: 10, ease: 'linear' } },
            }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <img src={heroSlides[heroIdx].image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)',
            }} />
          </motion.div>
        </AnimatePresence>

        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '0 8%', zIndex: 10, maxWidth: 800,
        }}>
          <AnimatePresence mode="wait">
            <motion.h1
              key={heroIdx}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
                fontWeight: 500, color: '#ffffff', lineHeight: 1.1,
                whiteSpace: 'pre-line', letterSpacing: '-0.02em',
              }}
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
              style={{
                marginTop: 24, color: 'rgba(255,255,255,0.75)',
                fontSize: '0.95rem', lineHeight: 1.7, maxWidth: 480, whiteSpace: 'pre-line',
              }}
            >
              {heroSlides[heroIdx].subtitle}
            </motion.p>
          </AnimatePresence>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{ marginTop: 40 }}
          >
            <Link to="/projects" className="hero-btn" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 32px', background: 'transparent', color: '#ffffff',
              border: '1.5px solid rgba(255,255,255,0.5)', borderRadius: 50,
              fontSize: '0.9rem', fontWeight: 500, transition: 'all 0.3s ease',
            }}>
              View Projects →
            </Link>
          </motion.div>
        </div>

        <div style={{ position: 'absolute', bottom: 40, left: '8%', zIndex: 10, display: 'flex', gap: 8 }}>
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setHeroIdx(i)} style={{
              width: i === heroIdx ? 32 : 12, height: 4, borderRadius: 2,
              background: i === heroIdx ? '#ffffff' : 'rgba(255,255,255,0.3)',
              transition: 'all 0.4s ease', border: 'none', cursor: 'pointer',
            }} />
          ))}
        </div>
      </section>

      {/* ═══════════════ ABOUT SNIPPET ═══════════════ */}
      <section style={{ background: 'var(--cream)', padding: 'var(--section-padding) 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: 20 }}>
            Est. 1995 — Siliguri, India
          </motion.p>

          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 400, fontStyle: 'italic', color: 'var(--text-dark)', lineHeight: 1.15, maxWidth: 700, margin: '0 auto' }}>
            30+ years of turning Space into Legacy
          </motion.h2>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            style={{ maxWidth: 680, margin: '32px auto 0', color: 'var(--text-medium)', fontSize: '0.95rem', lineHeight: 1.8 }}>
            <p>Since 1995, Raamesh Singhal Design has been creating spaces where design, functionality, and human experience come together. Built on the belief that exceptional spaces require a unified vision, we seamlessly integrate architecture, interiors, planning, procurement, and execution under one roof.</p>
            <p style={{ marginTop: 16 }}>From our studio in Siliguri, we have delivered luxury residences, hospitality spaces, and large-scale developments across Siliguri, Sikkim, Assam, Nepal, and Bhutan. Every project is guided by a single commitment: one vision, one standard, and complete ownership from concept to completion.</p>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, marginTop: 64, maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}>
            {stats.map((s, i) => (
              <AnimatedStat key={i} value={s.value} label={s.label} delay={i * 0.1} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ SHOWREEL VIDEO ═══════════════ */}
      <section style={{ background: 'var(--cream-dark)', padding: '80px 0 var(--section-padding)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 40, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.15)', aspectRatio: '16/9', background: '#000' }}>
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1c2a3a, #2b3d52)' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <div style={{ width: 0, height: 0, borderTop: '12px solid transparent', borderBottom: '12px solid transparent', borderLeft: '20px solid rgba(255,255,255,0.8)', marginLeft: 4 }} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ FOUNDERS ═══════════════ */}
      <section style={{ background: 'var(--cream)', padding: 'var(--section-padding) 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', fontWeight: 800, color: 'var(--navy)', lineHeight: 1.15, maxWidth: 600, margin: '0 auto' }}>
            The thinking behind every space <em style={{ fontStyle: 'italic', fontWeight: 600 }}>we create</em>
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            style={{ maxWidth: 650, margin: '24px auto 0', color: 'var(--text-medium)', fontSize: '0.95rem', lineHeight: 1.8 }}>
            Exceptional spaces are never the result of design alone. They emerge when vision, functionality, human behaviour, and execution work in complete harmony. That belief has guided Raamesh Singhal Design since its inception.
          </motion.p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, marginTop: 64, maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}>
            {founders.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                style={{ background: '#f0e8d8', borderRadius: 16, overflow: 'hidden', textAlign: 'left' }}>
                <div style={{ aspectRatio: '1/1', background: 'linear-gradient(135deg, #d5cec0, #c8bfad)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5">
                    <circle cx="12" cy="8" r="4" /><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                  </svg>
                </div>
                <div style={{ padding: '28px 28px 32px' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: 4 }}>{f.role}</p>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: 16 }}>{f.name}</h3>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', color: 'var(--gold)', lineHeight: 0.5, marginBottom: 12, opacity: 0.6 }}>❝</div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-medium)', lineHeight: 1.6, fontStyle: 'italic' }}>{f.quote}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ OUR EXPERTISE ═══════════════ */}
      <section style={{ background: 'var(--cream-light)', padding: 'var(--section-padding) 0' }}>
        <div className="container">
          <SectionHeader title="OUR EXPERTISE" subtitle="Architecture, interior design and full turnkey execution, held under one accountable team. The vision and the delivery never separate, so nothing falls through the gaps between firms." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {expertise.map((item, i) => (
              <ImageCard key={i} image={item.image} label={item.label} aspectRatio="3/4" />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TYPES OF SERVICES ═══════════════ */}
      <section style={{ background: 'var(--cream)', padding: 'var(--section-padding) 0' }}>
        <div className="container">
          <SectionHeader title="TYPES OF SERVICES" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {serviceTypes.map((item, i) => (
              <ImageCard key={i} image={item.image} label={item.label} aspectRatio="16/10" />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHY US ═══════════════ */}
      <section style={{ background: 'var(--cream-light)', padding: 'var(--section-padding) 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80, alignItems: 'flex-start' }}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, color: 'var(--navy)', lineHeight: 1.1, marginBottom: 20 }}>WHY US?</h2>
              <p style={{ color: 'var(--text-medium)', fontSize: '0.95rem', lineHeight: 1.8, maxWidth: 380 }}>
                We bring together design thinking, construction expertise, and a deep understanding of how people actually live in spaces — all under one accountable team.
              </p>
            </motion.div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
              {whyUsPoints.map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 20, alignItems: 'flex-start', paddingBottom: i < whyUsPoints.length - 1 ? 40 : 0, borderBottom: i < whyUsPoints.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
                  <div className="why-us-number">{p.number}</div>
                  <div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: 8 }}>{p.title}</h3>
                    <p style={{ color: 'var(--text-medium)', fontSize: '0.9rem', lineHeight: 1.7 }}>{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ AWARDS & CERTIFICATES ═══════════════ */}
      <section style={{ background: 'var(--cream)', padding: 'var(--section-padding) 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            {/* Left: Text */}
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontStyle: 'italic', fontWeight: 400, color: 'var(--text-dark)', marginBottom: 8, lineHeight: 1.2 }}>
                Awards & Certificates
              </h2>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: 'var(--text-dark)', lineHeight: 1.1, marginBottom: 24 }}>
                Being trusted twice<br />is the real award.
              </h3>
              <p style={{ color: 'var(--text-medium)', fontSize: '0.95rem', lineHeight: 1.8, maxWidth: 440 }}>
                Our work has been honoured by some of the most respected names in design and industry. But the recognition we value most isn't on a shelf — it's the client who hands us their next project before the first is even finished.
              </p>
            </motion.div>

            {/* Right: Trophy images */}
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              style={{ display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'flex-end' }}>
              {awards.map((award, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: 120 + (i === 1 ? 20 : 0), height: 160 + (i === 1 ? 30 : 0),
                    background: 'linear-gradient(135deg, #e8dcc8, #d4c5a9)',
                    borderRadius: '8px 8px 0 0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto',
                  }}>
                    <span style={{ fontSize: '3rem' }}>🏆</span>
                  </div>
                  <div style={{
                    width: 100 + (i === 1 ? 20 : 0), height: 30,
                    background: 'linear-gradient(135deg, #d4c5a9, #c8b894)',
                    borderRadius: '0 0 8px 8px',
                    margin: '0 auto',
                  }} />
                  <p style={{ marginTop: 8, fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-dark)', fontFamily: "'Playfair Display', serif" }}>
                    {award.name}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Certificate Carousel */}
          <CertificateCarousel />
        </div>
      </section>

      {/* ═══════════════ BOOK SECTION ═══════════════ */}
      <section style={{ background: 'var(--cream-light)', padding: 'var(--section-padding) 0', overflow: 'hidden' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 60, alignItems: 'center' }}>
            {/* Left: Book mockup */}
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{
                width: 320, height: 440, borderRadius: '4px 16px 16px 4px',
                background: 'linear-gradient(135deg, #2b3d52, #1c2a3a)',
                boxShadow: '20px 20px 60px rgba(0,0,0,0.2), -5px 0 20px rgba(0,0,0,0.1)',
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                padding: '40px 30px', color: '#fff', position: 'relative',
                overflow: 'hidden', transform: 'perspective(800px) rotateY(-5deg)',
              }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '60%', height: '50%', background: 'linear-gradient(135deg, rgba(184,149,63,0.15), transparent)', borderRadius: '0 16px 0 0' }} />
                <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>It's not the market.<br />It's the misunderstanding.</p>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 700, lineHeight: 1.2, marginBottom: 12 }}>
                  Why Luxury Homes Don't Sell:
                </h3>
                <p style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--gold)', marginBottom: 24 }}>The Blind Spot Costing Developers Crores</p>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 16 }}>
                  <p style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Ramesh Singhal</p>
                </div>
              </div>
            </motion.div>

            {/* Right: Book info */}
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              {/* Gold banner */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 16,
                background: 'linear-gradient(135deg, var(--gold), #9a7a30)',
                padding: '16px 32px', borderRadius: 8, marginBottom: 32,
                color: '#fff',
              }}>
                <div>
                  <p style={{ fontSize: '0.85rem', fontWeight: 400, opacity: 0.9 }}>The Book by</p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700 }}>Ramesh Singhal</p>
                </div>
                <div style={{ width: 50, height: 50, borderRadius: 8, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5">
                    <circle cx="12" cy="8" r="4" /><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                  </svg>
                </div>
              </div>

              {/* Quote & description */}
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', color: 'var(--gold)', lineHeight: 0.5, marginBottom: 16, opacity: 0.4 }}>❝</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontStyle: 'italic', fontWeight: 400, color: 'var(--text-dark)', marginBottom: 8, lineHeight: 1.3 }}>
                Why Luxury Homes Don't Sell:
              </h3>
              <p style={{ fontWeight: 600, color: 'var(--text-dark)', marginBottom: 20 }}>The Blind Spot Costing Developers Crores</p>
              <p style={{ color: 'var(--text-medium)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: 28 }}>
                It's not the market. It's the misunderstanding. Drawing on three decades of building luxury spaces, Raamesh Singhal uncovers the blind spots costing developers crores — and lays out what it actually takes to design projects that sell faster, at better value.
              </p>

              {/* Features grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 32px', marginBottom: 32 }}>
                {bookFeatures.map((feat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{ color: 'var(--gold)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-medium)', lineHeight: 1.5 }}>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Buy Now */}
              <Link to="#" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 32px', background: 'var(--gold)',
                color: '#fff', borderRadius: 50, fontSize: '0.9rem',
                fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                transition: 'all 0.3s ease',
              }}
                onMouseEnter={e => { e.target.style.background = '#9a7a30'; e.target.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.target.style.background = 'var(--gold)'; e.target.style.transform = 'translateY(0)'; }}
              >
                BUY NOW →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section style={{ background: 'var(--cream)', padding: 'var(--section-padding) 0' }}>
        <div className="container">
          <SectionHeader
            label="CLIENT'S TESTIMONIALS"
            title='HEARD FROM THOSE WHO <em style="font-weight:400">LIVED OUR WORK</em>'
          />

          {/* Text testimonial cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 60 }}>
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: 'linear-gradient(135deg, #c9a84c, #b8953f)',
                  borderRadius: 16, padding: '28px 24px',
                  color: '#fff', position: 'relative',
                }}
              >
                {/* Client photo + stars row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: 8,
                    background: 'rgba(0,0,0,0.2)', flexShrink: 0,
                  }} />
                  <StarRating rating={t.rating} />
                </div>
                <p style={{ fontSize: '0.88rem', lineHeight: 1.7, marginBottom: 16, opacity: 0.95 }}>{t.quote}</p>
                <p style={{ fontSize: '0.85rem', fontWeight: 600, textAlign: 'right' }}>-{t.name}</p>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ width: '50%', height: 1, background: 'rgba(0,0,0,0.08)', margin: '0 auto 60px' }} />

          {/* Video testimonials */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {[1, 2].map(i => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                style={{ aspectRatio: '16/10', borderRadius: 16, overflow: 'hidden', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.3s ease',
                }}>
                  <div style={{ width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: '16px solid rgba(255,255,255,0.8)', marginLeft: 3 }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CONTACT ═══════════════ */}
      <section style={{ background: 'var(--cream-light)', padding: 'var(--section-padding) 0' }}>
        <div className="container">
          {/* Header row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
            <motion.h2 initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(3rem, 7vw, 5rem)', fontWeight: 800, color: 'var(--text-dark)', lineHeight: 1, letterSpacing: '-0.02em' }}>
              CONTACT
            </motion.h2>
            <motion.p initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: 'var(--text-medium)', textAlign: 'right', lineHeight: 1.4 }}>
              Lets discuss your next<br />Project together
            </motion.p>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(0,0,0,0.08)', marginBottom: 48 }} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
            {/* Left: Contact info + Map */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  { label: 'Phone', value: '+91 82508 41773 / +91 98008 48155' },
                  { label: 'Email', value: 'rameshsinghaldesign@gmail.com' },
                  { label: 'Location', value: 'Time Square, 3rd Floor,\nOpp Ravi Auto, Sevoke Road, Siliguri' },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'grid', gridTemplateColumns: '100px 1fr',
                    gap: 24, padding: '20px 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                  }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-dark)', fontSize: '0.9rem' }}>{item.label}</span>
                    <span style={{ color: 'var(--text-medium)', fontSize: '0.9rem', whiteSpace: 'pre-line', textAlign: 'right' }}>{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div style={{ marginTop: 32, borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)' }}>
                <iframe
                  title="Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3564.8!2d88.43!3d26.72!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDQzJzEyLjAiTiA4OMKwMjUnNDguMCJF!5e0!3m2!1sen!2sin!4v1"
                  style={{ width: '100%', height: 220, border: 0, filter: 'grayscale(0.3)' }}
                  loading="lazy"
                />
                <a href="https://maps.google.com" target="_blank" rel="noreferrer"
                  style={{ display: 'block', padding: '10px 16px', fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 500 }}>
                  Open in Map ↗
                </a>
              </div>
            </motion.div>

            {/* Right: Contact form */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA BANNER ═══════════════ */}
      <section style={{
        background: 'var(--navy)', padding: '100px 0', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 400, height: 1, background: 'linear-gradient(90deg, transparent, rgba(184,149,63,0.4), transparent)' }} />
        <div className="container">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, fontStyle: 'italic', color: '#ffffff', marginBottom: 16 }}>
            Ready to start your project?
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', marginBottom: 36, maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
            Let's collaborate to create something extraordinary. Get in touch with our team today.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <Link to="/contact" className="btn-gold">Get a Quote →</Link>
          </motion.div>
        </div>
      </section>

      {/* Responsive styles */}
      <style>{`
        .hero-btn:hover { background: #fff !important; color: #1c2a3a !important; border-color: #fff !important; }
        @media (max-width: 768px) {
          section > .container > div[style*="grid-template-columns: 1fr 1fr"],
          section > .container > div[style*="grid-template-columns: 0.9fr"],
          section > .container > div[style*="grid-template-columns: 1fr 1.2fr"] {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          section > .container > div[style*="grid-template-columns: repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          section > .container > div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
