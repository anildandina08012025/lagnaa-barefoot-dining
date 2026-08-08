import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { demoMenuCategories, type DemoMenuCategory, type DemoMenuItem } from '../../content/demoMenu'

type InteractiveMenuListProps = {
  items: readonly DemoMenuItem[]
}

function useMenuInteractionMode() {
  const [supportsHover, setSupportsHover] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => {
      setSupportsHover(hoverQuery.matches)
      setReducedMotion(motionQuery.matches)
    }
    update()
    hoverQuery.addEventListener('change', update)
    motionQuery.addEventListener('change', update)
    return () => {
      hoverQuery.removeEventListener('change', update)
      motionQuery.removeEventListener('change', update)
    }
  }, [])

  return { supportsHover, reducedMotion }
}

export function InteractiveMenuList({ items }: InteractiveMenuListProps) {
  const [activeCategory, setActiveCategory] = useState<DemoMenuCategory>('highlights')
  const [activeItemId, setActiveItemId] = useState<string | null>(null)
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number | null>(null)
  const pointerRef = useRef({ x: 0, y: 0 })
  const { supportsHover, reducedMotion } = useMenuInteractionMode()
  const visibleItems = items.filter((item) => item.category === activeCategory)
  const activeItem = visibleItems.find((item) => item.id === activeItemId)

  useEffect(() => () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
  }, [])

  useEffect(() => {
    if (!activeItem || !supportsHover || reducedMotion) return
    if (frameRef.current === null) frameRef.current = requestAnimationFrame(movePreview)
  }, [activeItem, reducedMotion, supportsHover])

  const movePreview = () => {
    frameRef.current = null
    const container = containerRef.current
    const preview = previewRef.current
    if (!container || !preview) return
    const bounds = container.getBoundingClientRect()
    const previewBounds = preview.getBoundingClientRect()
    const previewWidth = previewBounds.width
    const previewHeight = previewBounds.height
    const padding = 20
    const x = Math.min(Math.max(pointerRef.current.x - bounds.left + 28, padding), bounds.width - previewWidth - padding)
    const y = Math.min(Math.max(pointerRef.current.y - bounds.top - previewHeight - 20, padding), bounds.height - previewHeight - padding)
    preview.style.setProperty('--menu-preview-x', `${x}px`)
    preview.style.setProperty('--menu-preview-y', `${y}px`)
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!supportsHover || reducedMotion || !activeItem) return
    pointerRef.current = { x: event.clientX, y: event.clientY }
    if (frameRef.current === null) frameRef.current = requestAnimationFrame(movePreview)
  }

  const selectCategory = (category: DemoMenuCategory) => {
    setActiveCategory(category)
    setActiveItemId(null)
    setExpandedItemId(null)
  }

  const handleItemEnter = (item: DemoMenuItem, event: PointerEvent<HTMLElement>) => {
    if (!supportsHover) return
    pointerRef.current = { x: event.clientX, y: event.clientY }
    setActiveItemId(item.id)
  }

  const handleItemFocus = (item: DemoMenuItem) => {
    setActiveItemId(item.id)
    if (supportsHover && !reducedMotion) {
      const container = containerRef.current
      if (container) pointerRef.current = { x: container.getBoundingClientRect().right - 330, y: container.getBoundingClientRect().top + 280 }
    }
  }

  const toggleItem = (item: DemoMenuItem) => {
    if (supportsHover && !reducedMotion) return
    setExpandedItemId((current) => current === item.id ? null : item.id)
    setActiveItemId(item.id)
  }

  return (
    <div className="interactive-menu" ref={containerRef} onPointerMove={handlePointerMove} onPointerLeave={() => supportsHover && setActiveItemId(null)}>
      <div className="interactive-menu__filters">
        {demoMenuCategories.map((category) => (
          <button
            aria-pressed={category.id === activeCategory}
            className="interactive-menu__filter"
            key={category.id}
            onClick={() => selectCategory(category.id)}
            type="button"
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="interactive-menu__list" role="list">
        {visibleItems.map((item) => {
          const isExpanded = expandedItemId === item.id
          return (
            <article className="interactive-menu__item" key={item.id} role="listitem" onPointerEnter={(event) => handleItemEnter(item, event)}>
              <button
                aria-controls={`menu-image-${item.id}`}
                aria-expanded={isExpanded}
                className="interactive-menu__item-button"
                onBlur={() => !supportsHover && setActiveItemId(null)}
                onClick={() => toggleItem(item)}
                onFocus={() => handleItemFocus(item)}
                type="button"
              >
                <span className="interactive-menu__item-main">
                  <span className="interactive-menu__item-name">{item.name}</span>
                  <span className="interactive-menu__item-description">{item.description}</span>
                  <span className="interactive-menu__meta">
                    {item.dietary ? <span className={`interactive-menu__dietary interactive-menu__dietary--${item.dietary === 'Vegetarian' ? 'vegetarian' : 'non-vegetarian'}`}>{item.dietary}</span> : null}
                    {item.spiceLevel ? <span className="interactive-menu__spice">{item.spiceLevel}</span> : null}
                  </span>
                </span>
                <span className="interactive-menu__price">{item.price}</span>
              </button>
              {item.imageSrc ? (
                <div className={`interactive-menu__inline-preview${isExpanded ? ' interactive-menu__inline-preview--open' : ''}`} id={`menu-image-${item.id}`}>
                  <img src={item.imageSrc} alt={item.imageAlt ?? ''} loading="lazy" width="640" height="460" />
                </div>
              ) : null}
            </article>
          )
        })}
      </div>

      <div className={`interactive-menu__floating-preview${activeItem?.imageSrc && supportsHover && !reducedMotion ? ' interactive-menu__floating-preview--visible' : ''}`} ref={previewRef} aria-hidden="true">
        {activeItem?.imageSrc ? <img key={activeItem.id} src={activeItem.imageSrc} alt="" width="640" height="460" /> : null}
      </div>
    </div>
  )
}
