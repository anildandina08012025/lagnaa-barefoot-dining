import { useEffect } from 'react'

type PageMetadataProps = {
  title: string
  description: string
  canonicalUrl?: string
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

export function PageMetadata({ title, description, canonicalUrl }: PageMetadataProps) {
  useEffect(() => {
    document.title = title
    upsertMeta('meta[name="description"]', 'name', 'description', description)
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', title)
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', description)

    if (canonicalUrl) {
      let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')

      if (!canonical) {
        canonical = document.createElement('link')
        canonical.rel = 'canonical'
        document.head.append(canonical)
      }

      canonical.href = canonicalUrl
    }
  }, [canonicalUrl, description, title])

  return null
}
