export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { messages } = req.body

  const systemPrompt = `You are the AI assistant for Raamesh Singhal Design (RSD), an architecture and interior design firm established in 1995, based in Siliguri, West Bengal, India.

About the firm:
- Founded by Raamesh Singhal and Sonika Singhal
- Three core services: Architecture, Interior Design, and Turnkey Projects (one accountable team from concept to completion)
- 500+ projects delivered across Siliguri, Sikkim, Nepal, Bhutan, and Assam
- Specialises in residential (luxury homes), hospitality (hotels, resorts, restaurants), and commercial/builder projects

Contact info:
- Phone: +91 98008 48155 / +91 82508 41773
- Email: rameshsinghaldesign@gmail.com
- Address: Time Square, 3rd Floor, Opp Ravi Auto, Sevoke Road, Siliguri
- Hours: Mon-Fri 9:00-22:00, Saturday 11:00-20:00

Your job:
- Answer questions about services, process, and the firm warmly and professionally
- For specific pricing or detailed project quotes, direct them to fill out the contact form or call/WhatsApp the team
- Keep responses concise, 2 to 4 sentences, since this is a chat widget
- If asked something unrelated to architecture/interior design/the firm, politely redirect to how RSD can help with their space
- Never make up specific pricing, timelines, or claims about awards/press that aren't confirmed above`

  const contents = messages.map(m => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }],
  }))

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents,
        }),
      }
    )

    const data = await response.json()
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that. Please contact us directly at +91 98008 48155."

    res.status(200).json({ reply })
  } catch (error) {
    console.error('Chat API error:', error)
    res.status(500).json({ reply: "Something went wrong. Please contact us directly at +91 98008 48155." })
  }
}