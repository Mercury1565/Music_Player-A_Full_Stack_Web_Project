import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const favouriteMusicListSlice = createSlice ({
  name: 'musicID-list',
  initialState,

  reducers: {
    setFavourites(state, action) {
        return action.payload;
    },
    appendFavourite(state, action) {
        state.push(action.payload);
    },
    removeFavourite(state, action) {
        return state.filter(musicID => musicID !== action.payload);
    }
  },
});

export const { setFavourites, appendFavourite, removeFavourite } = favouriteMusicListSlice.actions;
export default favouriteMusicListSlice.reducer;
