export type RecognitionStatus = 'bib-gourmand' | 'winner' | 'finalist' | 'nominee' | 'participant'

export type AwardRecord = {
  id: string
  type: 'award'
  title: string
  organisation: string
  category: string | null
  recognitionStatus: RecognitionStatus
  recognitionLabel: string
  recipient: string
  date: string | null
  displayDate: string | null
  summary: string
  sourceUrl: string
  sourceLabel: string
  editorialSourceUrl: string | null
  editorialSourceLabel: string | null
  image: null
  logo: null
  imageAlt: null
  featured: boolean
  verified: boolean
  sourceReference: string
}

export type MediaRecord = {
  id: string
  type: 'media'
  title: string
  publication: string
  date: string | null
  displayDate: string | null
  author: string | null
  summary: string
  sourceUrl: string
  sourceLabel: string
  image: null
  logo: null
  imageAlt: null
  featured: boolean
  verified: boolean
  sourceReference: string
}

export type AwardsMediaPageContent = {
  seo: {
    title: string
    description: string
  }
  hero: {
    eyebrow: string
    heading: string
    description: string
  }
  introduction: {
    eyebrow: string
    heading: string
    description: string
  }
  awards: readonly AwardRecord[]
  media: readonly MediaRecord[]
  enquiries: {
    eyebrow: string
    heading: string
    description: string
  }
  explore: readonly {
    label: string
    href: string
    description: string
  }[]
  cta: {
    eyebrow: string
    heading: string
    description: string
  }
}

/**
 * Publicly displayable recognition and media records only. Internal source
 * references and verification flags support maintenance and are never rendered.
 */
export const awardsMediaContent: AwardsMediaPageContent = {
  seo: {
    title: 'Awards & Media | Lagnaa...barefoot dining',
    description: 'Explore the recognition currently verified for Lagnaa...barefoot dining and visit its original source.',
  },
  hero: {
    eyebrow: 'Recognition & coverage',
    heading: 'Awards & Media',
    description: 'An overview of Lagnaa...barefoot dining’s awards and media recognition, with links to the original sources.',
  },
  introduction: {
    eyebrow: 'Recognition',
    heading: 'A source-led record.',
    description: 'Lagnaa...barefoot dining’s published recognition is presented here with care, preserving the status and source behind each record.',
  },
  awards: [
    {
      id: 'michelin-guide-behind-the-bib-lagnaa',
      type: 'award',
      title: 'Michelin Bib Gourmand',
      organisation: 'MICHELIN Guide',
      category: null,
      recognitionStatus: 'bib-gourmand',
      recognitionLabel: 'Bib Gourmand',
      recipient: 'Lagnaa...barefoot dining',
      date: null,
      displayDate: '2016–2019 · 2021–2026',
      summary: 'Lagnaa...barefoot dining has been recognised by the MICHELIN Guide with the Bib Gourmand distinction across the years shown.',
      sourceUrl: 'https://guide.michelin.com/sg/en/singapore-region/singapore/restaurant/lagnaa',
      sourceLabel: 'View the official MICHELIN Guide listing',
      editorialSourceUrl: 'https://guide.michelin.com/sg/en/article/features/behind-the-bib-lagnaa',
      editorialSourceLabel: 'Read the Behind the Bib feature',
      image: null,
      logo: null,
      imageAlt: null,
      featured: true,
      verified: true,
      sourceReference: 'Official MICHELIN Guide Lagnaa...barefoot dining restaurant listing; Behind the Bib editorial feature retained as a secondary source',
    },
  ],
  media: [
    {
      id: 'mimi-kirk-mention',
      type: 'media',
      title: 'Mimi Kirk recommendation',
      publication: 'Mimi Kirk',
      date: null,
      displayDate: null,
      author: 'Mimi Kirk',
      summary: 'Mimi Kirk describes Lagnaa...barefoot dining as her favourite Indian restaurant in Singapore in a Washington Post travel feature.',
      sourceUrl: 'https://www.washingtonpost.com/lifestyle/travel/searching-for-the-quirky-side-of-singapore/2013/02/07/f14c2db2-6a70-11e2-95b3-272d604a10a3_story.html',
      sourceLabel: 'Read the Washington Post feature',
      image: null,
      logo: null,
      imageAlt: null,
      featured: false,
      verified: true,
      sourceReference: 'The Washington Post travel feature by Mimi Kirk',
    },
  ],
  enquiries: {
    eyebrow: 'Media enquiries',
    heading: 'Contact Lagnaa...barefoot dining.',
    description: 'For a media-related question, contact Lagnaa...barefoot dining directly.',
  },
  explore: [
    { label: 'Read the Story of Lagnaa...barefoot dining', href: '/our-story', description: 'Discover the food and philosophy behind Lagnaa...barefoot dining.' },
    { label: 'Explore the Lagnaa...barefoot dining Menu', href: '/menu', description: 'View the current menu online.' },
    { label: 'View Dining Experiences', href: '/experiences', description: 'Discover ways to dine at Lagnaa...barefoot dining.' },
    { label: 'Discover Barefoot Dining', href: '/experiences/barefoot-dining', description: 'Learn about this signature Lagnaa...barefoot dining experience.' },
    { label: 'Contact & Visit Lagnaa...barefoot dining', href: '/contact', description: 'Plan your visit or contact the restaurant.' },
  ],
  cta: {
    eyebrow: 'Discover Lagnaa...barefoot dining',
    heading: 'Discover Lagnaa...barefoot dining for yourself.',
    description: 'Explore the menu or reserve a table before your visit.',
  },
}
