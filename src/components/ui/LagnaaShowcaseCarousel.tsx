import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import chilliLevels from '../../assets/chilli/lagnaa-chilli-challenge-levels.png'
import cookingMoment from '../../assets/lagnaa-showcase/lagnaa-cooking-moment.webp'
import diningMoment from '../../assets/lagnaa-showcase/lagnaa-dining-moment.webp'

const slides = [
  { id: 'chilli-challenge', image: chilliLevels, title: 'The Ultimate Chilli Challenge', description: 'Lagnaa’s signature food challenge for guests who enjoy exploring spice.', background: '#78222d' },
  { id: 'monthly-degustation', image: diningMoment, title: 'Monthly Dégustation', description: 'A food-tasting experience for discovering dishes and sharing impressions with the Lagnaa team.', background: '#a34b2d' },
  { id: 'cooking-class', image: cookingMoment, title: 'Cook with Chef Kaesavan', description: 'An Indian cooking-class experience with Chef Kaesavan.', background: '#4c3b2b' },
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
