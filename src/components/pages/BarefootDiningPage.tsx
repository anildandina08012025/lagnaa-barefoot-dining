import { restaurantConfig } from '../../config/restaurant'
import { barefootDiningPageContent } from '../../content/experiences'
import barefootDiningImage from '../../assets/barefoot/lagnaa-barefoot-dining.webp'
import barefootDiningImageTwo from '../../assets/barefoot/lagnaa-barefoot-dining-2.webp'
import barefootDiningImageThree from '../../assets/barefoot/lagnaa-barefoot-dining-3.webp'
import { Container } from '../layout/Container'
import { PageMetadata } from '../seo/PageMetadata'
import { Button } from '../ui/Button'
import { CtaSection } from '../ui/CtaSection'
import { SectionHeading } from '../ui/SectionHeading'

function TextArrow() {
  return <span aria-hidden="true">↗</span>
}

const barefootInstagramPosts = [
  { image: barefootDiningImage, href: 'https://www.instagram.com/p/Db2pIsrpadt/?hl=en', label: 'Barefoot Dining moment I' },
  { image: barefootDiningImageTwo, href: 'https://www.instagram.com/p/CQumuwKHnB1/?hl=en', label: 'Barefoot Dining moment II' },
  { image: barefootDiningImageThree, href: 'https://www.instagram.com/p/Dcp6toYTn_H/?hl=en', label: 'Barefoot Dining moment III' },
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
                <p>Arusuvai · Six Flavours · Spice · Balance · Discovery ·</p>
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
                <a className="text-link text-link--light" href="#barefoot-introduction">Discover the experience <TextArrow /></a>
              </div>
            </div>
          </Container>
        </section>

        <section className="barefoot-section barefoot-introduction" id="barefoot-introduction" aria-labelledby="barefoot-introduction-heading">
          <Container narrow>
            <SectionHeading eyebrow={content.introduction.eyebrow} heading={content.introduction.heading} align="center" level={2} id="barefoot-introduction-heading" />
            <div className="barefoot-introduction__copy">
              {content.introduction.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p>
                Learn more about <a href="/barefoot-dining-singapore">Barefoot Dining in Singapore</a> and how it connects to Lagnaa’s Indian dining story.
              </p>
            </div>
          </Container>
        </section>

        <section className="barefoot-section barefoot-sensory" aria-labelledby="barefoot-sensory-heading">
          <Container className="barefoot-sensory__grid">
            <span className="barefoot-sensory__marker" aria-hidden="true">01</span>
            <SectionHeading eyebrow={content.sensory.eyebrow} heading={content.sensory.heading} description={content.sensory.description} tone="dark" level={2} id="barefoot-sensory-heading" />
          </Container>
        </section>

        <section className="barefoot-section barefoot-how-it-works" aria-labelledby="barefoot-how-it-works-heading">
          <Container>
            <SectionHeading eyebrow="How Barefoot Dining works" heading="Explore, request, then confirm with Lagnaa." description="The exact experience format is confirmed directly by the restaurant before your visit." align="center" level={2} id="barefoot-how-it-works-heading" />
            <ol className="barefoot-how-it-works__steps">
              <li><span aria-hidden="true">01</span><h3>Explore the menu</h3><p>Browse the current menu and decide whether Barefoot Dining is right for your visit.</p></li>
              <li><span aria-hidden="true">02</span><h3>Send your preference</h3><p>Use the reservation journey or contact Lagnaa with your preferred visit details.</p></li>
              <li><span aria-hidden="true">03</span><h3>Confirm with Lagnaa</h3><p>Lagnaa will confirm the current experience details and your reservation directly.</p></li>
            </ol>
            {/* Client confirmation needed: add only approved operational Barefoot Dining guidance here. */}
            <div className="barefoot-how-it-works__actions">
              <Button href="/menu" variant="outline">View Menu</Button>
              <Button href={restaurantConfig.links.reservation} disabled={!canReserve} variant="primary">Start a Reservation Request</Button>
              <Button href="/contact" variant="text">Contact / Plan Your Visit</Button>
            </div>
          </Container>
        </section>

        <section className="barefoot-section barefoot-setting" aria-labelledby="barefoot-setting-heading">
          <Container className="barefoot-setting__grid">
            <figure className="barefoot-setting__media"><img className="page-content-image" src={barefootDiningImage} alt="Barefoot Dining experience at Lagnaa." loading="lazy" /></figure>
            <div className="barefoot-setting__copy">
              <SectionHeading eyebrow={content.setting.eyebrow} heading={content.setting.heading} level={2} id="barefoot-setting-heading" />
              <div className="editorial-copy">
                {content.setting.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <a className="text-link" href={restaurantConfig.links.reservation ?? '#plan-your-visit'}>View booking options <TextArrow /></a>
            </div>
          </Container>
        </section>

        <section className="barefoot-section barefoot-food" aria-labelledby="barefoot-food-heading">
          <Container className="barefoot-food__grid">
            <div className="barefoot-food__copy">
              <SectionHeading eyebrow={content.food.eyebrow} heading={content.food.heading} description={content.food.description} level={2} id="barefoot-food-heading" />
              <Button href="/menu" variant="outline">View Menu</Button>
            </div>
            <figure className="barefoot-food__media"><img className="page-content-image" src={barefootDiningImageTwo} alt="Guests enjoying the Barefoot Dining setting at Lagnaa." loading="lazy" /></figure>
          </Container>
        </section>

        <section className="barefoot-section barefoot-arusuvai" aria-labelledby="barefoot-arusuvai-heading">
          <Container className="barefoot-arusuvai__grid">
            <div className="barefoot-arusuvai__motif" aria-hidden="true"><span>VI</span><small>Six flavours</small></div>
            <div className="barefoot-arusuvai__copy">
              <SectionHeading eyebrow={content.arusuvai.eyebrow} heading={content.arusuvai.heading} description={content.arusuvai.description} tone="dark" level={2} id="barefoot-arusuvai-heading" />
              <a className="text-link text-link--light" href="/menu">Explore the menu <TextArrow /></a>
            </div>
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

        <CtaSection
          eyebrow={content.cta.eyebrow}
          heading={content.cta.heading}
          description={content.cta.description}
          primaryAction={{ label: 'Reserve a Table', href: restaurantConfig.links.reservation }}
          secondaryAction={{ label: 'View Menu', href: '/menu', variant: 'outline' }}
        />
      </article>
    </main>
  )
}
