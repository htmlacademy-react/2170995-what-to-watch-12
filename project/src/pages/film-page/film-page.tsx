import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilmAction, fetchReviewsAction } from '../../store/api-actions';
import {
  getCurrentFilm,
  getFilmsDataLoading,
} from '../../store/film-data/film-data.selectors';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';

// pages
import Loading from '../loading-page/loading';
import NotFoundPage from '../not-found-page/not-found-page';

// components
import UserBlock from '../../components/user-block/user-block';
import MainLogo from '../../components/logo/main-logo';
import FilmPageContent from '../../components/film-page-content/film-page-content';
import FilmTabs from '../../components/film-tabs/film-tabs';
import MyListButton from '../../components/promo-film/my-list-button';

// const
import { AuthorizationStatus } from '../../const';
import VideoPlayerButton from '../../components/video-player-button/video-player-button';

export default function FilmPage(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  const isFilmsDataLoading = useAppSelector(getFilmsDataLoading);

  const { id } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchFilmAction(id));
      dispatch(fetchReviewsAction(id));
    }
  }, [id, dispatch]);

  const film = useAppSelector(getCurrentFilm);

  if (film === undefined || isFilmsDataLoading) {
    return <Loading />;
  }

  if (film === null || !id) {
    return <NotFoundPage />;
  }

  return (
    <>
      <section
        className='film-card film-card--full'
        style={{ backgroundColor: `${film.backgroundColor}` }}
      >
        <Helmet>
          <title>WTW Film info</title>
        </Helmet>
        <div className='film-card__hero'>
          <div className='film-card__bg'>
            <img src={film.backgroundImage} alt={film.name} />
          </div>

          <h1 className='visually-hidden'>WTW</h1>

          <header className='page-header film-card__head'>
            <MainLogo />

            <UserBlock />
          </header>

          <div className='film-card__wrap'>
            <div className='film-card__desc'>
              <h2 className='film-card__title'>{film.name}</h2>
              <p className='film-card__meta'>
                <span className='film-card__genre'>{film.genre}</span>
                <span className='film-card__year'>{film.released}</span>
              </p>

              <div className='film-card__buttons'>
                <VideoPlayerButton filmId={id} />
                <MyListButton
                  isAuth={isAuth}
                  isFavorite={film.isFavorite}
                  filmId={id}
                />
                <Link
                  to='review'
                  className={cn('btn film-card__button', {
                    'visually-hidden': !isAuth,
                  })}
                >
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
                src={film.posterImage}
                alt={film.name}
                width='218'
                height='327'
              />
            </div>
            <FilmTabs film={film} />
          </div>
        </div>
      </section>

      <FilmPageContent filmInfo={film} />
    </>
  );
}
