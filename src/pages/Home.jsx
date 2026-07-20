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
      >
        {!title ? '' : undefined}
      </h2>
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
        {/* Background Image with Ken Burns */}
        <AnimatePresence mode="wait">
          <motion.div
            key={heroIdx}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { opacity: { duration: 1 }, scale: { duration: 10, ease: 'linear' } },
            }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <img
              src={heroSlides[heroIdx].image}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)',
            }} />
          </motion.div>
        </AnimatePresence>

        {/* Hero Content */}
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
                fontWeight: 500,
                color: '#ffffff',
                lineHeight: 1.1,
                whiteSpace: 'pre-line',
                letterSpacing: '-0.02em',
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
                marginTop: 24,
                color: 'rgba(255,255,255,0.75)',
                fontSize: '0.95rem',
                lineHeight: 1.7,
                maxWidth: 480,
                whiteSpace: 'pre-line',
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
            <Link
              to="/projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 32px',
                background: 'transparent',
                color: '#ffffff',
                border: '1.5px solid rgba(255,255,255,0.5)',
                borderRadius: 50,
                fontSize: '0.9rem',
                fontWeight: 500,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.target.style.background = '#ffffff';
                e.target.style.color = '#1c2a3a';
                e.target.style.borderColor = '#ffffff';
              }}
              onMouseLeave={e => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#ffffff';
                e.target.style.borderColor = 'rgba(255,255,255,0.5)';
              }}
            >
              View Projects →
            </Link>
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div style={{
          position: 'absolute', bottom: 40, left: '8%', zIndex: 10,
          display: 'flex', gap: 8,
        }}>
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIdx(i)}
              style={{
                width: i === heroIdx ? 32 : 12,
                height: 4,
                borderRadius: 2,
                background: i === heroIdx ? '#ffffff' : 'rgba(255,255,255,0.3)',
                transition: 'all 0.4s ease',
                border: 'none',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      </section>

      {/* ═══════════════ ABOUT SNIPPET ═══════════════ */}
      <section style={{ background: 'var(--cream)', padding: 'var(--section-padding) 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.8rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'var(--text-light)',
              marginBottom: 20,
            }}
          >
            Est. 1995 — Siliguri, India
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'var(--text-dark)',
              lineHeight: 1.15,
              maxWidth: 700,
              margin: '0 auto',
            }}
          >
            30+ years of turning Space into Legacy
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              maxWidth: 680,
              margin: '32px auto 0',
              color: 'var(--text-medium)',
              fontSize: '0.95rem',
              lineHeight: 1.8,
            }}
          >
            <p>
              Since 1995, Raamesh Singhal Design has been creating spaces where design, functionality, and human experience
              come together. Built on the belief that exceptional spaces require a unified vision, we seamlessly integrate
              architecture, interiors, planning, procurement, and execution under one roof.
            </p>
            <p style={{ marginTop: 16 }}>
              From our studio in Siliguri, we have delivered luxury residences, hospitality spaces, and large-scale developments
              across Siliguri, Sikkim, Assam, Nepal, and Bhutan. Every project is guided by a single commitment: one vision, one
              standard, and complete ownership from concept to completion.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 0,
              marginTop: 64,
              maxWidth: 900,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {stats.map((s, i) => (
              <AnimatedStat key={i} value={s.value} label={s.label} delay={i * 0.1} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ SHOWREEL VIDEO ═══════════════ */}
      <section style={{ background: 'var(--cream-dark)', padding: '80px 0 var(--section-padding)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              position: 'relative',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0,0,0,0.15)',
              aspectRatio: '16/9',
              background: '#000',
            }}
          >
            {/* Placeholder for video - replace with actual video */}
            <div style={{
              width: '100%', height: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'linear-gradient(135deg, #1c2a3a, #2b3d52)',
              color: 'rgba(255,255,255,0.5)', fontFamily: "'Playfair Display', serif",
              fontSize: '1.5rem',
            }}>
              {/* Play button */}
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.3s ease',
              }}>
                <div style={{
                  width: 0, height: 0,
                  borderTop: '12px solid transparent',
                  borderBottom: '12px solid transparent',
                  borderLeft: '20px solid rgba(255,255,255,0.8)',
                  marginLeft: 4,
                }} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ FOUNDERS / THINKING ═══════════════ */}
      <section style={{ background: 'var(--cream)', padding: 'var(--section-padding) 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
              fontWeight: 800,
              color: 'var(--navy)',
              lineHeight: 1.15,
              maxWidth: 600,
              margin: '0 auto',
            }}
          >
            The thinking behind every space <em style={{ fontStyle: 'italic', fontWeight: 600 }}>we create</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            style={{
              maxWidth: 650,
              margin: '24px auto 0',
              color: 'var(--text-medium)',
              fontSize: '0.95rem',
              lineHeight: 1.8,
            }}
          >
            Exceptional spaces are never the result of design alone. They emerge when vision,
            functionality, human behaviour, and execution work in complete harmony.
            That belief has guided Raamesh Singhal Design since its inception.
          </motion.p>

          {/* Founder Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 40,
            marginTop: 64,
            maxWidth: 800,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            {founders.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                style={{
                  background: '#f0e8d8',
                  borderRadius: 16,
                  overflow: 'hidden',
                  textAlign: 'left',
                }}
              >
                {/* Photo placeholder */}
                <div style={{
                  aspectRatio: '1/1',
                  background: 'linear-gradient(135deg, #d5cec0, #c8bfad)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                  </svg>
                </div>

                {/* Info */}
                <div style={{ padding: '28px 28px 32px' }}>
                  <p style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-light)',
                    marginBottom: 4,
                  }}>
                    {f.role}
                  </p>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: 'var(--text-dark)',
                    marginBottom: 16,
                  }}>
                    {f.name}
                  </h3>

                  {/* Quote mark */}
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '3rem',
                    color: 'var(--gold)',
                    lineHeight: 0.5,
                    marginBottom: 12,
                    opacity: 0.6,
                  }}>
                    ❝
                  </div>
                  <p style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-medium)',
                    lineHeight: 1.6,
                    fontStyle: 'italic',
                  }}>
                    {f.quote}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ OUR EXPERTISE ═══════════════ */}
      <section style={{ background: 'var(--cream-light)', padding: 'var(--section-padding) 0' }}>
        <div className="container">
          <SectionHeader
            title="OUR EXPERTISE"
            subtitle="Architecture, interior design and full turnkey execution, held under one accountable team. The vision and the delivery never separate, so nothing falls through the gaps between firms."
          />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
          }}>
            {expertise.map((item, i) => (
              <ImageCard
                key={i}
                image={item.image}
                label={item.label}
                aspectRatio="3/4"
              />
            ))}
          </div>
        </div>

        {/* Responsive override */}
        <style>{`
          @media (max-width: 768px) {
            .expertise-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>
      </section>

      {/* ═══════════════ TYPES OF SERVICES ═══════════════ */}
      <section style={{ background: 'var(--cream)', padding: 'var(--section-padding) 0' }}>
        <div className="container">
          <SectionHeader title="TYPES OF SERVICES" />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 24,
          }}>
            {serviceTypes.map((item, i) => (
              <ImageCard
                key={i}
                image={item.image}
                label={item.label}
                aspectRatio="16/10"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHY US ═══════════════ */}
      <section style={{ background: 'var(--cream-light)', padding: 'var(--section-padding) 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: 80,
            alignItems: 'flex-start',
          }}>
            {/* Left side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontWeight: 800,
                color: 'var(--navy)',
                lineHeight: 1.1,
                marginBottom: 20,
              }}>
                WHY US?
              </h2>
              <p style={{
                color: 'var(--text-medium)',
                fontSize: '0.95rem',
                lineHeight: 1.8,
                maxWidth: 380,
              }}>
                We bring together design thinking, construction expertise, and a deep understanding
                of how people actually live in spaces — all under one accountable team.
              </p>
            </motion.div>

            {/* Right side - numbered points */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
              {whyUsPoints.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '60px 1fr',
                    gap: 20,
                    alignItems: 'flex-start',
                    paddingBottom: i < whyUsPoints.length - 1 ? 40 : 0,
                    borderBottom: i < whyUsPoints.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
                  }}
                >
                  <div className="why-us-number">{p.number}</div>
                  <div>
                    <h3 style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: 'var(--text-dark)',
                      marginBottom: 8,
                    }}>
                      {p.title}
                    </h3>
                    <p style={{
                      color: 'var(--text-medium)',
                      fontSize: '0.9rem',
                      lineHeight: 1.7,
                    }}>
                      {p.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile responsive */}
        <style>{`
          @media (max-width: 768px) {
            .why-us-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          }
        `}</style>
      </section>

      {/* ═══════════════ CTA BANNER ═══════════════ */}
      <section style={{
        background: 'var(--navy)',
        padding: '100px 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 400, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(184,149,63,0.4), transparent)',
        }} />

        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#ffffff',
              marginBottom: 16,
            }}
          >
            Ready to start your project?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '0.95rem',
              marginBottom: 36,
              maxWidth: 500,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Let's collaborate to create something extraordinary. Get in touch with our team today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/contact" className="btn-gold">
              Get a Quote →
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
