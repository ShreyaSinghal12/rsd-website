import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─────────────────────────────────────────────────────────────
// Point this at your real chat backend once it exists.
// It should accept { messages: [{role, text}, ...] } and return
// { reply: "..." }. Until a real endpoint is wired in, this falls
// back to a placeholder response so the widget stays demoable.
// ─────────────────────────────────────────────────────────────
const CHAT_API_ENDPOINT = '/api/chat';

async function sendMessageToAPI(messages) {
  try {
    const res = await fetch(CHAT_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });
    if (!res.ok) throw new Error('API not connected');
    const data = await res.json();
    return data.reply;
  } catch (err) {
    // No backend wired up yet — friendly fallback so the widget still works.
    return "Thanks for reaching out! Our team will get back to you shortly. In the meantime, feel free to call or WhatsApp us directly using the icons alongside this chat.";
  }
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi! How can we help with your project today?" },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const nextMessages = [...messages, { role: 'user', text }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);
    const reply = await sendMessageToAPI(nextMessages);
    setMessages(m => [...m, { role: 'assistant', text: reply }]);
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Open chat"
        style={{
          width: 44, height: 44, borderRadius: '50%',
          background: 'rgba(0,0,0,0.7)', color: '#fff', border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)', cursor: 'pointer',
          transition: 'transform 0.3s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', bottom: 90, right: 20, zIndex: 95,
              width: 320, maxWidth: 'calc(100vw - 40px)', height: 440,
              background: '#fff', borderRadius: 16, overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
              display: 'flex', flexDirection: 'column',
            }}
          >
            <div style={{ background: 'var(--navy, #1c2a3a)', color: '#fff', padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem' }}>Chat with us</p>
              <button onClick={() => setOpen(false)} aria-label="Close chat" style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.1rem' }}>&#10005;</button>
            </div>

            <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {messages.map((m, i) => (
                <div key={i} style={{
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  background: m.role === 'user' ? 'var(--gold, #c9a84c)' : '#f0ede6',
                  color: m.role === 'user' ? '#fff' : '#1c1c1a',
                  padding: '10px 14px', borderRadius: 14,
                  maxWidth: '80%', fontSize: '0.85rem', lineHeight: 1.5,
                  fontFamily: 'Inter, sans-serif',
                }}>
                  {m.text}
                </div>
              ))}
              {loading && (
                <div style={{ alignSelf: 'flex-start', color: 'var(--text-light, #999)', fontSize: '0.8rem', fontFamily: 'Inter, sans-serif' }}>
                  Typing…
                </div>
              )}
            </div>

            <div style={{ display: 'flex', borderTop: '1px solid #eee', padding: 10, gap: 8 }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') send(); }}
                placeholder="Type a message…"
                style={{ flex: 1, border: '1px solid #ddd', borderRadius: 999, padding: '9px 14px', fontSize: '0.85rem', fontFamily: 'Inter, sans-serif', outline: 'none' }}
              />
              <button onClick={send} disabled={loading} style={{
                width: 38, height: 38, borderRadius: '50%', background: 'var(--navy, #1c2a3a)', color: '#fff',
                border: 'none', cursor: loading ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: loading ? 0.6 : 1,
              }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M2 21l21-9L2 3v7l15 2-15 2z" /></svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}