import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const nowPlayingListSlice = createSlice ({
  name: 'music-list',
  initialState,

  reducers: {
    setNowPlayingMusicList(state, action) {
        return action.payload;
    },
  },
});

export const { setNowPlayingMusicList } = nowPlayingListSlice.actions;
export default nowPlayingListSlice.reducer;
