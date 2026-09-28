import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { restaurantConfig } from '../../config/restaurant'

type ScrollFrameHeroProps = {
  eyebrow: string
  heading: string
  headingLineBreakAfter?: string
  description: string
  headingId: string
  frames?: readonly string[]
  mobileFrames?: readonly string[]
  staticDesktopImage?: string
  staticMobileImage?: string
  className?: string
  animateContent?: boolean
  animatedHeadingLines?: readonly string[]
  children?: ReactNode
  visualOnly?: boolean
  footerLocationOnly?: boolean
  hideFooter?: boolean
}

function clamp(value: number, minimum = 0, maximum = 1) {
  return Math.min(maximum, Math.max(minimum, value))
}

function usesMobileFrameSequence() {
  return typeof window !== 'undefined' && window.innerWidth <= 768
}

function PathDrawHeading({ lines }: { lines: readonly string[] }) {
  const reduceMotion = useReducedMotion()

  return (
    <svg className="hero-title-path" viewBox="0 0 1200 400" aria-hidden="true" focusable="false">
      {lines.map((line, index) => (
        <motion.text
          animate={reduceMotion ? { fillOpacity: 1, strokeDashoffset: 0 } : { fillOpacity: 1, strokeDashoffset: 0 }}
          fill="#fff3c2"
          fillOpacity={reduceMotion ? 1 : 0}
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize={index === 0 ? 130 : 148}
          fontWeight="400"
          initial={reduceMotion ? false : { fillOpacity: 0, strokeDashoffset: 1800 }}
          key={line}
          letterSpacing="-0.055em"
          stroke="#fff3c2"
          strokeDasharray="1800"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          textAnchor="start"
          transition={reduceMotion ? { duration: 0 } : {
            fillOpacity: { delay: 1.45 + index * 0.3, duration: 0.45 },
            strokeDashoffset: { delay: 0.18 + index * 0.32, duration: 1.9, ease: 'easeInOut' },
          }}
          x="8"
          y={index === 0 ? 145 : 315}
        >
          {line}
        </motion.text>
      ))}
    </svg>
  )
}

