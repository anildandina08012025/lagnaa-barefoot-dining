import type { MediaDirection } from '../../content/home'

type DevelopmentMediaProps = {
  media: MediaDirection
  className?: string
  priority?: boolean
  image?: string
  imageAlt?: string
}

/**
 * Development-only media direction block. Replace this with approved, optimized
 * Lagnaa photography or video before production.
 */
export function DevelopmentMedia({ media, className = '', priority = false, image, imageAlt = '' }: DevelopmentMediaProps) {
  if (image) {
    return (
      <div className={`development-media development-media--image development-media--${media.format} ${className}`.trim()}>
        <img alt={imageAlt} className="development-media__image" decoding="async" loading={priority ? 'eager' : 'lazy'} src={image} />
      </div>
    )
  }

  return (
    <div
      className={`development-media development-media--${media.format} development-media--${media.tone} ${className}`.trim()}
      data-development-media="true"
      data-priority={priority ? 'true' : undefined}
      aria-hidden="true"
    >
      <div className="development-media__wash" />
      <div className="development-media__arc development-media__arc--one" />
      <div className="development-media__arc development-media__arc--two" />
      <div className="development-media__caption">
        <span>Media direction</span>
        <strong>{media.subject}</strong>
        <small>{media.detail}</small>
      </div>
    </div>
  )
}
