import chilliLevels from '../../assets/lagnaa-showcase/lagnaa-chilli-levels.webp'
import cookingMoment from '../../assets/lagnaa-showcase/lagnaa-cooking-moment.webp'
import diningMoment from '../../assets/lagnaa-showcase/lagnaa-dining-moment.webp'
import { Container } from '../layout/Container'

const moments = [
  {
    id: 'social-dining',
    label: 'Social Dining',
    title: 'Monthly Interaction',
    description: 'Exclusive dinner for our beloved diners to select our monthly specials.',
    image: diningMoment,
    alt: 'Guests sharing a meal at Lagnaa.',
  },
  {
    id: 'food-challenge',
    label: 'Food Challenge',
    title: 'The Ultimate Chilli Challenge',
    description: 'Be the first Chilli Challenger to complete a Level challenge and win S$10,000.',
    image: chilliLevels,
    alt: 'Illustrated chilli-level guide.',
  },
  {
    id: 'cooking-class',
    label: 'Cooking Class',
    title: 'Cook with Chef Kaesavan',
    description: 'Learn about Indian cuisine and cook with Lagnaa’s special secret sauce.',
    image: cookingMoment,
    alt: 'A cooking class in progress at Lagnaa.',
  },
] as const

export function LagnaaExperienceMoments() {
  return (
    <section className="lagnaa-moments" aria-labelledby="lagnaa-moments-heading">
      <Container>
        <header className="lagnaa-moments__header">
          <p>Come Home to Yourself</p>
          <h2 id="lagnaa-moments-heading">Experience Lagnaa</h2>
          <p>Join our online and offline events.<br />Discover the charm of Indian culture<br />through authentic Indian Cuisine.</p>
        </header>
        <div className="lagnaa-moments__grid">
          {moments.map((moment) => (
            <article className="lagnaa-moments__card" key={moment.id}>
              <div className="lagnaa-moments__image-wrap">
                <img src={moment.image} alt={moment.alt} width="1600" height="1600" />
              </div>
              <p className="lagnaa-moments__label">{moment.label}</p>
              <h3>{moment.title}</h3>
              <p className="lagnaa-moments__description">{moment.description}</p>
              <a href="/experiences" className="lagnaa-moments__link">Learn More <span aria-hidden="true">→</span></a>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
