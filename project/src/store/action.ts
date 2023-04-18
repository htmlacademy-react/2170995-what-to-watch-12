import { createAction } from '@reduxjs/toolkit';

import { Films } from '../types/film';
import { Reviews } from '../types/review';

import { AuthorizationStatus, AppRoute } from './../const';

export const changeGenre = createAction<{genre: string}>('changeGenre');
export const setFilms = createAction<{films: Films}>('setFilms');

export const loadFilms = createAction<Films>('data/loadFilms');
export const loadReviews = createAction<Reviews>('data/loadReviews');
export const setFilmsDataLoadingStatus = createAction<boolean>('data/setFilmsDataLoadingStatus');
export const setReviewsDataLoadingStatus = createAction<boolean>('data/setReviewsDataLoadingStatus');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const redirectToRoute = createAction<AppRoute>('/redirectToRoute');

