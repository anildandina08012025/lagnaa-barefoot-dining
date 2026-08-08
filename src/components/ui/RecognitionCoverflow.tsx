import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import type { RecognitionItem } from '../../content/recognition'

interface RecognitionCoverflowProps {
  items: RecognitionItem[]
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)
    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)
    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  return prefersReducedMotion
}

function shortestOffset(index: number, activeIndex: number, length: number) {
  let offset = index - activeIndex
  if (offset > length / 2) offset -= length
  if (offset < -length / 2) offset += length
  return offset
}

export function RecognitionCoverflow({ items }: RecognitionCoverflowProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartX = useRef<number | null>(null)
  const hasPointerCapture = useRef(false)
  const didDrag = useRef(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  if (items.length === 0) return null

  const activeItem = items[activeIndex]
  const moveTo = (nextIndex: number) => {
    setActiveIndex((nextIndex + items.length) % items.length)
  }
  const moveBy = (offset: number) => moveTo(activeIndex + offset)

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      moveBy(-1)
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      moveBy(1)
    }
  }

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragStartX.current = event.clientX
    hasPointerCapture.current = false
    didDrag.current = false
    setIsDragging(true)
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return
    if (Math.abs(event.clientX - dragStartX.current) > 12) {
      didDrag.current = true
      if (!hasPointerCapture.current) {
        event.currentTarget.setPointerCapture(event.pointerId)
        hasPointerCapture.current = true
      }
    }
  }

  const finishDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return
    const distance = event.clientX - dragStartX.current
    if (Math.abs(distance) > 44) moveBy(distance < 0 ? 1 : -1)
    dragStartX.current = null
    setIsDragging(false)
    if (hasPointerCapture.current && event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
    hasPointerCapture.current = false
  }

  if (prefersReducedMotion) {
    return (
      <div className="recognition-coverflow recognition-coverflow--reduced" role="list" aria-label="Featured recognition and press">
        {items.map((item) => <RecognitionCard item={item} key={item.id} />)}
      </div>
    )
  }

  return (
    <section
      className="recognition-coverflow"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured recognition and press"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <p className="sr-only" aria-live="polite">Slide {activeIndex + 1} of {items.length}: {activeItem.name}</p>
      <div
        className={`recognition-coverflow__stage${isDragging ? ' recognition-coverflow__stage--dragging' : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
      >
        {items.map((item, index) => {
          const offset = shortestOffset(index, activeIndex, items.length)
          const distance = Math.abs(offset)
          const isActive = index === activeIndex
          const transform = `translateX(calc(-50% + ${offset * 42}%)) translateZ(-${distance * 175}px) rotateY(${-offset * 30}deg) scale(${Math.max(0.72, 1 - distance * 0.12)})`

          return (
            <div
              className="recognition-coverflow__slide"
              key={item.id}
              aria-hidden={!isActive}
              style={{ transform, opacity: Math.max(0.22, 1 - distance * 0.28), zIndex: items.length - distance }}
            >
              <RecognitionCard item={item} tabIndex={isActive ? 0 : -1} onClick={(event) => {
                if (!didDrag.current) return
                event.preventDefault()
                didDrag.current = false
              }} />
            </div>
          )
        })}
      </div>

      <div className="recognition-coverflow__controls" aria-label="Carousel controls">
        <button className="recognition-coverflow__control" type="button" onClick={() => moveBy(-1)} aria-label="Previous recognition">
          <span aria-hidden="true">←</span><span>Previous</span>
        </button>
        <div className="recognition-coverflow__dots" aria-label="Choose a recognition">
          {items.map((item, index) => (
            <button
              className={`recognition-coverflow__dot${index === activeIndex ? ' recognition-coverflow__dot--active' : ''}`}
              key={item.id}
              type="button"
              onClick={() => moveTo(index)}
              aria-label={`Show ${item.name}`}
              aria-current={index === activeIndex ? 'true' : undefined}
            />
          ))}
        </div>
        <button className="recognition-coverflow__control" type="button" onClick={() => moveBy(1)} aria-label="Next recognition">
          <span>Next</span><span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  )
}

interface RecognitionCardProps {
  item: RecognitionItem
  tabIndex?: number
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

function RecognitionCard({ item, tabIndex, onClick }: RecognitionCardProps) {
  return (
    <a
      className="recognition-coverflow__card"
      data-publication={item.id}
      href={item.destinationUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={item.accessibleLabel}
      tabIndex={tabIndex}
      onClick={onClick}
    >
      <span className="recognition-coverflow__wordmark">{item.name}</span>
      <span className="recognition-coverflow__mark" aria-hidden="true">↗</span>
    </a>
  )
}
