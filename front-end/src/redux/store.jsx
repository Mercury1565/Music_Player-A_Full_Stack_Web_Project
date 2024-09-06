import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas'; 

import musicListReducer from './slices/musicSlice';
import genreListReducer from './slices/genresSlice';
import authReducer from './slices/authSlice';

import topMusicListReducer from './slices/topMusicListSlice';
import favouriteMusicListReducer from './slices/favouriteMusicListSlice';
import searchedMusicListReducer from './slices/searchedMusicListSlice';
import yourMusicListReducer from './slices/yourMusicListSlice';
import genreMusicListReducer from './slices/genreMusicListSlice';
import nowPlayingListReducer from './slices/nowPlayingSlice';

const sagaMiddleware = createSagaMiddleware(); // Create the saga middleware

export const store = configureStore({
  reducer: {
    auth: authReducer,

    track: musicListReducer,
    nowPlaying: nowPlayingListReducer,

    genreList: genreListReducer,

    topMusicList: topMusicListReducer,
    favouriteMusicList: favouriteMusicListReducer,
    searchedMusicList: searchedMusicListReducer,
    yourMusicList: yourMusicListReducer,
    genreMusicList: genreMusicListReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);