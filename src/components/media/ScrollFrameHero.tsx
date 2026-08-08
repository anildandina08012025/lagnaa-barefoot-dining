import { type ReactNode, useEffect, useRef, useState } from 'react'
import { restaurantConfig } from '../../config/restaurant'

type ScrollFrameHeroProps = {
  eyebrow: string
  heading: string
  description: string
  headingId: string
  frames: readonly string[]
  children?: ReactNode
}

function clamp(value: number, minimum = 0, maximum = 1) {
  return Math.min(maximum, Math.max(minimum, value))
}

export function ScrollFrameHero({ eyebrow, heading, description, headingId, frames, children }: ScrollFrameHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [frameIndex, setFrameIndex] = useState(0)
  const totalFrames = frames.length
  const initialFrame = frames[0]

  useEffect(() => {
    if (!initialFrame || frames.length < 2) {
      return undefined
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionQuery.matches) {
      return undefined
    }

    const frameCache = frames.map((source) => {
      const frame = new Image()
      frame.decoding = 'async'
      frame.src = source
      return frame
    })
    let animationFrame = 0
    let requestedFrame = 0
    let isDisposed = false

    const revealFrame = (frameIndexToReveal: number) => {
      const frame = frameCache[frameIndexToReveal]

      const commitFrame = () => {
        if (isDisposed || requestedFrame !== frameIndexToReveal || !imageRef.current) {
          return
        }

        imageRef.current.src = frame.src
        setFrameIndex(frameIndexToReveal)
      }

      const decodeAndCommit = () => {
        void frame.decode().catch(() => undefined).then(commitFrame)
      }

      if (frame.complete && frame.naturalWidth > 0) {
        decodeAndCommit()
      } else {
        frame.addEventListener('load', decodeAndCommit, { once: true })
      }
    }

    const renderFrame = () => {
      const section = sectionRef.current
      const image = imageRef.current
      animationFrame = 0

      if (!section || !image) {
        return
      }

      const scrollDistance = Math.max(section.offsetHeight - window.innerHeight, 1)
      const progress = clamp(-section.getBoundingClientRect().top / scrollDistance)
      const nextFrame = Math.min(frames.length - 1, Math.round(progress * (frames.length - 1)))

      if (nextFrame !== requestedFrame) {
        requestedFrame = nextFrame
        revealFrame(nextFrame)
      }
    }

    const scheduleFrame = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(renderFrame)
      }
    }

    renderFrame()
    window.addEventListener('scroll', scheduleFrame, { passive: true })
    window.addEventListener('resize', scheduleFrame)

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame)
      }
      window.removeEventListener('scroll', scheduleFrame)
      window.removeEventListener('resize', scheduleFrame)
      isDisposed = true
    }
  }, [frames, initialFrame])

  if (!initialFrame) {
    return null
  }

  const formattedFrame = String(frameIndex + 1).padStart(2, '0')
  const formattedTotal = String(totalFrames).padStart(2, '0')
  const progress = totalFrames > 1 ? frameIndex / (totalFrames - 1) : 0

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
