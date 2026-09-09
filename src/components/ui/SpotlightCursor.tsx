import { useEffect, useRef } from 'react'
import footprintCursor from '../../assets/brand/footprint-cursor.svg'

type FootstepStamp = {
  x: number
  y: number
  startedAt: number
}

/** A desktop-only cursor using the supplied footprint icon. */
export function SpotlightCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!canvas || !supportsHover.matches || reducedMotion.matches) return undefined

    const context = canvas.getContext('2d')
    if (!context) return undefined

    let targetX = -80
    let targetY = -80
    let currentX = targetX
    let currentY = targetY
    let isVisible = false
    let animationFrame = 0
    let iconReady = false
    let stamps: FootstepStamp[] = []

    const icon = new Image()
    icon.decoding = 'async'

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(window.innerWidth * pixelRatio)
      canvas.height = Math.round(window.innerHeight * pixelRatio)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    }

    const drawFootprint = (x: number, y: number, scale = 1, opacity = 1, rotation = -0.08) => {
      if (!iconReady) return
      const width = 29 * scale
      const height = 38 * scale
      context.save()
      context.globalAlpha = opacity
      context.translate(x + 9, y + 10)
      context.rotate(rotation)
      context.drawImage(icon, -width / 2, -height / 2, width, height)
      context.restore()
    }

    const draw = (time: number) => {
      animationFrame = 0
      context.clearRect(0, 0, window.innerWidth, window.innerHeight)

      currentX += (targetX - currentX) * 0.2
      currentY += (targetY - currentY) * 0.2

      if (isVisible) drawFootprint(currentX, currentY)

      stamps = stamps.filter((stamp) => {
        const progress = (time - stamp.startedAt) / 360
        if (progress >= 1) return false
        drawFootprint(stamp.x, stamp.y, 0.78 + progress * 0.28, 0.62 * (1 - progress), -0.14)
        return true
      })

      const stillMoving = Math.abs(targetX - currentX) > 0.3 || Math.abs(targetY - currentY) > 0.3
      if (stillMoving || stamps.length > 0) animationFrame = window.requestAnimationFrame(draw)
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

    const handlePointerDown = (event: PointerEvent) => {
      stamps.push({ x: event.clientX, y: event.clientY, startedAt: performance.now() })
      requestDraw()
    }

    const handlePointerLeave = () => {
      isVisible = false
      requestDraw()
    }

    icon.onload = () => {
      iconReady = true
      document.documentElement.classList.add('has-footprint-cursor')
      requestDraw()
    }
    icon.src = footprintCursor

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerdown', handlePointerDown, { passive: true })
    document.addEventListener('mouseleave', handlePointerLeave)
    window.addEventListener('blur', handlePointerLeave)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('mouseleave', handlePointerLeave)
      window.removeEventListener('blur', handlePointerLeave)
      document.documentElement.classList.remove('has-footprint-cursor')
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="spotlight-cursor" />
}
