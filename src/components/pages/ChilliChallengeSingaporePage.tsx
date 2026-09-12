import chilliLevelsImage from '../../assets/chilli/lagnaa-chilli-challenge-levels.png'
import curryShotsImage from '../../assets/chilli/lagnaa-curry-shots-section.webp'
import chilliIndianFoodImage from '../../assets/chilli/lagnaa-chilli-indian-food.webp'
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

const pageTitle = 'Chilli Challenge Singapore | Lagnaa...barefoot dining'
const pageDescription = 'Explore Lagnaa...barefoot dining’s Ultimate Chilli Challenge in Singapore, with spice-led Indian dining details and enquiry options in Little India.'

export function ChilliChallengeSingaporePage() {
  const canonicalUrl = restaurantConfig.siteUrl ? `${restaurantConfig.siteUrl.replace(/\/$/, '')}/chilli-challenge-singapore` : undefined
  const canReserve = Boolean(restaurantConfig.links.reservation)

  return (
    <main id="main-content">
      <PageMetadata title={pageTitle} description={pageDescription} canonicalUrl={canonicalUrl} />
      <article>
        <section className="chilli-hero" aria-labelledby="chilli-challenge-singapore-heading">
          <Container className="chilli-hero__grid">
            <div className="chilli-hero__content">
              <p className="eyebrow chilli-hero__eyebrow">Chilli Challenge Singapore</p>
              <h1 className="chilli-hero__heading" id="chilli-challenge-singapore-heading">Explore the heat.</h1>
              <p className="chilli-hero__description">
                The Ultimate Chilli Challenge is Lagnaa...barefoot dining’s signature food challenge for guests who enjoy spice, flavour and a more adventurous Indian dining experience.
              </p>
              <div className="chilli-hero__actions">
                <Button href="/experiences/chilli-challenge" variant="light">Explore the Challenge</Button>
                <Button href={restaurantConfig.links.reservation} disabled={!canReserve} variant="outline">Reserve a Table</Button>
              </div>
            </div>
            <div className="chilli-hero__levels" aria-hidden="true">
              <span>Level guide</span>
              <img src={chilliLevelsImage} alt="" width="1600" height="1600" />
            </div>
          </Container>
        </section>

        <section className="story-section story-main" aria-labelledby="chilli-overview-heading">
          <Container className="story-main__grid">
            <div className="story-main__marker" aria-hidden="true">01</div>
            <div className="story-main__copy">
              <SectionHeading eyebrow="Signature food challenge" heading="A spice-led Lagnaa...barefoot dining experience." level={2} id="chilli-overview-heading" />
              <div className="editorial-copy">
                <p>
                  Lagnaa...barefoot dining’s Chilli Challenge gives spice-curious diners a dedicated experience connected to the restaurant’s Indian food offering.
                </p>
                <p>
                  Challenge formats and participation details can change, so visitors should confirm current details directly with Lagnaa...barefoot dining.
                </p>
              </div>
              <a className="text-link" href="/experiences/chilli-challenge">View the internal challenge page <TextArrow /></a>
            </div>
            <DevelopmentMedia
              image={curryShotsImage}
              imageAlt="Curry shots presented as part of Lagnaa...barefoot dining's spice-level guidance."
              media={{ subject: 'Curry shots', detail: 'Spice-level guidance photograph for the Chilli Challenge.', format: 'landscape', tone: 'ember' }}
              className="story-main__media"
            />
          </Container>
        </section>

        <section className="story-section story-food-philosophy" aria-labelledby="chilli-menu-heading">
          <Container className="story-food-philosophy__grid">
            <DevelopmentMedia
              image={chilliIndianFoodImage}
              imageAlt="A Lagnaa...barefoot dining chilli and curry selection."
              media={{ subject: 'Spice and Indian food', detail: 'Warm food-detail direction for chilli and curry selections.', format: 'landscape', tone: 'saffron' }}
              className="story-food-philosophy__media"
            />
            <div className="story-food-philosophy__copy">
              <SectionHeading eyebrow="Before you visit" heading="Browse the menu and plan your enquiry." level={2} id="chilli-menu-heading" />
              <div className="editorial-copy">
                <p>
                  The menu page includes spice-led selections alongside Lagnaa...barefoot dining’s broader Indian food offering.
                </p>
                <p>
                  For current Chilli Challenge details, contact Lagnaa...barefoot dining before your visit.
                </p>
              </div>
              <Button href="/menu" variant="outline">Explore the Menu</Button>
            </div>
          </Container>
        </section>

        <section className="story-section story-little-india" aria-labelledby="chilli-location-heading">
          <Container className="story-little-india__grid">
            <SectionHeading
              eyebrow="Visit Lagnaa...barefoot dining"
              heading="Take on the challenge in Little India."
              description={`Lagnaa...barefoot dining is located at ${restaurantConfig.address}. Contact Lagnaa...barefoot dining directly for current Chilli Challenge details before visiting.`}
              level={2}
              id="chilli-location-heading"
            />
            <div className="story-little-india__action">
              <Button href="/reservations" variant="primary">Reserve a Table</Button>
              <a className="text-link" href="/contact">Contact Lagnaa...barefoot dining <TextArrow /></a>
            </div>
          </Container>
        </section>

        <CtaSection
          eyebrow="Chilli Challenge Singapore"
          heading="Ready to explore Lagnaa...barefoot dining’s spice experience?"
          description="View the challenge page or contact Lagnaa...barefoot dining for current details before your visit."
          primaryAction={{ label: 'Explore the Challenge', href: '/experiences/chilli-challenge' }}
          secondaryAction={{ label: 'Contact Lagnaa...barefoot dining', href: '/contact', variant: 'outline' }}
        />
      </article>
    </main>
  )
}
