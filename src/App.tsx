import { SiteFooter } from './components/layout/SiteFooter'
import { SiteHeader } from './components/layout/SiteHeader'
import { HomePage } from './components/pages/HomePage'
import { ExperiencesPage } from './components/pages/ExperiencesPage'
import { BarefootDiningPage } from './components/pages/BarefootDiningPage'
import { ChilliChallengePage } from './components/pages/ChilliChallengePage'
import { CookingWithChefPage } from './components/pages/CookingWithChefPage'
import { MonthlyDegustationPage } from './components/pages/MonthlyDegustationPage'
import { RediscoverLittleIndiaPage } from './components/pages/RediscoverLittleIndiaPage'
import { ContactPage } from './components/pages/ContactPage'
import { AwardsMediaPage } from './components/pages/AwardsMediaPage'
import { GalleryPage } from './components/pages/GalleryPage'
import { MenuPage } from './components/pages/MenuPage'
import { OurStoryPage } from './components/pages/OurStoryPage'
import { ReservationsPage } from './components/pages/ReservationsPage'
import { AnnouncementBar } from './components/ui/AnnouncementBar'
import { SpotlightCursor } from './components/ui/SpotlightCursor'
import { LagnaaConcierge } from './components/ui/LagnaaConcierge'
import { MobileMotionEffects } from './components/ui/MobileMotionEffects'

function App() {
  const path = window.location.pathname
  const page = path === '/our-story'
    ? <OurStoryPage />
    : path === '/menu'
      ? <MenuPage />
    : path === '/reservations'
      ? <ReservationsPage />
    : path === '/experiences/barefoot-dining'
      ? <BarefootDiningPage />
    : path === '/experiences/chilli-challenge'
      ? <ChilliChallengePage />
    : path === '/events/monthly-degustation'
      ? <MonthlyDegustationPage />
    : path === '/events/rediscover-little-india'
      ? <RediscoverLittleIndiaPage />
    : path === '/events/cooking-with-chef-kaesavan'
      ? <CookingWithChefPage />
    : path === '/contact'
      ? <ContactPage />
      : path === '/awards-media'
        ? <AwardsMediaPage />
        : path === '/gallery'
          ? <GalleryPage />
        : path === '/experiences' || path === '/events'
        ? <ExperiencesPage />
        : <HomePage />

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <AnnouncementBar />
      <SiteHeader />
      {page}
      <SiteFooter />
      {path !== '/menu' ? <SpotlightCursor /> : null}
      <MobileMotionEffects />
      <LagnaaConcierge />
    </div>
  )
}

export default App
