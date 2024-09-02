import { configureStore } from '@reduxjs/toolkit';

import musicReducer from './slices/musicSlice';
import genreListReducer from './slices/genresSlice';

import topMusicListReducer from './slices/topMusicListSlice';
import favouriteMusicListReducer from './slices/favouriteMusicListSlice';
import searchedMusicListReducer from './slices/searchedMusicListSlice';
import yourMusicListReducer from './slices/yourMusicListSlice';

export const store = configureStore({
  reducer: {
    music: musicReducer,
    genreList: genreListReducer,

    topMusicList: topMusicListReducer,
    favouriteMusicList: favouriteMusicListReducer,
    searchedMusicList: searchedMusicListReducer,
    yourMusicList: yourMusicListReducer,
  },
});