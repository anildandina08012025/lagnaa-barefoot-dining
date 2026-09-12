import { restaurantConfig } from '../../config/restaurant'
import { Container } from '../layout/Container'
import { PageMetadata } from '../seo/PageMetadata'
import { CtaSection } from '../ui/CtaSection'
import { ReservationRequestForm } from '../ui/ReservationRequestForm'
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
        title="Reserve a Table | Lagnaa...barefoot dining Singapore"
        description="Plan a table reservation enquiry at Lagnaa...barefoot dining in Little India, Singapore, or explore Lagnaa...barefoot dining’s dining experiences before your visit."
        canonicalUrl={canonicalUrl}
      />
      <article className="reservations-page">
        <Container>
          <header className="reservations-page__intro">
            <p className="eyebrow">Reservations</p>
            <h1>Plan your table at Lagnaa...barefoot dining</h1>
            <p>Send your preferred visit details to Lagnaa...barefoot dining to confirm your reservation.</p>
          </header>

          <div className="reservations-page__grid">
            <section className="reservation-form-card reservation-journey" aria-labelledby="reservation-action-heading">
              <p className="eyebrow">Reserve a Table</p>
              <h2 id="reservation-action-heading">Confirm your reservation.</h2>
              <p className="reservation-journey__description">Share your preferred date, time and guest count to confirm your reservation.</p>
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
              <p className="eyebrow">Lagnaa...barefoot dining experiences</p>
              <h2 id="reservation-experience-heading">Explore the experience before you enquire.</h2>
              <p>Some Lagnaa...barefoot dining visits are shaped around specific experiences. View the current internal pages, then contact Lagnaa...barefoot dining for details.</p>
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
        </Container>
      </article>
      <TrustSignals compact />
      <VisitChooserSection id="reservation-visit-options" />
      <CtaSection
        eyebrow="Need help planning?"
        heading="Speak with Lagnaa...barefoot dining before your visit."
        description="Use the contact page for reservation enquiries or questions about the right Lagnaa...barefoot dining experience."
        primaryAction={{ label: 'Contact Lagnaa...barefoot dining', href: '/contact' }}
        secondaryAction={{ label: 'View Menu', href: '/menu', variant: 'outline' }}
      />
    </main>
  )
}
