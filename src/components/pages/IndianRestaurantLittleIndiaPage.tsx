import arusuvaiPlatterImage from '../../assets/gallery/lagnaa-arusuvai-platter.jpg'
import entranceTeamImage from '../../assets/gallery/lagnaa-entrance-team.jpg'
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

const pageTitle = 'Indian Restaurant in Little India Singapore | Lagnaa Barefoot Dining'
const pageDescription = 'Visit Lagnaa Barefoot Dining, an Indian restaurant on Upper Dickson Road in Little India, Singapore, with menu, gallery and reservation details.'

export function IndianRestaurantLittleIndiaPage() {
  const canonicalUrl = restaurantConfig.siteUrl ? `${restaurantConfig.siteUrl.replace(/\/$/, '')}/indian-restaurant-little-india` : undefined
  const canReserve = Boolean(restaurantConfig.links.reservation)

  return (
    <main id="main-content">
      <PageMetadata title={pageTitle} description={pageDescription} canonicalUrl={canonicalUrl} />
      <article>
        <section className="story-hero local-seo-hero" aria-labelledby="little-india-seo-heading">
          <Container className="story-hero__grid">
            <div className="story-hero__content">
              <p className="eyebrow">Indian Restaurant in Little India</p>
              <h1 className="story-hero__heading" id="little-india-seo-heading">Indian dining in the heart of Little India.</h1>
              <p className="story-hero__description">
                Lagnaa Barefoot Dining is an Indian restaurant on Upper Dickson Road in Little India, Singapore, shaped by Indian food, warm hospitality and distinctive dining experiences.
              </p>
              <div className="story-barefoot__actions">
                <Button href={restaurantConfig.links.reservation} disabled={!canReserve} variant="primary">Reserve a Table</Button>
                <Button href="/menu" variant="outline">Explore the Menu</Button>
              </div>
            </div>
            <DevelopmentMedia
              image={entranceTeamImage}
              imageAlt="Lagnaa restaurant entrance in Little India, Singapore."
              media={{ subject: 'Lagnaa in Little India', detail: 'Restaurant entrance photograph for local discovery.', format: 'portrait', tone: 'saffron' }}
              className="story-hero__media"
              priority
            />
          </Container>
        </section>

        <section className="story-section story-main" aria-labelledby="little-india-restaurant-heading">
          <Container className="story-main__grid">
            <div className="story-main__marker" aria-hidden="true">01</div>
            <div className="story-main__copy">
              <SectionHeading eyebrow="Little India, Singapore" heading="A local Indian dining address." level={2} id="little-india-restaurant-heading" />
              <div className="editorial-copy">
                <p>
                  Located at {restaurantConfig.address}, Lagnaa gives visitors a clear base for Indian dining in Little India.
                </p>
                <p>
                  The restaurant brings together Indian cuisine, the Arusuvai idea of six flavours, and Lagnaa’s own Barefoot Dining experience.
                </p>
              </div>
              <a className="text-link" href="/contact">View contact details <TextArrow /></a>
            </div>
            <DevelopmentMedia
              image={arusuvaiPlatterImage}
              imageAlt="A selection of Indian dishes at Lagnaa Barefoot Dining."
              media={{ subject: 'Indian dining at Lagnaa', detail: 'Food photograph showing Indian dishes and shared dining.', format: 'landscape', tone: 'ember' }}
              className="story-main__media"
            />
          </Container>
        </section>

        <section className="story-section story-food-philosophy" aria-labelledby="little-india-menu-heading">
          <Container className="story-food-philosophy__grid">
            <DevelopmentMedia
              media={{ subject: 'Menu discovery', detail: 'Editorial food direction for Indian menu browsing.', format: 'landscape', tone: 'cocoa' }}
              className="story-food-philosophy__media"
            />
            <div className="story-food-philosophy__copy">
              <SectionHeading eyebrow="Explore the food" heading="Browse Indian flavours before you visit." level={2} id="little-india-menu-heading" />
              <div className="editorial-copy">
                <p>
                  Use the menu page to explore Lagnaa’s Indian food offering, including shared dishes, individual meals, drinks and spice-led selections.
                </p>
                <p>
                  Menu details can be confirmed directly with Lagnaa before your visit.
                </p>
              </div>
              <Button href="/menu" variant="outline">Explore the Menu</Button>
            </div>
          </Container>
        </section>

        <section className="story-section story-barefoot" aria-labelledby="little-india-experience-heading">
          <Container className="story-barefoot__grid">
            <div className="story-barefoot__copy">
              <SectionHeading eyebrow="Lagnaa experiences" heading="More than a standard restaurant visit." level={2} id="little-india-experience-heading" />
              <div className="editorial-copy">
                <p>
                  Visitors can discover Barefoot Dining, explore the Ultimate Chilli Challenge, or learn about Lagnaa’s food-tasting and cooking-class experiences.
                </p>
                <p>
                  Experience details and participation are subject to confirmation directly with Lagnaa.
                </p>
              </div>
              <div className="story-barefoot__actions">
                <Button href="/experiences/barefoot-dining" variant="primary">Discover Barefoot Dining</Button>
                <Button href="/events" variant="outline">Explore Experiences</Button>
              </div>
            </div>
            <DevelopmentMedia
              media={{ subject: 'Lagnaa experience', detail: 'Warm atmospheric visual direction for dining experiences.', format: 'portrait', tone: 'plum' }}
              className="story-barefoot__media"
            />
          </Container>
        </section>

        <section className="story-section story-little-india" aria-labelledby="little-india-plan-heading">
          <Container className="story-little-india__grid">
            <SectionHeading
              eyebrow="Plan your visit"
              heading="Find Lagnaa in Little India."
              description={`Lagnaa Barefoot Dining is located at ${restaurantConfig.address}. Contact the restaurant directly for reservation enquiries or questions before you visit.`}
              level={2}
              id="little-india-plan-heading"
            />
            <div className="story-little-india__action">
              <Button href="/reservations" variant="primary">Reserve a Table</Button>
              <a className="text-link" href="/contact">Contact Lagnaa <TextArrow /></a>
            </div>
          </Container>
        </section>

        <CtaSection
          eyebrow="Indian dining in Little India"
          heading="Ready to visit Lagnaa?"
          description="Explore the menu, view the restaurant gallery or contact Lagnaa before your visit."
          primaryAction={{ label: 'Reserve a Table', href: restaurantConfig.links.reservation }}
          secondaryAction={{ label: 'View Gallery', href: '/gallery', variant: 'outline' }}
        />
      </article>
    </main>
  )
}
