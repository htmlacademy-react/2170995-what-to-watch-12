import { Link } from 'react-router-dom';

import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';

// const
import { DEFAULT_GENRE, MAX_COUNT_OF_GENRE } from '../../const';
import { getFilms, setGenre } from '../../store/film-data/film-data.selectors';
import { changeGenre } from '../../store/film-data/film-data.slice';

export default function GenreList(): JSX.Element {
  const films = useAppSelector(getFilms);
  const currentGenre = useAppSelector(setGenre);
  const dispatch = useAppDispatch();

  const genres = [
    DEFAULT_GENRE,
    ...new Set(films.map((film) => film.genre)),
  ].slice(0, MAX_COUNT_OF_GENRE);
  const genreComponents = genres.map((genre) => (
    <li
      className={cn('catalog__genres-item', {
        'catalog__genres-item--active': genre === currentGenre,
      })}
      key={genre}
    >
      <Link
        to='#'
        className='catalog__genres-link'
        onClick={() => dispatch(changeGenre(genre))}
      >
        {genre}
      </Link>
    </li>
  ));

  return <ul className='catalog__genres-list'>{genreComponents}</ul>;
}
