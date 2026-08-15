import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import arusuvai from '../../assets/lagnaa-showcase/arusuvai.webp'
import barefootDining from '../../assets/lagnaa-showcase/barefoot-dining.webp'
import chilliLevelCustomisation from '../../assets/lagnaa-showcase/chilli-level-customisation.webp'

const slides = [
  { id: 'barefoot-dining', image: barefootDining, title: 'Barefoot Dining', description: 'A signature Lagnaa dining experience shaped by food, hospitality and an intimate atmosphere.', background: '#4c3b2b' },
  { id: 'chilli-level-customisation', image: chilliLevelCustomisation, title: 'Customisation of Chilli Levels', description: 'Choose the heat that matches your palate, without compromising flavour.', background: '#78222d' },
  { id: 'arusuvai', image: arusuvai, title: 'Arusuvai', description: 'The harmony of six tastes, brought together in every Lagnaa meal.', background: '#6c4a1d' },
] as const

export function LagnaaShowcaseCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    slides.forEach((slide) => {
      const image = new Image()
      image.src = slide.image
    })
  }, [])

  useEffect(() => () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current)
  }, [])

  const selectSlide = (nextIndex: number) => {
    if (isAnimating || nextIndex === activeIndex) return
    setIsAnimating(true)
    setActiveIndex((nextIndex + slides.length) % slides.length)
    timerRef.current = window.setTimeout(() => {
      setIsAnimating(false)
      timerRef.current = null
    }, 650)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      selectSlide(activeIndex - 1)
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      selectSlide(activeIndex + 1)
    }
  }

  const activeSlide = slides[activeIndex]

  return (
    <section
      className="lagnaa-showcase"
      aria-roledescription="carousel"
      aria-label="Experience Lagnaa"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      style={{ '--showcase-background': activeSlide.background } as CSSProperties}
    >
      <p className="sr-only" aria-live="polite">Slide {activeIndex + 1} of {slides.length}: {activeSlide.title}</p>
      <div className="lagnaa-showcase__grain" aria-hidden="true" />
      <p className="lagnaa-showcase__display" aria-hidden="true">Experience Lagnaa</p>
      <div className="lagnaa-showcase__stage" aria-hidden="true">
        {slides.map((slide, index) => {
          const role = index === activeIndex ? 'center' : index === (activeIndex + 2) % slides.length ? 'left' : 'right'
          return <div className={`lagnaa-showcase__art lagnaa-showcase__art--${role}`} key={slide.id}><img src={slide.image} alt="" width="1600" height="1600" /></div>
        })}
      </div>
      <div className="lagnaa-showcase__footer">
        <div>
          <p className="lagnaa-showcase__counter">0{activeIndex + 1} / 0{slides.length}</p>
          <h2>{activeSlide.title}</h2>
          <p>{activeSlide.description}</p>
        </div>
        <div className="lagnaa-showcase__controls" aria-label="Experience Lagnaa controls">
          <button type="button" onClick={() => selectSlide(activeIndex - 1)} disabled={isAnimating} aria-label="Show previous experience">←</button>
          <div className="lagnaa-showcase__dots">{slides.map((slide, index) => <button key={slide.id} type="button" onClick={() => selectSlide(index)} disabled={isAnimating} aria-label={`Show ${slide.title}`} aria-current={index === activeIndex ? 'true' : undefined} />)}</div>
          <button type="button" onClick={() => selectSlide(activeIndex + 1)} disabled={isAnimating} aria-label="Show next experience">→</button>
        </div>
      </div>
    </section>
  )
}
