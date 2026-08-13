import arusuvaiDetailImage from '../../assets/gallery/lagnaa-arusuvai-detail.jpg'
import arusuvaiPlatterImage from '../../assets/gallery/lagnaa-arusuvai-platter.jpg'
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

const pageTitle = 'Indian Restaurant in Singapore | Lagnaa Barefoot Dining'
const pageDescription = 'Explore Lagnaa Barefoot Dining, an Indian restaurant in Singapore with Indian food, Barefoot Dining, dining experiences and visit details in Little India.'

export function IndianRestaurantSingaporePage() {
  const canonicalUrl = restaurantConfig.siteUrl ? `${restaurantConfig.siteUrl.replace(/\/$/, '')}/indian-restaurant-singapore` : undefined
  const canReserve = Boolean(restaurantConfig.links.reservation)

  return (
    <main id="main-content">
      <PageMetadata title={pageTitle} description={pageDescription} canonicalUrl={canonicalUrl} />
      <article>
        <section className="story-hero local-seo-hero" aria-labelledby="indian-restaurant-singapore-heading">
          <Container className="story-hero__grid">
            <div className="story-hero__content">
              <p className="eyebrow">Indian Restaurant in Singapore</p>
              <h1 className="story-hero__heading" id="indian-restaurant-singapore-heading">Indian food, hospitality and Lagnaa’s own dining experience.</h1>
              <p className="story-hero__description">
                Lagnaa Barefoot Dining is an Indian restaurant in Singapore, located in Little India and shaped around Indian flavours, shared meals and distinctive Lagnaa experiences.
              </p>
              <div className="story-barefoot__actions">
                <Button href={restaurantConfig.links.reservation} disabled={!canReserve} variant="primary">Reserve a Table</Button>
                <Button href="/menu" variant="outline">Explore the Menu</Button>
              </div>
            </div>
            <DevelopmentMedia
              image={arusuvaiPlatterImage}
              imageAlt="A selection of Indian dishes at Lagnaa Barefoot Dining in Singapore."
              media={{ subject: 'Indian food in Singapore', detail: 'Shared Indian dining photograph for restaurant discovery.', format: 'portrait', tone: 'ember' }}
              className="story-hero__media"
              priority
            />
          </Container>
        </section>

        <section className="story-section story-main" aria-labelledby="singapore-indian-food-heading">
          <Container className="story-main__grid">
            <div className="story-main__marker" aria-hidden="true">01</div>
            <div className="story-main__copy">
              <SectionHeading eyebrow="Food at Lagnaa" heading="Explore Indian flavours in Singapore." level={2} id="singapore-indian-food-heading" />
              <div className="editorial-copy">
                <p>
                  Lagnaa’s food offering is rooted in Indian cuisine and the Arusuvai idea of six flavours: a way to consider balance, contrast and discovery across a meal.
                </p>
                <p>
                  Visitors can browse the menu before visiting, then contact Lagnaa directly for current details.
                </p>
              </div>
              <a className="text-link" href="/menu">Browse the menu <TextArrow /></a>
            </div>
            <DevelopmentMedia
              image={arusuvaiDetailImage}
              imageAlt="A detailed view of a Lagnaa Indian food platter."
              media={{ subject: 'Indian menu detail', detail: 'Food detail photograph for menu exploration.', format: 'landscape', tone: 'saffron' }}
              className="story-main__media"
            />
          </Container>
        </section>

        <section className="story-section story-arusuvai" aria-labelledby="singapore-experiences-heading">
          <Container className="story-arusuvai__grid">
            <div className="story-arusuvai__seal" aria-hidden="true"><span>VI</span><small>Six flavours</small></div>
            <div className="story-arusuvai__copy">
              <SectionHeading
                eyebrow="Dining experiences"
                heading="Choose how you want to experience Lagnaa."
                description="Alongside a standard table visit, Lagnaa highlights Barefoot Dining, the Ultimate Chilli Challenge, Monthly Dégustation and Cooking with Chef Kaesavan."
                tone="dark"
                level={2}
                id="singapore-experiences-heading"
              />
              <a className="text-link text-link--light" href="/events">Explore experiences <TextArrow /></a>
            </div>
          </Container>
        </section>

        <section className="story-section story-food-philosophy" aria-labelledby="singapore-location-heading">
          <Container className="story-food-philosophy__grid">
            <DevelopmentMedia
              media={{ subject: 'Little India setting', detail: 'Warm restaurant or neighbourhood atmosphere for local discovery.', format: 'landscape', tone: 'cocoa' }}
              className="story-food-philosophy__media"
            />
            <div className="story-food-philosophy__copy">
              <SectionHeading eyebrow="Visit Lagnaa" heading="Located in Little India, Singapore." level={2} id="singapore-location-heading" />
              <div className="editorial-copy">
                <p>
                  Lagnaa Barefoot Dining is located at {restaurantConfig.address}.
                </p>
                <p>
                  Use the contact page for phone, email and reservation enquiry details before your visit.
                </p>
              </div>
              <Button href="/contact" variant="outline">Plan Your Visit</Button>
            </div>
          </Container>
        </section>

        <CtaSection
          eyebrow="Indian restaurant in Singapore"
          heading="Plan your Lagnaa visit."
          description="Explore the menu, discover Lagnaa’s experiences or contact the restaurant directly."
          primaryAction={{ label: 'Reserve a Table', href: restaurantConfig.links.reservation }}
          secondaryAction={{ label: 'Contact Lagnaa', href: '/contact', variant: 'outline' }}
        />
      </article>
    </main>
  )
}
