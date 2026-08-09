import { useEffect, useRef, useState } from 'react'
import { homeContent } from '../../content/home'
import { galleryHeroFrames } from '../../content/galleryHeroFrames'
import { mobileHeroFrames } from '../../content/mobileHeroFrames'
import entranceTeamImage from '../../assets/gallery/lagnaa-entrance-team.jpg'
import { featuredRecognitionItems } from '../../content/recognition'
import { restaurantConfig } from '../../config/restaurant'
import { DevelopmentMedia } from '../media/DevelopmentMedia'
import { ScrollFrameHero } from '../media/ScrollFrameHero'
import { Container } from '../layout/Container'
import { Button } from '../ui/Button'
import { CtaSection } from '../ui/CtaSection'
import { HomeScrollEffects } from '../ui/HomeScrollEffects'
import { RecognitionCoverflow } from '../ui/RecognitionCoverflow'
import { LagnaaShowcaseCarousel } from '../ui/LagnaaShowcaseCarousel'
import { SectionHeading } from '../ui/SectionHeading'
import VaporizeTextCycle, { Tag } from '../ui/vapour-text-effect'

function TextArrow() {
  return <span aria-hidden="true">↗</span>
}

type WelcomeIntroductionProps = {
  eyebrow: string
  heading: string
  paragraphs: readonly string[]
}

function AnimatedWelcomeIntroduction({ eyebrow, heading, paragraphs }: WelcomeIntroductionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setIsVisible(true)
      observer.disconnect()
    }, { threshold: 0.25 })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <div className={`home-introduction__animated-copy${isVisible ? ' home-introduction__animated-copy--visible' : ''}`} ref={sectionRef}>
      <p className="eyebrow">{eyebrow}</p>
      {isVisible ? (
        <VaporizeTextCycle
          accessibleText={heading}
          className="home-introduction__vapor-heading"
          color="rgb(43, 33, 30)"
          font={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 62, fontWeight: 500 }}
          id="introduction-heading"
          tag={Tag.H2}
          texts={['Where flavour,', 'tradition and hospitality', 'come together.']}
          vaporizeDuration={1200}
          waitDuration={4300}
        />
      ) : <h2 className="heading heading--section" id="introduction-heading">{heading}</h2>}
      <div className="editorial-copy home-introduction__paragraphs">
        {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <a className="text-link" href="/our-story">Discover our story <TextArrow /></a>
    </div>
  )
}

