import { SiteFooter } from './components/layout/SiteFooter'
import { SiteHeader } from './components/layout/SiteHeader'
import { HomePage } from './components/pages/HomePage'
import { ExperiencesPage } from './components/pages/ExperiencesPage'
import { BarefootDiningPage } from './components/pages/BarefootDiningPage'
import { ChilliChallengePage } from './components/pages/ChilliChallengePage'
import { ChilliChallengeSingaporePage } from './components/pages/ChilliChallengeSingaporePage'
import { CookingWithChefPage } from './components/pages/CookingWithChefPage'
import { MonthlyDegustationPage } from './components/pages/MonthlyDegustationPage'
import { RediscoverLittleIndiaPage } from './components/pages/RediscoverLittleIndiaPage'
import { ContactPage } from './components/pages/ContactPage'
import { AwardsMediaPage } from './components/pages/AwardsMediaPage'
import { BarefootDiningSingaporePage } from './components/pages/BarefootDiningSingaporePage'
import { GalleryPage } from './components/pages/GalleryPage'
import { IndianRestaurantLittleIndiaPage } from './components/pages/IndianRestaurantLittleIndiaPage'
import { IndianRestaurantSingaporePage } from './components/pages/IndianRestaurantSingaporePage'
import { IndianCookingClassSingaporePage } from './components/pages/IndianCookingClassSingaporePage'
import { BestIndianFoodSingaporePage } from './components/pages/BestIndianFoodSingaporePage'
import { MichelinIndianRestaurantSingaporePage } from './components/pages/MichelinIndianRestaurantSingaporePage'
import { MenuPage } from './components/pages/MenuPage'
import { OurStoryPage } from './components/pages/OurStoryPage'
import { ReservationsPage } from './components/pages/ReservationsPage'
import { AnnouncementBar } from './components/ui/AnnouncementBar'
import { SpotlightCursor } from './components/ui/SpotlightCursor'
import { LagnaaConcierge } from './components/ui/LagnaaConcierge'
import { MobileMotionEffects } from './components/ui/MobileMotionEffects'
import { RestaurantSchema } from './components/seo/RestaurantSchema'

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
    : path === '/indian-restaurant-little-india'
      ? <IndianRestaurantLittleIndiaPage />
    : path === '/indian-restaurant-singapore'
      ? <IndianRestaurantSingaporePage />
    : path === '/barefoot-dining-singapore'
      ? <BarefootDiningSingaporePage />
    : path === '/chilli-challenge-singapore'
      ? <ChilliChallengeSingaporePage />
    : path === '/indian-cooking-class-singapore'
      ? <IndianCookingClassSingaporePage />
    : path === '/best-indian-food-singapore'
      ? <BestIndianFoodSingaporePage />
    : path === '/michelin-indian-restaurant-singapore'
      ? <MichelinIndianRestaurantSingaporePage />
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
      <RestaurantSchema pathname={path} />
      <SiteFooter />
      {path !== '/menu' ? <SpotlightCursor /> : null}
      <MobileMotionEffects />
      <LagnaaConcierge />
    </div>
  )
}

export default App
