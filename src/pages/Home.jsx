import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import projects from '../data/projects'
import testimonials from '../data/testimonials'

/* ── DESIGN TOKENS (PDF dark theme) ── */
const S = {
  gold: '#C9A96E',
  ink: '#141412',
  panel: '#1B1A17',
  card: '#211F1B',
  cream: '#F2EEE6',
  stone: '#E8E0D0',
  mid: '#A39F94',
  line: 'rgba(201,169,110,0.22)',
}

const LABEL_STYLE = { fontFamily: "'DM Mono',monospace", fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: S.gold, marginBottom: '1rem' }
const H2_STYLE = { fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 600, color: S.cream, lineHeight: 1.2 }

/* ── DATA ── */
const focusCards = [
  { num: '01', key: 'residential', label: 'Residential', headline: 'You can afford anything. So why does the result so rarely feel like it?', sub: "The difference was never the budget. It's who holds every decision.", img: 'https://raameshsinghaldesign.com/wp-content/uploads/2023/04/The-Unruffled.jpg', route: '/projects/residential' },
  { num: '02', key: 'commercial', label: 'Builders & Developers', headline: 'Why does the identical project next door keep selling faster than yours?', sub: "The difference buyers can't name is the difference we design.", img: '/images/slides/2ndSlide.jpeg', route: '/projects/builders' },
  { num: '03', key: 'hospitality', label: 'Hotels & Hospitality', headline: 'How many vendors are you managing just to open a single hotel?', sub: 'With us, the answer is one.', img: '/images/slides/3rdSLide.jpeg', route: '/projects/hospitality' },
]

const services = [
  { num: '01', title: 'Architecture', headline: 'The Drawings That Decide Everything Built After Them', desc: 'Ground-up architectural design that sets the bones of the project — form, structure, flow and light. We design from the inside out, so the architecture serves how the space will actually be lived in or operated, not just how it looks on an elevation. Structure, services and aesthetics are resolved together before a single wall is committed.' },
  { num: '02', title: 'Interior Design', headline: 'The Interiors That Hold Their Value Long After Trends Expire', desc: 'End-to-end interior design across residential, hospitality and commercial spaces. We move from concept and material intelligence to full detailing — specifying every finish, fixture and bespoke element with longevity in mind. Craftsmanship is briefed and supervised, not left to chance.' },
  { num: '03', title: 'Turnkey Projects', headline: 'The Single Point of Accountability the Whole Industry Is Moving Toward', desc: 'One partner for the entire journey, concept to completion, design through execution and delivery. Design, planning, procurement, quality control and on-site project management run as one integrated system under our control. You make decisions. We absorb the coordination, the vendors and the risk.' },
]

const areaList = [
  'High-End Bungalows',
  'Hospitality Architecture & Interior Design',
  'Office Building & Interior Design',
  'Casual Dining Concepts',
  'Restaurant Interior Design',
  'Retail Store Interior Design',
]

const awardsAndCerts = [
  { type: 'Award', title: 'The Keystone Architecture & Design Award', org: 'World Architecture & Design Forum — 2017', desc: "An international honor recognizing sustained excellence in architecture and design. Awarded to RSD nearly two decades into practice, it stands as outside confirmation of what the firm's clients had long experienced.", img: '/images/awardsAndCertificates/Award1.jpeg' },
  { type: 'Award', title: 'The Horizon Luxury Living Award', org: 'International Council for Lifestyle Development — 2019', desc: 'Recognition for spaces designed around how people actually live in them. The Horizon honors work where luxury is measured not in finishes alone, but in the ease and comfort of the life a home makes possible.', img: '/images/awardsAndCertificates/Award2.jpeg' },
  { type: 'Award', title: 'The Pillar, Project Execution Excellence', org: 'Global Project Delivery Institute — 2021', desc: 'An honor for execution discipline at scale. Timelines held, quality controlled, handovers met. Recognition of the project management systems RSD brings to every build, from private residences to large developments.', img: '/images/awardsAndCertificates/Award3.jpeg' },
  { type: 'Certificate', title: 'Invited Speaker, India Interior Retailing Conclave', org: 'East & North-East India, Kolkata — 2026', desc: 'Invited to speak at the India Interior Retailing Conclave, sharing insights on design practice and execution with industry peers across East and North-East India.', img: '/images/awardsAndCertificates/certificate1.jpeg' },
  { type: 'Certificate', title: 'Contribution to NatzuraWoods Veneer Collection', org: 'Century Plyboards, AID Conclave 2.0 — 2025', desc: 'Recognized by Century Plyboards for contribution to the NatzuraWoods veneer collection at AID Conclave 2.0.', img: '/images/awardsAndCertificates/certificate2.jpeg' },
  { type: 'Certificate', title: 'Long Standing Partnership Award', org: 'Sonear Veneers — 2018', desc: 'Recognized by Sonear Veneers with the Long Standing Partnership Award for sustained collaboration.', img: '/images/awardsAndCertificates/certificate3.jpeg' },
  { type: 'Certificate', title: 'MahaVastu Certification', org: 'MahaVastu — 2021', desc: 'Certified in MahaVastu, integrating Vastu principles directly into spatial planning and design.', img: '/images/awardsAndCertificates/certificate4.jpeg' },
  { type: 'Certificate', title: 'MahaVastu Expert Certification', org: 'MahaVastu — 2020–21', desc: 'Certified MahaVastu Expert, with completed advanced coursework in Astro-MahaVastu remedies.', img: '/images/awardsAndCertificates/certificate5.jpeg' },
  { type: 'Certificate', title: 'Certificate 6', org: 'Details to be added', desc: 'Description to be added.', img: '/images/awardsAndCertificates/certificate6.jpeg' },
  { type: 'Certificate', title: 'Certificate 7', org: 'Details to be added', desc: 'Description to be added.', img: '/images/awardsAndCertificates/certificate7.jpeg' },
  { type: 'Certificate', title: 'Certificate 8', org: 'Details to be added', desc: 'Description to be added.', img: '/images/awardsAndCertificates/certificate8.jpeg' },
]

const videoTestimonials = [
  { name: 'Client Name', role: 'Residential Client', video: '/videos/Testimonials/Testimonial1.mp4' },
  { name: 'Client Name', role: 'Hospitality Client', video: '/videos/Testimonials/Testimonial2.mp4' },
]

