export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = 'player/:id'
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

export const PLAYING_DELAY = 1000;
export const DEFAULT_GENRE = 'All genre';
export const FILMS_COUNT_STEP = 8;
