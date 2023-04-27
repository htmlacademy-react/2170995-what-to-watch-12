import { toast } from 'react-toastify';
import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Films, Film } from '../types/film';
import { Reviews } from '../types/review';
import { redirectToRoute } from './action';
import { saveToken, dropToken } from '../services/token';
import { AppRoute, APIRoute } from '../const';
import { AuthData } from '../types/auth-data';
import { UserData, UserInfo } from '../types/user-data';

export const fetchFilmsAction = createAsyncThunk<Films, undefined, {
  extra: AxiosInstance;
}>(
  'data/fetchFilms',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Films>(APIRoute.Films);
    return data;
  }
);

export const fetchFilmAction = createAsyncThunk<Film, string, {
  extra: AxiosInstance;
}>(
  'data/fetchFilm',
  async (filmId, {extra: api}) => {
    const {data} = await api.get<Film>(`${APIRoute.Films}/${filmId}`);
    return data;
  }
);

export const fetchReviewsAction = createAsyncThunk<Reviews, string, {
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (filmId, { extra: api}) => {
    const {data} = await api.get<Reviews>(`${APIRoute.Comments}/${filmId}`);
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<UserInfo, undefined, {
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<UserData>(APIRoute.Login);
    const {token, ...userInfo} = data;
    return userInfo;
  },
);

export const loginAction = createAsyncThunk<UserInfo, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
      const {token, ...userInfo} = data;

      saveToken(token);
      dispatch(redirectToRoute(AppRoute.Main));
      return userInfo;
    } catch {
      toast.error('Service isn\'t available. Please, try again later');
      throw new Error();
    }
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(redirectToRoute(AppRoute.Main));
  }
);

export const favoriteFilmsAction = createAsyncThunk<Films, undefined, {
  extra: AxiosInstance;
}>(
  'user/favoriteFilms',
  async(_arg, { extra: api }) => {
    const {data} = await api.get<Films>(APIRoute.Favorite);
    return data;
  }
);

export const promoFilmAction = createAsyncThunk<Film, undefined, {
  extra: AxiosInstance;
}>(
  'data/promoFilm',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Film>(APIRoute.Promo);
    return data;
  }
);

export const setFilmStatusAction = createAsyncThunk<{updatedFilm: Film; isPromo: boolean}, {filmId: string; status: number; isPromo: boolean},
{
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'user/addToFavorites',
  async ({filmId, status, isPromo}, {dispatch, extra: serverApi}) => {
    try {
      const {data} = await serverApi.post<Film>(`/favorite/${filmId}/${status}`);
      await dispatch(favoriteFilmsAction());
      return {updatedFilm: data, isPromo};
    } catch {
      toast.error('Service isn\'t available. Please, try again later');
      throw new Error();
    }
  },
);

export const addReviewAction = createAsyncThunk<Reviews, {filmId: string; comment: string; rating: number},
{
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'user/addReview',
  async ({filmId, comment, rating}, {dispatch, extra: serverApi}) => {
    try {
      const {data} = await serverApi.post<Reviews>(`/comments/${filmId}`, {comment, rating});
      dispatch(redirectToRoute(`/films/${filmId}`));
      return data;
    } catch {
      toast.error('Service isn\'t available. Please, try again later');
      throw new Error();
    }
  },
);
