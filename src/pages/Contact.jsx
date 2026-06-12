import { useState } from 'react'
import { useInView } from 'react-intersection-observer'

function FadeIn({ children, delay = 0 }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

const S = {
  gold:     '#C9A96E',
  ink:      '#1A1A18',
  offwhite: '#F7F4EF',
  stone:    '#E8E0D0',
  sage:     '#8A9B8E',
  mid:      '#6B6860',
}

function Input({ label, type = 'text', id, placeholder, value, onChange, required }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ marginBottom: '1.2rem' }}>
      <label htmlFor={id} style={{ display: 'block', fontFamily: "'DM Mono',monospace", fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: S.mid, marginBottom: '0.5rem' }}>
        {label}{required && <span style={{ color: S.gold, marginLeft: 2 }}>*</span>}
      </label>
      <input
        id={id} type={type} placeholder={placeholder}
        value={value} onChange={onChange} required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ width: '100%', padding: '0.85rem 1rem', border: `1px solid ${focused ? S.gold : 'rgba(26,26,24,0.15)'}`, background: '#fff', fontFamily: "'DM Sans',sans-serif", fontSize: '0.92rem', color: S.ink, outline: 'none', transition: 'border-color 0.25s', borderRadius: 0 }}
      />
    </div>
  )
}

function Textarea({ label, id, placeholder, value, onChange, required }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ marginBottom: '1.2rem' }}>
      <label htmlFor={id} style={{ display: 'block', fontFamily: "'DM Mono',monospace", fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: S.mid, marginBottom: '0.5rem' }}>
        {label}{required && <span style={{ color: S.gold, marginLeft: 2 }}>*</span>}
      </label>
      <textarea
        id={id} placeholder={placeholder}
        value={value} onChange={onChange} required={required}
        rows={5}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ width: '100%', padding: '0.85rem 1rem', border: `1px solid ${focused ? S.gold : 'rgba(26,26,24,0.15)'}`, background: '#fff', fontFamily: "'DM Sans',sans-serif", fontSize: '0.92rem', color: S.ink, outline: 'none', transition: 'border-color 0.25s', resize: 'vertical', borderRadius: 0 }}
      />
    </div>
  )
}

function Select({ label, id, value, onChange, options }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ marginBottom: '1.2rem' }}>
      <label htmlFor={id} style={{ display: 'block', fontFamily: "'DM Mono',monospace", fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: S.mid, marginBottom: '0.5rem' }}>
        {label}
      </label>
      <select
        id={id} value={value} onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ width: '100%', padding: '0.85rem 1rem', border: `1px solid ${focused ? S.gold : 'rgba(26,26,24,0.15)'}`, background: '#fff', fontFamily: "'DM Sans',sans-serif", fontSize: '0.92rem', color: value ? S.ink : S.mid, outline: 'none', transition: 'border-color 0.25s', borderRadius: 0, appearance: 'none', cursor: 'pointer' }}
      >
        <option value="">Select a service...</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}

const infoItems = [
  {
    label: 'Address',
    value: 'Time Square, 3rd Floor, Opp Ravi Auto, Sevoke Road, Siliguri',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" width="20" height="20">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        <circle cx="12" cy="9" r="2.5"/>
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: '+91 98008 48155',
    href: 'tel:+919800848155',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" width="20" height="20">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.22 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
  },
  {
    label: 'Also Reachable At',
    value: '+91 82508 41773',
    href: 'tel:+918250841773',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" width="20" height="20">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.22 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    value: 'rameshsinghaldesign@gmail.com',
    href: 'mailto:rameshsinghaldesign@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" width="20" height="20">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    label: 'Working Hours',
    value: 'Mon–Fri: 9:00 – 22:00\nSaturday: 11:00 – 20:00',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" width="20" height="20">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12,6 12,12 16,14"/>
      </svg>
    ),
  },
]

const serviceOptions = [
  'Residential Interior Design',
  'Architecture',
  'Hospitality Design',
  'Commercial / Retail',
  'Vedic Vastu Consultation',
  'Other',
]

