import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  genreMusicList: null,
  genreMusicMessage: null,
  genreMusicError: null
};

const genreMusicListSlice = createSlice ({
  name: 'genreMusicList-list',
  initialState,

  reducers: {
    setGenreMusicList(state, action) {
      state.genreMusicList = action.payload.data;
      state.genreMusicMessage = action.payload.message;
      state.genreMusicError = null;
    },
    setGenreMusicListError(state, action) {
      state.genreMusicList = null;
      state.genreMusicMessage = null;
      state.genreMusicError = action.payload.error;
    },
  },
});

export const { setGenreMusicList, setGenreMusicListError } = genreMusicListSlice.actions;
export default genreMusicListSlice.reducer;
