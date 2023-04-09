import { createReducer } from '@reduxjs/toolkit';
import {changeGenre, getFilmListByGenre} from './action';
import { FilmMockTypes } from '../types/films-mock-type';
import { DEFAULT_GENRE } from '../const';

const initialState = {
  genre: DEFAULT_GENRE,
  films: [] as FilmMockTypes,
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changeGenre, (state, action) => {
    const {genre} = action.payload;
    state.genre = genre;
  })
    .addCase(getFilmListByGenre, (state, action) => {
      const {films} = action.payload;
      state.films = films;
    });
});