export default function Contact() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', phone: '', email: '', service: '', message: '',
  })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.firstName || !form.phone || !form.email || !form.message) {
      alert('Please fill in all required fields.')
      return
    }
    setStatus('sending')
    // EmailJS will be wired in Step 8 — for now simulate success
    await new Promise(r => setTimeout(r, 1200))
    setStatus('sent')
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
          backgroundImage: "url('http://raameshsinghaldesign.com/wp-content/uploads/2023/04/The-Presidential-Lounge.jpg')",
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2,
        }}/>
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '4rem 2rem' }}>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: S.gold, marginBottom: '1rem' }}>
            Get In Touch
          </p>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2.4rem,6vw,4rem)', fontWeight: 400, color: S.offwhite, lineHeight: 1.1 }}>
            Contact <em style={{ fontStyle: 'italic', color: S.stone }}>Us</em>
          </h1>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section style={{ padding: '7rem 0', background: S.offwhite }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '5rem', alignItems: 'start' }}>

          {/* Left — info */}
          <div>
            <FadeIn>
              <span className="gold-rule"/>
              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: S.gold, marginBottom: '0.8rem' }}>
                Reach Us
              </p>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.8rem,3.5vw,2.4rem)', fontWeight: 400, color: S.ink, lineHeight: 1.2, marginBottom: '2.5rem' }}>
                Feel free to<br/><em>contact us</em> anytime
              </h2>
            </FadeIn>

            {/* Info items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
              {infoItems.map((item, i) => (
                <FadeIn key={i} delay={i * 80}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ width: 40, height: 40, border: '1px solid rgba(201,169,110,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: S.gold, marginBottom: '0.3rem' }}>
                        {item.label}
                      </p>
                      {item.href ? (
                        <a href={item.href} style={{ fontSize: '0.92rem', color: S.ink, textDecoration: 'none', transition: 'color 0.25s' }}
                          onMouseEnter={e => e.currentTarget.style.color = S.gold}
                          onMouseLeave={e => e.currentTarget.style.color = S.ink}>
                          {item.value}
                        </a>
                      ) : (
                        <p style={{ fontSize: '0.92rem', color: S.mid, whiteSpace: 'pre-line' }}>{item.value}</p>
                      )}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Map */}
            <FadeIn delay={200}>
              <div style={{ width: '100%', height: 280, overflow: 'hidden', filter: 'grayscale(0.2)' }}>
                <iframe
                  src="https://maps.google.com/maps?q=Time+Square+Sevoke+Road+Siliguri&t=m&z=15&output=embed&iwloc=near"
                  title="Raamesh Singhal Design Location"
                  width="100%" height="100%"
                  style={{ border: 'none', display: 'block' }}
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </FadeIn>
          </div>

          {/* Right — form */}
          <FadeIn delay={150}>
            <div style={{ background: '#fff', padding: '3rem', boxShadow: '0 4px 40px rgba(26,26,24,0.06)' }}>
              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: S.gold, marginBottom: '0.6rem' }}>
                Send a Message
              </p>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.6rem', fontWeight: 400, color: S.ink, marginBottom: '2rem' }}>
                Start Your Project
              </h3>

              {status === 'sent' ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '2rem', color: S.gold, marginBottom: '1rem' }}>Thank you</div>
                  <p style={{ fontSize: '0.95rem', color: S.mid, lineHeight: 1.7 }}>
                    Your message has been received. We will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <Input label="First Name" id="firstName" placeholder="Raamesh" value={form.firstName} onChange={set('firstName')} required />
                    <Input label="Last Name"  id="lastName"  placeholder="Singhal"  value={form.lastName}  onChange={set('lastName')} />
                  </div>
                  <Input label="Phone" id="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')} required />
                  <Input label="Email" id="email" type="email" placeholder="your@email.com" value={form.email} onChange={set('email')} required />
                  <Select label="Service Required" id="service" value={form.service} onChange={set('service')} options={serviceOptions} />
                  <Textarea label="Message" id="message" placeholder="Tell us about your project..." value={form.message} onChange={set('message')} required />

                  <button type="submit" disabled={status === 'sending'}
                    style={{
                      width: '100%', padding: '1rem', background: status === 'sending' ? S.sage : S.gold,
                      color: S.ink, border: 'none', cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                      fontFamily: "'DM Mono',monospace", fontSize: '0.75rem', letterSpacing: '0.16em',
                      textTransform: 'uppercase', transition: 'background 0.3s',
                    }}
                    onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.background = '#b8923d' }}
                    onMouseLeave={e => { if (status !== 'sending') e.currentTarget.style.background = S.gold }}>
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}