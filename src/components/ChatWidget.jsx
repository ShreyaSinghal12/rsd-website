import { useState } from 'react'

const getBotReply = (userMessage) => {
  const msg = userMessage.toLowerCase()

  if (msg.includes('price') || msg.includes('cost') || msg.includes('budget') || msg.includes('quote')) {
    return "Pricing depends on the scope of your project. Could you share what type of space you're looking to design — residential, hospitality, or commercial? You can also fill out our contact form and our team will get back to you with a detailed quote."
  }
  if (msg.includes('location') || msg.includes('where') || msg.includes('address') || msg.includes('office')) {
    return "We're based in Siliguri, West Bengal. Our studio is at Time Square, 3rd Floor, Opp Ravi Auto, Sevoke Road."
  }
  if (msg.includes('contact') || msg.includes('phone') || msg.includes('call') || msg.includes('number')) {
    return "You can reach us at +91 98008 48155 or +91 82508 41773, or email rameshsinghaldesign@gmail.com. We typically respond within 24 hours."
  }
  if (msg.includes('hotel') || msg.includes('hospitality') || msg.includes('resort') || msg.includes('restaurant')) {
    return "We specialise in hospitality design — hotels, resorts and restaurants, handled end-to-end under one team. Would you like to see some of our hospitality projects in our Projects section above?"
  }
  if (msg.includes('residential') || msg.includes('home') || msg.includes('house') || msg.includes('flat') || msg.includes('apartment')) {
    return "We design luxury residences from concept to completion — architecture, interiors, and execution all under one roof. Check out our Residential projects above, or fill the contact form to start a conversation."
  }
  if (msg.includes('builder') || msg.includes('developer') || msg.includes('commercial')) {
    return "We work closely with builders and developers on projects that need to stand out. Take a look at our Builders & Developers projects, or reach out directly to discuss your development."
  }
  if (msg.includes('appointment') || msg.includes('book') || msg.includes('meeting') || msg.includes('consult')) {
    return "We'd love to set up a consultation! Please fill out the contact form below, or call us directly at +91 98008 48155 to book a time that works for you."
  }
  if (msg.includes('hour') || msg.includes('open') || msg.includes('timing')) {
    return "We're open Monday to Friday, 9:00 AM to 10:00 PM, and Saturday, 11:00 AM to 8:00 PM."
  }
  if (msg.includes('vastu')) {
    return "Yes, we offer Vedic Vastu consultation — applying modern Vastu Shastra practically to bring harmony to your space. Would you like to know more?"
  }
  if (msg.includes('service') || msg.includes('what do you')) {
    return "We offer three core services: Architecture, Interior Design, and full Turnkey Projects — meaning one accountable team handles everything from concept to completion. Scroll up to our Services section for details!"
  }
  if (msg.includes('experience') || msg.includes('year') || msg.includes('since') || msg.includes('how long')) {
    return "Raamesh Singhal Design has been creating spaces since 1995 — over 30 years of experience and 500+ projects delivered."
  }
  if (msg.includes('thank') || msg.includes('thanks')) {
    return "You're very welcome! Let us know if there's anything else we can help with."
  }
  if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey')) {
    return "Hello! How can we help you today? Feel free to ask about our services, projects, or how to get in touch."
  }

  return "Thanks for reaching out! For specific questions, our team would love to chat directly — call us at +91 98008 48155 or fill out the contact form above. Is there anything else I can help clarify?"
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! Welcome to Raamesh Singhal Design. How can we help you today?" },
  ])
  const [input, setInput] = useState('')

  const send = () => {
    if (!input.trim()) return
    const userText = input
    setMessages(m => [...m, { from: 'user', text: userText }])
    setInput('')
    setTimeout(() => {
      setMessages(m => [...m, { from: 'bot', text: getBotReply(userText) }])
    }, 500)
  }

  const wrapStyle = { position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 60 }
  const bubbleStyle = { width: 56, height: 56, borderRadius: '50%', background: '#1A1A18', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(26,26,24,0.35)', transition: 'transform 0.3s ease' }
  const panelStyle = { position: 'absolute', bottom: 70, right: 0, width: 320, maxWidth: '85vw', background: '#fff', borderRadius: 8, boxShadow: '0 10px 40px rgba(26,26,24,0.25)', overflow: 'hidden', opacity: open ? 1 : 0, transform: open ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)', pointerEvents: open ? 'auto' : 'none', transition: 'all 0.25s ease' }

  return (
    <div style={wrapStyle}>
      <div style={panelStyle}>
        <div style={{ background: '#1A1A18', padding: '1rem 1.2rem' }}>
          <p style={{ fontFamily: "'Playfair Display',serif", color: '#F7F4EF', fontSize: '1rem', marginBottom: 2 }}>Raamesh Singhal Design</p>
          <p style={{ fontFamily: "'DM Mono',monospace", color: '#C9A96E', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Usually replies within a day</p>
        </div>

        <div style={{ padding: '1rem 1.2rem', height: 260, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, background: '#F7F4EF' }}>
          {messages.map((m, i) => (
            <div key={i} style={{
              alignSelf: m.from === 'bot' ? 'flex-start' : 'flex-end',
              background: m.from === 'bot' ? '#fff' : '#C9A96E',
              color: '#1A1A18',
              padding: '0.6rem 0.9rem',
              borderRadius: 10,
              fontSize: '0.82rem',
              lineHeight: 1.5,
              maxWidth: '85%',
              boxShadow: '0 2px 6px rgba(26,26,24,0.08)',
            }}>
              {m.text}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', borderTop: '1px solid rgba(26,26,24,0.08)' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Type a message..."
            style={{ flex: 1, border: 'none', outline: 'none', padding: '0.8rem 1rem', fontSize: '0.85rem', fontFamily: "'DM Sans',sans-serif" }}
          />
          <button onClick={send} style={{ background: '#1A1A18', color: '#C9A96E', border: 'none', padding: '0 1.2rem', cursor: 'pointer', fontFamily: "'DM Mono',monospace", fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Send
          </button>
        </div>
      </div>

      <button onClick={() => setOpen(v => !v)} aria-label="Toggle chat" style={bubbleStyle} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" width="22" height="22">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
            <path d="M12 2C6.48 2 2 6.04 2 11c0 2.61 1.23 4.94 3.18 6.6L4 22l4.79-1.55C9.78 20.81 10.87 21 12 21c5.52 0 10-4.04 10-9S17.52 2 12 2z"/>
          </svg>
        )}
      </button>
    </div>
  )
}