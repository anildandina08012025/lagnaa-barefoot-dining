import { useState, type FormEvent } from 'react'
import elaiKoli from '../../assets/gallery/lagnaa-elai-koli.jpg'
import miniPuri from '../../assets/gallery/lagnaa-mini-puri.jpg'
import muttonKoorma from '../../assets/gallery/lagnaa-nilagiri-mutton-koorma.jpg'
import platter from '../../assets/gallery/lagnaa-arusuvai-platter.jpg'
import { restaurantConfig } from '../../config/restaurant'
import { Container } from '../layout/Container'
import { PageMetadata } from '../seo/PageMetadata'
import { Button } from '../ui/Button'
import { CtaSection } from '../ui/CtaSection'
import { SectionHeading } from '../ui/SectionHeading'

type InterestForm = {
  name: string
  guestName: string
  email: string
  phone: string
  dietary: string
  message: string
}

type InterestErrors = Partial<Record<keyof InterestForm, string>>

const initialForm: InterestForm = { name: '', guestName: '', email: '', phone: '', dietary: '', message: '' }

const pastTastings = [
  { name: 'Elai Koli', image: elaiKoli, alt: 'Elai Koli served on a banana leaf.' },
  { name: 'Nilagiri Mutton Koorma', image: muttonKoorma, alt: 'Nilagiri Mutton Koorma in a serving bowl.' },
  { name: 'Mini Puri', image: miniPuri, alt: 'Mini Puri presented on a plate.' },
] as const

function TextArrow() {
  return <span aria-hidden="true">↗</span>
}

function makeWhatsAppUrl(message: string) {
  const number = restaurantConfig.phone?.replace(/\D/g, '')
  return number ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : null
}

