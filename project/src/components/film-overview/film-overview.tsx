// types
import { FilmMockType } from '../../types/films-mock-type';

type FilmOverviewProps = {
  film: FilmMockType | undefined;
};

export default function FilmOverview({ film }: FilmOverviewProps): JSX.Element {
  const getFilmRating = (rating: number) => {
    if (rating > 0 && rating < 3) {
      return 'Bad';
    }
    if (rating >= 3 && rating < 5) {
      return 'Normal';
    }
    if (rating >= 5 && rating < 8) {
      return 'Good';
    }
    if (rating >= 8 && rating < 10) {
      return 'Very good';
    }
    if (rating === 10) {
      return 'Awesom';
    }
  };

  return (
    <>
      <div className='film-rating'>
        <div className='film-rating__score'>{film?.rating}</div>
        <p className='film-rating__meta'>
          <span className='film-rating__level'>
            {getFilmRating(film?.rating as number)}
          </span>
          <span className='film-rating__count'>{film?.scoresCount}</span>
        </p>
      </div>

      <div className='film-card__text'>
        {film?.description}

        <p className='film-card__director'>
          <strong>{film?.director}</strong>
        </p>

        <p className='film-card__starring'>
          <strong>{film?.starring.join(', ')}</strong>
        </p>
      </div>
    </>
  );
}
