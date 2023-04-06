// components
import FilmReview from '../film-review/film-review';

// types
import { ReviewMockTypes } from '../../types/review-mock-type';

type FilmReviewsProps = {
  reviews: ReviewMockTypes;
};

export default function FilmReviews({
  reviews,
}: FilmReviewsProps): JSX.Element {
  const evenReviews = reviews.filter((_, index) => index % 2 === 0);
  const oddReviews = reviews.filter((_, index) => index % 2 !== 0);

  return (
    <div className='film-card__reviews film-card__row'>
      <div className='film-card__reviews-col'>
        {evenReviews.map((review) => (
          <FilmReview review={review} key={review.id} />
        ))}
      </div>
      <div className='film-card__reviews-col'>
        {oddReviews.map((review) => (
          <FilmReview review={review} key={review.id} />
        ))}
      </div>
    </div>
  );
}
