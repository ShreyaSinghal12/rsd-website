import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectCard({ project, delay = 0 }) {
  const [open, setOpen] = useState(false);
  const gallery = project.gallery && project.gallery.length ? project.gallery : [project.img];
  const count = gallery.length;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay }}
        onClick={() => setOpen(true)}
        style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', aspectRatio: '4/3', cursor: 'pointer' }}
      >
        <img src={project.img} alt={project.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.06)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,26,24,0.75) 0%, transparent 55%)', display: 'flex', alignItems: 'flex-end', padding: 20 }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.05rem', color: '#fff' }}>{project.title}</p>
        </div>
        {count > 1 && (
          <div style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(0,0,0,0.55)', color: '#fff', fontSize: '0.72rem', fontFamily: 'Inter, sans-serif', padding: '4px 10px', borderRadius: 999, letterSpacing: '0.05em' }}>
            {count} photos
          </div>
        )}
      </motion.div>

      {/* Gallery popup — every image at once, no arrows needed */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(20,20,20,0.94)', overflowY: 'auto', padding: '32px 24px' }}
          >
            <button onClick={() => setOpen(false)} aria-label="Close"
              style={{ position: 'fixed', top: 24, right: 24, width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', fontSize: '1.1rem', cursor: 'pointer', zIndex: 301 }}>
              &#10005;
            </button>

            <div onClick={e => e.stopPropagation()} style={{ maxWidth: 1200, margin: '0 auto' }}>
              <p style={{ color: '#fff', fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', marginBottom: 24, textAlign: 'center' }}>{project.title}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
                {gallery.map((src, i) => (
                  <motion.img
                    key={i}
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.02 }}
                    src={src} alt={`${project.title} photo ${i + 1}`}
                    style={{ width: '100%', borderRadius: 8, display: 'block', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}