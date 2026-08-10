import { useState, type FormEvent } from 'react'
import cookingMoment from '../../assets/lagnaa-showcase/lagnaa-cooking-moment.webp'
import { restaurantConfig } from '../../config/restaurant'
import { Container } from '../layout/Container'
import { PageMetadata } from '../seo/PageMetadata'
import { Button } from '../ui/Button'
import { CtaSection } from '../ui/CtaSection'
import { SectionHeading } from '../ui/SectionHeading'

type InterestForm = {
  name: string
  email: string
  phone: string
  dietary: string
  dish: string
}

type InterestErrors = Partial<Record<keyof InterestForm, string>>

const products = [
  'Ready Mix Sampler Pack',
  'Koorma Ready Mix',
  'Butter Chicken Ready Mix',
  'Seafood & Vegetables Ready Mix',
  'Meat Ready Mix',
] as const

const initialForm: InterestForm = { name: '', email: '', phone: '', dietary: '', dish: '' }

function TextArrow() {
  return <span aria-hidden="true">↗</span>
}

function getWhatsAppBaseUrl() {
  const number = restaurantConfig.phone?.replace(/\D/g, '')
  return number ? `https://wa.me/${number}` : null
}

function makeWhatsAppUrl(message: string) {
  const baseUrl = getWhatsAppBaseUrl()
  return baseUrl ? `${baseUrl}?text=${encodeURIComponent(message)}` : null
}

function productMessage(product: string) {
  return `Hello Lagnaa, I’d like more information about the ${product}.`
}

