import { createAction } from '@reduxjs/toolkit';

import { FilmMockTypes } from './../types/films-mock-type';

export const changeGenre = createAction<{genre: string}>('changeGenre');
export const setFilms = createAction<{films: FilmMockTypes}>('getFilmListByGenre');
