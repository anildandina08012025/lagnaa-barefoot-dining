import { restaurantConfig } from '../../config/restaurant'
import { barefootDiningPageContent } from '../../content/experiences'
import barefootDiningImage from '../../assets/barefoot/lagnaa-barefoot-dining.webp'
import barefootDiningImageTwo from '../../assets/barefoot/lagnaa-barefoot-dining-instagram-moment-02.webp'
import barefootDiningImageThree from '../../assets/barefoot/lagnaa-barefoot-dining-instagram-moment-03.webp'
import barefootEntranceImage from '../../assets/barefoot/lagnaa-barefoot-dining-entrance.webp'
import barefootInteriorImage from '../../assets/barefoot/lagnaa-barefoot-dining-interior.webp'
import barefootGuestsImage from '../../assets/barefoot/lagnaa-barefoot-dining-guests.png'
import { Container } from '../layout/Container'
import { PageMetadata } from '../seo/PageMetadata'
import { Button } from '../ui/Button'
import { SectionHeading } from '../ui/SectionHeading'

function TextArrow() {
  return <span aria-hidden="true">↗</span>
}

const barefootInstagramPosts = [
  { image: barefootDiningImage, href: 'https://www.instagram.com/p/Db2pIsrpadt/?hl=en', label: 'Barefoot Dining moment I' },
  { image: barefootDiningImageTwo, href: 'https://www.instagram.com/p/CQumuwKHnB1/?hl=en', label: 'Barefoot Dining moment II' },
  { image: barefootDiningImageThree, href: 'https://www.instagram.com/p/Dcp6toYTn_H/?hl=en', label: 'Barefoot Dining moment III' },
  { image: barefootGuestsImage, href: 'https://www.instagram.com/p/DTfoVbyEgnG/', label: 'Barefoot Dining moment IV' },
] as const

const barefootJourneySteps = [
  {
    number: '01',
    title: 'Begin upstairs',
    description: 'Follow the staircase to Lagnaa’s second floor, where the Barefoot Dining experience begins and shoes are left at the entrance.',
    image: barefootEntranceImage,
    alt: 'The staircase leading to Lagnaa Barefoot Dining, with signs inviting guests to remove their shoes.',
  },
  {
    number: '02',
    title: 'Settle into the room',
    description: 'Take your place in an air-conditioned dining room, comfortably seated on cushions around low tables.',
    image: barefootInteriorImage,
    alt: 'Lagnaa’s Barefoot Dining interior with low tables and floor cushions.',
  },
  {
    number: '03',
    title: 'Share the moment',
    description: 'Slow down over Indian flavours, share food and conversation, and make the table your own.',
    image: barefootGuestsImage,
    alt: 'Guests sharing a meal together in Lagnaa’s Barefoot Dining room.',
  },
] as const

