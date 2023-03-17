import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import UserBlock from '../../components/user-block/user-block';
import FilmList from '../../components/film-list/film-list';

import { TypeFilms } from '../../types/type-film';

type MyListProps = {
  films: TypeFilms;
}

function MyListPage({ films }: MyListProps): JSX.Element {
  return (
    <div className='user-page'>
      <header className='page-header user-page__head'>
        <div className='logo'>
          <Logo />
        </div>

        <h1 className='page-title user-page__title'>
          My list <span className='user-page__film-count'>{films.length}</span>
        </h1>
        <UserBlock />
      </header>

      <section className='catalog'>
        <h2 className='catalog__title visually-hidden'>Catalog</h2>
        <FilmList films={films} />
      </section>

      <Footer />
    </div>
  );
}

export default MyListPage;
