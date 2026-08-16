export type NavigationItem = {
  label: string
  href: string
  children?: readonly NavigationItem[]
}

export type SocialLink = {
  label: string
  href: string | null
}

export type RestaurantConfiguration = {
  name: string
  shortDescription: string
  location: string
  address: string | null
  mapsUrl: string | null
  phone: string | null
  whatsapp: string | null
  email: string | null
  openingHours: readonly string[]
  servesCuisine: readonly string[]
  links: {
    /** Internal reservation journey used by all Reserve a Table CTAs. */
    reservation: string | null
    /** Add only a verified live booking provider URL. Null keeps the contact-based handoff. */
    reservationProvider: string | null
    orderOnline: string | null
    officialMenu: string
    /** Add the approved Google Form URL when the client enables testimonial collection. */
    testimonialForm: string | null
    /** Internal reference only; do not expose unless the client approves public access. */
    testimonialSheet: string | null
  }
  socialLinks: readonly SocialLink[]
  announcement: {
    text: string
    href: string | null
  } | null
  /** VITE_SITE_URL may override the approved production domain. */
  siteUrl: string | null
  /** Set VITE_ROBOTS_INDEX=false to keep a non-production environment out of search. */
  isIndexable: boolean
  socialImageUrl: string | null
  navigation: readonly NavigationItem[]
  experienceLinks: readonly NavigationItem[]
  legalLinks: readonly NavigationItem[]
}

/**
 * Single source of truth for repeatable restaurant information.
 * Official website-confirmed contact and booking values are centralised here.
 * Remaining unconfirmed details stay null until confirmed by Lagnaa.
 */
export const restaurantConfig: RestaurantConfiguration = {
  name: 'Lagnaa Barefoot Dining',
  shortDescription: 'An Indian restaurant in Little India, Singapore.',
  location: 'Little India, Singapore',
  address: '6 Upper Dickson Road, Singapore 207466',
  mapsUrl: null,
  phone: '+65 9784 4771',
  whatsapp: null,
  email: 'barefootdining@lagnaa.com',
  openingHours: [],
  servesCuisine: ['Indian'],
  links: {
    reservation: '/reservations',
    reservationProvider: null,
    orderOnline: null,
    officialMenu: 'https://www.lagnaa.com/menu-1?menu=menu',
    testimonialForm: 'https://docs.google.com/forms/d/e/1FAIpQLSevWsHnETCVOnIbiGNES4WD6nHrP6h8x69ZUiFmuQxjWS5c5g/viewform?usp=header',
    testimonialSheet: 'https://docs.google.com/spreadsheets/d/1nJOvXT82cN7-d7wrVI44pEjmNw8T9W8FQATa9lDWM5I/edit?usp=sharing',
  },
  socialLinks: [
    { label: 'Instagram', href: null },
    { label: 'Facebook', href: null },
    { label: 'TikTok', href: null },
  ],
  announcement: null,
  // Existing approved production default; Vercel can override this once a different domain is confirmed.
  siteUrl: import.meta.env.VITE_SITE_URL?.replace(/\/$/, '') || 'https://www.lagnaa.com',
  isIndexable: import.meta.env.VITE_ROBOTS_INDEX !== 'false',
  // Add an approved, production-ready absolute image URL here before enabling social imagery.
  socialImageUrl: null,
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Menu', href: '/menu' },
    { label: 'Gallery', href: '/gallery' },
    {
      label: 'Events',
      href: '/events',
      children: [
        { label: 'Barefoot Dining', href: '/experiences/barefoot-dining' },
        { label: 'Monthly Dégustation', href: '/events/monthly-degustation' },
        { label: 'The Ultimate Chilli Challenge', href: '/experiences/chilli-challenge' },
        { label: 'Cooking with Chef Kaesavan', href: '/events/cooking-with-chef-kaesavan' },
        { label: '#RediscoverLittleIndia', href: '/events/rediscover-little-india' },
      ],
    },
    { label: 'Awards & Media', href: '/awards-media' },
    { label: 'Our Story', href: '/our-story' },
    { label: 'Contact', href: '/contact' },
  ],
  experienceLinks: [
    { label: 'Barefoot Dining', href: '/experiences/barefoot-dining' },
  ],
  legalLinks: [],
}
