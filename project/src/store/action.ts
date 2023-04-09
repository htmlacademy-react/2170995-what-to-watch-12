import { createAction } from '@reduxjs/toolkit';

import { FilmMockTypes } from './../types/films-mock-type';

export const changeGenre = createAction<{genre: string}>('changeGenre');
export const getFilmListByGenre = createAction<{films: FilmMockTypes}>('getFilmListByGenre');
