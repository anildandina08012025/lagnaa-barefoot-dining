import { useEffect } from 'react'
import { restaurantConfig } from '../../config/restaurant'

type PageMetadataProps = {
  title: string
  description: string
  canonicalUrl?: string
  imageUrl?: string | null
  type?: 'website' | 'article'
}

function upsertMeta(selector: string, attribute: 'name' | 'property', value: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, value)
    document.head.append(element)
  }

  element.content = content
}

function removeMeta(selector: string) {
  document.head.querySelector(selector)?.remove()
}

export function PageMetadata({ title, description, canonicalUrl, imageUrl = restaurantConfig.socialImageUrl, type = 'website' }: PageMetadataProps) {
  useEffect(() => {
    document.title = title
    upsertMeta('meta[name="description"]', 'name', 'description', description)
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', title)
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', description)
    upsertMeta('meta[property="og:type"]', 'property', 'og:type', type)
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)

    if (canonicalUrl) {
      let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')

      if (!canonical) {
        canonical = document.createElement('link')
        canonical.rel = 'canonical'
        document.head.append(canonical)
      }

      canonical.href = canonicalUrl
      upsertMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl)
    } else {
      document.head.querySelector('link[rel="canonical"]')?.remove()
      removeMeta('meta[property="og:url"]')
    }

    if (imageUrl) {
      upsertMeta('meta[property="og:image"]', 'property', 'og:image', imageUrl)
      upsertMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    } else {
      removeMeta('meta[property="og:image"]')
      upsertMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary')
    }
  }, [canonicalUrl, description, imageUrl, title, type])

  return null
}
