// components
import FilmCard from '../film-card/film-card';

// types
import { FilmMockTypes } from '../../types/films-mock-type';

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
