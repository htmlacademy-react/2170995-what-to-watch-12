export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = 'player/:id'
}

export enum APIRoute {
  Films = '/films',
  Promo = '/promo',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum FilmTabsType {
  Overview = 'Overview',
  Details = 'Details',
  Reviews = 'Reviews'
}

export enum NameSpace {
  Data = 'DATA',
  User = 'USER',
}

export const GUEST_DATA = {
  avatarUrl: '',
  email: '',
  id: 0,
  name: '',
};

export const PLAYING_DELAY = 1000;
export const DEFAULT_GENRE = 'All genre';
export const FILMS_COUNT_STEP = 8;
export const MAX_COUNT_OF_GENRE = 9;

export const BACKEND_URL = 'https://12.react.pages.academy/wtw';
export const REQUEST_TIMEOUT = 5000;
