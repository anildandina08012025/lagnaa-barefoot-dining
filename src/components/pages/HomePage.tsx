import { homeContent } from '../../content/home'
import { galleryHeroFrames } from '../../content/galleryHeroFrames'
import { mobileHeroFrames } from '../../content/mobileHeroFrames'
import arusuvaiImage from '../../assets/gallery/arusuvai.webp'
import { featuredRecognitionItems } from '../../content/recognition'
import { restaurantConfig } from '../../config/restaurant'
import { ScrollFrameHero } from '../media/ScrollFrameHero'
import { Container } from '../layout/Container'
import { Button } from '../ui/Button'
import { CtaSection } from '../ui/CtaSection'
import { HomeScrollEffects } from '../ui/HomeScrollEffects'
import { RecognitionCoverflow } from '../ui/RecognitionCoverflow'
import { LagnaaShowcaseCarousel } from '../ui/LagnaaShowcaseCarousel'
import { SectionHeading } from '../ui/SectionHeading'
import { PageMetadata } from '../seo/PageMetadata'

function TextArrow() {
  return <span aria-hidden="true">↗</span>
}

export function HomePage() {
  const { hero, arusuvai } = homeContent
  const canReserve = Boolean(restaurantConfig.links.reservation)

  return (
    <main id="main-content">
      <PageMetadata
        title="Lagnaa Barefoot Dining | Indian Restaurant in Little India Singapore"
        description="Visit Lagnaa Barefoot Dining, an Indian restaurant in Little India, Singapore, known for Indian flavours, Barefoot Dining and signature experiences."
        canonicalUrl={restaurantConfig.siteUrl ?? undefined}
      />
      <ScrollFrameHero {...hero} headingId="home-heading" frames={galleryHeroFrames} mobileFrames={mobileHeroFrames}>
        <div className="home-hero__actions">
          <Button href={restaurantConfig.links.reservation} disabled={!canReserve} variant="primary">Reserve a Table</Button>
          <Button href="/menu" variant="outline">Explore the Menu</Button>
        </div>
        <a className="text-link text-link--light" href="/experiences/barefoot-dining">Discover Barefoot Dining <TextArrow /></a>
      </ScrollFrameHero>

      <section className="home-section home-recognition" aria-labelledby="recognition-heading">
        <Container>
          <div className="home-recognition__heading">
            <SectionHeading
              heading="Featured & Recognised By"
              align="center"
              level={2}
              id="recognition-heading"
            />
          </div>
          <RecognitionCoverflow items={featuredRecognitionItems} />
        </Container>
      </section>

      <LagnaaShowcaseCarousel />
      <HomeScrollEffects />

      <section className="home-section home-arusuvai home-arusuvai--compact" aria-labelledby="arusuvai-heading" data-home-scroll-scene>
        <Container>
          <div className="home-arusuvai__intro">
            <SectionHeading eyebrow={arusuvai.eyebrow} heading={arusuvai.heading} description={arusuvai.description} align="center" level={2} id="arusuvai-heading" />
          </div>
          <img className="home-arusuvai__image" src={arusuvaiImage} alt="Arusuvai, the harmony of six tastes, illustrated with Lagnaa dishes." width="1600" height="1067" loading="lazy" decoding="async" />
          <div className="home-arusuvai__action"><a className="text-link" href="/menu">Explore the menu <TextArrow /></a></div>
        </Container>
      </section>

      <section className="home-section home-visit" aria-labelledby="visit-heading" data-home-scroll-scene>
        <Container className="home-visit__grid">
          <SectionHeading eyebrow="Find us" heading="Visit Lagnaa in Little India." description={restaurantConfig.shortDescription} level={2} id="visit-heading" />
          <div className="home-visit__details">
            <p className="home-visit__location">{restaurantConfig.location}</p>
            {restaurantConfig.address ? <p className="home-visit__address">{restaurantConfig.address}</p> : null}
            <div className="home-visit__actions">
              {restaurantConfig.mapsUrl ? <a className="text-link" href={restaurantConfig.mapsUrl} target="_blank" rel="noopener noreferrer">Get Directions <TextArrow /></a> : null}
              <a className="text-link" href="/events/rediscover-little-india">Explore Little India <TextArrow /></a>
              <a className="text-link" href="/our-story">Discover Our Story <TextArrow /></a>
              <a className="text-link" href="/contact">Plan Your Visit <TextArrow /></a>
            </div>
          </div>
        </Container>
      </section>

      <CtaSection
        scrollScene
        eyebrow="A table at Lagnaa"
        heading="Ready to experience Lagnaa?"
        description="Reserve a table or contact Lagnaa to plan your visit."
        primaryAction={{ label: 'Reserve a Table', href: restaurantConfig.links.reservation }}
        secondaryAction={{ label: 'Plan Your Visit', href: '/contact', variant: 'outline' }}
      />
    </main>
  )
}
