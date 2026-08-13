import { type FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { Bot, ChevronDown, MessageCircle, Send, Sparkles, X } from 'lucide-react'
import { restaurantConfig } from '../../config/restaurant'

type Speaker = 'assistant' | 'visitor'

type Message = {
  id: number
  speaker: Speaker
  text: string
}

type Lead = {
  name: string
  phone: string
  email: string
  date: string
  time: string
  guests: string
  message: string
}

const initialMessages: Message[] = [
  {
    id: 1,
    speaker: 'assistant',
    text: 'Namaste. I can help you explore dishes and published prices, suggest menu ideas, or share experience information.',
  },
]

const quickPrompts = [
  'Recommend a vegetarian dish',
  'What are the prices?',
  'Tell me about events',
] as const

const reservationIntent = /\b(reserv(?:e|ation)|book(?:ing)?(?:\s+(?:a\s+)?)?table|make(?:\s+(?:a\s+)?)?booking)\b/i

export function LagnaaConcierge() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isThinking, setIsThinking] = useState(false)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [lead, setLead] = useState<Lead>({ name: '', phone: '', email: '', date: '', time: '', guests: '', message: '' })
  const [leadSaved, setLeadSaved] = useState(false)
  const [isSendingLead, setIsSendingLead] = useState(false)
  const [leadError, setLeadError] = useState('')
  const messageEndRef = useRef<HTMLDivElement>(null)
  const nextMessageId = useRef(2)

  const contactSummary = useMemo(() => [restaurantConfig.address, restaurantConfig.phone, restaurantConfig.email].filter(Boolean).join(' · '), [])

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' })
  }, [messages, isThinking, showLeadForm, leadSaved])

  const appendAssistant = (text: string) => {
    setMessages((current) => [...current, { id: nextMessageId.current++, speaker: 'assistant', text }])
  }

  const ask = async (prompt: string) => {
    const text = prompt.trim()
    if (!text || isThinking) return

    const visitorMessage: Message = { id: nextMessageId.current++, speaker: 'visitor', text }
    const conversation = [...messages, visitorMessage]
    setMessages(conversation)
    setInput('')
    setIsThinking(true)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: conversation.map((message) => ({
            role: message.speaker === 'visitor' ? 'user' : 'assistant',
            content: message.text,
          })),
        }),
      })
      const responseText = await response.text()
      let payload: { reply?: string, error?: string } = {}
      try {
        payload = JSON.parse(responseText) as { reply?: string, error?: string }
      } catch {
        throw new Error('The AI concierge is temporarily unavailable. Please try again shortly.')
      }
      if (!response.ok || !payload.reply) throw new Error(payload.error || 'Unable to reach the concierge.')
      appendAssistant(payload.reply)
      if (reservationIntent.test(text)) setShowLeadForm(true)
    } catch (error) {
      appendAssistant(error instanceof Error ? error.message : 'The AI concierge is temporarily unavailable. Please try again shortly.')
    } finally {
      setIsThinking(false)
    }
  }

  const handleMessageSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    ask(input)
  }

  const handleLeadSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (
      lead.name.trim().length < 2
      || !/^\+?\d[\d\s()-]{6,}$/.test(lead.phone.trim())
      || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email.trim())
      || !lead.date
      || !lead.time
      || !lead.guests
    ) {
      setLeadError('Enter your name, phone, email, preferred date, time and number of guests.')
      return
    }

    setLeadError('')
    setIsSendingLead(true)
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'chatbot',
          name: lead.name,
          phone: lead.phone,
          email: lead.email,
          date: lead.date,
          time: lead.time,
          guests: lead.guests,
          experience: 'Table reservation',
          message: lead.message,
        }),
      })
      let parsedResponse = true
      const payload = await response.json().catch(() => {
        parsedResponse = false
        return {}
      }) as { message?: string; error?: string }
      if (!response.ok) {
        if (!parsedResponse && response.status === 404) {
          throw new Error('Reservation backend is not available in this preview. Test on Vercel after redeploying with the reservation environment variables.')
        }
        throw new Error(payload.error || 'Unable to send the reservation request.')
      }
      setLeadSaved(true)
      appendAssistant(payload.message || `Thank you, ${lead.name.trim()}. Your reservation request has been sent to Lagnaa. The restaurant will confirm directly.`)
    } catch (error) {
      setLeadError(error instanceof Error ? error.message : 'Unable to send the reservation request.')
    } finally {
      setIsSendingLead(false)
    }
  }

  return (
    <aside className={`lagnaa-concierge${isOpen ? ' lagnaa-concierge--open' : ''}`} aria-label="Lagnaa AI concierge">
      {isOpen ? (
        <section aria-describedby="concierge-demo-note" aria-label="Chat with the Lagnaa AI concierge" className="lagnaa-concierge__panel" role="dialog">
          <header className="lagnaa-concierge__header">
            <span className="lagnaa-concierge__icon" aria-hidden="true"><Sparkles size={16} /></span>
            <div>
              <p>AI concierge</p>
              <h2>Lagnaa assistant</h2>
            </div>
            <button aria-label="Close chat" className="lagnaa-concierge__close" onClick={() => setIsOpen(false)} type="button"><X size={18} /></button>
          </header>

          <p className="lagnaa-concierge__notice" id="concierge-demo-note">AI uses the current website information. Reservation requests require Lagnaa confirmation.</p>

          <div aria-live="polite" className="lagnaa-concierge__messages">
            {messages.map((message) => <p className={`lagnaa-concierge__message lagnaa-concierge__message--${message.speaker}`} key={message.id}>{message.text}</p>)}
            {isThinking ? <p className="lagnaa-concierge__message lagnaa-concierge__message--assistant lagnaa-concierge__typing"><span /><span /><span /><span className="sr-only">The concierge is preparing a reply</span></p> : null}

            {showLeadForm && !leadSaved ? (
              <form className="lagnaa-concierge__lead" onSubmit={handleLeadSubmit}>
                <h3>Prepare a reservation enquiry</h3>
                <p>Send a pending request to Lagnaa. No table is confirmed until the restaurant contacts you directly.</p>
                <label htmlFor="concierge-name">Name<input id="concierge-name" onChange={(event) => setLead((current) => ({ ...current, name: event.target.value }))} value={lead.name} /></label>
                <label htmlFor="concierge-phone">Phone number<input id="concierge-phone" inputMode="tel" onChange={(event) => setLead((current) => ({ ...current, phone: event.target.value }))} placeholder="+65 9784 4771" value={lead.phone} /></label>
                <label htmlFor="concierge-email">Email<input id="concierge-email" inputMode="email" onChange={(event) => setLead((current) => ({ ...current, email: event.target.value }))} type="email" value={lead.email} /></label>
                <label htmlFor="concierge-date">Preferred date<input id="concierge-date" onChange={(event) => setLead((current) => ({ ...current, date: event.target.value }))} type="date" value={lead.date} /></label>
                <label htmlFor="concierge-time">Preferred time<input id="concierge-time" onChange={(event) => setLead((current) => ({ ...current, time: event.target.value }))} type="time" value={lead.time} /></label>
                <label htmlFor="concierge-guests">Guests<input id="concierge-guests" inputMode="numeric" min="1" onChange={(event) => setLead((current) => ({ ...current, guests: event.target.value }))} type="number" value={lead.guests} /></label>
                <label htmlFor="concierge-message">Message <em>Optional</em><input id="concierge-message" onChange={(event) => setLead((current) => ({ ...current, message: event.target.value }))} value={lead.message} /></label>
                {leadError ? <p className="lagnaa-concierge__error" role="alert">{leadError}</p> : null}
                <button disabled={isSendingLead} type="submit">{isSendingLead ? 'Sending request…' : 'Send reservation request'} <ChevronDown size={14} aria-hidden="true" /></button>
              </form>
            ) : null}

            {leadSaved ? (
              <div className="lagnaa-concierge__handoff">
                <strong>Continue with your request</strong>
                <span>Continue with Lagnaa’s reservation guidance. The team will confirm reservation details directly.</span>
                <a href="/reservations">Open reservation options <span aria-hidden="true">↗</span></a>
              </div>
            ) : null}
            <div ref={messageEndRef} />
          </div>

          <div className="lagnaa-concierge__quick-actions" aria-label="Suggested questions">
            {quickPrompts.map((prompt) => <button key={prompt} onClick={() => ask(prompt)} type="button">{prompt}</button>)}
          </div>
          <form className="lagnaa-concierge__composer" onSubmit={handleMessageSubmit}>
            <label className="sr-only" htmlFor="concierge-message">Ask the Lagnaa concierge</label>
            <input id="concierge-message" onChange={(event) => setInput(event.target.value)} placeholder="Ask about dishes, prices or booking…" value={input} />
            <button aria-label="Send message" disabled={!input.trim() || isThinking} type="submit"><Send size={16} /></button>
          </form>
          <footer className="lagnaa-concierge__contact">{contactSummary}</footer>
        </section>
      ) : null}
      <button aria-expanded={isOpen} aria-label="Open Lagnaa AI concierge" className="lagnaa-concierge__launcher" onClick={() => setIsOpen(true)} type="button">
        <Bot size={20} aria-hidden="true" />
        <span>Ask Lagnaa</span>
        <MessageCircle size={16} aria-hidden="true" />
      </button>
    </aside>
  )
}
