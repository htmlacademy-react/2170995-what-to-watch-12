import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { fetchReviewAction } from '../../store/api-actions';

// components
import UserBlock from '../../components/user-block/user-block';
import MainLogo from '../../components/logo/logo-main';
import FilmPageContent from '../../components/film-page-content/film-page-content';
import FilmTabs from '../../components/film-tabs/film-tabs';

export default function FilmPage(): JSX.Element {
  const films = useAppSelector((state) => state.films);
  const params = useParams();
  const filmInfo = films.find((film) => film.id === Number(params.id));

  useEffect(() => {
    if (filmInfo) {
      store.dispatch(fetchReviewAction(filmInfo.id));
    }
  }, [filmInfo]);

  return (
    <>
      <section className='film-card film-card--full'>
        <Helmet>
          <title>WTW Film info</title>
        </Helmet>
        <div className='film-card__hero'>
          <div className='film-card__bg'>
            <img src={filmInfo?.backgroundImage} alt={filmInfo?.name} />
          </div>

          <h1 className='visually-hidden'>WTW</h1>

          <header className='page-header film-card__head'>
            <MainLogo />

            <UserBlock />
          </header>

          <div className='film-card__wrap'>
            <div className='film-card__desc'>
              <h2 className='film-card__title'>{filmInfo?.name}</h2>
              <p className='film-card__meta'>
                <span className='film-card__genre'>{filmInfo?.genre}</span>
                <span className='film-card__year'>{filmInfo?.released}</span>
              </p>

              <div className='film-card__buttons'>
                <button
                  className='btn btn--play film-card__button'
                  type='button'
                >
                  <svg viewBox='0 0 19 19' width='19' height='19'>
                    <use xlinkHref='#play-s'></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button
                  className='btn btn--list film-card__button'
                  type='button'
                >
                  <svg viewBox='0 0 19 20' width='19' height='20'>
                    <use xlinkHref='#add'></use>
                  </svg>
                  <span>My list</span>
                  <span className='film-card__count'>{films.length}</span>
                </button>
                <Link to='review' className='btn film-card__button'>
                  Add review
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className='film-card__wrap film-card__translate-top'>
          <div className='film-card__info'>
            <div className='film-card__poster film-card__poster--big'>
              <img
                src={filmInfo?.posterImage}
                alt={filmInfo?.name}
                width='218'
                height='327'
              />
            </div>
            <FilmTabs film={filmInfo} />
          </div>
        </div>
      </section>

      <FilmPageContent filmInfo={filmInfo} />
    </>
  );
}
