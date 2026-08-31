import { restaurantConfig } from '../../config/restaurant'

function getWhatsAppUrl() {
  const number = restaurantConfig.phone?.replace(/\D/g, '')
  if (!number) return null

  const message = encodeURIComponent('Namaste Lagnaa, I would like to enquire before my visit.')
  return `https://wa.me/${number}?text=${message}`
}

export function FloatingWhatsApp() {
  const whatsAppUrl = getWhatsAppUrl()
  if (!whatsAppUrl) return null

  return (
    <aside className="lagnaa-concierge" aria-label="Contact Lagnaa">
      <a className="lagnaa-concierge__whatsapp" href={whatsAppUrl} target="_blank" rel="noopener noreferrer" aria-label="Enquire with Lagnaa on WhatsApp">
        <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
          <path fill="currentColor" d="M16.02 3.2c-6.95 0-12.6 5.56-12.6 12.4 0 2.18.58 4.3 1.68 6.16L3.31 28.8l7.23-1.84a12.74 12.74 0 0 0 5.48 1.23c6.95 0 12.61-5.56 12.61-12.4S22.97 3.2 16.02 3.2Zm0 22.9c-1.78 0-3.53-.45-5.08-1.31l-.36-.2-4.29 1.09 1.08-4.14-.24-.38a10.22 10.22 0 0 1-1.62-5.56c0-5.68 4.72-10.31 10.51-10.31 5.8 0 10.52 4.63 10.52 10.31 0 5.68-4.72 10.3-10.52 10.3Zm5.78-7.71c-.32-.16-1.88-.91-2.17-1.02-.29-.1-.5-.15-.71.16-.21.31-.82 1.01-1 1.22-.19.2-.37.23-.69.08-.32-.16-1.34-.49-2.55-1.55-.94-.83-1.58-1.86-1.76-2.17-.19-.31-.02-.48.14-.63.14-.14.32-.36.48-.54.16-.18.21-.31.32-.52.11-.2.05-.39-.03-.54-.08-.16-.71-1.68-.98-2.3-.26-.6-.52-.52-.71-.53h-.61c-.21 0-.55.08-.84.39-.29.31-1.1 1.06-1.1 2.58 0 1.52 1.13 2.99 1.29 3.2.16.2 2.23 3.34 5.4 4.68.76.32 1.35.51 1.81.65.76.24 1.45.21 2 .13.61-.09 1.88-.75 2.14-1.48.27-.73.27-1.35.19-1.48-.08-.13-.29-.21-.61-.36Z" />
        </svg>
        <span className="sr-only">WhatsApp</span>
      </a>
    </aside>
  )
}
