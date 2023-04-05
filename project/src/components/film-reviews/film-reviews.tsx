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
  return (
    <div className='film-card__reviews film-card__row'>
      <div className='film-card__reviews-col'>
        {reviews.map((review) => (
          <FilmReview review={review} key={review.id} />
        ))}
      </div>
    </div>
  );
}
