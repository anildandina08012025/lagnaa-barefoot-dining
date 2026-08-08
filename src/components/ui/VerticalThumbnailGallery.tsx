import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState, type KeyboardEvent } from 'react'
import type { GalleryImage } from '../../content/gallery'

type VerticalThumbnailGalleryProps = {
  images: readonly GalleryImage[]
}

export function VerticalThumbnailGallery({ images }: VerticalThumbnailGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeImage = images[activeIndex]

  if (!activeImage) return null

  const selectImage = (index: number) => setActiveIndex(Math.max(0, Math.min(index, images.length - 1)))

  const handleThumbnailKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? images.length - 1 : event.key === 'ArrowDown' || event.key === 'ArrowRight' ? (index + 1) % images.length : (index - 1 + images.length) % images.length
    selectImage(nextIndex)
    document.getElementById(`gallery-thumbnail-${nextIndex}`)?.focus()
  }

  return (
    <section className="vertical-thumbnail-gallery" aria-label="Lagnaa photograph gallery">
      <div aria-labelledby={`gallery-thumbnail-${activeIndex}`} className="vertical-thumbnail-gallery__stage" id="gallery-active-image" role="tabpanel">
        <img
          alt={activeImage.alt}
          height={activeImage.height}
          key={activeImage.id}
          loading="eager"
          src={activeImage.image}
          width={activeImage.width}
        />
        <p className="vertical-thumbnail-gallery__count" aria-live="polite">{String(activeIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</p>
      </div>

      <div className="vertical-thumbnail-gallery__rail">
        <button aria-label="Show previous photograph" className="vertical-thumbnail-gallery__control" disabled={activeIndex === 0} onClick={() => selectImage(activeIndex - 1)} type="button">
          <ChevronUp aria-hidden="true" size={18} />
        </button>
        <div aria-label="Choose a photograph" className="vertical-thumbnail-gallery__thumbnails" role="tablist">
          {images.map((image, index) => (
            <button
              aria-controls="gallery-active-image"
              aria-label={`Show photograph ${index + 1} of ${images.length}`}
              aria-selected={activeIndex === index}
              className="vertical-thumbnail-gallery__thumbnail"
              id={`gallery-thumbnail-${index}`}
              key={image.id}
              onClick={() => selectImage(index)}
              onKeyDown={(event) => handleThumbnailKeyDown(event, index)}
              role="tab"
              tabIndex={activeIndex === index ? 0 : -1}
              type="button"
            >
              <img alt="" height={image.height} loading="lazy" src={image.image} width={image.width} />
            </button>
          ))}
        </div>
        <button aria-label="Show next photograph" className="vertical-thumbnail-gallery__control" disabled={activeIndex === images.length - 1} onClick={() => selectImage(activeIndex + 1)} type="button">
          <ChevronDown aria-hidden="true" size={18} />
        </button>
      </div>
    </section>
  )
}
