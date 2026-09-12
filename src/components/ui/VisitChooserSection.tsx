import { restaurantConfig } from '../../config/restaurant'
import { Container } from '../layout/Container'
import { SectionHeading } from './SectionHeading'

type VisitChoice = {
  eyebrow: string
  title: string
  description: string
  href: string
  actionLabel: string
}

type VisitChooserSectionProps = {
  id?: string
  tone?: 'light' | 'dark'
  scrollScene?: boolean
}

function TextArrow() {
  return <span aria-hidden="true">↗</span>
}

const visitChoices: readonly VisitChoice[] = [
  {
    eyebrow: 'Table reservation',
    title: 'Reserve a Table',
    description: 'Start a standard table reservation and let Lagnaa...barefoot dining confirm the details directly.',
    href: restaurantConfig.links.reservation ?? '/reservations',
    actionLabel: 'Reserve a Table',
  },
  {
    eyebrow: 'Signature experience',
    title: 'Barefoot Dining',
    description: 'Discover Lagnaa...barefoot dining’s signature dining experience shaped by Indian food, hospitality and atmosphere.',
    href: '/experiences/barefoot-dining',
    actionLabel: 'Discover',
  },
  {
    eyebrow: 'Food challenge',
    title: 'Ultimate Chilli Challenge',
    description: 'Explore Lagnaa...barefoot dining’s signature food challenge for guests who enjoy discovering spice.',
    href: '/experiences/chilli-challenge',
    actionLabel: 'Explore',
  },
  {
    eyebrow: 'Food tasting',
    title: 'Monthly Dégustation',
    description: 'Learn about Lagnaa...barefoot dining’s food-tasting experience centred on discovering dishes and flavours together.',
    href: '/events/monthly-degustation',
    actionLabel: 'Explore',
  },
  {
    eyebrow: 'Cooking class',
    title: 'Cooking with Chef Kaesavan',
    description: 'Register interest in an Indian cooking-class experience with Chef Kaesavan.',
    href: '/events/cooking-with-chef-kaesavan',
    actionLabel: 'Learn More',
  },
]

export function VisitChooserSection({ id = 'choose-your-visit', tone = 'light', scrollScene = false }: VisitChooserSectionProps) {
  const headingId = `${id}-heading`

  return (
    <section className={`visit-chooser visit-chooser--${tone}`} id={id} data-home-scroll-scene={scrollScene ? '' : undefined} aria-labelledby={headingId}>
      <Container>
        <div className="visit-chooser__heading-row">
          <SectionHeading
            eyebrow="Choose your Lagnaa...barefoot dining visit"
            heading="Find the right way to experience Lagnaa...barefoot dining."
            description="Choose a table reservation, explore a signature experience, or contact Lagnaa...barefoot dining if you need help deciding."
            tone={tone === 'dark' ? 'dark' : 'light'}
            level={2}
            id={headingId}
          />
          <a className={`text-link${tone === 'dark' ? ' text-link--light' : ''}`} href="/contact">
            Not sure which experience is right for you? <TextArrow />
          </a>
        </div>

        <div className="visit-chooser__grid">
          {visitChoices.map((choice) => (
            <a className="visit-chooser__card" href={choice.href} key={choice.title}>
              <span className="visit-chooser__eyebrow">{choice.eyebrow}</span>
              <strong>{choice.title}</strong>
              <span>{choice.description}</span>
              <em>{choice.actionLabel} <TextArrow /></em>
            </a>
          ))}
        </div>
      </Container>
    </section>
  )
}
