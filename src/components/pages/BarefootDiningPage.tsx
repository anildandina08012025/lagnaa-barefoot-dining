import { restaurantConfig } from '../../config/restaurant'
import { barefootDiningPageContent } from '../../content/experiences'
import { Container } from '../layout/Container'
import { DevelopmentMedia } from '../media/DevelopmentMedia'
import { PageMetadata } from '../seo/PageMetadata'
import { Button } from '../ui/Button'
import { CtaSection } from '../ui/CtaSection'
import { SectionHeading } from '../ui/SectionHeading'

function TextArrow() {
  return <span aria-hidden="true">↗</span>
}

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
            <DevelopmentMedia media={content.hero.media} className="barefoot-hero__media" priority />
          </Container>
        </section>

        <section className="barefoot-section barefoot-introduction" id="barefoot-introduction" aria-labelledby="barefoot-introduction-heading">
          <Container narrow>
            <SectionHeading eyebrow={content.introduction.eyebrow} heading={content.introduction.heading} align="center" level={2} id="barefoot-introduction-heading" />
            <div className="barefoot-introduction__copy">
              {content.introduction.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </Container>
        </section>

        <section className="barefoot-section barefoot-sensory" aria-labelledby="barefoot-sensory-heading">
          <Container className="barefoot-sensory__grid">
            <span className="barefoot-sensory__marker" aria-hidden="true">01</span>
            <SectionHeading eyebrow={content.sensory.eyebrow} heading={content.sensory.heading} description={content.sensory.description} tone="dark" level={2} id="barefoot-sensory-heading" />
          </Container>
        </section>

        <section className="barefoot-section barefoot-setting" aria-labelledby="barefoot-setting-heading">
          <Container className="barefoot-setting__grid">
            <DevelopmentMedia media={content.setting.media} className="barefoot-setting__media" />
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
            <DevelopmentMedia media={content.food.media} className="barefoot-food__media" />
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
            <div className="barefoot-moments__grid" aria-label="Development media directions for approved Barefoot Dining imagery">
              {content.moments.media.map((media) => <DevelopmentMedia media={media} key={media.subject} className="barefoot-moments__media" />)}
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
