import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { restaurantConfig } from '../../config/restaurant'
import { Container } from '../layout/Container'
import { PageMetadata } from '../seo/PageMetadata'
import { Button } from '../ui/Button'
import { SectionHeading } from '../ui/SectionHeading'

function TextArrow() {
  return <span aria-hidden="true">↗</span>
}

function Reveal({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

const senses = ['See', 'Hear', 'Smell', 'Taste', 'Touch', 'Feel'] as const
const originalJourney = [
  'Explore Little India',
  'Complete cultural discovery challenges',
  'Discover local stories and sensory experiences',
  'Return to Lagnaa...barefoot dining’s connection with the neighbourhood',
] as const

export function RediscoverLittleIndiaPage() {
  const canonicalUrl = restaurantConfig.siteUrl
    ? `${restaurantConfig.siteUrl.replace(/\/$/, '')}/events/rediscover-little-india`
    : undefined

  return (
    <main id="main-content">
      <PageMetadata
        title="#RediscoverLittleIndia | Lagnaa...barefoot dining"
        description="An archive of Lagnaa...barefoot dining’s 2020 cultural discovery initiative in Little India."
        canonicalUrl={canonicalUrl}
      />
      <article className="rediscover-page">
        <section className="rediscover-hero" aria-labelledby="rediscover-heading">
          <div className="rediscover-hero__trail" aria-hidden="true"><i /><i /><i /></div>
          <Container className="rediscover-hero__grid">
            <Reveal>
              <div className="rediscover-hero__content">
                <p className="eyebrow rediscover-hero__eyebrow">A Lagnaa...barefoot dining Cultural Initiative</p>
                <p className="rediscover-status">Past Cultural Experience</p>
                <h1 className="rediscover-hero__heading" id="rediscover-heading">#Rediscover<wbr />LittleIndia</h1>
                <p className="rediscover-hero__description">A self-guided cultural discovery experience created by Lagnaa...barefoot dining, inviting participants to explore the sights, flavours and hidden stories of Little India through their senses.</p>
                <p className="rediscover-hero__notice">This initiative was originally created in 2020. Current participation and rewards have not been confirmed by Lagnaa...barefoot dining.</p>
              </div>
            </Reveal>
            <div className="rediscover-hero__seal" aria-hidden="true"><span>LI</span><small>Little India<br />archive</small></div>
          </Container>
        </section>

        <section className="rediscover-section rediscover-story" aria-labelledby="rediscover-story-heading">
          <Container>
            <Reveal>
              <div className="rediscover-story__heading">
                <SectionHeading eyebrow="The story" heading="Discover Little India Through Six Senses" level={2} id="rediscover-story-heading" />
                <p>#RediscoverLittleIndia invited participants to explore the neighbourhood through playful cultural challenges, uncover hidden gems and experience the character of Little India beyond its familiar landmarks.</p>
              </div>
            </Reveal>
            <ol className="rediscover-senses" aria-label="The six senses of the original initiative">
              {senses.map((sense, index) => (
                <li key={sense}><span aria-hidden="true">0{index + 1}</span><strong>{sense}</strong></li>
              ))}
            </ol>
          </Container>
        </section>

        <section className="rediscover-section rediscover-journey" aria-labelledby="rediscover-journey-heading">
          <Container className="rediscover-journey__grid">
            <div className="rediscover-journey__motif" aria-hidden="true"><span>01</span><i /><i /><i /></div>
            <Reveal>
              <div className="rediscover-journey__content">
                <p className="eyebrow">The original experience</p>
                <h2 id="rediscover-journey-heading">A Cultural Trail Beyond the Restaurant</h2>
                <p>The original initiative used a self-guided digital game to encourage exploration of Little India. The structure below describes the 2020 experience and is not a currently available activity.</p>
                <ol className="rediscover-journey__steps">
                  {originalJourney.map((step, index) => <li key={step}><span aria-hidden="true">0{index + 1}</span>{step}</li>)}
                </ol>
              </div>
            </Reveal>
          </Container>
        </section>

        <section className="rediscover-section rediscover-coconut" aria-labelledby="rediscover-coconut-heading">
          <Container className="rediscover-coconut__grid">
            <Reveal>
              <div className="rediscover-coconut__copy">
                <p className="eyebrow rediscover-coconut__eyebrow">Part of the original 2020 experience</p>
                <SectionHeading eyebrow="Archive" heading="The Coconut Masterclass" description="Participants who completed the original experience were offered a hands-on coconut masterclass with Chef K7, inspired by his childhood connection to Singapore’s kampong life and coconut trees." tone="dark" level={2} id="rediscover-coconut-heading" />
              </div>
            </Reveal>
            <div className="rediscover-coconut__visual" aria-hidden="true"><span>CO</span><i /><i /></div>
          </Container>
        </section>

        <section className="rediscover-section rediscover-rooted" aria-labelledby="rediscover-rooted-heading">
          <Container className="rediscover-rooted__grid">
            <Reveal>
              <div>
                <SectionHeading eyebrow="Little India and Lagnaa...barefoot dining" heading="Rooted in Little India" level={2} id="rediscover-rooted-heading" />
                <p className="rediscover-rooted__copy">Located on Upper Dickson Road, Lagnaa...barefoot dining is part of the cultural fabric of Little India—a neighbourhood shaped by food, heritage, colour and community.</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="rediscover-rooted__details">
                <address>6 Upper Dickson Road<br />Singapore 207466</address>
                <div className="rediscover-rooted__actions">
                  <Button href="/our-story" variant="primary">Discover Lagnaa...barefoot dining’s Story <TextArrow /></Button>
                  <Button href="/contact" variant="outline">Plan Your Visit <TextArrow /></Button>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      </article>
    </main>
  )
}
