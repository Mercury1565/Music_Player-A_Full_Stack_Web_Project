import { createSlice } from '@reduxjs/toolkit';
const initialState = [];

const searchedMusicListSlice = createSlice ({
  name: 'music-list',
  initialState,

  reducers: {
    setSearchList(state, action) {
        return action.payload;
    },
  },
});

export const { setSearchList } = searchedMusicListSlice.actions;
export default searchedMusicListSlice.reducer;
