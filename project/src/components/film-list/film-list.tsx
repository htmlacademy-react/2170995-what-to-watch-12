import { useState } from 'react';

// components
import FilmCard from '../film-card/film-card';
import ShowMoreButton from '../show-more-button/show-more-button';

// types
import { FilmMockTypes } from '../../types/films-mock-type';

// const
import { FILMS_COUNT_STEP } from '../../const';

type FilmListProps = {
  films: FilmMockTypes;
};

export default function FilmList({ films }: FilmListProps): JSX.Element {
  const [filmsCount, setFilmsCount] = useState(FILMS_COUNT_STEP);

  return (
    <>
      <div className='catalog__films-list'>
        {films
          .map((film) => <FilmCard film={film} key={film.id} />)
          .slice(0, filmsCount)}
      </div>
      {filmsCount < films.length && (
        <ShowMoreButton
          onClick={() => {
            setFilmsCount((count) => count + FILMS_COUNT_STEP);
          }}
        />
      )}
    </>
  );
}
