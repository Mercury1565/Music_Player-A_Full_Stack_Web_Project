import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const topMusicListSlice = createSlice ({
  name: 'music-list',
  initialState,

  reducers: {
    setTopMusicList(state, action) {
        return action.payload;
    },
  },
});

export const { setTopMusicList } = topMusicListSlice.actions;
export default topMusicListSlice.reducer;
