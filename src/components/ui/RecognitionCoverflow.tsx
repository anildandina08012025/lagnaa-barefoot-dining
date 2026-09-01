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

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 720px)')
    const updateViewport = () => setIsMobile(mediaQuery.matches)
    updateViewport()
    mediaQuery.addEventListener('change', updateViewport)
    return () => mediaQuery.removeEventListener('change', updateViewport)
  }, [])

  return isMobile
}

export function RecognitionCoverflow({ items }: RecognitionCoverflowProps) {
  const [rotation, setRotation] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isManualMove, setIsManualMove] = useState(false)
  const [mobileIndex, setMobileIndex] = useState(0)
  const galleryRef = useRef<HTMLElement | null>(null)
  const scrollTimeoutRef = useRef<number | undefined>(undefined)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const manualMoveTimeoutRef = useRef<number | undefined>(undefined)
  const dragStartRef = useRef<{ x: number; rotation: number } | null>(null)
  const didDragRef = useRef(false)
  const prefersReducedMotion = usePrefersReducedMotion()
  const isMobile = useIsMobile()

  useEffect(() => () => {
    if (manualMoveTimeoutRef.current !== undefined) window.clearTimeout(manualMoveTimeoutRef.current)
  }, [])

  useEffect(() => {
    const element = galleryRef.current
    if (!element || prefersReducedMotion) return

    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { threshold: 0.3 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion) return

    const handleScroll = () => {
      setIsScrolling(true)
      if (scrollTimeoutRef.current !== undefined) window.clearTimeout(scrollTimeoutRef.current)

      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      setRotation((scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0) * 360)
      scrollTimeoutRef.current = window.setTimeout(() => setIsScrolling(false), 160)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current !== undefined) window.clearTimeout(scrollTimeoutRef.current)
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion) return

    const rotate = () => {
      if (isInView && !isScrolling && !isPaused && !isManualMove) setRotation((currentRotation) => currentRotation + 0.018)
      animationFrameRef.current = window.requestAnimationFrame(rotate)
    }

    animationFrameRef.current = window.requestAnimationFrame(rotate)
    return () => {
      if (animationFrameRef.current !== undefined) window.cancelAnimationFrame(animationFrameRef.current)
    }
  }, [isInView, isManualMove, isPaused, isScrolling, prefersReducedMotion])

  if (items.length === 0) return null

  if (prefersReducedMotion) {
    return (
      <div className="recognition-coverflow recognition-coverflow--reduced" role="list" aria-label="Featured recognition and press">
        {items.map((item) => <RecognitionCard item={item} key={item.id} />)}
      </div>
    )
  }

  if (isMobile) {
    const activeItem = items[mobileIndex]
    const moveMobileBy = (direction: number) => {
      setMobileIndex((currentIndex) => (currentIndex + direction + items.length) % items.length)
    }

    return (
      <section className="recognition-coverflow recognition-coverflow--mobile" role="region" aria-label="Featured recognition and press">
        <p className="sr-only" aria-live="polite">Recognition {mobileIndex + 1} of {items.length}: {activeItem.name}</p>
        <div className="recognition-coverflow--mobile__stage">
          <RecognitionCard item={activeItem} />
        </div>
        <div className="recognition-circular-gallery__controls" aria-label="Gallery controls">
          <button type="button" onClick={() => moveMobileBy(-1)} aria-label="Show previous recognition">← Previous</button>
          <button type="button" onClick={() => moveMobileBy(1)} aria-label="Show next recognition">Next →</button>
        </div>
      </section>
    )
  }

  const anglePerItem = 360 / items.length
  const moveBy = (direction: number) => {
    setIsPaused(true)
    setIsManualMove(true)
    if (manualMoveTimeoutRef.current !== undefined) window.clearTimeout(manualMoveTimeoutRef.current)
    setRotation((currentRotation) => {
      const currentFrontIndex = ((Math.round(-currentRotation / anglePerItem) % items.length) + items.length) % items.length
      const nextIndex = (currentFrontIndex + direction + items.length) % items.length
      const targetBaseRotation = -nextIndex * anglePerItem
      return targetBaseRotation + 360 * Math.round((currentRotation - targetBaseRotation) / 360)
    })
    manualMoveTimeoutRef.current = window.setTimeout(() => setIsManualMove(false), 520)
  }
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
    dragStartRef.current = { x: event.clientX, rotation }
    didDragRef.current = false
    setIsPaused(true)
    event.currentTarget.setPointerCapture(event.pointerId)
  }
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current) return
    const distance = event.clientX - dragStartRef.current.x
    if (Math.abs(distance) > 5) didDragRef.current = true
    setRotation(dragStartRef.current.rotation + distance * 0.3)
  }
  const finishDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current) return
    dragStartRef.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
    setIsPaused(false)
  }

  return (
    <section
      ref={galleryRef}
      className="recognition-coverflow recognition-circular-gallery"
      role="region"
      aria-label="Featured recognition and press"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerEnter={() => setIsPaused(true)}
      onPointerLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false)
      }}
    >
      <p className="sr-only">A rotating circular gallery of featured recognition and press. Scroll the page to rotate it, or focus a card to pause the movement.</p>
      <div
        className="recognition-circular-gallery__stage"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onClickCapture={(event) => {
          if (!didDragRef.current) return
          event.preventDefault()
          didDragRef.current = false
        }}
      >
        <div className={`recognition-circular-gallery__ring${isManualMove ? ' recognition-circular-gallery__ring--manual' : ''}`} style={{ transform: `rotateY(${rotation}deg)` }}>
          {items.map((item, index) => {
            const itemAngle = index * anglePerItem
            const relativeAngle = (itemAngle + (rotation % 360) + 360) % 360
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle)
            const opacity = Math.max(0.28, 1 - normalizedAngle / 210)

            return (
              <div
                className="recognition-circular-gallery__item"
                key={item.id}
                style={{
                  transform: `translate(-50%, -50%) rotateY(${itemAngle}deg) translateZ(var(--recognition-gallery-radius))`,
                  opacity,
                }}
              >
                <RecognitionCard item={item} />
              </div>
            )
          })}
        </div>
      </div>
      <div className="recognition-circular-gallery__controls" aria-label="Gallery controls">
        <button type="button" onClick={() => moveBy(-1)} aria-label="Show previous recognition">← Previous</button>
        <span>Drag or swipe to explore</span>
        <button type="button" onClick={() => moveBy(1)} aria-label="Show next recognition">Next →</button>
      </div>
    </section>
  )
}

function RecognitionCard({ item }: { item: RecognitionItem }) {
  return (
    <a
      className="recognition-coverflow__card"
      data-publication={item.id}
      href={item.destinationUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={item.accessibleLabel}
    >
      {item.logoSrc ? (
        <span className="recognition-coverflow__logo-wrap">
          <img className="recognition-coverflow__logo" src={item.logoSrc} alt={item.logoAlt ?? item.name} />
        </span>
      ) : <span className="recognition-coverflow__wordmark">{item.name}</span>}
      <span className="recognition-coverflow__mark" aria-hidden="true">↗</span>
    </a>
  )
}
