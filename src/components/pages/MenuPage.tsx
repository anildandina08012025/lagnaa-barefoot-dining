import { useState } from 'react'
import { demoMenuItems } from '../../content/demoMenu'
import { publishedMenus, type PublishedMenuItem } from '../../content/menu'
import { restaurantConfig } from '../../config/restaurant'
import { Container } from '../layout/Container'
import { PageMetadata } from '../seo/PageMetadata'

type DisplayItem = Pick<PublishedMenuItem, 'name' | 'description' | 'price' | 'variants'>

type DisplaySection = {
  id: string
  title: string
  description?: string
  items: readonly DisplayItem[]
}

type DisplayCategory = {
  id: string
  label: string
  sections: readonly DisplaySection[]
  presentation?: 'sets'
}

function menuSections(slug: string): DisplaySection[] {
  const menu = publishedMenus.find((entry) => entry.slug === slug)
  if (!menu) return []

  return menu.sections.map((section, index) => ({
    id: `${slug}-${index}`,
    title: section.name,
    description: section.description,
    items: section.items,
  }))
}

function groupedMichelinFourPaxSets(): DisplaySection[] {
  const items = menuSections('copy-of--michelin-set-meal--draft').flatMap((section) => section.items)
  return [
    { id: 'michelin-four-flexatarian', title: 'Flexatarian MICHELIN Set for 4 pax', items: items.filter((item) => !item.name.startsWith('Vegetarian')) },
    { id: 'michelin-four-vegetarian', title: 'Vegetarian MICHELIN Set for 4 pax', items: items.filter((item) => item.name.startsWith('Vegetarian')) },
  ].filter((section) => section.items.length > 0)
}

