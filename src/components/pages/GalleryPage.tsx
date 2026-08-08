import { restaurantConfig } from '../../config/restaurant'
import { galleryContent } from '../../content/gallery'
import { Container } from '../layout/Container'
import { PageMetadata } from '../seo/PageMetadata'
import { CtaSection } from '../ui/CtaSection'
import { SectionHeading } from '../ui/SectionHeading'
import { VerticalThumbnailGallery } from '../ui/VerticalThumbnailGallery'

export function GalleryPage() {
  const content = galleryContent
  const canonicalUrl = restaurantConfig.siteUrl ? `${restaurantConfig.siteUrl.replace(/\/$/, '')}/gallery` : undefined

  return (
    <main id="main-content">
      <PageMetadata title={content.seo.title} description={content.seo.description} canonicalUrl={canonicalUrl} />
      <article>
        <section className="gallery-hero" aria-labelledby="gallery-heading">
          <Container className="gallery-hero__grid">
            <div className="gallery-hero__content">
              <p className="eyebrow gallery-hero__eyebrow">{content.hero.eyebrow}</p>
              <h1 className="gallery-hero__heading" id="gallery-heading">{content.hero.heading}</h1>
              <p className="gallery-hero__description">{content.hero.description}</p>
            </div>
            <div className="gallery-hero__ornament" aria-hidden="true">
              <span>{content.images.length}</span>
              <small>Official<br />photographs</small>
            </div>
          </Container>
        </section>

        <section className="gallery-section gallery-collection" aria-labelledby="gallery-collection-heading">
          <Container>
            <SectionHeading
              eyebrow={content.collection.eyebrow}
              heading={content.collection.heading}
              description={content.collection.description}
              level={2}
              id="gallery-collection-heading"
            />
            <VerticalThumbnailGallery images={content.images} />
          </Container>
        </section>

        <CtaSection
          eyebrow={content.cta.eyebrow}
          heading={content.cta.heading}
          description={content.cta.description}
          primaryAction={restaurantConfig.links.reservation ? { label: 'Reserve a Table', href: restaurantConfig.links.reservation } : undefined}
          secondaryAction={{ label: 'Explore the Menu', href: '/menu', variant: 'outline' }}
        />
      </article>
    </main>
  )
}
