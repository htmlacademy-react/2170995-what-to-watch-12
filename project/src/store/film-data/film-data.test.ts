import { setFilmStatusAction, fetchFilmsAction, fetchFilmAction, promoFilmAction, fetchReviewsAction, addReviewAction } from './../api-actions';
import { changeGenre, filmData } from './film-data.slice';
import { DEFAULT_GENRE } from './../../const';
import { FilmData } from './../../types/state';
import { mockFilms, mockReviews } from '../../utils/mocks';


const films = [...mockFilms];
const reviews = [...mockReviews];

const initialState: FilmData = {
  films: [],
  reviews: [],
  isFilmsDataLoading: false,
  isReviewsDataLoading: false,
  genre: DEFAULT_GENRE,
  promoFilm: undefined,
  currentFilm: undefined,
  hasError: false,
};

describe('Reduser film-data', () => {
  test('without additional parameters should return initial state', () => {
    expect(filmData.reducer(undefined, {type: 'UNKNOWN_ACTION'})).toEqual(initialState);
  });

  describe('setFilmStatusAction test', () => {
    test('should update current film and promo film favorite status if they are equal and setFilmStatusAction fulfilled', () => {
      const setFilmsStatusState: FilmData = {
        films: [],
        reviews: reviews,
        isFilmsDataLoading: false,
        isReviewsDataLoading: false,
        genre: DEFAULT_GENRE,
        promoFilm: films[1],
        currentFilm: films[1],
        hasError: false,
      };

      const updated = filmData.reducer(setFilmsStatusState, {type: setFilmStatusAction.fulfilled.type, payload: {updatedFilms: {...films[1], isFavorite: !films[1].isFavorite}, isPromo: true}});

      expect(updated.currentFilm?.isFavorite).not.toBe(setFilmsStatusState.currentFilm?.isFavorite);
      expect(updated.promoFilm?.isFavorite).not.toBe(setFilmsStatusState.promoFilm?.isFavorite);
      expect(updated.currentFilm).toEqual(updated.promoFilm);
      expect(updated).toEqual({...setFilmsStatusState, currentFilm: updated.currentFilm, promoFilm: updated.promoFilm});
    });

    test('should update only current film favorite status if they are not equal and setFilmStatusAction fulfilled', () => {

      const setFilmsStatusState : FilmData = {
        films: [],
        reviews: reviews,
        isFilmsDataLoading: false,
        isReviewsDataLoading: false,
        genre: DEFAULT_GENRE,
        promoFilm: films[1],
        currentFilm: films[2],
        hasError: false,
      };

      const updated = filmData.reducer(setFilmsStatusState, { type: setFilmStatusAction.fulfilled.type, payload: {updatedFilm: {...films[2], isFavorite: !films[2].isFavorite}, isPromo: false }});

      expect(updated.currentFilm?.isFavorite).not.toBe(setFilmsStatusState.currentFilm?.isFavorite);
      expect(updated.promoFilm?.isFavorite).toEqual(setFilmsStatusState.promoFilm?.isFavorite);
      expect(updated.currentFilm).not.toBe(updated.promoFilm);
      expect(updated).toEqual({...setFilmsStatusState, currentFilm: updated.currentFilm});
    });
  });

  describe('fetchFilmsAction test', () => {
    let state: FilmData;

    beforeEach(() => {state = {...initialState};});

    test('should enable films loading status if fetchFilmsAction pending', () => {
      expect(filmData.reducer(state, { type: fetchFilmsAction.pending.type }))
        .toEqual({...state, isFilmsDataLoading: true});
    });

    test('should update available films list if fetchFilmsAction fulfilled', () => {
      expect(filmData.reducer(state, { type: fetchFilmsAction.fulfilled.type, payload: films }))
        .toEqual({...state, isFilmsDataLoading: false, hasError: false, films: films});
    });

    test('should set loadingError flag and reset available films list if fetchFilmsAction rejected', () => {

      const filmsActionState: FilmData = {
        films: films,
        reviews: [],
        isFilmsDataLoading: false,
        isReviewsDataLoading: false,
        genre: DEFAULT_GENRE,
        promoFilm: undefined,
        currentFilm: undefined,
        hasError: false,
      };

      expect(filmData.reducer(filmsActionState, { type: fetchFilmsAction.rejected.type }))
        .toEqual({...filmsActionState, isFilmsDataLoading: false, hasError: true, films: []});
    });
  });

  describe('fetchFilmAction test', () => {
    let state: FilmData;

    beforeEach(() => {state = {...initialState};});

    test('should enable films loading status if fetchFilmAction pending', () => {
      expect(filmData.reducer(state, { type: fetchFilmAction.pending.type }))
        .toEqual({...state, isFilmsDataLoading: true});
    });

    test('should update current film if fetchFilmAction fulfilled', () => {
      expect(filmData.reducer(state, { type: fetchFilmAction.fulfilled.type, payload: films[5] }))
        .toEqual({...state, isFilmsDataLoading: false, currentFilm: films[5], hasError: false});
    });

    test('should set hasLoadingError flag and set to null current film if fetchFilmAction rejected', () => {
      expect(filmData.reducer(state, { type: fetchFilmAction.rejected.type }))
        .toEqual({...state, isFilmsDataLoading: false, currentFilm: null, hasError: true});
    });
  });

  describe('promoFilmAction test', () => {
    let state: FilmData;

    beforeEach(() => {state = {...initialState};});

    test('should enable films loading status if promoFilmAction pending', () => {
      expect(filmData.reducer(state, { type: promoFilmAction.pending.type }))
        .toEqual({...state, isFilmsDataLoading: true});
    });

    test('should update promo film if promoFilmAction fulfilled', () => {
      expect(filmData.reducer(state, { type: promoFilmAction.fulfilled.type, payload: films[0] }))
        .toEqual({...state, isFilmsDataLoading: false, promoFilm: films[0]});
    });

    test('should set to null promo film if promoFilmAction rejected', () => {
      expect(filmData.reducer(state, { type: promoFilmAction.rejected.type }))
        .toEqual({...state, isFilmsDataLoading: false, promoFilm: null});
    });
  });

  describe('fetchReviewsAction test', () => {
    let state: FilmData;

    beforeEach(() => {state = {...initialState};});

    test('should update film reviews if fetchReviewsAction fulfilled', () => {
      expect(filmData.reducer(state, { type: fetchReviewsAction.fulfilled.type, payload: reviews }))
        .toEqual({...state, reviews: reviews});
    });

    test('should reset film reviews if fetchReviewsAction rejected', () => {

      const reviewsActionState: FilmData = {
        films: films,
        reviews: reviews,
        isFilmsDataLoading: false,
        isReviewsDataLoading: false,
        genre: DEFAULT_GENRE,
        promoFilm: undefined,
        currentFilm: undefined,
        hasError: false,
      };
      expect(filmData.reducer(reviewsActionState, { type: fetchReviewsAction.rejected.type }))
        .toEqual({...reviewsActionState, reviews: []});
    });
  });

  describe('addReviewAction test', () => {
    let state: FilmData;

    beforeEach(() => {state = {...initialState};});

    test('should enable data uploading status if addReviewAction pending', () => {
      expect(filmData.reducer(state, { type: addReviewAction.pending.type }))
        .toEqual({...state, isReviewsDataLoading: true});
    });

    test('should update film reviews if addReviewAction fulfilled', () => {
      expect(filmData.reducer(state, { type: addReviewAction.fulfilled.type, payload: reviews }))
        .toEqual({...state, isReviewsDataLoading: false, reviews: reviews});
    });

    test('should disable uploading status if addReviewAction rejected', () => {
      expect(filmData.reducer(state, { type: addReviewAction.rejected.type }))
        .toEqual({...state, isReviewsDataLoading: false});
    });
  });

  describe('change state genre test', () => {
    let state: FilmData;

    beforeEach(() => {state = {...initialState};});

    test('should change active genre', () => {
      expect(filmData.reducer(state, changeGenre('new-active-genre'))).toEqual({...state, genre: 'new-active-genre'});
    });
  });
});
