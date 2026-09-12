import { useEffect } from 'react'
import { galleryHeroFrames } from '../../content/galleryHeroFrames'
import { mobileHeroFrames } from '../../content/mobileHeroFrames'
import { recognitionItems } from '../../content/recognition'
import { restaurantConfig } from '../../config/restaurant'
import arusuvaiImage from '../../assets/gallery/lagnaa-arusuvai-home.webp'
import barefootDiningImage from '../../assets/barefoot/lagnaa-barefoot-dining-home.webp'
import chilliLadderImage from '../../assets/chilli/lagnaa-chilli-challenge-ladder.webp'
import michelinGuideBadge from '../../assets/recognition/michelin-guide-header.webp'
import { Container } from '../layout/Container'
import { ScrollFrameHero } from '../media/ScrollFrameHero'
import { CtaSection } from '../ui/CtaSection'
import { PageMetadata } from '../seo/PageMetadata'

const homeRecognitionIds = ['michelin-guide', 'lonely-planet', 'cnn-travel', 'tripadvisor', 'arukikata', 'the-smart-local', 'straits-times', 'sethlui', 'ladyironchef', 'her-world'] as const
const homeRecognitionItems = homeRecognitionIds
  .map((id) => recognitionItems.find((item) => item.id === id))
  .filter((item): item is NonNullable<typeof item> => Boolean(item))

function TextArrow() {
  return <span aria-hidden="true">↗</span>
}

