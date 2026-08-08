import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { restaurantConfig } from '../../config/restaurant'
import { Container } from '../layout/Container'
import { PageMetadata } from '../seo/PageMetadata'
import { Button } from '../ui/Button'

type DiningExperience = '' | 'casual' | 'barefoot'

type ReservationFormData = {
  experience: DiningExperience
  fullName: string
  email: string
  phone: string
  preferredDate: string
  preferredTime: string
  guests: string
  occasion: string
  specialRequests: string
}

type FormField = keyof ReservationFormData
type FormErrors = Partial<Record<FormField, string>>

const initialForm: ReservationFormData = {
  experience: '',
  fullName: '',
  email: '',
  phone: '',
  preferredDate: '',
  preferredTime: '',
  guests: '',
  occasion: '',
  specialRequests: '',
}

const reservationSteps: ReadonlyArray<{ label: string, fields: readonly FormField[] }> = [
  { label: 'Experience', fields: ['experience'] },
  { label: 'Your details', fields: ['fullName', 'email', 'phone'] },
  { label: 'Visit preferences', fields: ['preferredDate', 'preferredTime', 'guests'] },
]

const diningExperiences = [
  {
    id: 'casual' as const,
    title: 'Casual Dining',
    description: 'Enjoy Lagnaa’s vibrant Indian flavours in our welcoming dining space.',
  },
  {
    id: 'barefoot' as const,
    title: 'Barefoot Dining',
    description: 'Experience Lagnaa’s signature barefoot dining concept in a relaxed and memorable setting.',
  },
] as const

function localToday() {
  const now = new Date()
  const timezoneOffset = now.getTimezoneOffset() * 60_000
  return new Date(now.getTime() - timezoneOffset).toISOString().slice(0, 10)
}

function validateReservation(form: ReservationFormData, minimumDate: string): FormErrors {
  const errors: FormErrors = {}
  if (!form.experience) errors.experience = 'Choose a dining experience.'
  if (form.fullName.trim().length < 2) errors.fullName = 'Enter your full name.'
  if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errors.email = 'Enter a valid email address.'
  if (!/^\+\d[\d\s()-]{6,}$/.test(form.phone.trim())) errors.phone = 'Enter a phone number with country code, for example +65 9784 4771.'
  if (!form.preferredDate) errors.preferredDate = 'Choose a preferred date.'
  else if (form.preferredDate < minimumDate) errors.preferredDate = 'Choose a date that is not in the past.'
  if (!form.preferredTime) errors.preferredTime = 'Choose a preferred time.'
  if (!form.guests) errors.guests = 'Choose the number of guests.'
  return errors
}

