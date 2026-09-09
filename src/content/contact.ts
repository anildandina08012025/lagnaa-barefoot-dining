export type ContactPageContent = {
  seo: {
    title: string
    description: string
  }
  hero: {
    eyebrow: string
    heading: string
    description: string
  }
  visit: {
    eyebrow: string
    heading: string
  }
  reservations: {
    eyebrow: string
    heading: string
    description: string
  }
  barefootDining: {
    eyebrow: string
    heading: string
    description: string
  }
  individualRequirements: {
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

/** Page copy only. Shared contact facts are read from restaurantConfig. */
export const contactPageContent: ContactPageContent = {
  seo: {
    title: 'Contact Lagnaa Barefoot Dining | Indian Restaurant Singapore',
    description: 'Contact Lagnaa Barefoot Dining in Little India, Singapore, for the address, phone, email and table reservation enquiry details.',
  },
  hero: {
    eyebrow: 'Plan your visit',
    heading: 'Contact & Visit Lagnaa ...barefoot dinning',
    description: 'Reserve a table, find the restaurant or contact Lagnaa before your visit.',
  },
  visit: {
    eyebrow: 'Visit Lagnaa',
    heading: 'The details for your visit.',
  },
  reservations: {
    eyebrow: 'Reservations',
    heading: 'Plan your reservation request.',
    description: 'Send your preferred dining details to Lagnaa ...barefoot dinning. Availability will be confirmed once the reservation system is connected.',
  },
  barefootDining: {
    eyebrow: 'Barefoot Dining',
    heading: 'Discover the Barefoot Dining experience.',
    description: 'Explore the experience before you visit. For current details or a question, contact Lagnaa directly.',
  },
  individualRequirements: {
    eyebrow: 'Before your visit',
    heading: 'Individual requirements',
    description: 'Please call or email Lagnaa before visiting to discuss an individual accessibility or dietary question.',
  },
  explore: [
    { label: 'Explore the Lagnaa Menu', href: '/menu', description: 'View the current menu online.' },
    { label: 'View Dining Experiences', href: '/experiences', description: 'Discover ways to dine at Lagnaa.' },
    { label: 'Discover Barefoot Dining', href: '/experiences/barefoot-dining', description: 'Learn about this signature Lagnaa experience.' },
    { label: 'Read the Story of Lagnaa', href: '/our-story', description: 'Discover the food and philosophy behind Lagnaa.' },
  ],
  cta: {
    eyebrow: 'Your table at Lagnaa',
    heading: 'Plan your visit to Lagnaa ...barefoot dinning',
    description: 'Reserve a table or call Lagnaa before you visit.',
  },
}
