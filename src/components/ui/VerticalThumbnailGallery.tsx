import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react'
import type { GalleryGroup, GalleryImage } from '../../content/gallery'

type VerticalThumbnailGalleryProps = {
  images: readonly GalleryImage[]
  groups?: readonly GalleryGroup[]
}

export function VerticalThumbnailGallery({ images, groups = [] }: VerticalThumbnailGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const returnFocusRef = useRef<HTMLButtonElement | null>(null)
  const activeImage = images[activeIndex]
  const expandedImage = expandedIndex === null ? null : images[expandedIndex]
  const expandedPosition = expandedIndex ?? 0
  const imageIndexById = new Map(images.map((image, index) => [image.id, index]))

  const selectImage = (index: number) => setActiveIndex(Math.max(0, Math.min(index, images.length - 1)))
  const selectExpandedImage = (index: number) => {
    const nextIndex = (index + images.length) % images.length
    setActiveIndex(nextIndex)
    setExpandedIndex(nextIndex)
  }

  const openExpandedImage = (index: number, trigger: HTMLButtonElement) => {
    returnFocusRef.current = trigger
    setActiveIndex(index)
    setExpandedIndex(index)
  }

  const closeExpandedImage = () => {
    setExpandedIndex(null)
    window.requestAnimationFrame(() => returnFocusRef.current?.focus())
  }

  useEffect(() => {
    if (expandedIndex === null) return

    closeButtonRef.current?.focus()

    const handleDocumentKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeExpandedImage()
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        selectExpandedImage(expandedIndex + 1)
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        selectExpandedImage(expandedIndex - 1)
      }
    }

    document.addEventListener('keydown', handleDocumentKeyDown)
    return () => document.removeEventListener('keydown', handleDocumentKeyDown)
  }, [expandedIndex])

  const handleThumbnailKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? images.length - 1 : event.key === 'ArrowDown' || event.key === 'ArrowRight' ? (index + 1) % images.length : (index - 1 + images.length) % images.length
    selectImage(nextIndex)
    document.getElementById(`gallery-thumbnail-${nextIndex}`)?.focus()
  }

  if (!activeImage) return null

  return (
    <section className="vertical-thumbnail-gallery" aria-label="Lagnaa photograph gallery">
      <div aria-labelledby={`gallery-thumbnail-${activeIndex}`} className="vertical-thumbnail-gallery__stage" id="gallery-active-image" role="tabpanel">
        <button
          aria-label={`Open photograph ${activeIndex + 1} of ${images.length}`}
          className="vertical-thumbnail-gallery__stage-button"
          onClick={(event: MouseEvent<HTMLButtonElement>) => openExpandedImage(activeIndex, event.currentTarget)}
          type="button"
        >
          <img
            alt={activeImage.alt}
            height={activeImage.height}
            key={activeImage.id}
            loading="eager"
            src={activeImage.image}
            width={activeImage.width}
          />
          <span className="vertical-thumbnail-gallery__open-label">
            <Expand aria-hidden="true" size={16} />
            Open image
          </span>
        </button>
        <p className="vertical-thumbnail-gallery__count" aria-live="polite">{String(activeIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</p>
      </div>

      <div className="vertical-thumbnail-gallery__rail">
        <button aria-label="Show previous photograph" className="vertical-thumbnail-gallery__control" disabled={activeIndex === 0} onClick={() => selectImage(activeIndex - 1)} type="button">
          <ChevronLeft aria-hidden="true" size={18} />
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
          <ChevronRight aria-hidden="true" size={18} />
        </button>
      </div>

      {groups.length > 0 ? (
        <div className="gallery-editorial-groups" aria-label="Gallery image groups">
          {groups.map((group) => {
            const groupImages = group.imageIds.flatMap((imageId) => {
              const index = imageIndexById.get(imageId)
              return index === undefined ? [] : [{ image: images[index], index }]
            })

            if (groupImages.length === 0) return null

            return (
              <section className="gallery-editorial-group" key={group.heading} aria-labelledby={`gallery-group-${group.heading.toLowerCase().replaceAll(' ', '-')}`}>
                <div className="gallery-editorial-group__copy">
                  <p className="eyebrow">Gallery selection</p>
                  <h3 id={`gallery-group-${group.heading.toLowerCase().replaceAll(' ', '-')}`}>{group.heading}</h3>
                  <p>{group.description}</p>
                </div>
                <div className="gallery-editorial-group__grid">
                  {groupImages.map(({ image, index }) => (
                    <button
                      aria-label={`Open ${image.alt}`}
                      className="gallery-editorial-photo"
                      key={image.id}
                      onClick={(event: MouseEvent<HTMLButtonElement>) => openExpandedImage(index, event.currentTarget)}
                      type="button"
                    >
                      <img alt={image.alt} height={image.height} loading="lazy" src={image.image} width={image.width} />
                    </button>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      ) : null}

      {expandedImage ? (
        <div
          aria-label={`Expanded gallery photograph ${expandedPosition + 1} of ${images.length}`}
          aria-modal="true"
          className="gallery-lightbox"
          role="dialog"
        >
          <button aria-label="Close expanded image" className="gallery-lightbox__close" onClick={closeExpandedImage} ref={closeButtonRef} type="button">
            <X aria-hidden="true" size={22} />
          </button>
          <button aria-label="Show previous expanded photograph" className="gallery-lightbox__nav gallery-lightbox__nav--previous" onClick={() => selectExpandedImage(expandedPosition - 1)} type="button">
            <ChevronLeft aria-hidden="true" size={24} />
          </button>
          <figure className="gallery-lightbox__figure">
            <img alt={expandedImage.alt} height={expandedImage.height} src={expandedImage.image} width={expandedImage.width} />
            <figcaption>
              {String(expandedPosition + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </figcaption>
          </figure>
          <button aria-label="Show next expanded photograph" className="gallery-lightbox__nav gallery-lightbox__nav--next" onClick={() => selectExpandedImage(expandedPosition + 1)} type="button">
            <ChevronRight aria-hidden="true" size={24} />
          </button>
        </div>
      ) : null}
    </section>
  )
}
