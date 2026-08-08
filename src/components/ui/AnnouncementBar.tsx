import { restaurantConfig } from '../../config/restaurant'

export function AnnouncementBar() {
  const announcement = restaurantConfig.announcement

  if (!announcement) {
    return null
  }

  return (
    <div className="announcement-bar" role="status">
      {announcement.href ? (
        <a href={announcement.href}>{announcement.text}</a>
      ) : (
        <span>{announcement.text}</span>
      )}
    </div>
  )
}
