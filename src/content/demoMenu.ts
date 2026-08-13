import arusuvaiPlatter from '../assets/gallery/lagnaa-arusuvai-platter.jpg'
import elaiKoli from '../assets/gallery/lagnaa-elai-koli.jpg'

export type DemoMenuCategory = string

export type DemoMenuItem = {
  id: string
  category: DemoMenuCategory
  name: string
  description: string
  price?: string
  dietary?: 'Vegetarian' | 'Non-vegetarian'
  spiceLevel?: string
  imageSrc?: string
  imageAlt?: string
  sourceUrl: string
  demo: true
  demoImage: boolean
}

export const demoMenuCategories: readonly { id: DemoMenuCategory; label: string }[] = [
  { id: 'highlights', label: 'Highlights' },
  { id: 'michelin-sets', label: 'MICHELIN Sets' },
  { id: 'chilli-challenge', label: 'Chilli Challenge' },
  { id: 'drinks', label: 'Drinks' },
]

const menuSource = 'https://www.lagnaa.com/menu-1?menu=menu'
const setSource = 'https://www.lagnaa.com/menu-1'
const chilliSource = 'https://www.lagnaa.com/menu-1?menu=chilli-challenge-solo'
const drinksSource = 'https://www.lagnaa.com/menu-1?menu=drinks-menu'
const koliRiceAlt = 'Koli curry leaf with basmati rice served at Lagnaa.'
const sharedPlatterAlt = 'A shared Lagnaa dining platter.'

