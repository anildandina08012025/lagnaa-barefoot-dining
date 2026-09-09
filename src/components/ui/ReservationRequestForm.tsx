import { type FormEvent, useState } from 'react'
import { trackEvent } from '../../lib/analytics'

type ReservationRequestFormProps = {
  source?: 'website' | 'chatbot'
  compact?: boolean
  onSuccess?: (message: string) => void
}

type ReservationFormData = {
  name: string
  phone: string
  email: string
  date: string
  time: string
  guests: string
  experience: string
  message: string
}

type ReservationErrors = Partial<Record<keyof ReservationFormData, string>>

const initialFormData: ReservationFormData = {
  name: '',
  phone: '',
  email: '',
  date: '',
  time: '',
  guests: '',
  experience: 'Regular Dining',
  message: '',
}

const experienceOptions = [
  'Barefoot Dining',
  'Regular Dining',
] as const

function validateForm(formData: ReservationFormData) {
  const errors: ReservationErrors = {}
  if (formData.name.trim().length < 2) errors.name = 'Enter your full name.'
  if (!/^\+?\d[\d\s()-]{6,}$/.test(formData.phone.trim())) errors.phone = 'Enter a phone number with country code.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) errors.email = 'Enter a valid email address.'
  if (!formData.date) errors.date = 'Enter your preferred date.'
  if (!formData.time) errors.time = 'Enter your preferred time.'
  if (!formData.guests || Number(formData.guests) < 1) errors.guests = 'Enter the number of guests.'
  return errors
}

export function ReservationRequestForm({ source = 'website', compact = false, onSuccess }: ReservationRequestFormProps) {
  const [formData, setFormData] = useState<ReservationFormData>(initialFormData)
  const [errors, setErrors] = useState<ReservationErrors>({})
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const updateField = (field: keyof ReservationFormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validateForm(formData)
    setErrors(nextErrors)
    setSubmitError('')
    setSuccessMessage('')
    if (Object.keys(nextErrors).length) return

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source, ...formData }),
      })
      let parsedResponse = true
      const payload = await response.json().catch(() => {
        parsedResponse = false
        return {}
      }) as { message?: string; error?: string; errors?: ReservationErrors }
      if (!response.ok) {
        if (payload.errors) setErrors(payload.errors)
        if (!parsedResponse && response.status === 404) {
        throw new Error('Reservation service is not available in this preview. Test on Vercel after redeploying with the reservation environment variables, or run the project with Vercel dev.')
        }
        throw new Error(payload.error || 'Unable to send the reservation request.')
      }

      const message = payload.message || 'Your reservation is confirmed and has been sent to Lagnaa.'
      trackEvent('reservation_submit', { source, experience: formData.experience })
      setSuccessMessage(message)
      setFormData(initialFormData)
      onSuccess?.(message)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to send the reservation request.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className={`reservation-request-form${compact ? ' reservation-request-form--compact' : ''}`} onSubmit={handleSubmit}>
      <div className="reservation-form__grid">
        <div className="reservation-form__field">
          <label htmlFor={`${source}-reservation-name`}>Full name</label>
          <input id={`${source}-reservation-name`} autoComplete="name" value={formData.name} onChange={(event) => updateField('name', event.target.value)} />
          {errors.name ? <p className="reservation-form__error" role="alert">{errors.name}</p> : null}
        </div>

        <div className="reservation-form__field">
          <label htmlFor={`${source}-reservation-phone`}>Contact number with country code</label>
          <input id={`${source}-reservation-phone`} autoComplete="tel" inputMode="tel" placeholder="+65 9784 4771" value={formData.phone} onChange={(event) => updateField('phone', event.target.value)} />
          {errors.phone ? <p className="reservation-form__error" role="alert">{errors.phone}</p> : null}
        </div>

        <div className="reservation-form__field">
          <label htmlFor={`${source}-reservation-email`}>Email address</label>
          <input id={`${source}-reservation-email`} autoComplete="email" inputMode="email" type="email" value={formData.email} onChange={(event) => updateField('email', event.target.value)} />
          {errors.email ? <p className="reservation-form__error" role="alert">{errors.email}</p> : null}
        </div>

        <div className="reservation-form__field">
          <label htmlFor={`${source}-reservation-guests`}>Number of guests</label>
          <input id={`${source}-reservation-guests`} inputMode="numeric" min="1" type="number" value={formData.guests} onChange={(event) => updateField('guests', event.target.value)} />
          {errors.guests ? <p className="reservation-form__error" role="alert">{errors.guests}</p> : null}
        </div>

        <div className="reservation-form__field">
          <label htmlFor={`${source}-reservation-date`}>Preferred date</label>
          <input id={`${source}-reservation-date`} type="date" value={formData.date} onChange={(event) => updateField('date', event.target.value)} />
          {errors.date ? <p className="reservation-form__error" role="alert">{errors.date}</p> : null}
        </div>

        <div className="reservation-form__field">
          <label htmlFor={`${source}-reservation-time`}>Preferred time</label>
          <input id={`${source}-reservation-time`} type="time" value={formData.time} onChange={(event) => updateField('time', event.target.value)} />
          {errors.time ? <p className="reservation-form__error" role="alert">{errors.time}</p> : null}
        </div>

        <div className="reservation-form__field reservation-form__field--full">
          <label htmlFor={`${source}-reservation-experience`}>Visit type</label>
          <select id={`${source}-reservation-experience`} value={formData.experience} onChange={(event) => updateField('experience', event.target.value)}>
            {experienceOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </div>

        <div className="reservation-form__field reservation-form__field--full">
          <label htmlFor={`${source}-reservation-message`}>Message <span className="reservation-form__optional">Optional</span></label>
          <textarea id={`${source}-reservation-message`} value={formData.message} onChange={(event) => updateField('message', event.target.value)} placeholder="Share any request for Lagnaa." />
        </div>
      </div>

      {submitError ? <p className="reservation-form__error" role="alert">{submitError}</p> : null}
      {successMessage ? <p className="reservation-form__group-notice" role="status">{successMessage}</p> : null}

      <div className="reservation-form__actions">
        <button className="button button--primary" disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Saving Reservation…' : 'Send Reservation'}
        </button>
        <span>Your reservation is confirmed instantly.</span>
      </div>
    </form>
  )
}