export function BarefootDiningPage() {
  const content = barefootDiningPageContent
  const canReserve = Boolean(restaurantConfig.links.reservation)
  const canonicalUrl = restaurantConfig.siteUrl
    ? `${restaurantConfig.siteUrl.replace(/\/$/, '')}/experiences/barefoot-dining`
    : undefined

  return (
    <main id="main-content">
      <PageMetadata title={content.seo.title} description={content.seo.description} canonicalUrl={canonicalUrl} />
      <article>
        <section className="barefoot-hero" aria-labelledby="barefoot-heading">
          <div className="barefoot-hero__poem-animation" aria-hidden="true">
            <div className="barefoot-hero__poem-hue" />
            <div className="barefoot-hero__poem-cube">
              <div className="barefoot-hero__poem-face barefoot-hero__poem-face--front">
                <p>Barefoot Dining · Indian Flavours · Warm Hospitality · Little India ·</p>
              </div>
              <div className="barefoot-hero__poem-face barefoot-hero__poem-face--back">
                <p>Food Around The Table · Slow Down · Share The Moment · Lagnaa ·</p>
              </div>
              <div className="barefoot-hero__poem-face barefoot-hero__poem-face--left">
                <p>Floor Cushions · Low Tables · Share The Table · Warm Welcome ·</p>
              </div>
              <div className="barefoot-hero__poem-face barefoot-hero__poem-face--right">
                <p>Reserve A Table · Discover The Experience · Little India ·</p>
              </div>
              <div className="barefoot-hero__poem-face barefoot-hero__poem-face--top" />
              <div className="barefoot-hero__poem-face barefoot-hero__poem-face--bottom" />
            </div>
            <div className="barefoot-hero__poem-reflection">
              <p>Barefoot Dining · Lagnaa · Little India ·</p>
            </div>
          </div>
          <Container className="barefoot-hero__grid">
            <div className="barefoot-hero__content">
              <p className="eyebrow barefoot-hero__eyebrow">{content.hero.eyebrow}</p>
              <h1 className="barefoot-hero__heading" id="barefoot-heading">{content.hero.heading}</h1>
              <p className="barefoot-hero__description">{content.hero.description}</p>
              <div className="barefoot-hero__actions">
                <Button href={restaurantConfig.links.reservation} disabled={!canReserve} variant="light">Reserve a Table</Button>
                <a className="text-link text-link--light" href="#barefoot-journey">See the journey <TextArrow /></a>
              </div>
            </div>
          </Container>
        </section>

        <section className="barefoot-section barefoot-journey" id="barefoot-journey" aria-labelledby="barefoot-journey-heading">
          <Container>
            <SectionHeading eyebrow="The Barefoot journey" heading="From the first step to the shared table." description="A simple, welcoming way to experience Lagnaa together." align="center" level={2} id="barefoot-journey-heading" />
            <ol className="barefoot-journey__steps">
              {barefootJourneySteps.map((step) => (
                <li className="barefoot-journey__step" key={step.number}>
                  <figure className="barefoot-journey__media">
                    <img src={step.image} alt={step.alt} loading="lazy" decoding="async" />
                  </figure>
                  <div className="barefoot-journey__copy">
                    <span aria-hidden="true">{step.number}</span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <section className="barefoot-section barefoot-moments" aria-labelledby="barefoot-moments-heading">
          <Container>
            <SectionHeading eyebrow={content.moments.eyebrow} heading={content.moments.heading} align="center" level={2} id="barefoot-moments-heading" />
            <div className="barefoot-moments__grid" aria-label="Barefoot Dining moments at Lagnaa">
              {barefootInstagramPosts.map((post) => (
                <a className="barefoot-moments__media barefoot-moments__media--link" href={post.href} key={post.href} target="_blank" rel="noopener noreferrer" aria-label={`${post.label}. Opens Instagram in a new tab.`}>
                  <img className="page-content-image" src={post.image} alt={`${post.label} at Lagnaa.`} loading="lazy" />
                  <span>View on Instagram <TextArrow /></span>
                </a>
              ))}
            </div>
          </Container>
        </section>

        <section className="barefoot-section barefoot-practical" id="plan-your-visit" aria-labelledby="barefoot-practical-heading">
          <Container className="barefoot-practical__grid">
            <SectionHeading eyebrow={content.practical.eyebrow} heading={content.practical.heading} description={content.practical.description} level={2} id="barefoot-practical-heading" />
            <div className="barefoot-practical__details">
              {restaurantConfig.address ? <p className="barefoot-practical__address">{restaurantConfig.address}</p> : null}
              <div className="barefoot-practical__actions">
                <Button href={restaurantConfig.links.reservation} disabled={!canReserve} variant="primary">Reserve a Table</Button>
                {restaurantConfig.phone ? <a className="text-link" href={`tel:${restaurantConfig.phone.replace(/\s/g, '')}`}>Call Lagnaa <TextArrow /></a> : null}
                {restaurantConfig.email ? <a className="text-link" href={`mailto:${restaurantConfig.email}`}>Email Lagnaa <TextArrow /></a> : null}
              </div>
            </div>
          </Container>
        </section>

        <section className="barefoot-section barefoot-explore" aria-labelledby="barefoot-explore-heading">
          <Container>
            <SectionHeading eyebrow="Explore more" heading="Continue your Lagnaa journey." level={2} id="barefoot-explore-heading" />
            <div className="barefoot-explore__grid">
              {content.exploreMore.map((item) => (
                <a className="barefoot-explore__card" href={item.href} key={item.href}>
                  <span aria-hidden="true">↗</span>
                  <h3>{item.label}</h3>
                  <p>{item.description}</p>
                </a>
              ))}
            </div>
          </Container>
        </section>

      </article>
    </main>
  )
}
