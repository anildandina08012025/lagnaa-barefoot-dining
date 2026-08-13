type GoogleReview = {
  authorName: string
  rating: number
  relativeTimeDescription: string
  text: string
  sourceUrl?: string
}

type GoogleReviewsSectionProps = {
  enabled?: boolean
  placeRating?: number | null
  totalReviews?: number | null
  reviews?: readonly GoogleReview[]
}

/**
 * Reserved for a future Google Places API integration.
 *
 * Keep disabled until Lagnaa approves showing Google reviews and a backend API
 * route is connected. Do not hard-code review text here for production.
 */
export function GoogleReviewsSection({
  enabled = false,
  placeRating = null,
  totalReviews = null,
  reviews = [],
}: GoogleReviewsSectionProps) {
  if (!enabled) return null

  return (
    <section className="google-reviews-section" aria-labelledby="google-reviews-heading">
      <div className="google-reviews-section__summary">
        <p className="eyebrow">Guest reviews</p>
        <h2 id="google-reviews-heading">What diners say on Google.</h2>
        {placeRating && totalReviews ? (
          <p>
            Rated {placeRating.toFixed(1)} on Google from {totalReviews.toLocaleString()} reviews.
          </p>
        ) : (
          <p>Read recent guest feedback from Lagnaa’s Google Business Profile.</p>
        )}
      </div>

      {reviews.length > 0 ? (
        <div className="google-reviews-section__grid">
          {reviews.map((review) => (
            <article className="google-reviews-section__card" key={`${review.authorName}-${review.relativeTimeDescription}`}>
              <p className="google-reviews-section__rating" aria-label={`${review.rating} out of 5 stars`}>
                {'★'.repeat(Math.max(0, Math.min(5, Math.round(review.rating))))}
              </p>
              <blockquote>{review.text}</blockquote>
              <footer>
                <strong>{review.authorName}</strong>
                <span>{review.relativeTimeDescription}</span>
                {review.sourceUrl ? <a href={review.sourceUrl} target="_blank" rel="noopener noreferrer">View on Google</a> : null}
              </footer>
            </article>
          ))}
        </div>
      ) : null}
      <p className="google-reviews-section__attribution">Reviews are sourced from Google.</p>
    </section>
  )
}
