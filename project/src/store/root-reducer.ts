import { filmData } from './film-data/film-data.slice';
import { userProcess } from './user-process/user-process.slice';
import { NameSpace } from './../const';
import { combineReducers } from '@reduxjs/toolkit';


export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Data]: filmData.reducer,
});
