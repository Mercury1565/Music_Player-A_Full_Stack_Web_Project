import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loggedIn: false,
    accessToken: null,
    refreshToken: null,
    loading: false,
    authError: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart(state) {
            state.loading = true;
            state.authError = null;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.loggedIn = true;
            state.accessToken = action.payload.access_token;
            state.refreshToken = action.payload.refresh_token;
        },
        loginFailure(state, action) {
            state.loading = false;
            state.authError = action.payload;
        },
        logout(state) {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
