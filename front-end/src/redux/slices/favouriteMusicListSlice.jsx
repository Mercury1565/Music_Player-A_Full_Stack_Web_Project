import { createSlice } from '@reduxjs/toolkit';

import { music_card } from '../../assets/assets';
const initialState = [];

const favouriteMusicListSlice = createSlice ({
  name: 'music-list',
  initialState,

  reducers: {
    setFavourites(state, action) {
        return action.payload;
    },
    appendFavourite(state, action) {
        state.push(action.payload);
    },
    removeFavourite(state, action) {
        return state.filter(music => music !== action.payload);
    }
  },
});

export const { setFavourites, appendFavourite, removeFavourite } = favouriteMusicListSlice.actions;
export default favouriteMusicListSlice.reducer;
