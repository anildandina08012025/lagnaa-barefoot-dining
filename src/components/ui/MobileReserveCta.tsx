import { restaurantConfig } from '../../config/restaurant'
import { Button } from './Button'

export function MobileReserveCta({ pathname }: { pathname: string }) {
  if (pathname === '/reservations') return null

  return (
    <div className="mobile-reserve-cta" aria-label="Reservation shortcut">
      <Button href={restaurantConfig.links.reservation} disabled={!restaurantConfig.links.reservation} variant="primary">
        Reserve a Table
      </Button>
    </div>
  )
}
