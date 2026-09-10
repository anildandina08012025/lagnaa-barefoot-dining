import { useEffect } from 'react'

function clamp(value: number, minimum = 0, maximum = 1) {
  return Math.min(maximum, Math.max(minimum, value))
}

function smoothstep(start: number, end: number, value: number) {
  const progress = clamp((value - start) / (end - start))
  return progress * progress * (3 - 2 * progress)
}

/**
 * Adds restrained scroll-linked motion only to explicitly marked editorial
 * cards. Heroes, galleries controls, forms and reservation UI stay independent.
 */
export function HomeScrollEffects() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) return undefined

    const footer = document.querySelector<HTMLElement>('footer.site-footer')
    footer?.setAttribute('data-home-scroll-scene', '')
    const scenes = Array.from(document.querySelectorAll<HTMLElement>('[data-home-scroll-scene], [data-site-scroll-scene]'))
    if (scenes.length === 0) return undefined

    let frameRequest = 0

    const render = () => {
      const viewportHeight = window.innerHeight

      scenes.forEach((scene) => {
        const bounds = scene.getBoundingClientRect()
        const travel = clamp((viewportHeight - bounds.top) / (viewportHeight + bounds.height))
        const reveal = smoothstep(0.02, 0.37, travel)
        const entryLift = (1 - reveal) * 124
        const contentLift = entryLift - travel * 56
        const copyLift = entryLift - travel * 76
        const mediaLift = -(1 - reveal) * 98 + travel * 58

        scene.style.setProperty('--home-scroll-opacity', (0.05 + reveal * 0.95).toFixed(3))
        scene.style.setProperty('--home-scroll-lift', `${contentLift.toFixed(2)}px`)
        scene.style.setProperty('--home-scroll-copy-lift', `${copyLift.toFixed(2)}px`)
        scene.style.setProperty('--home-scroll-media-lift', `${mediaLift.toFixed(2)}px`)
        scene.style.setProperty('--home-scroll-orbit-scale', (0.78 + reveal * 0.24 + (travel - 0.5) * 0.08).toFixed(3))
        scene.dataset.homeScrollReady = 'true'
      })

      frameRequest = 0
    }

    const requestRender = () => {
      if (frameRequest) return
      frameRequest = window.requestAnimationFrame(render)
    }

    render()
    window.addEventListener('scroll', requestRender, { passive: true })
    window.addEventListener('resize', requestRender)

    return () => {
      window.removeEventListener('scroll', requestRender)
      window.removeEventListener('resize', requestRender)
      if (frameRequest) window.cancelAnimationFrame(frameRequest)
      scenes.forEach((scene) => {
        scene.removeAttribute('data-home-scroll-ready')
        scene.style.removeProperty('--home-scroll-opacity')
        scene.style.removeProperty('--home-scroll-lift')
        scene.style.removeProperty('--home-scroll-copy-lift')
        scene.style.removeProperty('--home-scroll-media-lift')
        scene.style.removeProperty('--home-scroll-orbit-scale')
      })
      footer?.removeAttribute('data-home-scroll-scene')
    }
  }, [])

  return null
}
