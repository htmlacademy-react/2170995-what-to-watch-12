import { getFilmRating } from '../../utils';

// types
import { Film } from '../../types/film';

type FilmOverviewProps = {
  film: Film | undefined;
};

export default function FilmOverview({ film }: FilmOverviewProps): JSX.Element {
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
