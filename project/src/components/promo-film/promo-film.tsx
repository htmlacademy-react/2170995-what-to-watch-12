import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { promoFilmAction } from '../../store/api-actions';
import {
  getFilmsDataLoading,
  getPromoFilm,
} from '../../store/film-data/film-data.selectors';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';

// pages
import Loading from '../../pages/loading-page/loading';

// components
import MainLogo from '../logo/main-logo';
import UserBlock from '../user-block/user-block';
import MyListButton from './my-list-button';

// const
import { AuthorizationStatus } from '../../const';
import VideoPlayerButton from '../video-player-button/video-player-button';

export default function PromoFilm(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  useEffect(() => {
    dispatch(promoFilmAction());
  }, [dispatch]);

  const promoFilm = useAppSelector(getPromoFilm);
  const isFilmDataLoading = useAppSelector(getFilmsDataLoading);

  if (promoFilm === undefined || isFilmDataLoading) {
    return <Loading />;
  }

  if (promoFilm === null) {
    return (
      <section
        className='film-card'
        style={{
          backgroundImage: 'linear-gradient(-180deg,#000 0%,#180202 100%)',
        }}
      >
        <header className='page-header film-card__head'>
          <MainLogo />
          <UserBlock />
        </header>
      </section>
    );
  }

  return (
    <section className='film-card'>
      <div className='film-card__bg'>
        <img src={promoFilm.backgroundImage} alt={promoFilm.name} />
      </div>

      <h1 className='visually-hidden'>WTW</h1>

      <header className='page-header film-card__head'>
        <MainLogo />
        <UserBlock />
      </header>
      <div className='film-card__wrap'>
        <div className='film-card__info'>
          <div className='film-card__poster'>
            <img
              src={promoFilm.posterImage}
              alt={promoFilm.name}
              width='218'
              height='327'
            />
          </div>

          <div className='film-card__desc'>
            <h2 className='film-card__title'>{promoFilm.name}</h2>
            <p className='film-card__meta'>
              <span className='film-card__genre'>{promoFilm.genre}</span>
              <span className='film-card__year'>{promoFilm.released}</span>
            </p>

            <div className='film-card__buttons'>
              <VideoPlayerButton filmId={`${promoFilm.id}`} />
              <MyListButton
                isAuth={isAuth}
                isFavorite={promoFilm.isFavorite}
                filmId={`${promoFilm.id}`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
