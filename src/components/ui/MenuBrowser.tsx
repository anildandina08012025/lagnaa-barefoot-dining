import { useState } from 'react'
import type { PublishedMenu } from '../../content/menu'

type MenuBrowserProps = {
  menus: readonly PublishedMenu[]
  showSourceLinks?: boolean
}

function officialMenuUrl(slug: string) {
  return `https://www.lagnaa.com/menu-1?location=Upper+Dickson+Road&menu=${slug}`
}

export function MenuBrowser({ menus, showSourceLinks = false }: MenuBrowserProps) {
  const [activeSlug, setActiveSlug] = useState(menus[0]?.slug ?? '')
  const activeMenu = menus.find((menu) => menu.slug === activeSlug) ?? menus[0]

  if (!activeMenu) return null

  const panelId = `menu-panel-${activeMenu.slug}`

  return (
    <div className="published-menu">
      <div className="published-menu__tabs" aria-label="Menu categories" role="tablist">
        {menus.map((menu) => {
          const isActive = menu.slug === activeMenu.slug
          return (
            <button
              aria-controls={`menu-panel-${menu.slug}`}
              aria-selected={isActive}
              className="published-menu__tab"
              id={`menu-tab-${menu.slug}`}
              key={menu.slug}
              onClick={() => setActiveSlug(menu.slug)}
              role="tab"
              type="button"
            >
              {menu.name}
            </button>
          )
        })}
      </div>

      <div aria-labelledby={`menu-tab-${activeMenu.slug}`} className="published-menu__panel" id={panelId} role="tabpanel">
        <div className="published-menu__intro">
          <div>
            <p className="eyebrow">{activeMenu.name}</p>
            {activeMenu.description ? <p>{activeMenu.description}</p> : null}
          </div>
          {showSourceLinks ? (
            <a href={officialMenuUrl(activeMenu.slug)} rel="noreferrer" target="_blank" aria-label={`Confirm ${activeMenu.name} menu details with Lagnaa`}>
              Confirm menu details <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </div>

        <div className="published-menu__sections">
          {activeMenu.sections.map((section, index) => (
            <section className="published-menu__section" key={`${section.name}-${section.description ?? index}`}>
              <header>
                <h3>{section.name}</h3>
                {section.description ? <p>{section.description}</p> : null}
              </header>
              <ul>
                {section.items.map((item) => (
                  <li className="published-menu__item" key={item.name}>
                    <div>
                      <h4>{item.name}</h4>
                      {item.description ? <p>{item.description}</p> : null}
                    </div>
                    {item.price ? <strong>{item.price}</strong> : null}
                    {item.variants?.length ? (
                      <ul className="published-menu__variants">
                        {item.variants.map((variant) => (
                          <li key={`${variant.name}-${variant.price}`}>
                            {variant.name === '-' ? null : <span>{variant.name}</span>}
                            <strong>{variant.price}</strong>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="published-menu__notice">Menu details can be confirmed directly with Lagnaa before your visit.</p>
      </div>
    </div>
  )
}
