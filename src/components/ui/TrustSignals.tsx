import { Container } from '../layout/Container'

type TrustSignal = {
  label: string
  detail: string
  href: string
}

type TrustSignalsProps = {
  tone?: 'light' | 'dark'
  compact?: boolean
}

const trustSignals: readonly TrustSignal[] = [
  {
    label: 'MICHELIN Guide',
    detail: 'Michelin Awarded',
    href: '/awards-media',
  },
  {
    label: 'Little India',
    detail: '6 Upper Dickson Road',
    href: '/contact',
  },
  {
    label: 'Barefoot Dining',
    detail: 'A signature Lagnaa...barefoot dining experience',
    href: '/experiences/barefoot-dining',
  },
  {
    label: 'Chilli Challenge',
    detail: 'Signature spice-led experience',
    href: '/experiences/chilli-challenge',
  },
]

export function TrustSignals({ tone = 'light', compact = false }: TrustSignalsProps) {
  return (
    <section className={`trust-signals trust-signals--${tone}${compact ? ' trust-signals--compact' : ''}`} aria-labelledby="trust-signals-heading">
      <Container>
        <div className="trust-signals__header">
          <p className="eyebrow">Why Lagnaa...barefoot dining</p>
          <h2 id="trust-signals-heading">Recognised, distinctive and rooted in Little India.</h2>
        </div>
        <div className="trust-signals__grid">
          {trustSignals.map((signal) => (
            <a className="trust-signals__item" href={signal.href} key={signal.label}>
              <span aria-hidden="true">✦</span>
              <strong>{signal.label}</strong>
              <em>{signal.detail}</em>
            </a>
          ))}
        </div>
      </Container>
    </section>
  )
}
