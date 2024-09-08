import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchMusicList: null,
  searchMusicMessage: null,
  searchMusicError: null,
};

const searchedMusicListSlice = createSlice ({
  name: 'searchMusicList-list',
  initialState,

  reducers: {
    setSearchList(state, action) {
      state.searchMusicList = action.payload.data;
      state.searchMusicMessage = action.payload.message;
      state.searchMusicError = null;
    },
    setSearchListError(state, action) {
      state.searchMusicList = null;
      state.searchMusicMessage = null;
      state.searchMusicError = action.payload.error;
    }
  },
});

export const { setSearchList, setSearchListError } = searchedMusicListSlice.actions;
export default searchedMusicListSlice.reducer;
