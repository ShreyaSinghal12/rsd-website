import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import projects from '../data/projects'
import testimonials from '../data/testimonials'

const heroSlides = [
  {
    img: "/images/slides/1stSlide.jpg",
    label: "The Brand Hero",
    headline: "You're not building a space.",
    headlineb: "You're building what people will say about you for the next thirty years.",
    sub: "A single studio, holding the vision from first sketch to final handover, so your legacy is left to no one's chance but ours.",
    cta: "Residential",
    ctaAction: "residential",
  },

  {
    img: "/images/slides/2ndSlide.jpeg",
    label: "Builders & Developers",
    headline: "Why does the identical project next door keep selling faster than yours?",
    headlineb: "",
    sub: "The difference buyers can't name is the difference we design.",
    cta: "For Developers →",
    ctaAction: "commercial",
  },
  {
    img: "/images/slides/3rdSLide.jpeg",
    label: "Hotels & Hospitality",
    headline: "How many vendors are you managing just to open a single hotel?",
    headlineb: "",
    sub: "With us, the answer is one.",
    cta: "Meet The One →",
    ctaAction: "hospitality",
  },
]

const pressItems = [
  // Add real entries here once you have confirmed press coverage
  // Example structure:
  {
    id: 1,
    type: 'Press',
    title: 'Featured in [Publication Name]',
    org: '[Publication Name] — [Year]',
    img: '/images/press/mag1.jpg',
    desc: 'Description of the feature.',
  },
  {
    id: 2,
    type: 'Press',
    title: 'Featured in [Publication Name]',
    org: '[Publication Name] — [Year]',
    img: '/images/press/mag2.jpg',
    desc: 'Description of the feature.',
  },
  {
    id: 3,
    type: 'Press',
    title: 'Featured in [Publication Name]',
    org: '[Publication Name] — [Year]',
    img: '/images/press/mag3.jpg',
    desc: 'Description of the feature.',
  },
  {
    id: 4,
    type: 'Press',
    title: 'Featured in [Publication Name]',
    org: '[Publication Name] — [Year]',
    img: '/images/press/mag4.jpg',
    desc: 'Description of the feature.',
  },
  {
    id: 5,
    type: 'Press',
    title: 'Featured in [Publication Name]',
    org: '[Publication Name] — [Year]',
    img: '/images/press/mag5.jpg',
    desc: 'Description of the feature.',
  },
  {
    id: 6,
    type: 'Press',
    title: 'Featured in [Publication Name]',
    org: '[Publication Name] — [Year]',
    img: '/images/press/mag6.jpg',
    desc: 'Description of the feature.',
  },
  {
    id: 7,
    type: 'Press',
    title: 'Featured in [Publication Name]',
    org: '[Publication Name] — [Year]',
    img: '/images/press/mag7.jpg',
    desc: 'Description of the feature.',
  },
  {
    id: 8,
    type: 'Press',
    title: 'Featured in [Publication Name]',
    org: '[Publication Name] — [Year]',
    img: '/images/press/mag8.jpg',
    desc: 'Description of the feature.',
  },
  {
    id: 9,
    type: 'Press',
    title: 'Featured in [Publication Name]',
    org: '[Publication Name] — [Year]',
    img: '/images/press/mag9.jpg',
    desc: 'Description of the feature.',
  },
]

const services = [
  {
    num: "01",
    title: "Architecture",
    headline: "The Drawings That Decide Everything Built After Them",
    desc: "Ground-up architectural design that sets the bones of the project — form, structure, flow and light. We design from the inside out, so the architecture serves how the space will actually be lived in or operated, not just how it looks on an elevation. Structure, services and aesthetics are resolved together before a single wall is committed.",
    icon: (<svg viewBox="0 0 36 36" fill="none" stroke="#C9A96E" strokeWidth="1.2" width="36" height="36"><polyline points="2 34 18 6 34 34" /><line x1="7" y1="24" x2="29" y2="24" /></svg>),
  },
  {
    num: "02",
    title: "Interior Design",
    headline: "The Interiors That Hold Their Value Long After Trends Expire",
    desc: "End-to-end interior design across residential, hospitality and commercial spaces. We move from concept and material intelligence to full detailing — specifying every finish, fixture and bespoke element with longevity in mind. Craftsmanship is briefed and supervised, not left to chance.",
    icon: (<svg viewBox="0 0 36 36" fill="none" stroke="#C9A96E" strokeWidth="1.2" width="36" height="36"><rect x="3" y="8" width="30" height="22" rx="1" /><line x1="3" y1="15" x2="33" y2="15" /><line x1="16" y1="15" x2="16" y2="30" /></svg>),
  },
  {
    num: "03",
    title: "Turnkey Projects",
    headline: "The Single Point of Accountability the Whole Industry Is Moving Toward",
    desc: "One partner for the entire journey, concept to completion, design through execution and delivery. Design, planning, procurement, quality control and on-site project management run as one integrated system under our control. You make decisions. We absorb the coordination, the vendors and the risk.",
    icon: (<svg viewBox="0 0 36 36" fill="none" stroke="#C9A96E" strokeWidth="1.2" width="36" height="36"><path d="M6 8 H30 V24 H20 L14 30 V24 H6 Z" /><line x1="12" y1="14" x2="24" y2="14" /><line x1="12" y1="19" x2="20" y2="19" /></svg>),
  },
]
const areaList = [
  "High-End Bungalows",
  "Hospitality Architecture & Interior Design",
  "Office Building & Interior Design",
  "Casual Dining Concepts",
  "Restaurant Interior Design",
  "Retail Store Interior Design",
]

