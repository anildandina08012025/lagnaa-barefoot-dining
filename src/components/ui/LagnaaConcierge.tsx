import { type FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { Bot, ChevronDown, Send, Sparkles, X } from 'lucide-react'
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
  experience: string
  message: string
}

type LeadField = keyof Lead

const defaultLead: Lead = {
  name: '',
  phone: '',
  email: '',
  date: '',
  time: '',
  guests: '',
  experience: 'Table reservation',
  message: '',
}

const initialMessages: Message[] = [
  {
    id: 1,
    speaker: 'assistant',
    text: 'Namaste. I can help you explore Lagnaa’s dishes and published prices, suggest menu ideas, share experience information, or prepare a pending reservation request.',
  },
]

const quickPrompts = [
  'Recommend a vegetarian dish',
  'What are the prices?',
  'Reserve a table',
  'Tell me about the Chilli Challenge',
] as const

const reservationIntent = /\b(reserv(?:e|ation)?|book(?:ing)?(?:\s+(?:a\s+)?)?table|make(?:\s+(?:a\s+)?)?booking|table\s+for|dinner\s+for|lunch\s+for)\b/i

const visitTypes = [
  'Table reservation',
  'Barefoot Dining',
  'Ultimate Chilli Challenge',
  'Monthly Dégustation',
  'Cooking with Chef Kaesavan',
] as const

const requiredLeadFields: readonly LeadField[] = ['name', 'phone', 'email', 'date', 'time', 'guests']

const leadFieldLabels: Record<LeadField, string> = {
  name: 'full name',
  phone: 'phone number with country code',
  email: 'email address',
  date: 'preferred date',
  time: 'preferred time',
  guests: 'number of guests',
  experience: 'visit type',
  message: 'message',
}

function formatInputDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function extractDate(text: string) {
  const lower = text.toLowerCase()
  const today = new Date()
  if (/\btoday\b/.test(lower)) return formatInputDate(today)
  if (/\btomorrow\b/.test(lower)) {
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    return formatInputDate(tomorrow)
  }

  const isoDate = text.match(/\b(20\d{2})[-/](\d{1,2})[-/](\d{1,2})\b/)
  if (isoDate) return `${isoDate[1]}-${isoDate[2].padStart(2, '0')}-${isoDate[3].padStart(2, '0')}`

  const slashDate = text.match(/\b(\d{1,2})[/-](\d{1,2})[/-](20\d{2})\b/)
  if (slashDate) return `${slashDate[3]}-${slashDate[1].padStart(2, '0')}-${slashDate[2].padStart(2, '0')}`

  return ''
}

function extractTime(text: string) {
  const clock = text.match(/\b(\d{1,2})(?::|\.)([0-5]\d)\s*(am|pm)?\b/i)
  if (clock) {
    let hours = Number(clock[1])
    const minutes = clock[2]
    const meridiem = clock[3]?.toLowerCase()
    if (meridiem === 'pm' && hours < 12) hours += 12
    if (meridiem === 'am' && hours === 12) hours = 0
    if (hours >= 0 && hours <= 23) return `${String(hours).padStart(2, '0')}:${minutes}`
  }

  const hourOnly = text.match(/\b(\d{1,2})\s*(am|pm)\b/i)
  if (hourOnly) {
    let hours = Number(hourOnly[1])
    const meridiem = hourOnly[2].toLowerCase()
    if (meridiem === 'pm' && hours < 12) hours += 12
    if (meridiem === 'am' && hours === 12) hours = 0
    if (hours >= 0 && hours <= 23) return `${String(hours).padStart(2, '0')}:00`
  }

  return ''
}

function extractGuests(text: string) {
  const explicit = text.match(/\b(\d{1,2})\s*(?:guests?|pax|people|persons?)\b/i)
  if (explicit) return explicit[1]

  const tableFor = text.match(/\b(?:table|booking|reservation|dinner|lunch)\s+for\s+(\d{1,2})\b/i)
  return tableFor?.[1] || ''
}

function extractExperience(text: string) {
  if (/\bchilli|chili|challenge|spice\b/i.test(text)) return 'Ultimate Chilli Challenge'
  if (/\bbarefoot\b/i.test(text)) return 'Barefoot Dining'
  if (/\bdegustation|food[-\s]?tasting|tasting\b/i.test(text)) return 'Monthly Dégustation'
  if (/\bcooking|chef|class\b/i.test(text)) return 'Cooking with Chef Kaesavan'
  return ''
}

