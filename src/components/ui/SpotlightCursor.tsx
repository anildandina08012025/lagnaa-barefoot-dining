import { useEffect, useRef } from 'react'

type SpotlightCursorProps = {
  radius?: number
  brightness?: number
  color?: string
  smoothing?: number
}

function hexToRgb(hex: string) {
  const value = Number.parseInt(hex.slice(1), 16)
  return `${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}`
}

/** A desktop-only, visual cursor glow. It never receives pointer events. */
export function SpotlightCursor({
  radius = 220,
  brightness = 0.14,
  color = '#e9bd78',
  smoothing = 0.14,
}: SpotlightCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!canvas || !supportsHover.matches || reducedMotion.matches) return undefined

    const context = canvas.getContext('2d')
    if (!context) return undefined

    const rgbColor = hexToRgb(color)
    let targetX = -radius
    let targetY = -radius
    let currentX = targetX
    let currentY = targetY
    let isVisible = false
    let animationFrame = 0

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(window.innerWidth * pixelRatio)
      canvas.height = Math.round(window.innerHeight * pixelRatio)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    }

    const draw = () => {
      animationFrame = 0
      context.clearRect(0, 0, window.innerWidth, window.innerHeight)

      currentX += (targetX - currentX) * smoothing
      currentY += (targetY - currentY) * smoothing

      if (isVisible) {
        const gradient = context.createRadialGradient(currentX, currentY, 0, currentX, currentY, radius)
        gradient.addColorStop(0, `rgba(${rgbColor}, ${brightness})`)
        gradient.addColorStop(0.48, `rgba(${rgbColor}, ${(brightness * 0.35).toFixed(3)})`)
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        context.fillStyle = gradient
        context.fillRect(0, 0, window.innerWidth, window.innerHeight)
      }

      const stillMoving = Math.abs(targetX - currentX) > 0.3 || Math.abs(targetY - currentY) > 0.3
      if (stillMoving) animationFrame = window.requestAnimationFrame(draw)
    }

    const requestDraw = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(draw)
    }

    const handlePointerMove = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY
      isVisible = true
      requestDraw()
    }

    const handlePointerLeave = () => {
      isVisible = false
      requestDraw()
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.addEventListener('mouseleave', handlePointerLeave)
    window.addEventListener('blur', handlePointerLeave)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('mouseleave', handlePointerLeave)
      window.removeEventListener('blur', handlePointerLeave)
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
    }
  }, [brightness, color, radius, smoothing])

  return <canvas ref={canvasRef} aria-hidden="true" className="spotlight-cursor" />
}
