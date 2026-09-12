import { restaurantConfig } from '../../config/restaurant'
import { Container } from '../layout/Container'
import { PageMetadata } from '../seo/PageMetadata'
import { Button } from '../ui/Button'
import { SectionHeading } from '../ui/SectionHeading'

const pageTitle = 'Lagnaa...barefoot dining Journal | Indian Food Stories in Singapore'
const pageDescription = 'Read future Lagnaa...barefoot dining stories about Indian food, Barefoot Dining, spice levels, Arusuvai and Little India dining in Singapore.'

export function BlogPage() {
  const canonicalUrl = restaurantConfig.siteUrl ? `${restaurantConfig.siteUrl.replace(/\/$/, '')}/blog` : undefined

  return (
    <main id="main-content">
      <PageMetadata title={pageTitle} description={pageDescription} canonicalUrl={canonicalUrl} />
      <article>
        <section className="story-hero blog-hero" aria-labelledby="blog-heading">
          <Container className="story-hero__grid">
            <div className="story-hero__content">
              <p className="eyebrow">Lagnaa...barefoot dining Journal</p>
              <h1 className="story-hero__heading" id="blog-heading">Indian food stories, guides and Lagnaa...barefoot dining updates.</h1>
              <p className="story-hero__description">
                This journal will share future stories about Indian dining, Barefoot Dining, spice levels, Arusuvai and Lagnaa...barefoot dining’s Little India setting.
              </p>
              <div className="story-barefoot__actions">
                <Button href="/menu" variant="primary">Explore the Menu</Button>
                <Button href="/reservations" variant="outline">Reserve a Table</Button>
              </div>
            </div>
            <div className="blog-hero__note" aria-label="Blog status">
              <p className="eyebrow">Coming soon</p>
              <h2>Stories will be added here.</h2>
              <p>Future posts can support food discovery, local SEO and social-media content once Lagnaa...barefoot dining approves the publishing plan.</p>
            </div>
          </Container>
        </section>

        <section className="story-section blog-planning" aria-labelledby="blog-planning-heading">
          <Container>
            <SectionHeading
              eyebrow="Future topics"
              heading="Useful guides can be published here over time."
              description="Recommended topics include Indian food in Little India, Barefoot Dining, customisable spice levels, Arusuvai, vegetarian Indian food and Lagnaa...barefoot dining’s dining experiences."
              level={2}
              id="blog-planning-heading"
            />
          </Container>
        </section>
      </article>
    </main>
  )
}
