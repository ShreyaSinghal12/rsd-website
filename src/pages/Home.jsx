import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import testimonials from '../data/testimonials'

/* DESIGN TOKENS matching PDF */
const S = {
  cream: '#FAF8F2',
  paper: '#FFFFFF',
  ink: '#1B2A38',
  black: '#111111',
  gold: '#B98D4F',
  peach: '#F4E3C8',
  mid: '#6B6860',
  line: 'rgba(0,0,0,0.08)',
}

const roundedHeading = { fontFamily: "'Poppins',sans-serif", fontWeight: 700 }
const serifHeading = { fontFamily: "'Playfair Display',serif" }

function metallicStyle(fontSize) {
  return {
    fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize,
    textTransform: 'uppercase', letterSpacing: '0.01em',
    background: 'linear-gradient(180deg, #8a8a8a 0%, #4a4a4a 35%, #6e6e6e 50%, #2e2e2e 65%, #7a7a7a 100%)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
    filter: 'drop-shadow(0 1px 0 rgba(255,255,255,0.4))',
  }
}

const services4 = [
  { title: 'Architecture', img: 'https://raameshsinghaldesign.com/wp-content/uploads/2023/04/Stunning-Structures-1.jpg' },
  { title: 'Interior Design', img: 'https://raameshsinghaldesign.com/wp-content/uploads/2023/04/The-Unruffled.jpg' },
  { title: 'Trunkey Projects', img: 'https://raameshsinghaldesign.com/wp-content/uploads/2023/04/Innovative-Spaces-1.jpg' },
  { title: 'PMC', img: 'https://raameshsinghaldesign.com/wp-content/uploads/2023/01/RSD-3.jpg' },
]

const typesOfServices = [
  { title: 'Residential', img: 'https://raameshsinghaldesign.com/wp-content/uploads/2023/04/The-Unruffled.jpg', route: '/projects/residential' },
  { title: 'Hotels & Hospitality', img: 'https://raameshsinghaldesign.com/wp-content/uploads/2023/04/Swanky-Suite-1.jpg', route: '/projects/hospitality' },
  { title: 'Builders & Developers', img: '/images/slides/2ndSlide.jpeg', route: '/projects/builders' },
  { title: 'Retails & Shop', img: 'https://raameshsinghaldesign.com/wp-content/uploads/2023/04/Innovative-Spaces-1.jpg', route: '/projects/builders' },
]

const whyUsPoints = [
  { num: '01', title: 'One name, accountable for everything', desc: "When the architecture, the interiors, and the build all sit with us, there's no gap to lose your project in, and no third party to blame if something slips." },
  { num: '02', title: 'We build what we draw', desc: 'A beautiful drawing is easy to promise. We hold ourselves to turning it into the actual room exactly as shown, not approximately.' },
  { num: '03', title: 'On time is part of the work', desc: 'Our systems, procurement control, and stage-by-stage checks exist so we can be held to a date — not so we can explain why we missed one.' },
  { num: '04', title: "If it doesn't last, we hear about it", desc: "Thirty years of clients means three decades of living with our own decisions. That's why we design for the decade, not the season." },
  { num: '05', title: 'Understand', desc: "We begin with how you'll live, host, or operate — not with a mood board. The brief is built around outcomes, not finishes." },
  { num: '06', title: 'Deliver', desc: 'We control procurement, manage the site, and check quality at every stage. One schedule, one accountable team.' },
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
]

const trophyStage = [
  { key: 'pillar', img: '/images/awardsAndCertificates/Award1-trophy.png', left: 16.3, width: 13.4, top: 12.4, height: 40, plateLeft: 7.25, plateWidth: 32, plateTop: 52, plateHeight: 3, stemLeft: 11, stemWidth: 24.5, stemTop: 52, stemHeight: 34 },
  { key: 'horizon', img: '/images/awardsAndCertificates/Award2-trophy.png', left: 40, width: 20.1, top: 42.4, height: 27, plateLeft: 27, plateWidth: 46, plateTop: 69, plateHeight: 3.2, stemLeft: 40, stemWidth: 20, stemTop: 69, stemHeight: 31 },
  { key: 'keystone', img: '/images/awardsAndCertificates/Award3-trophy.png', left: 68.3, width: 25.9, top: 7.9, height: 30, plateLeft: 68.5, plateWidth: 27, plateTop: 37.5, plateHeight: 2.8, stemLeft: 72, stemWidth: 20, stemTop: 37.5, stemHeight: 63 },
]

