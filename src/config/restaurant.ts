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
  links: {
    reservation: string | null
    orderOnline: string | null
    officialMenu: string
  }
  socialLinks: readonly SocialLink[]
  announcement: {
    text: string
    href: string | null
  } | null
  siteUrl: string | null
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
  links: {
    reservation: '/reservations',
    orderOnline: null,
    officialMenu: 'https://www.lagnaa.com/menu-1?menu=menu',
  },
  socialLinks: [
    { label: 'Instagram', href: null },
    { label: 'Facebook', href: null },
    { label: 'TikTok', href: null },
  ],
  announcement: null,
  siteUrl: null,
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Menu', href: '/menu' },
    { label: 'Gallery', href: '/gallery' },
    {
      label: 'Events',
      href: '/experiences',
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
