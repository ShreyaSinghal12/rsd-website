import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import projects from '../data/projects'

const S = {
  gold: '#C9A96E', ink: '#1A1A18', offwhite: '#F7F4EF',
  stone: '#E8E0D0', sage: '#8A9B8E', mid: '#6B6860',
}

const categoryInfo = {
  residential: {
    title: 'Residential',
    subtitle: 'Spaces You Come Home To',
    banner: 'http://raameshsinghaldesign.com/wp-content/uploads/2023/04/The-Unruffled.jpg',
  },
  hospitality: {
    title: 'Hotels & Hospitality',
    subtitle: 'Experiences Worth Returning To',
    banner: 'http://raameshsinghaldesign.com/wp-content/uploads/2023/04/Swanky-Suite-1.jpg',
  },
  commercial: {
    title: 'Builders & Developers',
    subtitle: 'Projects That Sell Themselves',
    banner: 'http://raameshsinghaldesign.com/wp-content/uploads/2023/04/Stunning-Structures-1.jpg',
  },
}

function FadeIn({ children, delay = 0 }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(28px)', transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      {children}
    </div>
  )
}

export default function CategoryPage({ category }) {
  const [selectedProject, setSelectedProject] = useState(null)
  const info = categoryInfo[category]
  const items = projects.filter(p => p.category === category)

  return (
    <>
      {/* MCB Banner */}
      <section style={{ height: '60vh', position: 'relative', overflow: 'hidden', paddingTop: 68 }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${info.banner})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,26,24,0.85) 0%, rgba(26,26,24,0.4) 60%, rgba(26,26,24,0.2) 100%)' }}/>
        </div>
        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 2.5rem 3rem' }}>
          <Link to="/" style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.7rem', letterSpacing: '0.14em', color: S.gold, textDecoration: 'none', marginBottom: '1rem' }}>
            ← Back to Home
          </Link>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: S.gold, marginBottom: '1rem' }}>
            {info.subtitle}
          </p>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 400, color: S.offwhite, lineHeight: 1.1 }}>
            {info.title}
          </h1>
        </div>
      </section>

      {/* Project Grid */}
      <section style={{ padding: '5rem 0', background: S.offwhite }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 2rem' }}>
          <FadeIn>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: S.mid, marginBottom: '2.5rem' }}>
              {items.length} Projects
            </p>
          </FadeIn>
          <div className="portfolio-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5px' }}>
            {items.map((p, i) => (
              <FadeIn key={p.id} delay={(i % 9) * 60}>
                <div
                  onClick={() => setSelectedProject(p)}
                  style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/3', background: '#d0c8b8', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.querySelector('img').style.transform='scale(1.06)'; e.currentTarget.querySelector('.ov').style.opacity='1' }}
                  onMouseLeave={e => { e.currentTarget.querySelector('img').style.transform='scale(1)'; e.currentTarget.querySelector('.ov').style.opacity='0' }}>
                  <img src={p.img} alt={p.title} loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s ease', display:'block' }}/>
                  <div className="ov" style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(26,26,24,0.8) 0%,transparent 55%)', opacity:0, transition:'opacity 0.3s', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'1.5rem' }}>
                    <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'1rem', color:S.offwhite }}>{p.title}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedProject && (
        <div onClick={() => setSelectedProject(null)} style={{ position:'fixed', inset:0, zIndex:200, background:'rgba(26,26,24,0.92)', display:'flex', alignItems:'center', justifyContent:'center', padding:'1.5rem', backdropFilter:'blur(6px)' }}>
          <div onClick={e => e.stopPropagation()} className="project-modal-grid" style={{ background:'#fff', maxWidth:900, width:'100%', maxHeight:'90vh', overflow:'auto', display:'grid', gridTemplateColumns:'1.2fr 1fr', position:'relative' }}>
            <button onClick={() => setSelectedProject(null)} style={{ position:'absolute', top:'1rem', right:'1rem', width:36, height:36, background:'rgba(26,26,24,0.7)', border:'none', cursor:'pointer', color:'#fff', fontSize:'1.1rem', display:'flex', alignItems:'center', justifyContent:'center', zIndex:10 }}>&#10005;</button>
            <div style={{ position:'relative', minHeight:320 }}>
              <img src={selectedProject.img} alt={selectedProject.title} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
            </div>
            <div style={{ padding:'3rem 2.5rem', display:'flex', flexDirection:'column', justifyContent:'center' }}>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.4rem,3vw,2rem)', fontWeight:400, color:S.ink, lineHeight:1.2, marginBottom:'1.5rem' }}>{selectedProject.title}</h2>
              <div style={{ width:40, height:1, background:S.gold, marginBottom:'1.5rem' }}/>
              <p style={{ fontSize:'0.92rem', color:S.mid, lineHeight:1.85 }}>{selectedProject.desc}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}