import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace, GUEST_DATA } from '../../const';
import { UserProcess } from './../../types/state';
import { checkAuthAction, loginAction, logoutAction, favoriteFilmsAction } from './../api-actions';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: GUEST_DATA,
  favoriteFilms: [],
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userInfo = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userInfo = GUEST_DATA;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userInfo = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userInfo = GUEST_DATA;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userInfo = GUEST_DATA;
        state.favoriteFilms = [];
      })
      .addCase(favoriteFilmsAction.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
      })
      .addCase(favoriteFilmsAction.rejected, (state) => {
        state.favoriteFilms = [];
      });
  },
});
