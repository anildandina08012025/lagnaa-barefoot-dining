import { demoMenuItems, type DemoMenuItem } from '../../content/demoMenu'
import { publishedMenus } from '../../content/menu'
import { restaurantConfig } from '../../config/restaurant'
import arusuvaiPlatterImage from '../../assets/gallery/lagnaa-arusuvai-platter.jpg'
import arusuvaiDetailImage from '../../assets/gallery/lagnaa-arusuvai-detail.jpg'
import elaiKoliImage from '../../assets/gallery/lagnaa-elai-koli.jpg'
import malaiTikkaImage from '../../assets/gallery/lagnaa-malai-tikka.jpg'
import miniPuriImage from '../../assets/gallery/lagnaa-mini-puri.jpg'
import nilagiriMuttonKoormaImage from '../../assets/gallery/lagnaa-nilagiri-mutton-koorma.jpg'
import { Container } from '../layout/Container'
import { PageMetadata } from '../seo/PageMetadata'
import { InteractiveMenuList } from '../ui/InteractiveMenuList'
import { CtaSection } from '../ui/CtaSection'
import { SectionHeading } from '../ui/SectionHeading'

const menuSeoSections = [
  {
    title: 'Naan',
    copy: <>Looking for naan in Singapore? Lagnaa’s <a href="/menu">Indian food menu</a> includes plain naan, butter naan, garlic naan, cheese naan, peshwari naan, methi naan and other Indian bread options that can be paired with curries or shared dishes.</>,
  },
  {
    title: 'Biryani',
    copy: <>Lagnaa’s biryani menu includes chicken biryani, mutton biryani, fish biryani and vegetarian biryani prepared with fragrant basmati rice. Menu details can be confirmed directly with Lagnaa before your visit.</>,
  },
  {
    title: 'Butter chicken',
    copy: <>Butter chicken appears across Lagnaa’s menu as a curry option and in selected meal combinations, including pairings with naan. It is a useful starting point for guests looking for familiar North Indian flavours.</>,
  },
  {
    title: 'Tandoori dishes',
    copy: <>For tandoori food, Lagnaa’s menu includes tandoor samplers, paneer tikka, garlic fish tikka, chicken tikka and sheek kebab. These dishes support a shared-table style of dining.</>,
  },
  {
    title: 'Vegetarian Indian food',
    copy: <>Looking for <a href="/best-indian-food-singapore">vegetarian Indian food in Singapore</a>? Lagnaa’s menu includes vegetable curries, paneer dishes, dhal, naan, rice-based options and vegetarian biryani. Current availability can be confirmed directly with Lagnaa.</>,
  },
  {
    title: 'Curry',
    copy: <>Lagnaa’s curry selections include chicken, seafood, mutton and vegetable options, with dishes such as butter chicken, chicken curry leaf, threadfin fish curry, vegetable koorma, dhal and channa masala.</>,
  },
  {
    title: 'Spicy Indian food',
    copy: <>For spicy Indian food, Lagnaa is known for spice-led exploration through its <a href="/experiences/chilli-challenge">Ultimate Chilli Challenge</a> dishes and curry shots. Spice preferences should be discussed directly with Lagnaa before choosing a challenge level.</>,
  },
  {
    title: 'Lassi',
    copy: <>Lagnaa’s drinks menu includes lassi options such as mint lassi, mango lassi, lime lassi and classic lassi, offering a cooling drink alongside Indian dishes.</>,
  },
  {
    title: 'Chilli challenge dishes',
    copy: <>The <a href="/chilli-challenge-singapore">chilli challenge menu</a> includes curry and masala options across chicken, mutton, seafood and vegetarian dishes. Challenge details can change, so guests should confirm current participation details directly with Lagnaa.</>,
  },
]

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function formatVariantPrice(variants: readonly { name: string; price: string }[] | undefined) {
  if (!variants?.length) return undefined
  return variants.map((variant) => {
    const label = variant.name === '-' ? '' : `${variant.name} `
    return `${label}${variant.price}`.trim()
  }).join(' / ')
}

