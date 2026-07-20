import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import projects from '../data/projects';

export default function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => String(p.id) === id);

  if (!project) {
    return (
      <div className="container" style={{ padding: '200px 0 120px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: 'var(--navy)', marginBottom: 20 }}>Project not found</h1>
        <Link to="/" style={{ color: 'var(--gold)', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>← Back to Home</Link>
      </div>
    );
  }

  const moreProjects = projects.filter(p => p.category === project.category && p.id !== project.id).slice(0, 6);

  return (
    <div>
      {/* ═══════════════ HEADING ═══════════════ */}
      <section style={{ background: 'var(--cream)', padding: '160px 0 60px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <button onClick={() => navigate(-1)} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              ← Back
            </button>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.4rem, 5.5vw, 4rem)', fontWeight: 800, color: 'var(--navy)', lineHeight: 1.1, margin: '24px auto 0', maxWidth: 800 }}>
            {project.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-light)', marginTop: 16 }}>
            {project.category}
          </motion.p>
        </div>
      </section>

      {/* ═══════════════ IMAGE + DESCRIPTION ═══════════════ */}
      <section style={{ background: 'var(--cream-light)', padding: '0 0 var(--section-padding)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '16/9', marginBottom: 48 }}>
            <img src={project.img} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', fontSize: '1.05rem', color: 'var(--text-medium)', lineHeight: 1.85 }}>
            {project.desc}
          </motion.p>
        </div>
      </section>

      {/* ═══════════════ MY PROJECTS ═══════════════ */}
      {moreProjects.length > 0 && (
        <section style={{ background: 'var(--cream)', padding: 'var(--section-padding) 0' }}>
          <div className="container">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, color: 'var(--navy)', marginBottom: 40, textAlign: 'center' }}>
              My Projects
            </motion.h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {moreProjects.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.06 }}
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
      )}
    </div>
  );
}