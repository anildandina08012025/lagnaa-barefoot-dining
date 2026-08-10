import { restaurantConfig } from '../../config/restaurant'
import { eventExperiences, experiences, experiencesContent } from '../../content/experiences'
import { Container } from '../layout/Container'
import { DevelopmentMedia } from '../media/DevelopmentMedia'
import { PageMetadata } from '../seo/PageMetadata'
import { Button } from '../ui/Button'
import { CtaSection } from '../ui/CtaSection'
import { SectionHeading } from '../ui/SectionHeading'

function TextArrow() {
  return <span aria-hidden="true">↗</span>
}

export function ExperiencesPage() {
  const { hero, introduction, barefootMedia, arusuvai, seo } = experiencesContent
  const barefootDining = experiences.find((experience) => experience.id === 'barefoot-dining')
  const canReserve = Boolean(restaurantConfig.links.reservation)
  const canonicalUrl = restaurantConfig.siteUrl ? `${restaurantConfig.siteUrl.replace(/\/$/, '')}/experiences` : undefined

  return (
    <main id="main-content">
      <PageMetadata title={seo.title} description={seo.description} canonicalUrl={canonicalUrl} />
      <article>
        <section className="experiences-hero" aria-labelledby="experiences-heading">
          <Container className="experiences-hero__grid">
            <div className="experiences-hero__content">
              <p className="eyebrow experiences-hero__eyebrow">{hero.eyebrow}</p>
              <h1 className="experiences-hero__heading" id="experiences-heading">{hero.heading}</h1>
              <p className="experiences-hero__description">{hero.description}</p>
              <div className="experiences-hero__actions">
                <Button href={restaurantConfig.links.reservation} disabled={!canReserve} variant="light">Reserve a Table</Button>
                <a className="text-link text-link--light" href="#experience-overview">Explore experiences <TextArrow /></a>
              </div>
            </div>
            <DevelopmentMedia media={hero.media} className="experiences-hero__media" priority />
          </Container>
        </section>

        <section className="experiences-section experiences-introduction" aria-labelledby="experiences-introduction-heading">
          <Container narrow>
            <SectionHeading eyebrow={introduction.eyebrow} heading={introduction.heading} align="center" level={2} id="experiences-introduction-heading" />
            <div className="experiences-introduction__copy">
              {introduction.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="experiences-introduction__action"><a className="text-link" href="/our-story">Discover our story <TextArrow /></a></div>
          </Container>
        </section>

        <section className="experiences-section events-collection" id="experience-overview" aria-labelledby="events-collection-heading">
          <Container>
            <div className="events-collection__heading-row">
              <SectionHeading eyebrow="Events at Lagnaa" heading="Food, culture and shared experiences." level={2} id="events-collection-heading" />
              <p>Explore the official event pages for the latest details. Some experiences are presented as cultural or past initiatives where current availability has not been confirmed.</p>
            </div>
            <div className="events-collection__grid">
              {eventExperiences.map((event) => (
                <article className="event-card" id={event.id} key={event.id}>
                  <img className="event-card__image" src={event.image} alt={event.imageAlt} width="1600" height="1066" />
                  <div className="event-card__content">
                    <p className="eyebrow">{event.eyebrow}</p>
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                    <p className="event-card__availability">{event.availabilityNote}</p>
                    {event.detailPath ? (
                      <a className="text-link" href={event.detailPath}>{event.detailActionLabel ?? 'Explore experience'} <TextArrow /></a>
                    ) : event.action === 'contact' ? (
                      <Button href="/contact" variant="primary">Register Interest</Button>
                    ) : (
                      <a className="text-link" href={event.officialDetailsUrl} target="_blank" rel="noopener noreferrer">View official details <TextArrow /></a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="experiences-section experiences-overview" id="dining-overview" aria-labelledby="experience-overview-heading">
          <Container>
            <div className="experiences-overview__heading-row">
              <SectionHeading eyebrow="Choose your setting" heading="Two ways to dine at Lagnaa." level={2} id="experience-overview-heading" />
              <p>View the current official details before making your reservation.</p>
            </div>
            <div className="experience-overview-list">
              {experiences.map((experience) => (
                <section className="experience-overview-list__item" key={experience.id} aria-labelledby={`${experience.id}-heading`}>
                  <span className="experience-overview-list__number" aria-hidden="true">0{experience.displayOrder}</span>
                  <div>
                    <h3 id={`${experience.id}-heading`}>{experience.publicName}</h3>
                    <p>{experience.shortDescription}</p>
                  </div>
                  <a className="text-link" href={experience.officialDetailsUrl} target="_blank" rel="noreferrer">
                    View current details <TextArrow />
                  </a>
                </section>
              ))}
            </div>
          </Container>
        </section>

        {barefootDining ? (
          <section className="experiences-section experiences-barefoot" aria-labelledby="barefoot-feature-heading">
            <Container className="experiences-barefoot__grid">
              <DevelopmentMedia media={barefootMedia} className="experiences-barefoot__media" />
              <div className="experiences-barefoot__copy">
                <SectionHeading eyebrow="Barefoot Dining" heading="A signature Lagnaa experience." level={2} id="barefoot-feature-heading" />
                <div className="editorial-copy">
                  {barefootDining.longIntroduction?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
                <div className="experiences-barefoot__actions">
                  <a className="button button--light" href={barefootDining.officialDetailsUrl} target="_blank" rel="noreferrer">View Barefoot Dining details <TextArrow /></a>
                  <Button href={restaurantConfig.links.reservation} disabled={!canReserve} variant="outline">Reserve a Table</Button>
                </div>
              </div>
            </Container>
          </section>
        ) : null}

        <section className="experiences-section experiences-arusuvai" aria-labelledby="experiences-arusuvai-heading">
          <Container className="experiences-arusuvai__grid">
            <div className="experiences-arusuvai__motif" aria-hidden="true"><span>VI</span><small>Six flavours</small></div>
            <div className="experiences-arusuvai__copy">
              <SectionHeading eyebrow={arusuvai.eyebrow} heading={arusuvai.heading} description={arusuvai.description} tone="dark" level={2} id="experiences-arusuvai-heading" />
              <a className="text-link text-link--light" href="/menu">Explore the menu <TextArrow /></a>
            </div>
          </Container>
        </section>

        <section className="experiences-section experiences-plan" aria-labelledby="experiences-plan-heading">
          <Container className="experiences-plan__grid">
            <SectionHeading eyebrow="Plan your experience" heading="Choose a date, or speak with Lagnaa." description="For the latest experience details or a question before booking, contact the restaurant directly." level={2} id="experiences-plan-heading" />
            <div className="experiences-plan__details">
              {restaurantConfig.address ? <p className="experiences-plan__address">{restaurantConfig.address}</p> : null}
              <div className="experiences-plan__actions">
                <Button href={restaurantConfig.links.reservation} disabled={!canReserve} variant="primary">Reserve a Table</Button>
                {restaurantConfig.phone ? <a className="text-link" href={`tel:${restaurantConfig.phone.replace(/\s/g, '')}`}>Call Lagnaa <TextArrow /></a> : null}
                {restaurantConfig.email ? <a className="text-link" href={`mailto:${restaurantConfig.email}`}>Email Lagnaa <TextArrow /></a> : null}
              </div>
            </div>
          </Container>
        </section>

        <CtaSection
          eyebrow="Your table at Lagnaa"
          heading="Choose your Lagnaa experience."
          description="Reserve a table or explore the menu before you visit."
          primaryAction={{ label: 'Reserve a Table', href: restaurantConfig.links.reservation }}
          secondaryAction={{ label: 'View Menu', href: '/menu', variant: 'outline' }}
        />
      </article>
    </main>
  )
}
