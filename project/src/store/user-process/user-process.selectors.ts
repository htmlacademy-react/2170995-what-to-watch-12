import { UserInfo } from './../../types/user-data';
import { Films } from './../../types/film';
import { AuthorizationStatus, NameSpace } from './../../const';
import { State } from './../../types/state';


export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getAuthCheckedStaus = (state: State): boolean => state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;

export const getFavoriteFilms = (state: State): Films => state[NameSpace.User].favoriteFilms;
export const getFavoriteFilmsCount = (state: State): number => state[NameSpace.User].favoriteFilms.length;
export const getUserInfo = (state: State): UserInfo => state[NameSpace.User].userInfo;
