import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = resolve(process.cwd())
const siteUrl = process.env.VITE_SITE_URL?.replace(/\/$/, '') || 'https://www.lagnaa.com'
const isIndexable = process.env.VITE_ROBOTS_INDEX !== 'false'
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

const sitemapUrls = isIndexable ? routes.map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`).join('\n') : ''
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapUrls ? `\n${sitemapUrls}\n` : ''}</urlset>\n`
const robots = isIndexable
  ? `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
  : 'User-agent: *\nDisallow: /\n'

await mkdir(publicDirectory, { recursive: true })
await Promise.all([
  writeFile(resolve(publicDirectory, 'sitemap.xml'), sitemap),
  writeFile(resolve(publicDirectory, 'robots.txt'), robots),
])
