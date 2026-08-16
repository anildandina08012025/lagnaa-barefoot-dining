import { restaurantConfig } from '../../config/restaurant'
import { Container } from '../layout/Container'
import { Button } from './Button'

type TestimonialRequestSectionProps = {
  compact?: boolean
}

export function TestimonialRequestSection({ compact = false }: TestimonialRequestSectionProps) {
  const formUrl = restaurantConfig.links.testimonialForm
  const isEnabled = Boolean(formUrl)

  return (
    <section className={`testimonial-request${compact ? ' testimonial-request--compact' : ''}`} aria-labelledby="testimonial-request-heading">
      <Container className="testimonial-request__grid">
        <div>
          <p className="eyebrow">Guest stories</p>
          <h2 id="testimonial-request-heading">Share your Lagnaa experience.</h2>
          <p>
            Lagnaa may invite guests to share feedback through a Google Form. Guests can choose whether their testimonial may be published publicly, and Lagnaa reviews submissions before anything appears on the website.
          </p>
        </div>
        <div className="testimonial-request__panel">
          <h3>How publication consent works</h3>
          <ul>
            <li>Guests can select public or private feedback.</li>
            <li>Email is used only for verification or follow-up.</li>
            <li>Only approved public testimonials should appear on the website.</li>
          </ul>
          {isEnabled ? (
            <Button href={formUrl} variant="primary" ariaLabel="Open Lagnaa testimonial Google Form">Share Your Experience</Button>
          ) : (
            <Button disabled variant="outline">Google Form Pending</Button>
          )}
        </div>
      </Container>
    </section>
  )
}