const contactInfo = [
  { label: 'Address', value: 'Time Square, 3rd Floor, Opp Ravi Auto, Sevoke Road, Siliguri', href: null },
  { label: 'Phone', value: '+91 98008 48155', href: 'tel:+919800848155' },
  { label: 'Phone', value: '+91 82508 41773', href: 'tel:+918250841773' },
  { label: 'Email', value: 'rameshsinghaldesign@gmail.com', href: 'mailto:rameshsinghaldesign@gmail.com' },
  { label: 'Hours', value: 'Mon-Fri: 9:00-22:00  |  Saturday: 11:00-20:00', href: null },
]

/* ── HELPERS ── */
function FadeIn({ children, delay = 0 }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(28px)', transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      {children}
    </div>
  )
}

function BigNum({ children, style }) {
  return (
    <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, color: 'transparent', WebkitTextStroke: '1px rgba(201,169,110,0.25)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none', ...style }}>{children}</span>
  )
}

function useCounter(target, inView) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = Math.ceil(target / (1800 / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])
  return count
}

const goldBtn = { fontFamily: "'DM Mono',monospace", fontSize: '0.73rem', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '0.9rem 2.1rem', background: S.gold, color: S.ink, border: 'none', fontWeight: 500, cursor: 'pointer', transition: 'background 0.3s' }
const lineBtn = { fontFamily: "'DM Mono',monospace", fontSize: '0.73rem', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '0.9rem 2.1rem', background: 'transparent', color: S.cream, border: '1px solid rgba(242,238,230,0.4)', cursor: 'pointer', transition: 'all 0.3s' }

