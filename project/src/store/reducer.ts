import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, setFilms, loadFilms, requireAuthorization, setError, setFilmsDataLoadingStatus, loadReviews, setReviewsDataLoadingStatus } from './action';
import { Films } from '../types/film';
import { Reviews } from '../types/review';
import { DEFAULT_GENRE, AuthorizationStatus } from '../const';

type InitialState = {
  genre: string;
  films: Films;
  reviews: Reviews;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  isFilmsDataLoading: boolean;
  isReviewsDataLoading: boolean;
}

const initialState: InitialState = {
  genre: DEFAULT_GENRE,
  films: [],
  reviews: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isFilmsDataLoading: false,
  isReviewsDataLoading: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changeGenre, (state, action) => {
    state.genre = action.payload;
  })
    .addCase(setFilms, (state, action) => {
      state.films = action.payload;
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
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setFilmsDataLoadingStatus, (state, action) => {
      state.isFilmsDataLoading = action.payload;
    })
    .addCase(setReviewsDataLoadingStatus, (state, action) => {
      state.isReviewsDataLoading = action.payload;
    });
});
