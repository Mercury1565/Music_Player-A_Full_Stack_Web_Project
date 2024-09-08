// src/redux/sagas/authSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import { loginUser, logoutUser, signUpUser } from '../../api/user_api';
import { loginStart, loginSuccess, loginFailure, logout } from '../slices/authSlice';

function* loginSaga(action) {
    try {
        yield put(loginStart());
        const data = yield call(loginUser, action.payload);
        yield put(loginSuccess(data));

        localStorage.setItem('accessToken', data.access_token);
        localStorage.setItem('refreshToken', data.refresh_token);
    } catch (error) {
        yield put(loginFailure(error.response.data));
    }
}

function* signupSaga(action) {
    try {
        yield call(signUpUser, action.payload);
        yield call(loginSaga, action);
    } catch (error) {
        yield put(loginFailure(error.response.data));
    }
}

function* logoutSaga() {
    try {
        yield put(logout());
        yield call (logoutUser);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
   }
    catch (error) {
    }
}

export default function* authSaga() {
    yield takeLatest('auth/loginRequest', loginSaga);
    yield takeLatest('auth/signupRequest', signupSaga);
    yield takeLatest('auth/logoutRequest', logoutSaga);
}
