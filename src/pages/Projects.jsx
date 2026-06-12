import { useState, useCallback } from 'react'
import { useInView } from 'react-intersection-observer'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import projects from '../data/projects'

function FadeIn({ children, delay = 0 }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

const filters = [
  { key: 'all',          label: 'All' },
  { key: 'residential',  label: 'Residential' },
  { key: 'commercial',   label: 'Commercial & Retail' },
  { key: 'architecture', label: 'Architecture' },
]

const S = {
  gold:     '#C9A96E',
  ink:      '#1A1A18',
  offwhite: '#F7F4EF',
  stone:    '#E8E0D0',
  sage:     '#8A9B8E',
  mid:      '#6B6860',
}

export default function Projects() {
  const [filter,       setFilter]       = useState('all')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIdx,  setLightboxIdx]  = useState(0)

  const filtered = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter)

  const slides = filtered.map(p => ({ src: p.img, alt: p.title }))

  const openLightbox = useCallback((idx) => {
    setLightboxIdx(idx)
    setLightboxOpen(true)
  }, [])

  const counts = {
    all:          projects.length,
    residential:  projects.filter(p => p.category === 'residential').length,
    commercial:   projects.filter(p => p.category === 'commercial').length,
    architecture: projects.filter(p => p.category === 'architecture').length,
  }

  return (
    <>
      {/* ── PAGE HERO ── */}
      <section style={{
        background: S.ink, paddingTop: 68,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: 280, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url('http://raameshsinghaldesign.com/wp-content/uploads/2023/04/Stunning-Structures-1.jpg')",
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.2,
        }}/>
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '4rem 2rem' }}>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: S.gold, marginBottom: '1rem' }}>
            Our Work
          </p>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2.4rem,6vw,4rem)', fontWeight: 400, color: S.offwhite, lineHeight: 1.1 }}>
            Our <em style={{ fontStyle: 'italic', color: S.stone }}>Projects</em>
          </h1>
        </div>
      </section>

      {/* ── FILTER + GRID ── */}
      <section style={{ padding: '5rem 0 7rem', background: S.offwhite }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 2rem' }}>

          {/* Filter bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: S.mid }}>
              Showing <span style={{ color: S.gold }}>{filtered.length}</span> projects
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0' }}>
              {filters.map((f, i) => (
                <button key={f.key} onClick={() => setFilter(f.key)}
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                    padding: '0.6rem 1.2rem',
                    border: '1px solid rgba(26,26,24,0.15)',
                    borderRight: i < filters.length - 1 ? 'none' : '1px solid rgba(26,26,24,0.15)',
                    cursor: 'pointer',
                    background: filter === f.key ? S.ink : 'transparent',
                    color: filter === f.key ? S.gold : S.mid,
                    transition: 'all 0.25s',
                  }}
                  onMouseEnter={e => { if (filter !== f.key) { e.currentTarget.style.background = 'rgba(26,26,24,0.05)' } }}
                  onMouseLeave={e => { if (filter !== f.key) { e.currentTarget.style.background = 'transparent' } }}>
                  {f.label}
                  <span style={{ marginLeft: '0.4rem', opacity: 0.6 }}>({counts[f.key]})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5px',
          }}>
            {filtered.map((project, i) => (
              <FadeIn key={project.id} delay={(i % 9) * 55}>
                <div
                  onClick={() => openLightbox(i)}
                  style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/3', background: '#d0c8b8', cursor: 'zoom-in' }}
                  onMouseEnter={e => {
                    e.currentTarget.querySelector('img').style.transform = 'scale(1.06)'
                    e.currentTarget.querySelector('.proj-overlay').style.opacity = '1'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.querySelector('img').style.transform = 'scale(1)'
                    e.currentTarget.querySelector('.proj-overlay').style.opacity = '0'
                  }}>
                  <img
                    src={project.img}
                    alt={project.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }}
                  />
                  <div className="proj-overlay" style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(26,26,24,0.82) 0%, rgba(26,26,24,0.2) 60%, transparent 100%)',
                    opacity: 0, transition: 'opacity 0.35s ease',
                    display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.5rem',
                  }}>
                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: S.gold, marginBottom: '0.3rem' }}>
                      {project.category}
                    </span>
                    <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '1rem', color: S.offwhite, fontWeight: 400, marginBottom: '0.5rem' }}>
                      {project.title}
                    </p>
                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.6rem', letterSpacing: '0.1em', color: 'rgba(232,224,208,0.6)', textTransform: 'uppercase' }}>
                      Click to view
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '6rem 0', color: S.mid }}>
              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.5rem', marginBottom: '0.5rem' }}>No projects found</p>
              <p style={{ fontSize: '0.9rem' }}>Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={lightboxIdx}
        styles={{ container: { backgroundColor: 'rgba(26,26,24,0.96)' } }}
      />
    </>
  )
}