export function HomePage() {
  const marqueeItems = [...homeRecognitionItems, ...homeRecognitionItems]

  useEffect(() => {
    const section = document.querySelector<HTMLElement>('.home-publications')
    if (!section) return

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return
      section.classList.add('is-active')
      observer.disconnect()
    }, { threshold: 0.2 })

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <main id="main-content">
      <PageMetadata
        title="Lagnaa...barefoot dining | Indian Restaurant in Little India Singapore"
        description="Visit Lagnaa...barefoot dining, an Indian restaurant in Little India, Singapore, known for Indian flavours, Barefoot Dining and signature experiences."
        canonicalUrl={restaurantConfig.siteUrl ?? undefined}
      />

      <ScrollFrameHero
        eyebrow=""
        heading="Lagnaa...barefoot dining"
        headingLineBreakAfter="Lagnaa...barefoot dining"
        description="Where shoes wait politely at the steps and flavours dance on your palate."
        headingId="home-heading"
        frames={galleryHeroFrames}
        mobileFrames={mobileHeroFrames}
        hideFooter
      >
        <div className="home-hero__actions" aria-label="Hero actions">
          {restaurantConfig.links.reservation ? <a className="button button--primary" href={restaurantConfig.links.reservation}><span>Reserve a table</span></a> : null}
          <a className="button button--outline" href="/menu"><span>Explore the menu</span></a>
        </div>
        <p className="home-hero__location">{restaurantConfig.location}</p>
      </ScrollFrameHero>

      <section className="home-michelin" aria-labelledby="michelin-heading">
        <Container className="home-michelin__grid">
          <a className="home-michelin__badge" href="https://guide.michelin.com/sg/en/singapore-region/singapore/restaurant/lagnaa" target="_blank" rel="noopener noreferrer" aria-label="View Lagnaa...barefoot dining's MICHELIN Guide listing">
            <img src={michelinGuideBadge} alt="MICHELIN Guide multi-year recognition badge, 2016 to 2026" width="480" height="480" loading="lazy" decoding="async" />
          </a>
          <div>
            <p className="eyebrow">MICHELIN recognition</p>
            <h2 id="michelin-heading">Recognised by the MICHELIN Guide, year after year.</h2>
            <p>From 2016 through 2026, Lagnaa...barefoot dining has earned MICHELIN Guide recognition across the years shown on this badge—a lasting acknowledgement of its food, hospitality and distinctive dining experience.</p>
            <a className="text-link" href="https://guide.michelin.com/sg/en/singapore-region/singapore/restaurant/lagnaa" target="_blank" rel="noopener noreferrer">View the official MICHELIN listing <TextArrow /></a>
          </div>
        </Container>
      </section>

      <section className="home-publications" aria-labelledby="publications-heading">
        <Container>
          <p className="eyebrow">Featured &amp; recognised by</p>
          <h2 id="publications-heading">Stories worth sharing.</h2>
        </Container>
        <div className="home-publications__viewport">
          <div className="home-publications__track">
            {marqueeItems.map((item, index) => (
              <a className="home-publications__item" href={item.destinationUrl} key={`${item.id}-${index}`} target="_blank" rel="noopener noreferrer" aria-label={item.accessibleLabel}>
                {item.logoSrc ? <img src={item.logoSrc} alt={item.logoAlt ?? item.name} width="240" height="96" loading="lazy" decoding="async" /> : <span>{item.name}</span>}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="home-signature" aria-labelledby="signature-heading">
        <Container>
          <div className="home-signature__heading">
            <p className="eyebrow">Lagnaa...barefoot dining’s signature experiences</p>
            <h2 id="signature-heading">A restaurant with its own way of doing things.</h2>
          </div>

          <article className="home-experience home-experience--barefoot" data-home-scroll-scene>
            <div className="home-experience__copy">
              <p className="eyebrow">01 · ..Barefoot Dining</p>
              <h3>Take off your shoes. Settle in. Stay awhile.</h3>
              <p>On our air-conditioned second floor, guests settle comfortably on cushions around low tables. It is an unhurried way to share food, connect and experience Indian dining together.</p>
              <ul>
                <li>Relaxed and comfortable for families, friends and celebrations.</li>
                <li>Designed for sharing food, conversation and time together.</li>
                <li>A distinctive dining memory, unique to Lagnaa...barefoot dining.</li>
              </ul>
              <div className="home-experience__note"><strong>Casual Dining</strong> with normal tables and chairs is available on the first floor. <strong>Both floors offer the same menu with no price difference.</strong></div>
              <a className="text-link" href="/experiences/barefoot-dining">Discover Barefoot Dining <TextArrow /></a>
            </div>
            <img src={barefootDiningImage} alt="Lagnaa...barefoot dining's Barefoot Dining experience" width="1200" height="900" loading="lazy" decoding="async" />
          </article>

          <article className="home-experience home-experience--chilli" data-home-scroll-scene>
            <img src={chilliLadderImage} alt="Lagnaa...barefoot dining Chilli Ladder showing personalised spice levels" width="1200" height="900" loading="lazy" decoding="async" />
            <div className="home-experience__copy">
              <p className="eyebrow">02 · Customised Chilli Levels</p>
              <h3>Your heat. Your way.</h3>
              <p>Choose the spice level that feels right for you, from 0 to 10. Whether you are easing in or ready to test your limits, Lagnaa...barefoot dining helps you explore flavour without losing the balance of the dish.</p>
              <div className="home-chilli-scale" aria-label="Chilli levels zero to ten">{Array.from({ length: 11 }, (_, level) => <span key={level}>{level}</span>)}</div>
              <p>Start with Curry Shots to discover your comfort zone, or step into the Ultimate Chilli Challenge when you are ready to dare a little more.</p>
              <a className="text-link" href="/experiences/chilli-challenge">Explore the Chilli Challenge <TextArrow /></a>
            </div>
          </article>

          <article className="home-experience home-experience--arusuvai" data-home-scroll-scene>
            <div className="home-experience__copy">
              <p className="eyebrow">03 · Arusuvai</p>
              <h3>Six flavours, one memorable meal.</h3>
              <p>Arusuvai is the Indian understanding of six tastes in balance. At Lagnaa...barefoot dining, it guides a meal of contrast, comfort and discovery—from familiar favourites to dishes that invite you to try something new.</p>
              <a className="text-link" href="/menu">Explore the menu <TextArrow /></a>
            </div>
            <img src={arusuvaiImage} alt="A Lagnaa...barefoot dining Arusuvai food platter" width="1600" height="1067" loading="lazy" decoding="async" />
          </article>
        </Container>
      </section>

      <CtaSection
        eyebrow="A table at Lagnaa...barefoot dining"
        heading="Ready to experience Lagnaa...barefoot dining?"
        description="Reserve a table or contact Lagnaa...barefoot dining to plan your visit."
        primaryAction={{ label: 'Reserve a Table', href: restaurantConfig.links.reservation }}
        secondaryAction={{ label: 'Plan Your Visit', href: '/contact', variant: 'outline' }}
      />
    </main>
  )
}
