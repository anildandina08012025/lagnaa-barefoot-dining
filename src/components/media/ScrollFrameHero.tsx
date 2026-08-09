import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { restaurantConfig } from '../../config/restaurant'

type ScrollFrameHeroProps = {
  eyebrow: string
  heading: string
  description: string
  headingId: string
  frames: readonly string[]
  mobileFrames?: readonly string[]
  children?: ReactNode
}

function clamp(value: number, minimum = 0, maximum = 1) {
  return Math.min(maximum, Math.max(minimum, value))
}

export function ScrollFrameHero({ eyebrow, heading, description, headingId, frames, mobileFrames, children }: ScrollFrameHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [usesCompactSequence, setUsesCompactSequence] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia('(max-width: 48rem)').matches
  ))
  const [frameIndex, setFrameIndex] = useState(0)
  const animationFrames = useMemo(() => (
    usesCompactSequence && mobileFrames && mobileFrames.length > 0
      ? mobileFrames
      : usesCompactSequence
        ? frames.filter((_, index) => index % 2 === 0 || index === frames.length - 1)
        : frames
  ), [frames, mobileFrames, usesCompactSequence])
  const totalFrames = animationFrames.length
  const initialFrame = animationFrames[0]

  useEffect(() => {
    const compactQuery = window.matchMedia('(max-width: 48rem)')
    const updateSequence = () => setUsesCompactSequence(compactQuery.matches)
    updateSequence()
    compactQuery.addEventListener('change', updateSequence)
    return () => compactQuery.removeEventListener('change', updateSequence)
  }, [])

  useEffect(() => {
    if (!initialFrame || animationFrames.length < 2) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    let animationFrame = 0
    let requestedFrame = 0
    let displayedFrame = 0
    let isDisposed = false
    const frameCache = new Map<number, HTMLImageElement>()
    const readyFrames = new Set<number>()
    const preloadAhead = usesCompactSequence ? 7 : 10
    const preloadBehind = usesCompactSequence ? 2 : 3

    const revealFrame = (frameIndexToReveal: number) => {
      const frame = frameCache.get(frameIndexToReveal)
      if (!frame || !readyFrames.has(frameIndexToReveal) || displayedFrame === frameIndexToReveal) return
      if (isDisposed || requestedFrame !== frameIndexToReveal || !imageRef.current) return

      imageRef.current.src = frame.src
      displayedFrame = frameIndexToReveal
      setFrameIndex(frameIndexToReveal)
    }

    const preloadFrame = (frameIndexToPreload: number) => {
      if (frameIndexToPreload < 0 || frameIndexToPreload >= animationFrames.length || frameCache.has(frameIndexToPreload)) return

      const frame = new Image()
      frame.decoding = 'async'
      frameCache.set(frameIndexToPreload, frame)

      const markReady = () => {
        void frame.decode().catch(() => undefined).then(() => {
          if (isDisposed || frame.naturalWidth === 0) return
          readyFrames.add(frameIndexToPreload)
          if (requestedFrame === frameIndexToPreload) revealFrame(frameIndexToPreload)
        })
      }

      frame.addEventListener('load', markReady, { once: true })
      frame.src = animationFrames[frameIndexToPreload]
      if (frame.complete && frame.naturalWidth > 0) markReady()
    }

    const preloadNearbyFrames = (centreFrame: number) => {
      for (let index = centreFrame; index <= centreFrame + preloadAhead; index += 1) preloadFrame(index)
      for (let index = centreFrame - 1; index >= centreFrame - preloadBehind; index -= 1) preloadFrame(index)
    }

    const renderFrame = () => {
      const section = sectionRef.current
      const image = imageRef.current
      animationFrame = 0
      if (!section || !image) return

      const scrollDistance = Math.max(section.offsetHeight - window.innerHeight, 1)
      const progress = clamp(-section.getBoundingClientRect().top / scrollDistance)
      const nextFrame = Math.min(animationFrames.length - 1, Math.floor(progress * (animationFrames.length - 1)))

      requestedFrame = nextFrame
      preloadNearbyFrames(nextFrame)
      revealFrame(nextFrame)
    }

    const scheduleFrame = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(renderFrame)
    }

    if (imageRef.current) imageRef.current.src = initialFrame
    setFrameIndex(0)
    renderFrame()
    window.addEventListener('scroll', scheduleFrame, { passive: true })
    window.addEventListener('resize', scheduleFrame)

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('scroll', scheduleFrame)
      window.removeEventListener('resize', scheduleFrame)
      isDisposed = true
    }
  }, [animationFrames, initialFrame, usesCompactSequence])

  if (!initialFrame) return null

  const visibleFrameIndex = Math.min(frameIndex, totalFrames - 1)
  const formattedFrame = String(visibleFrameIndex + 1).padStart(2, '0')
  const formattedTotal = String(totalFrames).padStart(2, '0')
  const progress = totalFrames > 1 ? visibleFrameIndex / (totalFrames - 1) : 0

  return (
    <section className="scroll-frame-hero" ref={sectionRef} aria-labelledby={headingId}>
      <div className="scroll-frame-hero__stage">
        <img
          className="scroll-frame-hero__frame"
          ref={imageRef}
          src={initialFrame}
          alt="A plated selection of Indian dishes at Lagnaa."
          width="1280"
          height="720"
          decoding="async"
          fetchPriority="high"
        />
        <div className="scroll-frame-hero__overlay" aria-hidden="true" />
        <div className="scroll-frame-hero__content">
          <div className="scroll-frame-hero__copy">
            <p className="eyebrow scroll-frame-hero__eyebrow">{eyebrow}</p>
            <h1 className="scroll-frame-hero__heading" id={headingId}>{heading}</h1>
            <p className="scroll-frame-hero__description">{description}</p>
            {children}
          </div>
          <div className="scroll-frame-hero__footer" aria-hidden="true">
            <span className="scroll-frame-hero__location">{restaurantConfig.location}</span>
            <span className="scroll-frame-hero__progress">
              <span>{formattedFrame} — {formattedTotal}</span>
              <i style={{ transform: `scaleX(${progress})` }} />
            </span>
            <span>Scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  )
}
