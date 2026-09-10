import cookingMomentImage from '../../assets/lagnaa-showcase/lagnaa-cooking-moment.webp'
import malaiTikkaImage from '../../assets/gallery/lagnaa-malai-tikka.jpg'
import cookingFoodExperiencesImage from '../../assets/cooking/lagnaa-cooking-class-food-experiences.webp'
import { restaurantConfig } from '../../config/restaurant'
import { Container } from '../layout/Container'
import { DevelopmentMedia } from '../media/DevelopmentMedia'
import { PageMetadata } from '../seo/PageMetadata'
import { Button } from '../ui/Button'
import { CtaSection } from '../ui/CtaSection'
import { SectionHeading } from '../ui/SectionHeading'

function TextArrow() {
  return <span aria-hidden="true">↗</span>
}

const pageTitle = 'Indian Cooking Class Singapore | Cooking with Chef Kaesavan'
const pageDescription = 'Learn about Cooking with Chef Kaesavan at Lagnaa, an Indian cooking-class experience in Singapore with enquiry details.'

export function IndianCookingClassSingaporePage() {
  const canonicalUrl = restaurantConfig.siteUrl ? `${restaurantConfig.siteUrl.replace(/\/$/, '')}/indian-cooking-class-singapore` : undefined

  return (
    <main id="main-content">
      <PageMetadata title={pageTitle} description={pageDescription} canonicalUrl={canonicalUrl} />
      <article>
        <section className="cooking-hero" aria-labelledby="cooking-class-singapore-heading">
          <Container className="cooking-hero__grid">
            <div className="cooking-hero__content">
              <p className="eyebrow cooking-hero__eyebrow">Indian Cooking Class Singapore</p>
              <h1 className="cooking-hero__heading" id="cooking-class-singapore-heading">Cook with Chef Kaesavan.</h1>
              <p className="cooking-hero__description">
                Cooking with Chef Kaesavan is Lagnaa’s Indian cooking-class experience for visitors interested in learning more about Indian cuisine.
              </p>
              <a className="text-link text-link--light" href="/events/cooking-with-chef-kaesavan">Explore the class <TextArrow /></a>
            </div>
            <figure className="cooking-hero__image">
              <img src={cookingMomentImage} alt="A cooking class moment at Lagnaa." width="1600" height="1600" />
            </figure>
          </Container>
        </section>

        <section className="story-section story-main" aria-labelledby="cooking-class-overview-heading">
          <Container className="story-main__grid">
            <div className="story-main__marker" aria-hidden="true">01</div>
            <div className="story-main__copy">
              <SectionHeading eyebrow="Cooking experience" heading="Learn about Indian cuisine at Lagnaa ...barefoot dinning." level={2} id="cooking-class-overview-heading" />
              <div className="editorial-copy">
                <p>
                  The cooking-class experience is presented around Chef Kaesavan and Lagnaa’s Indian food culture.
                </p>
                <p>
                  Current class details, availability and participation information should be confirmed directly with Lagnaa.
                </p>
              </div>
              <a className="text-link" href="/events/cooking-with-chef-kaesavan">View class details <TextArrow /></a>
            </div>
            <DevelopmentMedia
              image={malaiTikkaImage}
              imageAlt="An Indian dish photographed at Lagnaa."
              media={{ subject: 'Indian cooking class', detail: 'Food photograph connected to Indian cooking and restaurant experience.', format: 'landscape', tone: 'saffron' }}
              className="story-main__media"
            />
          </Container>
        </section>

        <section className="story-section story-food-philosophy" aria-labelledby="cooking-class-food-heading">
          <Container className="story-food-philosophy__grid">
            <DevelopmentMedia
              image={cookingFoodExperiencesImage}
              imageAlt="Lagnaa food and cooking ingredients."
              media={{ subject: 'Cooking and ingredients', detail: 'Warm ingredient or cooking-process direction for class discovery.', format: 'landscape', tone: 'cocoa' }}
              className="story-food-philosophy__media"
            />
            <div className="story-food-philosophy__copy">
              <SectionHeading eyebrow="Before you enquire" heading="Explore Lagnaa’s food and experiences." level={2} id="cooking-class-food-heading" />
              <div className="editorial-copy">
                <p>
                  Visitors can browse Lagnaa’s menu and other dining experiences before contacting the restaurant about the cooking class.
                </p>
                <p>
                  Do not treat this page as a live class schedule; it is an enquiry path until current details are confirmed by Lagnaa.
                </p>
              </div>
              <Button href="/menu" variant="outline">Explore the Menu</Button>
            </div>
          </Container>
        </section>

        <section className="story-section story-little-india" aria-labelledby="cooking-class-location-heading">
          <Container className="story-little-india__grid">
            <SectionHeading
              eyebrow="Contact Lagnaa"
              heading="Register interest for the cooking class."
              description={`Lagnaa Barefoot Dining is located at ${restaurantConfig.address}. Contact Lagnaa for current Cooking with Chef Kaesavan details.`}
              level={2}
              id="cooking-class-location-heading"
            />
            <div className="story-little-india__action">
              <Button href="/events/cooking-with-chef-kaesavan" variant="primary">Explore Cooking Class</Button>
              <a className="text-link" href="/contact">Contact Lagnaa <TextArrow /></a>
            </div>
          </Container>
        </section>

        <CtaSection
          eyebrow="Indian cooking class Singapore"
          heading="Interested in Cooking with Chef Kaesavan?"
          description="View the internal class page or contact Lagnaa for current details."
          primaryAction={{ label: 'Explore Cooking Class', href: '/events/cooking-with-chef-kaesavan' }}
          secondaryAction={{ label: 'Contact Lagnaa', href: '/contact', variant: 'outline' }}
        />
      </article>
    </main>
  )
}
