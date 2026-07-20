import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import projects from '../data/projects';
import categoryContent from '../data/CategoryContent';

export default function CategoryPage({ category }) {
  const navigate = useNavigate();
  const info = categoryContent[category];
  const items = projects.filter(p => info.projectCategories.includes(p.category));

  return (
    <div>
      {/* ═══════════════ HEADING ═══════════════ */}
      <section style={{ background: 'var(--cream)', padding: '160px 0 80px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <button onClick={() => navigate('/', { state: { scrollTo: 'projects' } })} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              ← Back to Types of Services
            </button>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.6rem, 6vw, 4.5rem)', fontWeight: 800, color: 'var(--navy)', lineHeight: 1.1, margin: '24px auto 0', maxWidth: 700 }}>
            {info.title}
          </motion.h1>
        </div>
      </section>

      {/* ═══════════════ PROJECTS ═══════════════ */}
      <section style={{ background: 'var(--cream-light)', padding: '0 0 var(--section-padding)' }}>
        <div className="container">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', textAlign: 'center', marginBottom: 48 }}>
            {items.length} Projects
          </motion.p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {items.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: (i % 9) * 0.06 }}
                onClick={() => navigate(`/project/${p.id}`)}
                style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', aspectRatio: '4/3', cursor: 'pointer' }}>
                <img src={p.img} alt={p.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.06)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,26,24,0.75) 0%, transparent 55%)', display: 'flex', alignItems: 'flex-end', padding: 20 }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.05rem', color: '#fff' }}>{p.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}