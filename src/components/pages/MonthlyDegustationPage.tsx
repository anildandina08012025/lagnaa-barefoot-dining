import platter from '../../assets/gallery/lagnaa-arusuvai-platter.jpg'
import octoberSpecial from '../../assets/monthly-specials/lagnaa-october-special.webp'
import juneMonthlySpecialOne from '../../assets/monthly-specials/lagnaa-june-monthly-special-1.webp'
import juneMonthlySpecialTwo from '../../assets/monthly-specials/lagnaa-june-monthly-special-2.webp'
import juneMonthlySpecialThree from '../../assets/monthly-specials/lagnaa-june-monthly-special-3.webp'
import juneMonthlySpecialFour from '../../assets/monthly-specials/lagnaa-june-monthly-special-4.webp'
import augustMonthlySpecial from '../../assets/monthly-specials/lagnaa-august-monthly-special.webp'
import octoberMonthlySpecialTwo from '../../assets/monthly-specials/lagnaa-october-monthly-special-2.webp'
import { restaurantConfig } from '../../config/restaurant'
import { Container } from '../layout/Container'
import { PageMetadata } from '../seo/PageMetadata'
import { CtaSection } from '../ui/CtaSection'
import { SectionHeading } from '../ui/SectionHeading'

const pastTastings = [
  { name: 'June Monthly Special I', image: juneMonthlySpecialOne, alt: 'June monthly special at Lagnaa.' },
  { name: 'June Monthly Special II', image: juneMonthlySpecialTwo, alt: 'June monthly special at Lagnaa.' },
  { name: 'June Monthly Special III', image: juneMonthlySpecialThree, alt: 'June monthly special at Lagnaa.' },
  { name: 'June Monthly Special IV', image: juneMonthlySpecialFour, alt: 'June monthly special at Lagnaa.' },
  { name: 'August Monthly Special', image: augustMonthlySpecial, alt: 'August monthly special at Lagnaa.' },
  { name: 'October Monthly Special I', image: octoberSpecial, alt: 'October monthly special at Lagnaa.' },
  { name: 'October Monthly Special II', image: octoberMonthlySpecialTwo, alt: 'October monthly special at Lagnaa.' },
] as const

const degustationSocialCards = [
  {
    id: 'degustation-instagram-dwlqjptk',
    eyebrow: 'Instagram',
    title: 'Monthly Dégustation moment',
    description: 'Watch this official Lagnaa Monthly Dégustation post on Instagram.',
    href: 'https://www.instagram.com/p/DWlQJpTk-P/',
    image: augustMonthlySpecial,
    alt: 'August monthly special at Lagnaa.',
  },
  {
    id: 'degustation-instagram-dhvb24vs9cv',
    eyebrow: 'Instagram',
    title: 'Monthly Dégustation video',
    description: 'Watch this official Lagnaa Monthly Dégustation video on Instagram.',
    href: 'https://www.instagram.com/p/DHvb24vS9CV/',
    image: juneMonthlySpecialOne,
    alt: 'June monthly special at Lagnaa.',
  },
  {
    id: 'degustation-instagram-cwmwudjnr5',
    eyebrow: 'Instagram',
    title: 'Monthly Dégustation on Instagram',
    description: 'Watch another official Lagnaa Monthly Dégustation post on Instagram.',
    href: 'https://www.instagram.com/p/CwMWuDJNr5-/',
    image: octoberSpecial,
    alt: 'October monthly special at Lagnaa.',
  },
] as const

function TextArrow() {
  return <span aria-hidden="true">↗</span>
}

