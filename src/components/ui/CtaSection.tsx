import type { CSSProperties } from 'react'
import { Button, type ButtonVariant } from './Button'
import { Container } from '../layout/Container'

type CtaAction = {
  label: string
  href: string | null
  variant?: ButtonVariant
}

type CtaSectionProps = {
  eyebrow?: string
  heading: string
  description?: string
  primaryAction?: CtaAction
  secondaryAction?: CtaAction
  tone?: 'light' | 'dark'
  backgroundImage?: string
  scrollScene?: boolean
}

export function CtaSection({
  eyebrow,
  heading,
  description,
  primaryAction,
  secondaryAction,
  tone = 'dark',
  backgroundImage,
  scrollScene = false,
}: CtaSectionProps) {
  const style = backgroundImage
    ? ({ '--cta-background-image': `url("${backgroundImage}")` } as CSSProperties)
    : undefined

  return (
    <section className={`cta-section cta-section--${tone}`} data-home-scroll-scene={scrollScene ? '' : undefined} style={style}>
      <Container narrow>
        <div className="cta-section__content">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h2 className="heading heading--cta">{heading}</h2>
          {description ? <p className="cta-section__description">{description}</p> : null}
          {primaryAction || secondaryAction ? (
            <div className="cta-section__actions">
              {primaryAction ? (
                <Button href={primaryAction.href} disabled={!primaryAction.href} variant={primaryAction.variant ?? 'primary'}>
                  {primaryAction.label}
                </Button>
              ) : null}
              {secondaryAction ? (
                <Button href={secondaryAction.href} disabled={!secondaryAction.href} variant={secondaryAction.variant ?? 'outline'}>
                  {secondaryAction.label}
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
