import { useEffect } from 'react'
import { trackLinkClick, trackRouteView } from '../../lib/analytics'

export function AnalyticsTracker({ pathname }: { pathname: string }) {
  useEffect(() => {
    trackRouteView(pathname)

    const handleClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const anchor = target.closest('a')
      if (anchor instanceof HTMLAnchorElement) trackLinkClick(anchor)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [pathname])

  return null
}
