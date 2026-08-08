import { type FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { Bot, ChevronDown, MessageCircle, Send, Sparkles, X } from 'lucide-react'
import { publishedMenus } from '../../content/menu'
import { eventExperiences } from '../../content/experiences'
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
}

const initialMessages: Message[] = [
  {
    id: 1,
    speaker: 'assistant',
    text: 'Welcome to Lagnaa. I can help you explore dishes and published prices, suggest menu ideas, share experience information, or prepare a reservation request.',
  },
]

const quickPrompts = [
  'Recommend a vegetarian dish',
  'What are the prices?',
  'Tell me about events',
  'Reserve a table',
] as const

const menuItems = publishedMenus.flatMap((menu) => (
  menu.sections.flatMap((section) => section.items.map((item) => ({ ...item, menu: menu.name, section: section.name })))
))

function itemSummary(name: string) {
  return menuItems.find((item) => item.name.toLowerCase() === name.toLowerCase())
}

function formatPrice(item: typeof menuItems[number]) {
  if (item.price) return item.price
  if (item.variants?.length) return item.variants.map((variant) => `${variant.name} ${variant.price}`).join(' · ')
  return 'Price listed on the menu'
}

const vegetarianIdeas = ['Vegetable Jelfreezi', 'Paneer Butter Masala', 'Palak Paneer with Garlic Naan']
const chickenIdeas = ['Butter Chicken', 'Chicken Tikka Masala', 'Koli Curry Leaf with Basmati Rice']

function recommendations(names: readonly string[]) {
  return names.map((name) => {
    const item = itemSummary(name)
    return item ? `${item.name} (${formatPrice(item)})` : name
  }).join(', ')
}

function answerFor(question: string) {
  const query = question.toLowerCase().trim()

  if (/reserve|reserv|book|table|availability|available|slot/.test(query)) {
    return 'I can prepare a demonstration reservation request with your contact details. This chat cannot check a live calendar or confirm a table yet.'
  }

  if (/event|experience|class|chef|degust|chilli challenge|little india/.test(query)) {
    const names = eventExperiences.map((experience) => experience.title).join(', ')
    return `Lagnaa currently presents these experiences: ${names}. Current dates and availability need to be confirmed directly with Lagnaa.`
  }

  if (/vegetarian|vegan|veg |veggie|plant/.test(query)) {
    return `For a vegetarian starting point, consider ${recommendations(vegetarianIdeas)}. Please contact Lagnaa directly for current dietary or allergy guidance.`
  }

  if (/chicken|mutton|meat|non-veg|non veg/.test(query)) {
    return `For chicken, a few published menu choices are ${recommendations(chickenIdeas)}. I can look up another dish if you name it.`
  }

  if (/spicy|spice|chilli|chili|hot/.test(query)) {
    return 'Lagnaa’s published menu describes spice levels from 1 to 6, and the Chilli Challenge is one of its signature experiences. Tell me which dish you are considering and I can look up its published menu entry. Please ask Lagnaa directly about your preferred level and dietary needs.'
  }

  const matchedItems = menuItems.filter((item) => {
    const candidate = `${item.name} ${item.description ?? ''}`.toLowerCase()
    return query.split(/\s+/).filter((word) => word.length > 3).some((word) => candidate.includes(word))
  }).slice(0, 3)

  if (/price|cost|how much|menu/.test(query) || matchedItems.length) {
    if (matchedItems.length) {
      return `Here’s what I found on the published menu: ${matchedItems.map((item) => `${item.name} — ${formatPrice(item)}`).join('; ')}. Prices and availability may change, so please check the menu before visiting.`
    }
    return 'The menu includes à la carte dishes, single meals, biryani, kids’ meals, set menus and drinks. Name a dish—such as Butter Chicken, Paneer Butter Masala or Mango Lassi—and I will look up its published price.'
  }

  return 'I’m currently a demo concierge. Ask me for a dish recommendation, a published menu price, an experience, or help preparing a reservation request.'
}

