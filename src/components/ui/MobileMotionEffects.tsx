import { useEffect } from 'react'

const mobileMotionSelectors = [
  '.button',
  '.event-card',
  '.experience-overview-list__item',
  '.barefoot-explore__card',
  '.development-media',
  '.gallery-grid__item',
  '.vertical-thumbnail-gallery__stage',
  '.vertical-thumbnail-gallery__thumbnail',
  '.interactive-menu__filter',
  '.interactive-menu__item',
  '.published-menu__tab',
  '.published-menu__section',
  '.published-menu__item',
  '.menu-source-card',
  '.ready-mix-card',
  '.lagnaa-moments__card',
  '.reservation-form-card',
] as const

export function MobileMotionEffects() {
  useEffect(() => {
    const mobileMotionQuery = window.matchMedia('(max-width: 47.99rem) and (prefers-reduced-motion: no-preference)')
    if (!mobileMotionQuery.matches) return

    const targets = Array.from(document.querySelectorAll<HTMLElement>(mobileMotionSelectors.join(',')))
      .filter((target) => !target.closest('.home-hero, .home-recognition, .lagnaa-showcase, .lagnaa-concierge'))

    if (!targets.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('mobile-motion--visible')
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    )

    targets.forEach((target, index) => {
      target.classList.add('mobile-motion')
      target.style.setProperty('--mobile-motion-delay', `${Math.min(index % 6, 5) * 55}ms`)
      observer.observe(target)
    })

    return () => {
      observer.disconnect()
      targets.forEach((target) => {
        target.classList.remove('mobile-motion', 'mobile-motion--visible')
        target.style.removeProperty('--mobile-motion-delay')
      })
    }
  }, [])

  return null
}
