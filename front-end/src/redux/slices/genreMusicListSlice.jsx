import { createSlice } from '@reduxjs/toolkit';
const initialState = [];

const genreMusicListSlice = createSlice ({
  name: 'music-list',
  initialState,

  reducers: {
    setGenreMusicList(state, action) {
        return action.payload;
    }
  },
});

export const { setGenreMusicList } = genreMusicListSlice.actions;
export default genreMusicListSlice.reducer;
