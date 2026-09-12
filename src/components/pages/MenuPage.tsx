import { demoMenuItems, type DemoMenuItem } from '../../content/demoMenu'
import { publishedMenus } from '../../content/menu'
import { restaurantConfig } from '../../config/restaurant'
import brinjalCurryImage from '../../assets/menu/brinjal-curry.webp'
import butterChickenMethiNaanImage from '../../assets/menu/butter-chicken-methi-naan.webp'
import chickenBiryaniImage from '../../assets/menu/chicken-biryani.webp'
import chickenTikkaImage from '../../assets/menu/chicken-tikka.webp'
import freshLemonMintCoolerImage from '../../assets/menu/fresh-lemon-mint-cooler.webp'
import gobi65Image from '../../assets/menu/gobi-65.webp'
import kathriPachadiImage from '../../assets/menu/kathri-pachadi.webp'
import koliCurryLeafImage from '../../assets/menu/koli-curry-leaf.webp'
import mushroomMasalaMethiNaanImage from '../../assets/menu/mushroom-masala-methi-naan.webp'
import muttonVaruvalYoghurtRiceImage from '../../assets/menu/mutton-varuval-yoghurt-rice.webp'
import palakPaneerGarlicNaanImage from '../../assets/menu/palak-paneer-garlic-naan.webp'
import { Container } from '../layout/Container'
import { PageMetadata } from '../seo/PageMetadata'
import { InteractiveMenuList } from '../ui/InteractiveMenuList'
import { CtaSection } from '../ui/CtaSection'
import { SectionHeading } from '../ui/SectionHeading'

const menuSeoSections = [
  {
    title: 'Naan',
    copy: <>Looking for naan in Singapore? Lagnaa...barefoot dining’s <a href="/menu">Indian food menu</a> includes plain naan, butter naan, garlic naan, cheese naan, peshwari naan, methi naan and other Indian bread options that can be paired with curries or shared dishes.</>,
  },
  {
    title: 'Biryani',
    copy: <>Lagnaa...barefoot dining’s biryani menu includes chicken biryani, mutton biryani, fish biryani and vegetarian biryani prepared with fragrant basmati rice. Menu details can be confirmed directly with Lagnaa...barefoot dining before your visit.</>,
  },
  {
    title: 'Butter chicken',
    copy: <>Butter chicken appears across Lagnaa...barefoot dining’s menu as a curry option and in selected meal combinations, including pairings with naan. It is a useful starting point for guests looking for familiar North Indian flavours.</>,
  },
  {
    title: 'Tandoori dishes',
    copy: <>For tandoori food, Lagnaa...barefoot dining’s menu includes tandoor samplers, paneer tikka, garlic fish tikka, chicken tikka and sheek kebab. These dishes support a shared-table style of dining.</>,
  },
  {
    title: 'Vegetarian Indian food',
    copy: <>Looking for <a href="/best-indian-food-singapore">vegetarian Indian food in Singapore</a>? Lagnaa...barefoot dining’s menu includes vegetable curries, paneer dishes, dhal, naan, rice-based options and vegetarian biryani. Current availability can be confirmed directly with Lagnaa...barefoot dining.</>,
  },
  {
    title: 'Curry',
    copy: <>Lagnaa...barefoot dining’s curry selections include chicken, seafood, mutton and vegetable options, with dishes such as butter chicken, chicken curry leaf, threadfin fish curry, vegetable koorma, dhal and channa masala.</>,
  },
  {
    title: 'Spicy Indian food',
    copy: <>For spicy Indian food, Lagnaa...barefoot dining is known for spice-led exploration through its <a href="/experiences/chilli-challenge">Ultimate Chilli Challenge</a> dishes and curry shots. Spice preferences should be discussed directly with Lagnaa...barefoot dining before choosing a challenge level.</>,
  },
  {
    title: 'Lassi',
    copy: <>Lagnaa...barefoot dining’s drinks menu includes lassi options such as mint lassi, mango lassi, lime lassi and classic lassi, offering a cooling drink alongside Indian dishes.</>,
  },
  {
    title: 'Chilli challenge dishes',
    copy: <>The <a href="/chilli-challenge-singapore">chilli challenge menu</a> includes curry and masala options across chicken, mutton, seafood and vegetarian dishes. Challenge details can change, so guests should confirm current participation details directly with Lagnaa...barefoot dining.</>,
  },
]

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function getMenuPreviewImage(itemName: string) {
  const name = itemName.trim().toLowerCase()

  if (name.includes('butter chicken')) {
    return { src: butterChickenMethiNaanImage, alt: 'Butter chicken with methi naan at Lagnaa...barefoot dining.' }
  }

  if (name.includes('mutton varuval')) {
    return { src: muttonVaruvalYoghurtRiceImage, alt: 'Mutton varuval with yoghurt rice at Lagnaa...barefoot dining.' }
  }

  if (name.includes('chicken biryani')) {
    return { src: chickenBiryaniImage, alt: 'Chicken biryani served at Lagnaa...barefoot dining.' }
  }

  if (name.includes('chicken tikka')) {
    return { src: chickenTikkaImage, alt: 'Chicken tikka served at Lagnaa...barefoot dining.' }
  }

  if (name.includes('gobi 65')) {
    return { src: gobi65Image, alt: 'Gobi 65 served at Lagnaa...barefoot dining.' }
  }

  if (name.includes('kathri pachadi')) {
    return { src: kathriPachadiImage, alt: 'Kathri pachadi with basmati rice at Lagnaa...barefoot dining.' }
  }

  if (name.includes('koli curry leaf') || name.includes('chicken curry leaf')) {
    return { src: koliCurryLeafImage, alt: 'Koli curry leaf with basmati rice at Lagnaa...barefoot dining.' }
  }

  if (name.includes('palak paneer')) {
    return { src: palakPaneerGarlicNaanImage, alt: 'Palak paneer with garlic naan at Lagnaa...barefoot dining.' }
  }

  if (name.includes('mushroom masala')) {
    return { src: mushroomMasalaMethiNaanImage, alt: 'Mushroom masala with methi naan at Lagnaa...barefoot dining.' }
  }

  if (name.includes('brinjal curry')) {
    return { src: brinjalCurryImage, alt: 'Brinjal curry served at Lagnaa...barefoot dining.' }
  }

  if (name.includes('fresh lemon mint cooler')) {
    return { src: freshLemonMintCoolerImage, alt: 'Fresh lemon mint cooler at Lagnaa...barefoot dining.' }
  }

  return undefined
}