export function ReservationsPage() {
  const [form, setForm] = useState<ReservationFormData>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [currentStep, setCurrentStep] = useState(0)
  const [stepDirection, setStepDirection] = useState<1 | -1>(1)
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const today = localToday()
  const groupSize = Number(form.guests)
  const selectedExperience = diningExperiences.find((experience) => experience.id === form.experience)
  const canonicalUrl = restaurantConfig.siteUrl ? `${restaurantConfig.siteUrl.replace(/\/$/, '')}/reservations` : undefined
  const isFinalStep = currentStep === reservationSteps.length - 1

  const updateField = (field: FormField, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const focusField = (field: FormField) => {
    window.setTimeout(() => {
      formRef.current?.querySelector<HTMLElement>(`[data-reservation-field="${field}"]`)?.focus()
    }, 320)
  }

  const moveToStep = (nextStep: number) => {
    setStepDirection(nextStep >= currentStep ? 1 : -1)
    setCurrentStep(nextStep)
  }

  const validateStep = (stepIndex: number) => {
    const allErrors = validateReservation(form, today)
    const stepErrors = reservationSteps[stepIndex].fields.reduce<FormErrors>((current, field) => {
      if (allErrors[field]) current[field] = allErrors[field]
      return current
    }, {})
    setErrors(stepErrors)
    const firstInvalidField = reservationSteps[stepIndex].fields.find((field) => stepErrors[field])
    if (firstInvalidField) {
      focusField(firstInvalidField)
      return false
    }
    return true
  }

  const handleNext = () => {
    if (!validateStep(currentStep)) return
    moveToStep(currentStep + 1)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validateReservation(form, today)
    const firstInvalidField = (Object.keys(initialForm) as FormField[]).find((field) => nextErrors[field])

    if (firstInvalidField) {
      setErrors(nextErrors)
      const targetStep = reservationSteps.findIndex((step) => step.fields.includes(firstInvalidField))
      if (targetStep >= 0) moveToStep(targetStep)
      focusField(firstInvalidField)
      return
    }

    setSubmitted(true)
  }

  const editRequest = () => {
    setSubmitted(false)
    setErrors({})
    moveToStep(0)
    focusField('experience')
  }

  return (
    <main id="main-content">
      <PageMetadata
        title="Reservations | Lagnaa Barefoot Dining Singapore"
        description="Prepare a reservation request for Lagnaa Barefoot Dining in Little India, Singapore."
        canonicalUrl={canonicalUrl}
      />
      <article className="reservations-page">
        <Container>
          <header className="reservations-page__intro">
            <p className="eyebrow">Reservations</p>
            <h1>Reserve Your Lagnaa Experience</h1>
            <p>Choose your dining experience and send us your preferred date, time and party size.</p>
          </header>

          <div className="reservations-page__grid">
            <aside className="reservations-page__overview" aria-labelledby="reservation-experiences-heading">
              <p className="eyebrow">Choose your experience</p>
              <h2 id="reservation-experiences-heading">Dine your way at Lagnaa.</h2>
              <p>Tell us which experience you prefer. Your request is not a live booking, and availability will be confirmed later.</p>
              {restaurantConfig.phone ? (
                <a className="text-link" href={`tel:${restaurantConfig.phone.replace(/\s/g, '')}`}>Contact Lagnaa <span aria-hidden="true">↗</span></a>
              ) : null}
            </aside>

            <section className="reservation-form-card" aria-labelledby="reservation-form-heading">
              <h2 id="reservation-form-heading">Your request</h2>
              {submitted ? (
                <motion.div animate={{ opacity: 1, y: 0 }} className="reservation-success" initial={{ opacity: 0, y: 18 }} role="status" aria-live="polite" tabIndex={-1} transition={{ duration: 0.32 }}>
                  <p className="eyebrow">Request prepared</p>
                  <h3>Your reservation request has been prepared.</h3>
                  <p>This demo does not submit a live booking. Lagnaa will confirm availability after the reservation system is connected.</p>
                  <dl className="reservation-success__summary">
                    <div><dt>Dining experience</dt><dd>{selectedExperience?.title}</dd></div>
                    <div><dt>Preferred date</dt><dd>{form.preferredDate}</dd></div>
                    <div><dt>Preferred time</dt><dd>{form.preferredTime}</dd></div>
                    <div><dt>Number of guests</dt><dd>{form.guests}</dd></div>
                  </dl>
                  <Button onClick={editRequest} variant="outline">Edit request</Button>
                </motion.div>
              ) : (
                <>
                  <div className="reservation-progress" aria-label={`Reservation step ${currentStep + 1} of ${reservationSteps.length}`}>
                    <ol className="reservation-progress__steps">
                      {reservationSteps.map((step, index) => {
                        const isComplete = index < currentStep
                        const isCurrent = index === currentStep
                        return (
                          <li key={step.label}>
                            <button
                              aria-current={isCurrent ? 'step' : undefined}
                              aria-label={`${step.label}${isComplete ? ', completed' : isCurrent ? ', current step' : ''}`}
                              className={`reservation-progress__step${isCurrent ? ' reservation-progress__step--current' : ''}${isComplete ? ' reservation-progress__step--complete' : ''}`}
                              disabled={index > currentStep}
                              onClick={() => moveToStep(index)}
                              type="button"
                            >
                              <span>{isComplete ? <Check size={12} strokeWidth={3} /> : index + 1}</span>
                              <em>{step.label}</em>
                            </button>
                          </li>
                        )
                      })}
                    </ol>
                    <div aria-hidden="true" className="reservation-progress__track">
                      <motion.span animate={{ width: `${(currentStep / (reservationSteps.length - 1)) * 100}%` }} initial={false} transition={{ duration: 0.32, ease: 'easeOut' }} />
                    </div>
                  </div>

                  <form noValidate onSubmit={handleSubmit} ref={formRef}>
                    <AnimatePresence initial={false} mode="wait">
                      <motion.div
                        animate={{ opacity: 1, x: 0 }}
                        className="reservation-form__step"
                        exit={{ opacity: 0, x: stepDirection === 1 ? -44 : 44 }}
                        initial={{ opacity: 0, x: stepDirection === 1 ? 44 : -44 }}
                        key={reservationSteps[currentStep].label}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="reservation-form__step-heading">
                          <p className="eyebrow">Step {currentStep + 1} of {reservationSteps.length}</p>
                          <h3>{reservationSteps[currentStep].label}</h3>
                        </div>

                        {currentStep === 0 ? (
                          <fieldset className="reservation-form__fieldset">
                            <legend>Dining experience <span aria-hidden="true">*</span></legend>
                            <p className="reservation-form__hint" id="experience-hint">Choose your preferred experience. This does not show live availability.</p>
                            <div aria-describedby={`experience-hint${errors.experience ? ' experience-error' : ''}`} aria-invalid={Boolean(errors.experience)} className="reservation-experience-options" role="radiogroup">
                              {diningExperiences.map((experience, index) => (
                                <motion.label animate={{ opacity: 1, y: 0 }} className="reservation-choice" initial={{ opacity: 0, y: 14 }} key={experience.id} transition={{ delay: index * 0.07, duration: 0.26 }}>
                                  <input
                                    checked={form.experience === experience.id}
                                    data-reservation-field="experience"
                                    name="experience"
                                    onChange={() => updateField('experience', experience.id)}
                                    type="radio"
                                    value={experience.id}
                                  />
                                  <span className="reservation-choice__content">
                                    <strong>{experience.title}</strong>
                                    <span>{experience.description}</span>
                                  </span>
                                </motion.label>
                              ))}
                            </div>
                            {errors.experience ? <p className="reservation-form__error" id="experience-error">{errors.experience}</p> : null}
                          </fieldset>
                        ) : null}

                        {currentStep === 1 ? (
                          <div className="reservation-form__grid reservation-form__grid--details">
                            <div className="reservation-form__field reservation-form__field--full">
                              <label htmlFor="reservation-name">Full name <span aria-hidden="true">*</span></label>
                              <input aria-describedby={errors.fullName ? 'fullName-error' : undefined} aria-invalid={Boolean(errors.fullName)} data-reservation-field="fullName" id="reservation-name" onChange={(event) => updateField('fullName', event.target.value)} required type="text" value={form.fullName} />
                              {errors.fullName ? <p className="reservation-form__error" id="fullName-error">{errors.fullName}</p> : null}
                            </div>
                            <div className="reservation-form__field">
                              <label htmlFor="reservation-email">Email address <span aria-hidden="true">*</span></label>
                              <input aria-describedby={errors.email ? 'email-error' : undefined} aria-invalid={Boolean(errors.email)} data-reservation-field="email" id="reservation-email" inputMode="email" onChange={(event) => updateField('email', event.target.value)} required type="email" value={form.email} />
                              {errors.email ? <p className="reservation-form__error" id="email-error">{errors.email}</p> : null}
                            </div>
                            <div className="reservation-form__field">
                              <label htmlFor="reservation-phone">Phone number with country code <span aria-hidden="true">*</span></label>
                              <input aria-describedby={errors.phone ? 'phone-error' : undefined} aria-invalid={Boolean(errors.phone)} data-reservation-field="phone" id="reservation-phone" inputMode="tel" onChange={(event) => updateField('phone', event.target.value)} placeholder="+65 9784 4771" required type="tel" value={form.phone} />
                              {errors.phone ? <p className="reservation-form__error" id="phone-error">{errors.phone}</p> : null}
                            </div>
                          </div>
                        ) : null}

                        {currentStep === 2 ? (
                          <div className="reservation-form__grid">
                            <div className="reservation-form__field">
                              <label htmlFor="reservation-date">Preferred date <span aria-hidden="true">*</span></label>
                              <input aria-describedby={`date-hint${errors.preferredDate ? ' preferredDate-error' : ''}`} aria-invalid={Boolean(errors.preferredDate)} data-reservation-field="preferredDate" id="reservation-date" min={today} onChange={(event) => updateField('preferredDate', event.target.value)} required type="date" value={form.preferredDate} />
                              <p className="reservation-form__hint" id="date-hint">Choose a future date. This is a preference, not live availability.</p>
                              {errors.preferredDate ? <p className="reservation-form__error" id="preferredDate-error">{errors.preferredDate}</p> : null}
                            </div>
                            <div className="reservation-form__field">
                              <label htmlFor="reservation-time">Preferred time <span aria-hidden="true">*</span></label>
                              <input aria-describedby={`time-hint${errors.preferredTime ? ' preferredTime-error' : ''}`} aria-invalid={Boolean(errors.preferredTime)} data-reservation-field="preferredTime" id="reservation-time" onChange={(event) => updateField('preferredTime', event.target.value)} required type="time" value={form.preferredTime} />
                              <p className="reservation-form__hint" id="time-hint">Choose a preferred time; it does not indicate availability.</p>
                              {errors.preferredTime ? <p className="reservation-form__error" id="preferredTime-error">{errors.preferredTime}</p> : null}
                            </div>
                            <div className="reservation-form__field">
                              <label htmlFor="reservation-guests">Number of guests <span aria-hidden="true">*</span></label>
                              <select aria-describedby={errors.guests ? 'guests-error' : undefined} aria-invalid={Boolean(errors.guests)} data-reservation-field="guests" id="reservation-guests" onChange={(event) => updateField('guests', event.target.value)} required value={form.guests}>
                                <option value="">Select guests</option>
                                {Array.from({ length: 12 }, (_, index) => index + 1).map((guestCount) => <option key={guestCount} value={guestCount}>{guestCount}</option>)}
                              </select>
                              {errors.guests ? <p className="reservation-form__error" id="guests-error">{errors.guests}</p> : null}
                            </div>
                            <div className="reservation-form__field">
                              <label htmlFor="reservation-occasion">Occasion <span className="reservation-form__optional">Optional</span></label>
                              <input data-reservation-field="occasion" id="reservation-occasion" onChange={(event) => updateField('occasion', event.target.value)} type="text" value={form.occasion} />
                            </div>
                            <div className="reservation-form__field reservation-form__field--full">
                              <label htmlFor="reservation-requests">Special requests <span className="reservation-form__optional">Optional</span></label>
                              <textarea data-reservation-field="specialRequests" id="reservation-requests" onChange={(event) => updateField('specialRequests', event.target.value)} rows={4} value={form.specialRequests} />
                            </div>
                            {groupSize >= 9 ? <p className="reservation-form__group-notice reservation-form__field--full">For groups of 9 or more, please contact Lagnaa directly for assistance.</p> : null}
                            <p className="reservation-form__preview-notice reservation-form__field--full">Website preview: online reservation submission is not yet connected.</p>
                          </div>
                        ) : null}
                      </motion.div>
                    </AnimatePresence>

                    <div className="reservation-form__actions">
                      {currentStep > 0 ? <Button leadingIcon={<ArrowLeft size={15} />} onClick={() => moveToStep(currentStep - 1)} type="button" variant="outline">Previous</Button> : <span />}
                      {isFinalStep ? <Button trailingIcon={<Check size={15} />} type="submit" variant="primary">Request a Reservation</Button> : <Button onClick={handleNext} trailingIcon={<ArrowRight size={15} />} type="button" variant="primary">Continue</Button>}
                    </div>
                  </form>
                </>
              )}
            </section>
          </div>
        </Container>
      </article>
    </main>
  )
}
