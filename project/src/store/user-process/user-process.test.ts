import { mockUser } from './../../utils/mocks';
import { GUEST_DATA } from './../../const';
import { userProcess } from './user-process.slice';
import { UserProcess } from '../../types/state';
import { AuthorizationStatus } from '../../const';
import { checkAuthAction, favoriteFilmsAction, loginAction, logoutAction } from '../api-actions';
import { mockFilms } from '../../utils/mocks';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: GUEST_DATA,
  favoriteFilms: [],
};

const favoritFilmsList = [...mockFilms];

describe('Reducer: user', () => {

  test('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'})).toEqual(initialState);
  });

  let state: UserProcess;

  beforeEach(() => {
    state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userInfo: GUEST_DATA,
      favoriteFilms: []
    };
  });

  describe('checkAuthAction test', () => {
    test('should update authorizationStatus to "AUTH" and user information if checkAuthAction fulfilled', () => {
      expect(userProcess.reducer(state, { type: checkAuthAction.fulfilled.type, payload: mockUser }))
        .toEqual({...state, authorizationStatus: AuthorizationStatus.Auth, userInfo: mockUser});
    });
    test('should update authorizationStatus to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(userProcess.reducer(state, { type: checkAuthAction.rejected.type }))
        .toEqual({...state, authorizationStatus: AuthorizationStatus.NoAuth});
    });
  });

  describe('loginAction test', () => {
    test('should update authorizationStatus to "AUTH" and user information if loginAction fulfilled', () => {
      expect(userProcess.reducer(state, { type: loginAction.fulfilled.type, payload: mockUser }))
        .toEqual({...state, authorizationStatus: AuthorizationStatus.Auth, userInfo: mockUser});
    });
    test('should update authorizationStatus to "NO_AUTH" if loginAction rejected', () => {
      expect(userProcess.reducer(state, { type: loginAction.rejected.type }))
        .toEqual({...state, authorizationStatus: AuthorizationStatus.NoAuth});
    });
  });

  describe('logoutAction test', () => {
    const logoutState: UserProcess = {
      authorizationStatus: AuthorizationStatus.Auth,
      userInfo: mockUser,
      favoriteFilms: favoritFilmsList
    };
    test('should update authorizationStatus to "NO_AUTH" if logoutAction fulfilled', () => {
      expect(userProcess.reducer(logoutState, { type: logoutAction.fulfilled.type }))
        .toEqual({...initialState, authorizationStatus: AuthorizationStatus.NoAuth});
    });
  });

  describe('favoriteFilmsAction test', () => {
    test('should update user favorite list if favoriteFilmsAction fulfilled', () => {
      const fulfilledFavoriteFilmsActiondState: UserProcess = {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: mockUser,
        favoriteFilms: []
      };

      expect(userProcess.reducer(fulfilledFavoriteFilmsActiondState, { type: favoriteFilmsAction.fulfilled.type, payload: favoritFilmsList}))
        .toEqual({...fulfilledFavoriteFilmsActiondState, favoriteFilms: favoritFilmsList});
    });

    test('should reset user favorite list if fetchFavoriteFilmsAction rejected', () => {
      const rejectedFavoriteFilmsActionState: UserProcess = {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: mockUser,
        favoriteFilms: favoritFilmsList
      };

      expect(userProcess.reducer(rejectedFavoriteFilmsActionState, { type: favoriteFilmsAction.rejected.type }))
        .toEqual({...rejectedFavoriteFilmsActionState, favoriteFilms: []});
    });
  });
});


