import { redirectToRoute } from './action';
import { AuthData } from './../types/auth-data';
import { mockFilms, mockReviews } from './../utils/mocks';
import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import { checkAuthAction, fetchFilmsAction, fetchFilmAction, fetchReviewsAction, loginAction, logoutAction, favoriteFilmsAction, promoFilmAction, setFilmStatusAction, addReviewAction } from './api-actions';
import { APIRoute } from '../const';
import { State } from '../types/state';
import { mockUser } from '../utils/mocks';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
  >(middleware);

  describe('checkAuthAction test', () => {
    test('should authorization status is «auth» when server return 200', async () => {
      const store = mockStore();
      const userData = {...mockUser, token: 'token'};
      mockAPI.onGet(APIRoute.Login).reply(200, userData);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(checkAuthAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type
      ]);
    });

    test('should authorization status is «no-auth» when server returns 401', async () => {
      const store = mockStore();

      mockAPI
        .onGet(APIRoute.Login)
        .reply(401, {error: 'You are not logged in.'});

      expect(store.getActions()).toEqual([]);

      await store.dispatch(checkAuthAction());
      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type
      ]);
    });
  });

  describe('fetchFilmsAction tests', () => {
    test('should dispatch available films when GET /films', async () => {

      const films = [...mockFilms];
      const store = mockStore();

      mockAPI
        .onGet(APIRoute.Films)
        .reply(200, [films]);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchFilmsAction());
      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchFilmsAction.pending.type,
        fetchFilmsAction.fulfilled.type
      ]);
    });
  });

  describe('fetchFilmAction tests', () => {
    test('should rejected when GET /films/{filmId} if film wasn\'t found', async () => {
      const nonExistfilmId = '0';
      const store = mockStore();

      mockAPI
        .onGet(`${APIRoute.Films}/${nonExistfilmId}`)
        .reply(404);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchFilmAction(`${nonExistfilmId}`));
      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchFilmAction.pending.type,
        fetchFilmAction.rejected.type
      ]);
    });

    test('should dispatch film when GET /films/{filmId} if film was found', async () => {
      const film = [...mockFilms][0];
      const filmId = film.id;
      const store = mockStore();

      mockAPI
        .onGet(`${APIRoute.Films}/${filmId}`)
        .reply(200, {film});

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchFilmAction(`${filmId}`));
      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchFilmAction.pending.type,
        fetchFilmAction.fulfilled.type
      ]);
    });
  });

  describe('fetchReviewsAction tests', () => {
    test('should dispatch film reviews when GET /comments/{filmId} if film was found', async () => {
      const filmId = '12321';
      const reviews = [...mockReviews];
      const store = mockStore();

      mockAPI
        .onGet(`${APIRoute.Comments}/${filmId}`)
        .reply(200, reviews);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchReviewsAction(`${filmId}`));
      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.fulfilled.type
      ]);
    });

    test('should rejected when GET /comments/{filmId} if film wasn\'t found', async () => {
      const nonExistfilmId = '12566';
      const store = mockStore();

      mockAPI
        .onGet(`${APIRoute.Comments}/${nonExistfilmId}`)
        .reply(400, {error: `Film id ${nonExistfilmId} does not exist`});

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchReviewsAction(`${nonExistfilmId}`));
      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.rejected.type
      ]);
    });
  });

  describe('loginAction tests', () => {
    test('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
      const fakeUser: AuthData = {login: 'test@test.ru', password: 'fsda323'};

      mockAPI
        .onPost(APIRoute.Login)
        .reply(200, {...mockUser, token: 'token'});


      const store = mockStore();
      Storage.prototype.setItem = jest.fn();

      await store.dispatch(loginAction(fakeUser));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        loginAction.pending.type,
        redirectToRoute.type,
        loginAction.fulfilled.type
      ]);

      expect(Storage.prototype.setItem).toBeCalledTimes(1);
      expect(Storage.prototype.setItem).toBeCalledWith('wtw-token', 'token');
    });

    test('should rejected authorization when POST /login with bad request', async () => {
      const fakeUser: AuthData = {login: 'fdsaaewa', password: '432'};

      mockAPI
        .onPost(APIRoute.Login)
        .reply(400);


      const store = mockStore();

      await store.dispatch(loginAction(fakeUser));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.rejected.type
      ]);
    });
  });

  describe('logoutAction tests', () => {
    test('should dispatch Logout and RedirectToRoute when Delete /logout', async () => {
      mockAPI
        .onDelete(APIRoute.Logout)
        .reply(204);

      const store = mockStore();
      Storage.prototype.removeItem = jest.fn();

      await store.dispatch(logoutAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        logoutAction.pending.type,
        redirectToRoute.type,
        logoutAction.fulfilled.type
      ]);

      expect(Storage.prototype.removeItem).toBeCalledTimes(1);
      expect(Storage.prototype.removeItem).toBeCalledWith('wtw-token');
    });
  });

  describe('favoriteFilmsAction tests', () => {
    test('should dispatch favorite films when GET /favorite if user authorized', async () => {
      const favoritesfilms = [...mockFilms];
      const store = mockStore();

      mockAPI
        .onGet(APIRoute.Favorite)
        .reply(200, favoritesfilms);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(favoriteFilmsAction());
      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        favoriteFilmsAction.pending.type,
        favoriteFilmsAction.fulfilled.type
      ]);
    });

    test('should rejected when GET /films/{filmId} if user wasn\'t authorized', async () => {
      const store = mockStore();

      mockAPI
        .onGet(APIRoute.Favorite)
        .reply(401);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(favoriteFilmsAction());
      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        favoriteFilmsAction.pending.type,
        favoriteFilmsAction.rejected.type
      ]);
    });
  });

  describe('promoFilmAction tests', () => {
    test('should dispatch promo film when GET /promo', async () => {
      const promoFilm = [...mockFilms][1];
      const store = mockStore();

      mockAPI
        .onGet(APIRoute.Promo)
        .reply(200, {promoFilm});

      expect(store.getActions()).toEqual([]);

      await store.dispatch(promoFilmAction());
      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        promoFilmAction.pending.type,
        promoFilmAction.fulfilled.type
      ]);
    });
  });

  describe('setFilmStatusAction test', () => {

    test('should change favorite status of current film and promo film if they are equal when POST /favorite/{filmId}/{status}', async () => {

      const films = [...mockFilms];
      const film = films[3];
      const promoFilm = films[3];

      const filmId = film.id;
      const newFavoriteStatus = film.isFavorite ? 0 : 1;

      const store = mockStore();

      const returnedFilm = {...film, isFavorite: !film.isFavorite};

      mockAPI
        .onPost(`/favorite/${filmId}/${newFavoriteStatus}`)
        .reply(200, returnedFilm);

      mockAPI
        .onGet(APIRoute.Favorite)
        .reply(200, films);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(setFilmStatusAction({filmId: `${filmId}`, status: newFavoriteStatus, isPromo: filmId === promoFilm.id}));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        setFilmStatusAction.pending.type,
        favoriteFilmsAction.pending.type,
        favoriteFilmsAction.fulfilled.type,
        setFilmStatusAction.fulfilled.type,
      ]);
    });

    test('should rejected when POST /favorite/{filmId}/{status} if user wasn\'t authorized', async () => {

      const films = [...mockFilms];
      const film = films[1];
      const promoFilm = films[3];

      const filmId = film.id;
      const newFavoriteStatus = film.isFavorite ? 0 : 1;

      const store = mockStore();

      mockAPI
        .onPost(`/favorite/${filmId}/${newFavoriteStatus}`)
        .reply(401, {error: 'You are not logged in.'});

      expect(store.getActions()).toEqual([]);

      await store.dispatch(setFilmStatusAction({filmId: `${filmId}`, status: newFavoriteStatus, isPromo: filmId === promoFilm.id}));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        setFilmStatusAction.pending.type,
        setFilmStatusAction.rejected.type,
      ]);
    });
  });

  describe('addReviewAction test', () => {

    test('should dispatch updated reviews and RedirectToRoute when POST /comments/{filmId}', async () => {
      const film = [...mockFilms][1];
      const filmId = film.id;

      const fakeReview = {
        comment: 'comment',
        rating: 8
      };

      const returnedReviews = [...mockReviews];

      const store = mockStore();

      mockAPI
        .onPost(`/comments/${filmId}`)
        .reply(200, returnedReviews);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(addReviewAction({filmId: `${filmId}`, comment: fakeReview.comment, rating: fakeReview.rating}));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        addReviewAction.pending.type,
        redirectToRoute.type,
        addReviewAction.fulfilled.type
      ]);
    });

    test('should rejected when POST /comments/{filmId} if film wasn\'t found', async () => {
      const nonExistingId = '43214';

      const fakeReview = {
        comment: 'comment',
        rating: 6
      };

      const store = mockStore();

      mockAPI
        .onPost(`/comments/${nonExistingId}`)
        .reply(400, {error: `Film id ${nonExistingId} does not exist`});

      expect(store.getActions()).toEqual([]);

      await store.dispatch(addReviewAction({filmId: `${nonExistingId}`, comment: fakeReview.comment, rating: fakeReview.rating}));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        addReviewAction.pending.type,
        addReviewAction.rejected.type
      ]);
    });

    test('should rejected when POST /comments/{filmId} if user wasn\'t authorized', async () => {
      const film = [...mockFilms][1];
      const filmId = film.id;

      const fakeReview = {
        comment: 'comment',
        rating: 1
      };

      const store = mockStore();

      mockAPI
        .onPost(`/comments/${filmId}`)
        .reply(401, {error: 'You are not logged in.'});

      expect(store.getActions()).toEqual([]);

      await store.dispatch(addReviewAction({filmId: `${filmId}`, comment: fakeReview.comment, rating: fakeReview.rating}));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        addReviewAction.pending.type,
        addReviewAction.rejected.type
      ]);
    });
  });
});
