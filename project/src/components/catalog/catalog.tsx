import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';

// components
import FilmList from '../../components/film-list/film-list';
import GenreList from '../../components/catalog/genre-list';

// const
import { DEFAULT_GENRE } from '../../const';

export default function Catalog(): JSX.Element {
  const films = useAppSelector((state) => state.films);
  const genre = useAppSelector((state) => state.genre);
  const [filmsByGenre, setFilmsByGenre] = useState(films);

  useEffect(() => {
    let filteredFilms = films;
    if (genre !== DEFAULT_GENRE) {
      filteredFilms = films.filter((film) => film.genre === genre);
    }
    setFilmsByGenre(filteredFilms);
  }, [genre, films]);

  return (
    <section className='catalog'>
      <h2 className='catalog__title visually-hidden'>Catalog</h2>
      <GenreList films={films} />
      <FilmList films={filmsByGenre} />
      <div className='catalog__more'>
        <button className='catalog__button' type='button'>
          Show more
        </button>
      </div>
    </section>
  );
}