const woodGrainSVG = `data:image/svg+xml,${encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='140' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.012 0.9' numOctaves='3' seed='11' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0.32  0 0 0 0 0.23  0 0 0 0 0.12  0 0 0 0.45 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>")}`

const videoTestimonials = [
  { name: 'Client Name', role: 'Residential Client', video: '/videos/Testimonials/Testimonial1.mp4' },
  { name: 'Client Name', role: 'Hospitality Client', video: '/videos/Testimonials/Testimonial2.mp4' },
  { name: 'Client Name', role: 'Residential Client', video: '/videos/Testimonials/Testimonial3.mp4', placeholder: true },
  { name: 'Client Name', role: 'Builder & Developer Client', video: '/videos/Testimonials/Testimonial4.mp4', placeholder: true },
]

const contactInfo = [
  { label: 'Phone', value: '+91 82508 41773 / +91 98008 48155', href: 'tel:+918250841773' },
  { label: 'Email', value: 'rameshsinghaldesign@gmail.com', href: 'mailto:rameshsinghaldesign@gmail.com' },
  { label: 'Location', value: 'Time Square, 3rd Floor, Opp Ravi Auto, Sevoke Road, Siliguri', href: null },
]

function FadeIn({ children, delay = 0, style }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(28px)', transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`, ...style }}>
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

function SlantCard({ img, title, onClick, big }) {
  return (
    <div
      onClick={onClick}
      style={{ position: 'relative', overflow: 'hidden', cursor: onClick ? 'pointer' : 'default', aspectRatio: big ? '3/4.4' : '3/5.2', clipPath: 'polygon(0 14%, 20% 0, 100% 0, 100% 100%, 0 100%)', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
      onMouseEnter={e => { const i = e.currentTarget.querySelector('img'); if (i) i.style.transform = 'scale(1.07)' }}
      onMouseLeave={e => { const i = e.currentTarget.querySelector('img'); if (i) i.style.transform = 'scale(1)' }}>
      <img src={img} alt={title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', display: 'block' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,20,18,0.75) 0%, transparent 50%)' }} />
      <p style={{ position: 'absolute', bottom: '1rem', left: '1.2rem', fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: big ? '1.3rem' : '1.15rem', color: '#fff' }}>{title}</p>
    </div>
  )
}

export default function Home() {
  const [tIndex, setTIndex] = useState(0)
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', email: '', service: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [focused, setFocused] = useState({})
  const [selectedPress, setSelectedPress] = useState(null)
  const [playingVideo, setPlayingVideo] = useState(null)

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))
  const focusField = (k) => setFocused(f => ({ ...f, [k]: true }))
  const blurField = (k) => setFocused(f => ({ ...f, [k]: false }))

  const inputStyle = (isFocused) => ({ width: '100%', padding: '0.85rem 1rem', border: 'none', background: '#F2F0EB', fontFamily: "'DM Sans',sans-serif", fontSize: '1rem', color: S.ink, outline: isFocused ? `2px solid ${S.gold}` : 'none', borderRadius: 6 })

  useEffect(() => {
    const t = setInterval(() => setTIndex(i => (i + 1) % testimonials.length), 6000)
    return () => clearInterval(t)
  }, [])

  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.3 })
  const years = useCounter(30, statsInView)
  const projs = useCounter(500, statsInView)
  const repeat = useCounter(90, statsInView)
  const types = useCounter(6, statsInView)

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
      <section id="hero" style={{ height: '100vh', minHeight: 640, position: 'relative', overflow: 'hidden' }}>
        <img src="https://raameshsinghaldesign.com/wp-content/uploads/2023/01/v7_11zon.jpg" alt="Raamesh Singhal Design" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg, rgba(20,40,60,0.55) 0%, rgba(20,40,60,0.15) 55%, rgba(20,40,60,0.35) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 1300, margin: '0 auto', padding: '0 2.5rem' }}>
          <FadeIn>
            <h1 style={{ ...roundedHeading, fontSize: 'clamp(2.8rem,6vw,4.4rem)', color: '#fff', lineHeight: 1.15, marginBottom: '1.4rem', maxWidth: 680 }}>
              Where Imagination<br />Meets Interior Design
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.9)', maxWidth: 480, marginBottom: '2.2rem', lineHeight: 1.6 }}>
              A single studio, holding the vision from first sketch to final handover, so your legacy is left to no one's chance but ours.
            </p>
            <button onClick={() => scrollToId('portfolio')} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.95rem', padding: '0.9rem 1.8rem', background: 'transparent', color: '#fff', border: '1.5px solid #fff', borderRadius: 999, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = S.ink }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff' }}>
              View Projects →
            </button>
          </FadeIn>
        </div>
      </section>

      <section id="about" style={{ background: S.cream, padding: '3.5rem 2rem 3rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <FadeIn>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.95rem', letterSpacing: '0.2em', color: S.mid, marginBottom: '1.2rem' }}>Est. 1995 — Siliguri, India</p>
            <h2 style={{ ...serifHeading, fontSize: 'clamp(2.6rem,5vw,3.8rem)', color: S.black, marginBottom: '2rem' }}>30+ years of turning Space into Legacy</h2>
            <div style={{ width: 90, height: 1, background: S.line, margin: '0 auto 2rem' }} />
            <p style={{ fontSize: '1.08rem', color: S.mid, lineHeight: 1.9, marginBottom: '1rem' }}>
              Since 1995, Raamesh Singhal Design has been creating spaces where design, functionality, and human experience come together. Built on the belief that exceptional spaces require a unified vision, we seamlessly integrate architecture, interiors, planning, procurement, and execution under one roof.
            </p>
            <p style={{ fontSize: '0.98rem', color: S.mid, lineHeight: 1.85 }}>
              From our studio in Siliguri, we have delivered luxury residences, hospitality spaces, and large-scale developments across Siliguri, Sikkim, Assam, Nepal, and Bhutan. Every project is guided by a single commitment: one vision, one standard, and complete ownership from concept to completion.
            </p>
          </FadeIn>
        </div>

        <div ref={statsRef} style={{ maxWidth: 1300, margin: '4rem auto 4rem' }}>
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
            {[{ num: years, suffix: '+', label: 'Years of Experience' }, { num: projs, suffix: '+', label: 'Projects Delivered' }, { num: repeat, suffix: '%', label: 'Repeat & Referral' }, { num: types, suffix: '', label: 'Project Typologies' }].map((s, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div style={{ textAlign: 'center', padding: '0 1.5rem', borderRight: i < 3 ? `1px solid ${S.line}` : 'none' }}>
                  <div style={{ ...serifHeading, fontSize: 'clamp(2.8rem,5.5vw,4.2rem)', color: S.gold, lineHeight: 1, marginBottom: '0.5rem' }}>{s.num}{s.suffix}</div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: '1.05rem', color: S.mid }}>{s.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <FadeIn>
          <div style={{ maxWidth: 850, margin: '0 auto', position: 'relative', aspectRatio: '16/9', background: '#000', overflow: 'hidden' }}>
            <video muted autoPlay loop playsInline preload="auto" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)' }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 76, height: 76, borderRadius: '50%', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 24 24" width="26" height="26" fill="#fff"><path d="M8 5v14l11-7z" /></svg>
            </div>
          </div>
        </FadeIn>
      </section>

      <section style={{ background: S.paper, padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <FadeIn>
            <h2 style={{ ...roundedHeading, fontSize: 'clamp(2.2rem,4.5vw,3.2rem)', color: S.ink, marginBottom: '1.4rem', lineHeight: 1.3 }}>
              The thinking behind every<br />space <em style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontWeight: 500 }}>we create</em>
            </h2>
            <p style={{ fontSize: '0.95rem', color: S.mid, lineHeight: 1.85, maxWidth: 680, margin: '0 auto 3.5rem' }}>
              Exceptional spaces are never the result of design alone. They emerge when vision, functionality, human behaviour, and execution work in complete harmony. That belief has guided Raamesh Singhal Design since its inception.
            </p>
          </FadeIn>
        </div>
        <div className="about-grid" style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
          {[
            { name: 'Ramesh Singhal', role: 'Founder', quote: 'Design creates possibilities. Execution determines whether those possibilities become reality', img: '/images/Founders/Ramesh_Singhal.jpeg' },
            { name: 'Sonika Singhal', role: 'Co-Founder', quote: 'The most meaningful spaces are not the ones people admire. They are the ones people never want to leave.', img: '/images/Founders/Sonika_Singhal.jpeg' },
          ].map((f, i) => (
            <FadeIn key={i} delay={i * 150}>
              <div>
                <div style={{ aspectRatio: '1/1', overflow: 'hidden', background: '#DDE3E7' }}>
                  <img src={f.img} alt={f.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
                </div>
                <div style={{ background: S.peach, padding: '1.6rem 1.6rem 1.8rem', position: 'relative' }}>
                  <span style={{ position: 'absolute', top: '1.2rem', right: '1.4rem', fontFamily: "'Playfair Display',serif", fontSize: '3rem', color: 'rgba(0,0,0,0.12)', lineHeight: 0.6 }}>&rdquo;</span>
                  <p style={{ fontSize: '0.7rem', color: S.mid, marginBottom: '0.15rem' }}>{f.role}</p>
                  <p style={{ fontWeight: 700, fontSize: '1rem', color: S.black, marginBottom: '0.9rem' }}>{f.name}</p>
                  <p style={{ fontSize: '0.85rem', color: S.mid, lineHeight: 1.6, fontStyle: 'italic' }}>"{f.quote}"</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section id="services" style={{ background: S.cream, padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeIn>
            <h2 style={{ ...metallicStyle('clamp(2.4rem,5vw,3.4rem)'), textAlign: 'center', marginBottom: '1rem' }}>Our Expertise</h2>
            <p style={{ fontSize: '0.92rem', color: S.mid, textAlign: 'center', maxWidth: 700, margin: '0 auto 3rem', lineHeight: 1.7 }}>
              Architecture, interior design and full turnkey execution, held under one accountable team. The vision and the delivery never separate, so nothing falls through the gaps between firms.
            </p>
          </FadeIn>
          <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.8rem', alignItems: 'start' }}>
            {services4.map((s, i) => (
              <FadeIn key={i} delay={i * 90}>
                <div style={{ marginTop: i % 2 === 1 ? '2.5rem' : 0 }}>
                  <SlantCard img={s.img} title={s.title} onClick={() => scrollToId('services')} />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" style={{ background: S.paper, padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeIn>
            <h2 style={{ ...metallicStyle('clamp(2.4rem,5vw,3.4rem)'), textAlign: 'center', marginBottom: '3rem' }}>Our Projects</h2>
          </FadeIn>
          <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '4.5rem' }}>
            {typesOfServices.map((s, i) => (
              <FadeIn key={i} delay={i * 100}>
                <Link to={s.route} style={{ display: 'block', textDecoration: 'none' }}>
                  <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/9', border: `1px solid ${S.line}` }}
                    onMouseEnter={e => e.currentTarget.querySelector('img').style.transform = 'scale(1.06)'}
                    onMouseLeave={e => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}>
                    <img src={s.img} alt={s.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', display: 'block' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,20,18,0.7) 0%, transparent 45%)' }} />
                    <p style={{ position: 'absolute', bottom: '1.2rem', left: '1.4rem', fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: '1.4rem', color: '#fff' }}>{s.title}</p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.6fr', gap: '3rem' }}>
            <FadeIn>
              <h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: 'clamp(3rem,6vw,4.2rem)', color: S.black, marginBottom: '1.4rem', lineHeight: 1 }}>WHY US?</h3>
              <p style={{ fontSize: '1rem', color: S.mid, lineHeight: 1.75, maxWidth: 300 }}>
                Thirty years of holding one standard: a single studio accountable for everything a project needs, from first sketch to final handover.
              </p>
            </FadeIn>
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {whyUsPoints.map((p, i) => (
                  <FadeIn key={i} delay={i * 60}>
                    <div style={{ display: 'grid', gridTemplateColumns: '170px 1fr', columnGap: '2rem', alignItems: 'start', padding: '1.6rem 0' }}>
                      <div>
                        <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: '2.2rem', color: S.gold, lineHeight: 1, marginBottom: '0.1rem' }}>{p.num}</p>
                        <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: '1.4rem', color: S.black, lineHeight: 1.2 }}>{p.title}</p>
                      </div>
                      <p style={{ fontSize: '0.88rem', color: S.mid, lineHeight: 1.65, marginTop: '0.5rem' }}>{p.desc}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
              <div style={{ position: 'absolute', top: 0, right: '-1.5rem', width: 3, height: '55%', background: 'rgba(0,0,0,0.08)', borderRadius: 999 }} />
            </div>
          </div>
        </div>
      </section>

      <section id="awards-news" style={{ background: S.cream, padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '0.85fr 1fr', gap: '3rem', alignItems: 'start', marginBottom: '4rem' }}>
            <FadeIn>
              <h2 style={{ ...serifHeading, fontSize: 'clamp(2.3rem,4.5vw,3.2rem)', color: S.black, marginBottom: '0.3rem' }}>Awards &amp; Certificates</h2>
              <h3 style={{ ...roundedHeading, fontSize: 'clamp(1.5rem,2.8vw,2rem)', color: S.black, marginBottom: '1.4rem', lineHeight: 1.25 }}>Being trusted twice<br />is the real award.</h3>
              <p style={{ fontSize: '0.92rem', color: S.mid, lineHeight: 1.8 }}>
                Our work has been honoured by some of the most respected names in design and industry. But the recognition we value most isn't on a shelf — it's the client who hands us their next project before the first is even finished.
              </p>
            </FadeIn>
            <FadeIn delay={150}>
              <div style={{ position: 'relative', width: '100%', maxWidth: 480, aspectRatio: '602/685' }}>
                {trophyStage.map((t, i) => {
                  const award = awardsAndCerts.filter(a => a.type === 'Award')[i]
                  const woodCyl = 'linear-gradient(97deg, #9C784992 0%, #D2B384 9%, #EDDAB0 22%, #FBF4E1 36%, #FFFBF0 46%, #F5E7C7 58%, #E2C797 72%, #C6A374 86%, #96713F 100%)'
                  const woodDisc = 'linear-gradient(100deg, #A9835470 0%, #DFC496 12%, #F7EAD0 26%, #FEFAEE 40%, #FDF6E4 50%, #F1E0B9 62%, #DCBD8C 76%, #B99668 90%, #8E6B3F 100%)'
                  const stemCx = t.stemLeft + t.stemWidth / 2
                  return (
                    <div key={t.key}>
                      {/* contact shadow on the ground */}
                      <div style={{ position: 'absolute', left: `${stemCx - t.stemWidth * 0.62}%`, width: `${t.stemWidth * 1.24}%`, top: `${t.stemTop + t.stemHeight - 1.2}%`, height: '3%', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(30,20,8,0.34) 0%, rgba(30,20,8,0) 72%)' }} />

                      {/* pedestal stem: rounded dome top, cylindrical body */}
                      <div style={{ position: 'absolute', left: `${t.stemLeft}%`, width: `${t.stemWidth}%`, top: `${t.stemTop}%`, height: `${t.stemHeight}%`, borderRadius: '50% 50% 14% 14% / 46% 46% 7% 7%', overflow: 'hidden', background: woodCyl, boxShadow: 'inset -12px 0 22px rgba(70,48,22,0.32), inset 10px 0 16px rgba(255,255,255,0.4), 0 16px 24px rgba(30,20,10,0.18)' }}>
                        {/* dome highlight */}
                        <div style={{ position: 'absolute', left: '10%', right: '10%', top: '-6%', height: '38%', borderRadius: '50%', background: 'radial-gradient(ellipse at 38% 30%, rgba(255,253,246,0.95) 0%, rgba(255,253,246,0) 62%)' }} />
                        {/* vertical specular streak */}
                        <div style={{ position: 'absolute', left: '20%', width: '14%', top: '4%', bottom: '4%', background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0) 100%)', filter: 'blur(3px)' }} />
                        {/* wood grain texture */}
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("${woodGrainSVG}")`, backgroundSize: '60% 100%', mixBlendMode: 'multiply', opacity: 0.55 }} />
                        {/* ambient occlusion where stem meets tray above */}
                        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '10%', background: 'linear-gradient(180deg, rgba(60,42,20,0.28) 0%, rgba(60,42,20,0) 100%)' }} />
                      </div>

                      {/* tray edge (disc thickness) */}
                      <div style={{ position: 'absolute', left: `${t.plateLeft}%`, width: `${t.plateWidth}%`, top: `${t.plateTop + t.plateHeight * 0.4}%`, height: `${t.plateHeight * 1.15}%`, borderRadius: '50%', background: 'linear-gradient(180deg, #A17F4F 0%, #6E5230 100%)' }} />
                      {/* tray top surface */}
                      <div style={{ position: 'absolute', left: `${t.plateLeft}%`, width: `${t.plateWidth}%`, top: `${t.plateTop}%`, height: `${t.plateHeight}%`, borderRadius: '50%', overflow: 'hidden', background: woodDisc, boxShadow: '0 8px 14px rgba(20,14,6,0.22)' }}>
                        <div style={{ position: 'absolute', left: '8%', top: '-30%', width: '46%', height: '160%', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(255,253,246,0.9) 0%, rgba(255,253,246,0) 65%)' }} />
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("${woodGrainSVG}")`, backgroundSize: '160% 340%', mixBlendMode: 'multiply', opacity: 0.28 }} />
                      </div>

                      <img
                        src={t.img}
                        alt={award?.title}
                        onClick={() => award && setSelectedPress(award)}
                        style={{ position: 'absolute', left: `${t.left}%`, width: `${t.width}%`, top: `${t.top}%`, height: `${t.height}%`, objectFit: 'contain', objectPosition: 'center bottom', cursor: 'pointer', filter: 'drop-shadow(0 8px 10px rgba(0,0,0,0.2))' }}
                      />
                      {/* contact shadow where the trophy meets the tray */}
                      <div style={{ position: 'absolute', left: `${t.left + t.width * 0.14}%`, width: `${t.width * 0.72}%`, top: `${t.top + t.height - 0.6}%`, height: '1.6%', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(25,17,7,0.4) 0%, rgba(25,17,7,0) 75%)' }} />
                    </div>
                  )
                })}
              </div>
            </FadeIn>
          </div>

          <div className="moodboard-scroll" style={{ display: 'flex', gap: '1.2rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {awardsAndCerts.filter(a => a.type === 'Certificate').map((c, i) => (
              <FadeIn key={i} delay={i * 60}>
                <div onClick={() => setSelectedPress(c)} style={{ flexShrink: 0, width: 220, aspectRatio: '4/5', background: '#5A4632', border: '10px solid #5A4632', cursor: 'pointer', boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}>
                  <div style={{ width: '100%', height: '100%', background: '#fff', overflow: 'hidden' }}>
                    <img src={c.img} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="book" style={{ background: S.paper, padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div className="book-grid" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', alignItems: 'stretch' }}>
            <FadeIn>
              <img src="/images/book/book_image.png" alt="Why Luxury Homes Don't Sell" style={{ width: '100%', display: 'block', transform: 'translateX(-20px)', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.25))' }} />
            </FadeIn>
            <FadeIn delay={100}>
              <div style={{ background: S.gold, padding: '1.4rem 2rem', marginBottom: '1.8rem' }}>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)' }}>The Book by</p>
                <p style={{ fontWeight: 700, fontSize: '1.4rem', color: '#fff' }}>Raamesh Singhal</p>
              </div>
              <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '2rem', color: S.gold, lineHeight: 0 }}>&ldquo;</span>
              <h3 style={{ ...serifHeading, fontStyle: 'italic', fontSize: '1.6rem', color: S.gold, marginBottom: '0.4rem' }}>Why Luxury Homes Don't Sell:</h3>
              <p style={{ fontWeight: 700, fontSize: '1rem', color: S.black, marginBottom: '1.2rem' }}>The Blind Spot Costing Developers Crores</p>
              <p style={{ fontSize: '0.9rem', color: S.mid, lineHeight: 1.8, marginBottom: '1.6rem', maxWidth: 460 }}>
                It's not the market. It's the misunderstanding. Drawing on three decades of building luxury spaces, Raamesh Singhal uncovers the blind spots costing developers crores — and lays out what it actually takes to design projects that sell faster, at better value.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem 2rem', marginBottom: '1.8rem' }}>
                {['Uncover the blind spots in your projects', "Understand what today's premium buyer truly desires", 'Design, position & communicate for maximum desire', 'Create projects that sell faster, at better value'].map((pt, i) => (
                  <p key={i} style={{ fontSize: '0.8rem', color: S.mid }}><span style={{ color: S.gold }}>✓</span> {pt}</p>
                ))}
              </div>
              <button onClick={() => scrollToId('contact')} style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: '0.85rem', padding: '0.8rem 1.8rem', background: S.gold, color: '#fff', border: 'none', borderRadius: 999, cursor: 'pointer' }}>Buy Now →</button>
            </FadeIn>
          </div>
        </div>
      </section>

      <section id="testimonials" style={{ background: S.paper, padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeIn>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.78rem', letterSpacing: '0.2em', color: S.mid, textAlign: 'center', marginBottom: '0.8rem' }}>CLIENT'S TESTIMONIALS</p>
            <h2 style={{ fontWeight: 800, fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(1.3rem,2.6vw,1.9rem)', color: S.black, textAlign: 'center', marginBottom: '3rem', textTransform: 'uppercase' }}>
              Heard From Those Who <em style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', textTransform: 'none' }}>Lived Our Work</em>
            </h2>
          </FadeIn>

          <div className="testimonial-wrapper" style={{ position: 'relative', marginBottom: '3rem' }}>
            <div className="testimonial-scroll" style={{ display: 'flex', gap: '1.2rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              {testimonials.map((t, i) => (
                <div key={i} style={{ flexShrink: 0, width: 320, background: S.gold, borderRadius: 8, padding: '1.4rem', display: 'flex', gap: '1rem' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 8, background: '#000', flexShrink: 0 }} />
                  <div>
                    <p style={{ color: '#FFD98E', fontSize: '0.8rem', marginBottom: '0.4rem' }}>★★★★★</p>
                    <p style={{ fontSize: '0.78rem', color: '#fff', lineHeight: 1.55, marginBottom: '0.6rem' }}>{t.text.slice(0, 150)}{t.text.length > 150 ? '…' : ''}</p>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.85)', textAlign: 'right' }}>-{t.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ width: '100%', height: 1, background: S.line, marginBottom: '2.5rem' }} />

          <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.4rem', maxWidth: 800, margin: '0 auto' }}>
            {videoTestimonials.map((v, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', background: '#000', cursor: v.placeholder ? 'default' : (playingVideo === i ? 'default' : 'pointer') }} onClick={() => { if (!v.placeholder && playingVideo !== i) setPlayingVideo(i) }}>
                  {!v.placeholder && (
                    <video src={v.video} muted={playingVideo !== i} controls={playingVideo === i} autoPlay={playingVideo === i} playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  )}
                  {(v.placeholder || playingVideo !== i) && (
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}>
                      <div style={{ width: 66, height: 66, borderRadius: '50%', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: v.placeholder ? 0.5 : 1 }}>
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="#fff"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                      {v.placeholder && <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.05em' }}>Video coming soon</p>}
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" style={{ background: S.cream, padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <FadeIn><h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 'clamp(3.6rem,8vw,5.6rem)', color: S.black, letterSpacing: '0.06em' }}>CONTACT</h2></FadeIn>
            <FadeIn delay={100}><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '1.1rem', color: S.mid, textAlign: 'right' }}>Lets discuss your next<br />Project together</p></FadeIn>
          </div>
          <div style={{ width: '100%', height: 1, background: S.line, marginBottom: '2.5rem' }} />

          <div className="contact-grid" style={{ display: 'flex', gap: '3rem' }}>
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              {contactInfo.map((item, i) => (
                <FadeIn key={i} delay={i * 80}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1.5rem', padding: '1.2rem 0' }}>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: '1.05rem', color: S.black, minWidth: 100 }}>{item.label}</p>
                    {item.href ? <a href={item.href} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '1.05rem', color: S.gold, textDecoration: 'none', textAlign: 'right' }}>{item.value}</a> : <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '1.05rem', color: S.mid, textAlign: 'right' }}>{item.value}</p>}
                  </div>
                </FadeIn>
              ))}
              <FadeIn delay={200} style={{ flex: 1, marginTop: '1.5rem' }}>
                <div style={{ position: 'relative', height: '100%', minHeight: 220, overflow: 'hidden', borderRadius: 12, border: `1px solid ${S.line}` }}>
                  <iframe src="https://maps.google.com/maps?q=Time+Square+Sevoke+Road+Siliguri&t=m&z=15&output=embed&iwloc=near" title="Location" width="100%" height="100%" style={{ border: 'none', display: 'block' }} loading="lazy" />
                  <a href="https://maps.google.com/?q=Time+Square+Sevoke+Road+Siliguri" target="_blank" rel="noreferrer" style={{ position: 'absolute', top: '0.8rem', left: '0.8rem', background: '#fff', padding: '0.5rem 1rem', borderRadius: 999, fontSize: '0.85rem', color: S.ink, textDecoration: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>Open in Map ↗</a>
                </div>
              </FadeIn>
            </div>
            <FadeIn delay={150} style={{ flex: 1, minWidth: 0 }}>
              <div style={{ background: S.paper, borderRadius: 12, padding: '2rem', border: `1px solid ${S.line}`, boxShadow: '0 4px 20px rgba(0,0,0,0.03)', height: '100%', boxSizing: 'border-box' }}>
                {status === 'sent' ? (
                  <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                    <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.6rem', color: S.gold, marginBottom: '0.8rem' }}>Thank you</p>
                    <p style={{ fontSize: '0.9rem', color: S.mid }}>Your message has been received. We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', fontSize: '0.9rem', color: S.mid, marginBottom: '0.4rem' }}>Name</label>
                      <input value={form.firstName} onChange={set('firstName')} onFocus={() => focusField('firstName')} onBlur={() => blurField('firstName')} style={inputStyle(focused.firstName)} />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', fontSize: '0.9rem', color: S.mid, marginBottom: '0.4rem' }}>Email</label>
                      <input type="email" value={form.email} onChange={set('email')} onFocus={() => focusField('email')} onBlur={() => blurField('email')} style={inputStyle(focused.email)} />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', fontSize: '0.9rem', color: S.mid, marginBottom: '0.4rem' }}>Phone</label>
                      <input type="tel" value={form.phone} onChange={set('phone')} onFocus={() => focusField('phone')} onBlur={() => blurField('phone')} style={inputStyle(focused.phone)} />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', fontSize: '0.9rem', color: S.mid, marginBottom: '0.4rem' }}>Service Required</label>
                      <select value={form.service} onChange={set('service')} onFocus={() => focusField('service')} onBlur={() => blurField('service')} style={{ ...inputStyle(focused.service), appearance: 'none', cursor: 'pointer' }}>
                        <option value="">Select a service...</option>
                        {['Residential Interior Design', 'Architecture', 'Hospitality Design', 'Commercial / Retail', 'Vedic Vastu Consultation', 'Other'].map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                    <div style={{ marginBottom: '1.4rem' }}>
                      <label style={{ display: 'block', fontSize: '0.9rem', color: S.mid, marginBottom: '0.4rem' }}>Message</label>
                      <textarea rows={4} value={form.message} onChange={set('message')} onFocus={() => focusField('message')} onBlur={() => blurField('message')} style={{ ...inputStyle(focused.message), resize: 'vertical' }} />
                    </div>
                    <button type="submit" disabled={status === 'sending'} style={{ padding: '0.85rem 2.2rem', background: S.gold, color: '#fff', border: 'none', borderRadius: 6, cursor: status === 'sending' ? 'not-allowed' : 'pointer', fontWeight: 600, fontSize: '1rem' }}>
                      {status === 'sending' ? 'Sending...' : 'Submit'}
                    </button>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {selectedPress && (
        <div onClick={() => setSelectedPress(null)} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(20,20,18,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div onClick={e => e.stopPropagation()} className="project-modal-grid" style={{ background: '#fff', maxWidth: 900, width: '100%', maxHeight: '90vh', overflow: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', position: 'relative', borderRadius: 8 }}>
            <button onClick={() => setSelectedPress(null)} style={{ position: 'absolute', top: '1rem', right: '1rem', width: 36, height: 36, background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', cursor: 'pointer', color: '#fff', fontSize: '1rem' }}>&#10005;</button>
            <div style={{ background: '#F2F0EB', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
              <img src={selectedPress.img} alt={selectedPress.title} style={{ maxWidth: '100%', maxHeight: 400, objectFit: 'contain' }} />
            </div>
            <div style={{ padding: '2.5rem' }}>
              <p style={{ fontSize: '0.75rem', color: S.gold, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>{selectedPress.type}</p>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.35rem', color: S.black, marginBottom: '0.6rem' }}>{selectedPress.title}</h2>
              <p style={{ fontSize: '0.8rem', color: S.mid, marginBottom: '1.4rem' }}>{selectedPress.org}</p>
              <p style={{ fontSize: '0.9rem', color: S.mid, lineHeight: 1.8 }}>{selectedPress.desc}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}