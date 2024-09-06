import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchTopMusicList, fetchFavouriteMusicList, fetchYourMusicList, fetchGenreList, fetchGenreMusicList, addToFavouriteMusicList, removeFromFavouriteMusicList, searchMusic } from '../../api/music_api';
import { appendFavourite, setFavourites, removeFavourite } from '../slices/favouriteMusicListSlice';
import { setTopMusicList } from '../slices/topMusicListSlice';
import { setYourMusicList } from '../slices/yourMusicListSlice';
import { setGenreList } from '../slices/genresSlice';
import { setGenreMusicList } from '../slices/genreMusicListSlice';
import { setSearchList } from '../slices/searchedMusicListSlice';

function* fetchFavouriteMusicListSaga() {
  try {
    const music = yield call(fetchFavouriteMusicList);
    yield put(setFavourites(music.data)); 
  } 
  catch (e) {
    yield console.log("Failed in fetchFavouriteMusicListSaga");
    // yield put(fetchMusicListFailed(e.message)); 
  }
}

function* addToFavouriteMusicListSaga(action) {
  try {
    const _ = yield call(addToFavouriteMusicList, action.payload);
    const music = yield call(fetchFavouriteMusicList);
    yield put(setFavourites(music.data)); 
  } 
  catch (e) {
    yield console.log("Failed in addFavouriteMusicListSaga");
    // yield put(fetchMusicListFailed(e.message)); // Dispatch failure action
  }
}

function* removeFromFavouriteMusicListSaga(action) {
  try {
    const _ = yield call(removeFromFavouriteMusicList, action.payload);
    const music = yield call(fetchFavouriteMusicList);
    yield put(setFavourites(music.data)); 
  } 
  catch (e) {
    yield console.log("Failed in removeFavouriteMusicListSaga");
    // yield put(fetchMusicListFailed(e.message)); // Dispatch failure action
  }
}

function* fetchTopMusicListSaga() {
  try {
    const music = yield call(fetchTopMusicList);
    yield put(setTopMusicList(music.data));
  } 
  catch (e) {
    yield console.log("Failed in fetchTopMusicListSaga");
    // yield put(fetchMusicListFailed(e.message));
  }
}

function* fetchYourMusicListSaga() {
  try {
    const music = yield call(fetchYourMusicList);
    yield put(setYourMusicList(music.data)); 
  } 
  catch (e) {
    yield console.log("Failed in fetchYourListSaga");
    // yield put(fetchMusicListFailed(e.message)); 
  }
}

function* fetchGenreMusicListSaga(action) {
  try {
    const music = yield call(fetchGenreMusicList, action.payload);
    yield put(setGenreMusicList(music.data)); 
  } 
  catch (e) {
    yield console.log("Failed in fetchGenreMusicListSaga");
    // yield put(fetchMusicListFailed(e.message)); // Dispatch failure action
  }
}

function* fetchGenreListSaga() {
  try {
    const genres = yield call(fetchGenreList);
    yield put(setGenreList(genres.data)); 
  } 
  catch (e) {
    yield console.log("Failed in fetchGenreListSaga");
    // yield put(fetchMusicListFailed(e.message)); // Dispatch failure action
  }
}

function* fetchSearchMusicListSaga(action) {
  try {
    const music = yield call(searchMusic, action.payload);
    yield put(setSearchList(music.data)); 
  } 
  catch (e) {
    yield console.log("Failed in fetchSearchMusicListSaga");
    // yield put(fetchMusicListFailed(e.message)); // Dispatch failure action
  }
}

function* musicSaga() {
  yield takeLatest('music/fetchFavouriteMusicList', fetchFavouriteMusicListSaga);
  yield takeLatest('music/fetchTopMusicList', fetchTopMusicListSaga);
  yield takeLatest('music/fetchYourMusicList', fetchYourMusicListSaga);
  yield takeLatest('music/fetchGenreMusicList', fetchGenreMusicListSaga);
  yield takeLatest('music/fetchGenreList', fetchGenreListSaga);
  yield takeLatest('music/appendFavourite', addToFavouriteMusicListSaga);
  yield takeLatest('music/removeFavourite', removeFromFavouriteMusicListSaga);
  yield takeLatest('music/searchMusic', fetchSearchMusicListSaga);
}

export default musicSaga;