export function CookingWithChefPage() {
  const [form, setForm] = useState<InterestForm>(initialForm)
  const [errors, setErrors] = useState<InterestErrors>({})
  const [preparedUrl, setPreparedUrl] = useState<string | null>(null)
  const canonicalUrl = restaurantConfig.siteUrl
    ? `${restaurantConfig.siteUrl.replace(/\/$/, '')}/events/cooking-with-chef-kaesavan`
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
    if (!form.dish.trim()) nextErrors.dish = 'Tell Lagnaa which dish you would like to learn.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const message = [
      'Hello Lagnaa, I’m interested in Cooking with Chef Kaesavan.',
      '',
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      `Contact number: ${form.phone.trim()}`,
      `Dietary restrictions: ${form.dietary.trim() || 'None provided'}`,
      `Dish I would like to learn: ${form.dish.trim()}`,
    ].join('\n')
    const url = makeWhatsAppUrl(message)
    setPreparedUrl(url)
    if (url) window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <main id="main-content">
      <PageMetadata
        title="Cooking with Chef Kaesavan | Lagnaa Barefoot Dining"
        description="Register your interest in a cooking experience with Master Chef Kaesavan, and enquire about Lagnaa Ready Mixes."
        canonicalUrl={canonicalUrl}
      />
      <article className="cooking-page">
        <section className="cooking-hero" aria-labelledby="cooking-heading">
          <Container className="cooking-hero__grid">
            <div className="cooking-hero__content">
              <p className="eyebrow cooking-hero__eyebrow">Cooking Experience</p>
              <h1 className="cooking-hero__heading" id="cooking-heading">Cooking with Master Chef Kaesavan</h1>
              <p className="cooking-hero__description">Interested in learning how to prepare Indian cuisine with Chef Kaesavan? Tell us what you would like to learn and register your interest.</p>
              <a className="text-link text-link--light" href="#cooking-interest">Register your interest <TextArrow /></a>
            </div>
            <figure className="cooking-hero__image">
              <img src={cookingMoment} alt="Master Chef Kaesavan leading a cooking session at Lagnaa." />
            </figure>
          </Container>
        </section>

        <section className="cooking-section cooking-interest" id="cooking-interest" aria-labelledby="cooking-interest-heading">
          <Container className="cooking-interest__grid">
            <div className="cooking-interest__introduction">
              <SectionHeading eyebrow="Register your interest" heading="Tell Lagnaa what you would love to learn." level={2} id="cooking-interest-heading" />
              <p>The team will receive your enquiry through WhatsApp after you choose to submit the form.</p>
            </div>
            <form className="cooking-form" noValidate onSubmit={submitInterest}>
              <div className="cooking-form__field">
                <label htmlFor="cooking-name">Full name <span aria-hidden="true">*</span></label>
                <input id="cooking-name" name="name" value={form.name} onChange={(event) => updateField('name', event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'cooking-name-error' : undefined} autoComplete="name" />
                {errors.name ? <p className="cooking-form__error" id="cooking-name-error" role="alert">{errors.name}</p> : null}
              </div>
              <div className="cooking-form__field">
                <label htmlFor="cooking-email">Email address <span aria-hidden="true">*</span></label>
                <input id="cooking-email" name="email" type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'cooking-email-error' : undefined} autoComplete="email" />
                {errors.email ? <p className="cooking-form__error" id="cooking-email-error" role="alert">{errors.email}</p> : null}
              </div>
              <div className="cooking-form__field">
                <label htmlFor="cooking-phone">Contact number with country code <span aria-hidden="true">*</span></label>
                <input id="cooking-phone" name="phone" type="tel" inputMode="tel" value={form.phone} onChange={(event) => updateField('phone', event.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'cooking-phone-error' : 'cooking-phone-hint'} autoComplete="tel" />
                <p className="cooking-form__hint" id="cooking-phone-hint">For example: +65 9784 4771</p>
                {errors.phone ? <p className="cooking-form__error" id="cooking-phone-error" role="alert">{errors.phone}</p> : null}
              </div>
              <div className="cooking-form__field">
                <label htmlFor="cooking-dietary">Dietary restrictions <span className="cooking-form__optional">Optional</span></label>
                <input id="cooking-dietary" name="dietary" value={form.dietary} onChange={(event) => updateField('dietary', event.target.value)} />
              </div>
              <div className="cooking-form__field cooking-form__field--wide">
                <label htmlFor="cooking-dish">Which Indian dish have you always wanted to learn? <span aria-hidden="true">*</span></label>
                <textarea id="cooking-dish" name="dish" rows={4} value={form.dish} onChange={(event) => updateField('dish', event.target.value)} aria-invalid={Boolean(errors.dish)} aria-describedby={errors.dish ? 'cooking-dish-error' : undefined} />
                {errors.dish ? <p className="cooking-form__error" id="cooking-dish-error" role="alert">{errors.dish}</p> : null}
              </div>
              <div className="cooking-form__actions">
                <Button type="submit" variant="primary">Register Your Interest <TextArrow /></Button>
                <p>Submitting opens a WhatsApp enquiry to Lagnaa; it does not confirm a class place.</p>
              </div>
              {preparedUrl ? <p className="cooking-form__prepared" role="status">Your WhatsApp enquiry is ready. If it did not open, <a href={preparedUrl} target="_blank" rel="noopener noreferrer">open it here</a>.</p> : null}
            </form>
          </Container>
        </section>

        <section className="cooking-section cooking-products" aria-labelledby="cooking-products-heading">
          <Container>
            <div className="cooking-products__heading">
              <SectionHeading eyebrow="Cook Lagnaa Flavours at Home" heading="Instant Curry Paste & Ready Mixes" level={2} id="cooking-products-heading" />
              <p>Enquire directly with Lagnaa for current product information.</p>
            </div>
            <div className="cooking-products__grid">
              {products.map((product, index) => {
                const url = makeWhatsAppUrl(productMessage(product))
                return (
                  <article className="ready-mix-card" key={product}>
                    <div className="ready-mix-card__placeholder" aria-hidden="true"><span>0{index + 1}</span><i /></div>
                    <h3>{product}</h3>
                    {url ? <a className="text-link" href={url} target="_blank" rel="noopener noreferrer" aria-label={`Enquire on WhatsApp about ${product}`}>Enquire on WhatsApp <TextArrow /></a> : null}
                  </article>
                )
              })}
            </div>
          </Container>
        </section>

        <CtaSection
          eyebrow="Explore Lagnaa"
          heading="Discover food, flavour and experiences."
          description="Explore the current menu or return to Lagnaa’s experiences."
          primaryAction={{ label: 'View Menu', href: '/menu' }}
          secondaryAction={{ label: 'Explore Experiences', href: '/experiences', variant: 'outline' }}
        />
      </article>
    </main>
  )
}
