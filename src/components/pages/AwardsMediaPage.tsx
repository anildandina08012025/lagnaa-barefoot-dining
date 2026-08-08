import { restaurantConfig } from '../../config/restaurant'
import { awardsMediaContent } from '../../content/awardsMedia'
import { Container } from '../layout/Container'
import { PageMetadata } from '../seo/PageMetadata'
import { Button } from '../ui/Button'
import { CtaSection } from '../ui/CtaSection'
import { SectionHeading } from '../ui/SectionHeading'

function TextArrow() {
  return <span aria-hidden="true">↗</span>
}

export function AwardsMediaPage() {
  const content = awardsMediaContent
  const canonicalUrl = restaurantConfig.siteUrl ? `${restaurantConfig.siteUrl.replace(/\/$/, '')}/awards-media` : undefined

  return (
    <main id="main-content">
      <PageMetadata title={content.seo.title} description={content.seo.description} canonicalUrl={canonicalUrl} />
      <article>
        <section className="awards-hero" aria-labelledby="awards-heading">
          <Container className="awards-hero__grid">
            <div className="awards-hero__content">
              <p className="eyebrow awards-hero__eyebrow">{content.hero.eyebrow}</p>
              <h1 className="awards-hero__heading" id="awards-heading">{content.hero.heading}</h1>
              <p className="awards-hero__description">{content.hero.description}</p>
              {content.awards.length > 0 ? <a className="text-link text-link--light" href="#recognition">View recognition <TextArrow /></a> : null}
            </div>
            <div className="awards-hero__ornament" aria-hidden="true"><span>01</span><small>Source-led</small></div>
          </Container>
        </section>

        <section className="awards-section awards-introduction" aria-labelledby="awards-introduction-heading">
          <Container narrow>
            <SectionHeading eyebrow={content.introduction.eyebrow} heading={content.introduction.heading} description={content.introduction.description} align="center" level={2} id="awards-introduction-heading" />
          </Container>
        </section>

        {content.awards.length > 0 ? (
          <section className="awards-section awards-recognition" id="recognition" aria-labelledby="awards-recognition-heading">
            <Container>
              <div className="awards-recognition__heading-row">
                <SectionHeading eyebrow="Awards and recognition" heading="Verified recognition." level={2} id="awards-recognition-heading" />
                <p>Each record links to its original source.</p>
              </div>
              <div className="awards-recognition__list">
                {content.awards.map((award) => (
                  <article className="award-record" key={award.id}>
                    <div className="award-record__meta">
                      <span>{award.organisation}</span>
                      <strong>{award.recognitionLabel}</strong>
                    </div>
                    <div className="award-record__content">
                      <h3>{award.title}</h3>
                      <p>{award.summary}</p>
                      <dl>
                        <div><dt>Recipient</dt><dd>{award.recipient}</dd></div>
                        {award.category ? <div><dt>Category</dt><dd>{award.category}</dd></div> : null}
                        {award.displayDate ? <div><dt>Date</dt><dd>{award.displayDate}</dd></div> : null}
                      </dl>
                    </div>
                    <div className="award-record__links">
                      <a className="text-link" href={award.sourceUrl}>{award.sourceLabel} <TextArrow /></a>
                      {award.editorialSourceUrl && award.editorialSourceLabel ? (
                        <a className="text-link" href={award.editorialSourceUrl}>{award.editorialSourceLabel} <TextArrow /></a>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </Container>
          </section>
        ) : null}

        <section className="awards-section awards-enquiries" aria-labelledby="awards-enquiries-heading">
          <Container className="awards-enquiries__grid">
            <SectionHeading eyebrow={content.enquiries.eyebrow} heading={content.enquiries.heading} description={content.enquiries.description} tone="dark" level={2} id="awards-enquiries-heading" />
            {restaurantConfig.email ? <Button href={`mailto:${restaurantConfig.email}`} variant="light">Email Lagnaa</Button> : null}
          </Container>
        </section>

        <section className="awards-section awards-explore" aria-labelledby="awards-explore-heading">
          <Container>
            <SectionHeading eyebrow="Explore Lagnaa" heading="Continue your Lagnaa journey." level={2} id="awards-explore-heading" />
            <div className="awards-explore__links">
              {content.explore.map((item) => (
                <a href={item.href} key={item.href}>
                  <div><h3>{item.label}</h3><p>{item.description}</p></div>
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
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
