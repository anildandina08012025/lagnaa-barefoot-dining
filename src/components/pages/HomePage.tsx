import { useEffect, useRef, useState } from 'react'
import { homeContent } from '../../content/home'
import { galleryHeroFrames } from '../../content/galleryHeroFrames'
import { mobileHeroFrames } from '../../content/mobileHeroFrames'
import entranceTeamImage from '../../assets/gallery/lagnaa-entrance-team.jpg'
import arusuvaiPlatterImage from '../../assets/gallery/lagnaa-arusuvai-platter.jpg'
import arusuvaiDetailImage from '../../assets/gallery/lagnaa-arusuvai-detail.jpg'
import arusuvaiImage from '../../assets/gallery/arusuvai.webp'
import miniPuriImage from '../../assets/gallery/lagnaa-mini-puri.jpg'
import elaiKoliImage from '../../assets/gallery/lagnaa-elai-koli.jpg'
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
import { VisitChooserSection } from '../ui/VisitChooserSection'
import VaporizeTextCycle, { Tag } from '../ui/vapour-text-effect'
import { PageMetadata } from '../seo/PageMetadata'

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
        <p>
          Explore Lagnaa as an <a href="/indian-restaurant-little-india">Indian restaurant in Little India</a>, or learn more about its <a href="/experiences/barefoot-dining">Barefoot Dining experience</a>.
        </p>
      </div>
      <a className="text-link" href="/our-story">Discover our story <TextArrow /></a>
    </div>
  )
}

export function HomePage() {
  const { hero, introduction, arusuvai, food, privateDining, gallery } = homeContent
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
          <img className="home-arusuvai__image" src={arusuvaiImage} alt="Arusuvai, the harmony of six tastes, illustrated with Lagnaa dishes." />
          <div className="home-arusuvai__action"><a className="text-link" href="/menu">Explore the menu <TextArrow /></a></div>
        </Container>
      </section>

      <VisitChooserSection tone="dark" scrollScene />

      <section className="home-section home-food" aria-labelledby="food-heading" data-home-scroll-scene>
        <Container>
          <div className="home-food__heading-row">
            <SectionHeading eyebrow={food.eyebrow} heading={food.heading} description={food.description} level={2} id="food-heading" />
            <Button href="/menu" variant="outline">View Full Menu</Button>
          </div>
          <div className="food-editorial-grid">
            <DevelopmentMedia image={arusuvaiPlatterImage} imageAlt="A selection of Lagnaa dishes." media={food.media[0]} className="food-editorial-grid__item food-editorial-grid__item--1" />
            <DevelopmentMedia image={arusuvaiDetailImage} imageAlt="A detailed view of a Lagnaa shared platter." media={food.media[1]} className="food-editorial-grid__item food-editorial-grid__item--2" />
            <DevelopmentMedia image={elaiKoliImage} imageAlt="A Lagnaa dish served on a banana leaf." media={food.media[2]} className="food-editorial-grid__item food-editorial-grid__item--3" />
          </div>
        </Container>
      </section>

      <section className="home-section home-private" aria-labelledby="private-heading" data-home-scroll-scene>
        <Container className="editorial-split editorial-split--private">
          <DevelopmentMedia media={privateDining.media} className="editorial-split__media" />
          <div className="editorial-split__copy">
            <SectionHeading eyebrow={privateDining.eyebrow} heading={privateDining.heading} description={privateDining.description} level={2} id="private-heading" />
            <Button href="/contact" variant="primary">Enquire About Private Events</Button>
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
            <DevelopmentMedia image={miniPuriImage} imageAlt="A Lagnaa dish photographed for the gallery." media={gallery.media[0]} className="gallery-grid__item gallery-grid__item--1" />
            <DevelopmentMedia image={entranceTeamImage} imageAlt="Lagnaa restaurant entrance with members of the restaurant team." media={gallery.media[1]} className="gallery-grid__item gallery-grid__item--2" />
            <DevelopmentMedia image={arusuvaiDetailImage} imageAlt="A detailed Lagnaa table setting." media={gallery.media[2]} className="gallery-grid__item gallery-grid__item--3" />
          </div>
        </Container>
      </section>

      <section className="home-section home-visit" aria-labelledby="visit-heading" data-home-scroll-scene>
        <Container className="home-visit__grid">
          <SectionHeading eyebrow="Find us" heading="Visit Lagnaa in Little India." description={restaurantConfig.shortDescription} level={2} id="visit-heading" />
          <div className="home-visit__details">
            <p className="home-visit__location">{restaurantConfig.location}</p>
            {restaurantConfig.address ? <p className="home-visit__address">{restaurantConfig.address}</p> : null}
            <div className="home-visit__actions">
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
