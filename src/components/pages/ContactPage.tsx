import { restaurantConfig } from '../../config/restaurant'
import { contactPageContent } from '../../content/contact'
import { Container } from '../layout/Container'
import { PageMetadata } from '../seo/PageMetadata'
import { Button } from '../ui/Button'
import { CtaSection } from '../ui/CtaSection'
import { SectionHeading } from '../ui/SectionHeading'
import { TestimonialRequestSection } from '../ui/TestimonialRequestSection'
import { TrustSignals } from '../ui/TrustSignals'

function TextArrow() {
  return <span aria-hidden="true">↗</span>
}

export function ContactPage() {
  const content = contactPageContent
  const phoneHref = restaurantConfig.phone ? `tel:${restaurantConfig.phone.replace(/\s/g, '')}` : null
  const canonicalUrl = restaurantConfig.siteUrl ? `${restaurantConfig.siteUrl.replace(/\/$/, '')}/contact` : undefined

  return (
    <main id="main-content">
      <PageMetadata title={content.seo.title} description={content.seo.description} canonicalUrl={canonicalUrl} />
      <article>
        <section className="contact-hero" aria-labelledby="contact-heading">
          <Container className="contact-hero__grid">
            <div className="contact-hero__content">
              <p className="eyebrow contact-hero__eyebrow">{content.hero.eyebrow}</p>
              <h1 className="contact-hero__heading" id="contact-heading">{content.hero.heading}</h1>
              <p className="contact-hero__description">{content.hero.description}</p>
              <div className="contact-hero__actions">
                {restaurantConfig.links.reservation ? <Button href={restaurantConfig.links.reservation} variant="light">Reserve a Table</Button> : null}
                {phoneHref ? <Button href={phoneHref} variant="outline">Call Lagnaa</Button> : null}
              </div>
            </div>
            <div className="contact-hero__ornament" aria-hidden="true">
              <span>Visit</span>
              <i />
              <small>{restaurantConfig.location}</small>
            </div>
          </Container>
        </section>

        <section className="contact-section contact-visit" aria-labelledby="contact-visit-heading">
          <Container className="contact-visit__grid">
            <SectionHeading eyebrow={content.visit.eyebrow} heading={content.visit.heading} level={2} id="contact-visit-heading" />
            <div className="contact-visit__details">
              <address className="contact-visit__address">
                <strong>{restaurantConfig.name}</strong>
                {restaurantConfig.address ? <span>{restaurantConfig.address}</span> : null}
              </address>
              <p className="contact-visit__seo-link">
                Plan your visit to Lagnaa as an <a href="/indian-restaurant-singapore">Indian restaurant in Singapore</a>.
              </p>
              <dl className="contact-detail-list">
                {restaurantConfig.phone ? (
                  <div>
                    <dt>Telephone</dt>
                    <dd><a href={phoneHref ?? undefined}>{restaurantConfig.phone}</a></dd>
                  </div>
                ) : null}
                {restaurantConfig.email ? (
                  <div>
                    <dt>Email</dt>
                    <dd><a href={`mailto:${restaurantConfig.email}`}>{restaurantConfig.email}</a></dd>
                  </div>
                ) : null}
              </dl>
            </div>
          </Container>
        </section>

        <section className="contact-section contact-reservations" aria-labelledby="contact-reservations-heading">
          <Container className="contact-reservations__grid">
            <span className="contact-reservations__marker" aria-hidden="true">01</span>
            <div className="contact-reservations__copy">
              <SectionHeading eyebrow={content.reservations.eyebrow} heading={content.reservations.heading} description={content.reservations.description} tone="dark" level={2} id="contact-reservations-heading" />
              <div className="contact-reservations__actions">
                {restaurantConfig.links.reservation ? <Button href={restaurantConfig.links.reservation} variant="light">Reserve a Table</Button> : null}
                {phoneHref ? <a className="text-link text-link--light" href={phoneHref}>Call Lagnaa <TextArrow /></a> : null}
              </div>
            </div>
          </Container>
        </section>

        <section className="contact-section contact-barefoot" aria-labelledby="contact-barefoot-heading">
          <Container className="contact-barefoot__grid">
            <div className="contact-barefoot__copy">
              <SectionHeading eyebrow={content.barefootDining.eyebrow} heading={content.barefootDining.heading} description={content.barefootDining.description} level={2} id="contact-barefoot-heading" />
              <div className="contact-barefoot__actions">
                <Button href="/experiences/barefoot-dining" variant="outline">Discover Barefoot Dining</Button>
                {restaurantConfig.email ? <a className="text-link" href={`mailto:${restaurantConfig.email}`}>Email Lagnaa <TextArrow /></a> : null}
              </div>
            </div>
            <div className="contact-barefoot__ornament" aria-hidden="true"><span>Discover</span></div>
          </Container>
        </section>

        <section className="contact-section contact-requirements" aria-labelledby="contact-requirements-heading">
          <Container className="contact-requirements__grid">
            <SectionHeading eyebrow={content.individualRequirements.eyebrow} heading={content.individualRequirements.heading} description={content.individualRequirements.description} level={2} id="contact-requirements-heading" />
            <div className="contact-requirements__actions">
              {phoneHref ? <Button href={phoneHref} variant="primary">Call Lagnaa</Button> : null}
              {restaurantConfig.email ? <Button href={`mailto:${restaurantConfig.email}`} variant="outline">Email Lagnaa</Button> : null}
            </div>
          </Container>
        </section>

        <TrustSignals compact />

        <TestimonialRequestSection compact />

        <section className="contact-section contact-explore" aria-labelledby="contact-explore-heading">
          <Container>
            <SectionHeading eyebrow="Explore Lagnaa" heading="Continue your Lagnaa journey." level={2} id="contact-explore-heading" />
            <div className="contact-explore__links">
              {content.explore.map((item) => (
                <a href={item.href} key={item.href}>
                  <div><h3>{item.label}</h3><p>{item.description}</p></div>
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </Container>
        </section>

        <CtaSection
          eyebrow={content.cta.eyebrow}
          heading={content.cta.heading}
          description={content.cta.description}
          primaryAction={restaurantConfig.links.reservation ? { label: 'Reserve a Table', href: restaurantConfig.links.reservation } : undefined}
          secondaryAction={phoneHref ? { label: 'Call Lagnaa', href: phoneHref, variant: 'outline' } : undefined}
        />
      </article>
    </main>
  )
}
