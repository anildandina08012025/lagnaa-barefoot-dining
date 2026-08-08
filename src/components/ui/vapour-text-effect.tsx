import { createElement, useEffect, useRef, useState } from 'react'

export enum Tag {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  P = 'p',
}

type VaporizeTextCycleProps = {
  texts: readonly string[]
  accessibleText: string
  id?: string
  className?: string
  font?: {
    fontFamily?: string
    fontSize?: number
    fontWeight?: number
  }
  color?: string
  vaporizeDuration?: number
  waitDuration?: number
  tag?: Tag
}

type Particle = {
  x: number
  y: number
  alpha: number
  driftX: number
  driftY: number
  speed: number
}

const DEFAULT_FONT = {
  fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
  fontSize: 64,
  fontWeight: 700,
}

function drawText(ctx: CanvasRenderingContext2D, text: string, width: number, height: number, font: Required<NonNullable<VaporizeTextCycleProps['font']>>, color: string) {
  const padding = 2
  ctx.font = `${font.fontWeight} ${font.fontSize}px ${font.fontFamily}`
  const measuredWidth = ctx.measureText(text).width
  const size = measuredWidth > width - padding * 2 ? font.fontSize * ((width - padding * 2) / measuredWidth) : font.fontSize

  ctx.font = `${font.fontWeight} ${size}px ${font.fontFamily}`
  ctx.fillStyle = color
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, padding, height / 2)
}

function createParticles(text: string, width: number, height: number, dpr: number, font: Required<NonNullable<VaporizeTextCycleProps['font']>>, color: string) {
  const sampleCanvas = document.createElement('canvas')
  sampleCanvas.width = Math.ceil(width * dpr)
  sampleCanvas.height = Math.ceil(height * dpr)
  const sampleContext = sampleCanvas.getContext('2d', { willReadFrequently: true })

  if (!sampleContext) {
    return []
  }

  sampleContext.scale(dpr, dpr)
  drawText(sampleContext, text, width, height, font, color)
  const pixels = sampleContext.getImageData(0, 0, sampleCanvas.width, sampleCanvas.height).data
  const particles: Particle[] = []
  const step = dpr > 1 ? 3 : 2

  for (let y = 0; y < sampleCanvas.height; y += step) {
    for (let x = 0; x < sampleCanvas.width; x += step) {
      const alpha = pixels[(y * sampleCanvas.width + x) * 4 + 3]
      if (alpha > 80) {
        particles.push({
          x: x / dpr,
          y: y / dpr,
          alpha: alpha / 255,
          driftX: (Math.random() - 0.5) * 0.9,
          driftY: -0.3 - Math.random() * 0.8,
          speed: 0.35 + Math.random() * 0.65,
        })
      }
    }
  }

  return particles
}

export default function VaporizeTextCycle({
  texts,
  accessibleText,
  id,
  className,
  font,
  color = 'rgb(249, 241, 229)',
  vaporizeDuration = 1300,
  waitDuration = 5000,
  tag = Tag.H1,
}: VaporizeTextCycleProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeTextIndex, setActiveTextIndex] = useState(0)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const resolvedFont = { ...DEFAULT_FONT, ...font }
  const currentText = texts[activeTextIndex] ?? accessibleText

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return undefined

    const resizeObserver = new ResizeObserver(([entry]) => {
      setSize({ width: entry.contentRect.width, height: entry.contentRect.height })
    })

    resizeObserver.observe(wrapper)
    return () => resizeObserver.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !size.width || !size.height) return undefined

    const context = canvas.getContext('2d')
    if (!context) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.ceil(size.width * dpr)
    canvas.height = Math.ceil(size.height * dpr)
    canvas.style.width = `${size.width}px`
    canvas.style.height = `${size.height}px`

    const particles = createParticles(currentText, size.width, size.height, dpr, resolvedFont, color)
    let animationFrame = 0
    let startedAt = performance.now()
    let hasAdvanced = false
    let advanceTimer: number | undefined

    const renderStaticText = () => {
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.clearRect(0, 0, size.width, size.height)
      drawText(context, currentText, size.width, size.height, resolvedFont, color)
    }

    if (reduceMotion) {
      renderStaticText()
      return undefined
    }

    const render = (now: number) => {
      const elapsed = now - startedAt
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.clearRect(0, 0, size.width, size.height)

      if (elapsed < waitDuration) {
        drawText(context, currentText, size.width, size.height, resolvedFont, color)
      } else {
        const progress = Math.min((elapsed - waitDuration) / vaporizeDuration, 1)
        const wave = size.width * progress
        context.fillStyle = color

        for (const particle of particles) {
          const isVaporizing = particle.x <= wave
          const particleProgress = isVaporizing ? Math.min((wave - particle.x) / Math.max(size.width * 0.3, 1), 1) : 0
          const alpha = particle.alpha * (1 - particleProgress)

          if (alpha <= 0.02) continue

          context.globalAlpha = alpha
          context.fillRect(
            particle.x + particle.driftX * particleProgress * 28 * particle.speed,
            particle.y + particle.driftY * particleProgress * 34 * particle.speed,
            1.2,
            1.2,
          )
        }

        context.globalAlpha = 1

        if (progress === 1 && !hasAdvanced) {
          hasAdvanced = true
          advanceTimer = window.setTimeout(() => {
            setActiveTextIndex((index) => (index + 1) % texts.length)
          }, 120)
          return
        }
      }

      animationFrame = window.requestAnimationFrame(render)
    }

    animationFrame = window.requestAnimationFrame(render)
    return () => {
      window.cancelAnimationFrame(animationFrame)
      if (advanceTimer) window.clearTimeout(advanceTimer)
    }
  }, [color, currentText, resolvedFont.fontFamily, resolvedFont.fontSize, resolvedFont.fontWeight, size.height, size.width, texts.length, vaporizeDuration, waitDuration])

  return (
    <div className={className} ref={wrapperRef}>
      <canvas aria-hidden="true" ref={canvasRef} />
      {createElement(tag, { className: 'sr-only', id }, accessibleText)}
    </div>
  )
}
