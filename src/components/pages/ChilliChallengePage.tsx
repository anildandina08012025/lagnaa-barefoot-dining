import { restaurantConfig } from '../../config/restaurant'
import chilliLevels from '../../assets/chilli/lagnaa-chilli-challenge-levels.png'
import goldenAdviceImage from '../../assets/chilli/lagnaa-chilli-golden-advice.png'
import curryShotsImage from '../../assets/chilli/curry-shots.webp'
import chilliJourneyImage from '../../assets/chilli/lagnaa-chilli-challenge-social.webp'
import { Container } from '../layout/Container'
import { PageMetadata } from '../seo/PageMetadata'
import { Button } from '../ui/Button'
import { CtaSection } from '../ui/CtaSection'
import { SectionHeading } from '../ui/SectionHeading'

function TextArrow() {
  return <span aria-hidden="true">↗</span>
}

const chilliSocialCards = [
  {
    id: 'instagram-chilli-challenge-1',
    eyebrow: 'Instagram',
    title: 'Chilli Challenge moment I',
    description: 'Watch this Chilli Challenge video from Lagnaa on Instagram.',
    href: 'https://www.instagram.com/p/C1Upv9KyZSs/?hl=en',
    image: goldenAdviceImage,
    alt: 'A warm visual for Lagnaa’s Chilli Challenge.',
  },
  {
    id: 'instagram-chilli-challenge-2',
    eyebrow: 'Instagram',
    title: 'Chilli Challenge moment II',
    description: 'Watch this Chilli Challenge video from Lagnaa on Instagram.',
    href: 'https://www.instagram.com/p/DWGbyeMk8cI/?hl=en',
    image: curryShotsImage,
    alt: 'A visual of Curry Shots.',
  },
  {
    id: 'instagram-chilli-challenge-3',
    eyebrow: 'Instagram',
    title: 'Chilli Challenge moment III',
    description: 'Watch this Chilli Challenge video from Lagnaa on Instagram.',
    href: 'https://www.instagram.com/p/DWLdWTME-Rl/?hl=en',
    image: chilliLevels,
    alt: 'An illustrated Chilli Challenge levels guide.',
  },
  {
    id: 'instagram-chilli-challenge-4',
    eyebrow: 'Instagram',
    title: 'Chilli Challenge moment IV',
    description: 'Watch this Chilli Challenge video from Lagnaa on Instagram.',
    href: 'https://www.instagram.com/p/DABjDx_S_qw/?hl=en',
    image: goldenAdviceImage,
    alt: 'A warm visual for Lagnaa’s Chilli Challenge.',
  },
  {
    id: 'instagram-chilli-challenge-5',
    eyebrow: 'Instagram',
    title: 'Chilli Challenge moment V',
    description: 'Watch this Chilli Challenge video from Lagnaa on Instagram.',
    href: 'https://www.instagram.com/p/C1WW7J0Svtm/?hl=en',
    image: curryShotsImage,
    alt: 'A visual of Curry Shots.',
  },
  {
    id: 'instagram-chilli-challenge-6',
    eyebrow: 'Instagram',
    title: 'Chilli Challenge moment VI',
    description: 'Watch this Chilli Challenge video from Lagnaa on Instagram.',
    href: 'https://www.instagram.com/p/DVBUAE_Eq4U/?hl=en',
    image: chilliLevels,
    alt: 'An illustrated Chilli Challenge levels guide.',
  },
  {
    id: 'instagram-chilli-challenge-7',
    eyebrow: 'Instagram',
    title: 'Chilli Challenge moment VII',
    description: 'Watch this Chilli Challenge video from Lagnaa on Instagram.',
    href: 'https://www.instagram.com/p/CvChTwESLLU/',
    image: chilliJourneyImage,
    alt: 'Guests enjoying Lagnaa’s Chilli Challenge experience.',
  },
  {
    id: 'instagram-chilli-challenge-8',
    eyebrow: 'Instagram',
    title: 'Chilli Challenge moment VIII',
    description: 'Watch this Chilli Challenge video from Lagnaa on Instagram.',
    href: 'https://www.instagram.com/p/BqV_wdNnKFm/',
    image: goldenAdviceImage,
    alt: 'A warm visual for Lagnaa’s Chilli Challenge.',
  },
] as const

