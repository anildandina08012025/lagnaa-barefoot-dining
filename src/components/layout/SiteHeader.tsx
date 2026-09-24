import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { restaurantConfig } from '../../config/restaurant'
import lagnaaLogoDark from '../../assets/brand/lagnaa-logo-dark.jpg'
import { Button, IconButton } from '../ui/Button'
import { Container } from './Container'

const michelinAwardYears = ['2026', '2025', '2024', '2023', '2022', '2021', '2019', '2018', '2017', '2016']

function MenuGlyph({ open }: { open: boolean }) {
  return (
    <span className={`menu-glyph ${open ? 'menu-glyph--open' : ''}`} aria-hidden="true">
      <span />
      <span />
    </span>
  )
}

function isCurrentPath(href: string) {
  return window.location.pathname === href
}

function DesktopNavigationLink({ href, label }: { href: string; label: string }) {
  const isCurrent = isCurrentPath(href)

  return (
    <a
      aria-current={isCurrent ? 'page' : undefined}
      className="desktop-navigation__link"
      href={href}
    >
      <span aria-hidden="true" className="desktop-navigation__link-glow" />
      <span className="desktop-navigation__link-face">{label}</span>
      <span aria-hidden="true" className="desktop-navigation__link-face desktop-navigation__link-face--back">{label}</span>
    </a>
  )
}

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isEventsOpen, setIsEventsOpen] = useState(false)
  const [isMobileEventsOpen, setIsMobileEventsOpen] = useState(false)
  const eventsCloseTimer = useRef<number | undefined>(undefined)
  const eventsItemRef = useRef<HTMLLIElement>(null)

  const openEvents = () => {
    if (eventsCloseTimer.current) window.clearTimeout(eventsCloseTimer.current)
    eventsCloseTimer.current = undefined
    setIsEventsOpen(true)
  }

  const closeEventsAfterPointerLeaves = () => {
    if (eventsCloseTimer.current) window.clearTimeout(eventsCloseTimer.current)
    eventsCloseTimer.current = window.setTimeout(() => {
      setIsEventsOpen(false)
      eventsCloseTimer.current = undefined
    }, 220)
  }

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen])

  useEffect(() => () => {
    if (eventsCloseTimer.current) window.clearTimeout(eventsCloseTimer.current)
  }, [])

  useEffect(() => {
    const closeEventsOnOutsidePress = (event: MouseEvent) => {
      if (eventsItemRef.current && !eventsItemRef.current.contains(event.target as Node)) {
        setIsEventsOpen(false)
      }
    }

    document.addEventListener('mousedown', closeEventsOnOutsidePress)
    return () => document.removeEventListener('mousedown', closeEventsOnOutsidePress)
  }, [])

  const closeMenu = () => {
    setIsMenuOpen(false)
    setIsMobileEventsOpen(false)
  }

  return (
    <header className="site-header">
      <Container className="site-header__inner">
        <a className="wordmark" href="/" aria-label={`${restaurantConfig.name} home`}>
          <img className="wordmark__logo" src={lagnaaLogoDark} alt="Lagnaa...barefoot dining" />
        </a>

        <a
          className="site-header__michelin"
          href="https://guide.michelin.com/sg/en/singapore-region/singapore/restaurant/lagnaa"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Lagnaa...barefoot dining: Michelin Awarded from 2016 to 2026. View the official MICHELIN Guide listing."
        >
          <img className="site-header__michelin-mark" src="/michelin-header-red.webp" alt="Michelin Awarded" width="360" height="193" />
          <span className="site-header__michelin-years" aria-hidden="true">
            {michelinAwardYears.map((year) => <span key={year}>{year}</span>)}
          </span>
        </a>

        <nav className="desktop-navigation" aria-label="Primary navigation">
          <ul>
            {restaurantConfig.navigation.map((item) => (
              <li
                className={item.children ? 'desktop-navigation__item--has-submenu' : undefined}
                key={item.href}
                ref={item.children ? eventsItemRef : undefined}
                onBlur={item.children ? (event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) closeEventsAfterPointerLeaves()
                } : undefined}
                onFocus={item.children ? openEvents : undefined}
                onMouseEnter={item.children ? openEvents : undefined}
                onMouseLeave={item.children ? closeEventsAfterPointerLeaves : undefined}
              >
                <div className={item.children ? 'desktop-navigation__submenu-control' : undefined}>
                  <DesktopNavigationLink href={item.href} label={item.label} />
                {item.children ? (
                    <button
                      className="desktop-navigation__submenu-toggle"
                      type="button"
                      aria-label={`${isEventsOpen ? 'Close' : 'Open'} ${item.label} menu`}
                      aria-expanded={isEventsOpen}
                      aria-controls="events-submenu"
                      onClick={() => setIsEventsOpen((open) => !open)}
                    >
                      <motion.span
                        animate={{ rotate: isEventsOpen ? 180 : 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                      >
                        <ChevronDown aria-hidden="true" size={16} strokeWidth={2.4} />
                      </motion.span>
                    </button>
                ) : null}
                </div>
                {item.children ? (
                  <>
                    <AnimatePresence>
                      {isEventsOpen ? (
                        <motion.ul
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          className="desktop-navigation__submenu"
                          exit={{ opacity: 0, scale: 0.96, y: -8 }}
                          id="events-submenu"
                          initial={{ opacity: 0, scale: 0.96, y: -8 }}
                          aria-label="Events navigation"
                          transition={{ duration: 0.18, ease: 'easeOut' }}
                        >
                          {item.children.map((child, index) => (
                            <motion.li
                              animate={{ opacity: 1, x: 0 }}
                              initial={{ opacity: 0, x: -10 }}
                              key={child.href}
                              transition={{ delay: index * 0.035, duration: 0.16, ease: 'easeOut' }}
                            >
                              <a href={child.href}>{child.label}</a>
                            </motion.li>
                          ))}
                        </motion.ul>
                      ) : null}
                    </AnimatePresence>
                  </>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          {restaurantConfig.links.orderOnline ? <Button href={restaurantConfig.links.orderOnline} variant="text">Order Online</Button> : null}
          <Button href={restaurantConfig.links.reservation} disabled={!restaurantConfig.links.reservation} variant="primary">
            Reserve a Table
          </Button>
        </div>

        <IconButton
          className="site-header__menu-toggle"
          label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setIsMenuOpen((open) => !open)}
          expanded={isMenuOpen}
          controls="mobile-navigation"
        >
          <MenuGlyph open={isMenuOpen} />
        </IconButton>
      </Container>

      <div className={`mobile-navigation ${isMenuOpen ? 'mobile-navigation--open' : ''}`} aria-hidden={!isMenuOpen} inert={!isMenuOpen}>
        <button className="mobile-navigation__backdrop" type="button" onClick={closeMenu} tabIndex={-1} aria-label="Close navigation menu" />
        <nav className="mobile-navigation__panel" id="mobile-navigation" aria-label="Mobile navigation">
          <Container>
            <div className="mobile-navigation__header">
              <span className="eyebrow">Navigate</span>
              <IconButton label="Close navigation menu" onClick={closeMenu}>
                <MenuGlyph open />
              </IconButton>
            </div>
            <ul className="mobile-navigation__links">
              {restaurantConfig.navigation.map((item) => (
                <li key={item.href}>
                  <div className="mobile-navigation__link-row">
                    <a href={item.href} onClick={closeMenu} aria-current={isCurrentPath(item.href) ? 'page' : undefined}>{item.label}</a>
                    {item.children ? (
                      <button
                        className="mobile-navigation__submenu-toggle"
                        type="button"
                        aria-label={`Show ${item.label} links`}
                        aria-expanded={isMobileEventsOpen}
                        aria-controls="mobile-events-submenu"
                        onClick={() => setIsMobileEventsOpen((open) => !open)}
                      >
                        <span aria-hidden="true">{isMobileEventsOpen ? '−' : '+'}</span>
                      </button>
                    ) : null}
                  </div>
                  {item.children && isMobileEventsOpen ? (
                    <ul className="mobile-navigation__submenu" id="mobile-events-submenu" aria-label="Events navigation">
                      {item.children.map((child) => <li key={child.href}><a href={child.href} onClick={closeMenu}>{child.label}</a></li>)}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
            <div className="mobile-navigation__actions">
              <Button href={restaurantConfig.links.reservation} disabled={!restaurantConfig.links.reservation} variant="primary">
                Reserve a Table
              </Button>
              {restaurantConfig.links.orderOnline ? <Button href={restaurantConfig.links.orderOnline} variant="outline">Order Online</Button> : null}
            </div>
          </Container>
        </nav>
      </div>
    </header>
  )
}
