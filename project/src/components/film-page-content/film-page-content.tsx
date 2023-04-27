import { useAppSelector } from '../../hooks';

// components
import FilmList from '../film-list/film-list';
import Footer from '../footer/footer';

// types
import { Film } from '../../types/film';
import { getFilms } from '../../store/film-data/film-data.selectors';
import { SIMILAR_LIST_COUNT } from '../../const';

type FilmPageContentProps = {
  filmInfo: Film | undefined;
};

export default function FilmPageContent({
  filmInfo,
}: FilmPageContentProps): JSX.Element {
  const films = useAppSelector(getFilms);

  const similarList = films
    .filter(
      (film) => film.id !== filmInfo?.id && film.genre === filmInfo?.genre
    )
    .slice(0, SIMILAR_LIST_COUNT);
  return (
    <div className='page-content'>
      {films.length !== 0 ? (
        <section className='catalog catalog--like-this'>
          <h2 className='catalog__title'>More like this</h2>

          <FilmList films={similarList} />
        </section>
      ) : (
        'No similar films'
      )}

      <Footer />
    </div>
  );
}
