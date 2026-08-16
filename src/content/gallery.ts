import arusuvaiDetailImage from '../assets/gallery/lagnaa-arusuvai-detail.jpg'
import arusuvaiPlatterImage from '../assets/gallery/lagnaa-arusuvai-platter.jpg'
import elaiKoliImage from '../assets/gallery/lagnaa-elai-koli.jpg'
import entranceTeamImage from '../assets/gallery/lagnaa-entrance-team.jpg'
import malaiTikkaImage from '../assets/gallery/lagnaa-malai-tikka.jpg'
import miniPuriImage from '../assets/gallery/lagnaa-mini-puri.jpg'
import nilagiriMuttonKoormaImage from '../assets/gallery/lagnaa-nilagiri-mutton-koorma.jpg'

export type GalleryImage = {
  id: string
  filename: string
  image: string
  alt: string
  width: number
  height: number
  sourcePageUrl: string
  directSourceUrl: string
}

export type GalleryGroup = {
  heading: string
  description: string
  imageIds: readonly string[]
}

export type GalleryPageContent = {
  seo: {
    title: string
    description: string
  }
  hero: {
    eyebrow: string
    heading: string
    description: string
  }
  collection: {
    eyebrow: string
    heading: string
    description: string
  }
  groups: readonly GalleryGroup[]
  images: readonly GalleryImage[]
  cta: {
    eyebrow: string
    heading: string
    description: string
  }
}

/**
 * Every photo is downloaded from an official Lagnaa web page. The source page
 * and direct Wix media URL are retained here for future content maintenance.
 */
export const galleryContent: GalleryPageContent = {
  seo: {
    title: 'Lagnaa Restaurant Gallery | Indian Dining in Little India',
    description: 'View Lagnaa Barefoot Dining photographs showing Indian food, restaurant atmosphere and the Little India setting in Singapore.',
  },
  hero: {
    eyebrow: 'Gallery',
    heading: 'A visual sense of Lagnaa.',
    description: 'Official Lagnaa photographs gathered into a quieter look at the food, welcome and setting behind the restaurant experience.',
  },
  collection: {
    eyebrow: 'From Lagnaa',
    heading: 'Food, place and character.',
    description: 'Browse the approved images currently available for the redesigned website. More interior, table and exterior photography will strengthen this page before launch.',
  },
  groups: [
    {
      heading: 'Little India',
      description: 'The restaurant entrance and neighbourhood-facing welcome.',
      imageIds: ['lagnaa-entrance-team'],
    },
    {
      heading: 'From the Kitchen',
      description: 'Approved food photographs from Lagnaa source pages.',
      imageIds: [
        'lagnaa-arusuvai-platter',
        'lagnaa-arusuvai-detail',
        'lagnaa-elai-koli',
        'lagnaa-nilagiri-mutton-koorma',
        'lagnaa-mini-puri',
        'lagnaa-malai-tikka',
      ],
    },
  ],
  images: [
    {
      id: 'lagnaa-entrance-team',
      filename: 'lagnaa-entrance-team.jpg',
      image: entranceTeamImage,
      alt: 'Lagnaa restaurant entrance with members of the restaurant team.',
      width: 1600,
      height: 1491,
      sourcePageUrl: 'https://www.lagnaa.com/about-lagnaa',
      directSourceUrl: 'https://static.wixstatic.com/media/d32924_6c9d29902ed646d38f0086d775d0f211~mv2.jpg',
    },
    {
      id: 'lagnaa-arusuvai-platter',
      filename: 'lagnaa-arusuvai-platter.jpg',
      image: arusuvaiPlatterImage,
      alt: 'A divided platter of Indian dishes at Lagnaa.',
      width: 1640,
      height: 1093,
      sourcePageUrl: 'https://www.lagnaa.com/',
      directSourceUrl: 'https://static.wixstatic.com/media/d32924_3dae6aa0dc4f4ee59b04355c17d6bd27~mv2.jpg',
    },
    {
      id: 'lagnaa-arusuvai-detail',
      filename: 'lagnaa-arusuvai-detail.jpg',
      image: arusuvaiDetailImage,
      alt: 'A close view of a divided platter of Indian dishes at Lagnaa.',
      width: 1600,
      height: 1066,
      sourcePageUrl: 'https://www.lagnaa.com/arusuvai',
      directSourceUrl: 'https://static.wixstatic.com/media/d32924_dd56f757bad84a8bb16355391d71ebe9~mv2.jpg',
    },
    {
      id: 'lagnaa-elai-koli',
      filename: 'lagnaa-elai-koli.jpg',
      image: elaiKoliImage,
      alt: 'Elai Koli served on a banana leaf.',
      width: 1600,
      height: 1600,
      sourcePageUrl: 'https://www.lagnaa.com/food-tasting',
      directSourceUrl: 'https://static.wixstatic.com/media/d32924_47675902566a4e45aa46b2e260cb4ecb~mv2.jpg',
    },
    {
      id: 'lagnaa-nilagiri-mutton-koorma',
      filename: 'lagnaa-nilagiri-mutton-koorma.jpg',
      image: nilagiriMuttonKoormaImage,
      alt: 'Nilagiri Mutton Koorma in a clay pot.',
      width: 1600,
      height: 1600,
      sourcePageUrl: 'https://www.lagnaa.com/food-tasting',
      directSourceUrl: 'https://static.wixstatic.com/media/d32924_c99826346acb4348951eb168625097b7~mv2.jpg',
    },
    {
      id: 'lagnaa-mini-puri',
      filename: 'lagnaa-mini-puri.jpg',
      image: miniPuriImage,
      alt: 'Mini Puri served with a bowl of sauce.',
      width: 1600,
      height: 1600,
      sourcePageUrl: 'https://www.lagnaa.com/food-tasting',
      directSourceUrl: 'https://static.wixstatic.com/media/d32924_c8563cd294e64cbebf38ee0b1f0a9338~mv2.jpg',
    },
    {
      id: 'lagnaa-malai-tikka',
      filename: 'lagnaa-malai-tikka.jpg',
      image: malaiTikkaImage,
      alt: 'Malai Tikka on a plate.',
      width: 1010,
      height: 1010,
      sourcePageUrl: 'https://www.lagnaa.com/food-tasting',
      directSourceUrl: 'https://static.wixstatic.com/media/d32924_bb7870883b38416e94deae0ffa760383~mv2.jpg',
    },
  ],
  cta: {
    eyebrow: 'Visit Lagnaa',
    heading: 'See it in person.',
    description: 'Reserve a table or plan your visit to Lagnaa in Little India.',
  },
}
