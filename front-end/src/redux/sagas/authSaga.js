// src/redux/sagas/authSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import { loginUser, signUpUser } from '../../api/user_api';
import { loginStart, loginSuccess, loginFailure } from '../slices/authSlice';

function* loginSaga(action) {
    try {
        yield put(loginStart());
        const data = yield call(loginUser, action.payload);
        yield put(loginSuccess(data));
        // Optionally, store the JWT tokens in localStorage or cookies
        localStorage.setItem('accessToken', data.access_token);
        localStorage.setItem('refreshToken', data.refresh_token);
        console.log(localStorage.getItem('accessToken'));
        console.log(localStorage.getItem('refreshToken'));
    } catch (error) {
        yield put(loginFailure(error.response.data));
    }
}

function* signupSaga(action) {
    try {
        yield call(signUpUser, action.payload);
        // After signup, you might want to log the user in automatically
        yield call(loginSaga, action);
    } catch (error) {
        yield put(loginFailure(error.response.data));
    }
}

export default function* authSaga() {
    yield takeLatest('auth/loginRequest', loginSaga);
    yield takeLatest('auth/signupRequest', signupSaga);
}