export function HomePage() {
  const { hero, introduction, arusuvai, food, privateDining, gallery } = homeContent
  const canReserve = Boolean(restaurantConfig.links.reservation)
  const canOrder = Boolean(restaurantConfig.links.orderOnline)
  const hasVisitDetails = Boolean(
    restaurantConfig.address || restaurantConfig.mapsUrl || restaurantConfig.phone || restaurantConfig.whatsapp || restaurantConfig.email || restaurantConfig.openingHours.length,
  )

  return (
    <main id="main-content">
      <ScrollFrameHero {...hero} headingId="home-heading" frames={galleryHeroFrames} mobileFrames={mobileHeroFrames}>
        <div className="home-hero__actions">
          <Button href={restaurantConfig.links.reservation} disabled={!canReserve} variant="primary">Reserve a Table</Button>
          <Button href="/menu" variant="outline">View Menu</Button>
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

      <section className="home-section home-introduction" aria-labelledby="introduction-heading" data-home-scroll-scene>
          <Container className="editorial-split editorial-split--intro">
            <div className="editorial-split__copy">
            <AnimatedWelcomeIntroduction {...introduction} />
            </div>
          <DevelopmentMedia
            image={entranceTeamImage}
            imageAlt="Lagnaa restaurant entrance with members of the restaurant team."
            media={introduction.media}
            className="editorial-split__media"
          />
        </Container>
      </section>

      <section className="home-section home-arusuvai home-arusuvai--compact" aria-labelledby="arusuvai-heading" data-home-scroll-scene>
        <Container>
          <div className="home-arusuvai__intro">
            <SectionHeading eyebrow={arusuvai.eyebrow} heading={arusuvai.heading} description={arusuvai.description} align="center" level={2} id="arusuvai-heading" />
          </div>
          <div className="flavour-orbit" aria-hidden="true">
            <span>Balance</span><span>Contrast</span><span>Discovery</span><span className="flavour-orbit__centre">Six<br />flavours</span><span>Indian<br />dining</span><span>At the<br />table</span><span>Shared<br />experience</span>
          </div>
          <div className="home-arusuvai__action"><a className="text-link" href="/menu">Explore the menu <TextArrow /></a></div>
        </Container>
      </section>

      <section className="home-section home-food" aria-labelledby="food-heading" data-home-scroll-scene>
        <Container>
          <div className="home-food__heading-row">
            <SectionHeading eyebrow={food.eyebrow} heading={food.heading} description={food.description} level={2} id="food-heading" />
            <Button href="/menu" variant="outline">View Full Menu</Button>
          </div>
          <div className="food-editorial-grid">
            {food.media.map((media, index) => <DevelopmentMedia key={media.subject} media={media} className={`food-editorial-grid__item food-editorial-grid__item--${index + 1}`} />)}
          </div>
          {canOrder ? <div className="home-food__order"><Button href={restaurantConfig.links.orderOnline} variant="text">Order Online <TextArrow /></Button></div> : null}
        </Container>
      </section>

      <section className="home-section home-private" aria-labelledby="private-heading" data-home-scroll-scene>
        <Container className="editorial-split editorial-split--private">
          <DevelopmentMedia media={privateDining.media} className="editorial-split__media" />
          <div className="editorial-split__copy">
            <SectionHeading eyebrow={privateDining.eyebrow} heading={privateDining.heading} description={privateDining.description} level={2} id="private-heading" />
            <Button href="/private-events" variant="primary">Enquire About Private Events</Button>
          </div>
        </Container>
      </section>

      <section className="home-section home-gallery" aria-labelledby="gallery-heading" data-home-scroll-scene>
        <Container>
          <div className="home-gallery__heading-row">
            <SectionHeading eyebrow={gallery.eyebrow} heading={gallery.heading} level={2} id="gallery-heading" />
            <a className="text-link" href="/gallery">View gallery <TextArrow /></a>
          </div>
          <div className="gallery-grid">
            {gallery.media.map((media, index) => <DevelopmentMedia key={media.subject} media={media} className={`gallery-grid__item gallery-grid__item--${index + 1}`} />)}
          </div>
        </Container>
      </section>

      <section className="home-section home-visit" aria-labelledby="visit-heading" data-home-scroll-scene>
        <Container className="home-visit__grid">
          <SectionHeading eyebrow="Find us" heading="Visit Lagnaa in Little India." description={restaurantConfig.shortDescription} level={2} id="visit-heading" />
          <div className="home-visit__details">
            <p className="home-visit__location">{restaurantConfig.location}</p>
            {hasVisitDetails ? (
              <div className="home-visit__confirmed-details">
                {restaurantConfig.address ? (
                  restaurantConfig.mapsUrl ? <a href={restaurantConfig.mapsUrl}>Get directions <TextArrow /></a> : <p>{restaurantConfig.address}</p>
                ) : null}
                {restaurantConfig.phone ? <a href={`tel:${restaurantConfig.phone}`}>Call the restaurant <TextArrow /></a> : null}
                {restaurantConfig.whatsapp ? <a href={`https://wa.me/${restaurantConfig.whatsapp}`}>Message on WhatsApp <TextArrow /></a> : null}
                {restaurantConfig.email ? <a href={`mailto:${restaurantConfig.email}`}>Email the restaurant <TextArrow /></a> : null}
                {restaurantConfig.openingHours.length > 0 ? <p>{restaurantConfig.openingHours.join(' · ')}</p> : null}
              </div>
            ) : null}
            <a className="text-link" href="/contact">Contact and visit details <TextArrow /></a>
          </div>
        </Container>
      </section>

      <CtaSection
        scrollScene
        eyebrow="A table at Lagnaa"
        heading="Ready to experience Lagnaa?"
        description="Reserve a table or explore the menu before you visit."
        primaryAction={{ label: 'Reserve a Table', href: restaurantConfig.links.reservation }}
        secondaryAction={{ label: 'View Menu', href: '/menu', variant: 'outline' }}
      />
    </main>
  )
}