function groupedMichelinTwoPaxSets(): DisplaySection[] {
  const groups = new Map<string, DisplayItem[]>()
  demoMenuItems
    .filter((item) => item.category === 'michelin-sets')
    .forEach((item) => {
      const title = item.sectionLabel ?? 'MICHELIN Set for 2 pax'
      groups.set(title, [...(groups.get(title) ?? []), item])
    })

  return Array.from(groups, ([title, items]) => ({
    id: `michelin-two-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    title,
    items,
  }))
}

const menuCategories: readonly DisplayCategory[] = [
  { id: 'michelin-four-pax', label: 'Michelin Set – 4 Pax', sections: groupedMichelinFourPaxSets(), presentation: 'sets' },
  { id: 'michelin-two-pax', label: 'Michelin Set – 2 Pax', sections: groupedMichelinTwoPaxSets(), presentation: 'sets' },
  { id: 'single-meal', label: 'Single Meal', sections: menuSections('single-meals--draft') },
  { id: 'a-la-carte', label: 'À La Carte', sections: menuSections('new-menu-draft') },
  { id: 'biryani', label: 'Biryani', sections: menuSections('biryani--draft') },
  { id: 'kids-meal', label: 'Kids Meal', sections: menuSections('kids-meals--draft') },
  { id: 'drinks', label: 'Drinks Menu', sections: menuSections('drinks-menu-1') },
]

function DisplayPrice({ item }: { item: DisplayItem }) {
  if (item.variants?.length) {
    return (
      <span className="reference-menu__prices" aria-label="Price options">
        {item.variants.map((variant) => (
          <span key={`${variant.name}-${variant.price}`}>
            {variant.name && variant.name !== '-' ? <small>{variant.name}</small> : null}
            <strong>{variant.price}</strong>
          </span>
        ))}
      </span>
    )
  }

  return item.price ? <strong className="reference-menu__price">{item.price}</strong> : null
}

function StandardMenuSection({ section }: { section: DisplaySection }) {
  return (
    <section className="reference-menu__section" aria-labelledby={section.id}>
      <div className="reference-menu__section-heading">
        <h2 id={section.id}>{section.title}</h2>
        {section.description ? <p>{section.description}</p> : null}
      </div>
      <div className="reference-menu__card">
        <div className="reference-menu__grid">
          {section.items.map((item, index) => (
            <article className="reference-menu__item" key={`${section.id}-${item.name}-${index}`}>
              <div>
                <h3>{item.name}</h3>
                {item.description ? <p>{item.description}</p> : null}
              </div>
              <DisplayPrice item={item} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function SetMenuSection({ section }: { section: DisplaySection }) {
  return (
    <section className="reference-menu__section" aria-labelledby={section.id}>
      <div className="reference-menu__section-heading">
        <h2 id={section.id}>{section.title}</h2>
      </div>
      <div className="reference-menu__card reference-menu__card--sets">
        <div className="reference-menu__set-grid">
          {section.items.map((item, index) => (
            <article className="reference-menu__set" key={`${section.id}-${item.name}-${index}`}>
              <div className="reference-menu__set-top">
                <h3>{item.name}</h3>
                <DisplayPrice item={item} />
              </div>
              {item.description ? <p>{item.description}</p> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function MenuPage() {
  const [activeCategoryId, setActiveCategoryId] = useState(menuCategories[0].id)
  const activeCategory = menuCategories.find((category) => category.id === activeCategoryId) ?? menuCategories[0]
  const [activeALaCarteSectionId, setActiveALaCarteSectionId] = useState(menuCategories.find((category) => category.id === 'a-la-carte')?.sections[0]?.id ?? '')
  const visibleSections = activeCategory.id === 'a-la-carte'
    ? activeCategory.sections.filter((section) => section.id === activeALaCarteSectionId)
    : activeCategory.sections
  const canonicalUrl = restaurantConfig.siteUrl ? `${restaurantConfig.siteUrl.replace(/\/$/, '')}/menu` : undefined

  return (
    <main className="reference-menu" id="main-content">
      <PageMetadata
        title="Indian Food Menu | Lagnaa...barefoot dining Singapore"
        description="Explore Lagnaa...barefoot dining’s Indian food menu in Singapore, including Michelin sets, à la carte dishes, biryani, children’s meals and drinks."
        canonicalUrl={canonicalUrl}
      />

      <Container className="reference-menu__wrap">
        <header className="reference-menu__hero">
          <p>Lagnaa...barefoot dining</p>
          <h1>Our Menu</h1>
          <div>
            <strong>Discover “Arusuvai”</strong>
            <span>The 6 Flavours of Indian Food</span>
          </div>
          <i aria-hidden="true">◆</i>
        </header>

        <div className="reference-menu__nav-shell">
          <nav className="reference-menu__tabs" aria-label="Menu categories">
            {menuCategories.map((category) => (
              <button
                aria-pressed={category.id === activeCategory.id}
                className={category.id === activeCategory.id ? 'is-active' : undefined}
                key={category.id}
                onClick={() => setActiveCategoryId(category.id)}
                type="button"
              >
                {category.label}
              </button>
            ))}
          </nav>
        </div>

        {activeCategory.id === 'a-la-carte' ? (
          <div className="reference-menu__subnav-shell">
            <nav className="reference-menu__subtabs" aria-label="À La Carte sections">
              {activeCategory.sections.map((section) => (
                <button
                  aria-pressed={section.id === activeALaCarteSectionId}
                  className={section.id === activeALaCarteSectionId ? 'is-active' : undefined}
                  key={section.id}
                  onClick={() => setActiveALaCarteSectionId(section.id)}
                  type="button"
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
        ) : null}

        <div className="reference-menu__content">
          {visibleSections.map((section) => activeCategory.presentation === 'sets'
            ? <SetMenuSection key={section.id} section={section} />
            : <StandardMenuSection key={section.id} section={section} />)}
        </div>

        <p className="reference-menu__service-note">Subject to 10% Service Charge</p>
      </Container>

      <section className="reference-menu__final-cta">
        <Container>
          <h2>Ready to experience Lagnaa?</h2>
          {restaurantConfig.links.reservation ? <a href={restaurantConfig.links.reservation}>Reserve your table</a> : null}
        </Container>
      </section>
    </main>
  )
}
