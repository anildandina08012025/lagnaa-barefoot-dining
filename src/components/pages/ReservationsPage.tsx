import { restaurantConfig } from '../../config/restaurant'
import { Container } from '../layout/Container'
import { PageMetadata } from '../seo/PageMetadata'
import { CtaSection } from '../ui/CtaSection'
import { GoogleReviewsSection } from '../ui/GoogleReviewsSection'
import { ReservationRequestForm } from '../ui/ReservationRequestForm'
import { TestimonialRequestSection } from '../ui/TestimonialRequestSection'
import { TrustSignals } from '../ui/TrustSignals'
import { VisitChooserSection } from '../ui/VisitChooserSection'

function TextArrow() {
  return <span aria-hidden="true">↗</span>
}

const experienceLinks = [
  { label: 'Barefoot Dining', href: '/experiences/barefoot-dining', action: 'Discover' },
  { label: 'Ultimate Chilli Challenge', href: '/experiences/chilli-challenge', action: 'Explore' },
  { label: 'Monthly Dégustation', href: '/events/monthly-degustation', action: 'Explore' },
  { label: 'Cooking with Chef Kaesavan', href: '/events/cooking-with-chef-kaesavan', action: 'Learn More' },
] as const

export function ReservationsPage() {
  const canonicalUrl = restaurantConfig.siteUrl ? `${restaurantConfig.siteUrl.replace(/\/$/, '')}/reservations` : undefined

  return (
    <main id="main-content">
      <PageMetadata
        title="Reserve a Table | Lagnaa Barefoot Dining Singapore"
        description="Plan a table reservation enquiry at Lagnaa Barefoot Dining in Little India, Singapore, or explore Lagnaa’s dining experiences before your visit."
        canonicalUrl={canonicalUrl}
      />
      <article className="reservations-page">
        <Container>
          <header className="reservations-page__intro">
            <p className="eyebrow">Reservations</p>
            <h1>Plan your table at Lagnaa.</h1>
            <p>Send your preferred visit details to Lagnaa. This creates a pending request only; the restaurant will confirm reservation details directly.</p>
          </header>

          <div className="reservations-page__grid">
            <aside className="reservations-page__overview" aria-labelledby="reservation-guidance-heading">
              <p className="eyebrow">Plan your visit</p>
              <h2 id="reservation-guidance-heading">Owner approval first.</h2>
              <p>The website does not show live table availability. Every request is reviewed by Lagnaa before a table is confirmed.</p>
              {restaurantConfig.phone ? (
                <a className="text-link" href={`tel:${restaurantConfig.phone.replace(/\s/g, '')}`}>Call Lagnaa <TextArrow /></a>
              ) : null}
            </aside>

            <section className="reservation-form-card reservation-journey" aria-labelledby="reservation-action-heading">
              <p className="eyebrow">Reserve a Table</p>
              <h2 id="reservation-action-heading">Send a reservation request.</h2>
              <p className="reservation-journey__description">Share your preferred date, time and guest count. Lagnaa will review the request and confirm directly.</p>
              <ReservationRequestForm />
              <div className="reservation-journey__support">
                {restaurantConfig.phone ? <p>Phone: <a href={`tel:${restaurantConfig.phone.replace(/\s/g, '')}`}>{restaurantConfig.phone}</a></p> : null}
                {restaurantConfig.email ? <p>Email: <a href={`mailto:${restaurantConfig.email}`}>{restaurantConfig.email}</a></p> : null}
                {restaurantConfig.address ? <p>Address: {restaurantConfig.address}</p> : null}
                {restaurantConfig.mapsUrl ? <a className="text-link" href={restaurantConfig.mapsUrl} target="_blank" rel="noopener noreferrer">Get Directions on Google Maps <TextArrow /></a> : null}
              </div>
            </section>
          </div>

          <section className="reservation-experience-bridge" aria-labelledby="reservation-experience-heading">
            <div>
              <p className="eyebrow">Lagnaa experiences</p>
              <h2 id="reservation-experience-heading">Explore the experience before you enquire.</h2>
              <p>Some Lagnaa visits are shaped around specific experiences. View the current internal pages, then contact Lagnaa for details.</p>
            </div>
            <div className="reservation-experience-bridge__links">
              {experienceLinks.map((experience) => (
                <a href={experience.href} key={experience.href}>
                  <span>{experience.label}</span>
                  <em>{experience.action} <TextArrow /></em>
                </a>
              ))}
            </div>
          </section>

          <GoogleReviewsSection enabled />
          <TestimonialRequestSection compact />
        </Container>
      </article>
      <TrustSignals compact />
      <VisitChooserSection id="reservation-visit-options" />
      <CtaSection
        eyebrow="Need help planning?"
        heading="Speak with Lagnaa before your visit."
        description="Use the contact page for reservation enquiries or questions about the right Lagnaa experience."
        primaryAction={{ label: 'Contact Lagnaa', href: '/contact' }}
        secondaryAction={{ label: 'View Menu', href: '/menu', variant: 'outline' }}
      />
    </main>
  )
}