function buildUnifiedMenuItems(): readonly DemoMenuItem[] {
  const featuredItems = demoMenuItems
    .filter((item) => item.category === 'michelin-sets' || item.category === 'chilli-challenge' || item.category === 'full-moon-challenge')
    .map(({ imageSrc: _existingImageSrc, imageAlt: _existingImageAlt, ...item }) => {
      const previewImage = getMenuPreviewImage(item.name)
      return {
        ...item,
        section: item.section ?? item.category,
        sectionLabel: item.sectionLabel ?? (item.category === 'chilli-challenge'
          ? 'Chilli Challenge'
          : item.category === 'full-moon-challenge'
            ? 'Full Moon Challenge'
            : 'Highlights'),
        ...(previewImage ? { imageSrc: previewImage.src, imageAlt: previewImage.alt } : {}),
        demoImage: Boolean(previewImage),
      } satisfies DemoMenuItem
    })

  const publishedItems = publishedMenus.flatMap((menu) => (
    menu.sections.flatMap((section, sectionIndex) => {
      const matchingSectionNames = menu.sections.filter((candidate) => candidate.name === section.name).length
      const defaultSectionLabel = matchingSectionNames > 1 && section.description
        ? `${section.name} · ${section.description}`
        : section.name

      return section.items.map((item, index) => {
        const michelinSetGroup = menu.slug === 'copy-of--michelin-set-meal--draft'
          ? item.name.startsWith('Vegetarian')
            ? 'Vegetarian MICHELIN Set for 4 pax'
            : 'Flexatarian MICHELIN Set for 4 pax'
          : undefined
        const sectionLabel = michelinSetGroup ?? defaultSectionLabel
        const sectionId = michelinSetGroup
          ? `${menu.slug}-${slugify(michelinSetGroup)}`
          : `${menu.slug}-${slugify(section.name)}-${sectionIndex}`
        const priceOptions = item.variants?.map((variant) => ({
          label: variant.name === '-' ? '' : variant.name,
          price: variant.price,
        }))
        const previewImage = getMenuPreviewImage(item.name)
        return {
          id: `${menu.slug}-${slugify(section.name)}-${slugify(item.name)}-${index}`,
          category: menu.slug,
          section: sectionId,
          sectionLabel,
          name: item.name,
          description: item.description ?? section.description ?? section.name,
          price: item.price,
          priceOptions,
          ...(previewImage ? { imageSrc: previewImage.src, imageAlt: previewImage.alt } : {}),
          sourceUrl: `https://www.lagnaa.com/menu-1?location=Upper+Dickson+Road&menu=${menu.slug}`,
          demo: true,
          demoImage: Boolean(previewImage),
        } satisfies DemoMenuItem
      })
    })
  ))

  return [...featuredItems, ...publishedItems]
}

