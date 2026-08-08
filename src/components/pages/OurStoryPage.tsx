import { restaurantConfig } from '../../config/restaurant'
import { ourStoryContent } from '../../content/ourStory'
import { Container } from '../layout/Container'
import { DevelopmentMedia } from '../media/DevelopmentMedia'
import { PageMetadata } from '../seo/PageMetadata'
import { Button } from '../ui/Button'
import { CtaSection } from '../ui/CtaSection'
import { SectionHeading } from '../ui/SectionHeading'

function TextArrow() {
  return <span aria-hidden="true">↗</span>
}

export function OurStoryPage() {
  const { hero, story, foodPhilosophy, arusuvai, barefoot, littleIndia, seo } = ourStoryContent
  const canReserve = Boolean(restaurantConfig.links.reservation)
  const canonicalUrl = restaurantConfig.siteUrl ? `${restaurantConfig.siteUrl.replace(/\/$/, '')}/our-story` : undefined

  return (
    <main id="main-content">
      <PageMetadata title={seo.title} description={seo.description} canonicalUrl={canonicalUrl} />
      <article>
        <section className="story-hero" aria-labelledby="story-heading">
          <Container className="story-hero__grid">
            <div className="story-hero__content">
              <p className="eyebrow">{hero.eyebrow}</p>
              <h1 className="story-hero__heading" id="story-heading">{hero.heading}</h1>
              <p className="story-hero__description">{hero.description}</p>
              <a className="text-link" href="#lagnaa-story">Read the story <TextArrow /></a>
            </div>
            <DevelopmentMedia media={hero.media} className="story-hero__media" priority />
          </Container>
        </section>

        <section className="story-section story-main" id="lagnaa-story" aria-labelledby="story-main-heading">
          <Container className="story-main__grid">
            <div className="story-main__marker" aria-hidden="true">01</div>
            <div className="story-main__copy">
              <SectionHeading eyebrow={story.eyebrow} heading={story.heading} level={2} id="story-main-heading" />
              <div className="editorial-copy">
                {story.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
            <DevelopmentMedia media={story.media} className="story-main__media" />
          </Container>
        </section>

        <section className="story-section story-food-philosophy" aria-labelledby="food-philosophy-heading">
          <Container className="story-food-philosophy__grid">
            <DevelopmentMedia media={foodPhilosophy.media} className="story-food-philosophy__media" />
            <div className="story-food-philosophy__copy">
              <SectionHeading eyebrow={foodPhilosophy.eyebrow} heading={foodPhilosophy.heading} level={2} id="food-philosophy-heading" />
              <div className="editorial-copy">
                {foodPhilosophy.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <Button href="/menu" variant="outline">Explore the Menu</Button>
            </div>
          </Container>
        </section>

        <section className="story-section story-arusuvai" aria-labelledby="story-arusuvai-heading">
          <Container className="story-arusuvai__grid">
            <div className="story-arusuvai__seal" aria-hidden="true"><span>VI</span><small>Six flavours</small></div>
            <div className="story-arusuvai__copy">
              <SectionHeading eyebrow={arusuvai.eyebrow} heading={arusuvai.heading} description={arusuvai.description} level={2} id="story-arusuvai-heading" />
              <a className="text-link text-link--light" href="/menu">Explore the menu <TextArrow /></a>
            </div>
          </Container>
        </section>

        <section className="story-section story-barefoot" aria-labelledby="story-barefoot-heading">
          <Container className="story-barefoot__grid">
            <div className="story-barefoot__copy">
              <SectionHeading eyebrow={barefoot.eyebrow} heading={barefoot.heading} level={2} id="story-barefoot-heading" />
              <div className="editorial-copy">
                {barefoot.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <div className="story-barefoot__actions">
                <Button href="/experiences/barefoot-dining" variant="primary">Discover Barefoot Dining</Button>
                <Button href={restaurantConfig.links.reservation} disabled={!canReserve} variant="outline">Reserve a Table</Button>
              </div>
            </div>
            <DevelopmentMedia media={barefoot.media} className="story-barefoot__media" />
          </Container>
        </section>

        <section className="story-section story-little-india" aria-labelledby="little-india-heading">
          <Container className="story-little-india__grid">
            <SectionHeading eyebrow={littleIndia.eyebrow} heading={littleIndia.heading} description={littleIndia.description} level={2} id="little-india-heading" />
            <div className="story-little-india__action">
              {restaurantConfig.mapsUrl ? <Button href={restaurantConfig.mapsUrl} variant="outline">Get Directions</Button> : null}
              <a className="text-link" href="/contact">Contact and visit Lagnaa <TextArrow /></a>
            </div>
          </Container>
        </section>

        <CtaSection
          eyebrow="Experience the story"
          heading="Come and experience the story for yourself."
          description="Explore Lagnaa’s food and distinctive dining experience, then plan your visit."
          primaryAction={{ label: 'Reserve a Table', href: restaurantConfig.links.reservation }}
          secondaryAction={{ label: 'View Menu', href: '/menu', variant: 'outline' }}
        />
      </article>
    </main>
  )
}