export function MonthlyDegustationPage() {
  const [form, setForm] = useState<InterestForm>(initialForm)
  const [errors, setErrors] = useState<InterestErrors>({})
  const [preparedUrl, setPreparedUrl] = useState<string | null>(null)
  const canonicalUrl = restaurantConfig.siteUrl
    ? `${restaurantConfig.siteUrl.replace(/\/$/, '')}/events/monthly-degustation`
    : undefined

  const updateField = (field: keyof InterestForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setPreparedUrl(null)
  }

  const submitInterest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors: InterestErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Enter your full name.'
    if (!form.email.trim()) nextErrors.email = 'Enter your email address.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Enter a valid email address.'
    if (!form.phone.trim()) nextErrors.phone = 'Enter a contact number including the country code.'
    else if (!form.phone.trim().startsWith('+')) nextErrors.phone = 'Include the country code, for example +65.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const message = [
      'Hello Lagnaa, I’m interested in the Monthly Dégustation experience.',
      '',
      `Name: ${form.name.trim()}`,
      `Guest name: ${form.guestName.trim() || 'Not provided'}`,
      `Email: ${form.email.trim()}`,
      `Contact number: ${form.phone.trim()}`,
      `Dietary restrictions: ${form.dietary.trim() || 'None provided'}`,
      `Message: ${form.message.trim() || 'None provided'}`,
    ].join('\n')
    const url = makeWhatsAppUrl(message)
    setPreparedUrl(url)
    if (url) window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <main id="main-content">
      <PageMetadata
        title="Monthly Dégustation | Lagnaa Barefoot Dining"
        description="Register your interest in Lagnaa’s food-tasting experience and learn about future menu specials."
        canonicalUrl={canonicalUrl}
      />
      <article className="degustation-page">
        <section className="degustation-hero" aria-labelledby="degustation-heading">
          <Container className="degustation-hero__grid">
            <div className="degustation-hero__content">
              <p className="eyebrow degustation-hero__eyebrow">Lagnaa Experiences</p>
              <h1 className="degustation-hero__heading" id="degustation-heading">Monthly Dégustation</h1>
              <p className="degustation-hero__description">Join Lagnaa’s food-tasting experience and help shape future menu specials. Guests are invited to explore a selection of dishes and share their feedback with the Lagnaa team.</p>
              <a className="text-link text-link--light" href="#degustation-interest">Register your interest <TextArrow /></a>
            </div>
            <figure className="degustation-hero__image">
              <img src={platter} alt="A selection of Indian dishes presented on a divided platter." />
            </figure>
          </Container>
        </section>

        <section className="degustation-section degustation-introduction" aria-labelledby="degustation-introduction-heading">
          <Container narrow>
            <SectionHeading eyebrow="Taste. Share. Shape the Menu." heading="An experience built around food and conversation." align="center" level={2} id="degustation-introduction-heading" />
            <p className="degustation-introduction__copy">Lagnaa’s dégustation experience brings food lovers together to discover dishes, exchange impressions and contribute feedback toward future menu selections.</p>
          </Container>
        </section>

        <section className="degustation-section degustation-availability" aria-labelledby="degustation-availability-heading">
          <Container className="degustation-availability__grid">
            <span className="degustation-availability__marker" aria-hidden="true">∞</span>
            <div>
              <p className="eyebrow">Current availability</p>
              <h2 id="degustation-availability-heading">Stay close to the next tasting.</h2>
              <p>Upcoming dégustation details will be announced by Lagnaa. Register your interest to receive more information.</p>
            </div>
          </Container>
        </section>

        <section className="degustation-section degustation-interest" id="degustation-interest" aria-labelledby="degustation-interest-heading">
          <Container className="degustation-interest__grid">
            <div className="degustation-interest__copy">
              <SectionHeading eyebrow="Register your interest" heading="Tell Lagnaa you would like to hear more." level={2} id="degustation-interest-heading" />
              <p>Submitting this form will open WhatsApp with your enquiry. Participation is subject to confirmation by Lagnaa.</p>
            </div>
            <form className="degustation-form" noValidate onSubmit={submitInterest}>
              <div className="degustation-form__field">
                <label htmlFor="degustation-name">Full name <span aria-hidden="true">*</span></label>
                <input id="degustation-name" name="name" value={form.name} onChange={(event) => updateField('name', event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'degustation-name-error' : undefined} autoComplete="name" />
                {errors.name ? <p className="degustation-form__error" id="degustation-name-error" role="alert">{errors.name}</p> : null}
              </div>
              <div className="degustation-form__field">
                <label htmlFor="degustation-guest">Partner or guest name <span className="degustation-form__optional">Optional</span></label>
                <input id="degustation-guest" name="guestName" value={form.guestName} onChange={(event) => updateField('guestName', event.target.value)} />
              </div>
              <div className="degustation-form__field">
                <label htmlFor="degustation-email">Email address <span aria-hidden="true">*</span></label>
                <input id="degustation-email" name="email" type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'degustation-email-error' : undefined} autoComplete="email" />
                {errors.email ? <p className="degustation-form__error" id="degustation-email-error" role="alert">{errors.email}</p> : null}
              </div>
              <div className="degustation-form__field">
                <label htmlFor="degustation-phone">Contact number with country code <span aria-hidden="true">*</span></label>
                <input id="degustation-phone" name="phone" type="tel" inputMode="tel" value={form.phone} onChange={(event) => updateField('phone', event.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'degustation-phone-error' : 'degustation-phone-hint'} autoComplete="tel" />
                <p className="degustation-form__hint" id="degustation-phone-hint">For example: +65 9784 4771</p>
                {errors.phone ? <p className="degustation-form__error" id="degustation-phone-error" role="alert">{errors.phone}</p> : null}
              </div>
              <div className="degustation-form__field">
                <label htmlFor="degustation-dietary">Dietary restrictions <span className="degustation-form__optional">Optional</span></label>
                <input id="degustation-dietary" name="dietary" value={form.dietary} onChange={(event) => updateField('dietary', event.target.value)} />
              </div>
              <div className="degustation-form__field degustation-form__field--wide">
                <label htmlFor="degustation-message">Message <span className="degustation-form__optional">Optional</span></label>
                <textarea id="degustation-message" name="message" rows={4} value={form.message} onChange={(event) => updateField('message', event.target.value)} />
              </div>
              <div className="degustation-form__actions">
                <Button type="submit" variant="primary">Register Your Interest <TextArrow /></Button>
                <p>Participation is subject to confirmation by Lagnaa.</p>
              </div>
              {preparedUrl ? <p className="degustation-form__prepared" role="status">Your WhatsApp enquiry is ready. If it did not open, <a href={preparedUrl} target="_blank" rel="noopener noreferrer">open it here</a>.</p> : null}
            </form>
          </Container>
        </section>

        <section className="degustation-section degustation-archive" aria-labelledby="degustation-archive-heading">
          <Container>
            <div className="degustation-archive__heading">
              <SectionHeading eyebrow="Archive" heading="From Past Tastings" level={2} id="degustation-archive-heading" />
              <p>Selected dishes from past dégustation galleries. This is an archive, not a current menu or event listing.</p>
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
