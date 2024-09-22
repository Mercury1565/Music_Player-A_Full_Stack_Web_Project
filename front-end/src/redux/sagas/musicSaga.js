import { call, put, takeLatest } from 'redux-saga/effects';
import { createMusic, fetchTopMusicList, fetchFavouriteMusicList, fetchYourMusicList, fetchGenreList, fetchGenreMusicList, addToFavouriteMusicList, removeFromFavouriteMusicList, searchMusic, deleteMusic, fetchMusicAudio, fetchMusicCover } from '../../api/music_api';
import { setFavourites, setFavouritesError } from '../slices/favouriteMusicListSlice';
import { setTopMusicList, setTopMusicListError } from '../slices/topMusicListSlice';
import { setYourMusicList, setYourMusicListError, setYourMusicListRequest, setYourMusicListSuccess } from '../slices/yourMusicListSlice';
import { setGenreList, setGenreListError } from '../slices/genresSlice';
import { setGenreMusicList } from '../slices/genreMusicListSlice';
import { setSearchList, setSearchListError } from '../slices/searchedMusicListSlice';
import { setMusic } from '../slices/musicSlice';
import { setAudio, setCover, setError } from '../slices/fetchedMusicSlice';

function* createMusicSaga(action) {
  yield put(setYourMusicListRequest());
  const { musicData, musicFile, coverFile } = action.payload;

  try {
    const formData = new FormData();
    
    // Append text fields
    formData.append('artist', musicData.artist);
    formData.append('title', musicData.title);
    formData.append('duration', musicData.duration);
    formData.append('genres', musicData.genre.join(','));

    // Append files
    if (musicFile) {
      formData.append('music', musicFile);
    }
    if (coverFile) {
      formData.append('cover_image', coverFile);
    }

    // Perform the file upload via API
    const response = yield call(createMusic, formData);

    // Dispatch success action with the uploaded response
    yield put(setYourMusicListSuccess(response)); 
  } 
  catch (e) {
    // Handle error by dispatching an error action
    yield put(setYourMusicListError(e))
  }
}

function* deleteMusicSaga(action) {
  try {
    const response = yield call(deleteMusic, action.payload);
    // yield put(setYourMusicListSuccess(response)); 

  } 
  catch (e) {
    // Handle error by dispatching an error action
    yield put(setYourMusicListError(e.response))
  }
}

function* fetchFavouriteMusicListSaga() {
  try {
    const response = yield call(fetchFavouriteMusicList);
    yield put(setFavourites(response)); 
  } 
  catch (e) {
    // Handle error by dispatching an error action
    yield put(setFavouritesError(e.response))
  }
}

function* addToFavouriteMusicListSaga(action) {
  try {
    const response = yield call(addToFavouriteMusicList, action.payload);
    yield put(setFavourites(response)); 
  } 
  catch (e) {
    // Handle error by dispatching an error action
    yield put(setFavouritesError(e.response))
  }
}

function* removeFromFavouriteMusicListSaga(action) {
  try {
    const response = yield call(removeFromFavouriteMusicList, action.payload);
    yield put(setFavourites(response)); 
  } 
  catch (e) {
    // Handle error by dispatching an error action
    yield put(setFavouritesError(e.response))
  }
}

function* fetchTopMusicListSaga() {
  try {
    const response = yield call(fetchTopMusicList);
    yield put(setTopMusicList(response));
  } 
  catch (e) {
    // Handle error by dispatching an error action
    yield put(setTopMusicListError(e.response))
  }
}

function* fetchYourMusicListSaga() {
  try {
    const response = yield call(fetchYourMusicList);
    yield put(setYourMusicList(response.data)); 
  } 
  catch (e) {
    // Handle error by dispatching an error action
    yield put(setYourMusicListError(e.response))
  }
}

function* fetchGenreListSaga() {
  try {
    const response = yield call(fetchGenreList);
    yield put(setGenreList(response)); 
  } 
  catch (e) {
    // Handle error by dispatching an error action
    yield put(setGenreListError(e.response))
  }
}

function* fetchGenreMusicListSaga(action) {
  try {
    const response = yield call(fetchGenreMusicList, action.payload);
    yield put(setGenreMusicList(response)); 
  } 
  catch (e) {
    // Handle error by dispatching an error action
    yield put(setGenreMusicList(e.response))
  }
}

function* fetchSearchMusicListSaga(action) {
  try {
    const response = yield call(searchMusic, action.payload);
    yield put(setSearchList(response)); 
  } 
  catch (e) {
    // Handle error by dispatching an error action
    yield put(setSearchListError(e.response))
  }
}

function* fetchMusicAudioSaga(action) {
  try {
    const audioURL = yield call(fetchMusicAudio, action.payload);
    yield put(setAudio(audioURL.data)); 
  } 
  catch (e) {
    // Handle error by dispatching an error action
    yield put(setError(e));
  }
}

function* fetchMusicCoverSaga(action) {
  try {
    const coverURL = yield call(fetchMusicCover, action.payload);
    yield put(setCover(coverURL.data)); 
  } 
  catch (e) {
    // Handle error by dispatching an error action
    yield put(setError(e));
  }
}


function* musicSaga() {
  yield takeLatest('music/createMusic', createMusicSaga);
  yield takeLatest('music/deleteMusic', deleteMusicSaga);

  yield takeLatest('music/appendFavourite', addToFavouriteMusicListSaga);
  yield takeLatest('music/removeFavourite', removeFromFavouriteMusicListSaga);

  yield takeLatest('music/fetchFavouriteMusicList', fetchFavouriteMusicListSaga);
  yield takeLatest('music/fetchTopMusicList', fetchTopMusicListSaga);
  yield takeLatest('music/fetchYourMusicList', fetchYourMusicListSaga);
  yield takeLatest('music/fetchGenreMusicList', fetchGenreMusicListSaga);
  yield takeLatest('music/fetchGenreList', fetchGenreListSaga);
  yield takeLatest('music/searchMusic', fetchSearchMusicListSaga);

  yield takeLatest('music/fetchMusicAudio', fetchMusicAudioSaga);
  yield takeLatest('music/fetchMusicCover', fetchMusicCoverSaga);
}

export default musicSaga;