export const demoMenuItems: readonly DemoMenuItem[] = [
  { id: 'chicken-curry-leaf-rice', category: 'highlights', name: 'Chicken Curry Leaf with Basmati Rice', description: 'A Lagnaa single-meal selection served with fragrant basmati rice.', price: 'S$21', dietary: 'Non-vegetarian', imageSrc: elaiKoli, imageAlt: koliRiceAlt, sourceUrl: menuSource, demo: true, demoImage: false },
  { id: 'butter-chicken-methi-naan', category: 'highlights', name: 'Butter Chicken with Methi Naan', description: 'Butter chicken paired with aromatic methi naan.', price: 'S$28', dietary: 'Non-vegetarian', sourceUrl: menuSource, demo: true, demoImage: false },
  { id: 'mutton-varuval-yoghurt-rice', category: 'highlights', name: 'Mutton Varuval with Yoghurt Rice', description: 'Spiced mutton varuval paired with cooling yoghurt rice.', price: 'S$50', dietary: 'Non-vegetarian', sourceUrl: menuSource, demo: true, demoImage: false },

  { id: 'flexatarian-yogi', category: 'michelin-sets', name: 'Flexatarian Yogi for 2', description: 'Vegetable Pakora, Chicken Tikka, Dory Fish Curry, Yellow Dhal, plain naan and basmati rice.', price: 'S$60', dietary: 'Non-vegetarian', imageSrc: arusuvaiPlatter, imageAlt: sharedPlatterAlt, sourceUrl: setSource, demo: true, demoImage: false },
  { id: 'flexatarian-bogi', category: 'michelin-sets', name: 'Flexatarian Bogi for 2', description: 'Chicken 65, Dory Fish Curry, Butter Chicken, Yellow Dhal, Aloo Palak, naan, basmati rice and saffron rice.', price: 'S$85', dietary: 'Non-vegetarian', sourceUrl: setSource, demo: true, demoImage: false },
  { id: 'flexatarian-thulakki', category: 'michelin-sets', name: 'Flexatarian Thulakki for 2', description: 'Chicken Tikka, Keema Kilangu, Dory Fish Curry, Butter Chicken, Yellow Dhal, Channa Palak, naan and rice.', price: 'S$110', dietary: 'Non-vegetarian', sourceUrl: setSource, demo: true, demoImage: false },
  { id: 'vegetarian-yogi', category: 'michelin-sets', name: 'Vegetarian Yogi for 2', description: 'Vegetable Pakora, Kathri Pachadi, Vegetable Jelfreezi, Yellow Dhal, plain naan and basmati rice.', price: 'S$54', dietary: 'Vegetarian', sourceUrl: setSource, demo: true, demoImage: false },
  { id: 'vegetarian-bogi', category: 'michelin-sets', name: 'Vegetarian Bogi for 2', description: 'Gobi 65, Vegetable Jelfreezi, Paneer Butter Masala, Yellow Dhal, Aloo Palak, naan and rice.', price: 'S$75', dietary: 'Vegetarian', sourceUrl: setSource, demo: true, demoImage: false },
  { id: 'vegetarian-thulakki', category: 'michelin-sets', name: 'Vegetarian Thulakki for 2', description: 'Chilli Gobi, Kathri Pachadi, Vegetable Jelfreezi, Paneer Butter Masala, Yellow Dhal, Channa Palak, naan and rice.', price: 'S$86', dietary: 'Vegetarian', sourceUrl: setSource, demo: true, demoImage: false },

  { id: 'chilli-chicken-curry', category: 'chilli-challenge', name: 'Chicken Curry', description: 'Choose spice level 3–6, served with rice or naan.', price: 'S$33', dietary: 'Non-vegetarian', spiceLevel: 'Levels 3–6', sourceUrl: chilliSource, demo: true, demoImage: false },
  { id: 'chilli-chicken-tikka-masala', category: 'chilli-challenge', name: 'Chicken Tikka Masala', description: 'Choose spice level 3–6, served with rice or naan.', price: 'S$33', dietary: 'Non-vegetarian', spiceLevel: 'Levels 3–6', sourceUrl: chilliSource, demo: true, demoImage: false },
  { id: 'chilli-koli-curry-leaf', category: 'chilli-challenge', name: 'Koli Curry Leaf', description: 'Choose spice level 3–6, served with rice or naan.', price: 'S$33', dietary: 'Non-vegetarian', spiceLevel: 'Levels 3–6', sourceUrl: chilliSource, demo: true, demoImage: false },
  { id: 'chilli-mutton-masala', category: 'chilli-challenge', name: 'Mutton Masala', description: 'Choose spice level 3–6, served with rice or naan.', price: 'S$33', dietary: 'Non-vegetarian', spiceLevel: 'Levels 3–6', sourceUrl: chilliSource, demo: true, demoImage: false },
  { id: 'chilli-keema-kilangu', category: 'chilli-challenge', name: 'Keema Kilangu', description: 'Choose spice level 3–6, served with rice or naan.', price: 'S$33', dietary: 'Non-vegetarian', spiceLevel: 'Levels 3–6', sourceUrl: chilliSource, demo: true, demoImage: false },
  { id: 'chilli-threadfin-fish-curry', category: 'chilli-challenge', name: 'Threadfin Fish Curry', description: 'Choose spice level 3–6, served with rice or naan.', price: 'S$33', dietary: 'Non-vegetarian', spiceLevel: 'Levels 3–6', sourceUrl: chilliSource, demo: true, demoImage: false },
  { id: 'chilli-prawn-masala', category: 'chilli-challenge', name: 'Prawn Masala', description: 'Choose spice level 3–6, served with rice or naan.', price: 'S$33', dietary: 'Non-vegetarian', spiceLevel: 'Levels 3–6', sourceUrl: chilliSource, demo: true, demoImage: false },
  { id: 'chilli-aloo-gobi', category: 'chilli-challenge', name: 'Aloo Gobi', description: 'Choose spice level 3–6, served with rice or naan.', price: 'S$33', dietary: 'Vegetarian', spiceLevel: 'Levels 3–6', sourceUrl: chilliSource, demo: true, demoImage: false },
  { id: 'chilli-vegetable-jelfreezi', category: 'chilli-challenge', name: 'Vegetable Jelfreezi', description: 'Choose spice level 3–6, served with rice or naan.', price: 'S$33', dietary: 'Vegetarian', spiceLevel: 'Levels 3–6', sourceUrl: chilliSource, demo: true, demoImage: false },
  { id: 'chilli-bhindi-masala', category: 'chilli-challenge', name: 'Bhindi Masala', description: 'Choose spice level 3–6, served with rice or naan.', price: 'S$33', dietary: 'Vegetarian', spiceLevel: 'Levels 3–6', sourceUrl: chilliSource, demo: true, demoImage: false },
  { id: 'chilli-channa-masala', category: 'chilli-challenge', name: 'Channa Masala', description: 'Choose spice level 3–6, served with rice or naan.', price: 'S$33', dietary: 'Vegetarian', spiceLevel: 'Levels 3–6', sourceUrl: chilliSource, demo: true, demoImage: false },

  { id: 'mint-lassi', category: 'drinks', name: 'Mint Lassi', description: 'Homemade heirloom yoghurt blended with fresh mint leaves.', price: 'S$8 per glass', dietary: 'Vegetarian', sourceUrl: drinksSource, demo: true, demoImage: false },
  { id: 'mango-lassi', category: 'drinks', name: 'Mango Lassi', description: 'Homemade heirloom yoghurt blended with fresh mango pulp.', price: 'S$8 per glass', dietary: 'Vegetarian', sourceUrl: drinksSource, demo: true, demoImage: false },
  { id: 'lime-lassi', category: 'drinks', name: 'Lime Lassi', description: 'A balanced blend of homemade heirloom yoghurt and fresh lime.', price: 'S$8 per glass', dietary: 'Vegetarian', sourceUrl: drinksSource, demo: true, demoImage: false },
  { id: 'masala-tea', category: 'drinks', name: 'Masala Tea', description: 'Traditional Indian spiced tea, available hot or cold.', price: 'From S$8', dietary: 'Vegetarian', sourceUrl: drinksSource, demo: true, demoImage: false },
  { id: 'indian-coffee', category: 'drinks', name: 'Indian Coffee', description: 'Traditional Bru Indian coffee, available hot or cold.', price: 'From S$6', dietary: 'Vegetarian', sourceUrl: drinksSource, demo: true, demoImage: false },
  { id: 'lime-soda', category: 'drinks', name: 'Lime Soda', description: 'A refreshing lime-based soda.', price: 'S$6', dietary: 'Vegetarian', sourceUrl: drinksSource, demo: true, demoImage: false },
]
