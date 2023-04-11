import { Link } from 'react-router-dom';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeGenre } from '../../store/action';

// const
import { DEFAULT_GENRE } from '../../const';

export default function GenreList(): JSX.Element {
  const films = useAppSelector((state) => state.films);
  const currentGenre = useAppSelector((state) => state.genre);
  const dispatch = useAppDispatch();

  const genres = [DEFAULT_GENRE, ...new Set(films.map((film) => film.genre))];
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
        onClick={() => dispatch(changeGenre({ genre }))}
      >
        {genre}
      </Link>
    </li>
  ));

  return <ul className='catalog__genres-list'>{genreComponents}</ul>;
}

// // components
// import Genre from './genre';

// // types
// import { FilmMockTypes } from '../../types/films-mock-type';

// type GenreListProps = {
//   films: FilmMockTypes;
// };

// export default function GenreList({ films }: GenreListProps): JSX.Element {
//   return (
//     <ul className='catalog__genres-list'>
//       <Genre films={films} />
//     </ul>
//   );
// }
