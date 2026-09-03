import { lazy, Suspense } from 'react'
import { SiteFooter } from './components/layout/SiteFooter'
import { SiteHeader } from './components/layout/SiteHeader'
import { HomePage } from './components/pages/HomePage'
import { AnnouncementBar } from './components/ui/AnnouncementBar'
import { SpotlightCursor } from './components/ui/SpotlightCursor'
import { MobileMotionEffects } from './components/ui/MobileMotionEffects'
import { RestaurantSchema } from './components/seo/RestaurantSchema'
import { AnalyticsTracker } from './components/analytics/AnalyticsTracker'
import { MobileReserveCta } from './components/ui/MobileReserveCta'
import { FloatingWhatsApp } from './components/ui/FloatingWhatsApp'

const ExperiencesPage = lazy(() => import('./components/pages/ExperiencesPage').then((module) => ({ default: module.ExperiencesPage })))
const BarefootDiningPage = lazy(() => import('./components/pages/BarefootDiningPage').then((module) => ({ default: module.BarefootDiningPage })))
const ChilliChallengePage = lazy(() => import('./components/pages/ChilliChallengePage').then((module) => ({ default: module.ChilliChallengePage })))
const ChilliChallengeSingaporePage = lazy(() => import('./components/pages/ChilliChallengeSingaporePage').then((module) => ({ default: module.ChilliChallengeSingaporePage })))
const CookingWithChefPage = lazy(() => import('./components/pages/CookingWithChefPage').then((module) => ({ default: module.CookingWithChefPage })))
const MonthlyDegustationPage = lazy(() => import('./components/pages/MonthlyDegustationPage').then((module) => ({ default: module.MonthlyDegustationPage })))
const RediscoverLittleIndiaPage = lazy(() => import('./components/pages/RediscoverLittleIndiaPage').then((module) => ({ default: module.RediscoverLittleIndiaPage })))
const ContactPage = lazy(() => import('./components/pages/ContactPage').then((module) => ({ default: module.ContactPage })))
const AwardsMediaPage = lazy(() => import('./components/pages/AwardsMediaPage').then((module) => ({ default: module.AwardsMediaPage })))
const BarefootDiningSingaporePage = lazy(() => import('./components/pages/BarefootDiningSingaporePage').then((module) => ({ default: module.BarefootDiningSingaporePage })))
const GalleryPage = lazy(() => import('./components/pages/GalleryPage').then((module) => ({ default: module.GalleryPage })))
const IndianRestaurantLittleIndiaPage = lazy(() => import('./components/pages/IndianRestaurantLittleIndiaPage').then((module) => ({ default: module.IndianRestaurantLittleIndiaPage })))
const IndianRestaurantSingaporePage = lazy(() => import('./components/pages/IndianRestaurantSingaporePage').then((module) => ({ default: module.IndianRestaurantSingaporePage })))
const IndianCookingClassSingaporePage = lazy(() => import('./components/pages/IndianCookingClassSingaporePage').then((module) => ({ default: module.IndianCookingClassSingaporePage })))
const BestIndianFoodSingaporePage = lazy(() => import('./components/pages/BestIndianFoodSingaporePage').then((module) => ({ default: module.BestIndianFoodSingaporePage })))
const MichelinIndianRestaurantSingaporePage = lazy(() => import('./components/pages/MichelinIndianRestaurantSingaporePage').then((module) => ({ default: module.MichelinIndianRestaurantSingaporePage })))
const MenuPage = lazy(() => import('./components/pages/MenuPage').then((module) => ({ default: module.MenuPage })))
const OurStoryPage = lazy(() => import('./components/pages/OurStoryPage').then((module) => ({ default: module.OurStoryPage })))
const ReservationsPage = lazy(() => import('./components/pages/ReservationsPage').then((module) => ({ default: module.ReservationsPage })))
const BlogPage = lazy(() => import('./components/pages/BlogPage').then((module) => ({ default: module.BlogPage })))

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
      <Suspense fallback={<main id="main-content" className="route-loading" aria-busy="true" />}>
        {page}
      </Suspense>
      <RestaurantSchema pathname={path} />
      <AnalyticsTracker pathname={path} />
      <SiteFooter />
      <MobileReserveCta pathname={path} />
      <FloatingWhatsApp />
      {path !== '/menu' ? <SpotlightCursor /> : null}
      <MobileMotionEffects />
    </div>
  )
}

export default App
