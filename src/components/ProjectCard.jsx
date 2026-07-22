import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectCard({ project, delay = 0 }) {
  const [open, setOpen] = useState(false);
  const [pageIdx, setPageIdx] = useState(0);
  const gallery = project.gallery && project.gallery.length ? project.gallery : [project.img];
  const count = gallery.length;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay }}
        onClick={() => { setPageIdx(0); setOpen(true); }}
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

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(20,20,20,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
          >
            <button onClick={() => setOpen(false)} aria-label="Close"
              style={{ position: 'absolute', top: 24, right: 24, width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', fontSize: '1.1rem', cursor: 'pointer' }}>
              &#10005;
            </button>

            <div onClick={e => e.stopPropagation()} style={{ position: 'relative', maxWidth: 900, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <p style={{ color: '#fff', fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', marginBottom: 16, textAlign: 'center' }}>{project.title}</p>
              <motion.img
                key={pageIdx}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}
                src={gallery[pageIdx]} alt={`${project.title} photo ${pageIdx + 1}`}
                style={{ maxWidth: '100%', maxHeight: '72vh', borderRadius: 6, boxShadow: '0 30px 80px rgba(0,0,0,0.4)', objectFit: 'contain' }}
              />

              {count > 1 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 20 }}>
                  <button onClick={() => setPageIdx(p => (p - 1 + count) % count)} aria-label="Previous photo"
                    style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', fontSize: '1.1rem', cursor: 'pointer' }}>
                    ‹
                  </button>
                  <p style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
                    {pageIdx + 1} of {count}
                  </p>
                  <button onClick={() => setPageIdx(p => (p + 1) % count)} aria-label="Next photo"
                    style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', fontSize: '1.1rem', cursor: 'pointer' }}>
                    ›
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}