export function ChilliChallengePage() {
  const canReserve = Boolean(restaurantConfig.links.reservation)
  const canonicalUrl = restaurantConfig.siteUrl
    ? `${restaurantConfig.siteUrl.replace(/\/$/, '')}/experiences/chilli-challenge`
    : undefined

  return (
    <main id="main-content">
      <PageMetadata
        title="Ultimate Chilli Challenge Singapore | Lagnaa Barefoot Dining"
        description="Explore Lagnaa’s Ultimate Chilli Challenge in Little India, Singapore, a signature spice-led Indian dining experience."
        canonicalUrl={canonicalUrl}
      />
      <article className="chilli-page">
        <section className="chilli-hero" aria-labelledby="chilli-heading">
          <Container className="chilli-hero__grid">
            <div className="chilli-hero__content">
              <p className="eyebrow chilli-hero__eyebrow">Lagnaa’s signature food challenge</p>
              <h1 className="chilli-hero__heading" id="chilli-heading">Can you survive the heat?</h1>
              <p className="chilli-hero__description">A bold Lagnaa experience for guests who want to explore spice, flavour and their own chilli tolerance.</p>
              <div className="chilli-hero__actions">
                <a className="button button--light" href="#challenge-guide">Explore the challenge <TextArrow /></a>
                <Button href={restaurantConfig.links.reservation} disabled={!canReserve} variant="outline">Reserve a Table</Button>
              </div>
            </div>
            <div className="chilli-hero__levels" aria-hidden="true">
              <span>01 — 10</span>
              <img src={chilliLevels} alt="" />
            </div>
          </Container>
        </section>

        <section className="chilli-section chilli-introduction" id="challenge-guide" aria-labelledby="chilli-introduction-heading">
          <Container className="chilli-introduction__grid">
            <div className="chilli-introduction__copy">
              <SectionHeading eyebrow="The Chilli Challenge" heading="A journey through heat, at your own pace." level={2} id="chilli-introduction-heading" />
              <div className="editorial-copy">
                <p>Lagnaa’s official Chilli Challenge page invites spice lovers to choose their level and discover how far they would like to go.</p>
                <p>For the current format, participation requirements and availability, speak with the Lagnaa team before your visit.</p>
                <p>Read the dedicated guide to the <a href="/chilli-challenge-singapore">Chilli Challenge in Singapore</a> before planning your visit.</p>
              </div>
            </div>
            <figure className="chilli-introduction__image">
              <img src={chilliJourneyImage} alt="Lagnaa Chilli Challenge experience." width="1600" height="1066" />
            </figure>
          </Container>
        </section>

        <section className="chilli-section chilli-advice" aria-labelledby="chilli-advice-heading">
          <Container className="chilli-advice__grid">
            <figure className="chilli-advice__main-image">
              <img src={goldenAdviceImage} alt="A warm visual for Lagnaa’s Chilli Challenge." />
            </figure>
            <div className="chilli-advice__content">
              <p className="eyebrow chilli-advice__eyebrow">Golden Advice</p>
              <h2 id="chilli-advice-heading">Try Curry Shots before choosing your spice level.</h2>
              <p>Use Curry Shots to explore your own heat preference before you decide how far to take the Chilli Challenge.</p>
              <figure className="chilli-advice__shots">
                <img src={curryShotsImage} alt="A visual of Curry Shots." />
                <figcaption>Curry Shots</figcaption>
              </figure>
            </div>
          </Container>
        </section>

        <section className="chilli-section chilli-steps" aria-labelledby="chilli-steps-heading">
          <Container>
            <SectionHeading eyebrow="Your challenge journey" heading="Understand the heat before you dare." tone="dark" align="center" level={2} id="chilli-steps-heading" />
            <ol className="chilli-steps__grid">
              <li>
                <span aria-hidden="true">01</span>
                <h3>Understand</h3>
                <p>Read the current challenge guidance and get familiar with the spice-led experience.</p>
              </li>
              <li>
                <span aria-hidden="true">02</span>
                <h3>Dare</h3>
                <p>Use Curry Shots to explore your own heat preference before deciding how far you would like to go.</p>
              </li>
              <li>
                <span aria-hidden="true">03</span>
                <h3>Participate</h3>
                <p>Ask Lagnaa about the current format, participation details and availability before planning your visit.</p>
              </li>
              <li>
                <span aria-hidden="true">04</span>
                <h3>Reserve or enquire</h3>
                <p>Send a reservation request or contact Lagnaa directly for the latest information.</p>
              </li>
            </ol>
          </Container>
        </section>

        <section className="chilli-section chilli-details" aria-labelledby="chilli-details-heading">
          <Container className="chilli-details__grid">
            <div className="chilli-details__level" aria-hidden="true"><span>06</span><small>Level six and beyond</small></div>
            <div>
              <SectionHeading eyebrow="Before you take the challenge" heading="Speak with Lagnaa before you choose your level." level={2} id="chilli-details-heading" />
              <p className="chilli-details__copy">Challenge formats and participation details can change, so confirm the current experience directly with Lagnaa before your visit.</p>
              <div className="chilli-details__actions">
                <a className="text-link" href="/menu">View Menu <TextArrow /></a>
                <a className="text-link" href="/contact">Contact Lagnaa <TextArrow /></a>
              </div>
            </div>
          </Container>
        </section>

        <section className="chilli-section chilli-social" aria-labelledby="chilli-social-heading">
          <Container>
            <div className="chilli-social__header">
              <SectionHeading
                eyebrow="Social moments"
                heading="Chilli Challenge on Instagram."
                level={2}
                id="chilli-social-heading"
              />
              <p>
                Watch official Lagnaa posts and Reels on Instagram. Videos open on social media, not inside this website.
              </p>
            </div>
            <div className="chilli-social__scroller" aria-label="Official Instagram links for Lagnaa Chilli Challenge moments">
              {chilliSocialCards.map((card) => (
                <a
                  aria-label={`${card.title}. Opens Lagnaa on Instagram in a new tab.`}
                  className="chilli-social-card"
                  href={card.href}
                  key={card.id}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="chilli-social-card__media">
                    <img src={card.image} alt={card.alt} loading="lazy" />
                    <span className="chilli-social-card__play" aria-hidden="true">▶</span>
                  </span>
                  <span className="chilli-social-card__body">
                    <span className="eyebrow">{card.eyebrow}</span>
                    <span className="chilli-social-card__title">{card.title}</span>
                    <span className="chilli-social-card__description">{card.description}</span>
                    <span className="chilli-social-card__action">Watch on Instagram <TextArrow /></span>
                  </span>
                </a>
              ))}
            </div>
          </Container>
        </section>

        <CtaSection
          eyebrow="Ready when you are"
          heading="Bring your appetite—and your courage."
          description="Reserve a table, or contact Lagnaa for the latest Chilli Challenge information."
          primaryAction={{ label: 'Reserve a Table', href: restaurantConfig.links.reservation }}
          secondaryAction={{ label: 'Contact Lagnaa', href: '/contact', variant: 'outline' }}
        />
      </article>
    </main>
  )
}
