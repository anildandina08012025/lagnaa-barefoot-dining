import type { MediaDirection } from './home'
import officialMenuData from './official-menu.json'

export type DietaryTag = 'vegetarian' | 'vegan' | 'gluten-free' | 'dairy-free'

export type MenuItem = {
  id: string
  name: string
  alternateName?: string
  description?: string
  price?: string
  priceVariants?: readonly { label: string; price: string }[]
  dietaryTags?: readonly DietaryTag[]
  spiceLevel?: { label: string; value?: number }
  allergens?: readonly string[]
  availability?: string
  recommendation?: string
  image?: { src: string; alt: string }
  sourceReference: string
  verified: boolean
}

export type MenuCategory = {
  id: string
  name: string
  description?: string
  displayOrder: number
  items: readonly MenuItem[]
}

export type StructuredMenu = {
  version: string | null
  effectiveDate: string | null
  currency: string | null
  notes: readonly string[]
  categories: readonly MenuCategory[]
}

export type PublishedMenuItem = {
  name: string
  description?: string
  price?: string
  variants?: readonly { name: string; price: string }[]
}

export type PublishedMenu = {
  name: string
  description?: string
  slug: string
  sections: readonly {
    name: string
    description?: string
    items: readonly PublishedMenuItem[]
  }[]
}

export const publishedMenus = officialMenuData as PublishedMenu[]

/**
 * A structured view is provided separately from the published restaurant menu
 * below. It remains available for future CMS or versioned-menu integration.
 */
export const structuredMenu: StructuredMenu = {
  version: null,
  effectiveDate: null,
  currency: null,
  notes: [],
  categories: [],
}

export const menuContent = {
  seo: {
    title: 'Menu | Lagnaa Barefoot Dining Singapore',
    description: 'Explore the menu at Lagnaa Barefoot Dining in Little India, Singapore.',
  },
  hero: {
    eyebrow: 'The Lagnaa Menu',
    heading: 'Indian flavours, ready to explore.',
    description: 'Browse Lagnaa’s published menu, then discover the food philosophy behind its approach to six flavours.',
    media: {
      subject: 'Menu hero food direction',
      detail: 'Editorial food composition or plated-dish photograph with no unverified dish identification.',
      format: 'landscape',
      tone: 'ember',
    } satisfies MediaDirection,
  },
  introduction: {
    eyebrow: 'Food at Lagnaa',
    heading: 'A menu shaped around Indian food and flavour.',
    description: 'Lagnaa’s food offering is rooted in Indian cuisine and its Arusuvai philosophy of six flavours. Browse the published dishes and prices below, then check the official source for availability.',
  },
  officialMenuViews: [
    {
      id: 'a-la-carte',
      label: 'À La Carte',
      description: 'Appetisers, tandoor dishes, curries, breads and rice.',
      href: 'https://www.lagnaa.com/menu-1?location=Upper+Dickson+Road&menu=new-menu-draft',
    },
    {
      id: 'single-meals',
      label: 'Single meals',
      description: 'Rice- and naan-paired individual dishes.',
      href: 'https://www.lagnaa.com/menu-1?location=Upper+Dickson+Road&menu=single-meals--draft',
    },
    {
      id: 'biryani',
      label: 'Biryani',
      description: 'Aromatic biryani dishes prepared with basmati rice.',
      href: 'https://www.lagnaa.com/menu-1?location=Upper+Dickson+Road&menu=biryani--draft',
    },
    {
      id: 'kids-meals',
      label: 'Kids’ meals',
      description: 'A selection of child-friendly meals.',
      href: 'https://www.lagnaa.com/menu-1?location=Upper+Dickson+Road&menu=kids-meals--draft',
    },
    {
      id: 'michelin-set-4',
      label: 'Michelin Set – 4 Pax',
      description: 'The official four-person set-menu selection.',
      href: 'https://www.lagnaa.com/menu-1?location=Upper+Dickson+Road&menu=copy-of--michelin-set-meal--draft',
    },
    {
      id: 'drinks',
      label: 'Drinks',
      description: 'Lassi, beverages, cocktails, beer and wine.',
      href: 'https://www.lagnaa.com/menu-1?location=Upper+Dickson+Road&menu=drinks-menu-1',
    },
  ],
  arusuvai: {
    eyebrow: 'Arusuvai',
    heading: 'Six flavours, considered together.',
    description: 'Arusuvai refers to six flavours and offers a way to consider balance, contrast and discovery across an Indian meal.',
  },
} as const
