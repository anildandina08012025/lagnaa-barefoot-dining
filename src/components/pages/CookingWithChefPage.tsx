import { useState, type FormEvent } from 'react'
import malaiTikkaImage from '../../assets/gallery/lagnaa-malai-tikka.jpg'
import chefHeroImage from '../../assets/cooking/chef-kaesavan.webp'
import chefPortraitImage from '../../assets/cooking/chef-kaesavan-portrait.webp'
import chefCookingImage from '../../assets/cooking/chef-kaesavan-cooking.webp'
import shortStackImage from '../../assets/cooking/cooking-class-short-stack.webp'
import ezIndianFoodImage from '../../assets/cooking/cooking-class-ez-indian-food.webp'
import masterclassImage from '../../assets/cooking/cooking-class-masterclass.webp'
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

const classFormats = [
  {
    number: '01',
    eyebrow: 'For little humans',
    title: '“Short Stack” Naan Workshop',
    price: 'Free',
    image: shortStackImage,
    imageAlt: 'A child taking part in a cooking activity with Chef Kaesavan.',
    details: [
      'Eligibility: Your child must be shorter than Master Chef K7’s shoulder, but taller than his waist.',
      'Perk: Enjoy their culinary flair.',
      'Timing: Held during quiet hours.',
    ],
  },
  {
    number: '02',
    eyebrow: 'EZ Indian Food',
    title: 'Hands-on Indian cooking',
    price: 'S$91 per head · 1 hour · minimum 4 pax',
    image: ezIndianFoodImage,
    imageAlt: 'Chef Kaesavan leading a hands-on Indian cooking lesson.',
    details: [
      'Level: “I can barely boil water.”',
      'The deal: Simple, hands-on and impossible to mess up.',
      'The goal: Stop ordering takeout every Tuesday.',
    ],
  },
  {
    number: '03',
    eyebrow: '“I Want to Be a Pro”',
    title: 'Masterclass',
    price: 'S$750 per head · minimum 2 people · 4 hours',
    image: masterclassImage,
    imageAlt: 'A chef-led Indian cooking masterclass at Lagnaa.',
    details: [
      'The deep dive: One meat, one vegetable, rice and naan from scratch.',
      'The result: You’ll leave cooking like a pro—or at least looking like one.',
    ],
  },
] as const

const cookingSocialCards = [
  {
    id: 'cooking-instagram-class',
    eyebrow: 'Instagram',
    title: 'Cooking with Chef moment I',
    description: 'Watch this Cooking with Chef video from Lagnaa on Instagram.',
    href: 'https://www.instagram.com/p/CsJGaYPMZcg/?hl=en',
    image: chefCookingImage,
    alt: 'Master Chef Kaesavan leading a cooking session at Lagnaa.',
  },
  {
    id: 'cooking-instagram-dishes',
    eyebrow: 'Instagram',
    title: 'Cooking with Chef moment II',
    description: 'Watch this Cooking with Chef video from Lagnaa on Instagram.',
    href: 'https://www.instagram.com/p/CONLzrCnyPo/?hl=en',
    image: malaiTikkaImage,
    alt: 'Malai Tikka on a plate.',
  },
  {
    id: 'cooking-instagram-chef',
    eyebrow: 'Instagram',
    title: 'Chef-led experience',
    description: 'See official social updates from Lagnaa before registering interest.',
    href: 'https://www.instagram.com/lagnaabarefootdining/',
    image: chefPortraitImage,
    alt: 'A cooking class moment at Lagnaa.',
  },
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
        title="Cooking with Chef Kaesavan | Indian Cooking Class Singapore"
        description="Register interest in Cooking with Chef Kaesavan at Lagnaa, an Indian cooking-class experience in Singapore."
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
              <img src={chefHeroImage} alt="Master Chef Kaesavan leading a cooking session at Lagnaa." />
            </figure>
          </Container>
        </section>

        <section className="cooking-section cooking-class-formats" aria-labelledby="cooking-class-formats-heading">
          <Container>
            <div className="cooking-class-formats__heading">
              <SectionHeading eyebrow="Cooking class" heading="Join Master Chef K7." level={2} id="cooking-class-formats-heading" />
              <p>Choose the cooking experience that best suits your group, confidence and appetite to learn.</p>
            </div>
            <div className="cooking-class-formats__grid">
              {classFormats.map((format) => (
                <article className="cooking-class-card" key={format.number}>
                  <img className="cooking-class-card__image" src={format.image} alt={format.imageAlt} loading="lazy" />
                  <p className="cooking-class-card__number">{format.number}</p>
                  <p className="eyebrow">{format.eyebrow}</p>
                  <h3>{format.title}</h3>
                  <p className="cooking-class-card__price">{format.price}</p>
                  <ul>
                    {format.details.map((detail) => <li key={detail}>{detail}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="cooking-section experience-social" aria-labelledby="cooking-social-heading">
          <Container>
            <div className="experience-social__header">
              <SectionHeading
                eyebrow="Social moments"
                heading="Cooking with Chef Kaesavan on Instagram."
                level={2}
                id="cooking-social-heading"
              />
              <p>
                Watch official Lagnaa posts and Reels on Instagram. Videos open on social media, not inside this website.
              </p>
            </div>
            <div className="experience-social__scroller" aria-label="Official Instagram links for Lagnaa cooking-class moments">
              {cookingSocialCards.map((card) => (
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

        <section className="cooking-section cooking-interest" id="cooking-interest" aria-labelledby="cooking-interest-heading">
          <Container className="cooking-interest__grid">
            <div className="cooking-interest__introduction">
              <SectionHeading eyebrow="Register your interest" heading="Tell Lagnaa what you would love to learn." level={2} id="cooking-interest-heading" />
              <p>The team will receive your enquiry through WhatsApp after you choose to submit the form.</p>
              <p>For more context, view the <a href="/indian-cooking-class-singapore">Indian cooking class in Singapore</a> guide.</p>
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
