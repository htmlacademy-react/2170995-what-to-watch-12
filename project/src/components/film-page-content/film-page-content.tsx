import { useAppSelector } from '../../hooks';

// components
import FilmList from '../film-list/film-list';
import Footer from '../footer/footer';

// types
import { FilmMockType } from '../../types/films-mock-type';

type FilmPageContentProps = {
  filmInfo: FilmMockType | undefined;
};

export default function FilmPageContent({
  filmInfo,
}: FilmPageContentProps): JSX.Element {
  const films = useAppSelector((state) => state.films);
  const SIMILAR_LIST_COUNT = 4;
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