const unifiedMenuCategories = [
  { id: 'copy-of--michelin-set-meal--draft', label: 'Michelin Set – 4 Pax' },
  { id: 'michelin-sets', label: 'Michelin Set – 2 Pax' },
  { id: 'single-meals--draft', label: 'Single Meal' },
  { id: 'new-menu-draft', label: 'À La Carte' },
  { id: 'biryani--draft', label: 'Biryani' },
  { id: 'kids-meals--draft', label: 'Kids’ Meal' },
  { id: 'drinks-menu-1', label: 'Drinks Menu' },
  { id: 'chilli-challenge', label: 'Chilli Challenge' },
  { id: 'full-moon-challenge', label: 'Full Moon Challenge' },
] as const

const unifiedMenuItems = buildUnifiedMenuItems()

export function MenuPage() {
  const canonicalUrl = restaurantConfig.siteUrl ? `${restaurantConfig.siteUrl.replace(/\/$/, '')}/menu` : undefined

  return (
    <main id="main-content">
      <PageMetadata
        title="Indian Food Menu | Lagnaa...barefoot dining Singapore"
        description="Explore Lagnaa...barefoot dining’s Indian food menu in Singapore, including naan, biryani, curries, tandoori dishes, lassi and chilli challenge dishes."
        canonicalUrl={canonicalUrl}
      />
      <article>
        <section className="menu-demo-hero" aria-labelledby="menu-heading">
          <Container className="menu-demo-hero__content">
            <p className="eyebrow">A Taste of Lagnaa...barefoot dining</p>
            <h1 className="menu-demo-hero__heading" id="menu-heading">Explore Our Menu</h1>
            <p>Discover vibrant Indian flavours shaped by the six tastes of Arusuvai—from comforting classics to Lagnaa...barefoot dining’s celebrated chilli challenge.</p>
          </Container>
        </section>

        <section className="menu-demo-section" aria-label="Explore the menu">
          <Container>
            <InteractiveMenuList categories={unifiedMenuCategories} items={unifiedMenuItems} />
          </Container>
        </section>

        <section className="menu-seo-section" aria-labelledby="menu-seo-heading">
          <Container>
            <SectionHeading
              eyebrow="Menu discovery"
              heading="Explore Indian favourites at Lagnaa...barefoot dining."
              description="These short guides help visitors find common Indian food searches while keeping menu details clear and confirmable before a visit."
              id="menu-seo-heading"
            />
            <div className="menu-seo-grid">
              {menuSeoSections.map((section) => (
                <section className="menu-seo-card" data-site-scroll-scene key={section.title}>
                  <h2>{section.title}</h2>
                  <p>{section.copy}</p>
                </section>
              ))}
            </div>
          </Container>
        </section>

      </article>
      <CtaSection
        eyebrow="Continue your visit"
        heading="Plan your table at Lagnaa...barefoot dining."
        description="Explore the menu, then reserve a table or contact Lagnaa...barefoot dining with questions before your visit."
        primaryAction={{ label: 'Reserve a Table', href: restaurantConfig.links.reservation }}
        secondaryAction={{ label: 'Plan Your Visit', href: '/contact', variant: 'outline' }}
      />
    </main>
  )
}
