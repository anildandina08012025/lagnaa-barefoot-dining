export type AnalyticsEventName =
  | 'reserve_click'
  | 'reservation_submit'
  | 'cooking_class_request_submit'
  | 'menu_view'
  | 'barefoot_view'
  | 'chilli_challenge_view'
  | 'experience_cta_click'
  | 'phone_click'
  | 'email_click'
  | 'directions_click'
  | 'whatsapp_click'

type AnalyticsPayload = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
    gtag?: (command: 'event', eventName: string, parameters?: AnalyticsPayload) => void
    fbq?: (command: 'trackCustom', eventName: string, parameters?: AnalyticsPayload) => void
  }
}

/**
 * Vendor-neutral event dispatcher. Google/Meta tags may initialise `gtag` or
 * `fbq` separately; no production measurement IDs are embedded in the app.
 */
export function trackEvent(eventName: AnalyticsEventName, payload: AnalyticsPayload = {}) {
  if (typeof window === 'undefined') return

  const eventPayload = { event: eventName, ...payload }
  window.dataLayer?.push(eventPayload)
  window.gtag?.('event', eventName, payload)
  window.fbq?.('trackCustom', eventName, payload)
}

function eventForDestination(href: string): AnalyticsEventName | null {
  if (href === '/reservations' || href.includes('/reservations?')) return 'reserve_click'
  if (href === '/menu') return 'menu_view'
  if (href.startsWith('/experiences/barefoot-dining')) return 'barefoot_view'
  if (href.startsWith('/experiences/chilli-challenge')) return 'chilli_challenge_view'
  if (href.startsWith('tel:')) return 'phone_click'
  if (href.startsWith('mailto:')) return 'email_click'
  if (href.includes('google.com/maps') || href.startsWith('https://maps.apple.com/')) return 'directions_click'
  if (href.startsWith('https://wa.me/') || href.startsWith('https://api.whatsapp.com/')) return 'whatsapp_click'
  return null
}

export function trackLinkClick(anchor: HTMLAnchorElement) {
  const href = anchor.getAttribute('href')
  if (!href) return

  const eventName = eventForDestination(href)
  if (eventName) {
    trackEvent(eventName, { destination: href, page_path: window.location.pathname, link_text: anchor.textContent?.trim() || undefined })
    return
  }

  if (window.location.pathname.startsWith('/experiences/') && href.startsWith('/')) {
    trackEvent('experience_cta_click', { destination: href, page_path: window.location.pathname, link_text: anchor.textContent?.trim() || undefined })
  }
}

export function trackRouteView(pathname: string) {
  const eventName = pathname === '/menu'
    ? 'menu_view'
    : pathname === '/experiences/barefoot-dining'
      ? 'barefoot_view'
      : pathname === '/experiences/chilli-challenge'
        ? 'chilli_challenge_view'
        : null

  if (eventName) trackEvent(eventName, { page_path: pathname })
}
