import { demoMenuItems } from '../../content/demoMenu'
import { restaurantConfig } from '../../config/restaurant'
import { Container } from '../layout/Container'
import { PageMetadata } from '../seo/PageMetadata'
import { InteractiveMenuList } from '../ui/InteractiveMenuList'

export function MenuPage() {
  const canonicalUrl = restaurantConfig.siteUrl ? `${restaurantConfig.siteUrl.replace(/\/$/, '')}/menu` : undefined

  return (
    <main id="main-content">
      <PageMetadata
        title="Explore Our Menu | Lagnaa Barefoot Dining Singapore"
        description="Explore Lagnaa’s demo menu preview and discover vibrant Indian flavours shaped by the six tastes of Arusuvai."
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
            <InteractiveMenuList items={demoMenuItems} />
          </Container>
        </section>
      </article>
    </main>
  )
}
