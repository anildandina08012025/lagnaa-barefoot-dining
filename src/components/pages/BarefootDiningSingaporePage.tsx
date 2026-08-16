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

const pageTitle = 'Barefoot Dining in Singapore | Lagnaa Barefoot Dining'
const pageDescription = 'Discover Barefoot Dining at Lagnaa in Little India, Singapore, and explore the menu, experience details and reservation enquiry options.'

export function BarefootDiningSingaporePage() {
  const canonicalUrl = restaurantConfig.siteUrl ? `${restaurantConfig.siteUrl.replace(/\/$/, '')}/barefoot-dining-singapore` : undefined
  const canReserve = Boolean(restaurantConfig.links.reservation)

  return (
    <main id="main-content">
      <PageMetadata title={pageTitle} description={pageDescription} canonicalUrl={canonicalUrl} />
      <article>
        <section className="story-hero local-seo-hero" aria-labelledby="barefoot-dining-singapore-heading">
          <Container className="story-hero__grid">
            <div className="story-hero__content">
              <p className="eyebrow">Barefoot Dining Singapore</p>
              <h1 className="story-hero__heading" id="barefoot-dining-singapore-heading">A signature Lagnaa dining experience.</h1>
              <p className="story-hero__description">
                Barefoot Dining is part of the Lagnaa experience: Indian food, warm hospitality and an intimate atmosphere around the table in Little India, Singapore.
              </p>
              <div className="story-barefoot__actions">
                <Button href="/experiences/barefoot-dining" variant="primary">Discover Barefoot Dining</Button>
                <Button href={restaurantConfig.links.reservation} disabled={!canReserve} variant="outline">Reserve a Table</Button>
              </div>
            </div>
            <DevelopmentMedia
              media={{ subject: 'Barefoot dining atmosphere', detail: 'Warm atmospheric photograph for the Barefoot Dining experience.', format: 'portrait', tone: 'plum' }}
              className="story-hero__media"
              priority
            />
          </Container>
        </section>

        <section className="story-section story-main" aria-labelledby="barefoot-dining-experience-heading">
          <Container className="story-main__grid">
            <div className="story-main__marker" aria-hidden="true">01</div>
            <div className="story-main__copy">
              <SectionHeading eyebrow="The experience" heading="Food, hospitality and time around the table." level={2} id="barefoot-dining-experience-heading" />
              <div className="editorial-copy">
                <p>
                  Lagnaa presents Barefoot Dining as a distinctive part of the restaurant’s identity, connecting Indian dining with a more intimate restaurant atmosphere.
                </p>
                <p>
                  For current Barefoot Dining details, visitors should contact Lagnaa directly or use the reservation enquiry journey.
                </p>
              </div>
              <a className="text-link" href="/contact">Contact Lagnaa <TextArrow /></a>
            </div>
            <DevelopmentMedia
              image={entranceTeamImage}
              imageAlt="Lagnaa restaurant entrance in Little India."
              media={{ subject: 'Lagnaa visit', detail: 'Restaurant entrance photograph for visitors planning Barefoot Dining.', format: 'landscape', tone: 'saffron' }}
              className="story-main__media"
            />
          </Container>
        </section>

        <section className="story-section story-arusuvai" aria-labelledby="barefoot-dining-menu-heading">
          <Container className="story-arusuvai__grid">
            <div className="story-arusuvai__seal" aria-hidden="true"><span>VI</span><small>Six flavours</small></div>
            <div className="story-arusuvai__copy">
              <SectionHeading
                eyebrow="Indian food"
                heading="Explore the menu before your visit."
                description="Barefoot Dining sits alongside Lagnaa’s Indian food offering. Browse the menu, then confirm current details directly with Lagnaa before visiting."
                tone="dark"
                level={2}
                id="barefoot-dining-menu-heading"
              />
              <a className="text-link text-link--light" href="/menu">Explore the menu <TextArrow /></a>
            </div>
          </Container>
        </section>

        <section className="story-section story-little-india" aria-labelledby="barefoot-dining-location-heading">
          <Container className="story-little-india__grid">
            <SectionHeading
              eyebrow="Visit Lagnaa"
              heading="Barefoot Dining in Little India."
              description={`Lagnaa Barefoot Dining is located at ${restaurantConfig.address}. Use the Contact page for phone, email and reservation enquiry details.`}
              level={2}
              id="barefoot-dining-location-heading"
            />
            <div className="story-little-india__action">
              <Button href="/reservations" variant="primary">Reserve a Table</Button>
              <a className="text-link" href="/gallery">View Gallery <TextArrow /></a>
            </div>
          </Container>
        </section>

        <CtaSection
          eyebrow="Barefoot Dining Singapore"
          heading="Plan your Lagnaa experience."
          description="Discover Barefoot Dining or contact Lagnaa before your visit."
          primaryAction={{ label: 'Discover Barefoot Dining', href: '/experiences/barefoot-dining' }}
          secondaryAction={{ label: 'Contact Lagnaa', href: '/contact', variant: 'outline' }}
        />
      </article>
    </main>
  )
}
