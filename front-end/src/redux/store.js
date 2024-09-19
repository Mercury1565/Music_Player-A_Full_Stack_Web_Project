import { combineReducers } from 'redux';

import sidebarReducer from './slices/sideBarSlice';
import musicListReducer from './slices/musicSlice';
import genreListReducer from './slices/genresSlice';
import genreMusicListReducer from './slices/genreMusicListSlice'
import authReducer from './slices/authSlice';
import topMusicListReducer from './slices/topMusicListSlice';
import favouriteMusicListReducer from './slices/favouriteMusicListSlice';
import searchedMusicListReducer from './slices/searchedMusicListSlice';
import yourMusicListReducer from './slices/yourMusicListSlice';
import nowPlayingListReducer from './slices/nowPlayingSlice';
import fetchedMusicReducer from './slices/fetchedMusicSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  sidebar: sidebarReducer,
  track: musicListReducer,
  nowPlaying: nowPlayingListReducer,
  genreList: genreListReducer,
  genreMusicList: genreMusicListReducer,
  topMusicList: topMusicListReducer,
  favouriteMusicList: favouriteMusicListReducer,
  searchedMusicList: searchedMusicListReducer,
  yourMusicList: yourMusicListReducer,
  fetchedMusic: fetchedMusicReducer,
});

export default rootReducer;
