import michelinDishImage from '../../assets/gallery/lagnaa-arusuvai-platter.jpg'
import diningImage from '../../assets/gallery/lagnaa-elai-koli.jpg'
import { restaurantConfig } from '../../config/restaurant'
import { Container } from '../layout/Container'
import { DevelopmentMedia } from '../media/DevelopmentMedia'
import { PageMetadata } from '../seo/PageMetadata'
import { Button } from '../ui/Button'
import { CtaSection } from '../ui/CtaSection'
import { SectionHeading } from '../ui/SectionHeading'

function TextArrow() {
  return <span aria-hidden="true">↗</span>
}

const pageTitle = 'MICHELIN Guide Indian Restaurant Singapore | Lagnaa...barefoot dining'
const pageDescription = 'Explore Lagnaa...barefoot dining, a Michelin Awarded Indian restaurant in Singapore, referenced through its official MICHELIN Guide listing.'
const michelinListingUrl = 'https://guide.michelin.com/sg/en/singapore-region/singapore/restaurant/lagnaa'

export function MichelinIndianRestaurantSingaporePage() {
  const canonicalUrl = restaurantConfig.siteUrl ? `${restaurantConfig.siteUrl.replace(/\/$/, '')}/michelin-indian-restaurant-singapore` : undefined
  const canReserve = Boolean(restaurantConfig.links.reservation)

  return (
    <main id="main-content">
      <PageMetadata title={pageTitle} description={pageDescription} canonicalUrl={canonicalUrl} />
      <article>
        <section className="story-hero local-seo-hero" aria-labelledby="michelin-indian-heading">
          <Container className="story-hero__grid">
            <div className="story-hero__content">
              <p className="eyebrow">MICHELIN Guide Indian Restaurant Singapore</p>
              <h1 className="story-hero__heading" id="michelin-indian-heading">Michelin Awarded Indian dining at Lagnaa...barefoot dining.</h1>
              <p className="story-hero__description">
                Lagnaa...barefoot dining is a Michelin Awarded Indian restaurant in Singapore, referenced through its official MICHELIN Guide listing.
              </p>
              <div className="story-barefoot__actions">
                <Button href="/awards-media" variant="primary">View Awards & Media</Button>
                <Button href={restaurantConfig.links.reservation} disabled={!canReserve} variant="outline">Reserve a Table</Button>
              </div>
            </div>
            <DevelopmentMedia
              image={michelinDishImage}
              imageAlt="A selection of Indian dishes at Lagnaa...barefoot dining."
              media={{ subject: 'Lagnaa...barefoot dining Indian dining', detail: 'Food photograph supporting the Michelin Awarded story.', format: 'portrait', tone: 'ember' }}
              className="story-hero__media"
              priority
            />
          </Container>
        </section>

        <section className="story-section story-main" aria-labelledby="michelin-source-heading">
          <Container className="story-main__grid">
            <div className="story-main__marker" aria-hidden="true">01</div>
            <div className="story-main__copy">
              <SectionHeading eyebrow="Recognition" heading="Use the official MICHELIN Guide listing as the source." level={2} id="michelin-source-heading" />
              <div className="editorial-copy">
                <p>
                  The site treats Lagnaa...barefoot dining’s official MICHELIN Guide restaurant listing as the primary reference for its Michelin Awarded status.
                </p>
                <p>
                  The wording follows the restaurant’s approved language: Michelin Awarded, supported by the official MICHELIN Guide listing.
                </p>
              </div>
              <a className="text-link" href={michelinListingUrl} target="_blank" rel="noopener noreferrer" aria-label="View Lagnaa...barefoot dining’s official MICHELIN Guide listing">
                View official MICHELIN Guide listing <TextArrow />
              </a>
            </div>
            <DevelopmentMedia
              image={diningImage}
              imageAlt="A Lagnaa...barefoot dining Indian dish served on a banana leaf."
              media={{ subject: 'Indian dining at Lagnaa...barefoot dining', detail: 'Dish photograph for the recognition page.', format: 'landscape', tone: 'saffron' }}
              className="story-main__media"
            />
          </Container>
        </section>

        <section className="story-section story-little-india" aria-labelledby="michelin-location-heading">
          <Container className="story-little-india__grid">
            <SectionHeading
              eyebrow="Little India"
              heading="Recognised Indian dining in Singapore."
              description={`Lagnaa...barefoot dining is located at ${restaurantConfig.address}. Visitors can explore the menu, gallery and experience pages before reserving or contacting the restaurant.`}
              level={2}
              id="michelin-location-heading"
            />
            <div className="story-little-india__action">
              <Button href="/menu" variant="primary">Explore the Menu</Button>
              <a className="text-link" href="/contact">Contact Lagnaa...barefoot dining <TextArrow /></a>
            </div>
          </Container>
        </section>

        <section className="story-section story-food-philosophy" aria-labelledby="michelin-experience-heading">
          <Container className="story-food-philosophy__grid">
            <div className="story-food-philosophy__media story-placeholder-card" aria-hidden="true">
              <p className="story-placeholder-card__eyebrow">Lagnaa...barefoot dining Experiences</p>
              <p className="story-placeholder-card__title">Barefoot Dining · Chilli Challenge · Cooking Class</p>
            </div>
            <div className="story-food-philosophy__copy">
              <SectionHeading eyebrow="Explore more" heading="Recognition is only one part of the Lagnaa...barefoot dining story." level={2} id="michelin-experience-heading" />
              <div className="editorial-copy">
                <p>
                  Lagnaa...barefoot dining also gives visitors ways to explore the restaurant beyond a standard meal, including Barefoot Dining, the Ultimate Chilli Challenge and cooking-class enquiries.
                </p>
                <p>
                  Experience details can change, so the site keeps each journey clear without promising availability or confirmed participation.
                </p>
              </div>
              <Button href="/events" variant="outline">Explore Experiences</Button>
            </div>
          </Container>
        </section>

        <CtaSection
          eyebrow="MICHELIN Guide Indian restaurant Singapore"
          heading="Plan your Lagnaa...barefoot dining visit with the current site information."
          description="Explore the menu, recognition page and contact details before visiting Lagnaa...barefoot dining in Little India."
          primaryAction={{ label: 'Reserve a Table', href: '/reservations' }}
          secondaryAction={{ label: 'View Awards & Media', href: '/awards-media', variant: 'outline' }}
        />
      </article>
    </main>
  )
}
