import dayjs from 'dayjs';

// types
import { Review } from '../../types/review';

type FilmReviewProps = {
  review: Review;
};

export default function FilmReview({ review }: FilmReviewProps): JSX.Element {
  return (
    <div className='review'>
      <blockquote className='review__quote'>
        <p className='review__text'>{review.comment}</p>

        <footer className='review__details'>
          <cite className='review__author'>{review.user.name}</cite>
          <time className='review__date' dateTime={review.date}>
            {dayjs(review.date).format('MMMM DD, YYYY')}
          </time>
        </footer>
      </blockquote>

      <div className='review__rating'>{review.rating}</div>
    </div>
  );
}
