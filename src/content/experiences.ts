import type { MediaDirection } from './home'
import entranceTeam from '../assets/gallery/lagnaa-entrance-team.jpg'
import octoberMonthlySpecial from '../assets/monthly-specials/lagnaa-october-special.webp'
import curryShots from '../assets/chilli/curry-shots.webp'
import chefCooking from '../assets/cooking/chef-kaesavan-cooking.webp'

export type Experience = {
  id: string
  publicName: string
  slug: string
  shortDescription: string
  longIntroduction?: readonly string[]
  officialDetailsUrl: string
  displayOrder: number
  availability: string | null
  practicalDetails: readonly string[]
  sourceReference: string
  verified: boolean
}

export type EventExperience = {
  id: string
  title: string
  eyebrow: string
  description: string
  availabilityNote: string
  image: string
  imageAlt: string
  officialDetailsUrl: string
  detailPath?: string
  detailActionLabel?: string
  action: 'official-details' | 'contact'
  isPastOrCultural?: boolean
}

type BarefootDiningPageContent = {
  seo: {
    title: string
    description: string
  }
  hero: {
    eyebrow: string
    heading: string
    description: string
    media: MediaDirection
  }
  introduction: {
    eyebrow: string
    heading: string
    paragraphs: readonly string[]
  }
  sensory: {
    eyebrow: string
    heading: string
    description: string
  }
  setting: {
    eyebrow: string
    heading: string
    paragraphs: readonly string[]
    media: MediaDirection
  }
  food: {
    eyebrow: string
    heading: string
    description: string
    media: MediaDirection
  }
  arusuvai: {
    eyebrow: string
    heading: string
    description: string
  }
  moments: {
    eyebrow: string
    heading: string
    media: readonly MediaDirection[]
  }
  practical: {
    eyebrow: string
    heading: string
    description: string
  }
  exploreMore: readonly {
    label: string
    href: string
    description: string
  }[]
  cta: {
    eyebrow: string
    heading: string
    description: string
  }
  reservation: {
    method: 'official-booking-page'
    availability: null
    advanceBookingGuidance: null
  }
  faqs: readonly []
}

/**
 * Public experience data. Operational fields remain empty until client-approved
 * details are supplied; visitors are sent to the official live detail pages.
 */
export const experiences: readonly Experience[] = [
  {
    id: 'barefoot-dining',
    publicName: 'Barefoot Dining',
    slug: 'barefoot-dining',
    shortDescription: 'A dining experience unique to Lagnaa...barefoot dining.',
    longIntroduction: [
      'Barefoot Dining is a signature part of the Lagnaa...barefoot dining experience.',
      'It brings Indian food, warm hospitality and an intimate atmosphere together around the table.',
    ],
    officialDetailsUrl: 'https://www.lagnaa.com/service-page/barefoot-dining',
    displayOrder: 1,
    availability: null,
    practicalDetails: [],
    sourceReference: 'Official Lagnaa...barefoot dining service page',
    verified: true,
  },
  {
    id: 'casual-dining',
    publicName: 'Casual Dining',
    slug: 'casual-dining',
    shortDescription: 'Watch Little India in action while you dine with us.',
    officialDetailsUrl: 'https://www.lagnaa.com/service-page/street-level-dining',
    displayOrder: 2,
    availability: null,
    practicalDetails: [],
    sourceReference: 'Official Lagnaa...barefoot dining Casual Dining service page',
    verified: true,
  },
]

