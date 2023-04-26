import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilmData } from './../../types/state';
import { NameSpace, DEFAULT_GENRE } from './../../const';
import { fetchFilmsAction, fetchReviewsAction, promoFilmAction, setFilmStatusAction, addReviewAction, fetchFilmAction } from './../api-actions';

const initialState: FilmData = {
  films: [],
  reviews: [],
  isFilmsDataLoading: false,
  isReviewsDataLoading: false,
  genre: DEFAULT_GENRE,
  promoFilm: undefined,
  currentFilm: undefined,
  dataLoadingError: '',
};

export const filmData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    changeGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
    },
  },
  extraReducers(builder) {
    builder
    // filmStatusAction
      .addCase(setFilmStatusAction.fulfilled, (state, action) => {
        const {updatedFilm, isPromo} = action.payload;
        state.currentFilm = updatedFilm;
        if (isPromo) {
          state.promoFilm = updatedFilm;
        }
      })

    // filmsAction
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isFilmsDataLoading = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.isFilmsDataLoading = false;
        state.films = action.payload;
      })
      .addCase(fetchFilmsAction.rejected, (state) => {
        state.isFilmsDataLoading = false;
        state.films = [];
      })

      // filmAction
      .addCase(fetchFilmAction.pending, (state) => {
        state.isFilmsDataLoading = true;
      })
      .addCase(fetchFilmAction.fulfilled, (state, action) => {
        state.isFilmsDataLoading = false;
        state.currentFilm = action.payload;
      })
      .addCase(fetchFilmAction.rejected, (state) => {
        state.isFilmsDataLoading = false;
        state.currentFilm = null;
      })

      // promoAction
      .addCase(promoFilmAction.pending, (state) => {
        state.isFilmsDataLoading = true;
      })
      .addCase(promoFilmAction.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
        state.isFilmsDataLoading = false;
      })
      .addCase(promoFilmAction.rejected, (state) => {
        state.promoFilm = null;
        state.isFilmsDataLoading = false;
      })

      // reviewsAction
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isReviewsDataLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.isFilmsDataLoading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.isFilmsDataLoading = false;
        state.reviews = [];
      })

      // reviewAction
      .addCase(addReviewAction.pending, (state) => {
        state.isReviewsDataLoading = true;
      })
      .addCase(addReviewAction.fulfilled, (state, action) => {
        state.isReviewsDataLoading = false;
        state.dataLoadingError = '';
        state.reviews = action.payload;
      })
      .addCase(addReviewAction.rejected, (state) => {
        state.isReviewsDataLoading = false;
      });
  },
});

export const {changeGenre} = filmData.actions;
