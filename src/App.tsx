import { lazy, Suspense } from 'react'
import { SiteFooter } from './components/layout/SiteFooter'
import { SiteHeader } from './components/layout/SiteHeader'
import { AnnouncementBar } from './components/ui/AnnouncementBar'
import { SpotlightCursor } from './components/ui/SpotlightCursor'
import { LagnaaConcierge } from './components/ui/LagnaaConcierge'
import { MobileMotionEffects } from './components/ui/MobileMotionEffects'
import { RestaurantSchema } from './components/seo/RestaurantSchema'
import { AnalyticsTracker } from './components/analytics/AnalyticsTracker'
import { MobileReserveCta } from './components/ui/MobileReserveCta'

const HomePage = lazy(() => import('./components/pages/HomePage').then(({ HomePage: component }) => ({ default: component })))
const ExperiencesPage = lazy(() => import('./components/pages/ExperiencesPage').then(({ ExperiencesPage: component }) => ({ default: component })))
const BarefootDiningPage = lazy(() => import('./components/pages/BarefootDiningPage').then(({ BarefootDiningPage: component }) => ({ default: component })))
const ChilliChallengePage = lazy(() => import('./components/pages/ChilliChallengePage').then(({ ChilliChallengePage: component }) => ({ default: component })))
const ChilliChallengeSingaporePage = lazy(() => import('./components/pages/ChilliChallengeSingaporePage').then(({ ChilliChallengeSingaporePage: component }) => ({ default: component })))
const CookingWithChefPage = lazy(() => import('./components/pages/CookingWithChefPage').then(({ CookingWithChefPage: component }) => ({ default: component })))
const MonthlyDegustationPage = lazy(() => import('./components/pages/MonthlyDegustationPage').then(({ MonthlyDegustationPage: component }) => ({ default: component })))
const RediscoverLittleIndiaPage = lazy(() => import('./components/pages/RediscoverLittleIndiaPage').then(({ RediscoverLittleIndiaPage: component }) => ({ default: component })))
const ContactPage = lazy(() => import('./components/pages/ContactPage').then(({ ContactPage: component }) => ({ default: component })))
const AwardsMediaPage = lazy(() => import('./components/pages/AwardsMediaPage').then(({ AwardsMediaPage: component }) => ({ default: component })))
const BarefootDiningSingaporePage = lazy(() => import('./components/pages/BarefootDiningSingaporePage').then(({ BarefootDiningSingaporePage: component }) => ({ default: component })))
const GalleryPage = lazy(() => import('./components/pages/GalleryPage').then(({ GalleryPage: component }) => ({ default: component })))
const IndianRestaurantLittleIndiaPage = lazy(() => import('./components/pages/IndianRestaurantLittleIndiaPage').then(({ IndianRestaurantLittleIndiaPage: component }) => ({ default: component })))
const IndianRestaurantSingaporePage = lazy(() => import('./components/pages/IndianRestaurantSingaporePage').then(({ IndianRestaurantSingaporePage: component }) => ({ default: component })))
const IndianCookingClassSingaporePage = lazy(() => import('./components/pages/IndianCookingClassSingaporePage').then(({ IndianCookingClassSingaporePage: component }) => ({ default: component })))
const BestIndianFoodSingaporePage = lazy(() => import('./components/pages/BestIndianFoodSingaporePage').then(({ BestIndianFoodSingaporePage: component }) => ({ default: component })))
const MichelinIndianRestaurantSingaporePage = lazy(() => import('./components/pages/MichelinIndianRestaurantSingaporePage').then(({ MichelinIndianRestaurantSingaporePage: component }) => ({ default: component })))
const MenuPage = lazy(() => import('./components/pages/MenuPage').then(({ MenuPage: component }) => ({ default: component })))
const OurStoryPage = lazy(() => import('./components/pages/OurStoryPage').then(({ OurStoryPage: component }) => ({ default: component })))
const ReservationsPage = lazy(() => import('./components/pages/ReservationsPage').then(({ ReservationsPage: component }) => ({ default: component })))
const BlogPage = lazy(() => import('./components/pages/BlogPage').then(({ BlogPage: component }) => ({ default: component })))

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
    : path === '/blog'
      ? <BlogPage />
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
      <Suspense fallback={<main id="main-content" aria-busy="true" />}>
        {page}
      </Suspense>
      <RestaurantSchema pathname={path} />
      <AnalyticsTracker pathname={path} />
      <SiteFooter />
      <MobileReserveCta pathname={path} />
      {path !== '/menu' ? <SpotlightCursor /> : null}
      <MobileMotionEffects />
      <LagnaaConcierge />
    </div>
  )
}

export default App
