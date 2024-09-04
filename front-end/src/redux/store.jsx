import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas'; 

import musicReducer from './slices/musicSlice';
import genreListReducer from './slices/genresSlice';

import topMusicListReducer from './slices/topMusicListSlice';
import favouriteMusicListReducer from './slices/favouriteMusicListSlice';
import searchedMusicListReducer from './slices/searchedMusicListSlice';
import yourMusicListReducer from './slices/yourMusicListSlice';

const sagaMiddleware = createSagaMiddleware(); // Create the saga middleware

export const store = configureStore({
  reducer: {
    music: musicReducer,
    genreList: genreListReducer,

    topMusicList: topMusicListReducer,
    favouriteMusicList: favouriteMusicListReducer,
    searchedMusicList: searchedMusicListReducer,
    yourMusicList: yourMusicListReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);