function extractName(text: string) {
  const match = text.match(/\b(?:my name is|name is|i am|i'm)\s+([a-z][a-z .'-]{1,80})\b/i)
  return match?.[1]?.replace(/\s+(?:and|phone|email|for|on|at)\b.*$/i, '').trim() || ''
}

function mergeLeadFromText(current: Lead, text: string, activeField?: LeadField) {
  const next = { ...current }
  const trimmed = text.trim()
  const name = extractName(trimmed)
  const email = trimmed.match(/[^\s@]+@[^\s@]+\.[^\s@]+/)?.[0] || ''
  const phone = trimmed.match(/\+?\d[\d\s()-]{6,}\d/)?.[0] || ''
  const date = extractDate(trimmed)
  const time = extractTime(trimmed)
  const guests = extractGuests(trimmed)
  const experience = extractExperience(trimmed)

  if (email) next.email = email
  if (phone) next.phone = phone
  if (date) next.date = date
  if (time) next.time = time
  if (guests) next.guests = guests
  if (experience) next.experience = experience
  if (name) next.name = name

  if (activeField && trimmed) {
    if (activeField === 'name' && !email && !phone && !date && !time && !guests) next.name = name || trimmed
    if (activeField === 'phone' && phone) next.phone = phone
    if (activeField === 'email' && email) next.email = email
    if (activeField === 'date' && date) next.date = date
    if (activeField === 'time' && time) next.time = time
    if (activeField === 'guests' && guests) next.guests = guests
  }

  return next
}

function missingLeadFields(lead: Lead) {
  return requiredLeadFields.filter((field) => !lead[field].trim())
}

function missingLeadPrompt(fields: readonly LeadField[]) {
  const labels = fields.map((field) => leadFieldLabels[field])
  if (labels.length === 1) return `Please share your ${labels[0]}.`
  if (labels.length === 2) return `Please share your ${labels[0]} and ${labels[1]}.`
  return `Please share your ${labels.slice(0, -1).join(', ')} and ${labels.at(-1)}.`
}

function getWhatsAppUrl() {
  const number = restaurantConfig.phone?.replace(/\D/g, '')
  if (!number) return null

  const message = encodeURIComponent('Namaste Lagnaa, I would like to enquire before my visit.')
  return `https://wa.me/${number}?text=${message}`
}

