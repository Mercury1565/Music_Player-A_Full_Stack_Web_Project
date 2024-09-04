import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchMusicList, fetchTopMusicList, fetchFavouriteMusicList, fetchYourMusicList } from '../../api/music_api';
import { setFavourites } from '../slices/favouriteMusicListSlice';
import { setTopMusicList } from '../slices/topMusicListSlice';
import { setYourMusicList } from '../slices/yourMusicListSlice';

// Worker saga: will be fired on FETCH_MUSIC_LIST actions
function* fetchFavouriteMusicListSaga() {
  try {
    const music = yield call(fetchFavouriteMusicList);
    yield put(setFavourites(music.data)); // Dispatch success action
  } 
  catch (e) {
    yield console.log("Failed in fetchMusicListSaga");
    // yield put(fetchMusicListFailed(e.message)); // Dispatch failure action
  }
}

function* fetchTopMusicListSaga() {
  try {
    const music = yield call(fetchTopMusicList);
    yield put(setTopMusicList(music.data)); // Dispatch success action
  } 
  catch (e) {
    yield console.log("Failed in fetchMusicListSaga");
    // yield put(fetchMusicListFailed(e.message)); // Dispatch failure action
  }
}

function* fetchYourMusicListSaga() {
  try {
    const music = yield call(fetchYourMusicList);
    yield put(setYourMusicList(music.data)); // Dispatch success action
  } 
  catch (e) {
    yield console.log("Failed in fetchMusicListSaga");
    // yield put(fetchMusicListFailed(e.message)); // Dispatch failure action
  }
}

function* fetchMusicAudio() {
  try {
    const music = yield call(fetchMusicAudio);
    yield put(setFavourites(music.data)); // Dispatch success action
  } 
  catch (e) {
    yield console.log("Failed in fetchMusicListSaga");
    // yield put(fetchMusicListFailed(e.message)); // Dispatch failure action
  }
}

function* musicSaga() {
  yield takeLatest('music/fetchFavouriteMusicList', fetchFavouriteMusicListSaga);
  yield takeLatest('music/fetchTopMusicList', fetchTopMusicListSaga);
  yield takeLatest('music/fetchYourMusicList', fetchYourMusicListSaga);
}

export default musicSaga;
