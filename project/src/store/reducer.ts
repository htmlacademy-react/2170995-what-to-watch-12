import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, setFilms, loadFilms, requireAuthorization, setFilmsDataLoadingStatus, loadReviews, setReviewsDataLoadingStatus } from './action';
import { Films } from '../types/film';
import { Reviews } from '../types/review';
import { DEFAULT_GENRE, AuthorizationStatus } from '../const';

type InitialState = {
  genre: string;
  films: Films;
  reviews: Reviews;
  authorizationStatus: AuthorizationStatus;
  isFilmsDataLoading: boolean;
  isReviewsDataLoading: boolean;
}

const initialState: InitialState = {
  genre: DEFAULT_GENRE,
  films: [],
  reviews: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isFilmsDataLoading: false,
  isReviewsDataLoading: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changeGenre, (state, action) => {
    const {genre} = action.payload;
    state.genre = genre;
  })
    .addCase(setFilms, (state, action) => {
      const {films} = action.payload;
      state.films = films;
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setFilmsDataLoadingStatus, (state, action) => {
      state.isFilmsDataLoading = action.payload;
    })
    .addCase(setReviewsDataLoadingStatus, (state, action) => {
      state.isReviewsDataLoading = action.payload;
    });
});
