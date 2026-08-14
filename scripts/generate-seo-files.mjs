import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = resolve(process.cwd())
const config = await readFile(resolve(root, 'src/config/restaurant.ts'), 'utf8')
const match = config.match(/siteUrl:\s*'([^']+)'/)

if (!match) {
  throw new Error('Unable to read restaurantConfig.siteUrl for SEO files.')
}

const siteUrl = match[1].replace(/\/$/, '')
const publicDirectory = resolve(root, 'public')
const routes = [
  '/',
  '/our-story',
  '/menu',
  '/gallery',
  '/blog',
  '/events',
  '/experiences/barefoot-dining',
  '/experiences/chilli-challenge',
  '/events/monthly-degustation',
  '/events/cooking-with-chef-kaesavan',
  '/events/rediscover-little-india',
  '/indian-restaurant-little-india',
  '/indian-restaurant-singapore',
  '/barefoot-dining-singapore',
  '/chilli-challenge-singapore',
  '/indian-cooking-class-singapore',
  '/best-indian-food-singapore',
  '/michelin-indian-restaurant-singapore',
  '/awards-media',
  '/contact',
  '/reservations',
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`).join('\n')}\n</urlset>\n`
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`

await mkdir(publicDirectory, { recursive: true })
await Promise.all([
  writeFile(resolve(publicDirectory, 'sitemap.xml'), sitemap),
  writeFile(resolve(publicDirectory, 'robots.txt'), robots),
])
