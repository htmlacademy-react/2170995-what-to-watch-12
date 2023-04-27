import { Reviews } from './../../types/review';
import { NameSpace } from './../../const';
import { Films, Film } from './../../types/film';
import { State } from './../../types/state';


export const getFilms = (state: State): Films => state[NameSpace.Data].films;
export const getCurrentFilm = (state: State): Film | null | undefined => state[NameSpace.Data].currentFilm;
export const getFilmsDataLoading = (state: State): boolean => state[NameSpace.Data].isFilmsDataLoading;

export const getPromoFilm = (state: State): Film | undefined | null => state[NameSpace.Data].promoFilm;
export const getPromoFilmId = (state: State): number => {
  const promoFilm = state[NameSpace.Data].promoFilm;
  return promoFilm ? promoFilm.id : 0;
};

export const getReviews = (state: State): Reviews => state[NameSpace.Data].reviews;
export const getReviewsDataLoading = (state: State): boolean => state[NameSpace.Data].isReviewsDataLoading;

export const setGenre = (state: State): string => state[NameSpace.Data].genre;

export const getLoadError = (state: State): string => state[NameSpace.Data].dataLoadingError;
