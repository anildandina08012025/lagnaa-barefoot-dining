import type { MediaDirection } from './home'

type FlavourDetail = {
  name: string
  meaning: string
  description: string
}

export const ourStoryContent = {
  seo: {
    title: 'Our Story | Lagnaa Barefoot Dining Singapore',
    description: 'Discover the food philosophy and barefoot dining experience behind Lagnaa in Little India, Singapore.',
  },
  hero: {
    eyebrow: 'Our Story',
    heading: 'A restaurant shaped by flavour, hospitality and connection.',
    description: 'In Little India, Lagnaa brings Indian food, warm hospitality and its signature barefoot dining experience together in one intimate setting.',
    media: {
      subject: 'Lagnaa story hero',
      detail: 'Editorial restaurant interior, hospitality or food-preparation photograph.',
      format: 'portrait',
      tone: 'cocoa',
    } satisfies MediaDirection,
  },
  story: {
    eyebrow: 'The Lagnaa story',
    heading: 'A setting for Indian food and hospitality.',
    paragraphs: [
      'Lagnaa Barefoot Dining is an Indian restaurant in Little India, Singapore.',
      'Its experience brings Indian cuisine, warm hospitality and a distinctive barefoot dining concept into the same meal.',
      'Each visit begins with a simple invitation: take time to explore flavour, share the table and discover the character of Lagnaa.',
    ],
    media: {
      subject: 'Lagnaa atmosphere',
      detail: 'Wide dining-room or service photograph with a warm, lived-in atmosphere.',
      format: 'landscape',
      tone: 'plum',
    } satisfies MediaDirection,
  },
  foodPhilosophy: {
    eyebrow: 'Food and hospitality',
    heading: 'Indian flavours, served with care.',
    paragraphs: [
      'Indian food is at the centre of the Lagnaa experience.',
      'The menu is an opportunity to explore flavour alongside the hospitality and sense of occasion that shape a meal at the restaurant.',
    ],
    media: {
      subject: 'Food and service',
      detail: 'Portrait food-preparation, plating or thoughtful service photograph.',
      format: 'portrait',
      tone: 'saffron',
    } satisfies MediaDirection,
  },
  arusuvai: {
    eyebrow: 'Arusuvai — six flavours',
    heading: 'A way to consider balance at the table.',
    description: 'Arusuvai refers to six flavours. It offers a thoughtful way to approach balance, contrast and discovery across an Indian meal at Lagnaa.',
    // Add verified flavour names, meanings and descriptions only when client-approved.
    flavours: [] as readonly FlavourDetail[],
  },
  barefoot: {
    eyebrow: 'The barefoot dining philosophy',
    heading: 'An experience with its own sense of place.',
    paragraphs: [
      'Barefoot dining is a signature part of Lagnaa’s approach to the restaurant experience.',
      'It creates an intimate setting for guests to encounter Indian food, hospitality and time around the table.',
    ],
    media: {
      subject: 'Barefoot dining atmosphere',
      detail: 'Landscape restaurant photograph that conveys intimacy without implying unverified operational details.',
      format: 'landscape',
      tone: 'ember',
    } satisfies MediaDirection,
  },
  littleIndia: {
    eyebrow: 'Little India, Singapore',
    heading: 'A dining experience in the heart of Little India.',
    description: 'Lagnaa is located in Little India, Singapore — the setting for its Indian food, warm hospitality and barefoot dining experience.',
  },
} as const