const contactInfo = [
  { label: 'Address', value: 'Time Square, 3rd Floor, Opp Ravi Auto, Sevoke Road, Siliguri', href: null },
  { label: 'Phone', value: '+91 98008 48155', href: 'tel:+919800848155' },
  { label: 'Phone', value: '+91 82508 41773', href: 'tel:+918250841773' },
  { label: 'Email', value: 'rameshsinghaldesign@gmail.com', href: 'mailto:rameshsinghaldesign@gmail.com' },
  { label: 'Hours', value: 'Mon-Fri: 9:00-22:00  |  Saturday: 11:00-20:00', href: null },
]

const LABEL_STYLE = {
  fontFamily: "'DM Mono',monospace",
  fontSize: '1rem',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '#C9A96E',
  marginBottom: '1rem',
}

const H2_STYLE = {
  fontFamily: "'Playfair Display',serif",
  fontSize: 'clamp(1.8rem,3.5vw,2.6rem)',
  fontWeight: 600,
  color: '#0A0A08',
  lineHeight: 1.2,
}

function SectionDivider({ label, bg = '#F7F4EF' }) {
  return (
    <div style={{ background: bg, padding: '0.75rem 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '0 2rem', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ flex: 1, height: 1, background: 'rgba(201,169,110,0.25)' }} />
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.65rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C9A96E', whiteSpace: 'nowrap' }}>{label}</p>
        <div style={{ flex: 1, height: 1, background: 'rgba(201,169,110,0.25)' }} />
      </div>
    </div>
  )
}

function FadeIn({ children, delay = 0 }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(28px)', transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      {children}
    </div>
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

const S = {
  gold: '#C9A96E', ink: '#1A1A18', offwhite: '#F7F4EF',
  stone: '#E8E0D0', sage: '#8A9B8E', mid: '#6B6860',
}

export default function Home() {
  const [slide, setSlide] = useState(0)
  const [tIndex, setTIndex] = useState(0)
  const [filter, setFilter] = useState('all')
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', email: '', service: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [focused, setFocused] = useState({})
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedService, setSelectedService] = useState(null)
  const [selectedPress, setSelectedPress] = useState(null)
  const intervalRef = useRef(null)

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))
  const focusField = (k) => setFocused(f => ({ ...f, [k]: true }))
  const blurField = (k) => setFocused(f => ({ ...f, [k]: false }))

  const inputStyle = (isFocused) => ({
    width: '100%', padding: '0.85rem 1rem',
    border: `1px solid ${isFocused ? S.gold : 'rgba(26,26,24,0.15)'}`,
    background: '#fff', fontFamily: "'DM Sans',sans-serif",
    fontSize: '0.92rem', color: S.ink, outline: 'none',
    transition: 'border-color 0.25s', borderRadius: 0,
  })

  useEffect(() => {
    intervalRef.current = setInterval(() => setSlide(s => (s + 1) % heroSlides.length), 5000)
    return () => clearInterval(intervalRef.current)
  }, [])

  const goToSlide = (i) => {
    clearInterval(intervalRef.current)
    setSlide(i)
    intervalRef.current = setInterval(() => setSlide(s => (s + 1) % heroSlides.length), 5000)
  }

  useEffect(() => {
    const t = setInterval(() => setTIndex(i => (i + 1) % testimonials.length), 5000)
    return () => clearInterval(t)
  }, [])

  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.3 })
  const years = useCounter(30, statsInView)
  const projs = useCounter(500, statsInView)
  const repeat = useCounter(90, statsInView)
  const types = useCounter(6, statsInView)

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.firstName || !form.phone || !form.email || !form.message) {
      alert('Please fill in all required fields.')
      return
    }
    setStatus('sending')
    await new Promise(r => setTimeout(r, 1200))
    setStatus('sent')
  }

  return (
    <>
      {/* ── HERO ── */}
      <section id="hero" style={{ position: 'relative', background: S.offwhite, paddingTop: 68 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '1.5rem 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '1.5rem', alignItems: 'stretch' }} className="hero-split">

            {/* Left — Video */}
            <FadeIn>
              <div style={{ position: 'relative', height: '100%', minHeight: 400, overflow: 'hidden' }}>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="http://raameshsinghaldesign.com/wp-content/uploads/2023/01/v7_11zon.jpg"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                >
                  <source src="/videos/hero.mp4" type="video/mp4" />
                </video>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(26,26,24,0.15) 0%, rgba(26,26,24,0.6) 100%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2.5rem' }}>
                  <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: S.gold, marginBottom: '1rem' }}>
                    Established 1995 · Siliguri, India
                  </p>
                  <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.5rem,2.8vw,2.2rem)', fontWeight: 400, lineHeight: 1.25, color: S.offwhite, marginBottom: '1.2rem', maxWidth: 520 }}>
                    You're not building a space. You're building what people will say about you for the next thirty years.
                  </h1>
                  <div style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' })}
                      style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.7rem', letterSpacing: '0.13em', textTransform: 'uppercase', padding: '0.8rem 1.7rem', background: S.gold, color: S.ink, border: 'none', fontWeight: 500, cursor: 'pointer', transition: 'background 0.3s' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#b8923d'}
                      onMouseLeave={e => e.currentTarget.style.background = S.gold}>
                      View Projects →
                    </button>
                    <button
                      onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                      style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.7rem', letterSpacing: '0.13em', textTransform: 'uppercase', padding: '0.8rem 1.7rem', background: 'transparent', color: S.offwhite, border: '1px solid rgba(247,244,239,0.5)', cursor: 'pointer', transition: 'all 0.3s' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = S.gold; e.currentTarget.style.color = S.gold }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(247,244,239,0.5)'; e.currentTarget.style.color = S.offwhite }}>
                      Book Consultation →
                    </button>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Right — Category cards stacked */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { num: '01', key: 'residential', label: 'Residential', headline: "You can afford anything. So why does the result so rarely feel like it?", img: 'http://raameshsinghaldesign.com/wp-content/uploads/2023/04/The-Unruffled.jpg', route: '/projects/residential' },
                { num: '02', key: 'commercial', label: 'Builders & Developers', headline: 'Why does the identical project next door keep selling faster?', img: '/images/slides/2ndSlide.jpeg', route: '/projects/builders' },
                { num: '03', key: 'hospitality', label: 'Hotels & Hospitality', headline: 'How many vendors are you managing just to open one hotel?', img: '/images/slides/3rdSLide.jpeg', route: '/projects/hospitality' },
              ].map((cat, i) => (
                <FadeIn key={cat.key} delay={i * 100}>
                  <Link to={cat.route} style={{ display: 'block', position: 'relative', height: 128, overflow: 'hidden', textDecoration: 'none' }}
                    onMouseEnter={e => e.currentTarget.querySelector('img').style.transform = 'scale(1.06)'}
                    onMouseLeave={e => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}>
                    <img src={cat.img} alt={cat.label} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', display: 'block' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(26,26,24,0.9) 0%, rgba(26,26,24,0.55) 60%, rgba(26,26,24,0.25) 100%)' }} />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '1.5rem' }}>
                      <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.65rem', letterSpacing: '0.1em', color: S.gold, marginBottom: '0.4rem' }}>{cat.num} —</p>
                      <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: S.gold, marginBottom: '0.5rem' }}>{cat.label}</p>
                      <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '0.95rem', color: S.offwhite, lineHeight: 1.35, marginBottom: '0.7rem', maxWidth: 260 }}>{cat.headline}</h3>
                      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: S.gold }}>Explore →</span>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ── STATS ── */}
      <section ref={statsRef} style={{ background: '#F0EBE3', padding: '2.5rem 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '2rem', textAlign: 'center' }}>
            {[
              { num: years, suffix: '+', label: 'Years of Experience' },
              { num: projs, suffix: '+', label: 'Projects Delivered' },
              { num: repeat, suffix: '%', label: 'Repeat & Referral' },
              { num: types, suffix: '', label: 'Project Typologies' },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2rem,4vw,3rem)', color: S.gold, lineHeight: 1, marginBottom: '0.4rem' }}>{s.num}{s.suffix}</div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: S.mid }}>{s.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ background: S.offwhite }}>

        {/* Block 1 — Opening Banner */}
        <div style={{ background: '#F0EBE3', padding: '5rem 2rem', textAlign: 'center' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <FadeIn>
              <p style={{ ...LABEL_STYLE, textAlign: 'center' }}>Est. 1995 — Siliguri, India</p>
              <h2 style={{ ...H2_STYLE, fontSize: 'clamp(2rem,4vw,3rem)', textAlign: 'center', marginBottom: '2rem' }}>
                30 years of turning space into <em style={{ color: S.gold, fontStyle: 'italic' }}>legacy.</em>
              </h2>
              <div style={{ width: 48, height: 1, background: S.gold, margin: '0 auto 2rem' }} />
              <p style={{ fontSize: 'clamp(0.9rem,2vw,1.05rem)', color: S.mid, lineHeight: 1.9, maxWidth: 720, margin: '0 auto' }}>
                For thirty years, our name has gone on the outcome, not just the drawings. When one firm holds the whole project, there's no one else to point to if something isn't right, and nothing to hide behind. We built the practice that way on purpose: an owner should have exactly one place to look when it matters. Three decades on, that's still the standard we answer to.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Block 2 — Who We Are */}
        <div style={{ padding: '3rem 2rem', background: S.offwhite }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }} className="about-grid">
            <FadeIn>
              <div style={{ position: 'relative' }}>
                <img src="http://raameshsinghaldesign.com/wp-content/uploads/2023/01/RSD-13-1024x767.jpg" alt="About RSD" loading="lazy" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', bottom: '-1.2rem', right: '-1.2rem', width: '65%', height: '65%', border: '1px solid #C9A96E', zIndex: -1 }} />
                <div style={{ position: 'absolute', top: '1.5rem', left: '-1.5rem', background: S.ink, padding: '1.2rem 1.6rem', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '2rem', color: S.gold, lineHeight: 1 }}>30+</div>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: S.sage, marginTop: '0.3rem' }}>Years</div>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={150}>
              <span className="gold-rule" />
              <p style={LABEL_STYLE}>Who We Are</p>
              <h2 style={{ ...H2_STYLE, marginBottom: '0.8rem' }}>
                One studio. One standard.<br /><em>One name on every decision.</em>
              </h2>
              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', letterSpacing: '0.1em', color: S.gold, marginBottom: '1.5rem', textTransform: 'uppercase' }}>About Raamesh Singhal Design</p>
              <p style={{ fontSize: '0.92rem', color: S.mid, lineHeight: 1.85, marginBottom: '1rem' }}>
                Since 1995, Raamesh Singhal Design has been creating spaces where design, functionality, and human experience come together. Founded on the belief that exceptional spaces require a complete vision — not disconnected solutions — we bring architecture, interiors, planning, procurement, and execution together under one roof.
              </p>
              <p style={{ fontSize: '0.92rem', color: S.mid, lineHeight: 1.85, marginBottom: '1rem' }}>
                From our studio in Siliguri, we have designed and delivered luxury residences, hospitality spaces, and large-scale developments across Siliguri, Sikkim, Nepal, Bhutan, and Assam — creating spaces that are thoughtfully planned, carefully executed, and built to last.
              </p>
              <p style={{ fontSize: '0.92rem', color: S.mid, lineHeight: 1.85 }}>
                Every project we undertake carries one commitment: a single vision, a single standard, and complete ownership from concept to completion.
              </p>
              <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '2rem', color: S.gold }}>500+</div>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: S.mid }}>Projects Delivered</div>
                </div>
                <div style={{ width: 1, background: 'rgba(26,26,24,0.1)' }} />
                <div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '2rem', color: S.gold }}>5</div>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: S.mid }}>States & Countries</div>
                </div>
                <div style={{ width: 1, background: 'rgba(26,26,24,0.1)' }} />
                <div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '2rem', color: S.gold }}>1995</div>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: S.mid }}>Established</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Founders */}
        <div style={{ background: '#F0EBE3', padding: '3rem 2rem' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <FadeIn>
              <span className="gold-rule" />
              <h2 style={{ ...H2_STYLE, marginBottom: '1rem' }}>
                The thinking behind every<br /><em style={{ color: S.gold }}>space we create.</em>
              </h2>
              <p style={{ fontSize: '0.92rem', color: S.mid, lineHeight: 1.85, maxWidth: 680, marginBottom: '4rem' }}>
                Exceptional spaces are never the result of design alone. They emerge when vision, functionality, human behaviour, and execution work in complete harmony. That belief has guided Raamesh Singhal Design since its inception.
              </p>
            </FadeIn>
            <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              {[
                { name: 'Ramesh Singhal', role: 'Founder', quote: 'Design creates possibilities. Execution determines whether those possibilities become reality. ', img: '/images/Founders/Ramesh_Singhal.jpeg' },
                { name: 'Sonika Singhal', role: 'Co-Founder', quote: 'The most meaningful spaces are not the ones people admire. They are the ones people never want to leave. ', img: '/images/Founders/Sonika_Singhal.jpeg' },
              ].map((founder, i) => (
                <FadeIn key={i} delay={i * 150}>
                  <div style={{ background: '#fff', overflow: 'hidden', border: '1px solid rgba(26,26,24,0.08)' }}>
                    <div style={{ aspectRatio: '3/2', overflow: 'hidden', background: '#F0EBE3' }}>
                      <img src={founder.img} alt={founder.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
                    </div>
                    <div style={{ padding: '2rem' }}>
                      <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: S.gold, marginBottom: '0.5rem' }}>{founder.role}</p>
                      <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.3rem', color: S.ink, marginBottom: '1rem', fontWeight: 400 }}>{founder.name}</h3>
                      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '1rem', fontStyle: 'italic', color: S.mid, lineHeight: 1.75 }}>
                        <span style={{ color: S.gold, fontSize: '1.5rem', lineHeight: 0, verticalAlign: '-0.3rem', marginRight: '0.2rem' }}>"</span>
                        {founder.quote}
                      </p>
                      <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.65rem', letterSpacing: '0.12em', color: S.gold, marginTop: '1rem' }}>— {founder.name}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>

        {/* Book */}
        <div id="book" style={{ background: '#F0EBE3', padding: '3rem 2rem' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <FadeIn>
              <span className="gold-rule" />
              <p style={LABEL_STYLE}>The Book</p>
              <h2 style={{ ...H2_STYLE, marginBottom: '3rem' }}>
                Words Behind <em>the Work</em>
              </h2>
            </FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '2rem', alignItems: 'center', padding: '3.5rem 0' }} className="book-grid">
              <FadeIn delay={100}>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '1.2rem', left: '-1.2rem', width: '100%', height: '100%', border: `1px solid ${S.gold}`, zIndex: -1 }} />
                  <img
                    src="/images/book/book_image.jpeg"
                    alt="Why Luxury Homes Don't Sell by Ramesh Singhal"
                    loading="lazy"
                    style={{ width: '100%', display: 'block', boxShadow: '0 25px 50px rgba(26,26,24,0.25)' }}
                  />
                </div>
              </FadeIn>
              <FadeIn delay={150}>
                <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', letterSpacing: '0.14em', color: S.gold, marginBottom: '1.2rem', textTransform: 'uppercase' }}>
                  By Raamesh Singhal
                </p>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.6rem,3vw,2.2rem)', color: S.ink, marginBottom: '0.6rem', fontWeight: 600, lineHeight: 1.25 }}>
                  Why Luxury Homes Don't Sell:
                </h3>
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.15rem', fontStyle: 'italic', color: S.gold, marginBottom: '1.8rem' }}>
                  The Blind Spot Costing Developers Crores
                </p>
                <div style={{ width: 40, height: 1, background: S.gold, marginBottom: '1.8rem' }} />
                <p style={{ fontSize: '0.95rem', color: S.mid, lineHeight: 1.9, marginBottom: '2.2rem', maxWidth: 480 }}>
                  It's not the market. It's the misunderstanding. Drawing on three decades of building luxury spaces, Raamesh Singhal uncovers the blind spots costing developers crores — and lays out what it actually takes to design projects that sell faster, at better value.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2.2rem' }}>
                  {[
                    'Uncover the blind spots in your projects',
                    "Understand what today's premium buyer truly desires",
                    'Design, position & communicate for maximum desire',
                    'Create projects that sell faster, at better value',
                  ].map((point, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                      <span style={{ color: S.gold, fontSize: '0.9rem', marginTop: '0.1rem' }}>✓</span>
                      <p style={{ fontSize: '0.82rem', color: S.mid, lineHeight: 1.6 }}>{point}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                  style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '0.85rem 2rem', background: S.gold, color: S.ink, border: 'none', cursor: 'pointer', transition: 'background 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#b8923d'}
                  onMouseLeave={e => e.currentTarget.style.background = S.gold}>
                  Get in Touch to Order →
                </button>
              </FadeIn>
            </div>
          </div>
        </div>

        {/* Block 2 — How We Do It */}
        {/* <div style={{ background: '#F0EBE3', padding: '7rem 2rem' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <FadeIn>
              <span className="gold-rule" />
              <p style={LABEL_STYLE}>Our Process</p>
              <h2 style={{ ...H2_STYLE, marginBottom: '1rem' }}>
                From a conversation to something<br /><em>worth inheriting.</em>
              </h2>
              <p style={{ fontSize: '0.92rem', color: S.mid, lineHeight: 1.85, maxWidth: 600, marginBottom: '3.5rem' }}>
                Our process exists to remove the one thing that ruins great projects: the gap between people. Everything sits with us, so nothing falls between.
              </p>
            </FadeIn>
            <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {[
                { num: '01', title: 'Understand', desc: "We begin with how you'll live, host, or operate — not with a mood board. The brief is built around outcomes, not finishes." },
                { num: '02', title: 'Compose', desc: "Architecture and interiors are designed as one decision, fully documented, so what's drawn is exactly what gets built." },
                { num: '03', title: 'Deliver', desc: "We control procurement, manage the site, and check quality at every stage. One schedule, one accountable team." },
                { num: '04', title: 'Hand Over', desc: "You receive a finished space, on time, exactly as promised — and a single name to call if you ever need us again." },
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 80}>
                  <div style={{ display: 'flex', gap: '1.5rem', padding: '2rem', background: '#fff', border: '1px solid rgba(26,26,24,0.08)', transition: 'border-color 0.3s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = S.gold}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(26,26,24,0.08)'}>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '2rem', color: S.gold, opacity: 0.3, lineHeight: 1, flexShrink: 0, fontWeight: 700 }}>{item.num}</div>
                    <div>
                      <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.1rem', color: S.ink, marginBottom: '0.5rem', fontWeight: 600 }}>{item.title}</h3>
                      <p style={{ fontSize: '0.88rem', color: S.mid, lineHeight: 1.8 }}>{item.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div> */}

        {/* Block 3 — Why Choose Us */}
        {/* <div style={{ background: S.offwhite, padding: '7rem 2rem' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <FadeIn>
              <span className="gold-rule" />
              <p style={LABEL_STYLE}>Why Choose Us</p>
              <h2 style={{ ...H2_STYLE, marginBottom: '3.5rem' }}>
                We'd rather be <em>answerable than impressive.</em>
              </h2>
            </FadeIn>
            <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
              {[
                { title: 'One name, accountable for everything', desc: "When the architecture, the interiors, and the build all sit with us, there's no gap to lose your project in, and no third party to blame if something slips. The responsibility is ours, by design." },
                { title: 'We build what we draw', desc: "A beautiful drawing is easy to promise. We hold ourselves to turning it into the actual room exactly as shown, not approximately." },
                { title: 'On time is part of the work', desc: "Our systems, procurement control, and stage-by-stage checks exist so we can be held to a date — not so we can explain why we missed one." },
                { title: "If it doesn't last, we hear about it", desc: "Thirty years of clients means three decades of living with our own decisions. That's why we design for the decade, not the season." },
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 80}>
                  <div style={{ padding: '2rem', border: '1px solid rgba(26,26,24,0.08)', background: '#fff', transition: 'border-color 0.3s, box-shadow 0.3s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = S.gold; e.currentTarget.style.boxShadow = '0 4px 24px rgba(201,169,110,0.1)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(26,26,24,0.08)'; e.currentTarget.style.boxShadow = 'none' }}>
                    <div style={{ width: 32, height: 1, background: S.gold, marginBottom: '1rem' }} />
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.1rem', color: S.ink, marginBottom: '0.8rem', fontWeight: 600 }}>{item.title}</h3>
                    <p style={{ fontSize: '0.88rem', color: S.mid, lineHeight: 1.85 }}>{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
            <FadeIn>
              <div style={{ textAlign: 'center', padding: '3rem 2rem', background: '#F0EBE3', border: '1px solid rgba(26,26,24,0.08)' }}>
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.1rem,2.5vw,1.4rem)', fontStyle: 'italic', color: S.ink, lineHeight: 1.7, maxWidth: 600, margin: '0 auto 2rem' }}>
                  "Your project deserves a single, certain answer. Tell us what you're building and we'll tell you how it ends."
                </p>
                <button
                  onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                  style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.75rem', letterSpacing: '0.16em', textTransform: 'uppercase', padding: '0.9rem 2.5rem', background: S.gold, color: S.ink, border: 'none', cursor: 'pointer', transition: 'background 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#b8923d'}
                  onMouseLeave={e => e.currentTarget.style.background = S.gold}>
                  Begin a Project Conversation →
                </button>
              </div>
            </FadeIn>
          </div>
        </div> */}

      </section>

      {/* ── SECTION DIVIDER ── */}
      <SectionDivider label="Awards and News" />

      {/* Block 1a — Awards */}
      <section>
        <div id="awards-news" style={{ background: '#F0EBE3', padding: '3rem 2rem' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <FadeIn>
              <span className="gold-rule" />
              <p style={LABEL_STYLE}>Recognition</p>
              <h2 style={{ ...H2_STYLE, marginBottom: '1.5rem' }}>
                Recognition is flattering.<br /><em>Being trusted twice is the real award.</em>
              </h2>
              <p style={{ fontSize: '0.92rem', color: S.mid, lineHeight: 1.85, maxWidth: 700, marginBottom: '3rem' }}>
                Our work has been honoured by some of the most respected names in design and industry. But the recognition we value most isn't on a shelf — it's the client who hands us their next project before the first is even finished.
              </p>
            </FadeIn>

            <div className="press-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
              {[
                { type: 'Award', title: 'Award Name Here', org: 'Awarding Body — Year', img: '/images/awardsAndCertificates/Award2.jpeg' },
                { type: 'Award', title: 'Award Name Here', org: 'Awarding Body — Year', img: '/images/awardsAndCertificates/Award3.jpeg' },
                { type: 'Award', title: 'Award Name Here', org: 'Awarding Body — Year', img: '/images/awardsAndCertificates/Award1.jpeg' },
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 80}>
                  <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/3', background: '#fff', border: '1px solid rgba(26,26,24,0.08)' }}>
                    <img src={item.img} alt={item.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', background: '#F0EBE3' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,26,24,0.85) 0%, transparent 55%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.2rem' }}>
                      <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: S.gold, marginBottom: '0.3rem' }}>{item.type}</p>
                      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '0.95rem', color: S.offwhite, marginBottom: '0.2rem' }}>{item.title}</p>
                      <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.62rem', color: 'rgba(247,244,239,0.7)' }}>{item.org}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>



        {/* Decorative moodboard strip */}
        <div style={{ background: S.offwhite, padding: '4rem 0', overflow: 'hidden' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem 2rem' }}>
            <FadeIn>
              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: S.mid, textAlign: 'center' }}>
                Magazines
              </p>
            </FadeIn>
          </div>
          <div className="moodboard-scroll" style={{ display: 'flex', gap: '1rem', overflowX: 'auto', padding: '0 2rem 1rem', scrollbarWidth: 'none' }}>
            {[1, 2, 3, 5, 6, 7, 8, 9].map((n, i) => (
              <FadeIn key={n} delay={i * 50}>
                <div style={{ flexShrink: 0, width: 220, aspectRatio: '3/4', overflow: 'hidden', boxShadow: '0 4px 20px rgba(26,26,24,0.08)' }}>
                  <img
                    src={`/images/press/mag${n}.jpg`}
                    alt="Design inspiration"
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      {/* ── SECTION DIVIDER ── */}
      <SectionDivider label="Our Services" />

      {/* ── SERVICES ── */}
      <section>
        {/* Block 1 — How We Do It */}
        <section id="services" style={{ background: S.offwhite, padding: '3rem 0 4rem' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
            <FadeIn>
              <span className="gold-rule" />
              <p style={LABEL_STYLE}>Services</p>
              <h2 style={{ ...H2_STYLE, marginBottom: '1.5rem' }}>
                The Three Capabilities the Market<br /><em>Now Expects Under One Roof</em>
              </h2>
              <p style={{ fontSize: '0.92rem', color: S.mid, lineHeight: 1.85, maxWidth: 700, marginBottom: '3.5rem' }}>
                Architecture, interior design and full turnkey execution, held under one accountable team. The vision and the delivery never separate, so nothing falls through the gaps between firms.
              </p>
            </FadeIn>
            <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5px' }}>
              {services.map((svc, i) => (
                <FadeIn key={i} delay={i * 80}>
                  <div
                    onClick={() => setSelectedService(svc)}
                    style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/3', background: '#fff', border: '1px solid rgba(26,26,24,0.08)', borderTop: '3px solid transparent', cursor: 'pointer', transition: 'border-color 0.3s, box-shadow 0.3s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderTopColor = S.gold; e.currentTarget.style.boxShadow = '0 12px 40px rgba(201,169,110,0.15)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderTopColor = 'transparent'; e.currentTarget.style.boxShadow = 'none' }}>

                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
                      <div style={{ marginBottom: '1.5rem' }}>{svc.icon}</div>
                      <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.6rem', letterSpacing: '0.16em', color: S.gold, marginBottom: '0.6rem', textTransform: 'uppercase' }}>{svc.num}</p>
                      <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.3rem', color: S.ink, marginBottom: '0.8rem', fontWeight: 600 }}>{svc.title}</h3>
                      <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: S.gold }}>Click to View →</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
            <div style={{ marginTop: '4rem' }}>
              <FadeIn>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.6rem', fontWeight: 400, color: S.ink, marginBottom: '1.5rem' }}>Areas of <em>Service</em></h3>
              </FadeIn>
              <div className="areas-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }}>
                {areaList.map((area, i) => (
                  <FadeIn key={i} delay={i * 60}>
                    <div style={{ padding: '1rem 1.5rem', border: '1px solid rgba(26,26,24,0.1)', background: '#fff', display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.9rem', color: S.ink, transition: 'border-color 0.3s' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = S.gold}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(26,26,24,0.1)'}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: S.gold, flexShrink: 0 }} />
                      {area}
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>







      </section>

      {/* ── SECTION DIVIDER ── */}
      <SectionDivider label="Our Projects" />

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" style={{ padding: '3rem 0', background: S.offwhite }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }} className="why-grid">
          {[
            { key: 'residential', label: 'Residential', img: 'http://raameshsinghaldesign.com/wp-content/uploads/2023/04/The-Unruffled.jpg', route: '/projects/residential' },
            { key: 'hospitality', label: 'Hotels & Hospitality', img: 'http://raameshsinghaldesign.com/wp-content/uploads/2023/04/Swanky-Suite-1.jpg', route: '/projects/hospitality' },
            { key: 'commercial', label: 'Builders & Developers', img: 'http://raameshsinghaldesign.com/wp-content/uploads/2023/04/Stunning-Structures-1.jpg', route: '/projects/builders' },
          ].map((cat, i) => (
            <FadeIn key={cat.key} delay={i * 100}>
              <Link to={cat.route} style={{ display: 'block', position: 'relative', aspectRatio: '4/5', overflow: 'hidden', textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.querySelector('img').style.transform = 'scale(1.08)'}
                onMouseLeave={e => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}>
                <img src={cat.img} alt={cat.label} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,26,24,0.8) 0%, rgba(26,26,24,0.2) 60%, transparent 100%)' }} />
                <div style={{ position: 'absolute', bottom: '2rem', left: '2rem' }}>
                  <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.5rem', color: S.offwhite, marginBottom: '0.5rem' }}>{cat.label}</p>
                  <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.65rem', letterSpacing: '0.14em', color: S.gold, textTransform: 'uppercase' }}>View Projects →</p>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>




      {/* ── SECTION DIVIDER ── */}
      <SectionDivider label="Testimonials" />

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" style={{ background: '#F0EBE3', padding: '3rem 0' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 2rem' }}>
          <FadeIn>
            <span className="gold-rule" />
            <p style={LABEL_STYLE}>Testimonials</p>
            <h2 style={{ ...H2_STYLE, marginBottom: '3rem' }}>
              Heard from those who <em>lived</em> our work
            </h2>
          </FadeIn>
          <div className="testimonial-wrapper" style={{ position: 'relative', padding: '0 2.5rem' }}>
            <button className="t-arrow-left"
              onClick={() => setTIndex(i => (i - 1 + testimonials.length) % testimonials.length)}
              style={{ position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '2.5rem', color: 'rgba(26,26,24,0.4)', transition: 'color 0.25s', lineHeight: 1, padding: 0, zIndex: 2 }}
              onMouseEnter={e => e.currentTarget.style.color = S.ink}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(26,26,24,0.4)'}>
              &#8249;
            </button>
            <div className="t-card" style={{ background: '#fff', padding: '2.5rem', borderLeft: `2px solid ${S.gold}` }}>
              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(0.95rem,2vw,1.1rem)', fontStyle: 'italic', color: S.ink, lineHeight: 1.8, marginBottom: '1.5rem', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <span style={{ fontSize: '2rem', color: S.gold, lineHeight: 0, verticalAlign: '-0.4rem', marginRight: '0.2rem' }}>"</span>
                {testimonials[tIndex].text}
              </p>
              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: S.gold }}>
                — {testimonials[tIndex].name}
              </p>
            </div>
            <button className="t-arrow-right"
              onClick={() => setTIndex(i => (i + 1) % testimonials.length)}
              style={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '2.5rem', color: 'rgba(26,26,24,0.4)', transition: 'color 0.25s', lineHeight: 1, padding: 0, zIndex: 2 }}
              onMouseEnter={e => e.currentTarget.style.color = S.ink}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(26,26,24,0.4)'}>
              &#8250;
            </button>
          </div>
          <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.5rem', justifyContent: 'center' }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setTIndex(i)}
                style={{ width: 8, height: 8, borderRadius: '50%', border: 'none', cursor: 'pointer', padding: 0, background: tIndex === i ? S.gold : 'rgba(201,169,110,0.25)', transform: tIndex === i ? 'scale(1.3)' : 'scale(1)', transition: 'all 0.3s' }} />
            ))}
          </div>
        </div>
      </section>



      {/* ── SECTION DIVIDER ── */}
      <SectionDivider label="Contact Us" bg="#F0EBE3" />

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: '3rem 0', background: '#F0EBE3' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '5rem', alignItems: 'start' }}>
            <div>
              <FadeIn>
                <span className="gold-rule" />
                <p style={LABEL_STYLE}>Get In Touch</p>
                <h2 style={{ ...H2_STYLE, marginBottom: '2.5rem' }}>
                  Feel free to<br /><em>contact us</em> anytime
                </h2>
              </FadeIn>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
                {contactInfo.map((item, i) => (
                  <FadeIn key={i} delay={i * 80}>
                    <div>
                      <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: S.gold, marginBottom: '0.3rem' }}>{item.label}</p>
                      {item.href
                        ? <a href={item.href} style={{ fontSize: '0.92rem', color: S.ink, textDecoration: 'none', transition: 'color 0.25s' }} onMouseEnter={e => e.currentTarget.style.color = S.gold} onMouseLeave={e => e.currentTarget.style.color = S.ink}>{item.value}</a>
                        : <p style={{ fontSize: '0.92rem', color: S.mid }}>{item.value}</p>
                      }
                    </div>
                  </FadeIn>
                ))}
              </div>
              <FadeIn delay={200}>
                <div style={{ width: '100%', height: 260, overflow: 'hidden' }}>
                  <iframe src="https://maps.google.com/maps?q=Time+Square+Sevoke+Road+Siliguri&t=m&z=15&output=embed&iwloc=near" title="Location" width="100%" height="100%" style={{ border: 'none', display: 'block' }} loading="lazy" />
                </div>
              </FadeIn>
            </div>
            <FadeIn delay={150}>
              <div style={{ background: '#fff', padding: '3rem', boxShadow: '0 4px 40px rgba(26,26,24,0.06)' }}>
                <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: S.gold, marginBottom: '0.6rem' }}>Send a Message</p>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.6rem', fontWeight: 400, color: S.ink, marginBottom: '2rem' }}>Start Your Project</h3>
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
                    <button type="submit" disabled={status === 'sending'}
                      style={{ width: '100%', padding: '1rem', background: status === 'sending' ? S.sage : S.gold, color: S.ink, border: 'none', cursor: status === 'sending' ? 'not-allowed' : 'pointer', fontFamily: "'DM Mono',monospace", fontSize: '0.75rem', letterSpacing: '0.16em', textTransform: 'uppercase', transition: 'background 0.3s' }}
                      onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.background = '#b8923d' }}
                      onMouseLeave={e => { if (status !== 'sending') e.currentTarget.style.background = S.gold }}>
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
      <section style={{ background: 'rgb(225, 190, 126)', padding: '5rem 0', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 2rem' }}>
          <FadeIn>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 400, color: S.ink, marginBottom: '1.5rem', lineHeight: 1.2 }}>
              Book Your Appointment for Quality &amp; Reliable Services
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'rgba(26,26,24,0.7)', marginBottom: '2rem', lineHeight: 1.7 }}>
              Let us help you create the home of your dreams.
            </p>
            <a href="#contact" onClick={e => { e.preventDefault(); document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }) }}
              style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '1rem 2.8rem', background: S.ink, color: S.gold, textDecoration: 'none', display: 'inline-block', transition: 'all 0.3s', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.background = S.offwhite; e.currentTarget.style.color = S.ink }}
              onMouseLeave={e => { e.currentTarget.style.background = S.ink; e.currentTarget.style.color = S.gold }}>
              Get Your Quote
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ── PROJECT MODAL ── */}
      {selectedProject && (
        <div onClick={() => setSelectedProject(null)} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(26,26,24,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', backdropFilter: 'blur(6px)' }}>
          <div onClick={e => e.stopPropagation()} className="project-modal-grid" style={{ background: '#fff', maxWidth: 900, width: '100%', maxHeight: '90vh', overflow: 'auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', position: 'relative' }}>
            <button onClick={() => setSelectedProject(null)} style={{ position: 'absolute', top: '1rem', right: '1rem', width: 36, height: 36, background: 'rgba(26,26,24,0.7)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>&#10005;</button>
            <div style={{ position: 'relative', minHeight: 320 }}>
              <img src={selectedProject.img} alt={selectedProject.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: S.gold, marginBottom: '0.8rem', display: 'block' }}>{selectedProject.category}</span>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 400, color: S.ink, lineHeight: 1.2, marginBottom: '1.5rem' }}>{selectedProject.title}</h2>
              <div style={{ width: 40, height: 1, background: S.gold, marginBottom: '1.5rem' }} />
              <p style={{ fontSize: '0.92rem', color: S.mid, lineHeight: 1.85, marginBottom: '2rem' }}>{selectedProject.desc}</p>
              <button onClick={() => { setSelectedProject(null); document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }) }}
                style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '0.85rem 1.8rem', background: S.gold, color: S.ink, border: 'none', cursor: 'pointer', transition: 'background 0.3s', alignSelf: 'flex-start' }}
                onMouseEnter={e => e.currentTarget.style.background = '#b8923d'}
                onMouseLeave={e => e.currentTarget.style.background = S.gold}>
                Enquire About This Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── SERVICE MODAL ── */}
      {selectedService && (
        <div onClick={() => setSelectedService(null)} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(26,26,24,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', backdropFilter: 'blur(6px)' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', maxWidth: 700, width: '100%', maxHeight: '90vh', overflow: 'auto', position: 'relative', padding: '3.5rem' }}>
            <button onClick={() => setSelectedService(null)} style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', width: 36, height: 36, background: 'rgba(26,26,24,0.08)', border: 'none', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>&#10005;</button>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '4rem', color: S.gold, opacity: 0.15, lineHeight: 1, marginBottom: '0.5rem', fontWeight: 700 }}>{selectedService.num}</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.8rem,4vw,2.5rem)', fontWeight: 400, color: S.ink, lineHeight: 1.2, marginBottom: '1.5rem' }}>{selectedService.title}</h2>
            <div style={{ width: 48, height: 1, background: S.gold, marginBottom: '1.5rem' }} />
            <p style={{ fontSize: '1rem', color: S.mid, lineHeight: 1.9, marginBottom: '2rem' }}>{selectedService.desc}</p>
            <div style={{ width: '100%', aspectRatio: '16/9', background: '#F0EBE3', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: S.gold }}>Image coming soon</p>
            </div>
            <button onClick={() => { setSelectedService(null); document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }) }}
              style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '0.85rem 2rem', background: S.gold, color: S.ink, border: 'none', cursor: 'pointer', transition: 'background 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#b8923d'}
              onMouseLeave={e => e.currentTarget.style.background = S.gold}>
              Start a Conversation →
            </button>
          </div>
        </div>
      )}
      {/* ── PRESS MODAL ── */}
      {selectedPress && (
        <div onClick={() => setSelectedPress(null)} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(26,26,24,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', backdropFilter: 'blur(6px)' }}>
          <div onClick={e => e.stopPropagation()} className="project-modal-grid" style={{ background: '#fff', maxWidth: 900, width: '100%', maxHeight: '90vh', overflow: 'auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', position: 'relative' }}>
            <button onClick={() => setSelectedPress(null)} style={{ position: 'absolute', top: '1rem', right: '1rem', width: 36, height: 36, background: 'rgba(26,26,24,0.7)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>&#10005;</button>
            <div style={{ position: 'relative', minHeight: 320 }}>
              <img src={selectedPress.img} alt={selectedPress.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: S.gold, marginBottom: '0.8rem', display: 'block' }}>{selectedPress.type}</span>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 400, color: S.ink, lineHeight: 1.2, marginBottom: '0.8rem' }}>{selectedPress.title}</h2>
              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.75rem', color: S.mid, marginBottom: '1.5rem' }}>{selectedPress.org}</p>
              <div style={{ width: 40, height: 1, background: S.gold, marginBottom: '1.5rem' }} />
              <p style={{ fontSize: '0.92rem', color: S.mid, lineHeight: 1.85 }}>{selectedPress.desc}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}