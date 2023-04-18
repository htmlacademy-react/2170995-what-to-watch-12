import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Films } from '../types/film';
import { Reviews } from '../types/review';
import { loadFilms, loadReviews, requireAuthorization, setFilmsDataLoadingStatus, setReviewsDataLoadingStatus, redirectToRoute } from './action';
import { saveToken, dropToken } from '../services/token';
import { AppRoute, APIRoute, AuthorizationStatus } from '../const';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';

export const fetchFilmAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setFilmsDataLoadingStatus(true));
    const {data} = await api.get<Films>(APIRoute.Films);
    dispatch(setFilmsDataLoadingStatus(false));
    dispatch(loadFilms(data));
  }
);

export const fetchReviewAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (filmId: number, {dispatch, extra: api}) => {
    dispatch(setReviewsDataLoadingStatus(true));
    const {data} = await api.get<Reviews>(`${APIRoute.Comments as string}/${filmId}`);
    dispatch(setReviewsDataLoadingStatus(false));
    dispatch(loadReviews(data));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try{
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
);