export function LagnaaConcierge() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isThinking, setIsThinking] = useState(false)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [lead, setLead] = useState<Lead>({ name: '', phone: '', email: '' })
  const [leadSaved, setLeadSaved] = useState(false)
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

  const ask = (prompt: string) => {
    const text = prompt.trim()
    if (!text || isThinking) return

    setMessages((current) => [...current, { id: nextMessageId.current++, speaker: 'visitor', text }])
    setInput('')
    setIsThinking(true)
    window.setTimeout(() => {
      appendAssistant(answerFor(text))
      if (/reserve|reserv|book|table|availability|available|slot/.test(text.toLowerCase())) setShowLeadForm(true)
      setIsThinking(false)
    }, 360)
  }

  const handleMessageSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    ask(input)
  }

  const handleLeadSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (lead.name.trim().length < 2 || !/^\+\d[\d\s()-]{6,}$/.test(lead.phone.trim())) {
      setLeadError('Enter your name and a phone number with country code.')
      return
    }

    setLeadError('')
    setLeadSaved(true)
    appendAssistant(`Thank you, ${lead.name.trim()}. Your demo enquiry has been captured in this browser only. It has not been sent to Lagnaa and no table has been confirmed.`)
  }

  return (
    <aside className={`lagnaa-concierge${isOpen ? ' lagnaa-concierge--open' : ''}`} aria-label="Lagnaa concierge demo">
      {isOpen ? (
        <section aria-describedby="concierge-demo-note" aria-label="Chat with the Lagnaa concierge" className="lagnaa-concierge__panel" role="dialog">
          <header className="lagnaa-concierge__header">
            <span className="lagnaa-concierge__icon" aria-hidden="true"><Sparkles size={16} /></span>
            <div>
              <p>Demo concierge</p>
              <h2>Lagnaa assistant</h2>
            </div>
            <button aria-label="Close chat" className="lagnaa-concierge__close" onClick={() => setIsOpen(false)} type="button"><X size={18} /></button>
          </header>

          <p className="lagnaa-concierge__notice" id="concierge-demo-note">Demo only — no live booking, calendar check, or data submission.</p>

          <div aria-live="polite" className="lagnaa-concierge__messages">
            {messages.map((message) => <p className={`lagnaa-concierge__message lagnaa-concierge__message--${message.speaker}`} key={message.id}>{message.text}</p>)}
            {isThinking ? <p className="lagnaa-concierge__message lagnaa-concierge__message--assistant lagnaa-concierge__typing"><span /><span /><span /><span className="sr-only">The concierge is preparing a reply</span></p> : null}

            {showLeadForm && !leadSaved ? (
              <form className="lagnaa-concierge__lead" onSubmit={handleLeadSubmit}>
                <h3>Prepare a reservation enquiry</h3>
                <p>Share your details for this demonstration. They stay in this browser and are not sent.</p>
                <label htmlFor="concierge-name">Name<input id="concierge-name" onChange={(event) => setLead((current) => ({ ...current, name: event.target.value }))} value={lead.name} /></label>
                <label htmlFor="concierge-phone">Phone number<input id="concierge-phone" inputMode="tel" onChange={(event) => setLead((current) => ({ ...current, phone: event.target.value }))} placeholder="+65 9784 4771" value={lead.phone} /></label>
                <label htmlFor="concierge-email">Email <em>Optional</em><input id="concierge-email" inputMode="email" onChange={(event) => setLead((current) => ({ ...current, email: event.target.value }))} type="email" value={lead.email} /></label>
                {leadError ? <p className="lagnaa-concierge__error" role="alert">{leadError}</p> : null}
                <button type="submit">Save demo enquiry <ChevronDown size={14} aria-hidden="true" /></button>
              </form>
            ) : null}

            {leadSaved ? (
              <div className="lagnaa-concierge__handoff">
                <strong>Continue with your request</strong>
                <span>Choose a preferred date, time and party size on the reservation page. Live availability is still not connected.</span>
                <a href="/reservations">Open reservation request <span aria-hidden="true">↗</span></a>
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
      <button aria-expanded={isOpen} aria-label="Open Lagnaa concierge demo" className="lagnaa-concierge__launcher" onClick={() => setIsOpen(true)} type="button">
        <Bot size={20} aria-hidden="true" />
        <span>Ask Lagnaa</span>
        <MessageCircle size={16} aria-hidden="true" />
      </button>
    </aside>
  )
}
