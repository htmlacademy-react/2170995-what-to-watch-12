// components
import FilmCard from '../film-card/film-card';
import Footer from '../footer/footer';

// types
import { FilmMockTypes, FilmMockType } from '../../types/films-mock-type';

type PageContentProps = {
  films: FilmMockTypes;
  filmInfo: FilmMockType | undefined;
};

export default function PageContent({
  films,
  filmInfo,
}: PageContentProps): JSX.Element {
  const SIMILAR_LIST_COUNT = 4;
  const similarList = films.filter((film) => film.genre === filmInfo?.genre);
  return (
    <div className='page-content'>
      <section className='catalog catalog--like-this'>
        <h2 className='catalog__title'>More like this</h2>

        <div className='catalog__films-list'>
          {similarList.length > 1
            ? similarList
              .slice(0, SIMILAR_LIST_COUNT)
              .map(
                (film) =>
                  filmInfo?.id !== film.id && (
                    <FilmCard film={film} key={film.id} />
                  )
              )
            : 'No similar films'}
        </div>
      </section>

      <Footer />
    </div>
  );
}
