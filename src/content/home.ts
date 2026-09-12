import { restaurantConfig } from '../config/restaurant'

export type MediaDirection = {
  subject: string
  detail: string
  format: 'portrait' | 'landscape' | 'square'
  tone: 'ember' | 'saffron' | 'cocoa' | 'plum'
}

export const homeContent = {
  hero: {
    eyebrow: '',
    heading: 'Experience Lagnaa...barefoot dining. Where shoes wait politely at the steps and flavours dance on your palate.',
    headingLineBreakAfter: 'Experience Lagnaa...barefoot dining.',
    description: '',
    media: {
      subject: 'Hero dining atmosphere',
      detail: 'Wide restaurant interior or expressive food-and-hospitality photograph.',
      format: 'portrait',
      tone: 'plum',
    } satisfies MediaDirection,
  },
  introduction: {
    eyebrow: 'Welcome to Lagnaa...barefoot dining',
    heading: 'Where flavour, tradition and hospitality come together.',
    paragraphs: [
      'Lagnaa...barefoot dining is an Indian restaurant in Little India, Singapore.',
      'Its approach brings Indian cuisine, thoughtful hospitality and a distinctive barefoot dining experience into one intimate setting.',
      'Come to explore flavours, linger over a shared meal and discover the character of Lagnaa...barefoot dining.',
    ],
    media: {
      subject: 'Restaurant welcome',
      detail: 'Vertical photograph of the dining room, entrance or warm hospitality moment.',
      format: 'portrait',
      tone: 'saffron',
    } satisfies MediaDirection,
  },
  barefoot: {
    eyebrow: 'The Lagnaa...barefoot dining experience',
    heading: 'Dining that invites you to slow down.',
    description: 'Barefoot dining is a signature part of the Lagnaa...barefoot dining experience: a more intimate way to encounter Indian food, hospitality and time around the table.',
    media: {
      subject: 'Barefoot dining atmosphere',
      detail: 'Wide, warmly lit photograph that conveys the atmosphere without showing unverified operational details.',
      format: 'landscape',
      tone: 'cocoa',
    } satisfies MediaDirection,
  },
  arusuvai: {
    eyebrow: 'Arusuvai',
    heading: 'Six flavours, considered as one experience.',
    description: 'Arusuvai refers to six flavours. At Lagnaa...barefoot dining, it is an invitation to consider balance, contrast and discovery across an Indian meal.',
  },
  experiences: {
    eyebrow: 'The Lagnaa...barefoot dining Experience',
    heading: 'More than a meal, made to remember.',
    description: 'Discover the dining and cultural experiences that give Lagnaa...barefoot dining its distinctive character.',
    items: [
      {
        title: 'Barefoot Dining',
        description: 'A signature dining experience at Lagnaa...barefoot dining, shaped by food, hospitality and an intimate atmosphere.',
        href: '/experiences/barefoot-dining',
      },
      {
        title: 'The Ultimate Chilli Challenge',
        description: 'Lagnaa...barefoot dining’s signature food challenge for guests who enjoy exploring spice.',
        href: '/experiences/chilli-challenge',
      },
      {
        title: 'Monthly Dégustation',
        description: 'A food-tasting experience for discovering dishes and sharing impressions with the Lagnaa...barefoot dining team.',
        href: '/events/monthly-degustation',
      },
      {
        title: 'Cooking with Chef Kaesavan',
        description: 'An Indian cooking-class experience with Chef Kaesavan.',
        href: '/events/cooking-with-chef-kaesavan',
      },
    ],
    archive: {
      label: '#RediscoverLittleIndia',
      description: 'A past cultural initiative exploring Little India and its local stories.',
      href: '/events/rediscover-little-india',
    },
  },
  food: {
    eyebrow: 'At the table',
    heading: 'Explore Indian flavours.',
    description: 'Discover the menu and the breadth of Lagnaa...barefoot dining’s Indian dining experience.',
    media: [
      {
        subject: 'Hero food composition',
        detail: 'Landscape food photograph with rich colour and natural texture.',
        format: 'landscape',
        tone: 'ember',
      },
      {
        subject: 'Ingredient detail',
        detail: 'Square close-up of spices, ingredients or plating.',
        format: 'square',
        tone: 'saffron',
      },
      {
        subject: 'Shared table',
        detail: 'Portrait food-and-hospitality photograph for an editorial crop.',
        format: 'portrait',
        tone: 'plum',
      },
    ] satisfies MediaDirection[],
  },
  privateDining: {
    eyebrow: 'Gather at Lagnaa...barefoot dining',
    heading: 'For the occasions that bring people together.',
    description: 'From family celebrations to group gatherings and corporate dining, Lagnaa...barefoot dining welcomes enquiries for memorable shared occasions.',
    media: {
      subject: 'Celebration at Lagnaa...barefoot dining',
      detail: 'Atmospheric landscape photograph of a shared table or celebratory gathering with authorised guests.',
      format: 'landscape',
      tone: 'cocoa',
    } satisfies MediaDirection,
  },
  gallery: {
    eyebrow: 'A sense of Lagnaa...barefoot dining',
    heading: 'Food, atmosphere and shared moments.',
    media: [
      {
        subject: 'Indian food photography',
        detail: 'Landscape food photograph for the gallery preview.',
        format: 'landscape',
        tone: 'saffron',
      },
      {
        subject: 'Restaurant atmosphere',
        detail: 'Portrait interior photograph showing warm restaurant light.',
        format: 'portrait',
        tone: 'plum',
      },
      {
        subject: 'Barefoot dining moment',
        detail: 'Square atmosphere photograph with authorised guest usage.',
        format: 'square',
        tone: 'ember',
      },
    ] satisfies MediaDirection[],
  },
} as const

export const homeExperiences = restaurantConfig.experienceLinks
