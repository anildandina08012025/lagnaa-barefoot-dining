import { restaurantConfig } from '../../config/restaurant'
import { Button } from '../ui/Button'
import { Container } from './Container'

function SocialLogo({ label }: { label: string }) {
  if (label === 'Instagram') {
    return <svg aria-hidden="true" viewBox="0 0 24 24"><rect height="16" rx="4" width="16" x="4" y="4" /><circle cx="12" cy="12" r="3.4" /><circle cx="17.25" cy="6.8" r="0.85" /></svg>
  }
  if (label === 'Facebook') {
    return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M13.7 20v-7h2.4l.36-2.72H13.7V8.55c0-.79.22-1.33 1.4-1.33h1.5V4.79a20.1 20.1 0 0 0-2.18-.11c-2.16 0-3.64 1.32-3.64 3.74v1.86H8.33V13h2.45v7h2.92Z" fill="currentColor" /></svg>
  }
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M14.45 4.1c.42.96 1.15 1.73 2.05 2.18.64.33 1.35.5 2.07.48v2.76a7.1 7.1 0 0 1-4.1-1.3v5.62a5.36 5.36 0 1 1-4.62-5.3v2.78a2.67 2.67 0 1 0 1.78 2.52V4.1h2.82Z" fill="currentColor" /></svg>
}

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer__grid">
          <section className="site-footer__intro" aria-labelledby="footer-brand">
            <p className="eyebrow">Little India, Singapore</p>
            <h2 className="heading heading--footer" id="footer-brand">Lagnaa ..barefoot dining</h2>
            <p>{restaurantConfig.shortDescription}</p>
            <div className="site-footer__actions">
              <Button href={restaurantConfig.links.reservation} disabled={!restaurantConfig.links.reservation} variant="light">
                Reserve a Table
              </Button>
              {restaurantConfig.links.orderOnline ? <Button href={restaurantConfig.links.orderOnline} variant="outline">Order Online</Button> : null}
            </div>
            {restaurantConfig.socialLinks.length > 0 ? (
              <section className="site-footer__social" aria-labelledby="footer-social-heading">
                <h2 id="footer-social-heading">Follow Lagnaa ...barefoot dinning</h2>
                <div className="site-footer__social-links">
                  {restaurantConfig.socialLinks.map((social) => social.href ? (
                    <a aria-label={`Follow Lagnaa on ${social.label}`} href={social.href} key={social.label} rel="noreferrer" target="_blank"><SocialLogo label={social.label} /></a>
                  ) : (
                    <span aria-label={`${social.label} link coming soon`} key={social.label} role="img"><SocialLogo label={social.label} /></span>
                  ))}
                </div>
              </section>
            ) : null}
          </section>

          <nav className="site-footer__column" aria-label="Footer navigation">
            <h2>Explore</h2>
            <ul>
              {restaurantConfig.navigation.map((item) => <li key={item.href}><a href={item.href}>{item.label}</a></li>)}
            </ul>
          </nav>

          <nav className="site-footer__column" aria-label="Dining experiences">
            <h2>Experiences</h2>
            <ul>
              {restaurantConfig.experienceLinks.map((item) => <li key={item.href}><a href={item.href}>{item.label}</a></li>)}
            </ul>
          </nav>

          <section className="site-footer__column" aria-labelledby="footer-contact">
            <h2 id="footer-contact">Visit</h2>
            <p className="site-footer__location">{restaurantConfig.location}</p>
            {restaurantConfig.address && restaurantConfig.mapsUrl ? <a href={restaurantConfig.mapsUrl}>{restaurantConfig.address}</a> : null}
            {restaurantConfig.phone ? <a href={`tel:${restaurantConfig.phone.replace(/\s/g, '')}`}>{restaurantConfig.phone}</a> : null}
            {restaurantConfig.email ? <a href={`mailto:${restaurantConfig.email}`}>{restaurantConfig.email}</a> : null}
            {restaurantConfig.openingHours.length > 0 ? (
              <ul className="site-footer__hours">
                {restaurantConfig.openingHours.map((hours) => <li key={hours}>{hours}</li>)}
              </ul>
            ) : null}
          </section>
        </div>

        <div className="site-footer__bottom">
          <p>© {currentYear} {restaurantConfig.name}</p>
          <nav aria-label="Footer utility links">
            <ul>
              <li><a href="/blog">Blog</a></li>
              {restaurantConfig.legalLinks.map((item) => <li key={item.href}><a href={item.href}>{item.label}</a></li>)}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  )
}
