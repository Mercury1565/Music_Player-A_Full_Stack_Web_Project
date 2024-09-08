import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  favouriteMusicList: null,
  favouriteMusicMessage: null,
  favouriteMusicError: null
};

const favouriteMusicListSlice = createSlice ({
  name: 'musicID-list',
  initialState,

  reducers: {
    setFavourites(state, action) {
        state.favouriteMusicList = action.payload.data;
        state.favouriteMusicMessage = action.payload.message;
        state.favouriteMusicError = null;
    },
    setFavouritesError(state, action) {
        state.favouriteMusicList = null;
        state.favouriteMusicMessage = null;
        state.favouriteMusicError = action.payload.error;
    },
  },
});

export const { setFavourites, setFavouritesError } = favouriteMusicListSlice.actions;
export default favouriteMusicListSlice.reducer;