function getMenuPreviewImage(menuSlug: string, sectionName: string, itemName: string) {
  const searchable = `${menuSlug} ${sectionName} ${itemName}`.toLowerCase()

  if (searchable.includes('drink') || searchable.includes('lassi') || searchable.includes('tea') || searchable.includes('coffee') || searchable.includes('juice')) {
    return { src: miniPuriImage, alt: 'A close-up Lagnaa food and table detail used as a menu preview.' }
  }

  if (searchable.includes('tandoor') || searchable.includes('tikka') || searchable.includes('kebab')) {
    return { src: malaiTikkaImage, alt: 'A Lagnaa grilled dish used as a menu preview.' }
  }

  if (searchable.includes('mutton') || searchable.includes('koorma') || searchable.includes('masala')) {
    return { src: nilagiriMuttonKoormaImage, alt: 'A Lagnaa curry dish used as a menu preview.' }
  }

  if (searchable.includes('biryani') || searchable.includes('rice') || searchable.includes('koli') || searchable.includes('chicken')) {
    return { src: elaiKoliImage, alt: 'A Lagnaa dish served on a banana leaf used as a menu preview.' }
  }

  if (searchable.includes('vegetable') || searchable.includes('paneer') || searchable.includes('dhal') || searchable.includes('channa') || searchable.includes('gobi')) {
    return { src: arusuvaiDetailImage, alt: 'A detailed Lagnaa shared platter used as a menu preview.' }
  }

  return { src: arusuvaiPlatterImage, alt: 'A selection of Lagnaa dishes used as a menu preview.' }
}

function buildUnifiedMenuItems(): readonly DemoMenuItem[] {
  const featuredItems = demoMenuItems
    .filter((item) => item.category === 'highlights' || item.category === 'chilli-challenge')
    .map((item) => {
      if (item.imageSrc) return item
      const previewImage = getMenuPreviewImage(item.category, item.category, item.name)
      return {
        ...item,
        imageSrc: previewImage.src,
        imageAlt: previewImage.alt,
        demoImage: true,
      } satisfies DemoMenuItem
    })

  const publishedItems = publishedMenus.flatMap((menu) => (
    menu.sections.flatMap((section) => (
      section.items.map((item, index) => {
        const variantPrice = formatVariantPrice(item.variants)
        const sectionContext = section.description ? `${section.name} — ${section.description}` : section.name
        const previewImage = getMenuPreviewImage(menu.slug, section.name, item.name)
        return {
          id: `${menu.slug}-${slugify(section.name)}-${slugify(item.name)}-${index}`,
          category: menu.slug,
          name: item.name,
          description: item.description ? `${item.description} · ${sectionContext}` : sectionContext,
          price: item.price ?? variantPrice,
          imageSrc: previewImage.src,
          imageAlt: previewImage.alt,
          sourceUrl: `https://www.lagnaa.com/menu-1?location=Upper+Dickson+Road&menu=${menu.slug}`,
          demo: true,
          demoImage: true,
        } satisfies DemoMenuItem
      })
    ))
  ))

  return [...featuredItems, ...publishedItems]
}

const unifiedMenuCategories = [
  { id: 'highlights', label: 'Highlights' },
  ...publishedMenus.map((menu) => ({ id: menu.slug, label: menu.name })),
  { id: 'chilli-challenge', label: 'Chilli Challenge' },
] as const

const unifiedMenuItems = buildUnifiedMenuItems()

export function MenuPage() {
  const canonicalUrl = restaurantConfig.siteUrl ? `${restaurantConfig.siteUrl.replace(/\/$/, '')}/menu` : undefined

  return (
    <main id="main-content">
      <PageMetadata
        title="Indian Food Menu | Lagnaa Barefoot Dining Singapore"
        description="Explore Lagnaa’s Indian food menu in Singapore, including naan, biryani, curries, tandoori dishes, lassi and chilli challenge dishes."
        canonicalUrl={canonicalUrl}
      />
      <article>
        <section className="menu-demo-hero" aria-labelledby="menu-heading">
          <Container className="menu-demo-hero__content">
            <p className="eyebrow">A Taste of Lagnaa</p>
            <h1 className="menu-demo-hero__heading" id="menu-heading">Explore Our Menu</h1>
            <p>Discover vibrant Indian flavours shaped by the six tastes of Arusuvai—from comforting classics to Lagnaa’s celebrated chilli challenge.</p>
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
              heading="Explore Indian favourites at Lagnaa."
              description="These short guides help visitors find common Indian food searches while keeping menu details clear and confirmable before a visit."
              id="menu-seo-heading"
            />
            <div className="menu-seo-grid">
              {menuSeoSections.map((section) => (
                <section className="menu-seo-card" key={section.title}>
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
        heading="Plan your table at Lagnaa."
        description="Explore the menu, then reserve a table or contact Lagnaa with questions before your visit."
        primaryAction={{ label: 'Reserve a Table', href: restaurantConfig.links.reservation }}
        secondaryAction={{ label: 'Plan Your Visit', href: '/contact', variant: 'outline' }}
      />
    </main>
  )
}
