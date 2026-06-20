import { useState } from 'react'

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! Welcome to Raamesh Singhal Design. How can we help you today?" },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const send = async () => {
    if (!input.trim() || loading) return
    const userMsg = { from: 'user', text: input }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const apiMessages = newMessages.map(m => ({
        role: m.from === 'user' ? 'user' : 'model',
        content: m.text,
      }))

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      })
      const data = await res.json()
      setMessages(m => [...m, { from: 'bot', text: data.reply }])
    } catch (err) {
      setMessages(m => [...m, { from: 'bot', text: "Something went wrong. Please contact us directly at +91 98008 48155." }])
    } finally {
      setLoading(false)
    }
  }

  const wrapStyle = { position: 'fixed', bottom: '1.5rem', right: '5.5rem', zIndex: 60 }
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
          {loading && (
            <div style={{ alignSelf: 'flex-start', background: '#fff', padding: '0.6rem 0.9rem', borderRadius: 10, fontSize: '0.82rem', color: '#8A9B8E', fontStyle: 'italic' }}>
              Typing...
            </div>
          )}
        </div>

        <div style={{ display: 'flex', borderTop: '1px solid rgba(26,26,24,0.08)' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Type a message..."
            style={{ flex: 1, border: 'none', outline: 'none', padding: '0.8rem 1rem', fontSize: '0.85rem', fontFamily: "'DM Sans',sans-serif" }}
          />
          <button onClick={send} disabled={loading} style={{ background: loading ? '#8A9B8E' : '#1A1A18', color: '#C9A96E', border: 'none', padding: '0 1.2rem', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: "'DM Mono',monospace", fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {loading ? '...' : 'Send'}
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
            <path d="M12 2C6.48 2 2 6.04 2 11c0 2.61 1.23 4.94 3.18 6.6L4 22l4.79-1.55C9.78 20.81 10.87 21 12 21c5.52 0 10-4.04 10-9S17.52 2 12 2z" />
          </svg>
        )}
      </button>
    </div>
  )
}