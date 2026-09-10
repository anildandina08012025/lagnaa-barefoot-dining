import { useRef, type ReactNode } from 'react'

type InfoCardProps = {
  image: string
  imageAlt: string
  eyebrow: string
  title: string
  description: string
  detail?: string
  action: ReactNode
  className?: string
  id?: string
  scrollScene?: boolean
}

/**
 * A content-first information card with a pointer-led accent border.
 * It uses the site's own imagery and palette rather than introducing stock art.
 */
export function InfoCard({ image, imageAlt, eyebrow, title, description, detail, action, className = '', id, scrollScene = false }: InfoCardProps) {
  const cardRef = useRef<HTMLElement>(null)

  const updateBorderAngle = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || !cardRef.current) return

    const bounds = cardRef.current.getBoundingClientRect()
    const x = event.clientX - bounds.left - bounds.width / 2
    const y = event.clientY - bounds.top - bounds.height / 2
    cardRef.current.style.setProperty('--info-card-rotation', `${Math.atan2(y, x)}rad`)
  }

  const resetBorderAngle = () => cardRef.current?.style.removeProperty('--info-card-rotation')

  return (
    <article
      className={`info-card ${className}`.trim()}
      data-site-scroll-scene={scrollScene ? '' : undefined}
      id={id}
      onPointerMove={updateBorderAngle}
      onPointerLeave={resetBorderAngle}
      ref={cardRef}
    >
      <img className="info-card__image" src={image} alt={imageAlt} width="1600" height="1066" loading="lazy" />
      <div className="info-card__content">
        <p className="eyebrow">{eyebrow}</p>
        <h3><span>{title}</span></h3>
        <p>{description}</p>
        {detail ? <p className="info-card__detail">{detail}</p> : null}
        <div className="info-card__action">{action}</div>
      </div>
    </article>
  )
}
