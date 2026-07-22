import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import projects from '../data/projects';
import servicesContent from '../data/servicesContent';
import team from '../data/team';
import ProjectCard from '../components/ProjectCard';

export default function ServicePage({ service }) {
  const navigate = useNavigate();
  const info = servicesContent[service];
  const items = projects.filter(p => info.projectCategories.includes(p.category));

  return (
    <div>
      {info.singlePhoto ? (
        /* ═══════════════ COMPACT ONE-SCREEN LAYOUT (single photo, no project gallery) ═══════════════ */
        <section style={{ background: 'var(--cream)', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '110px 0 40px' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <button onClick={() => { if (window.history.state?.idx > 0) navigate(-1); else navigate('/', { state: { scrollTo: 'services' } }); }} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                ← Back to Our Expertise
              </button>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 800, color: 'var(--navy)', lineHeight: 1.1, margin: '18px auto 0', maxWidth: 700 }}>
              {info.title}
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.6 }}
              style={{ maxWidth: 560, margin: '14px auto 0', color: 'var(--text-medium)', fontSize: '0.92rem', lineHeight: 1.65 }}>
              {info.subtitle}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
              style={{ display: 'flex', justifyContent: 'center', margin: '28px auto 0' }}>
  <img src={info.banner} alt={info.title} style={{ width: '100%', maxWidth: 640, height: 'auto', maxHeight: '82vh', objectFit: 'contain', display: 'block', borderRadius: 14, boxShadow: '0 20px 50px rgba(0,0,0,0.12)' }} />
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              style={{ maxWidth: 680, margin: '24px auto 0', fontSize: '0.88rem', color: 'var(--text-medium)', lineHeight: 1.7 }}>
              {info.intro}
            </motion.p>
          </div>
        </section>
      ) : (
        <>
          {/* ═══════════════ HEADING + SUBTITLE ═══════════════ */}
          <section style={{ background: 'var(--cream)', padding: '160px 0 60px' }}>
            <div className="container" style={{ textAlign: 'center' }}>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <button onClick={() => { if (window.history.state?.idx > 0) navigate(-1); else navigate('/', { state: { scrollTo: 'services' } }); }} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  ← Back to Our Expertise
                </button>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
                style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.6rem, 6vw, 4.5rem)', fontWeight: 800, color: 'var(--navy)', lineHeight: 1.1, margin: '24px auto 0', maxWidth: 700 }}>
                {info.title}
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
                style={{ maxWidth: 620, margin: '28px auto 0', color: 'var(--text-medium)', fontSize: '1.05rem', lineHeight: 1.8 }}>
                {info.subtitle}
              </motion.p>
            </div>
          </section>

          {/* ═══════════════ ABOUT THIS SERVICE ═══════════════ */}
          <section style={{ background: 'var(--cream)', padding: '0 0 var(--section-padding)' }}>
            <div className="container">
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                style={{ maxWidth: 780, margin: '0 auto', textAlign: 'center', fontSize: '0.98rem', color: 'var(--text-medium)', lineHeight: 1.9 }}>
                {info.intro}
              </motion.p>
            </div>
          </section>

          {/* ═══════════════ PROJECTS ═══════════════ */}
          <section style={{ background: 'var(--cream-light)', padding: 'var(--section-padding) 0' }}>
            <div className="container">
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', textAlign: 'center', marginBottom: 48 }}>
                {items.length} Projects
              </motion.p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {items.map((p, i) => (
                  <ProjectCard key={p.id} project={p} delay={(i % 9) * 0.06} />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ═══════════════ OUR TEAM — MOODBOARD SCROLL ═══════════════ */}
      <section style={{ background: 'var(--cream)', padding: 'var(--section-padding) 0' }}>
        <div className="container">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, color: 'var(--navy)', marginBottom: 40 }}>
            Our Team
          </motion.h2>
          <div className="team-scroll" style={{ display: 'flex', gap: 20, overflowX: 'auto', paddingBottom: 12 }}>
            {team.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{ flexShrink: 0, width: 210 }}>
                <div style={{ aspectRatio: '1/1', borderRadius: 12, background: 'linear-gradient(135deg, #d5cec0, #c8bfad)', overflow: 'hidden', marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {t.img ? (
                    <img src={t.img} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  ) : (
                    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.9">
                      <circle cx="12" cy="8" r="4" /><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                    </svg>
                  )}
                </div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1rem', color: 'var(--text-dark)', marginBottom: 2 }}>{t.name}</p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', color: 'var(--text-light)' }}>{t.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}