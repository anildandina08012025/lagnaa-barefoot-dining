export type RecognitionType =
  | 'Recognition'
  | 'Media mention'
  | 'Editorial mention'
  | 'Travel-guide mention'
  | 'Tourism-guide mention'
  | 'Travel-platform mention'

export type RecognitionVerificationStatus = 'verified' | 'excluded'

export interface RecognitionItem {
  id: string
  name: string
  type: RecognitionType
  destinationUrl: string
  accessibleLabel: string
  actionLabel: string
  logoSrc?: string
  logoAlt?: string
  sourcePage: string
  verificationStatus: RecognitionVerificationStatus
  featured: boolean
}

// This is an internal source register. Only verified, featured entries are rendered.
// Logos are sourced from Lagnaa...barefoot dining's published Awards & Mentions page.
export const recognitionItems: RecognitionItem[] = [
  {
    id: 'cnn-travel',
    name: 'CNN Travel',
    type: 'Media mention',
    destinationUrl: 'https://edition.cnn.com/travel/article/things-to-do-singapore/index.html',
    accessibleLabel: 'Read the CNN Travel feature mentioning Lagnaa...barefoot dining',
    actionLabel: 'Read feature',
    logoSrc: cnnTravelLogo,
    logoAlt: 'CNN Travel logo',
    sourcePage: 'https://edition.cnn.com/travel/article/things-to-do-singapore/index.html',
    verificationStatus: 'verified',
    featured: true,
  },
  {
    id: 'michelin-guide',
    name: 'MICHELIN Guide',
    type: 'Recognition',
    destinationUrl: 'https://guide.michelin.com/sg/en/singapore-region/singapore/restaurant/lagnaa',
    accessibleLabel: 'View Lagnaa...barefoot dining’s official MICHELIN Guide listing',
    actionLabel: 'View official listing',
    logoSrc: michelinGuideLogo,
    logoAlt: 'MICHELIN Guide logo',
    sourcePage: 'https://guide.michelin.com/sg/en/singapore-region/singapore/restaurant/lagnaa',
    verificationStatus: 'verified',
    featured: true,
  },
  {
    id: 'lonely-planet',
    name: 'Lonely Planet',
    type: 'Travel-guide mention',
    destinationUrl: 'https://www.lonelyplanet.com/singapore/restaurants/lagnaa-barefoot-dining/a/poi-eat/1490332/357350',
    accessibleLabel: 'View Lagnaa...barefoot dining on Lonely Planet',
    actionLabel: 'View travel guide',
    logoSrc: lonelyPlanetLogo,
    logoAlt: 'Lonely Planet logo',
    sourcePage: 'https://www.lonelyplanet.com/singapore/restaurants/lagnaa-barefoot-dining/a/poi-eat/1490332/357350',
    verificationStatus: 'verified',
    featured: true,
  },
  {
    id: 'tripadvisor',
    name: 'Tripadvisor',
    type: 'Recognition',
    destinationUrl: 'https://www.tripadvisor.com.sg/Restaurant_Review-g294265-d858408-Reviews-Lagnaa_barefoot_dining-Singapore.html',
    accessibleLabel: 'View Lagnaa...barefoot dining on Tripadvisor',
    actionLabel: 'View Tripadvisor listing',
    logoSrc: tripadvisorLogo,
    logoAlt: 'Tripadvisor logo',
    sourcePage: 'https://www.tripadvisor.com.sg/Restaurant_Review-g294265-d858408-Reviews-Lagnaa_barefoot_dining-Singapore.html',
    verificationStatus: 'verified',
    featured: true,
  },
  {
    id: 'arukikata',
    name: 'Arukikata',
    type: 'Travel-guide mention',
    destinationUrl: 'https://www.arukikata.com/',
    accessibleLabel: 'View Lagnaa...barefoot dining’s Arukikata listing',
    actionLabel: 'View Arukikata listing',
    logoSrc: arukikataLogo,
    logoAlt: 'Arukikata logo',
    sourcePage: 'https://www.arukikata.com/',
    verificationStatus: 'verified',
    featured: true,
  },
  {
    id: 'visit-singapore',
    name: 'Visit Singapore',
    type: 'Tourism-guide mention',
    destinationUrl: 'https://www.visitsingapore.com/singapore-itineraries/3-days-of-local-delights/',
    accessibleLabel: 'View the Visit Singapore guide mentioning Lagnaa...barefoot dining',
    actionLabel: 'View tourism guide',
    logoSrc: visitSingaporeLogo,
    logoAlt: 'Visit Singapore logo',
    sourcePage: 'https://www.visitsingapore.com/singapore-itineraries/3-days-of-local-delights/',
    verificationStatus: 'verified',
    featured: true,
  },
  {
    id: 'her-world',
    name: 'Her World',
    type: 'Media mention',
    destinationUrl: 'https://www.herworld.com/solutions/6-restaurants-singapore-spicy-food-lovers-must-visit',
    accessibleLabel: 'Read the Her World feature mentioning Lagnaa...barefoot dining',
    actionLabel: 'Read feature',
    logoSrc: herWorldLogo,
    logoAlt: 'Her World logo',
    sourcePage: 'https://www.herworld.com/solutions/6-restaurants-singapore-spicy-food-lovers-must-visit',
    verificationStatus: 'verified',
    featured: true,
  },
  {
    id: 'ladyironchef',
    name: 'LadyIronChef',
    type: 'Editorial mention',
    destinationUrl: 'https://www.ladyironchef.com/2018/06/spicy-food-challenge-singapore/',
    accessibleLabel: 'Read the LadyIronChef feature mentioning Lagnaa...barefoot dining',
    actionLabel: 'Read feature',
    logoSrc: ladyIronChefLogo,
    logoAlt: 'LadyIronChef logo',
    sourcePage: 'https://www.ladyironchef.com/2018/06/spicy-food-challenge-singapore/',
    verificationStatus: 'verified',
    featured: true,
  },
  {
    id: 'the-smart-local',
    name: 'TheSmartLocal',
    type: 'Editorial mention',
    destinationUrl: 'https://thesmartlocal.com/read/spicy-food-challenges/',
    accessibleLabel: 'Read TheSmartLocal feature mentioning Lagnaa...barefoot dining',
    actionLabel: 'Read feature',
    logoSrc: theSmartLocalLogo,
    logoAlt: 'TheSmartLocal logo',
    sourcePage: 'https://thesmartlocal.com/read/spicy-food-challenges/',
    verificationStatus: 'verified',
    featured: true,
  },
  {
    id: 'sethlui',
    name: 'SETHLUI.com',
    type: 'Editorial mention',
    destinationUrl: 'https://sethlui.com/best-naan-singapore/',
    accessibleLabel: 'Read the SETHLUI.com feature mentioning Lagnaa...barefoot dining',
    actionLabel: 'Read feature',
    logoSrc: sethluiLogo,
    logoAlt: 'SethLui logo',
    sourcePage: 'https://sethlui.com/best-naan-singapore/',
    verificationStatus: 'verified',
    featured: true,
  },
  {
    id: 'straits-times',
    name: 'The Straits Times',
    type: 'Media mention',
    destinationUrl: 'https://www.straitstimes.com/travel/singapoliday-staycation-deals-hotels-little-india',
    accessibleLabel: 'Read The Straits Times feature mentioning Lagnaa...barefoot dining',
    actionLabel: 'Read feature',
    logoSrc: straitsTimesLogo,
    logoAlt: 'The Straits Times logo',
    sourcePage: 'https://www.straitstimes.com/travel/singapoliday-staycation-deals-hotels-little-india',
    verificationStatus: 'verified',
    featured: true,
  },
  {
    id: 'singapore-womens-weekly',
    name: 'The Singapore Women’s Weekly',
    type: 'Media mention',
    destinationUrl: 'https://www.womensweekly.com.sg/food/8-spicy-dishes-feel-the-heat',
    accessibleLabel: 'Read The Singapore Women’s Weekly feature mentioning Lagnaa...barefoot dining',
    actionLabel: 'Read feature',
    logoSrc: singaporeWomensWeeklyLogo,
    logoAlt: 'The Singapore Women’s Weekly logo',
    sourcePage: 'https://www.womensweekly.com.sg/food/8-spicy-dishes-feel-the-heat',
    verificationStatus: 'verified',
    featured: true,
  },
  {
    id: 'shopback',
    name: 'ShopBack',
    type: 'Editorial mention',
    destinationUrl: 'https://www.shopback.sg/blog/10-spiciest-food-in-singapore-and-where-to-find-them',
    accessibleLabel: 'Read the ShopBack feature mentioning Lagnaa...barefoot dining',
    actionLabel: 'Read feature',
    logoSrc: shopbackLogo,
    logoAlt: 'ShopBack logo',
    sourcePage: 'https://www.shopback.sg/blog/10-spiciest-food-in-singapore-and-where-to-find-them',
    verificationStatus: 'verified',
    featured: false,
  },
  {
    id: 'ctrip',
    name: '攜程美食林 2019',
    type: 'Travel-platform mention',
    destinationUrl: 'https://gs.ctrip.com/html5/you/foods/fooddetail/53/9483135.html',
    accessibleLabel: 'View Lagnaa...barefoot dining on 攜程美食林 2019',
    actionLabel: 'View listing',
    logoSrc: ctripLogo,
    logoAlt: '攜程美食林 logo',
    sourcePage: 'https://gs.ctrip.com/html5/you/foods/fooddetail/53/9483135.html',
    verificationStatus: 'verified',
    featured: false,
  },
]

export const featuredRecognitionItems = recognitionItems.filter(
  (item) => item.verificationStatus === 'verified' && item.featured,
)
import cnnTravelLogo from '../assets/recognition/cnn-travel.jpg'
import herWorldLogo from '../assets/recognition/her-world.jpg'
import ladyIronChefLogo from '../assets/recognition/ladyironchef.jpeg'
import lonelyPlanetLogo from '../assets/recognition/lonely-planet.png'
import michelinGuideLogo from '../assets/recognition/michelin-guide-header.webp'
import sethluiLogo from '../assets/recognition/sethlui.jpg'
import singaporeWomensWeeklyLogo from '../assets/recognition/singapore-womens-weekly.jpg'
import straitsTimesLogo from '../assets/recognition/straits-times.jfif'
import theSmartLocalLogo from '../assets/recognition/the-smart-local.jpg'
import visitSingaporeLogo from '../assets/recognition/visit-singapore.jpg'
import tripadvisorLogo from '../assets/recognition/tripadvisor.webp'
import arukikataLogo from '../assets/recognition/arukikata.jpg'
import ctripLogo from '../assets/recognition/ctrip.png'
import shopbackLogo from '../assets/recognition/shopback.png'