export const eventExperiences: readonly EventExperience[] = [
  {
    id: 'monthly-degustation',
    title: 'Monthly Dégustation',
    eyebrow: 'Social dining & food tasting',
    description: 'A social dining and food-tasting experience centred on discovering dishes and flavours together.',
    availabilityNote: 'Current dates and participation details are available directly from Lagnaa...barefoot dining.',
    image: octoberMonthlySpecial,
    imageAlt: 'A Lagnaa...barefoot dining monthly special dish.',
    officialDetailsUrl: 'https://www.lagnaa.com/food-tasting',
    detailPath: '/events/monthly-degustation',
    detailActionLabel: 'Register your interest',
    action: 'official-details',
  },
  {
    id: 'chilli-challenge',
    title: 'The Ultimate Chilli Challenge',
    eyebrow: 'Signature food challenge',
    description: 'Lagnaa...barefoot dining’s signature food challenge for guests who enjoy exploring spice.',
    availabilityNote: 'Contact Lagnaa...barefoot dining or view the official page for current participation details.',
    image: curryShots,
    imageAlt: 'Curry Shots at Lagnaa...barefoot dining.',
    officialDetailsUrl: 'https://www.lagnaa.com/chilli-challenge',
    detailPath: '/experiences/chilli-challenge',
    detailActionLabel: 'Explore the challenge',
    action: 'official-details',
  },
  {
    id: 'cooking-with-chef-kaesavan',
    title: 'Cooking with Chef Kaesavan',
    eyebrow: 'Indian cooking class',
    description: 'An Indian cooking-class experience with Chef Kaesavan.',
    availabilityNote: 'Contact Lagnaa...barefoot dining to register interest and ask for current class details.',
    image: chefCooking,
    imageAlt: 'Chef Kaesavan leading a cooking session at Lagnaa...barefoot dining.',
    officialDetailsUrl: 'https://www.lagnaa.com/cooking-class',
    detailPath: '/events/cooking-with-chef-kaesavan',
    detailActionLabel: 'Register your interest',
    action: 'contact',
  },
  {
    id: 'rediscover-little-india',
    title: '#RediscoverLittleIndia',
    eyebrow: 'Past cultural experience',
    description: 'A cultural discovery experience created around Little India and its local stories.',
    availabilityNote: 'This experience is presented as a past cultural initiative; its current availability has not been confirmed.',
    image: entranceTeam,
    imageAlt: 'Lagnaa...barefoot dining restaurant entrance with members of the restaurant team.',
    officialDetailsUrl: 'https://www.lagnaa.com/rediscoverlittleindia',
    detailPath: '/events/rediscover-little-india',
    detailActionLabel: 'View the archive',
    action: 'official-details',
    isPastOrCultural: true,
  },
]

export const experiencesContent = {
  seo: {
    title: 'Dining Experiences | Lagnaa...barefoot dining Singapore',
    description: 'Explore dining experiences at Lagnaa...barefoot dining in Singapore, including Barefoot Dining, the Ultimate Chilli Challenge, food tasting and cooking-class enquiries.',
  },
  hero: {
    eyebrow: 'Events & experiences',
    heading: 'Food, culture and connection at Lagnaa...barefoot dining.',
    description: 'Discover food-focused, cultural and dining experiences at Lagnaa...barefoot dining in Little India.',
    media: {
      subject: 'Dining experience atmosphere',
      detail: 'Wide restaurant-atmosphere photograph that conveys the experience without implying unverified arrangements.',
      format: 'landscape',
      tone: 'plum',
    } satisfies MediaDirection,
  },
  introduction: {
    eyebrow: 'The experience',
    heading: 'Experiences shaped by food and place.',
    paragraphs: [
      'At Lagnaa...barefoot dining, Indian food, flavour and hospitality are experienced together.',
      'Explore the official event details or contact Lagnaa...barefoot dining directly for current information.',
    ],
  },
  barefootMedia: {
    subject: 'Barefoot Dining atmosphere',
    detail: 'Landscape photograph of the dining atmosphere at Lagnaa...barefoot dining, without identifiable guests unless usage is approved.',
    format: 'landscape',
    tone: 'cocoa',
  } satisfies MediaDirection,
  arusuvai: {
    eyebrow: 'Arusuvai',
    heading: 'Food, atmosphere and flavour in conversation.',
    description: 'Arusuvai refers to six flavours. It offers a way to consider balance, contrast and discovery as part of the dining experience at Lagnaa...barefoot dining.',
  },
} as const

/**
 * Page-specific content for Barefoot Dining. Time-sensitive operational details
 * deliberately remain null until Lagnaa...barefoot dining confirms them for this rebuild.
 */
