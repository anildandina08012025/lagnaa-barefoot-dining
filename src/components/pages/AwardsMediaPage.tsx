import { restaurantConfig } from '../../config/restaurant'
import { awardsMediaContent } from '../../content/awardsMedia'
import { recognitionItems } from '../../content/recognition'
import arukikataLogo from '../../assets/recognition/arukikata.jpg'
import ctripLogo from '../../assets/recognition/ctrip.png'
import shopbackLogo from '../../assets/recognition/shopback.png'
import tripadvisorLogo from '../../assets/recognition/tripadvisor.png'
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
  const getRecognitionLogo = (name: string) => {
    const recognition = recognitionItems.find((item) => item.name === name || item.name === name.replace('The ', ''))
    if (recognition?.logoSrc) return { logoSrc: recognition.logoSrc, logoAlt: recognition.logoAlt }

    return {
      Tripadvisor: { logoSrc: tripadvisorLogo, logoAlt: 'Tripadvisor logo' },
      ShopBack: { logoSrc: shopbackLogo, logoAlt: 'ShopBack logo' },
      Ctrip: { logoSrc: ctripLogo, logoAlt: 'Ctrip logo' },
      Arukikata: { logoSrc: arukikataLogo, logoAlt: 'Arukikata logo' },
    }[name]
  }
  const verifiedMedia = [
    ...recognitionItems.filter((item) => item.verificationStatus === 'verified' && item.type !== 'Recognition').map((item) => ({
      id: item.id,
      publication: item.name,
      title: item.name,
      summary: item.type,
      sourceUrl: item.destinationUrl,
      sourceLabel: item.actionLabel,
      logoSrc: item.logoSrc,
      logoAlt: item.logoAlt,
    })),
    ...content.media.map((item) => {
      const recognition = getRecognitionLogo(item.publication)
      return { ...item, logoSrc: recognition?.logoSrc, logoAlt: recognition?.logoAlt }
    }),
  ]
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
          </Container>
        </section>

        {content.awards.length > 0 ? (
          <section className="awards-section awards-recognition" id="recognition" aria-labelledby="awards-recognition-heading">
            <Container>
              <h2 className="sr-only" id="awards-recognition-heading">Awards and recognition</h2>
              <div className="awards-recognition__list">
                {content.awards.map((award) => (
                  <article className="award-record" key={award.id}>
                    <div className="award-record__meta">
                      {getRecognitionLogo(award.organisation)?.logoSrc ? <img className="award-record__logo" src={getRecognitionLogo(award.organisation)?.logoSrc} alt={getRecognitionLogo(award.organisation)?.logoAlt ?? `${award.organisation} logo`} /> : null}
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

        <section className="awards-section awards-media-list" aria-labelledby="awards-media-list-heading">
          <Container>
            <div className="awards-recognition__heading-row">
              <SectionHeading eyebrow="Press, guides and editorial coverage" heading="Published mentions." level={2} id="awards-media-list-heading" />
              <p>Selected records published by Lagnaa and linked to their available original sources.</p>
            </div>
            <div className="awards-media-list__grid">
              {verifiedMedia.map((item) => (
                <article className="awards-media-card" key={item.id}>
                  {item.logoSrc ? <div className="awards-media-card__logo"><img src={item.logoSrc} alt={item.logoAlt ?? `${item.publication} logo`} loading="lazy" /></div> : null}
                  <p className="eyebrow">{item.publication}</p>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <a className="text-link" href={item.sourceUrl} target="_blank" rel="noopener noreferrer">{item.sourceLabel} <TextArrow /></a>
                </article>
              ))}
            </div>
          </Container>
        </section>

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
