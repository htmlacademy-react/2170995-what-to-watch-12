import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';

import { favoriteFilmsAction } from '../../store/api-actions';
import { getFavoriteFilms } from '../../store/user-process/user-process.selectors';

// components
import UserBlock from '../../components/user-block/user-block';
import MainLogo from '../../components/logo/logo-main';
import FilmList from '../../components/film-list/film-list';
import Footer from '../../components/footer/footer';

export default function MyListPage(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(favoriteFilmsAction());
  }, [dispatch]);

  const favoriteList = useAppSelector(getFavoriteFilms);

  return (
    <div className='user-page'>
      <Helmet>
        <title>WTW Your films list</title>
      </Helmet>
      <header className='page-header user-page__head'>
        <MainLogo />

        <h1 className='page-title user-page__title'>
          My list
          <span className='user-page__film-count'>{favoriteList.length}</span>
        </h1>
        <UserBlock />
      </header>

      <section className='catalog'>
        <h2 className='catalog__title visually-hidden'>Catalog</h2>

        <FilmList films={favoriteList} />
      </section>

      <Footer />
    </div>
  );
}
