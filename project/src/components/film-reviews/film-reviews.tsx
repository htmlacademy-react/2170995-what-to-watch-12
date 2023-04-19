import { useAppSelector } from '../../hooks';

// components
import FilmReview from '../film-review/film-review';

export default function FilmReviews(): JSX.Element {
  const reviews = useAppSelector((state) => state.reviews);
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
