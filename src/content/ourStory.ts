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
    heading: 'The people, flavours and rituals behind Lagnaa ...barefoot dinning',
    description: 'In Little India, Lagnaa ...barefoot dinning brings chef-led Indian food, warm hospitality and its signature barefoot dining experience together in one intimate setting.',
    media: {
      subject: 'Lagnaa story hero',
      detail: 'Editorial restaurant interior, hospitality or food-preparation photograph.',
      format: 'portrait',
      tone: 'cocoa',
    } satisfies MediaDirection,
  },
  story: {
    eyebrow: 'Master Chef Kaesavan',
    heading: 'A chef-led story with a taste for doing things differently.',
    paragraphs: [
      'Lagnaa ...barefoot dinning was founded by Master Chef Kaesavan, whose approach to Indian cuisine brings curiosity, generosity and a love of flavour to every table.',
      'A long-time curry and chilli advocate, Chef Kaesavan encourages guests to explore Indian food at their own pace—whether they come for a familiar favourite or a more adventurous challenge.',
      'The result is a restaurant shaped as much by conversation and hospitality as it is by the food itself.',
    ],
    media: {
      subject: 'Lagnaa atmosphere',
      detail: 'Wide dining-room or service photograph with a warm, lived-in atmosphere.',
      format: 'landscape',
      tone: 'plum',
    } satisfies MediaDirection,
  },
  foodPhilosophy: {
    eyebrow: 'What makes Lagnaa different',
    heading: 'Indian food with room for your own palate.',
    paragraphs: [
      'Lagnaa’s menu brings South and North Indian flavours together through Arusuvai—the six flavours that guide balance, contrast and discovery at the table.',
      'Guests can choose a spice level that suits them, share dishes across the table and discover the restaurant’s Curry Shots and Chilli Challenge at their own comfort level.',
      'Alongside the food, Lagnaa’s barefoot dining setting creates an unhurried, intimate way to enjoy a meal in Little India.',
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
    description: 'Arusuvai refers to six flavours. It offers a thoughtful way to approach balance, contrast and discovery across an Indian meal at Lagnaa ...barefoot dinning.',
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
