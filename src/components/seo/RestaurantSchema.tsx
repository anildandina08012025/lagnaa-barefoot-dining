import { restaurantConfig } from '../../config/restaurant'

type StructuredData = Record<string, unknown>

type BreadcrumbItem = {
  label: string
  path: string
}

const breadcrumbRoutes: Readonly<Record<string, readonly BreadcrumbItem[]>> = {
  '/menu': [{ label: 'Menu', path: '/menu' }],
  '/gallery': [{ label: 'Gallery', path: '/gallery' }],
  '/events': [{ label: 'Events', path: '/events' }],
  '/experiences': [{ label: 'Events', path: '/events' }],
  '/experiences/barefoot-dining': [
    { label: 'Events', path: '/events' },
    { label: 'Barefoot Dining', path: '/experiences/barefoot-dining' },
  ],
  '/experiences/chilli-challenge': [
    { label: 'Events', path: '/events' },
    { label: 'The Ultimate Chilli Challenge', path: '/experiences/chilli-challenge' },
  ],
  '/events/monthly-degustation': [
    { label: 'Events', path: '/events' },
    { label: 'Monthly Dégustation', path: '/events/monthly-degustation' },
  ],
  '/events/cooking-with-chef-kaesavan': [
    { label: 'Events', path: '/events' },
    { label: 'Cooking with Chef Kaesavan', path: '/events/cooking-with-chef-kaesavan' },
  ],
  '/events/rediscover-little-india': [
    { label: 'Events', path: '/events' },
    { label: '#RediscoverLittleIndia', path: '/events/rediscover-little-india' },
  ],
  '/awards-media': [{ label: 'Awards & Media', path: '/awards-media' }],
  '/our-story': [{ label: 'Our Story', path: '/our-story' }],
  '/contact': [{ label: 'Contact', path: '/contact' }],
  '/reservations': [{ label: 'Reservations', path: '/reservations' }],
  '/indian-restaurant-little-india': [{ label: 'Indian Restaurant Little India', path: '/indian-restaurant-little-india' }],
  '/indian-restaurant-singapore': [{ label: 'Indian Restaurant Singapore', path: '/indian-restaurant-singapore' }],
  '/barefoot-dining-singapore': [{ label: 'Barefoot Dining Singapore', path: '/barefoot-dining-singapore' }],
  '/chilli-challenge-singapore': [{ label: 'Chilli Challenge Singapore', path: '/chilli-challenge-singapore' }],
  '/indian-cooking-class-singapore': [{ label: 'Indian Cooking Class Singapore', path: '/indian-cooking-class-singapore' }],
  '/best-indian-food-singapore': [{ label: 'Indian Food Singapore', path: '/best-indian-food-singapore' }],
  '/michelin-indian-restaurant-singapore': [{ label: 'MICHELIN Guide Indian Restaurant Singapore', path: '/michelin-indian-restaurant-singapore' }],
}

function absoluteUrl(path: string, siteUrl: string) {
  return new URL(path, `${siteUrl.replace(/\/$/, '')}/`).toString()
}

function structuredAddress(address: string) {
  const [streetAddress = address, localityAndPostal = ''] = address.split(', ')
  const postalMatch = localityAndPostal.match(/^(.*)\s+(\d{6})$/)

  return {
    '@type': 'PostalAddress',
    streetAddress,
    ...(postalMatch ? { addressLocality: postalMatch[1], postalCode: postalMatch[2] } : {}),
    addressCountry: 'SG',
  }
}

function JsonLd({ id, data }: { id: string, data: StructuredData }) {
  return <script id={id} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}

export function RestaurantSchema({ pathname }: { pathname: string }) {
  const siteUrl = restaurantConfig.siteUrl
  if (!siteUrl) return null

  const rootUrl = `${siteUrl.replace(/\/$/, '')}/`
  const reservationUrl = restaurantConfig.links.reservation
    ? absoluteUrl(restaurantConfig.links.reservation, siteUrl)
    : undefined
  const menuUrl = absoluteUrl('/menu', siteUrl)
  const sameAs = restaurantConfig.socialLinks.flatMap((social) => social.href ? [social.href] : [])
  const graph: StructuredData[] = [
    {
      '@type': 'Restaurant',
      '@id': `${rootUrl}#restaurant`,
      name: restaurantConfig.name,
      description: restaurantConfig.shortDescription,
      url: rootUrl,
      hasMenu: menuUrl,
      priceRange: '$$',
      ...(restaurantConfig.address ? { address: structuredAddress(restaurantConfig.address) } : {}),
      ...(restaurantConfig.phone ? { telephone: restaurantConfig.phone } : {}),
      ...(restaurantConfig.email ? { email: restaurantConfig.email } : {}),
      servesCuisine: ['Indian'],
      areaServed: {
        '@type': 'Place',
        name: restaurantConfig.location,
      },
      ...(reservationUrl ? {
        acceptsReservations: true,
        potentialAction: {
          '@type': 'ReserveAction',
          target: reservationUrl,
          name: 'Reserve a Table',
        },
      } : {}),
      ...(restaurantConfig.socialImageUrl ? { image: restaurantConfig.socialImageUrl } : {}),
      ...(sameAs.length > 0 ? { sameAs } : {}),
    },
    {
      '@type': 'WebSite',
      '@id': `${rootUrl}#website`,
      name: restaurantConfig.name,
      url: rootUrl,
      publisher: { '@id': `${rootUrl}#restaurant` },
    },
  ]
  const crumbs = breadcrumbRoutes[pathname]

  if (crumbs) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${absoluteUrl(pathname, siteUrl)}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: rootUrl },
        ...crumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 2,
          name: crumb.label,
          item: absoluteUrl(crumb.path, siteUrl),
        })),
      ],
    })
  }

  return <JsonLd id="lagnaa-structured-data" data={{ '@context': 'https://schema.org', '@graph': graph }} />
}
