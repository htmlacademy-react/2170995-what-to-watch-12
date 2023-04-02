// components
import FilmCard from './FilmCard';

// types
import { FilmMockTypes } from '../types/filmsMockType';

type FilmListProps = {
  films: FilmMockTypes;
};

export default function FilmList({ films }: FilmListProps): JSX.Element {
  return (
    <div className='catalog__films-list'>
      {films.map((film) => (
        <FilmCard film={film} key={film.id} />
      ))}
    </div>
  );
}
