import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'

function FadeIn({ children, delay = 0, className = '' }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(28px)',
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

const whyUs = [
  { num: '01', title: 'Experience',        desc: 'With over 27+ years of experience, Raamesh Singhal Designs is at the pinnacle of the designing sector in North East India.' },
  { num: '02', title: 'Superior Quality',  desc: 'Raamesh Singhal Designs is committed to delivering premium and top-notch services for every client, every time.' },
  { num: '03', title: 'Individualism',     desc: 'We stand out due to our distinctive designs, personalised approaches and exceptional customer interactions.' },
  { num: '04', title: 'Trend Awareness',   desc: 'We keep a close watch on prominent design publications and websites to discover what trends are gaining momentum.' },
]

const process = [
  { num: '01', title: 'Experience',    desc: 'The artistic process begins with concept generation. Architectural blueprints are developed while considering finishes, designs, and styles.' },
  { num: '02', title: 'Superior',      desc: 'This stage involves finalising interior layouts and selecting finishes and materials for flooring, walls, and furniture.' },
  { num: '03', title: 'Individualism', desc: 'We ensure a faultless and prompt execution of your space — delivered on time, to specification.' },
]

const galleryImgs = [
  "http://raameshsinghaldesign.com/wp-content/uploads/2023/01/RSD-13-1024x767.jpg",
  "http://raameshsinghaldesign.com/wp-content/uploads/2023/01/RSD-19-1024x768.jpg",
  "http://raameshsinghaldesign.com/wp-content/uploads/2023/01/RSD-11-1024x767.jpg",
  "http://raameshsinghaldesign.com/wp-content/uploads/2023/01/RSD-7-1024x767.jpg",
  "http://raameshsinghaldesign.com/wp-content/uploads/2023/01/RSD-5-1024x767.jpg",
]

const S = {
  gold:     '#C9A96E',
  ink:      '#1A1A18',
  offwhite: '#F7F4EF',
  stone:    '#E8E0D0',
  sage:     '#8A9B8E',
  mid:      '#6B6860',
}

export default function About() {
  return (
    <>
      {/* ── PAGE HERO ── */}
      <section style={{
        background: S.ink, paddingTop: 68,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: 320, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url('http://raameshsinghaldesign.com/wp-content/uploads/2023/01/RSD-19-1024x768.jpg')",
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.25,
        }}/>
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '4rem 2rem' }}>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: S.gold, marginBottom: '1rem' }}>
            Who We Are
          </p>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2.4rem,6vw,4rem)', fontWeight: 400, color: S.offwhite, lineHeight: 1.1 }}>
            About <em style={{ fontStyle: 'italic', color: S.stone }}>Us</em>
          </h1>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section style={{ padding: '7rem 0', background: S.offwhite }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
          <FadeIn>
            <div style={{ position: 'relative' }}>
              <img
                src="http://raameshsinghaldesign.com/wp-content/uploads/2023/01/RSD-13-1024x767.jpg"
                alt="About Raamesh Singhal Design"
                loading="lazy"
                style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }}
              />
              {/* Accent border */}
              <div style={{ position: 'absolute', bottom: '-1.2rem', right: '-1.2rem', width: '65%', height: '65%', border: '1px solid #C9A96E', zIndex: -1 }}/>
              {/* Stats badge */}
              <div style={{ position: 'absolute', top: '1.5rem', left: '-1.5rem', background: S.ink, padding: '1.2rem 1.6rem', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '2rem', color: S.gold, lineHeight: 1 }}>27+</div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: S.sage, marginTop: '0.3rem' }}>Years</div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <span className="gold-rule"/>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: S.gold, marginBottom: '1rem' }}>
              Introduction
            </p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.9rem,4vw,2.8rem)', fontWeight: 400, lineHeight: 1.2, color: S.ink, marginBottom: '1.5rem' }}>
              Let us help you create<br/>the home of your <em>dreams</em>
            </h2>
            <p style={{ fontSize: '0.95rem', color: S.mid, lineHeight: 1.85, marginBottom: '1rem' }}>
              Established in 1995, Raamesh Singhal Design is an Architect and Interior Design Company based in Siliguri. We have designed a wide spectrum of projects — from apartments, bungalows, hotels, resorts, offices, showrooms, schools, hospitals and leisure centres.
            </p>
            <p style={{ fontSize: '0.95rem', color: S.mid, lineHeight: 1.85, marginBottom: '2rem' }}>
              With a keen eye for detail and a passion for design, we specialise in creating bespoke interiors and architecture that seamlessly blend style and functionality. Our team works closely with clients to understand their vision and translate it into stunning spaces that exceed expectations.
            </p>
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
              <div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '2rem', color: S.gold }}>500+</div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: S.mid }}>Projects Completed</div>
              </div>
              <div style={{ width: 1, background: 'rgba(26,26,24,0.1)' }}/>
              <div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '2rem', color: S.gold }}>90%</div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: S.mid }}>Repeat & Referral</div>
              </div>
            </div>
            <Link to="/contact"
              style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '0.9rem 2.2rem', background: S.gold, color: S.ink, textDecoration: 'none', display: 'inline-block', transition: 'background 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.background='#b8923d'}
              onMouseLeave={e => e.currentTarget.style.background=S.gold}>
              Book Appointment
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── HOW WE WORK ── */}
      <section style={{ background: '#F0EBE3', padding: '7rem 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <FadeIn>
            <span className="gold-rule"/>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: S.gold, marginBottom: '0.8rem' }}>Our Process</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.9rem,4vw,2.8rem)', fontWeight: 400, color: S.ink, marginBottom: '4rem' }}>
              How We <em>Work</em>
            </h2>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5px' }}>
            {process.map((step, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div style={{ background: '#fff', padding: '3rem 2.5rem', borderTop: '2px solid transparent', transition: 'border-color 0.3s', height: '100%' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = S.gold}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '3.5rem', color: S.gold, opacity: 0.3, lineHeight: 1, marginBottom: '1.5rem', fontWeight: 700 }}>
                    {step.num}
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.3rem', color: S.ink, marginBottom: '1rem', fontWeight: 400 }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: S.mid, lineHeight: 1.8 }}>{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section style={{ padding: '7rem 0', background: S.offwhite }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <FadeIn>
            <span className="gold-rule"/>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: S.gold, marginBottom: '0.8rem' }}>Our Strengths</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.9rem,4vw,2.8rem)', fontWeight: 400, color: S.ink, marginBottom: '3.5rem' }}>
              Why Choose <em>Us?</em>
            </h2>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {whyUs.map((item, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div style={{ display: 'flex', gap: '1.5rem', padding: '2rem', border: '1px solid rgba(26,26,24,0.08)', background: '#fff', transition: 'border-color 0.3s, box-shadow 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = S.gold; e.currentTarget.style.boxShadow = '0 4px 24px rgba(201,169,110,0.1)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(26,26,24,0.08)'; e.currentTarget.style.boxShadow = 'none' }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '2.2rem', color: S.gold, opacity: 0.4, lineHeight: 1, flexShrink: 0, fontWeight: 700 }}>
                    {item.num}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.15rem', color: S.ink, marginBottom: '0.6rem', fontWeight: 600 }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: S.mid, lineHeight: 1.8 }}>{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section style={{ padding: '7rem 0', background: S.stone }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <FadeIn>
            <span className="gold-rule"/>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: S.gold, marginBottom: '0.8rem' }}>Our Work</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.9rem,4vw,2.8rem)', fontWeight: 400, color: S.ink, marginBottom: '3rem' }}>
              A Glimpse of Our <em>Portfolio</em>
            </h2>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5px' }}>
            {galleryImgs.map((img, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div style={{ overflow: 'hidden', aspectRatio: '4/3', background: '#d0c8b8',
                  gridColumn: i === 0 ? 'span 2' : 'span 1',
                }}
                  onMouseEnter={e => e.currentTarget.querySelector('img').style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}>
                  <img src={img} alt={`Gallery ${i+1}`} loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }}/>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: S.gold, padding: '5rem 0', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 2rem' }}>
          <FadeIn>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 400, color: S.ink, marginBottom: '1.5rem', lineHeight: 1.2 }}>
              Book Your Appointment for Quality &amp; Reliable Services
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'rgba(26,26,24,0.7)', marginBottom: '2rem', lineHeight: 1.7 }}>
              Let us help you create the home of your dreams.
            </p>
            <Link to="/contact"
              style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '1rem 2.8rem', background: S.ink, color: S.gold, textDecoration: 'none', display: 'inline-block', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.background = S.offwhite; e.currentTarget.style.color = S.ink }}
              onMouseLeave={e => { e.currentTarget.style.background = S.ink; e.currentTarget.style.color = S.gold }}>
              Book Appointment
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  )
}