export function LagnaaConcierge() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isThinking, setIsThinking] = useState(false)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [lead, setLead] = useState<Lead>(defaultLead)
  const [leadSaved, setLeadSaved] = useState(false)
  const [isSendingLead, setIsSendingLead] = useState(false)
  const [leadError, setLeadError] = useState('')
  const messageEndRef = useRef<HTMLDivElement>(null)
  const nextMessageId = useRef(2)

  const contactSummary = useMemo(() => [restaurantConfig.address, restaurantConfig.phone, restaurantConfig.email].filter(Boolean).join(' · '), [])
  const whatsAppUrl = useMemo(() => getWhatsAppUrl(), [])

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' })
  }, [messages, isThinking, showLeadForm, leadSaved])

  const appendAssistant = (text: string) => {
    setMessages((current) => [...current, { id: nextMessageId.current++, speaker: 'assistant', text }])
  }

  const sendReservationRequest = async (reservationLead: Lead) => {
    setLeadError('')
    setIsSendingLead(true)
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'chatbot',
          name: reservationLead.name,
          phone: reservationLead.phone,
          email: reservationLead.email,
          date: reservationLead.date,
          time: reservationLead.time,
          guests: reservationLead.guests,
          experience: reservationLead.experience,
          message: reservationLead.message,
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
      appendAssistant(payload.message || `Thank you, ${reservationLead.name.trim()}. Your reservation request has been sent to Lagnaa. The restaurant will confirm directly.`)
    } catch (error) {
      setLeadError(error instanceof Error ? error.message : 'Unable to send the reservation request.')
      appendAssistant(error instanceof Error ? error.message : 'Unable to send the reservation request.')
    } finally {
      setIsSendingLead(false)
    }
  }

  const handleReservationMessage = async (text: string) => {
    if (/\b(cancel|stop|never mind|nevermind)\b/i.test(text)) {
      setShowLeadForm(false)
      setLead(defaultLead)
      setLeadSaved(false)
      setLeadError('')
      appendAssistant('No problem. I have stopped the reservation request. You can still ask me about Lagnaa’s menu, experiences or contact details.')
      return
    }

    const activeField = missingLeadFields(lead)[0]
    const updatedLead = mergeLeadFromText(leadSaved ? defaultLead : lead, text, showLeadForm ? activeField : undefined)
    const missing = missingLeadFields(updatedLead)

    setLead(updatedLead)
    setLeadSaved(false)
    setShowLeadForm(true)

    if (missing.length) {
      appendAssistant(`I can prepare a pending reservation request for Lagnaa. ${missingLeadPrompt(missing)} You can type the details here or use the form below. Lagnaa will confirm directly.`)
      return
    }

    appendAssistant('I have the required details. Sending this as a pending reservation request to Lagnaa now.')
    await sendReservationRequest(updatedLead)
  }

  const ask = async (prompt: string) => {
    const text = prompt.trim()
    if (!text || isThinking) return

    const visitorMessage: Message = { id: nextMessageId.current++, speaker: 'visitor', text }
    const conversation = [...messages, visitorMessage]
    setMessages(conversation)
    setInput('')

    if (reservationIntent.test(text) || (showLeadForm && !leadSaved)) {
      await handleReservationMessage(text)
      return
    }

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
    if (missingLeadFields(lead).length || lead.name.trim().length < 2 || !/^\+?\d[\d\s()-]{6,}$/.test(lead.phone.trim()) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email.trim())) {
      setLeadError('Enter your name, phone, email, preferred date, time and number of guests.')
      return
    }

    await sendReservationRequest(lead)
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
                <label htmlFor="concierge-visit-type">Visit type<select id="concierge-visit-type" onChange={(event) => setLead((current) => ({ ...current, experience: event.target.value }))} value={lead.experience}>{visitTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select></label>
                <label htmlFor="concierge-lead-message">Message <em>Optional</em><input id="concierge-lead-message" onChange={(event) => setLead((current) => ({ ...current, message: event.target.value }))} value={lead.message} /></label>
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
            <label className="sr-only" htmlFor="concierge-composer-message">Ask the Lagnaa concierge</label>
            <input id="concierge-composer-message" onChange={(event) => setInput(event.target.value)} placeholder="Ask about dishes, prices or booking…" value={input} />
            <button aria-label="Send message" disabled={!input.trim() || isThinking} type="submit"><Send size={16} /></button>
          </form>
          <footer className="lagnaa-concierge__contact">{contactSummary}</footer>
        </section>
      ) : null}
      {whatsAppUrl ? (
        <a className="lagnaa-concierge__whatsapp" href={whatsAppUrl} target="_blank" rel="noopener noreferrer" aria-label="Enquire with Lagnaa on WhatsApp">
          <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
            <path fill="currentColor" d="M16.02 3.2c-6.95 0-12.6 5.56-12.6 12.4 0 2.18.58 4.3 1.68 6.16L3.31 28.8l7.23-1.84a12.74 12.74 0 0 0 5.48 1.23c6.95 0 12.61-5.56 12.61-12.4S22.97 3.2 16.02 3.2Zm0 22.9c-1.78 0-3.53-.45-5.08-1.31l-.36-.2-4.29 1.09 1.08-4.14-.24-.38a10.22 10.22 0 0 1-1.62-5.56c0-5.68 4.72-10.31 10.51-10.31 5.8 0 10.52 4.63 10.52 10.31 0 5.68-4.72 10.3-10.52 10.3Zm5.78-7.71c-.32-.16-1.88-.91-2.17-1.02-.29-.1-.5-.15-.71.16-.21.31-.82 1.01-1 1.22-.19.2-.37.23-.69.08-.32-.16-1.34-.49-2.55-1.55-.94-.83-1.58-1.86-1.76-2.17-.19-.31-.02-.48.14-.63.14-.14.32-.36.48-.54.16-.18.21-.31.32-.52.11-.2.05-.39-.03-.54-.08-.16-.71-1.68-.98-2.3-.26-.6-.52-.52-.71-.53h-.61c-.21 0-.55.08-.84.39-.29.31-1.1 1.06-1.1 2.58 0 1.52 1.13 2.99 1.29 3.2.16.2 2.23 3.34 5.4 4.68.76.32 1.35.51 1.81.65.76.24 1.45.21 2 .13.61-.09 1.88-.75 2.14-1.48.27-.73.27-1.35.19-1.48-.08-.13-.29-.21-.61-.36Z" />
          </svg>
          <span className="sr-only">WhatsApp</span>
        </a>
      ) : null}
      <button aria-expanded={isOpen} aria-label="Open Lagnaa AI concierge" className="lagnaa-concierge__launcher" onClick={() => setIsOpen(true)} type="button">
        <Bot size={20} aria-hidden="true" />
        <span>Ask AI Lagnaa</span>
      </button>
    </aside>
  )
}
