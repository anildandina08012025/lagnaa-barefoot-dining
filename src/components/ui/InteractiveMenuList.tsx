import { useEffect, useMemo, useRef, useState, type PointerEvent } from 'react'
import { demoMenuCategories, type DemoMenuCategory, type DemoMenuItem } from '../../content/demoMenu'

type InteractiveMenuListProps = {
  items: readonly DemoMenuItem[]
  categories?: readonly { id: DemoMenuCategory; label: string }[]
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

export function InteractiveMenuList({ items, categories = demoMenuCategories }: InteractiveMenuListProps) {
  const [activeCategory, setActiveCategory] = useState<DemoMenuCategory>(categories[0]?.id ?? 'highlights')
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeItemId, setActiveItemId] = useState<string | null>(null)
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number | null>(null)
  const pointerRef = useRef({ x: 0, y: 0 })
  const { supportsHover, reducedMotion } = useMenuInteractionMode()
  const activeCategoryLabel = categories.find((category) => category.id === activeCategory)?.label ?? 'Menu'
  const categorySections = useMemo(() => {
    const sections = new Map<string, string>()
    items.filter((item) => item.category === activeCategory).forEach((item) => {
      const sectionId = item.section ?? activeCategory
      sections.set(sectionId, item.sectionLabel ?? activeCategoryLabel)
    })
    return Array.from(sections, ([id, label]) => ({ id, label }))
  }, [activeCategory, activeCategoryLabel, items])
  const selectedSection = categorySections.some((section) => section.id === activeSection)
    ? activeSection
    : categorySections[0]?.id
  const activeSectionLabel = categorySections.find((section) => section.id === selectedSection)?.label ?? activeCategoryLabel
  const normalizedSearchQuery = searchQuery.trim().toLowerCase()
  const isSearching = normalizedSearchQuery.length > 0
  const visibleItems = isSearching
    ? items.filter((item) => [item.name, item.description, item.sectionLabel, categories.find((category) => category.id === item.category)?.label].filter(Boolean).join(' ').toLowerCase().includes(normalizedSearchQuery))
    : items.filter((item) => item.category === activeCategory && (item.section ?? activeCategory) === selectedSection)
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
    setActiveSection(items.find((item) => item.category === category)?.section ?? category)
    setSearchQuery('')
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
        {categories.map((category) => (
          <button
            aria-pressed={category.id === activeCategory}
            aria-controls="menu-category-list"
            className="interactive-menu__filter"
            key={category.id}
            onClick={() => selectCategory(category.id)}
            type="button"
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="interactive-menu__search">
        <label className="sr-only" htmlFor="menu-search">Search the menu</label>
        <input
          id="menu-search"
          name="menu-search"
          onChange={(event) => {
            setSearchQuery(event.target.value)
            setActiveItemId(null)
            setExpandedItemId(null)
          }}
          placeholder="Search dishes, drinks or ingredients"
          type="search"
          value={searchQuery}
        />
        {isSearching ? <button type="button" onClick={() => setSearchQuery('')}>Clear</button> : null}
      </div>

      {!isSearching && categorySections.length > 1 ? (
        <div className="interactive-menu__section-filters" aria-label={`${activeCategoryLabel} sections`} role="tablist">
          {categorySections.map((section) => (
            <button
              aria-controls="menu-category-list"
              aria-selected={section.id === selectedSection}
              className="interactive-menu__section-filter"
              key={section.id}
              onClick={() => {
                setActiveSection(section.id)
                setActiveItemId(null)
                setExpandedItemId(null)
              }}
              role="tab"
              type="button"
            >
              {section.label}
            </button>
          ))}
        </div>
      ) : null}

      <div className="interactive-menu__selection" aria-live="polite">
        <p>{isSearching ? `${visibleItems.length} dish${visibleItems.length === 1 ? '' : 'es'} found` : activeCategoryLabel}</p>
        <h2>{isSearching ? `Search results for “${searchQuery.trim()}”` : activeSectionLabel}</h2>
      </div>

      <div className="interactive-menu__list" id="menu-category-list" role="list" aria-label={`${isSearching ? 'Search results' : activeSectionLabel} menu items`}>
        {visibleItems.map((item) => {
          const hasImage = Boolean(item.imageSrc)
          const isExpanded = hasImage && expandedItemId === item.id
          const itemContent = (
            <>
              <span className="interactive-menu__item-main">
                <span className="interactive-menu__item-name">{item.name}</span>
                <span className="interactive-menu__item-description">{item.description}</span>
                {isSearching ? <span className="interactive-menu__search-context">{categories.find((category) => category.id === item.category)?.label} · {item.sectionLabel}</span> : null}
                <span className="interactive-menu__meta">
                  {item.dietary ? <span className={`interactive-menu__dietary interactive-menu__dietary--${item.dietary === 'Vegetarian' ? 'vegetarian' : 'non-vegetarian'}`}>{item.dietary}</span> : null}
                  {item.spiceLevel ? <span className="interactive-menu__spice">{item.spiceLevel}</span> : null}
                </span>
              </span>
              {item.priceOptions?.length ? (
                <span className="interactive-menu__price-options" aria-label="Price options">
                  {item.priceOptions.map((option) => (
                    <span className="interactive-menu__price-option" key={`${option.label}-${option.price}`}>
                      {option.label ? <span>{option.label}</span> : null}
                      <strong>{option.price}</strong>
                    </span>
                  ))}
                </span>
              ) : item.price ? <span className="interactive-menu__price">{item.price}</span> : null}
            </>
          )
          return (
            <article className="interactive-menu__item" key={item.id} role="listitem" onPointerEnter={(event) => handleItemEnter(item, event)}>
              {hasImage ? (
                <button
                  aria-controls={`menu-image-${item.id}`}
                  aria-expanded={isExpanded}
                  className="interactive-menu__item-button"
                  onBlur={() => !supportsHover && setActiveItemId(null)}
                  onClick={() => toggleItem(item)}
                  onFocus={() => handleItemFocus(item)}
                  type="button"
                >
                  {itemContent}
                </button>
              ) : (
                <div className="interactive-menu__item-button interactive-menu__item-button--static">
                  {itemContent}
                </div>
              )}
              {hasImage ? (
                <div className={`interactive-menu__inline-preview${isExpanded ? ' interactive-menu__inline-preview--open' : ''}`} id={`menu-image-${item.id}`}>
                  <img src={item.imageSrc} alt={item.imageAlt ?? ''} loading="lazy" width="640" height="460" />
                </div>
              ) : null}
            </article>
          )
        })}
        {visibleItems.length === 0 ? <p className="interactive-menu__empty">No menu items match “{searchQuery.trim()}”. Try another dish, drink or ingredient.</p> : null}
      </div>

      <div className={`interactive-menu__floating-preview${activeItem?.imageSrc && supportsHover && !reducedMotion ? ' interactive-menu__floating-preview--visible' : ''}`} ref={previewRef} aria-hidden="true">
        {activeItem?.imageSrc ? <img key={activeItem.id} src={activeItem.imageSrc} alt="" width="640" height="460" /> : null}
      </div>
    </div>
  )
}
