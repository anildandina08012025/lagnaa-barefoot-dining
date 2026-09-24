import type { MouseEvent } from 'react'
import { restaurantConfig } from '../../config/restaurant'
import { Container } from '../layout/Container'
import { PageMetadata } from '../seo/PageMetadata'
import { Button } from '../ui/Button'

const openingHours = [
  'Casual Dining · 11:30 AM–10:30 PM',
  'Barefoot Dining · 11:30 AM–8:30 PM',
  'Tuesday–Sunday · Closed every Monday',
]

export function ContactPage() {
  const phoneHref = restaurantConfig.phone ? `tel:${restaurantConfig.phone.replace(/\s/g, '')}` : null
  const canonicalUrl = restaurantConfig.siteUrl ? `${restaurantConfig.siteUrl.replace(/\/$/, '')}/contact` : undefined
  const scrollToPhoneOnDesktop = (event: MouseEvent<HTMLElement>) => {
    if (!window.matchMedia('(min-width: 48rem)').matches) return

    event.preventDefault()
    const phone = document.getElementById('contact-phone')
    phone?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    phone instanceof HTMLAnchorElement && phone.focus({ preventScroll: true })
  }

  return (
    <main id="main-content">
      <PageMetadata
        title="Contact & Hours | Lagnaa...barefoot dining Singapore"
        description="Find Lagnaa...barefoot dining at 6 Upper Dickson Road in Little India, Singapore. View directions, contact details and opening hours."
        canonicalUrl={canonicalUrl}
      />

      <section className="contact-hero" aria-labelledby="contact-heading">
        <Container className="contact-hero__grid">
          <div className="contact-hero__content">
            <p className="eyebrow contact-hero__eyebrow">Plan your visit</p>
            <h1 className="contact-hero__heading" id="contact-heading">Contact &amp; Visit Lagnaa...barefoot dining</h1>
            <p className="contact-hero__description">Reserve a table, find the restaurant or contact Lagnaa...barefoot dining before your visit.</p>
            <div className="contact-hero__actions">
              {restaurantConfig.links.reservation ? <Button href={restaurantConfig.links.reservation} variant="light">Reserve a Table</Button> : null}
              {phoneHref ? <Button href={phoneHref} variant="outline" onClick={scrollToPhoneOnDesktop}>Call Lagnaa...barefoot dining</Button> : null}
            </div>
          </div>
          <div className="contact-hero__ornament" aria-hidden="true">
            <span>Visit</span>
            <i />
            <small>{restaurantConfig.location}</small>
          </div>
        </Container>
      </section>

      <section className="contact-essential" aria-label="Contact information">
        <Container>
          <div className="contact-essential__grid">
            <article className="contact-essential__card">
              <p className="eyebrow">Visit</p>
              <h2>6 Upper Dickson Road</h2>
              <p>Singapore 207466</p>
              {restaurantConfig.mapsUrl ? <a className="text-link" href={restaurantConfig.mapsUrl} target="_blank" rel="noopener noreferrer">Get Directions on Google Maps <span aria-hidden="true">↗</span></a> : null}
            </article>

            <article className="contact-essential__card">
              <p className="eyebrow">Contact</p>
              <h2>Get in touch</h2>
              <dl>
                {restaurantConfig.phone ? <div><dt>Telephone</dt><dd><a href={phoneHref ?? undefined} id="contact-phone">{restaurantConfig.phone}</a></dd></div> : null}
                {restaurantConfig.email ? <div><dt>Email</dt><dd><a href={`mailto:${restaurantConfig.email}`}>{restaurantConfig.email}</a></dd></div> : null}
              </dl>
            </article>

            <article className="contact-essential__card">
              <p className="eyebrow">Opening Hours</p>
              <h2>Tuesday–Sunday</h2>
              <ul>
                {openingHours.map((hours) => <li key={hours}>{hours}</li>)}
              </ul>
            </article>

            <article className="contact-essential__map" aria-label="Map to Lagnaa...barefoot dining">
              <iframe
                title="Map showing Lagnaa...barefoot dining in Little India"
                src="https://www.google.com/maps?q=6%20Upper%20Dickson%20Road%2C%20Singapore%20207466&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </article>
          </div>
        </Container>
      </section>
    </main>
  )
}