export function ScrollFrameHero({ eyebrow, heading, headingLineBreakAfter, description, headingId, frames = [], mobileFrames, staticDesktopImage, staticMobileImage, className = '', animateContent = false, animatedHeadingLines, children, visualOnly = false, footerLocationOnly = false, hideFooter = false }: ScrollFrameHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [usesCompactSequence, setUsesCompactSequence] = useState(usesMobileFrameSequence)
  const [frameIndex, setFrameIndex] = useState(0)
  const staticImage = usesCompactSequence && staticMobileImage ? staticMobileImage : staticDesktopImage
  const animationFrames = useMemo(() => (
    staticImage
      ? [staticImage]
      : usesCompactSequence && mobileFrames && mobileFrames.length > 0
      ? mobileFrames
      : usesCompactSequence
        ? frames.filter((_, index) => index % 2 === 0 || index === frames.length - 1)
        : frames
  ), [frames, mobileFrames, staticImage, usesCompactSequence])
  const totalFrames = animationFrames.length
  const initialFrame = animationFrames[0]

  useEffect(() => {
    const updateSequence = () => setUsesCompactSequence(usesMobileFrameSequence())
    updateSequence()
    window.addEventListener('resize', updateSequence)
    return () => window.removeEventListener('resize', updateSequence)
  }, [])

  useEffect(() => {
    if (!initialFrame || animationFrames.length < 2) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    let animationFrame = 0
    let requestedFrame = 0
    let displayedFrame = 0
    let isDisposed = false
    const frameCache = new Map<number, HTMLImageElement>()
    const readyFrames = new Set<number>([0])
    const preloadAhead = usesCompactSequence ? 7 : 10
    const preloadBehind = usesCompactSequence ? 2 : 3

    const findNearestReadyFrame = (targetFrame: number) => {
      if (readyFrames.has(targetFrame)) return targetFrame
      let nearestFrame = displayedFrame
      let shortestDistance = Math.abs(targetFrame - displayedFrame)
      readyFrames.forEach((readyFrame) => {
        const distance = Math.abs(targetFrame - readyFrame)
        if (distance < shortestDistance) {
          nearestFrame = readyFrame
          shortestDistance = distance
        }
      })
      return nearestFrame
    }

    const revealBestAvailableFrame = (targetFrame: number) => {
      if (isDisposed || !imageRef.current) return
      const frameIndexToReveal = findNearestReadyFrame(targetFrame)
      if (displayedFrame === frameIndexToReveal) return
      imageRef.current.src = animationFrames[frameIndexToReveal]
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
          revealBestAvailableFrame(requestedFrame)
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

    const preloadFullSequence = () => {
      const priorityFrames = new Set<number>([0, 1, animationFrames.length - 1])
      const priorityStep = usesCompactSequence ? 3 : 4
      for (let index = 0; index < animationFrames.length; index += priorityStep) priorityFrames.add(index)
      for (let index = 0; index < Math.min(animationFrames.length, usesCompactSequence ? 10 : 14); index += 1) priorityFrames.add(index)
      const preloadOrder = [...priorityFrames, ...animationFrames.map((_, index) => index).filter((index) => !priorityFrames.has(index))]
      const loadChunk = (startIndex: number) => {
        if (isDisposed) return
        const chunkSize = usesCompactSequence ? 5 : 7
        preloadOrder.slice(startIndex, startIndex + chunkSize).forEach(preloadFrame)
        if (startIndex + chunkSize < preloadOrder.length) window.setTimeout(() => loadChunk(startIndex + chunkSize), 80)
      }
      loadChunk(0)
    }

    const renderFrame = () => {
      animationFrame = 0
      const section = sectionRef.current
      const image = imageRef.current
      if (!section || !image) return
      const scrollDistance = Math.max(section.offsetHeight - window.innerHeight, 1)
      const progress = clamp(-section.getBoundingClientRect().top / scrollDistance)
      const nextFrame = Math.min(animationFrames.length - 1, Math.floor(progress * (animationFrames.length - 1)))
      requestedFrame = nextFrame
      preloadNearbyFrames(nextFrame)
      revealBestAvailableFrame(nextFrame)
    }

    const scheduleFrame = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(renderFrame)
    }

    setFrameIndex(0)
    if (imageRef.current) imageRef.current.src = initialFrame
    preloadFrame(0)
    preloadFullSequence()
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
  const progress = totalFrames > 1 ? visibleFrameIndex / (totalFrames - 1) : 0
  const headingBreakIndex = headingLineBreakAfter && heading.startsWith(headingLineBreakAfter)
    ? headingLineBreakAfter.length
    : -1
  const heroCopy = <>
    {eyebrow ? <p className="eyebrow scroll-frame-hero__eyebrow">{eyebrow}</p> : null}
    <h1 className={`scroll-frame-hero__heading${animatedHeadingLines?.length ? ' scroll-frame-hero__heading--path' : ''}`} id={headingId} aria-label={animatedHeadingLines?.length ? heading : undefined}>
      {animatedHeadingLines?.length ? <PathDrawHeading lines={animatedHeadingLines} /> : headingBreakIndex >= 0 ? <>{heading.slice(0, headingBreakIndex)}<br />{heading.slice(headingBreakIndex).trimStart()}</> : heading}
    </h1>
    {description ? <p className="scroll-frame-hero__description">{description}</p> : null}
    {children}
  </>

  return (
    <section className={`scroll-frame-hero${visualOnly ? ' scroll-frame-hero--visual-only' : ''}${staticImage ? ' scroll-frame-hero--static' : ''}${className ? ` ${className}` : ''}`} ref={sectionRef} aria-label={visualOnly ? 'Lagnaa...barefoot dining food presentation' : undefined} aria-labelledby={visualOnly ? undefined : headingId} data-frame-sequence={usesCompactSequence ? 'mobile' : 'desktop'}>
      <div className="scroll-frame-hero__stage">
        <img
          className="scroll-frame-hero__frame"
          ref={imageRef}
          src={animationFrames[visibleFrameIndex] ?? initialFrame}
          alt="A plated selection of Indian dishes at Lagnaa...barefoot dining."
          width={usesCompactSequence ? 720 : 1280}
          height={usesCompactSequence ? 1280 : 720}
          decoding="async"
          loading="eager"
          fetchPriority="high"
        />
        {!visualOnly ? (
          <>
            <div className="scroll-frame-hero__overlay" aria-hidden="true" />
            <div className="scroll-frame-hero__content">
              {animateContent ? (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="scroll-frame-hero__copy"
                  initial={{ opacity: 0, y: 28 }}
                  transition={{ delay: 0.18, duration: 0.7, ease: 'easeOut' }}
                >
                  {heroCopy}
                </motion.div>
              ) : (
                <div className="scroll-frame-hero__copy">{heroCopy}</div>
              )}
              {!hideFooter ? <div className={`scroll-frame-hero__footer${footerLocationOnly ? ' scroll-frame-hero__footer--location-only' : ''}`} aria-hidden="true">
                <span className="scroll-frame-hero__location">{restaurantConfig.location}</span>
                {!footerLocationOnly ? <>
                  <span className="scroll-frame-hero__progress">
                    <i style={{ transform: `scaleX(${progress})` }} />
                  </span>
                  <span>Scroll to explore</span>
                </> : null}
              </div> : null}
            </div>
          </>
        ) : null}
      </div>
    </section>
  )
}
