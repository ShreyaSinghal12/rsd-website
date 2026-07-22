import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import projects from '../data/projects';
import categoryContent from '../data/CategoryContent';
import ProjectCard from '../components/ProjectCard';

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
            <button onClick={() => { if (window.history.state?.idx > 0) navigate(-1); else navigate('/', { state: { scrollTo: 'projects' } }); }} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
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
              <ProjectCard key={p.id} project={p} delay={(i % 9) * 0.06} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}