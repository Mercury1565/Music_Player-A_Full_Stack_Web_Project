import { all } from 'redux-saga/effects';
import musicSaga from './musicSaga'; // Import the saga for music

export default function* rootSaga() {
  yield all([
    musicSaga(), // Add all your sagas here
  ]);
}