export const barefootDiningPageContent: BarefootDiningPageContent = {
  seo: {
    title: 'Barefoot Dining Experience Singapore | Lagnaa...barefoot dining',
    description: 'Discover Barefoot Dining at Lagnaa...barefoot dining in Little India, Singapore, a signature Indian dining experience shaped by food, hospitality and atmosphere.',
  },
  hero: {
    eyebrow: 'A dining experience at Lagnaa...barefoot dining',
    heading: 'Barefoot Dining',
    description: 'Discover a signature dining experience at Lagnaa...barefoot dining, shaped by Indian food, hospitality and an intimate atmosphere.',
    media: {
      subject: 'Barefoot Dining environment',
      detail: 'Approved interior photograph showing the Barefoot Dining atmosphere; avoid generic bare-feet imagery or unapproved guests.',
      format: 'portrait',
      tone: 'plum',
    },
  },
  introduction: {
    eyebrow: 'The experience',
    heading: 'Food, hospitality and atmosphere around the table.',
    paragraphs: [
      'Barefoot Dining is a signature part of the Lagnaa...barefoot dining experience.',
      'It brings Indian food, warm hospitality and an intimate atmosphere together around the table.',
    ],
  },
  sensory: {
    eyebrow: 'The feel',
    heading: 'A dining experience with its own sense of place.',
    description: 'The experience is shaped by the meeting of food, hospitality and atmosphere.',
  },
  setting: {
    eyebrow: 'The setting',
    heading: 'A considered dining atmosphere.',
    paragraphs: [
      'Barefoot Dining is part of the way Lagnaa...barefoot dining brings food and hospitality together.',
      'For the current experience details, contact Lagnaa...barefoot dining directly or view the booking options before your visit.',
    ],
    media: {
      subject: 'Dining interior at Lagnaa...barefoot dining',
      detail: 'Warm, intimate approved photograph of the Lagnaa...barefoot dining interior, with no unverified seating or footwear details implied.',
      format: 'landscape',
      tone: 'cocoa',
    },
  },
  food: {
    eyebrow: 'Food and flavour',
    heading: 'Explore the menu before you visit.',
    description: 'See Lagnaa...barefoot dining’s current menu online, then return to reserve a table when you are ready.',
    media: {
      subject: 'Indian food at Lagnaa...barefoot dining',
      detail: 'Approved close-up food photograph with no dish name, ingredient, portion or price implied until menu content is confirmed.',
      format: 'square',
      tone: 'ember',
    },
  },
  arusuvai: {
    eyebrow: 'Arusuvai',
    heading: 'Six flavours, considered together.',
    description: 'Arusuvai refers to six flavours. It offers a way to consider balance, contrast and discovery as part of the dining experience at Lagnaa...barefoot dining.',
  },
  moments: {
    eyebrow: 'Moments at Lagnaa...barefoot dining',
    heading: 'A visual study of the experience.',
    media: [
      {
        subject: 'Arrival and atmosphere',
        detail: 'Approved ambient interior image or short reel still; no guests without usage approval.',
        format: 'portrait',
        tone: 'plum',
      },
      {
        subject: 'Food and table detail',
        detail: 'Approved food or table-detail image; no unverified dishes, prices or service sequence implied.',
        format: 'landscape',
        tone: 'saffron',
      },
      {
        subject: 'Evening at Lagnaa...barefoot dining',
        detail: 'Approved warm interior image or reel still that represents the restaurant environment.',
        format: 'portrait',
        tone: 'cocoa',
      },
    ],
  },
  practical: {
    eyebrow: 'Plan your visit',
    heading: 'Reserve a table or speak with Lagnaa...barefoot dining.',
    description: 'For current experience details or a question before booking, contact the restaurant directly.',
  },
  exploreMore: [
    {
      label: 'Dining Experiences',
      href: '/experiences',
      description: 'Explore other ways to dine at Lagnaa...barefoot dining.',
    },
    {
      label: 'Menu',
      href: '/menu',
      description: 'View Lagnaa...barefoot dining’s current menu online.',
    },
    {
      label: 'Our Story',
      href: '/our-story',
      description: 'Discover the food and philosophy behind Lagnaa...barefoot dining.',
    },
  ],
  cta: {
    eyebrow: 'Your table at Lagnaa...barefoot dining',
    heading: 'Plan your Barefoot Dining visit.',
    description: 'Reserve a table or explore the menu before you visit.',
  },
  reservation: {
    method: 'official-booking-page',
    availability: null,
    advanceBookingGuidance: null,
  },
  faqs: [],
}