export function MonthlyDegustationPage() {
  const canonicalUrl = restaurantConfig.siteUrl
    ? `${restaurantConfig.siteUrl.replace(/\/$/, '')}/events/monthly-degustation`
    : undefined

  return (
    <main id="main-content">
      <PageMetadata
        title="Monthly Dégustation Singapore | Lagnaa Food Tasting Experience"
        description="Register interest in Lagnaa’s food-tasting experience in Singapore and learn how guests can share feedback toward future menu specials."
        canonicalUrl={canonicalUrl}
      />
      <article className="degustation-page">
        <section className="degustation-hero" aria-labelledby="degustation-heading">
          <Container className="degustation-hero__grid">
            <div className="degustation-hero__content">
              <p className="eyebrow degustation-hero__eyebrow">Lagnaa Experiences</p>
              <h1 className="degustation-hero__heading" id="degustation-heading">Monthly Dégustation</h1>
              <p className="degustation-hero__description">Join Lagnaa’s food-tasting experience and help shape future menu specials. Guests are invited to explore a selection of dishes and share their feedback with the Lagnaa team.</p>
              <a className="text-link text-link--light" href="#degustation-archive">See past monthly specials <TextArrow /></a>
            </div>
            <figure className="degustation-hero__image">
              <img src={platter} alt="A selection of Indian dishes presented on a divided platter." />
            </figure>
          </Container>
        </section>

        <section className="degustation-section degustation-archive" aria-labelledby="degustation-archive-heading">
          <Container>
            <div className="degustation-archive__heading">
              <SectionHeading eyebrow="Monthly specials" heading="A taste of past monthly specials." level={2} id="degustation-archive-heading" />
              <p>Selected monthly specials from Lagnaa’s past dégustation offerings. This is an archive, not a current menu or event listing.</p>
            </div>
            <div className="degustation-archive__grid">
              {pastTastings.map((dish) => (
                <figure key={dish.name}>
                  <img src={dish.image} alt={dish.alt} />
                  <figcaption>{dish.name}</figcaption>
                </figure>
              ))}
            </div>
          </Container>
        </section>

        <section className="degustation-section degustation-introduction" aria-labelledby="degustation-introduction-heading">
          <Container narrow>
            <SectionHeading eyebrow="Taste. Share. Shape the Menu." heading="An experience built around food and conversation." align="center" level={2} id="degustation-introduction-heading" />
            <p className="degustation-introduction__copy">Lagnaa’s dégustation experience brings food lovers together to discover dishes, exchange impressions and contribute feedback toward future menu selections.</p>
          </Container>
        </section>

        <section className="degustation-section experience-social" aria-labelledby="degustation-social-heading">
          <Container>
            <div className="experience-social__header">
              <SectionHeading
                eyebrow="Social moments"
                heading="Monthly Dégustation on Instagram."
                level={2}
                id="degustation-social-heading"
              />
              <p>
                Watch official Lagnaa posts and updates on Instagram. Videos open on social media, not inside this website.
              </p>
            </div>
            <div className="experience-social__scroller" aria-label="Official Instagram links for Lagnaa Monthly Dégustation moments">
              {degustationSocialCards.map((card) => (
                <a
                  aria-label={`${card.title}. Opens Lagnaa on Instagram in a new tab.`}
                  className="experience-social-card"
                  href={card.href}
                  key={card.id}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="experience-social-card__media">
                    <img src={card.image} alt={card.alt} loading="lazy" />
                    <span className="experience-social-card__play" aria-hidden="true">▶</span>
                  </span>
                  <span className="experience-social-card__body">
                    <span className="eyebrow">{card.eyebrow}</span>
                    <span className="experience-social-card__title">{card.title}</span>
                    <span className="experience-social-card__description">{card.description}</span>
                    <span className="experience-social-card__action">Watch on Instagram <TextArrow /></span>
                  </span>
                </a>
              ))}
            </div>
          </Container>
        </section>

        <CtaSection
          eyebrow="Explore Lagnaa"
          heading="Discover flavour at your own pace."
          description="Explore the current menu or discover Lagnaa’s other experiences."
          primaryAction={{ label: 'View Menu', href: '/menu' }}
          secondaryAction={{ label: 'Explore Experiences', href: '/experiences', variant: 'outline' }}
        />
      </article>
    </main>
  )
}
