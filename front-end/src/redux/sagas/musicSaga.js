import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchMusicList } from '../../api';
import { setFavourites } from '../slices/favouriteMusicListSlice';

// Worker saga: will be fired on FETCH_MUSIC_LIST actions
function* fetchMusicListSaga() {
  try {
    const music = yield call(fetchMusicList);
    yield put(setFavourites(music.musics)); // Dispatch success action
  } 
  catch (e) {
    yield console.log("Failed in fetchMusicListSaga");
    // yield put(fetchMusicListFailed(e.message)); // Dispatch failure action
  }
}

// Watcher saga: spawns a new fetchMusicListSaga task on each FETCH_MUSIC_LIST
function* musicSaga() {
  yield takeLatest('music/fetchMusicList', fetchMusicListSaga);
}

export default musicSaga;
