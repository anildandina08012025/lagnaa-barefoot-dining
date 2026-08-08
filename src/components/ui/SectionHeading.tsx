import type { ElementType } from 'react'

type SectionHeadingProps = {
  eyebrow?: string
  heading: string
  description?: string
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  level?: 1 | 2 | 3 | 4
  id?: string
}

export function SectionHeading({
  eyebrow,
  heading,
  description,
  align = 'left',
  tone = 'light',
  level = 2,
  id,
}: SectionHeadingProps) {
  const Heading = `h${level}` as ElementType

  return (
    <div className={`section-heading section-heading--${align} section-heading--${tone}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <Heading className="heading heading--section" id={id}>{heading}</Heading>
      {description ? <p className="section-heading__description">{description}</p> : null}
    </div>
  )
}