export default function Home() {
  const [tIndex, setTIndex] = useState(0)
  const [filter, setFilter] = useState('all')
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', email: '', service: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [focused, setFocused] = useState({})
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedService, setSelectedService] = useState(null)
  const [selectedPress, setSelectedPress] = useState(null)
  const [playingVideo, setPlayingVideo] = useState(null)

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))
  const focusField = (k) => setFocused(f => ({ ...f, [k]: true }))
  const blurField = (k) => setFocused(f => ({ ...f, [k]: false }))

  const inputStyle = (isFocused) => ({ width: '100%', padding: '0.85rem 1rem', border: `1px solid ${isFocused ? S.gold : 'rgba(242,238,230,0.15)'}`, background: S.ink, fontFamily: "'DM Sans',sans-serif", fontSize: '0.92rem', color: S.cream, outline: 'none', transition: 'border-color 0.25s', borderRadius: 0 })

  useEffect(() => {
    const t = setInterval(() => setTIndex(i => (i + 1) % testimonials.length), 6000)
    return () => clearInterval(t)
  }, [])

  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.3 })
  const years = useCounter(30, statsInView)
  const projs = useCounter(500, statsInView)
  const repeat = useCounter(90, statsInView)
  const types = useCounter(6, statsInView)

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter)

  const scrollToId = (id) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth' }) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.firstName || !form.phone || !form.email || !form.message) { alert('Please fill in all required fields.'); return }
    setStatus('sending')
    await new Promise(r => setTimeout(r, 1200))
    setStatus('sent')
  }

  return (
    <>
      {/* ── HERO ── */}
      <section id="hero" style={{ background: S.ink, position: 'relative', overflow: 'hidden', paddingTop: 68 }}>
        <BigNum style={{ position: 'absolute', top: '8rem', right: '-2rem', fontSize: 'clamp(8rem,20vw,18rem)', opacity: 0.5 }}>1995</BigNum>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '4rem 2rem 5rem', position: 'relative' }}>
          <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <FadeIn>
              <p style={{ ...LABEL_STYLE, display: 'flex', alignItems: 'center', gap: '0.9rem' }}><span style={{ width: 32, height: 1, background: S.gold, display: 'inline-block' }} />Est. 1995 · Siliguri, India</p>
              <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.9rem,3.6vw,3rem)', fontWeight: 500, lineHeight: 1.22, color: S.cream, marginBottom: '1.4rem', maxWidth: 620 }}>
                You're not building a space. <em style={{ fontStyle: 'italic', color: S.gold }}>You're building what people will say about you for the next thirty years.</em>
              </h1>
              <p style={{ fontSize: 'clamp(0.9rem,1.8vw,1rem)', color: S.mid, maxWidth: 520, marginBottom: '2.2rem', lineHeight: 1.8 }}>
                A single studio, holding the vision from first sketch to final handover, so your legacy is left to no one's chance but ours.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button onClick={() => scrollToId('contact')} style={goldBtn} onMouseEnter={e => e.currentTarget.style.background = '#b8923d'} onMouseLeave={e => e.currentTarget.style.background = S.gold}>Begin Your Journey With Us →</button>
                <button onClick={() => scrollToId('portfolio')} style={lineBtn} onMouseEnter={e => { e.currentTarget.style.borderColor = S.gold; e.currentTarget.style.color = S.gold }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(242,238,230,0.4)'; e.currentTarget.style.color = S.cream }}>Explore Our Work</button>
              </div>
            </FadeIn>
            <FadeIn delay={150}>
              <div style={{ position: 'relative', maxWidth: 440, margin: '0 auto' }}>
                <div style={{ position: 'absolute', top: '1.4rem', left: '1.4rem', width: '100%', height: '100%', border: `1px solid ${S.line}`, borderRadius: '999px 999px 0 0', zIndex: 0 }} />
                <div style={{ position: 'relative', borderRadius: '999px 999px 0 0', overflow: 'hidden', aspectRatio: '3.2/4', zIndex: 1, background: S.panel }}>
                  <img src="https://raameshsinghaldesign.com/wp-content/uploads/2023/01/v7_11zon.jpg" alt="Raamesh Singhal Design" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,20,18,0.55) 0%, transparent 45%)' }} />
                  <div style={{ position: 'absolute', bottom: '1.4rem', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', fontFamily: "'DM Mono',monospace", fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: S.gold, background: 'rgba(20,20,18,0.75)', padding: '0.55rem 1.1rem', border: `1px solid ${S.line}` }}>30+ Years of Legacy</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section ref={statsRef} style={{ background: S.panel, borderTop: `1px solid ${S.line}`, borderBottom: `1px solid ${S.line}`, padding: '3rem 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '2rem', textAlign: 'center' }}>
            {[{ num: years, suffix: '+', label: 'Years of Experience' }, { num: projs, suffix: '+', label: 'Projects Delivered' }, { num: repeat, suffix: '%', label: 'Repeat & Referral' }, { num: types, suffix: '', label: 'Project Typologies' }].map((s, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div style={{ position: 'relative', padding: '0.5rem 0', borderRight: i < 3 ? `1px solid ${S.line}` : 'none' }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2rem,4vw,3rem)', color: S.gold, lineHeight: 1, marginBottom: '0.5rem' }}>{s.num}{s.suffix}</div>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: S.mid }}>{s.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR FOCUS ── */}
      <section style={{ background: S.ink, padding: '5rem 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <FadeIn>
            <p style={LABEL_STYLE}>Our Focus</p>
            <h2 style={{ ...H2_STYLE, marginBottom: '3rem' }}>What are you <em style={{ color: S.gold }}>building?</em></h2>
          </FadeIn>
          <div className="process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.8rem' }}>
            {focusCards.map((cat, i) => (
              <FadeIn key={cat.key} delay={i * 100}>
                <Link to={cat.route} style={{ display: 'block', textDecoration: 'none' }} onMouseEnter={e => { const img = e.currentTarget.querySelector('img'); if (img) img.style.transform = 'scale(1.06)' }} onMouseLeave={e => { const img = e.currentTarget.querySelector('img'); if (img) img.style.transform = 'scale(1)' }}>
                  <div style={{ position: 'relative', borderRadius: '999px 999px 0 0', overflow: 'hidden', aspectRatio: '3/3.6', background: S.panel, marginBottom: '1.4rem' }}>
                    <img src={cat.img} alt={cat.label} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', display: 'block' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,20,18,0.75) 0%, transparent 55%)' }} />
                  </div>
                  <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: S.gold, marginBottom: '0.6rem' }}>{cat.num} — {cat.label}</p>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.15rem', color: S.cream, lineHeight: 1.4, marginBottom: '0.6rem', fontWeight: 500 }}>{cat.headline}</h3>
                  <p style={{ fontSize: '0.85rem', color: S.mid, lineHeight: 1.7, marginBottom: '0.9rem' }}>{cat.sub}</p>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: S.gold }}>Explore →</span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ background: S.ink }}>

        {/* Who We Are */}
        <div style={{ background: S.panel, borderTop: `1px solid ${S.line}`, padding: '5rem 2rem', position: 'relative', overflow: 'hidden' }}>
          <BigNum style={{ position: 'absolute', bottom: '-2rem', left: '-1rem', fontSize: 'clamp(7rem,16vw,14rem)', opacity: 0.5 }}>30</BigNum>
          <div className="about-grid" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '4.5rem', alignItems: 'center', position: 'relative' }}>
            <FadeIn>
              <div style={{ position: 'relative', maxWidth: 460, margin: '0 auto' }}>
                <div style={{ position: 'absolute', top: '1.4rem', left: '1.4rem', width: '100%', height: '100%', border: `1px solid ${S.line}`, borderRadius: '999px 999px 0 0', zIndex: 0 }} />
                <div style={{ position: 'relative', borderRadius: '999px 999px 0 0', overflow: 'hidden', aspectRatio: '3.2/4', zIndex: 1, background: S.card }}>
                  <video muted autoPlay loop playsInline preload="auto" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
                    <source src="/videos/hero.mp4" type="video/mp4" />
                  </video>
                  <div style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', zIndex: 3, pointerEvents: 'none' }}>
                    <img src="https://raameshsinghaldesign.com/wp-content/uploads/2023/01/cropped-rsd-logo-1.png" alt="RSD" style={{ height: 30, width: 'auto', display: 'block', filter: 'brightness(100) drop-shadow(0 1px 4px rgba(0,0,0,0.7))', opacity: 0.95 }} />
                  </div>
                  <div style={{ position: 'absolute', bottom: '1.4rem', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', fontFamily: "'DM Mono',monospace", fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: S.gold, background: 'rgba(20,20,18,0.75)', padding: '0.55rem 1.1rem', border: `1px solid ${S.line}` }}>30+ Years</div>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={150}>
              <p style={LABEL_STYLE}>Who We Are</p>
              <h2 style={{ ...H2_STYLE, marginBottom: '0.8rem' }}>One studio. One standard.<br /><em style={{ color: S.gold }}>One name on every decision.</em></h2>
              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', letterSpacing: '0.1em', color: S.gold, marginBottom: '1.5rem', textTransform: 'uppercase' }}>About Raamesh Singhal Design</p>
              <p style={{ fontSize: '0.92rem', color: S.mid, lineHeight: 1.85, marginBottom: '1rem' }}>Since 1995, Raamesh Singhal Design has been creating spaces where design, functionality, and human experience come together. Founded on the belief that exceptional spaces require a complete vision — not disconnected solutions — we bring architecture, interiors, planning, procurement, and execution together under one roof.</p>
              <p style={{ fontSize: '0.92rem', color: S.mid, lineHeight: 1.85, marginBottom: '1rem' }}>From our studio in Siliguri, we have designed and delivered luxury residences, hospitality spaces, and large-scale developments across Siliguri, Sikkim, Nepal, Bhutan, and Assam — creating spaces that are thoughtfully planned, carefully executed, and built to last.</p>
              <p style={{ fontSize: '0.92rem', color: S.mid, lineHeight: 1.85 }}>Every project we undertake carries one commitment: a single vision, a single standard, and complete ownership from concept to completion.</p>
              <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                <div><div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.8rem', color: S.gold }}>500+</div><div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: S.mid }}>Projects Delivered</div></div>
                <div style={{ width: 1, background: S.line }} />
                <div><div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.8rem', color: S.gold }}>5</div><div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: S.mid }}>States & Countries</div></div>
                <div style={{ width: 1, background: S.line }} />
                <div><div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.8rem', color: S.gold }}>1995</div><div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: S.mid }}>Established</div></div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* What We Do / Services */}
        <div id="services" style={{ background: S.ink, padding: '5rem 2rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <FadeIn>
              <p style={LABEL_STYLE}>What We Do</p>
              <h2 style={{ ...H2_STYLE, marginBottom: '1.2rem' }}>Three disciplines.<br /><em style={{ color: S.gold }}>One continuous decision.</em></h2>
              <p style={{ fontSize: '0.92rem', color: S.mid, lineHeight: 1.85, maxWidth: 680, marginBottom: '3rem' }}>Architecture, interior design and full turnkey execution, held under one accountable team. The vision and the delivery never separate, so nothing falls through the gaps between firms.</p>
            </FadeIn>
            <div className="process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
              {services.map((svc, i) => (
                <FadeIn key={i} delay={i * 100}>
                  <div onClick={() => setSelectedService(svc)} style={{ position: 'relative', padding: '2.5rem 2rem', background: S.card, border: `1px solid ${S.line}`, cursor: 'pointer', height: '100%', overflow: 'hidden', transition: 'border-color 0.3s, transform 0.3s' }} onMouseEnter={e => { e.currentTarget.style.borderColor = S.gold; e.currentTarget.style.transform = 'translateY(-4px)' }} onMouseLeave={e => { e.currentTarget.style.borderColor = S.line; e.currentTarget.style.transform = 'translateY(0)' }}>
                    <BigNum style={{ position: 'absolute', top: '-1rem', right: '0.5rem', fontSize: '6.5rem' }}>{svc.num}</BigNum>
                    <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.62rem', letterSpacing: '0.16em', color: S.gold, marginBottom: '0.8rem', textTransform: 'uppercase' }}>{svc.num}</p>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.35rem', color: S.cream, marginBottom: '0.8rem', fontWeight: 600 }}>{svc.title}</h3>
                    <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '0.95rem', fontStyle: 'italic', color: S.gold, marginBottom: '1.2rem', lineHeight: 1.5 }}>{svc.headline}</p>
                    <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: S.gold }}>Learn More →</p>
                  </div>
                </FadeIn>
              ))}
            </div>
            <div style={{ marginTop: '3rem' }}>
              <FadeIn>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.4rem', fontWeight: 500, color: S.cream, marginBottom: '1.5rem' }}>Areas of <em style={{ color: S.gold }}>Service</em></h3>
              </FadeIn>
              <div className="areas-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }}>
                {areaList.map((area, i) => (
                  <FadeIn key={i} delay={i * 60}>
                    <div style={{ padding: '1rem 1.4rem', border: `1px solid ${S.line}`, background: S.panel, display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.88rem', color: S.cream, transition: 'border-color 0.3s' }} onMouseEnter={e => e.currentTarget.style.borderColor = S.gold} onMouseLeave={e => e.currentTarget.style.borderColor = S.line}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: S.gold, flexShrink: 0 }} />
                      {area}
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Our Process */}
        <div style={{ background: S.panel, borderTop: `1px solid ${S.line}`, padding: '5rem 2rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <FadeIn>
              <p style={LABEL_STYLE}>Our Process</p>
              <h2 style={{ ...H2_STYLE, marginBottom: '1.2rem' }}>From a conversation to something<br /><em style={{ color: S.gold }}>worth inheriting.</em></h2>
              <p style={{ fontSize: '0.92rem', color: S.mid, lineHeight: 1.85, maxWidth: 600, marginBottom: '3rem' }}>Our process exists to remove the one thing that ruins great projects: the gap between people. Everything sits with us, so nothing falls between.</p>
            </FadeIn>
            <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.5rem' }}>
              {[{ num: '01', title: 'Understand', desc: "We begin with how you'll live, host, or operate — not with a mood board. The brief is built around outcomes, not finishes." }, { num: '02', title: 'Compose', desc: "Architecture and interiors are designed as one decision, fully documented, so what's drawn is exactly what gets built." }, { num: '03', title: 'Deliver', desc: 'We control procurement, manage the site, and check quality at every stage. One schedule, one accountable team.' }, { num: '04', title: 'Hand Over', desc: 'You receive a finished space, on time, exactly as promised — and a single name to call if you ever need us again.' }].map((item, i) => (
                <FadeIn key={i} delay={i * 80}>
                  <div style={{ position: 'relative', paddingTop: '3.6rem' }}>
                    <BigNum style={{ position: 'absolute', top: 0, left: 0, fontSize: '4.6rem' }}>{item.num}</BigNum>
                    <div style={{ width: 32, height: 1, background: S.gold, marginBottom: '1rem' }} />
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.15rem', color: S.cream, marginBottom: '0.6rem', fontWeight: 600 }}>{item.title}</h3>
                    <p style={{ fontSize: '0.85rem', color: S.mid, lineHeight: 1.8 }}>{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div style={{ background: S.ink, padding: '5rem 2rem' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <FadeIn>
              <p style={LABEL_STYLE}>Why Choose Us</p>
              <h2 style={{ ...H2_STYLE, marginBottom: '3rem' }}>We'd rather be <em style={{ color: S.gold }}>answerable than impressive.</em></h2>
            </FadeIn>
            <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
              {[{ title: 'One name, accountable for everything', desc: "When the architecture, the interiors, and the build all sit with us, there's no gap to lose your project in, and no third party to blame if something slips. The responsibility is ours, by design." }, { title: 'We build what we draw', desc: 'A beautiful drawing is easy to promise. We hold ourselves to turning it into the actual room exactly as shown, not approximately.' }, { title: 'On time is part of the work', desc: 'Our systems, procurement control, and stage-by-stage checks exist so we can be held to a date — not so we can explain why we missed one.' }, { title: "If it doesn't last, we hear about it", desc: "Thirty years of clients means three decades of living with our own decisions. That's why we design for the decade, not the season." }].map((item, i) => (
                <FadeIn key={i} delay={i * 80}>
                  <div style={{ padding: '2rem', border: `1px solid ${S.line}`, background: S.card, transition: 'border-color 0.3s' }} onMouseEnter={e => e.currentTarget.style.borderColor = S.gold} onMouseLeave={e => e.currentTarget.style.borderColor = S.line}>
                    <div style={{ width: 32, height: 1, background: S.gold, marginBottom: '1rem' }} />
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.1rem', color: S.cream, marginBottom: '0.8rem', fontWeight: 600 }}>{item.title}</h3>
                    <p style={{ fontSize: '0.88rem', color: S.mid, lineHeight: 1.85 }}>{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
            <FadeIn>
              <div style={{ textAlign: 'center', padding: '3rem 2rem', border: `1px solid ${S.line}`, background: S.panel }}>
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.1rem,2.5vw,1.4rem)', fontStyle: 'italic', color: S.cream, lineHeight: 1.7, maxWidth: 620, margin: '0 auto 2rem' }}>"Your project deserves a single, certain answer. Tell us what you're building and we'll tell you how it ends."</p>
                <button onClick={() => scrollToId('contact')} style={goldBtn} onMouseEnter={e => e.currentTarget.style.background = '#b8923d'} onMouseLeave={e => e.currentTarget.style.background = S.gold}>Begin a Project Conversation →</button>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Founders */}
        <div style={{ background: S.panel, borderTop: `1px solid ${S.line}`, padding: '5rem 2rem' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <FadeIn>
              <p style={LABEL_STYLE}>The Founders</p>
              <h2 style={{ ...H2_STYLE, marginBottom: '1.2rem' }}>The thinking behind every<br /><em style={{ color: S.gold }}>space we create.</em></h2>
              <p style={{ fontSize: '0.92rem', color: S.mid, lineHeight: 1.85, maxWidth: 680, marginBottom: '3.5rem' }}>Exceptional spaces are never the result of design alone. They emerge when vision, functionality, human behaviour, and execution work in complete harmony. That belief has guided Raamesh Singhal Design since its inception.</p>
            </FadeIn>
            <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', maxWidth: 900, margin: '0 auto' }}>
              {[{ name: 'Raamesh Singhal', role: 'Founder', quote: 'Design creates possibilities. Execution determines whether those possibilities become reality.', img: 'https://raameshsinghaldesign.com/wp-content/uploads/2023/01/RSD-19-1024x768.jpg' }, { name: 'Sonika Singhal', role: 'Co-Founder', quote: 'The most meaningful spaces are not the ones people admire. They are the ones people never want to leave.', img: 'https://raameshsinghaldesign.com/wp-content/uploads/2023/01/RSD-11-1024x767.jpg' }].map((founder, i) => (
                <FadeIn key={i} delay={i * 150}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ position: 'relative', borderRadius: '999px 999px 0 0', overflow: 'hidden', aspectRatio: '3.2/4', background: S.card, marginBottom: '1.4rem', maxWidth: 340, marginLeft: 'auto', marginRight: 'auto' }}>
                      <img src={founder.img} alt={founder.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,20,18,0.5) 0%, transparent 40%)' }} />
                    </div>
                    <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: S.gold, marginBottom: '0.4rem' }}>{founder.role}</p>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.35rem', color: S.cream, marginBottom: '0.9rem', fontWeight: 500 }}>{founder.name}</h3>
                    <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '0.95rem', fontStyle: 'italic', color: S.mid, lineHeight: 1.75, maxWidth: 320, margin: '0 auto' }}><span style={{ color: S.gold, fontSize: '1.4rem', lineHeight: 0, verticalAlign: '-0.3rem', marginRight: '0.2rem' }}>"</span>{founder.quote}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>

        {/* Book */}
        <div id="book" style={{ background: S.ink, padding: '5rem 2rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <FadeIn>
              <p style={LABEL_STYLE}>The Book</p>
              <h2 style={{ ...H2_STYLE, marginBottom: '3rem' }}>Words Behind <em style={{ color: S.gold }}>the Work</em></h2>
            </FadeIn>
            <div className="book-grid" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '4rem', alignItems: 'center' }}>
              <FadeIn delay={100}>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '1.2rem', left: '-1.2rem', width: '100%', height: '100%', border: `1px solid ${S.line}`, zIndex: 0 }} />
                  <img src="/images/book/book_image.png" alt="Why Luxury Homes Don't Sell by Raamesh Singhal" loading="lazy" style={{ width: '100%', display: 'block', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 25px 40px rgba(0,0,0,0.45))' }} />
                </div>
              </FadeIn>
              <FadeIn delay={150}>
                <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', letterSpacing: '0.14em', color: S.gold, marginBottom: '1.2rem', textTransform: 'uppercase' }}>By Raamesh Singhal</p>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.5rem,3vw,2.1rem)', color: S.cream, marginBottom: '0.6rem', fontWeight: 600, lineHeight: 1.25 }}>Why Luxury Homes Don't Sell:</h3>
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.1rem', fontStyle: 'italic', color: S.gold, marginBottom: '1.6rem' }}>The Blind Spot Costing Developers Crores</p>
                <div style={{ width: 40, height: 1, background: S.gold, marginBottom: '1.6rem' }} />
                <p style={{ fontSize: '0.93rem', color: S.mid, lineHeight: 1.9, marginBottom: '2rem', maxWidth: 520 }}>It's not the market. It's the misunderstanding. Drawing on three decades of building luxury spaces, Raamesh Singhal uncovers the blind spots costing developers crores — and lays out what it actually takes to design projects that sell faster, at better value.</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                  {['Uncover the blind spots in your projects', "Understand what today's premium buyer truly desires", 'Design, position & communicate for maximum desire', 'Create projects that sell faster, at better value'].map((point, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                      <span style={{ color: S.gold, fontSize: '0.9rem', marginTop: '0.05rem' }}>✓</span>
                      <p style={{ fontSize: '0.82rem', color: S.mid, lineHeight: 1.6 }}>{point}</p>
                    </div>
                  ))}
                </div>
                <button onClick={() => scrollToId('contact')} style={goldBtn} onMouseEnter={e => e.currentTarget.style.background = '#b8923d'} onMouseLeave={e => e.currentTarget.style.background = S.gold}>Get in Touch to Order →</button>
              </FadeIn>
            </div>
          </div>
        </div>

        {/* Awards & Certificates */}
        <div id="awards-news" style={{ background: S.panel, borderTop: `1px solid ${S.line}`, padding: '5rem 2rem' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <FadeIn>
              <p style={LABEL_STYLE}>Recognition</p>
              <h2 style={{ ...H2_STYLE, marginBottom: '1.2rem' }}>Awards & <em style={{ color: S.gold }}>Certificates</em></h2>
              <p style={{ fontSize: '0.92rem', color: S.mid, lineHeight: 1.85, maxWidth: 700, marginBottom: '3rem' }}>Our work has been honoured by some of the most respected names in design and industry. But the recognition we value most isn't on a shelf — it's the client who hands us their next project before the first is even finished.</p>
            </FadeIn>
            <div className="press-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
              {awardsAndCerts.map((item, i) => (
                <FadeIn key={i} delay={(i % 6) * 70}>
                  <div onClick={() => setSelectedPress(item)} style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/3', background: S.card, border: `1px solid ${S.line}`, cursor: 'pointer', transition: 'border-color 0.3s' }} onMouseEnter={e => e.currentTarget.style.borderColor = S.gold} onMouseLeave={e => e.currentTarget.style.borderColor = S.line}>
                    <img src={item.img} alt={item.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', background: S.card }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,20,18,0.9) 0%, transparent 55%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.2rem' }}>
                      <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: S.gold, marginBottom: '0.3rem' }}>{item.type}</p>
                      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '0.95rem', color: S.cream, marginBottom: '0.2rem' }}>{item.title}</p>
                      <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.62rem', color: S.mid }}>{item.org}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>

        {/* Blog */}
        <div id="blog" style={{ background: S.ink, padding: '5rem 2rem' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <FadeIn>
              <p style={LABEL_STYLE}>The Blog</p>
              <h2 style={{ ...H2_STYLE, marginBottom: '3rem' }}>Thoughts on <em style={{ color: S.gold }}>Design & Build</em></h2>
            </FadeIn>
            <div className="press-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
              {[1, 2, 3].map(i => (
                <FadeIn key={i} delay={i * 80}>
                  <div style={{ aspectRatio: '4/3', background: S.card, border: `1px dashed ${S.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.6rem' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', border: `1px solid ${S.gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.1rem', color: S.gold, fontStyle: 'italic' }}>B</span>
                    </div>
                    <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: S.gold }}>Blog Post</p>
                    <p style={{ fontSize: '0.82rem', color: S.mid, fontStyle: 'italic' }}>Coming Soon</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" style={{ background: S.panel, borderTop: `1px solid ${S.line}`, padding: '5rem 0' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <FadeIn>
              <p style={LABEL_STYLE}>Our Portfolio</p>
              <h2 style={{ ...H2_STYLE }}>Our Recent <em style={{ color: S.gold }}>Projects</em></h2>
            </FadeIn>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {['all', 'residential', 'commercial', 'architecture', 'hospitality'].map((f, i, arr) => (
                <button key={f} onClick={() => setFilter(f)} style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.55rem 1.1rem', border: `1px solid ${S.line}`, borderRight: i < arr.length - 1 ? 'none' : `1px solid ${S.line}`, cursor: 'pointer', background: filter === f ? S.gold : 'transparent', color: filter === f ? S.ink : S.mid, transition: 'all 0.25s' }}>
                  {f === 'all' ? 'All' : f === 'hospitality' ? 'Hotels & Hospitality' : f === 'commercial' ? 'Builders & Developers' : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="portfolio-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5px' }}>
            {filtered.map((p, i) => (
              <FadeIn key={p.id} delay={(i % 9) * 60}>
                <div onClick={() => setSelectedProject(p)} style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/3', background: S.card, cursor: 'pointer' }} onMouseEnter={e => { e.currentTarget.querySelector('img').style.transform = 'scale(1.06)'; e.currentTarget.querySelector('.ov').style.opacity = '1' }} onMouseLeave={e => { e.currentTarget.querySelector('img').style.transform = 'scale(1)'; e.currentTarget.querySelector('.ov').style.opacity = '0' }}>
                  <img src={p.img} alt={p.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', display: 'block' }} />
                  <div className="ov" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,20,18,0.85) 0%, transparent 55%)', opacity: 0, transition: 'opacity 0.3s', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.5rem' }}>
                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: S.gold, marginBottom: '0.3rem' }}>{p.category}</span>
                    <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '1rem', color: S.cream }}>{p.title}</p>
                  </div>
                  <div style={{ position: 'absolute', bottom: '0.8rem', right: '0.8rem', zIndex: 2, pointerEvents: 'none' }}>
                    <img src="https://raameshsinghaldesign.com/wp-content/uploads/2023/01/cropped-rsd-logo-1.png" alt="RSD" style={{ height: 30, width: 'auto', display: 'block', filter: 'brightness(100) drop-shadow(0 1px 3px rgba(0,0,0,0.6))', opacity: 0.9 }} />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" style={{ background: S.ink, borderTop: `1px solid ${S.line}`, padding: '5rem 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>
          <FadeIn>
            <p style={LABEL_STYLE}>Testimonials</p>
            <h2 style={{ ...H2_STYLE, marginBottom: '3rem' }}>Heard from those who <em style={{ color: S.gold }}>lived</em> our work</h2>
          </FadeIn>

          {/* Video testimonials */}
          <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3.5rem' }}>
            {videoTestimonials.map((v, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: S.card, border: `1px solid ${S.line}`, cursor: playingVideo === i ? 'default' : 'pointer' }} onClick={() => { if (playingVideo !== i) setPlayingVideo(i) }}>
                  <video src={v.video} muted={playingVideo !== i} controls={playingVideo === i} autoPlay={playingVideo === i} playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  {playingVideo !== i && (
                    <>
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,20,18,0.3)', pointerEvents: 'none' }} />
                      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 66, height: 66, borderRadius: '50%', background: 'rgba(242,238,230,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg viewBox="0 0 24 24" width="24" height="24" fill={S.ink}><path d="M8 5v14l11-7z" /></svg>
                      </div>
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.2rem', background: 'linear-gradient(to top, rgba(20,20,18,0.9), transparent)', pointerEvents: 'none' }}>
                        <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '1rem', color: S.cream }}>{v.name}</p>
                        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: S.gold, marginTop: '0.2rem' }}>{v.role}</p>
                      </div>
                    </>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Text testimonial carousel */}
          <div className="testimonial-wrapper" style={{ position: 'relative', padding: '0 2.5rem', maxWidth: 860, margin: '0 auto' }}>
            <button className="t-arrow-left" onClick={() => setTIndex(i => (i - 1 + testimonials.length) % testimonials.length)} style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '2.5rem', color: 'rgba(242,238,230,0.4)', transition: 'color 0.25s', lineHeight: 1, padding: 0, zIndex: 2 }} onMouseEnter={e => e.currentTarget.style.color = S.gold} onMouseLeave={e => e.currentTarget.style.color = 'rgba(242,238,230,0.4)'}>&#8249;</button>
            <div className="t-card" style={{ background: S.card, padding: '2.5rem', borderLeft: `2px solid ${S.gold}`, border: `1px solid ${S.line}`, borderLeftColor: S.gold, borderLeftWidth: 2 }}>
              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(0.95rem,2vw,1.1rem)', fontStyle: 'italic', color: S.cream, lineHeight: 1.8, marginBottom: '1.5rem', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <span style={{ fontSize: '2rem', color: S.gold, lineHeight: 0, verticalAlign: '-0.4rem', marginRight: '0.2rem' }}>"</span>
                {testimonials[tIndex].text}
              </p>
              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: S.gold }}>— {testimonials[tIndex].name}</p>
            </div>
            <button className="t-arrow-right" onClick={() => setTIndex(i => (i + 1) % testimonials.length)} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '2.5rem', color: 'rgba(242,238,230,0.4)', transition: 'color 0.25s', lineHeight: 1, padding: 0, zIndex: 2 }} onMouseEnter={e => e.currentTarget.style.color = S.gold} onMouseLeave={e => e.currentTarget.style.color = 'rgba(242,238,230,0.4)'}>&#8250;</button>
          </div>
          <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.5rem', justifyContent: 'center' }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setTIndex(i)} style={{ width: 8, height: 8, borderRadius: '50%', border: 'none', cursor: 'pointer', padding: 0, background: tIndex === i ? S.gold : 'rgba(201,169,110,0.25)', transform: tIndex === i ? 'scale(1.3)' : 'scale(1)', transition: 'all 0.3s' }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ background: S.panel, borderTop: `1px solid ${S.line}`, padding: '5rem 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '4.5rem', alignItems: 'start' }}>
            <div>
              <FadeIn>
                <p style={LABEL_STYLE}>Get In Touch</p>
                <h2 style={{ ...H2_STYLE, marginBottom: '2.5rem' }}>Feel free to<br /><em style={{ color: S.gold }}>contact us</em> anytime</h2>
              </FadeIn>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
                {contactInfo.map((item, i) => (
                  <FadeIn key={i} delay={i * 80}>
                    <div>
                      <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: S.gold, marginBottom: '0.3rem' }}>{item.label}</p>
                      {item.href ? <a href={item.href} style={{ fontSize: '0.92rem', color: S.cream, textDecoration: 'none', transition: 'color 0.25s' }} onMouseEnter={e => e.currentTarget.style.color = S.gold} onMouseLeave={e => e.currentTarget.style.color = S.cream}>{item.value}</a> : <p style={{ fontSize: '0.92rem', color: S.mid }}>{item.value}</p>}
                    </div>
                  </FadeIn>
                ))}
              </div>
              <FadeIn delay={200}>
                <div style={{ width: '100%', height: 260, overflow: 'hidden', border: `1px solid ${S.line}`, filter: 'grayscale(0.4) contrast(0.95)' }}>
                  <iframe src="https://maps.google.com/maps?q=Time+Square+Sevoke+Road+Siliguri&t=m&z=15&output=embed&iwloc=near" title="Location" width="100%" height="100%" style={{ border: 'none', display: 'block' }} loading="lazy" />
                </div>
              </FadeIn>
            </div>
            <FadeIn delay={150}>
              <div style={{ background: S.card, border: `1px solid ${S.line}`, padding: '3rem' }}>
                <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: S.gold, marginBottom: '0.6rem' }}>Send a Message</p>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.6rem', fontWeight: 500, color: S.cream, marginBottom: '2rem' }}>Start Your Project</h3>
                {status === 'sent' ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '2rem', color: S.gold, marginBottom: '1rem' }}>Thank you</div>
                    <p style={{ fontSize: '0.95rem', color: S.mid, lineHeight: 1.7 }}>Your message has been received. We will get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div style={{ marginBottom: '1.2rem' }}>
                        <label style={{ display: 'block', fontFamily: "'DM Mono',monospace", fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: S.mid, marginBottom: '0.5rem' }}>First Name <span style={{ color: S.gold }}>*</span></label>
                        <input value={form.firstName} onChange={set('firstName')} onFocus={() => focusField('firstName')} onBlur={() => blurField('firstName')} placeholder="Raamesh" style={inputStyle(focused.firstName)} />
                      </div>
                      <div style={{ marginBottom: '1.2rem' }}>
                        <label style={{ display: 'block', fontFamily: "'DM Mono',monospace", fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: S.mid, marginBottom: '0.5rem' }}>Last Name</label>
                        <input value={form.lastName} onChange={set('lastName')} onFocus={() => focusField('lastName')} onBlur={() => blurField('lastName')} placeholder="Singhal" style={inputStyle(focused.lastName)} />
                      </div>
                    </div>
                    <div style={{ marginBottom: '1.2rem' }}>
                      <label style={{ display: 'block', fontFamily: "'DM Mono',monospace", fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: S.mid, marginBottom: '0.5rem' }}>Phone <span style={{ color: S.gold }}>*</span></label>
                      <input type="tel" value={form.phone} onChange={set('phone')} onFocus={() => focusField('phone')} onBlur={() => blurField('phone')} placeholder="+91 98765 43210" style={inputStyle(focused.phone)} />
                    </div>
                    <div style={{ marginBottom: '1.2rem' }}>
                      <label style={{ display: 'block', fontFamily: "'DM Mono',monospace", fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: S.mid, marginBottom: '0.5rem' }}>Email <span style={{ color: S.gold }}>*</span></label>
                      <input type="email" value={form.email} onChange={set('email')} onFocus={() => focusField('email')} onBlur={() => blurField('email')} placeholder="your@email.com" style={inputStyle(focused.email)} />
                    </div>
                    <div style={{ marginBottom: '1.2rem' }}>
                      <label style={{ display: 'block', fontFamily: "'DM Mono',monospace", fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: S.mid, marginBottom: '0.5rem' }}>Service Required</label>
                      <select value={form.service} onChange={set('service')} onFocus={() => focusField('service')} onBlur={() => blurField('service')} style={{ ...inputStyle(focused.service), appearance: 'none', cursor: 'pointer' }}>
                        <option value="">Select a service...</option>
                        {['Residential Interior Design', 'Architecture', 'Hospitality Design', 'Commercial / Retail', 'Vedic Vastu Consultation', 'Other'].map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                    <div style={{ marginBottom: '1.2rem' }}>
                      <label style={{ display: 'block', fontFamily: "'DM Mono',monospace", fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: S.mid, marginBottom: '0.5rem' }}>Message <span style={{ color: S.gold }}>*</span></label>
                      <textarea rows={5} value={form.message} onChange={set('message')} onFocus={() => focusField('message')} onBlur={() => blurField('message')} placeholder="Tell us about your project..." style={{ ...inputStyle(focused.message), resize: 'vertical' }} />
                    </div>
                    <button type="submit" disabled={status === 'sending'} style={{ width: '100%', padding: '1rem', background: status === 'sending' ? S.mid : S.gold, color: S.ink, border: 'none', cursor: status === 'sending' ? 'not-allowed' : 'pointer', fontFamily: "'DM Mono',monospace", fontSize: '0.75rem', letterSpacing: '0.16em', textTransform: 'uppercase', transition: 'background 0.3s' }} onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.background = '#b8923d' }} onMouseLeave={e => { if (status !== 'sending') e.currentTarget.style.background = S.gold }}>
                      {status === 'sending' ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── BOOK APPOINTMENT CTA ── */}
      <section style={{ background: S.gold, padding: '4rem 0', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 2rem' }}>
          <FadeIn>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.6rem,3.5vw,2.4rem)', fontWeight: 500, color: S.ink, marginBottom: '1.4rem', lineHeight: 1.25 }}>Book Your Appointment for Quality &amp; Reliable Services</h2>
            <p style={{ fontSize: '0.95rem', color: 'rgba(20,20,18,0.72)', marginBottom: '2rem', lineHeight: 1.7 }}>Let us help you create the home of your dreams.</p>
            <a href="#contact" onClick={e => { e.preventDefault(); scrollToId('contact') }} style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '1rem 2.8rem', background: S.ink, color: S.gold, textDecoration: 'none', display: 'inline-block', transition: 'all 0.3s', cursor: 'pointer' }} onMouseEnter={e => { e.currentTarget.style.background = S.cream; e.currentTarget.style.color = S.ink }} onMouseLeave={e => { e.currentTarget.style.background = S.ink; e.currentTarget.style.color = S.gold }}>Book Appointment</a>
          </FadeIn>
        </div>
      </section>

      {/* ── PROJECT MODAL ── */}
      {selectedProject && (
        <div onClick={() => setSelectedProject(null)} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(10,10,8,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', backdropFilter: 'blur(6px)' }}>
          <div onClick={e => e.stopPropagation()} className="project-modal-grid" style={{ background: S.card, border: `1px solid ${S.line}`, maxWidth: 900, width: '100%', maxHeight: '90vh', overflow: 'auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', position: 'relative' }}>
            <button onClick={() => setSelectedProject(null)} style={{ position: 'absolute', top: '1rem', right: '1rem', width: 36, height: 36, background: 'rgba(20,20,18,0.7)', border: `1px solid ${S.line}`, cursor: 'pointer', color: S.cream, fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>&#10005;</button>
            <div style={{ position: 'relative', minHeight: 320 }}>
              <img src={selectedProject.img} alt={selectedProject.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: S.gold, marginBottom: '0.8rem', display: 'block' }}>{selectedProject.category}</span>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 500, color: S.cream, lineHeight: 1.2, marginBottom: '1.5rem' }}>{selectedProject.title}</h2>
              <div style={{ width: 40, height: 1, background: S.gold, marginBottom: '1.5rem' }} />
              <p style={{ fontSize: '0.92rem', color: S.mid, lineHeight: 1.85, marginBottom: '2rem' }}>{selectedProject.desc}</p>
              <button onClick={() => { setSelectedProject(null); scrollToId('contact') }} style={{ ...goldBtn, alignSelf: 'flex-start', padding: '0.85rem 1.8rem', fontSize: '0.72rem' }} onMouseEnter={e => e.currentTarget.style.background = '#b8923d'} onMouseLeave={e => e.currentTarget.style.background = S.gold}>Enquire About This Project</button>
            </div>
          </div>
        </div>
      )}

      {/* ── SERVICE MODAL ── */}
      {selectedService && (
        <div onClick={() => setSelectedService(null)} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(10,10,8,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', backdropFilter: 'blur(6px)' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: S.card, border: `1px solid ${S.line}`, maxWidth: 700, width: '100%', maxHeight: '90vh', overflow: 'auto', position: 'relative', padding: '3.5rem' }}>
            <button onClick={() => setSelectedService(null)} style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', width: 36, height: 36, background: 'rgba(242,238,230,0.08)', border: `1px solid ${S.line}`, cursor: 'pointer', color: S.cream, fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>&#10005;</button>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '4rem', color: 'transparent', WebkitTextStroke: '1px rgba(201,169,110,0.35)', lineHeight: 1, marginBottom: '0.5rem', fontWeight: 700 }}>{selectedService.num}</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.8rem,4vw,2.5rem)', fontWeight: 500, color: S.cream, lineHeight: 1.2, marginBottom: '0.8rem' }}>{selectedService.title}</h2>
            {selectedService.headline && <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.1rem', fontStyle: 'italic', color: S.gold, marginBottom: '1.5rem', lineHeight: 1.5 }}>{selectedService.headline}</p>}
            <div style={{ width: 48, height: 1, background: S.gold, marginBottom: '1.5rem' }} />
            <p style={{ fontSize: '1rem', color: S.mid, lineHeight: 1.9, marginBottom: '2rem' }}>{selectedService.desc}</p>
            <button onClick={() => { setSelectedService(null); scrollToId('contact') }} style={{ ...goldBtn, padding: '0.85rem 2rem', fontSize: '0.72rem' }} onMouseEnter={e => e.currentTarget.style.background = '#b8923d'} onMouseLeave={e => e.currentTarget.style.background = S.gold}>Start a Conversation →</button>
          </div>
        </div>
      )}

      {/* ── AWARD / CERTIFICATE MODAL ── */}
      {selectedPress && (
        <div onClick={() => setSelectedPress(null)} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(10,10,8,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', backdropFilter: 'blur(6px)' }}>
          <div onClick={e => e.stopPropagation()} className="project-modal-grid" style={{ background: S.card, border: `1px solid ${S.line}`, maxWidth: 900, width: '100%', maxHeight: '90vh', overflow: 'auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', position: 'relative' }}>
            <button onClick={() => setSelectedPress(null)} style={{ position: 'absolute', top: '1rem', right: '1rem', width: 36, height: 36, background: 'rgba(20,20,18,0.7)', border: `1px solid ${S.line}`, cursor: 'pointer', color: S.cream, fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>&#10005;</button>
            <div style={{ position: 'relative', minHeight: 320, background: S.panel }}>
              <img src={selectedPress.img} alt={selectedPress.title} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
            </div>
            <div style={{ padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: S.gold, marginBottom: '0.8rem', display: 'block' }}>{selectedPress.type}</span>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.3rem,3vw,1.8rem)', fontWeight: 500, color: S.cream, lineHeight: 1.25, marginBottom: '0.8rem' }}>{selectedPress.title}</h2>
              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', color: S.mid, marginBottom: '1.5rem' }}>{selectedPress.org}</p>
              <div style={{ width: 40, height: 1, background: S.gold, marginBottom: '1.5rem' }} />
              <p style={{ fontSize: '0.92rem', color: S.mid, lineHeight: 1.85 }}>{selectedPress.desc}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}