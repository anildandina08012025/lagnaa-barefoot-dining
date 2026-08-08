import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { restaurantConfig } from '../../config/restaurant'
import { Button, IconButton } from '../ui/Button'
import { Container } from './Container'

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

const navigationTransition = { type: 'spring' as const, stiffness: 120, damping: 18 }

function DesktopNavigationLink({ href, label }: { href: string; label: string }) {
  const reducedMotion = useReducedMotion()
  const isCurrent = isCurrentPath(href)

  return (
    <motion.a
      aria-current={isCurrent ? 'page' : undefined}
      className="desktop-navigation__link"
      href={href}
      initial="initial"
      whileHover={reducedMotion ? undefined : 'hover'}
    >
      <motion.span
        aria-hidden="true"
        className="desktop-navigation__link-glow"
        animate={isCurrent ? { opacity: 1, scale: 1.15 } : { opacity: 0, scale: 0.8 }}
        variants={{ hover: { opacity: 1, scale: 1.15 } }}
        transition={{ opacity: { duration: 0.24 }, scale: navigationTransition }}
      />
      <motion.span
        className="desktop-navigation__link-face"
        variants={{ initial: { rotateX: 0, opacity: 1 }, hover: { rotateX: -90, opacity: 0 } }}
        transition={navigationTransition}
        style={{ transformOrigin: 'center bottom', transformStyle: 'preserve-3d' }}
      >
        {label}
      </motion.span>
      <motion.span
        aria-hidden="true"
        className="desktop-navigation__link-face desktop-navigation__link-face--back"
        variants={{ initial: { rotateX: 90, opacity: 0 }, hover: { rotateX: 0, opacity: 1 } }}
        transition={navigationTransition}
        style={{ transformOrigin: 'center top', transformStyle: 'preserve-3d' }}
      >
        {label}
      </motion.span>
    </motion.a>
  )
}

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isEventsOpen, setIsEventsOpen] = useState(false)
  const [isMobileEventsOpen, setIsMobileEventsOpen] = useState(false)

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

  const closeMenu = () => {
    setIsMenuOpen(false)
    setIsMobileEventsOpen(false)
  }

  return (
    <header className="site-header">
      <Container className="site-header__inner">
        {/* Temporary wordmark: replace with approved Lagnaa logo asset when supplied. */}
        <a className="wordmark" href="/" aria-label={`${restaurantConfig.name} home`}>
          <span className="wordmark__name">Lagnaa</span>
          <span className="wordmark__descriptor">Barefoot Dining</span>
        </a>

        <nav className="desktop-navigation" aria-label="Primary navigation">
          <ul>
            {restaurantConfig.navigation.map((item) => (
              <li className={item.children ? 'desktop-navigation__item--has-submenu' : undefined} key={item.href}>
                <DesktopNavigationLink href={item.href} label={item.label} />
                {item.children ? (
                  <>
                    <button
                      className="desktop-navigation__submenu-toggle"
                      type="button"
                      aria-label={`Show ${item.label} links`}
                      aria-expanded={isEventsOpen}
                      aria-controls="events-submenu"
                      onClick={() => setIsEventsOpen((open) => !open)}
                    >
                      <ChevronDown aria-hidden="true" size={15} strokeWidth={1.8} />
                    </button>
                    {isEventsOpen ? (
                      <ul className="desktop-navigation__submenu" id="events-submenu" aria-label="Events navigation">
                        {item.children.map((child) => <li key={child.href}><a href={child.href}>{child.label}</a></li>)}
                      </ul>
                    ) : null}
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
