import { useState, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import projects from '../data/projects'
import testimonials from '../data/testimonials'

const heroSlides = [
    { img: "http://raameshsinghaldesign.com/wp-content/uploads/2023/01/v7_11zon.jpg", label: "The Luxury Lounge" },
    { img: "http://raameshsinghaldesign.com/wp-content/uploads/2023/04/The-Unruffled.jpg", label: "The Unruffled" },
    { img: "http://raameshsinghaldesign.com/wp-content/uploads/2023/01/v2-12_11zon.jpg", label: "Imperial Drawing Room" },
]

const services = [
    { num: "01", title: "Architecture", desc: "From structural layout to MEP coordination — complete architecture services including exterior and landscape design.", icon: (<svg viewBox="0 0 36 36" fill="none" stroke="#C9A96E" strokeWidth="1.2" width="36" height="36"><polyline points="2 34 18 6 34 34" /><line x1="7" y1="24" x2="29" y2="24" /></svg>) },
    { num: "02", title: "Interior Design", desc: "Color schemes, furniture curation, space planning and full implementation — tailored to your lifestyle.", icon: (<svg viewBox="0 0 36 36" fill="none" stroke="#C9A96E" strokeWidth="1.2" width="36" height="36"><rect x="3" y="8" width="30" height="22" rx="1" /><line x1="3" y1="15" x2="33" y2="15" /><line x1="16" y1="15" x2="16" y2="30" /></svg>) },
    { num: "03", title: "Vedic Vastu", desc: "Modern Vastu Shastra applied practically — simple, effective remedies to bring harmony to your environment.", icon: (<svg viewBox="0 0 36 36" fill="none" stroke="#C9A96E" strokeWidth="1.2" width="36" height="36"><circle cx="18" cy="18" r="14" /><line x1="18" y1="4" x2="18" y2="32" /><line x1="4" y1="18" x2="32" y2="18" /><circle cx="18" cy="18" r="4" /></svg>) },
    { num: "04", title: "Hospitality Design", desc: "Hotels, resorts and restaurants designed to deliver exceptional guest experiences.", icon: (<svg viewBox="0 0 36 36" fill="none" stroke="#C9A96E" strokeWidth="1.2" width="36" height="36"><path d="M4 30 V14 L18 4 L32 14 V30" /><rect x="13" y="20" width="10" height="10" /><line x1="4" y1="30" x2="32" y2="30" /></svg>) },
    { num: "05", title: "Commercial & Retail", desc: "Offices, showrooms and retail environments that reinforce your brand.", icon: (<svg viewBox="0 0 36 36" fill="none" stroke="#C9A96E" strokeWidth="1.2" width="36" height="36"><rect x="4" y="10" width="28" height="22" /><rect x="10" y="4" width="16" height="6" /><line x1="4" y1="20" x2="32" y2="20" /><line x1="14" y1="20" x2="14" y2="32" /><line x1="22" y1="20" x2="22" y2="32" /></svg>) },
    { num: "06", title: "Design Consultation", desc: "Expert direction on any design challenge — big or small — without committing to a full project.", icon: (<svg viewBox="0 0 36 36" fill="none" stroke="#C9A96E" strokeWidth="1.2" width="36" height="36"><path d="M6 8 H30 V24 H20 L14 30 V24 H6 Z" /><line x1="12" y1="14" x2="24" y2="14" /><line x1="12" y1="19" x2="20" y2="19" /></svg>) },
]

const areaList = [
    "High-End Bungalows",
    "Hospitality Architecture & Interior Design",
    "Office Building & Interior Design",
    "Casual Dining Concepts",
    "Restaurant Interior Design",
    "Retail Store Interior Design",
]

const whyUs = [
    { num: '01', title: 'Experience', desc: 'With over 27+ years of experience, Raamesh Singhal Designs is at the pinnacle of the designing sector in North East India.' },
    { num: '02', title: 'Superior Quality', desc: 'Committed to delivering premium and top-notch services for every client, every time.' },
    { num: '03', title: 'Individualism', desc: 'We stand out due to our distinctive designs, personalised approaches and exceptional customer interactions.' },
    { num: '04', title: 'Trend Awareness', desc: 'We keep a close watch on prominent design publications to discover what trends are gaining momentum.' },
]

const contactInfo = [
    { label: 'Address', value: 'Time Square, 3rd Floor, Opp Ravi Auto, Sevoke Road, Siliguri', href: null },
    { label: 'Phone', value: '+91 98008 48155', href: 'tel:+919800848155' },
    { label: 'Phone', value: '+91 82508 41773', href: 'tel:+918250841773' },
    { label: 'Email', value: 'rameshsinghaldesign@gmail.com', href: 'mailto:rameshsinghaldesign@gmail.com' },
    { label: 'Hours', value: 'Mon-Fri: 9:00-22:00  |  Saturday: 11:00-20:00', href: null },
]

function SectionDivider({ label }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '0 2rem', maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(201,169,110,0.25)' }} />
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.65rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C9A96E', whiteSpace: 'nowrap' }}>
                {label}
            </p>
            <div style={{ flex: 1, height: 1, background: 'rgba(201,169,110,0.25)' }} />
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
    const [selectedProject, setSelectedProject] = useState(null)
    const [slide, setSlide] = useState(0)
    const [tIndex, setTIndex] = useState(0)
    const [filter, setFilter] = useState('all')
    const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', email: '', service: '', message: '' })
    const [status, setStatus] = useState('idle')
    const [focused, setFocused] = useState({})
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
    const years = useCounter(27, statsInView)
    const projs = useCounter(500, statsInView)
    const repeat = useCounter(90, statsInView)
    const types = useCounter(6, statsInView)

    const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter)
    const preview = filtered.slice(0, 30)

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
            <section id="hero" style={{ height: '100svh', position: 'relative', overflow: 'hidden' }}>
                {heroSlides.map((s, i) => (
                    <div key={i} style={{ position: 'absolute', inset: 0, backgroundImage: `url(${s.img})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: slide === i ? 1 : 0, transition: 'opacity 1.4s ease' }}>
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,26,24,0.85) 0%, rgba(26,26,24,0.55) 50%, rgba(26,26,24,0.3) 100%)' }} />
                    </div>
                ))}
                <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(0px,5vw,2.5rem) clamp(1rem,5vw,2.5rem) clamp(3rem,8vw,5rem)' }}>
                    <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: S.gold, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
                        <span style={{ display: 'block', width: 36, height: 1, background: S.gold }} />
                        Established 1995 &nbsp;·&nbsp; Siliguri, India
                    </p>
                    <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2.4rem,7vw,5.5rem)', fontWeight: 400, lineHeight: 1.08, color: S.offwhite, marginBottom: '1.5rem' }}>
                        Where <em style={{ fontStyle: 'italic', color: S.stone }}>space</em><br />becomes story
                    </h1>
                    <p style={{ fontSize: 'clamp(0.85rem,2vw,0.95rem)', color: 'rgba(255,255,255,0.92)', maxWidth: 480, marginBottom: '2rem', lineHeight: 1.7 }}>
                        Architecture and interiors crafted with precision, purpose, and a deep respect for the way people live.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <a href="#portfolio" onClick={e => { e.preventDefault(); document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' }) }}
                            style={{ fontFamily: "'DM Mono',monospace", fontSize: 'clamp(0.68rem,2vw,0.78rem)', letterSpacing: '0.14em', textTransform: 'uppercase', padding: 'clamp(0.7rem,2vw,0.9rem) clamp(1.4rem,3vw,2.2rem)', background: S.gold, color: S.ink, textDecoration: 'none', fontWeight: 500, transition: 'background 0.3s', cursor: 'pointer' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#b8923d'}
                            onMouseLeave={e => e.currentTarget.style.background = S.gold}>
                            View Projects
                        </a>
                        <a href="#contact" onClick={e => { e.preventDefault(); document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }) }}
                            style={{ fontFamily: "'DM Mono',monospace", fontSize: 'clamp(0.68rem,2vw,0.78rem)', letterSpacing: '0.14em', textTransform: 'uppercase', padding: 'clamp(0.7rem,2vw,0.9rem) clamp(1.4rem,3vw,2.2rem)', border: '1px solid rgba(232,224,208,0.45)', color: S.stone, textDecoration: 'none', transition: 'all 0.3s', cursor: 'pointer' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = S.gold; e.currentTarget.style.color = S.gold }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(232,224,208,0.45)'; e.currentTarget.style.color = S.stone }}>
                            Start a Project
                        </a>
                    </div>
                </div>
                <div style={{ position: 'absolute', right: '1.5rem', bottom: '3rem', zIndex: 3, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {heroSlides.map((_, i) => (
                        <button key={i} onClick={() => goToSlide(i)}
                            style={{ width: 6, height: 6, borderRadius: '50%', border: 'none', cursor: 'pointer', padding: 0, background: slide === i ? S.gold : 'rgba(232,224,208,0.35)', transform: slide === i ? 'scale(1.4)' : 'scale(1)', transition: 'all 0.3s' }} />
                    ))}
                </div>
            </section>

            {/* ── STATS ── */}
            <section ref={statsRef} style={{ background: '#F0EBE3', padding: '4rem 0' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
                    <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '2rem', textAlign: 'center' }}>
                        {[
                            { num: years, suffix: '+', label: 'Years of Experience' },
                            { num: projs, suffix: '+', label: 'Projects Completed' },
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

            {/* ── SECTION DIVIDER ── */}
            <SectionDivider label="About Us" />

            {/* ── ABOUT ── */}
            <section id="about" style={{ padding: '7rem 0', background: S.offwhite }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
                    <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
                        <FadeIn>
                            <div style={{ position: 'relative' }}>
                                <img src="http://raameshsinghaldesign.com/wp-content/uploads/2023/01/RSD-13-1024x767.jpg" alt="About RSD" loading="lazy" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
                                <div style={{ position: 'absolute', bottom: '-1.2rem', right: '-1.2rem', width: '65%', height: '65%', border: '1px solid #C9A96E', zIndex: -1 }} />
                                <div style={{ position: 'absolute', top: '1.5rem', left: '-1.5rem', background: S.ink, padding: '1.2rem 1.6rem', textAlign: 'center' }}>
                                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '2rem', color: S.gold, lineHeight: 1 }}>27+</div>
                                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: S.sage, marginTop: '0.3rem' }}>Years</div>
                                </div>
                            </div>
                        </FadeIn>
                        <FadeIn delay={150}>
                            <span className="gold-rule" />
                            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: S.gold, marginBottom: '1rem' }}>About the Practice</p>
                            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.9rem,4vw,2.8rem)', fontWeight: 400, lineHeight: 1.2, color: S.ink, marginBottom: '1.5rem' }}>
                                Let us help you create<br />the home of your <em>dreams</em>
                            </h2>
                            <p style={{ fontSize: '0.95rem', color: S.mid, lineHeight: 1.85, marginBottom: '1rem' }}>
                                Established in 1995, Raamesh Singhal Design is an Architect and Interior Design Company based in Siliguri. We have designed apartments, bungalows, hotels, resorts, offices, showrooms, schools, hospitals and leisure centres.
                            </p>
                            <p style={{ fontSize: '0.95rem', color: S.mid, lineHeight: 1.85, marginBottom: '2rem' }}>
                                With a keen eye for detail and a passion for design, we specialise in creating bespoke interiors and architecture that seamlessly blend style and functionality.
                            </p>
                            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                                <div>
                                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '2rem', color: S.gold }}>500+</div>
                                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: S.mid }}>Projects Completed</div>
                                </div>
                                <div style={{ width: 1, background: 'rgba(26,26,24,0.1)' }} />
                                <div>
                                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '2rem', color: S.gold }}>90%</div>
                                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: S.mid }}>Repeat & Referral</div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>

                    {/* How We Work */}
                    <div style={{ marginTop: '5rem' }}>
                        <FadeIn>
                            <span className="gold-rule" />
                            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: S.gold, marginBottom: '0.8rem' }}>Our Process</p>
                            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.9rem,4vw,2.8rem)', fontWeight: 400, color: S.ink, marginBottom: '3rem' }}>How We <em>Work</em></h2>
                        </FadeIn>
                        <div className="process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
                            {[
                                { num: '01', title: 'Concept & Design', desc: 'The artistic process begins with concept generation. Architectural blueprints developed while considering finishes, designs, and styles.' },
                                { num: '02', title: 'Selection & Layout', desc: 'Finalising interior layouts and selecting finishes and materials for flooring, walls, furniture and fittings.' },
                                { num: '03', title: 'Execution', desc: 'We ensure a faultless and prompt execution of your space — delivered on time and to specification.' },
                            ].map((step, i) => (
                                <FadeIn key={i} delay={i * 100}>
                                    <div style={{ padding: '2.5rem', background: '#fff', border: '1px solid rgba(26,26,24,0.08)', borderTop: '2px solid transparent', transition: 'border-color 0.3s, box-shadow 0.3s' }}
                                        onMouseEnter={e => { e.currentTarget.style.borderTopColor = S.gold; e.currentTarget.style.boxShadow = '0 4px 24px rgba(201,169,110,0.1)' }}
                                        onMouseLeave={e => { e.currentTarget.style.borderTopColor = 'transparent'; e.currentTarget.style.boxShadow = 'none' }}>
                                        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '3rem', color: S.gold, opacity: 0.25, lineHeight: 1, marginBottom: '1rem', fontWeight: 700 }}>{step.num}</div>
                                        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.2rem', color: S.ink, marginBottom: '0.8rem', fontWeight: 600 }}>{step.title}</h3>
                                        <p style={{ fontSize: '0.9rem', color: S.mid, lineHeight: 1.8 }}>{step.desc}</p>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>

                    {/* Why Choose Us */}
                    <div style={{ marginTop: '5rem' }}>
                        <FadeIn>
                            <span className="gold-rule" />
                            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: S.gold, marginBottom: '0.8rem' }}>Our Strengths</p>
                            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.9rem,4vw,2.8rem)', fontWeight: 400, color: S.ink, marginBottom: '3rem' }}>Why Choose <em>Us?</em></h2>
                        </FadeIn>
                        <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            {whyUs.map((item, i) => (
                                <FadeIn key={i} delay={i * 80}>
                                    <div style={{ display: 'flex', gap: '1.5rem', padding: '2rem', border: '1px solid rgba(26,26,24,0.08)', background: '#fff', transition: 'border-color 0.3s, box-shadow 0.3s' }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = S.gold; e.currentTarget.style.boxShadow = '0 4px 24px rgba(201,169,110,0.1)' }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(26,26,24,0.08)'; e.currentTarget.style.boxShadow = 'none' }}>
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
                </div>
            </section>

            {/* ── SECTION DIVIDER ── */}
            <SectionDivider label="Our Services" />

            {/* ── SERVICES ── */}
            <section id="services" style={{ background: '#F0EBE3', padding: '7rem 0' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
                    <FadeIn>
                        <span className="gold-rule" />
                        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: S.gold, marginBottom: '0.8rem' }}>What We Do</p>
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.9rem,4vw,2.8rem)', fontWeight: 400, color: S.ink, marginBottom: '3.5rem' }}>
                            A complete range of <em>design services</em>
                        </h2>
                    </FadeIn>
                    <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
                        {services.map((svc, i) => (
                            <FadeIn key={i} delay={i * 80}>
                                <div style={{ background: '#fff', padding: '2.5rem', borderBottom: '2px solid transparent', transition: 'border-color 0.3s, box-shadow 0.3s', cursor: 'default', height: '100%' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = S.gold; e.currentTarget.style.boxShadow = '0 4px 24px rgba(201,169,110,0.1)' }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.boxShadow = 'none' }}>
                                    <div style={{ marginBottom: '1.5rem' }}>{svc.icon}</div>
                                    <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.6rem', letterSpacing: '0.16em', color: S.gold, marginBottom: '0.6rem', textTransform: 'uppercase' }}>{svc.num}</p>
                                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.2rem', color: S.ink, marginBottom: '0.8rem', fontWeight: 400 }}>{svc.title}</h3>
                                    <p style={{ fontSize: '0.88rem', color: S.mid, lineHeight: 1.75 }}>{svc.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>

                    {/* Areas */}
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

            {/* ── SECTION DIVIDER ── */}
            <SectionDivider label="Our Projects" />

            {/* ── PORTFOLIO ── */}
            <section id="portfolio" style={{ padding: '7rem 0', background: S.offwhite }}>
                <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <FadeIn>
                            <span className="gold-rule" />
                            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: S.gold, marginBottom: '0.5rem' }}>Portfolio</p>
                            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.9rem,4vw,2.8rem)', fontWeight: 400, color: S.ink }}>Our Recent <em>Projects</em></h2>
                        </FadeIn>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0' }}>
                            {['all', 'residential', 'commercial', 'architecture'].map((f, i, arr) => (
                                <button key={f} onClick={() => setFilter(f)}
                                    style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.55rem 1.1rem', border: '1px solid rgba(26,26,24,0.15)', borderRight: i < arr.length - 1 ? 'none' : '1px solid rgba(26,26,24,0.15)', cursor: 'pointer', background: filter === f ? S.ink : 'transparent', color: filter === f ? S.gold : S.mid, transition: 'all 0.25s' }}>
                                    {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="portfolio-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5px' }}>
                        {preview.map((p, i) => (
                            <FadeIn key={p.id} delay={(i % 9) * 60}>
                                <div
                                    onClick={() => setSelectedProject(p)}
                                    style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/3', background: '#d0c8b8', cursor: 'pointer' }}
                                    onMouseEnter={e => { e.currentTarget.querySelector('img').style.transform = 'scale(1.06)'; e.currentTarget.querySelector('.ov').style.opacity = '1' }}
                                    onMouseLeave={e => { e.currentTarget.querySelector('img').style.transform = 'scale(1)'; e.currentTarget.querySelector('.ov').style.opacity = '0' }}>
                                    <img src={p.img} alt={p.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', display: 'block' }} />
                                    <div className="ov" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(26,26,24,0.8) 0%,transparent 55%)', opacity: 0, transition: 'opacity 0.3s', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.5rem' }}>
                                        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: S.gold, marginBottom: '0.3rem' }}>{p.category}</span>
                                        <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '1rem', color: S.offwhite }}>{p.title}</p>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <button
                            onClick={() => document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' })}
                            style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '0.9rem 2.2rem', border: `1px solid ${S.gold}`, color: S.gold, background: 'transparent', cursor: 'pointer', transition: 'all 0.3s' }}
                            onMouseEnter={e => { e.currentTarget.style.background = S.gold; e.currentTarget.style.color = S.ink }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = S.gold }}>
                            View All Projects
                        </button>
                    </div>
                </div>
            </section>

            
            {/* ── SECTION DIVIDER ── */}
            <SectionDivider label="Testimonials" />

            {/* ── TESTIMONIALS ── */}
            <section id="testimonials" style={{ background: '#F0EBE3', padding: '7rem 0' }}>
                <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 2rem' }}>
                    <FadeIn>
                        <span className="gold-rule" />
                        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: S.gold, marginBottom: '0.5rem' }}>Testimonials</p>
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.9rem,4vw,2.8rem)', fontWeight: 400, color: S.ink, marginBottom: '3rem' }}>
                            Heard from those who <em>lived</em> our work
                        </h2>
                    </FadeIn>

                    <div className="testimonial-wrapper" style={{ position: 'relative', padding: '0 2.5rem' }}>
                        {/* Left arrow */}
                        <button
                            className="t-arrow-left"
                            onClick={() => setTIndex(i => (i - 1 + testimonials.length) % testimonials.length)}
                            style={{ position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '2.5rem', color: 'rgba(26,26,24,0.4)', transition: 'color 0.25s', lineHeight: 1, padding: 0, zIndex: 2 }}
                            onMouseEnter={e => e.currentTarget.style.color = S.ink}
                            onMouseLeave={e => e.currentTarget.style.color = 'rgba(26,26,24,0.4)'}>
                            &#8249;
                        </button>

                        {/* Card */}
                        <div className="t-card" style={{ background: '#fff', padding: '2.5rem', borderLeft: `2px solid ${S.gold}` }}>
                            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(0.95rem,2vw,1.1rem)', fontStyle: 'italic', color: S.ink, lineHeight: 1.8, marginBottom: '1.5rem', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                                <span style={{ fontSize: '2rem', color: S.gold, lineHeight: 0, verticalAlign: '-0.4rem', marginRight: '0.2rem' }}>"</span>
                                {testimonials[tIndex].text}
                            </p>
                            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: S.gold }}>
                                — {testimonials[tIndex].name}
                            </p>
                        </div>

                        {/* Right arrow */}
                        <button
                            className="t-arrow-right"
                            onClick={() => setTIndex(i => (i + 1) % testimonials.length)}
                            style={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '2.5rem', color: 'rgba(26,26,24,0.4)', transition: 'color 0.25s', lineHeight: 1, padding: 0, zIndex: 2 }}
                            onMouseEnter={e => e.currentTarget.style.color = S.ink}
                            onMouseLeave={e => e.currentTarget.style.color = 'rgba(26,26,24,0.4)'}>
                            &#8250;
                        </button>
                    </div>

                    {/* Dots */}
                    <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.5rem', justifyContent: 'center' }}>
                        {testimonials.map((_, i) => (
                            <button key={i} onClick={() => setTIndex(i)}
                                style={{ width: 8, height: 8, borderRadius: '50%', border: 'none', cursor: 'pointer', padding: 0, background: tIndex === i ? S.gold : 'rgba(201,169,110,0.25)', transform: tIndex === i ? 'scale(1.3)' : 'scale(1)', transition: 'all 0.3s' }} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SECTION DIVIDER ── */}
            <SectionDivider label="Contact Us" />

            {/* ── CONTACT ── */}
            <section id="contact" style={{ padding: '7rem 0', background: S.offwhite }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
                    <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '5rem', alignItems: 'start' }}>
                        <div>
                            <FadeIn>
                                <span className="gold-rule" />
                                <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: S.gold, marginBottom: '0.8rem' }}>Get In Touch</p>
                                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.8rem,3.5vw,2.4rem)', fontWeight: 400, color: S.ink, lineHeight: 1.2, marginBottom: '2.5rem' }}>
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
            <section style={{ background: S.gold, padding: '5rem 0', textAlign: 'center' }}>
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
                            Book Appointment
                        </a>
                    </FadeIn>
                </div>
            </section>
            {/* ── PROJECT MODAL ── */}
            {selectedProject && (
                <div
                    onClick={() => setSelectedProject(null)}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 200,
                        background: 'rgba(26,26,24,0.92)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: '1.5rem',
                        backdropFilter: 'blur(6px)',
                    }}>
                    <div
                        className="project-modal-grid"
                        onClick={e => e.stopPropagation()}
                        style={{
                            background: '#fff',
                            maxWidth: 900, width: '100%',
                            maxHeight: '90vh',
                            overflow: 'auto',
                            display: 'grid',
                            gridTemplateColumns: '1.2fr 1fr',
                            position: 'relative',
                        }}>

                        {/* Close button */}
                        <button
                            onClick={() => setSelectedProject(null)}
                            style={{
                                position: 'absolute', top: '1rem', right: '1rem',
                                width: 36, height: 36,
                                background: 'rgba(26,26,24,0.7)',
                                border: 'none', cursor: 'pointer',
                                color: '#fff', fontSize: '1.1rem',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                zIndex: 10,
                                transition: 'background 0.2s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = '#1A1A18'}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(26,26,24,0.7)'}>
                            &#10005;
                        </button>

                        {/* Image */}
                        <div style={{ position: 'relative', minHeight: 320 }}>
                            <img
                                src={selectedProject.img}
                                alt={selectedProject.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                            />
                        </div>

                        {/* Details */}
                        <div style={{ padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <span style={{
                                fontFamily: "'DM Mono',monospace",
                                fontSize: '0.65rem', letterSpacing: '0.18em',
                                textTransform: 'uppercase', color: S.gold,
                                marginBottom: '0.8rem', display: 'block',
                            }}>
                                {selectedProject.category}
                            </span>
                            <h2 style={{
                                fontFamily: "'Playfair Display',serif",
                                fontSize: 'clamp(1.4rem,3vw,2rem)',
                                fontWeight: 400, color: S.ink,
                                lineHeight: 1.2, marginBottom: '1.5rem',
                            }}>
                                {selectedProject.title}
                            </h2>
                            <div style={{ width: 40, height: 1, background: S.gold, marginBottom: '1.5rem' }} />
                            <p style={{
                                fontSize: '0.92rem', color: S.mid,
                                lineHeight: 1.85, marginBottom: '2rem',
                            }}>
                                {selectedProject.desc}
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: S.gold }}>Type</span>
                                    <span style={{ fontSize: '0.88rem', color: S.ink, textTransform: 'capitalize' }}>{selectedProject.category}</span>
                                </div>
                                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: S.gold }}>Studio</span>
                                    <span style={{ fontSize: '0.88rem', color: S.ink }}>Raamesh Singhal Design</span>
                                </div>
                                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: S.gold }}>Location</span>
                                    <span style={{ fontSize: '0.88rem', color: S.ink }}>Siliguri, India</span>
                                </div>
                            </div>

                            <button
                                onClick={() => { setSelectedProject(null); document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }) }}
                                style={{ marginTop: '2rem', fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '0.85rem 1.8rem', background: S.gold, color: S.ink, border: 'none', cursor: 'pointer', transition: 'background 0.3s', alignSelf: 'flex-start' }}
                                onMouseEnter={e => e.currentTarget.style.background = '#b8923d'}
                                onMouseLeave={e => e.currentTarget.style.background = S.gold}>
                                Enquire About This Project
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}