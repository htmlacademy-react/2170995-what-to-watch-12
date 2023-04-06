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
  const lengthReviews = reviews.length;
  const reviewsColumn = (start: number, end: number) =>
    reviews
      .slice(start, end)
      .map((review) => <FilmReview review={review} key={review.id} />);

  return (
    <div className='film-card__reviews film-card__row'>
      <div className='film-card__reviews-col'>
        {reviewsColumn(0, lengthReviews / 2)}
      </div>
      <div className='film-card__reviews-col'>
        {reviewsColumn(lengthReviews / 2, lengthReviews)}
      </div>
    </div>
  );
}
