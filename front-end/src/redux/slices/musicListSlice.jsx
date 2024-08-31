import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const musicListSlice = createSlice ({
  name: 'music-list',
  initialState,

  reducers: {
    setMusicList(state, action) {
        return action.payload;
    },
    appendMusicList(state, action) {
        state.push(action.payload);
    }
  },
});

export const { setMusicList } = musicListSlice.actions;
export default musicListSlice.reducer;
