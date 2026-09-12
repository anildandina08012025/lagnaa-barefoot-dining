import arusuvaiPlatterImage from '../../assets/gallery/lagnaa-arusuvai-platter.jpg'
import elaiKoliImage from '../../assets/gallery/lagnaa-elai-koli.jpg'
import miniPuriImage from '../../assets/gallery/lagnaa-mini-puri.jpg'
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

const pageTitle = 'Indian Food in Singapore | Lagnaa...barefoot dining'
const pageDescription = 'Explore Indian food in Singapore at Lagnaa...barefoot dining, including menu highlights, shared dishes, Barefoot Dining and spice-led experiences.'

export function BestIndianFoodSingaporePage() {
  const canonicalUrl = restaurantConfig.siteUrl ? `${restaurantConfig.siteUrl.replace(/\/$/, '')}/best-indian-food-singapore` : undefined
  const canReserve = Boolean(restaurantConfig.links.reservation)

  return (
    <main id="main-content">
      <PageMetadata title={pageTitle} description={pageDescription} canonicalUrl={canonicalUrl} />
      <article>
        <section className="story-hero local-seo-hero" aria-labelledby="indian-food-singapore-heading">
          <Container className="story-hero__grid">
            <div className="story-hero__content">
              <p className="eyebrow">Indian Food Singapore</p>
              <h1 className="story-hero__heading" id="indian-food-singapore-heading">Explore Indian flavours at Lagnaa...barefoot dining.</h1>
              <p className="story-hero__description">
                If you are searching for Indian food in Singapore, Lagnaa...barefoot dining offers a menu-led way to explore Indian flavours in Little India.
              </p>
              <div className="story-barefoot__actions">
                <Button href="/menu" variant="primary">Explore the Menu</Button>
                <Button href={restaurantConfig.links.reservation} disabled={!canReserve} variant="outline">Reserve a Table</Button>
              </div>
            </div>
            <DevelopmentMedia
              image={arusuvaiPlatterImage}
              imageAlt="A selection of Indian dishes at Lagnaa...barefoot dining."
              media={{ subject: 'Indian food in Singapore', detail: 'Shared Indian food photograph for menu discovery.', format: 'portrait', tone: 'ember' }}
              className="story-hero__media"
              priority
            />
          </Container>
        </section>

        <section className="story-section story-main" aria-labelledby="indian-food-menu-heading">
          <Container className="story-main__grid">
            <div className="story-main__marker" aria-hidden="true">01</div>
            <div className="story-main__copy">
              <SectionHeading eyebrow="Menu discovery" heading="Browse dishes, flavours and spice-led selections." level={2} id="indian-food-menu-heading" />
              <div className="editorial-copy">
                <p>
                  Lagnaa...barefoot dining’s menu includes Indian food selections for shared dining, individual meals, drinks and spice-focused exploration.
                </p>
                <p>
                  Menu details can be confirmed directly with Lagnaa...barefoot dining before your visit.
                </p>
              </div>
              <a className="text-link" href="/menu">View the menu <TextArrow /></a>
            </div>
            <DevelopmentMedia
              image={elaiKoliImage}
              imageAlt="A Lagnaa...barefoot dining Indian dish served on a banana leaf."
              media={{ subject: 'Indian dish at Lagnaa...barefoot dining', detail: 'Dish photograph for Indian food discovery.', format: 'landscape', tone: 'saffron' }}
              className="story-main__media"
            />
          </Container>
        </section>

        <section className="story-section story-food-philosophy" aria-labelledby="indian-food-experience-heading">
          <Container className="story-food-philosophy__grid">
            <DevelopmentMedia
              image={miniPuriImage}
              imageAlt="A Lagnaa...barefoot dining dish photographed for the restaurant gallery."
              media={{ subject: 'Indian food detail', detail: 'Food photograph supporting the Lagnaa...barefoot dining menu story.', format: 'landscape', tone: 'cocoa' }}
              className="story-food-philosophy__media"
            />
            <div className="story-food-philosophy__copy">
              <SectionHeading eyebrow="Beyond the menu" heading="Food connected to experience." level={2} id="indian-food-experience-heading" />
              <div className="editorial-copy">
                <p>
                  Lagnaa...barefoot dining’s Indian food story is also connected to Barefoot Dining, the Ultimate Chilli Challenge, food-tasting experiences and cooking-class enquiries.
                </p>
                <p>
                  These pages help visitors choose the right Lagnaa...barefoot dining visit before contacting the restaurant.
                </p>
              </div>
              <Button href="/events" variant="outline">Explore Experiences</Button>
            </div>
          </Container>
        </section>

        <section className="story-section story-little-india" aria-labelledby="indian-food-location-heading">
          <Container className="story-little-india__grid">
            <SectionHeading
              eyebrow="Visit Lagnaa...barefoot dining"
              heading="Indian food in Little India, Singapore."
              description={`Lagnaa...barefoot dining is located at ${restaurantConfig.address}. Use the reservation or contact pages to plan your visit.`}
              level={2}
              id="indian-food-location-heading"
            />
            <div className="story-little-india__action">
              <Button href="/reservations" variant="primary">Reserve a Table</Button>
              <a className="text-link" href="/contact">Contact Lagnaa...barefoot dining <TextArrow /></a>
            </div>
          </Container>
        </section>

        <CtaSection
          eyebrow="Indian food Singapore"
          heading="Explore Lagnaa...barefoot dining before you visit."
          description="Browse the menu, view the gallery or contact Lagnaa...barefoot dining for current details."
          primaryAction={{ label: 'Explore the Menu', href: '/menu' }}
          secondaryAction={{ label: 'View Gallery', href: '/gallery', variant: 'outline' }}
        />
      </article>
    </main>
  )
}
