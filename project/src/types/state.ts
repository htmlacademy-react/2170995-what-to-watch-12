import { UserInfo } from './user-data';
import { AuthorizationStatus } from './../const';
import { store } from '../store/index';
import { Films, Film } from './film';
import { Reviews } from './review';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userInfo: UserInfo;
  favoriteFilms: Films;
}

export type FilmData = {
  films: Films;
  reviews: Reviews;
  isFilmsDataLoading: boolean;
  isReviewsDataLoading: boolean;
  genre: string;
  promoFilm: Film | undefined | null;
  currentFilm: Film | null | undefined;
  dataLoadingError: string;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
